import PageSEO from '~/components/shared/page-seo';
import config from '~/config';
import { getMediaUrl } from '~/helpers/media';
import { Page, SiteSetting } from '~/types';

type CMSPageSEOProps = {
  page: Page;
  settings?: SiteSetting;
};

function CMSPageSEO({ page, settings }: CMSPageSEOProps) {
  const isHome = page.slug === 'home';

  return (
    <PageSEO
      title={page.meta?.title || (isHome ? undefined : page.title)}
      description={page.meta?.description}
      image={getMediaUrl(page.meta?.image)}
      url={
        config.site.url
          ? `${config.site.url}${isHome ? '/' : `/${page.slug ?? ''}`}`
          : undefined
      }
      settings={settings}
    />
  );
}

export default CMSPageSEO;
