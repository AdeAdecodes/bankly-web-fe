import { querify } from '~/utils/querify';
import { Action } from '~/types';

function getActionHref(action: Action, defaultPath = ''): string {
  const path = getPath(action) || defaultPath;
  const fragment = action.section;

  return withFragment(querify(path, toQuery(action.params)), fragment);
}

function withFragment(url: string, fragment?: string) {
  return !fragment ? url : `${url}#${fragment}`;
}

function getPath(action: Action): string {
  const { reference, url, type } = action;

  if ((type === 'custom' || type === undefined) && url) {
    return url;
  }

  const doc = reference?.value;

  if (type === 'reference' && doc && typeof doc.value !== 'string') {
    if (doc.relationTo === 'pages') {
      return `/${doc.value.slug!}`;
    }

    // TODO: account for other reference types

    // return `/${doc.relationTo}/${doc.value.slug!}`;
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
