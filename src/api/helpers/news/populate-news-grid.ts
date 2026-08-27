import { PopulatedBlockDef } from '~/types';
import fetchNewsArticles from './fetch-news-articles';

export default async function populateNewsGrid(
  block: PopulatedBlockDef<'news-grid'>
) {
  const result = await fetchNewsArticles({
    limit: block.limit ?? 3,
    category: block.category,
  });

  block.populatedData = { articles: result.docs };
}
