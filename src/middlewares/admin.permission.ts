import { Request, Response, NextFunction } from "express";
import AppError from "../erros/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/userRepository";

export const adminPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.uuid;

  if (!userId) {
    return next(new AppError("Not found", 404));
  }
  const uuid = req.params.uuids;
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByUUID(userId);
  if (userId !== uuid && !user?.isAdmin) {
    return next(new AppError("Missing admin permissions", 401));
  }

  next();
};
