import { QueryHandler, Result, QueryResult, ID } from 'circle-core';
import { UsersService } from 'src/users.service';

export class GetAuthorQueryHandler extends QueryHandler {
  constructor(private userService: UsersService) {
    super('users.user.get_author', 'circle.gateway.1.query.user.get_author');
  }

  async handle(attributes: any): Promise<QueryResult> {
    const postID = ID.create(attributes['postID']);

    if (!postID.isSuccess) {
      return new QueryResult(false, postID.error, null);
    }

    const result = await this.userService.findAuthor(postID.getValue());
    if (!result.isSuccess) {
      return new QueryResult(false, result.error, null);
    }
    return new QueryResult(true, null, result.getValue().serialize());
  }
}
