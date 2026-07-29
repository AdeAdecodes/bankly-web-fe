import { Box, Collapse, Typography } from '@mui/material';
import { ChevronDown } from 'mdi-material-ui';
import React from 'react';
import CssGrid from '~/components/shared/css-grid';
import Divider from '~/components/shared/divider';
import { Center, Column, Row } from '~/components/shared/layout';
import { BlockDef } from '~/types';
import ActionField from '../../field/action-field';
import ActionGroupField from '../../field/action-group-field';
import MediaField from '../../field/media-field';
import RichTextField from '../../field/rich-text-field';

type FeaturesBlockProps = {
  block: BlockDef<'features-block'>;
};

function FeaturesBlock({ block }: FeaturesBlockProps) {
  if (block.type === 'interactive')
    return <InteractiveFeaturesBlock block={block} />;

  if (block.type === 'collapsible')
    return <CollapsibleFeaturesBlock block={block} />;

  return <NormalFeaturesBlock block={block} />;
}

function NormalFeaturesBlock({ block }: FeaturesBlockProps) {
  const isContentFirst = block.arrangement === 'content-first';

  return (
    <Column gap={3}>
      <CssGrid columns={{ xs: 1, md: 2 }} alignItems="center" spacing={5}>
        <MediaField
          media={block.media as any}
          width={1}
          order={isContentFirst ? 1 : undefined}
          mb={block.mediaSticksToBottom ? -10 : undefined}
          fit="contain"
        />
        <Column gap={4}>
          <RichTextField value={block.title as any} />
          <CssGrid columns={block.grid ? 2 : 1} spacing={3} maxWidth={480}>
            {block.features?.map((feature, index) => (
              <NormalFeatureWidget
                key={feature.id}
                feature={feature}
                index={index}
              />
            ))}
          </CssGrid>
          <ActionGroupField
            actions={block.actions}
            gap={2}
            mainAxisAlignment={{ xs: 'center', sm: 'start' }}
          />
        </Column>
      </CssGrid>
    </Column>
  );
}

type Feature = NonNullable<FeaturesBlockProps['block']['features']>[number];

type NormalFeatureWidgetProps = {
  feature: Feature;
  index: number;
};

function NormalFeatureWidget({ feature, index }: NormalFeatureWidgetProps) {
  return (
    <Row gap={feature.numbered ? 1 : 2} crossAxisAlignment="start">
      {feature.numbered && (
        <Center
          width={24}
          height={24}
          bgcolor="#DFE9FD"
          color="#296CF0"
          fontSize="0.75rem"
          fontWeight={700}
          borderRadius="50%"
          flexShrink={0}
          mt={0.5}
        >
          {index + 1}
        </Center>
      )}
      <MediaField media={feature.icon} fit="contain" />
      <Column gap={2} mt={feature.numbered ? 0.5 : undefined}>
        <RichTextField value={feature.content as any} />
        {feature.action?.enabled && (
          <ActionField
            action={feature.action.value}
            sx={{ alignSelf: 'start' }}
          />
        )}
      </Column>
    </Row>
  );
}

function InteractiveFeaturesBlock({ block }: FeaturesBlockProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const isContentFirst = block.arrangement === 'content-first';

  React.useEffect(() => {
    const timeoutId = setInterval(() => {
      setSelectedIndex((x) => (x + 1) % block.interactiveFeatures!.length);
    }, 4000);

    return () => {
      clearInterval(timeoutId);
    };
  }, [block.interactiveFeatures, selectedIndex]);

  return (
    <Column gap={3}>
      <CssGrid columns={{ xs: 1, md: 2 }} alignItems="center" spacing={5}>
        <MediaField
          media={block.interactiveFeatures?.[selectedIndex].media}
          width={1}
          order={isContentFirst ? 1 : undefined}
          fit="contain"
        />
        <Column>
          {block.interactiveFeatures?.map((feature, index) => (
            <InteractiveFeatureWidget
              key={feature.id}
              feature={feature}
              selected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </Column>
      </CssGrid>
    </Column>
  );
}

type InteractiveFeature = NonNullable<
  FeaturesBlockProps['block']['interactiveFeatures']
>[number];

type InteractiveFeatureWidgetProps = {
  feature: InteractiveFeature;
  selected: boolean;
  onClick: () => void;
};

function InteractiveFeatureWidget({
  feature,
  selected,
  onClick,
}: InteractiveFeatureWidgetProps) {
  return (
    <Row gap={3} onClick={onClick} sx={{ cursor: 'pointer' }}>
      <Divider weight={2} color={selected ? '#296CF0' : '#EDF2F7'} vertical />
      <RichTextField value={feature.content as any} py={2} />
    </Row>
  );
}

function CollapsibleFeaturesBlock({ block }: FeaturesBlockProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const isContentFirst = block.arrangement === 'content-first';

  return (
    <Column gap={3}>
      <CssGrid columns={{ xs: 1, md: 2 }} spacing={5}>
        <Box width={1}>
          <MediaField
            media={
              selectedIndex !== -1
                ? block.collapsibleFeatures?.[selectedIndex].media
                : block.media
            }
            width={1}
            order={isContentFirst ? 1 : undefined}
            fit="contain"
            mb={block.mediaSticksToBottom ? -10 : undefined}
          />
        </Box>
        <Column>
          {block.collapsibleFeatures?.map((feature, index) => (
            <CollapsibleFeatureWidget
              key={feature.id}
              feature={feature}
              expanded={selectedIndex === index}
              index={index}
              onClick={() =>
                setSelectedIndex((x) => (x === index ? -1 : index))
              }
            />
          ))}
        </Column>
      </CssGrid>
    </Column>
  );
}

type CollapsibleFeature = NonNullable<
  FeaturesBlockProps['block']['collapsibleFeatures']
>[number];

type CollapsibleFeatureWidgetProps = {
  feature: CollapsibleFeature;
  expanded: boolean;
  index: number;
  onClick: () => void;
};

function CollapsibleFeatureWidget({
  feature,
  expanded,
  onClick,
}: CollapsibleFeatureWidgetProps) {
  return (
    <Column>
      <Row
        gap={2}
        py={1}
        my={2}
        crossAxisAlignment="center"
        mainAxisAlignment="space-between"
        onClick={onClick}
        borderBottom="1px solid"
        borderColor="#718096"
        sx={{ cursor: 'pointer' }}
      >
        <Typography variant="h5" fontWeight={500}>
          {feature.title}
        </Typography>
        <ChevronDown color="primary" sx={{ fontSize: '2.25rem' }} />
      </Row>
      <Collapse in={expanded}>
        <RichTextField value={feature.content as any} py={2} />
      </Collapse>
    </Column>
  );
}

export default FeaturesBlock;
