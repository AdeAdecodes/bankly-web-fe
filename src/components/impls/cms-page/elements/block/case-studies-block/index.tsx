import { Typography } from '@mui/material';
import AspectRatio from '~/components/shared/aspect-ratio';
import CssGrid from '~/components/shared/css-grid';
import { Column, Spacer } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import parseColumns from '~/helpers/parse-columns';
import { CaseStudy, PopulatedBlockDef } from '~/types';
import MediaField from '../../field/media-field';

type CaseStudiesBlockProps = {
  block: PopulatedBlockDef<'case-studies-block'>;
};

function CaseStudiesBlock({ block }: CaseStudiesBlockProps) {
  return (
    <CssGrid columns={parseColumns(block.columns || '3')} spacing={4}>
      {block.populatedData.caseStudies.map((caseStudy) => (
        <CaseStudyItem key={caseStudy.id} caseStudy={caseStudy} />
      ))}
    </CssGrid>
  );
}

type CaseStudyItemProps = {
  caseStudy: CaseStudy;
};

function CaseStudyItem({ caseStudy }: CaseStudyItemProps) {
  return (
    <Column
      component={Link}
      href={`/featured-businesses/${caseStudy.slug!}`}
      color="text.primary"
      crossAxisAlignment="start"
    >
      <AspectRatio value={1.5} borderRadius={1} overflow="hidden">
        <MediaField media={caseStudy.media} fit="cover" position="center" />
      </AspectRatio>
      <Spacer sy={1} />
      <Typography>{caseStudy.name}</Typography>
    </Column>
  );
}

export default CaseStudiesBlock;
