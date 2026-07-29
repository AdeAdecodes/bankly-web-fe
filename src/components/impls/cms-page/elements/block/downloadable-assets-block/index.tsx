import { Typography } from '@mui/material';
import DownloadableLink from '~/components/generics/downloadable-link';
import DownloadIcon from '~/components/icons/download';
import AspectRatio from '~/components/shared/aspect-ratio';
import CssGrid from '~/components/shared/css-grid';
import { Column, Row } from '~/components/shared/layout';
import parseColumns from '~/helpers/parse-columns';
import { BlockDef, Media } from '~/types';
import MediaField from '../../field/media-field';
import RichTextField from '../../field/rich-text-field';

type DownloadableAssetsBlockProps = {
  block: BlockDef<'downloadable-assets-block'>;
};

function DownloadableAssetsBlock({ block }: DownloadableAssetsBlockProps) {
  return (
    <Column gap={3}>
      <Row crossAxisAlignment="center">
        <RichTextField value={block.title as any} />
      </Row>
      <CssGrid columns={parseColumns(block.columns || '3')} spacing={2}>
        {block.assets?.map((asset) => (
          <DownloadableAssetCard
            key={asset.id}
            asset={asset}
            aspectRatio={Number(block.mediaAspectRatio || 1.78)}
            downloadable={!block.hideDownloadButton}
          />
        ))}
      </CssGrid>
    </Column>
  );
}

type Asset = NonNullable<
  BlockDef<'downloadable-assets-block'>['assets']
>[number];

type DownloadableAssetCardProps = {
  asset: Asset;
  aspectRatio: number;
  downloadable: boolean;
};

function DownloadableAssetCard({
  asset,
  aspectRatio,
  downloadable,
}: DownloadableAssetCardProps) {
  const media = asset.asset as Media;

  return (
    <Column gap={2}>
      <AspectRatio
        value={aspectRatio}
        borderRadius={1.5}
        boxShadow="0px 0px 1px rgba(12, 26, 75, 0.1), 0px 4px 20px -2px rgba(50, 50, 71, 0.08)"
        overflow="hidden"
      >
        <MediaField
          media={media}
          fit={asset.boxed ? 'contain' : 'cover'}
          py={asset.boxed ? 2 : undefined}
        />
      </AspectRatio>
      <Row
        mainAxisAlignment="space-between"
        crossAxisAlignment="center"
        gap={2}
      >
        <Typography variant="body2">{asset.name}</Typography>
        {downloadable && (
          <DownloadableLink href={(asset.asset as Media).url!}>
            <DownloadIcon fontSize="small" />
          </DownloadableLink>
        )}
      </Row>
    </Column>
  );
}

export default DownloadableAssetsBlock;
