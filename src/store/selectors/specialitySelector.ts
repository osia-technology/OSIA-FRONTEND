import { RootState } from 'src/app/store';
import { Speciality } from 'src/models/speciality';
import { Subsystem } from 'src/models/subSystem';

export const selectSpecialities = (state: RootState): Speciality[] => state.specialities.specialities;
export const selectSubSystems = (state: RootState): Subsystem[] => {
    return state.specialities.subsystems;
};