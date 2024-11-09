export interface Speciality {
    id: string;
    code: string;
    description: string;
    sub_educational_system_id: string;
    created_at: string;
    updated_at: string;
}

export interface ISpecialityFormInput {
    code: string;
    description: string;
    subsystemId: string;
}
