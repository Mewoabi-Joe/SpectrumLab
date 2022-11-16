import { Request, Response } from "express"
import { createRDV } from "../controllers/rendezvous.controllers"
const fapshi = require("./fapshi")

export const initiatePay = async (req: Request, res: Response) => {
  const resp = await fapshi.initiatePay(req.body)
  console.log(resp)
  return res.status(200).json(resp)
}

export const directPay = async (req: Request, res: Response) => {
  const resp = await fapshi.directPay(req.body)
  console.log(resp)
  return res.status(200).json(resp)
}

export const paymentStatus = async (req: Request, res: Response) => {
  const resp = await fapshi.paymentStatus(req.body.transId)
  console.log(resp)
  return res.status(200).json(resp)
}

export const getStatus = async (req: Request, res: Response) => {
  // Get the transaction status from fapshi's API to be sure of its source
  const event = await fapshi.paymentStatus(req.body.transId)

  if (event.statusCode !== 200)
    return res.status(400).send({ message: event.message })

  // Handle the event
  switch (event.status) {
    case "SUCCESSFUL":
      // Then define and call a function to handle a SUCCESSFUL payment
      console.log(event, "successful")
      createRDV(req, res)

      break
    case "FAILED":
      // Then define and call a function to handle a FAILED payment
      console.log(event, "failed")
      break
    case "EXPIRED":
      // Then define and call a function to handle an expired transaction
      console.log(event, "expired")
      break
    // ... handle other event types
    default:
      console.log(`Unhandled event status: ${event.type}`)
  }

  // Return a 200 response to acknowledge receipt of the event
  return res.send()
}

export const expirePay = async (req: Request, res: Response) => {
  const resp = await fapshi.expirePay(req.body.transId)
  console.log(resp)
  return res.status(200).json(resp)
}

export const useTrans = async (req: Request, res: Response) => {
  const resp = await fapshi.expirePay(req.body.userId)
  console.log(resp)
  return res.status(200).json(resp)
}
