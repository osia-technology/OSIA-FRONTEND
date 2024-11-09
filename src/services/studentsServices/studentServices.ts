import axios from 'axios';
import { IStudentFormInput } from 'src/models/student';
import { API_URL } from '../base';

export const apiAddStudent = async (studentData: IStudentFormInput, classId: string, token: string) => {
    try {
      const response = await axios.post(`${API_URL}/save-student/${classId}`, studentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'An unknown error occurred');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const backendError = error.response.data.errors;
        throw new Error(backendError.join(' ') || 'Failed to add student');
      }
      throw new Error(error.message || 'Error adding student');
    }
  };

  export const apiGetStudents = async (classId: string, token: string) => {
    try {
      const response = await axios.get(`${API_URL}/students-by-class/${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'An unknown error occurred');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const backendError = error.response.data.errors;
        throw new Error(backendError.join(' ') || 'Failed to fetch students');
      }
      throw new Error(error.message || 'Error fetching students');
    }
  };

  export const apiUpdateStudent = async (studentId: string, studentData: IStudentFormInput, token: string) => {
    try {
      const trimmedName = studentData.name?.trim().replace(/\s+/g, '');
      const generatedEmail = `${trimmedName}@osia.com`;
      console.log(generatedEmail)
      const updatedStudentData = {
        ...studentData,
        email: generatedEmail,
      };
      const response = await axios.post(`${API_URL}/students/${studentId}`, updatedStudentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'An unknown error occurred');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const backendError = error.response.data.errors;
        throw new Error(backendError.join(' ') || 'Failed to update student');
      }
      throw new Error(error.message || 'Error updating student');
    }
  };

  export const apiDeleteStudent = async (studentId: string, token: string) => {
    try {
      const response = await axios.patch(`${API_URL}/students/${studentId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'An unknown error occurred');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const backendError = error.response.data.errors;
        throw new Error(backendError.join(' ') || 'Failed to delete student');
      }
      throw new Error(error.message || 'Error deleting student');
    }
  };

  export const apiUploadStudents = async (classId: string, formData: FormData, token: string) => {
    try {
      const response = await axios.post(`${API_URL}/import-student/${classId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'An unknown error occurred');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const backendError = error.response.data.errors;
        throw new Error(backendError.join(' ') || 'Failed to upload student');
      }
      throw new Error(error.message || 'Error uploading student');
    }
  };

  export const apiGetStudentMarks = async (studentId: string, token: string) => {
    try {
      const response = await axios.get(`${API_URL}/marks/students/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'An unknown error occurred');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const backendError = error.response.data.errors;
        throw new Error(backendError.join(' ') || 'Failed to fetch students marks');
      }
      throw new Error(error.message || 'Error fetching students marks');
    }
  };

  export const apiUploadStudentsMarks = async (subjectConfigurationId: string, formData: FormData, token: string) => {
    try {
      const response = await axios.post(`${API_URL}/import-subject-marks/3be58991-c73c-437a-ab7f-2ab0cd403527`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'An unknown error occurred');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const backendError = error.response.data.errors;
        throw new Error(backendError.join(' ') || 'Failed to upload student marks');
      }
      throw new Error(error.message || 'Error uploading student marks');
    }
  };