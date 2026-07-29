import { Box, Typography } from '@mui/material';
import React from 'react';
import ContentBox from '~/components/generics/content-box';
import AspectRatio from '~/components/shared/aspect-ratio';
import { Column, Row, Spacer } from '~/components/shared/layout';
import PageSEO from '~/components/shared/page-seo';
import { BlogPost, Media, User } from '~/types';
import { formatDate } from '~/utils/date';
import MediaField from '../../cms-page/elements/field/media-field';
import RichTextField from '../../cms-page/elements/field/rich-text-field';

type BlogPostPageImplProps = {
  post: BlogPost;
};

function BlogPostPageImpl({ post }: BlogPostPageImplProps) {
  return (
    <React.Fragment>
      <PageSEO
        title={post.title}
        description={post.summary}
        image={(post.media?.ref as Media)?.url}
      />
      <ContentBox py={12} px={2}>
        <Column gap={4} width={{ xs: 1, sm: 0.8 }} mx="auto">
          <Typography
            variant="h2"
            fontWeight={700}
            align="center"
            sx={{ maxWidth: 720, mx: 'auto' }}
          >
            {post.title}
          </Typography>
          <Column gap={1}>
            <AspectRatio value={2.196}>
              <MediaField media={post.media} fit="cover" />
            </AspectRatio>
            <Row gap={2} crossAxisAlignment="center" flexWrap="wrap">
              <Row gap={2}>
                {post.tags?.split(/,\s*/g).map((tag, i) => (
                  <Box
                    key={i}
                    bgcolor="#EAF0FE"
                    border="1px solid"
                    borderColor="currentColor"
                    borderRadius={0.5}
                    px={2}
                    py={0.25}
                    color="primary.main"
                    fontSize="0.85rem"
                  >
                    {tag}
                  </Box>
                ))}
              </Row>
              <Row gap={3} crossAxisAlignment="center" ml="auto">
                <Typography variant="body2">
                  <strong>{(post.author as User).name}</strong>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  {formatDate(post.createdAt, 'MMMM D, YYYY')}{' '}
                </Typography>
                <Spacer />
                <Typography variant="body2" color="text.secondary">
                  {post.estimatedReadTime} read
                </Typography>
              </Row>
            </Row>
          </Column>
          <RichTextField value={post.content as any} py={5} />
        </Column>
        <Spacer sy={6} />
        {/* <SimilarPostsSection post={post} /> */}
      </ContentBox>
    </React.Fragment>
  );
}

// type SimilarPostsSectionProps = {
//   post: BlogPost;
// };

// function SimilarPostsSection({ post }: SimilarPostsSectionProps) {
//   return (
//     <Column gap={5} py={4}>
//       <Typography variant="h3" fontWeight={700}>
//         Read similar articles
//       </Typography>
//       {/* <BlogPostsBlock */}
//       {/*   block={{ */}
//       {/*     id: 'dummy', */}
//       {/*     blockType: 'blog-posts-block', */}
//       {/*     type: post.type, */}
//       {/*     columns: '3', */}
//       {/*     fixed: true, */}
//       {/*     postCount: '3', */}
//       {/*   }} */}
//       {/* /> */}
//     </Column>
//   );
// }

export default BlogPostPageImpl;
