import { EntityRepository, Repository } from "typeorm";
import Product from "../entities/produtc";

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {}

export default ProductRepository;
