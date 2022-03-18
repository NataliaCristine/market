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
exports.adminPermission = void 0;
const AppError_1 = __importDefault(require("../erros/AppError"));
const typeorm_1 = require("typeorm");
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const adminPermission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uuid;
    if (!userId) {
        return next(new AppError_1.default("Not found", 404));
    }
    const uuid = req.params.uuids;
    const userRepository = (0, typeorm_1.getCustomRepository)(userRepository_1.default);
    const user = yield userRepository.findByUUID(userId);
    if (userId !== uuid && !(user === null || user === void 0 ? void 0 : user.isAdmin)) {
        return next(new AppError_1.default("Missing admin permissions", 401));
    }
    next();
});
exports.adminPermission = adminPermission;
