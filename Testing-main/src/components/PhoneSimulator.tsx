import React, { useState, useEffect } from 'react';
import { ScreenId, Appointment, ReminderPreferences } from '../types';
import { 
  HeartPulse, Dna, ClipboardList, Coins, ShieldAlert, Pill, 
  ChevronRight, Calendar, Bell, Check, ArrowLeft, Play, Pause, 
  MapPin, CheckSquare, Square, Info, ShieldCheck, ExternalLink,
  MessageCircle, Smartphone, AlertCircle, Share2, Settings, FileText,
  CreditCard, User, BookOpen, Users, Shield, Clock, ChevronDown,
  X, ChevronLeft, Download, Printer
} from 'lucide-react';
import { educationalSections, preCounsellingChecklist, faqs, helpfulResources, HelpfulResource } from '../data/education';

interface PhoneSimulatorProps {
  activeScreen: ScreenId;
  onChangeScreen: (screenId: ScreenId) => void;
  appointment: Appointment;
  onUpdateAppointment: (app: Appointment) => void;
  reminderPrefs: ReminderPreferences;
  onUpdateReminderPrefs: (prefs: ReminderPreferences) => void;
  onTriggerNotification: () => void;
  isFHReferred: boolean;
}

export default function PhoneSimulator({
  activeScreen,
  onChangeScreen,
  appointment,
  onUpdateAppointment,
  reminderPrefs,
  onUpdateReminderPrefs,
  onTriggerNotification,
  isFHReferred,
}: PhoneSimulatorProps) {
  // Local state for interactive elements
  const [eduExpanded, setEduExpanded] = useState<Record<string, boolean>>({});
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('all');
  const [faqExpanded, setFaqExpanded] = useState<Record<number, boolean>>({});
  const [checklist, setChecklist] = useState(preCounsellingChecklist);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoFrame, setVideoFrame] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [faqActiveIdx, setFaqActiveIdx] = useState<number | null>(null);

  // Deep-read document viewer states
  const [selectedResource, setSelectedResource] = useState<HelpfulResource | null>(null);
  const [resourcePage, setResourcePage] = useState<number>(0);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  useEffect(() => {
    if (downloadToast) {
      const timer = setTimeout(() => {
        setDownloadToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [downloadToast]);

  // Calendar booking state
  const [selectedDate, setSelectedDate] = useState('Fri, 17 Feb 2026');
  const [selectedSlot, setSelectedSlot] = useState('9.00 AM');
  
  // Simulated dates (Singapore hospital calendar)
  const availableDates = [
    { day: 'Mon', num: '15', full: 'Mon, 15 Feb 2026' },
    { day: 'Tue', num: '16', full: 'Tue, 16 Feb 2026' },
    { day: 'Wed', num: '17', full: 'Wed, 17 Feb 2026' },
    { day: 'Thu', num: '18', full: 'Thu, 18 Feb 2026' },
    { day: 'Fri', num: '19', full: 'Fri, 19 Feb 2026' },
    { day: 'Mon', num: '22', full: 'Mon, 22 Feb 2026' },
  ];

  const availableSlots = [
    { time: '9.00 AM', period: 'Morning' },
    { time: '10.30 AM', period: 'Morning' },
    { time: '2.00 PM', period: 'Afternoon' },
    { time: '3.30 PM', period: 'Afternoon' },
  ];

  // Video Animation Play Loop
  useEffect(() => {
    let interval: any;
    if (isPlayingVideo) {
      interval = setInterval(() => {
        setVideoFrame((prev) => (prev + 1) % 4);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlayingVideo]);

  // Expand helper
  const toggleEdu = (id: string) => {
    setEduExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleBookSubmit = () => {
    onUpdateAppointment({
      date: selectedDate,
      timeSlot: selectedSlot,
      clinic: 'First Health Group (Serangoon)',
      status: 'booked'
    });
  };

  const handleCancelBooking = () => {
    onUpdateAppointment({
      ...appointment,
      status: 'pending'
    });
  };

  const handleNotificationClickAction = (action: 'confirm' | 'reschedule' | 'learn') => {
    if (action === 'confirm') {
      onUpdateAppointment({
        ...appointment,
        status: 'booked' // Keep as booked but marked verified
      });
      alert('MOH HealthHub: Thank you for confirming your attendance for Fri, 17 Feb 2026 at 9:00 AM! See you there.');
      onChangeScreen(ScreenId.ProgressTimeline);
    } else if (action === 'reschedule') {
      onChangeScreen(ScreenId.Booking);
    } else if (action === 'learn') {
      onChangeScreen(ScreenId.Education);
    }
  };

  const filteredFaqs = activeFaqCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeFaqCategory);

  // Icon selector helper
  const getIcon = (name: string, customColor?: string) => {
    const color = customColor || "text-[#008375]";
    switch (name) {
      case 'HeartPulse': return <HeartPulse className={`w-5 h-5 ${color}`} />;
      case 'Dna': return <Dna className={`w-5 h-5 ${color}`} />;
      case 'ClipboardList': return <ClipboardList className={`w-5 h-5 ${color}`} />;
      case 'Coins': return <Coins className={`w-5 h-5 ${color}`} />;
      case 'ShieldAlert': return <ShieldAlert className={`w-5 h-5 ${color}`} />;
      case 'Pills': return <Pill className={`w-5 h-5 ${color}`} />;
      case 'Pill': return <Pill className={`w-5 h-5 ${color}`} />;
      case 'Heart': return <HeartPulse className={`w-5 h-5 ${color}`} />;
      case 'HelpCircle': return <Info className={`w-5 h-5 ${color}`} />;
      case 'FileText': return <FileText className={`w-5 h-5 ${color}`} />;
      case 'BookOpen': return <BookOpen className={`w-5 h-5 ${color}`} />;
      case 'Users': return <Users className={`w-5 h-5 ${color}`} />;
      case 'Shield': return <Shield className={`w-5 h-5 ${color}`} />;
      case 'ShieldCheck': return <ShieldCheck className={`w-5 h-5 ${color}`} />;
      case 'Play': return <Play className={`w-5 h-5 ${color} fill-current ml-0.5`} />;
      default: return <Info className={`w-5 h-5 ${color}`} />;
    }
  };

  return (
    <div className="relative w-[375px] h-[780px] bg-slate-950 rounded-[55px] border-[12px] border-slate-800 shadow-2xl overflow-hidden flex flex-col shrink-0 select-none">
      
      {/* Physical Dynamic Island/Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-full z-50 flex items-center justify-center">
        <div className="w-3.5 h-3.5 bg-slate-900 rounded-full ml-auto mr-4" />
      </div>

      {/* Simulated System Status Bar */}
      <div className="bg-slate-100 text-slate-800 px-7 pt-3.5 pb-1 flex justify-between items-center text-[11px] font-semibold z-40 select-none">
        <span>09:41</span>
        <div className="flex items-center gap-1.5">
          <span>5G</span>
          <div className="w-4 h-2.5 border border-slate-800 rounded-sm p-0.5 flex items-center">
            <div className="w-2.5 h-full bg-slate-800 rounded-2xs" />
          </div>
        </div>
      </div>

      {/* Screen Container with Scroll/Frame */}
      <div className="flex-1 overflow-y-auto bg-slate-50 text-slate-800 flex flex-col relative">

        {/* ----------------- SCREEN 1: HOME ----------------- */}
        {activeScreen === ScreenId.Home && (
          <div className="flex-col flex flex-1 bg-slate-50">
            {/* 1. Official HealthHub Top Header Row */}
            <div className="bg-white px-4 py-3 flex justify-between items-center border-b border-slate-100 shrink-0">
              {/* Notification Bell */}
              <div className="relative cursor-pointer hover:opacity-80 transition" onClick={() => onChangeScreen(ScreenId.ReminderSettings)}>
                <Bell className="w-5 h-5 text-slate-700" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
              </div>

              {/* HealthHub Center Logo */}
              <div className="flex items-center gap-1">
                <span className="font-bold text-slate-800 text-sm tracking-tight">Health</span>
                <span className="font-black text-[#008375] text-sm tracking-tight mr-1">Hub</span>
                {/* Custom multi-color flower logo SVG resembling Singapore HealthHub */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="6" fill="#FBBF24" fillOpacity="0.85" />
                  <circle cx="16" cy="8" r="6" fill="#10B981" fillOpacity="0.85" />
                  <circle cx="12" cy="15" r="6" fill="#3B82F6" fillOpacity="0.85" />
                  <circle cx="10" cy="12" r="4.5" fill="#EF4444" fillOpacity="0.75" />
                </svg>
              </div>

              {/* Settings Cog */}
              <div className="cursor-pointer hover:opacity-80 transition" onClick={() => onChangeScreen(ScreenId.ReminderSettings)}>
                <Settings className="w-5 h-5 text-slate-700" />
              </div>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto pb-6 space-y-4">
              
              {/* 2. User Welcome Greeting Row */}
              <div className="bg-white px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-[#008375] font-extrabold flex items-center justify-center text-xs border border-teal-100 shadow-inner">
                    LH
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-800">Lisa Ho</h4>
                    <p className="text-[9px] text-slate-400 font-medium">SXXXX321A • Active User</p>
                  </div>
                </div>
                <span className="bg-teal-50 text-[#008375] text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border border-teal-100/70 font-sans">
                  CHAS Blue Member
                </span>
              </div>

              {/* 3. Primary Focus: Personalised FH Genetic Testing Referral Banner */}
              {isFHReferred && (
                <div className="px-4">
                  <div className="bg-[#e6f4f2] border border-teal-100 shadow-[0_4px_16px_rgba(0,131,117,0.06)] rounded-2xl p-5 space-y-4" id="hh-referral-banner-card">
                    
                    {/* Status Chip and Title */}
                    <div className="space-y-1.5">
                      <div className="flex items-center">
                        <span className="bg-white text-[#008375] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-teal-100/80 font-sans shadow-xs">
                          Action Recommended
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-sm text-slate-900 tracking-tight leading-snug">
                        FH Genetic Testing Referral
                      </h3>
                    </div>

                    {/* One sentence explaining WHY (Concise, preferred wording) */}
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      Based on your recent cholesterol results, your doctor recommends FH genetic testing to better understand your condition.
                    </p>

                    {/* Recommended Next Step or Next Appointment Box */}
                    <div className="bg-white/80 p-3.5 rounded-xl border border-teal-100/40 space-y-1" id="hh-next-step-box">
                      {appointment.status === 'booked' ? (
                        <>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Next Appointment</p>
                          <p className="text-xs font-extrabold text-slate-800">Thursday, 9 July</p>
                          <p className="text-[11px] text-slate-500 font-medium">10:00 AM</p>
                        </>
                      ) : (
                        <>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#008375] font-mono">Recommended Next Step</p>
                          <p className="text-xs font-extrabold text-slate-800 leading-tight">
                            Book your pre-test counselling appointment.
                          </p>
                        </>
                      )}
                    </div>

                    {/* Primary & Secondary Call to Actions */}
                    <div className="flex flex-col gap-2">
                      <button
                        id="hh-home-primary-cta"
                        onClick={() => onChangeScreen(ScreenId.Education)}
                        className="w-full h-10 bg-[#008375] hover:bg-teal-800 text-white rounded-xl text-xs font-bold tracking-wide transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer select-none border border-transparent"
                      >
                        Learn Why <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        id="hh-home-secondary-cta"
                        onClick={() => onChangeScreen(ScreenId.Booking)}
                        className="w-full h-10 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer select-none"
                      >
                        {appointment.status === 'booked' ? 'Manage Appointment' : 'Book Appointment'}
                      </button>
                    </div>

                    {/* Patient Journey Progress Pathway */}
                    <div className="space-y-3 pt-3.5 border-t border-teal-100/50">
                      <p className="text-[10px] font-bold text-teal-800/80 uppercase tracking-widest font-sans">YOUR JOURNEY</p>
                      <div className="relative flex items-start justify-between px-3 pt-1" style={{ minHeight: '52px' }}>
                        {/* Connecting Line Background */}
                        <div className="absolute top-2.5 left-[12%] right-[12%] h-[1.5px] bg-slate-200" />
                        {/* Colored Active Line */}
                        <div 
                          className="absolute top-2.5 left-[12%] h-[1.5px] bg-[#008375] transition-all duration-300" 
                          style={{ width: appointment.status === 'booked' ? '76%' : '38%' }} 
                        />

                        {/* Step 1: Referral */}
                        <div className="flex flex-col items-center relative z-10 w-[64px]">
                          <div className="w-5 h-5 rounded-full bg-[#008375] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                            ✓
                          </div>
                          <span className="text-[9px] font-bold text-[#008375] mt-1.5 text-center leading-tight">
                            Referral
                          </span>
                        </div>

                        {/* Step 2: Book Counselling */}
                        <div className="flex flex-col items-center relative z-10 w-[96px]">
                          {appointment.status === 'booked' ? (
                            <>
                              <div className="w-5 h-5 rounded-full bg-[#008375] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                                ✓
                              </div>
                              <span className="text-[9px] font-bold text-[#008375] mt-1.5 text-center leading-tight">
                                Book Counselling
                              </span>
                            </>
                          ) : (
                            <>
                              <div className="w-5 h-5 rounded-full border-2 border-[#008375] bg-white flex items-center justify-center shadow-xs">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#008375]" />
                              </div>
                              <span className="text-[9px] font-bold text-[#008375] mt-1.5 text-center leading-tight">
                                Book Counselling
                              </span>
                            </>
                          )}
                        </div>

                        {/* Step 3: Genetic Testing */}
                        <div className="flex flex-col items-center relative z-10 w-[80px]">
                          <div className="w-5 h-5 rounded-full border border-slate-300 bg-white flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                          </div>
                          <span className="text-[9px] font-semibold text-slate-400 mt-1.5 text-center leading-tight">
                            Genetic Testing
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Subtle Reassurance Statement */}
                    <div className="text-center pt-2 border-t border-teal-100/30">
                      <p className="text-[10px] text-slate-500 font-medium">
                        Your doctor has already reviewed your eligibility.
                      </p>
                    </div>

                  </div>
                </div>
              )}

              {/* 4. Quick Links Grid (1:1 with reference screenshot) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-4">
                  <h3 className="font-display font-bold text-slate-900 text-xs tracking-tight">Quick Links</h3>
                  <button className="text-blue-600 text-[11px] font-bold hover:underline">Edit</button>
                </div>

                <div className="grid grid-cols-3 gap-2.5 px-4">
                  {/* Card 1: Appointments */}
                  <button 
                    onClick={() => onChangeScreen(ScreenId.Booking)}
                    className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center mb-1.5 shrink-0">
                      <Calendar className="w-4.5 h-4.5 text-rose-500" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Appointments</span>
                  </button>

                  {/* Card 2: CHAS */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-1.5 shrink-0">
                      <div className="border-1.5 border-blue-400 rounded px-1.5 py-0.5 text-[8px] font-black text-blue-500 bg-white leading-none scale-90">CHAS</div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">CHAS</span>
                  </div>

                  {/* Card 3: Lab Reports */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mb-1.5 shrink-0">
                      <ClipboardList className="w-4.5 h-4.5 text-emerald-600" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Lab reports</span>
                  </div>

                  {/* Card 4: Medical reports / certs */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square">
                    <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center mb-1.5 shrink-0">
                      <FileText className="w-4.5 h-4.5 text-teal-600" />
                    </div>
                    <span className="text-[9px] font-bold text-slate-700 leading-tight">Medical reports / requests</span>
                  </div>

                  {/* Card 5: Medication Refill */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square">
                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mb-1.5 shrink-0">
                      <Pill className="w-4.5 h-4.5 text-amber-600" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Medication refill</span>
                  </div>

                  {/* Card 6: Payment */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square">
                    <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center mb-1.5 shrink-0">
                      <CreditCard className="w-4.5 h-4.5 text-sky-600" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Payment</span>
                  </div>
                </div>
              </div>

              {/* 5. Health Profiles Section (1:1 with reference screenshot) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-4">
                  <h3 className="font-display font-bold text-slate-900 text-xs tracking-tight">Health Profiles</h3>
                  <button className="text-slate-500 text-[11px] font-semibold hover:underline flex items-center gap-0.5">
                    View all <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none">
                  {/* Lisa's card */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3 shadow-[0_2px_6px_rgba(0,0,0,0.02)] min-w-[200px] shrink-0">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                      <User className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-800">SXXXX321A</p>
                      <p className="text-[9px] text-slate-400 font-semibold uppercase">LISA HO</p>
                    </div>
                  </div>

                  {/* Dependent card (Spouse) */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3 shadow-[0_2px_6px_rgba(0,0,0,0.02)] min-w-[200px] shrink-0">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                      <User className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-800">TXXXX456B</p>
                      <p className="text-[9px] text-slate-400 font-semibold uppercase">HO CHIN TECK</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Programmes Section (1:1 with reference screenshot) */}
              <div className="space-y-2">
                <div className="px-4">
                  <h3 className="font-display font-bold text-slate-900 text-xs tracking-tight">Programmes</h3>
                </div>

                <div className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none">
                  {/* Card 1: Diabetes Hub (Beautiful custom stylized graphic matching screenshot style) */}
                  <div className="bg-amber-100/90 border border-amber-200 rounded-2xl p-4 flex flex-col justify-between h-32 min-w-[220px] relative overflow-hidden shrink-0 shadow-xs">
                    <div className="absolute right-2 bottom-2 text-5xl opacity-40 select-none">🩺</div>
                    <div>
                      <span className="bg-amber-500/20 text-amber-800 text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full font-mono">Active Hub</span>
                      <h4 className="font-display font-bold text-slate-900 text-[11px] mt-1.5">Diabetes Hub</h4>
                    </div>
                    <p className="text-[9px] text-slate-600 leading-snug">Personalized guides for managing and preventing diabetes.</p>
                  </div>

                  {/* Card 2: Mental Well-being */}
                  <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 flex flex-col justify-between h-32 min-w-[220px] relative overflow-hidden shrink-0 shadow-xs">
                    <div className="absolute right-2 bottom-2 text-5xl opacity-40 select-none">🧠</div>
                    <div>
                      <span className="bg-teal-500/20 text-teal-800 text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full font-mono">Resource</span>
                      <h4 className="font-display font-bold text-slate-900 text-[11px] mt-1.5">Mental Well-being</h4>
                    </div>
                    <p className="text-[9px] text-slate-600 leading-snug">Mindfulness guides and support networks for emotional safety.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}


        {/* ----------------- SCREEN 2: EDUCATION HUB ----------------- */}
        {activeScreen === ScreenId.Education && (
          <div className="flex-col flex flex-1 pb-6 bg-slate-50">
            {/* Top Navigation */}
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center shrink-0">
              <div className="flex items-center gap-2">
                <button onClick={() => onChangeScreen(ScreenId.Home)} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer">
                  <ArrowLeft className="w-5 h-5 text-slate-700" />
                </button>
                <span className="font-bold text-[11px] sm:text-xs text-slate-800 tracking-tight">Understanding Familial Hypercholestrolaemia (FH)</span>
              </div>
            </div>

            {!isFHReferred ? (
              /* Fallback state when patient is not referred */
              <div className="flex-col flex flex-1 pb-12 items-center justify-center p-6 text-center space-y-4 my-auto">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                  <ShieldAlert className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-bold text-sm text-slate-800">No Active Genetic Referrals</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[280px]">
                  This personalized educational hub is only visible for patients with an active clinical referral for FH genetic testing.
                </p>
                <button 
                  onClick={() => onChangeScreen(ScreenId.Home)} 
                  className="px-4 py-2.5 bg-[#008375] hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-sm transition cursor-pointer"
                >
                  Back to HealthHub Home
                </button>
              </div>
            ) : (
              /* High-fidelity Education Hub content for referred patients */
              <>
                {/* Profile Info Row */}
                <div className="bg-teal-50/60 border-b border-teal-100 px-4 py-2.5 flex justify-between items-center text-[11px] shrink-0">
                  <span className="text-slate-600">Patient: <strong className="text-slate-800">Lisa Ho (SXXXX321A)</strong></span>
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-extrabold border border-emerald-200/50">MOH Referred</span>
                </div>

                {/* Hero Section - Edge-to-edge Deep Teal Banner */}
                <div className="bg-[#008375] text-white px-5 py-5 space-y-1.5 shrink-0">
                  <span className="text-[9.5px] font-bold tracking-widest text-teal-100 font-mono uppercase">HI LISA,</span>
                  <h3 className="font-display font-extrabold text-sm text-white tracking-tight leading-snug">
                    Your FH Learning Guide
                  </h3>
                  <p className="text-[11px] text-teal-50/90 leading-relaxed font-sans">
                    A personalised guide on why and how to prepare after you have been referred for FH genetic testing.
                  </p>
                </div>

                <div className="p-4 space-y-4">

                  {/* Natural Clinical Note Banner */}
                  <div className="bg-teal-50/50 border border-teal-100/80 rounded-xl p-3 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-[#008375] shrink-0 mt-0.5" />
                    <p className="text-[10px] text-teal-800 leading-normal font-medium">
                      Please note: Being referred for a genetic test does not mean you have FH. It is simply a proactive measure to assess your natural risk.
                    </p>
                  </div>

                  {/* Patient Experience Video Section */}
                  <div className="bg-slate-900 rounded-2xl overflow-hidden relative shadow-md">
                    {/* Simulated Video Frame */}
                    <div className="h-44 flex flex-col items-center justify-center relative p-4 text-center">
                      {isPlayingVideo ? (
                        <div className="absolute inset-0 bg-teal-950/85 flex flex-col justify-between p-4 text-white">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-teal-300 self-start">Patient Experience Story (Chloe, 21)</span>
                          
                          {/* CSS cartoon animations based on active simulated frame */}
                          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                            {videoFrame === 0 && (
                              <div className="animate-fade-in space-y-1">
                                <span className="text-2xl">💡</span>
                                <p className="text-[11px] font-semibold">"I eat healthy and stay active. I thought high cholesterol was only for elderly people or those who lead an unhealthy lifestyle."</p>
                              </div>
                            )}
                            {videoFrame === 1 && (
                              <div className="animate-fade-in space-y-1">
                                <span className="text-2xl">🤝</span>
                                <p className="text-[11px] font-semibold">"The genetic counsellor didn't push me at all. They just laid out the facts and let me make my own decision."</p>
                              </div>
                            )}
                            {videoFrame === 2 && (
                              <div className="animate-fade-in space-y-1">
                                <span className="text-2xl">🛡️</span>
                                <p className="text-[11px] font-semibold">"I found out existing health insurance is fully protected, and MOH subsidies cover up to 75% of the cost."</p>
                              </div>
                            )}
                            {videoFrame === 3 && (
                              <div className="animate-fade-in space-y-1">
                                <span className="text-2xl">❤️</span>
                                <p className="text-[11px] font-semibold">"I decided to do the test because getting clear facts helped me take control of my health and clarity on how to keep myself healthy."</p>
                              </div>
                            )}
                          </div>

                          {/* Video progress indicator bar */}
                          <div className="w-full flex items-center gap-2">
                            <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                              <div className="bg-teal-400 h-full transition-all duration-300" style={{ width: `${(videoFrame + 1) * 25}%` }} />
                            </div>
                            <span className="text-[9px] font-mono">0:{(videoFrame + 1) * 11} / 0:45</span>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-slate-900/90 flex flex-col justify-center items-center text-white p-4">
                          <div className="w-12 h-12 rounded-full bg-teal-600 hover:bg-teal-500 flex items-center justify-center shadow-lg cursor-pointer transform active:scale-95 transition" onClick={() => setIsPlayingVideo(true)}>
                            <Play className="w-6 h-6 text-white ml-0.5 fill-current" />
                          </div>
                          <h4 className="font-bold text-xs mt-3">▶ What happens during FH testing?</h4>
                          <p className="text-[10px] text-slate-400 mt-1 max-w-[240px]">See what to expect before your appointment.</p>
                        </div>
                      )}
                    </div>

                    {/* Video controls */}
                    <div className="bg-slate-950 px-4 py-2 flex justify-between items-center text-xs text-slate-300 border-t border-slate-800">
                      <button 
                        onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                        className="text-teal-400 font-bold hover:text-teal-300 flex items-center gap-1 cursor-pointer"
                      >
                        {isPlayingVideo ? <><Pause className="w-3.5 h-3.5" /> Pause Story</> : <><Play className="w-3.5 h-3.5" /> Play Story</>}
                      </button>
                      
                      <button 
                        onClick={() => setShowTranscript(!showTranscript)}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium transition cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-teal-400" />
                        {showTranscript ? 'Hide Transcript' : 'View Transcript'}
                      </button>
                    </div>
                  </div>

                  {/* Accessible Transcript Container */}
                  {showTranscript && (
                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 text-[10px] text-slate-600 leading-relaxed space-y-1.5 shadow-3xs animate-fade-in">
                      <p className="font-bold text-teal-800 uppercase tracking-wider text-[8px] font-mono border-b border-slate-100 pb-1">Video Transcript & Captions</p>
                      <p><strong>[Chloe, 21]:</strong> "Hey everyone, I'm Chloe. When a screening flagged my LDL cholesterol as extremely high, I was totally confused. I live a healthy lifestyle, exercise regularly, and eat well, so I assumed high cholesterol was something only older people get, or maybe people who lead unhealty lifestyles. My doctor explained that FH is inherited from birth—it has nothing to do with lifestyle or age."</p>
                      <p><strong>[Skepticism & Counselling]:</strong> "I was really skeptical about genetic counselling at first but, the counsellor didn't try to push me. She just explained how the genetics work, answered my questions about privacy, and left the decision completely up to me."</p>
                      <p><strong>[The Facts]:</strong> "We talked about the practical side too. She clarified that under Singapore's guidelines, existing health insurance can't be touched, and MOH covers up to 75% of the costs. There were no hidden catches."</p>
                      <p><strong>[My Decision]:</strong> "In the end, I decided to go ahead and take the blood test. Getting the facts didn't change who I am, but it did give me clarity on how to keep myself healthy. It's about knowing your body, not living in fear."</p>
                    </div>
                  )}

                  {/* Spec 4: Statistics 2x2 Grid 'Did You Know?' */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">💡</span>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#008375] font-mono">Did You Know?</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Stat 1 */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between shadow-3xs space-y-1.5">
                        <div className="text-xl">🇸🇬</div>
                        <div>
                          <h5 className="font-display font-extrabold text-[#008375] text-[15px] leading-tight">1 in 250</h5>
                          <p className="font-bold text-[10px] text-slate-800 leading-snug">Singaporeans have FH</p>
                        </div>
                        <p className="text-[9.5px] text-slate-500 leading-relaxed">
                          More common than most realize — over 22,000 Singaporeans are affected.
                        </p>
                      </div>

                      {/* Stat 2 */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between shadow-3xs space-y-1.5">
                        <div className="text-xl">🔍</div>
                        <div>
                          <h5 className="font-display font-extrabold text-[#008375] text-[15px] leading-tight">~90%</h5>
                          <p className="font-bold text-[10px] text-slate-800 leading-snug font-sans">go undiagnosed</p>
                        </div>
                        <p className="text-[9.5px] text-slate-500 leading-relaxed font-sans">
                          9 out of 10 people with FH currently do not know they have it.
                        </p>
                      </div>

                      {/* Stat 3 */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between shadow-3xs space-y-1.5">
                        <div className="text-xl">❤️</div>
                        <div>
                          <h5 className="font-display font-extrabold text-[#008375] text-[15px] leading-tight">Up to 80%</h5>
                          <p className="font-bold text-[10px] text-slate-800 leading-snug font-sans">lower heart risk</p>
                        </div>
                        <p className="text-[9.5px] text-slate-500 leading-relaxed font-sans">
                          Early diagnosis and simple treatment make a very big difference.
                        </p>
                      </div>

                      {/* Stat 4 */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between shadow-3xs space-y-1.5">
                        <div className="text-xl">👥</div>
                        <div>
                          <h5 className="font-display font-extrabold text-[#008375] text-[15px] leading-tight">1 in 2</h5>
                          <p className="font-bold text-[10px] text-slate-800 leading-snug font-sans">family risk</p>
                        </div>
                        <p className="text-[9.5px] text-slate-500 leading-relaxed font-sans">
                          Each parent, sibling, or child has a 50% chance of inheritance.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Personalized Education Accordion Sections */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">LEARNING HUB</h4>
                      <span className="text-[10px] text-slate-500 font-medium">{educationalSections.length} Topics</span>
                    </div>
                    
                    {educationalSections.map((sec) => {
                      const isExpanded = !!eduExpanded[sec.id];

                      // Custom high fidelity titles and subtitles for collapsed/expanded states
                      let displayTitle = sec.title;
                      let displaySubtitle = sec.shortSummary;

                      if (sec.id === 'what-is-fh') {
                        displayTitle = isExpanded ? 'What is FH?' : 'Understanding FH';
                        displaySubtitle = isExpanded 
                          ? 'Familial Hypercholesterolaemia (FH) is a common genetic condition that causes very high cholesterol.' 
                          : 'What FH is and why early diagnosis matters.';
                      } else if (sec.id === 'fh-symptoms') {
                        displayTitle = isExpanded ? 'Symptoms & Physical Signs' : 'Visible Physical Signs';
                        displaySubtitle = isExpanded 
                          ? 'Learn the three main visible indicators of inherited high cholesterol on the body.' 
                          : 'Identify waxy deposits and yellow patches.';
                      } else if (sec.id === 'testing-guide') {
                        displayTitle = 'Your Testing Guide';
                        displaySubtitle = isExpanded 
                          ? 'Six straightforward steps from referral to your personal care plan.' 
                          : 'Step by step from counselling to your results.';
                      } else if (sec.id === 'medication-fh') {
                        displayTitle = 'Medication & FH';
                        displaySubtitle = isExpanded 
                          ? 'Highly effective, subsidized medical therapies to safeguard your heart.' 
                          : 'How statins work and what to expect.';
                      } else if (sec.id === 'why-testing-matters') {
                        displayTitle = 'Protecting Your Family';
                        displaySubtitle = isExpanded 
                          ? 'Confirming FH unlocks personalized care and protects your loved ones through cascade screening.' 
                          : 'How cascade screening keeps your loved ones safe.';
                      } else if (sec.id === 'costs-subsidies') {
                        displayTitle = 'Costs and Subsidies';
                        displaySubtitle = isExpanded 
                          ? 'Up to 75% Ministry of Health (MOH) subsidies for eligible Singapore citizens.' 
                          : 'What you pay and how subsidies and MediSave help.';
                      } else if (sec.id === 'insurance-rights') {
                        displayTitle = 'Insurance & Your Rights';
                        displaySubtitle = isExpanded 
                          ? 'National guidelines completely safeguard your right to take a proactive test without any policy impact.' 
                          : 'How the LIA Moratorium protects you.';
                      }

                      return (
                        <div key={sec.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs transition-all duration-200">
                          <button
                            onClick={() => toggleEdu(sec.id)}
                            className="w-full text-left p-4 flex items-start gap-3.5 justify-between hover:bg-slate-50/50 transition cursor-pointer"
                          >
                            <div className="flex gap-3 items-start flex-1 min-w-0">
                              <div className="mt-0.5 p-2 bg-teal-50 rounded-full border border-teal-100/55 shrink-0 flex items-center justify-center">
                                {getIcon(sec.iconName || 'HelpCircle')}
                              </div>
                              <div className="flex-1 min-w-0 space-y-0.5">
                                <h4 className="font-display font-extrabold text-[12px] text-slate-900 leading-tight tracking-tight">
                                  {displayTitle}
                                </h4>
                                <p className="text-[10.5px] text-slate-500 leading-relaxed">
                                  {displaySubtitle}
                                </p>
                                
                                {/* Keyword Tag Bubbles - only shown when collapsed */}
                                {!isExpanded && sec.tags && sec.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                                    {sec.tags.map((tag, tIdx) => (
                                      <span key={tIdx} className="text-[9px] bg-slate-50 text-slate-500 font-medium px-2 py-0.5 rounded-md border border-slate-200/50">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''} self-start mt-1`} />
                          </button>
                          
                          {isExpanded && (
                            <div className="px-4 pb-4 pt-3 border-t border-slate-100 bg-slate-50/55 text-[11px] text-slate-600 leading-relaxed space-y-3.5">
                              <p className="mt-1 text-slate-600 font-sans leading-relaxed text-[11px]">{sec.content}</p>

                              {/* Structured vertical steps timeline if steps exist */}
                              {sec.steps && sec.steps.length > 0 && (
                                <div className="relative pl-5 border-l-2 border-teal-100 my-4.5 ml-2.5 space-y-4">
                                  {sec.steps.map((st) => (
                                    <div key={st.num} className="relative">
                                      {/* Numbered visual dot */}
                                      <div className="absolute -left-[28.5px] top-0.5 w-4.5 h-4.5 rounded-full bg-[#008375] text-white flex items-center justify-center text-[10px] font-extrabold ring-4 ring-slate-50">
                                        {st.num}
                                      </div>
                                      <div className="space-y-0.5">
                                        <h5 className="font-bold text-[10px] text-slate-800">{st.title}</h5>
                                        <p className="text-[9.5px] text-slate-500 leading-normal">{st.description}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Dynamic subsections like cascade screening/cost details */}
                              {sec.subsections && sec.subsections.length > 0 && (
                                <div className="space-y-3 my-3">
                                  {sec.subsections.map((sub, sIdx) => (
                                    <div key={sIdx} className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-3xs space-y-1">
                                      <h5 className="font-bold text-[10px] text-[#008375] tracking-wider uppercase font-sans">{sub.title}</h5>
                                      <p className="text-[10.5px] text-slate-600 leading-relaxed font-sans">{sub.text}</p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="border-l-4 border-teal-500 bg-teal-50/80 px-3 py-2 rounded-r-lg">
                                <p className="font-bold text-[9px] text-teal-900 uppercase tracking-tight font-mono">Key Takeaway</p>
                                <p className="text-teal-800 text-[10.5px] mt-0.5 leading-normal">{sec.keyTakeaway}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Pre-counselling Preparation Checklist */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-1.5">
                        <CheckSquare className="w-4 h-4 text-[#008375]" />
                        <h4 className="font-bold text-xs text-slate-800 font-sans">Pre-Counselling Checklist</h4>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                      Completing these simple tasks reduces appointment anxiety and ensures highly customized care:
                    </p>
                    <div className="space-y-2.5">
                      {checklist.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => toggleChecklist(item.id)}
                          className="w-full text-left flex gap-2.5 items-start text-xs text-slate-700 hover:text-slate-900 transition cursor-pointer"
                        >
                          {item.checked ? (
                            <CheckSquare className="w-4 h-4 text-[#008375] mt-0.5 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded border-2 border-slate-300 mt-0.5 shrink-0 bg-white" />
                          )}
                          <span className={`text-[11px] leading-snug ${item.checked ? 'line-through text-slate-400 font-medium' : 'text-slate-700 font-medium'}`}>
                            {item.text}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* FAQ Accordion Section - ONLY ONE EXPANDED AT A TIME */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">FREQUENTLY ASKED QUESTIONS</h4>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {[
                        { id: 'all', label: 'ALL' },
                        { id: 'cost', label: 'COST' },
                        { id: 'insurance', label: 'INSURANCE' },
                        { id: 'testing', label: 'TESTING' },
                        { id: 'medication', label: 'MEDICATION' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveFaqCategory(cat.id);
                            setFaqActiveIdx(null);
                          }}
                          className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-tight shrink-0 transition cursor-pointer border ${
                            activeFaqCategory === cat.id
                              ? 'bg-[#008375] text-white border-[#008375] shadow-3xs'
                              : 'bg-white text-slate-600 hover:text-slate-800 border-slate-200'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {faqs
                        .filter(faq => activeFaqCategory === 'all' || faq.category === activeFaqCategory)
                        .map((faq, idx) => {
                          const isFaqExpanded = faqActiveIdx === idx;
                          return (
                            <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-3xs">
                              <button
                                onClick={() => setFaqActiveIdx(isFaqExpanded ? null : idx)}
                                className="w-full text-left p-3.5 text-xs font-bold text-slate-800 flex justify-between items-center hover:bg-slate-50 transition cursor-pointer"
                              >
                                <span className="leading-snug pr-3">{faq.question}</span>
                                <ChevronRight className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isFaqExpanded ? 'rotate-90' : ''}`} />
                              </button>
                              
                              {isFaqExpanded && (
                                <div className="px-4 pb-3.5 text-[11px] text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/50 animate-fade-in">
                                  {faq.answer}
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Helpful Resources Section */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono font-sans">Helpful Resources</h4>
                    </div>

                    <div className="space-y-2.5">
                      {helpfulResources.map((res) => {
                        // Dynamic color configurations for appealing & diverse icon cards
                        let bgClass = "bg-slate-50 group-hover:bg-teal-50 border-slate-100 group-hover:border-teal-150";
                        let iconColor = "text-[#008375]";
                        let typeTagClass = "bg-teal-50 text-[#008375] border-teal-100/55";
                        let viewLinkColor = "text-[#008375] group-hover:text-teal-700";
                        let hoverBorderClass = "hover:border-teal-200 hover:bg-teal-50/10";

                        if (res.type === 'Video Story') {
                          bgClass = "bg-rose-50 group-hover:bg-rose-100/80 border-rose-100 group-hover:border-rose-150";
                          iconColor = "text-rose-600";
                          typeTagClass = "bg-rose-50 text-rose-700 border-rose-100";
                          viewLinkColor = "text-rose-600 group-hover:text-rose-700";
                          hoverBorderClass = "hover:border-rose-200 hover:bg-rose-50/10";
                        } else if (res.id === 'res-9') { // Insurance/Moratorium
                          bgClass = "bg-indigo-50 group-hover:bg-indigo-100/80 border-indigo-100 group-hover:border-indigo-150";
                          iconColor = "text-indigo-600";
                          typeTagClass = "bg-indigo-50 text-indigo-700 border-indigo-100";
                          viewLinkColor = "text-indigo-600 group-hover:text-indigo-700";
                          hoverBorderClass = "hover:border-indigo-200 hover:bg-indigo-50/10";
                        } else if (res.id === 'res-5') { // Singapore Heart Foundation
                          bgClass = "bg-emerald-50 group-hover:bg-emerald-100/80 border-emerald-100 group-hover:border-emerald-150";
                          iconColor = "text-emerald-600";
                          typeTagClass = "bg-emerald-50 text-emerald-700 border-emerald-100";
                          viewLinkColor = "text-emerald-600 group-hover:text-emerald-700";
                          hoverBorderClass = "hover:border-emerald-200 hover:bg-emerald-50/10";
                        } else if (res.type === 'Clinical Guide') {
                          bgClass = "bg-amber-50 group-hover:bg-amber-100/80 border-amber-100 group-hover:border-amber-150";
                          iconColor = "text-amber-600";
                          typeTagClass = "bg-amber-50 text-amber-700 border-amber-100";
                          viewLinkColor = "text-amber-600 group-hover:text-amber-700";
                          hoverBorderClass = "hover:border-amber-200 hover:bg-amber-50/10";
                        } else if (res.type === 'PDF Brochure') {
                          bgClass = "bg-sky-50 group-hover:bg-sky-100/80 border-sky-100 group-hover:border-sky-150";
                          iconColor = "text-sky-600";
                          typeTagClass = "bg-sky-50 text-sky-700 border-sky-100";
                          viewLinkColor = "text-sky-600 group-hover:text-sky-700";
                          hoverBorderClass = "hover:border-sky-200 hover:bg-sky-50/10";
                        }

                        return (
                          <a
                            key={res.id}
                            href={res.externalUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block w-full text-left bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-3xs transition group cursor-pointer ${hoverBorderClass}`}
                          >
                            <div className="flex items-start gap-2.5">
                              <div className={`p-1.5 rounded-lg border shrink-0 mt-0.5 transition ${bgClass}`}>
                                {getIcon(res.iconName, iconColor)}
                              </div>
                              <div className="space-y-0.5 flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-2">
                                  <h5 className="font-bold text-[11px] text-slate-800 group-hover:text-[#008375] transition leading-tight">{res.title}</h5>
                                  <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded font-extrabold shrink-0 border ${typeTagClass}`}>{res.type}</span>
                                </div>
                                <p className="text-[10px] text-slate-500 leading-normal mt-1">{res.summary}</p>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center pl-9 pt-0.5">
                              {/* Resource Keyword Tags */}
                              <div className="flex flex-wrap gap-1">
                                {res.keywords.map((kw, i) => (
                                  <span key={i} className="text-[8px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded font-sans border border-slate-200/50">
                                    #{kw}
                                  </span>
                                ))}
                              </div>
                              <div className={`flex items-center text-[10px] font-bold gap-1 transition ${viewLinkColor}`}>
                                <span>View Resource</span>
                                <ExternalLink className="w-2.5 h-2.5 transition" />
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Secure Booking CTA prompt */}
                  <div className="bg-[#008375] text-white p-5 rounded-2xl shadow-sm text-center space-y-2.5">
                    <h4 className="font-bold text-xs">Ready to book your GAC counselling slot?</h4>
                    <p className="text-[10px] text-teal-100 max-w-[260px] mx-auto leading-normal">
                      Take the active step today. Booking takes under 20 seconds within HealthHub.
                    </p>
                    <button
                      onClick={() => onChangeScreen(ScreenId.Booking)}
                      className="w-full py-2.5 bg-white hover:bg-slate-100 text-[#008375] rounded-xl text-xs font-bold shadow-sm transition cursor-pointer select-none border border-transparent"
                    >
                      Go to Secure Booking
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}


        {/* ----------------- SCREEN 3: BOOKING ----------------- */}
        {activeScreen === ScreenId.Booking && (
          <div className="flex-col flex flex-1 pb-6">
            {/* Top Navigation */}
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-2">
              <button onClick={() => onChangeScreen(ScreenId.Home)} className="p-1 hover:bg-slate-100 rounded-full">
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <span className="font-bold text-sm text-slate-800">Secure Appointment Booking</span>
            </div>

            {/* If appointment is BOOKED, show the confirmation / rescheduling / calendar page */}
            {appointment.status === 'booked' ? (
              <div className="p-4 space-y-4 animate-fade-in">
                {/* Booking Confirmation Card */}
                <div className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-sm text-center space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  
                  <div>
                    <h3 className="font-extrabold text-base text-slate-800">Appointment Confirmed</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">MOH Subsidy Pre-Approved</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-left space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Clinic Location:</span>
                      <strong className="text-slate-800 text-right">{appointment.clinic}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Date:</span>
                      <strong className="text-slate-800">{appointment.date}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Time Slot:</span>
                      <strong className="text-slate-800">{appointment.timeSlot}</strong>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                      <span className="text-slate-500">Estimated Cost:</span>
                      <span className="text-teal-700 font-extrabold font-mono">S$18.50 (CHAS Subsidized)</span>
                    </div>
                  </div>

                  {/* NICE TO HAVE: Calendar Integration Buttons */}
                  <div className="space-y-1.5">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider font-mono">Export to Device Calendar</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => alert('Apple Calendar export complete! Created "FH Genetic Counselling" on 17 Feb 2026.')}
                        className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1"
                      >
                        <Smartphone className="w-3.5 h-3.5" /> Apple Cal
                      </button>
                      <button 
                        onClick={() => alert('Google Calendar sync complete! Added event to your registered Gmail address.')}
                        className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#008375]" /> Google Cal
                      </button>
                    </div>
                  </div>
                </div>

                {/* Important Pre-counselling reminders */}
                <div className="bg-teal-50/50 border border-teal-200 rounded-xl p-4 space-y-2 text-xs">
                  <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-teal-600 shrink-0" /> Preparation Instructions
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    No fasting is required. Please remember to bring along your registered NRIC or Singpass credentials, and review the pre-counselling checklist.
                  </p>
                  <button 
                    onClick={() => onChangeScreen(ScreenId.Education)}
                    className="text-[#008375] font-bold text-[11px] underline flex items-center gap-0.5 hover:text-teal-800 mt-1"
                  >
                    Open Preparation Checklist <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Manage options */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      // Prompt reschedule state
                      handleCancelBooking();
                      alert('Reschedule active: Please select a new date and time from the calendar grid below.');
                    }}
                    className="w-full py-2 bg-[#008375] hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition"
                  >
                    Reschedule Appointment
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to cancel your referral counselling slot? Cancellations increase cardiac risk.')) {
                        handleCancelBooking();
                      }
                    }}
                    className="w-full py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl text-xs font-semibold border border-slate-200 transition"
                  >
                    Cancel Appointment Booking
                  </button>
                </div>
              </div>
            ) : (
              // Active Booking Grid View
              <div className="p-4 space-y-4">
                {/* Doctor Referral Note info */}
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex gap-2.5 items-start text-xs text-teal-900 shadow-2xs">
                  <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-extrabold text-teal-950">Active Clinic Referral:</strong>
                    <p className="text-[11px] text-teal-800 mt-0.5">Familial Hypercholesterolaemia (FH) Genetic Test. Pre-subsidized by Singapore Ministry of Health.</p>
                  </div>
                </div>

                {/* Section 1: Clinic preloaded */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Enrolled Specialized Clinic</label>
                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex gap-3 shadow-2xs">
                    <div className="p-2 bg-teal-50 rounded-lg shrink-0 self-center">
                      <MapPin className="w-4.5 h-4.5 text-[#008375]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-800">First Health Group (Serangoon)</h4>
                      <p className="text-[10px] text-slate-500 leading-snug mt-0.5">Block 24, Serangoon Central #01-87, Singapore 550024</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Choose Date */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Select Booking Date</label>
                    <span className="text-[10px] text-[#008375] font-semibold">Available slots shown</span>
                  </div>
                  
                  {/* Horizon scroll available dates */}
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {availableDates.map((d) => (
                      <button
                        key={d.num}
                        onClick={() => setSelectedDate(d.full)}
                        className={`p-3.5 rounded-xl border text-center transition shrink-0 min-w-[62px] ${
                          selectedDate === d.full
                            ? 'bg-[#008375] border-[#008375] text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <p className={`text-[10px] uppercase tracking-wide font-mono ${selectedDate === d.full ? 'text-teal-200' : 'text-slate-400'}`}>{d.day}</p>
                        <p className="text-sm font-extrabold mt-0.5">{d.num}</p>
                        <p className={`text-[8px] font-bold mt-1 ${selectedDate === d.full ? 'text-teal-100' : 'text-slate-400'}`}>Feb 26</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 3: Time Slot Grid */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Available Time Slots ({selectedDate.split(',')[0]})</label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((s) => (
                      <button
                        key={s.time}
                        onClick={() => setSelectedSlot(s.time)}
                        className={`p-3 rounded-xl border text-center transition flex justify-between items-center px-4 ${
                          selectedSlot === s.time
                            ? 'bg-teal-50 border-[#008375] text-[#008375] font-bold shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-left">
                          <p className="text-xs font-extrabold">{s.time}</p>
                          <p className="text-[9px] text-slate-400 font-semibold">{s.period}</p>
                        </div>
                        {selectedSlot === s.time && <Check className="w-4 h-4 text-[#008375]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subsidized Cost transparent info */}
                <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Coins className="w-4 h-4 text-[#008375]" />
                    <span>CHAS Blue Subsidy Applied</span>
                  </div>
                  <strong className="text-slate-800 font-mono text-xs">Est: S$18.50</strong>
                </div>

                {/* Section 4: Book Submit CTA */}
                <div className="pt-2">
                  <button
                    onClick={handleBookSubmit}
                    className="w-full py-3 bg-[#008375] hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-700/20 transition transform active:scale-98 text-center"
                  >
                    Confirm Appointment Booking (S$18.50)
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2 leading-relaxed">
                    By booking, your referral card is locked. Reminders are pre-configured to keep you informed.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}


        {/* ----------------- SCREEN 4: REMINDERS ----------------- */}
        {activeScreen === ScreenId.ReminderSettings && (
          <div className="flex-col flex flex-1 pb-6">
            {/* Top Navigation */}
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-2">
              <button onClick={() => onChangeScreen(ScreenId.Home)} className="p-1 hover:bg-slate-100 rounded-full">
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <span className="font-bold text-sm text-slate-800">Reminder Preferences</span>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-800">Your Communication Settings</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Control how and when you receive genetic testing reminders.</p>
              </div>

              {/* Master Toggle */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-xs text-slate-800">Active FH Reminders</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Monthly resources & upcoming booking alerts.</p>
                </div>
                <button
                  onClick={() => onUpdateReminderPrefs({ ...reminderPrefs, enabled: !reminderPrefs.enabled })}
                  className={`w-11 h-6 rounded-full transition-colors relative ${reminderPrefs.enabled ? 'bg-[#008375]' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${reminderPrefs.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {reminderPrefs.enabled && (
                <div className="space-y-4 animate-fade-in">
                  
                  {/* Select Channel */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Notification Channel</label>
                    <div className="space-y-2">
                      {[
                        { id: 'sms', label: 'SMS Messages', desc: 'Direct secure texts to +65 9123 4567' },
                        { id: 'push', label: 'HealthHub App Push', desc: 'Receive rich notifications on your home lockscreen' },
                        { id: 'both', label: 'Send via Both Channels', desc: 'Highly recommended for older adults to prevent drop-off' }
                      ].map((ch) => (
                        <button
                          key={ch.id}
                          onClick={() => onUpdateReminderPrefs({ ...reminderPrefs, channel: ch.id as any })}
                          className={`w-full text-left p-3 rounded-xl border transition flex gap-3 ${
                            reminderPrefs.channel === ch.id
                              ? 'bg-teal-50 border-[#008375]'
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                            reminderPrefs.channel === ch.id ? 'border-[#008375]' : 'border-slate-300'
                          }`}>
                            {reminderPrefs.channel === ch.id && <div className="w-2.5 h-2.5 rounded-full bg-[#008375]" />}
                          </div>
                          <div>
                            <h5 className="font-bold text-xs text-slate-800">{ch.label}</h5>
                            <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{ch.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Frequency settings */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Reminder Frequency</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: '7days_before', label: '7 Days Before', sub: 'Standard alert' },
                        { id: 'weekly', label: 'Weekly', sub: 'Highly protective' },
                        { id: 'monthly', label: 'Monthly Info', sub: 'Education updates' },
                        { id: 'daily', label: 'Daily (Last Week)', sub: 'Critical countdown' }
                      ].map((f) => (
                        <button
                          key={f.id}
                          onClick={() => onUpdateReminderPrefs({ ...reminderPrefs, frequency: f.id as any })}
                          className={`p-3 rounded-xl border text-left transition ${
                            reminderPrefs.frequency === f.id
                              ? 'bg-teal-50/50 border-[#008375] font-bold'
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <p className="text-xs text-slate-800">{f.label}</p>
                          <p className="text-[9px] text-slate-400 mt-0.5 leading-snug">{f.sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SMS live preview container */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex justify-between">
                      <span>SMS Broadcast Preview</span>
                      <span className="text-emerald-700">Verified sender</span>
                    </label>
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 border-b border-slate-100 pb-2">
                        <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                        <span>MOH-HealthHub</span>
                        <span className="ml-auto text-[9px] font-mono">Today, 09:41 AM</span>
                      </div>
                      <div className="bg-slate-100 p-3 rounded-xl rounded-tl-none text-[11px] text-slate-700 leading-normal font-sans border border-slate-200/50">
                        MOH HealthHub: Hi Lisa, your FH Genetic Counselling slot at First Health Group Serangoon is scheduled on {appointment.status === 'booked' ? appointment.date : 'Fri, 17 Feb 2026'} at {appointment.status === 'booked' ? appointment.timeSlot : '9.00 AM'}. Subsidies of up to 75% are applied. Please bring your Singpass. Ref: https://hh.gov.sg/fh-ref
                      </div>
                    </div>
                  </div>

                  {/* Mock notify trigger */}
                  <button
                    onClick={onTriggerNotification}
                    className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Bell className="w-4 h-4" /> Trigger Simulated Push Alert
                  </button>
                </div>
              )}
            </div>
          </div>
        )}


        {/* ----------------- SCREEN 5: PROGRESS TIMELINE ----------------- */}
        {activeScreen === ScreenId.ProgressTimeline && (
          <div className="flex-col flex flex-1 pb-6">
            {/* Top Navigation */}
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-2">
              <button onClick={() => onChangeScreen(ScreenId.Home)} className="p-1 hover:bg-slate-100 rounded-full">
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <span className="font-bold text-sm text-slate-800">Your Appointment Progress</span>
            </div>

            <div className="p-4 space-y-4">
              {/* Countdown Header */}
              <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white p-4 rounded-2xl shadow-sm">
                <p className="text-[10px] font-mono uppercase tracking-widest text-teal-300">Appointment Countdown</p>
                <h3 className="font-extrabold text-lg mt-1">
                  {appointment.status === 'booked' ? 'Your appointment is in 6 days' : 'Awaiting Appointment Booking'}
                </h3>
                <p className="text-[10px] text-teal-100 mt-1 max-w-[240px]">
                  {appointment.status === 'booked' 
                    ? `Confirmed for ${appointment.date} at ${appointment.timeSlot} at First Health Group (Serangoon).` 
                    : 'Your cardiac referral requires you to schedule a counselling session soon.'
                  }
                </p>
              </div>

              {/* Progress Timeline Block */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-5">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Interactive Referral Timeline</h4>
                
                <div className="relative pl-6 space-y-6">
                  {/* Vertical connecting line */}
                  <div className="absolute left-2.5 top-2.5 bottom-2 w-0.5 bg-slate-200" />

                  {/* Step 1: Referral received */}
                  <div className="relative">
                    <div className="absolute -left-[21px] w-5 h-5 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-xs">
                      ✓
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">Referral received</h5>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Recommended by Cardiopulmonary Specialist at Outpatient Clinic on 12 Jan 2026.</p>
                    </div>
                  </div>

                  {/* Step 2: Education completed */}
                  <div className="relative">
                    <div className="absolute -left-[21px] w-5 h-5 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-xs">
                      ✓
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">Education materials reviewed</h5>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Personalised information guide read on Singapore HealthHub Education Hub.</p>
                    </div>
                  </div>

                  {/* Step 3: Appointment Booked */}
                  <div className="relative">
                    <div className={`absolute -left-[21px] w-5 h-5 rounded-full border-4 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-xs ${
                      appointment.status === 'booked' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}>
                      {appointment.status === 'booked' ? '✓' : '3'}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">Counselling slot booked</h5>
                      {appointment.status === 'booked' ? (
                        <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Successfully scheduled for {appointment.date} at First Health Group.</p>
                      ) : (
                        <div className="space-y-1.5 mt-1">
                          <p className="text-[10px] text-amber-700 font-semibold">Action needed: Choose your subsidized appointment slot.</p>
                          <button 
                            onClick={() => onChangeScreen(ScreenId.Booking)}
                            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-bold transition"
                          >
                            Book Now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step 4: Attend Counselling */}
                  <div className="relative">
                    <div className={`absolute -left-[21px] w-5 h-5 rounded-full border-4 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-xs ${
                      appointment.status === 'booked' ? 'bg-[#008375] animate-pulse' : 'bg-slate-300'
                    }`}>
                      4
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">Attend genetic counselling</h5>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">30-minute session to answer family worries and complete the simple blood test.</p>
                    </div>
                  </div>

                  {/* Step 5: Receive results */}
                  <div className="relative">
                    <div className="absolute -left-[21px] w-5 h-5 rounded-full bg-slate-300 border-4 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-xs">
                      5
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">Receive genetic results</h5>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Discussion with clinical specialists 4-6 weeks after testing to adjust preventive medications.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prep Checklist link shortcut */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2 text-xs">
                <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-teal-600" />
                  Need to review your checklist?
                </h5>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Make sure you are ready for your session on 17 Feb 2026. Review what documents to bring.
                </p>
                <button
                  onClick={() => onChangeScreen(ScreenId.Education)}
                  className="text-[#008375] font-bold underline text-[11px] hover:text-teal-800 flex items-center gap-0.5 mt-1"
                >
                  Review checklist now <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        )}


        {/* ----------------- SCREEN 6: LOCK SCREEN NOTIFICATION ----------------- */}
        {activeScreen === ScreenId.NotificationMock && (
          <div className="flex-1 flex flex-col justify-between p-6 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80')" }}>
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" />
            
            {/* Top Time Details */}
            <div className="relative text-center text-white space-y-1.5 pt-8 z-10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-200">Singapore Telecommunications</span>
              <h2 className="text-5xl font-thin tracking-tight font-sans">23:50</h2>
              <p className="text-xs font-medium text-slate-200">Monday, June 29, 2026</p>
            </div>

            {/* Notification Bubble */}
            <div className="relative z-10 space-y-4 my-auto">
              
              <div className="bg-slate-900/85 backdrop-blur-md text-white border border-slate-700/50 p-4 rounded-2xl shadow-xl space-y-3 max-w-[320px] mx-auto animate-bounce-short">
                {/* Header info */}
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 bg-[#008375] rounded flex items-center justify-center text-white text-[9px] font-extrabold select-none">
                      HH
                    </div>
                    <span className="text-[11px] font-bold text-slate-200">HealthHub Singapore</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">7 Days Left</span>
                </div>

                {/* Body message */}
                <div className="space-y-1">
                  <h4 className="font-bold text-xs text-slate-100">Your FH Genetic Counselling is in 7 days</h4>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Your appointment at <strong className="text-white">First Health Group Serangoon</strong> is scheduled on <strong className="text-white">Fri, 17 Feb 2026 @ 9:00 AM</strong>.
                  </p>
                </div>

                {/* Subsidized tag */}
                <div className="bg-teal-900/30 border border-teal-800/50 p-2 rounded-lg text-[10px] text-teal-300 flex items-center justify-between">
                  <span>MOH Subsidized Slot</span>
                  <strong className="font-mono">S$18.50</strong>
                </div>

                {/* Lock Screen buttons */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <button
                    onClick={() => handleNotificationClickAction('confirm')}
                    className="w-full py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 shadow-sm"
                  >
                    Confirm Attendance
                  </button>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => handleNotificationClickAction('reschedule')}
                      className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[10px] font-semibold transition"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => handleNotificationClickAction('learn')}
                      className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[10px] font-semibold transition"
                    >
                      Read Subsidies Guide
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-300 text-center leading-normal max-w-[240px] mx-auto text-shadow-sm font-medium">
                Tap on "Confirm Attendance" to mark as attending in Singapore HealthHub instantly.
              </p>
            </div>

            {/* Bottom Swipe hint */}
            <div className="relative text-center text-white/60 text-[10px] z-10 pb-4 font-mono animate-pulse">
              <span>Swipe up to open registered credentials</span>
            </div>
          </div>
        )}

        {/* SIMULATED PDF / CLINICAL BROCHURE DOCUMENT VIEWER MODAL */}
        {selectedResource && (
          <div className="absolute inset-0 bg-slate-900/45 backdrop-blur-xs flex flex-col justify-end z-50 animate-fade-in select-none">
            <div className="bg-white rounded-t-3xl h-[94%] flex flex-col shadow-2xl overflow-hidden animate-slide-up">
              {/* Document Header */}
              <div className="bg-slate-50 px-4 py-3.5 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-teal-50 text-[#008375] rounded-lg border border-teal-150">
                    <FileText className="w-4 h-4 text-[#008375]" />
                  </div>
                  <div className="text-left">
                    <span className="text-[8px] font-extrabold text-[#008375] uppercase tracking-wider font-mono bg-teal-50 px-1 py-0.2 border border-teal-100/50 rounded">
                      {selectedResource.type}
                    </span>
                    <h3 className="font-bold text-[11px] text-slate-800 line-clamp-1 max-w-[210px] mt-0.5">
                      {selectedResource.title}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedResource(null)}
                  className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Document Sub-Header / Tool Controls */}
              <div className="bg-slate-100/80 px-4 py-2 border-b border-slate-200 flex justify-between items-center text-[10px] text-slate-600 font-mono">
                <span className="font-bold text-[9px]">PAGE {resourcePage + 1} OF {selectedResource.pages.length}</span>
                <div className="flex items-center gap-1.5">
                  {selectedResource.externalUrl && (
                    <a 
                      href={selectedResource.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#008375] hover:text-teal-800 font-bold bg-white px-2 py-1 rounded border border-slate-200 cursor-pointer shadow-3xs"
                    >
                      <ExternalLink className="w-3 h-3 text-[#008375]" /> WEBSITE
                    </a>
                  )}
                  <button 
                    onClick={() => {
                      setDownloadToast(`Saved ${selectedResource.title} (${selectedResource.downloadSize}) to local storage.`);
                    }}
                    className="flex items-center gap-1 hover:text-teal-700 font-bold bg-white px-2 py-1 rounded border border-slate-200 cursor-pointer shadow-3xs"
                  >
                    <Download className="w-3 h-3 text-[#008375]" /> {selectedResource.downloadSize}
                  </button>
                  <button 
                    onClick={() => {
                      setDownloadToast("Sent document to printer...");
                    }}
                    className="flex items-center gap-1 hover:text-teal-700 font-bold bg-white px-2 py-1 rounded border border-slate-200 cursor-pointer shadow-3xs"
                  >
                    <Printer className="w-3 h-3 text-slate-500" /> PRINT
                  </button>
                </div>
              </div>

              {/* Document Page Canvas */}
              <div className="flex-1 bg-slate-200 p-4 overflow-y-auto flex justify-center">
                <div className="bg-white w-full max-w-[340px] min-h-[380px] rounded-lg shadow-md p-4.5 flex flex-col border border-slate-300 relative select-text">
                  {/* Subtle watermarks and page header */}
                  <div className="border-b border-slate-100 pb-2 mb-3 flex justify-between items-center text-[8px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                    <span>FIRST HEALTH GROUP • EDUCATIONAL SERVICES</span>
                    <span>CONFIDENTIAL</span>
                  </div>

                  <h4 className="font-display font-extrabold text-[12.5px] text-slate-900 tracking-tight leading-snug border-l-4 border-teal-500 pl-2">
                    {selectedResource.pages[resourcePage].title}
                  </h4>

                  <div className="mt-3.5 space-y-3 text-[10px] text-slate-700 leading-relaxed font-sans flex-1 text-left">
                    {selectedResource.pages[resourcePage].paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="indent-2">{p}</p>
                    ))}
                  </div>

                  {/* Watermark Logo */}
                  <div className="absolute bottom-16 right-5 opacity-5 pointer-events-none">
                    <HeartPulse className="w-20 h-20 text-slate-950" />
                  </div>

                  {/* Page Footer */}
                  <div className="border-t border-slate-100 pt-2.5 mt-5 flex justify-between items-center text-[8px] text-slate-400 font-medium font-sans">
                    <span>MOH Clinical Excellence Alliance</span>
                    <span>Page {resourcePage + 1}</span>
                  </div>
                </div>
              </div>

              {/* Document Page Navigation Footer */}
              <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex justify-between items-center shrink-0">
                <button
                  disabled={resourcePage === 0}
                  onClick={() => setResourcePage(prev => Math.max(0, prev - 1))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 border border-slate-200 cursor-pointer ${
                    resourcePage === 0 ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-100' : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                
                <span className="text-[10px] text-slate-500 font-mono font-bold">
                  {resourcePage + 1} / {selectedResource.pages.length}
                </span>

                {resourcePage < selectedResource.pages.length - 1 ? (
                  <button
                    onClick={() => setResourcePage(prev => prev + 1)}
                    className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-teal-700 cursor-pointer shadow-3xs"
                  >
                    Next Page <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="px-4 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-900 cursor-pointer shadow-3xs"
                  >
                    Finish Reading
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic download success notification toast */}
        {downloadToast && (
          <div className="absolute bottom-20 left-4 right-4 bg-slate-900/95 text-white py-2.5 px-3.5 rounded-xl text-[10.5px] font-medium shadow-lg flex items-center gap-2 z-50 animate-slide-up border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="flex-1 leading-snug text-left">{downloadToast}</span>
            <button onClick={() => setDownloadToast(null)} className="text-slate-400 hover:text-white cursor-pointer p-0.5">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>

      {/* Simulated Device Home Indicator Button */}
      <div className="bg-white border-t border-slate-200 py-3 px-4 flex justify-around items-center z-40 select-none shrink-0">
        {[
          { icon: <HeartPulse className="w-5 h-5" />, label: 'Home', screen: ScreenId.Home },
          ...(isFHReferred ? [{ icon: <Dna className="w-5 h-5" />, label: 'Learn FH', screen: ScreenId.Education }] : []),
          { icon: <Calendar className="w-5 h-5" />, label: 'Book', screen: ScreenId.Booking },
          { icon: <Bell className="w-5 h-5" />, label: 'Reminders', screen: ScreenId.ReminderSettings },
          { icon: <ClipboardList className="w-5 h-5" />, label: 'Journey', screen: ScreenId.ProgressTimeline }
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={() => onChangeScreen(tab.screen)}
            className={`flex flex-col items-center gap-0.5 transition ${
              activeScreen === tab.screen ? 'text-[#008375]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.icon}
            <span className="text-[8px] font-bold uppercase tracking-tight">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-slate-100 py-2.5 flex justify-center items-center z-40 shrink-0 select-none">
        <div className="w-28 h-1 bg-slate-400 rounded-full" />
      </div>

    </div>
  );
}
