import mongoose, { Schema } from "mongoose"
import { RendezvousStateEnum } from "src/utils/enums"

const RendezvousSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  testId: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  results: {
    type: String,
  },
  bookedOn: {
    type: String,
    required: true,
  },
  doneOn: {
    type: String,
    required: false,
  },
  resultsOutOn: {
    type: String,
    required: false,
  },
})

export default mongoose.model("Rendezvous", RendezvousSchema)
