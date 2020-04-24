import { Field, ID, ObjectType } from 'type-graphql';
import {
    BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

import { User } from './User';

@ObjectType()
@Entity("post")
@Index(["slug"])
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text")
  title: string;

  @Field()
  @Column("text")
  slug: string;

  @Field()
  @Column("text")
  details: string;

  @Field({ nullable: true })
  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt: Date;

  @Field(() => ID)
  @Column("uuid")
  authorId: string;

  @Field(() => User)
  @ManyToOne(() => User, (author) => author.posts)
  author: User;

  @Column("tsvector", {
    name: "document_with_weights",
    select: false,
    nullable: true,
  })
  documentWithWeights: any;
}
