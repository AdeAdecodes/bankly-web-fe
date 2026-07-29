import { Button, MenuItem } from '@mui/material';
import { popupish } from '@xod/mui-popupish';
import useForm, { UseForm } from '@xod/use-form';
import { useRouter } from 'next/router';
import React from 'react';
import useSubmitForm from '~/api/helpers/forms/use-submit-form';
import BusyButton from '~/components/shared/busy-button';
import CssGrid from '~/components/shared/css-grid';
import { Column, Spacer } from '~/components/shared/layout';
import Row from '~/components/shared/layout/row';
import TextField from '~/components/shared/textfield';
import { BlockDef, Form } from '~/types';
import Container from '../../container';
import MediaField from '../../field/media-field';
import RichTextField from '../../field/rich-text-field';

type FormWithInfoBlockProps = {
  block: BlockDef<'form-with-info-block'>;
};

function FormWithInfoBlock({ block }: FormWithInfoBlockProps) {
  return (
    <CssGrid columns={{ xs: 1, md: 2 }} spacing={12}>
      <InfoBox block={block} />
      <FormBox block={block} />
    </CssGrid>
  );
}

function InfoBox({ block }: FormWithInfoBlockProps) {
  const info = block.info!;

  return (
    <Container
      background={info.background}
      borderRadius={6}
      py={5}
      px={5}
      order={{ xs: 1, md: 0 }}
    >
      <RichTextField value={info.title as any} />
      <Spacer sy={6} />
      <Column gap={4}>
        {info.items!.map((item) => (
          <Row key={item.id} gap={2} crossAxisAlignment="start">
            <MediaField media={item.icon} maxWidth={24} fit="contain" />
            <RichTextField value={item.content as any} />
          </Row>
        ))}
      </Column>
    </Container>
  );
}

function FormBox({ block }: FormWithInfoBlockProps) {
  const formDef = block.form!.ref as Form;
  const constraints = buildFormConstraints(formDef.fields);
  const form = useForm(constraints!);
  const router = useRouter();

  const { submitForm, isRunning } = useSubmitForm(formDef.id, {
    onSuccess: () => {
      form.reInitWith({});

      if (formDef.confirmationType === 'message') {
        const n = popupish.notify({
          message: <RichTextField value={formDef.confirmationMessage as any} />,
          autoHideDuration: null,
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
          action: (
            <Button onClick={() => n.close()} sx={{ color: 'white' }}>
              OK
            </Button>
          ),
        });
      } else if (formDef.redirect) {
        void router.push(formDef.redirect.url);
      }
    },
  });

  function handleSubmit(e: React.FormEvent<any>) {
    e.preventDefault();

    if (form.isValidated()) {
      void submitForm({ fields: form.values });
    }
  }

  return (
    <Column gap={6}>
      <RichTextField value={block.form?.heading as any} />
      <Column component="form" gap={3} onSubmit={handleSubmit} noValidate>
        <Row flexWrap="wrap" rowGap={3} columnGap={2}>
          {formDef.fields!.map((field) => (
            <CMSFormField
              key={field.id}
              field={field}
              form={form}
              disabled={isRunning}
            />
          ))}
        </Row>
        <BusyButton
          busy={isRunning}
          busyLabel="Submitting..."
          type="submit"
          variant="contained"
          size="large"
        >
          {formDef.submitButtonLabel}
        </BusyButton>
      </Column>
    </Column>
  );
}

type CMSFormFieldProps = {
  field: NonNullable<Form['fields']>[number];
  form: UseForm<Record<string, any>>;
  disabled: boolean;
};

function CMSFormField({ field, form, disabled }: CMSFormFieldProps) {
  switch (field.blockType) {
    case 'number':
    case 'text':
    case 'textarea':
    case 'email':
    case 'select': {
      const type = !['textarea', 'select'].includes(field.blockType)
        ? field.blockType
        : undefined;

      return (
        <TextField
          type={type}
          label={field.label}
          {...form.field(field.name)}
          multiline={field.blockType === 'textarea'}
          minRows={5}
          disabled={disabled}
          sx={{ flex: { xs: undefined, sm: field.width }, width: 1 }}
          raisedLabel
          select={field.blockType === 'select'}
        >
          {field.blockType === 'select' &&
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

function buildFormConstraints(fields: Form['fields']) {
  return fields?.reduce<Record<string, any>>((acc, field) => {
    if (field.blockType === 'message') return acc;

    const constraint: Record<string, any> = {};

    if (field.required) constraint['presence'] = { allowEmpty: false };
    if (field.blockType === 'email') constraint['email'] = true;
    if (field.blockType === 'number') constraint['numericality'] = {};

    acc[field.name] = constraint;

    return acc;
  }, {});
}

export default FormWithInfoBlock;
