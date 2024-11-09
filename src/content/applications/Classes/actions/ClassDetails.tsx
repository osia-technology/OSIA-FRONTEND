import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Paper, Tooltip, IconButton, Container, CircularProgress, Button,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { selectClassById } from 'src/store/selectors/classeSelector';
import { RootState } from 'src/app/store';
import DynamicIconBreadcrumbs from 'src/components/DynamicIconBreadcrumbs';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import DomainIcon from '@mui/icons-material/Domain';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useDropzone } from 'react-dropzone';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import Footer from 'src/components/Footer';
import AddStudentModal from 'src/components/Modals/Students/CreateStudentModal';
import { fetchStudents, uploadMultipleStudents, deleteStudent } from 'src/store/thunks/studentThunks';
import { generateVerdict } from 'src/store/thunks/verdictThunks';
import StudentTable from 'src/content/applications/Students/StudentTable';
import { selectRole, selectToken } from 'src/store';
import { selectAllStudents } from 'src/store/selectors/studentSelector';
import { getHomePathByRole } from 'src/utils/helpers';
import { useTranslation } from 'react-i18next';
import { uploadMultipleStudentsMarks } from 'src/store/thunks/studentThunks';

const ClassDetails: React.FC = () => {
  const { t } = useTranslation();
  const role = useSelector(selectRole);
  const path = "/dashboard/" + getHomePathByRole(role);
  const navigate = useNavigate();
  const { class_id } = useParams<{ class_id: string }>();
  const classData = useSelector((state: RootState) => selectClassById(state, class_id));
  const { handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [loadingClass, setLoadingClass] = useState(true);
  const students = useSelector(selectAllStudents);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAddStudentModal, setOpenAddStudentModal] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [marksUploadLoading, setMarksUploadLoading] = useState(false);
  const [generatingVerdicts, setGeneratingVerdicts] = useState(false);

  const handleFileUpload = async (formData: FormData) => {
    try {
      setImportLoading(true);
      await dispatch(uploadMultipleStudents(class_id!, formData, token));
      handleShowSnackbar('Élèves importés avec succès', 'success');
      dispatch(fetchStudents(class_id!, token));
    } catch (error) {
      handleShowSnackbar(error.message || 'Erreur lors de l\'importation des élèves', 'error');
    } finally {
      setImportLoading(false);
    }
  };

  const handleMarksFileUpload = async (formData: FormData) => {
    try {
      setMarksUploadLoading(true);
      await dispatch(uploadMultipleStudentsMarks(class_id!, formData, token));
      handleShowSnackbar('Notes des élèves importées avec succès', 'success');
    } catch (error) {
      handleShowSnackbar(error.message || 'Erreur lors de l\'importation des notes', 'error');
    } finally {
      setMarksUploadLoading(false);
    }
  };

  const handleGenerateVerdicts = async () => {
    try {
      setGeneratingVerdicts(true);
      await dispatch(generateVerdict(class_id!, token));
      setTimeout(() => {
        setGeneratingVerdicts(false);
        handleShowSnackbar('Verdicts générés avec succès', 'success');
      }, 200000);
    } catch (error) {
      handleShowSnackbar(error.message || 'Erreur lors de la génération des verdicts', 'error');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const formData = new FormData();
        formData.append('student_file', file);
        handleFileUpload(formData);
      }
    },
  });

  const { getRootProps: getMarksRootProps, getInputProps: getMarksInputProps } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const formData = new FormData();
        formData.append('marks_file', file);
        handleMarksFileUpload(formData);
      }
    },
  });

  useEffect(() => {
    const loadStudents = async () => {
      if (class_id) {
        setLoadingClass(true);
        try {
          const result = await dispatch(fetchStudents(class_id!, token));
          if (result.length === 0) {
            handleShowSnackbar('Aucun élève trouvé pour cette classe', 'warning');
          } else {
            handleShowSnackbar('Élèves chargés avec succès', 'success');
          }
        } catch (error) {
          handleShowSnackbar('Erreur lors du chargement des élèves', 'error');
        } finally {
          setLoadingClass(false);
        }
      }
    };

    loadStudents();
  }, [class_id, dispatch, token]);

  const breadcrumbs = [
    { title: t('home'), href: path, icon: HomeIcon },
    { title: 'Classes', href: '/management/classes', icon: DomainIcon },
    { title: classData?.name || 'Détails de la classe', href: `/management/classes/${class_id}`, icon: DomainIcon },
  ];

  const handleDeleteStudent = async (studentId: string) => {
    try {
      await dispatch(deleteStudent(studentId, token));
      handleShowSnackbar('Élève supprimé avec succès', 'success');
      dispatch(fetchStudents(class_id!, token));
    } catch (error) {
      handleShowSnackbar('Erreur lors de la suppression de l\'élève', 'error');
    }
  };

  const handleEditStudent = (studentId: string) => {
    navigate(`/management/students/edit/${studentId}/${class_id}`);
  };

  const handleViewStudent = (studentId: string) => {
    navigate(`/management/students/details/${studentId}/${class_id}`);
  };

  return (
    <>
      <Helmet>
        <title>Détails de la classe</title>
      </Helmet>
      <Box sx={{ padding: '16px 15px', backgroundColor: '#f7f7f7', mt: 2 }}>
        <Container maxWidth="lg">
          <DynamicIconBreadcrumbs breadcrumbs={breadcrumbs} />
        </Container>
      </Box>

      <Box p={3}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box display="flex" alignItems="center">
            <Tooltip arrow placement="top" title="Retour" onClick={() => navigate('/management/classes')}>
              <IconButton color="primary" sx={{ mr: 2 }}>
                <ArrowBackTwoToneIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="h4" gutterBottom sx={{ mt: 1 }}>
              Détails de la classe
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={generatingVerdicts ? <CircularProgress size={24} /> : <AutoAwesomeIcon />}
            onClick={handleGenerateVerdicts}
            disabled={generatingVerdicts}
          >
            Générer les verdicts
          </Button>
        </Box>

        <Paper elevation={3} sx={{ p: 3 }}>
          {loadingClass ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Nom de la classe :</Typography>
                <Typography><strong>{classData?.name}</strong></Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Description :</Typography>
                <Typography><strong>{classData?.description}</strong></Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Capacité :</Typography>
                <Typography><strong>{classData?.capacity}</strong></Typography>
              </Grid>
            </Grid>
          )}
        </Paper>
        {students.length > 0 && (
          <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h4">Liste des élèves</Typography>
              <Button variant="contained" color="primary" onClick={() => setOpenAddStudentModal(true)}>
                Ajouter un élève
              </Button>
            </Box>

            <StudentTable
              students={students}
              page={page}
              rowsPerPage={rowsPerPage}
              handlePageChange={(event, newPage) => setPage(newPage)}
              handleRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
              handleDeleteStudent={handleDeleteStudent}
              handleEditStudent={handleEditStudent}
              handleViewStudent={handleViewStudent}
              count={students.length}
            />
          </Paper>
        )}

        {students.length === 0 && (
          <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            <Typography variant="h4">Importer les élèves</Typography>
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
                    Déposez vos fichiers ici pour les importer
                  </Typography>
                </>
              )}
            </Box>
          </Paper>
        )}

        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h4">Importer les notes des élèves</Typography>
          <Box
            {...getMarksRootProps()}
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
            {marksUploadLoading ? (
              <CircularProgress />
            ) : (
              <>
                <input {...getMarksInputProps()} />
                <CloudUploadIcon sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" color="inherit">
                  Déposez vos fichiers ici pour uploader les notes
                </Typography>
              </>
            )}
          </Box>
        </Paper>

      </Box>

      <AddStudentModal 
        open={openAddStudentModal} 
        handleClose={() => setOpenAddStudentModal(false)} 
        classId={class_id}
      />

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

export default ClassDetails;
