import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import fetchOpening from '~/api/helpers/openings/fetch-opening';
import {
  Breadcrumbs,
  PageBreadcrumbsProvider,
} from '~/components/generics/page-breadcrumbs';
import CareersPreviewPageImpl from '~/components/impls/careers/preview';
import CMSPageLayout from '~/components/layouts/cms-page-layout';
import defineComponent from '~/helpers/define-component';
import { Opening } from '~/types';

type CareersPreviewPageProps = {
  opening: Opening;
};

function CareersPreviewPage({ opening }: CareersPreviewPageProps) {
  const breadcrumbs: Breadcrumbs = [
    { url: '/careers', label: 'Careers' },
    { url: `/careers/${opening.id}`, label: opening.title },
  ];

  return (
    <PageBreadcrumbsProvider breadcrumbs={breadcrumbs}>
      <CareersPreviewPageImpl opening={opening} />
    </PageBreadcrumbsProvider>
  );
}

CareersPreviewPage.Layout = defineComponent(
  CMSPageLayout,
  (pageProps: CareersPreviewPageProps) => ({
    layout: pageProps.opening.pageLayout!,
  })
);

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  const opening = await fetchOpening(ctx.params?.id as any);

  if (!opening) return { notFound: true };

  return {
    props: {
      opening,
    },
  };
}

export default CareersPreviewPage;
