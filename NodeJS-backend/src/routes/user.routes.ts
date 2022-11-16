import express from "express"
import {
  getUser,
  login,
  register,
  sendEmailToResetPassword,
  resetPassword,
  getAllUsers,
  getUserById,
  editUser,
} from "../controllers/user.controllers"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/get-user", getUser)
router.put("/edit-user/:userId", editUser)
router.get("/get-users", getAllUsers)
router.post("/forgot-password", sendEmailToResetPassword)
router.post("/reset-password/:userId", resetPassword)

export default router
