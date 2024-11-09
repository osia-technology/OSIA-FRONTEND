import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { Card, Box, CircularProgress, Typography } from '@mui/material';
import { fetchClasses } from 'src/store/thunks/classThunks';
import { selectAllClasses } from 'src/store/selectors/classeSelector';
import ClassesTable from './ClassesTable';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import { selectToken } from 'src/store/selectors/userSelectors';
import { uploadClassesFunction } from 'src/feature/classManagement/uploadClasses';

function Classes() {
  const dispatch = useDispatch();
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectToken);
  const classes = useSelector(selectAllClasses);
  const { handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();
  const isMountedRef = useRef(true);

  useEffect(() => {
    const loadClasses = async () => {
      setLoadingClasses(true);
      try {
        const result = await dispatch(fetchClasses(token));
        if (result.length === 0) {
          handleShowSnackbar('Aucune classe trouvée pour cette école', 'warning');
        } else {
          handleShowSnackbar('Classes chargées avec succès', 'success');
        }
      } catch (error) {
        handleShowSnackbar('Erreur lors du chargement des classes', 'error');
      } finally {
        setLoadingClasses(false);
      }
    };

    loadClasses();

    return () => {
      isMountedRef.current = false;
    };
  }, [dispatch, token]);

  const handleFileUpload = (formData: FormData) => {
    setLoading(true);
    setUploadProgress(0);

    const fakeProgressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(fakeProgressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);

    uploadClassesFunction(formData, dispatch, handleShowSnackbar, setLoading, token).then(() => {
      if (isMountedRef.current) {
        setLoading(false);
        dispatch(fetchClasses(token));
      }
    }).catch((error) => {
      if (isMountedRef.current) {
        setLoading(false);
        handleShowSnackbar('Erreur lors de l\'ajout des classes', 'error');
      }
    });
  };

  if (loadingClasses) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Chargement des classes...
        </Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ mx: 2}}>
      <Box sx={{ width: '100%', maxWidth: '100%', height: 'auto', display: 'flex', flexDirection: 'column', }}>
        <ClassesTable 
          classes={classes} 
          onFileUpload={handleFileUpload}
          loading={loading}
          uploadProgress={uploadProgress}
        />
      </Box>
      
      <SnackbarNotification
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Card>
  );
}

export default Classes;
