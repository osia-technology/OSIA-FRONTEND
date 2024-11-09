import { Dispatch } from 'redux';
import { uploadMultipleSchools } from 'src/store/thunks/schoolThunks';
import { NavigateFunction } from 'react-router-dom';

export const uploadSchoolsFunction = async (
  formData: FormData,
  dispatch: Dispatch<any>,
  navigate: NavigateFunction,
  handleShowSnackbar: (message: string, severity: 'success' | 'error') => void,
  setLoading: (loading: boolean) => void,
  isMounted: boolean,
  token: string
) => {
  try {
    setLoading(true);

    const result = await dispatch(uploadMultipleSchools(formData, token));

    if (isMounted && result) {
      handleShowSnackbar('File successfully imported!', 'success');
    } else {
      handleShowSnackbar('File import failed.', 'error');
    }
  } catch (error) {
    if (isMounted) {
      handleShowSnackbar('Failed to import file, please try again.', 'error');
      console.error('Error during file import:', error);
    }
  } finally {
    if (isMounted) {
      setLoading(false);
    }
  }
};
