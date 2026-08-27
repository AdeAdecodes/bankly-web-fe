import api from '~/api';
import { Footer, Header, SiteGlobals, SiteSetting } from '~/types';

async function fetchGlobal<T>(slug: string): Promise<T | undefined> {
  try {
    const result = await api.get<T>(`/globals/${slug}?depth=1`);
    return result.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[fetchSiteGlobals] failed to load global "${slug}"`, error);
    return undefined;
  }
}

/** Header, footer and site settings — needed by every page's layout. */
export default async function fetchSiteGlobals(): Promise<SiteGlobals> {
  const [header, footer, siteSettings] = await Promise.all([
    fetchGlobal<Header>('header'),
    fetchGlobal<Footer>('footer'),
    fetchGlobal<SiteSetting>('site-settings'),
  ]);

  return { header, footer, siteSettings };
}
