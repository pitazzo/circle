import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PublishPostInput, MutationResult, LikePostInput } from 'src/graphql';
import OperationBus from 'src/core/infraestructure/operation-bus/operation-bus';
import PublishPostCommand from './commands/publish-post.command';
import { GetPostsByAuthorQuery } from './queries/get-posts-by-author.query';
import { handleQueryResult } from 'src/common/query-result-handler';
import { GetAuthorQuery } from '../users/queries/get-author.query';
import LikePostCommand from './commands/like-post.command';
import { GetRecentPostsQuery } from './queries/get-recent-posts.query';
import { GetPopularPostsQuery } from './queries/get-popular-posts.query';

@Resolver('Post')
export class PostsResolver {
  constructor(private operationBus: OperationBus) {}

  @Query()
  async recentPosts(@Args('limit') limit: number) {
    const response = await this.operationBus.ask(
      new GetRecentPostsQuery(limit),
    );
    return handleQueryResult(response);
  }

  @Query()
  async popularPosts(@Args('limit') limit: number) {
    const response = await this.operationBus.ask(
      new GetPopularPostsQuery(limit),
    );
    return handleQueryResult(response);
  }

  @Query()
  async postsByAuthor(@Args('authorID') authorID: string) {
    const response = await this.operationBus.ask(
      new GetPostsByAuthorQuery(authorID),
    );
    return handleQueryResult(response);
  }

  @ResolveField()
  async author(@Parent() post) {
    const response = await this.operationBus.ask(new GetAuthorQuery(post.id));
    return handleQueryResult(response);
  }

  @Mutation()
  async publishPost(
    @Args('publishPostInput') publishPostInput: PublishPostInput,
  ): Promise<MutationResult> {
    const response = await this.operationBus.dispatch(
      new PublishPostCommand(
        publishPostInput.title,
        publishPostInput.body,
        publishPostInput.authorID,
      ),
    );

    return response;
  }

  @Mutation()
  async likePost(
    @Args('likePostInput') likePostInput: LikePostInput,
  ): Promise<MutationResult> {
    const response = await this.operationBus.dispatch(
      new LikePostCommand(likePostInput.postID, likePostInput.likerID),
    );

    return response;
  }
}
