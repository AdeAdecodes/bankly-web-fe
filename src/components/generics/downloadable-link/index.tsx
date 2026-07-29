import Link, { LinkProps } from '~/components/shared/link';

function DownloadableLink(props: LinkProps) {
  return <Link target="_blank" {...(props as any)} download />;
}

export default DownloadableLink;
