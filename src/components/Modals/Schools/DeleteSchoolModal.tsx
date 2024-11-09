import React, { forwardRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
`
);

const Transition = forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

interface DeleteModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirmDelete: () => void;
}

const DeleteSchoolModal: React.FC<DeleteModalProps> = ({ open, handleClose, handleConfirmDelete }) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" TransitionComponent={Transition}>
      <DialogTitle id="alert-dialog-title"> {t('confirmDeletion')}</DialogTitle>
      <DialogContent>
        <Typography>{t('confirmDeleteSelectedSchool')}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
        {t('cancel')}
        </Button>
        <ButtonError onClick={handleConfirmDelete} color="error">
          {t('delete')}
        </ButtonError>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteSchoolModal;
