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
exports.resetPassword = exports.sendEmailToResetPassword = exports.editUser = exports.getAllUsers = exports.getUserById = exports.getUser = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const regEx_1 = require("../utils/regEx");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = [];
        const userEmail = yield user_1.default.findOne({ email: req.body.email });
        const userNumber = yield user_1.default.findOne({ phoneNo: req.body.phoneNo });
        const validEmail = (0, regEx_1.validateEmail)(req.body.email);
        if (validEmail === null) {
            errors.push({
                email: "Enter a valid email address",
            });
        }
        else {
            if (userEmail) {
                errors.push({
                    email: "A user with this Email already exist. Use a different Email Address",
                });
            }
        }
        if (req.body.firstName.length < 2) {
            errors.push({
                firstName: "First name should be longer than 2 letters",
            });
        }
        if (req.body.lastName.length < 2) {
            errors.push({
                lastName: "Last name should be longer than 2 letters",
            });
        }
        if (!/^6[\d]{8}$/.test(req.body.phoneNo)) {
            errors.push({
                phoneNo: "Invalid Phone Number",
            });
        }
        else {
            if (userNumber) {
                errors.push({
                    phoneNo: "A user with this number already exist. Use a different Phone Number",
                });
            }
        }
        if (req.body.password.length < 4) {
            errors.push({
                password: "Password is too short. Enter a password with atleast 4 characters",
            });
        }
        if (req.body.dateOfBirth === "") {
            errors.push({
                dateOfBirth: "Date of bith is required",
            });
        }
        if (errors.length === 0) {
            const newUser = new user_1.default({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt_1.default.hashSync(req.body.password, 10),
                phoneNo: req.body.phoneNo && req.body.phoneNo,
                dateOfBirth: req.body.dateOfBirth && req.body.dateOfBirth,
                admin: req.body.admin ? req.body.admin : false,
            });
            yield newUser.save();
            return res.status(201).json({
                user: {
                    userId: newUser._id,
                    firstName: newUser.firstName,
                    email: newUser.email,
                    phoneNo: newUser.phoneNo && newUser.phoneNo,
                },
            });
        }
        else {
            return res.status(400).json(errors);
        }
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({
            email: req.body.email,
        });
        console.log(user);
        if (user) {
            const userExist = yield bcrypt_1.default.compare(req.body.password, user.password);
            if (userExist) {
                const token = jsonwebtoken_1.default.sign({
                    userId: user._id,
                    email: user.email,
                }, "secret", {
                    expiresIn: "7d",
                });
                return res.status(200).json({
                    user: {
                        userId: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        admin: user.admin,
                    },
                    token,
                });
            }
            return res.status(401).send("Your password is not correct");
        }
        return res.status(401).send("Your email is not correct");
    }
    catch (error) {
        return res.send(error);
    }
});
exports.login = login;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        const authorization = req.headers.authorization.split(" ")[1];
        jsonwebtoken_1.default.verify(authorization, "secret", (err, foundUser) => {
            if (err) {
                return res.sendStatus(403);
            }
            user_1.default.findOne({ _id: foundUser.userId })
                .then(user => {
                if (user) {
                    const currentUser = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        dateOfBirth: user.dateOfBirth,
                        phoneNo: user.phoneNo,
                        admin: user.admin,
                        userId: user._id,
                    };
                    return res.status(200).json(currentUser);
                }
                return res.sendStatus(404);
            })
                .catch(err => {
                return console.log(err);
            });
            return;
        });
    }
    else {
        res.sendStatus(401);
    }
});
exports.getUser = getUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = user_1.default.findOne({ _id: req.params.id });
    }
    catch (error) { }
});
exports.getUserById = getUserById;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({});
        const response = users.map(user => {
            console.log(user);
            const { firstName, lastName, email, dateOfBirth, phoneNo, _id, admin } = user;
            return { _id, firstName, lastName, email, dateOfBirth, phoneNo, admin };
        });
        console.log(response);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getAllUsers = getAllUsers;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = [];
        const user = yield user_1.default.findOne({ _id: req.params.userId });
        const validEmail = (0, regEx_1.validateEmail)(req.body.email);
        if (validEmail === null) {
            errors.push({
                email: "Enter a valid email address",
            });
        }
        if (req.body.firstName.length < 2) {
            errors.push({
                firstName: "First name should be longer than 2 letters",
            });
        }
        if (req.body.lastName.length < 2) {
            errors.push({
                lastName: "Last name should be longer than 2 letters",
            });
        }
        if (!/^6[\d]{8}$/.test(req.body.phoneNo)) {
            errors.push({
                phoneNo: "Invalid Phone Number",
            });
        }
        const passwordMatch = yield bcrypt_1.default.compare(req.body.oldPassword, user.password);
        if (req.body.oldPassword !== "") {
            if (!passwordMatch) {
                errors.push({
                    oldPassword: "Current password entered is not correct",
                });
            }
        }
        if (req.body.password !== "")
            if (req.body.password.length < 4) {
                errors.push({
                    password: "Password is too short. Enter a password with atleast 4 characters",
                });
            }
        if (req.body.dateOfBirth === "") {
            errors.push({
                dateOfBirth: "Date of bith is required",
            });
        }
        if (errors.length === 0) {
            yield user_1.default.findByIdAndUpdate({ _id: req.params.userId }, Object.assign(Object.assign({}, req.body), { password: req.body.password !== ""
                    ? bcrypt_1.default.hashSync(req.body.password, 10)
                    : user === null || user === void 0 ? void 0 : user.password }));
            const updatedUser = yield user_1.default.findOne({ _id: req.params.userId });
            const token = jsonwebtoken_1.default.sign({
                userId: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser._id,
                email: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email,
            }, "secret", {
                expiresIn: "7d",
            });
            return res.status(201).json({
                token,
            });
        }
        else {
            return res.status(400).json(errors);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
exports.editUser = editUser;
const sendEmailToResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { _id } = (yield user_1.default.findOne({ email }));
    const transporter = nodemailer_1.default.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: "enspygi2023@gmail.com",
            pass: process.env.RANDOM,
        },
        secure: true,
    });
    const mailData = {
        from: "enspygi2023@gmail.com",
        to: email,
        subject: "Reset Your Password",
        text: "Click on the link below to reset your password",
        html: `<p>Click on the link below to reset your password</p><a href=http://localhost:4200/reset-password/${_id}> Reset my password</a>`,
    };
    try {
        const info = yield transporter.sendMail(mailData);
        console.log(info);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendEmailToResetPassword = sendEmailToResetPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.findByIdAndUpdate({ _id: req.params.userId }, { password: bcrypt_1.default.hashSync(req.body.newPassword, 10) });
    }
    catch (error) {
        console.log(error);
    }
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=user.controllers.js.map