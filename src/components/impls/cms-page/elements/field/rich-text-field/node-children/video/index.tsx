import AspectRatio from '~/components/shared/aspect-ratio';
import { RichTextVideoNode } from '../../types';

type RichTextVideoProps = {
  node: RichTextVideoNode;
};

const sourceToComponent = {
  youtube: YoutubeVideoEmbed,
  vimeo: VimeoVideoEmbed,
};

function RichTextVideo({ node }: RichTextVideoProps) {
  const Component = sourceToComponent[node.value.source];

  if (!Component) return null;

  return (
    <AspectRatio value={16 / 9}>
      <Component id={node.value.id} />
    </AspectRatio>
  );
}

function YoutubeVideoEmbed({ id }: { id: string }) {
  return (
    <iframe
      title="YouTube player"
      src={`https://www.youtube.com/embed/${id}`}
      frameBorder="0"
      allow="autoplay; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

function VimeoVideoEmbed({ id }: { id: string }) {
  return (
    <iframe
      title="Vimeo player"
      src={`https://player.vimeo.com/video/${id}}`}
      frameBorder="0"
      allowFullScreen
      allow="autoplay; fullscreen; picture-in-picture"
    />
  );
}

export default RichTextVideo;
