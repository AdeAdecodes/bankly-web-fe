import makeGetNextPageParam from '~/helpers/make-get-next-page-param';
import useFlattenedPaginatedEntries from '~/helpers/use-flattened-paginated-entries';
import {
  BlogPost,
  PaginatedParams,
  PayloadResponse,
  PopulatedBlockDef,
} from '~/types';
import { useErrorAwareInfiniteQuery } from '../utils';
import fetchBlogPosts from './fetch-blog-posts';
import blogBlockToCMSQuery from './helpers/blog-block-to-cms-query';

export default function useBlogPosts(
  block: PopulatedBlockDef<'blog-posts-block'>,
  params?: PaginatedParams<any>
) {
  const { data, ...others } = useErrorAwareInfiniteQuery<
    PayloadResponse<BlogPost>
  >({
    queryKey: ['blog-posts', params],
    queryFn: (payload) =>
      fetchBlogPosts({ ...blogBlockToCMSQuery(block), ...payload.pageParam }),
    initialData: getInitialData(block),
    getNextPageParam: makeGetNextPageParam(params),
  });

  const blogPosts = useFlattenedPaginatedEntries(data);

  return { blogPosts, ...others };
}

function getInitialData(block: PopulatedBlockDef<'blog-posts-block'>) {
  const data = block.populatedData;

  return {
    pages: [data],
    pageParams: [{ page: data.page, limit: data.limit }],
  };
}
