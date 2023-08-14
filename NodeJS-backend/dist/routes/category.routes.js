"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controllers_1 = require("../controllers/category.controllers");
const router = express_1.default.Router();
router.get("/categories", category_controllers_1.getCategories);
router.get("/category/:categoryId", category_controllers_1.getCategory);
router.post("/categories", category_controllers_1.createCategory);
router.delete("/category/delete/:categoryId", category_controllers_1.deleteCategory);
router.put("/category/:categoryId", category_controllers_1.updateCategory);
exports.default = router;
//# sourceMappingURL=category.routes.js.map