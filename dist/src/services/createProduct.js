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
exports.createProduct = void 0;
const typeorm_1 = require("typeorm");
const produtc_1 = __importDefault(require("../entities/produtc"));
const createProduct = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price } = body;
    const productRepository = (0, typeorm_1.getRepository)(produtc_1.default);
    const product = productRepository.create({
        name,
        price,
    });
    yield productRepository.save(product);
    return product;
});
exports.createProduct = createProduct;
