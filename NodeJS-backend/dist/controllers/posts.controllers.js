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
exports.deletePost = exports.getPostById = exports.getAllPosts = exports.createPost = void 0;
const posts_1 = __importDefault(require("../models/posts"));
const regEx_1 = require("../utils/regEx");
const { Readable } = require("stream");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date();
        let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        const errors = [];
        if (!req.body.imagePath && req.body.youtubeVideoUrl === "") {
            errors.push({
                image: "A Post should have an image or Link to a youtube video",
            });
        }
        if (req.file && req.body.youtubeVideoUrl !== "") {
            errors.push({
                video: "A Post should either have an image or Link to a youtube video but not both",
            });
        }
        if (req.body.title === "") {
            errors.push({
                title: "Title is required",
            });
        }
        if (req.body.description === "") {
            errors.push({
                description: "Description is required",
            });
        }
        if (req.body.youtubeVideoUrl !== "") {
            if (!(0, regEx_1.validateYouTubeURL)(req.body.youtubeVideoUrl)) {
                errors.push({
                    url: "Youtube link is not correct",
                });
            }
        }
        if (errors.length === 0) {
            const youtubeDomain = req.body.youtubeVideoUrl.split("watch")[0];
            const videoId = req.body.youtubeVideoUrl.split("=")[1];
            const link = `${youtubeDomain}embed/${videoId}`;
            const newPost = new posts_1.default();
            newPost.type = JSON.parse(req.body.tags);
            newPost.title = req.body.title;
            newPost.description = req.body.description;
            newPost.youtubeVideoUrl = link;
            newPost.created_at = today;
            newPost.imagePath = req.body.imagePath;
            yield newPost.save();
            return res.status(200).json({ message: "Post created successfully", newPost });
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
exports.createPost = createPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const temp = yield posts_1.default.find({});
        const posts = temp.map((test) => {
            const { _id, title, description, type, imagePath, youtubeVideoUrl, created_at } = test;
            return {
                _id,
                title,
                description,
                type,
                youtubeVideoUrl,
                imagePath,
                created_at,
            };
        });
        return res.status(200).json({ posts });
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getAllPosts = getAllPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield posts_1.default.findOne({
            _id: req.params.id,
        });
        return res.status(200).json(post);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getPostById = getPostById;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield posts_1.default.findByIdAndRemove({
            _id: req.params.id,
        });
        return res.status(200).json({ info: "Post deleted Successfully", post });
    }
    catch (error) {
        return res.send(error);
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=posts.controllers.js.map