import { Dispatch } from 'redux';
import { createClass } from 'src/store/thunks/classThunks'; 
import { NavigateFunction } from 'react-router-dom';
import createClassValidationSchema from 'src/utils/classes/createClassValidationSchema';
import * as Yup from 'yup';
import { IClassFormInput } from 'src/models/class';

export const addClassFunction = async (
  data: IClassFormInput,
  dispatch: Dispatch<any>,
  navigate: NavigateFunction,
  handleShowSnackbar: (message: string, severity: 'success' | 'error') => void,
  setLoading: (loading: boolean) => void,
  isMounted: boolean,
  token: string
) => {
  try {
    setLoading(true);
    const validationSchema = createClassValidationSchema;
    await validationSchema.validate(data);

    const result = await dispatch(createClass(data, token));

    if (isMounted && result) {
      handleShowSnackbar('Class successfully added!', 'success');
      navigate('/management/classes');
    }
  } catch (error) {
    if (isMounted) {
      if (error instanceof Yup.ValidationError) {
        throw new Error(`Validation Error: ${error.message}`);
      } else {
        throw new Error('An error occurred while adding the class.');
      }
    }
  } finally {
    if (isMounted) {
      setLoading(false);
    }
  }
};
