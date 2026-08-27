import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import Breadcrumbs from '~/components/shared/breadcrumbs';
import { BlockDef } from '~/types';
import ActionGroupField from '../../field/action-group-field';
import { Eyebrow } from '../../section-heading';
import SectionWrapper, { useSectionPalette } from '../../section-wrapper';

type PageHeroBlockProps = {
  block: BlockDef<'page-hero'>;
};

/** Inner-page hero: kicker, h1, lead and optional CTAs (casa-web `.ms-hero`, `.ct-hero`). */
function PageHeroBlock({ block }: PageHeroBlockProps) {
  const router = useRouter();

  return (
    <React.Fragment>
      {block.showBreadcrumbs && (
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: block.heading, href: router.asPath },
          ]}
        />
      )}
      <SectionWrapper
        section={{
          theme: block.section?.theme ?? 'cream',
          spacing: block.section?.spacing ?? 'compact',
        }}
        id={block.blockName}
      >
        <Body block={block} />
      </SectionWrapper>
    </React.Fragment>
  );
}

function Body({ block }: PageHeroBlockProps) {
  const palette = useSectionPalette();
  const hasActions = !!block.actions?.length;

  return (
    <Box
      textAlign="center"
      maxWidth={hasActions ? 760 : 680}
      mx="auto"
      pt={{ xs: 1, md: 2 }}
    >
      {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: 29, md: 38 },
          color: palette.heading,
          mt: block.eyebrow ? 1.75 : 0,
        }}
      >
        {block.heading}
      </Typography>
      {block.lead && (
        <Typography
          sx={{ fontSize: 16, color: palette.muted, lineHeight: 1.7, mt: 2 }}
        >
          {block.lead}
        </Typography>
      )}
      {hasActions && (
        <ActionGroupField
          actions={block.actions}
          gap={1.75}
          mt={3.75}
          flexWrap="wrap"
          mainAxisAlignment="center"
        />
      )}
    </Box>
  );
}

export default PageHeroBlock;
