import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import fetchHelpTopicWithArticles from '~/api/helpers/help-centre/fetch-help-topic-with-articles';
import {
  Breadcrumbs,
  PageBreadcrumbsProvider,
} from '~/components/generics/page-breadcrumbs';
import HelpCentreTopicPageImpl from '~/components/impls/help-centre/topic';
import CMSPageLayout from '~/components/layouts/cms-page-layout';
import defineComponent from '~/helpers/define-component';
import { HelpTopicWithArticles } from '~/types';

type HelpCentreTopicPageProps = {
  topic: HelpTopicWithArticles;
};

function HelpCentreTopicPage({ topic }: HelpCentreTopicPageProps) {
  const breadcrumbs: Breadcrumbs = [
    { url: '/help-centre', label: 'Help Centre' },
    { url: `/help-centre/${topic.slug!}`, label: topic.title },
  ];

  return (
    <PageBreadcrumbsProvider breadcrumbs={breadcrumbs}>
      <HelpCentreTopicPageImpl topic={topic} />
    </PageBreadcrumbsProvider>
  );
}

HelpCentreTopicPage.Layout = defineComponent(
  CMSPageLayout,
  (pageProps: HelpCentreTopicPageProps) => ({
    layout: pageProps.topic.pageLayout!,
  })
);

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  const topic = await fetchHelpTopicWithArticles(ctx.params?.topic as any);

  if (!topic) return { notFound: true };

  return {
    props: {
      topic,
    },
  };
}

export default HelpCentreTopicPage;
