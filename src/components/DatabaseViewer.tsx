import React, { useState } from 'react';
import { 
  PatientRecord, 
  AppointmentRecord, 
  ReminderPreferenceRecord, 
  NotificationHistoryRecord, 
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
  queryLogs: DBQueryLog[];
}

export default function DatabaseViewer({
  patients,
  appointments,
  reminderPreferences,
  notificationHistory,
  queryLogs
}: DatabaseViewerProps) {
  const [activeTab, setActiveTab] = useState<'tables' | 'schema' | 'logs'>('tables');
  const [selectedTable, setSelectedTable] = useState<'patient' | 'appointment' | 'reminder' | 'history'>('patient');

  // Schema DDL Definitions
  const schemaDDL = {
    patient: `CREATE TABLE Patient (
  patient_id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  contact_details VARCHAR(150) NOT NULL
);`,
    appointment: `CREATE TABLE Appointment (
  appointment_id VARCHAR(50) PRIMARY KEY,
  patient_id VARCHAR(50) REFERENCES Patient(patient_id),
  appointment_date VARCHAR(50) NOT NULL,
  appointment_time VARCHAR(20) NOT NULL,
  clinic VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending' | 'booked' | 'confirmed' | 'completed'
  calendar_added BOOLEAN DEFAULT FALSE
);`,
    reminder: `CREATE TABLE ReminderPreference (
  reminder_id VARCHAR(50) PRIMARY KEY,
  patient_id VARCHAR(50) REFERENCES Patient(patient_id),
  enabled BOOLEAN DEFAULT TRUE,
  notification_channel VARCHAR(20) NOT NULL, -- 'push' | 'sms' | 'both'
  frequency VARCHAR(50) DEFAULT 'monthly',    -- 'monthly' | '2_weeks' | '1_week' | '1_day' | 'custom'
  next_notification_date VARCHAR(50) NOT NULL
);`,
    history: `CREATE TABLE NotificationHistory (
  notification_id VARCHAR(50) PRIMARY KEY,
  patient_id VARCHAR(50) REFERENCES Patient(patient_id),
  appointment_id VARCHAR(50) REFERENCES Appointment(appointment_id),
  sent_date VARCHAR(50) NOT NULL,
  opened_status VARCHAR(20) DEFAULT 'sent',  -- 'sent' | 'opened'
  action_taken VARCHAR(50) DEFAULT 'none'    -- 'none' | 'confirmed' | 'rescheduled' | 'education_viewed'
);`
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono">Confirmed</span>;
      case 'booked':
        return <span className="bg-teal-950 text-teal-400 border border-teal-800 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono">Booked</span>;
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
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-teal-400" />
          <span className="text-xs uppercase font-mono tracking-widest text-teal-300">Live Database Engine</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/80 px-2 py-1 rounded text-[11px] font-mono text-slate-300">
          <Server className="w-3.5 h-3.5 text-teal-400" />
          <span>Local Relational Engine</span>
        </div>
      </div>

      {/* Database Tabs */}
      <div className="bg-slate-950 px-4 py-2 flex gap-1 border-b border-slate-800/80 shrink-0">
        <button
          onClick={() => setActiveTab('tables')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'tables'
              ? 'bg-teal-600 text-white shadow-md font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Table className="w-3.5 h-3.5" /> Tables
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'schema'
              ? 'bg-teal-600 text-white shadow-md font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Schema (DDL)
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'logs'
              ? 'bg-teal-600 text-white shadow-md font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 animate-pulse" /> SQL Log Console
        </button>
      </div>

      {/* Inner Screen Content */}
      <div className="flex-1 overflow-hidden flex flex-col p-4">
        
        {/* TAB 1: LIVE TABLES */}
        {activeTab === 'tables' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Table Selector Sub-tabs */}
            <div className="flex gap-2 mb-3 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80 shrink-0">
              <button
                onClick={() => setSelectedTable('patient')}
                className={`flex-1 py-1 px-2 text-center rounded-lg text-[11px] font-mono transition-all ${
                  selectedTable === 'patient'
                    ? 'bg-slate-800 text-teal-400 font-bold border border-teal-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Patient ({patients.length})
              </button>
              <button
                onClick={() => setSelectedTable('appointment')}
                className={`flex-1 py-1 px-2 text-center rounded-lg text-[11px] font-mono transition-all ${
                  selectedTable === 'appointment'
                    ? 'bg-slate-800 text-teal-400 font-bold border border-teal-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Appointment ({appointments.length})
              </button>
              <button
                onClick={() => setSelectedTable('reminder')}
                className={`flex-1 py-1 px-2 text-center rounded-lg text-[11px] font-mono transition-all ${
                  selectedTable === 'reminder'
                    ? 'bg-slate-800 text-teal-400 font-bold border border-teal-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Reminder ({reminderPreferences.length})
              </button>
              <button
                onClick={() => setSelectedTable('history')}
                className={`flex-1 py-1 px-2 text-center rounded-lg text-[11px] font-mono transition-all ${
                  selectedTable === 'history'
                    ? 'bg-slate-800 text-teal-400 font-bold border border-teal-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                History ({notificationHistory.length})
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
                        <td className="p-3 text-teal-400 font-semibold">{r.patient_id}</td>
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
                        <td className="p-3 text-teal-400 font-semibold">{r.appointment_id}</td>
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
                        <td className="p-3 text-teal-400 font-semibold">{r.reminder_id}</td>
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
                          <td className="p-3 text-teal-400 font-semibold">{r.notification_id}</td>
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
            </div>

            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-3 mt-3 flex items-start gap-2 text-xs">
              <Info className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
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
                <div className="bg-slate-900 border border-teal-800/40 p-2 rounded-lg flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-teal-400" />
                  <span className="font-bold text-teal-300">Patient</span>
                  <span className="text-[9px] text-slate-500">(patient_id)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-700" />
                <div className="bg-slate-900 border border-teal-800/40 p-2 rounded-lg flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  <span className="font-bold text-teal-300">Appointment</span>
                  <span className="text-[9px] text-slate-500">(appt_id, pat_id FK)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-700" />
                <div className="bg-slate-900 border border-teal-800/40 p-2 rounded-lg flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-teal-400" />
                  <span className="font-bold text-teal-300">RemPreferences</span>
                  <span className="text-[9px] text-slate-500">(rem_id, pat_id FK)</span>
                </div>
              </div>
              <div className="mt-2 text-center">
                <div className="inline-block bg-slate-900 border border-teal-800/40 p-2 rounded-lg text-[11px] font-mono">
                  <span className="font-bold text-teal-300">NotificationHistory</span>
                  <span className="text-[9px] text-slate-500"> (notif_id, pat_id FK, appt_id FK)</span>
                </div>
              </div>
            </div>

            {/* Raw DDL Definitions */}
            <div className="flex-1 overflow-y-auto space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 scrollbar-none">
              <h4 className="text-[10px] font-bold text-teal-400 uppercase tracking-widest border-b border-slate-800 pb-1.5 mb-3">PostgreSQL DDL Statements</h4>
              
              <div>
                <p className="text-teal-500/80 font-bold mb-1">-- Table 1: Patient Details</p>
                <pre className="bg-slate-900 p-2 rounded border border-slate-800 text-[11px] text-slate-300 leading-normal overflow-x-auto whitespace-pre">
                  {schemaDDL.patient}
                </pre>
              </div>

              <div>
                <p className="text-teal-500/80 font-bold mb-1 mt-3">-- Table 2: Clinical Genetic Appointments</p>
                <pre className="bg-slate-900 p-2 rounded border border-slate-800 text-[11px] text-slate-300 leading-normal overflow-x-auto whitespace-pre">
                  {schemaDDL.appointment}
                </pre>
              </div>

              <div>
                <p className="text-teal-500/80 font-bold mb-1 mt-3">-- Table 3: Patient Reminder Settings</p>
                <pre className="bg-slate-900 p-2 rounded border border-slate-800 text-[11px] text-slate-300 leading-normal overflow-x-auto whitespace-pre">
                  {schemaDDL.reminder}
                </pre>
              </div>

              <div>
                <p className="text-teal-500/80 font-bold mb-1 mt-3">-- Table 4: Audit Notification History</p>
                <pre className="bg-slate-900 p-2 rounded border border-slate-800 text-[11px] text-slate-300 leading-normal overflow-x-auto whitespace-pre">
                  {schemaDDL.history}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE SQL CONSOLE */}
        {activeTab === 'logs' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="bg-slate-950 p-2 border-b border-slate-800/80 flex justify-between items-center text-[10px] font-mono text-slate-400 shrink-0">
              <span>ROLLING SQL WORKSPACE FEED</span>
              <span className="text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE STREAM
              </span>
            </div>

            {/* Rolling Logs Console */}
            <div className="flex-1 overflow-y-auto bg-slate-950 p-4 font-mono text-[10px] md:text-[11px] space-y-3.5 scrollbar-none flex flex-col-reverse">
              {/* Show most recent log first (CSS flex-col-reverse helps keep bottom scrolled but lets us render in order) */}
              {[...queryLogs].reverse().map((log, idx) => {
                const getQueryColor = (type: string) => {
                  switch (type) {
                    case 'SELECT': return 'text-sky-400';
                    case 'INSERT': return 'text-emerald-400';
                    case 'UPDATE': return 'text-amber-400';
                    case 'DELETE': return 'text-rose-400';
                    case 'DDL': return 'text-purple-400';
                    default: return 'text-slate-300';
                  }
                };
                
                return (
                  <div key={idx} className="border-b border-slate-900 pb-2.5 last:border-0 hover:bg-slate-900/10 px-1 py-0.5 rounded transition">
                    <div className="flex items-center justify-between text-[9px] text-slate-500 mb-1">
                      <span className="bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800 text-slate-400 font-bold">
                        {log.timestamp}
                      </span>
                      <span className={`font-bold px-1.5 py-0.2 rounded ${
                        log.type === 'SELECT' ? 'bg-sky-950 text-sky-400' :
                        log.type === 'INSERT' ? 'bg-emerald-950 text-emerald-400' :
                        log.type === 'UPDATE' ? 'bg-amber-950 text-amber-400' :
                        log.type === 'DELETE' ? 'bg-rose-950 text-rose-400' :
                        'bg-purple-950 text-purple-400'
                      }`}>
                        {log.type}
                      </span>
                    </div>
                    <pre className={`whitespace-pre-wrap leading-normal font-mono font-medium break-all ${getQueryColor(log.type)}`}>
                      {log.query}
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Footer Database Indicator */}
      <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 font-mono shrink-0">
        <div className="flex items-center gap-1">
          <Terminal className="w-3.5 h-3.5 text-teal-500" />
          <span>Local Engine Active (Query log count: {queryLogs.length})</span>
        </div>
        <span>SQL/DML Compliance OK</span>
      </div>
    </div>
  );
}
