import { TaskHandlers } from '@xod/tasks';
import api from '~/api';
import { useErrorAwareTask } from '../utils';

export default function useCreateHelpArticleReaction(
  articleId: string,
  reaction: string,
  handlers: TaskHandlers
) {
  const { perform, ...others } = useErrorAwareTask({
    id: `/help-articles/${articleId}/react/${reaction}`,
    execute: () =>
      api.post(`/help-articles/${articleId}/reactions`, { reaction }),
    handlers,
  });

  return { createHelpArticleReaction: perform, ...others };
}
