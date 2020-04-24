import { Ctx, Mutation, Resolver } from 'type-graphql';

// import { COOKIE_PREFIX } from "../../../common/constants";
import { MyContext } from '../../types/MyContext';

@Resolver()
class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.session!.destroy((err) => {
        if (err) {
          console.log(err);
          return rej(false);
        }
        ctx.res.clearCookie("qid");
        return res(true);
      })
    );
  }
}

export { LogoutResolver };
