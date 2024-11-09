import { SchoolCategory } from "./schoolCategory";

export interface School {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  schoolCode: string;
  status: 'active' | 'inactive';
  city: string;
  website?: string;
  principalName?: string;
  created_at: string;
  updated_at: string;
  school_category?: SchoolCategory;
}

export interface ISchoolFormInput {
  name: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  website?: string;
  principalName?: string;
  schoolCode: string;
  city: string;
}