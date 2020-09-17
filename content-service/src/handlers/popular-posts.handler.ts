import { QueryHandler, QueryResult, ID } from 'circle-core';
import { ContentService } from 'src/content.service';

export class GetPopularPostsQueryHandler extends QueryHandler {
  constructor(private contentService: ContentService) {
    super(
      'content.posts.get_popular',
      'circle.gateway.1.query.post.get_popular',
    );
  }

  async handle(dto: string): Promise<QueryResult> {
    const limit = dto['limit'];

    const result = await this.contentService.getPopular(limit);

    return new QueryResult(
      true,
      null,
      result.getValue().map(post => post.serialize()),
    );
  }
}
