import * as Yup from 'yup';

export const createSchoolValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Le nom de l\'école est requis')
    .max(255, 'Le nom de l\'école ne doit pas dépasser 255 caractères'),

  address: Yup.string()
    .required('L\'adresse est requise')
    .max(255, 'L\'adresse ne doit pas dépasser 255 caractères'),

  postalCode: Yup.string()
    .required('Le code postal est requis')
    .matches(/^[A-Za-z0-9\s\-]{3,10}$/, 'Le code postal doit avoir entre 3 et 10 caractères'),

  phoneNumber: Yup.string()
    .required('Le numéro de téléphone est requis')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Le numéro de téléphone est invalide'),

  email: Yup.string()
    .required('L\'email est requis')
    .email('L\'adresse email est invalide')
    .max(255, 'L\'email ne doit pas dépasser 255 caractères'),

  schoolCode: Yup.string()
    .required('Le code de l\'école est requis')
    .max(50, 'Le code de l\'école ne doit pas dépasser 50 caractères'),

  city: Yup.string()
    .required('La ville est requise')
    .max(100, 'La ville ne doit pas dépasser 100 caractères'),

  website: Yup.string()
    .nullable()
    .max(255, 'Le site web ne doit pas dépasser 255 caractères'),

  principalName: Yup.string()
    .nullable()
    .max(255, 'Le nom du directeur ne doit pas dépasser 255 caractères'),
});

export default createSchoolValidationSchema;
