import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';

interface DeleteConfirmationModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  studentName: string;
}

const DeleteStudentModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  handleClose,
  handleConfirm,
  studentName,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Confirmer la suppression</DialogTitle>
      <DialogContent>
        <Typography>
          Êtes-vous sûr de vouloir supprimer l'élève <strong>{studentName}</strong> ? Cette action est irréversible.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteStudentModal;
