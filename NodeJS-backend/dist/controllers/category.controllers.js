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
exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.getCategories = exports.createCategory = void 0;
const category_1 = __importDefault(require("../models/category"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, } = req.body;
        const newCategory = new category_1.default({
            name,
            description,
        });
        yield newCategory.save();
        return res
            .status(201)
            .json({ message: "Category was created Successfully", newCategory });
    }
    catch (error) {
        return res.send(error);
    }
});
exports.createCategory = createCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.default.find({});
        return res.status(200).json({ categories });
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getCategories = getCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.default.findOne({
            _id: req.params.contactId,
        });
        return res.status(200).json(category);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getCategory = getCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.default.findByIdAndUpdate({ _id: req.params.categoryId }, Object.assign({}, req.body));
        return res
            .status(200)
            .json({ message: "Category Updated Successfully", category });
    }
    catch (error) {
        return res.send(error);
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.default.findByIdAndRemove({
            _id: req.params.categoryId,
        });
        return res
            .status(200)
            .json({ message: "Category deleted Successfully", category });
    }
    catch (error) {
        return res.send(error);
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.controllers.js.map