import { RootState } from 'src/app/store';
import { Subject } from 'src/models/subject';

export const selectAllSubjects = (state: RootState): Subject[] => {
  return state.subjects.subjects;
};