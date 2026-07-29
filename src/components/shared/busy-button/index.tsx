import { Button, CircularProgress, ButtonProps } from '@mui/material';
import React from 'react';

type BusyButtonProps = ButtonProps & {
  busy: boolean;
  busyLabel?: string;
};

function BusyButton({ busy, busyLabel, ...props }: BusyButtonProps, ref: any) {
  const label = props.children;

  return (
    <Button
      ref={ref}
      {...props}
      disabled={busy || props.disabled}
      startIcon={busy ? <CircularProgress size={16} /> : props.startIcon}
    >
      {busy ? busyLabel || label : label}
    </Button>
  );
}

export default React.forwardRef(BusyButton);
