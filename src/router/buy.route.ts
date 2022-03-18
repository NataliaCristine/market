import { Router } from "express";
import { createBuy, getAllBuy, getOneBy } from "../controller/buy.controller";
import { adminPermission } from "../middlewares/admin.permission";
import { adminAuthenticate } from "../middlewares/admin.authenticate";
import { isAuthenticated } from "../middlewares/authenticate.middleware";

const router = Router();

export const buyRouter = () => {
  router.post("", isAuthenticated, createBuy);
  router.get("/:uuids", isAuthenticated, getOneBy);
  router.get("", isAuthenticated, adminAuthenticate, getAllBuy);

  return router;
};
