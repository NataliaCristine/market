"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_controller_1 = require("../controller/product.controller");
const admin_permission_1 = require("../middlewares/admin.permission");
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const router = (0, express_1.Router)();
const productRouter = () => {
    router.post("", authenticate_middleware_1.isAuthenticated, admin_permission_1.adminPermission, product_controller_1.productCreate);
    router.get("/:uuids", authenticate_middleware_1.isAuthenticated, product_controller_1.productListOne);
    router.get("", authenticate_middleware_1.isAuthenticated, product_controller_1.productAll);
    return router;
};
exports.productRouter = productRouter;
