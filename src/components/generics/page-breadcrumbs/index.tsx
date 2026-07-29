import { Breadcrumbs, Typography } from '@mui/material';
import React from 'react';
import ChevronRightIcon from '~/components/icons/chevron-right';
import Link from '~/components/shared/link';
import { Page } from '~/types';

export default function PageBreadcrumbs() {
  const breadcrumbs = usePageBreadcrumbs();

  if (!breadcrumbs.length) return null;

  return (
    <Breadcrumbs
      separator={<ChevronRightIcon sx={{ fontSize: '0.75rem' }} />}
      sx={{ color: 'inherit' }}
    >
      {breadcrumbs.slice(0, breadcrumbs.length - 1).map((breadcrumb, i) => (
        <Link key={i} href={breadcrumb.url!} color="inherit" mui>
          {breadcrumb.label}
        </Link>
      ))}
      <Typography color="inherit">
        {breadcrumbs[breadcrumbs.length - 1].label}
      </Typography>
    </Breadcrumbs>
  );
}

export type Breadcrumbs = NonNullable<Page['breadcrumbs']>;

type PageBreadcrumbsProviderProps = React.PropsWithChildren<{
  breadcrumbs: Breadcrumbs;
}>;

type Values = {
  breadcrumbs: Breadcrumbs;
};

const Context = React.createContext<Values | undefined>(undefined);

export function PageBreadcrumbsProvider({
  children,
  breadcrumbs,
}: PageBreadcrumbsProviderProps) {
  return (
    <Context.Provider value={{ breadcrumbs }}>{children}</Context.Provider>
  );
}

export function usePageBreadcrumbs() {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error(
      `usePageBreadcrumbs should be used with PageBreadcrumbsProvider`
    );
  }

  return context.breadcrumbs;
}
