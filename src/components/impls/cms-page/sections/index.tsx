import React from 'react';
import { Page } from '~/types';
import CMSPageSection from '../elements/section';

type CMSPageSectionsProps = {
  sections: Page['sections'];
};

function CMSPageSections({ sections }: CMSPageSectionsProps) {
  return (
    <React.Fragment>
      {sections.map((section) => (
        <CMSPageSection key={section.id} section={section} />
      ))}
    </React.Fragment>
  );
}

export default CMSPageSections;
