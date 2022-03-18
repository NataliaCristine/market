import { NextFunction, Request, Response } from "express";
import { addCartBuy, getBuy, getOne } from "../services/buy.service";
import AppError from "../erros/AppError";
import { transport, emailGlobal } from "../services/mailer";
import { getRepository } from "typeorm";
import User from "../entities/User";

export const createBuy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.uuid;
  if (userId) {
    const addBuy = await addCartBuy(userId);

    const options = emailGlobal(
      [addBuy.user.email],
      "Compras Efetuadas",
      "Compras",
      {
        titleEmail: addBuy.user.name,
        corpo: addBuy.product,
      }
    );
    transport.sendMail(options, function (err, info) {
      if (err) {
        return next(err);
      }
    });
    return res.status(201).json(addBuy);
  }
};

export const getAllBuy = async (req: Request, res: Response) => {
  const buys = await getBuy();

  return res.status(200).json(buys);
};

export const getOneBy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.uuid;
  const buyId = req.params.uuids;
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);
  const buy = await getOne(buyId);

  if (!buy) {
    return next(new AppError("Not found", 404));
  }

  if (buy?.user.uuid !== userId && !user?.isAdmin) {
    return next(new AppError("Missing admin permissions", 401));
  } else return res.status(200).json(buy);
};
