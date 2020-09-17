import { QueryHandler, QueryResult, ID } from 'circle-core';
import { ContentService } from 'src/content.service';

export class GetByAuthorQueryHandler extends QueryHandler {
  constructor(private contentService: ContentService) {
    super(
      'content.posts.get_by_author',
      'circle.gateway.1.query.post.get_by_author',
    );
  }

  async handle(dto: string): Promise<QueryResult> {
    const authorID = ID.create(dto['authorID']);
    if (!authorID.isSuccess) {
      return new QueryResult(false, authorID.error, null);
    }

    const result = await this.contentService.getPostsByAuthor(authorID.getValue());
    if (!result.isSuccess) {
      return new QueryResult(false, result.error, null);
    }
    return new QueryResult(
      true,
      null,
      result.getValue().map(post => post.serialize()),
    );
  }
}
