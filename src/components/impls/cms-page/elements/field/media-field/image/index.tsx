import Image, { ImageProps } from '~/components/shared/image';
import { RefMedia } from '~/types';

export type ImageFieldProps = Omit<ImageProps, 'src'> & {
  media: RefMedia;
};

function ImageField({ media, ...props }: ImageFieldProps) {
  if (!media.ref || typeof media.ref === 'string') return null;
  return <Image maxHeight={media.maxHeight} {...props} src={media.ref.url!} />;
}

export default ImageField;
