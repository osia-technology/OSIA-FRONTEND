import { Class } from 'src/models/class';

export const mapApiClassToModel = (apiClass: any): Class => {
  return {
    id: apiClass.id,
    name: apiClass.name,
    description: apiClass.description || undefined,
    capacity: apiClass.capacity,
    school_id: apiClass.school_id,
    created_at: apiClass.created_at,
    updated_at: apiClass.updated_at,
    is_deleted: apiClass.is_deleted || false,
  };
};
