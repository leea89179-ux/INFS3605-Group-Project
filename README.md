export enum ScreenId {
  Home = 'home',
  ReferralIntro = 'referral-intro',
  Education = 'education',
  Booking = 'booking',
  ReminderSettings = 'reminders',
  ProgressTimeline = 'timeline',
  NotificationMock = 'notification',
  Profile = 'profile',
  Chatbot = 'chatbot',
}

export interface Appointment {
  date: string;
  timeSlot: string;
  clinic: string;
  status: 'pending' | 'booked' | 'confirmed' | 'completed' | 'cancelled' | 'missed';
}

export interface ReminderPreferences {
  enabled: boolean;
  channel: string;
  frequency: string;
  previewText: string;
}

======
Last updated: 02/08/2026 10:58am
https://ai.studio/apps/dc66bd13-3b51-4278-9ed0-b88d5e66be23

export interface Annotation {
  id: string;
  screenId: ScreenId;
  targetId: string;
  title: string;
  text: string;
  x: number; // Percent from left in the UI
  y: number; // Percent from top in the UI
}

// Database Integration Interfaces (Feature 6)
export interface OnboardingPreferences {
  familiarity: 'new' | 'little' | 'research' | 'advanced' | null;
  topics: string[];
  concerns: string[];
}

export interface PatientRecord {
  patient_id: string;
  name: string;
  contact_details: string;
  age?: number | null;
  occupation?: string | null;
  gender?: string | null;
  nric_fin?: string | null;
  date_of_birth?: string | null; // ISO date string e.g. '1984-03-11'
  email?: string | null;
  residential_address?: string | null;
  emergency_contact_name?: string | null;
  emergency_contact_relationship?: string | null;
  emergency_contact_phone?: string | null;
  primary_clinic?: string | null;
  ldl_cholesterol_mmol?: number | null;
}

// The calendar of available appointment slots offered by each clinic.
// Not tied to any patient — a patient booking a slot creates a row
// in PatientAppointmentRecord that references it.
export interface AppointmentRecord {
  appointment_id: string;
  clinic: string;
  clinic_address: string;
  provider_role: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  cost_sgd: number;
  is_available: boolean;
}

// Records a patient's booking of a specific Appointment slot, and
// its lifecycle (booked -> confirmed -> completed, or cancelled).
export interface PatientAppointmentRecord {
  patient_appointment_id: string;
  patient_id: string;
  appointment_id: string;
  status: 'booked' | 'confirmed' | 'completed' | 'cancelled' | 'missed';
  attendance?: 'attended' | 'missed' | null;
  calendar_added: boolean;
  booked_at?: string;
}

export interface ReminderPreferenceRecord {
  reminder_id: string;
  patient_id: string;
  enabled: boolean;
  notification_channel: string | null;
  frequency: string | null;
  next_notification_date: string | null;
}

export interface ReferralRecord {
  referral_id: string;
  patient_id: string;
  // The SOURCE the referral came from:
  //   chas_gp_clinic                = Community Health Assist Scheme (CHAS) GP clinics
  //   polyclinic                    = Polyclinics
  //   specialist_outpatient_clinic  = Specialist outpatient clinics at Public Healthcare Institutions (Hospitals)
  referral_type: 'chas_gp_clinic' | 'polyclinic' | 'specialist_outpatient_clinic';
  status: 'referral_received' | 'active' | 'completed';
}

// What the patient clicked in the personalisation/onboarding quiz.
// One row per patient (upsert on retake).
export interface PersonalisationResponseRecord {
  patient_id: string;
  familiarity: 'new' | 'little' | 'research' | 'advanced' | null;
  topics: string[];
  concerns: string[];
  completed_at?: string | null;
}

export interface EducationProgressRecord {
  patient_id: string;
  percent_complete: number;
}

export interface ResultsRecord {
  patient_id: string;
  status: 'pending' | 'available';
}

export interface NotificationHistoryRecord {
  notification_id: string;
  patient_id: string;
  patient_appointment_id: string | null;
  sent_date: string;
  opened_status: 'sent' | 'opened';
  action_taken: 'none' | 'confirmed' | 'rescheduled' | 'education_viewed';
}

export interface DBQueryLog {
  timestamp: string;
  query: string;
  type: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'DDL';
}
