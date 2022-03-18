"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const admin_permission_1 = require("../middlewares/admin.permission");
const admin_authenticate_1 = require("../middlewares/admin.authenticate");
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const router = (0, express_1.Router)();
const userRouter = () => {
    router.post("", user_controller_1.create);
    router.get("/:uuids", authenticate_middleware_1.isAuthenticated, admin_permission_1.adminPermission, user_controller_1.list_one_user);
    router.get("", authenticate_middleware_1.isAuthenticated, admin_authenticate_1.adminAuthenticate, user_controller_1.get_all_admin);
    return router;
};
exports.userRouter = userRouter;
