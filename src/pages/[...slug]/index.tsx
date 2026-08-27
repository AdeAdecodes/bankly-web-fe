import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import fetchSiteGlobals from '~/api/helpers/globals/fetch-site-globals';
import fetchPage from '~/api/helpers/pages/fetch-page';
import CMSPageImpl from '~/components/impls/cms-page';
import CMSPageLayout from '~/components/layouts/cms-page-layout';
import defineComponent from '~/helpers/define-component';
import { Page, SiteGlobals } from '~/types';

export type CMSPageProps = {
  page: Page;
  globals: SiteGlobals;
};

function CMSPage({ page, globals }: CMSPageProps) {
  if (!page) return null;

  return <CMSPageImpl page={page} settings={globals.siteSettings} />;
}

CMSPage.Layout = defineComponent(CMSPageLayout, (pageProps: CMSPageProps) => ({
  globals: pageProps.globals,
}));

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<CMSPageProps>> {
  const [page, globals] = await Promise.all([
    fetchPage(ctx.params?.slug as string[] | undefined),
    fetchSiteGlobals(),
  ]);

  if (!page) return { notFound: true };

  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=300'
  );

  return {
    props: { page, globals },
  };
}

export default CMSPage;
