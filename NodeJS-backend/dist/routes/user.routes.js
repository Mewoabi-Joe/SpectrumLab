"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const router = express_1.default.Router();
router.post("/register", user_controllers_1.register);
router.post("/login", user_controllers_1.login);
router.get("/get-user", user_controllers_1.getUser);
router.put("/edit-user/:userId", user_controllers_1.editUser);
router.get("/get-users", user_controllers_1.getAllUsers);
router.post("/forgot-password", user_controllers_1.sendEmailToResetPassword);
router.post("/reset-password/:userId", user_controllers_1.resetPassword);
exports.default = router;
//# sourceMappingURL=user.routes.js.map