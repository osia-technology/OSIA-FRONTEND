import { useState, useEffect } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { selectUsername } from 'src/store/selectors/userSelectors';
import CreateSchoolModal from 'src/components/Modals/Schools/CreateSchoolModal';
import SnackbarNotification from 'src/components/SnackbarNotification';
import createSchoolValidationSchema from 'src/utils/schools/createSchoolValidationSchema';
import { useForm, Resolver } from 'react-hook-form';
import { ISchoolFormInput } from 'src/models/school';
import { selectToken } from 'src/store/selectors/userSelectors';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import { usePermissions } from 'src/utils/permissions/usePermissions';
import { fetchSchools } from 'src/store/thunks/schoolThunks';
import { useTranslation } from 'react-i18next';
import { addSchoolFunction } from 'src/feature/schoolManagement/addSchoolFunction';

function PageHeader() {
  const { t } = useTranslation();
  const validationSchema = createSchoolValidationSchema;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const username = useSelector(selectUsername);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const {open , handleClose, handleShowSnackbar, message, severity} = useSnackbar();
  const canAddSchool = usePermissions(['school#save']);

  const { control, handleSubmit, reset } = useForm<ISchoolFormInput>({
    resolver: yupResolver(validationSchema) as Resolver<ISchoolFormInput>,
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

  const onFormSubmit = async (schoolData: ISchoolFormInput) => {
    
    try {
      setLoading(true);

      await addSchoolFunction(schoolData, dispatch, navigate, handleShowSnackbar, setLoading, isMounted, token);
      reset();
      handleCloseModal();
      handleShowSnackbar(t('schoolAddSuccess'), 'success');
      dispatch(fetchSchools(token));
    } catch (error) {
      if (isMounted) {
        handleCloseModal();
        handleShowSnackbar(t('schoolAddError')+error, 'error');
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
          {t('schools')}
          </Typography>
          <Typography variant="subtitle2">
            {t('school_message')}
             
          </Typography>
        </Grid>
        {canAddSchool && (
                  <Grid item>
                  <Button
                    sx={{ mt: { xs: 2, md: 0 } }}
                    variant="contained"
                    startIcon={<AddIcon fontSize="small" />}
                    onClick={handleOpenModal}
                  >
                      {t('add_school')}
                  </Button>
                </Grid>
        )}

      </Grid>
      
      <CreateSchoolModal
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
      />
    </>
  );
}

export default PageHeader;
