import { useState } from 'react';

type Severity = 'success' | 'error' | 'info' | 'warning';

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<Severity>('success');

  const handleShowSnackbar = (msg: string, severity: Severity = 'success') => {
    setMessage(msg);
    setSeverity(severity);
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };


  return {
    open,
    message,
    severity,
    handleShowSnackbar,
    handleClose
  };
};
