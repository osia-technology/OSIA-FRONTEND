import { AppDispatch } from 'src/app/store';
import { addStudent, updateStudent, removeStudent, setStudents, setStudentMarks } from 'src/store/slices/studentSlice';
import { apiAddStudent, apiDeleteStudent, apiGetStudentMarks, apiGetStudents, apiUpdateStudent, apiUploadStudents, apiUploadStudentsMarks} from 'src/services/studentsServices/studentServices';
import { IStudentFormInput } from 'src/models/student';
import { mapApiStudentToModel } from 'src/feature/studentManagement/fetchStudentFunction';
import { mapApiStudentMarksToModel } from 'src/feature/studentManagement/fetchStudentMarksFunction';

export const createStudent = (studentData: IStudentFormInput, classId: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await apiAddStudent(studentData, classId, token);
    dispatch(addStudent(response));
  } catch (error) {
    throw new Error(error.message || 'Failed to add student');
  }
};

export const fetchStudents = (classId: string, token: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await apiGetStudents(classId, token);

      const students = response.metadata;
  
      const mappedStudents = students.map((students: any) => mapApiStudentToModel(students));
      dispatch(setStudents(mappedStudents));
  
      return mappedStudents;
    } catch (error) {
      throw new Error(error.message || 'Error fetching Students');
    }
};

export const editStudent = (StudentId: string, StudentData: IStudentFormInput, token: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await apiUpdateStudent(StudentId, StudentData, token);
      dispatch(updateStudent(response));
    } catch (error) {
      throw new Error(error.message || 'Failed to update Student');
    }
};

export const deleteStudent = (classId: string, token: string) => async (dispatch: AppDispatch) => {
    try {
      await apiDeleteStudent(classId, token);
      dispatch(removeStudent(classId));
    } catch (error) {
      throw new Error(error.message || 'Failed to delete student');
    }
};

export const uploadMultipleStudents = (classId: string, formData: FormData, token: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await apiUploadStudents(classId, formData, token);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to upload students');
    }
  };

  export const uploadMultipleStudentsMarks = (subject_configuration_id: string, formData: FormData, token: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await apiUploadStudentsMarks(subject_configuration_id, formData, token);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to upload students');
    }
  };

  export const fetchStudentMarks = (studentId: string, token: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await apiGetStudentMarks(studentId, token);
      const studentMarks = response.metadata.subjects;
      const mappedStudentMarks = studentMarks.map((studentMarks: any) => mapApiStudentMarksToModel(studentMarks));
      dispatch(setStudentMarks(mappedStudentMarks));
  
      return response.metadata.student;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch student marks');
    }
  };