import { alpha, Button, ButtonProps, Theme } from '@mui/material';
import { ArrowRight } from 'mdi-material-ui';
import { useRouter } from 'next/router';
import React from 'react';
import { Row } from '~/components/shared/layout';
import Link, { LinkProps } from '~/components/shared/link';
import getActionHref from '~/helpers/get-action-href';
import { Action } from '~/types';

type MuiBasedLinkProps = Extract<LinkProps, { mui: true }>;

export type ActionFieldProps = Omit<MuiBasedLinkProps, 'href' | 'mui'> & {
  action?: Action | null;
  textProps?: Omit<MuiBasedLinkProps, 'href' | 'mui'>;
  buttonProps?: ButtonProps;
  arrow?: JSX.Element;
};

/**
 * Renders a CMS action (link/CTA). `decoration.variant` picks text link vs
 * filled/outlined button; `decoration.color` maps onto the theme palette
 * (primary = green, secondary = gold, white = inverted for dark bands).
 */
function ActionField({ action, ...props }: ActionFieldProps) {
  if (!action) return null;

  return <NormalActionField {...props} action={action} />;
}

type NormalActionFieldProps = Omit<ActionFieldProps, 'action'> & {
  action: Action;
  arrow?: JSX.Element;
};

function NormalActionField({
  action,
  children,
  buttonProps,
  textProps,
  arrow,
  ...props
}: NormalActionFieldProps) {
  const router = useRouter();
  const decoration = action.decoration;
  const isButtonType = decoration?.variant && decoration?.variant !== 'text';
  const Component = isButtonType ? LinkButton : ActionLink;
  const resolvedButtonProps: any =
    isButtonType || buttonProps
      ? { variant: decoration?.variant, ...buttonProps }
      : undefined;
  const maybeWhiteBg =
    decoration?.color === 'white' && decoration.variant === 'contained'
      ? {
          bgcolor: 'common.white',
          color: 'primary.dark',
          '&:hover': {
            bgcolor: (theme: Theme) => alpha(theme.palette.common.white, 0.9),
          },
        }
      : undefined;
  const maybeWhiteBorder =
    decoration?.color === 'white' && decoration.variant === 'outlined'
      ? {
          borderColor: (theme: Theme) =>
            alpha(theme.palette.common.white, 0.55),
          color: 'common.white',
          bgcolor: (theme: Theme) => alpha(theme.palette.brand.deepest, 0.3),
          '&:hover': {
            borderColor: 'common.white',
            bgcolor: (theme: Theme) => alpha(theme.palette.common.white, 0.12),
          },
        }
      : undefined;

  return (
    <Component
      href={getActionHref(action, router.asPath)}
      target={action.newTab ? '_blank' : undefined}
      rel={action.newTab ? 'noopener noreferrer' : undefined}
      {...resolvedButtonProps}
      {...props}
      color={
        decoration?.color !== 'white'
          ? decoration?.color === 'inherit'
            ? props.color || 'inherit'
            : decoration?.color
          : undefined
      }
      {...(!isButtonType ? textProps : undefined)}
      endIcon={
        action.showArrow
          ? arrow || <ArrowRight sx={{ fontSize: 'inherit' }} />
          : buttonProps?.endIcon
      }
      sx={{
        ...maybeWhiteBg,
        ...maybeWhiteBorder,
        ...buttonProps?.sx,
        ...props.sx,
      }}
      mui
    >
      {action.label || children}
    </Component>
  );
}

type LinkButtonProps = Omit<ButtonProps, 'href' | 'type'> &
  Omit<MuiBasedLinkProps, 'variant'>;

function LinkButton(props: LinkButtonProps) {
  return <Button LinkComponent={Link} {...(props as any)} />;
}

type ActionLinkProps = MuiBasedLinkProps & {
  endIcon?: React.ComponentType;
};

function ActionLink({ endIcon, ...props }: ActionLinkProps) {
  if (endIcon) {
    return (
      <Row component={Link} {...props} crossAxisAlignment="center" gap={0.5}>
        {props.children}
        {endIcon}
      </Row>
    );
  }

  return <Link {...props} />;
}

export default ActionField;
