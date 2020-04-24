import { Query, Resolver } from 'type-graphql';

import { Post } from '../../../entity/Post';

@Resolver()
export class SearchPostListResolver {
  @Query(() => [Post], { nullable: true })
  async searchPostList(): Promise<Post[]> {
    return Post.find();
  }
}
