import { Request, Response, NextFunction } from "express";
import {
  createUser,
  recoverPassword,
  updateSenhaCodidoEmail,
} from "../services/user.service";
import { authenticateUser } from "../services/authenticate.service";
import { getCustomRepository, getRepository } from "typeorm";
import UserRepository from "../repositories/userRepository";
import { createCart } from "../services/createCart.server";
import User from "../entities/User";
import Cart from "../entities/cart";
import { transport, mailAll } from "../services/mailer";
import AppError from "../erros/AppError";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body);

    const cart = await createCart(user.uuid);

    res.status(201).json(user);
  } catch (err) {
    return next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const token = await authenticateUser(email, password);
    if (token) {
      return res.status(200).json({ accessToken: token });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    return next(err);
  }
};

export const list_one_user = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.uuid;
    const idParams = req.params.uuids;
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.findByUUID(idParams);
    if (users) {
      const { password, recoverPass, ...data } = users;
      return res.status(200).json(data);
    }
  } catch (err) {
    return next(err);
  }
};

export const get_all_admin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = getCustomRepository(UserRepository);
  const users = await userRepository.find();
  const usersRetorno: Array<any> = [];
  for (let i = 0; i < users.length; i++) {
    const { password, recoverPass, ...data } = users[i];
    usersRetorno.push(data);
  }

  return res.status(200).json(usersRetorno);
};

export const recupPass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const codigo = await recoverPassword(email);
    const message = `codigo de recuperação de senha ${codigo}`;
    const option = mailAll([email], "Recuperar senha", "mail", {
      mensagem: message,
    });
    transport.sendMail(option, function (err, info) {
      if (err) {
        return next(err);
      } else {
        return res.status(200).json({ messagem: "Send email" });
      }
    });
  } catch (err) {
    return next(err);
  }
};

export const updateSenha = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { codigo, password } = req.body;
    const user = await updateSenhaCodidoEmail(codigo, password);
    if (!user) {
      return next(new AppError("No permissions", 401));
    } else {
      const { password, recoverPass, ...data } = user;
      return res.status(200).json(data);
    }
  } catch (err) {
    return next(err);
  }
};
