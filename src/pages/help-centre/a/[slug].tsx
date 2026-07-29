import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import fetchHelpArticle from '~/api/helpers/help-centre/fetch-help-article';
import {
  Breadcrumbs,
  PageBreadcrumbsProvider,
} from '~/components/generics/page-breadcrumbs';
import HelpCentreArticlePageImpl from '~/components/impls/help-centre/article';
import CMSPageLayout from '~/components/layouts/cms-page-layout';
import defineComponent from '~/helpers/define-component';
import { HelpArticle, HelpTopic } from '~/types';

type HelpCentreArticlePageProps = {
  article: HelpArticle;
};

function HelpCentreArticlePage({ article }: HelpCentreArticlePageProps) {
  const topic = article.topic as HelpTopic;

  const breadcrumbs: Breadcrumbs = [
    { url: '/help-centre', label: 'Help Centre' },
    { url: `/help-centre/${topic.slug!}`, label: topic.title },
    { url: `/help-centre/a/${article.slug!}`, label: article.title },
  ];

  return (
    <PageBreadcrumbsProvider breadcrumbs={breadcrumbs}>
      <HelpCentreArticlePageImpl article={article} />
    </PageBreadcrumbsProvider>
  );
}

HelpCentreArticlePage.Layout = defineComponent(
  CMSPageLayout,
  (pageProps: HelpCentreArticlePageProps) => ({
    layout: pageProps.article.pageLayout!,
  })
);

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  const article = await fetchHelpArticle(ctx.params?.slug as any);

  if (!article) return { notFound: true };

  return {
    props: {
      article,
    },
  };
}

export default HelpCentreArticlePage;
