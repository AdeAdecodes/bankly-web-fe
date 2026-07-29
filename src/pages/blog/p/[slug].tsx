import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import fetchBlogPost from '~/api/helpers/blog/fetch-blog-post';
import BlogPostPageImpl from '~/components/impls/blog/slug';
import CMSPageLayout from '~/components/layouts/cms-page-layout';
import defineComponent from '~/helpers/define-component';
import { BlogPost } from '~/types';

type BlogPostPageProps = {
  post: BlogPost;
};

function BlogPostPage(props: BlogPostPageProps) {
  return <BlogPostPageImpl {...props} />;
}

BlogPostPage.Layout = defineComponent(
  CMSPageLayout,
  (pageProps: BlogPostPageProps) => ({
    layout: pageProps.post.pageLayout!,
  })
);

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  const post = await fetchBlogPost(ctx.params?.slug as any);

  if (!post) return { notFound: true };

  return {
    props: {
      post,
    },
  };
}

export default BlogPostPage;
