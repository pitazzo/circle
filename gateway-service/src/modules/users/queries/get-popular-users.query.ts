import { Query } from "circle-core";

export class GetPopularUsersQuery extends Query {
  constructor(limit: number) {
    super(
      "circle.gateway.1.query.user.most_popular",
      {
        limit: limit,
      },
      {}
    );
  }
}
