import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { School } from '../../models/school';
import { SchoolCategory } from '../../models/schoolCategory';

interface SchoolState {
  schools: School[];
  schoolCategories: SchoolCategory[];
}

const initialState: SchoolState = {
  schools: [],
  schoolCategories: [],
};

const schoolSlice = createSlice({
  name: 'schools',
  initialState,
  reducers: {

    addSchool(state, action: PayloadAction<School>) {
      state.schools.push(action.payload);
    },
    setSchools: (state, action: PayloadAction<School[]>) => {
      state.schools = action.payload;
    },
    clearSchools: (state) => {
      state.schools = [];
    },
    updateSchool(state, action: PayloadAction<School>) {
      const index = state.schools.findIndex(school => school.id === action.payload.id);
      if (index !== -1) {
        state.schools[index] = action.payload;
      }
    },
    removeSchool(state, action: PayloadAction<string>) {
      state.schools = state.schools.filter(school => school.id !== action.payload);
    },
    setSchoolCategories(state, action: PayloadAction<SchoolCategory[]>) {
      state.schoolCategories = action.payload;
    },

  }
});

export const { addSchool, updateSchool, removeSchool, setSchools, clearSchools, setSchoolCategories } = schoolSlice.actions;
export default schoolSlice.reducer;
