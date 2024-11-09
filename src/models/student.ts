export interface Student {
    id: string;
    name: string;
    matricule: string;
    date_of_birth: string;
    city_of_birth: string;
    sexe: 'm' | 'f';
    tutor_name: string;
    phone?: string;
    address?: string;
    created_at: string;
}

export interface IStudentFormInput{
    name: string;
    matricule: string;
    date_of_birth: string;
    city_of_birth: string;
    sexe: string;
    tutor_name: string;
    phone?: string;
    address?: string;
}