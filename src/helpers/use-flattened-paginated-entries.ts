import { InfiniteData } from '@tanstack/react-query';
import React from 'react';
import { PayloadResponse } from '~/types';

type Data<Entry> = InfiniteData<PayloadResponse<Entry>>;

function useFlattenedPaginatedEntries<
  T extends Data<unknown>,
  E = T extends Data<infer X> ? X : never
>(data: T | undefined) {
  return React.useMemo(() => {
    return data?.pages
      .map((page) => page.docs)
      .reduce<E[]>((acc, x) => acc.concat(x as E), []);
  }, [data]);
}

export default useFlattenedPaginatedEntries;
