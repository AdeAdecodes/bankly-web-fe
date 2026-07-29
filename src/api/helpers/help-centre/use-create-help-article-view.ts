import { TaskHandlers } from '@xod/tasks';
import api from '~/api';
import { useErrorAwareTask } from '../utils';

export default function useCreateHelpArticleView(
  articleId: string,
  handlers: TaskHandlers
) {
  const { perform, ...others } = useErrorAwareTask({
    id: `/help-articles/${articleId}/views`,
    execute: () => api.post(`/help-articles/${articleId}/views`),
    handlers,
  });

  return { createHelpArticleView: perform, ...others };
}
