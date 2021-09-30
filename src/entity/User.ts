import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserType } from "../types/User.type";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  UserType: UserType;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  FalseLoginAttempts: number;

  @Column({ default: 0 })
  LoginDelay: number;

  @Column({ nullable: true })
  LastLoginTime: Date;

  @Column({ unique: true })
  username: string;

  @Column()
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}