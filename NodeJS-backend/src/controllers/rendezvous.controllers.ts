import { Request, Response } from "express"
import { RendezvousStateEnum } from "../utils/enums"
import Randezvous from "../models/rendezvous"

export const createRDV = async (req: Request, res: Response) => {
  const date = new Date()
  let bookedOn =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  try {
    const {
      userId,
      externalId: testId,
    }: { userId: string; externalId: string } = req.body
    const rendevzvous = new Randezvous()
    rendevzvous.userId = userId
    rendevzvous.testId = testId
    // rendevzvous.state = RendezvousStateEnum[state as RendezvousStateEnum]
    rendevzvous.state = RendezvousStateEnum.PENDING
    rendevzvous.bookedOn = bookedOn
    rendevzvous.save()
    return res.status(200).json(rendevzvous)
  } catch (error) {
    return res.status(404).json(error.message)
  }
}

export const updateRDV = async (req: Request, res: Response) => {
  try {
    const { state } = req.body
    const date = new Date()
    let today =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

    if (state === "DONE") {
      await Randezvous.findByIdAndUpdate(
        { _id: req.params.id },
        {
          state: RendezvousStateEnum[state as RendezvousStateEnum],
          doneOn: today,
        }
      )
    } else if (state === "RESULTS_OUT") {
      await Randezvous.findByIdAndUpdate(
        { _id: req.params.id },
        {
          state: RendezvousStateEnum[state as RendezvousStateEnum],
          resultsOutOn: today,
        }
      )
    } else {
      await Randezvous.findByIdAndUpdate(
        { _id: req.params.id },
        {
          state: RendezvousStateEnum[state as RendezvousStateEnum],
        }
      )
    }

    const rendevzvous = await Randezvous.findOne({ _id: req.params.id })

    return res.status(200).json(rendevzvous)
  } catch (error) {
    return res.status(404).json(error)
  }
}

export const getRDVs = async (req: Request, res: Response) => {
  try {
    const rendezvous = await Randezvous.find({})
    return res.status(200).json(rendezvous)
  } catch (error) {
    return res.status(404).json(error)
  }
}

export const getRDVsByUser = async (req: Request, res: Response) => {
  try {
    const rendevzvous = await Randezvous.find({ userId: req.params.userId })
    return res.status(200).json(rendevzvous)
  } catch (error) {
    return res.status(404).json(error)
  }
}
