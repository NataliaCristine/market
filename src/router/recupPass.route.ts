import { Router } from "express";
import { recupPass } from "../controller/user.controller";

const router = Router();

export const recupPassRouter = () => {
  router.post("", recupPass);

  return router;
};
