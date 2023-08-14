"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rendezvous_controllers_1 = require("../controllers/rendezvous.controllers");
const router = express_1.default.Router();
router.post("/rendezvous", rendezvous_controllers_1.createRDV);
router.get("/rendezvous", rendezvous_controllers_1.getRDVs);
router.get("/rendezvous/:userId", rendezvous_controllers_1.getRDVsByUser);
router.put("/rendezvous/:id", rendezvous_controllers_1.updateRDV);
exports.default = router;
//# sourceMappingURL=rendezvous.routes.js.map