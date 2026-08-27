import { Box, Typography } from '@mui/material';
import { serviceGroupKey } from '~/api/helpers/services/populate-service-grid';
import CssGrid from '~/components/shared/css-grid';
import { Row } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import getActionHref, { getCollectionPath } from '~/helpers/get-action-href';
import { fonts } from '~/theme/tokens';
import { ConsularService, PopulatedBlockDef } from '~/types';
import IconBox from '../../icon-box';
import SectionHeading from '../../section-heading';
import SectionWrapper, { useSectionPalette } from '../../section-wrapper';

type ServiceGridBlockProps = {
  block: PopulatedBlockDef<'service-grid'>;
};

type Group = ServiceGridBlockProps['block']['groups'][number];

type ServiceLink = {
  key: string;
  label: string;
  href: string;
  newTab?: boolean;
};

/** Services directory columns (casa-web `.svc-grid`). */
function ServiceGridBlock({ block }: ServiceGridBlockProps) {
  const groups = block.groups ?? [];
  const populated = block.populatedData?.groups ?? {};

  if (!groups.length) return null;

  return (
    <SectionWrapper
      section={{
        theme: block.section?.theme ?? 'cream',
        spacing: block.section?.spacing,
      }}
      id={block.blockName}
    >
      <SectionHeading
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro}
      />
      <CssGrid
        columnTemplate="repeat(auto-fit, minmax(280px, 1fr))"
        spacing={3}
      >
        {groups.map((group, index) => (
          <GroupColumn
            key={group.id ?? index}
            group={group}
            links={resolveLinks(
              group,
              populated[serviceGroupKey(group, index)]
            )}
          />
        ))}
      </CssGrid>
    </SectionWrapper>
  );
}

function resolveLinks(group: Group, docs?: ConsularService[]): ServiceLink[] {
  const toLink = (service: ConsularService): ServiceLink => ({
    key: service.id,
    label: service.title,
    href: getCollectionPath('consular-services', service.slug),
  });

  switch (group.populateBy) {
    case 'manual':
      return (group.links ?? []).map((link, index) => ({
        key: link.id ?? String(index),
        label: link.label,
        href: getActionHref(link.action, '#'),
        newTab: link.action?.newTab ?? undefined,
      }));
    case 'selection':
      return ((group.services ?? []) as (string | ConsularService)[])
        .filter(
          (service): service is ConsularService => typeof service === 'object'
        )
        .map(toLink);
    case 'category':
    default:
      return (docs ?? []).map(toLink);
  }
}

function GroupColumn({ group, links }: { group: Group; links: ServiceLink[] }) {
  const palette = useSectionPalette();

  return (
    <Box
      sx={{
        bgcolor: palette.card,
        border: 1,
        borderColor: 'divider',
        borderRadius: '18px',
        p: '26px 28px 14px',
        color: 'text.primary',
      }}
    >
      <Row
        component="h3"
        crossAxisAlignment="center"
        gap={1.625}
        sx={{
          m: 0,
          fontFamily: fonts.serif,
          fontSize: 19,
          fontWeight: 400,
          color: 'primary.dark',
          pb: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <IconBox icon={group.icon} size={44} radius="12px" />
        {group.title}
      </Row>
      {links.map((link) => (
        <Link
          key={link.key}
          href={link.href}
          target={link.newTab ? '_blank' : undefined}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.375,
            py: 1.625,
            px: 0.25,
            fontSize: 14.5,
            color: 'brand.navInk',
            borderBottom: 1,
            borderColor: 'divider',
            transition: 'color .14s',
            '&:last-of-type': { borderBottom: 0 },
            '&::before': {
              content: '""',
              width: 6,
              height: 6,
              borderRight: '2px solid',
              borderTop: '2px solid',
              borderColor: 'secondary.main',
              transform: 'rotate(45deg)',
              flexShrink: 0,
              transition: 'margin-left .14s, border-color .14s',
            },
            '&:hover': {
              color: 'primary.main',
              '&::before': { borderColor: 'primary.main', ml: '3px' },
            },
          }}
        >
          {link.label}
        </Link>
      ))}
      {!links.length && (
        <Typography sx={{ fontSize: 13.5, color: 'text.secondary', py: 1.5 }}>
          Coming soon
        </Typography>
      )}
    </Box>
  );
}

export default ServiceGridBlock;
