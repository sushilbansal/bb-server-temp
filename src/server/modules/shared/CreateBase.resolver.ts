import { ClassType, Resolver, Arg, Mutation } from "type-graphql";

export function createBaseResolver<T extends ClassType, I extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: I,
  entity: any
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    async create(@Arg("input", () => inputType) input: any): Promise<T> {
      return entity.create(input).save();
    }
  }
  return BaseResolver;
}
