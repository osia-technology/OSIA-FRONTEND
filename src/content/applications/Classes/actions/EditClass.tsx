import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Tooltip, IconButton, Container, Grid } from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from 'src/app/store';
import { selectClassById } from 'src/store/selectors/classeSelector';
import SubmitSchoolLoaderButton from 'src/components/SubmitLoaderSchoolButton';
import DynamicIconBreadcrumbs from 'src/components/DynamicIconBreadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import DomainIcon from '@mui/icons-material/Domain';
import { Helmet } from 'react-helmet-async';
import SaveIcon from '@mui/icons-material/Save';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import { IClassFormInput } from 'src/models/class';
import { selectRole, selectToken } from 'src/store/selectors/userSelectors';
import Footer from 'src/components/Footer';
import { updateClassFunction } from 'src/feature/classManagement/updateClassFunction';
import createClassValidationSchema from 'src/utils/classes/createClassValidationSchema';
import { getHomePathByRole } from 'src/utils/helpers';

const EditClass: React.FC = () => {
  const role = useSelector(selectRole);
  const path = "/dashboard/" + getHomePathByRole(role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const { class_id } = useParams<{ class_id: string }>();
  const classData = useSelector((state: RootState) => selectClassById(state, class_id));
  const [loading, setLoading] = useState(false);
  const { handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();

  const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm<IClassFormInput>({
    resolver: yupResolver(createClassValidationSchema) as unknown as Resolver<IClassFormInput>,
    mode: 'onChange',
  });

  useEffect(() => {
    if (classData) {
      reset({
        name: classData.name,
        description: classData.description,
        capacity: classData.capacity,
      });
    }
  }, [classData, reset]);

  const handleSave = async (classData: IClassFormInput) => {
    try {
      setLoading(true);
      await updateClassFunction(class_id, classData, dispatch, setLoading, token);
      handleShowSnackbar('Classe modifiée avec succès', 'success');
    } catch (error) {
      handleShowSnackbar('Erreur lors de la modification de la classe : ' + (error.message || 'Une erreur est survenue'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/management/classes');
  };

  const handleReturn = () => {
    navigate('/management/classes');
  };

  const breadcrumbs = [
    { title: 'Accueil', href: path, icon: HomeIcon },
    { title: 'Classes', href: '/management/classes', icon: DomainIcon },
    { title: classData?.name || 'Modifier la classe', href: `/classes/${class_id}`, icon: DomainIcon }
  ];

  return (
    <>
      <Helmet>
        <title>Modifier une classe</title>
      </Helmet>

      <Box sx={{ padding: '16px 15px', backgroundColor: '#f7f7f7', mt: 2 }}>
        <Container maxWidth="lg">
          <DynamicIconBreadcrumbs breadcrumbs={breadcrumbs} />
        </Container>
      </Box>

      <Box
        sx={{
          margin: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'start', mb: 3 }}>
          <Tooltip arrow placement="top" title="Retour" onClick={handleReturn}>
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Modifier les informations de la classe
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(handleSave)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nom de la classe"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="capacity"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Capacité"
                    fullWidth
                    error={!!errors.capacity}
                    helperText={errors.capacity?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box mt={1} display="flex" justifyContent="space-between" width="100%">
            <Button
              onClick={handleCancel}
              variant="outlined"
              color="secondary"
              size="medium"
              sx={{ height: '45px', minWidth: 120, mt: 3 }}
            >
              Annuler
            </Button>

            <SubmitSchoolLoaderButton
              type="submit"
              isValid={isValid}
              loading={loading}
              icon={<SaveIcon />}
              variant="contained"
            >
              Enregistrer les modifications
            </SubmitSchoolLoaderButton>
          </Box>
        </form>
      </Box>
      
      <SnackbarNotification
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
      
      <Footer />
    </>
  );
};

export default EditClass;
