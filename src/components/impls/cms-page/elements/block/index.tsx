import React from 'react';
import { Block } from '~/types';
import BlogPostsBlock from './blog-posts-block';
import ConditionalBlock from './conditional-block';
import ContentContentBlock from './content-content-block';
import DownloadableAssetsBlock from './downloadable-assets-block';
import ExpandableCardsBlock from './expandable-cards-block';
import FeaturesBlock from './features-block';
import FormWithInfoBlock from './form-with-info-block';
import HelpSearchBoxBlock from './help-search-box-block';
import HelpTopicsBlock from './help-topics-block';
import ItemGridBlock from './item-grid-block';
import MediaBlock from './media-block';
import MediaContentBlock from './media-content-block';
import MediaGridBlock from './media-grid-block';
import MediaKitCardsBlock from './media-kit-cards-block';
import OpeningsBlock from './openings-block';
import PressPostsBlock from './press-posts-block';
import ReusableContentBlock from './reusable-content-block';
import SliderBlock from './slider-block';
import TabsBlock from './tabs-block';
import TeamMembersBlock from './team-members-block';
import TestimonialsBlock from './testimonials-block';
import TitleBlock from './title-block';
import ContentBlock from './content-block';
import MediaSetBlock from './media-set-block';
import ActionGroupBlock from './action-group-block';
import CaseStudiesBlock from './case-studies-block';

type CMSBlockProps = {
  block: Block;
};

function CMSBlock({ block }: CMSBlockProps) {
  const Component = blockTypeToComponentMap[block.blockType];

  if (!Component) return null;

  return (
    <React.Fragment>
      {block.blockName && <div id={block.blockName} />}
      <Component block={block} />
    </React.Fragment>
  );
}

const blockTypeToComponentMap: Record<
  Block['blockType'],
  React.ComponentType<{ block: any }>
> = {
  'conditional-block': ConditionalBlock,
  'title-block': TitleBlock,
  'media-content-block': MediaContentBlock,
  'media-block': MediaBlock,
  'reusable-content-block': ReusableContentBlock,
  'tabs-block': TabsBlock,
  'features-block': FeaturesBlock,
  'item-grid-block': ItemGridBlock,
  'testimonials-block': TestimonialsBlock,
  'slider-block': SliderBlock,
  'media-grid-block': MediaGridBlock,
  'expandable-cards-block': ExpandableCardsBlock,
  'content-content-block': ContentContentBlock,
  'openings-block': OpeningsBlock,
  'downloadable-assets-block': DownloadableAssetsBlock,
  'media-kit-cards-block': MediaKitCardsBlock,
  'press-posts-block': PressPostsBlock,
  'team-members-block': TeamMembersBlock,
  'blog-posts-block': BlogPostsBlock,
  'help-topics-block': HelpTopicsBlock,
  'help-search-box-block': HelpSearchBoxBlock,
  'form-with-info-block': FormWithInfoBlock,
  'content-block': ContentBlock,
  'media-set-block': MediaSetBlock,
  'action-group-block': ActionGroupBlock,
  'case-studies-block': CaseStudiesBlock,
};

export default CMSBlock;
