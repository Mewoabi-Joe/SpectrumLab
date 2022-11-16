import mongoose, { Schema } from "mongoose"
import { UserInterface } from "src/utils/interfaces"

const userSchema = new Schema<UserInterface>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
})

export default mongoose.model<UserInterface>("User", userSchema)
