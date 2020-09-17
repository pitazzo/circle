import { Query } from "circle-core";

export class GetProlificUsersQuery extends Query {
  constructor(limit: number) {
    super(
      "circle.gateway.1.query.user.most_prolific",
      {
        limit: limit,
      },
      {}
    );
  }
}
