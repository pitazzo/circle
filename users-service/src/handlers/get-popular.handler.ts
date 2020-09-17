import { QueryHandler, QueryResult } from 'circle-core';
import { UsersService } from 'src/users.service';

export class GetPopularUsersQueryHandler extends QueryHandler {
  constructor(private userService: UsersService) {
    super('users.user.get_popular', 'circle.gateway.1.query.user.most_popular');
  }

  async handle(attributes: any): Promise<QueryResult> {
    const limit = attributes['limit'];
    const result = await this.userService.getMostPopular(limit);
    return new QueryResult(
      true,
      null,
      result.getValue().map(user => user.serialize()),
    );
  }
}
