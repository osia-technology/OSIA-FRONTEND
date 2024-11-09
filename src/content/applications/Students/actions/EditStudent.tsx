import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Tooltip, IconButton, Container, Grid, MenuItem, FormControl, InputLabel, Select  } from '@mui/material';
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
import { selectRole, selectToken } from 'src/store/selectors/userSelectors';
import Footer from 'src/components/Footer';
import { updateStudentFunction } from 'src/feature/studentManagement/updateStudentFunction';
import createStudentValidationSchema from 'src/utils/students/createStudentValidationSchema';
import { getHomePathByRole } from 'src/utils/helpers';
import { selectStudentById } from 'src/store/selectors/studentSelector';
import { fetchStudents } from 'src/store/thunks/studentThunks';

const EditStudent: React.FC = () => {
  const role = useSelector(selectRole);
  const path = "/dashboard/" + getHomePathByRole(role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const { student_id, class_id } = useParams<{ student_id: string, class_id: string }>();
  const student = useSelector((state: RootState) => selectStudentById(state, student_id));
  const classData = useSelector((state: RootState) => selectClassById(state, class_id));
  const [loading, setLoading] = useState(false);
  const { handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();

  const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(createStudentValidationSchema) as unknown as Resolver,
    mode: 'onChange',
  });

  useEffect(() => {
    if (class_id && student_id) {
      dispatch(fetchStudents(class_id, token));
    }
    if (student) {
      reset({
        name: student.name,
        matricule: student.matricule,
        date_of_birth: student.date_of_birth,
        city_of_birth: student.city_of_birth,
        sexe: student.sexe,
        phone: student.phone || '',
        address: student.address || '',
        tutor_name: student.tutor_name || '',
      });
    }
  }, [class_id, student_id, dispatch, token]);

  const handleSave = async (formData: any) => {
    try {
      setLoading(true);
      await updateStudentFunction(student_id!, formData, dispatch, setLoading, token);
      handleShowSnackbar('Informations de l\'élève mises à jour avec succès', 'success');
    } catch (error) {
      handleShowSnackbar('Erreur lors de la mise à jour de l\'élève', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/management/classes/details/${class_id}`);
  };

  const breadcrumbs = [
    { title: 'Accueil', href: path, icon: HomeIcon },
    { title: 'Classes', href: '/management/classes', icon: DomainIcon },
    { title: classData?.name || 'Modifier la classe', href: `/management/classes/details/${class_id}`, icon: DomainIcon },
    { title: student?.name || 'Modifier l\'élève', href: `/students/edit/${student_id}/${class_id}`, icon: DomainIcon },
  ];

  return (
    <>
      <Helmet>
        <title>Modifier un élève</title>
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
          <Tooltip arrow placement="top" title="Retour" onClick={handleCancel}>
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Modifier les informations de l'élève
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
                    label="Nom de l'élève"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="matricule"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Matricule"
                    fullWidth
                    error={!!errors.matricule}
                    helperText={errors.matricule?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="date_of_birth"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date de naissance"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.date_of_birth}
                    helperText={errors.date_of_birth?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="city_of_birth"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ville de naissance"
                    fullWidth
                    error={!!errors.city_of_birth}
                    helperText={errors.city_of_birth?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.sexe}>
                    <InputLabel id="sexe-label">Sexe</InputLabel>
                    <Controller
                    name="sexe"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select
                        {...field}
                        labelId="sexe-label"
                        id="sexe"
                        label="Sexe"
                        fullWidth
                        >
                        <MenuItem value="m">Masculin</MenuItem>
                        <MenuItem value="f">Féminin</MenuItem>
                        </Select>
                    )}
                    />
                    <Typography variant="caption" color="error">
                    {errors.sexe?.message}
                    </Typography>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Téléphone"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Adresse"
                    fullWidth
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="tutor_name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nom du tuteur"
                    fullWidth
                    error={!!errors.tutor_name}
                    helperText={errors.tutor_name?.message}
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

export default EditStudent;
