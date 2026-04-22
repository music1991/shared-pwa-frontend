export type UserRole = 'admin' | 'employee' | 'user';

export const ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  USER: 'user',
} as const;