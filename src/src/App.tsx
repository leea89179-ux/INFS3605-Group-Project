import React, { useState } from 'react';
import { ScreenId, Appointment, ReminderPreferences } from './types';
import PhoneSimulator from './components/PhoneSimulator';
import AnnotationsPanel from './components/AnnotationsPanel';
import Chatbot from './components/Chatbot';
import { 
  HeartPulse, Compass, Settings, Layers, Users, BookOpen, 
  Sparkles, Smartphone, CheckCircle2, ShieldAlert, Undo2, 
  Calendar, Check, ArrowRight, HelpCircle
} from 'lucide-react';

export default function App() {
  // Global Shared States for the Figma Prototype
  const [activeScreen, setActiveScreen] = useState<ScreenId>(ScreenId.Home);
  
  const [appointment, setAppointment] = useState<Appointment>({
    date: 'Fri, 17 Feb 2026',
    timeSlot: '9.00 AM',
    clinic: 'First Health Group (Serangoon)',
    status: 'pending', // 'pending' | 'booked' | 'completed'
  });

  const [reminderPrefs, setReminderPrefs] = useState<ReminderPreferences>({
    enabled: true,
    channel: 'both',
    frequency: '7days_before',
    previewText: 'Hi Lisa, your FH genetic testing is in 7 days.',
  });

  // Action Helpers to Fast-Forward Prototype States
  const handleSimulateReset = () => {
    setAppointment({
      date: 'Fri, 17 Feb 2026',
      timeSlot: '9.00 AM',
      clinic: 'First Health Group (Serangoon)',
      status: 'pending',
    });
    setReminderPrefs({
      enabled: true,
      channel: 'both',
      frequency: '7days_before',
      previewText: 'Hi Lisa, your FH genetic testing is in 7 days.',
    });
    setActiveScreen(ScreenId.Home);
  };

  const handleSimulateBooked = () => {
    setAppointment({
      date: 'Fri, 17 Feb 2026',
      timeSlot: '9.00 AM',
      clinic: 'First Health Group (Serangoon)',
      status: 'booked',
    });
    setActiveScreen(ScreenId.Booking);
  };

  const handleSimulateNotification = () => {
    setActiveScreen(ScreenId.NotificationMock);
  };

  const handleSimulateReminders = () => {
    setReminderPrefs({
      ...reminderPrefs,
      enabled: true
    });
    setActiveScreen(ScreenId.ReminderSettings);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-600 selection:text-white">
      
      {/* 1. Official Singapore GovTech Styled Header banner */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 shrink-0 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-sm font-mono">
                GovTech Singapore
              </span>
              <span className="bg-teal-500/10 text-teal-400 text-[10px] font-semibold px-2 py-0.5 rounded border border-teal-500/20">
                HealthHub v12.4
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2 font-display">
              <HeartPulse className="w-6 h-6 text-teal-500 shrink-0" />
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
              <p className="text-xs font-bold text-teal-400">Up to 75% MOH</p>
            </div>
            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-center">
              <p className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Elderly UX</p>
              <p className="text-xs font-bold text-teal-400">44px Targets</p>
            </div>
            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-center">
              <p className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">LIA Protection</p>
              <p className="text-xs font-bold text-teal-400">No Premium Impact</p>
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
              <h3 className="text-sm font-bold text-teal-400 uppercase tracking-wider font-mono flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-500" />
                Prototype Controller
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fast-forward the clinical journey to test specific behavioral triggers:
              </p>
            </div>

            <div className="space-y-2 text-xs">
              {/* Reset to initial */}
              <button
                onClick={handleSimulateReset}
                className="w-full py-2.5 px-3 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 hover:border-slate-700 transition flex items-center justify-between font-medium group"
              >
                <span className="flex items-center gap-2">
                  <Undo2 className="w-3.5 h-3.5 text-slate-400" />
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
                  <Calendar className="w-3.5 h-3.5 text-teal-500" />
                  2. Booked Confirmation
                </span>
                <span className="text-[10px] text-teal-400 bg-teal-950/40 px-1.5 py-0.5 rounded font-mono">
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
                <CheckCircle2 className="w-4 h-4 text-[#008375]" />
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
            <p className="text-xs text-teal-400 font-semibold">Click any element inside the device to test flows</p>
          </div>

          <PhoneSimulator
            activeScreen={activeScreen}
            onChangeScreen={setActiveScreen}
            appointment={appointment}
            onUpdateAppointment={setAppointment}
            reminderPrefs={reminderPrefs}
            onUpdateReminderPrefs={setReminderPrefs}
            onTriggerNotification={handleSimulateNotification}
          />

          <div className="bg-slate-900/60 border border-slate-800/80 px-4 py-2 rounded-xl text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-teal-500" />
            <span>Figma Component: HealthHub_Simulator_iOS</span>
          </div>

        </div>

        {/* RIGHT COLUMN (Lg: 4/12) - Figma Wireframe Annotations Panel */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Interactive Annotations Syncing */}
          <div className="h-[680px]">
            <AnnotationsPanel 
              activeScreen={activeScreen} 
              onSelectScreen={setActiveScreen} 
            />
          </div>

          {/* Additional UX Strategy Box */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-500" />
              Prevention of Patient Leakage
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              GovTech's review highlights that clinic referrals leak due to <strong>cognitive latency</strong> and <strong>administrative drag</strong>. By integrating the educational cards directly into the booking journey, reassurance on subsidies (MediSave) and insurance (LIA moratorium) is delivered <em>before</em> the patient leaves the digital frame.
            </p>
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
