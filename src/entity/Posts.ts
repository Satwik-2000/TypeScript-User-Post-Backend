import { Column, CreateDateColumn, Entity, JoinColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  postId: string;

  @JoinColumn({ name: "parentId" })
  Parent: Post;

  @Column({ default: null, nullable: true })
  parentId: string;

  @JoinColumn({ name: "userId" })
  User: User;

  @Column("uuid")
  userId: string;

  @Column("text", { nullable: true })
  text: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
