import { createClient } from '@supabase/supabase-js';
import {
  PatientRecord,
  AppointmentRecord,
  ReminderPreferenceRecord,
  NotificationHistoryRecord,
  ReferralRecord,
  EducationProgressRecord,
  ResultsRecord,
} from './types';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL as string;
const supabaseKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY as string;

// Safe client creator: if values are missing or are placeholders, use a local-fallback client
const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseKey && 
  supabaseUrl !== 'YOUR_SUPABASE_URL' && 
  supabaseKey !== 'YOUR_SUPABASE_KEY'
);

function createMockSupabaseClient() {
  console.warn("Supabase is not configured. Falling back to localized local-storage database.");

  const getStorage = (key: string, initial: any) => {
    try {
      const stored = localStorage.getItem(`mock_db_${key}`);
      if (stored) return JSON.parse(stored);
    } catch {}
    return initial;
  };

  const setStorage = (key: string, val: any) => {
    try {
      localStorage.setItem(`mock_db_${key}`, JSON.stringify(val));
    } catch {}
  };

  const db: Record<string, any[]> = {
    Patient: getStorage('Patient', [
      { patient_id: 'SL001', name: 'Sarah Lim', contact_details: 'sarah.lim@gmail.com', age: 31, gender: 'Female', date_of_birth: '1995-01-12', email: 'sarah.lim@gmail.com', residential_address: 'Blk 123 Toa Payoh Lor 4, #05-67, Singapore 310123' },
      { patient_id: 'EW003', name: 'Emily Wong', contact_details: 'emily.wong@gmail.com', age: 35, gender: 'Female', date_of_birth: '1991-10-04', email: 'emily.wong@gmail.com', residential_address: 'Blk 890 Jurong West St 91, #02-14, Singapore 640890' },
      { patient_id: 'DT002', name: 'Daniel Tan', contact_details: 'daniel.tan@gmail.com', age: 38, gender: 'Male', date_of_birth: '1988-05-23', email: 'daniel.tan@gmail.com', residential_address: 'Blk 543 Bedok North St 3, #11-92, Singapore 460543', ldl_cholesterol_mmol: 5.4 },
      { patient_id: 'ML004', name: 'Michael Lee', contact_details: 'michael.lee@gmail.com', age: 46, gender: 'Male', date_of_birth: '1980-12-15', email: 'michael.lee@gmail.com', residential_address: 'Blk 234 Yishun Ring Rd, #09-33, Singapore 760234' }
    ]),
    Appointment: getStorage('Appointment', [
      { appointment_id: 'APT101', patient_id: 'EW003', appointment_date: '22 July 2026', appointment_time: '10:30 AM', clinic: 'National University Hospital Genetic Clinic', status: 'pending', calendar_added: false },
      { appointment_id: 'APT102', patient_id: 'DT002', appointment_date: '22 July 2026', appointment_time: '10:30 AM', clinic: 'National University Hospital Genetic Clinic', status: 'pending', calendar_added: false },
      { appointment_id: 'APT103', patient_id: 'ML004', appointment_date: '22 July 2026', appointment_time: '10:30 AM', clinic: 'National University Hospital Genetic Clinic', status: 'completed', calendar_added: false }
    ]),
    ReminderPreference: getStorage('ReminderPreference', [
      { reminder_id: 'REM101', patient_id: 'EW003', enabled: true, notification_channel: 'both', frequency: '2_weeks', next_notification_date: '2026-07-22' },
      { reminder_id: 'REM102', patient_id: 'DT002', enabled: true, notification_channel: 'sms', frequency: '1_week', next_notification_date: '2026-07-22' }
    ]),
    NotificationHistory: getStorage('NotificationHistory', []),
    Referral: getStorage('Referral', [
      { referral_id: 'REF101', patient_id: 'EW003', referral_type: 'clinical_suspicion', status: 'active' },
      { referral_id: 'REF102', patient_id: 'DT002', referral_type: 'cascade_screening', status: 'active' },
      { referral_id: 'REF103', patient_id: 'ML004', referral_type: 'clinical_referral', status: 'completed' }
    ]),
    EducationProgress: getStorage('EducationProgress', [
      { patient_id: 'EW003', percent_complete: 0 },
      { patient_id: 'DT002', percent_complete: 50 },
      { patient_id: 'ML004', percent_complete: 100 }
    ]),
    Results: getStorage('Results', [
      { patient_id: 'ML004', status: 'pending' }
    ])
  };

  const createQueryBuilder = (tableName: string, currentFilter?: { col: string; val: any }) => {
    const list = db[tableName] || [];

    const builder: any = {
      select: (columns?: string) => builder,
      eq: (col: string, val: any) => createQueryBuilder(tableName, { col, val }),
      maybeSingle: async () => {
        let filtered = list;
        if (currentFilter) {
          filtered = list.filter(item => item[currentFilter.col] === currentFilter.val);
        }
        return { data: filtered[0] || null, error: null };
      },
      delete: () => {
        return {
          eq: async (col: string, val: any) => {
            const filtered = list.filter(item => item[col] !== val);
            db[tableName] = filtered;
            setStorage(tableName, filtered);
            return { data: null, error: null };
          }
        };
      },
      upsert: async (records: any | any[], options?: any) => {
        const arr = Array.isArray(records) ? records : [records];
        let currentList = [...list];

        arr.forEach(rec => {
          let primaryKeyCol = '';
          if (tableName === 'Patient') primaryKeyCol = 'patient_id';
          else if (tableName === 'Appointment') primaryKeyCol = 'appointment_id';
          else if (tableName === 'ReminderPreference') primaryKeyCol = 'reminder_id';
          else if (tableName === 'Referral') primaryKeyCol = 'referral_id';
          else if (tableName === 'EducationProgress') primaryKeyCol = 'patient_id';
          else if (tableName === 'Results') primaryKeyCol = 'patient_id';
          else if (tableName === 'NotificationHistory') primaryKeyCol = 'notification_id';

          const index = currentList.findIndex(item => item[primaryKeyCol] === rec[primaryKeyCol]);
          if (index > -1) {
            currentList[index] = { ...currentList[index], ...rec };
          } else {
            currentList.push(rec);
          }
        });

        db[tableName] = currentList;
        setStorage(tableName, currentList);
        return { data: arr, error: null };
      },
      then: (onfulfilled: any) => {
        let data = list;
        if (currentFilter) {
          data = list.filter(item => item[currentFilter.col] === currentFilter.val);
        }
        return Promise.resolve({ data, error: null }).then(onfulfilled);
      }
    };

    return builder;
  };

  return {
    from: (tableName: string) => createQueryBuilder(tableName),
    channel: (name: string) => {
      const channelObj: any = {
        on: (event: string, filter: any, callback: any) => channelObj,
        subscribe: () => channelObj
      };
      return channelObj;
    },
    removeChannel: (channel: any) => {
      return Promise.resolve({ error: null });
    }
  };
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : (createMockSupabaseClient() as any);

// ------------------------------------------------------------
// Typed fetch helpers — call these once on mount to replace the
// hardcoded initial useState([...]) arrays in App.tsx
// ------------------------------------------------------------
export async function fetchPatients(): Promise<PatientRecord[]> {
  const { data, error } = await supabase.from('Patient').select('*');
  if (error) throw error;
  return data as PatientRecord[];
}

export async function fetchAppointments(): Promise<AppointmentRecord[]> {
  const { data, error } = await supabase.from('Appointment').select('*');
  if (error) throw error;
  return data as AppointmentRecord[];
}

export async function fetchReminderPreferences(): Promise<ReminderPreferenceRecord[]> {
  const { data, error } = await supabase.from('ReminderPreference').select('*');
  if (error) throw error;
  return data as ReminderPreferenceRecord[];
}

export async function fetchNotificationHistory(): Promise<NotificationHistoryRecord[]> {
  const { data, error } = await supabase.from('NotificationHistory').select('*');
  if (error) throw error;
  return data as NotificationHistoryRecord[];
}

export async function fetchReferrals(): Promise<ReferralRecord[]> {
  const { data, error } = await supabase.from('Referral').select('*');
  if (error) throw error;
  return data as ReferralRecord[];
}

export async function fetchEducationProgress(): Promise<EducationProgressRecord[]> {
  const { data, error } = await supabase.from('EducationProgress').select('*');
  if (error) throw error;
  return data as EducationProgressRecord[];
}

export async function fetchResults(): Promise<ResultsRecord[]> {
  const { data, error } = await supabase.from('Results').select('*');
  if (error) throw error;
  return data as ResultsRecord[];
}

// ------------------------------------------------------------
// Convenience: fetch everything needed for one patient's Home
// screen in a single call (referral status drives which banner/
// progress state to render, per the 5 test-case personas).
// ------------------------------------------------------------
export async function fetchPatientJourney(patientId: string) {
  const [referral, appointments, reminder, education, results] = await Promise.all([
    supabase.from('Referral').select('*').eq('patient_id', patientId).maybeSingle(),
    supabase.from('Appointment').select('*').eq('patient_id', patientId),
    supabase.from('ReminderPreference').select('*').eq('patient_id', patientId).maybeSingle(),
    supabase.from('EducationProgress').select('*').eq('patient_id', patientId).maybeSingle(),
    supabase.from('Results').select('*').eq('patient_id', patientId).maybeSingle(),
  ]);

  return {
    referral: referral.data as ReferralRecord | null,
    appointments: (appointments.data || []) as AppointmentRecord[],
    reminder: reminder.data as ReminderPreferenceRecord | null,
    education: education.data as EducationProgressRecord | null,
    results: results.data as ResultsRecord | null,
  };
}
