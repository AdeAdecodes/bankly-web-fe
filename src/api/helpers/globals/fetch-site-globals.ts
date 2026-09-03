import api from '~/api';
import { Footer, Header, SiteGlobals, SiteSetting } from '~/types';
import slimProps from '../shared/slim-props';

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

  // Only set the keys that loaded: Next refuses to serialize `undefined` props,
  // so a single failed global request must not take the whole page down.
  const globals: SiteGlobals = {};
  if (header) globals.header = header;
  if (footer) globals.footer = footer;
  if (siteSettings) globals.siteSettings = siteSettings;
  // Nav/footer reference links only need slug/title, not the whole target doc.
  return slimProps(globals);
}
