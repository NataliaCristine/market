import { Router } from "express";
import { emailMensage } from "../controller/email.controller";

import { adminAuthenticate } from "../middlewares/admin.authenticate";
import { isAuthenticated } from "../middlewares/authenticate.middleware";

const router = Router();

export const emailRouter = () => {
  router.post("", isAuthenticated, adminAuthenticate, emailMensage);

  return router;
};
