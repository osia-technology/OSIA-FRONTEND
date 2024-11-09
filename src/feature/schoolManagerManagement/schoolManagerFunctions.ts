import { apiAddSchoolManager, apiGetSchoolManager, apiUpdateSchoolManager, apiDeleteSchoolManager } from 'src/services/schoolManagerServices/schoolManagerServices';

export const fetchSchoolManager = async (schoolId: string, token: string, handleShowSnackbar: any) => {
  try {
    const manager = await apiGetSchoolManager(schoolId, token);
    return manager;
  } catch (error: any) {
    handleShowSnackbar(error.message || 'Error loading school manager.', 'error');
  }
};

export const saveSchoolManager = async (email: string, password: string, name: string, schoolId: string, token: string, handleShowSnackbar: any) => {
  try {
    const result = await apiAddSchoolManager(name, email, password, schoolId, token);
    handleShowSnackbar('School manager successfully added!', 'success');
    return result.metadata;
  } catch (error: any) {
    handleShowSnackbar(error.message || 'Error adding school manager.', 'error');
  }
};

export const editSchoolManager = async (name: string, email: string, managerDataId: string, token: string, handleShowSnackbar: any) => {
  try {
    await apiUpdateSchoolManager(name, email, managerDataId, token);
    handleShowSnackbar('School manager successfully updated!', 'success');
  } catch (error: any) {
    handleShowSnackbar(error.message || 'Error updating school manager.', 'error');
  }
};

export const deleteSchoolManager = async (managerId: string, token: string, handleShowSnackbar: any) => {
  try {
    await apiDeleteSchoolManager(managerId, token);
    handleShowSnackbar('School manager successfully deleted!', 'success');
  } catch (error: any) {
    handleShowSnackbar(error.message || 'Error deleting school manager.', 'error');
  }
};
