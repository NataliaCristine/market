"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = __importDefault(require("../erros/AppError"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError_1.default) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.log(err);
    return res.status(500).json({ status: "error", message: "interal" });
};
exports.errorHandler = errorHandler;
