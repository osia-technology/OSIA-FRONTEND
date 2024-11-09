import { Dispatch } from 'redux';
import { login } from 'src/store/thunks/userThunks';
import { NavigateFunction } from 'react-router-dom';
import { getHomePathByRole } from 'src/utils/helpers';

export interface IFormInput {
  email: string;
  password: string;
}

export const onSubmit = async (
  data: IFormInput,
  dispatch: Dispatch<any>,
  navigate: NavigateFunction,
  handleShowSnackbar: (message: string, severity: 'success' | 'error') => void,
  setLoading: (loading: boolean) => void,
  isMounted: boolean
) => {
  try {
    setLoading(true);
    const result = await dispatch(login(data.email, data.password));
    const path = getHomePathByRole(result);
    if (isMounted) {
      handleShowSnackbar('Connexion réussie !', 'success');
      navigate('dashboard/'+path);
    }
  } catch (error) {
    if (isMounted) {
      handleShowSnackbar('Échec de la connexion. Veuillez vérifier vos informations !', 'error');
    }
  } finally {
    if (isMounted) {
      setLoading(false);
    }
  }
};
