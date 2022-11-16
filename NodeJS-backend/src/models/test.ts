import mongoose, { Schema } from "mongoose"
import { LabTestInterface } from "src/utils/interfaces"

const LabTestSchema = new Schema<LabTestInterface>({
  tags: Array<String>,
  name: {
    unique: true,
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    data: Buffer,
    contentType: String,
    size: Number,
    select: false,
  },
  imagePath: String,
  price: {
    type: Number,
    required: true,
  },
})

export default mongoose.model<LabTestInterface>("Test", LabTestSchema)
