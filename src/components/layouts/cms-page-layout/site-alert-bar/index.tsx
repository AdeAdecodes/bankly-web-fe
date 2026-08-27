import { Box } from '@mui/material';
import React from 'react';
import ContentBox from '~/components/generics/content-box';
import AlertBar from '~/components/shared/alert-bar';
import getActionHref from '~/helpers/get-action-href';
import { SiteSetting } from '~/types';

type SiteAlertBarProps = {
  settings?: SiteSetting;
};

/** Site-wide notice above the header (Site Settings → Alert bar). */
function SiteAlertBar({ settings }: SiteAlertBarProps) {
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

  const link = bar.link?.enabled && bar.link.value ? bar.link.value : undefined;

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
      sx={{
        bgcolor: (theme) => theme.palette.alert[bar.severity ?? 'notice'].bg,
        borderBottom: (theme) =>
          `1px solid ${theme.palette.alert[bar.severity ?? 'notice'].border}`,
      }}
    >
      <ContentBox>
        <AlertBar
          severity={bar.severity}
          badge={bar.badge}
          message={bar.message}
          link={
            link
              ? {
                  href: getActionHref(link, '#'),
                  label: link.label || 'Read more',
                  newTab: link.newTab,
                }
              : undefined
          }
          onDismiss={bar.dismissible !== false ? dismiss : undefined}
        />
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
