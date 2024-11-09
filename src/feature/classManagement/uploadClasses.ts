import { Dispatch } from 'redux';
import { uploadMultipleClasses } from 'src/store/thunks/classThunks';

export const uploadClassesFunction = async (
  formData: FormData,
  dispatch: Dispatch<any>,
  handleShowSnackbar: (message: string, severity: 'success' | 'error') => void,
  setLoading: (loading: boolean) => void,
  token: string
) => {
  try {
    setLoading(true);

    const result = await dispatch(uploadMultipleClasses(formData, token));

    if (result) {
      handleShowSnackbar('Fichier importé avec succès!', 'success');
    } else {
      handleShowSnackbar("Échec de l'importation du fichier.", 'error');
    }
  } catch (error) {
    handleShowSnackbar('Échec de l\'importation, veuillez réessayer.', 'error');
    console.error('Erreur lors de l\'importation du fichier:', error);
  } finally {
    setLoading(false);
  }
};
