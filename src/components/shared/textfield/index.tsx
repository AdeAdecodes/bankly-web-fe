import {
  inputBaseClasses,
  inputClasses,
  inputLabelClasses,
  MenuItemProps,
  outlinedInputClasses,
  styled,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import { ChevronDown } from 'mdi-material-ui';
import React from 'react';
import clsx from '~/utils/clsx';

export type TextFieldProps = MuiTextFieldProps & {
  raisedLabel?: boolean;
};

function TextFieldRoot({ raisedLabel, ...props }: TextFieldProps) {
  const className = clsx(props.className, { raisedLabel });

  function renderValue(value: unknown) {
    const originalRenderValueFn = props.SelectProps?.renderValue;
    const originalRenderedValue = originalRenderValueFn?.(value);

    if (originalRenderedValue) {
      return originalRenderedValue;
    }

    if (!value || (typeof value === 'string' && value.length === 0)) {
      return <span style={{ opacity: 0.5 }}>{props.placeholder}</span>;
    }

    const children__ = React.Children.toArray(
      props.children
    ) as unknown as React.ReactElement<MenuItemProps>[];

    if (Array.isArray(value)) {
      return children__
        .filter((x) => value.some((v) => v === x.props.value))
        .map((x) => x.props.children)
        .join(', ');
    }

    return children__.find((x) => x.props.value === value)?.props?.children;
  }

  return (
    <MuiTextField
      hiddenLabel={raisedLabel}
      {...props}
      className={className}
      InputLabelProps={{
        shrink: raisedLabel,
        ...props.InputLabelProps,
      }}
      SelectProps={{
        IconComponent: ChevronDown,
        displayEmpty: true,
        MenuProps: {
          ...props.SelectProps?.MenuProps,
          PaperProps: {
            ...props.SelectProps?.MenuProps?.PaperProps,
            sx: {
              ...props.SelectProps?.MenuProps?.PaperProps?.sx,
            },
          },
          sx: {
            '.MuiMenuItem-root': {
              paddingTop: 1.25,
              paddingBottom: 1.25,
            },
            ...props.SelectProps?.MenuProps?.sx,
          },
        },
        ...props.SelectProps,
        renderValue,
      }}
    />
  );
}

const TextField = styled(TextFieldRoot)(({ theme }) => {
  const cx = {
    input: inputClasses,
    inputBase: inputBaseClasses,
    label: inputLabelClasses,
    outlinedInput: outlinedInputClasses,
  };

  return {
    [`.${cx.inputBase.inputHiddenLabel}`]: {
      // padding: theme.spacing(1.5, 2),
      '&.MuiSelect-select': {
        // paddingRight: theme.spacing(4),
      },
    },
    '&.raisedLabel': {
      [`.${cx.label.root}`]: {
        transform: 'none',
        ...theme.typography.body2,
        fontWeight: 500,
        // color: theme.palette.text.primary,
      },
      [`> .${cx.inputBase.root}`]: {
        marginTop: theme.spacing(3),
        [`> .${cx.inputBase.input}`]: {
          // padding: theme.spacing(1.5, 2),
        },
      },
      [`.${cx.outlinedInput.notchedOutline}`]: {
        top: 0,
        legend: {
          display: 'none',
        },
      },
    },
  };
});

export default TextField;
