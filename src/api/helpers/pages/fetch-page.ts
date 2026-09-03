import api from '~/api';
import { Page } from '~/types';
import { querify } from '~/utils/querify';
import slimProps from '../shared/slim-props';
import populateBlocks from './populate-blocks';

/** The CMS slug used for `/`. */
export const HOME_SLUG = 'home';

export function resolvePageSlug(segments?: string | string[] | null) {
  const slug = Array.isArray(segments) ? segments.join('/') : segments || '';
  return slug || HOME_SLUG;
}

export default async function fetchPage(
  slugSegments?: string | string[] | null
): Promise<Page | null> {
  const slug = resolvePageSlug(slugSegments);

  try {
    const result = await api.get<{ docs: Page[] }>(
      querify('/pages', {
        where: { slug: { equals: slug } },
        depth: 2,
        limit: 1,
      })
    );

    const page = result.data.docs[0];
    if (!page) return null;

    await populateBlocks(page.layout);

    return slimProps(page);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[fetchPage] failed for slug "${slug}"`, error);
    return null;
  }
}
