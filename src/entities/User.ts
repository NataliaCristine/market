import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import bcrypt from "bcrypt";
import Cart from "./cart";
import Buy from "./buy";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  isAdmin!: boolean;

  @CreateDateColumn()
  createdOn!: Date;

  @UpdateDateColumn()
  updatedOn!: Date;

  @Column({ nullable: true })
  recoverPass!: string;

  buys!: Buy[];

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 6);
  }

  @BeforeUpdate()
  newHashPassword() {
    this.password = bcrypt.hashSync(this.password, 6);
  }

  @OneToOne(() => Cart)
  cart!: Cart;

  toJSON() {
    const { recoverPass, password, ...data } = this;
    return data;
  }
}
