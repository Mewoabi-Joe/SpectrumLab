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
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const test_routes_1 = __importDefault(require("./routes/test.routes"));
const payment_routes_1 = __importDefault(require("./payment/payment.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const rendezvous_routes_1 = __importDefault(require("./routes/rendezvous.routes"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
const PORT = process.env.PORT;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "mongodb+srv://leontiusmewoabi:b2c5EAoVpr9ckgGT@cluster0.nxy2ljt.mongodb.net/?retryWrites=true&w=majority";
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    mongoose
        .connect(url, connectionParams)
        .then(() => {
        console.log("Connected to the database ");
    })
        .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    });
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/auth", user_routes_1.default);
    app.use("", category_routes_1.default);
    app.use("", test_routes_1.default);
    app.use("/payment", payment_routes_1.default);
    app.use("", rendezvous_routes_1.default);
    app.use("", message_routes_1.default);
    app.use("", posts_routes_1.default);
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Server running on port ${process.env.PORT || 8080}`);
    });
});
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map