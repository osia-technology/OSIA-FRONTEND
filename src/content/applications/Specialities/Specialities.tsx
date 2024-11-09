import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Card, CardContent, TextField, MenuItem, Box, CircularProgress } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectSpecialities, selectSubSystems } from 'src/store/selectors/specialitySelector';
import { fetchSpecialities, fetchSubSystems, deleteSpeciality  } from 'src/store/thunks/specialityThunks';
import DeleteSpecialityModal from 'src/components/Modals/Specialities/DeleteSpecialityModal';
import { selectRole, selectToken } from 'src/store/selectors/userSelectors';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import SnackbarNotification from 'src/components/SnackbarNotification';

const Specialities: React.FC = () => {
  const role = useSelector(selectRole);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const subSystems = useSelector(selectSubSystems);
  const specialities = useSelector(selectSpecialities);
  const { control, setValue } = useForm();
  const [selectedSubSystem, setSelectedSubSystem] = useState<string | null>(null);
  const [loadingSpecialities, setLoadingSpecialities] = useState<boolean>(false);
  const { handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();

  const [openModal, setOpenModal] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSubSystems(token));
  }, [dispatch, token]);

  const handleSubSystemChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const subsystemId = event.target.value as string;
    setSelectedSubSystem(subsystemId);
    setValue("subsystem", subsystemId);

    if (subsystemId && token) {
      setLoadingSpecialities(true);
      try {
        await dispatch(fetchSpecialities(token, subsystemId));
      } finally {
        setLoadingSpecialities(false);
      }
    }
  };

  const handleOpenModal = (id: string) => {
    setSelectedSpeciality(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSpeciality(null);
  };

  const handleDeleteSpeciality = () => {
    if (selectedSpeciality) {
      dispatch(deleteSpeciality(selectedSpeciality, token));
      handleCloseModal();
      handleShowSnackbar('Spécialité supprimée avec succès ! ', 'success');
    }
  };

  return (
<>
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
          Liste des spécialités
        </Typography>

        <Controller
          name="subsystem"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Sélectionner un sous-système"
              select
              fullWidth
              value={selectedSubSystem || ''}
              onChange={handleSubSystemChange}
              variant="outlined"
              style={{ marginBottom: '20px' }}
            >
              {subSystems.map((subsystem) => (
                <MenuItem key={subsystem.id} value={subsystem.id}>
                  {subsystem.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {selectedSubSystem ? (
          loadingSpecialities ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
              <CircularProgress />
            </Box>
          ) : (
            specialities.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Code</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {specialities.map((speciality) => (
                      <TableRow key={speciality.id}>
                        <TableCell>{speciality.code}</TableCell>
                        <TableCell>{speciality.description}</TableCell>
                        <TableCell align="right">
                          { role == "admin" && (
                            <>
                                    <IconButton 
                                        edge="end" 
                                        aria-label="delete" 
                                        onClick={() => handleOpenModal(speciality.id)}
                                        sx={{ color: 'red' }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                            </>
                          )
                          }
                          
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                <Typography variant="body1" color="textSecondary">
                  Aucun spécialité n'a été trouvée pour ce sous-système.
                </Typography>
              </Box>
            )
          )
        ) : (
          <Typography variant="body1" color="textSecondary" textAlign="center">
            Veuillez sélectionner un sous-système pour voir les spécialités.
          </Typography>
        )}

        <DeleteSpecialityModal
          open={openModal}
          handleClose={handleCloseModal}
          handleConfirmDelete={handleDeleteSpeciality}
        />
      </CardContent>
    </Card>
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

export default Specialities;
