import { Field, InputType } from "type-graphql";
import { PasswordMixin } from "../../shared/PasswordInput";

@InputType()
export class RegisterInput extends PasswordMixin(class {}) {
  @Field()
  email: string;

  @Field()
  userName: string;
}
