import { Action } from '~/types';
import { querify } from '~/utils/querify';

type LinkableCollection = 'pages' | 'consular-services' | 'news-articles';

const COLLECTION_PATHS: Record<LinkableCollection, (slug: string) => string> = {
  pages: (slug) => (slug === 'home' || slug === '' ? '/' : `/${slug}`),
  'consular-services': (slug) => `/services/${slug}`,
  'news-articles': (slug) => `/news/${slug}`,
};

/** Route for a document in one of the linkable collections. */
export function getCollectionPath(
  relationTo: string,
  slug?: string | null
): string {
  const toPath = (
    COLLECTION_PATHS as Partial<Record<string, (slug: string) => string>>
  )[relationTo];
  return toPath && slug ? toPath(slug) : '';
}

function getActionHref(action?: Action | null, defaultPath = ''): string {
  if (!action) return defaultPath;

  const path = getPath(action) || defaultPath;
  const fragment = action.section;

  return withFragment(querify(path, toQuery(action.params)), fragment);
}

function withFragment(url: string, fragment?: string | null) {
  return !fragment ? url : `${url}#${fragment}`;
}

function getPath(action: Action): string {
  const { reference, url, type } = action;

  if ((type === 'custom' || type === undefined) && url) {
    return url;
  }

  const doc = reference?.value;

  if (type === 'reference' && doc && typeof doc.value !== 'string') {
    return getCollectionPath(doc.relationTo, doc.value.slug);
  }

  return '';
}

type Param = {
  id?: string;
  key: string;
  value: string;
};

function toQuery(params: Param[] | undefined) {
  if (!params?.length) return undefined;

  return params.reduce<Record<string, any>>((acc, param) => {
    if (param.value.endsWith('?')) return acc;
    return { ...acc, [param.key]: param.value.replace('?', '') };
  }, {});
}

export default getActionHref;
