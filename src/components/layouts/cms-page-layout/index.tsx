import { Box } from '@mui/material';
import React from 'react';
import Page from '~/components/shared/page';
import { SiteGlobals } from '~/types';
import Footer from './footer';
import Header from './header';
import SiteAlertBar from './site-alert-bar';

type CMSPageLayoutProps = React.PropsWithChildren<{
  globals?: SiteGlobals;
}>;

/** Site chrome driven by the Header / Footer / Site Settings globals. */
function CMSPageLayout({ globals, children }: CMSPageLayoutProps) {
  const settings = globals?.siteSettings;

  return (
    <Page display="flex" flexDirection="column" minHeight="100vh">
      <SiteAlertBar settings={settings} />
      <Header header={globals?.header} settings={settings} />
      <Box component="main" id="main" flex={1} sx={{ overflowX: 'hidden' }}>
        {children}
      </Box>
      <Footer footer={globals?.footer} settings={settings} />
    </Page>
  );
}

export default CMSPageLayout;
