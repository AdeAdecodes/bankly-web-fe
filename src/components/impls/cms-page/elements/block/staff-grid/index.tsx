import { Box, Typography, useTheme } from '@mui/material';
import CssGrid from '~/components/shared/css-grid';
import { getMediaUrl } from '~/helpers/media';
import { fonts } from '~/theme/tokens';
import { PopulatedBlockDef, StaffMember } from '~/types';
import SectionHeading from '../../section-heading';
import SectionWrapper, { useSectionPalette } from '../../section-wrapper';

type StaffGridBlockProps = {
  block: PopulatedBlockDef<'staff-grid'>;
};

/** Mission staff directory (casa-web `.ms-grid`), populated server-side. */
function StaffGridBlock({ block }: StaffGridBlockProps) {
  const staff = block.populatedData?.staff ?? [];
  const columns = Number(block.columns ?? 3) || 3;
  const highlight = block.highlightHighCommissioner !== false;
  const lead = highlight
    ? staff.find((member) => member.isHighCommissioner)
    : undefined;
  const others = lead ? staff.filter((member) => member.id !== lead.id) : staff;

  return (
    <SectionWrapper section={block.section} id={block.blockName}>
      <SectionHeading
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro}
      />
      <Box maxWidth={960} mx="auto">
        {lead && (
          <Box display="flex" justifyContent="center" mb={{ xs: 6, md: 8 }}>
            <StaffCard member={lead} lead />
          </Box>
        )}
        <CssGrid
          columns={{ xs: 1, sm: 2, md: columns }}
          rowSpacing={{ xs: 6, md: 8 }}
          columnSpacing={4.5}
        >
          {others.map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </CssGrid>
        {!staff.length && <EmptyState />}
      </Box>
    </SectionWrapper>
  );
}

function StaffCard({ member, lead }: { member: StaffMember; lead?: boolean }) {
  const theme = useTheme();
  const palette = useSectionPalette();
  const photo = getMediaUrl(member.photo);
  const size = lead ? { xs: 180, md: 196 } : 160;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      sx={{
        '&:hover .nhc-staff-photo': {
          transform: 'translateY(-4px)',
          boxShadow: theme.palette.customShadows.cardStrong,
        },
        '&:hover .nhc-staff-photo img': { transform: 'scale(1.045)' },
      }}
    >
      <Box
        className="nhc-staff-photo"
        sx={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          background: theme.palette.gradients.portrait,
          border: `4px solid ${palette.card}`,
          boxShadow: theme.palette.customShadows.card,
          transition: 'transform .4s ease, box-shadow .3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          component="span"
          aria-hidden
          sx={{
            fontFamily: fonts.serif,
            fontSize: lead ? 48 : 40,
            letterSpacing: '0.06em',
            color: 'secondary.light',
            opacity: 0.6,
          }}
        >
          {initials(member.name)}
        </Typography>
        {photo && (
          <Box
            component="img"
            src={photo}
            alt={member.name}
            loading="lazy"
            sx={{
              position: 'absolute',
              inset: 0,
              width: 1,
              height: 1,
              objectFit: 'cover',
              objectPosition: 'top center',
              transition: 'transform .4s ease',
            }}
          />
        )}
      </Box>
      <Typography
        component="h3"
        sx={{
          mt: lead ? 3 : 2.75,
          fontFamily: fonts.serif,
          fontSize: lead ? 20.5 : 18.5,
          fontWeight: lead ? 700 : 400,
          color: palette.heading,
          lineHeight: 1.32,
          maxWidth: 260,
        }}
      >
        {member.name}
      </Typography>
      <Typography
        sx={{
          mt: 0.75,
          fontSize: 12.5,
          color: palette.muted,
          letterSpacing: '0.01em',
          lineHeight: 1.5,
          maxWidth: 220,
        }}
      >
        {member.title}
      </Typography>
    </Box>
  );
}

function EmptyState() {
  const palette = useSectionPalette();
  return (
    <Typography textAlign="center" sx={{ color: palette.muted }}>
      Staff profiles will be published shortly.
    </Typography>
  );
}

function initials(name: string) {
  return name
    .replace(/^(Ambassador|Mr\.?|Mrs\.?|Ms\.?|Dr\.?|\(Dr\.?\))\s+/gi, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export default StaffGridBlock;
