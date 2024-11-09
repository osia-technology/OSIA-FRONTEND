import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Menu, 
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BulkActions from './BulkActions';
import { useNavigate } from 'react-router-dom';
import { School } from 'src/models/school';
import { deleteSchool, fetchSchools } from 'src/store/thunks/schoolThunks';
import { selectToken } from 'src/store/selectors/userSelectors';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import { useTranslation } from 'react-i18next';
import DeleteSchoolModal from 'src/components/Modals/Schools/DeleteSchoolModal';

interface SchoolsTableProps {
  schools: School[];
  onFileUpload: (formData: FormData) => void; 
  canUploadSchool: boolean;
  canEditSchool: boolean;
  canDeleteSchool: boolean;
}

const applyPagination = (schools: School[], page: number, limit: number): School[] => {
  return schools.slice(page * limit, page * limit + limit);
};

const SchoolsTable: FC<SchoolsTableProps> = ({ schools, onFileUpload, canUploadSchool,canDeleteSchool,canEditSchool  }) => {
  const { t } = useTranslation();
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const {handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();

  const selectedBulkActions = selectedSchools.length > 0;
  const selectedSomeSchools = selectedSchools.length > 0 && selectedSchools.length < schools.length;
  const selectedAllSchools = selectedSchools.length === schools.length;
  
  const theme = useTheme();
  const navigate = useNavigate();
  const [schoolToDelete, setSchoolToDelete] = useState<string | null>(null);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [selectedActionSchool, setSelectedActionSchool] = useState(null);


  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && canUploadSchool) {
        const formData = new FormData();
        formData.append('school_file', file);
        onFileUpload(formData);
      }
    }
  });

  const handleSelectAllSchools = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedSchools(event.target.checked ? schools.map((school) => school.id) : []);
  };

  const handleSelectOneSchool = (event: ChangeEvent<HTMLInputElement>, schoolId: string): void => {
    if (!selectedSchools.includes(schoolId)) {
      setSelectedSchools((prevSelected) => [...prevSelected, schoolId]);
    } else {
      setSelectedSchools((prevSelected) => prevSelected.filter((id) => id !== schoolId));
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedSchools = applyPagination(schools, page, limit);

  const handleOpenDialog = (school_id: string): void => {
    setSchoolToDelete(school_id);
    setOpenDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    if (schoolToDelete && token) {
      try {
        await dispatch(deleteSchool(schoolToDelete, token));
        setOpenDialog(false);
        setAnchorEl(null);
        setSelectedActionSchool(null);
        handleShowSnackbar(t('schoolDeletedSuccess'), 'success');
        dispatch(fetchSchools(token));
      } catch (error) {
        setAnchorEl(null);
        setSelectedActionSchool(null);
        setOpenDialog(false);
        handleShowSnackbar(t('schoolDeletedError')+error, 'error');
      }
    }
  };

  const handleOpenMenu = (event, schoolId) => {
    setAnchorEl(event.currentTarget);
    setSelectedActionSchool(schoolId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedActionSchool(null);
  };

  const handleViewClick = (school_id: string) => {
    navigate('/management/schools/details/'+school_id);
  };

  const handleEditClick = (school_id: string) => {
    navigate('/management/schools/edit/'+school_id);
  };

  return (
    <>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions selectedSchools={selectedSchools}/>
        </Box>
      )}
  {!selectedBulkActions && schools.length > 0 && <CardHeader title={t('school_list')} />}

      <Divider />
     
      {schools.length === 0 && canUploadSchool ? (
        <Box
          {...getRootProps()}
          sx={{
            p: 5,
            border: '2px dashed grey',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: 400,
            cursor: 'pointer',
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText'
          }}
        >
          <input name='school_file' {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h6" color="inherit">
           {t('drop')}
          </Typography>
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                {canDeleteSchool && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedAllSchools}
                      indeterminate={selectedSomeSchools}
                      onChange={handleSelectAllSchools}
                    />
                  </TableCell>
                  )}
                  <TableCell>{t('name')}</TableCell>
                  <TableCell>{t('address')}</TableCell>
                  <TableCell>{t('postal_code')}</TableCell>
                  <TableCell align="center">{t('phone')}</TableCell>
                  <TableCell align="center">{t('email')}</TableCell>
                  <TableCell align="right">{t('school_code')}</TableCell>
                  <TableCell align="center">{t('city')}</TableCell>
                  <TableCell align="center">{t('category')}</TableCell>
                  <TableCell align="left">{t('actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedSchools.map((school) => {
                  const isSchoolSelected = selectedSchools.includes(school.id);
                  return (
                    <TableRow hover key={school.id} selected={isSchoolSelected}>
                        {canDeleteSchool && (
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isSchoolSelected}
                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                  handleSelectOneSchool(event, school.id)
                                }
                              />
                            </TableCell>
                              )}
                      <TableCell>
                        <Typography variant="body1" fontWeight="bold" color="text.primary" noWrap>
                          {school.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight="bold" color="text.primary" noWrap>
                          {school.address}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight="bold" color="text.primary" noWrap>
                          {school.postalCode}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" fontWeight="bold" color="text.primary" noWrap>
                          {school.phoneNumber}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" fontWeight="bold" color="text.primary" noWrap>
                          {school.email}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{school.schoolCode}</TableCell>
                      <TableCell align="right">{school.city}</TableCell>
                      <TableCell align="center">{school.school_category ? school.school_category.name : '-'}</TableCell>
                      <TableCell align="left">

                          <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleOpenMenu(event, school.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl && selectedActionSchool === school.id)}
                        onClose={handleCloseMenu}
                        PaperProps={{
                          style: {
                            maxHeight: 48 * 4.5,
                            width: '20ch',
                          },
                        }}
                      >
                        <MenuItem onClick={() => handleViewClick(school.id)}>
                            <VisibilityIcon 
                              fontSize="small" 
                              sx={{ color: theme.palette.warning.main }}
                            />
                            <Typography sx={{ ml: 1, color: theme.palette.warning.main }}>{t('view')}</Typography>
                          </MenuItem>

                          {canEditSchool && (
                            <MenuItem onClick={() => handleEditClick(school.id)}>
                              <EditTwoToneIcon 
                                fontSize="small" 
                                sx={{ color: theme.palette.primary.main }}
                              />
                              <Typography sx={{ ml: 1, color: theme.palette.primary.main }}>{t('edit')}</Typography>
                            </MenuItem>
                          )}

                          {canDeleteSchool && (
                            <MenuItem onClick={() => handleOpenDialog(school.id)}>
                              <DeleteTwoToneIcon 
                                fontSize="small" 
                                sx={{ color: theme.palette.error.main }}
                              />
                              <Typography sx={{ ml: 1, color: theme.palette.error.main }}>{t('delete')}</Typography>
                            </MenuItem>
                          )}

                      </Menu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Box p={2}>
            <TablePagination
              component="div"
              count={schools.length}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={limit}
              onRowsPerPageChange={handleLimitChange}
              rowsPerPageOptions={[5, 10, 25, 30]}
            />
          </Box>
        </>
      )}

      <DeleteSchoolModal
        open={openDialog}
        handleClose={handleCloseDialog}
        handleConfirmDelete={handleConfirmDelete}
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
};

SchoolsTable.propTypes = {
  schools: PropTypes.array.isRequired
};

SchoolsTable.defaultProps = {
  schools: []
};

export default SchoolsTable;
