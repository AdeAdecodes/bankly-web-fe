import { Typography } from '@mui/material';
import React from 'react';
import ContentBox from '~/components/generics/content-box';
import Divider from '~/components/shared/divider';
import { Column, Row } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import PageSEO from '~/components/shared/page-seo';
import { HelpArticle, HelpTopicWithArticles, User } from '~/types';
import MediaField from '../../cms-page/elements/field/media-field';
import CMSPageSection from '../../cms-page/elements/section';

type HelpCentreTopicPageImplProps = {
  topic: HelpTopicWithArticles;
};

function HelpCentreTopicPageImpl({ topic }: HelpCentreTopicPageImplProps) {
  return (
    <React.Fragment>
      <PageSEO title={`${topic.title} - Help Centre`} />
      <Column>
        <HeroSection topic={topic} />
        <ArticleListSection topic={topic} />
      </Column>
    </React.Fragment>
  );
}

function HeroSection({ topic }: { topic: HelpTopicWithArticles }) {
  return (
    <CMSPageSection
      section={{
        blocks: [
          {
            id: '646c4d5167b9eb2ed43d6247',
            blockType: 'title-block',
            hero: true,
            expanded: true,
            showBreadcrumb: true,
            title: [
              { type: 'h3', children: [{ text: topic.title, bold: true }] },
              ...topic.description!,
            ],
          },
        ],
        spacing: { top: true, bottom: true },
        boxed: true,
        background: {
          color: 'primary.main',
          pattern: 'flat-discs',
        },
      }}
    />
  );
}

function ArticleListSection({ topic }: { topic: HelpTopicWithArticles }) {
  return (
    <Column component={ContentBox} gap={4} py={12}>
      {topic.articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </Column>
  );
}

type ArticleCardProps = {
  article: HelpArticle;
};

function ArticleCard({ article }: ArticleCardProps) {
  const author = article.author as User;

  return (
    <Row
      component={Link}
      href={`/help-centre/a/${article.slug!}`}
      color="text.primary"
      underline="none"
      mui
      p={4}
      gap={3}
      bgcolor="background.main"
      boxShadow="0px 0px 1px rgba(12, 26, 75, 0.1), 0px 10px 16px rgba(20, 37, 63, 0.06)"
      borderRadius={1.5}
    >
      <MediaField
        media={author.photo}
        width={40}
        height={40}
        borderRadius="50%"
        flexShrink={0}
      />
      <Column gap={2}>
        <Typography fontWeight={700}>{article.title}</Typography>
        <Typography color="text.secondary">{article.summary}</Typography>
      </Column>
      <Divider weight={1} color="divider" vertical />
      <Row gap={2} alignSelf="center" crossAxisAlignment="center">
        <Metric label="Views" value={article.meta?.viewCount || 0} />
        <Metric label="Helpful" value={article.meta?.helpfulCount || 0} />
      </Row>
    </Row>
  );
}

type MetricProps = {
  value: string | number;
  label: string;
};

function Metric({ value, label }: MetricProps) {
  return (
    <Column
      crossAxisAlignment="start"
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

export default HelpCentreTopicPageImpl;
