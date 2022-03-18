import { getRepository } from "typeorm";
import User from "../entities/User";
import Cart from "../entities/cart";
import Buy from "../entities/buy";

export const addCartBuy = async (userId: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  const cartRepository = getRepository(Cart);
  const cart = await cartRepository.findOne({
    where: {
      user: user,
    },
    relations: ["product"],
  });

  const buyRepository = getRepository(Buy);
  const buy = await buyRepository.create({
    user: user,
    product: cart?.product,
  });

  await buyRepository.save(buy);

  if (cart) {
    cart.product = [];
    await cartRepository.save(cart);
  }

  return buy;
};

export const getBuy = async () => {
  const buyRepository = getRepository(Buy);
  const buys = await buyRepository.find({ relations: ["product", "user"] });
  const output = [];
  for (let i = 0; i < buys.length; i++) {
    let objeto = {
      uuid_buy: buys[i].uuid,
      user: buys[i].user,
      product: buys[i].product,
    };
    output.push(objeto);
  }
  return output;
};

export const getOne = async (buyId: string) => {
  const buyRepository = getRepository(Buy);
  const buy = await buyRepository.findOne(buyId, {
    relations: ["product", "user"],
  });

  if (buy) {
    const output = { uuid_buy: buy.uuid, user: buy.user, product: buy.product };
  }

  return buy;
};
