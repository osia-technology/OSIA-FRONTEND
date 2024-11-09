import { AppDispatch } from 'src/app/store';
import { IClassFormInput } from 'src/models/class';
import { editClass } from 'src/store/thunks/classThunks';
import createClassValidationSchema from 'src/utils/classes/createClassValidationSchema';
import * as Yup from 'yup';

export const updateClassFunction = async (
  classId: string, 
  classData: IClassFormInput, 
  dispatch: AppDispatch, 
  setLoading: (loading: boolean) => void,
  token: string
) => {
  try {
    setLoading(true);

    const validationSchema = createClassValidationSchema;
    await validationSchema.validate(classData);

    const result = await dispatch(editClass(classId, classData, token));

  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      throw new Error(`Validation Error: ${error.message}`);
    }
    throw new Error(error.message || 'Error updating class');
  } finally {
    setLoading(false);
  }
};
