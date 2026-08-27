import { Box, BoxProps, MenuItem } from '@mui/material';
import useForm, { UseForm } from '@xod/use-form';
import { useRouter } from 'next/router';
import React from 'react';
import useSubmitForm from '~/api/helpers/forms/use-submit-form';
import BusyButton from '~/components/shared/busy-button';
import { Column, Row } from '~/components/shared/layout';
import TextField from '~/components/shared/textfield';
import { Form } from '~/types';
import RichTextField from '../rich-text-field';

type FormFieldDef = NonNullable<Form['fields']>[number];

export type CmsFormProps = Omit<BoxProps, 'component'> & {
  form: Form;
  /** `inline` = single row (newsletter); `stacked` = full form. */
  layout?: 'stacked' | 'inline';
  /** Colour scheme for inputs placed on a dark band. */
  onDark?: boolean;
};

/**
 * Renders a form built with Payload's form-builder plugin and posts
 * submissions to `/form-submissions`. Shows the configured confirmation
 * message in place once submitted.
 */
function CmsForm({
  form,
  layout = 'stacked',
  onDark,
  sx,
  ...props
}: CmsFormProps) {
  const router = useRouter();
  const fields = React.useMemo(() => form.fields ?? [], [form.fields]);
  const constraints = React.useMemo(
    () => buildFormConstraints(fields),
    [fields]
  );
  const values = useForm(constraints);
  const [done, setDone] = React.useState(false);

  const { submitForm, isRunning } = useSubmitForm(form.id, {
    onSuccess: () => {
      values.reInitWith({});

      if (form.confirmationType === 'redirect' && form.redirect?.url) {
        void router.push(form.redirect.url);
      } else {
        setDone(true);
      }
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (values.isValidated()) {
      void submitForm({ fields: values.values });
    }
  }

  if (done) {
    return (
      <Box role="status" aria-live="polite" {...props} sx={sx}>
        <RichTextField value={form.confirmationMessage} textAlign="inherit" />
      </Box>
    );
  }

  const inputs = fields.map((field, index) => (
    <CmsFormField
      key={field.id ?? `${field.blockType}-${index}`}
      field={field}
      form={values}
      disabled={isRunning}
      inline={layout === 'inline'}
      onDark={onDark}
    />
  ));

  const submit = (
    <BusyButton
      type="submit"
      variant="contained"
      color={onDark ? 'secondary' : 'primary'}
      busy={isRunning}
      busyLabel="Sending…"
      sx={{ minHeight: 48, flex: 'none' }}
    >
      {form.submitButtonLabel || 'Submit'}
    </BusyButton>
  );

  if (layout === 'inline') {
    return (
      <Row
        component="form"
        onSubmit={handleSubmit}
        noValidate
        gap={1.25}
        flexWrap="wrap"
        mainAxisAlignment="center"
        crossAxisAlignment="flex-start"
        {...(props as any)}
        sx={{ maxWidth: 470, mx: 'auto', width: 1, ...sx }}
      >
        {inputs}
        {submit}
      </Row>
    );
  }

  return (
    <Column
      component="form"
      onSubmit={handleSubmit}
      noValidate
      gap={3}
      {...(props as any)}
      sx={sx}
    >
      <Row flexWrap="wrap" rowGap={3} columnGap={2}>
        {inputs}
      </Row>
      <Box>{submit}</Box>
    </Column>
  );
}

type CmsFormFieldProps = {
  field: FormFieldDef;
  form: UseForm<Record<string, any>>;
  disabled: boolean;
  inline?: boolean;
  onDark?: boolean;
};

function CmsFormField({
  field,
  form,
  disabled,
  inline,
  onDark,
}: CmsFormFieldProps) {
  switch (field.blockType) {
    case 'message':
      return <RichTextField value={field.message} width={1} />;

    case 'number':
    case 'text':
    case 'textarea':
    case 'email':
    case 'select': {
      const isSelect = field.blockType === 'select';
      const isTextarea = field.blockType === 'textarea';
      const type = !isSelect && !isTextarea ? field.blockType : undefined;
      const width = inline
        ? undefined
        : field.width
        ? `${field.width}%`
        : '100%';

      return (
        <TextField
          type={type}
          label={inline ? undefined : field.label}
          placeholder={inline ? field.label ?? undefined : undefined}
          hiddenLabel={inline}
          inputProps={
            inline ? { 'aria-label': field.label ?? field.name } : undefined
          }
          {...form.field(field.name)}
          multiline={isTextarea}
          minRows={isTextarea ? 5 : undefined}
          disabled={disabled}
          required={!!field.required}
          select={isSelect}
          raisedLabel={!inline}
          sx={{
            flex: inline
              ? 1
              : { xs: '1 1 100%', sm: `1 1 calc(${width ?? '100%'} - 16px)` },
            minWidth: inline ? 210 : undefined,
            width: inline ? undefined : 1,
            ...(onDark
              ? {
                  '& .MuiInputBase-root': {
                    bgcolor: 'common.white',
                    borderRadius: '9px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': { border: 0 },
                }
              : {}),
          }}
        >
          {isSelect &&
            field.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      );
    }

    default:
      return null;
  }
}

function buildFormConstraints(fields: FormFieldDef[]) {
  return fields.reduce<Record<string, any>>((acc, field) => {
    if (field.blockType === 'message') return acc;

    const constraint: Record<string, any> = {};

    if (field.required) constraint['presence'] = { allowEmpty: false };
    if (field.blockType === 'email') constraint['email'] = true;
    if (field.blockType === 'number') constraint['numericality'] = {};

    acc[field.name] = constraint;

    return acc;
  }, {});
}

export default CmsForm;
