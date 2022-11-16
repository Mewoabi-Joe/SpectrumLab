import { Request, Response } from "express"
import { MulterRequest } from "src/utils/interfaces"
import Post from "../models/posts"
import fs from "fs"
import { validateYouTubeURL } from "../utils/regEx"
const { Readable } = require("stream")

export const createPost = async (req: Request, res: Response) => {
  try {
    const date = new Date()

    let today =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    const errors = []

    if (
      !(req as unknown as MulterRequest).file &&
      req.body.youtubeVideoUrl === ""
    ) {
      errors.push({
        image: "A Post should have an image or Link to a youtube video",
      })
    }

    if (
      (req as unknown as MulterRequest).file &&
      req.body.youtubeVideoUrl !== ""
    ) {
      errors.push({
        video:
          "A Post should either have an image or Link to a youtube video but not both",
      })
    }

    if (req.body.title === "") {
      errors.push({
        title: "Title is required",
      })
    }

    if (req.body.description === "") {
      errors.push({
        description: "Description is required",
      })
    }

    if (req.body.youtubeVideoUrl !== "") {
      if (!validateYouTubeURL(req.body.youtubeVideoUrl)) {
        errors.push({
          url: "Youtube link is not correct",
        })
      }
    }

    if (errors.length === 0) {
      const youtubeDomain = req.body.youtubeVideoUrl.split("watch")[0]
      const videoId = req.body.youtubeVideoUrl.split("=")[1]
      const link = `${youtubeDomain}embed/${videoId}`
      const newPost = new Post()
      newPost.type = JSON.parse(req.body.tags)
      newPost.title = req.body.title
      newPost.description = req.body.description
      newPost.youtubeVideoUrl = link
      newPost.created_at = today
      if ((req as unknown as MulterRequest).file) {
        newPost.image.data = fs.readFileSync(
          "uploads/" + (req as unknown as MulterRequest).file.filename
        )
        newPost.image.size = (req as unknown as MulterRequest).file.size
        newPost.image.contentType = (
          req as unknown as MulterRequest
        ).file.mimetype
        newPost.imagePath = "/post/image/" + newPost.id
      }

      await newPost.save()

      return res
        .status(200)
        .json({ message: "Post created successfully", newPost })
    } else {
      return res.status(400).json(errors)
    }
  } catch (error) {
    console.log(error)

    return res.status(400).json(error)
  }
}

export const getAllPosts = async (req: Request, res: Response) => {
  // const { limit, offset }: { limit: string; offset: string } = req.query as any

  try {
    // const arr: Array<Object> = await Category.find({})
    // const pages = Math.floor(arr.length / 5) + 1
    // const category = await Category.find({})
    //   .limit(parseInt(limit))
    //   .skip(parseInt(offset))
    const temp = await Post.find({})
    const posts = temp.map(test => {
      const {
        _id,
        title,
        description,
        type,
        imagePath,
        youtubeVideoUrl,
        created_at,
      } = test
      return {
        _id,
        title,
        description,
        type,
        youtubeVideoUrl,
        imagePath,
        created_at,
      }
    })
    return res.status(200).json({ posts })
  } catch (error) {
    return res.send(error)
  }
}

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
    })

    return res.status(200).json(post)
  } catch (error) {
    return res.send(error)
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndRemove({
      _id: req.params.id,
    })
    return res.status(200).json({ info: "Post deleted Successfully", post })
  } catch (error) {
    return res.send(error)
  }
}

export const getPostImage = async (req: Request, res: Response) => {
  try {
    const post: any = await Post.findOne({ _id: req.params.id })

    const file: fs.ReadStream = Readable.from(post?.image.data)

    // const file: fs.ReadStream = fs.createReadStream(
    //   "uploads/" + req.params.image
    // )

    const { size, contentType } = post?.image

    const head = {
      //  "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": post?.image.size,
      "Content-Type": post?.image.contentType,
    }
    res.writeHead(206, head)
    return file.pipe(res)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
