import { QueryHandler, Result, QueryResult } from 'circle-core';
import { Username } from 'src/shared/domain/value-objects/username';
import { UsersService } from 'src/users.service';

export class GetUserQueryHandler extends QueryHandler {
  constructor(private userService: UsersService) {
    super('users.user.get', 'circle.gateway.1.query.user.get');
  }

  async handle(attributes: any): Promise<QueryResult> {
    const username = Username.create(attributes['username']);
    if (!username.isSuccess) {
      return new QueryResult(false, username.error, null);
    }

    const result = await this.userService.find(username.getValue());
    if (!result.isSuccess) {
      return new QueryResult(false, result.error, null);
    }
    return new QueryResult(true, null, result.getValue().serialize());
  }
}
