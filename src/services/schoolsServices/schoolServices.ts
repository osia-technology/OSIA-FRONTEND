import axios from 'axios';
import { API_URL } from '../base';
import { ISchoolFormInput } from 'src/models/school';

export const apiAddSchool = async (schoolData: ISchoolFormInput, token: string) => {
  
  try {
    const response = await axios.post(`${API_URL}/save-school`, schoolData,{
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
      throw new Error(backendError.join(' ') || 'Failed to add school');
    }
    throw new Error(error.message || 'Error adding school');
  }
};

export const apiGetSchools = async (token: string) => {
  
    try {
      const response = await axios.get(`${API_URL}/schools`,{
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
        throw new Error(backendError.join(' ') ||  'Failed to fetch school');
      }
      throw new Error(error.message ||  'Error fetching schools');
    }
  };
  
  export const apiUpdateSchool = async (schoolId: string, schoolData: ISchoolFormInput, token: string) => {
    
    try {
      const response = await axios.post(`${API_URL}/schools/${schoolId}`, schoolData,{
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
        throw new Error(backendError.join(' ') || 'Failed to update school');
      }
      throw new Error(error.message || 'Error updating school');
    }
  };

  export const apiDeleteSchool = async (schoolId: string, token: string) => {
    

    try {
      const response = await axios.patch(`${API_URL}/schools/${schoolId}`,null,{
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
        throw new Error(backendError.join(' ') || 'Failed to delete school');
      }
      throw new Error(error.message || 'Error deleting school');
    }
  };

  export const apiUploadSchools = async (formData: FormData, token: string) => {
   

    try {
      const response = await axios.post(`${API_URL}/import-school`,formData, {
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
        throw new Error(backendError.join(' ') || 'Failed to upload school');
      }
      throw new Error(error.message || 'Error uploading schools');
    }
  };

export const apiFetchSchoolCategories = async (token: string) => {
  

  try {
    const response = await axios.get(`${API_URL}/schools/category`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Une erreur inconnue s\'est produite lors de la récupération des catégories d\'école.');
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      const backendError = error.response.data.errors;
      throw new Error(backendError.join(' ') ||  'Échec de la récupération des catégories d\'école.');
    }
    throw new Error(error.message ||'Erreur lors de la récupération des catégories d\'école.');
  }
};

export const apiConfigureSchools = async (schoolIds: string[], categoryId: string, token: string) => {
 

  try {
    const response = await axios.post(`${API_URL}/school/configuration`, {
      school_years_ids: schoolIds,
      category_id: categoryId
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      const backendError = error.response.data.errors;
      throw new Error(backendError.join(' ') || 'Échec de la configuration des écoles');
    }
    throw new Error(error.response?.data?.message || 'Error configuring schools');
  }
};