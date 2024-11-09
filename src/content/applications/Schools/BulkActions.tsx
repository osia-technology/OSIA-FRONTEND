import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SettingsIcon from '@mui/icons-material/Settings'; 
import { useDispatch, useSelector } from 'react-redux';
import { deleteSchool, fetchSchoolCategories, fetchSchools, configureSchools} from 'src/store/thunks/schoolThunks';
import { selectSchoolCategories } from 'src/store/selectors/schoolsSelectors';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import { selectToken } from 'src/store/selectors/userSelectors';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { useTranslation } from 'react-i18next';


interface BulkActionsProps {
  selectedSchools: string[];
}

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
`
);

const BulkActions: React.FC<BulkActionsProps> = ({ selectedSchools }) => {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [openConfigDialog, setOpenConfigDialog] = useState<boolean>(false);

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const {handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();
  const schoolCategories = useSelector(selectSchoolCategories);

  useEffect(() => {
    if (!Array.isArray(schoolCategories) || schoolCategories.length === 0) {
      const fetchCategories = async () => {
        try {
          await dispatch(fetchSchoolCategories(token));
          handleShowSnackbar(t('categoriesLoadedSuccess'), 'success');
        } catch (error) {
          handleShowSnackbar(t('errorLoadingCategories'), 'error');
        }
      };

      fetchCategories();
    }
  }, [dispatch, token, handleShowSnackbar, schoolCategories]);

  const handleOpenDialog = (): void => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    setOpenDialog(false);
    try {
      for (const schoolId of selectedSchools) {
        console.log(selectedSchools)
        await dispatch(deleteSchool(schoolId, token));
      }
      handleShowSnackbar(t('schoolsDeletedSuccess'), 'success');
      dispatch(fetchSchools(token));
    } catch (error) {
      handleShowSnackbar(t('errorDeletingSchools'), 'error');
    }
  };

  const handleConfigureSchools = async (): Promise<void> => {
    if (selectedCategory && selectedSchools.length > 0) {
      setOpenConfigDialog(false);
      try {
        await dispatch(configureSchools(selectedSchools, selectedCategory, token));
        handleShowSnackbar(t('schoolsConfiguredSuccess'), 'success');
        dispatch(fetchSchools(token));
      } catch (error) {
        handleShowSnackbar(t('errorConfiguringSchools'), 'error');
      }
    }
  };

  const handleOpenConfigDialog = (): void => {
    setOpenConfigDialog(true);
  };

  const handleCloseConfigDialog = (): void => {
    setOpenConfigDialog(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
          </Typography>
          <ButtonError
            sx={{ ml: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
            onClick={handleOpenDialog}
          >
           {t('delete')}
          </ButtonError>
          <FormControl sx={{ ml: 3, minWidth: 200 }}>
                <InputLabel id="select-category-label">{t('category')}</InputLabel>
                <Select
                  labelId="select-category-label"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {Array.isArray(schoolCategories) && schoolCategories.length > 0 ? (
                    schoolCategories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>{t('noCategoryAvailable')}</MenuItem>
                  )}
                </Select>
          </FormControl>
              <Button
                sx={{ ml: 3 }}
                variant="contained"
                color="primary"
                onClick={handleOpenConfigDialog}
                startIcon={<SettingsIcon />}
                disabled={selectedSchools.length === 0 || !selectedCategory}
              >
                {t('configure')}
              </Button>
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {t('confirmDeletion')}
        </DialogTitle>
        <DialogContent>
          <Typography>
          {t('confirmDeleteSelectedSchools')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
          {t('cancel')}
          </Button>
          <ButtonError onClick={handleConfirmDelete} color="error">
          {t('delete')}
          </ButtonError>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfigDialog}
        onClose={handleCloseConfigDialog}
        aria-labelledby="config-dialog-title"
        aria-describedby="config-dialog-description"
      >
        <DialogTitle id="config-dialog-title">
        {t('confirmConfiguration')}
        </DialogTitle>
        <DialogContent>
          <Typography>
          {t('confirmConfigureSelectedSchools')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfigDialog} color="primary">
          {t('cancel')}
          </Button>
          <Button  endIcon={<SettingsIcon />} variant='contained' onClick={handleConfigureSchools} color="primary">
          {t('configure')}
          </Button>
        </DialogActions>
      </Dialog>


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

export default BulkActions;
