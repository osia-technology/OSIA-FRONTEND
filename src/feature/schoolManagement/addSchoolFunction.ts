import { Dispatch } from 'redux';
import { createSchool } from 'src/store/thunks/schoolThunks';
import { NavigateFunction } from 'react-router-dom';
import createSchoolValidationSchema from 'src/utils/schools/createSchoolValidationSchema';
import * as Yup from 'yup';
import { ISchoolFormInput } from 'src/models/school';

export const addSchoolFunction = async (
  data: ISchoolFormInput,
  dispatch: Dispatch<any>,
  navigate: NavigateFunction,
  handleShowSnackbar: (message: string, severity: 'success' | 'error') => void,
  setLoading: (loading: boolean) => void,
  isMounted: boolean,
  token: string
) => {
  try {
    setLoading(true);
    const validationSchema = createSchoolValidationSchema;
    await validationSchema.validate(data);
    const result = await dispatch(createSchool(data, token));

    if (isMounted && result) {
      handleShowSnackbar('School successfully added!', 'success');
      navigate('/management/schools');
    }
  } catch (error) {
    if (isMounted) {
      if (error instanceof Yup.ValidationError) {
        throw new Error(`Validation Error: ${error.message}`);
      } else {
        throw new Error('An error occurred while adding the school.');
      }
    }
  } finally {
    if (isMounted) {
      setLoading(false);
    }
  }
};
