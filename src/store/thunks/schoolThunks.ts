import { AppDispatch } from 'src/app/store';
import { addSchool, updateSchool, removeSchool, setSchools, setSchoolCategories} from '../slices/schoolSlice';
import { apiAddSchool, apiGetSchools, apiUpdateSchool, apiDeleteSchool, apiUploadSchools,apiFetchSchoolCategories, apiConfigureSchools } from 'src/services/schoolsServices/schoolServices';
import { ISchoolFormInput  } from 'src/models/school';
import { mapApiSchoolToModel } from 'src/feature/schoolManagement/fetchSchoolFunction';


export const createSchool = (schoolData: ISchoolFormInput, token: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await apiAddSchool(schoolData, token);
    dispatch(addSchool(response));
  } catch (error) {
    throw new Error(error.message || 'Failed to add school');
  }
};


export const fetchSchools = ( token: string) => async (dispatch: AppDispatch) => {
  
  try {
    const response = await apiGetSchools(token);
    const schools = response.metadata.schools.data;

    const mappedSchools = schools.map((school: any) => mapApiSchoolToModel(school));

    dispatch(setSchools(mappedSchools));

    return mappedSchools; 
  } catch (error) {
    throw new Error(error.message || 'Error fetching schools', error);
  }
};


export const editSchool = (schoolId: string, schoolData: ISchoolFormInput, token: string) => async (dispatch: AppDispatch) => {
  
  try {
    const response = await apiUpdateSchool(schoolId, schoolData, token);
    dispatch(updateSchool(response));
  } catch (error) {
    throw new Error(error.message || 'Failed to update school');
  }
};

export const deleteSchool = (schoolId: string, token: string) => async (dispatch: AppDispatch) => {
  
  try {
    await apiDeleteSchool(schoolId, token);
    dispatch(removeSchool(schoolId));
  } catch (error) {
    throw new Error(error.message || 'Failed to delete school', error);
  }
};


export const uploadMultipleSchools = (formData: FormData, token: string) => async (dispatch: AppDispatch) => {
  
  try {
    const response = await apiUploadSchools(formData, token);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to delete school');
  }
};


export const fetchSchoolCategories = (token: string) => async (dispatch: AppDispatch) => {
  
  try {
    const categories = await apiFetchSchoolCategories(token);
    dispatch(setSchoolCategories(categories.metadata));
    return categories.metadata;
  } catch (error) {
    throw new Error(error.message || 'Échec de la récupération des catégories d\'écoles');
  }
};

export const configureSchools = (schoolIds: string[], categoryId: string, token: string) => async (dispatch: AppDispatch) => {
  
  try {
    const configuration = await apiConfigureSchools(schoolIds, categoryId, token);

    return configuration.data;
  } catch (error) {
    throw new Error(error.message || 'Échec de la configurations des écoles ');
  }
};