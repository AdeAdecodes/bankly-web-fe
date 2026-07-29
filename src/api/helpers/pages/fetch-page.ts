import api from '~/api';
import { Page, PopulatableBlock } from '~/types';
import { querify } from '~/utils/querify';
import populateBlogPostsBlock from '../blog/populate-blog-posts-block';
import populateCaseStudiesBlock from '../case-studies/populate-case-studies-block';
import populateHelpTopicsBlock from '../help-centre/populate-help-topics-block';
import populateOpeningsBlock from '../openings/populate-openings-block';
import populatePressPostsBlock from '../press/populate-press-posts-block';
import populateTeamMembersBlock from '../team-members/populate-team-members-block';
import populateTestimonialsBlock from '../testimonials/populate-testimonials-block';

export default async function fetchPage(slugSegments?: string[]) {
  const resolvedSlugSegments = slugSegments || [''];
  const slug = resolvedSlugSegments.join('/');

  try {
    const result = await api.get<{ docs: Page[] }>(
      querify('/pages', { where: { slug: { equals: slug } } })
    );
    return withPopulatedBlocks(result.data.docs[0]);
  } catch (e) {
    return console.log(e);
  }
}

type PopulatableBlockType = PopulatableBlock['blockType'];
type PopulateFn = (block: any) => Promise<void>;

const populatableBlockToFnMap: Record<PopulatableBlockType, PopulateFn> = {
  'blog-posts-block': populateBlogPostsBlock,
  'press-posts-block': populatePressPostsBlock,
  'help-topics-block': populateHelpTopicsBlock,
  'openings-block': populateOpeningsBlock,
  'team-members-block': populateTeamMembersBlock,
  'testimonials-block': populateTestimonialsBlock,
  'case-studies-block': populateCaseStudiesBlock,
};

async function withPopulatedBlocks(page?: Page) {
  if (!page) return null;

  for (const section of page.sections) {
    if (!section.blocks) continue;

    for (const block of section.blocks) {
      if (!(block.blockType in populatableBlockToFnMap)) continue;

      const populateFn =
        populatableBlockToFnMap[block.blockType as PopulatableBlockType];

      if (populateFn) {
        await populateFn(block as PopulatableBlock);
      }
    }
  }

  return page;
}
