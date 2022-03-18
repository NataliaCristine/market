import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
// import CartProducts from "./cartsProducts";

@Entity()
export default class Product {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;

  @Column()
  name!: string;

  @Column()
  price!: number;

  // @OneToMany(() => CartProducts, (cartProducts) => cartProducts.product)
  // cartProducts!: CartProducts[];
}
