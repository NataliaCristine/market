import { Router } from "express";
import { updateSenha } from "../controller/user.controller";

const router = Router();

export const updatePassRouter = () => {
  router.post("", updateSenha);

  return router;
};
