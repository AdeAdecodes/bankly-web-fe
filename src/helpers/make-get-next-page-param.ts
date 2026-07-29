import { GetNextPageParamFunction } from '@tanstack/react-query';
import { PaginatedParams, PayloadResponse } from '~/types';

function makeGetNextPageParam<T extends PayloadResponse<unknown>>(
  params?: PaginatedParams<unknown>
): GetNextPageParamFunction<T> {
  return (response: T) =>
    response.hasNextPage
      ? { page: response.nextPage, limit: params?.limit ?? response.limit }
      : undefined;
}

export default makeGetNextPageParam;
