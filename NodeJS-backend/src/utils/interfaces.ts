import { Document } from "mongoose"

export interface UserInterface extends Document {
  firstName: string
  lastName: string
  password: string
  email: string
  dateOfBirth: string
  phoneNo: string
  admin: boolean
}

export interface LabTestInterface {
  tags: Array<String>
  id: string
  name: string
  description: string
  contentType: String
  image: { data: Buffer; contentType: String; size: Number }
  imagePath: String
  price: number
}

export interface PostInterface {
  type: string[]
  id: string
  title: string
  description: string
  contentType: String
  image: { data: Buffer; contentType: String; size: Number }
  imagePath: string
  youtubeVideoUrl: string
  created_at: string
}

export interface CategoryInterface {
  name: string
  description: string
}

export interface MulterRequest extends Request {
  file: any
}
