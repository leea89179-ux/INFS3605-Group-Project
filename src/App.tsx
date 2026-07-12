import React, { useState } from 'react';
import { 
  ScreenId, 
  Appointment, 
  ReminderPreferences,
  PatientRecord,
  AppointmentRecord,
  ReminderPreferenceRecord,
  NotificationHistoryRecord,
  DBQueryLog
} from './types';
import PhoneSimulator from './components/PhoneSimulator';
import AnnotationsPanel from './components/AnnotationsPanel';
import DatabaseViewer from './components/DatabaseViewer';
import Chatbot from './components/Chatbot';
import { 
  HeartPulse, Compass, Settings, Layers, Users, BookOpen, 
  Sparkles, Smartphone, CircleCheck, ShieldAlert, Undo, 
  Calendar, Check, ArrowRight, HelpCircle, Database
} from 'lucide-react';

export default function App() {
  // Global Shared States for the Figma Prototype
  const [activeScreen, setActiveScreen] = useState<ScreenId>(ScreenId.Home);
  const [isFHReferred, setIsFHReferred] = useState<boolean>(true);
  const [rightPanelTab, setRightPanelTab] = useState<'annotations' | 'database'>('database');
  
  // Feature 6: Relational Database Tables State
  const [patientTable, setPatientTable] = useState<PatientRecord[]>([
    { patient_id: 'LH321', name: 'Lisa Ho', contact_details: '+65 9123 4567' }
  ]);

  const [appointmentTable, setAppointmentTable] = useState<AppointmentRecord[]>([
    {
      appointment_id: 'APT101',
      patient_id: 'LH321',
      appointment_date: '22 July 2026',
      appointment_time: '10:30 AM',
      clinic: 'National University Hospital Genetic Clinic',
      status: 'pending',
      calendar_added: false,
    }
  ]);

  const [reminderPrefTable, setReminderPrefTable] = useState<ReminderPreferenceRecord[]>([
    {
      reminder_id: 'REM201',
      patient_id: 'LH321',
      enabled: true,
      notification_channel: 'both',
      frequency: '1_week',
      next_notification_date: '15 July 2026',
    }
  ]);

  const [notificationHistoryTable, setNotificationHistoryTable] = useState<NotificationHistoryRecord[]>([
    {
      notification_id: 'NOT501',
      patient_id: 'LH321',
      appointment_id: 'APT101',
      sent_date: '15 July 2026',
      opened_status: 'sent',
      action_taken: 'none',
    }
  ]);

  // SQL rolling log stream (Feature 6)
  const [queryLogs, setQueryLogs] = useState<DBQueryLog[]>([
    {
      timestamp: '12:35:01',
      query: 'CREATE TABLE Patient (\n  patient_id VARCHAR(50) PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  contact_details VARCHAR(150) NOT NULL\n);',
      type: 'DDL'
    },
    {
      timestamp: '12:35:02',
      query: 'CREATE TABLE Appointment (\n  appointment_id VARCHAR(50) PRIMARY KEY,\n  patient_id VARCHAR(50) REFERENCES Patient(patient_id),\n  appointment_date VARCHAR(50) NOT NULL,\n  appointment_time VARCHAR(20) NOT NULL,\n  clinic VARCHAR(100) NOT NULL,\n  status VARCHAR(20) DEFAULT \'pending\',\n  calendar_added BOOLEAN DEFAULT FALSE\n);',
      type: 'DDL'
    },
    {
      timestamp: '12:35:03',
      query: 'CREATE TABLE ReminderPreference (\n  reminder_id VARCHAR(50) PRIMARY KEY,\n  patient_id VARCHAR(50) REFERENCES Patient(patient_id),\n  enabled BOOLEAN DEFAULT TRUE,\n  notification_channel VARCHAR(20) NOT NULL,\n  frequency VARCHAR(50) DEFAULT \'monthly\',\n  next_notification_date VARCHAR(50) NOT NULL\n);',
      type: 'DDL'
    },
    {
      timestamp: '12:35:04',
      query: 'CREATE TABLE NotificationHistory (\n  notification_id VARCHAR(50) PRIMARY KEY,\n  patient_id VARCHAR(50) REFERENCES Patient(patient_id),\n  appointment_id VARCHAR(50) REFERENCES Appointment(appointment_id),\n  sent_date VARCHAR(50) NOT NULL,\n  opened_status VARCHAR(20) DEFAULT \'sent\',\n  action_taken VARCHAR(50) DEFAULT \'none\'\n);',
      type: 'DDL'
    },
    {
      timestamp: '12:35:05',
      query: 'INSERT INTO Patient VALUES (\'LH321\', \'Lisa Ho\', \'+65 9123 4567\');',
      type: 'INSERT'
    },
    {
      timestamp: '12:35:06',
      query: 'INSERT INTO Appointment VALUES (\'APT101\', \'LH321\', \'22 July 2026\', \'10:30 AM\', \'National University Hospital Genetic Clinic\', \'pending\', FALSE);',
      type: 'INSERT'
    },
    {
      timestamp: '12:35:07',
      query: 'INSERT INTO ReminderPreference VALUES (\'REM201\', \'LH321\', TRUE, \'both\', \'1_week\', \'15 July 2026\\);',
      type: 'INSERT'
    },
    {
      timestamp: '12:35:08',
      query: 'INSERT INTO NotificationHistory VALUES (\'NOT501\', \'LH321\', \'APT101\', \'15 July 2026\', \'sent\', \'none\');',
      type: 'INSERT'
    }
  ]);

  // Sync state helpers
  const logSQL = (query: string, type: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'DDL') => {
    const now = new Date();
    const pad = (num: number) => String(num).padStart(2, '0');
    const timestamp = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setQueryLogs(prev => [...prev, { timestamp, query, type }]);
  };

  // Maps relational appointment back to simple state required by phone components
  const activeAppointment: Appointment = {
    date: appointmentTable[0]?.appointment_date || '22 July 2026',
    timeSlot: appointmentTable[0]?.appointment_time || '10:30 AM',
    clinic: appointmentTable[0]?.clinic || 'National University Hospital Genetic Clinic',
    status: appointmentTable[0]?.status || 'pending',
  };

  const activeReminderPrefs: ReminderPreferences = {
    enabled: reminderPrefTable[0]?.enabled ?? true,
    channel: reminderPrefTable[0]?.notification_channel || 'both',
    frequency: reminderPrefTable[0]?.frequency || '1_week',
    previewText: 'Your FH Genetic Testing appointment is in 7 days.\nPlease confirm your attendance or reschedule if needed.',
  };

  // Relational SQL Database Transactions
  const handleBookingTransaction = (date: string, time: string, clinic: string) => {
    setAppointmentTable(prev => prev.map(apt => 
      apt.appointment_id === 'APT101' 
        ? { ...apt, appointment_date: date, appointment_time: time, clinic, status: 'booked' }
        : apt
    ));

    logSQL(
      `UPDATE Appointment\nSET status = 'booked',\n    appointment_date = '${date}',\n    appointment_time = '${time}',\n    clinic = '${clinic}'\nWHERE appointment_id = 'APT101';`,
      'UPDATE'
    );
  };

  const handleCalendarAddedTransaction = () => {
    setAppointmentTable(prev => prev.map(apt => 
      apt.appointment_id === 'APT101' ? { ...apt, calendar_added: true } : apt
    ));

    logSQL(
      `UPDATE Appointment\nSET calendar_added = TRUE\nWHERE appointment_id = 'APT101';`,
      'UPDATE'
    );
  };

  const handleReminderPrefsTransaction = (enabled: boolean, channel: 'sms' | 'push' | 'both', frequency: 'monthly' | '2_weeks' | '1_week' | '1_day' | 'custom') => {
    setReminderPrefTable(prev => prev.map(pref => 
      pref.reminder_id === 'REM201' 
        ? { ...pref, enabled, notification_channel: channel, frequency }
        : pref
    ));

    logSQL(
      `UPDATE ReminderPreference\nSET enabled = ${enabled ? 'TRUE' : 'FALSE'},\n    notification_channel = '${channel}',\n    frequency = '${frequency}'\nWHERE patient_id = 'LH321';`,
      'UPDATE'
    );
  };

  const handleTriggerNotificationTransaction = () => {
    const nextId = `NOT${Math.floor(100 + Math.random() * 900)}`;
    const newRecord: NotificationHistoryRecord = {
      notification_id: nextId,
      patient_id: 'LH321',
      appointment_id: 'APT101',
      sent_date: '10 July 2026', // Current mock date
      opened_status: 'sent',
      action_taken: 'none'
    };

    setNotificationHistoryTable(prev => [...prev, newRecord]);
    setActiveScreen(ScreenId.NotificationMock);

    logSQL(
      `INSERT INTO NotificationHistory (\n  notification_id, patient_id, appointment_id, sent_date, opened_status, action_taken\n) VALUES (\n  '${nextId}', 'LH321', 'APT101', '10 July 2026', 'sent', 'none'\n);`,
      'INSERT'
    );
  };

  const handleNotificationActionTransaction = (action: 'confirmed' | 'rescheduled' | 'education_viewed') => {
    // 1. Update appointment table state if confirmed
    if (action === 'confirmed') {
      setAppointmentTable(prev => prev.map(apt => 
        apt.appointment_id === 'APT101' ? { ...apt, status: 'confirmed' } : apt
      ));
      logSQL(
        `UPDATE Appointment\nSET status = 'confirmed'\nWHERE appointment_id = 'APT101';`,
        'UPDATE'
      );
    } else if (action === 'rescheduled') {
      setAppointmentTable(prev => prev.map(apt => 
        apt.appointment_id === 'APT101' ? { ...apt, status: 'pending' } : apt
      ));
      logSQL(
        `UPDATE Appointment\nSET status = 'pending'\nWHERE appointment_id = 'APT101';`,
        'UPDATE'
      );
    }

    // 2. Update Notification History action
    setNotificationHistoryTable(prev => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      return [
        ...prev.slice(0, -1),
        { ...last, opened_status: 'opened', action_taken: action }
      ];
    });

    const lastRecordId = notificationHistoryTable[notificationHistoryTable.length - 1]?.notification_id || 'NOT501';
    logSQL(
      `UPDATE NotificationHistory\nSET opened_status = 'opened',\n    action_taken = '${action}'\nWHERE notification_id = '${lastRecordId}';`,
      'UPDATE'
    );
  };

  // Controller Actions (Fast-forward Simulator States)
  const handleSimulateReset = () => {
    setAppointmentTable([
      {
        appointment_id: 'APT101',
        patient_id: 'LH321',
        appointment_date: '22 July 2026',
        appointment_time: '10:30 AM',
        clinic: 'National University Hospital Genetic Clinic',
        status: 'pending',
        calendar_added: false,
      }
    ]);
    
    setReminderPrefTable([
      {
        reminder_id: 'REM201',
        patient_id: 'LH321',
        enabled: true,
        notification_channel: 'both',
        frequency: '1_week',
        next_notification_date: '15 July 2026',
      }
    ]);

    setNotificationHistoryTable([
      {
        notification_id: 'NOT501',
        patient_id: 'LH321',
        appointment_id: 'APT101',
        sent_date: '15 July 2026',
        opened_status: 'sent',
        action_taken: 'none',
      }
    ]);

    setIsFHReferred(true);
    setActiveScreen(ScreenId.Home);

    logSQL('-- DATABASE AND APPLICATION STATE RESET', 'DDL');
    logSQL(
      "UPDATE Appointment SET status = 'pending', calendar_added = FALSE WHERE appointment_id = 'APT101';",
      'UPDATE'
    );
    logSQL(
      "UPDATE ReminderPreference SET enabled = TRUE, notification_channel = 'both', frequency = '1_week' WHERE patient_id = 'LH321';",
      'UPDATE'
    );
    logSQL(
      "DELETE FROM NotificationHistory WHERE notification_id <> 'NOT501';",
      'DELETE'
    );
  };

  const handleSimulateBooked = () => {
    handleBookingTransaction('22 July 2026', '10:30 AM', 'National University Hospital Genetic Clinic');
    setActiveScreen(ScreenId.Booking);
  };

  const handleSimulateNotification = () => {
    handleTriggerNotificationTransaction();
  };

  const handleSimulateReminders = () => {
    handleReminderPrefsTransaction(true, 'both', '1_week');
    setActiveScreen(ScreenId.ReminderSettings);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      
      {/* 1. Official Singapore GovTech Styled Header banner */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 shrink-0 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-sm font-mono">
                GovTech Singapore
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-500/20">
                HealthHub v12.4
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2 font-display">
              <HeartPulse className="w-6 h-6 text-emerald-500 shrink-0" />
              FH Genetic Referral Compliance Prototype
            </h1>
            <p className="text-xs text-slate-400">
              Interactive wireframes & UX specifications to reduce patient drop-off after clinical genetics referrals.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap gap-2">
            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-center">
              <p className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Subsidies</p>
              <p className="text-xs font-bold text-emerald-400">Up to 75% MOH</p>
            </div>
            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-center">
              <p className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Elderly UX</p>
              <p className="text-xs font-bold text-emerald-400">44px Targets</p>
            </div>
            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-center">
              <p className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">LIA Protection</p>
              <p className="text-xs font-bold text-emerald-400">No Premium Impact</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN (Lg: 4/12) - Prototype Simulation Control & AI Chatbot */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Box 1: Interactive State Controller */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
            <div>
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-500" />
                Prototype Controller
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fast-forward the clinical journey to test specific behavioral triggers:
              </p>
            </div>

            {/* Referral Status Toggle */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-300">FH Referral Status</span>
                <span className={`text-[10px] px-2.5 py-0.5 rounded font-mono font-bold ${
                  isFHReferred 
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50' 
                    : 'bg-rose-950/40 text-rose-400 border border-rose-900/30'
                }`}>
                  {isFHReferred ? 'REFERRED' : 'NON-REFERRED'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsFHReferred(true);
                    setActiveScreen(ScreenId.Home);
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    isFHReferred
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" /> Referred
                </button>
                <button
                  onClick={() => {
                    setIsFHReferred(false);
                    setActiveScreen(ScreenId.Home);
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    !isFHReferred
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-900/30'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" /> Non-Referred
                </button>
              </div>
              <p className="text-[10px] text-slate-500 leading-snug">
                Toggle to simulate referred vs non-referred view. Non-referred patients do not see any FH-related reminders, tabs, banners, or educational modules.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              {/* Reset to initial */}
              <button
                onClick={handleSimulateReset}
                className="w-full py-2.5 px-3 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 hover:border-slate-700 transition flex items-center justify-between font-medium group"
              >
                <span className="flex items-center gap-2">
                  <Undo className="w-3.5 h-3.5 text-slate-400" />
                  1. Referral Active (Reset)
                </span>
                <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded font-mono group-hover:text-slate-300">
                  Unbooked
                </span>
              </button>

              {/* Complete Booking */}
              <button
                onClick={handleSimulateBooked}
                className="w-full py-2.5 px-3 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 hover:border-slate-700 transition flex items-center justify-between font-medium group"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                  2. Booked Confirmation
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded font-mono">
                  Booked
                </span>
              </button>

              {/* Toggle Reminders */}
              <button
                onClick={handleSimulateReminders}
                className="w-full py-2.5 px-3 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 hover:border-slate-700 transition flex items-center justify-between font-medium group"
              >
                <span className="flex items-center gap-2">
                  <Settings className="w-3.5 h-3.5 text-amber-500" />
                  3. Customize Reminders
                </span>
                <span className="text-[10px] text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded font-mono">
                  Settings
                </span>
              </button>

              {/* Trigger Notification */}
              <button
                onClick={handleSimulateNotification}
                className="w-full py-2.5 px-3 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 hover:border-slate-700 transition flex items-center justify-between font-medium group"
              >
                <span className="flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  4. Lockscreen Notification
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded font-mono">
                  7-Day Countdown
                </span>
              </button>
            </div>

            {/* Quick Informational Box on the Clinical Journey */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-2 text-xs">
              <h4 className="font-bold text-slate-300 flex items-center gap-1.5">
                <CircleCheck className="w-4 h-4 text-[#00a859]" />
                Compliance Journey Summary
              </h4>
              <p className="text-slate-400 leading-normal text-[11px]">
                Patients are immediately notified upon cardiac referral. Subsidies, checklist reminders, and single-screen booking are served progressively to counter clinic exit friction.
              </p>
            </div>
          </div>

          {/* Box 2: HealthBuddy Interactive Chatbot */}
          <div className="h-[370px]">
            <Chatbot />
          </div>

        </div>

        {/* MIDDLE COLUMN (Lg: 4/12) - High Fidelity Mobile Device Simulator */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-3">
          
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest font-mono text-slate-500">Live Interactive Mockup</span>
            <p className="text-xs text-emerald-400 font-semibold">Click any element inside the device to test flows</p>
          </div>

          <PhoneSimulator
            activeScreen={activeScreen}
            onChangeScreen={setActiveScreen}
            appointment={activeAppointment}
            onBookAppointment={handleBookingTransaction}
            onAddCalendarEvent={handleCalendarAddedTransaction}
            reminderPrefs={activeReminderPrefs}
            onUpdateReminderPrefs={handleReminderPrefsTransaction}
            onTriggerNotification={handleSimulateNotification}
            onNotificationAction={handleNotificationActionTransaction}
            isFHReferred={isFHReferred}
          />

          <div className="bg-slate-900/60 border border-slate-800/80 px-4 py-2 rounded-xl text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
            <span>Figma Component: HealthHub_Simulator_iOS</span>
          </div>

        </div>

        {/* RIGHT COLUMN (Lg: 4/12) - Integrated Annotations or Database Panel */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          
          {/* Column Tab Selector */}
          <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800/80 flex gap-2 shrink-0">
            <button
              onClick={() => setRightPanelTab('database')}
              className={`flex-1 py-2 px-3 text-center rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
                rightPanelTab === 'database'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Database className="w-4 h-4" /> Live Database (F6)
            </button>
            <button
              onClick={() => setRightPanelTab('annotations')}
              className={`flex-1 py-2 px-3 text-center rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
                rightPanelTab === 'annotations'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" /> Figma UX Spec
            </button>
          </div>

          {/* Right Panel Main View */}
          <div className="flex-1 min-h-[580px] lg:h-[630px]">
            {rightPanelTab === 'database' ? (
              <DatabaseViewer 
                patients={patientTable}
                appointments={appointmentTable}
                reminderPreferences={reminderPrefTable}
                notificationHistory={notificationHistoryTable}
                queryLogs={queryLogs}
              />
            ) : (
              <div className="space-y-6 h-full overflow-y-auto pr-1">
                <div className="h-[550px]">
                  <AnnotationsPanel 
                    activeScreen={activeScreen} 
                    onSelectScreen={setActiveScreen} 
                  />
                </div>

                {/* Additional UX Strategy Box */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-3 shrink-0">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    Prevention of Patient Leakage
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    GovTech's review highlights that clinic referrals leak due to <strong>cognitive latency</strong> and <strong>administrative drag</strong>. By integrating the educational cards directly into the booking journey, reassurance on subsidies (MediSave) and insurance (LIA moratorium) is delivered <em>before</em> the patient leaves the digital frame.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </main>

      {/* 3. Global Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 px-6 text-center text-xs text-slate-500 space-y-2 mt-auto shrink-0 font-mono">
        <p>© 2026 Government Technology Agency (GovTech), Singapore. All rights reserved.</p>
        <p className="text-[11px] text-slate-600">
          Developed in compliance with the Ministry of Health (MOH) Singapore clinical directives.
        </p>
      </footer>

    </div>
  );
}
