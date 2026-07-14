import React, { useState } from 'react';
import { 
  PatientRecord, 
  AppointmentRecord, 
  ReminderPreferenceRecord, 
  NotificationHistoryRecord, 
  ReferralRecord,
  EducationProgressRecord,
  ResultsRecord,
  DBQueryLog 
} from '../types';
import { 
  Database, Table, Terminal, Server, ArrowRight, Info, Check, AlertCircle, FileText, Calendar, Bell, Users
} from 'lucide-react';

interface DatabaseViewerProps {
  patients: PatientRecord[];
  appointments: AppointmentRecord[];
  reminderPreferences: ReminderPreferenceRecord[];
  notificationHistory: NotificationHistoryRecord[];
  referrals: ReferralRecord[];
  educationProgress: EducationProgressRecord[];
  results: ResultsRecord[];
  queryLogs: DBQueryLog[];
}

export default function DatabaseViewer({
  patients,
  appointments,
  reminderPreferences,
  notificationHistory,
  referrals,
  educationProgress,
  results,
  queryLogs
}: DatabaseViewerProps) {
  const [activeTab, setActiveTab] = useState<'tables' | 'schema' | 'logs'>('tables');
  const [selectedTable, setSelectedTable] = useState<'patient' | 'appointment' | 'reminder' | 'history' | 'referral' | 'education' | 'results'>('patient');

  // Schema DDL Definitions
  const schemaDDL = {
    patient: `CREATE TABLE Patient (
  patient_id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT,
  occupation VARCHAR(100),
  contact_details VARCHAR(150) NOT NULL
);`,
    appointment: `CREATE TABLE Appointment (
  appointment_id VARCHAR(50) PRIMARY KEY,
  patient_id VARCHAR(50) REFERENCES Patient(patient_id),
  appointment_date VARCHAR(50) NOT NULL,
  appointment_time VARCHAR(20) NOT NULL,
  clinic VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending' | 'booked' | 'confirmed' | 'completed' | 'cancelled' | 'missed'
  attendance VARCHAR(20),               -- 'attended' | 'missed'
  calendar_added BOOLEAN DEFAULT FALSE
);`,
    reminder: `CREATE TABLE ReminderPreference (
  reminder_id VARCHAR(50) PRIMARY KEY,
  patient_id VARCHAR(50) REFERENCES Patient(patient_id),
  enabled BOOLEAN DEFAULT TRUE,
  notification_channel VARCHAR(20),     -- 'push' | 'sms' | 'both'
  frequency VARCHAR(50),                -- 'monthly' | '2_weeks' | '1_week' | '1_day' | 'custom'
  next_notification_date VARCHAR(50)
);`,
    history: `CREATE TABLE NotificationHistory (
  notification_id VARCHAR(50) PRIMARY KEY,
  patient_id VARCHAR(50) REFERENCES Patient(patient_id),
  appointment_id VARCHAR(50) REFERENCES Appointment(appointment_id),
  sent_date VARCHAR(50) NOT NULL,
  opened_status VARCHAR(20) DEFAULT 'sent',  -- 'sent' | 'opened'
  action_taken VARCHAR(50) DEFAULT 'none'    -- 'none' | 'confirmed' | 'rescheduled' | 'education_viewed'
);`,
    referral: `CREATE TABLE Referral (
  referral_id VARCHAR(50) PRIMARY KEY,
  patient_id VARCHAR(50) REFERENCES Patient(patient_id),
  referral_type VARCHAR(50) NOT NULL, -- 'cascade_screening' | 'clinical_suspicion' | 'clinical_referral'
  status VARCHAR(20) DEFAULT 'referral_received' -- 'referral_received' | 'active' | 'completed'
);`,
    education: `CREATE TABLE EducationProgress (
  patient_id VARCHAR(50) PRIMARY KEY REFERENCES Patient(patient_id),
  percent_complete INT DEFAULT 0
);`,
    results: `CREATE TABLE Results (
  patient_id VARCHAR(50) PRIMARY KEY REFERENCES Patient(patient_id),
  status VARCHAR(20) DEFAULT 'pending' -- 'pending' | 'available'
);`
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono">Confirmed</span>;
      case 'booked':
        return <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono">Booked</span>;
      case 'pending':
        return <span className="bg-amber-950 text-amber-400 border border-amber-800 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono">Pending</span>;
      case 'completed':
        return <span className="bg-blue-950 text-blue-400 border border-blue-800 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono font-mono">Completed</span>;
      default:
        return <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded-md font-mono">{status}</span>;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'confirmed':
        return <span className="bg-emerald-950 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-mono">CONFIRMED</span>;
      case 'rescheduled':
        return <span className="bg-amber-950 text-amber-400 text-[10px] px-2 py-0.5 rounded font-mono">RESCHEDULED</span>;
      case 'education_viewed':
        return <span className="bg-blue-950 text-blue-400 text-[10px] px-2 py-0.5 rounded font-mono">LEARN_VIEWED</span>;
      case 'none':
      default:
        return <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded font-mono">NONE</span>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* DB Viewer Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-400" />
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-300">Live Database Engine</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/80 px-2 py-1 rounded text-[11px] font-mono text-slate-300">
          <Server className="w-3.5 h-3.5 text-emerald-400" />
          <span>Local Relational Engine</span>
        </div>
      </div>

      {/* Database Tabs */}
      <div className="bg-slate-950 px-4 py-2 flex gap-1 border-b border-slate-800/80 shrink-0">
        <button
          onClick={() => setActiveTab('tables')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'tables'
              ? 'bg-emerald-600 text-white shadow-md font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Table className="w-3.5 h-3.5" /> Tables
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'schema'
              ? 'bg-emerald-600 text-white shadow-md font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Schema (DDL)
        </button>
      </div>

      {/* Inner Screen Content */}
      <div className="flex-1 overflow-hidden flex flex-col p-4">
        
        {/* TAB 1: LIVE TABLES */}
        {activeTab === 'tables' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Table Selector Sub-tabs */}
            <div className="flex flex-wrap gap-1.5 mb-3 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80 shrink-0">
              <button
                onClick={() => setSelectedTable('patient')}
                className={`flex-1 min-w-[70px] py-1 px-1.5 text-center rounded-lg text-[10px] font-mono transition-all ${
                  selectedTable === 'patient'
                    ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Patient ({patients.length})
              </button>
              <button
                onClick={() => setSelectedTable('appointment')}
                className={`flex-1 min-w-[70px] py-1 px-1.5 text-center rounded-lg text-[10px] font-mono transition-all ${
                  selectedTable === 'appointment'
                    ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Appt ({appointments.length})
              </button>
              <button
                onClick={() => setSelectedTable('reminder')}
                className={`flex-1 min-w-[80px] py-1 px-1.5 text-center rounded-lg text-[10px] font-mono transition-all ${
                  selectedTable === 'reminder'
                    ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Reminder ({reminderPreferences.length})
              </button>
              <button
                onClick={() => setSelectedTable('history')}
                className={`flex-1 min-w-[70px] py-1 px-1.5 text-center rounded-lg text-[10px] font-mono transition-all ${
                  selectedTable === 'history'
                    ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                History ({notificationHistory.length})
              </button>
              <button
                onClick={() => setSelectedTable('referral')}
                className={`flex-1 min-w-[85px] py-1 px-1.5 text-center rounded-lg text-[10px] font-mono transition-all ${
                  selectedTable === 'referral'
                    ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Referral ({referrals.length})
              </button>
              <button
                onClick={() => setSelectedTable('education')}
                className={`flex-1 min-w-[70px] py-1 px-1.5 text-center rounded-lg text-[10px] font-mono transition-all ${
                  selectedTable === 'education'
                    ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Edu ({educationProgress.length})
              </button>
              <button
                onClick={() => setSelectedTable('results')}
                className={`flex-1 min-w-[70px] py-1 px-1.5 text-center rounded-lg text-[10px] font-mono transition-all ${
                  selectedTable === 'results'
                    ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Result ({results.length})
              </button>
            </div>

            {/* Selected Table Grid/Viewer */}
            <div className="flex-1 overflow-auto border border-slate-800 rounded-xl bg-slate-950">
              {selectedTable === 'patient' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono text-[9px] tracking-wider">
                      <th className="p-3">patient_id (PK)</th>
                      <th className="p-3">name</th>
                      <th className="p-3">contact_details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((r) => (
                      <tr key={r.patient_id} className="border-b border-slate-900 hover:bg-slate-900/40 font-mono text-[11px] transition-colors">
                        <td className="p-3 text-emerald-400 font-semibold">{r.patient_id}</td>
                        <td className="p-3 text-slate-200">{r.name}</td>
                        <td className="p-3 text-slate-400">{r.contact_details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedTable === 'appointment' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono text-[9px] tracking-wider">
                      <th className="p-3">appt_id (PK)</th>
                      <th className="p-3">patient_id (FK)</th>
                      <th className="p-3">date</th>
                      <th className="p-3">time</th>
                      <th className="p-3">clinic</th>
                      <th className="p-3">status</th>
                      <th className="p-3">cal_added</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((r) => (
                      <tr key={r.appointment_id} className="border-b border-slate-900 hover:bg-slate-900/40 font-mono text-[11px] transition-colors">
                        <td className="p-3 text-emerald-400 font-semibold">{r.appointment_id}</td>
                        <td className="p-3 text-slate-400">{r.patient_id}</td>
                        <td className="p-3 text-slate-200">{r.appointment_date}</td>
                        <td className="p-3 text-slate-200">{r.appointment_time}</td>
                        <td className="p-3 text-slate-400 truncate max-w-[120px]" title={r.clinic}>{r.clinic}</td>
                        <td className="p-3">{getStatusBadge(r.status)}</td>
                        <td className="p-3">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            r.calendar_added 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' 
                              : 'bg-slate-800 text-slate-500'
                          }`}>
                            {r.calendar_added ? 'TRUE' : 'FALSE'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedTable === 'reminder' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono text-[9px] tracking-wider">
                      <th className="p-3">rem_id (PK)</th>
                      <th className="p-3">pat_id (FK)</th>
                      <th className="p-3">enabled</th>
                      <th className="p-3">channel</th>
                      <th className="p-3">frequency</th>
                      <th className="p-3">next_date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reminderPreferences.map((r) => (
                      <tr key={r.reminder_id} className="border-b border-slate-900 hover:bg-slate-900/40 font-mono text-[11px] transition-colors">
                        <td className="p-3 text-emerald-400 font-semibold">{r.reminder_id}</td>
                        <td className="p-3 text-slate-400">{r.patient_id}</td>
                        <td className="p-3">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            r.enabled 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' 
                              : 'bg-rose-950 text-rose-400 border border-rose-900'
                          }`}>
                            {r.enabled ? 'TRUE' : 'FALSE'}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                            {r.notification_channel}
                          </span>
                        </td>
                        <td className="p-3 text-slate-200 capitalize">{r.frequency.replace('_', ' ')}</td>
                        <td className="p-3 text-slate-400">{r.next_notification_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedTable === 'history' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono text-[9px] tracking-wider">
                      <th className="p-3">notif_id (PK)</th>
                      <th className="p-3">patient_id (FK)</th>
                      <th className="p-3">appt_id (FK)</th>
                      <th className="p-3">sent_date</th>
                      <th className="p-3">status</th>
                      <th className="p-3">action_taken</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notificationHistory.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-slate-500 italic">No notifications generated yet. Change preferences and hit "Trigger Push Notification" to fire alerts!</td>
                      </tr>
                    ) : (
                      notificationHistory.map((r) => (
                        <tr key={r.notification_id} className="border-b border-slate-900 hover:bg-slate-900/40 font-mono text-[11px] transition-colors">
                          <td className="p-3 text-emerald-400 font-semibold">{r.notification_id}</td>
                          <td className="p-3 text-slate-400">{r.patient_id}</td>
                          <td className="p-3 text-slate-400">{r.appointment_id}</td>
                          <td className="p-3 text-slate-200">{r.sent_date}</td>
                          <td className="p-3">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              r.opened_status === 'opened' 
                                ? 'bg-emerald-950 text-emerald-400' 
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {r.opened_status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3">{getActionBadge(r.action_taken)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {selectedTable === 'referral' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono text-[9px] tracking-wider">
                      <th className="p-3">referral_id (PK)</th>
                      <th className="p-3">patient_id (FK)</th>
                      <th className="p-3">referral_type</th>
                      <th className="p-3">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-slate-500 italic">No referrals in the database.</td>
                      </tr>
                    ) : (
                      referrals.map((r) => (
                        <tr key={r.referral_id} className="border-b border-slate-900 hover:bg-slate-900/40 font-mono text-[11px] transition-colors">
                          <td className="p-3 text-emerald-400 font-semibold">{r.referral_id}</td>
                          <td className="p-3 text-slate-400">{r.patient_id}</td>
                          <td className="p-3 text-slate-200">{r.referral_type}</td>
                          <td className="p-3">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              r.status === 'completed' 
                                ? 'bg-emerald-950 text-emerald-400' 
                                : r.status === 'active' 
                                ? 'bg-blue-950 text-blue-400'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {r.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {selectedTable === 'education' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono text-[9px] tracking-wider">
                      <th className="p-3">patient_id (PK/FK)</th>
                      <th className="p-3">percent_complete</th>
                      <th className="p-3">progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {educationProgress.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="p-4 text-center text-slate-500 italic">No education progress recorded.</td>
                      </tr>
                    ) : (
                      educationProgress.map((e) => (
                        <tr key={e.patient_id} className="border-b border-slate-900 hover:bg-slate-900/40 font-mono text-[11px] transition-colors">
                          <td className="p-3 text-emerald-400 font-semibold">{e.patient_id}</td>
                          <td className="p-3 text-slate-200 font-bold">{e.percent_complete}%</td>
                          <td className="p-3 w-48">
                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${e.percent_complete}%` }} />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {selectedTable === 'results' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono text-[9px] tracking-wider">
                      <th className="p-3">patient_id (PK/FK)</th>
                      <th className="p-3">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="p-4 text-center text-slate-500 italic">No results generated yet.</td>
                      </tr>
                    ) : (
                      results.map((r) => (
                        <tr key={r.patient_id} className="border-b border-slate-900 hover:bg-slate-900/40 font-mono text-[11px] transition-colors">
                          <td className="p-3 text-emerald-400 font-semibold">{r.patient_id}</td>
                          <td className="p-3">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              r.status === 'available' 
                                ? 'bg-emerald-950 text-emerald-400' 
                                : 'bg-amber-950 text-amber-400'
                            }`}>
                              {r.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>

            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-3 mt-3 flex items-start gap-2 text-xs">
              <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-slate-400 leading-normal">
                These records correspond directly to the database state. Interact with the **Phone Simulator** on the left to trigger SQL transactions (Booking, Setting preferences, Adding to calendars, Confirming attendance).
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: SCHEMA (DDL) */}
        {activeTab === 'schema' && (
          <div className="flex-1 flex flex-col overflow-hidden space-y-4">
            
            {/* Minimal ER Diagram Visual */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 shrink-0">
              <p className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider mb-2">Database Schema ER Map</p>
              <div className="flex flex-wrap justify-between items-center gap-2 text-[11px] font-mono">
                <div className="bg-slate-900 border border-emerald-800/40 p-2 rounded-lg flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold text-emerald-300">Patient</span>
                  <span className="text-[9px] text-slate-500">(patient_id)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-700" />
                <div className="bg-slate-900 border border-emerald-800/40 p-2 rounded-lg flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold text-emerald-300">Appointment</span>
                  <span className="text-[9px] text-slate-500">(appt_id)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-700" />
                <div className="bg-slate-900 border border-emerald-800/40 p-2 rounded-lg flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold text-emerald-300">RemPreferences</span>
                  <span className="text-[9px] text-slate-500">(rem_id)</span>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-2 text-[11px] font-mono">
                <div className="bg-slate-900 border border-emerald-800/40 p-2 rounded-lg">
                  <span className="font-bold text-emerald-300">NotificationHistory</span>
                  <span className="text-[9px] text-slate-500"> (notif_id, FK)</span>
                </div>
                <div className="bg-slate-900 border border-emerald-800/40 p-2 rounded-lg">
                  <span className="font-bold text-emerald-300">Referral</span>
                  <span className="text-[9px] text-slate-500"> (referral_id, FK)</span>
                </div>
                <div className="bg-slate-900 border border-emerald-800/40 p-2 rounded-lg">
                  <span className="font-bold text-emerald-300">EducationProgress</span>
                  <span className="text-[9px] text-slate-500"> (pat_id, FK)</span>
                </div>
                <div className="bg-slate-900 border border-emerald-800/40 p-2 rounded-lg">
                  <span className="font-bold text-emerald-300">Results</span>
                  <span className="text-[9px] text-slate-500"> (pat_id, FK)</span>
                </div>
              </div>
            </div>

            {/* Raw DDL Definitions */}
            <div className="flex-1 overflow-y-auto space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 scrollbar-none">
              <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-1.5 mb-3">PostgreSQL DDL Statements</h4>
              
              <div>
                <p className="text-emerald-500/80 font-bold mb-1">-- Table 1: Patient Details</p>
                <pre className="bg-slate-900 p-2 rounded border border-slate-800 text-[11px] text-slate-300 leading-normal overflow-x-auto whitespace-pre">
                  {schemaDDL.patient}
                </pre>
              </div>

              <div>
                <p className="text-emerald-500/80 font-bold mb-1 mt-3">-- Table 2: Clinical Genetic Appointments</p>
                <pre className="bg-slate-900 p-2 rounded border border-slate-800 text-[11px] text-slate-300 leading-normal overflow-x-auto whitespace-pre">
                  {schemaDDL.appointment}
                </pre>
              </div>

              <div>
                <p className="text-emerald-500/80 font-bold mb-1 mt-3">-- Table 3: Patient Reminder Settings</p>
                <pre className="bg-slate-900 p-2 rounded border border-slate-800 text-[11px] text-slate-300 leading-normal overflow-x-auto whitespace-pre">
                  {schemaDDL.reminder}
                </pre>
              </div>

              <div>
                <p className="text-emerald-500/80 font-bold mb-1 mt-3">-- Table 4: Audit Notification History</p>
                <pre className="bg-slate-900 p-2 rounded border border-slate-800 text-[11px] text-slate-300 leading-normal overflow-x-auto whitespace-pre">
                  {schemaDDL.history}
                </pre>
              </div>

              <div>
                <p className="text-emerald-500/80 font-bold mb-1 mt-3">-- Table 5: Genetic Referral Status</p>
                <pre className="bg-slate-900 p-2 rounded border border-slate-800 text-[11px] text-slate-300 leading-normal overflow-x-auto whitespace-pre">
                  {schemaDDL.referral}
                </pre>
              </div>

              <div>
                <p className="text-emerald-500/80 font-bold mb-1 mt-3">-- Table 6: Interactive Education Progress</p>
                <pre className="bg-slate-900 p-2 rounded border border-slate-800 text-[11px] text-slate-300 leading-normal overflow-x-auto whitespace-pre">
                  {schemaDDL.education}
                </pre>
              </div>

              <div>
                <p className="text-emerald-500/80 font-bold mb-1 mt-3">-- Table 7: Diagnostic Genetic Results</p>
                <pre className="bg-slate-900 p-2 rounded border border-slate-800 text-[11px] text-slate-300 leading-normal overflow-x-auto whitespace-pre">
                  {schemaDDL.results}
                </pre>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer Database Indicator */}
      <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 font-mono shrink-0">
        <div className="flex items-center gap-1">
          <Terminal className="w-3.5 h-3.5 text-emerald-500" />
          <span>Local Engine Active (Query log count: {queryLogs.length})</span>
        </div>
        <span>SQL/DML Compliance OK</span>
      </div>
    </div>
  );
}
