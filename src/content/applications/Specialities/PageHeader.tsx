import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { useForm, Resolver } from 'react-hook-form';
import { selectRole, selectToken, selectUsername } from 'src/store/selectors/userSelectors';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import { IClassFormInput } from 'src/models/class';
import createClassValidationSchema from 'src/utils/classes/createClassValidationSchema';
import { useTranslation } from 'react-i18next';
import CreateSpecialityModal from 'src/components/Modals/Specialities/CreateSpecialityModal';
import { ISpecialityFormInput } from 'src/models/speciality';
import { addSpecialityFunction } from 'src/feature/specialityManagement/addSpecialityFunction';

function PageHeader() {
  const { t } = useTranslation();
  const role = useSelector(selectRole);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { open, handleClose, handleShowSnackbar, message, severity } = useSnackbar();

  const { control, handleSubmit, reset } = useForm<IClassFormInput>({
    resolver: yupResolver(createClassValidationSchema) as Resolver<IClassFormInput>,
    mode: 'onChange',
  });

  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onFormSubmit = async (specialityData: ISpecialityFormInput, subsystemId: string) => {
    try {
      setLoading(true);
      await addSpecialityFunction(specialityData, dispatch, navigate, handleShowSnackbar, setLoading, isMounted, token, subsystemId);
      handleCloseModal();
      reset();
      handleShowSnackbar('Spécialité ajoutée avec succès !', 'success');
    } catch (error) {
      if (isMounted) {
        handleCloseModal();
        handleShowSnackbar('Erreur lors de l\'ajout de la spécialité : ' + error, 'error');
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('special')}
          </Typography>
          <Typography variant="subtitle2">
            Gérez facilement vos différentes spécialités et obtenez une vue d'ensemble claire et détaillée de chacune d'elles.
          </Typography>
        </Grid>
        { role == "admin" && (
          <>
              <Grid item>
              <Button
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                startIcon={<AddIcon fontSize="small" />}
                onClick={handleOpenModal}
              >
                Ajouter une spécialité
              </Button>
            </Grid>
          </>
        )}  
      </Grid>

      <CreateSpecialityModal
        open={openModal}
        handleClose={handleCloseModal}
        onFormSubmit={onFormSubmit}
        loading={loading}
        reset={reset}
      />

      <SnackbarNotification
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </>
  );
}

export default PageHeader;
