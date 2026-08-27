import { Box, Typography } from '@mui/material';
import { Row } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import { getMediaAlt, getMediaUrl } from '~/helpers/media';
import { fonts } from '~/theme/tokens';
import { SiteSetting } from '~/types';

type BrandProps = {
  settings?: SiteSetting;
  compact?: boolean;
};

/** Emblem + site name + tagline (casa-web `.brand-row`). */
function Brand({ settings, compact }: BrandProps) {
  const emblem = getMediaUrl(settings?.emblem);
  const name = settings?.siteName || 'Nigeria High Commission';

  return (
    <Link
      href="/"
      aria-label={`${name} — go to homepage`}
      sx={{ display: 'flex', flex: 'none', pr: 1 }}
    >
      <Row crossAxisAlignment="center" gap={1.625}>
        {emblem && (
          <Box
            component="img"
            src={emblem}
            alt={getMediaAlt(settings?.emblem, 'Coat of arms of Nigeria')}
            sx={{
              height: compact ? 34 : { xs: 44, sm: 50 },
              width: 'auto',
              display: 'block',
              flex: 'none',
            }}
          />
        )}
        <Box>
          <Typography
            component="span"
            display="block"
            sx={{
              fontFamily: fonts.serif,
              fontSize: compact ? 13 : { xs: 16.5, sm: 18 },
              fontWeight: 700,
              color: 'primary.dark',
              lineHeight: 1.18,
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </Typography>
          {!compact && settings?.siteTagline && (
            <Typography
              component="span"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontSize: 11.5,
                color: 'text.secondary',
                mt: 0.25,
              }}
            >
              {settings.siteTagline}
            </Typography>
          )}
        </Box>
      </Row>
    </Link>
  );
}

export default Brand;
