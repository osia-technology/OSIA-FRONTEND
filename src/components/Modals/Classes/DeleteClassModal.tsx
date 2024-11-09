import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

interface DeleteClassModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirmDelete: () => void;
}

const DeleteClassModal: React.FC<DeleteClassModalProps> = ({ open, handleClose, handleConfirmDelete }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmer la suppression</DialogTitle>
      <DialogContent>
        <Typography>Êtes-vous sûr de vouloir supprimer cette classe ? Cette action est irréversible.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleConfirmDelete} color="error">
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteClassModal;
