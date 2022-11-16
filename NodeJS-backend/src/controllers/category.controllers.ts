import { Request, Response } from "express"
import Category from "../models/category"

export const createCategory = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
    }: { name: string; phoneNo: string; description: string } = req.body
    const newCategory = new Category({
      name,
      description,
    })
    await newCategory.save()
    return res
      .status(201)
      .json({ message: "Category was created Successfully", newCategory })
  } catch (error) {
    return res.send(error)
  }
}

export const getCategories = async (req: Request, res: Response) => {
  // const { limit, offset }: { limit: string; offset: string } = req.query as any

  try {
    // const arr: Array<Object> = await Category.find({})
    // const pages = Math.floor(arr.length / 5) + 1
    // const category = await Category.find({})
    //   .limit(parseInt(limit))
    //   .skip(parseInt(offset))
    const categories = await Category.find({})
    return res.status(200).json({ categories })
  } catch (error) {
    return res.send(error)
  }
}

export const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findOne({
      _id: req.params.contactId,
    })

    return res.status(200).json(category)
  } catch (error) {
    return res.send(error)
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(
      { _id: req.params.categoryId },
      { ...req.body }
    )
    return res
      .status(200)
      .json({ message: "Category Updated Successfully", category })
  } catch (error) {
    return res.send(error)
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndRemove({
      _id: req.params.categoryId,
    })
    return res
      .status(200)
      .json({ message: "Category deleted Successfully", category })
  } catch (error) {
    return res.send(error)
  }
}
