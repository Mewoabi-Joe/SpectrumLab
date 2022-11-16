import { Request, Response } from "express"
import User from "../models/user"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { validateEmail } from "../utils/regEx"

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const errors = []

    const userEmail = await User.findOne({ email: req.body.email })
    const userNumber = await User.findOne({ phoneNo: req.body.phoneNo })

    const validEmail = validateEmail(req.body.email)
    if (validEmail === null) {
      errors.push({
        email: "Enter a valid email address",
      })
    } else {
      if (userEmail) {
        errors.push({
          email:
            "A user with this Email already exist. Use a different Email Address",
        })
      }
    }

    if (req.body.firstName.length < 2) {
      errors.push({
        firstName: "First name should be longer than 2 letters",
      })
    }

    if (req.body.lastName.length < 2) {
      errors.push({
        lastName: "Last name should be longer than 2 letters",
      })
    }

    if (!/^6[\d]{8}$/.test(req.body.phoneNo)) {
      errors.push({
        phoneNo: "Invalid Phone Number",
      })
    } else {
      if (userNumber) {
        errors.push({
          phoneNo:
            "A user with this number already exist. Use a different Phone Number",
        })
      }
    }

    if (req.body.password.length < 4) {
      errors.push({
        password:
          "Password is too short. Enter a password with atleast 4 characters",
      })
    }

    if (req.body.dateOfBirth === "") {
      errors.push({
        dateOfBirth: "Date of bith is required",
      })
    }
    if (errors.length === 0) {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phoneNo: req.body.phoneNo && req.body.phoneNo,
        dateOfBirth: req.body.dateOfBirth && req.body.dateOfBirth,
        admin: req.body.admin ? req.body.admin : false,
      })
      await newUser.save()

      return res.status(201).json({
        user: {
          userId: newUser._id,
          firstName: newUser.firstName,
          email: newUser.email,
          phoneNo: newUser.phoneNo && newUser.phoneNo,
        },
      })
    } else {
      return res.status(400).json(errors)
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    })
    console.log(user)

    if (user) {
      const userExist = await bcrypt.compare(req.body.password, user.password)
      if (userExist) {
        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
          },
          // process.env.TOKEN_SECRET as string,
          "secret",
          {
            expiresIn: "7d",
          }
        )
        return res.status(200).json({
          user: {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            admin: user.admin,
          },
          token,
        })
      }
      return res.status(401).send("Your password is not correct")
    }
    return res.status(401).send("Your email is not correct")
  } catch (error) {
    return res.send(error)
  }
}

export const getUser = async (req: Request, res: Response) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const authorization = req.headers.authorization.split(" ")[1]

    jwt.verify(authorization, "secret", (err, foundUser: any) => {
      if (err) {
        return res.sendStatus(403)
      }
      User.findOne({ _id: foundUser.userId })
        .then(user => {
          if (user) {
            const currentUser = {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              dateOfBirth: user.dateOfBirth,
              phoneNo: user.phoneNo,
              admin: user.admin,
              userId: user._id,
            }
            return res.status(200).json(currentUser)
          }
          return res.sendStatus(404)
        })
        .catch(err => {
          return console.log(err)
        })
      return
    })
  } else {
    res.sendStatus(401)
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = User.findOne({ _id: req.params.id })
  } catch (error) {}
}

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await User.find({})
    const response = users.map(user => {
      console.log(user)

      const { firstName, lastName, email, dateOfBirth, phoneNo, _id, admin } =
        user

      return { _id, firstName, lastName, email, dateOfBirth, phoneNo, admin }
    })
    console.log(response)

    return res.status(200).json(response)
  } catch (error) {
    return res.send(error)
  }
}

export const editUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const errors = []
    const user: any = await User.findOne({ _id: req.params.userId })

    const validEmail = validateEmail(req.body.email)
    if (validEmail === null) {
      errors.push({
        email: "Enter a valid email address",
      })
    }

    if (req.body.firstName.length < 2) {
      errors.push({
        firstName: "First name should be longer than 2 letters",
      })
    }

    if (req.body.lastName.length < 2) {
      errors.push({
        lastName: "Last name should be longer than 2 letters",
      })
    }

    if (!/^6[\d]{8}$/.test(req.body.phoneNo)) {
      errors.push({
        phoneNo: "Invalid Phone Number",
      })
    }

    const passwordMatch = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    )

    if (req.body.oldPassword !== "") {
      if (!passwordMatch) {
        errors.push({
          oldPassword: "Current password entered is not correct",
        })
      }
    }
    if (req.body.password !== "")
      if (req.body.password.length < 4) {
        errors.push({
          password:
            "Password is too short. Enter a password with atleast 4 characters",
        })
      }

    if (req.body.dateOfBirth === "") {
      errors.push({
        dateOfBirth: "Date of bith is required",
      })
    }
    if (errors.length === 0) {
      await User.findByIdAndUpdate(
        { _id: req.params.userId },
        {
          ...req.body,
          password:
            req.body.password !== ""
              ? bcrypt.hashSync(req.body.password, 10)
              : user?.password,
        }
      )

      const updatedUser = await User.findOne({ _id: req.params.userId })

      const token = jwt.sign(
        {
          userId: updatedUser?._id,
          email: updatedUser?.email,
        },
        // process.env.TOKEN_SECRET as string,
        "secret",
        {
          expiresIn: "7d",
        }
      )

      return res.status(201).json({
        token,
      })
    } else {
      return res.status(400).json(errors)
    }
  } catch (error) {
    console.log(error)

    return res.status(400).json(error)
  }
}

export const sendEmailToResetPassword = async (req: Request, res: Response) => {
  const { email }: { email: string } = req.body
  const { _id } = (await User.findOne({ email })) as any
  const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: "enspygi2023@gmail.com",
      pass: process.env.RANDOM,
    },
    secure: true,
  })

  const mailData = {
    from: "enspygi2023@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Reset Your Password",
    text: "Click on the link below to reset your password",
    html: `<p>Click on the link below to reset your password</p><a href=http://localhost:4200/reset-password/${_id}> Reset my password</a>`,
  }

  try {
    const info = await transporter.sendMail(mailData)
    console.log(info)
  } catch (error) {
    console.log(error)
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { password: bcrypt.hashSync(req.body.newPassword, 10) }
    )
  } catch (error) {
    console.log(error)
  }
}
