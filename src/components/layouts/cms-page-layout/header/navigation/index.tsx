import { Hidden } from '@mui/material';
import React from 'react';
import { NavigationItem } from '~/types';
import DesktopNavigation from './desktop';
import MobileNavigation from './mobile';

type NavigationProps = {
  items: NavigationItem[];
};

function Navigation({ items }: NavigationProps) {
  return (
    <React.Fragment>
      <Hidden mdDown>
        <DesktopNavigation items={items} />
      </Hidden>
      <Hidden mdUp>
        <MobileNavigation items={items} />
      </Hidden>
    </React.Fragment>
  );
}

export default Navigation;
