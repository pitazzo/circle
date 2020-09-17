import { Query } from 'circle-core';

export class GetAllUsersQuery extends Query {
  constructor() {
    super('circle.gateway.1.query.user.get_all', {}, {});
  }
}
