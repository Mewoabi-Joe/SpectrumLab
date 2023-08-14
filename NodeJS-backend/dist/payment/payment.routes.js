"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controllers_1 = require("./payment.controllers");
const router = express_1.default.Router();
router.post("/initiate_pay", payment_controllers_1.initiatePay);
router.post("/direct_pay", payment_controllers_1.directPay);
router.post("/payment_status", payment_controllers_1.paymentStatus);
router.post("/expire_pay", payment_controllers_1.expirePay);
router.post("/use_trans", payment_controllers_1.useTrans);
router.post("/fapshi-webhook", payment_controllers_1.getStatus);
exports.default = router;
//# sourceMappingURL=payment.routes.js.map