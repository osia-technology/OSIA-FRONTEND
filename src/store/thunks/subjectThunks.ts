import { AppDispatch } from 'src/app/store';
import { setSubjects, removeSubject } from 'src/store/slices/subjectSlice';
import { apiConfigureSubjects, apiDeleteSubject, apiGetSubjects, apiUploadSubjects } from 'src/services/subjectsServices/subjectServices';
import { mapApiSubjectToModel } from 'src/feature/subjectManagement/fetchSubjectFunction';

export const fetchSubjects = (classLevelId: string, token: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await apiGetSubjects(classLevelId, token);

      const Subjects = response.metadata;
  
      const mappedSubjects = Subjects.map((Subjects: any) => mapApiSubjectToModel(Subjects));
      dispatch(setSubjects(mappedSubjects));
  
      return mappedSubjects;
    } catch (error) {
      throw new Error(error.message || 'Error fetching Subjects');
    }
};

export const deleteSubject = (subjectId: string, token: string) => async (dispatch: AppDispatch) => {
    try {
      await apiDeleteSubject(subjectId, token);
      dispatch(removeSubject(subjectId));
    } catch (error) {
      throw new Error(error.message || 'Failed to delete Subject');
    }
};

export const uploadMultipleSubjects = (classLevelId: string, formData: FormData, token: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await apiUploadSubjects(classLevelId, formData, token);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to upload subjects');
    }
  };
  export const configureSubjects = (classIds: string[], specialityId: string, coefficient: string, max_score: string, token: string) => async (dispatch: AppDispatch) => {
  
    try {
      const configuration = await apiConfigureSubjects(classIds, specialityId, coefficient, max_score, token);
  
      return configuration.data;
    } catch (error) {
      throw new Error(error.message || 'Échec de la récupération des Subjects');
    }
  };