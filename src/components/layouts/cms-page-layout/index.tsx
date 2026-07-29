import { Box } from '@mui/material';
import React from 'react';
import Page from '~/components/shared/page';
import { Page as CMSPageType } from '~/types';
import Footer from './footer';
import Header from './header';

type CMSPageLayoutProps = React.PropsWithChildren<{
  layout: NonNullable<CMSPageType['layout']>;
}>;

function CMSPageLayout({ layout, children }: CMSPageLayoutProps) {
  return (
    <Page>
      <Header header={layout.header} />
      <Box sx={{ overflowX: 'hidden' }}>{children}</Box>
      <Footer footer={layout.footer} />
    </Page>
  );
}

export default CMSPageLayout;
