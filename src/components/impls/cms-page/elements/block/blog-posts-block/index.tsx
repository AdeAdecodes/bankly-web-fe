import { Box, Button, Skeleton, Typography } from '@mui/material';
import LoadableContent from '@xod/mui-loadable-content';
import React from 'react';
import useBlogPosts from '~/api/helpers/blog/use-blog-posts';
import AspectRatio from '~/components/shared/aspect-ratio';
import CssGrid, { CssGridProps } from '~/components/shared/css-grid';
import InfoBox from '~/components/shared/info-box';
import { Column, Row } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import parseColumns from '~/helpers/parse-columns';
import { BlogPost, BlogPostCategory, PopulatedBlockDef, User } from '~/types';
import { formatDate } from '~/utils/date';
import MediaField from '../../field/media-field';

type BlogPostsBlockProps = {
  block: PopulatedBlockDef<'blog-posts-block'>;
};

function BlogPostsBlock({ block }: BlogPostsBlockProps) {
  const columns = parseColumns(block.columns || '3');

  const queryState = useBlogPosts(block, {
    page: block.populatedData.page,
    limit: block.populatedData.limit,
  });

  return (
    <Column gap={3}>
      {block.showCategoriesFilterBox && <CategoriesFilterBox />}
      <LoadableContent
        state={{
          empty: !queryState.blogPosts?.length,
          loading: queryState.isLoading,
          error: queryState.isError,
        }}
        LoadedContent={LoadedContent}
        LoadedContentProps={{ columns, queryState, block }}
        LoadingContent={LoadingContent}
        LoadingContentProps={{ columns }}
        EmptyContent={EmptyContent}
        ErrorContent={ErrorContent}
        ErrorContentProps={{ error: queryState.error }}
      />
    </Column>
  );
}

type LoadedContentProps = {
  columns: CssGridProps['columns'];
  queryState: ReturnType<typeof useBlogPosts>;
  block: BlogPostsBlockProps['block'];
};

function LoadedContent({ columns, queryState, block }: LoadedContentProps) {
  const BlogPostCard = block.fixed ? BlogPostCardTypeB : BlogPostCardTypeA;

  const { blogPosts } = queryState;

  return (
    <Column gap={8} pb={8}>
      <CssGrid columns={columns} rowSpacing={3} columnSpacing={8}>
        {blogPosts?.map((blogPost) => (
          <BlogPostCard key={blogPost.id} blogPost={blogPost} />
        ))}
      </CssGrid>
      {!block.fixed && (
        <React.Fragment>
          {queryState.isFetchingNextPage && (
            <LoadingContent columns={columns} />
          )}
          {queryState.hasNextPage && !queryState.isFetchingNextPage && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => void queryState.fetchNextPage()}
              sx={{ alignSelf: 'center' }}
            >
              Load more
            </Button>
          )}
        </React.Fragment>
      )}
    </Column>
  );
}

type LoadingContentProps = {
  columns: CssGridProps['columns'];
};

function LoadingContent({ columns }: LoadingContentProps) {
  return (
    <CssGrid columns={columns} rowSpacing={3} columnSpacing={8}>
      <LoadingBlogPostCard />
      <LoadingBlogPostCard />
      <LoadingBlogPostCard />
    </CssGrid>
  );
}

function EmptyContent() {
  return (
    <InfoBox
      title="No posts found"
      hint="Look out for this spot, more posts incoming"
    />
  );
}

function ErrorContent() {
  return null;
}

function CategoriesFilterBox() {
  return null;
}

type BlogPostCardProps = {
  blogPost: BlogPost;
};

function BlogPostCardTypeA({ blogPost }: BlogPostCardProps) {
  const author = blogPost.author as User;
  const category = blogPost.category as BlogPostCategory;

  return (
    <Column gap={1}>
      <AspectRatio
        component={Link}
        href={`/blog/p/${blogPost.slug!}`}
        value={2.075}
        bgcolor="grey.200"
        borderRadius={1}
      >
        <MediaField
          media={blogPost.media}
          bgcolor="grey.200"
          borderRadius={1}
          fit="cover"
        />
      </AspectRatio>
      <Typography variant="overline" color="primary.main" fontWeight={600}>
        {category.name}
      </Typography>
      <Column pb={1}>
        <Link
          href={`/blog/p/${blogPost.slug!}`}
          variant="h5"
          underline="hover"
          color="text.primary"
          fontWeight={700}
          mui
        >
          {blogPost.title}
        </Link>
        <Typography variant="body2">{blogPost.summary}</Typography>
      </Column>
      <Row crossAxisAlignment="center" gap={2}>
        <MediaField
          media={author.photo}
          width={32}
          height={32}
          fit="cover"
          borderRadius="50%"
        />
        <Column>
          <Typography variant="subtitle2">{author.name}</Typography>
          <Row
            crossAxisAlignment="center"
            divider={
              <Box
                width={4}
                height={4}
                bgcolor="grey.500"
                borderRadius="50%"
                mx={1.5}
              />
            }
          >
            <Typography variant="caption" color="text.secondary">
              {formatDate(blogPost.createdAt, 'Do MMMM YYYY')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {blogPost.estimatedReadTime} read
            </Typography>
          </Row>
        </Column>
      </Row>
    </Column>
  );
}

function BlogPostCardTypeB({ blogPost }: BlogPostCardProps) {
  const author = blogPost.author as User;

  return (
    <Column
      component={Link}
      href={`/blog/p/${blogPost.slug!}`}
      color="text.primary"
      underline="none"
      mui
      gap={1}
    >
      <AspectRatio value={2.075} bgcolor="grey.200" borderRadius={1}>
        <MediaField
          media={blogPost.media}
          bgcolor="grey.200"
          borderRadius={1}
          fit="cover"
        />
      </AspectRatio>
      <Column pb={1}>
        <Typography variant="h5" fontWeight={700}>
          {blogPost.title}
        </Typography>
        <Typography variant="body2">{blogPost.summary}</Typography>
      </Column>
      <Row
        crossAxisAlignment="center"
        mainAxisAlignment="space-between"
        gap={2}
      >
        <Row crossAxisAlignment="center" gap={2}>
          <MediaField
            media={author.photo}
            width={32}
            height={32}
            fit="cover"
            borderRadius="50%"
          />
          <Typography variant="subtitle2">{author.name}</Typography>
        </Row>
        <Typography variant="caption" color="text.secondary">
          {blogPost.estimatedReadTime} read
        </Typography>
      </Row>
    </Column>
  );
}

function LoadingBlogPostCard() {
  return (
    <Column gap={1}>
      <AspectRatio value={2.075} bgcolor="grey.200" borderRadius={1}>
        <Skeleton variant="rectangular" />
      </AspectRatio>
      <Skeleton height={16} width={48} />
      <Column pb={1}>
        <Skeleton height={24} width="80%" />
        <Column>
          <Skeleton height={16} width="100%" />
          <Skeleton height={16} width="100%" />
          <Skeleton height={16} width="70%" />
          <Skeleton height={16} width="50%" />
        </Column>
      </Column>
      <Row crossAxisAlignment="center" gap={2}>
        <Skeleton variant="circular" width={32} height={32} />
        <Column>
          <Skeleton height={16} width="8ch" />
          <Row
            crossAxisAlignment="center"
            divider={
              <Box
                width={4}
                height={4}
                bgcolor="grey.500"
                borderRadius="50%"
                mx={1.5}
              />
            }
          >
            <Skeleton height={10} width="8.5ch" />
            <Skeleton height={10} width="8ch" />
          </Row>
        </Column>
      </Row>
    </Column>
  );
}

export default BlogPostsBlock;
