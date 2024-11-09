import { AppDispatch } from 'src/app/store';
import { setVerdicts } from 'src/store/slices/verdictSlice';
import { apiGetStudentVerdict,  apiGeneratedVerdict } from 'src/services/verdictServices/verdictsServices';


export const fetchStudentVerdict = (studentId: string, token: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await apiGetStudentVerdict(studentId, token);

      const verdicts = response.metadata;
      dispatch(setVerdicts(verdicts));
  
      return verdicts;
    } catch (error) {
      throw new Error(error.message || 'Error fetching Students');
    }
};

export const generateVerdict = (classId: string, token: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await apiGeneratedVerdict(classId, token);

    } catch (error) {
      throw new Error(error.message || 'Failed to add student verdict');
    }
  };

