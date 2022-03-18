import { EntityRepository, Repository } from "typeorm";
import Cart from "../entities/cart";

@EntityRepository(Cart)
class CartRepository extends Repository<Cart> {}

export default CartRepository;
