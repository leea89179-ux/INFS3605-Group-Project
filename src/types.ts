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
  status: 'pending' | 'booked' | 'completed';
}

export interface ReminderPreferences {
  enabled: boolean;
  channel: 'sms' | 'push' | 'both';
  frequency: 'daily' | 'weekly' | 'monthly' | '7days_before';
  previewText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'about' | 'testing' | 'cost' | 'insurance' | 'medication';
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
