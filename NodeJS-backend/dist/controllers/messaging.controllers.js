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
exports.deleteMessage = exports.getMessageByUser = exports.getAllMessages = exports.sendMessage = void 0;
const message_1 = __importDefault(require("../models/message"));
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date();
        let createdOn = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        const message = new message_1.default(Object.assign(Object.assign({}, req.body), { createdOn }));
        yield message.save();
        return res.status(201).json({ message });
    }
    catch (error) {
        return res.send(error);
    }
});
exports.sendMessage = sendMessage;
const getAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield message_1.default.find({});
        return res.status(200).json({ messages });
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getAllMessages = getAllMessages;
const getMessageByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield message_1.default.findOne({
            _id: req.params.userId,
        });
        return res.status(200).json(message);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getMessageByUser = getMessageByUser;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield message_1.default.findByIdAndRemove({
            _id: req.params.messageId,
        });
        return res
            .status(200)
            .json({ info: "Message deleted Successfully", message });
    }
    catch (error) {
        return res.send(error);
    }
});
exports.deleteMessage = deleteMessage;
//# sourceMappingURL=messaging.controllers.js.map