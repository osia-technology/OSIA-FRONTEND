import React, { useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, TablePagination, IconButton, Menu, MenuItem,
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Student } from 'src/models/student';
import DeleteStudentModal from 'src/components/Modals/Students/DeleteStudentModal';

interface StudentTableProps {
  students: Student[];
  page: number;
  rowsPerPage: number;
  handlePageChange: (event: unknown, newPage: number) => void;
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteStudent: (studentId: string) => void;
  handleEditStudent: (studentId: string) => void;
  handleViewStudent: (studentId: string) => void;
  count: number;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students, page, rowsPerPage, handlePageChange, handleRowsPerPageChange, handleDeleteStudent, handleEditStudent, handleViewStudent, count,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, student: Student) => {
    setAnchorEl(event.currentTarget);
    setSelectedStudent(student);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openDeleteModalFunction = () => {
    handleMenuClose();
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedStudent) {
      handleDeleteStudent(selectedStudent.id);
      setOpenDeleteModal(false);
    }
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Matricule</TableCell>
            <TableCell>Date de naissance</TableCell>
            <TableCell>Ville de naissance</TableCell>
            <TableCell>Sexe</TableCell>
            <TableCell>Tuteur</TableCell>
            <TableCell>Téléphone</TableCell>
            <TableCell>Adresse</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.matricule}</TableCell>
              <TableCell>{student.date_of_birth}</TableCell>
              <TableCell>{student.city_of_birth}</TableCell>
              <TableCell>{student.sexe === 'm' ? 'Masculin' : 'Féminin'}</TableCell>
              <TableCell>{student.tutor_name}</TableCell>
              <TableCell>{student.phone || 'Non renseigné'}</TableCell>
              <TableCell>{student.address || 'Non renseignée'}</TableCell>
              <TableCell align="center">
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(event) => handleMenuClick(event, student)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl && selectedStudent?.id === student.id)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => { handleMenuClose(); handleViewStudent(student.id); }}>
                    <VisibilityIcon sx={{ mr: 1 }} color='warning' /> Voir
                  </MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); handleEditStudent(student.id); }}>
                    <EditTwoToneIcon sx={{ mr: 1 }} color='primary' /> Editer
                  </MenuItem>
                  <MenuItem onClick={openDeleteModalFunction}>
                    <DeleteTwoToneIcon sx={{ mr: 1 }} color="error" /> Supprimer
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />

      <DeleteStudentModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleConfirm={handleConfirmDelete}
        studentName={selectedStudent?.name || ''}
      />
    </>
  );
};

export default StudentTable;
