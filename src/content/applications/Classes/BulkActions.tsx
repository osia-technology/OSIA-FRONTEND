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
import { deleteClass, configureClasses, fetchClasses } from 'src/store/thunks/classThunks';
import { fetchSpecialities } from 'src/store/thunks/specialityThunks';
import { fetchClassLevels } from 'src/store/thunks/classThunks';
import { selectSpecialities, selectSubSystems } from 'src/store/selectors/specialitySelector';
import { selectClassLevels } from 'src/store/selectors/classeSelector';
import { selectToken } from 'src/store/selectors/userSelectors';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import { Controller, useForm } from 'react-hook-form';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { ButtonError } from 'src/styled/ClassesStyles';

interface BulkActionsProps {
  selectedClasses: string[];
}

const BulkActions: React.FC<BulkActionsProps> = ({ selectedClasses }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openConfigDialog, setOpenConfigDialog] = useState<boolean>(false);
  const { handleShowSnackbar, handleClose, severity, open, message } = useSnackbar();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const specialities = useSelector(selectSpecialities);
  const levels = useSelector(selectClassLevels);
  const subSystems = useSelector(selectSubSystems);
  
  const { control, watch, setValue } = useForm({
    defaultValues: {
      subSystem: '',
      speciality: '',
      level: ''
    }
  });

  const selectedSubSystem = watch('subSystem');

  useEffect(() => {
    if (selectedSubSystem) {
      dispatch(fetchSpecialities(token, selectedSubSystem));
    }
  }, [selectedSubSystem, dispatch, token]);

  useEffect(() => {
    if (levels.length === 0) {
      dispatch(fetchClassLevels(token));
    }
  }, [dispatch, token, levels.length]);

  const handleOpenDialog = (): void => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    setOpenDialog(false);
    try {
      for (const classId of selectedClasses) {
        await dispatch(deleteClass(classId, token));
      }
      handleShowSnackbar('Classes supprimées avec succès', 'success');
      dispatch(fetchClasses(token));
    } catch (error) {
      handleShowSnackbar('Erreur lors de la suppression des classes', 'error');
    }
  };

  const handleConfigureClasses = async (): Promise<void> => {
    const speciality = watch('speciality');
    const level = watch('level');
    if (speciality && level && selectedClasses.length > 0) {
      setOpenConfigDialog(false);
      try {
        await dispatch(configureClasses(selectedClasses, speciality, level, token));
        handleShowSnackbar('Classes configurées avec succès', 'success');
        dispatch(fetchClasses(token));
      } catch (error) {
        handleShowSnackbar('Erreur lors de la configuration des classes', 'error');
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
            name="level"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Sélectionner un niveau"
                variant="outlined"
                sx={{ ml: 3, minWidth: 200 }}
              >
                {levels.map((level) => (
                  <MenuItem key={level.id} value={level.id}>
                    {level.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Button
            sx={{ ml: 3 }}
            variant="contained"
            color="primary"
            onClick={handleOpenConfigDialog}
            startIcon={<SettingsIcon />}
            disabled={selectedClasses.length === 0 || !watch('speciality') || !watch('level')}
          >
            Configurer
          </Button>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>Êtes-vous sûr de vouloir supprimer les classes sélectionnées ?</Typography>
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
          <Typography>Êtes-vous sûr de vouloir configurer les classes sélectionnées avec ces options ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfigDialog} color="primary">
            Annuler
          </Button>
          <Button
           endIcon={<SettingsIcon />} 
           variant="contained" onClick={handleConfigureClasses} 
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
