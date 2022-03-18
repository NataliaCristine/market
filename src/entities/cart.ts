import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
// import CartProducts from "./cartsProducts";
import Product from "../entities/produtc";

import User from "./User";

@Entity()
export default class Cart {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;

  @OneToOne((type) => User)
  @JoinColumn()
  user!: User;

  @ManyToMany(() => Product)
  @JoinTable()
  product!: Product[];

  // @OneToMany(() => CartProducts, (cartProducts) => cartProducts.cart)
  // cartProducts!: CartProducts[];
}
