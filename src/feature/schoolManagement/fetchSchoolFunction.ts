import { School } from 'src/models/school';

export const mapApiSchoolToModel = (apiSchool: any): School => {
    return {
      id: apiSchool.id,
      name: apiSchool.name,
      address: apiSchool.address,
      postalCode: apiSchool.postal_code,
      phoneNumber: apiSchool.phone_number,
      email: apiSchool.email,
      schoolCode: apiSchool.school_code,
      status: apiSchool.status,
      city: apiSchool.city,
      website: apiSchool.website || undefined,
      principalName: apiSchool.principal_name || undefined,
      created_at: apiSchool.created_at,
      updated_at: apiSchool.updated_at,
      school_category: apiSchool.school_categories && apiSchool.school_categories.length > 0 ? {
        id: apiSchool.school_categories[0].id,
        name: apiSchool.school_categories[0].name
      } : undefined
    };
  };