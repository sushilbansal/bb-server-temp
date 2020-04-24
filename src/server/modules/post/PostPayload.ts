import { Field, ObjectType } from "type-graphql";
import { Error } from "../shared/types/Error";
import { Post } from "../../entity/Post";

@ObjectType()
export class PostPayload {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => [Error], { nullable: true })
  errors?: Array<Error> | null;
}
