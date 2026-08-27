import { alpha, Box, Typography, useTheme } from '@mui/material';
import { CheckBold, Download } from 'mdi-material-ui';
import React from 'react';
import { SERVICE_CATEGORY_LABELS } from '~/constants';
import ContentBox from '~/components/generics/content-box';
import RenderBlocks from '~/components/impls/cms-page/render-blocks';
import ActionGroupField from '~/components/impls/cms-page/elements/field/action-group-field';
import RichTextField from '~/components/impls/cms-page/elements/field/rich-text-field';
import SectionHeading from '~/components/impls/cms-page/elements/section-heading';
import SectionWrapper from '~/components/impls/cms-page/elements/section-wrapper';
import Breadcrumbs from '~/components/shared/breadcrumbs';
import CssGrid from '~/components/shared/css-grid';
import { Row } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import PageSEO from '~/components/shared/page-seo';
import config from '~/config';
import { getCollectionPath } from '~/helpers/get-action-href';
import linkify from '~/helpers/linkify';
import { asMedia } from '~/helpers/media';
import { fonts } from '~/theme/tokens';
import { Block, ConsularService, SiteSetting } from '~/types';

export type ServicePageProps = {
  service: ConsularService;
  /** Services shown as tabs in the hero (same group, else same category). */
  siblings: ConsularService[];
  settings?: SiteSetting;
};

type SectionDef = { id: string; label: string };

/**
 * Consular/immigration service page (casa-web `tourist-visa.html` etc.):
 * hero → sticky sub-nav → overview → process → fees → requirements →
 * downloads → editor-defined extra sections → related services.
 */
function ServicePage({ service, siblings, settings }: ServicePageProps) {
  const categoryLabel =
    SERVICE_CATEGORY_LABELS[service.category] ?? service.category;
  const related = (
    (service.relatedServices ?? []) as (string | ConsularService)[]
  ).filter((item): item is ConsularService => typeof item === 'object');
  const extra = (service.extraSections ?? []) as Block[];

  const sections: SectionDef[] = [
    service.overview?.length ? { id: 'overview', label: 'Overview' } : null,
    service.steps?.length ? { id: 'process', label: 'How it works' } : null,
    service.fees?.length ? { id: 'fees', label: 'Fees' } : null,
    service.requirements?.length
      ? { id: 'requirements', label: 'Requirements' }
      : null,
    service.downloads?.length ? { id: 'downloads', label: 'Downloads' } : null,
    ...extra.map((block, index) => ({
      id: block.blockName || `section-${index + 1}`,
      label: block.blockName ? titleCase(block.blockName) : `More ${index + 1}`,
    })),
    related.length ? { id: 'related', label: 'Related' } : null,
  ].filter((section): section is SectionDef => !!section);

  let band = 0;
  const nextTheme = (): 'paper' | 'cream' =>
    band++ % 2 === 0 ? 'paper' : 'cream';

  return (
    <React.Fragment>
      <PageSEO
        title={service.meta?.title || service.title}
        description={service.meta?.description || service.shortDescription}
        url={
          config.site.url
            ? `${config.site.url}${getCollectionPath(
                'consular-services',
                service.slug
              )}`
            : undefined
        }
        settings={settings}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: categoryLabel, href: '/#services' },
          { label: service.title },
        ]}
      />
      <Hero
        service={service}
        siblings={siblings}
        categoryLabel={categoryLabel}
      />
      {sections.length > 1 && <SubNav sections={sections} />}

      {!!service.overview?.length && (
        <SectionWrapper
          section={{ theme: nextTheme(), spacing: 'compact' }}
          id="overview"
        >
          <SectionHeading eyebrow="Overview" heading={service.title} mb={4} />
          <RichTextField
            value={service.overview}
            gap={1.75}
            maxWidth={760}
            mx="auto"
            sx={{
              '& p, & li': { fontSize: 15.5, lineHeight: 1.7 },
              '& h2, & h3': { color: 'primary.dark' },
              '& a': { color: 'primary.main', textDecoration: 'underline' },
            }}
          />
        </SectionWrapper>
      )}

      {!!service.steps?.length && (
        <SectionWrapper
          section={{ theme: nextTheme(), spacing: 'compact' }}
          id="process"
        >
          <SectionHeading
            eyebrow="Your application journey"
            heading="How the process works"
            mb={5}
          />
          <Steps
            steps={service.steps}
            processingTime={service.processingTime}
          />
        </SectionWrapper>
      )}

      {!!service.fees?.length && (
        <SectionWrapper
          section={{ theme: nextTheme(), spacing: 'compact' }}
          id="fees"
        >
          <SectionHeading
            eyebrow="Fees"
            heading={service.fees.length > 1 ? 'Fees' : service.fees[0].item}
            mb={5}
          />
          <Fees fees={service.fees} />
        </SectionWrapper>
      )}

      {!!service.requirements?.length && (
        <SectionWrapper
          section={{ theme: nextTheme(), spacing: 'compact' }}
          id="requirements"
        >
          <SectionHeading
            eyebrow="Requirements"
            heading="Required documents"
            intro={`All of the following are required to support a ${service.title} application.`}
            mb={5}
          />
          <Requirements groups={service.requirements} />
        </SectionWrapper>
      )}

      {!!service.downloads?.length && (
        <SectionWrapper
          section={{ theme: nextTheme(), spacing: 'compact' }}
          id="downloads"
        >
          <SectionHeading
            eyebrow="Forms & documents"
            heading="Downloads"
            mb={5}
          />
          <Downloads downloads={service.downloads} />
        </SectionWrapper>
      )}

      <RenderBlocks blocks={extra} />

      {related.length > 0 && (
        <SectionWrapper
          section={{ theme: nextTheme(), spacing: 'compact' }}
          id="related"
        >
          <SectionHeading
            eyebrow="See also"
            heading="Related services"
            mb={5}
          />
          <CssGrid
            columns={{ xs: 1, sm: 2, md: Math.min(related.length, 3) }}
            spacing={3}
          >
            {related.map((item) => (
              <ServiceCard key={item.id} service={item} />
            ))}
          </CssGrid>
        </SectionWrapper>
      )}
    </React.Fragment>
  );
}

// -----------------------------------------------------------------------------

type HeroProps = Pick<ServicePageProps, 'service' | 'siblings'> & {
  categoryLabel: string;
};

function Hero({ service, siblings, categoryLabel }: HeroProps) {
  const theme = useTheme();
  const tabs = siblings.length > 1 ? siblings : [];

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: 'common.white',
        background: theme.palette.gradients.deepBand,
        '&::after': {
          content: '""',
          position: 'absolute',
          right: -90,
          top: -110,
          width: 360,
          height: 360,
          background: theme.palette.gradients.goldGlow,
          pointerEvents: 'none',
        },
      }}
    >
      <ContentBox
        sx={{
          position: 'relative',
          pt: { xs: 5, md: 8 },
          pb: { xs: 5, md: 7 },
        }}
      >
        <Typography variant="eyebrow" color="secondary.light">
          {service.group || categoryLabel}
        </Typography>
        {tabs.length > 0 && (
          <Row
            role="tablist"
            aria-label={`${service.group || categoryLabel} services`}
            gap={1}
            flexWrap="wrap"
            mt={2.25}
          >
            {tabs.map((tab) => {
              const current = tab.id === service.id;
              return (
                <Link
                  key={tab.id}
                  role="tab"
                  href={getCollectionPath('consular-services', tab.slug)}
                  aria-current={current ? 'page' : undefined}
                  sx={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    px: 2.25,
                    py: 1.25,
                    borderRadius: '9px',
                    color: current ? 'brand.deepest' : 'common.white',
                    bgcolor: current
                      ? 'secondary.main'
                      : alpha(theme.palette.brand.deepest, 0.3),
                    border: `1.5px solid ${
                      current
                        ? theme.palette.secondary.main
                        : alpha(theme.palette.common.white, 0.32)
                    }`,
                    cursor: current ? 'default' : 'pointer',
                    '&:hover': current
                      ? {}
                      : { bgcolor: alpha(theme.palette.common.white, 0.16) },
                  }}
                >
                  {tab.title}
                </Link>
              );
            })}
          </Row>
        )}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 30, md: 38 },
            mt: 1.75,
            maxWidth: 640,
            lineHeight: 1.15,
          }}
        >
          {service.title}
        </Typography>
        {service.lead && (
          <Typography
            sx={{
              color: 'brand.mintText',
              fontSize: 16,
              lineHeight: 1.7,
              mt: 2.25,
              maxWidth: 700,
            }}
          >
            {linkify(service.lead, (url, key) => (
              <Link
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'secondary.light',
                  textDecoration: 'underline',
                  wordBreak: 'break-word',
                }}
              >
                {url}
              </Link>
            ))}
          </Typography>
        )}
        {!!service.actions?.length && (
          <ActionGroupField
            actions={service.actions}
            gap={1.75}
            mt={3.75}
            flexWrap="wrap"
          />
        )}
      </ContentBox>
    </Box>
  );
}

function SubNav({ sections }: { sections: SectionDef[] }) {
  const theme = useTheme();

  return (
    <Box
      component="nav"
      aria-label="On this page"
      sx={{
        position: 'sticky',
        top: { xs: 66, md: 80 },
        zIndex: (t) => t.zIndex.appBar - 1,
        bgcolor: alpha(theme.palette.common.white, 0.94),
        backdropFilter: 'saturate(1.1) blur(6px)',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <ContentBox
        sx={{
          display: 'flex',
          gap: 0.75,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {sections.map((section) => (
          <Link
            key={section.id}
            href={`#${section.id}`}
            sx={{
              whiteSpace: 'nowrap',
              fontSize: 13.5,
              fontWeight: 600,
              color: 'brand.navInk',
              px: 1.75,
              py: 1.875,
              borderBottom: '2.5px solid transparent',
              flex: 'none',
              '&:hover': {
                color: 'primary.dark',
                borderBottomColor: 'secondary.main',
              },
            }}
          >
            {section.label}
          </Link>
        ))}
      </ContentBox>
    </Box>
  );
}

type StepsProps = {
  steps: NonNullable<ConsularService['steps']>;
  processingTime?: string | null;
};

function Steps({ steps, processingTime }: StepsProps) {
  return (
    <Box maxWidth={860} mx="auto">
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <Row key={step.id ?? index} gap={2.5} crossAxisAlignment="stretch">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              flex="none"
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'common.white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: fonts.serif,
                  fontWeight: 700,
                  fontSize: 17,
                  flex: 'none',
                }}
              >
                {index + 1}
              </Box>
              {!last && (
                <Box
                  aria-hidden
                  sx={{ flex: 1, width: '2px', bgcolor: 'divider', my: 1 }}
                />
              )}
            </Box>
            <Box pb={last ? 0 : 4} pt={0.75}>
              <Typography
                component="h3"
                sx={{
                  fontFamily: fonts.serif,
                  fontSize: 19,
                  color: 'primary.dark',
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </Typography>
              <RichTextField
                value={step.description}
                gap={1}
                mt={1}
                sx={{
                  '& p, & li': {
                    fontSize: 14.5,
                    color: 'brand.inkSoft',
                    lineHeight: 1.7,
                  },
                  '& a': { color: 'primary.main', textDecoration: 'underline' },
                }}
              />
            </Box>
          </Row>
        );
      })}
      {processingTime && (
        <Box
          sx={{
            mt: 4,
            p: '18px 22px',
            borderRadius: '12px',
            bgcolor: 'brand.cream',
            border: 1,
            borderColor: 'divider',
            fontSize: 14.5,
          }}
        >
          <Box component="strong" sx={{ color: 'primary.dark' }}>
            Processing time:
          </Box>{' '}
          {processingTime}
        </Box>
      )}
    </Box>
  );
}

function Fees({ fees }: { fees: NonNullable<ConsularService['fees']> }) {
  const theme = useTheme();

  return (
    <CssGrid
      columns={{ xs: 1, md: Math.min(fees.length, 2) }}
      spacing={3}
      maxWidth={fees.length > 1 ? 1000 : 640}
      mx="auto"
    >
      {fees.map((fee, index) => (
        <Box
          key={fee.id ?? index}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            background:
              'linear-gradient(150deg, ' +
              theme.palette.primary.dark +
              ', ' +
              theme.palette.brand.deepest +
              ')',
            color: 'common.white',
            borderRadius: '20px',
            p: { xs: '32px 24px', md: '40px 42px' },
            textAlign: 'center',
            '&::after': {
              content: '""',
              position: 'absolute',
              right: -60,
              bottom: -80,
              width: 240,
              height: 240,
              background: theme.palette.gradients.goldGlow,
              pointerEvents: 'none',
            },
          }}
        >
          <Box position="relative">
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'brand.deepest',
                bgcolor: 'secondary.main',
                px: 1.75,
                py: 0.75,
                borderRadius: '20px',
              }}
            >
              {fee.item}
            </Box>
            <Typography
              sx={{
                fontFamily: fonts.serif,
                fontSize: { xs: 40, md: 50 },
                fontWeight: 700,
                mt: 2.25,
                lineHeight: 1,
              }}
            >
              {fee.amount}
            </Typography>
            {fee.paymentMethod && (
              <Typography
                sx={{
                  fontSize: 14,
                  color: 'secondary.light',
                  fontWeight: 600,
                  mt: 1.25,
                }}
              >
                {fee.paymentMethod}
              </Typography>
            )}
            {fee.note && (
              <Typography
                sx={{
                  fontSize: 14,
                  color: 'brand.mintText',
                  lineHeight: 1.7,
                  mt: 2.5,
                  maxWidth: 460,
                  mx: 'auto',
                }}
              >
                {fee.note}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </CssGrid>
  );
}

function Requirements({
  groups,
}: {
  groups: NonNullable<ConsularService['requirements']>;
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2.5}
      maxWidth={860}
      mx="auto"
    >
      {groups.map((group, index) => (
        <Box
          key={group.id ?? index}
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: '16px',
            bgcolor: 'background.paper',
            p: { xs: '22px 20px', md: '28px 30px' },
          }}
        >
          {group.heading && (
            <Row
              component="h3"
              crossAxisAlignment="center"
              gap={1.5}
              sx={{
                m: 0,
                mb: 2,
                fontFamily: fonts.serif,
                fontSize: 18,
                fontWeight: 400,
                color: 'primary.dark',
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: 'brand.cream',
                  color: 'primary.dark',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: fonts.sans,
                  fontSize: 13,
                  fontWeight: 700,
                  flex: 'none',
                }}
              >
                {index + 1}
              </Box>
              {group.heading}
            </Row>
          )}
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {group.items.map((item, itemIndex) => (
              <Row
                key={item.id ?? itemIndex}
                component="li"
                gap={1.5}
                crossAxisAlignment="flex-start"
                sx={{
                  py: 1.375,
                  borderTop: itemIndex ? 1 : 0,
                  borderColor: 'divider',
                }}
              >
                <CheckBold
                  sx={{
                    fontSize: 18,
                    color: 'primary.main',
                    mt: '3px',
                    flex: 'none',
                  }}
                />
                <Typography sx={{ fontSize: 15, lineHeight: 1.6, flex: 1 }}>
                  {item.text}
                  {item.note && (
                    <Box
                      component="span"
                      sx={{
                        ml: 1,
                        display: 'inline-block',
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: 'secondary.dark',
                        bgcolor: 'brand.chip',
                        borderRadius: '5px',
                        px: 1,
                        py: 0.25,
                        verticalAlign: 'middle',
                      }}
                    >
                      {item.note}
                    </Box>
                  )}
                </Typography>
              </Row>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function Downloads({
  downloads,
}: {
  downloads: NonNullable<ConsularService['downloads']>;
}) {
  const theme = useTheme();

  return (
    <CssGrid columns={{ xs: 1, md: 2 }} spacing={2.5} maxWidth={820} mx="auto">
      {downloads.map((download, index) => {
        const file = asMedia(download.file);
        if (!file?.url) return null;
        return (
          <Box
            key={download.id ?? index}
            component="a"
            href={file.url}
            download
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              border: 1,
              borderColor: 'divider',
              borderRadius: '16px',
              p: '22px 24px',
              bgcolor: 'background.paper',
              color: 'text.primary',
              transition: 'border-color .15s, box-shadow .15s, transform .15s',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: theme.palette.customShadows.card,
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                bgcolor: 'brand.cream',
                color: 'primary.dark',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 'none',
              }}
            >
              <Download />
            </Box>
            <Box>
              <Typography
                component="b"
                display="block"
                sx={{
                  fontFamily: fonts.serif,
                  fontSize: 16.5,
                  color: 'primary.dark',
                }}
              >
                {download.label}
              </Typography>
              <Typography
                component="span"
                sx={{
                  display: 'block',
                  fontSize: 12.5,
                  color: 'primary.main',
                  mt: 0.375,
                  wordBreak: 'break-all',
                }}
              >
                {file.filename}
                {file.filesize
                  ? ` · ${Math.max(1, Math.round(file.filesize / 1024))} KB`
                  : ''}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </CssGrid>
  );
}

export function ServiceCard({ service }: { service: ConsularService }) {
  const theme = useTheme();

  return (
    <Box
      component={Link}
      href={getCollectionPath('consular-services', service.slug)}
      sx={{
        display: 'block',
        border: 1,
        borderColor: 'divider',
        borderRadius: '18px',
        p: { xs: '24px 22px', md: '30px 28px' },
        bgcolor: 'background.paper',
        color: 'text.primary',
        transition: 'border-color .18s, box-shadow .18s, transform .18s',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: theme.palette.customShadows.card,
          transform: 'translateY(-3px)',
        },
      }}
    >
      <Typography variant="eyebrow" color="secondary.dark">
        {service.group ||
          SERVICE_CATEGORY_LABELS[service.category] ||
          service.category}
      </Typography>
      <Typography
        component="h3"
        sx={{
          fontFamily: fonts.serif,
          fontSize: 20,
          color: 'primary.dark',
          mt: 1.25,
          lineHeight: 1.25,
        }}
      >
        {service.title}
      </Typography>
      <Typography
        sx={{ fontSize: 14, color: 'text.secondary', lineHeight: 1.6, mt: 1 }}
      >
        {service.shortDescription}
      </Typography>
      <Typography
        component="span"
        sx={{
          display: 'inline-block',
          mt: 2,
          fontSize: 14,
          fontWeight: 600,
          color: 'primary.main',
        }}
      >
        View service →
      </Typography>
    </Box>
  );
}

function titleCase(slug: string) {
  return slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default ServicePage;
