import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Card, Box, LinearProgress, Typography, CircularProgress } from '@mui/material';
import SchoolsTable from './SchoolsTable';
import { selectToken } from 'src/store';
import { fetchSchools } from 'src/store/thunks/schoolThunks';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import { usePermissions } from 'src/utils/permissions/usePermissions';
import { selectSchools } from 'src/store/selectors/schoolsSelectors';
import { useTranslation } from 'react-i18next';
import { uploadSchoolsFunction } from 'src/feature/schoolManagement/uploadSchoolsFunction';

function Schools() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingSchools, setLoadingSchools] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isMounted] = useState(true);
  const token = useSelector(selectToken);
  const schools = useSelector(selectSchools);
  const {handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();
  const canReadSchool = usePermissions(['school#read']);
  const canUploadSchool = usePermissions(['school#upload']);
  const canDeleteSchool = usePermissions(['school#delete']);
  const canEditSchool = usePermissions(['school#update']);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true; 
    const loadSchools = async () => {
      if (!isMountedRef.current) return;

      setLoadingSchools(true);
      try {
        const result = await dispatch(fetchSchools(token));

        if (result.length == 0) {
          handleShowSnackbar(t('warningSchool'), 'warning');
        }else{
          handleShowSnackbar(t('schoolLoadedSuccess'), 'success');
        }
      }catch (error) {
        if (isMountedRef.current) {
          handleShowSnackbar(t('schoolLoadedError'), 'error');
        }
        console.error(t('errorLoaded'), error);
      } finally {
        if (isMountedRef.current) {
          setLoadingSchools(false);
        }
      }
    };

    loadSchools();
    return () => {
      isMountedRef.current = false;
    };
  }, [dispatch, token, schools.length]);



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

    uploadSchoolsFunction(formData, dispatch, navigate, handleShowSnackbar, setLoading, isMounted, token).then(() => {
      if (isMountedRef.current) {
        setLoading(false);
        dispatch(fetchSchools(token));
      }
    }).catch((error) => {
      if (isMountedRef.current) {
        setLoading(false);
        handleShowSnackbar(t('errorAddingSchool'), 'error');
      }
    });
  };

  if (loadingSchools) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          {t('loading_schools')}...
        </Typography>
      </Box>
    );
  }

  return (
<Card>
    <Box 
      sx={{ 
        width: '100%',
        maxWidth: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'auto'
      }}
    >
      {!loading && canReadSchool && (
        <SchoolsTable schools={schools} onFileUpload={handleFileUpload} 
        canUploadSchool={canUploadSchool} 
        canDeleteSchool={canDeleteSchool}
        canEditSchool={canEditSchool}
         />
      )}
      {loading && (
        <Box sx={{ mt: 2, p: 2 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {t('loading')} : {uploadProgress}%
          </Typography>
        </Box>
      )}
     </Box>
    
   <SnackbarNotification
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
      />
</Card>
  );
}

export default Schools;
