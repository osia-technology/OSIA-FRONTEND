import axios from 'axios';
import { ISpecialityFormInput } from 'src/models/speciality';
import { API_URL } from '../base';

  export const apiAddSpeciality = async (specialityData: ISpecialityFormInput, token: string, subSystemId: string) => {
    try {
      const response = await axios.post(`${API_URL}/save-class-speciality/${subSystemId}`, specialityData, {
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
        throw new Error(backendError.join(' ') || 'Failed to add speciality');
      }
      throw new Error(error.message || 'Error adding speciality');
    }
  };

  export const apiGetSpecialities = async (token: string, subSystemId: string) => {
    try {
      const response = await axios.get(`${API_URL}/speciality-by-sub-system/${subSystemId}`, {
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
        throw new Error(backendError.join(' ') || 'Failed to fetch specialities');
      }
      throw new Error(error.message || 'Error fetching specialities');
    }
  };

  export const apiDeleteSpeciality = async (specialityId: string, token: string) => {
    try {
      const response = await axios.patch(`${API_URL}/specialities/${specialityId}`, null, {
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
        throw new Error(backendError.join(' ') || 'Failed to delete speciality');
      }
      throw new Error(error.message || 'Error deleting speciality');
    }
  };

  export const apiGetSubSystems = async (token: string) => {
    try {
      const response = await axios.get(`${API_URL}/systems/sub-educational-systems`, {
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
        throw new Error(backendError.join(' ') || 'Failed to fetch educational systems');
      }
      throw new Error(error.message || 'Error fetching sub educational systems');
    }
  };