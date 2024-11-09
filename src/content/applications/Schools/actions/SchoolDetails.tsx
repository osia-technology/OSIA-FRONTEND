import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Tooltip, IconButton, Container, Button, Divider, Card, Avatar, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { selectSchoolById } from 'src/store/selectors/schoolsSelectors';
import { RootState } from 'src/app/store';
import DynamicIconBreadcrumbs from 'src/components/DynamicIconBreadcrumbs';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import DomainIcon from '@mui/icons-material/Domain';
import AddIcon from '@mui/icons-material/Add';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddManagerModal from 'src/components/Modals/SchoolManager/AddManagerModal';
import ViewManagerModal from 'src/components/Modals/SchoolManager/ViewManagerModal';
import DeleteManagerModal from 'src/components/Modals/SchoolManager/DeleteManagerModal';
import EditManagerModal from 'src/components/Modals/SchoolManager/EditManagerModal';
import { fetchSchoolManager, saveSchoolManager, deleteSchoolManager, editSchoolManager } from 'src/feature/schoolManagerManagement/schoolManagerFunctions';
import PersonIcon from '@mui/icons-material/Person';
import { usePermissions } from 'src/utils/permissions/usePermissions';
import { selectRole, selectToken } from 'src/store/selectors/userSelectors';
import Footer from 'src/components/Footer';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { useTranslation } from 'react-i18next';
import {SchoolManager} from "src/models/schoolManager";
import { getHomePathByRole } from 'src/utils/helpers';

const SchoolDetails: React.FC = () => {
  const role = useSelector(selectRole);
  const path = "/dashboard/"+ getHomePathByRole(role);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { school_id } = useParams<{ school_id: string }>();

  const school = useSelector((state: RootState) => selectSchoolById(state, school_id));
  const token = useSelector(selectToken);
  const { handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();

  const [managerData, setManagerData] = useState<SchoolManager | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [loadingManager, setLoadingManager] = useState(true); 


  const canAddSchoolManager = usePermissions(['school#create_manager']);
  const canUpdateSchoolManager = usePermissions(['school#update_manager']);
  const canDeleteSchoolManager = usePermissions(['school#delete_manager']);
  const canReadSchoolManager = usePermissions(['school#read_manager']);

  useEffect(() => {
    if (school_id && canReadSchoolManager) {
      setLoadingManager(true);  
      fetchSchoolManager(school.id, token, handleShowSnackbar)
        .then((data) => {
          if(data.metadata.length == 0){
            handleShowSnackbar(data.data, 'warning')
          } else{
            handleShowSnackbar('Responsable chargée avec succès !', 'success')
            setManagerData(data.metadata);
          }
       })
        .catch((error) => handleShowSnackbar(error.message || 'Erreur lors du chargement du responsable', 'error'))
        .finally(() => setLoadingManager(false));
    }
  }, [school_id, token]);

  const handleSaveManager = (name: string, email: string, password: string) => {
    saveSchoolManager(email, password, name, school.id!, token, handleShowSnackbar)
      .then((data) => {
        setOpenAddModal(false);
        if (!managerData) {
          setManagerData({ id: data.id,name, email });
        }
      })
      .catch((error) => handleShowSnackbar(error.message, 'error'));
  };
  const handleEditManager = (name: string, email: string) => {
    editSchoolManager(name, email, managerData?.id, token, handleShowSnackbar)
      .then((data) => {
        setOpenEditModal(false);
        setManagerData({ ...managerData, name, email });
      })
      .catch((error) => handleShowSnackbar(error.message, 'error'));
  };
  const handleDeleteManager = () => {
    if (managerData) {
      deleteSchoolManager(managerData?.id!, token, handleShowSnackbar)
        .then(() => {
          setOpenDeleteModal(false);
          setManagerData(null);
        })
        .catch((error) => handleShowSnackbar(error.message, 'error'));
    }
  };

  const breadcrumbs = [
    { title: t('home'), href: path, icon: HomeIcon },
    { title: t('schools'), href: '/management/schools', icon: DomainIcon },
    { title: school.name, href: `/management/schools/${school.id}`, icon: DomainIcon },
  ];


  return (
    <>
      <Helmet>
        <title>{t('schoolDetails')}</title>
      </Helmet>
      <Box sx={{ padding: '16px 15px', backgroundColor: '#f7f7f7', mt: 2 }}>
        <Container maxWidth="lg">
          <DynamicIconBreadcrumbs breadcrumbs={breadcrumbs} />
        </Container>
      </Box>
      <Box p={3}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'start', mb: 1 }}>
          <Tooltip arrow placement="top" title={t('return')} onClick={() => navigate('/management/schools')}>
            <IconButton color="primary" sx={{  mr: 2 }}>
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h4" gutterBottom sx={{ mt: 1 }}>
          {t('viewSchoolDetails')}
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{t('schoolName')}:</Typography>
              <Typography><strong> {school.name}</strong></Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{t('address')}:</Typography>
              <Typography><strong> {school.address} </strong> </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{t('postal_code')}:</Typography>
              <Typography><strong> {school.postalCode}</strong></Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{t('phone_number')}:</Typography>
              <Typography><strong> {school.phoneNumber}</strong> </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{t('email')}:</Typography>
              <Typography><strong> {school.email}</strong></Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{t('school_code')}:</Typography>
              <Typography><strong> {school.schoolCode}</strong> </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{t('city')}:</Typography>
              <Typography><strong> {school.city}</strong></Typography>
            </Grid>
          </Grid>
        </Paper>

        <Card elevation={3} sx={{ p: 3, mt: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h4"> {t('estaManager')}</Typography>
            {!managerData && canAddSchoolManager && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenAddModal(true)}
                size="small"
              >
               {t('addManager')}
              </Button>
            )}
          </Box>
     {loadingManager ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) :
       managerData ? (
        <>
          <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mr: 2 }}>
              <PersonIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h6">{managerData.name}</Typography>
              <Typography variant="body2" color="textSecondary">{managerData.email}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="flex-end">
            {canUpdateSchoolManager && (
                <Tooltip title={t('modify')} arrow>
                    <IconButton color="primary" onClick={() => setOpenEditModal(true)}>
                      <EditTwoToneIcon />
                    </IconButton>
                </Tooltip>
            )}
            {canDeleteSchoolManager && (
                <Tooltip title={t('delete')} arrow>
                    <IconButton color="error" onClick={() => setOpenDeleteModal(true)}>
                      <DeleteTwoToneIcon />
                    </IconButton>
                </Tooltip>
            )}

            {canReadSchoolManager && (
                <Tooltip title={t('view')} arrow>
                  <IconButton color="info" onClick={() => setOpenViewModal(true)}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
            )}
              </Box>
          </>
          ) : (
            <Typography variant="body2" color="textSecondary">
             {t('warningManager')}
            </Typography>
          )}
        </Card>
        {managerData && (
        <EditManagerModal
          open={openEditModal}
          handleClose={() => setOpenEditModal(false)}
          handleEdit={handleEditManager}
          managerData={managerData}
        />
      )}
        <AddManagerModal
          open={openAddModal}
          handleClose={() => setOpenAddModal(false)}
          handleSave={handleSaveManager}
        />
        
         {managerData && (
          <ViewManagerModal
            open={openViewModal}
            handleClose={() => setOpenViewModal(false)}
            managerData={managerData}
          />
        )}
         <DeleteManagerModal
          open={openDeleteModal}
          handleClose={() => setOpenDeleteModal(false)}
          handleDelete={handleDeleteManager}
        />
      </Box>
      <SnackbarNotification
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
      />
      <Footer/>
    </>
  );
};

export default SchoolDetails;
