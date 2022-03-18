"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const cart_controller_1 = require("../controller/cart.controller");
const admin_authenticate_1 = require("../middlewares/admin.authenticate");
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const router = (0, express_1.Router)();
const cartRouter = () => {
    router.post("", authenticate_middleware_1.isAuthenticated, cart_controller_1.productCart);
    router.get("/:uuids", authenticate_middleware_1.isAuthenticated, cart_controller_1.cartOne);
    router.get("", authenticate_middleware_1.isAuthenticated, admin_authenticate_1.adminAuthenticate, cart_controller_1.allCart);
    router.delete("/:uuids", authenticate_middleware_1.isAuthenticated, cart_controller_1.cartProductDelete);
    return router;
};
exports.cartRouter = cartRouter;
