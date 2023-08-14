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
exports.getRDVsByUser = exports.getRDVs = exports.updateRDV = exports.createRDV = void 0;
const enums_1 = require("../utils/enums");
const rendezvous_1 = __importDefault(require("../models/rendezvous"));
const createRDV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    let bookedOn = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    try {
        const { userId, externalId: testId, } = req.body;
        const rendevzvous = new rendezvous_1.default();
        rendevzvous.userId = userId;
        rendevzvous.testId = testId;
        rendevzvous.state = enums_1.RendezvousStateEnum.PENDING;
        rendevzvous.bookedOn = bookedOn;
        rendevzvous.save();
        return res.status(200).json(rendevzvous);
    }
    catch (error) {
        return res.status(404).json(error.message);
    }
});
exports.createRDV = createRDV;
const updateRDV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { state } = req.body;
        const date = new Date();
        let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        if (state === "DONE") {
            yield rendezvous_1.default.findByIdAndUpdate({ _id: req.params.id }, {
                state: enums_1.RendezvousStateEnum[state],
                doneOn: today,
            });
        }
        else if (state === "RESULTS_OUT") {
            yield rendezvous_1.default.findByIdAndUpdate({ _id: req.params.id }, {
                state: enums_1.RendezvousStateEnum[state],
                resultsOutOn: today,
            });
        }
        else {
            yield rendezvous_1.default.findByIdAndUpdate({ _id: req.params.id }, {
                state: enums_1.RendezvousStateEnum[state],
            });
        }
        const rendevzvous = yield rendezvous_1.default.findOne({ _id: req.params.id });
        return res.status(200).json(rendevzvous);
    }
    catch (error) {
        return res.status(404).json(error);
    }
});
exports.updateRDV = updateRDV;
const getRDVs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rendezvous = yield rendezvous_1.default.find({});
        return res.status(200).json(rendezvous);
    }
    catch (error) {
        return res.status(404).json(error);
    }
});
exports.getRDVs = getRDVs;
const getRDVsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rendevzvous = yield rendezvous_1.default.find({ userId: req.params.userId });
        return res.status(200).json(rendevzvous);
    }
    catch (error) {
        return res.status(404).json(error);
    }
});
exports.getRDVsByUser = getRDVsByUser;
//# sourceMappingURL=rendezvous.controllers.js.map