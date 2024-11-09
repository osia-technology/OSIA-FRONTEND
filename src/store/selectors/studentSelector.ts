import { RootState } from 'src/app/store';
import { Student } from 'src/models/student';
import { StudentMark } from 'src/models/studentMark';


export const selectAllStudents = (state: RootState): Student[] => {
  return state.students.students;
};
export const selectStudentById = (state: RootState, studentId: string): Student| undefined => {
  return state.students.students.find((studentItem: { id: string; }) => studentItem.id === studentId);
};
export const selectStudentMarks = (state: RootState): StudentMark[] => {
  return state.students.studentMarks;
};