import React, { forwardRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useTheme } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import createSchoolValidationSchema from 'src/utils/schools/createSchoolValidationSchema';
import { useForm, Controller } from 'react-hook-form';
import { Control } from 'react-hook-form';
import { ISchoolFormInput } from 'src/models/school';
import SubmitSchoolLoaderButton from 'src/components/SubmitLoaderSchoolButton';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


interface SchoolModalProps {
  open: boolean;
  handleClose: () => void;
  onFormSubmit: (schoolData: ISchoolFormInput) => void;
  control: Control<ISchoolFormInput, any>; 
  loading: boolean;
  reset: () => void;
}

const CreateSchoolModal: React.FC<SchoolModalProps> = ({ open, handleClose, onFormSubmit, loading }) => {
    const { t } = useTranslation();
    const validationSchema = createSchoolValidationSchema;
    const { control, handleSubmit,reset, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
        defaultValues: {
          name: '',
          address: '',
          city: '',
          postalCode: '',
          phoneNumber: '',
          email: '',
          schoolCode: '',
          website: '',
          principalName: ''
        }
      });

  const theme = useTheme();

  const onSubmit = (data: any) => {
    onFormSubmit(data);
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullWidth
      PaperProps={{
        style: {
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle
       style={{
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(2),
        fontWeight: 'bold' 
      }}
      >{t('add_school')}</DialogTitle>
    <form onSubmit={handleSubmit(onFormSubmit)}>

      <DialogContent  style={{
        maxHeight: 'calc(100vh - 210px)',
        overflow: 'auto' 
       }}>
      <Grid container spacing={2}>
          <Grid item xs={12} style={{ marginTop: theme.spacing(2) }}>
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
          <Grid item xs={12}>
            <Controller
              name="principalName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('principalName')}
                  fullWidth
                  error={!!errors.website}
                  helperText={errors.website?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
       sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: theme.spacing(2)
      }}
      >
        <Button onClick={handleClose}         
        sx={{
          height: '45px',
          minWidth: '120px'
        }}>
        {t('cancel')}
        </Button>

        <SubmitSchoolLoaderButton
        type="submit"
        isValid={isValid}
        loading={loading}
        icon={<SaveAltIcon />}
        variant="contained"
        >
        {t('register')}
        </SubmitSchoolLoaderButton>
      </DialogActions>
      </form>
    </Dialog>
    
  );
};

export default CreateSchoolModal;
