import React, { useState, useEffect } from 'react';
import { 
  ScreenId, 
  Appointment, 
  ReminderPreferences,
  PatientRecord,
  AppointmentRecord,
  ReminderPreferenceRecord,
  NotificationHistoryRecord,
  DBQueryLog,
  ReferralRecord,
  EducationProgressRecord,
  ResultsRecord
} from './types';
import {
  supabase,
  fetchPatients,
  fetchAppointments,
  fetchReminderPreferences,
  fetchNotificationHistory,
  fetchReferrals,
  fetchEducationProgress,
  fetchResults,
} from './supabaseClient';
import PhoneSimulator from './components/PhoneSimulator';
import AnnotationsPanel from './components/AnnotationsPanel';
import DatabaseViewer from './components/DatabaseViewer';
import { HeartPulse, Compass, Settings, Layers, Users, BookOpen, Sparkles, Smartphone, CircleCheck, ShieldAlert, Undo, Calendar, Check, ArrowRight, CircleHelp as HelpCircle, Database, MessageSquare, X } from 'lucide-react';

export default function App() {
  // Global Shared States for the Figma Prototype
  const [activeScreen, setActiveScreen] = useState<ScreenId>(ScreenId.Home);
  const [isFHReferred, setIsFHReferred] = useState<boolean>(false);
  const [rightPanelTab, setRightPanelTab] = useState<'annotations' | 'database'>('database');
  
  // Feature 6: Relational Database Tables State
  // Starts empty — real values are loaded from Supabase in the
  // useEffect below, instead of being hardcoded here.
  const [patientTable, setPatientTable] = useState<PatientRecord[]>([]);
  const [appointmentTable, setAppointmentTable] = useState<AppointmentRecord[]>([]);
  const [reminderPrefTable, setReminderPrefTable] = useState<ReminderPreferenceRecord[]>([]);
  const [notificationHistoryTable, setNotificationHistoryTable] = useState<NotificationHistoryRecord[]>([]);
  const [referralTable, setReferralTable] = useState<ReferralRecord[]>([]);
  const [educationProgressTable, setEducationProgressTable] = useState<EducationProgressRecord[]>([]);
  const [resultsTable, setResultsTable] = useState<ResultsRecord[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('SL001');
  const [isLoadingDb, setIsLoadingDb] = useState<boolean>(true);

  // SQL rolling log stream (Feature 6)
  const [queryLogs, setQueryLogs] = useState<DBQueryLog[]>([]);

  // Sync state helpers
  const logSQL = (query: string, type: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'DDL') => {
    const now = new Date();
    const pad = (num: number) => String(num).padStart(2, '0');
    const timestamp = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setQueryLogs(prev => [...prev, { timestamp, query, type }]);
  };

  // ------------------------------------------------------------
  // Load real data from Supabase on first render, and subscribe
  // to live changes so DatabaseViewer updates instantly if a row
  // is edited directly in the Supabase Table Editor.
  // ------------------------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        const [patients, appointments, reminders, notifications, referrals, education, results] = await Promise.all([
          fetchPatients(),
          fetchAppointments(),
          fetchReminderPreferences(),
          fetchNotificationHistory(),
          fetchReferrals(),
          fetchEducationProgress(),
          fetchResults(),
        ]);

        // Ensure standard patient records are set correctly with requested names
        const normalizedPatients = patients.map(p => {
          if (p.patient_id === 'SL001') return { ...p, name: 'Sarah Lim' };
          if (p.patient_id === 'EW003') return { ...p, name: 'Emily Wong' };
          if (p.patient_id === 'DT002') return { ...p, name: 'Daniel Tan' };
          if (p.patient_id === 'ML004') return { ...p, name: 'Michael Lee' };
          return p;
        });

        // Add missing required personas if any
        const existingIds = normalizedPatients.map(p => p.patient_id);
        const missingPersonas = [
          { patient_id: 'SL001', name: 'Sarah Lim', contact_details: 'sarah.lim@gmail.com' },
          { patient_id: 'EW003', name: 'Emily Wong', contact_details: 'emily.wong@gmail.com' },
          { patient_id: 'DT002', name: 'Daniel Tan', contact_details: 'daniel.tan@gmail.com' },
          { patient_id: 'ML004', name: 'Michael Lee', contact_details: 'michael.lee@gmail.com' }
        ].filter(p => !existingIds.includes(p.patient_id));

        const finalPatients = [...normalizedPatients, ...missingPersonas];

        setPatientTable(finalPatients);
        setAppointmentTable(appointments);
        setReminderPrefTable(reminders);
        setNotificationHistoryTable(notifications);
        setReferralTable(referrals);
        setEducationProgressTable(education);
        setResultsTable(results);

        const hasActiveReferral = referrals.some(r => r.patient_id === selectedPatientId && r.status === 'active');
        setIsFHReferred(hasActiveReferral);

        // Async upsert to Supabase to keep remote and local in perfect harmony
        finalPatients.forEach(async (p) => {
          if (['SL001', 'EW003', 'DT002', 'ML004'].includes(p.patient_id)) {
            await supabase.from('Patient').upsert({
              patient_id: p.patient_id,
              name: p.name,
              contact_details: p.contact_details
            }, { onConflict: 'patient_id' });
          }
        });

        logSQL('SELECT * FROM Patient;', 'SELECT');
        logSQL('SELECT * FROM Appointment;', 'SELECT');
        logSQL('SELECT * FROM ReminderPreference;', 'SELECT');
        logSQL('SELECT * FROM NotificationHistory;', 'SELECT');
        logSQL('SELECT * FROM Referral;', 'SELECT');
        logSQL('SELECT * FROM EducationProgress;', 'SELECT');
        logSQL('SELECT * FROM Results;', 'SELECT');
      } catch (err) {
        console.error('Failed to load data from Supabase:', err);
      } finally {
        setIsLoadingDb(false);
      }
    })();

    const channel = supabase
      .channel('healthhub-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Appointment' },
        async () => setAppointmentTable(await fetchAppointments()))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ReminderPreference' },
        async () => setReminderPrefTable(await fetchReminderPreferences()))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'NotificationHistory' },
        async () => setNotificationHistoryTable(await fetchNotificationHistory()))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Patient' },
        async () => setPatientTable(await fetchPatients()))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Referral' },
        async () => setReferralTable(await fetchReferrals()))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'EducationProgress' },
        async () => setEducationProgressTable(await fetchEducationProgress()))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Results' },
        async () => setResultsTable(await fetchResults()))
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Compute derived state for the active patient persona
  const activePatient = patientTable.find(p => p.patient_id === selectedPatientId);
  const patientAppt = appointmentTable.find(a => a.patient_id === selectedPatientId);
  const activeAppointment: Appointment = {
    date: patientAppt?.appointment_date || '22 July 2026',
    timeSlot: patientAppt?.appointment_time || '10:30 AM',
    clinic: patientAppt?.clinic || 'National University Hospital Genetic Clinic',
    status: patientAppt?.status || 'pending',
  };

  const patientPrefs = reminderPrefTable.find(r => r.patient_id === selectedPatientId);
  const activeReminderPrefs: ReminderPreferences = {
    enabled: patientPrefs?.enabled ?? true,
    channel: patientPrefs?.notification_channel || 'both',
    frequency: patientPrefs?.frequency || '1_week',
    previewText: 'Your FH Genetic Testing appointment is in 7 days.\nPlease confirm your attendance or reschedule if needed.',
  };

  const patientEdu = educationProgressTable.find(e => e.patient_id === selectedPatientId);
  const percentComplete = patientEdu?.percent_complete ?? 0;

  // Relational SQL Database Transactions
  // Each handler now updates local state (so the UI feels instant),
  // AND writes the same change to Supabase, AND logs it — all three
  // in that order.
  const handleBookingTransaction = async (date: string, time: string, clinic: string) => {
    const appt = appointmentTable.find(a => a.patient_id === selectedPatientId);
    const appointmentId = appt?.appointment_id || `APT${Math.floor(100 + Math.random() * 900)}`;

    setAppointmentTable(prev => {
      const exists = prev.some(a => a.patient_id === selectedPatientId);
      if (exists) {
        return prev.map(a => a.patient_id === selectedPatientId ? { ...a, appointment_date: date, appointment_time: time, clinic, status: 'booked' } : a);
      } else {
        return [...prev, { appointment_id: appointmentId, patient_id: selectedPatientId, appointment_date: date, appointment_time: time, clinic, status: 'booked', calendar_added: false, attendance: null }];
      }
    });

    const { error } = await supabase
      .from('Appointment')
      .upsert({
        appointment_id: appointmentId,
        patient_id: selectedPatientId,
        appointment_date: date,
        appointment_time: time,
        clinic,
        status: 'booked'
      }, { onConflict: 'appointment_id' });
    if (error) console.error('Supabase booking update failed:', error);

    logSQL(
      `INSERT INTO Appointment (appointment_id, patient_id, appointment_date, appointment_time, clinic, status)\nVALUES ('${appointmentId}', '${selectedPatientId}', '${date}', '${time}', '${clinic}', 'booked')\nON CONFLICT (appointment_id) DO UPDATE SET status = 'booked', appointment_date = '${date}', appointment_time = '${time}', clinic = '${clinic}';`,
      'UPDATE'
    );
  };

  const handleCancelAppointmentTransaction = async () => {
    const appt = appointmentTable.find(a => a.patient_id === selectedPatientId);
    if (!appt) return;

    setAppointmentTable(prev => prev.map(a =>
      a.patient_id === selectedPatientId ? { ...a, status: 'cancelled' } : a
    ));

    const { error } = await supabase
      .from('Appointment')
      .update({ status: 'cancelled' })
      .eq('patient_id', selectedPatientId);
    if (error) console.error('Supabase cancel update failed:', error);

    logSQL(
      `UPDATE Appointment\nSET status = 'cancelled'\nWHERE patient_id = '${selectedPatientId}';`,
      'UPDATE'
    );
  };

  const handleCalendarAddedTransaction = async () => {
    const appt = appointmentTable.find(a => a.patient_id === selectedPatientId);
    if (!appt) return;

    setAppointmentTable(prev => prev.map(a =>
      a.patient_id === selectedPatientId ? { ...a, calendar_added: true } : a
    ));

    const { error } = await supabase
      .from('Appointment')
      .update({ calendar_added: true })
      .eq('patient_id', selectedPatientId);
    if (error) console.error('Supabase calendar update failed:', error);

    logSQL(
      `UPDATE Appointment\nSET calendar_added = TRUE\nWHERE patient_id = '${selectedPatientId}';`,
      'UPDATE'
    );
  };

  const handleReminderPrefsTransaction = async (enabled: boolean, channel: string, frequency: 'monthly' | '2_weeks' | '1_week' | '1_day' | 'custom') => {
    const pref = reminderPrefTable.find(r => r.patient_id === selectedPatientId);
    const reminderId = pref?.reminder_id || `REM${Math.floor(100 + Math.random() * 900)}`;

    setReminderPrefTable(prev => {
      const exists = prev.some(r => r.patient_id === selectedPatientId);
      if (exists) {
        return prev.map(r => r.patient_id === selectedPatientId ? { ...r, enabled, notification_channel: channel, frequency } : r);
      } else {
        return [...prev, { reminder_id: reminderId, patient_id: selectedPatientId, enabled, notification_channel: channel, frequency, next_notification_date: null }];
      }
    });

    const { error } = await supabase
      .from('ReminderPreference')
      .upsert({
        reminder_id: reminderId,
        patient_id: selectedPatientId,
        enabled,
        notification_channel: channel,
        frequency
      }, { onConflict: 'reminder_id' });
    if (error) console.error('Supabase reminder update failed:', error);

    logSQL(
      `INSERT INTO ReminderPreference (reminder_id, patient_id, enabled, notification_channel, frequency)\nVALUES ('${reminderId}', '${selectedPatientId}', ${enabled ? 'TRUE' : 'FALSE'}, '${channel}', '${frequency}')\nON CONFLICT (reminder_id) DO UPDATE SET enabled = ${enabled ? 'TRUE' : 'FALSE'}, notification_channel = '${channel}', frequency = '${frequency}';`,
      'UPDATE'
    );
  };

  const handleTriggerNotificationTransaction = async () => {
    const nextId = `NOT${Math.floor(100 + Math.random() * 900)}`;
    const appt = appointmentTable.find(a => a.patient_id === selectedPatientId);
    const appointmentId = appt?.appointment_id || 'APT101';
    
    const newRecord: NotificationHistoryRecord = {
      notification_id: nextId,
      patient_id: selectedPatientId,
      appointment_id: appointmentId,
      sent_date: '10 July 2026', // Current mock date
      opened_status: 'sent',
      action_taken: 'none'
    };

    setNotificationHistoryTable(prev => [...prev, newRecord]);
    setActiveScreen(ScreenId.NotificationMock);

    const { error } = await supabase.from('NotificationHistory').insert(newRecord);
    if (error) console.error('Supabase notification insert failed:', error);

    logSQL(
      `INSERT INTO NotificationHistory (\n  notification_id, patient_id, appointment_id, sent_date, opened_status, action_taken\n) VALUES (\n  '${nextId}', '${selectedPatientId}', '${appointmentId}', '10 July 2026', 'sent', 'none'\n);`,
      'INSERT'
    );
  };

  const handleNotificationActionTransaction = async (action: 'confirmed' | 'rescheduled' | 'education_viewed') => {
    const appt = appointmentTable.find(a => a.patient_id === selectedPatientId);
    const appointmentId = appt?.appointment_id || 'APT101';

    // 1. Update appointment table state if confirmed
    if (action === 'confirmed') {
      setAppointmentTable(prev => prev.map(apt => 
        apt.patient_id === selectedPatientId ? { ...apt, status: 'confirmed' } : apt
      ));

      const { error } = await supabase
        .from('Appointment')
        .update({ status: 'confirmed' })
        .eq('patient_id', selectedPatientId);
      if (error) console.error('Supabase appointment confirm failed:', error);

      logSQL(
        `UPDATE Appointment\nSET status = 'confirmed'\nWHERE patient_id = '${selectedPatientId}';`,
        'UPDATE'
      );
    } else if (action === 'rescheduled') {
      setAppointmentTable(prev => prev.map(apt => 
        apt.patient_id === selectedPatientId ? { ...apt, status: 'pending' } : apt
      ));

      const { error } = await supabase
        .from('Appointment')
        .update({ status: 'pending' })
        .eq('patient_id', selectedPatientId);
      if (error) console.error('Supabase appointment reschedule failed:', error);

      logSQL(
        `UPDATE Appointment\nSET status = 'pending'\nWHERE patient_id = '${selectedPatientId}';`,
        'UPDATE'
      );
    }

    // 2. Update Notification History action
    const lastRecord = [...notificationHistoryTable].reverse().find(n => n.patient_id === selectedPatientId);
    const lastRecordId = lastRecord?.notification_id || 'NOT501';

    setNotificationHistoryTable(prev => {
      return prev.map(n => n.notification_id === lastRecordId ? { ...n, opened_status: 'opened', action_taken: action } : n);
    });

    const { error } = await supabase
      .from('NotificationHistory')
      .update({ opened_status: 'opened', action_taken: action })
      .eq('notification_id', lastRecordId);
    if (error) console.error('Supabase notification action update failed:', error);

    logSQL(
      `UPDATE NotificationHistory\nSET opened_status = 'opened',\n    action_taken = '${action}'\nWHERE notification_id = '${lastRecordId}';`,
      'UPDATE'
    );
  };

  const handleUpdateEducationProgress = async (patientId: string, percent: number) => {
    setEducationProgressTable(prev => {
      const exists = prev.some(e => e.patient_id === patientId);
      if (exists) {
        return prev.map(e => e.patient_id === patientId ? { ...e, percent_complete: percent } : e);
      } else {
        return [...prev, { progress_id: `EDU${Math.floor(100 + Math.random() * 900)}`, patient_id: patientId, percent_complete: percent, modules_viewed: 0, last_accessed: '12 July 2026' }];
      }
    });

    const { error } = await supabase
      .from('EducationProgress')
      .upsert({ patient_id: patientId, percent_complete: percent }, { onConflict: 'patient_id' });
    if (error) console.error('Supabase education progress update failed:', error);

    logSQL(
      `INSERT INTO EducationProgress (patient_id, percent_complete)\nVALUES ('${patientId}', ${percent})\nON CONFLICT (patient_id) DO UPDATE SET percent_complete = ${percent};`,
      'UPDATE'
    );
  };

  // Controller Actions (Fast-forward Simulator States)
  const handleSimulateReset = async () => {
    setAppointmentTable(prev => prev.map(apt =>
      apt.patient_id === selectedPatientId
        ? {
            ...apt,
            appointment_date: '22 July 2026',
            appointment_time: '10:30 AM',
            clinic: 'National University Hospital Genetic Clinic',
            status: 'pending',
            calendar_added: false,
          }
        : apt
    ));

    setReminderPrefTable(prev => prev.map(pref =>
      pref.patient_id === selectedPatientId
        ? { ...pref, enabled: true, notification_channel: 'both', frequency: '1_week' }
        : pref
    ));

    setNotificationHistoryTable(prev => prev.filter(n => n.patient_id !== selectedPatientId || n.notification_id === 'NOT501'));

    setIsFHReferred(true);
    setActiveScreen(ScreenId.Home);

    const { error: e1 } = await supabase
      .from('Appointment')
      .update({
        appointment_date: '22 July 2026',
        appointment_time: '10:30 AM',
        clinic: 'National University Hospital Genetic Clinic',
        status: 'pending',
        calendar_added: false,
      })
      .eq('patient_id', selectedPatientId);
    if (e1) console.error('Supabase reset (appointment) failed:', e1);

    const { error: e2 } = await supabase
      .from('ReminderPreference')
      .update({ enabled: true, notification_channel: 'both', frequency: '1_week' })
      .eq('patient_id', selectedPatientId);
    if (e2) console.error('Supabase reset (reminder) failed:', e2);

    const { error: e3 } = await supabase
      .from('NotificationHistory')
      .delete()
      .eq('patient_id', selectedPatientId)
      .neq('notification_id', 'NOT501');
    if (e3) console.error('Supabase reset (notifications) failed:', e3);

    logSQL('-- DATABASE AND APPLICATION STATE RESET', 'DDL');
    logSQL(
      `UPDATE Appointment SET status = 'pending', calendar_added = FALSE WHERE patient_id = '${selectedPatientId}';`,
      'UPDATE'
    );
    logSQL(
      `UPDATE ReminderPreference SET enabled = TRUE, notification_channel = 'both', frequency = '1_week' WHERE patient_id = '${selectedPatientId}';`,
      'UPDATE'
    );
    logSQL(
      `DELETE FROM NotificationHistory WHERE patient_id = '${selectedPatientId}' AND notification_id <> 'NOT501';`,
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

  const handleSelectPersona = async (patientId: string) => {
    setSelectedPatientId(patientId);
    setActiveScreen(ScreenId.Home);

    let referred = true;
    let apptStatus: 'pending' | 'booked' | 'confirmed' | 'completed' = 'pending';
    let eduPercent = 0;
    let refType: 'clinical_referral' | 'cascade_screening' | 'clinical_suspicion' = 'clinical_referral';

    if (patientId === 'SL001') {
      referred = false;
      apptStatus = 'pending';
      eduPercent = 0;
    } else if (patientId === 'EW003') {
      referred = true;
      apptStatus = 'pending';
      eduPercent = 0;
      refType = 'clinical_suspicion';
    } else if (patientId === 'DT002') {
      referred = true;
      apptStatus = 'pending';
      eduPercent = 50;
      refType = 'cascade_screening';
    } else if (patientId === 'ML004') {
      referred = true;
      apptStatus = 'completed';
      eduPercent = 100;
      refType = 'clinical_referral';
    }

    setIsFHReferred(referred);

    // Update appointment state locally
    setAppointmentTable(prev => {
      const exists = prev.some(a => a.patient_id === patientId);
      if (exists) {
        return prev.map(a => a.patient_id === patientId ? { ...a, status: apptStatus } : a);
      } else {
        return [...prev, {
          appointment_id: `APT${Math.floor(100 + Math.random() * 900)}`,
          patient_id: patientId,
          appointment_date: '22 July 2026',
          appointment_time: '10:30 AM',
          clinic: 'National University Hospital Genetic Clinic',
          status: apptStatus,
          calendar_added: false
        }];
      }
    });

    // Update education progress state locally
    setEducationProgressTable(prev => {
      const exists = prev.some(e => e.patient_id === patientId);
      if (exists) {
        return prev.map(e => e.patient_id === patientId ? { ...e, percent_complete: eduPercent } : e);
      } else {
        return [...prev, { patient_id: patientId, percent_complete: eduPercent }];
      }
    });

    // Update referral table locally
    setReferralTable(prev => {
      const exists = prev.some(r => r.patient_id === patientId);
      if (exists) {
        return prev.map(r => r.patient_id === patientId ? { ...r, referral_type: refType, status: referred ? 'active' : 'completed' } : r);
      } else {
        return [...prev, {
          referral_id: `REF${Math.floor(100 + Math.random() * 900)}`,
          patient_id: patientId,
          referral_type: refType,
          status: referred ? 'active' : 'completed'
        }];
      }
    });

    // Fire logSQL
    const pName = patientId === 'SL001' ? 'Sarah Lim' : patientId === 'EW003' ? 'Emily Wong' : patientId === 'DT002' ? 'Daniel Tan' : 'Michael Lee';
    logSQL(`-- SELECTED PERSONA: ${pName} (${patientId})`, 'DDL');
    logSQL(`UPDATE Appointment SET status = '${apptStatus}' WHERE patient_id = '${patientId}';`, 'UPDATE');
    logSQL(`UPDATE EducationProgress SET percent_complete = ${eduPercent} WHERE patient_id = '${patientId}';`, 'UPDATE');
    if (referred) {
      logSQL(`INSERT INTO Referral (patient_id, referral_type, status) VALUES ('${patientId}', '${refType}', 'active') ON CONFLICT (patient_id) DO UPDATE SET status = 'active', referral_type = '${refType}';`, 'UPDATE');
    } else {
      logSQL(`DELETE FROM Referral WHERE patient_id = '${patientId}';`, 'DELETE');
    }

    // Async sync to Supabase (if database has the tables)
    try {
      const targetAppt = appointmentTable.find(a => a.patient_id === patientId);
      const apptId = targetAppt?.appointment_id || `APT${Math.floor(100 + Math.random() * 900)}`;
      await supabase.from('Appointment').upsert({
        appointment_id: apptId,
        patient_id: patientId,
        appointment_date: '22 July 2026',
        appointment_time: '10:30 AM',
        clinic: 'National University Hospital Genetic Clinic',
        status: apptStatus
      });

      await supabase.from('EducationProgress').upsert({
        patient_id: patientId,
        percent_complete: eduPercent
      });

      if (referred) {
        const targetRef = referralTable.find(r => r.patient_id === patientId);
        const refId = targetRef?.referral_id || `REF${Math.floor(100 + Math.random() * 900)}`;
        await supabase.from('Referral').upsert({
          referral_id: refId,
          patient_id: patientId,
          referral_type: refType,
          status: 'active'
        });
      } else {
        await supabase.from('Referral').delete().eq('patient_id', patientId);
      }
    } catch (err) {
      console.error('Supabase write error:', err);
    }
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
              Interactive application developed to reduce patient drop-off after clinical genetics referral
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap gap-2">
            <div className="bg-slate-950 px-4 py-2 rounded-xl border border-rose-950/50 bg-rose-950/10 text-center">
              <p className="text-[9px] uppercase tracking-wider text-rose-400 font-mono">Patient drop off</p>
              <p className="text-sm font-bold text-rose-400">40%</p>
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

            {/* Live Patient Persona Switcher */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-500" />
                Select Patient Persona
              </label>

              <div className="space-y-2.5">
                {/* 1. Sarah Lim */}
                <button
                  onClick={() => handleSelectPersona('SL001')}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex flex-col gap-1 cursor-pointer group ${
                    selectedPatientId === 'SL001'
                      ? 'bg-emerald-950/20 border-emerald-500 shadow-md shadow-emerald-950/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-xs text-slate-100 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedPatientId === 'SL001' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                      Sarah Lim
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-slate-800 text-slate-400 uppercase tracking-wide">
                      No FH Referral
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal font-medium pl-4">
                    Simulates standard healthcare view without cardiac genetics intervention.
                  </p>
                </button>

                {/* 2. Emily Wong */}
                <button
                  onClick={() => handleSelectPersona('EW003')}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex flex-col gap-1 cursor-pointer group ${
                    selectedPatientId === 'EW003'
                      ? 'bg-emerald-950/20 border-emerald-500 shadow-md shadow-emerald-950/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-xs text-slate-100 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedPatientId === 'EW003' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                      Emily Wong
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-amber-950/50 text-amber-400 border border-amber-900/30 uppercase tracking-wide">
                      No Education
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal font-medium pl-4">
                    FH Referred. Displays unbooked appointment booking alert & 0% educational progress.
                  </p>
                </button>

                {/* 3. Daniel Tan */}
                <button
                  onClick={() => handleSelectPersona('DT002')}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex flex-col gap-1 cursor-pointer group ${
                    selectedPatientId === 'DT002'
                      ? 'bg-emerald-950/20 border-emerald-500 shadow-md shadow-emerald-950/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-xs text-slate-100 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedPatientId === 'DT002' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                      Daniel Tan
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-indigo-950/50 text-indigo-400 border border-indigo-900/30 uppercase tracking-wide">
                      Partial Education
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal font-medium pl-4">
                    FH Cascade Referral. Displays active compliance countdown with 50% completed modules.
                  </p>
                </button>

                {/* 4. Michael Lee */}
                <button
                  onClick={() => handleSelectPersona('ML004')}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex flex-col gap-1 cursor-pointer group ${
                    selectedPatientId === 'ML004'
                      ? 'bg-emerald-950/20 border-emerald-500 shadow-md shadow-emerald-950/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-xs text-slate-100 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedPatientId === 'ML004' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                      Michael Lee
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-emerald-950/50 text-emerald-400 border border-emerald-900/30 uppercase tracking-wide">
                      Completed GAC
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal font-medium pl-4">
                    GAC completed, awaiting genetic test results. Simulates post-consult compliance state.
                  </p>
                </button>
              </div>
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
            onCancelAppointment={handleCancelAppointmentTransaction}
            isFHReferred={isFHReferred}
            patientRecord={activePatient}
            percentComplete={percentComplete}
            onUpdateEducationProgress={handleUpdateEducationProgress}
          />

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
              <Layers className="w-4 h-4" /> UX Specifications
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
                referrals={referralTable}
                educationProgress={educationProgressTable}
                results={resultsTable}
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
