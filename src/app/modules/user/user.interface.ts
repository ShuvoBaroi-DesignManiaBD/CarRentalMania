export type UserRole = 'user' | 'admin';

export interface TUser {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  phone: string;
  address: string;
};
