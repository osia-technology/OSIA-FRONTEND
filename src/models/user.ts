export interface User {
  userId: string;
  username: string;
  email: string;
  token: string | null;
  roles: string[]; 
  permissions: string[];
  roleId?: string
}
