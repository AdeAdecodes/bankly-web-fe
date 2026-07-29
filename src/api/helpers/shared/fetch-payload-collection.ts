import api from '~/api';
import { Config, PayloadResponse } from '~/types';
import { querify } from '~/utils/querify';

type CollectionSlug = keyof Config['collections'];

export default function fetchPayloadCollection<
  S extends CollectionSlug = CollectionSlug,
  R = Config['collections'][S]
>(slug: S, query?: Record<string, any>) {
  return api
    .get<PayloadResponse<R>>(querify(`/${slug}`, query || {}))
    .then((x) => x.data);
}
