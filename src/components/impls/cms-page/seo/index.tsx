import PageSEO from '~/components/shared/page-seo';
import { Media, Page } from '~/types';

type CMSPageSEOProps = {
  page: Page;
};

function CMSPageSEO({ page }: CMSPageSEOProps) {
  const image = page.meta?.image as Media | undefined;

  return (
    <PageSEO
      title={page.meta?.title || page.title}
      description={page.meta?.description}
      image={image?.url}
    />
  );
}

export default CMSPageSEO;
