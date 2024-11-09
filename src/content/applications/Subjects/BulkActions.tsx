import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubject, configureSubjects, fetchSubjects } from 'src/store/thunks/subjectThunks';
import { fetchSpecialities, fetchSubSystems } from 'src/store/thunks/specialityThunks';
import { selectSpecialities, selectSubSystems } from 'src/store/selectors/specialitySelector';
import { selectToken } from 'src/store/selectors/userSelectors';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import { Controller, useForm } from 'react-hook-form';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { ButtonError } from 'src/styled/ClassesStyles';

interface BulkActionsProps {
  selectedSubjects: string[];
  onDeleteMultiple: (subjectIds: string[]) => Promise<void>;
  setSelectedSubjects: React.Dispatch<React.SetStateAction<string[]>>;
}

const BulkActions: React.FC<BulkActionsProps> = ({ selectedSubjects }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openConfigDialog, setOpenConfigDialog] = useState<boolean>(false);
  const { handleShowSnackbar, handleClose, severity, open, message } = useSnackbar();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const specialities = useSelector(selectSpecialities);
  const subSystems = useSelector(selectSubSystems);
  
  const { control, watch, setValue } = useForm({
    defaultValues: {
      subSystem: '',
      speciality: '',
      maxScore: '',
      coefficient: ''
    }
  });

  const selectedSubSystem = watch('subSystem');

  useEffect(() => {
    if (selectedSubSystem) {
      dispatch(fetchSpecialities(token, selectedSubSystem));
    }
  }, [selectedSubSystem, dispatch, token]);

  useEffect(() => {
    if (subSystems.length === 0) {
      dispatch(fetchSubSystems(token));
    }
  }, [dispatch, token, subSystems.length]);

  const handleOpenDialog = (): void => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    setOpenDialog(false);
    try {
      for (const subjectId of selectedSubjects) {
        await dispatch(deleteSubject(subjectId, token));
      }
      handleShowSnackbar('Matières supprimées avec succès', 'success');
    } catch (error) {
      handleShowSnackbar('Erreur lors de la suppression des matières', 'error');
    }
  };

  const handleConfigureSubjects = async (): Promise<void> => {
    const speciality = watch('speciality');
    const maxScore = watch('maxScore');
    const coefficient = watch('coefficient');
    
    if (speciality && maxScore && coefficient && selectedSubjects.length > 0) {
      setOpenConfigDialog(false);
      try {
        await dispatch(configureSubjects(selectedSubjects, speciality, coefficient, maxScore, token));
        handleShowSnackbar('Matières configurées avec succès', 'success');
      } catch (error) {
        handleShowSnackbar('Erreur lors de la configuration des matières', 'error');
      }
    }
  };

  const handleOpenConfigDialog = (): void => {
    setOpenConfigDialog(true);
  };

  const handleCloseConfigDialog = (): void => {
    setOpenConfigDialog(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <ButtonError
            sx={{ ml: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
            onClick={handleOpenDialog}
          >
            Supprimer
          </ButtonError>

          <Controller
            name="subSystem"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Sélectionner un sous-système"
                variant="outlined"
                sx={{ ml: 3, minWidth: 200 }}
                onChange={(e) => {
                  setValue('speciality', '');
                  field.onChange(e);
                }}
              >
                {subSystems.map((subsystem) => (
                  <MenuItem key={subsystem.id} value={subsystem.id}>
                    {subsystem.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="speciality"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Sélectionner une spécialité"
                variant="outlined"
                sx={{ ml: 3, minWidth: 200 }}
                disabled={!selectedSubSystem}
              >
                {specialities.map((speciality) => (
                  <MenuItem key={speciality.id} value={speciality.id}>
                    {speciality.code} - {speciality.description}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="maxScore"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Max Score"
                variant="outlined"
                sx={{ ml: 3, minWidth: 100 }}
                type="number"
              />
            )}
          />

          <Controller
            name="coefficient"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Coefficient"
                variant="outlined"
                sx={{ ml: 3, minWidth: 100 }}
                type="number"
              />
            )}
          />

          <Button
            sx={{ ml: 3 }}
            variant="contained"
            color="primary"
            onClick={handleOpenConfigDialog}
            startIcon={<SettingsIcon />}
            disabled={selectedSubjects.length === 0 || !watch('speciality') || !watch('maxScore') || !watch('coefficient')}
          >
            Configurer
          </Button>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>Êtes-vous sûr de vouloir supprimer les matières sélectionnées ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <ButtonError onClick={handleConfirmDelete} color="error">
            Supprimer
          </ButtonError>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfigDialog} onClose={handleCloseConfigDialog}>
        <DialogTitle>Confirmer la configuration</DialogTitle>
        <DialogContent>
          <Typography>Êtes-vous sûr de vouloir configurer les matières sélectionnées avec ces paramètres ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfigDialog} color="primary">
            Annuler
          </Button>
          <Button
           endIcon={<SettingsIcon />} 
           variant="contained" onClick={handleConfigureSubjects} 
           color="primary">
            Configurer
          </Button>
        </DialogActions>
      </Dialog>

      <SnackbarNotification
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </>
  );
};

export default BulkActions;
