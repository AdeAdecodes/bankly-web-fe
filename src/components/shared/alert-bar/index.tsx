import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Close } from 'mdi-material-ui';
import React from 'react';
import { Row } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import { AlertSeverity } from '~/theme/tokens';

export type AlertBarProps = {
  severity?: AlertSeverity | null;
  badge?: string | null;
  message: React.ReactNode;
  link?: { href: string; label: string; newTab?: boolean | null } | null;
  onDismiss?: () => void;
  /** `bar` = full-width strip (site-wide notice); `card` = rounded inline notice. */
  variant?: 'bar' | 'card';
};

/** Tiered notice (casa-web `.alertbar`): notice / warning / emergency. */
function AlertBar({
  severity,
  badge,
  message,
  link,
  onDismiss,
  variant = 'bar',
}: AlertBarProps) {
  const theme = useTheme();
  const key: AlertSeverity = severity ?? 'notice';
  const palette = theme.palette.alert[key];

  return (
    <Row
      role="region"
      aria-label="Notice"
      crossAxisAlignment="center"
      gap={1.75}
      sx={{
        bgcolor: palette.bg,
        color: palette.fg,
        py: variant === 'card' ? 1.75 : 1.125,
        px: variant === 'card' ? 2.5 : 0,
        border: variant === 'card' ? `1px solid ${palette.border}` : 0,
        borderRadius: variant === 'card' ? '12px' : 0,
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
      }}
    >
      <Row
        component="span"
        crossAxisAlignment="center"
        gap={0.875}
        sx={{
          flex: 'none',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontSize: 11,
          bgcolor: palette.accent,
          color: palette.badgeFg,
          px: 1.375,
          py: 0.625,
          borderRadius: '20px',
        }}
      >
        <Box
          component="span"
          aria-hidden
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: palette.dot,
            animation:
              key === 'emergency' ? 'nhc-alert-pulse 2s infinite' : undefined,
            '@keyframes nhc-alert-pulse': {
              '0%': { boxShadow: `0 0 0 0 ${palette.dot}` },
              '70%': { boxShadow: '0 0 0 7px transparent' },
              '100%': { boxShadow: '0 0 0 0 transparent' },
            },
          }}
        />
        {badge || 'Notice'}
      </Row>
      <Typography
        component="p"
        sx={{
          flex: 1,
          minWidth: 200,
          fontSize: 13.5,
          lineHeight: 1.45,
          color: 'inherit',
        }}
      >
        {message}
        {link && (
          <React.Fragment>
            {' '}
            <Link
              href={link.href}
              target={link.newTab ? '_blank' : undefined}
              rel={link.newTab ? 'noopener noreferrer' : undefined}
              sx={{
                color: 'inherit',
                textDecoration: 'underline',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              {link.label}
            </Link>
          </React.Fragment>
        )}
      </Typography>
      {onDismiss && (
        <IconButton
          aria-label="Dismiss notice"
          size="small"
          onClick={onDismiss}
          sx={{ color: 'inherit', flex: 'none' }}
        >
          <Close fontSize="small" />
        </IconButton>
      )}
    </Row>
  );
}

export default AlertBar;
