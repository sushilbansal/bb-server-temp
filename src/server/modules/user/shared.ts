import { Field, ObjectType } from "type-graphql";
import { User } from "../../entity/User";
import { Error } from "../shared/types/Error";

@ObjectType()
export class UserPayload {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [Error], { nullable: true })
  errors?: Array<Error> | null;
}
