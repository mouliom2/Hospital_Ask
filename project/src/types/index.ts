export interface Patient {
  id: string;
  name: string;
  service: string;
  status: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  service: string;
  email?: string;
  phone?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  service: string;
  date: string;
  time: string;
}

export interface Service {
  name: string;
  doctorCount: number;
  patientCount: number;
}

export interface RiskItem {
  name: string;
  level: number;
  severity: 'low' | 'medium' | 'high';
}

export interface OptimizationRecommendation {
  text: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}