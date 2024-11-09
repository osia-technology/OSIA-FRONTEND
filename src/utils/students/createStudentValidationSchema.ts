import * as Yup from 'yup';

export const createStudentValidationSchema = 
  Yup.object().shape({
    name: Yup.string()
      .required('Le nom est requis')
      .max(255, 'Le nom ne doit pas dépasser 255 caractères'),

    matricule: Yup.string()
      .required('Le matricule est requis')
      .max(50, 'Le matricule ne doit pas dépasser 50 caractères'),

      date_of_birth: Yup.string()
      .required('La date de naissance est requise')
      .matches(/^\d{4}-\d{2}-\d{2}$/, 'La date doit être au format YYYY-MM-DD')
      .test('is-date', 'La date de naissance doit être valide', (value) => {
        return !isNaN(Date.parse(value || ''));
      }),

    city_of_birth: Yup.string()
      .required('La ville de naissance est requise')
      .max(100, 'La ville de naissance ne doit pas dépasser 100 caractères'),

    sexe: Yup.string()
      .required('Le sexe est requis')
      .oneOf(['m', 'f'], 'Le sexe doit être "m" ou "f"'),

    tutor_name: Yup.string()
      .required('Le nom du tuteur est requis')
      .max(255, 'Le nom du tuteur ne doit pas dépasser 255 caractères'),

     phone: Yup.string()
    .nullable()
    .max(15, 'Le numéro de téléphone ne doit pas dépasser 15 caractères')
    .matches(
      /^(\+?\d{1,3}[- ]?)?\d{10}$/,
      'Le numéro de téléphone doit être valide (format international)'
    ),

    address: Yup.string()
      .nullable()
      .max(255, 'L\'adresse ne doit pas dépasser 255 caractères'),
  });

export default createStudentValidationSchema;
