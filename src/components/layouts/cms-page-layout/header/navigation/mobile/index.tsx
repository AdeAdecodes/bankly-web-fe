import {
  Box,
  ButtonBase,
  Collapse,
  Drawer,
  IconButton,
  Theme,
  Typography,
} from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import { ChevronDown, Close } from 'mdi-material-ui';
import { useRouter } from 'next/router';
import React from 'react';
import MenuIcon from '~/components/icons/menu';
import FlagChip from '~/components/shared/flag-chip';
import { Row, RowProps } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import getActionHref from '~/helpers/get-action-href';
import { NavigationItem, SiteSetting } from '~/types';
import Brand from '../../brand';
import { dropdownContainsPath, navItemHref } from '..';

type MobileNavigationProps = RowProps & {
  items: NavigationItem[];
  settings?: SiteSetting;
};

/** Hamburger + right-hand drawer with accordions (casa-web `.mobilemenu`). */
function MobileNavigation({
  items,
  settings,
  ...props
}: MobileNavigationProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const close = () => setOpen(false);
    router.events.on('routeChangeStart', close);
    return () => router.events.off('routeChangeStart', close);
  }, [router.events]);

  return (
    <Row {...props}>
      <IconButton
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        sx={{
          width: 46,
          height: 46,
          border: 1.5,
          borderColor: 'divider',
          borderRadius: '9px',
          color: 'primary.dark',
          '&:hover': { bgcolor: 'brand.cream' },
        }}
      >
        <MenuIcon sx={{ fontSize: 22 }} />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 'min(88vw, 340px)',
            p: '16px 18px 20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: (theme) => theme.palette.customShadows.drawer,
          },
        }}
      >
        <Row
          crossAxisAlignment="center"
          mainAxisAlignment="space-between"
          gap={1.5}
          pb={1.75}
          mb={0.75}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Brand settings={settings} compact />
          <IconButton
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            sx={{
              width: 44,
              height: 44,
              border: 1.5,
              borderColor: 'divider',
              borderRadius: '9px',
              color: 'primary.dark',
            }}
          >
            <Close />
          </IconButton>
        </Row>

        <Box component="nav" aria-label="Mobile">
          {items.map((item) =>
            item.type === 'dropdown' ? (
              <Accordion
                key={item.id ?? item.label}
                item={item}
                current={dropdownContainsPath(item, router.asPath)}
              />
            ) : (
              <MobileLink key={item.id ?? item.label} item={item} />
            )
          )}
        </Box>

        <Row
          mt="auto"
          pt={2.25}
          gap={1.125}
          crossAxisAlignment="center"
          sx={{ color: 'text.secondary', fontSize: 12 }}
        >
          <FlagChip /> Federal Republic of Nigeria
        </Row>
      </Drawer>
    </Row>
  );
}

const rowSx: SystemStyleObject<Theme> = {
  display: 'flex',
  alignItems: 'center',
  minHeight: 52,
  px: 0.5,
  fontSize: 15.5,
  color: 'brand.menuInk',
  borderBottom: 1,
  borderColor: 'divider',
  '&:hover': { color: 'primary.main' },
};

type ItemProps = { item: NavigationItem };

function MobileLink({ item }: ItemProps) {
  const href = navItemHref(item);

  if (item.highlight) {
    return (
      <Link
        href={href}
        sx={
          {
            ...rowSx,
            mt: 2.25,
            bgcolor: 'primary.dark',
            color: 'common.white',
            justifyContent: 'center',
            borderRadius: '10px',
            fontWeight: 600,
            borderBottom: 0,
            minHeight: 50,
            '&:hover': { bgcolor: 'primary.main', color: 'common.white' },
          } as any
        }
      >
        {item.label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      target={item.action?.newTab ? '_blank' : undefined}
      sx={rowSx as any}
    >
      {item.label}
    </Link>
  );
}

function Accordion({ item, current }: ItemProps & { current: boolean }) {
  const [open, setOpen] = React.useState(current);

  return (
    <Box>
      <ButtonBase
        onClick={() => setOpen((x) => !x)}
        aria-expanded={open}
        sx={{
          ...rowSx,
          width: 1,
          justifyContent: 'space-between',
          gap: 1.5,
          font: 'inherit',
          textAlign: 'left',
          ...(current ? { color: 'primary.main', fontWeight: 700 } : {}),
        }}
      >
        {item.label}
        <ChevronDown
          sx={{
            fontSize: 18,
            flex: 'none',
            transition: 'transform .18s',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        />
      </ButtonBase>
      <Collapse in={open}>
        <Box px={0.5} pt={0.5} pb={1.25}>
          {(item.groups ?? []).map((group, gi) => (
            <Box key={group.id ?? gi}>
              {group.label && (
                <Typography
                  component="span"
                  sx={{
                    display: 'block',
                    pt: 1.25,
                    pb: 0.25,
                    pl: 1.75,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'secondary.dark',
                  }}
                >
                  {group.label}
                </Typography>
              )}
              {group.links.map((link, li) => (
                <Link
                  key={link.id ?? li}
                  href={getActionHref(link.action, '#')}
                  target={link.action?.newTab ? '_blank' : undefined}
                  sx={{
                    display: 'block',
                    py: 1.25,
                    pl: 1.75,
                    fontSize: 14,
                    color: 'brand.inkSoft',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

export default MobileNavigation;
