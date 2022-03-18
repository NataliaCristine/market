import Product from "../entities/produtc";
interface ProductBody {
    name: string;
    price: number;
}
export declare const createProduct: (body: ProductBody) => Promise<Product>;
export {};
