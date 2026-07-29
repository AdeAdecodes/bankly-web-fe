import React from 'react';
import ContentBox from '~/components/generics/content-box';
import { Column } from '~/components/shared/layout';
import PageSEO from '~/components/shared/page-seo';
import { CaseStudy } from '~/types';
import RichTextField from '../../cms-page/elements/field/rich-text-field';
import CMSPageSection from '../../cms-page/elements/section';

type CaseStudyPageImplProps = {
  caseStudy: CaseStudy;
};

function CaseStudyPageImpl({ caseStudy }: CaseStudyPageImplProps) {
  return (
    <React.Fragment>
      <PageSEO title={`${caseStudy.name} - Featured Businesses`} />
      <Column>
        <HeroSection caseStudy={caseStudy} />
        <ContentSection caseStudy={caseStudy} />
      </Column>
    </React.Fragment>
  );
}

function HeroSection({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <CMSPageSection
      section={{
        blocks: [
          {
            id: '646c4d5167b9eb2ed43d6247',
            blockType: 'title-block',
            hero: true,
            expanded: true,
            showBreadcrumb: true,
            title: [
              { type: 'h3', children: [{ text: caseStudy.name, bold: true }] },
              { type: 'h5', children: [{ text: 'Case study', bold: true }] },
            ],
          },
        ],
        spacing: { top: true, bottom: true },
        boxed: true,
        background: {
          color: 'primary.main',
          pattern: 'flat-discs',
        },
      }}
    />
  );
}

function ContentSection({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <ContentBox py={8}>
      <RichTextField value={caseStudy.content as any} />
    </ContentBox>
  );
}

export default CaseStudyPageImpl;
