import { Box, Button, ButtonBase, Popover, Typography } from '@mui/material';
import { ChevronDown } from 'mdi-material-ui';
import { useRouter } from 'next/router';
import React from 'react';
import { Row, RowProps } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import getActionHref from '~/helpers/get-action-href';
import { NavigationGroup, NavigationItem } from '~/types';
import {
  dropdownContainsPath,
  navItemActiveSx,
  navItemHref,
  navItemSx,
} from '..';

type DesktopNavigationProps = RowProps & {
  items: NavigationItem[];
};

function DesktopNavigation({ items, ...props }: DesktopNavigationProps) {
  return (
    <Row
      component="nav"
      aria-label="Primary"
      crossAxisAlignment="center"
      gap={0.25}
      {...props}
    >
      {items.map((item) =>
        item.type === 'dropdown' ? (
          <DropdownItem key={item.id ?? item.label} item={item} />
        ) : (
          <LinkItem key={item.id ?? item.label} item={item} />
        )
      )}
    </Row>
  );
}

type ItemProps = { item: NavigationItem };

function LinkItem({ item }: ItemProps) {
  const router = useRouter();
  const href = navItemHref(item);
  const active = router.asPath.split('#')[0] === href;

  if (item.highlight) {
    return (
      <React.Fragment>
        <Box
          aria-hidden
          sx={{ width: '1px', height: 22, bgcolor: 'divider', mx: 0.75 }}
        />
        <Button
          href={href}
          variant="contained"
          disableElevation
          sx={{
            bgcolor: 'primary.dark',
            fontSize: 13.5,
            fontWeight: 500,
            borderRadius: '8px',
            minHeight: 0,
            px: 2.25,
            py: 1.375,
            ml: 0.5,
            lineHeight: 1,
            '&:hover': { bgcolor: 'primary.main' },
          }}
        >
          {item.label}
        </Button>
      </React.Fragment>
    );
  }

  return (
    <Link
      href={href}
      target={item.action?.newTab ? '_blank' : undefined}
      sx={{ ...navItemSx, ...(active ? navItemActiveSx : {}) } as any}
    >
      {item.label}
    </Link>
  );
}

function DropdownItem({ item }: ItemProps) {
  const router = useRouter();
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchor);
  const current = dropdownContainsPath(item, router.asPath);
  const close = () => setAnchor(null);

  React.useEffect(() => {
    router.events.on('routeChangeStart', close);
    return () => router.events.off('routeChangeStart', close);
  }, [router.events]);

  return (
    <React.Fragment>
      <ButtonBase
        onClick={(e) => setAnchor(e.currentTarget)}
        aria-haspopup="true"
        aria-expanded={open}
        sx={{
          ...navItemSx,
          gap: 0.625,
          font: 'inherit',
          ...(open || current ? navItemActiveSx : {}),
        }}
      >
        {item.label}
        <ChevronDown
          sx={{
            fontSize: 15,
            transition: 'transform .18s',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        />
      </ButtonBase>
      <Popover
        open={open}
        anchorEl={anchor}
        onClose={close}
        disableScrollLock
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1.25,
            minWidth: 290,
            border: 1,
            borderColor: 'divider',
            borderRadius: '12px',
            boxShadow: (theme) => theme.palette.customShadows.menu,
            p: 1.25,
          },
        }}
      >
        <Box role="menu">
          {(item.groups ?? []).map((group, index) => (
            <DropdownGroup
              key={group.id ?? index}
              group={group}
              first={index === 0}
              onNavigate={close}
            />
          ))}
        </Box>
      </Popover>
    </React.Fragment>
  );
}

type DropdownGroupProps = {
  group: NavigationGroup;
  first: boolean;
  onNavigate: () => void;
};

function DropdownGroup({ group, first, onNavigate }: DropdownGroupProps) {
  return (
    <Box
      sx={{
        mt: first ? 0 : 0.75,
        pt: first ? 0 : 0.75,
        borderTop: first ? 0 : 1,
        borderColor: 'divider',
      }}
    >
      {group.label && (
        <Typography
          component="span"
          sx={{
            display: 'block',
            px: 1.5,
            pt: 0.75,
            pb: 0.25,
            fontSize: 10.5,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: 'secondary.dark',
          }}
        >
          {group.label}
        </Typography>
      )}
      {group.links.map((link, index) => (
        <Link
          key={link.id ?? index}
          role="menuitem"
          href={getActionHref(link.action, '#')}
          target={link.action?.newTab ? '_blank' : undefined}
          onClick={onNavigate}
          sx={{
            display: 'block',
            px: 1.5,
            py: 1.125,
            borderRadius: '8px',
            fontSize: 13.5,
            color: 'brand.menuInk',
            lineHeight: 1.35,
            '&:hover, &:focus-visible': {
              bgcolor: 'brand.cream',
              color: 'primary.main',
            },
          }}
        >
          {link.label}
        </Link>
      ))}
    </Box>
  );
}

export default DesktopNavigation;
