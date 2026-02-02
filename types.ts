
export enum UserRole {
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN'
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  allergies: string[];
  medicalConditions: string[];
  medications: string[];
  lastUpdate: string;
  profileImage?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
