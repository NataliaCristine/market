import { getRepository, getCustomRepository } from "typeorm";
import UserRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authenticateUser = async (email: string, password: string) => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);

  if (user == undefined || !bcrypt.compareSync(password, user.password)) {
    return undefined;
  }

  const token = jwt.sign({ uuid: user.uuid }, process.env.SECRET as string, {
    expiresIn: process.env.EXPIRESIN,
  });

  return token;
};
