import { Router } from "express";
import {
  productCreate,
  productListOne,
  productAll,
} from "../controller/product.controller";
import { adminPermission } from "../middlewares/admin.permission";
import { adminAuthenticate } from "../middlewares/admin.authenticate";
import { isAuthenticated } from "../middlewares/authenticate.middleware";

const router = Router();

export const productRouter = () => {
  router.post("", isAuthenticated, adminPermission, productCreate);
  router.get("/:uuids", isAuthenticated, productListOne);
  router.get("", isAuthenticated, productAll);

  return router;
};
