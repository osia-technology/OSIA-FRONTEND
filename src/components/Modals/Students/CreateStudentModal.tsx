import React,{ forwardRef } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Slide,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { createStudentValidationSchema } from 'src/utils/students/createStudentValidationSchema';
import { createStudent } from 'src/store/thunks/studentThunks';
import { selectToken } from 'src/store/selectors/userSelectors';
import { IStudentFormInput } from 'src/models/student';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import { TransitionProps } from '@mui/material/transitions';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SubmitSchoolLoaderButton from 'src/components/SubmitLoaderSchoolButton';


const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AddStudentModalProps {
  open: boolean;
  handleClose: () => void;
  classId: string | undefined;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ open, handleClose, classId }) => {
  const validationSchema = createStudentValidationSchema;
  
  const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { handleShowSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: IStudentFormInput) => {
    try {
      setLoading(true);
      await dispatch(createStudent(data, classId!, token!));
      handleShowSnackbar('Élève ajouté avec succès', 'success');
      reset();
      handleClose();
    } catch (error) {
      handleShowSnackbar("Erreur lors de l'ajout de l'élève", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" TransitionComponent={Transition}>
      <DialogTitle>Ajouter un élève</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} mt={1}>
            {/* Nom */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nom"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            {/* Matricule */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="matricule"
                control={control}
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

            {/* Date de naissance */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="date_of_birth"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date de naissance"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    error={!!errors.date_of_birth}
                    helperText={errors.date_of_birth?.message}
                  />
                )}
              />
            </Grid>

            {/* Ville de naissance */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="city_of_birth"
                control={control}
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

            {/* Sexe */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.sexe}>
                <InputLabel>Sexe</InputLabel>
                <Controller
                  name="sexe"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Sexe"
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

            {/* Nom du tuteur */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="tutor_name"
                control={control}
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

            {/* Téléphone */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Téléphone (format international)"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>

            {/* Adresse */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="address"
                control={control}
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
          </Grid>

          <DialogActions sx={{ mt: 2 }}>
            <Button onClick={handleClose} color="secondary">
              Annuler
            </Button>

            <SubmitSchoolLoaderButton
              type="submit"
              isValid={isValid}
              loading={loading}
              icon={<SaveAltIcon />}
              variant="contained"
            >
              Ajouter
            </SubmitSchoolLoaderButton>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentModal;
