"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamPdf = exports.downloadImage = exports.deleteTest = exports.getOneTest = exports.getAllTest = exports.getTestByCat = exports.updateLabTest = exports.createNewLabTest = void 0;
const test_1 = __importDefault(require("../models/test"));
const fs_1 = __importDefault(require("fs"));
const { Readable } = require("stream");
const createNewLabTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const newTest = new test_1.default();
            newTest.tags = JSON.parse(req.body.tags);
            newTest.name = req.body.name;
            newTest.description = req.body.description;
            newTest.price = req.body.price;
            newTest.imagePath = req.body.imagePath;
            yield newTest.save();
            return res.status(200).json({ message: "Test created successfully", newTest });
        }
        else {
            return res.status(400).json(errors);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
exports.createNewLabTest = createNewLabTest;
const updateLabTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            updatedTest = yield test_1.default.findByIdAndUpdate({ _id: req.params.testId }, Object.assign(Object.assign({}, req.body), { tags: JSON.parse(req.body.tags) }));
            const test = yield test_1.default.findOne({ _id: req.params.testId });
            return res.status(200).json({ message: "Test updated Successfully", test });
        }
        else {
            return res.status(400).json(errors);
        }
    }
    catch (error) {
        return res.send(error);
    }
});
exports.updateLabTest = updateLabTest;
const getTestByCat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tests = yield test_1.default.find({ categoryId: req.params.categoryId });
        return res.status(200).json(tests);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getTestByCat = getTestByCat;
const getAllTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tests = yield test_1.default.find({});
        const response = tests.map((test) => {
            const { _id, name, description, price, tags, imagePath } = test;
            return { _id, name, description, price, tags, imagePath };
        });
        return res.status(200).json(response);
    }
    catch (error) {
        return res.json(error);
    }
});
exports.getAllTest = getAllTest;
const getOneTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield test_1.default.findOne({ _id: req.params.testId });
        const { _id, name, description, price, tags, imagePath } = test;
        return res.status(200).json({ _id, name, description, price, tags, imagePath });
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getOneTest = getOneTest;
const deleteTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield test_1.default.findByIdAndRemove({ _id: req.params.testId });
        return res.status(200).json(test);
    }
    catch (error) {
        return res.send(error.message);
    }
});
exports.deleteTest = deleteTest;
const downloadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = "uploads/print.pdf";
        return res.download(file);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.downloadImage = downloadImage;
const streamPdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = fs_1.default.createReadStream("uploads/print.pdf");
        const { size } = fs_1.default.statSync("uploads/print.pdf");
        const head = {
            "Accept-Ranges": "bytes",
            "Content-Length": size,
            "Content-Type": "application/pdf",
        };
        res.writeHead(206, head);
        return file.pipe(res);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.streamPdf = streamPdf;
//# sourceMappingURL=test.controllers.js.map