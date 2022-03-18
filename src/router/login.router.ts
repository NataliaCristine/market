import { Router } from "express";
import { login } from "../controller/user.controller";

const router = Router();

export const loginRouter = () => {
  router.post("", login);

  return router;
};
