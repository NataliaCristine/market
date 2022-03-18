"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recupPassRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const router = (0, express_1.Router)();
const recupPassRouter = () => {
    router.post("", user_controller_1.recupPass);
    return router;
};
exports.recupPassRouter = recupPassRouter;
