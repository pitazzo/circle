import { Query } from "circle-core";

export class GetAllUsersQuery extends Query {
  constructor(limit: number) {
    super("circle.gateway.1.query.user.get_all", { limit: limit }, {});
  }
}
