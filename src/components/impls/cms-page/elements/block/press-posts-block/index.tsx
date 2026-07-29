import { alpha, Typography } from '@mui/material';
import BoxArrowUpRight from '~/components/icons/box-arrow-up-right';
import AspectRatio from '~/components/shared/aspect-ratio';
import CssGrid from '~/components/shared/css-grid';
import { Column, Row } from '~/components/shared/layout';
import parseColumns from '~/helpers/parse-columns';
import { PopulatedBlockDef, PressPost } from '~/types';
import { formatDate } from '~/utils/date';
import ActionField from '../../field/action-field';
import MediaField from '../../field/media-field';

type PressPostsBlockProps = {
  block: PopulatedBlockDef<'press-posts-block'>;
};

function PressPostsBlock({ block }: PressPostsBlockProps) {
  return (
    <Column gap={3}>
      {block.configuration?.title && (
        <Row
          crossAxisAlignment="center"
          mainAxisAlignment="space-between"
          gap={2}
        >
          <Typography variant="h5" fontWeight={700}>
            {block.configuration.title}
          </Typography>
          <ActionField
            action={block.configuration.action}
            textProps={{ variant: 'body2' }}
          />
        </Row>
      )}
      <CssGrid
        columns={parseColumns(block.columns || '2')}
        rowSpacing={3}
        columnSpacing={8}
      >
        {block.populatedData.docs.map((post) => (
          <PressPostCard key={post.id} post={post} />
        ))}
      </CssGrid>
    </Column>
  );
}

type PressPostCardProps = {
  post: PressPost;
};

function PressPostCard({ post }: PressPostCardProps) {
  return (
    <Column gap={1}>
      <AspectRatio value={2.075} bgcolor="grey.200" borderRadius={1}>
        <MediaField
          media={post.media}
          bgcolor="grey.200"
          borderRadius={1}
          fit="cover"
        />
      </AspectRatio>
      <Row crossAxisAlignment="center" gap={2}>
        <Typography variant="overline" color="primary.main" fontWeight={600}>
          Press
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {post.date || formatDate(post.createdAt, 'Do MMMM YYYY')}
        </Typography>
      </Row>
      <Column pb={1}>
        <Typography variant="h5" fontWeight={700}>
          {post.title}
        </Typography>
        <Typography variant="body2">{post.description}</Typography>
      </Column>
      <ActionField
        action={{
          type: 'custom',
          url: post.url,
          label: 'Learn More',
          showArrow: true,
          newTab: true,
        }}
        textProps={{ variant: 'body2' }}
        arrow={<BoxArrowUpRight sx={{ fontSize: '0.75rem' }} />}
        underline="none"
        sx={{
          alignSelf: 'start',
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
          },
        }}
      />
    </Column>
  );
}

export default PressPostsBlock;
