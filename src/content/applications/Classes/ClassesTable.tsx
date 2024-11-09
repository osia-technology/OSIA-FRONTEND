import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
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
  CardHeader,
  Divider,
  LinearProgress,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import { Class } from 'src/models/class';
import { deleteClass, fetchClasses } from 'src/store/thunks/classThunks';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from 'src/store/selectors/userSelectors';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import DeleteClassModal from 'src/components/Modals/Classes/DeleteClassModal';
import { useDropzone } from 'react-dropzone';
import BulkActions from './BulkActions'; 

interface ClassesTableProps {
  classes: Class[];
  onFileUpload: (formData: FormData) => void;
  loading: boolean; 
  uploadProgress: number;
}

const applyPagination = (classes: Class[], page: number, limit: number): Class[] => {
  return classes.slice(page * limit, page * limit + limit);
};

const ClassesTable: FC<ClassesTableProps> = ({ classes, onFileUpload, loading, uploadProgress }) => {
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();
  const theme = useTheme();
  const navigate = useNavigate();
  const [classToDelete, setClassToDelete] = useState<string | null>(null);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [selectedActionClass, setSelectedActionClass] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const formData = new FormData();
        formData.append('class_file', file);
        onFileUpload(formData);
      }
    },
  });

  const handleSelectAllClasses = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedClasses(event.target.checked ? classes.map((classItem) => classItem.id) : []);
  };

  const handleSelectOneClass = (event: ChangeEvent<HTMLInputElement>, classId: string): void => {
    if (!selectedClasses.includes(classId)) {
      setSelectedClasses((prevSelected) => [...prevSelected, classId]);
    } else {
      setSelectedClasses((prevSelected) => prevSelected.filter((id) => id !== classId));
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedClasses = applyPagination(classes, page, limit);

  const handleOpenDialog = (classId: string): void => {
    setClassToDelete(classId);
    setOpenDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    if (classToDelete && token) {
      try {
        await dispatch(deleteClass(classToDelete, token));
        setOpenDialog(false);
        setAnchorEl(null);
        setSelectedActionClass(null);
        handleShowSnackbar('Classe supprimée avec succès', 'success');
        dispatch(fetchClasses(token));
      } catch (error) {
        setAnchorEl(null);
        setSelectedActionClass(null);
        setOpenDialog(false);
        handleShowSnackbar('Erreur lors de la suppression de la classe : ' + error, 'error');
      }
    }
  };

  const handleOpenMenu = (event, classId) => {
    setAnchorEl(event.currentTarget);
    setSelectedActionClass(classId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedActionClass(null);
  };

  const handleViewClick = (classId: string) => {
    navigate('/management/classes/details/' + classId);
  };

  const handleEditClick = (classId: string) => {
    navigate('/management/classes/edit/' + classId);
  };

  return (
    <>
      <CardHeader title="Liste des Classes" />
      <Divider />
      
      {loading ? (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Téléchargement : {uploadProgress}%
          </Typography>
        </Box>
      ) : classes.length === 0 ? (
        <>
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
              color: 'secondary.contrastText',
            }}
          >
            <input name="class_file" {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" color="inherit">
              Déposez vos fichiers ici pour les importer
            </Typography>
          </Box>
        </>
      ) : ( 
        <>
            {selectedClasses.length > 0 && (
              <>
                  <Box sx={{ mb: 2, mt: 2}}>
                      <BulkActions selectedClasses={selectedClasses} />
                  </Box>
                  <Divider />
              </>
            )}

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedClasses.length === classes.length}
                      indeterminate={selectedClasses.length > 0 && selectedClasses.length < classes.length}
                      onChange={handleSelectAllClasses}
                    />
                  </TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Capacité</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedClasses.map((classItem) => {
                  const isClassSelected = selectedClasses.includes(classItem.id);
                  return (
                    <TableRow hover key={classItem.id} selected={isClassSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isClassSelected}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleSelectOneClass(event, classItem.id)
                          }
                        />
                      </TableCell>
                      <TableCell>{classItem.name}</TableCell>
                      <TableCell>{classItem.description}</TableCell>
                      <TableCell align="center">{classItem.capacity}</TableCell>
                      <TableCell align="left">
                        <IconButton
                          aria-label="more"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={(event) => handleOpenMenu(event, classItem.id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl && selectedActionClass === classItem.id)}
                          onClose={handleCloseMenu}
                          PaperProps={{
                            style: {
                              maxHeight: 48 * 4.5,
                              width: '20ch',
                            },
                          }}
                        >
                          <MenuItem onClick={() => handleViewClick(classItem.id)}>
                            <VisibilityIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />
                            <Typography sx={{ ml: 1, color: theme.palette.warning.main }}>Voir</Typography>
                          </MenuItem>

                          <MenuItem onClick={() => handleEditClick(classItem.id)}>
                            <EditTwoToneIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
                            <Typography sx={{ ml: 1, color: theme.palette.primary.main }}>Editer</Typography>
                          </MenuItem>

                          <MenuItem onClick={() => handleOpenDialog(classItem.id)}>
                            <DeleteTwoToneIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
                            <Typography sx={{ ml: 1, color: theme.palette.error.main }}>Supprimer</Typography>
                          </MenuItem>
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
              count={classes.length}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={limit}
              onRowsPerPageChange={handleLimitChange}
              rowsPerPageOptions={[5, 10, 25, 30]}
            />
          </Box>
        </>
      )}

      <DeleteClassModal
        open={openDialog}
        handleClose={handleCloseDialog}
        handleConfirmDelete={handleConfirmDelete}
      />

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

ClassesTable.propTypes = {
  classes: PropTypes.array.isRequired,
  onFileUpload: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired, 
  uploadProgress: PropTypes.number.isRequired,
};

ClassesTable.defaultProps = {
  classes: [],
};

export default ClassesTable;
