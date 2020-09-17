import { QueryHandler, QueryResult } from 'circle-core';
import { UsersService } from 'src/users.service';

export class GetProlificUsersQueryHandler extends QueryHandler {
  constructor(private userService: UsersService) {
    super(
      'users.user.get_prolific',
      'circle.gateway.1.query.user.most_prolific',
    );
  }

  async handle(attributes: any): Promise<QueryResult> {
    const limit = attributes['limit'];
    const result = await this.userService.getMostProlific(limit);
    return new QueryResult(
      true,
      null,
      result.getValue().map(user => user.serialize()),
    );
  }
}
