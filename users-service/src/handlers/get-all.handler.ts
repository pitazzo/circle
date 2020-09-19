import { QueryHandler, QueryResult } from "circle-core";
import { UsersService } from "src/users.service";

export class GetAllUsersQueryHandler extends QueryHandler {
  constructor(private userService: UsersService) {
    super("users.user.get_all", "circle.gateway.1.query.user.get_all");
  }

  async handle(attributes: any): Promise<QueryResult> {
    const limit = attributes["limit"];
    const result = await this.userService.findAll(limit);
    return new QueryResult(
      true,
      null,
      result.getValue().map((user) => user.serialize())
    );
  }
}
