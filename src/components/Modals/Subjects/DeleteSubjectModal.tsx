import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress } from '@mui/material';

interface DeleteSubjectModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirmDelete: () => void;
  loading: boolean; 
}

const DeleteSubjectModal: React.FC<DeleteSubjectModalProps> = ({ open, handleClose, handleConfirmDelete, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirmer la suppression"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Êtes-vous sûr de vouloir supprimer cette matière ? Cette action est irréversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleConfirmDelete} color="error" autoFocus>
            {loading ? <CircularProgress size={24} /> : 'Supprimer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteSubjectModal;
