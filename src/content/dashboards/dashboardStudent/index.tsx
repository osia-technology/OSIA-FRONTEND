import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Paper, CircularProgress, Typography, Card, CardContent, Fab, Container } from '@mui/material';
import { fetchStudentMarks } from 'src/store/thunks/studentThunks';
import { fetchStudentVerdict } from 'src/store/thunks/verdictThunks';
import { selectStudentMarks, selectStudentById } from 'src/store/selectors/studentSelector';
import { selectVerdict } from 'src/store/selectors/verdictSelector';
import { RootState } from 'src/app/store';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import { seclectRoleId, selectRole, selectToken } from 'src/store/selectors/userSelectors';
import VerdictComponent from 'src/components/Verdicts/VerdictComponent';
import DynamicIconBreadcrumbs from 'src/components/DynamicIconBreadcrumbs';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import RobotIcon from '@mui/icons-material/SmartToy';
import { Tooltip, IconButton, Zoom, keyframes } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { getHomePathByRole } from 'src/utils/helpers';
import { useTranslation } from 'react-i18next';
import Footer from 'src/components/Footer';


const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;


const getColorByScore = (score: number) => {
  if (score >= 15) {
    return '#4caf50';
  } else if (score >= 12) {
    return '#ffeb3b';
  } else if (score >= 8) {
    return '#ff9800';
  } else {
    return '#f44336';
  }
};

const StudentDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const student_id = useSelector(seclectRoleId);
  const token = useSelector(selectToken);
  const student = useSelector((state: RootState) => selectStudentById(state, student_id));
  const studentMarks = useSelector(selectStudentMarks);
  const studentVerdict = useSelector(selectVerdict);
  const [studentInfos, setStudentInfo] = useState(null);
  const role = useSelector(selectRole);
  const path = "/dashboard/" + getHomePathByRole(role);

  const { open, handleClose, handleShowSnackbar, message, severity } = useSnackbar();
  const [loading, setLoading] = useState(true);

  const breadcrumbs = [
    { title: t('home'), href: path, icon: HomeIcon },
    { title: student?.name || 'Détails de l\'élève', href: `/students/details/${student_id}`, icon: SchoolIcon },
  ];

  useEffect(() => {
    const loadStudentData = async () => {
      if (student_id) {
        setLoading(true);
        try {
          const studentMarks = await dispatch(fetchStudentMarks(student_id, token));
          setStudentInfo(studentMarks);
          console.log(studentMarks)
          await dispatch(fetchStudentVerdict(student_id, token));

          handleShowSnackbar('Données chargées avec succès', 'success');
        } catch (error) {
          handleShowSnackbar("Erreur lors du chargement des données de l'élève !", 'error');
        } finally {
          setLoading(false);
        }
      }
    };

    loadStudentData();
  }, [dispatch, student_id, token]);

  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Helmet>
            <title>Tableau de bord de l'élève</title>
          </Helmet>
          
          <Container maxWidth="lg">
            <Box sx={{ padding: '16px 15px', backgroundColor: '#f7f7f7', mt: 2 }}>
              <Container maxWidth="lg">
                <DynamicIconBreadcrumbs breadcrumbs={breadcrumbs} />
              </Container>
            </Box>

            <Box mb={4}>
              <Typography variant="h4" gutterBottom align="center" mb={2}>
                Tableau de bord de l'élève
              </Typography>

              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" mb={1} align='center'>Informations de l'élève</Typography>
                      <Typography>Nom : <b>{studentInfos.name}</b></Typography>
                      <Typography>Matricule : <b>{studentInfos.matricule}</b></Typography>
                      {/* <Typography>Date de naissance : {student?.date_of_birth}</Typography>
                      <Typography>Ville de naissance : {student?.city_of_birth}</Typography>
                      <Typography>Sexe : {student?.sexe === 'm' ? 'Masculin' : 'Féminin'}</Typography> */}
                      <Typography>Classe : <b> {studentInfos.class_name}</b></Typography>
                      <Typography>Ecole : <b> {studentInfos.school_name}</b></Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            <Box mt={4}>
              <Typography variant="h5" gutterBottom align='center' mb={2}>Notes de l'élève</Typography>
              <Grid container spacing={2} justifyContent="center">
                {studentMarks.length > 0 ? (
                  studentMarks.map((mark, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card sx={{ backgroundColor: getColorByScore(mark.score) }}>
                        <CardContent>
                          <Typography variant="h3" color='white'>{mark.subject.name}</Typography>
                          <Typography color='white'>Coefficient : {mark.subject.coefficient}</Typography>
                          <Typography color='white'>Note : {mark.score} / 20</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Typography>Aucune note trouvée pour cet élève.</Typography>
                )}
              </Grid>
            </Box>

            <Box mt={4}>
              <Typography variant="h5" gutterBottom align='center'>Verdict de l'élève</Typography>
              <VerdictComponent verdict={studentVerdict} studentInfos={studentInfos} city_of_birth={student?.city_of_birth} sexe={student?.sexe} />
            </Box>
            <Footer />
          </Container>
        </>
      )}

      <SnackbarNotification
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />

   
      <Tooltip title="Aide Robot" placement="left" TransitionComponent={Zoom} onClick={() => navigate('/dashboard/chat')}>
        <Fab
          color="primary"
          aria-label="robot"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            animation: `${bounce} 1.5s ease-in-out infinite`,
          }}
        >
          <RobotIcon />
        </Fab>
      </Tooltip>
    </>
  );
};

export default StudentDashboard;
