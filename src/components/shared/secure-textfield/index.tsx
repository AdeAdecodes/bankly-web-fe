import { IconButton } from '@mui/material';
import { Eye, EyeOff } from 'mdi-material-ui';
import React from 'react';
import TextField, { TextFieldProps } from '../textfield';

function SecureTextField(
  props: TextFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [active, setActive] = React.useState(true);

  function toggleActive() {
    setActive((value) => !value);
  }

  return (
    <TextField
      {...props}
      ref={ref}
      type={active ? 'password' : 'text'}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <IconButton size="small" onClick={toggleActive}>
            {active ? <Eye /> : <EyeOff />}
          </IconButton>
        ),
      }}
    />
  );
}

export default React.forwardRef(SecureTextField);
