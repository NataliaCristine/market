import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../erros/AppError";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  jwt.verify(
    token as string,
    process.env.SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        return next(new AppError("Missing authorization headers", 401));
      }

      const userId = decoded.uuid;

      req.user = { uuid: userId };

      next();
    }
  );
};
