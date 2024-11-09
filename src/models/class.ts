export interface Class {
    id: string;
    name: string;
    description: string;
    capacity: string;
    school_id: string;
    created_at: string;
    updated_at: string;
    is_deleted: string;
}

export interface IClassFormInput {
    name: string;
    description?: string;
    capacity: string;
}