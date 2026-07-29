import { Box } from '@mui/material';
import CssGrid from '~/components/shared/css-grid';
import { Column, Row } from '~/components/shared/layout';
import { BlockDef } from '~/types';
import MediaField from '../../field/media-field';

type MediaGridBlockProps = {
  block: BlockDef<'media-grid-block'>;
};

function MediaGridBlock({ block }: MediaGridBlockProps) {
  const gap = block.compact ? 0.5 : 1;

  return (
    <CssGrid
      columnTemplate={block.columns.map((x) => `${x.sizeRatio}fr`).join(' ')}
      spacing={gap}
      px={gap}
      height={480}
    >
      {block.columns?.map((column) => {
        return (
          <Column key={column.id} gap={gap} height={1}>
            {column.entries?.map((entry) => (
              <EntryWidget key={entry.id} entry={entry} gap={gap} />
            ))}
          </Column>
        );
      })}
    </CssGrid>
  );
}

type Entry = NonNullable<
  BlockDef<'media-grid-block'>['columns'][number]['entries']
>[number];

type EntryWidgetProps = {
  entry: Entry;
  gap: any;
};

function EntryWidget({ entry, gap }: EntryWidgetProps) {
  if (entry.blockType === 'row') {
    return <RowEntryWidget entry={entry} gap={gap} />;
  } else if (entry.blockType === 'media') {
    return <GridMediaWidget media={entry.gridMedia} />;
  } else {
    throw new Error(`Unknown grid entry type`);
  }
}

type RowEntryWidgetProps = {
  entry: Extract<Entry, { blockType: 'row' }>;
  gap: any;
};

function RowEntryWidget({ entry, gap }: RowEntryWidgetProps) {
  return (
    <Row flex={entry.sizeRatio} gap={gap}>
      {entry.medias.map((media) => (
        <GridMediaWidget key={media.id} media={media.gridMedia} />
      ))}
    </Row>
  );
}

type GridMediaWidgetProps = {
  media: Extract<Entry, { blockType: 'media' }>['gridMedia'];
};

function GridMediaWidget({ media }: GridMediaWidgetProps) {
  return (
    <Box
      position="relative"
      flex={media?.sizeRatio}
      bgcolor="grey.100"
      borderRadius={1}
      overflow="hidden"
    >
      <MediaField
        type="bg"
        media={media?.media}
        fit="cover"
        height={1}
        width={1}
        position="top center"
        sx={{ zIndex: 0 }}
      />
    </Box>
  );
}

export default MediaGridBlock;
