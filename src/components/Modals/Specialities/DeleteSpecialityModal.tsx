import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

interface DeleteSpecialityModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirmDelete: () => void;
}

const DeleteSpecialityModal: React.FC<DeleteSpecialityModalProps> = ({ open, handleClose, handleConfirmDelete }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmer la suppression</DialogTitle>
      <DialogContent>
        <Typography>Êtes-vous sûr de vouloir supprimer cette spécialité ? Cette action est irréversible.</Typography>
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

export default DeleteSpecialityModal;
