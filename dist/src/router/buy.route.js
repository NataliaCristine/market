"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyRouter = void 0;
const express_1 = require("express");
const buy_controller_1 = require("../controller/buy.controller");
const admin_authenticate_1 = require("../middlewares/admin.authenticate");
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const router = (0, express_1.Router)();
const buyRouter = () => {
    router.post("", authenticate_middleware_1.isAuthenticated, buy_controller_1.createBuy);
    router.get("/:uuids", authenticate_middleware_1.isAuthenticated, buy_controller_1.getOneBy);
    router.get("", authenticate_middleware_1.isAuthenticated, admin_authenticate_1.adminAuthenticate, buy_controller_1.getAllBuy);
    return router;
};
exports.buyRouter = buyRouter;
