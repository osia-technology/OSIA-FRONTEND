import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from 'src/models/student';
import { StudentMark } from 'src/models/studentMark';

interface StudentState {
  students: Student[];
  studentMarks: StudentMark[];
}

const initialState: StudentState = {
  students: [],
  studentMarks: [],
};

const StudentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent(state, action: PayloadAction<Student>) {
      state.students.push(action.payload);
    },
    setStudents: (state, action: PayloadAction<Student[]>) => {
      state.students = action.payload;
    },
    clearStudents: (state) => {
      state.students = [];
    },
    updateStudent(state, action: PayloadAction<Student>) {
      const index = state.students.findIndex(StudentItem => StudentItem.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    removeStudent(state, action: PayloadAction<string>) {
      state.students = state.students.filter(StudentItem => StudentItem.id !== action.payload);
    },

    setStudentMarks: (state, action: PayloadAction<StudentMark[]>) => {
      state.studentMarks = action.payload;
    },
    clearStudentMarks: (state) => {
      state.studentMarks = [];
    },
  }
});

export const { addStudent, updateStudent, removeStudent, setStudents, clearStudents, setStudentMarks, clearStudentMarks } = StudentSlice.actions;
export default StudentSlice.reducer;
