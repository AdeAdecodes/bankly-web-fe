import React from 'react';
import { Page, SiteSetting } from '~/types';
import RenderBlocks from './render-blocks';
import CMSPageSEO from './seo';

type CMSPageProps = {
  page: Page;
  settings?: SiteSetting;
};

/** A CMS page = SEO tags + its flat `layout` of blocks. */
function CMSPage({ page, settings }: CMSPageProps) {
  return (
    <React.Fragment>
      <CMSPageSEO page={page} settings={settings} />
      <RenderBlocks blocks={page.layout} />
    </React.Fragment>
  );
}

export default CMSPage;
