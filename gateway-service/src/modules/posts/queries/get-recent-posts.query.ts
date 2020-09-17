import { Query } from "circle-core";

export class GetRecentPostsQuery extends Query {
  constructor(limit: number) {
    super(
      "circle.gateway.1.query.post.get_recent",
      {
        limit: limit,
      },
      {}
    );
  }
}
