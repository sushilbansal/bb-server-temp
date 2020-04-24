import { IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";
import { PasswordMixin } from "../../shared/PasswordInput";

@InputType()
export class LoginInput extends PasswordMixin(class {}) {
  @Field()
  @IsEmail()
  email: string;
}
