import mongoose, { Schema } from "mongoose"

const MessagesSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdOn: {
    type: String,
    required: true,
  },
})

export default mongoose.model("Messages", MessagesSchema)
