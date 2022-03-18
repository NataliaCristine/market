import { Request, Response } from "express";
import CartRepository from "../repositories/cartRepository";
import { getRepository, getCustomRepository } from "typeorm";
import Cart from "../entities/cart";
import User from "../entities/User";

export const createCart = async (userId: string) => {
  const cartRepository = getRepository(Cart);
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  const cart = cartRepository.create({
    user: user,
  });

  await cartRepository.save(cart);
  return cart;
};

export const addProductCart = async (body: any, userId: string | undefined) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);
  const cartRepository = getRepository(Cart);
  const cart = await cartRepository.findOne({
    where: {
      user: user,
    },
    relations: ["product", "user"],
  });

  if (cart) {
    if (!cart.product) {
      cart.product = [];
    }

    cart.product.push(body);
    return await cartRepository.save(cart);
  }
};

export const oneCart = async (cartId: string) => {
  const cartRepository = getRepository(Cart);
  const cart = await cartRepository.findOne(cartId, {
    relations: ["product", "user"],
  });

  return cart;
};

export const cartAll = async () => {
  const cartRepository = getRepository(Cart);
  const cart = await cartRepository.find({ relations: ["product", "user"] });

  return cart;
};

export const deleteProductCart = async (
  userId: string | undefined,
  productId: string
) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);
  const cartRepository = getRepository(Cart);
  const cart = await cartRepository.findOne({
    where: {
      user: user,
    },
    relations: ["product", "user"],
  });

  console.log("antes de deletar");
  console.log(cart);

  if (cart) {
    cart.product = cart?.product.filter((prod) => prod.uuid !== productId);
    console.log("depois");
    console.log(cart);
    return await cartRepository.save(cart);
  }
};
