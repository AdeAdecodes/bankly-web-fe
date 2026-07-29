import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import fetchCaseStudy from '~/api/helpers/case-studies/fetch-case-study';
import {
  Breadcrumbs,
  PageBreadcrumbsProvider,
} from '~/components/generics/page-breadcrumbs';
import CaseStudyPageImpl from '~/components/impls/case-studies/preview';
import CMSPageLayout from '~/components/layouts/cms-page-layout';
import defineComponent from '~/helpers/define-component';
import { CaseStudy } from '~/types';

type CaseStudyPageProps = {
  caseStudy: CaseStudy;
};

function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  const breadcrumbs: Breadcrumbs = [
    { url: '/help-centre', label: 'Help Centre' },
    { url: '/featured-businesses', label: 'Featured Businesses' },
    { url: `/featured-businesses/${caseStudy.slug!}`, label: caseStudy.name },
  ];

  return (
    <PageBreadcrumbsProvider breadcrumbs={breadcrumbs}>
      <CaseStudyPageImpl caseStudy={caseStudy} />
    </PageBreadcrumbsProvider>
  );
}

CaseStudyPage.Layout = defineComponent(
  CMSPageLayout,
  (pageProps: CaseStudyPageProps) => ({
    layout: pageProps.caseStudy.pageLayout!,
  })
);

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  const caseStudy = await fetchCaseStudy(ctx.params?.id as any);

  if (!caseStudy) return { notFound: true };

  return {
    props: {
      caseStudy,
    },
  };
}

export default CaseStudyPage;
