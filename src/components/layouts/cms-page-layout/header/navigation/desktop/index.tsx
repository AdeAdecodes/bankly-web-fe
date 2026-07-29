import { Box, Hidden, Popover } from '@mui/material';
import { ChevronDown } from 'mdi-material-ui';
import React from 'react';
import ActionField from '~/components/impls/cms-page/elements/field/action-field';
import MediaField from '~/components/impls/cms-page/elements/field/media-field';
import RichTextField from '~/components/impls/cms-page/elements/field/rich-text-field';
import Divider from '~/components/shared/divider';
import { Column, Row } from '~/components/shared/layout';
import getActionHref from '~/helpers/get-action-href';
import useIsActiveUrlFn from '~/helpers/use-is-active-url-fn';
import { NavigationItem } from '~/types';

type DesktopNavigationProps = {
  items: NavigationItem[];
};

function DesktopNavigation({ items }: DesktopNavigationProps) {
  const isActiveUrl = useIsActiveUrlFn();

  return (
    <Hidden mdDown>
      <Row crossAxisAlignment="center" gap={3} ml="auto">
        {items?.map((item) => (
          <RootNavigationItem
            key={item.id}
            item={item}
            active={item.action && isActiveUrl(getActionHref(item.action))}
          />
        ))}
      </Row>
    </Hidden>
  );
}

type RootNavigationItemProps = {
  item: NavigationItem;
  active?: boolean;
};

function RootNavigationItem({ item, active }: RootNavigationItemProps) {
  if (item.hasChildren) {
    return <CompositeRootNavigationItem item={item} />;
  }

  return (
    <ActionField
      action={Object.assign({}, item.action, { label: item.label })}
      color="text.primary"
      underline="none"
      sx={{
        color: active ? 'primary.main' : undefined,
        '&:hover': { color: 'primary.main' },
      }}
    />
  );
}

function CompositeRootNavigationItem({ item }: RootNavigationItemProps) {
  const anchorElRef = React.useRef<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Box ref={anchorElRef}>
        <ActionField
          action={{
            ...item.action,
            label: item.label,
          }}
          color="text.primary"
          underline="none"
          buttonProps={{ endIcon: <ChevronDown fontSize="small" /> }}
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          sx={{ '&:hover': { color: 'primary.main' } }}
        />
      </Box>
      <Popover
        anchorEl={anchorElRef.current}
        open={open}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        anchorPosition={{ left: 0, top: 48 }}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            mt: 2,
            boxShadow:
              '0px 0px 1px rgba(12, 26, 75, 0.1), 0px 4px 20px -2px rgba(50, 50, 71, 0.08)',
          },
        }}
        elevation={0}
      >
        <Row px={3} py={4} bgcolor="white" borderRadius={1} width={600}>
          <Column gap={4} flex={2}>
            {item.items.map((item) => (
              <Row
                key={item.id}
                component={ActionField}
                action={item.action}
                sx={{ '&:hover': { color: 'primary.main' } }}
                onClick={() => setOpen(false)}
                underline="none"
                crossAxisAlignment="start"
                gap={2}
              >
                <MediaField
                  media={item.icon}
                  width={48}
                  fit="contain"
                  flexShrink={0}
                />
                <RichTextField
                  value={item.content as any}
                  gap={0}
                  mt={0.35}
                  flex={1}
                />
              </Row>
            ))}
          </Column>
          <Divider color="grey.200" vertical />
          <Box px={3} flex={1}>
            <RichTextField value={item.supportingContent as any} gap={0} />
          </Box>
        </Row>
      </Popover>
    </React.Fragment>
  );
}

export default DesktopNavigation;
