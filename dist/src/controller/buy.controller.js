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
exports.getOneBy = exports.getAllBuy = exports.createBuy = void 0;
const buy_service_1 = require("../services/buy.service");
const AppError_1 = __importDefault(require("../erros/AppError"));
const mailer_1 = require("../services/mailer");
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../entities/User"));
const createBuy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uuid;
    if (userId) {
        const addBuy = yield (0, buy_service_1.addCartBuy)(userId);
        const options = (0, mailer_1.emailGlobal)([addBuy.user.email], "Compras Efetuadas", "Compras", {
            titleEmail: addBuy.user.name,
            corpo: addBuy.product,
        });
        mailer_1.transport.sendMail(options, function (err, info) {
            if (err) {
                return next(err);
            }
            else {
                console.log(info);
            }
        });
        return res.status(201).json(addBuy);
    }
});
exports.createBuy = createBuy;
const getAllBuy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const buys = yield (0, buy_service_1.getBuy)();
    return res.status(200).json(buys);
});
exports.getAllBuy = getAllBuy;
const getOneBy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.uuid;
    const buyId = req.params.uuids;
    const userRepository = (0, typeorm_1.getRepository)(User_1.default);
    const user = yield userRepository.findOne(userId);
    const buy = yield (0, buy_service_1.getOne)(buyId);
    if (!buy) {
        return next(new AppError_1.default("Not found", 404));
    }
    if ((buy === null || buy === void 0 ? void 0 : buy.user.uuid) !== userId && !(user === null || user === void 0 ? void 0 : user.isAdmin)) {
        return next(new AppError_1.default("Missing admin permissions", 401));
    }
    else
        return res.status(200).json(buy);
});
exports.getOneBy = getOneBy;
