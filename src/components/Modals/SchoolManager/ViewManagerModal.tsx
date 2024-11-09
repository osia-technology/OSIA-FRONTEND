import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ViewManagerModalProps {
  open: boolean;
  handleClose: () => void;
  managerData: { name: string; email: string };
}



const ViewManagerModal: React.FC<ViewManagerModalProps> = ({ open, handleClose, managerData }) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('managerInfo')}</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{t('name')}: {managerData.name}</Typography>
        <Typography variant="body1">{t('email')}: {managerData.email}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">{t('close')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewManagerModal;
