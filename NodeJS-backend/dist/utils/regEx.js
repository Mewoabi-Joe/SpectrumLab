"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateYouTubeURL = exports.validateEmail = void 0;
const validateEmail = (email) => {
    return email
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
exports.validateEmail = validateEmail;
const validateYouTubeURL = (email) => {
    return email
        .toLowerCase()
        .match(/(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/);
};
exports.validateYouTubeURL = validateYouTubeURL;
//# sourceMappingURL=regEx.js.map