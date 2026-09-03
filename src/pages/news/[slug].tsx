import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import fetchSiteGlobals from '~/api/helpers/globals/fetch-site-globals';
import fetchNewsArticle from '~/api/helpers/news/fetch-news-article';
import fetchNewsArticles from '~/api/helpers/news/fetch-news-articles';
import slimProps, { pickNewsCard } from '~/api/helpers/shared/slim-props';
import NewsArticlePage from '~/components/impls/news/article';
import CMSPageLayout from '~/components/layouts/cms-page-layout';
import defineComponent from '~/helpers/define-component';
import { NewsArticle, SiteGlobals } from '~/types';

type Props = {
  article: NewsArticle;
  related: NewsArticle[];
  globals: SiteGlobals;
};

function NewsArticleRoute({ article, related, globals }: Props) {
  return (
    <NewsArticlePage
      article={article}
      related={related}
      settings={globals.siteSettings}
    />
  );
}

NewsArticleRoute.Layout = defineComponent(CMSPageLayout, (props: Props) => ({
  globals: props.globals,
}));

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const slug = String(ctx.params?.slug ?? '');
  const [article, globals] = await Promise.all([
    fetchNewsArticle(slug),
    fetchSiteGlobals(),
  ]);

  if (!article) return { notFound: true };

  // Same category first, topped up with the latest from other categories.
  const related = await fetchNewsArticles({
    limit: 3,
    category: article.category,
    excludeId: article.id,
  })
    .then(async (sameCategory) => {
      if (sameCategory.docs.length >= 3) return sameCategory.docs;
      const latest = await fetchNewsArticles({
        limit: 6,
        excludeId: article.id,
      });
      const seen = new Set(sameCategory.docs.map((doc) => doc.id));
      return [
        ...sameCategory.docs,
        ...latest.docs.filter((doc) => !seen.has(doc.id)),
      ].slice(0, 3);
    })
    .catch(() => [] as NewsArticle[]);

  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=300'
  );

  return {
    props: {
      article: slimProps(article),
      related: slimProps(related.map(pickNewsCard)),
      globals,
    },
  };
}

export default NewsArticleRoute;
