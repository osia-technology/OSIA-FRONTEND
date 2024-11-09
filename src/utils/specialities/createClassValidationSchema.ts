import * as Yup from 'yup';

export const createSpecialityValidationSchema = 
  Yup.object().shape({
    description: Yup.string()
      .required('Le nom de la Specialité est requis')
      .max(255, 'Le nom de la Specialité ne doit pas dépasser 255 caractères'),

    code: Yup.string()
      .required('Le code de la spécialité est requis')
      .max(10, 'La description ne doit pas dépasser 10 caractères'),
      
    subsystemId: Yup.string()
      .required('La sélection d\'un sous-système est requise'),
  });

export default createSpecialityValidationSchema;
