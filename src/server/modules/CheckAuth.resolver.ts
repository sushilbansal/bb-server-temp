import { Ctx, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import { User } from '../entity/User';
import { MyContext } from '../types/MyContext';
import { AuthPayload } from './AuthPayload';

@Resolver()
class CheckAuthResolver {
  @Query(() => AuthPayload, { nullable: true })
  async checkAuth(@Ctx() ctx: MyContext): Promise<AuthPayload> {
    const { session, redis, req } = ctx;
    let loggedUser = null;
    console.log("CheckAuthResolver: <<<<<<< ctx.session >>>>>>>>>", session);
    console.log(
      "CheckAuthResolver: <<<<<<< ctx.req.sessionID) >>>>>>>>>",
      ctx.req.sessionID
    );

    console.log("???? ???? redis:", await redis.get(req.sessionID as string));

    if (session && session.userId) {
      loggedUser = await getRepository(User)
        .createQueryBuilder("user")
        .where("id = :userId", { userId: session!.userId })
        .getOne();
    }
    return {
      loggedUser,
    };
  }
}

export { CheckAuthResolver };
