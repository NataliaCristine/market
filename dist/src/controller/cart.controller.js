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
exports.cartProductDelete = exports.allCart = exports.cartOne = exports.productCart = void 0;
const typeorm_1 = require("typeorm");
const createCart_server_1 = require("../services/createCart.server");
const produtc_1 = __importDefault(require("../entities/produtc"));
const AppError_1 = __importDefault(require("../erros/AppError"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const productCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uuid;
    const { product_uuid } = req.body;
    const productRepository = (0, typeorm_1.getRepository)(produtc_1.default);
    const product = yield productRepository.findOne({
        where: {
            uuid: product_uuid,
        },
    });
    const addProduct = yield (0, createCart_server_1.addProductCart)(product, userId);
    return res.status(200).json(addProduct);
});
exports.productCart = productCart;
const cartOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.uuid;
    const cartId = req.params.uuids;
    const cart = yield (0, createCart_server_1.oneCart)(cartId);
    const userRepository = (0, typeorm_1.getCustomRepository)(userRepository_1.default);
    const users = yield userRepository.findByUUID(userId);
    if ((cart === null || cart === void 0 ? void 0 : cart.user.uuid) !== userId && !(users === null || users === void 0 ? void 0 : users.isAdmin)) {
        return next(new AppError_1.default("Missing admin permissions", 401));
    }
    return res.status(200).json(cart);
});
exports.cartOne = cartOne;
const allCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield (0, createCart_server_1.cartAll)();
    return res.status(200).json(carts);
});
exports.allCart = allCart;
const cartProductDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const product = req.params.uuids;
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.uuid;
        const deleteProduct = yield (0, createCart_server_1.deleteProductCart)(userId, product);
        return res.status(204).json({});
    }
    catch (err) {
        return next(err);
    }
});
exports.cartProductDelete = cartProductDelete;
