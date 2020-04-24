import argon2 from 'argon2';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import { ERR_MESSAGES } from '../../../../common/constants';
import { User } from '../../../entity/User';
import { MyContext } from '../../../types/MyContext';
import { USER_SESSION_PREFIX } from '../../../util/constants';
import { UserPayload } from '../shared';
import { LoginInput } from './LoginInput';

@Resolver()
class LoginResolver {
  @Mutation(() => UserPayload)
  async login(
    @Arg("input") { email, password }: LoginInput,
    @Ctx() { req, redis, session }: MyContext
  ): Promise<UserPayload> {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
    if (!user) {
      return {
        errors: [
          {
            path: "password",
            message: ERR_MESSAGES.USER_NOT_FOUND,
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            path: "password",
            message: ERR_MESSAGES.INVALID_CREDENTIALS,
          },
        ],
      };
    }

    session!.userId = user.id;
    session.save((e) => {
      console.log("error while saving session", e);
    });
    console.log("???? ???? session:", session);
    console.log("???? ???? redis:", await redis.get(req.sessionID as string));

    if (req.sessionID) {
      await redis.lpush(`${USER_SESSION_PREFIX}${user.id}`, req.sessionID);
    }

    return {
      user,
    };
  }
}

export { LoginResolver };
