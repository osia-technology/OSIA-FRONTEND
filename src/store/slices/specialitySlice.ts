import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Speciality } from '../../models/speciality';
import { Subsystem } from 'src/models/subSystem';

interface SpecialityState{
    specialities: Speciality[];
    subsystems: Subsystem[];
}

const initialState: SpecialityState = {
    specialities : [],
    subsystems: [],
}

const specialitySlice = createSlice({
    name: 'specialities',
    initialState,
    reducers : {
        setSpecialities: (state, action: PayloadAction<Speciality[]>) => {
            state.specialities = action.payload;
        },
        clearSpecialities: (state) => {
            state.specialities = [];
        },
        addSpeciality(state, action: PayloadAction<Speciality>) {
            state.specialities.push(action.payload);
        },
        removeSpeciality(state, action: PayloadAction<string>) {
            state.specialities = state.specialities.filter(speciality => speciality.id !== action.payload);
        },
        setSubSystem(state, action: PayloadAction<Subsystem[]>) {
            state.subsystems = action.payload;
          },
    }

});
export const { addSpeciality, removeSpeciality, setSpecialities, clearSpecialities, setSubSystem } = specialitySlice.actions;
export default specialitySlice.reducer;
