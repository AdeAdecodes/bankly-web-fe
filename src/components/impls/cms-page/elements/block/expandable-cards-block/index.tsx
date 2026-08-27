import { Box, Collapse, Typography } from '@mui/material';
import React from 'react';
import { Column, FlexItem } from '~/components/shared/layout';
import { BlockDef } from '~/types';
import MediaField from '../../field/media-field';
import RichTextField from '../../field/rich-text-field';

type ExpandableCardsBlockProps = {
  block: BlockDef<'expandable-cards-block'>;
};

function ExpandableCardsBlock({ block }: ExpandableCardsBlockProps) {
  const [expandedIndex, setExpandedIndex] = React.useState(0);

  return (
    <FlexItem direction={{ xs: 'column', sm: 'row' }} minHeight={400} gap={2}>
      {block.cards.map((card, index) => (
        <ExpandableCard
          key={card.id}
          card={card}
          expanded={expandedIndex === index}
          onChange={() => setExpandedIndex((x) => (x === index ? 0 : index))}
        />
      ))}
    </FlexItem>
  );
}

type ExpandableCardProps = {
  card: ExpandableCardsBlockProps['block']['cards'][number];
  expanded: boolean;
  onChange: () => void;
};

function ExpandableCard({ card, expanded, onChange }: ExpandableCardProps) {
  return (
    <Box
      position="relative"
      flex={expanded ? 3 : 1}
      onMouseEnter={onChange}
      onMouseLeave={onChange}
      overflow="hidden"
      borderRadius={2}
      minWidth={120}
      sx={{ transition: 'flex 0.125s' }}
    >
      <MediaField
        type="bg"
        media={card.media}
        fit="cover"
        position="center"
        sx={{ zIndex: 0 }}
      />
      <Box
        position="absolute"
        sx={{
          backgroundImage: (theme) => theme.palette.gradients.cardFade,
          inset: 0,
        }}
      />
      <Column
        position="absolute"
        px={{ xs: 3, sm: 5 }}
        color="white"
        bottom={{ xs: 24, sm: 48 }}
        maxWidth={400}
        gap={2}
        overflow="hidden"
      >
        <Typography variant="h5" fontWeight={700}>
          {card.title}
        </Typography>
        <Collapse in={expanded}>
          <RichTextField value={card.content as any} />
        </Collapse>
      </Column>
    </Box>
  );
}

export default ExpandableCardsBlock;
