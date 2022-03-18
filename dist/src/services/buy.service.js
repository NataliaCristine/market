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
exports.getOne = exports.getBuy = exports.addCartBuy = void 0;
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../entities/User"));
const cart_1 = __importDefault(require("../entities/cart"));
const buy_1 = __importDefault(require("../entities/buy"));
const addCartBuy = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(User_1.default);
    const user = yield userRepository.findOne(userId);
    const cartRepository = (0, typeorm_1.getRepository)(cart_1.default);
    const cart = yield cartRepository.findOne({
        where: {
            user: user,
        },
        relations: ["product"],
    });
    const buyRepository = (0, typeorm_1.getRepository)(buy_1.default);
    const buy = yield buyRepository.create({
        user: user,
        product: cart === null || cart === void 0 ? void 0 : cart.product,
    });
    yield buyRepository.save(buy);
    if (cart) {
        cart.product = [];
        yield cartRepository.save(cart);
    }
    return buy;
});
exports.addCartBuy = addCartBuy;
const getBuy = () => __awaiter(void 0, void 0, void 0, function* () {
    const buyRepository = (0, typeorm_1.getRepository)(buy_1.default);
    const buys = yield buyRepository.find({ relations: ["product", "user"] });
    const output = [];
    for (let i = 0; i < buys.length; i++) {
        let objeto = {
            uuid_buy: buys[i].uuid,
            user: buys[i].user,
            product: buys[i].product,
        };
        output.push(objeto);
    }
    return output;
});
exports.getBuy = getBuy;
const getOne = (buyId) => __awaiter(void 0, void 0, void 0, function* () {
    const buyRepository = (0, typeorm_1.getRepository)(buy_1.default);
    const buy = yield buyRepository.findOne(buyId, {
        relations: ["product", "user"],
    });
    if (buy) {
        const output = { uuid_buy: buy.uuid, user: buy.user, product: buy.product };
    }
    return buy;
});
exports.getOne = getOne;
