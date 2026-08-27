import { Box, useTheme } from '@mui/material';
import CssGrid from '~/components/shared/css-grid';
import { asDoc } from '~/helpers/media';
import { sectionPalettes } from '~/theme/tokens';
import { BlockDef, Form } from '~/types';
import CmsForm from '../../field/cms-form';
import RichTextField from '../../field/rich-text-field';
import SectionHeading from '../../section-heading';
import SectionWrapper, { SectionPaletteContext } from '../../section-wrapper';

type ContactFormBlockProps = {
  block: BlockDef<'contact-form'>;
};

/**
 * Form-builder form as either a compact deep-green banner (newsletter, the
 * casa-web `.reg` card) or a two-column "form with info panel" layout.
 */
function ContactFormBlock({ block }: ContactFormBlockProps) {
  const form = asDoc<Form>(block.form);

  if (!form) return null;

  return block.layout === 'banner' ? (
    <Banner block={block} form={form} />
  ) : (
    <WithInfo block={block} form={form} />
  );
}

type LayoutProps = ContactFormBlockProps & { form: Form };

function Banner({ block, form }: LayoutProps) {
  const theme = useTheme();
  const themeKey = block.section?.theme ?? 'paper';
  // On a light section the banner is a gradient card; on a deep section the
  // whole band is the gradient, so the card chrome is dropped.
  const asCard = themeKey !== 'deep';

  return (
    <SectionWrapper
      section={{ theme: themeKey, spacing: block.section?.spacing }}
      id={block.blockName}
    >
      <SectionPaletteContext.Provider value={sectionPalettes.deep}>
        <Box
          sx={{
            position: 'relative',
            textAlign: 'center',
            color: 'common.white',
            ...(asCard
              ? {
                  background: theme.palette.gradients.deepBand,
                  borderRadius: '22px',
                  p: { xs: '44px 22px', md: '64px 44px' },
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    right: -70,
                    top: -70,
                    width: 300,
                    height: 300,
                    background: theme.palette.gradients.goldGlow,
                    pointerEvents: 'none',
                  },
                }
              : {}),
          }}
        >
          <Box position="relative" zIndex={1}>
            <SectionHeading
              eyebrow={block.eyebrow}
              heading={block.heading}
              intro={block.intro}
              maxWidth={560}
              mb={3.25}
              headingSx={{ fontSize: { xs: 27, md: 32 } }}
            />
            <CmsForm form={form} layout="inline" onDark />
          </Box>
        </Box>
      </SectionPaletteContext.Provider>
    </SectionWrapper>
  );
}

function WithInfo({ block, form }: LayoutProps) {
  return (
    <SectionWrapper section={block.section} id={block.blockName}>
      <CssGrid
        columns={{ xs: 1, md: 2 }}
        spacing={{ xs: 5, md: 10 }}
        alignItems="start"
      >
        <Box
          order={{ xs: 1, md: 0 }}
          sx={{
            bgcolor: 'brand.cream',
            borderRadius: '18px',
            p: { xs: 3.5, md: 5 },
          }}
        >
          <SectionPaletteContext.Provider value={sectionPalettes.cream}>
            <SectionHeading
              eyebrow={block.eyebrow}
              heading={block.heading}
              intro={block.intro}
              align="left"
              mb={3}
            />
            <RichTextField value={block.info} gap={1.5} />
          </SectionPaletteContext.Provider>
        </Box>
        <CmsForm form={form} layout="stacked" />
      </CssGrid>
    </SectionWrapper>
  );
}

export default ContactFormBlock;
