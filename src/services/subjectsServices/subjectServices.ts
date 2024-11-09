import axios from 'axios';
import { API_URL } from '../base';

  export const apiGetSubjects = async (classLevelId: string, token: string) => {
    try {
      const response = await axios.get(`${API_URL}/subjects-by-level/${classLevelId}`, {
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
        throw new Error(backendError.join(' ') || 'Failed to fetch subjects');
      }
      throw new Error(error.message || 'Error fetching subjects');
    }
  };

  export const apiDeleteSubject = async (subjectId: string, token: string) => {
    try {
      const response = await axios.patch(`${API_URL}/subjects/${subjectId}`, null, {
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
        throw new Error(backendError.join(' ') || 'Failed to delete subject');
      }
      throw new Error(error.message || 'Error deleting subject');
    }
  };

  export const apiUploadSubjects = async (classLevelId: string, formData: FormData, token: string) => {
    try {
      const response = await axios.post(`${API_URL}/import-subject/${classLevelId}`, formData, {
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
        throw new Error(backendError.join(' ') || 'Failed to upload subject');
      }
      throw new Error(error.message || 'Error uploading subject');
    }
  };

  export const apiConfigureSubjects= async (subjectIds: string[], specialityId: string, coefficient: string, max_score: string, token: string) => {

    try {
      const response = await axios.post(`${API_URL}/subject-configurations`, {
        subject_ids: subjectIds,
        speciality_id: specialityId,
        coefficient: coefficient,
        max_score: max_score
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const backendError = error.response.data.errors;
        throw new Error(backendError.join(' ') || 'Échec de la configuration des sujets');
      }
      throw new Error(error.response?.data?.message || 'Error configuring sujets');
    }
  };