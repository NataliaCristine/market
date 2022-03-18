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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSenha = exports.recupPass = exports.get_all_admin = exports.list_one_user = exports.login = exports.create = void 0;
const user_service_1 = require("../services/user.service");
const authenticate_service_1 = require("../services/authenticate.service");
const typeorm_1 = require("typeorm");
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const createCart_server_1 = require("../services/createCart.server");
const mailer_1 = require("../services/mailer");
const AppError_1 = __importDefault(require("../erros/AppError"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.createUser)(req.body);
        const cart = yield (0, createCart_server_1.createCart)(user.uuid);
        res.status(201).json(user);
    }
    catch (err) {
        return next(err);
    }
});
exports.create = create;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const token = yield (0, authenticate_service_1.authenticateUser)(email, password);
        if (token) {
            return res.status(200).json({ accessToken: token });
        }
        else {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
    }
    catch (err) {
        return next(err);
    }
});
exports.login = login;
const list_one_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uuid;
        const idParams = req.params.uuids;
        const userRepository = (0, typeorm_1.getCustomRepository)(userRepository_1.default);
        const users = yield userRepository.findByUUID(idParams);
        if (users) {
            const { password, recoverPass } = users, data = __rest(users, ["password", "recoverPass"]);
            return res.status(200).json(data);
        }
    }
    catch (err) {
        return next(err);
    }
});
exports.list_one_user = list_one_user;
const get_all_admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getCustomRepository)(userRepository_1.default);
    const users = yield userRepository.find();
    const usersRetorno = [];
    for (let i = 0; i < users.length; i++) {
        const _b = users[i], { password, recoverPass } = _b, data = __rest(_b, ["password", "recoverPass"]);
        usersRetorno.push(data);
    }
    return res.status(200).json(usersRetorno);
});
exports.get_all_admin = get_all_admin;
const recupPass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const codigo = yield (0, user_service_1.recoverPassword)(email);
        const message = `codigo de recuperação de senha ${codigo}`;
        const option = (0, mailer_1.mailAll)([email], "Recuperar senha", "mail", {
            mensagem: message,
        });
        mailer_1.transport.sendMail(option, function (err, info) {
            if (err) {
                return next(err);
            }
            else {
                console.log(info);
                return res.status(200).json({ messagem: "Send email" });
            }
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.recupPass = recupPass;
const updateSenha = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codigo, password } = req.body;
        const user = yield (0, user_service_1.updateSenhaCodidoEmail)(codigo, password);
        if (!user) {
            return next(new AppError_1.default("No permissions", 401));
        }
        else {
            const { password, recoverPass } = user, data = __rest(user, ["password", "recoverPass"]);
            return res.status(200).json(data);
        }
    }
    catch (err) {
        return next(err);
    }
});
exports.updateSenha = updateSenha;
