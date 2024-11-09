import { AppDispatch } from 'src/app/store';
import { addClass, updateClass, removeClass, setClasses, setClassLevel } from 'src/store/slices/classeSlice';
import { apiAddClass, apiGetClasses, apiUpdateClass, apiDeleteClass, apiUploadClasses, apiGetClassLevels, apiConfigureClasses } from 'src/services/classServices/classServices';
import { IClassFormInput } from 'src/models/class';
import { mapApiClassToModel } from 'src/feature/classManagement/fetchClassFunction';

export const createClass = (classData: IClassFormInput, token: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await apiAddClass(classData, token);
    dispatch(addClass(response));
  } catch (error) {
    throw new Error(error.message || 'Failed to add class');
  }
};

export const fetchClasses = (token: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await apiGetClasses(token);
    const classes = response.metadata;

    const mappedClasses = classes.map((school: any) => mapApiClassToModel(school));

    dispatch(setClasses(mappedClasses));

    return mappedClasses;
  } catch (error) {
    throw new Error(error.message || 'Error fetching classes');
  }
};

export const editClass = (classId: string, classData: IClassFormInput, token: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await apiUpdateClass(classId, classData, token);
    dispatch(updateClass(response));
  } catch (error) {
    throw new Error(error.message || 'Failed to update class');
  }
};

export const deleteClass = (classId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    await apiDeleteClass(classId, token);
    dispatch(removeClass(classId));
  } catch (error) {
    throw new Error(error.message || 'Failed to delete class');
  }
};

export const uploadMultipleClasses = (formData: FormData, token: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await apiUploadClasses(formData, token);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to upload classes');
  }
};

 export const fetchClassLevels = (token: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await apiGetClassLevels(token);
    dispatch(setClassLevel(response.metadata));
    return response.metadata;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch class levels');
  }
 }

 export const configureClasses = (classIds: string[], specialityId: string, levelId: string, token: string) => async (dispatch: AppDispatch) => {
  
  try {
    const configuration = await apiConfigureClasses(classIds, specialityId, levelId, token);

    return configuration.data;
  } catch (error) {
    throw new Error(error.message || 'Échec de la récupération des classes');
  }
};