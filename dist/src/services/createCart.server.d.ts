import Cart from "../entities/cart";
export declare const createCart: (userId: string) => Promise<Cart>;
export declare const addProductCart: (body: any, userId: string | undefined) => Promise<Cart | undefined>;
export declare const oneCart: (cartId: string) => Promise<Cart | undefined>;
export declare const cartAll: () => Promise<Cart[]>;
export declare const deleteProductCart: (userId: string | undefined, productId: string) => Promise<Cart | undefined>;
