import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubjects, uploadMultipleSubjects, deleteSubject } from 'src/store/thunks/subjectThunks';
import { fetchClassLevels } from 'src/store/thunks/classThunks'; 
import { selectClassLevels } from 'src/store/selectors/classeSelector';
import { selectAllSubjects } from 'src/store/selectors/subjectSelector';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SubjectTable from './SubjectTable'; 
import SnackbarNotification from 'src/components/SnackbarNotification';
import Footer from 'src/components/Footer';
import { selectToken, selectRole } from 'src/store';
import DynamicIconBreadcrumbs from 'src/components/DynamicIconBreadcrumbs';
import { Helmet } from 'react-helmet-async';
import HomeIcon from '@mui/icons-material/Home';
import SubjectIcon from '@mui/icons-material/Subject';
import DeleteSubjectModal from 'src/components/Modals/Subjects/DeleteSubjectModal';
import { getHomePathByRole } from 'src/utils/helpers';
import { useTranslation } from 'react-i18next';

const SubjectManagement: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const subjects = useSelector(selectAllSubjects);
  const classLevels = useSelector(selectClassLevels);
  const { handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();
  const token = useSelector(selectToken);
  const role = useSelector(selectRole);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingClassLevels, setLoadingClassLevels] = useState(true);
  const [importLoading, setImportLoading] = useState(false);
  const [selectedClassLevel, setSelectedClassLevel] = useState<string>(''); // Niveau de classe sélectionné
  const [openModal, setOpenModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const path = `/dashboard/${getHomePathByRole(role)}`;
  const breadcrumbs = [
    { title: t('home'), href: path, icon: HomeIcon },
    { title: t('subject'), href: '/management/subjects', icon: SubjectIcon },
  ];

  useEffect(() => {
    const loadClassLevels = async () => {
      setLoadingClassLevels(true);
      try {
        await dispatch(fetchClassLevels(token));
        handleShowSnackbar('Niveaux de classe chargés avec succès', 'success');
      } catch (error) {
        handleShowSnackbar('Erreur lors du chargement des niveaux de classe', 'error');
      } finally {
        setLoadingClassLevels(false);
      }
    };
    loadClassLevels();
  }, []);

  const handleClassLevelChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const classLevelId = event.target.value as string;
    setSelectedClassLevel(classLevelId);

    if (classLevelId) {
      setLoadingSubjects(true);
      try {
        await dispatch(fetchSubjects(classLevelId, token));
      } finally {
        setLoadingSubjects(false);
      }
    }
  };

  const handleFileUpload = async (formData: FormData) => {
    try {
      setImportLoading(true);
      await dispatch(uploadMultipleSubjects(selectedClassLevel!, formData, token));
      handleShowSnackbar('Matières importées avec succès', 'success');
      dispatch(fetchSubjects(selectedClassLevel, token));
    } catch (error) {
      handleShowSnackbar("Erreur lors de l'importation des matières", 'error');
    } finally {
      setImportLoading(false);
    }
  };


  const handleDeleteMultipleSubjects = async (subjectIds: string[]): Promise<void> => {
    try {
      for (const subjectId of subjectIds) {
        await dispatch(deleteSubject(subjectId, token));
      }
      handleShowSnackbar('Matières supprimées avec succès', 'success');
    } catch (error) {
      handleShowSnackbar('Erreur lors de la suppression des matières', 'error');
    }
  };
  

  const handleDeleteSubject = async (subjectId: string): Promise<void> => {
    try {
      await dispatch(deleteSubject(subjectId, token));
      handleShowSnackbar('Matière supprimée avec succès', 'success');
    } catch (error) {
      handleShowSnackbar('Erreur lors de la suppression de la matière', 'error');
    }
  };
  

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && selectedClassLevel) {
        const formData = new FormData();
        formData.append('subject_file', file);
        handleFileUpload(formData);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Mes Matières</title>
      </Helmet>

      <Box sx={{ padding: '16px 15px', backgroundColor: '#f7f7f7', mt: 2 }}>
        <Container maxWidth="lg">
          <DynamicIconBreadcrumbs breadcrumbs={breadcrumbs} />
        </Container>
      </Box>

      <Box p={3}>
        {loadingClassLevels ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : (
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id="class-level-label">Niveau de classe</InputLabel>
            <Select
              labelId="class-level-label"
              value={selectedClassLevel || ''}
              onChange={handleClassLevelChange}
              label="Niveau de classe"
            >
              {classLevels.map((level) => (
                <MenuItem key={level.id} value={level.id}>
                  {level.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {selectedClassLevel && (
          <>
            {loadingSubjects ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
              </Box>
            ) : subjects.length > 0 ? (
              <SubjectTable subjects={subjects} onDelete={handleDeleteSubject} onDeleteMultiple={handleDeleteMultipleSubjects} />
            ) : (
              <Box
                {...getRootProps()}
                sx={{
                  p: 5,
                  border: '2px dashed grey',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  height: 200,
                  cursor: 'pointer',
                  bgcolor: 'secondary.main',
                  color: 'secondary.contrastText',
                  mt: 3,
                }}
              >
                {importLoading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <input {...getInputProps()} />
                    <CloudUploadIcon sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" color="inherit">
                      Déposez vos fichiers ici pour importer les matières
                    </Typography>
                  </>
                )}
              </Box>
            )}
          </>
        )}
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

export default SubjectManagement;
