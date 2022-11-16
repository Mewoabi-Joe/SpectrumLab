import express from "express"
import {
  directPay,
  expirePay,
  getStatus,
  initiatePay,
  paymentStatus,
  useTrans,
} from "./payment.controllers"

const router = express.Router()

router.post("/initiate_pay", initiatePay)
router.post("/direct_pay", directPay)
router.post("/payment_status", paymentStatus)
router.post("/expire_pay", expirePay)
router.post("/use_trans", useTrans)
router.post("/fapshi-webhook", getStatus)

export default router
