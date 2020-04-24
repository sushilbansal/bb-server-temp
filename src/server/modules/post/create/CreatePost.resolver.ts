import slugify from 'slugify';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { ERR_MESSAGES } from '../../../../common/constants';
import { Post } from '../../../entity/Post';
import { User } from '../../../entity/User';
import { MyContext } from '../../../types/MyContext';
import { PostPayload } from '../PostPayload';
import { CreatePostInput } from './CreatePostInput';

@Resolver()
class CreatePostResolver {
  @Mutation(() => PostPayload, { nullable: true })
  async createPost(
    @Arg("input") input: CreatePostInput,
    @Ctx() { session }: MyContext
  ): Promise<PostPayload | null> {
    const userId = session!.userId;
    if (!userId) {
      return {
        errors: [
          {
            path: "details",
            message: ERR_MESSAGES.LOGIN_OR_REGISTER,
          },
        ],
      };
    }
    const user = await User.findOne(userId);
    if (!user) {
      return {
        errors: [
          {
            path: "details",
            message: ERR_MESSAGES.LOGIN_OR_REGISTER,
          },
        ],
      };
    }
    const { title, details } = input;
    const date = new Date().getTime().toString().substr(0, 8);

    const slug = slugify(title)
      .substr(0, 70)
      .concat("-" + date);

    let data: Partial<Post> = { title, details, author: user, slug };

    try {
      const post = await Post.create(data).save();

      return {
        post,
      };
    } catch (e) {
      return {
        errors: [
          {
            path: "CreatePost",
            message: "error occured while creating the post",
          },
        ],
      };
    }
  }
}

export { CreatePostResolver };
