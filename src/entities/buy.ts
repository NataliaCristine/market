import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import User from "./User";
import Product from "./produtc";

@Entity()
export default class Buy {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;

  @ManyToOne(() => User, (user) => user.buys) user!: User;

  @ManyToMany(() => Product)
  @JoinTable()
  product!: Product[];
}
