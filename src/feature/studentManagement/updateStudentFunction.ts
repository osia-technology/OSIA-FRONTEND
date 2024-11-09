import { AppDispatch } from 'src/app/store';
import { IStudentFormInput } from 'src/models/student';
import { editStudent } from 'src/store/thunks/studentThunks';
import * as Yup from 'yup';
import createStudentValidationSchema from 'src/utils/students/createStudentValidationSchema';


export const updateStudentFunction = async (
  studentId: string,
  studentData: IStudentFormInput,
  dispatch: AppDispatch,
  setLoading: (loading: boolean) => void,
  token: string
) => {
  try {
    setLoading(true);

    const validationSchema = createStudentValidationSchema;
    await validationSchema.validate(studentData);

    const result = await dispatch(editStudent(studentId, studentData, token));

  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      throw new Error(`Validation Error: ${error.message}`);
    }
    throw new Error(error.message || 'Error updating student');
  } finally {
    setLoading(false);
  }
};
