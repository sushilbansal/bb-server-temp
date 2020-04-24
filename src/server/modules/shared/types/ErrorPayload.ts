import { Field, ObjectType } from "type-graphql";
import { Error } from "./Error";

@ObjectType()
export class ErrorPayload {
  @Field(() => [Error], { nullable: true })
  error: Array<Error>;
}
