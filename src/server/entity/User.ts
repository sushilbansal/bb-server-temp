import * as argon2 from 'argon2';
import { Field, ID, ObjectType } from 'type-graphql';
import {
    BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

import { Post } from './Post';

// import { Profile } from "./Profile";

@ObjectType()
@Entity("user")
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar", { length: 255, unique: true })
  email: string;

  @Column("text")
  password: string;

  @Field()
  @Column("varchar", { name: "user_name", length: 255, unique: true })
  userName: string;

  ////////   Post   ///////////////

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.author, { onDelete: "CASCADE" })
  posts: Post[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await argon2.hash(this.password);
  }
}
