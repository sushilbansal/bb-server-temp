import { Ctx, FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import { Post } from '../../entity/Post';
import { MyContext } from '../../types/MyContext';

@Resolver(() => Post)
export class PostResolver implements ResolverInterface<Post> {
  @FieldResolver()
  async author(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(post.authorId);
  }
}
