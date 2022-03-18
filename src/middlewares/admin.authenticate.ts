import { Request, Response, NextFunction } from "express";
import AppError from "../erros/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/userRepository";

export const adminAuthenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.uuid;

  if (!userId) {
    return next(new AppError("Not Found", 404));
  }

  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByUUID(userId);

  if (!user?.isAdmin) {
    return next(new AppError("Unauthorized", 401));
  }

  next();
};
