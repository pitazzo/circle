import { Query } from "circle-core";

export class GetPostsByAuthorQuery extends Query {
  constructor(authorID: string) {
    super(
      "circle.gateway.1.query.post.get_by_author",
      {
        authorID: authorID,
      },
      {}
    );
  }
}
