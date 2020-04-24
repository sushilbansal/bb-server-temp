import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

// import { USER_CONFIRM_EMAIL } from "../../../../common/constants";
import { USER_ERR_MESSAGES } from '../../../../common/';
import { User } from '../../../entity/User';
import { MyContext } from '../../../types/MyContext';
import { USER_SESSION_PREFIX } from '../../../util/constants';
// import { USER_SESSION_PREFIX } from '../../../util/constants';
import { UserPayload } from '../shared';
import { RegisterInput } from './RegisterInput';

const blockedUserNames = ["Admin", "Administrator", "Anonymous", "Anonymously"];
@Resolver()
class RegisterResolver {
  @Mutation(() => UserPayload)
  async register(
    @Arg("input")
    { email, userName, password }: RegisterInput,
    @Ctx() { session, redis, req }: MyContext
  ): Promise<UserPayload> {
    const userNameNoCap = userName.toLowerCase();

    const userList = await getRepository(User)
      .createQueryBuilder("user")
      .orWhere("user.email = :email", { email })
      .orWhere("user.userName = :userName", { userName: userNameNoCap })
      .getMany();

    const errorsQuery: Array<{
      path: string;
      message: string;
    }> = [];

    userList.map((userDB) => {
      if (userDB.email === email) {
        errorsQuery.push({
          path: "email",
          message: USER_ERR_MESSAGES.DUPLICATE_EMAIL,
        });
      }
      if (userDB.userName === userNameNoCap) {
        errorsQuery.push({
          path: "userName",
          message: USER_ERR_MESSAGES.DUPLICATE_USER_NAME,
        });
      }
    });
    if (errorsQuery.length !== 0) {
      return { errors: errorsQuery };
    }

    const index = blockedUserNames.findIndex(
      (name) => name.toLowerCase() === userNameNoCap
    );
    if (index !== -1) {
      return {
        errors: [
          {
            path: "userName",
            message: USER_ERR_MESSAGES.DUPLICATE_USER_NAME,
          },
        ],
      };
    }
    const user = await User.create({
      email,
      userName: userNameNoCap,
      password,
    }).save();

    // TODO: send email should be uncommented

    session!.userId = user.id;
    if (req.sessionID) {
      await redis.lpush(`${USER_SESSION_PREFIX}${user.id}`, req.sessionID);
    }
    return {
      user,
    };
  }
}

export { RegisterResolver };
