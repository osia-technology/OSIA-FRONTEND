import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Tooltip, IconButton, Container, Grid } from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, Resolver  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from 'src/app/store';
import { selectSchoolById } from 'src/store/selectors/schoolsSelectors';
import SubmitSchoolLoaderButton from 'src/components/SubmitLoaderSchoolButton';
import DynamicIconBreadcrumbs from 'src/components/DynamicIconBreadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import DomainIcon from '@mui/icons-material/Domain';
import { Helmet } from 'react-helmet-async';
import SaveIcon from '@mui/icons-material/Save';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import { ISchoolFormInput } from 'src/models/school';
import { selectRole, selectToken } from 'src/store/selectors/userSelectors';
import Footer from 'src/components/Footer';
import { useTranslation } from 'react-i18next';
import createSchoolValidationSchema from 'src/utils/schools/createSchoolValidationSchema';
import { getHomePathByRole } from 'src/utils/helpers';
import { updateSchoolFunction } from 'src/feature/schoolManagement/updateSchoolFunction';


const EditSchool: React.FC = () => {
  const role = useSelector(selectRole);
  const path = "/dashboard/"+ getHomePathByRole(role);
  const { t } = useTranslation();
  const validationSchema = createSchoolValidationSchema;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const { school_id } = useParams<{ school_id: string }>();
  const school = useSelector((state: RootState) => selectSchoolById(state, school_id));
  const [loading, setLoading] = useState(false);
  const {handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();

  const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm<ISchoolFormInput>({
    resolver: yupResolver(validationSchema) as unknown as Resolver<ISchoolFormInput>,
    mode: 'onChange',
  });

  useEffect(() => {
    if (school) {
      reset({
        name: school.name,
        address: school.address,
        postalCode: school.postalCode,
        phoneNumber: school.phoneNumber,
        email: school.email,
        schoolCode: school.schoolCode,
        city: school.city,
        website : school?.website,
        principalName: school?.principalName,
      });
    }
  }, [school, reset]);

  const handleSave = async (schoolData: ISchoolFormInput) => {
    
    try {
      setLoading(true);
      await updateSchoolFunction(school.id, schoolData, dispatch, setLoading, token); 
      handleShowSnackbar(t('schoolEditSuccess'), 'success');
      // navigate('/management/schools');
    } catch (error) {
      handleShowSnackbar(error.message || t('schoolEditError'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/management/schools');
  };

  const handleReturn = () => {
    navigate('/management/schools');
  };

  const breadcrumbs = [
    { title: t('home'), href: path, icon: HomeIcon },
    { title: t('schools'), href: '/management/schools', icon: DomainIcon },
    { title: school?.name || t('editSchool'), href: `/schools/${school_id}`, icon: DomainIcon }
  ];

  return (
    <>
      <Helmet>
        <title>{t('editASchool')}</title>
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
          <Tooltip arrow placement="top" title={t('return')} onClick={handleReturn}>
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
           {t('editSchoolInfor')}
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
                    label={t('schoolName')}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
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
                    label={t('address')}
                    fullWidth
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="postalCode"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('postal_code')}
                    fullWidth
                    error={!!errors.postalCode}
                    helperText={errors.postalCode?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('city')}
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('phone_number')}
                    fullWidth
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('email')}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="website"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('website')}
                    fullWidth
                    error={!!errors.website}
                    helperText={errors.website?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="principalName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('principalName')}
                    fullWidth
                    error={!!errors.principalName}
                    helperText={errors.principalName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="schoolCode"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('school_code')}
                    fullWidth
                    error={!!errors.schoolCode}
                    helperText={errors.schoolCode?.message}
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
              {t('cancel')}
            </Button>

            <SubmitSchoolLoaderButton
              type="submit"
              isValid={isValid}
              loading={loading}
              icon={<SaveIcon />}
              variant="contained"
            >
              {t('modify')}
            </SubmitSchoolLoaderButton>
          </Box>
        </form>
      </Box>
      <SnackbarNotification
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
      />
        <Footer/>
    </>
  );
};

export default EditSchool;
