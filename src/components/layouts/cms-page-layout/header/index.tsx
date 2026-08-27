import { AppBar, Toolbar } from '@mui/material';
import ContentBox from '~/components/generics/content-box';
import { Header as HeaderType, SiteSetting } from '~/types';
import Brand from './brand';
import DesktopNavigation from './navigation/desktop';
import MobileNavigation from './navigation/mobile';

type HeaderProps = {
  header?: HeaderType;
  settings?: SiteSetting;
};

/** Sticky site header driven by the Header global. */
function Header({ header, settings }: HeaderProps) {
  const items = header?.items ?? [];

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <ContentBox>
        <Toolbar
          disableGutters
          sx={{ minHeight: { xs: 66, md: 80 }, gap: { xs: 1.5, md: 2.25 } }}
        >
          <Brand settings={settings} />
          <DesktopNavigation
            items={items}
            sx={{ display: { xs: 'none', lg: 'flex' }, ml: 'auto' }}
          />
          <MobileNavigation
            items={items}
            settings={settings}
            sx={{ display: { xs: 'flex', lg: 'none' }, ml: 'auto' }}
          />
        </Toolbar>
      </ContentBox>
    </AppBar>
  );
}

export default Header;
