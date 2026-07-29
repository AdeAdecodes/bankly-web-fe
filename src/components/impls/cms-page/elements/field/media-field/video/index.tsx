import { Box, BoxProps } from '@mui/material';
import React, { CSSProperties } from 'react';
import { RefMedia } from '~/types';

export type VideoFieldProps = React.ComponentProps<'video'> & {
  media: RefMedia;
  position?: string;
  fit?: CSSProperties['objectFit'];
} & Omit<BoxProps, 'position'>;

function VideoField({ media, fit, position, sx, ...props }: VideoFieldProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const controlled = !(media.autoplay ?? true);

  React.useEffect(() => {
    if (videoRef.current && controlled) {
      const el = videoRef.current;

      const toggle = (e: Event) => {
        console.log(e.type);
      };

      el.addEventListener('mouseenter', toggle, false);
      el.addEventListener('mouseleave', toggle, false);

      return () => {
        el.removeEventListener('mouseenter', toggle, false);
        el.removeEventListener('mouseleave', toggle, false);
      };
    }
  }, [controlled]);

  if (!media.ref || typeof media.ref === 'string') return null;

  return (
    <Box
      ref={videoRef}
      component="video"
      playsInline
      autoPlay={!controlled}
      muted={!controlled}
      loop={!controlled}
      controls={controlled}
      maxHeight={media.maxHeight}
      disablePictureInPicture
      preload="metadata"
      {...props}
      sx={{
        objectFit: fit,
        objectPosition: position,
        ...sx,
      }}
    >
      <source src={controlled ? `${media.ref.url!}#t=0.5` : media.ref.url} />
    </Box>
  );
}
export default VideoField;
