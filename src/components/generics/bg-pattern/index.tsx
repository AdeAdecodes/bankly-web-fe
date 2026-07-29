import Image from '~/components/shared/image';
import { Page } from '~/types';

type Background = NonNullable<NonNullable<Page['hero']>['background']>;

type BgPatternProps = {
  pattern: Background['pattern'];
};

function BgPattern({ pattern }: BgPatternProps) {
  if (!pattern) return null;

  switch (pattern) {
    case 'discs':
      return (
        <Image
          type="bg"
          src={require('./patterns/discs.svg?url')}
          fit="contain"
          sx={{ backgroundRepeat: 'repeat' }}
        />
      );
    case 'flat-discs':
      return (
        <Image
          type="bg"
          src={require('./patterns/flat-discs-x.svg?url')}
          fit="contain"
          sx={{ backgroundRepeat: 'repeat' }}
        />
      );
    case 'left-positioned-logo':
      return (
        <Image
          type="bg"
          src={require('./patterns/left-aligned-logo.svg?url')}
          fit="contain"
          position="left"
        />
      );
    case 'right-positioned-logo':
      return (
        <Image
          type="bg"
          src={require('./patterns/right-aligned-logo.svg?url')}
          fit="contain"
          position="right"
        />
      );
    case 'spiral':
      return (
        <Image
          type="bg"
          src={require('./patterns/spiral.svg?url')}
          fit="cover"
          position="top left"
        />
      );
    case 'spiral-cluster':
      return (
        <Image
          type="bg"
          src={require('./patterns/spiral-cluster.svg?url')}
          fit="contain"
          sx={{ backgroundRepeat: 'repeat' }}
        />
      );
    default:
      return null;
  }
}

export default BgPattern;
