import { AppDispatch } from 'src/app/store';
import { addSpeciality, removeSpeciality, setSpecialities, setSubSystem } from 'src/store/slices/specialitySlice';
import { apiAddSpeciality, apiDeleteSpeciality, apiGetSpecialities, apiGetSubSystems } from 'src/services/specialitiesServices/specialitySevices';
import { ISpecialityFormInput } from 'src/models/speciality';

export const createSpeciality = (specialityData: ISpecialityFormInput, token: string, subSystemId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await apiAddSpeciality(specialityData, token, subSystemId);
    dispatch(addSpeciality(response));
  } catch (error) {
    throw new Error(error.message || 'Failed to add Speciality');
  }
};

export const fetchSpecialities = (token: string, subSystemId: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await apiGetSpecialities(token, subSystemId);
      const specialities = response.metadata;
  
      dispatch(setSpecialities(specialities));
  
      return specialities;
    } catch (error) {
      throw new Error(error.message || 'Error fetching Specialities');
    }
};

export const deleteSpeciality = (specialityId: string, token: string) => async (dispatch: AppDispatch) => {
    try {
      await apiDeleteSpeciality(specialityId, token);
      dispatch(removeSpeciality(specialityId));
    } catch (error) {
      throw new Error(error.message || 'Failed to delete Speciality');
    }
  };

  export const fetchSubSystems = (token: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await apiGetSubSystems(token);
      dispatch(setSubSystem(response.metadata));
      return response.metadata;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch class levels');
    }
   }