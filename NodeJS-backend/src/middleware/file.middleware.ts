import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "uploads/")
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix)
  },
})

export default multer({ storage: storage })

// FAK_351ec8924715509573708e59d550c74c
