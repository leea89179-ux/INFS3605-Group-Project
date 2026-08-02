import React, { useState, useEffect } from 'react';
import { 
  ScreenId, 
  Appointment, 
  ReminderPreferences,
  PatientRecord,
  AppointmentRecord,
  PatientAppointmentRecord,
  ReminderPreferenceRecord,
  NotificationHistoryRecord,
  DBQueryLog,
  ReferralRecord,
  PersonalisationResponseRecord,
  EducationProgressRecord,
  ResultsRecord
} from './types';
import {
  supabase,
  fetchPatients,
  fetchAppointmentSlots,
  fetchPatientAppointments,
  fetchReminderPreferences,
  fetchNotificationHistory,
  fetchReferrals,
  fetchPersonalisationResponses,
  fetchEducationProgress,
  fetchResults,
} from './supabaseClient';
import PhoneSimulator from './components/PhoneSimulator';
import { HeartPulse, RotateCcw } from 'lucide-react';

export default function App() {
  // Global Shared States for the Figma Prototype
  const [activeScreen, setActiveScreen] = useState<ScreenId>(ScreenId.Home);
  // isFHReferred is NOT separate state — it's derived below from
  // referralTable on every render, so it always reflects the database
  // and can never drift out of sync with a manually-set flag.

  // Feature 6: Relational Database Tables State
  // Starts empty — real values are loaded from Supabase in the
  // useEffect below, instead of being hardcoded here.
  const [patientTable, setPatientTable] = useState<PatientRecord[]>([]);
  // The calendar of available appointment slots (not patient-specific).
  const [appointmentSlotsTable, setAppointmentSlotsTable] = useState<AppointmentRecord[]>([]);
  // Which patients booked/cancelled which slots.
  const [patientAppointmentTable, setPatientAppointmentTable] = useState<PatientAppointmentRecord[]>([]);
  const [reminderPrefTable, setReminderPrefTable] = useState<ReminderPreferenceRecord[]>([]);
  const [notificationHistoryTable, setNotificationHistoryTable] = useState<NotificationHistoryRecord[]>([]);
  const [referralTable, setReferralTable] = useState<ReferralRecord[]>([]);
  const [personalisationTable, setPersonalisationTable] = useState<PersonalisationResponseRecord[]>([]);
  const [educationProgressTable, setEducationProgressTable] = useState<EducationProgressRecord[]>([]);
  const [resultsTable, setResultsTable] = useState<ResultsRecord[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('EW003');
  const [isLoadingDb, setIsLoadingDb] = useState<boolean>(true);
  const [emilyWongRefreshTrigger, setEmilyWongRefreshTrigger] = useState<number>(0);

  // SQL rolling log stream (Feature 6)
  const [queryLogs, setQueryLogs] = useState<DBQueryLog[]>([]);

  const logSQL = (query: string, type: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'DDL') => {
    const now = new Date();
    const pad = (num: number) => String(num).padStart(2, '0');
    const timestamp = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setQueryLogs(prev => [...prev, { timestamp, query, type }]);
  };

  // ------------------------------------------------------------
  // Load real data from Supabase on first render, and subscribe to
  // live changes so the UI updates instantly if a row is edited
  // directly in the Supabase Table Editor.
  // ------------------------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        const [patients, appointmentSlots, patientAppointments, reminders, notifications, referrals, personalisation, education, results] = await Promise.all([
          fetchPatients(),
          fetchAppointmentSlots(),
          fetchPatientAppointments(),
          fetchReminderPreferences(),
          fetchNotificationHistory(),
          fetchReferrals(),
          fetchPersonalisationResponses(),
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

        setPatientTable(normalizedPatients);
        setAppointmentSlotsTable(appointmentSlots);
        setPatientAppointmentTable(patientAppointments);
        setReminderPrefTable(reminders);
        setNotificationHistoryTable(notifications);
        setReferralTable(referrals);
        setPersonalisationTable(personalisation);
        setEducationProgressTable(education);
        setResultsTable(results);

        logSQL('SELECT * FROM Patient;', 'SELECT');
        logSQL('SELECT * FROM Appointment;', 'SELECT');
        logSQL('SELECT * FROM Patient_Appointment;', 'SELECT');
        logSQL('SELECT * FROM ReminderPreference;', 'SELECT');
        logSQL('SELECT * FROM NotificationHistory;', 'SELECT');
        logSQL('SELECT * FROM Referral;', 'SELECT');
        logSQL('SELECT * FROM PersonalisationResponse;', 'SELECT');
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
        async () => setAppointmentSlotsTable(await fetchAppointmentSlots()))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Patient_Appointment' },
        async () => setPatientAppointmentTable(await fetchPatientAppointments()))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ReminderPreference' },
        async () => setReminderPrefTable(await fetchReminderPreferences()))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'NotificationHistory' },
        async () => setNotificationHistoryTable(await fetchNotificationHistory()))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Patient' },
        async () => setPatientTable(await fetchPatients()))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Referral' },
        async () => setReferralTable(await fetchReferrals()))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'PersonalisationResponse' },
        async () => setPersonalisationTable(await fetchPersonalisationResponses()))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'EducationProgress' },
        async () => setEducationProgressTable(await fetchEducationProgress()))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Results' },
        async () => setResultsTable(await fetchResults()))
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Compute derived state for the active patient persona — all read
  // directly from the database-backed tables, so switching personas
  // never needs to write anything, only re-read what's already loaded.
  const activePatient = patientTable.find(p => p.patient_id === selectedPatientId);
  const activeReferral = referralTable.find(r => r.patient_id === selectedPatientId);
  const isFHReferred = activeReferral?.status === 'active';

  // A patient's "current" booking is their most recent non-cancelled one.
  const activePatientAppointment = [...patientAppointmentTable]
    .filter(pa => pa.patient_id === selectedPatientId && pa.status !== 'cancelled')
    .sort((a, b) => (b.booked_at || '').localeCompare(a.booked_at || ''))[0];
  const activeSlot = activePatientAppointment
    ? appointmentSlotsTable.find(s => s.appointment_id === activePatientAppointment.appointment_id)
    : undefined;

  const activeAppointment: Appointment = {
    date: activeSlot?.appointment_date || 'Not yet booked',
    timeSlot: activeSlot?.appointment_time || '—',
    clinic: activeSlot?.clinic || activePatient?.primary_clinic || 'No clinic selected yet',
    status: activePatientAppointment?.status || 'pending',
  };

  const patientPrefs = reminderPrefTable.find(r => r.patient_id === selectedPatientId);
  const activeReminderPrefs: ReminderPreferences = {
    enabled: patientPrefs?.enabled ?? true,
    channel: patientPrefs?.notification_channel || 'both',
    frequency: patientPrefs?.frequency || 'monthly,2_weeks,1_week,1_day',
    previewText: 'Your FH Genetic Testing appointment is in 7 days.\nPlease confirm your attendance or reschedule if needed.',
  };

  const activePersonalisation = personalisationTable.find(p => p.patient_id === selectedPatientId);

  const patientEdu = educationProgressTable.find(e => e.patient_id === selectedPatientId);
  const percentComplete = patientEdu?.percent_complete ?? 0;

  // ============================================================
  // Relational SQL Database Transactions
  // Every handler below: updates local state (instant UI feedback),
  // writes to Supabase (checking + logging every error — nothing
  // fails silently), and logs the equivalent SQL for the demo panel.
  // ============================================================

  const handleBookingTransaction = async (date: string, time: string, clinic: string) => {
    // 1. Find an available slot matching what was picked. If none
    // exists yet in the calendar, create one on the fly.
    let slot = appointmentSlotsTable.find(
      s => s.clinic === clinic && s.appointment_date === date && s.appointment_time === time
    );

    if (!slot) {
      const clinicReference = appointmentSlotsTable.find(s => s.clinic === clinic);
      const newSlotId = `SLOT${Date.now()}`;
      slot = {
        appointment_id: newSlotId,
        clinic,
        clinic_address: clinicReference?.clinic_address || 'Address to be confirmed',
        provider_role: clinicReference?.provider_role || 'Genetic Counsellor',
        appointment_date: date,
        appointment_time: time,
        duration_minutes: 45,
        cost_sgd: clinicReference?.cost_sgd ?? 0,
        is_available: true,
      };
      setAppointmentSlotsTable(prev => [...prev, slot as AppointmentRecord]);
      const { error: insertError } = await supabase.from('Appointment').insert(slot);
      if (insertError) console.error('Supabase new-slot insert failed:', insertError);
      logSQL(
        `INSERT INTO Appointment (appointment_id, clinic, appointment_date, appointment_time)\nVALUES ('${newSlotId}', '${clinic}', '${date}', '${time}');`,
        'INSERT'
      );
    }

    const isReschedule = !!activePatientAppointment && activePatientAppointment.appointment_id !== slot.appointment_id;

    // 2. If rescheduling: retire the old booking (marked cancelled —
    // an audit trail, not deleted) and free its slot. This is a
    // distinct step from creating the new booking below: the old
    // booking is genuinely gone, a new one is genuinely created.
    if (isReschedule) {
      const oldPatientAppointmentId = activePatientAppointment!.patient_appointment_id;
      const oldSlotId = activePatientAppointment!.appointment_id;

      setPatientAppointmentTable(prev => prev.map(pa =>
        pa.patient_appointment_id === oldPatientAppointmentId ? { ...pa, status: 'cancelled' } : pa
      ));
      setAppointmentSlotsTable(prev => prev.map(s =>
        s.appointment_id === oldSlotId ? { ...s, is_available: true } : s
      ));

      const { error: cancelError } = await supabase
        .from('Patient_Appointment')
        .update({ status: 'cancelled' })
        .eq('patient_appointment_id', oldPatientAppointmentId);
      if (cancelError) console.error('Supabase reschedule (cancel old booking) failed:', cancelError);

      const { error: releaseError } = await supabase
        .from('Appointment')
        .update({ is_available: true })
        .eq('appointment_id', oldSlotId);
      if (releaseError) console.error('Supabase reschedule (release old slot) failed:', releaseError);

      logSQL(
        `-- RESCHEDULE: retiring old booking\nUPDATE Patient_Appointment SET status = 'cancelled' WHERE patient_appointment_id = '${oldPatientAppointmentId}';\nUPDATE Appointment SET is_available = TRUE WHERE appointment_id = '${oldSlotId}';`,
        'UPDATE'
      );
    }

    // 3. Lock the newly booked slot.
    setAppointmentSlotsTable(prev => prev.map(s =>
      s.appointment_id === slot!.appointment_id ? { ...s, is_available: false } : s
    ));
    const { error: lockError } = await supabase.from('Appointment').update({ is_available: false }).eq('appointment_id', slot.appointment_id);
    if (lockError) console.error('Supabase slot lock failed:', lockError);

    // 4. Create the new booking record. Both a fresh booking and a
    // reschedule land here as a brand-new Patient_Appointment row.
    const newPatientAppointmentId = `PA-${selectedPatientId}-${Date.now()}`;

    setPatientAppointmentTable(prev => [...prev, {
      patient_appointment_id: newPatientAppointmentId,
      patient_id: selectedPatientId,
      appointment_id: slot!.appointment_id,
      status: 'booked',
      attendance: null,
      calendar_added: false,
    }]);

    const { error } = await supabase
      .from('Patient_Appointment')
      .insert({
        patient_appointment_id: newPatientAppointmentId,
        patient_id: selectedPatientId,
        appointment_id: slot.appointment_id,
        status: 'booked',
      });
    if (error) console.error('Supabase booking insert failed:', error);

    logSQL(
      `INSERT INTO Patient_Appointment (patient_appointment_id, patient_id, appointment_id, status)\nVALUES ('${newPatientAppointmentId}', '${selectedPatientId}', '${slot.appointment_id}', 'booked');`,
      'INSERT'
    );
  };

  const handleCancelAppointmentTransaction = async () => {
    if (!activePatientAppointment) return;

    setPatientAppointmentTable(prev => prev.map(pa =>
      pa.patient_appointment_id === activePatientAppointment.patient_appointment_id ? { ...pa, status: 'cancelled' } : pa
    ));
    setAppointmentSlotsTable(prev => prev.map(s =>
      s.appointment_id === activePatientAppointment.appointment_id ? { ...s, is_available: true } : s
    ));

    const { error: e1 } = await supabase
      .from('Patient_Appointment')
      .update({ status: 'cancelled' })
      .eq('patient_appointment_id', activePatientAppointment.patient_appointment_id);
    if (e1) console.error('Supabase cancel update failed:', e1);

    const { error: e2 } = await supabase
      .from('Appointment')
      .update({ is_available: true })
      .eq('appointment_id', activePatientAppointment.appointment_id);
    if (e2) console.error('Supabase slot release failed:', e2);

    logSQL(
      `UPDATE Patient_Appointment SET status = 'cancelled' WHERE patient_appointment_id = '${activePatientAppointment.patient_appointment_id}';`,
      'UPDATE'
    );
    logSQL(
      `UPDATE Appointment SET is_available = TRUE WHERE appointment_id = '${activePatientAppointment.appointment_id}';`,
      'UPDATE'
    );
  };

  const handleCalendarAddedTransaction = async () => {
    if (!activePatientAppointment) return;

    setPatientAppointmentTable(prev => prev.map(pa =>
      pa.patient_appointment_id === activePatientAppointment.patient_appointment_id ? { ...pa, calendar_added: true } : pa
    ));

    const { error } = await supabase
      .from('Patient_Appointment')
      .update({ calendar_added: true })
      .eq('patient_appointment_id', activePatientAppointment.patient_appointment_id);
    if (error) console.error('Supabase calendar update failed:', error);

    logSQL(
      `UPDATE Patient_Appointment SET calendar_added = TRUE WHERE patient_appointment_id = '${activePatientAppointment.patient_appointment_id}';`,
      'UPDATE'
    );
  };

  const handleReminderPrefsTransaction = async (enabled: boolean, channel: string, frequency: string) => {
    const pref = reminderPrefTable.find(r => r.patient_id === selectedPatientId);
    const reminderId = pref?.reminder_id || `REM${Date.now()}`;

    setReminderPrefTable(prev => {
      const exists = prev.some(r => r.patient_id === selectedPatientId);
      if (exists) {
        return prev.map(r => r.patient_id === selectedPatientId ? { ...r, enabled, notification_channel: channel, frequency } : r);
      }
      return [...prev, { reminder_id: reminderId, patient_id: selectedPatientId, enabled, notification_channel: channel, frequency, next_notification_date: null }];
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
    const nextId = `NOT${Date.now()}`;

    const newRecord: NotificationHistoryRecord = {
      notification_id: nextId,
      patient_id: selectedPatientId,
      patient_appointment_id: activePatientAppointment?.patient_appointment_id || null,
      sent_date: '10 July 2026',
      opened_status: 'sent',
      action_taken: 'none'
    };

    setNotificationHistoryTable(prev => [...prev, newRecord]);
    setActiveScreen(ScreenId.NotificationMock);

    const { error } = await supabase.from('NotificationHistory').insert(newRecord);
    if (error) console.error('Supabase notification insert failed:', error);

    logSQL(
      `INSERT INTO NotificationHistory (notification_id, patient_id, patient_appointment_id, sent_date, opened_status, action_taken)\nVALUES ('${nextId}', '${selectedPatientId}', ${newRecord.patient_appointment_id ? `'${newRecord.patient_appointment_id}'` : 'NULL'}, '10 July 2026', 'sent', 'none');`,
      'INSERT'
    );
  };

  const handleNotificationActionTransaction = async (action: 'confirmed' | 'rescheduled' | 'education_viewed') => {
    if (activePatientAppointment && action === 'confirmed') {
      setPatientAppointmentTable(prev => prev.map(pa =>
        pa.patient_appointment_id === activePatientAppointment.patient_appointment_id ? { ...pa, status: 'confirmed' } : pa
      ));
      const { error } = await supabase
        .from('Patient_Appointment')
        .update({ status: 'confirmed' })
        .eq('patient_appointment_id', activePatientAppointment.patient_appointment_id);
      if (error) console.error('Supabase appointment confirm failed:', error);
      logSQL(
        `UPDATE Patient_Appointment SET status = 'confirmed' WHERE patient_appointment_id = '${activePatientAppointment.patient_appointment_id}';`,
        'UPDATE'
      );
    } else if (activePatientAppointment && action === 'rescheduled') {
      setPatientAppointmentTable(prev => prev.map(pa =>
        pa.patient_appointment_id === activePatientAppointment.patient_appointment_id ? { ...pa, status: 'booked' } : pa
      ));
      const { error } = await supabase
        .from('Patient_Appointment')
        .update({ status: 'booked' })
        .eq('patient_appointment_id', activePatientAppointment.patient_appointment_id);
      if (error) console.error('Supabase appointment reschedule-flag failed:', error);
      logSQL(
        `UPDATE Patient_Appointment SET status = 'booked' WHERE patient_appointment_id = '${activePatientAppointment.patient_appointment_id}';`,
        'UPDATE'
      );
    }

    const lastRecord = [...notificationHistoryTable].reverse().find(n => n.patient_id === selectedPatientId);
    const lastRecordId = lastRecord?.notification_id || 'NOT501';

    setNotificationHistoryTable(prev =>
      prev.map(n => n.notification_id === lastRecordId ? { ...n, opened_status: 'opened', action_taken: action } : n)
    );

    const { error } = await supabase
      .from('NotificationHistory')
      .update({ opened_status: 'opened', action_taken: action })
      .eq('notification_id', lastRecordId);
    if (error) console.error('Supabase notification action update failed:', error);

    logSQL(
      `UPDATE NotificationHistory SET opened_status = 'opened', action_taken = '${action}' WHERE notification_id = '${lastRecordId}';`,
      'UPDATE'
    );
  };

  const handleUpdateEducationProgress = async (patientId: string, percent: number) => {
    setEducationProgressTable(prev => {
      const exists = prev.some(e => e.patient_id === patientId);
      if (exists) {
        return prev.map(e => e.patient_id === patientId ? { ...e, percent_complete: percent } : e);
      }
      return [...prev, { patient_id: patientId, percent_complete: percent }];
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

  // Saves what the patient clicked in the personalisation/onboarding
  // quiz to the database.
  const handleSavePersonalisation = async (
    patientId: string,
    familiarity: 'new' | 'little' | 'research' | 'advanced' | null,
    topics: string[],
    concerns: string[]
  ) => {
    setPersonalisationTable(prev => {
      const exists = prev.some(p => p.patient_id === patientId);
      const updated = { patient_id: patientId, familiarity, topics, concerns, completed_at: familiarity ? new Date().toISOString() : null };
      if (exists) {
        return prev.map(p => p.patient_id === patientId ? { ...p, ...updated } : p);
      }
      return [...prev, updated];
    });

    const { error } = await supabase
      .from('PersonalisationResponse')
      .upsert({
        patient_id: patientId,
        familiarity,
        topics,
        concerns,
        completed_at: familiarity ? new Date().toISOString() : null,
      }, { onConflict: 'patient_id' });
    if (error) console.error('Supabase personalisation save failed:', error);

    logSQL(
      `INSERT INTO PersonalisationResponse (patient_id, familiarity, topics, concerns, completed_at)\nVALUES ('${patientId}', ${familiarity ? `'${familiarity}'` : 'NULL'}, '{${topics.join(',')}}', '{${concerns.join(',')}}', ${familiarity ? 'now()' : 'NULL'})\nON CONFLICT (patient_id) DO UPDATE SET familiarity = EXCLUDED.familiarity, topics = EXCLUDED.topics, concerns = EXCLUDED.concerns, completed_at = EXCLUDED.completed_at;`,
      'UPDATE'
    );
  };

  const handleSimulateNotification = () => {
    handleTriggerNotificationTransaction();
  };

  // Switching personas is READ-ONLY: no writes, ever. Everything the
  // UI needs is already loaded from Supabase and looked up per-patient
  // in the derived values above.
  const handleSelectPersona = (patientId: string) => {
    setSelectedPatientId(patientId);
    setActiveScreen(ScreenId.Home);

    if (patientId === 'EW003') {
      setEmilyWongRefreshTrigger(prev => prev + 1);
    }

    logSQL(`-- VIEWING PERSONA: ${patientId}`, 'SELECT');
  };

  // Explicit, button-triggered reset for demo purposes: puts Emily
  // back to a clean "hasn't started" state so you can show the
  // booking/quiz flow from scratch. This only runs when the button
  // is clicked — never automatically — so it's safe to have real
  // writes in here, unlike the old handleSelectPersona bug.
  const handleResetEmilyProgress = async () => {
    setSelectedPatientId('EW003');
    setActiveScreen(ScreenId.Home);

    // 1. Cancel any active booking Emily has, and free its slot back
    // to available — same real transaction as a normal cancel.
    const emilyAppointment = [...patientAppointmentTable]
      .filter(pa => pa.patient_id === 'EW003' && pa.status !== 'cancelled')
      .sort((a, b) => (b.booked_at || '').localeCompare(a.booked_at || ''))[0];

    if (emilyAppointment) {
      setPatientAppointmentTable(prev => prev.map(pa =>
        pa.patient_appointment_id === emilyAppointment.patient_appointment_id ? { ...pa, status: 'cancelled' } : pa
      ));
      setAppointmentSlotsTable(prev => prev.map(s =>
        s.appointment_id === emilyAppointment.appointment_id ? { ...s, is_available: true } : s
      ));

      const { error: e1 } = await supabase
        .from('Patient_Appointment')
        .update({ status: 'cancelled' })
        .eq('patient_appointment_id', emilyAppointment.patient_appointment_id);
      if (e1) console.error('Supabase reset (cancel booking) failed:', e1);

      const { error: e2 } = await supabase
        .from('Appointment')
        .update({ is_available: true })
        .eq('appointment_id', emilyAppointment.appointment_id);
      if (e2) console.error('Supabase reset (release slot) failed:', e2);

      logSQL(
        `-- RESET EMILY: cancelling her booking and releasing the slot\nUPDATE Patient_Appointment SET status = 'cancelled' WHERE patient_appointment_id = '${emilyAppointment.patient_appointment_id}';\nUPDATE Appointment SET is_available = TRUE WHERE appointment_id = '${emilyAppointment.appointment_id}';`,
        'UPDATE'
      );
    }

    // 2. Clear her personalisation quiz answers (familiarity/topics/
    // concerns back to empty, completed_at back to null).
    await handleSavePersonalisation('EW003', null, [], []);

    // 3. Reset her education progress to 0%.
    setEducationProgressTable(prev => {
      const exists = prev.some(e => e.patient_id === 'EW003');
      if (exists) {
        return prev.map(e => e.patient_id === 'EW003' ? { ...e, percent_complete: 0 } : e);
      }
      return [...prev, { patient_id: 'EW003', percent_complete: 0 }];
    });

    const { error: e3 } = await supabase.from('EducationProgress').upsert({
      patient_id: 'EW003',
      percent_complete: 0
    }, { onConflict: 'patient_id' });
    if (e3) console.error('Supabase reset (education progress) failed:', e3);

    logSQL("UPDATE EducationProgress SET percent_complete = 0 WHERE patient_id = 'EW003';", 'UPDATE');

    // 4. Trigger the questionnaire UI to reset its local step/state.
    setEmilyWongRefreshTrigger(prev => prev + 1);
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
          personalisationResponse={activePersonalisation}
          onSavePersonalisation={handleSavePersonalisation}
          emilyWongRefreshTrigger={emilyWongRefreshTrigger}
          onSelectPersona={handleSelectPersona}
          onResetEmily={handleResetEmilyProgress}
        />
      </main>

    </div>
  );
}
