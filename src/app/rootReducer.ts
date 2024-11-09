import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../store/slices/userSlice';
import schoolReducer from '../store/slices/schoolSlice';
import languageReducer from 'src/store/slices/languageSlice';
import classReducer  from 'src/store/slices/classeSlice';
import specialityReducer from 'src/store/slices/specialitySlice';
import studentReducer from 'src/store/slices/studentSlice';
import subjectReducer from 'src/store/slices/subjectSlice';
import verdictReducer from 'src/store/slices/verdictSlice';

const rootReducer = combineReducers({
  user: userReducer,
  schools: schoolReducer,
  classes: classReducer,
  specialities: specialityReducer,
  students: studentReducer,
  subjects: subjectReducer,
  verdicts: verdictReducer,
  language: languageReducer, 
});

export default rootReducer;