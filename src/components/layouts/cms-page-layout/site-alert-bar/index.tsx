import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Close } from 'mdi-material-ui';
import React from 'react';
import ContentBox from '~/components/generics/content-box';
import { Row } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import getActionHref from '~/helpers/get-action-href';
import { SiteSetting } from '~/types';

type SiteAlertBarProps = {
  settings?: SiteSetting;
};

/** Site-wide notice above the header (Site Settings → Alert bar). */
function SiteAlertBar({ settings }: SiteAlertBarProps) {
  const theme = useTheme();
  const bar = settings?.alertBar;
  const storageKey = `nhc-alert-dismissed:${hash(bar?.message || '')}`;
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(storageKey) === '1');
    } catch {
      /* storage unavailable */
    }
  }, [storageKey]);

  if (!bar?.enabled || !bar.message || dismissed) return null;

  const severity = bar.severity ?? 'notice';
  const palette = theme.palette.alert[severity];
  const link = bar.link?.enabled ? bar.link.value : undefined;

  function dismiss() {
    setDismissed(true);
    try {
      window.localStorage.setItem(storageKey, '1');
    } catch {
      /* ignore */
    }
  }

  return (
    <Box
      role="region"
      aria-label="Site notice"
      sx={{
        bgcolor: palette.bg,
        color: palette.fg,
        borderBottom: `1px solid ${palette.border}`,
      }}
    >
      <ContentBox>
        <Row crossAxisAlignment="center" gap={1.75} py={1.125}>
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
                  severity === 'emergency'
                    ? 'nhc-alert-pulse 2s infinite'
                    : undefined,
                '@keyframes nhc-alert-pulse': {
                  '0%': { boxShadow: `0 0 0 0 ${palette.dot}` },
                  '70%': { boxShadow: `0 0 0 7px transparent` },
                  '100%': { boxShadow: `0 0 0 0 transparent` },
                },
              }}
            />
            {bar.badge || 'Notice'}
          </Row>
          <Typography flex={1} fontSize={13.5} lineHeight={1.45}>
            {bar.message}
            {link && (
              <React.Fragment>
                {' '}
                <Link
                  href={getActionHref(link)}
                  target={link.newTab ? '_blank' : undefined}
                  sx={{
                    color: 'inherit',
                    textDecoration: 'underline',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {link.label || 'Read more'}
                </Link>
              </React.Fragment>
            )}
          </Typography>
          {bar.dismissible !== false && (
            <IconButton
              aria-label="Dismiss notice"
              size="small"
              onClick={dismiss}
              sx={{ color: 'inherit', flex: 'none' }}
            >
              <Close fontSize="small" />
            </IconButton>
          )}
        </Row>
      </ContentBox>
    </Box>
  );
}

/** Cheap stable hash so a changed message re-shows a dismissed bar. */
function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

export default SiteAlertBar;
