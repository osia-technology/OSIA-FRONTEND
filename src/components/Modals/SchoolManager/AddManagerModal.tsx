import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, IconButton, InputAdornment, DialogTitle, Button, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface AddManagerModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (name: string, email: string, password: string) => void;
}

const AddManagerModal: React.FC<AddManagerModalProps> = ({ open, handleClose, handleSave }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validate = () => {
    let valid = true;

    if (name.trim() === '') {
      setNameError(t('nameRequired'));
      valid = false;
    } else {
      setNameError(null);
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setEmailError(t('invalidEmail'));
      valid = false;
    } else {
      setEmailError(null);
    }

    if (password.length < 8) {
      setPasswordError(t('passwordMinLength'));
      valid = false;
    } else {
      setPasswordError(null);
    }

    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      handleSave(name, email, password);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('addAManager')}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={t('name')}
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          margin="dense"
          label={t('email')}
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          margin="dense"
          label={t('password')}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">{t('cancel')}</Button>
        <Button onClick={handleSubmit} color="primary">{t('register')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddManagerModal;
