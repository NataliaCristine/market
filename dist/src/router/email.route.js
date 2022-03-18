"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRouter = void 0;
const express_1 = require("express");
const email_controller_1 = require("../controller/email.controller");
const admin_authenticate_1 = require("../middlewares/admin.authenticate");
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const router = (0, express_1.Router)();
const emailRouter = () => {
    router.post("", authenticate_middleware_1.isAuthenticated, admin_authenticate_1.adminAuthenticate, email_controller_1.emailMensage);
    return router;
};
exports.emailRouter = emailRouter;
