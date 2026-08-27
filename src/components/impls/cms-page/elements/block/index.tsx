import React from 'react';
import { Block, BlockType } from '~/types';
import SectionWrapper from '../section-wrapper';
import ActionGroupBlock from './action-group-block';
import ContactFormBlock from './contact-form';
import DownloadableAssetsBlock from './downloadable-assets-block';
import ExpandableCardsBlock from './expandable-cards-block';
import HeroSliderBlock from './hero-slider';
import HighCommissionerSectionBlock from './high-commissioner-section';
import ItemGridBlock from './item-grid-block';
import MediaBlock from './media-block';
import MediaContentBlock from './media-content-block';
import MediaGridBlock from './media-grid-block';
import NewsGridBlock from './news-grid';
import RichTextBlock from './rich-text';
import ServiceGridBlock from './service-grid';
import StatsSectionBlock from './stats-section';
import VideoGalleryBlock from './video-gallery';

type BlockComponent = React.ComponentType<{ block: any }>;

/** Placeholder for block types whose frontend component is not built yet. */
const NullBlock: BlockComponent = () => null;

/**
 * blockType → React component. Every block type from the CMS must have an
 * entry; unfinished ones render nothing rather than breaking the page.
 */
export const blockTypeToComponentMap: Record<BlockType, BlockComponent> = {
  'hero-slider': HeroSliderBlock,
  'page-hero': NullBlock, // milestone 2
  'alert-bar': NullBlock, // milestone 2
  'service-grid': ServiceGridBlock,
  'high-commissioner-section': HighCommissionerSectionBlock,
  'stats-section': StatsSectionBlock,
  'video-gallery': VideoGalleryBlock,
  'news-grid': NewsGridBlock,
  'staff-grid': NullBlock, // milestone 2
  'rich-text': RichTextBlock,
  'contact-form': ContactFormBlock,
  'media-content-block': MediaContentBlock,
  'item-grid-block': ItemGridBlock,
  'media-block': MediaBlock,
  'media-grid-block': MediaGridBlock,
  'expandable-cards-block': ExpandableCardsBlock,
  'downloadable-assets-block': DownloadableAssetsBlock,
  'action-group-block': ActionGroupBlock,
};

/** Legacy blocks that render bare content — give them a standard section band. */
const BARE_BLOCKS = new Set<BlockType>([
  'media-block',
  'media-grid-block',
  'expandable-cards-block',
  'downloadable-assets-block',
  'action-group-block',
]);

type CMSBlockProps = {
  block: Block;
};

function CMSBlock({ block }: CMSBlockProps) {
  const Component = blockTypeToComponentMap[block.blockType];

  if (!Component) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        `[CMSBlock] no component registered for "${block.blockType}"`
      );
    }
    return null;
  }

  const content = <Component block={block} />;

  return (
    <BlockErrorBoundary blockType={block.blockType}>
      {BARE_BLOCKS.has(block.blockType) ? (
        <SectionWrapper id={block.blockName}>{content}</SectionWrapper>
      ) : (
        content
      )}
    </BlockErrorBoundary>
  );
}

type BoundaryProps = { blockType: string; children: React.ReactNode };
type BoundaryState = { failed: boolean };

/** A single misconfigured block must never take the whole page down. */
class BlockErrorBoundary extends React.Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error(
      `[CMSBlock] "${this.props.blockType}" failed to render`,
      error
    );
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default CMSBlock;
