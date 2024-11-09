import { RootState } from 'src/app/store';
import { School } from 'src/models/school';
import { SchoolCategory } from 'src/models/schoolCategory';

export const selectSchools = (state: RootState): School[] => state.schools.schools;
export const selectSchoolById = (state: RootState, schoolId: string): School | undefined => {
    return state.schools.schools.find((school: { id: string; }) => school.id === schoolId);
};
export const selectSchoolCategories = (state: RootState): SchoolCategory[] => {
    return state.schools.schoolCategories;
};