// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
// import Products from "./produtc";
// import Cart from "./cart";

// @Entity()
// export default class CartProducts {
//   @PrimaryGeneratedColumn("uuid")
//   uuid!: string;

//   @Column()
//   productId!: string;

//   @Column()
//   cartId!: string;

//   @Column()
//   quantity!: number;

//   @ManyToOne(() => Products, (product) => product.cartProducts)
//   product!: Products;

//   @ManyToOne(() => Cart, (cart) => cart.cartProducts)
//   cart!: Cart;
// }
