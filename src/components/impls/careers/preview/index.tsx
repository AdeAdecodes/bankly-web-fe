import { Typography } from '@mui/material';
import React from 'react';
import ContentBox from '~/components/generics/content-box';
import { Column, FlexItem, Spacer } from '~/components/shared/layout';
import PageSEO from '~/components/shared/page-seo';
import { Opening } from '~/types';
import { timeAgo } from '~/utils/date';
import ActionField from '../../cms-page/elements/field/action-field';
import RichTextField from '../../cms-page/elements/field/rich-text-field';
import CMSPageSection from '../../cms-page/elements/section';

type CareersPreviewPageImplProps = {
  opening: Opening;
};

function CareersPreviewPageImpl({ opening }: CareersPreviewPageImplProps) {
  return (
    <React.Fragment>
      <PageSEO title={opening.title} />
      <Column>
        <HeaderSection opening={opening} />
        <ContentBox py={8}>
          <FlexItem
            direction={{ xs: 'column', md: 'row' }}
            crossAxisAlignment="start"
            gap={12}
          >
            <RichTextField value={opening.description as any} />
            <ApplicationBox opening={opening} />
          </FlexItem>
        </ContentBox>
      </Column>
    </React.Fragment>
  );
}

function HeaderSection({ opening }: { opening: Opening }) {
  return (
    <CMSPageSection
      section={{
        blocks: [
          {
            id: '646c4d5167b9eb2ed43d6247',
            blockType: 'title-block',
            hero: true,
            showBreadcrumb: true,
            centered: true,
            title: [
              { type: 'h3', children: [{ text: opening.title, bold: true }] },
              {
                type: 'body1',
                children: [{ text: `Posted ${timeAgo(opening.createdAt)}` }],
              },
            ],
          },
        ],
        spacing: { top: true, bottom: true },
        boxed: true,
        background: {
          color: 'primary.main',
          pattern: 'discs',
        },
      }}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ApplicationBox({ opening }: { opening: Opening }) {
  return (
    <Column
      crossAxisAlignment="start"
      minWidth={280}
      gap={2}
      px={4}
      py={3}
      boxShadow="0px 0px 1px rgba(12, 26, 75, 0.1), 0px 10px 16px rgba(20, 37, 63, 0.06)"
      borderRadius={1.5}
    >
      <Typography fontWeight={700}>
        Ready to apply for this job opening?
      </Typography>
      <Typography>
        Please let the company know that you found this position on this Job
        Board as a way to support us, so we can keep posting cool jobs.
      </Typography>
      <Spacer sy={1} />
      <ActionField
        action={{
          label: 'Apply now',
          type: 'custom',
          url: '',
          decoration: { color: 'primary', variant: 'contained' },
        }}
      />
    </Column>
  );
}

export default CareersPreviewPageImpl;
