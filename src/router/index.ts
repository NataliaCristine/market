import { Express } from "express";
import { userRouter } from "./user.router";
import { loginRouter } from "./login.router";
import { productRouter } from "./product.router";
import { cartRouter } from "./cart.router";
import { buyRouter } from "./buy.route";
import { emailRouter } from "./email.route";
import { recupPassRouter } from "./recupPass.route";
import { updatePassRouter } from "./updatePass.route";

export const initRouter = (app: Express) => {
  app.use("/user", userRouter());
  app.use("/login", loginRouter());
  app.use("/product", productRouter());
  app.use("/cart", cartRouter());
  app.use("/buy", buyRouter());
  app.use("/email", emailRouter());
  app.use("/recuperar", recupPassRouter());
  app.use("/alterar_senha", updatePassRouter());
};
