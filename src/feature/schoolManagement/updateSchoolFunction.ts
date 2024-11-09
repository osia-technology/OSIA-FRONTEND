import { AppDispatch } from 'src/app/store';
import { ISchoolFormInput } from 'src/models/school';
import { editSchool } from 'src/store/thunks/schoolThunks';
import createSchoolValidationSchema from 'src/utils/schools/createSchoolValidationSchema';
import * as Yup from 'yup';


export const updateSchoolFunction = async (
  schoolId: string, 
  schoolData: ISchoolFormInput, 
  dispatch: AppDispatch, 
  setLoading: (loading: boolean) => void,
  token: string
) => {
  try {
    setLoading(true);

    const validationSchema = createSchoolValidationSchema;
    await validationSchema.validate(schoolData);

    const result = await dispatch(editSchool(schoolId, schoolData, token));

  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      throw new Error(`Validation Error: ${error.message}`);
    }
    throw new Error(error.message || 'Error updating school');
  } finally {
    setLoading(false);
  }
};
