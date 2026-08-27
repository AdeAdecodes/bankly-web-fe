import { Theme } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import getActionHref from '~/helpers/get-action-href';
import { NavigationItem } from '~/types';

/** Shared look for top-level nav links / dropdown triggers (casa-web `nav a`). */
export const navItemSx: SystemStyleObject<Theme> = {
  fontSize: 13.5,
  color: 'brand.navInk',
  px: 1.375,
  py: 1.25,
  borderRadius: '8px',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  letterSpacing: '0.005em',
  transition: 'background-color .15s, color .15s',
  '&:hover': { bgcolor: 'brand.cream', color: 'primary.dark' },
};

export const navItemActiveSx: SystemStyleObject<Theme> = {
  bgcolor: 'brand.cream',
  color: 'primary.dark',
};

export function navItemHref(item: NavigationItem) {
  return getActionHref(item.action, '#');
}

/** Does the current path live under any link of this dropdown? */
export function dropdownContainsPath(item: NavigationItem, path: string) {
  if (item.type !== 'dropdown') return false;

  return (item.groups ?? []).some((group) =>
    group.links.some((link) => {
      const href = getActionHref(link.action).split('#')[0];
      return !!href && href !== '/' && path.startsWith(href);
    })
  );
}
