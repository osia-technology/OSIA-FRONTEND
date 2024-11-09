import { Dispatch } from 'redux';
import { createSpeciality } from 'src/store/thunks/specialityThunks';
import { NavigateFunction } from 'react-router-dom';
import createSpecialityValidationSchema from 'src/utils//specialities/createClassValidationSchema';
import * as Yup from 'yup';
import { ISpecialityFormInput } from 'src/models/speciality';

export const addSpecialityFunction = async (
  data: ISpecialityFormInput,
  dispatch: Dispatch<any>,
  navigate: NavigateFunction,
  handleShowSnackbar: (message: string, severity: 'success' | 'error') => void,
  setLoading: (loading: boolean) => void,
  isMounted: boolean,
  token: string,
  subSystemId: string
) => {
  try {
    setLoading(true);
    const validationSchema = createSpecialityValidationSchema;
    await validationSchema.validate(data);

    const result = await dispatch(createSpeciality(data, token, subSystemId));

    if (isMounted && result) {
      handleShowSnackbar('Spécialité ajoutée avec succès!', 'success');
      navigate('/management/specialities');
    }
  } catch (error) {
    if (isMounted) {
      if (error instanceof Yup.ValidationError) {
        throw new Error(`Erreur de validation : ${error.message}`);
      } else {
        throw new Error('Une erreur est survenue lors de l\'ajout de la spécialité.');
      }
    }
  } finally {
    if (isMounted) {
      setLoading(false);
    }
  }
};
