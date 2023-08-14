var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const axios = require("axios");
const baseUrl = "https://live.fapshi.com";
const headers = {
    apiuser: "34b70d56-e0f8-4eff-ad0c-8fe5322d0132",
    apikey: "FAK_f19592ff48ae86049a61880afe466e41",
};
module.exports = {
    initiatePay(data) {
        return new Promise(function (resolve) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!(data === null || data === void 0 ? void 0 : data.amount))
                        resolve(error("amount required", 400));
                    if (!Number.isInteger(data.amount))
                        resolve(error("amount must be of type integer", 400));
                    if (data.amount < 100)
                        resolve(error("amount cannot be less than 100 XAF", 400));
                    const config = {
                        method: "post",
                        url: baseUrl + "/initiate-pay",
                        headers: headers,
                        data: data,
                    };
                    const response = yield axios(config);
                    response.data.statusCode = response.status;
                    resolve(response.data);
                }
                catch (e) {
                    e.response.data.statusCode = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status;
                    resolve(e.response.data);
                }
            });
        });
    },
    directPay(data) {
        return new Promise(function (resolve) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!(data === null || data === void 0 ? void 0 : data.amount))
                        resolve(error("amount required", 400));
                    if (!Number.isInteger(data.amount))
                        resolve(error("amount must be of type integer", 400));
                    if (data.amount < 100)
                        resolve(error("amount cannot be less than 100 XAF", 400));
                    if (!(data === null || data === void 0 ? void 0 : data.phone))
                        resolve(error("phone number required", 400));
                    if (typeof data.phone !== "string")
                        resolve(error("phone must be of type string", 400));
                    if (!/^6[\d]{8}$/.test(data.phone))
                        resolve(error("invalid phone number", 400));
                    const config = {
                        method: "post",
                        url: baseUrl + "/direct-pay",
                        headers: headers,
                        data: data,
                    };
                    const response = yield axios(config);
                    response.data.statusCode = response.status;
                    resolve(response.data);
                }
                catch (e) {
                    e.response.data.statusCode = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status;
                    resolve(e.response.data);
                }
            });
        });
    },
    paymentStatus(transId) {
        return new Promise(function (resolve) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!transId || typeof transId !== "string")
                        resolve(error("invalid type, string expected", 400));
                    if (!/^[a-zA-Z0-9]{8,9}$/.test(transId))
                        resolve(error("invalid transaction id", 400));
                    const config = {
                        method: "get",
                        url: baseUrl + "/payment-status/" + transId,
                        headers: headers,
                    };
                    const response = yield axios(config);
                    response.data.statusCode = response.status;
                    resolve(response.data);
                }
                catch (e) {
                    e.response.data.statusCode = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status;
                    resolve(e.response.data);
                }
            });
        });
    },
    expirePay(transId) {
        return new Promise(function (resolve) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!transId || typeof transId !== "string")
                        resolve(error("invalid type, string expected", 400));
                    if (!/^[a-zA-Z0-9]{8,9}$/.test(transId))
                        resolve(error("invalid transaction id", 400));
                    const config = {
                        method: "post",
                        url: baseUrl + "/expire-pay",
                        data: { transId },
                        headers: headers,
                    };
                    const response = yield axios(config);
                    response.data.statusCode = response.status;
                    resolve(response.data);
                }
                catch (e) {
                    e.response.data.statusCode = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status;
                    resolve(e.response.data);
                }
            });
        });
    },
    userTrans(userId) {
        return new Promise(function (resolve) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!userId || typeof userId !== "string")
                        resolve(error("invalid type, string expected", 400));
                    if (!/^[a-zA-Z0-9-_]{1,100}$/.test(userId))
                        resolve(error("invalid user id", 400));
                    const config = {
                        method: "get",
                        url: baseUrl + "/transaction/" + userId,
                        headers: headers,
                    };
                    const response = yield axios(config);
                    resolve(response.data);
                }
                catch (e) {
                    e.response.data.statusCode = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status;
                    resolve(e.response.data);
                }
            });
        });
    },
};
function error(message, statusCode) {
    return { message, statusCode };
}
//# sourceMappingURL=fapshi.js.map