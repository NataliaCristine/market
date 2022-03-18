import { Request, Response, NextFunction } from "express";
import { createProduct } from "../services/createProduct";
import { getRepository } from "typeorm";

import Product from "../entities/produtc";

export const productCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await createProduct(req.body);
    return res.status(201).json(product);
  } catch (err) {
    return next(err);
  }
};

export const productListOne = async (req: Request, res: Response) => {
  const idParams = req.params.uuids;
  const productRepository = getRepository(Product);
  const product = await productRepository.findOne({
    where: {
      uuid: idParams,
    },
  });
  return res.status(200).json(product);
};

export const productAll = async (req: Request, res: Response) => {
  const productRepository = getRepository(Product);
  const product = await productRepository.find();
  return res.status(200).json(product);
};
