import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

interface SubmitButtonProps {
  type: 'submit' | 'button' | 'reset';
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'default';
  fullWidth?: boolean;
  loading?: boolean;
  isValid?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const SubmitLoaderButton: React.FC<SubmitButtonProps> = ({
  type,
  variant = 'contained',
  fullWidth = true,
  loading = false,
  isValid = true,
  onClick,
  children,
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      color="primary"
      fullWidth={fullWidth}
      sx={{ mt: 3, mb: 2, position: 'relative', height: 45 }}
      disabled={!isValid || loading}
      onClick={onClick}
      endIcon={!loading && <LoginIcon />}
    >
      {loading ? (
        <CircularProgress
          size={26}
          sx={{
            color: 'blue',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitLoaderButton;