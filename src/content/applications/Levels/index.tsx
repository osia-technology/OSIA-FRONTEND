import React, { useEffect } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Container} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectRole, selectToken } from 'src/store/selectors/userSelectors';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { selectClassLevels } from 'src/store/selectors/classeSelector';
import { fetchClassLevels } from 'src/store/thunks/classThunks';
import Footer from 'src/components/Footer';
import { getHomePathByRole } from 'src/utils/helpers';
import { useTranslation } from 'react-i18next';
import { Home, TrendingUp } from '@mui/icons-material';
import DynamicIconBreadcrumbs from 'src/components/DynamicIconBreadcrumbs';

const Levels: React.FC = () => { 
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { open, handleClose, handleShowSnackbar, message, severity } = useSnackbar();
  const classLevels = useSelector(selectClassLevels);
  const role = useSelector(selectRole);
  const path = "/dashboard/"+ getHomePathByRole(role);
  
  const breadcrumbs = [
    { title: t('home'), href: path, icon: Home },
    { title: t('levels'), href: '/levels', icon: TrendingUp}
  ]

  useEffect(() => {
    if (!Array.isArray(classLevels) || classLevels.length === 0) {
        const fetchClassesLevels = async () => {
        try {
            await dispatch(fetchClassLevels(token));
            handleShowSnackbar('Les niveaux ont été récupérés avec succès.', 'success');
        } catch (error) {
            handleShowSnackbar('Erreur lors de la récupération des niveaux.', 'error');
        }
        };
        fetchClassesLevels();
    }
    
  }, [dispatch, token, handleShowSnackbar, classLevels]);

  return (
    <>
     <Box sx={{ padding: '16px 15px', backgroundColor: '#f7f7f7' }}> 
        <Container maxWidth="lg">
          <DynamicIconBreadcrumbs breadcrumbs={breadcrumbs} />
        </Container>
      </Box>
      <Box m={3} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Liste des niveaux
        </Typography>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Nom du Niveau</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classLevels.length > 0 ? (
              classLevels.map((level, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{level.name}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center">Aucun niveau trouvé</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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

export default Levels;
