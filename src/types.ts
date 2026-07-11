export enum ScreenId {
  Home = 'home',
  ReferralIntro = 'referral-intro',
  Education = 'education',
  Booking = 'booking',
  ReminderSettings = 'reminders',
  ProgressTimeline = 'timeline',
  NotificationMock = 'notification',
}

export interface Appointment {
  date: string;
  timeSlot: string;
  clinic: string;
  status: 'pending' | 'booked' | 'confirmed' | 'completed';
}

export interface ReminderPreferences {
  enabled: boolean;
  channel: 'sms' | 'push' | 'both';
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
export interface PatientRecord {
  patient_id: string;
  name: string;
  contact_details: string;
}

export interface AppointmentRecord {
  appointment_id: string;
  patient_id: string;
  appointment_date: string;
  appointment_time: string;
  clinic: string;
  status: 'pending' | 'booked' | 'confirmed' | 'completed';
  calendar_added: boolean;
}

export interface ReminderPreferenceRecord {
  reminder_id: string;
  patient_id: string;
  enabled: boolean;
  notification_channel: 'sms' | 'push' | 'both';
  frequency: 'monthly' | '2_weeks' | '1_week' | '1_day' | 'custom';
  next_notification_date: string;
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
