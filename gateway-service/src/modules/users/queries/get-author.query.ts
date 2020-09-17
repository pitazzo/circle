import { Query } from "circle-core";

export class GetAuthorQuery extends Query {
  constructor(postID: string) {
    super(
      "circle.gateway.1.query.user.get_author",
      {
        postID: postID,
      },
      {}
    );
  }
}
