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
exports.deleteProductCart = exports.cartAll = exports.oneCart = exports.addProductCart = exports.createCart = void 0;
const typeorm_1 = require("typeorm");
const cart_1 = __importDefault(require("../entities/cart"));
const User_1 = __importDefault(require("../entities/User"));
const createCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cartRepository = (0, typeorm_1.getRepository)(cart_1.default);
    const userRepository = (0, typeorm_1.getRepository)(User_1.default);
    const user = yield userRepository.findOne(userId);
    const cart = cartRepository.create({
        user: user,
    });
    yield cartRepository.save(cart);
    return cart;
});
exports.createCart = createCart;
const addProductCart = (body, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(User_1.default);
    const user = yield userRepository.findOne(userId);
    const cartRepository = (0, typeorm_1.getRepository)(cart_1.default);
    const cart = yield cartRepository.findOne({
        where: {
            user: user,
        },
        relations: ["product", "user"],
    });
    if (cart) {
        if (!cart.product) {
            cart.product = [];
        }
        cart.product.push(body);
        return yield cartRepository.save(cart);
    }
});
exports.addProductCart = addProductCart;
const oneCart = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    const cartRepository = (0, typeorm_1.getRepository)(cart_1.default);
    const cart = yield cartRepository.findOne(cartId, {
        relations: ["product", "user"],
    });
    return cart;
});
exports.oneCart = oneCart;
const cartAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const cartRepository = (0, typeorm_1.getRepository)(cart_1.default);
    const cart = yield cartRepository.find({ relations: ["product", "user"] });
    return cart;
});
exports.cartAll = cartAll;
const deleteProductCart = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(User_1.default);
    const user = yield userRepository.findOne(userId);
    const cartRepository = (0, typeorm_1.getRepository)(cart_1.default);
    const cart = yield cartRepository.findOne({
        where: {
            user: user,
        },
        relations: ["product", "user"],
    });
    console.log("antes de deletar");
    console.log(cart);
    if (cart) {
        cart.product = cart === null || cart === void 0 ? void 0 : cart.product.filter((prod) => prod.uuid !== productId);
        console.log("depois");
        console.log(cart);
        return yield cartRepository.save(cart);
    }
});
exports.deleteProductCart = deleteProductCart;
