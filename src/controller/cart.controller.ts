import { Request, Response, NextFunction } from "express";
import { getRepository, getCustomRepository } from "typeorm";
import {
  addProductCart,
  oneCart,
  cartAll,
  deleteProductCart,
} from "../services/createCart.server";
import Product from "../entities/produtc";
import Cart from "../entities/cart";
import AppError from "../erros/AppError";
import UserRepository from "../repositories/userRepository";

export const productCart = async (req: Request, res: Response) => {
  const userId = req.user?.uuid;
  const { product_uuid } = req.body;

  const productRepository = getRepository(Product);
  const product = await productRepository.findOne({
    where: {
      uuid: product_uuid,
    },
  });

  const addProduct = await addProductCart(product, userId);

  return res.status(200).json(addProduct);
};

export const cartOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.uuid;
  const cartId = req.params.uuids;
  const cart = await oneCart(cartId);

  const userRepository = getCustomRepository(UserRepository);
  const users = await userRepository.findByUUID(userId);

  if (cart?.user.uuid !== userId && !users?.isAdmin) {
    return next(new AppError("Missing admin permissions", 401));
  }

  return res.status(200).json(cart);
};

export const allCart = async (req: Request, res: Response) => {
  const carts = await cartAll();

  return res.status(200).json(carts);
};

export const cartProductDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.params.uuids;
    const userId = req.user?.uuid;

    const deleteProduct = await deleteProductCart(userId, product);

    return res.status(204).json({});
  } catch (err) {
    return next(err);
  }
};
