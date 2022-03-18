"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const router = (0, express_1.Router)();
const loginRouter = () => {
    router.post("", user_controller_1.login);
    return router;
};
exports.loginRouter = loginRouter;
