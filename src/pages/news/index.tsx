import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import fetchSiteGlobals from '~/api/helpers/globals/fetch-site-globals';
import fetchNewsArticles from '~/api/helpers/news/fetch-news-articles';
import NewsList from '~/components/impls/news/list';
import CMSPageLayout from '~/components/layouts/cms-page-layout';
import { NEWS_CATEGORY_LABELS } from '~/constants';
import defineComponent from '~/helpers/define-component';
import { NewsArticle, PayloadResponse, SiteGlobals } from '~/types';

type Props = {
  result: PayloadResponse<NewsArticle>;
  category: string | null;
  globals: SiteGlobals;
};

const PAGE_SIZE = 13; // featured + 12 cards on the default view

function NewsIndexRoute({ result, category, globals }: Props) {
  return (
    <NewsList
      result={result}
      category={category}
      settings={globals.siteSettings}
    />
  );
}

NewsIndexRoute.Layout = defineComponent(CMSPageLayout, (props: Props) => ({
  globals: props.globals,
}));

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const rawCategory = String(ctx.query.category ?? '');
  const category = rawCategory in NEWS_CATEGORY_LABELS ? rawCategory : null;
  const page = Math.max(1, Number(ctx.query.page) || 1);

  const [result, globals] = await Promise.all([
    fetchNewsArticles({ limit: PAGE_SIZE, page, category }).catch(
      () =>
        ({
          docs: [],
          totalDocs: 0,
          limit: PAGE_SIZE,
          totalPages: 1,
          page: 1,
          pagingCounter: 1,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null,
        } as PayloadResponse<NewsArticle>)
    ),
    fetchSiteGlobals(),
  ]);

  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=300'
  );

  return { props: { result, category, globals } };
}

export default NewsIndexRoute;
