import React from 'react';
import { Snackbar, Alert, SnackbarOrigin } from '@mui/material';

interface SnackbarNotificationProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning'; 
  onClose: () => void;
  anchorOrigin?: SnackbarOrigin;
}

const SnackbarNotification: React.FC<SnackbarNotificationProps> = ({ open, message, severity, onClose, anchorOrigin = { vertical: 'top', horizontal: 'right' }, }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={anchorOrigin} 
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
