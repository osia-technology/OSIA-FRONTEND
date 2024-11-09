import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Class } from 'src/models/class';
import { ClassLevel } from 'src/models/classLevel';

interface ClassState {
  classes: Class[];
  classLevels: ClassLevel[];
}

const initialState: ClassState = {
  classes: [],
  classLevels: [],
};

const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {

    addClass(state, action: PayloadAction<Class>) {
      state.classes.push(action.payload);
    },
    setClasses: (state, action: PayloadAction<Class[]>) => {
      state.classes = action.payload;
    },
    clearClasses: (state) => {
      state.classes = [];
    },
    updateClass(state, action: PayloadAction<Class>) {
      const index = state.classes.findIndex(classItem => classItem.id === action.payload.id);
      if (index !== -1) {
        state.classes[index] = action.payload;
      }
    },
    removeClass(state, action: PayloadAction<string>) {
      state.classes = state.classes.filter(classItem => classItem.id !== action.payload);
    },
    setClassLevel(state, action: PayloadAction<ClassLevel[]>) {
      state.classLevels = action.payload;
    },

  }
});

export const { addClass, updateClass, removeClass, setClasses, clearClasses, setClassLevel  } = classSlice.actions;
export default classSlice.reducer;
