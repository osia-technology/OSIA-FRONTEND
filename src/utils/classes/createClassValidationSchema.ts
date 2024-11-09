import * as Yup from 'yup';

export const createClassValidationSchema = 
  Yup.object().shape({
    name: Yup.string()
      .required('Le nom de la classe est requis')
      .max(255, 'Le nom de la classe ne doit pas dépasser 255 caractères'),

    description: Yup.string()
      .nullable()
      .max(500, 'La description ne doit pas dépasser 500 caractères'),

    capacity: Yup.string()
      .required('La capacité est requise')
      .matches(/^\d+$/, 'La capacité doit être un nombre')
  });

export default createClassValidationSchema;
