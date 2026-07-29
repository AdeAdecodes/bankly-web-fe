import { BoxProps } from '@mui/material';
import { ImageProps as NextImageProps } from 'next/image';
import { CSSProperties } from 'react';
import BgImage from './bg';
import NormalImage from './normal';

export type ImageProps = {
  type?: 'normal' | 'bg';
  src: NextImageProps['src'];
  position?: string;
  fit?: CSSProperties['objectFit'];
} & Omit<BoxProps, 'position'>;

function Image(props: ImageProps) {
  if (props.type === 'bg') {
    return <BgImage {...props} />;
  }

  return <NormalImage {...props} />;
}

export default Image;
