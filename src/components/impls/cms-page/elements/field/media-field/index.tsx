import { Media, RefMedia } from '~/types';
import ImageField, { ImageFieldProps } from './image';
import VideoField, { VideoFieldProps } from './video';

type MediaFieldProps = (
  | Omit<ImageFieldProps, 'media'>
  | Omit<VideoFieldProps, 'media'>
) & {
  media?: string | Media | RefMedia;
};

function MediaField({ media, ...props }: MediaFieldProps) {
  if (!media || typeof media === 'string') return null;

  const _media =
    'ref' in media ? media : { ref: media as Media, maxHeight: undefined };

  if (!_media.ref || typeof _media.ref === 'string') return null;

  const isVideo = _media.ref.mimeType?.includes('video');
  const resolved = {
    ..._media,
    maxHeight: isNumber(_media.maxHeight)
      ? Number(_media.maxHeight)
      : _media.maxHeight || undefined,
  };

  if (isVideo) {
    return <VideoField {...(props as any)} media={resolved} />;
  }

  return <ImageField {...(props as any)} media={resolved} />;
}

function isNumber(value: any) {
  return /^[.\d]+$/.test(value);
}

export default MediaField;
