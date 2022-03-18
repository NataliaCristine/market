import { getRepository } from "typeorm";
import Product from "../entities/produtc";

interface ProductBody {
  name: string;
  price: number;
}
export const createProduct = async (body: ProductBody) => {
  const { name, price } = body;

  const productRepository = getRepository(Product);

  const product = productRepository.create({
    name,
    price,
  });

  await productRepository.save(product);
  return product;
};
