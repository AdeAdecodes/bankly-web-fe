import React from 'react';
import { Column } from '~/components/shared/layout';
import { Page } from '~/types';
import CMSPageHero from './elements/hero';
import CMSPageSections from './sections';
import CMSPageSEO from './seo';

type CMSPageProps = {
  page: Page;
};

function CMSPage({ page }: CMSPageProps) {
  return (
    <React.Fragment>
      <CMSPageSEO page={page} />
      <Column>
        <CMSPageHero hero={page.hero} />
        <CMSPageSections sections={page.sections} />
      </Column>
    </React.Fragment>
  );
}

export default CMSPage;
