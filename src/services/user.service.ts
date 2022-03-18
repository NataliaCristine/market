import { getRepository, getCustomRepository } from "typeorm";
import UserRepository from "../repositories/userRepository";
import { User } from "../entities";
import AppError from "../erros/AppError";
import { v4 as uuidv4 } from "uuid";
import { isAuthenticated } from "../middlewares/authenticate.middleware";
import bcrypt from "bcrypt";

interface UserBody {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const createUser = async (body: UserBody) => {
  const { name, email, password, isAdmin } = body;

  try {
    const userRepository = getRepository(User);

    const user = userRepository.create({
      name,
      email,
      password,
      isAdmin,
    });

    await userRepository.save(user);
    return user;
  } catch (error) {
    throw new AppError("E-mail already registered", 409);
  }
};

export const recoverPassword = async (email: string) => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findByEmail(email);

  const codigo = { recoverPass: uuidv4() };

  await userRepository.save({ ...user, ...codigo });

  return codigo.recoverPass;
};

export const updateSenhaCodidoEmail = async (codigo: string, pass: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({
    where: {
      recoverPass: codigo,
    },
  });
  if (user) {
    const data = {
      recoverPass: " ",
      password: bcrypt.hashSync(pass, 6),
    };
    await userRepository.update(user.uuid, data);
    const userUpdate = await userRepository.findOne(user.uuid);
    return userUpdate;
  } else {
    return undefined;
  }
};
