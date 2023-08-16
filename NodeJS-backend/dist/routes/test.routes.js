"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_middleware_1 = __importDefault(require("../middleware/file.middleware"));
const test_controllers_1 = require("../controllers/test.controllers");
const router = express_1.default.Router();
router.get("/test", test_controllers_1.getAllTest);
router.get("/test/:testId", test_controllers_1.getOneTest);
router.get("/test/download/pdf", test_controllers_1.downloadImage);
router.get("/test/stream/pdf", test_controllers_1.streamPdf);
router.post("/test", file_middleware_1.default.single("image"), test_controllers_1.createNewLabTest);
router.get("/test/:categoryId", test_controllers_1.getTestByCat);
router.put("/test/:testId", file_middleware_1.default.single("image"), test_controllers_1.updateLabTest);
router.delete("/test/delete/:testId", test_controllers_1.deleteTest);
exports.default = router;
//# sourceMappingURL=test.routes.js.map