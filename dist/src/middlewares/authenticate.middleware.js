"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../erros/AppError"));
const isAuthenticated = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return next(new AppError_1.default("Missing authorization headers", 401));
        }
        const userId = decoded.uuid;
        req.user = { uuid: userId };
        next();
    });
};
exports.isAuthenticated = isAuthenticated;
