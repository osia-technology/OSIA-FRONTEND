import { useState, useEffect } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import CreateClassModal from 'src/components/Modals/Classes/CreateClassModal';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { addClassFunction } from 'src/feature/classManagement/addClassFunction';
import { useForm, Resolver } from 'react-hook-form';
import { selectToken, selectUsername } from 'src/store/selectors/userSelectors';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import { IClassFormInput } from 'src/models/class';
import createClassValidationSchema from 'src/utils/classes/createClassValidationSchema';
import { fetchClasses } from 'src/store/thunks/classThunks';

function PageHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const username = useSelector(selectUsername);
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

  const onFormSubmit = async (classData: IClassFormInput) => {
    try {
      setLoading(true);
      await addClassFunction(classData, dispatch, navigate, handleShowSnackbar, setLoading, isMounted, token);
      handleCloseModal();
      reset();
      handleShowSnackbar('Classe ajoutée avec succès !', 'success');
      dispatch(fetchClasses(token));
    } catch (error) {
      if (isMounted) {
        handleCloseModal();
        handleShowSnackbar('Erreur lors de l\'ajout de la classe : ' + error, 'error');
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
            Classes
          </Typography>
          <Typography variant="subtitle2">
            Gérez facilement vos différentes classes et obtenez une vue d'ensemble claire et détaillée de chacune d'elles.
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddIcon fontSize="small" />}
            onClick={handleOpenModal}
          >
            Ajouter une classe
          </Button>
        </Grid>
      </Grid>

      <CreateClassModal
        open={openModal}
        handleClose={handleCloseModal}
        onFormSubmit={onFormSubmit}
        control={control}
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
