import { Collapse, Drawer, IconButton } from '@mui/material';
import { ChevronDown, Close } from 'mdi-material-ui';
import React from 'react';
import MenuIcon from '~/components/icons/menu';
import ActionField from '~/components/impls/cms-page/elements/field/action-field';
import MediaField from '~/components/impls/cms-page/elements/field/media-field';
import RichTextField from '~/components/impls/cms-page/elements/field/rich-text-field';
import Divider from '~/components/shared/divider';
import { Column, Flexible, Row } from '~/components/shared/layout';
import getActionHref from '~/helpers/get-action-href';
import useIsActiveUrlFn from '~/helpers/use-is-active-url-fn';
import { NavigationItem } from '~/types';

type MobileNavigationProps = {
  items: NavigationItem[];
};

function MobileNavigation({ items }: MobileNavigationProps) {
  const [open, setOpen] = React.useState(false);
  const isActiveUrl = useIsActiveUrlFn();

  return (
    <React.Fragment>
      <Flexible />
      <IconButton onClick={() => setOpen((x) => !x)}>
        {open ? <Close /> : <MenuIcon />}
      </IconButton>
      <Drawer
        variant="persistent"
        open={open}
        anchor="right"
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 1, top: 56, zIndex: 0 }, elevation: 0 }}
        sx={{ top: 56 }}
        hideBackdrop
      >
        <Column gap={3} px={3} py={3}>
          {items.map((item) => (
            <RootNavigationItem
              key={item.id}
              item={item}
              active={item.action && isActiveUrl(getActionHref(item.action))}
              onAction={() => setOpen(false)}
            />
          ))}
        </Column>
      </Drawer>
    </React.Fragment>
  );
}

type RootNavigationItemProps = {
  item: NavigationItem;
  active?: boolean;
  onAction: () => void;
};

function RootNavigationItem({
  item,
  active,
  onAction,
}: RootNavigationItemProps) {
  if (item.hasChildren) {
    return <CompositeRootNavigationItem item={item} onAction={onAction} />;
  }

  return (
    <ActionField
      action={Object.assign({}, item.action, { label: item.label })}
      color="text.primary"
      underline="none"
      sx={{
        fontSize: '1.25rem',
        color: active ? 'primary.main' : undefined,
        '&:hover': { color: 'primary.main' },
      }}
      onClick={onAction}
    />
  );
}

function CompositeRootNavigationItem({
  item,
  onAction,
}: RootNavigationItemProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Column>
      <ActionField
        action={Object.assign({}, item.action, { label: item.label })}
        textProps={{
          variant: 'h6',
          fontWeight: 400,
        }}
        color="text.primary"
        underline="none"
        buttonProps={{ endIcon: <ChevronDown sx={{ ml: 'auto' }} /> }}
        onClick={(e) => {
          e.preventDefault();
          setOpen((x) => !x);
        }}
        sx={{
          fontSize: '1.25rem',
          '&:hover': { color: 'primary.main' },
        }}
      />
      <Collapse in={open}>
        <Column py={2} bgcolor="white" borderRadius={1} width={600}>
          <Column gap={4} flex={2}>
            {item.items.map((item) => (
              <Row
                key={item.id}
                component={ActionField}
                action={item.action}
                sx={{ '&:hover': { color: 'primary.main' } }}
                onClick={onAction}
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
          <Divider color="grey.200" my={2} />
          <RichTextField value={item.supportingContent as any} gap={0} />
        </Column>
      </Collapse>
    </Column>
  );
}

export default MobileNavigation;
