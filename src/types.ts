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
  frequency: 'monthly' | '2_weeks' | '1_week' | '1_day' | 'custom';
  previewText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'about' | 'testing' | 'cost' | 'insurance' | 'medication' | 'family';
}

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

export interface AppointmentRecord {
  appointment_id: string;
  patient_id: string;
  appointment_date: string;
  appointment_time: string;
  clinic: string;
  status: 'pending' | 'booked' | 'confirmed' | 'completed' | 'cancelled' | 'missed';
  attendance?: 'attended' | 'missed' | null;
  calendar_added: boolean;
}

export interface ReminderPreferenceRecord {
  reminder_id: string;
  patient_id: string;
  enabled: boolean;
  notification_channel: string | null;
  frequency: 'monthly' | '2_weeks' | '1_week' | '1_day' | 'custom' | null;
  next_notification_date: string | null;
}

export interface ReferralRecord {
  referral_id: string;
  patient_id: string;
  referral_type: 'cascade_screening' | 'clinical_suspicion' | 'clinical_referral';
  status: 'referral_received' | 'active' | 'completed';
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
  appointment_id: string;
  sent_date: string;
  opened_status: 'sent' | 'opened';
  action_taken: 'none' | 'confirmed' | 'rescheduled' | 'education_viewed';
}

export interface DBQueryLog {
  timestamp: string;
  query: string;
  type: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'DDL';
}
