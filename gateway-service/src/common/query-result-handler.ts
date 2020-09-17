import { QueryResult } from 'circle-core';
import { ApolloError } from 'apollo-server-express';

export function handleQueryResult(result: QueryResult): any {
  if (!result.accepted) {
    throw new ApolloError(result.failureReason || 'Unknown error');
  }
  return result.dto;
}
