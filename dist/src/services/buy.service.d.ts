import User from "../entities/User";
import Buy from "../entities/buy";
export declare const addCartBuy: (userId: string) => Promise<Buy>;
export declare const getBuy: () => Promise<{
    uuid_buy: string;
    user: User;
    product: import("../entities").Product[];
}[]>;
export declare const getOne: (buyId: string) => Promise<Buy | undefined>;
