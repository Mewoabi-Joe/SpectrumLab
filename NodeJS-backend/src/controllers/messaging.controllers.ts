import { Request, Response } from "express"
import Message from "../models/message"

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const date = new Date()
    let createdOn =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    const message = new Message({ ...req.body, createdOn })
    await message.save()
    return res.status(201).json({ message })
  } catch (error) {
    return res.send(error)
  }
}

export const getAllMessages = async (req: Request, res: Response) => {
  // const { limit, offset }: { limit: string; offset: string } = req.query as any

  try {
    // const arr: Array<Object> = await Category.find({})
    // const pages = Math.floor(arr.length / 5) + 1
    // const category = await Category.find({})
    //   .limit(parseInt(limit))
    //   .skip(parseInt(offset))
    const messages = await Message.find({})
    return res.status(200).json({ messages })
  } catch (error) {
    return res.send(error)
  }
}

export const getMessageByUser = async (req: Request, res: Response) => {
  try {
    const message = await Message.findOne({
      _id: req.params.userId,
    })

    return res.status(200).json(message)
  } catch (error) {
    return res.send(error)
  }
}

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.findByIdAndRemove({
      _id: req.params.messageId,
    })
    return res
      .status(200)
      .json({ info: "Message deleted Successfully", message })
  } catch (error) {
    return res.send(error)
  }
}
