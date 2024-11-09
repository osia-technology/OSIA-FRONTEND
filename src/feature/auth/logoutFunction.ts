import { AppDispatch } from 'src/app/store';
import { performLogout } from 'src/store/thunks/userThunks';
import { NavigateFunction } from 'react-router-dom';

export const handleSignOut = async (
  dispatch: AppDispatch,
  userToken: string,
  setLoading: (loading: boolean) => void,
  navigate: NavigateFunction
): Promise<void> => {
  try {
    setLoading(true);
    await dispatch(performLogout(userToken));
    navigate('/');
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
