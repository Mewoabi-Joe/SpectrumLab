"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_middleware_1 = __importDefault(require("../middleware/file.middleware"));
const posts_controllers_1 = require("../controllers/posts.controllers");
const router = express_1.default.Router();
router.post("/posts", file_middleware_1.default.single("image"), posts_controllers_1.createPost);
router.get("/posts", posts_controllers_1.getAllPosts);
router.get("/posts/:id", posts_controllers_1.getPostById);
router.get("/post/image/:id", posts_controllers_1.getPostImage);
router.delete("/posts/:id", posts_controllers_1.deletePost);
exports.default = router;
//# sourceMappingURL=posts.routes.js.map