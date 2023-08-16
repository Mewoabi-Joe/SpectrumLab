import { Request, Response } from "express";
import Test from "../models/test";
import fs from "fs";
const { Readable } = require("stream");
import { LabTestInterface, MulterRequest } from "../utils/interfaces";

export const createNewLabTest = async (req: Request, res: Response) => {
	try {
		const errors = [];
		if (!req.body.imagePath) {
			errors.push({
				image: "A lab test should have an image",
			});
		}

		if (req.body.name === "") {
			errors.push({
				name: "Name is required",
			});
		}

		if (req.body.price === "") {
			errors.push({
				price: "Price is required",
			});
		}
		console.log(req.body);

		if (errors.length === 0) {
			const newTest = new Test();
			newTest.tags = JSON.parse(req.body.tags);
			newTest.name = req.body.name;
			newTest.description = req.body.description;
			newTest.price = req.body.price;
			newTest.imagePath = req.body.imagePath;

			await newTest.save();

			return res.status(200).json({ message: "Test created successfully", newTest });
		} else {
			return res.status(400).json(errors);
		}
	} catch (error) {
		console.log(error);

		return res.status(400).json(error);
	}
};

export const updateLabTest = async (req: Request, res: Response) => {
	try {
		let updatedTest;

		const errors = [];

		if (req.body.name === "") {
			errors.push({
				name: "Name is required",
			});
		}

		if (req.body.price === "") {
			errors.push({
				price: "Price is required",
			});
		}

		if (!req.body.imagePath) {
			errors.push({
				image: "An image is required",
			});
		}

		if (errors.length === 0) {
			updatedTest = await Test.findByIdAndUpdate(
				{ _id: req.params.testId },
				{ ...req.body, tags: JSON.parse(req.body.tags) }
			);

			const test = await Test.findOne({ _id: req.params.testId });

			return res.status(200).json({ message: "Test updated Successfully", test });
		} else {
			return res.status(400).json(errors);
		}
	} catch (error) {
		return res.send(error);
	}
};

export const getTestByCat = async (req: Request, res: Response) => {
	try {
		const tests = await Test.find({ categoryId: req.params.categoryId });
		return res.status(200).json(tests);
	} catch (error) {
		return res.send(error);
	}
};

export const getAllTest = async (req: Request, res: Response) => {
	try {
		const tests = await Test.find({});
		const response = tests.map((test) => {
			const { _id, name, description, price, tags, imagePath } = test;
			return { _id, name, description, price, tags, imagePath };
		});
		return res.status(200).json(response);
	} catch (error) {
		return res.json(error);
	}
};

export const getOneTest = async (req: Request, res: Response) => {
	try {
		const test: any = await Test.findOne({ _id: req.params.testId });
		const { _id, name, description, price, tags, imagePath } = test;

		return res.status(200).json({ _id, name, description, price, tags, imagePath });
	} catch (error) {
		return res.send(error);
	}
};

export const deleteTest = async (req: Request, res: Response) => {
	try {
		const test = await Test.findByIdAndRemove({ _id: req.params.testId });

		return res.status(200).json(test);
	} catch (error) {
		return res.send(error.message);
	}
};

export const downloadImage = async (req: Request, res: Response) => {
	try {
		// const test: any = await Test.findOne({ _id: req.params.testId })

		// const file: fs.ReadStream = Readable.from(test?.image.data)

		// const file: fs.WriteStream = fs.createWriteStream("uploads/test.pdf")
		const file = "uploads/print.pdf";

		// const { size, contentType } = test?.image

		// const head = {
		//   //  "Content-Range": `bytes ${start}-${end}/${fileSize}`,
		//   "Accept-Ranges": "bytes",
		//   "Content-Length": test?.image.size,
		//   "Content-Type": test?.image.contentType,
		// }
		// res.writeHead(206, head)
		// return file.pipe(res)
		// return res.pipe(file)
		return res.download(file);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export const streamPdf = async (req: Request, res: Response) => {
	try {
		// const test: any = await Test.findOne({ _id: req.params.testId })

		// const file: fs.ReadStream = Readable.from(test?.image.data)

		// const file: fs.WriteStream = fs.createWriteStream("uploads/test.pdf")
		const file: fs.ReadStream = fs.createReadStream("uploads/print.pdf");
		// const file = "uploads/print.pdf"

		// const { size, contentType } = test?.image

		// const head = {
		//   //  "Content-Range": `bytes ${start}-${end}/${fileSize}`,
		//   "Accept-Ranges": "bytes",
		//   "Content-Length": test?.image.size,
		//   "Content-Type": test?.image.contentType,
		// }
		// res.writeHead(206, head)
		// return file.pipe(res)
		// return res.pipe(file)
		const { size } = fs.statSync("uploads/print.pdf");

		const head = {
			//  "Content-Range": `bytes ${start}-${end}/${fileSize}`,
			"Accept-Ranges": "bytes",
			"Content-Length": size,
			"Content-Type": "application/pdf",
		};
		res.writeHead(206, head);
		return file.pipe(res);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
