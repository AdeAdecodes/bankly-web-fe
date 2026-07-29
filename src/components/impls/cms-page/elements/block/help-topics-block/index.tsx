import { Box, Typography } from '@mui/material';
import BgPattern from '~/components/generics/bg-pattern';
import CssGrid from '~/components/shared/css-grid';
import { Column, Flexible, Row } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import parseColumns from '~/helpers/parse-columns';
import { HelpTopic, PopulatedBlockDef, User, UserRole } from '~/types';
import MediaField from '../../field/media-field';
import RichTextField from '../../field/rich-text-field';

type HelpTopicsBlockProps = {
  block: PopulatedBlockDef<'help-topics-block'>;
};

function HelpTopicsBlock({ block }: HelpTopicsBlockProps) {
  return (
    <CssGrid columns={parseColumns(block.columns || '3')} spacing={3}>
      {block.populatedData.topics.map((topic) => (
        <HelpTopicCard key={topic.id} topic={topic} />
      ))}
    </CssGrid>
  );
}

type HelpTopicCardProps = {
  topic: HelpTopic;
};

function HelpTopicCard({ topic }: HelpTopicCardProps) {
  const handler = topic.handler as User;

  return (
    <Box
      component={Link}
      href={`/help-centre/${topic.slug!}`}
      borderRadius={2}
      color="text.primary"
      underline="none"
      bgcolor="#DFE9FD"
      position="relative"
      sx={{
        transition: 'box-shadow 0.25s',
        '&:hover': {
          boxShadow:
            '0px 0px 1px rgba(12, 26, 75, 0.1), 0px 10px 16px rgba(20, 37, 63, 0.06)',
        },
      }}
      mui
    >
      <Column gap={3} p={4}>
        <MediaField
          media={topic.icon}
          height={54}
          width={54}
          bgcolor="grey.200"
          borderRadius="100%"
        />
        <Column gap={1} width={{ xs: 1, sm: 0.8 }}>
          <Typography variant="h5" fontWeight={700}>
            {topic.title}
          </Typography>
          <RichTextField value={topic.description as any} />
        </Column>
        <Flexible />
        <Row
          gap={2}
          crossAxisAlignment="center"
          mainAxisAlignment="space-between"
        >
          <Row gap={2} crossAxisAlignment="center">
            <MediaField
              media={handler.photo}
              height={36}
              width={36}
              bgcolor="grey.200"
              borderRadius="100%"
            />
            <Column>
              <Typography
                variant="body1"
                fontWeight={800}
                color="text.secondary"
              >
                {handler.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" lineHeight={1}>
                {(handler.role as UserRole).name}
              </Typography>
            </Column>
          </Row>
          <Row gap={2}>
            <Metric value={topic.meta!.answerCount!} label="Answers" />
            <Metric value={topic.meta!.helpfulCount!} label="Helpful" />
            <Metric value={topic.meta!.viewCount!} label="Views" />
          </Row>
        </Row>
      </Column>
      <BgPattern pattern="spiral" />
    </Box>
  );
}

type MetricProps = {
  value: string | number;
  label: string;
};

function Metric({ value, label }: MetricProps) {
  return (
    <Column
      crossAxisAlignment="center"
      textAlign="center"
      color="text.secondary"
    >
      <Typography variant="subtitle2">{value}</Typography>
      <Typography variant="caption" lineHeight={1}>
        {label}
      </Typography>
    </Column>
  );
}

export default HelpTopicsBlock;
