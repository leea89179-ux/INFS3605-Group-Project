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
import DatabaseViewer from './components/DatabaseViewer';
import { HeartPulse, RotateCcw } from 'lucide-react';

export default function App() {
  // Global Shared States for the Figma Prototype
  const [activeScreen, setActiveScreen] = useState<ScreenId>(ScreenId.Home);
  const [isFHReferred, setIsFHReferred] = useState<boolean>(true);
  
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
  const [selectedPatientId, setSelectedPatientId] = useState<string>('EW003');
  const [isLoadingDb, setIsLoadingDb] = useState<boolean>(true);
  const [emilyWongRefreshTrigger, setEmilyWongRefreshTrigger] = useState<number>(0);

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
    clinic: patientAppt?.clinic || (isFHReferred ? 'National University Hospital Genetic Clinic' : 'Toa Payoh Polyclinic'),
    status: patientAppt?.status || 'pending',
  };

  const patientPrefs = reminderPrefTable.find(r => r.patient_id === selectedPatientId);
  const activeReminderPrefs: ReminderPreferences = {
    enabled: patientPrefs?.enabled ?? true,
    channel: patientPrefs?.notification_channel || 'both',
    frequency: patientPrefs?.frequency || 'monthly,2_weeks,1_week,1_day',
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

  const handleReminderPrefsTransaction = async (enabled: boolean, channel: string, frequency: string) => {
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
        ? { ...pref, enabled: true, notification_channel: 'both', frequency: 'monthly,2_weeks,1_week,1_day' }
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
      .update({ enabled: true, notification_channel: 'both', frequency: 'monthly,2_weeks,1_week,1_day' })
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
      `UPDATE ReminderPreference SET enabled = TRUE, notification_channel = 'both', frequency = 'monthly,2_weeks,1_week,1_day' WHERE patient_id = '${selectedPatientId}';`,
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

    if (patientId === 'EW003') {
      setEmilyWongRefreshTrigger(prev => prev + 1);
    }

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

  const handleResetEmilyProgress = async () => {
    // 1. Select Emily Wong
    setSelectedPatientId('EW003');
    setIsFHReferred(true);
    setActiveScreen(ScreenId.Home);

    // 2. Reset Educational Progress for Emily Wong to 0%
    setEducationProgressTable(prev => {
      const exists = prev.some(e => e.patient_id === 'EW003');
      if (exists) {
        return prev.map(e => e.patient_id === 'EW003' ? { ...e, percent_complete: 0, modules_viewed: 0 } : e);
      } else {
        return [...prev, { progress_id: 'EDU003', patient_id: 'EW003', percent_complete: 0, modules_viewed: 0, last_accessed: 'Never' }];
      }
    });

    // 3. Trigger questionnaire reset in PhoneSimulator
    setEmilyWongRefreshTrigger(prev => prev + 1);

    // 4. Sync to Supabase
    try {
      await supabase.from('EducationProgress').upsert({
        patient_id: 'EW003',
        percent_complete: 0
      });
    } catch (err) {
      console.error('Supabase reset education progress failed:', err);
    }

    // 5. Log SQL
    logSQL("-- RESET EMILY WONG'S EDUCATION PROGRESS (0%) AND QUESTIONNAIRE (NOT COMPLETE)", 'DDL');
    logSQL("UPDATE EducationProgress SET percent_complete = 0 WHERE patient_id = 'EW003';", 'UPDATE');
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col font-sans selection:bg-[#00733a] selection:text-white">
      
      {/* 1. Official Singapore GovTech Styled Header banner */}
      <header className="bg-white border-b border-slate-200/90 px-6 py-4 shrink-0 shadow-xs relative">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2.5 font-display">
              <HeartPulse className="w-7 h-7 text-[#00733a] shrink-0" />
              FHAssistant
            </h1>
          </div>

          {/* Reset Icon Button on the Right */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetEmilyProgress}
              className="p-2 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#00733a] active:bg-emerald-100 border border-slate-200/90 hover:border-emerald-300 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer shadow-2xs active:scale-95 group"
              title="Reset Emily's educational progress (0%) & personalisation questionnaire (Not complete)"
              id="reset-emily-btn"
              aria-label="Reset Emily's progress"
            >
              <RotateCcw className="w-4 h-4 text-slate-600 group-hover:text-[#00733a] group-hover:-rotate-90 transition-transform duration-300 shrink-0" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 flex flex-col items-center justify-center">
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
          emilyWongRefreshTrigger={emilyWongRefreshTrigger}
          onSelectPersona={handleSelectPersona}
          onResetEmily={handleResetEmilyProgress}
        />

      </main>

    </div>
  );
}
