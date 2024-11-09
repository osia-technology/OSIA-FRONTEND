import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Paper, CircularProgress, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { fetchStudentMarks } from 'src/store/thunks/studentThunks';
import { selectStudentById, selectStudentMarks } from 'src/store/selectors/studentSelector';
import { selectClassById } from 'src/store/selectors/classeSelector';
import { RootState } from 'src/app/store';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import HomeIcon from '@mui/icons-material/Home';
import DomainIcon from '@mui/icons-material/Domain';
import DynamicIconBreadcrumbs from 'src/components/DynamicIconBreadcrumbs';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { useTranslation } from 'react-i18next';
import { selectRole, selectToken } from 'src/store';
import { getHomePathByRole } from 'src/utils/helpers';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { Tooltip, IconButton } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { fetchStudentVerdict } from 'src/store/thunks/verdictThunks';
import { selectVerdict } from 'src/store/selectors/verdictSelector';
import VerdictComponent from 'src/components/Verdicts/VerdictComponent';

const StudentDetails: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const role = useSelector(selectRole);
  const path = `/dashboard/${getHomePathByRole(role)}`;
  const { student_id, class_id } = useParams<{ student_id: string, class_id: string }>();
  const dispatch = useDispatch();
  const { handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();
  const token = useSelector(selectToken);
  const studentMarks = useSelector(selectStudentMarks);

  const student = useSelector((state: RootState) => selectStudentById(state, student_id));
  const classData = useSelector((state: RootState) => selectClassById(state, class_id));
  const studentVerdict = useSelector(selectVerdict);
  const [studentInfos, setStudentInfo] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudentData = async () => {
      if (class_id && student_id) {
        setLoading(true);
        try {
          const studentMarks = await dispatch(fetchStudentMarks(student_id, token));
          setStudentInfo(studentMarks);
  
          const verdicts = await dispatch(fetchStudentVerdict(student_id, token));
  
          if (verdicts.length === 0) {
            handleShowSnackbar("Aucun verdict disponible pour cet élève.", 'warning');
          } else {
            handleShowSnackbar('Données chargées avec succès', 'success');
          }
        } catch (error) {
          handleShowSnackbar("Erreur lors du chargement des données de l'élève !", 'error');
        } finally {
          setLoading(false);
        }
      }
    };
  
    loadStudentData();
  }, [dispatch, class_id, student_id, token]);
  

  const breadcrumbs = [
    { title: t('home'), href: path, icon: HomeIcon },
    { title: 'Classes', href: '/management/classes', icon: DomainIcon },
    { title: classData?.name || 'Détails de la classe', href: `/management/classes/details/${class_id}`, icon: DomainIcon },
    { title: student?.name || "Détails de l'élève", href: `/students/details/${student_id}/${class_id}`, icon: DomainIcon }
  ];

  return (
    <>
      <Helmet>
        <title>Détails de l'élève</title>
      </Helmet>
      <Box sx={{ padding: '16px 15px', backgroundColor: '#f7f7f7', mt: 2 }}>
        <Container maxWidth="lg">
          <DynamicIconBreadcrumbs breadcrumbs={breadcrumbs} />
        </Container>
      </Box>

      <Box p={3}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'start', mb: 2 }}>
          <Tooltip arrow placement="top" title="Retour aux détails de la classe">
            <IconButton color="primary" onClick={() => navigate(`/management/classes/details/${class_id}`)}>
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Nom :</Typography>
                  <Typography><strong>{student?.name}</strong></Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Matricule :</Typography>
                  <Typography><strong>{student?.matricule}</strong></Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Date de naissance :</Typography>
                  <Typography><strong>{student?.date_of_birth}</strong></Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Ville de naissance :</Typography>
                  <Typography><strong>{student?.city_of_birth}</strong></Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Sexe :</Typography>
                  <Typography><strong>{student?.sexe === 'm' ? 'Masculin' : 'Féminin'}</strong></Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Téléphone :</Typography>
                  <Typography><strong>{student?.phone || 'Non renseigné'}</strong></Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Adresse :</Typography>
                  <Typography><strong>{student?.address || 'Non renseignée'}</strong></Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Nom du tuteur :</Typography>
                  <Typography><strong>{student?.tutor_name || 'Non renseigné'}</strong></Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>Notes de l'élève</Typography>
              {studentMarks.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Matière</TableCell>
                        <TableCell>Coefficient</TableCell>
                        <TableCell>Note</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {studentMarks.map((mark, index) => (
                        <TableRow key={index}>
                          <TableCell>{mark.subject.name}</TableCell> 
                          <TableCell>{mark.subject.coefficient}</TableCell> 
                          <TableCell>{mark.score}/20</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>Aucune note trouvée pour cet élève.</Typography>
              )}
            </Paper>
            <VerdictComponent verdict={studentVerdict} studentInfos={studentInfos} city_of_birth={student.city_of_birth} sexe={student.sexe} />
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
    </>
  );
};

export default StudentDetails;
