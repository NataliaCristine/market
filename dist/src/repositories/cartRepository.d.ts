import { Repository } from "typeorm";
import Cart from "../entities/cart";
declare class CartRepository extends Repository<Cart> {
}
export default CartRepository;
