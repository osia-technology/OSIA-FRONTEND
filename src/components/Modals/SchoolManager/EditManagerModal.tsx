import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface EditManagerModalProps {
  open: boolean;
  handleClose: () => void;
  handleEdit: (name: string, email: string) => void;
  managerData: { name: string; email: string };
}

const EditManagerModal: React.FC<EditManagerModalProps> = ({ open, handleClose, handleEdit, managerData }) => {
  const { t } = useTranslation();
  const [name, setName] = useState(managerData?.name || '');
  const [email, setEmail] = useState(managerData?.email || '');

  const handleSubmit = () => {
    handleEdit(name, email);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('editManagerInfo')}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={t('name')}
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label={t('email')}
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">{t('cancel')}</Button>
        <Button onClick={handleSubmit} color="primary">{t('modify')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditManagerModal;
