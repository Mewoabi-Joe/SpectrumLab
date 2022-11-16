import express from "express"
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controllers"
import { checkJWT } from "../middleware/auth.middleware"

const router = express.Router()

// router.use(checkJWT)

router.get("/categories", getCategories)
router.get("/category/:categoryId", getCategory)
router.post("/categories", createCategory)
router.delete("/category/delete/:categoryId", deleteCategory)
router.put("/category/:categoryId", updateCategory)

export default router
