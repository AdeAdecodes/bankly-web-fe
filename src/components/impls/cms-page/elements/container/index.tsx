import { Box, BoxProps } from '@mui/material';
import { colord } from 'colord';
import React from 'react';
import BgPattern from '~/components/generics/bg-pattern';
import { Page } from '~/types';
import MediaField from '../field/media-field';

type Background = NonNullable<NonNullable<Page['hero']>['background']>;

type ContainerProps<C extends React.ComponentType = React.ComponentType> =
  BoxProps<C> & {
    background: Background | undefined;
  };

function Container({ background, children, ...props }: ContainerProps) {
  return (
    <Box
      position="relative"
      bgcolor={background?.color}
      color={getContrastColor(background?.color)}
      {...props}
    >
      {children}
      {background?.pattern && <BgPattern pattern={background.pattern} />}
      {/*TODO: pass bg related props*/}
      {background?.media?.enabled && (
        <MediaField type="bg" media={background.media.value} />
      )}
    </Box>
  );
}

function getContrastColor(color?: string) {
  if (!color) return undefined;
  return colord(color).isDark() ? '#ffffff' : 'text.primary';
}

export default Container;
