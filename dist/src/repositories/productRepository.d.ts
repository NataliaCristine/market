import { Repository } from "typeorm";
import Product from "../entities/produtc";
declare class ProductRepository extends Repository<Product> {
}
export default ProductRepository;
