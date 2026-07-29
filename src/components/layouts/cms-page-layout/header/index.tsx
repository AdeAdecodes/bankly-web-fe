import { AppBar, Toolbar } from '@mui/material';
import ContentBox from '~/components/generics/content-box';
import MediaField from '~/components/impls/cms-page/elements/field/media-field';
import Link from '~/components/shared/link';
import { Header } from '~/types';
import Navigation from './navigation';

type HeaderProps = {
  header: Header | string;
};

function Header({ header }: HeaderProps) {
  if (typeof header === 'string' || !header.definition) return null;

  return (
    <AppBar color="default" position="sticky">
      <Toolbar component={ContentBox}>
        <Link href="/" color="text.primary" mui>
          <MediaField media={header.definition.logo} height={32} />
        </Link>
        <Navigation items={header.definition.items!} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
