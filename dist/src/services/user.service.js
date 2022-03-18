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
exports.updateSenhaCodidoEmail = exports.recoverPassword = exports.createUser = void 0;
const typeorm_1 = require("typeorm");
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const entities_1 = require("../entities");
const AppError_1 = __importDefault(require("../erros/AppError"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, isAdmin } = body;
    try {
        const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
        const user = userRepository.create({
            name,
            email,
            password,
            isAdmin,
        });
        yield userRepository.save(user);
        return user;
    }
    catch (error) {
        throw new AppError_1.default("E-mail already registered", 409);
    }
});
exports.createUser = createUser;
const recoverPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getCustomRepository)(userRepository_1.default);
    const user = yield userRepository.findByEmail(email);
    const codigo = { recoverPass: (0, uuid_1.v4)() };
    yield userRepository.save(Object.assign(Object.assign({}, user), codigo));
    return codigo.recoverPass;
});
exports.recoverPassword = recoverPassword;
const updateSenhaCodidoEmail = (codigo, pass) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    const user = yield userRepository.findOne({
        where: {
            recoverPass: codigo,
        },
    });
    if (user) {
        const data = {
            recoverPass: " ",
            password: bcrypt_1.default.hashSync(pass, 6),
        };
        yield userRepository.update(user.uuid, data);
        const userUpdate = yield userRepository.findOne(user.uuid);
        return userUpdate;
    }
    else {
        return undefined;
    }
});
exports.updateSenhaCodidoEmail = updateSenhaCodidoEmail;
