import { BlockDef } from '~/types';
import RichTextField from '../../field/rich-text-field';
import { Eyebrow } from '../../section-heading';
import SectionWrapper, { useSectionPalette } from '../../section-wrapper';
import { RichTextNode } from '../../field/rich-text-field/types';

type RichTextBlockProps = {
  block: BlockDef<'rich-text'>;
};

const MAX_WIDTH = { narrow: 720, default: 900, wide: 'none' } as const;

const renderers = {
  label: (node: RichTextNode) => (
    <Eyebrow key="label">
      {'children' in node
        ? node.children
            .map((child) => ('text' in child ? child.text : ''))
            .join('')
        : ''}
    </Eyebrow>
  ),
};

/** Free-form rich text in a centred column. */
function RichTextBlock({ block }: RichTextBlockProps) {
  return (
    <SectionWrapper section={block.section} id={block.blockName}>
      <Body block={block} />
    </SectionWrapper>
  );
}

function Body({ block }: RichTextBlockProps) {
  const palette = useSectionPalette();

  return (
    <RichTextField
      value={block.content}
      renderers={renderers}
      gap={1.5}
      maxWidth={MAX_WIDTH[block.width ?? 'default']}
      mx="auto"
      sx={{
        '& h2, & h3, & h4': { color: palette.heading },
        '& h2': { fontSize: { xs: 26, md: 30 }, mt: 1 },
        '& p, & li': { color: palette.fg },
        '& ul, & ol': { pl: 3, m: 0 },
        '& li': { mb: 0.75 },
        '& a': { color: 'primary.main', textDecoration: 'underline' },
      }}
    />
  );
}

export default RichTextBlock;
