import express from "express"
// import { checkJWT } from "../middleware/auth.middleware"
import {
  createRDV,
  getRDVs,
  getRDVsByUser,
  updateRDV,
} from "../controllers/rendezvous.controllers"

const router = express.Router()

// router.use(checkJWT)

router.post("/rendezvous", createRDV)
router.get("/rendezvous", getRDVs)
router.get("/rendezvous/:userId", getRDVsByUser)
router.put("/rendezvous/:id", updateRDV)

export default router
