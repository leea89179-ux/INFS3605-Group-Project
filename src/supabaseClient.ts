import { 
  PatientRecord, 
  AppointmentRecord, 
  ReminderPreferenceRecord, 
  NotificationHistoryRecord, 
  ReferralRecord,
  EducationProgressRecord,
  ResultsRecord
} from './types';

// In-memory relational tables storage
const tables: {
  Patient: PatientRecord[];
  Appointment: AppointmentRecord[];
  ReminderPreference: ReminderPreferenceRecord[];
  NotificationHistory: NotificationHistoryRecord[];
  Referral: ReferralRecord[];
  EducationProgress: EducationProgressRecord[];
  Results: ResultsRecord[];
} = {
  Patient: [
    { patient_id: 'SL001', name: 'Sarah Lim', contact_details: 'sarah.lim@gmail.com', age: 31, occupation: 'Accountant', gender: 'Female', email: 'sarah.lim@gmail.com' },
    { patient_id: 'DT002', name: 'Daniel Tan', contact_details: 'daniel.tan@gmail.com', age: 38, occupation: 'Engineer', gender: 'Male', email: 'daniel.tan@gmail.com' },
    { patient_id: 'EW003', name: 'Emily Wong', contact_details: 'emily.wong@gmail.com', age: 35, occupation: 'Teacher', gender: 'Female', email: 'emily.wong@gmail.com' },
    { patient_id: 'ML004', name: 'Michael Lee', contact_details: 'michael.lee@gmail.com', age: 46, occupation: 'Manager', gender: 'Male', email: 'michael.lee@gmail.com' },
    { patient_id: 'PN005', name: 'Priya Nair', contact_details: 'priya.nair@gmail.com', age: 39, occupation: 'Consultant', gender: 'Female', email: 'priya.nair@gmail.com' },
    { patient_id: 'LH321', name: 'Lisa Ho Siew Lan', contact_details: 'lisa.ho@gmail.com', age: 37, occupation: 'Analyst', gender: 'Female', email: 'lisa.ho@gmail.com' }
  ],
  Appointment: [
    { appointment_id: 'APT101', patient_id: 'SL001', appointment_date: '21 July 2026', appointment_time: '10:00 AM', clinic: 'Toa Payoh Polyclinic', status: 'pending', attendance: null, calendar_added: false },
    { appointment_id: 'APT102', patient_id: 'DT002', appointment_date: '23 July 2026', appointment_time: '2:00 PM', clinic: 'National University Hospital Genetic Clinic', status: 'pending', attendance: null, calendar_added: false },
    { appointment_id: 'APT103', patient_id: 'EW003', appointment_date: '22 July 2026', appointment_time: '10:30 AM', clinic: 'Singapore General Hospital Genetics Service', status: 'booked', attendance: null, calendar_added: true },
    { appointment_id: 'APT104', patient_id: 'ML004', appointment_date: '24 July 2026', appointment_time: '9:30 AM', clinic: 'National University Hospital Genetic Clinic', status: 'pending', attendance: null, calendar_added: false }
  ],
  ReminderPreference: [
    { reminder_id: 'REM101', patient_id: 'SL001', enabled: true, notification_channel: 'both', frequency: '1_week', next_notification_date: '14 July 2026' },
    { reminder_id: 'REM102', patient_id: 'DT002', enabled: true, notification_channel: 'sms', frequency: '2_weeks', next_notification_date: '09 July 2026' },
    { reminder_id: 'REM103', patient_id: 'EW003', enabled: true, notification_channel: 'both', frequency: '1_week', next_notification_date: '15 July 2026' },
    { reminder_id: 'REM104', patient_id: 'ML004', enabled: false, notification_channel: 'push', frequency: '1_day', next_notification_date: '23 July 2026' }
  ],
  NotificationHistory: [
    { notification_id: 'NOT101', patient_id: 'SL001', appointment_id: 'APT101', sent_date: '07 July 2026', opened_status: 'opened', action_taken: 'education_viewed' },
    { notification_id: 'NOT102', patient_id: 'EW003', appointment_id: 'APT103', sent_date: '08 July 2026', opened_status: 'sent', action_taken: 'none' }
  ],
  Referral: [
    { referral_id: 'REF102', patient_id: 'DT002', referral_type: 'clinical_suspicion', status: 'referral_received' },
    { referral_id: 'REF103', patient_id: 'EW003', referral_type: 'cascade_screening', status: 'active' },
    { referral_id: 'REF104', patient_id: 'ML004', referral_type: 'clinical_referral', status: 'referral_received' }
  ],
  EducationProgress: [
    { patient_id: 'SL001', percent_complete: 45 },
    { patient_id: 'DT002', percent_complete: 0 },
    { patient_id: 'EW003', percent_complete: 100 },
    { patient_id: 'ML004', percent_complete: 15 }
  ],
  Results: [
    { patient_id: 'SL001', status: 'pending' },
    { patient_id: 'DT002', status: 'pending' },
    { patient_id: 'EW003', status: 'available' },
    { patient_id: 'ML004', status: 'pending' }
  ]
};

const subscribers: Record<string, Function[]> = {};

function triggerSubscribers(table: string) {
  if (subscribers[table]) {
    subscribers[table].forEach(cb => cb({}));
  }
}

export const supabase = {
  from(tableName: string) {
    const tableData = tables[tableName as keyof typeof tables] || [];
    return {
      async upsert(data: any, options?: any) {
        const idKey = tableName === 'Patient' ? 'patient_id' 
                    : tableName === 'Appointment' ? 'appointment_id' 
                    : tableName === 'ReminderPreference' ? 'reminder_id' 
                    : tableName === 'NotificationHistory' ? 'notification_id'
                    : tableName === 'Referral' ? 'referral_id'
                    : 'patient_id';
        const rows = Array.isArray(data) ? data : [data];
        for (const row of rows) {
          const idx = tableData.findIndex((r: any) => r[idKey] === row[idKey]);
          if (idx !== -1) {
            tableData[idx] = { ...tableData[idx], ...row };
          } else {
            tableData.push(row);
          }
        }
        triggerSubscribers(tableName);
        return { data, error: null };
      },
      async insert(data: any) {
        const rows = Array.isArray(data) ? data : [data];
        for (const row of rows) {
          tableData.push(row);
        }
        triggerSubscribers(tableName);
        return { data, error: null };
      },
      update(data: any) {
        return {
          eq(column: string, value: any) {
            tableData.forEach((row: any) => {
              if (row[column] === value) {
                Object.assign(row, data);
              }
            });
            triggerSubscribers(tableName);
            return { data, error: null };
          }
        };
      },
      delete() {
        return {
          eq(column: string, value: any) {
            const index = tableData.findIndex((row: any) => row[column] === value);
            if (index !== -1) {
              tableData.splice(index, 1);
            }
            triggerSubscribers(tableName);
            return {
              neq(col2: string, val2: any) {
                // Return a structure with error property to match the expected return type
                return { data: null, error: null };
              },
              data: null,
              error: null
            };
          }
        };
      },
      async select() {
        return { data: [...tableData], error: null };
      }
    };
  },
  channel(name: string) {
    return {
      on(event: string, filter: any, callback: any) {
        const table = filter.table;
        if (!subscribers[table]) subscribers[table] = [];
        subscribers[table].push(callback);
        return this;
      },
      subscribe() {
        return this;
      }
    };
  },
  removeChannel(channel: any) {
    Object.keys(subscribers).forEach(key => {
      subscribers[key] = [];
    });
  }
};

export async function fetchPatients(): Promise<PatientRecord[]> {
  return [...tables.Patient];
}

export async function fetchAppointments(): Promise<AppointmentRecord[]> {
  return [...tables.Appointment];
}

export async function fetchReminderPreferences(): Promise<ReminderPreferenceRecord[]> {
  return [...tables.ReminderPreference];
}

export async function fetchNotificationHistory(): Promise<NotificationHistoryRecord[]> {
  return [...tables.NotificationHistory];
}

export async function fetchReferrals(): Promise<ReferralRecord[]> {
  return [...tables.Referral];
}

export async function fetchEducationProgress(): Promise<EducationProgressRecord[]> {
  return [...tables.EducationProgress];
}

export async function fetchResults(): Promise<ResultsRecord[]> {
  return [...tables.Results];
}
