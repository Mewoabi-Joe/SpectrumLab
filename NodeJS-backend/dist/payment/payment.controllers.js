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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTrans = exports.expirePay = exports.getStatus = exports.paymentStatus = exports.directPay = exports.initiatePay = void 0;
const rendezvous_controllers_1 = require("../controllers/rendezvous.controllers");
const fapshi = require("./fapshi");
const initiatePay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fapshi.initiatePay(req.body);
    console.log(resp);
    return res.status(200).json(resp);
});
exports.initiatePay = initiatePay;
const directPay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fapshi.directPay(req.body);
    console.log(resp);
    return res.status(200).json(resp);
});
exports.directPay = directPay;
const paymentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fapshi.paymentStatus(req.body.transId);
    console.log(resp);
    return res.status(200).json(resp);
});
exports.paymentStatus = paymentStatus;
const getStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield fapshi.paymentStatus(req.body.transId);
    if (event.statusCode !== 200)
        return res.status(400).send({ message: event.message });
    switch (event.status) {
        case "SUCCESSFUL":
            console.log(event, "successful");
            (0, rendezvous_controllers_1.createRDV)(req, res);
            break;
        case "FAILED":
            console.log(event, "failed");
            break;
        case "EXPIRED":
            console.log(event, "expired");
            break;
        default:
            console.log(`Unhandled event status: ${event.type}`);
    }
    return res.send();
});
exports.getStatus = getStatus;
const expirePay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fapshi.expirePay(req.body.transId);
    console.log(resp);
    return res.status(200).json(resp);
});
exports.expirePay = expirePay;
const useTrans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fapshi.expirePay(req.body.userId);
    console.log(resp);
    return res.status(200).json(resp);
});
exports.useTrans = useTrans;
//# sourceMappingURL=payment.controllers.js.map