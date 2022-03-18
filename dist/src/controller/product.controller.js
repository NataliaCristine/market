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
exports.productAll = exports.productListOne = exports.productCreate = void 0;
const createProduct_1 = require("../services/createProduct");
const typeorm_1 = require("typeorm");
const produtc_1 = __importDefault(require("../entities/produtc"));
const productCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, createProduct_1.createProduct)(req.body);
        return res.status(201).json(product);
    }
    catch (err) {
        return next(err);
    }
});
exports.productCreate = productCreate;
const productListOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idParams = req.params.uuids;
    const productRepository = (0, typeorm_1.getRepository)(produtc_1.default);
    const product = yield productRepository.findOne({
        where: {
            uuid: idParams,
        },
    });
    return res.status(200).json(product);
});
exports.productListOne = productListOne;
const productAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = (0, typeorm_1.getRepository)(produtc_1.default);
    const product = yield productRepository.find();
    return res.status(200).json(product);
});
exports.productAll = productAll;
