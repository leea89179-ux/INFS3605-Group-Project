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
  Database, Table, Server, ArrowRight, Info, FileText, Calendar, Bell, Users
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="bg-emerald-100 text-[#00733a] border border-emerald-300 text-xs px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono">Confirmed</span>;
      case 'booked':
        return <span className="bg-emerald-100 text-[#00733a] border border-emerald-300 text-xs px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono">Booked</span>;
      case 'pending':
        return <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono">Pending</span>;
      case 'completed':
        return <span className="bg-sky-100 text-sky-900 border border-sky-300 text-xs px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono">Completed</span>;
      default:
        return <span className="bg-slate-200 text-slate-800 text-xs px-2.5 py-0.5 rounded-md font-mono font-bold">{status}</span>;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'confirmed':
        return <span className="bg-emerald-100 text-[#00733a] text-xs px-2 py-0.5 rounded font-mono font-bold">CONFIRMED</span>;
      case 'rescheduled':
        return <span className="bg-amber-100 text-amber-900 text-xs px-2 py-0.5 rounded font-mono font-bold">RESCHEDULED</span>;
      case 'education_viewed':
        return <span className="bg-sky-100 text-sky-900 text-xs px-2 py-0.5 rounded font-mono font-bold">LEARN_VIEWED</span>;
      case 'none':
      default:
        return <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-mono font-bold">NONE</span>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-slate-800 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      {/* DB Viewer Header */}
      <div className="bg-gradient-to-r from-[#005c2e] to-[#00733a] px-6 py-4 border-b border-emerald-800 flex items-center justify-between shrink-0 text-white">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-200" />
          <span className="text-xs font-bold uppercase tracking-wider font-sans">Live Database Engine</span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-950/40 px-2.5 py-1 rounded-md text-xs font-medium text-emerald-100 border border-emerald-400/30">
          <Server className="w-3.5 h-3.5 text-emerald-300" />
          <span>Relational Sync Active</span>
        </div>
      </div>

      {/* Database Tabs */}
      <div className="bg-slate-100/90 px-4 py-2 flex gap-1.5 border-b border-slate-200 shrink-0">
        <button
          onClick={() => setActiveTab('tables')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'tables'
              ? 'bg-[#00733a] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
          }`}
        >
          <Table className="w-3.5 h-3.5" /> Tables
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'schema'
              ? 'bg-[#00733a] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Schema Map
        </button>
      </div>

      {/* Inner Screen Content */}
      <div className="flex-1 overflow-hidden flex flex-col p-4">
        
        {/* TAB 1: LIVE TABLES */}
        {activeTab === 'tables' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Table Selector Sub-tabs */}
            <div className="flex flex-wrap gap-1.5 mb-3 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/80 shrink-0">
              {[
                { id: 'patient', label: 'Patient', count: patients.length },
                { id: 'appointment', label: 'Appt', count: appointments.length },
                { id: 'reminder', label: 'Reminder', count: reminderPreferences.length },
                { id: 'history', label: 'History', count: notificationHistory.length },
                { id: 'referral', label: 'Referral', count: referrals.length },
                { id: 'education', label: 'Edu', count: educationProgress.length },
                { id: 'results', label: 'Result', count: results.length },
              ].map((tb) => (
                <button
                  key={tb.id}
                  onClick={() => setSelectedTable(tb.id as any)}
                  className={`flex-1 min-w-[70px] py-1 px-1.5 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedTable === tb.id
                      ? 'bg-white text-[#00733a] shadow-xs border border-emerald-300'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {tb.label} ({tb.count})
                </button>
              ))}
            </div>

            {/* Selected Table Grid/Viewer */}
            <div className="flex-1 overflow-auto border border-slate-200 rounded-xl bg-white shadow-xs">
              {selectedTable === 'patient' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 uppercase font-mono text-[10px] font-bold tracking-wider">
                      <th className="p-3">patient_id (PK)</th>
                      <th className="p-3">name</th>
                      <th className="p-3">contact_details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((r) => (
                      <tr key={r.patient_id} className="border-b border-slate-100 hover:bg-slate-50 font-mono text-[12px] transition-colors">
                        <td className="p-3 text-[#00733a] font-bold">{r.patient_id}</td>
                        <td className="p-3 text-slate-900 font-semibold">{r.name}</td>
                        <td className="p-3 text-slate-600">{r.contact_details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedTable === 'appointment' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 uppercase font-mono text-[10px] font-bold tracking-wider">
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
                      <tr key={r.appointment_id} className="border-b border-slate-100 hover:bg-slate-50 font-mono text-[12px] transition-colors">
                        <td className="p-3 text-[#00733a] font-bold">{r.appointment_id}</td>
                        <td className="p-3 text-slate-600">{r.patient_id}</td>
                        <td className="p-3 text-slate-900 font-semibold">{r.appointment_date}</td>
                        <td className="p-3 text-slate-900 font-semibold">{r.appointment_time}</td>
                        <td className="p-3 text-slate-600 truncate max-w-[120px]" title={r.clinic}>{r.clinic}</td>
                        <td className="p-3">{getStatusBadge(r.status)}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            r.calendar_added 
                              ? 'bg-emerald-100 text-[#00733a] border border-emerald-300' 
                              : 'bg-slate-100 text-slate-500'
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
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 uppercase font-mono text-[10px] font-bold tracking-wider">
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
                      <tr key={r.reminder_id} className="border-b border-slate-100 hover:bg-slate-50 font-mono text-[12px] transition-colors">
                        <td className="p-3 text-[#00733a] font-bold">{r.reminder_id}</td>
                        <td className="p-3 text-slate-600">{r.patient_id}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            r.enabled 
                              ? 'bg-emerald-100 text-[#00733a] border border-emerald-300' 
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}>
                            {r.enabled ? 'TRUE' : 'FALSE'}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="bg-slate-100 text-slate-800 border border-slate-200 px-2 py-0.5 rounded text-xs uppercase font-bold tracking-wider">
                            {r.notification_channel}
                          </span>
                        </td>
                        <td className="p-3 text-slate-900 capitalize">{r.frequency.replace('_', ' ')}</td>
                        <td className="p-3 text-slate-600">{r.next_notification_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedTable === 'history' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 uppercase font-mono text-[10px] font-bold tracking-wider">
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
                        <tr key={r.notification_id} className="border-b border-slate-100 hover:bg-slate-50 font-mono text-[12px] transition-colors">
                          <td className="p-3 text-[#00733a] font-bold">{r.notification_id}</td>
                          <td className="p-3 text-slate-600">{r.patient_id}</td>
                          <td className="p-3 text-slate-600">{r.appointment_id}</td>
                          <td className="p-3 text-slate-900 font-semibold">{r.sent_date}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                              r.opened_status === 'opened' 
                                ? 'bg-emerald-100 text-[#00733a]' 
                                : 'bg-slate-100 text-slate-600'
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
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 uppercase font-mono text-[10px] font-bold tracking-wider">
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
                        <tr key={r.referral_id} className="border-b border-slate-100 hover:bg-slate-50 font-mono text-[12px] transition-colors">
                          <td className="p-3 text-[#00733a] font-bold">{r.referral_id}</td>
                          <td className="p-3 text-slate-600">{r.patient_id}</td>
                          <td className="p-3 text-slate-900 font-semibold">{r.referral_type}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                              r.status === 'completed' 
                                ? 'bg-emerald-100 text-[#00733a]' 
                                : r.status === 'active' 
                                ? 'bg-sky-100 text-sky-900'
                                : 'bg-slate-100 text-slate-600'
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
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 uppercase font-mono text-[10px] font-bold tracking-wider">
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
                        <tr key={e.patient_id} className="border-b border-slate-100 hover:bg-slate-50 font-mono text-[12px] transition-colors">
                          <td className="p-3 text-[#00733a] font-bold">{e.patient_id}</td>
                          <td className="p-3 text-slate-900 font-extrabold">{e.percent_complete}%</td>
                          <td className="p-3 w-48">
                            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                              <div className="bg-[#00a859] h-full rounded-full" style={{ width: `${e.percent_complete}%` }} />
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
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 uppercase font-mono text-[10px] font-bold tracking-wider">
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
                        <tr key={r.patient_id} className="border-b border-slate-100 hover:bg-slate-50 font-mono text-[12px] transition-colors">
                          <td className="p-3 text-[#00733a] font-bold">{r.patient_id}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                              r.status === 'available' 
                                ? 'bg-emerald-100 text-[#00733a]' 
                                : 'bg-amber-100 text-amber-900'
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
          </div>
        )}

        {/* TAB 2: SCHEMA */}
        {activeTab === 'schema' && (
          <div className="flex-1 flex flex-col overflow-hidden space-y-4">
            
            {/* Minimal ER Diagram Visual */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0">
              <p className="text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">Database Schema ER Map</p>
              <div className="flex flex-wrap justify-between items-center gap-2 text-xs font-mono">
                <div className="bg-white border border-emerald-300 p-2.5 rounded-lg flex items-center gap-1.5 shadow-xs">
                  <Users className="w-4 h-4 text-[#00a859]" />
                  <span className="font-bold text-[#00733a]">Patient</span>
                  <span className="text-xs text-slate-500">(patient_id)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <div className="bg-white border border-emerald-300 p-2.5 rounded-lg flex items-center gap-1.5 shadow-xs">
                  <Calendar className="w-4 h-4 text-[#00a859]" />
                  <span className="font-bold text-[#00733a]">Appointment</span>
                  <span className="text-xs text-slate-500">(appt_id)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <div className="bg-white border border-emerald-300 p-2.5 rounded-lg flex items-center gap-1.5 shadow-xs">
                  <Bell className="w-4 h-4 text-[#00a859]" />
                  <span className="font-bold text-[#00733a]">RemPreferences</span>
                  <span className="text-xs text-slate-500">(rem_id)</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs font-mono">
                <div className="bg-white border border-emerald-300 p-2 rounded-lg shadow-xs">
                  <span className="font-bold text-[#00733a]">NotificationHistory</span>
                  <span className="text-xs text-slate-500"> (notif_id)</span>
                </div>
                <div className="bg-white border border-emerald-300 p-2 rounded-lg shadow-xs">
                  <span className="font-bold text-[#00733a]">Referral</span>
                  <span className="text-xs text-slate-500"> (referral_id)</span>
                </div>
                <div className="bg-white border border-emerald-300 p-2 rounded-lg shadow-xs">
                  <span className="font-bold text-[#00733a]">EducationProgress</span>
                  <span className="text-xs text-slate-500"> (pat_id)</span>
                </div>
                <div className="bg-white border border-emerald-300 p-2 rounded-lg shadow-xs">
                  <span className="font-bold text-[#00733a]">Results</span>
                  <span className="text-xs text-slate-500"> (pat_id)</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer Database Indicator */}
      <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600 font-mono shrink-0">
        <div className="flex items-center gap-1.5 font-bold">
          <Database className="w-3.5 h-3.5 text-[#00a859]" />
          <span>Local Engine Active (Query log count: {queryLogs.length})</span>
        </div>
        <span className="font-bold text-[#00733a]">SQL/DML Compliance OK</span>
      </div>
    </div>
  );
}
