import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface SubmitButtonProps {
  type: 'submit' | 'button' | 'reset';
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'default';
  fullWidth?: boolean;
  loading?: boolean;
  isValid?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  width?: string | number; 
}

const SubmitSchoolLoaderButton: React.FC<SubmitButtonProps> = ({
  type,
  variant = 'contained',
  fullWidth = true,
  loading = false,
  isValid = true,
  onClick,
  children,
  icon,
  size = 'medium',
  width = 'auto',
}) => {
  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return { height: 35, fontSize: '0.875rem', iconSize: 20 };
      case 'large':
        return { height: 55, fontSize: '1.125rem', iconSize: 32 };
      default:
        return { height: 45, fontSize: '1rem', iconSize: 26 };
    }
  };

  const { height, fontSize, iconSize } = getButtonSize();

  return (
    <Button
      type={type}
      variant={variant}
      color="primary"
      fullWidth={fullWidth}
      sx={{ 
        mt: 3, 
        mb: 2, 
        position: 'relative', 
        height, 
        fontSize, 
        width
      }}
      disabled={!isValid || loading}
      onClick={onClick}
      endIcon={!loading && icon}
    >
      {loading ? (
        <CircularProgress
          size={iconSize}
          sx={{
            color: 'blue',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: `-${iconSize / 2}px`,
            marginLeft: `-${iconSize / 2}px`,
          }}
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitSchoolLoaderButton;
