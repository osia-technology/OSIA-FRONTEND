import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface DeleteManagerModalProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}



const DeleteManagerModal: React.FC<DeleteManagerModalProps> = ({ open, handleClose, handleDelete }) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('confirmDeletion')}</DialogTitle>
      <DialogContent>
        <Typography>{t('confirmDeleteManager')}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          {t('cancel')}
        </Button>
        <Button onClick={handleDelete} color="error">
          {t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteManagerModal;
