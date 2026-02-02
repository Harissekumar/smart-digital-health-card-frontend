
import { Patient, UserRole } from './types';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'P001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    bloodGroup: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    medicalConditions: ['Hypertension', 'Type 2 Diabetes'],
    medications: ['Lisinopril', 'Metformin'],
    lastUpdate: '2023-10-15',
    profileImage: 'https://picsum.photos/seed/p001/400/400'
  },
  {
    id: 'P002',
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    bloodGroup: 'A-',
    allergies: ['Latex', 'Sulfa Drugs'],
    medicalConditions: ['Asthma'],
    medications: ['Albuterol inhaler'],
    lastUpdate: '2023-11-20',
    profileImage: 'https://picsum.photos/seed/p002/400/400'
  },
  {
    id: 'P003',
    name: 'Robert Brown',
    age: 58,
    gender: 'Male',
    bloodGroup: 'B+',
    allergies: ['Aspirin'],
    medicalConditions: ['Coronary Artery Disease'],
    medications: ['Atorvastatin'],
    lastUpdate: '2023-12-05',
    profileImage: 'https://picsum.photos/seed/p003/400/400'
  }
];
