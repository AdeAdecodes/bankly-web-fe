import { Page } from '~/types';
import CMSPageSection from '../section';

type CMSPageHeroProps = {
  hero: Page['hero'];
};

function CMSPageHero({ hero }: CMSPageHeroProps) {
  if (!hero || hero.disabled) return null;

  return (
    <CMSPageSection
      section={toSection(hero)}
      mt={{ xs: undefined, sm: hero.overlapsHeader ? -8 : 0 }}
    />
  );
}

type Section = NonNullable<Page['sections']>[number];

function toSection(hero: NonNullable<Page['hero']>): Section {
  return {
    id: '',
    blocks: hero.block as any,
    background: hero.background,
    spacing: hero.spacing,
    boxed: true,
  };
}

export default CMSPageHero;
