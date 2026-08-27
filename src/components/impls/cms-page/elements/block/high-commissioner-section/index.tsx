import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { ArrowRight } from 'mdi-material-ui';
import CssGrid from '~/components/shared/css-grid';
import { Row } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import SocialIcon, {
  SOCIAL_LABELS,
  SocialPlatform,
} from '~/components/shared/social-icon';
import getActionHref from '~/helpers/get-action-href';
import { asDoc, getMediaUrl } from '~/helpers/media';
import { fonts } from '~/theme/tokens';
import { BlockDef, StaffMember } from '~/types';
import RichTextField from '../../field/rich-text-field';
import { Eyebrow } from '../../section-heading';
import SectionWrapper, { useSectionPalette } from '../../section-wrapper';

type HighCommissionerSectionBlockProps = {
  block: BlockDef<'high-commissioner-section'>;
};

/** "From the High Commissioner" welcome (casa-web `.hc`). */
function HighCommissionerSectionBlock({
  block,
}: HighCommissionerSectionBlockProps) {
  const staff = asDoc<StaffMember>(block.staffMember);

  return (
    <SectionWrapper section={block.section} id={block.blockName}>
      <CssGrid
        columnTemplate={{ xs: '1fr', md: '330px 1fr' }}
        spacing={{ xs: 3.25, md: 6 }}
        alignItems="center"
      >
        {staff && <Portrait staff={staff} />}
        <Message block={block} staff={staff} />
      </CssGrid>
    </SectionWrapper>
  );
}

function Portrait({ staff }: { staff: StaffMember }) {
  const theme = useTheme();
  const photo = getMediaUrl(staff.photo);

  return (
    <Box
      component="figure"
      sx={{
        m: 0,
        position: 'relative',
        borderRadius: '18px',
        overflow: 'hidden',
        aspectRatio: '4 / 5',
        maxWidth: { xs: 280, md: 'none' },
        background: theme.palette.gradients.portrait,
        boxShadow: theme.palette.customShadows.portrait,
        border: 1,
        borderColor: 'divider',
      }}
    >
      {photo && (
        <Box
          component="img"
          src={photo}
          alt={staff.name}
          sx={{
            position: 'absolute',
            inset: 0,
            width: 1,
            height: 1,
            objectFit: 'cover',
            objectPosition: 'top center',
          }}
        />
      )}
      <Box
        component="figcaption"
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          p: '30px 18px 15px',
          background: theme.palette.gradients.plateFade,
          color: 'common.white',
        }}
      >
        <Typography
          component="b"
          display="block"
          sx={{ fontFamily: fonts.serif, fontSize: 15 }}
        >
          {staff.name}
        </Typography>
        <Typography
          component="span"
          sx={{
            fontSize: 11,
            color: 'secondary.light',
            letterSpacing: '0.02em',
          }}
        >
          {staff.title}
        </Typography>
      </Box>
    </Box>
  );
}

type MessageProps = HighCommissionerSectionBlockProps & { staff?: StaffMember };

function Message({ block, staff }: MessageProps) {
  const palette = useSectionPalette();
  const bioLink = block.bioLink?.enabled ? block.bioLink.value : undefined;
  const socials = block.showSocialLinks ? staff?.socialLinks ?? [] : [];

  return (
    <Box>
      {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: 24, md: 27 },
          color: palette.heading,
          mt: 1.25,
          mb: 2.25,
          lineHeight: 1.2,
        }}
      >
        {block.heading}
      </Typography>
      <RichTextField
        value={block.message}
        gap={1.625}
        sx={{
          '& p': {
            fontSize: 15,
            color: palette.fg,
            lineHeight: 1.65,
            maxWidth: 640,
          },
        }}
      />
      {block.showSignature !== false && staff && (
        <Box
          sx={{ mt: 2.75, pt: 2.25, borderTop: 1, borderColor: palette.line }}
        >
          <Typography
            sx={{
              fontFamily: fonts.serif,
              fontWeight: 700,
              color: palette.heading,
              fontSize: 15,
            }}
          >
            {staff.name}
          </Typography>
          <Typography sx={{ fontSize: 13, color: palette.muted, mt: 0.25 }}>
            {staff.title}
          </Typography>
        </Box>
      )}
      {bioLink && (
        <Link
          href={getActionHref(bioLink, '#')}
          target={bioLink.newTab ? '_blank' : undefined}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            mt: 3,
            fontSize: 14,
            fontWeight: 600,
            color: 'primary.main',
            '&:hover': {
              color: 'primary.dark',
              '& svg': { transform: 'translateX(3px)' },
            },
          }}
        >
          {bioLink.label || 'Read the biography'}
          <ArrowRight sx={{ fontSize: 17, transition: 'transform .15s' }} />
        </Link>
      )}
      {socials.length > 0 && (
        <Row crossAxisAlignment="center" gap={1.25} mt={2.5} flexWrap="wrap">
          <Typography
            component="span"
            sx={{ fontSize: 13, color: palette.muted, mr: 0.25 }}
          >
            Follow the High Commissioner:
          </Typography>
          {socials.map((social) => (
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
              sx={{
                width: 38,
                height: 38,
                border: 1,
                borderColor: palette.line,
                borderRadius: '9px',
                color: palette.heading,
                '&:hover': {
                  bgcolor: 'primary.dark',
                  color: 'common.white',
                  borderColor: 'primary.dark',
                },
              }}
            >
              <SocialIcon platform={social.platform} sx={{ fontSize: 17 }} />
            </IconButton>
          ))}
        </Row>
      )}
    </Box>
  );
}

export default HighCommissionerSectionBlock;
