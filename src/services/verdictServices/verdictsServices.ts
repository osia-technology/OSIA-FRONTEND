import axios from 'axios';
import { API_URL } from '../base';


  export const apiGetStudentVerdict = async (studentId: string, token: string) => {
    try {
      const response = await axios.get(`${API_URL}/verdicts/students/${studentId}`, {
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
        throw new Error(backendError.join(' ') || 'Failed to fetch student verdict');
      }
      throw new Error(error.message || 'Error fetching student verdict');
    }
  };

  export const apiGeneratedVerdict = async (classId: string, token: string) => {
    try {
      const response = await axios.post(`${API_URL}/generate-verdicts/${classId}`, null, {
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
        throw new Error(backendError.join(' ') || 'Failed to add student verdict');
      }
      throw new Error(error.message || 'Error adding student verdict');
    }
  };
