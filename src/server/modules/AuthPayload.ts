import { Field, ObjectType } from "type-graphql";
import { User } from "../entity/User";

@ObjectType()
export class AuthPayload {
  @Field(() => User, { nullable: true })
  loggedUser: User | null | undefined;
}
