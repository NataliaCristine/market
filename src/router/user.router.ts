import { Router } from "express";
import {
  create,
  list_one_user,
  get_all_admin,
} from "../controller/user.controller";
import { adminPermission } from "../middlewares/admin.permission";
import { adminAuthenticate } from "../middlewares/admin.authenticate";
import { isAuthenticated } from "../middlewares/authenticate.middleware";

const router = Router();

export const userRouter = () => {
  router.post("", create);
  router.get("/:uuids", isAuthenticated, adminPermission, list_one_user);
  router.get("", isAuthenticated, adminAuthenticate, get_all_admin);

  return router;
};
