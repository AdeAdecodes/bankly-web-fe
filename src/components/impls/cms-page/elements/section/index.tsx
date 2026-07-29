import { BoxProps } from '@mui/material';
import ContentBox from '~/components/generics/content-box';
import { Column, ColumnProps } from '~/components/shared/layout';
import { Page } from '~/types';
import CMSBlock from '../block';
import Container from '../container';

type CMSPageSectionProps = BoxProps & {
  section: Page['sections'][number];
  contentProps?: ColumnProps<any>;
};

function CMSPageSection({
  section,
  contentProps,
  ...props
}: CMSPageSectionProps) {
  return (
    <Container component="section" background={section.background} {...props}>
      <Column
        component={section.boxed ? ContentBox : undefined}
        gap={4}
        pt={section.spacing?.top ? 8 : undefined}
        pb={section.spacing?.bottom ? 8 : undefined}
        {...contentProps}
        position="relative"
        zIndex={1}
        overflow="hidden"
      >
        {section.blocks?.map((block) => (
          <CMSBlock key={block.id} block={block} />
        ))}
      </Column>
    </Container>
  );
}

export default CMSPageSection;
