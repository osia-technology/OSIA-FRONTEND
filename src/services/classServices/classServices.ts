import axios from 'axios';
import { IClassFormInput } from 'src/models/class';
import { API_URL } from '../base';

export const apiAddClass = async (classData: IClassFormInput, token: string) => {
    try {
      const response = await axios.post(`${API_URL}/save-class`, classData, {
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
        throw new Error(backendError.join(' ') || 'Failed to add class');
      }
      throw new Error(error.message || 'Error adding class');
    }
  };
  
  export const apiGetClasses = async (token: string) => {
    try {
      const response = await axios.get(`${API_URL}/classes`, {
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
        throw new Error(backendError.join(' ') || 'Failed to fetch classes');
      }
      throw new Error(error.message || 'Error fetching classes');
    }
  };
  
  export const apiUpdateClass = async (classId: string, classData: IClassFormInput, token: string) => {
    try {
      const response = await axios.post(`${API_URL}/classes/${classId}`, classData, {
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
        throw new Error(backendError.join(' ') || 'Failed to update class');
      }
      throw new Error(error.message || 'Error updating class');
    }
  };
  
  export const apiDeleteClass = async (classId: string, token: string) => {
    try {
      const response = await axios.patch(`${API_URL}/classes/${classId}`, null, {
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
        throw new Error(backendError.join(' ') || 'Failed to delete class');
      }
      throw new Error(error.message || 'Error deleting class');
    }
  };
  
  export const apiUploadClasses = async (formData: FormData, token: string) => {
    try {
      const response = await axios.post(`${API_URL}/import-class`, formData, {
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
        throw new Error(backendError.join(' ') || 'Failed to upload class');
      }
      throw new Error(error.message || 'Error uploading classes');
    }
  };

  export const apiGetClassLevels = async (token: string) => {
    try {
      const response = await axios.get(`${API_URL}/class-levels`, {
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
        throw new Error(backendError.join(' ') || 'Failed to fetch class levels');
      }
      throw new Error(error.message || 'Error fetching class levels');
    }
  };

  export const apiConfigureClasses = async (classIds: string[], specialityId: string, levelId: string,token: string) => {
 

    try {
      const response = await axios.post(`${API_URL}/class-configurations`, {
        class_ids: classIds,
        speciality_id: specialityId,
        level_id: levelId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const backendError = error.response.data.errors;
        throw new Error(backendError.join(' ') || 'Échec de la configuration des classes');
      }
      throw new Error(error.response?.data?.message || 'Error configuring classes');
    }
  };