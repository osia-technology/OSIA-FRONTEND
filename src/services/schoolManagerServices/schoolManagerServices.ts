import axios from 'axios';
import { API_URL } from '../base';



export const apiAddSchoolManager = async (name: string, email: string, password: string, schoolId: string, token: string) => {
 
  try {
    const response = await axios.post(`${API_URL}/school-manager/${schoolId}`, {
        "name" : name,
        "email" : email,
        "password" : password,
    },{
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
      throw new Error(backendError.join(' ') || 'Failed to add school manager');
    }
    throw new Error(error.message || 'Error adding school manager');
  }
};

export const apiGetSchoolManager = async (schoolId: string, token: string) => {
    
    try {
      const response = await axios.get(`${API_URL}/school-managers/${schoolId}`,{
        headers: {
          Authorization: `Bearer ${token}`
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
        throw new Error(backendError.join(' ') || 'Failed to fetch school manager');
      }
      throw new Error(error.message || 'Error fetching school manager');
    }
  };
  
  export const apiUpdateSchoolManager = async (name: string, email: string, managerId: string, token: string) => {
    
    try {
      const response = await axios.post(`${API_URL}/school-managers/${managerId}`, {
        "name" : name,
        "email" : email
      },{
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      
      if (response.status === 200) {
        return response.data;
      }else {
        throw new Error(response.data.message || 'An unknown error occurred');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const backendError = error.response.data.errors;
        throw new Error(backendError.join(' ') || 'Failed to update school manager');
      }
      throw new Error(error.message || 'Error updating school manager');
    }
  };

  export const apiDeleteSchoolManager = async (managerId: string, token: string) => {
    
    try {
      const response = await axios.patch(`${API_URL}/school-managers/${managerId}`,null,{
        headers: {
          Authorization: `Bearer ${token}`
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
        throw new Error(backendError.join(' ') || 'Failed to delete school manager');
      }
      throw new Error(error.message || 'Error deleting school manager');
    }
  };

