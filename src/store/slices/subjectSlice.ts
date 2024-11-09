import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subject } from 'src/models/subject';

interface SubjectState {
    subjects: Subject[];
  }
  
  const initialState: SubjectState = {
    subjects: [],
  };
  
  const SubjectSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
  
    //   addSubject(state, action: PayloadAction<Subject>) {
    //     state.subjects.push(action.payload);
    //   },
      setSubjects: (state, action: PayloadAction<Subject[]>) => {
        state.subjects = action.payload;
      },
      clearSubjects: (state) => {
        state.subjects = [];
      },
    //   updateSubject(state, action: PayloadAction<Subject>) {
    //     const index = state.subjects.findIndex(subjectItem => subjectItem.id === action.payload.id);
    //     if (index !== -1) {
    //       state.subjects[index] = action.payload;
    //     }
    //   },
      removeSubject(state, action: PayloadAction<string>) {
        state.subjects = state.subjects.filter(SubjectItem => SubjectItem.id !== action.payload);
      },
  
    }
  });
  
  export const { removeSubject, setSubjects, clearSubjects } = SubjectSlice.actions;
  export default SubjectSlice.reducer;