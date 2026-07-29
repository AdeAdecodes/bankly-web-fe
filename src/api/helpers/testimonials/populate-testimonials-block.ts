import { BlockDef, PopulatableBlockPopulated } from '~/types';
import fetchTestimonials from './fetch-testimonials';

// eslint-disable-next-line @typescript-eslint/require-await
export default async function populateTestimonialsBlock(
  block: BlockDef<'testimonials-block'>
) {
  const populated: PopulatableBlockPopulated<'testimonials-block'> = {
    testimonials: (await fetchTestimonials()).docs,
  };
  block.populatedData = populated;
}
