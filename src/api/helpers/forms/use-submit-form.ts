import { TaskHandlers, useTask } from '@xod/tasks';
import api from '~/api';

type SubmitFormRequestPayload = {
  fields: Record<string, any>;
};

export default function useSubmitForm(
  formId: string,
  handlers: TaskHandlers<SubmitFormRequestPayload>
) {
  const { perform, ...others } = useTask({
    id: `/submit-form/${formId}`,
    execute: (payload) =>
      api.post('/form-submissions', toSubmittableData(formId, payload!.fields)),
    handlers,
  });

  return { submitForm: perform, ...others };
}

function toSubmittableData(formId: string, fields: Record<string, any>) {
  return {
    form: formId,
    submissionData: Object.entries(fields).map((entry) => ({
      field: entry[0],
      value: entry[1],
    })),
  };
}
