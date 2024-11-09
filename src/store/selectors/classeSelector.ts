import { RootState } from 'src/app/store';
import { Class } from 'src/models/class';
import { ClassLevel } from 'src/models/classLevel';

export const selectAllClasses = (state: RootState): Class[] => {
  return state.classes.classes;
};
export const selectClassById = (state: RootState, classId: string): Class | undefined => {
  return state.classes.classes.find((classItem: { id: string; }) => classItem.id === classId);
};
export const selectClassLevels = (state: RootState): ClassLevel[] => {
  return state.classes.classLevels;
};