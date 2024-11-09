import React, { forwardRef, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid, Slide, MenuItem } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useTheme } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { Control, useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux'; // Ajout de useDispatch pour dispatcher les actions
import createSpecialityValidationSchema from 'src/utils/specialities/createClassValidationSchema';
import { ISpecialityFormInput } from 'src/models/speciality';
import SubmitSchoolLoaderButton from 'src/components/SubmitLoaderSchoolButton';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { selectSubSystems } from 'src/store/selectors/specialitySelector';
import { fetchSubSystems } from 'src/store/thunks/specialityThunks';
import { selectToken } from 'src/store';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SpecialityModalProps {
  open: boolean;
  handleClose: () => void;
  onFormSubmit: (specialityData: ISpecialityFormInput, subsystemId: string) => void;
  loading: boolean;
  reset: () => void;
}

const CreateSpecialityModal: React.FC<SpecialityModalProps> = ({ open, handleClose, onFormSubmit, loading }) => {
    const token = useSelector(selectToken);
  const validationSchema = createSpecialityValidationSchema;

  const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      code: '',
      description: '',
      subsystemId: ''
    }
  });

  const theme = useTheme();
  const dispatch = useDispatch();

  const subsystems = useSelector(selectSubSystems);

  useEffect(() => {
    if (!Array.isArray(subsystems) || subsystems.length === 0) {
      const fetchSubsystemsData = async () => {
        try {
          await dispatch(fetchSubSystems(token));
        } catch (error) {
          console.error('Erreur lors de la récupération des sous-systèmes', error);
        }
      };

      fetchSubsystemsData();
    }
  }, [dispatch, subsystems]);

  const onSubmit = (data: ISpecialityFormInput) => {
    const { subsystemId } = data;
    onFormSubmit(data, subsystemId);
    // reset();
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
      >
        Ajouter une spécialité
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent style={{ maxHeight: 'calc(100vh - 210px)', overflow: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ marginTop: theme.spacing(2) }}>
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Code de la spécialité"
                    fullWidth
                    error={!!errors.code}
                    helperText={errors.code?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description de la spécialité"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="subsystemId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Sélectionner un sous-système"
                    fullWidth
                    error={!!errors.subsystemId}
                    helperText={errors.subsystemId?.message}
                  >
                    {subsystems.map((subsystem) => (
                      <MenuItem key={subsystem.id} value={subsystem.id}>
                        {subsystem.name}
                      </MenuItem>
                    ))}
                  </TextField>
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
          <Button
            onClick={handleClose}
            sx={{
              height: '45px',
              minWidth: '120px'
            }}
          >
            Annuler
          </Button>

          <SubmitSchoolLoaderButton
            type="submit"
            isValid={isValid}
            loading={loading}
            icon={<SaveAltIcon />}
            variant="contained"
          >
            Enregistrer
          </SubmitSchoolLoaderButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateSpecialityModal;
