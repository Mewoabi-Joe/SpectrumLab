"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messaging_controllers_1 = require("../controllers/messaging.controllers");
const router = express_1.default.Router();
router.post("/messages", messaging_controllers_1.sendMessage);
router.get("/messages", messaging_controllers_1.getAllMessages);
router.get("/messages/:userId", messaging_controllers_1.getMessageByUser);
router.delete("/messages/:messageId", messaging_controllers_1.deleteMessage);
exports.default = router;
//# sourceMappingURL=message.routes.js.map