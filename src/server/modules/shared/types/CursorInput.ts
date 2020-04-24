import { Field, InputType } from "type-graphql";

@InputType()
export class CursorInput {
  @Field()
  id: string;

  @Field()
  score: number;

  @Field()
  date: Date;
}
