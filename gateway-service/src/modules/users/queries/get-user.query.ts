import { Query } from "circle-core";

export class GetUserQuery extends Query {
  constructor(username: string) {
    super(
      "circle.gateway.1.query.user.get",
      {
        username: username,
      },
      {}
    );
  }
}
