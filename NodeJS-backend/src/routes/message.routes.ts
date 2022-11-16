import express from "express"
import { checkJWT } from "../middleware/auth.middleware"
import {
  sendMessage,
  getAllMessages,
  getMessageByUser,
  deleteMessage,
} from "../controllers/messaging.controllers"

const router = express.Router()

// router.use(checkJWT)

router.post("/messages", sendMessage)
router.get("/messages", getAllMessages)
router.get("/messages/:userId", getMessageByUser)
router.delete("/messages/:messageId", deleteMessage)

export default router
