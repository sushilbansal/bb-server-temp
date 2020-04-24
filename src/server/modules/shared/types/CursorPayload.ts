import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CursorPayload {
  @Field()
  id: string;

  @Field()
  score: number;

  @Field()
  date: Date;
}
