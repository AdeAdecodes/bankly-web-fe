import { alpha, Box, IconButton, Theme, Typography } from '@mui/material';
import React from 'react';
import ContentBox from '~/components/generics/content-box';
import CssGrid from '~/components/shared/css-grid';
import FlagChip from '~/components/shared/flag-chip';
import { Row } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import SocialIcon, {
  SOCIAL_LABELS,
  SocialPlatform,
} from '~/components/shared/social-icon';
import getActionHref from '~/helpers/get-action-href';
import { getMediaAlt, getMediaUrl } from '~/helpers/media';
import { Footer as FooterType, SiteSetting } from '~/types';

type FooterProps = {
  footer?: FooterType;
  settings?: SiteSetting;
};

/** Site footer driven by the Footer global (casa-web `footer`). */
function Footer({ footer, settings }: FooterProps) {
  const columns = footer?.columns ?? [];
  const contact = footer?.contact;
  const ministry = footer?.ministry;
  const emblem = getMediaUrl(settings?.emblem);
  const ministryLogo = getMediaUrl(ministry?.logo);
  const hairline = (theme: Theme) => alpha(theme.palette.common.white, 0.12);

  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'brand.deepest', color: 'brand.mintLink' }}
    >
      <ContentBox sx={{ pt: { xs: 5.5, md: 6.5 }, pb: 3 }}>
        <CssGrid
          columnTemplate={{
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1.5fr 1fr 1fr 1fr',
          }}
          spacing={{ xs: 1, sm: 3, md: 3.75 }}
        >
          <Box>
            {emblem && (
              <Box
                component="img"
                src={emblem}
                alt={getMediaAlt(settings?.emblem, 'Coat of arms of Nigeria')}
                sx={{ height: 62, width: 'auto', display: 'block', mb: 1.625 }}
              />
            )}
            <Typography fontSize={13} lineHeight={1.65} component="p">
              {(contact?.organisationName || settings?.siteName) && (
                <Box component="strong" sx={{ color: 'common.white' }}>
                  {contact?.organisationName || settings?.siteName}
                </Box>
              )}
              {lines(contact?.address).map((line) => (
                <React.Fragment key={line}>
                  <br />
                  {line}
                </React.Fragment>
              ))}
              {contact?.phone && (
                <React.Fragment>
                  <br />
                  <Link href={`tel:${contact.phone.replace(/\s+/g, '')}`}>
                    {contact.phone}
                  </Link>
                </React.Fragment>
              )}
              {contact?.email && (
                <React.Fragment>
                  <br />
                  <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
                </React.Fragment>
              )}
            </Typography>
            <Row
              crossAxisAlignment="center"
              gap={1.125}
              mt={1.5}
              sx={{ color: 'brand.mintMuted', fontSize: 12 }}
            >
              <FlagChip /> Federal Republic of Nigeria
            </Row>
            {!!footer?.socialLinks?.length && (
              <Row gap={1} mt={2} flexWrap="wrap">
                {footer.socialLinks.map((social) => (
                  <IconButton
                    key={social.id ?? social.url}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      SOCIAL_LABELS[social.platform as SocialPlatform] ??
                      social.platform
                    }
                    size="small"
                    sx={{
                      color: 'brand.mintLink',
                      border: 1,
                      borderColor: hairline,
                      borderRadius: '9px',
                      '&:hover': {
                        color: 'secondary.light',
                        borderColor: 'secondary.light',
                      },
                    }}
                  >
                    <SocialIcon
                      platform={social.platform}
                      sx={{ fontSize: 18 }}
                    />
                  </IconButton>
                ))}
              </Row>
            )}
          </Box>

          {columns.map((column, index) => (
            <Box key={column.id ?? index}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  color: 'common.white',
                  mb: 1.625,
                  mt: { xs: 1.75, sm: 0 },
                }}
              >
                {column.title}
              </Typography>
              {column.links.map((link, li) => (
                <Link
                  key={link.id ?? li}
                  href={getActionHref(link.action, '#')}
                  target={link.action?.newTab ? '_blank' : undefined}
                  sx={{
                    display: 'block',
                    fontSize: 13,
                    py: { xs: 1.375, sm: 0.875 },
                    color: 'inherit',
                    '&:hover': { color: 'secondary.light' },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          ))}
        </CssGrid>
      </ContentBox>

      {ministryLogo && (
        <Box sx={{ borderTop: 1, borderColor: hairline }}>
          <ContentBox>
            <Row crossAxisAlignment="center" gap={2} py={2.5} flexWrap="wrap">
              {ministry?.label && (
                <Typography
                  component="span"
                  sx={{
                    fontSize: 12.5,
                    color: 'brand.mintMuted',
                    letterSpacing: '0.02em',
                  }}
                >
                  {ministry.label}
                </Typography>
              )}
              <Box
                component={ministry?.url ? 'a' : 'span'}
                href={ministry?.url || undefined}
                target={ministry?.url ? '_blank' : undefined}
                rel={ministry?.url ? 'noopener noreferrer' : undefined}
                sx={{ display: 'inline-flex' }}
              >
                <Box
                  component="img"
                  src={ministryLogo}
                  alt={getMediaAlt(
                    ministry?.logo,
                    'Ministry of Foreign Affairs'
                  )}
                  sx={{
                    height: 38,
                    width: 'auto',
                    maxWidth: 1,
                    bgcolor: 'common.white',
                    borderRadius: '8px',
                    p: '8px 14px',
                    boxShadow: (theme) => theme.palette.customShadows.logoPlate,
                  }}
                />
              </Box>
            </Row>
          </ContentBox>
        </Box>
      )}

      <Box sx={{ borderTop: 1, borderColor: hairline }}>
        <ContentBox>
          <Row
            gap={1.75}
            py={1.875}
            flexWrap="wrap"
            crossAxisAlignment="center"
            sx={{
              fontSize: 12,
              color: 'brand.mintMuted',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
            }}
          >
            <span>{footer?.copyright}</span>
            {!!footer?.bottomLinks?.length && (
              <Row gap={1.5} sx={{ ml: { sm: 'auto' } }}>
                {footer.bottomLinks.map((link, index) => (
                  <Link
                    key={link.id ?? index}
                    href={getActionHref(link.action, '#')}
                    sx={{
                      color: 'brand.mintText',
                      '&:hover': { color: 'secondary.light' },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Row>
            )}
          </Row>
        </ContentBox>
      </Box>
    </Box>
  );
}

function lines(value?: string | null) {
  return (value || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default Footer;
