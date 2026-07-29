import { Typography } from '@mui/material';
import ContentBox from '~/components/generics/content-box';
import Container from '~/components/impls/cms-page/elements/container';
import ActionField from '~/components/impls/cms-page/elements/field/action-field';
import RichTextField from '~/components/impls/cms-page/elements/field/rich-text-field';
import CssGrid from '~/components/shared/css-grid';
import Divider from '~/components/shared/divider';
import { Column, FlexItem, Row, Spacer } from '~/components/shared/layout';
import { Page } from '~/types';

type FooterProps = {
  footer: NonNullable<Page['layout']>['footer'];
};

function Footer({ footer }: FooterProps) {
  if (typeof footer === 'string' || !footer) return null;

  const definition = footer.definition!;

  return (
    <Container component="footer" background={definition.background}>
      <Column component={ContentBox} py={10}>
        <FlexItem
          direction={{ xs: 'column', lg: 'row' }}
          crossAxisAlignment="start"
          gap={10}
        >
          <RichTextField
            value={definition.additionalContent as any}
            width={{ xs: 480, lg: 320 }}
            maxWidth={1}
          />
          <CssGrid
            columns={{ xs: 2, sm: definition.sections.length }}
            width={1}
            spacing={3}
          >
            {definition.sections.map((section) => (
              <FooterSection key={section.id} section={section} />
            ))}
          </CssGrid>
        </FlexItem>
        <Spacer sy={8} />
        <Divider my={2} />
        <Row crossAxisAlignment="center" flexWrap="wrap" gap={3}>
          <Typography variant="caption">{definition.copyright}</Typography>
          <Row crossAxisAlignment="center" ml="auto" gap={3}>
            {definition.legal?.terms?.label && (
              <ActionField action={definition.legal?.terms} variant="caption" />
            )}
            {definition.legal?.['privacy-policy']?.label && (
              <ActionField action={definition.legal?.['privacy-policy']} />
            )}
          </Row>
        </Row>
      </Column>
    </Container>
  );
}

type FooterSectionProps = {
  section: NonNullable<
    Exclude<NonNullable<FooterProps['footer']>, string>['definition']
  >['sections'][number];
};

function FooterSection({ section }: FooterSectionProps) {
  return (
    <Column gap={3} crossAxisAlignment="start">
      <Typography fontWeight={700}>{section.title}</Typography>
      <Column gap={2}>
        {section.items!.map((item) => (
          <SectionItem key={item.id} item={item} />
        ))}
      </Column>
    </Column>
  );
}

type SectionItemProps = {
  item: NonNullable<FooterSectionProps['section']['items']>[number];
};

function SectionItem({ item }: SectionItemProps) {
  if (item.type === 'text') {
    return <Typography variant="body2">{item.text}</Typography>;
  }

  if (!item.action) return null;

  return <ActionField action={item.action} textProps={{ variant: 'body2' }} />;
}

export default Footer;
