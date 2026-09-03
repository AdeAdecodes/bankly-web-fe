import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import fetchSiteGlobals from '~/api/helpers/globals/fetch-site-globals';
import populateBlocks from '~/api/helpers/pages/populate-blocks';
import fetchConsularService from '~/api/helpers/services/fetch-consular-service';
import fetchConsularServices from '~/api/helpers/services/fetch-consular-services';
import slimProps, { pickServiceCard } from '~/api/helpers/shared/slim-props';
import ServicePage from '~/components/impls/service';
import CMSPageLayout from '~/components/layouts/cms-page-layout';
import defineComponent from '~/helpers/define-component';
import { Block, ConsularService, SiteGlobals } from '~/types';

type Props = {
  service: ConsularService;
  siblings: ConsularService[];
  globals: SiteGlobals;
};

function ServiceRoute({ service, siblings, globals }: Props) {
  return (
    <ServicePage
      service={service}
      siblings={siblings}
      settings={globals.siteSettings}
    />
  );
}

ServiceRoute.Layout = defineComponent(CMSPageLayout, (props: Props) => ({
  globals: props.globals,
}));

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const slug = String(ctx.params?.slug ?? '');
  const [service, globals] = await Promise.all([
    fetchConsularService(slug),
    fetchSiteGlobals(),
  ]);

  if (!service) return { notFound: true };

  const [siblingsResult] = await Promise.all([
    fetchConsularServices({ category: service.category })
      .then((result) => result.docs)
      .catch(() => [] as ConsularService[]),
    populateBlocks((service.extraSections ?? []) as Block[]),
  ]);

  // Tabs: services sharing the same group (e.g. "Visas"), else the category.
  const sameGroup = service.group
    ? siblingsResult.filter((item) => item.group === service.group)
    : [];
  const siblings = (sameGroup.length > 1 ? sameGroup : siblingsResult).map(
    pickServiceCard
  );

  // Tabs and related cards only need card fields; populated rich-text links
  // embed their whole target doc — slim everything before it becomes props.
  const slimService = slimProps({
    ...service,
    relatedServices: ((service.relatedServices ?? []) as ConsularService[])
      .filter((related) => typeof related !== 'string')
      .map(pickServiceCard),
  });

  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=300'
  );

  return { props: { service: slimService, siblings, globals } };
}

export default ServiceRoute;
