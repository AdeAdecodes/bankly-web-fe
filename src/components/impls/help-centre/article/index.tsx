import { ButtonProps, CircularProgress, Typography } from '@mui/material';
import { popupish } from '@xod/mui-popupish';
import React from 'react';
import useCreateHelpArticleReaction from '~/api/helpers/help-centre/use-create-help-article-reaction';
import useCreateHelpArticleView from '~/api/helpers/help-centre/use-create-help-article-view';
import ContentBox from '~/components/generics/content-box';
import PageBreadcrumbs from '~/components/generics/page-breadcrumbs';
import BusyButton from '~/components/shared/busy-button';
import { Column, Row, Spacer } from '~/components/shared/layout';
import PageSEO from '~/components/shared/page-seo';
import { HelpArticle, User } from '~/types';
import MediaField from '../../cms-page/elements/field/media-field';
import RichTextField from '../../cms-page/elements/field/rich-text-field';

type HelpCentreArticlePageImplProps = {
  article: HelpArticle;
};

function HelpCentreArticlePageImpl({
  article,
}: HelpCentreArticlePageImplProps) {
  const author = article.author as User;

  useRecordView(article);

  return (
    <React.Fragment>
      <PageSEO title={article.title} description={article.summary} />
      <Column
        component={ContentBox}
        gap={6}
        py={12}
        px={3}
        width={{ xs: 1, sm: 0.7 }}
      >
        <PageBreadcrumbs />
        <Row gap={2} crossAxisAlignment="center">
          <MediaField
            media={author.photo}
            height={48}
            width={48}
            borderRadius="50%"
          />
          <Column>
            <Typography fontWeight={700}>{author.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Support
            </Typography>
          </Column>
        </Row>
        <Typography variant="h3" fontWeight={700}>
          {article.title}
        </Typography>
        <RichTextField value={article.content as any} />
        <Spacer sy={2} />
        <Column gap={2}>
          <Typography>Was this article helpful?</Typography>
          <Row gap={2} color="#2D3748">
            <ReactionButton article={article} reaction="helpful">
              Yes 😁
            </ReactionButton>
            <ReactionButton article={article} reaction="unhelpful">
              No 😔
            </ReactionButton>
          </Row>
        </Column>
        <Spacer sy={2} />
        {/* <Column gap={1}> */}
        {/*   <Typography fontWeight={800} color="text.secondary"> */}
        {/*     Related articles */}
        {/*   </Typography> */}
        {/*   <Column gap={2}> */}
        {/*     {Array.from({ length: 4 }).map((_, i) => ( */}
        {/*       <Link */}
        {/*         key={i} */}
        {/*         href="" */}
        {/*         underline="always" */}
        {/*         color="text.secondary" */}
        {/*         mui */}
        {/*       > */}
        {/*         Vel auctor dui congue tortor augue lectus dolor at cursus. */}
        {/*       </Link> */}
        {/*     ))} */}
        {/*   </Column> */}
        {/* </Column> */}
      </Column>
    </React.Fragment>
  );
}

type ReactionButtonProps = ButtonProps & {
  article: HelpArticle;
  reaction: 'helpful' | 'unhelpful';
};

function ReactionButton({ article, reaction, ...props }: ReactionButtonProps) {
  const { createHelpArticleReaction, isRunning } = useCreateHelpArticleReaction(
    article.id,
    reaction,
    {
      onSuccess: () => {
        popupish.notify({ message: 'Feedback recieved. Thanks' });
      },
    }
  );

  return (
    <BusyButton
      busy={isRunning}
      variant="outlined"
      color="inherit"
      startIcon={isRunning ? <CircularProgress size="small" /> : undefined}
      {...props}
      onClick={() => void createHelpArticleReaction({ reaction })}
    />
  );
}

const VIEWED_KEY = 'b:articles';

function useRecordView(article: HelpArticle) {
  const { createHelpArticleView } = useCreateHelpArticleView(article.id, {});

  React.useEffect(() => {
    const views: string[] = JSON.parse(
      localStorage.getItem(VIEWED_KEY) || '[]'
    );

    if (!views.includes(article.id)) {
      localStorage.setItem(VIEWED_KEY, JSON.stringify([...views, article.id]));
      void createHelpArticleView(article.id);
    }
  }, [article.id, createHelpArticleView]);
}

export default HelpCentreArticlePageImpl;
