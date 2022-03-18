import { Router } from "express";
import {
  productCart,
  cartOne,
  allCart,
  cartProductDelete,
} from "../controller/cart.controller";
import { adminPermission } from "../middlewares/admin.permission";
import { adminAuthenticate } from "../middlewares/admin.authenticate";
import { isAuthenticated } from "../middlewares/authenticate.middleware";

const router = Router();

export const cartRouter = () => {
  router.post("", isAuthenticated, productCart);
  router.get("/:uuids", isAuthenticated, cartOne);
  router.get("", isAuthenticated, adminAuthenticate, allCart);
  router.delete("/:uuids", isAuthenticated, cartProductDelete);

  return router;
};
