import { Student } from 'src/models/student';

export const mapApiStudentToModel = (apiStudent: any): Student => {
  return {
    id: apiStudent.id,
    name: apiStudent.name,
    matricule: apiStudent.matricule,
    date_of_birth: apiStudent.dateOfBirth,
    city_of_birth: apiStudent.cityOfBirth,
    sexe: apiStudent.sexe,
    tutor_name: apiStudent.tutorName,
    phone: apiStudent.phone || undefined,
    address: apiStudent.address || undefined,
    created_at: apiStudent.createdAt,
  };
};