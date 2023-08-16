import express from "express";
import upload from "../middleware/file.middleware";
// import { checkJWT } from "../middleware/auth.middleware"
import {
	createNewLabTest,
	getAllTest,
	updateLabTest,
	getTestByCat,
	deleteTest,
	getOneTest,
	downloadImage,
	streamPdf,
} from "../controllers/test.controllers";

const router = express.Router();

router.get("/test", getAllTest);
router.get("/test/:testId", getOneTest);
router.get("/test/download/pdf", downloadImage);
router.get("/test/stream/pdf", streamPdf);

// router.use(checkJWT)

router.post("/test", upload.single("image"), createNewLabTest);
router.get("/test/:categoryId", getTestByCat);
router.put("/test/:testId", upload.single("image"), updateLabTest);
router.delete("/test/delete/:testId", deleteTest);

export default router;
