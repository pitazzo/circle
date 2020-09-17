import { Query } from 'circle-core';

export class GetPopularPostsQuery extends Query {
  constructor(limit: number) {
    super(
      'circle.gateway.1.query.post.get_popular',
      {
        limit: limit,
      },
      {},
    );
  }
}
