import React, { forwardRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useTheme } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { Control } from 'react-hook-form';
import createClassValidationSchema from 'src/utils/classes/createClassValidationSchema';
import { useForm, Controller } from 'react-hook-form';
import { IClassFormInput } from 'src/models/class';
import SubmitSchoolLoaderButton from 'src/components/SubmitLoaderSchoolButton';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ClassModalProps {
  open: boolean;
  handleClose: () => void;
  onFormSubmit: (classData: IClassFormInput) => void;
  control: Control<IClassFormInput, any>; 
  loading: boolean;
  reset: () => void;
}

const CreateClassModal: React.FC<ClassModalProps> = ({ open, handleClose, onFormSubmit, loading }) => {
  const validationSchema = createClassValidationSchema;

  const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      capacity: '',
    }
  });

  const theme = useTheme();

  const onSubmit = (data: IClassFormInput) => {
    onFormSubmit(data);
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
        Ajouter une classe
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent style={{ maxHeight: 'calc(100vh - 210px)', overflow: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ marginTop: theme.spacing(2) }}>
              <Controller
                name="name"
                control={control}
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
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description de la classe"
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
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Capacité de la classe"
                    fullWidth
                    error={!!errors.capacity}
                    helperText={errors.capacity?.message}
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

export default CreateClassModal;
