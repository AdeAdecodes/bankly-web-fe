import CMSPageImpl from '~/components/impls/cms-page';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import CMSPageLayout from '~/components/layouts/cms-page-layout';
import defineComponent from '~/helpers/define-component';
import { Page } from '~/types';
import fetchPage from '~/api/helpers/pages/fetch-page';
import { PageBreadcrumbsProvider } from '~/components/generics/page-breadcrumbs';

type CMSPageProps = {
  page: Page;
};

function CMSPage({ page }: CMSPageProps) {
  if (!page) {
    return null;
  }

  return (
    <PageBreadcrumbsProvider breadcrumbs={page.breadcrumbs || []}>
      <CMSPageImpl page={page} />
    </PageBreadcrumbsProvider>
  );
}

CMSPage.Layout = defineComponent(CMSPageLayout, (pageProps: CMSPageProps) => ({
  layout: pageProps.page.layout!,
}));

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  const page = await fetchPage(ctx.params?.slug as any);

  if (!page) return { notFound: true };

  return {
    props: {
      page,
    },
  };
}

export default CMSPage;
