import Cart from "./cart";
import Buy from "./buy";
export default class User {
    uuid: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdOn: Date;
    updatedOn: Date;
    recoverPass?: string;
    buys: Buy[];
    hashPassword(): void;
    newHashPassword(): void;
    cart: Cart;
    toJSON(): Omit<this, "password" | "recoverPass">;
}
