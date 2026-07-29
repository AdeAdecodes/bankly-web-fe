import { BlockDef, PopulatableBlockPopulated } from '~/types';
import fetchCaseStudies from './fetch-case-studies';

// eslint-disable-next-line @typescript-eslint/require-await
export default async function populateCaseStudiesBlock(
  block: BlockDef<'case-studies-block'>
) {
  const populated: PopulatableBlockPopulated<'case-studies-block'> = {
    caseStudies: (await fetchCaseStudies()).docs,
  };
  block.populatedData = populated;
}
