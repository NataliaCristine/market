import Product from "../entities/produtc";
import User from "./User";
export default class Cart {
    uuid: string;
    user: User;
    product: Product[];
}
