import { Patient, StaffMember, Service, RiskItem, OptimizationRecommendation, Appointment } from '../types';

export const patients: Patient[] = [
  { id: 'P001', name: 'Jean Dupont', service: 'Cardiologie', status: 'Hospitalisé' },
  { id: 'P002', name: 'Marie Laurent', service: 'Pédiatrie', status: 'Consultation' },
  { id: 'P003', name: 'Pierre Martin', service: 'Urgences', status: 'Traitement' },
  { id: 'P004', name: 'Sophie Petit', service: 'Cardiologie', status: 'Sorti' },
  { id: 'P005', name: 'Luc Bernard', service: 'Pédiatrie', status: 'Hospitalisé' },
  { id: 'P006', name: 'Camille Morel', service: 'Urgences', status: 'Critique' },
];

export const staffMembers: StaffMember[] = [
  { id: 'S001', name: 'Dr. Martin', role: 'Médecin', service: 'Cardiologie' },
  { id: 'S002', name: 'Dr. Petit', role: 'Médecin', service: 'Pédiatrie' },
  { id: 'S003', name: 'Inf. Dubois', role: 'Infirmier', service: 'Urgences' },
  { id: 'S004', name: 'Inf. Lambert', role: 'Infirmier', service: 'Cardiologie' },
  { id: 'S005', name: 'Mme. Leroy', role: 'Administration', service: 'Direction' },
];

export const services: Service[] = [
  { name: 'Cardiologie', doctorCount: 12, patientCount: 45 },
  { name: 'Pédiatrie', doctorCount: 8, patientCount: 32 },
  { name: 'Urgences', doctorCount: 15, patientCount: 0 }, // Variable is shown as text in UI
];

export const appointments: Appointment[] = [
  { id: 'A001', patientName: 'Jean Dupont', doctorName: 'Dr. Martin', service: 'Cardiologie', date: '2025-04-15', time: '09:30' },
  { id: 'A002', patientName: 'Marie Laurent', doctorName: 'Dr. Petit', service: 'Pédiatrie', date: '2025-04-15', time: '10:45' },
  { id: 'A003', patientName: 'Sophie Petit', doctorName: 'Dr. Martin', service: 'Cardiologie', date: '2025-04-16', time: '14:00' },
  { id: 'A004', patientName: 'Luc Bernard', doctorName: 'Dr. Petit', service: 'Pédiatrie', date: '2025-04-17', time: '11:15' },
  { id: 'A005', patientName: 'Pierre Martin', doctorName: 'Dr. Dupont', service: 'Urgences', date: '2025-04-15', time: '16:30' },
];

export const risks: RiskItem[] = [
  { name: 'Occupation des Urgences', level: 85, severity: 'high' },
  { name: 'Besoin en Personnel', level: 60, severity: 'medium' },
];

export const recommendations: OptimizationRecommendation[] = [
  { text: 'Augmenter le personnel de nuit de 2 infirmiers' },
  { text: 'Réorganiser les consultations du service cardiologie' },
];

export const dashboardStats = {
  patients: 127,
  appointments: 23,
  staff: 45,
  services: 8,
};

export const monthNames = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];