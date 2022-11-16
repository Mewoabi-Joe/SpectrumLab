import express from "express"
import upload from "../middleware/file.middleware"

import { checkJWT } from "../middleware/auth.middleware"
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  getPostImage,
} from "../controllers/posts.controllers"

const router = express.Router()

// router.use(checkJWT)

router.post("/posts", upload.single("image"), createPost)
router.get("/posts", getAllPosts)
router.get("/posts/:id", getPostById)
router.get("/post/image/:id", getPostImage)
router.delete("/posts/:id", deletePost)

export default router
