import React, { useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, Checkbox, TablePagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Subject } from 'src/models/subject';
import DeleteSubjectModal from 'src/components/Modals/Subjects/DeleteSubjectModal';
import BulkAction from './BulkActions'; 

interface SubjectTableProps {
  subjects: Subject[];
  onDelete: (subjectId: string) => Promise<void>;
  onDeleteMultiple: (subjectIds: string[]) => Promise<void>;
}

const SubjectTable: React.FC<SubjectTableProps> = ({ subjects, onDelete, onDeleteMultiple }) => {
  const [open, setOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSubjectId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedSubjectId) {
      setLoading(true);
      try {
        await onDelete(selectedSubjectId);
        handleClose();
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
      } finally {
        setLoading(false);
      }
    }
  };


  const handleSelect = (subjectId: string) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter((id) => id !== subjectId));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };


  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allSubjectIds = subjects.map((subject) => subject.id);
      setSelectedSubjects(allSubjectIds);
    } else {
      setSelectedSubjects([]);
    }
  };


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>

      {selectedSubjects.length > 0 && (
        <BulkAction
          selectedSubjects={selectedSubjects}
          onDeleteMultiple={onDeleteMultiple}
          setSelectedSubjects={setSelectedSubjects}
        />
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selectedSubjects.length > 0 && selectedSubjects.length < subjects.length}
                checked={subjects.length > 0 && selectedSubjects.length === subjects.length}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell>Titre</TableCell>
            <TableCell>Code</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((subject) => (
            <TableRow key={subject.id}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedSubjects.includes(subject.id)}
                  onChange={() => handleSelect(subject.id)}
                />
              </TableCell>
              <TableCell>{subject.title}</TableCell>
              <TableCell>{subject.code}</TableCell>
              <TableCell align="center">
                <Tooltip title="Supprimer">
                  <IconButton color="error" onClick={() => handleOpen(subject.id)} disabled={loading}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={subjects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <DeleteSubjectModal
        open={open}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
        loading={loading}
      />
    </>
  );
};

export default SubjectTable;
