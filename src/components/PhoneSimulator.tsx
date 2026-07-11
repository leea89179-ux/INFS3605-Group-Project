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
  onBookAppointment: (date: string, time: string, clinic: string) => void;
  onAddCalendarEvent: () => void;
  reminderPrefs: ReminderPreferences;
  onUpdateReminderPrefs: (enabled: boolean, channel: 'sms' | 'push' | 'both', frequency: 'monthly' | '2_weeks' | '1_week' | '1_day' | 'custom') => void;
  onTriggerNotification: () => void;
  onNotificationAction: (action: 'confirmed' | 'rescheduled' | 'education_viewed') => void;
  isFHReferred: boolean;
}

export const clinicalSlots = [
  {
    date: '22 July 2026',
    time: '10:30 AM',
    provider: 'Dr. Helen Lim',
    role: 'Senior Genetic Counsellor',
    duration: '45 mins',
    clinic: 'National University Hospital Genetic Clinic',
    address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074',
    cost: 'S$18.50 (CHAS Subsidized)'
  },
  {
    date: '23 July 2026',
    time: '2:00 PM',
    provider: 'Dr. Helen Lim',
    role: 'Senior Genetic Counsellor',
    duration: '45 mins',
    clinic: 'National University Hospital Genetic Clinic',
    address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074',
    cost: 'S$18.50 (CHAS Subsidized)'
  },
  {
    date: '24 July 2026',
    time: '9:30 AM',
    provider: 'Dr. Helen Lim',
    role: 'Senior Genetic Counsellor',
    duration: '45 mins',
    clinic: 'National University Hospital Genetic Clinic',
    address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074',
    cost: 'S$18.50 (CHAS Subsidized)'
  }
];

export interface ClinicOption {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  provider: string;
  role: string;
}

export const CLINICS: ClinicOption[] = [
  {
    id: 'nuh',
    name: 'National University Hospital Genetic Clinic',
    address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074',
    lat: 1.2941,
    lng: 103.7831,
    provider: 'Dr. Helen Lim',
    role: 'Senior Genetic Counsellor'
  },
  {
    id: 'sgh',
    name: 'Singapore General Hospital Genetics Service',
    address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608',
    lat: 1.2798,
    lng: 103.8329,
    provider: 'Dr. Marcus Goh',
    role: 'Principal Genetics Specialist'
  },
  {
    id: 'ttsh',
    name: 'Tan Tock Seng Hospital Clinical Genomics',
    address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433',
    lat: 1.3214,
    lng: 103.8458,
    provider: 'Dr. Sarah Tan',
    role: 'Senior Clinical Geneticist'
  },
  {
    id: 'kkh',
    name: 'KK Women\'s and Children\'s Hospital Genetics Clinic',
    address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899',
    lat: 1.3094,
    lng: 103.8456,
    provider: 'Dr. Jeanette Tan',
    role: 'Lead Paediatric Counsellor'
  }
];

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export const getClinicAddress = (clinicName: string) => {
  if (clinicName.includes("National University") || clinicName.includes("NUH")) {
    return "5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074";
  } else if (clinicName.includes("Singapore General") || clinicName.includes("SGH")) {
    return "Outram Rd, Academic Medicine Basement 1, Singapore 169608";
  } else if (clinicName.includes("Tan Tock Seng") || clinicName.includes("TTSH")) {
    return "11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433";
  } else if (clinicName.includes("KK Women") || clinicName.includes("KKH")) {
    return "100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899";
  }
  return "Singapore Specialty Genetics Centre";
};

export const getClinicSpecialist = (clinicName: string) => {
  if (clinicName.includes("Singapore General") || clinicName.includes("SGH")) {
    return "Dr. Marcus Goh (Principal Genetics Specialist)";
  } else if (clinicName.includes("Tan Tock Seng") || clinicName.includes("TTSH")) {
    return "Dr. Sarah Tan (Senior Clinical Geneticist)";
  } else if (clinicName.includes("KK Women") || clinicName.includes("KKH")) {
    return "Dr. Jeanette Tan (Lead Paediatric Counsellor)";
  }
  return "Dr. Helen Lim (Senior Genetic Counsellor)";
};

export interface ClinicSlot {
  date: string;
  time: string;
  provider: string;
  role: string;
  duration: string;
  cost: string;
  clinic: string;
  address: string;
}

export const CLINIC_SLOTS_DB: Record<string, Record<number, ClinicSlot[]>> = {
  nuh: {
    22: [
      { date: '22 July 2026', time: '10:30 AM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
      { date: '22 July 2026', time: '2:30 PM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
    ],
    23: [
      { date: '23 July 2026', time: '9:00 AM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
      { date: '23 July 2026', time: '2:00 PM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
    ],
    24: [
      { date: '24 July 2026', time: '9:30 AM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
      { date: '24 July 2026', time: '11:00 AM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
      { date: '24 July 2026', time: '4:00 PM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
    ]
  },
  sgh: {
    22: [
      { date: '22 July 2026', time: '9:00 AM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
      { date: '22 July 2026', time: '1:30 PM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
    ],
    23: [
      { date: '23 July 2026', time: '11:30 AM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
      { date: '23 July 2026', time: '3:00 PM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
    ],
    25: [
      { date: '25 July 2026', time: '10:00 AM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
      { date: '25 July 2026', time: '11:30 AM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
    ]
  },
  ttsh: {
    21: [
      { date: '21 July 2026', time: '1:30 PM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18.50', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
      { date: '21 July 2026', time: '3:00 PM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18.50', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
    ],
    23: [
      { date: '23 July 2026', time: '10:00 AM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18.50', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
      { date: '23 July 2026', time: '4:00 PM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18.50', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
    ],
    24: [
      { date: '24 July 2026', time: '11:00 AM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18.50', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
      { date: '24 July 2026', time: '2:30 PM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18.50', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
    ]
  },
  kkh: {
    22: [
      { date: '22 July 2026', time: '1:30 PM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
      { date: '22 July 2026', time: '3:30 PM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
    ],
    24: [
      { date: '24 July 2026', time: '10:30 AM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
      { date: '24 July 2026', time: '3:30 PM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
    ],
    27: [
      { date: '27 July 2026', time: '10:00 AM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
      { date: '27 July 2026', time: '1:00 PM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
    ]
  }
};

export const downloadICSFile = (slot: { date: string; time: string; clinic: string; address: string }) => {
  let datePart = "20260722";
  if (slot.date.includes("21")) datePart = "20260721";
  else if (slot.date.includes("22")) datePart = "20260722";
  else if (slot.date.includes("23")) datePart = "20260723";
  else if (slot.date.includes("24")) datePart = "20260724";
  else if (slot.date.includes("25")) datePart = "20260725";
  else if (slot.date.includes("27")) datePart = "20260727";

  let timeStart = "103000";
  let timeEnd = "111500";
  if (slot.time.includes("9:00")) { timeStart = "090000"; timeEnd = "094500"; }
  else if (slot.time.includes("9:30")) { timeStart = "093000"; timeEnd = "101500"; }
  else if (slot.time.includes("10:00")) { timeStart = "100000"; timeEnd = "104500"; }
  else if (slot.time.includes("10:30")) { timeStart = "103000"; timeEnd = "111500"; }
  else if (slot.time.includes("11:00")) { timeStart = "110000"; timeEnd = "114500"; }
  else if (slot.time.includes("11:30")) { timeStart = "113000"; timeEnd = "121500"; }
  else if (slot.time.includes("1:00")) { timeStart = "130000"; timeEnd = "134500"; }
  else if (slot.time.includes("1:30")) { timeStart = "133000"; timeEnd = "141500"; }
  else if (slot.time.includes("2:00")) { timeStart = "140000"; timeEnd = "144500"; }
  else if (slot.time.includes("2:30")) { timeStart = "143000"; timeEnd = "151500"; }
  else if (slot.time.includes("3:00")) { timeStart = "150000"; timeEnd = "154500"; }
  else if (slot.time.includes("3:30")) { timeStart = "153000"; timeEnd = "161500"; }
  else if (slot.time.includes("4:00")) { timeStart = "160000"; timeEnd = "164500"; }

  const start = `${datePart}T${timeStart}`;
  const end = `${datePart}T${timeEnd}`;

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//GovTech Singapore//HealthHub//EN
BEGIN:VEVENT
UID:fh-genetic-testing-${Date.now()}@healthhub.sg
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART;TZID=Asia/Singapore:${start}
DTEND;TZID=Asia/Singapore:${end}
SUMMARY:FH Genetic Testing Appointment
DESCRIPTION:Pre-test counselling appointment for Familial Hypercholesterolaemia genetic testing.
LOCATION:${slot.clinic}, ${slot.address}
BEGIN:VALARM
TRIGGER:-P7D
ACTION:DISPLAY
DESCRIPTION:Reminder: FH Genetic Testing Appointment in 7 days
END:VALARM
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Reminder: FH Genetic Testing Appointment in 1 day
END:VALARM
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'FH_Genetic_Testing_Appointment.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const getGoogleCalendarUrl = (slot: { date: string; time: string; clinic: string; address: string }) => {
  let datePart = "20260722";
  if (slot.date.includes("21")) datePart = "20260721";
  else if (slot.date.includes("22")) datePart = "20260722";
  else if (slot.date.includes("23")) datePart = "20260723";
  else if (slot.date.includes("24")) datePart = "20260724";
  else if (slot.date.includes("25")) datePart = "20260725";
  else if (slot.date.includes("27")) datePart = "20260727";

  let timeStart = "103000";
  let timeEnd = "111500";
  if (slot.time.includes("9:00")) { timeStart = "090000"; timeEnd = "094500"; }
  else if (slot.time.includes("9:30")) { timeStart = "093000"; timeEnd = "101500"; }
  else if (slot.time.includes("10:00")) { timeStart = "100000"; timeEnd = "104500"; }
  else if (slot.time.includes("10:30")) { timeStart = "103000"; timeEnd = "111500"; }
  else if (slot.time.includes("11:00")) { timeStart = "110000"; timeEnd = "114500"; }
  else if (slot.time.includes("11:30")) { timeStart = "113000"; timeEnd = "121500"; }
  else if (slot.time.includes("1:00")) { timeStart = "130000"; timeEnd = "134500"; }
  else if (slot.time.includes("1:30")) { timeStart = "133000"; timeEnd = "141500"; }
  else if (slot.time.includes("2:00")) { timeStart = "140000"; timeEnd = "144500"; }
  else if (slot.time.includes("2:30")) { timeStart = "143000"; timeEnd = "151500"; }
  else if (slot.time.includes("3:00")) { timeStart = "150000"; timeEnd = "154500"; }
  else if (slot.time.includes("3:30")) { timeStart = "153000"; timeEnd = "161500"; }
  else if (slot.time.includes("4:00")) { timeStart = "160000"; timeEnd = "164500"; }

  const title = encodeURIComponent("FH Genetic Testing Appointment");
  const details = encodeURIComponent("Pre-test counselling appointment for Familial Hypercholesterolaemia genetic testing.");
  const location = encodeURIComponent(`${slot.clinic}, ${slot.address}`);
  const dates = `${datePart}T${timeStart}/${datePart}T${timeEnd}`;
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}&ctz=Asia/Singapore`;
};

export default function PhoneSimulator({
  activeScreen,
  onChangeScreen,
  appointment,
  onBookAppointment,
  onAddCalendarEvent,
  reminderPrefs,
  onUpdateReminderPrefs,
  onTriggerNotification,
  onNotificationAction,
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
  const [bookingStep, setBookingStep] = useState<'available' | 'review' | 'confirmed'>('available');
  const [selectedSlotIdx, setSelectedSlotIdx] = useState<number | null>(null);
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);

  // Geolocation and clinic selection state (User request 1)
  const [selectedClinicId, setSelectedClinicId] = useState<string>('nuh');
  const [patientCoords, setPatientCoords] = useState<{ lat: number; lng: number }>({ lat: 1.3036, lng: 103.8318 }); // default Orchard (Central)
  const [patientLocName, setPatientLocName] = useState<string>('Orchard (Central)');
  const [isDetectingLoc, setIsDetectingLoc] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  const [showClinicDropdown, setShowClinicDropdown] = useState<boolean>(false);

  // Calendar Booking States (User request 2)
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(22); // Day of July 2026
  const [selectedSlotObj, setSelectedSlotObj] = useState<ClinicSlot | null>(null);

  const detectLiveLocation = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }
    setIsDetectingLoc(true);
    setGpsError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPatientCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setPatientLocName('My Live GPS');
        setIsDetectingLoc(false);
      },
      (error) => {
        console.error(error);
        setGpsError('Iframe sandbox or permission blocked GPS access. Please select a town below to simulate location.');
        setIsDetectingLoc(false);
      },
      { timeout: 8000 }
    );
  };
  
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

  const handleBookSubmit = (slotIdx: number) => {
    const slot = selectedSlotObj || clinicalSlots[slotIdx] || clinicalSlots[0];
    onBookAppointment(slot.date, slot.time, slot.clinic);
    setBookingStep('confirmed');
  };

  const handleCancelBooking = () => {
    onNotificationAction('rescheduled');
    setBookingStep('available');
    setSelectedSlotIdx(null);
    setSelectedSlotObj(null);
    setSelectedCalendarDay(22);
  };

  const handleNotificationClickAction = (action: 'confirm' | 'reschedule' | 'learn') => {
    if (action === 'confirm') {
      onNotificationAction('confirmed');
      onChangeScreen(ScreenId.ProgressTimeline);
    } else if (action === 'reschedule') {
      onNotificationAction('rescheduled');
      setBookingStep('available');
      setSelectedSlotIdx(null);
      setSelectedSlotObj(null);
      onChangeScreen(ScreenId.Booking);
    } else if (action === 'learn') {
      onNotificationAction('education_viewed');
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
              <button 
                onClick={() => {
                  setBookingStep('available');
                  onChangeScreen(ScreenId.Home);
                }} 
                className="p-1 hover:bg-slate-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <span className="font-bold text-sm text-slate-800">Secure Appointment Booking</span>
            </div>

            {/* If appointment is BOOKED or CONFIRMED, show Feature 2 Confirmation Screen */}
            {appointment.status === 'booked' || appointment.status === 'confirmed' ? (
              <div className="p-4 space-y-4 animate-fade-in text-left">
                {/* Booking Confirmation Card (Feature 2) */}
                <div className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-xs text-center space-y-3.5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  
                  <div>
                    <h3 className="font-extrabold text-base text-slate-850">Your appointment is confirmed</h3>
                    <p className="text-[10px] text-[#008375] font-extrabold uppercase tracking-wide mt-1 bg-teal-50 px-2.5 py-0.5 rounded-full inline-block border border-teal-100">
                      MOH Subsidized Slot
                    </p>
                  </div>

                  {/* Relational details matching preselected July dates */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left space-y-2.5 text-xs">
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-slate-500 font-medium">Counselling Care Clinic:</span>
                      <strong className="text-slate-800 text-right font-semibold">
                        {appointment.clinic || "National University Hospital Genetic Clinic"}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Assigned Specialist:</span>
                      <strong className="text-slate-800 font-semibold">
                        {getClinicSpecialist(appointment.clinic || "NUH")}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Scheduled Date:</span>
                      <strong className="text-slate-800 font-semibold font-mono">{appointment.date}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Confirmed Time:</span>
                      <strong className="text-slate-800 font-semibold font-mono">{appointment.timeSlot}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Session Duration:</span>
                      <strong className="text-slate-850 font-semibold">45 minutes</strong>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                      <span className="text-slate-500 font-medium">Your Out-of-pocket Cost:</span>
                      <span className="text-teal-700 font-extrabold font-mono">S$18.50 (CHAS Subsidized)</span>
                    </div>
                  </div>

                  {/* Feature 3: Calendar Integration buttons with elegant toggle menu */}
                  <div className="space-y-2.5 pt-1.5">
                    <button 
                      onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      Add to Device Calendar
                    </button>

                    {calendarMenuOpen && (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 grid grid-cols-2 gap-2 animate-fade-in">
                        <button 
                          onClick={() => {
                            downloadICSFile({
                              date: appointment.date,
                              time: appointment.timeSlot,
                              clinic: appointment.clinic,
                              address: getClinicAddress(appointment.clinic)
                            });
                            onAddCalendarEvent();
                            alert('Apple Calendar .ics event downloaded successfully!');
                          }}
                          className="py-2 px-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer animate-fade-in"
                        >
                          <Smartphone className="w-3.5 h-3.5 text-slate-500" /> Apple Calendar
                        </button>
                        <a 
                          href={getGoogleCalendarUrl({
                            date: appointment.date,
                            time: appointment.timeSlot,
                            clinic: appointment.clinic,
                            address: getClinicAddress(appointment.clinic)
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            onAddCalendarEvent();
                          }}
                          className="py-2 px-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer text-center"
                        >
                          <Calendar className="w-3.5 h-3.5 text-[#008375]" /> Google Calendar
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Secure, calm prep card */}
                <div className="bg-teal-50/50 border border-teal-150 rounded-xl p-4 space-y-2.5 text-xs text-left">
                  <h4 className="font-bold text-teal-900 flex items-center gap-2">
                    <Info className="w-4 h-4 text-teal-600 shrink-0" /> Essential Preparation Instructions
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    No medical fasting is needed for the genetic panel test. Bring your NRIC or check in via Singpass. Please review our pre-counselling learning modules before arriving.
                  </p>
                  <button 
                    onClick={() => onChangeScreen(ScreenId.Education)}
                    className="text-[#008375] font-extrabold text-[11px] hover:underline flex items-center gap-0.5 text-left"
                  >
                    View Pre-Appointment Checklist <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Manage and reschedule options */}
                <div className="space-y-2 pt-1 text-left">
                  <button
                    onClick={() => {
                      handleCancelBooking();
                      alert('Reschedule mode active: Please select a new genetic counselling appointment slot below.');
                    }}
                    className="w-full py-2.5 bg-white hover:bg-slate-50 text-[#008375] border border-teal-600/40 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Reschedule Appointment Slot
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Cancel genetic testing slot? Keeping this appointment is crucial to understand familial cardiac risk.')) {
                        handleCancelBooking();
                      }
                    }}
                    className="w-full py-2.5 bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-xl text-xs font-semibold border border-slate-200 transition cursor-pointer"
                  >
                    Cancel Appointment Booking
                  </button>
                </div>
              </div>
            ) : (
              /* Active Booking Steps */
              <div className="p-4 space-y-4 text-left">
                {/* Step 1: Available list */}
                {bookingStep === 'available' && (() => {
                  // Pre-compute distances to find nearest clinic
                  const clinicsWithDistances = CLINICS.map(clinic => {
                    const dist = calculateDistance(
                      patientCoords.lat,
                      patientCoords.lng,
                      clinic.lat,
                      clinic.lng
                    );
                    return { ...clinic, distance: dist };
                  });
                  const minDistance = Math.min(...clinicsWithDistances.map(c => c.distance));

                  return (
                    <div className="space-y-4">
                      {/* Clinical recommendation banner */}
                      <div className="bg-teal-50 border border-teal-200 rounded-xl p-3.5 flex gap-2.5 items-start text-xs text-teal-900">
                        <ShieldAlert className="w-4.5 h-4.5 text-teal-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-extrabold text-teal-950">Active Genetic Referral Enrolled:</strong>
                          <p className="text-[11px] text-teal-800 leading-relaxed mt-0.5">
                            Referral for familial high-cholesterol (FH) testing is active. Please book a pre-test counselling slot below to clear subsidized status.
                          </p>
                        </div>
                      </div>

                      {/* Your Location & Geolocation Control (User request 1) */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3.5 shadow-3xs text-left">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Your Location</span>
                          <button 
                            onClick={() => setShowLocationModal(!showLocationModal)}
                            className="text-[11px] text-[#008375] font-extrabold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            {showLocationModal ? 'Close Selector' : 'Change Estate / GPS'}
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-teal-50 rounded-lg shrink-0">
                            <MapPin className="w-4 h-4 text-[#008375]" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-slate-800">{patientLocName}</h4>
                            <p className="text-[9px] text-slate-500">
                              Coordinates: {patientCoords.lat.toFixed(4)}°N, {patientCoords.lng.toFixed(4)}°E
                            </p>
                          </div>
                        </div>

                        {showLocationModal && (
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2.5 animate-fade-in text-xs">
                            <p className="text-[10px] text-slate-500 leading-normal">
                              We use your location to calculate real-time distances to Singapore clinics:
                            </p>
                            
                            <button
                              onClick={detectLiveLocation}
                              disabled={isDetectingLoc}
                              className="w-full py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                              {isDetectingLoc ? 'Detecting GPS...' : '📍 Find Nearest via Live GPS'}
                            </button>

                            {gpsError && (
                              <p className="text-[9px] text-red-600 font-semibold leading-tight bg-red-50 border border-red-100 p-2 rounded">
                                ⚠️ {gpsError}
                              </p>
                            )}

                            <div className="grid grid-cols-2 gap-1.5 pt-1">
                              {[
                                { name: 'Orchard (Central)', lat: 1.3036, lng: 103.8318 },
                                { name: 'Jurong East (West)', lat: 1.3329, lng: 103.7436 },
                                { name: 'Bedok (East)', lat: 1.3240, lng: 103.9302 },
                                { name: 'Ang Mo Kio (North)', lat: 1.3691, lng: 103.8454 },
                                { name: 'Woodlands (North-West)', lat: 1.4382, lng: 103.7890 },
                                { name: 'Punggol (North-East)', lat: 1.4052, lng: 103.9023 }
                              ].map((loc) => (
                                <button
                                  key={loc.name}
                                  onClick={() => {
                                    setPatientCoords({ lat: loc.lat, lng: loc.lng });
                                    setPatientLocName(loc.name);
                                    setGpsError(null);
                                    setShowLocationModal(false);
                                  }}
                                  className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold border text-center transition cursor-pointer ${
                                    patientLocName === loc.name 
                                      ? 'bg-teal-50 border-teal-600 text-[#008375]' 
                                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                  }`}
                                >
                                  {loc.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Specialized Clinic Location Dropdown (User request 1) */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Specialized Clinic Location</label>
                        <div className="relative">
                          <button
                            onClick={() => setShowClinicDropdown(!showClinicDropdown)}
                            className="w-full bg-white border border-slate-200 rounded-xl p-3.5 flex justify-between items-center shadow-3xs cursor-pointer text-left transition hover:border-teal-600/40"
                          >
                            <div className="flex gap-3 min-w-0">
                              <div className="p-2 bg-teal-50 rounded-lg shrink-0 self-center">
                                <MapPin className="w-4.5 h-4.5 text-[#008375]" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-bold text-xs text-slate-800 truncate">
                                  {CLINICS.find(c => c.id === selectedClinicId)?.name}
                                </h4>
                                <p className="text-[10px] text-slate-500 leading-snug mt-0.5 truncate">
                                  {CLINICS.find(c => c.id === selectedClinicId)?.address}
                                </p>
                                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                  <span className="text-[9px] font-mono font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                                    Distance: {clinicsWithDistances.find(c => c.id === selectedClinicId)?.distance.toFixed(1)} km
                                  </span>
                                  {clinicsWithDistances.find(c => c.id === selectedClinicId)?.distance === minDistance && (
                                    <span className="text-[9px] font-sans font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5">
                                      ⭐ Nearest Clinic
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                          </button>

                          {showClinicDropdown && (
                            <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-xl mt-1.5 shadow-md z-40 overflow-hidden divide-y divide-slate-100 animate-fade-in max-h-52 overflow-y-auto">
                              {clinicsWithDistances.map((clinic) => {
                                const isSelected = selectedClinicId === clinic.id;
                                const isNearest = clinic.distance === minDistance;
                                return (
                                  <button
                                    key={clinic.id}
                                    onClick={() => {
                                      setSelectedClinicId(clinic.id);
                                      setShowClinicDropdown(false);
                                      
                                      // Auto-select first available day for the clinic
                                      const availableDays = Object.keys(CLINIC_SLOTS_DB[clinic.id]).map(Number);
                                      if (availableDays.length > 0) {
                                        setSelectedCalendarDay(availableDays[0]);
                                      }
                                    }}
                                    className={`w-full text-left p-3.5 transition flex justify-between items-start gap-3 hover:bg-teal-50/10 cursor-pointer ${
                                      isSelected ? 'bg-teal-50/20' : 'bg-white'
                                    }`}
                                  >
                                    <div className="space-y-1 min-w-0 flex-1">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <h5 className={`font-bold text-xs ${isSelected ? 'text-[#008375]' : 'text-slate-800'}`}>
                                          {clinic.name}
                                        </h5>
                                        {isNearest && (
                                          <span className="text-[8px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                                            NEAREST
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[10px] text-slate-500 leading-tight truncate">
                                        {clinic.address}
                                      </p>
                                      <p className="text-[9px] font-mono font-bold text-slate-400">
                                        Distance: <span className="text-teal-700">{clinic.distance.toFixed(1)} km</span>
                                      </p>
                                    </div>
                                    {isSelected && <Check className="w-4 h-4 text-[#008375] shrink-0 mt-0.5" />}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Feature 1 Calendar Layout Month Grid (User request 2) */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-3xs text-left">
                        <div className="flex justify-between items-center border-b border-slate-150 pb-2">
                          <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-mono">
                            Select Session Date
                          </h4>
                          <span className="text-xs font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">July 2026</span>
                        </div>

                        {/* Calendar Grid */}
                        <div className="space-y-2">
                          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400">
                            <span>S</span>
                            <span>M</span>
                            <span>T</span>
                            <span>W</span>
                            <span>T</span>
                            <span>F</span>
                            <span>S</span>
                          </div>

                          <div className="grid grid-cols-7 gap-1">
                            {/* July 1st 2026 is Wednesday, so 3 empty cells */}
                            {Array.from({ length: 3 }).map((_, i) => (
                              <div key={`empty-${i}`} className="h-8" />
                            ))}

                            {/* Days 1 to 31 */}
                            {Array.from({ length: 31 }).map((_, i) => {
                              const dayNum = i + 1;
                              const hasSlots = !!CLINIC_SLOTS_DB[selectedClinicId]?.[dayNum];
                              const isSelected = selectedCalendarDay === dayNum;

                              return (
                                <button
                                  key={`day-${dayNum}`}
                                  disabled={!hasSlots}
                                  onClick={() => setSelectedCalendarDay(dayNum)}
                                  className={`h-8 w-8 rounded-full flex flex-col items-center justify-center text-[10.5px] font-extrabold transition relative cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#008375] text-white shadow-xs'
                                      : hasSlots
                                      ? 'bg-teal-50 text-[#008375] border border-teal-200/55 hover:bg-teal-100/60'
                                      : 'text-slate-300 pointer-events-none'
                                  }`}
                                >
                                  <span>{dayNum}</span>
                                  {hasSlots && !isSelected && (
                                    <span className="absolute bottom-1 w-1 h-1 bg-[#008375] rounded-full" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex gap-4 items-center justify-center text-[9px] text-slate-400 pt-1.5 border-t border-slate-100">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center"><span className="w-1 h-1 bg-[#008375] rounded-full" /></span>
                            <span>Slots Available</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#008375]" />
                            <span>Selected Day</span>
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Slots for Selected Calendar Day */}
                      <div className="space-y-2.5 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex justify-between items-center">
                          <span>Available Counselling Slots (July {selectedCalendarDay})</span>
                          <span className="text-[#008375] font-semibold">MOH Approved</span>
                        </label>
                        <div className="space-y-2">
                          {CLINIC_SLOTS_DB[selectedClinicId]?.[selectedCalendarDay] ? (
                            CLINIC_SLOTS_DB[selectedClinicId][selectedCalendarDay].map((slot, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSelectedSlotObj(slot);
                                  setSelectedSlotIdx(idx);
                                  setBookingStep('review');
                                }}
                                className="w-full bg-white hover:bg-teal-50/15 border border-slate-200 hover:border-[#008375]/40 p-3.5 rounded-xl text-left transition flex justify-between items-center cursor-pointer shadow-3xs hover:shadow-2xs"
                                style={{ minHeight: '64px' }}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-slate-50 text-slate-500 rounded-lg shrink-0">
                                    <Clock className="w-4 h-4 text-[#008375]" />
                                  </div>
                                  <div className="space-y-0.5">
                                    <p className="text-xs font-extrabold text-slate-800">{slot.time}</p>
                                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                      <span className="font-semibold text-slate-600">{slot.provider}</span>
                                      <span className="text-slate-300">•</span>
                                      <span>{slot.duration}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-bold text-[#008375] font-mono bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                                    {slot.cost}
                                  </span>
                                  <ChevronRight className="w-4 h-4 text-slate-400" />
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="bg-white border border-dashed border-slate-200 p-6 rounded-xl text-center text-xs text-slate-400">
                              No slots available on this date. Please select a highlighted day on the calendar above.
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200 flex justify-between items-center text-xs text-left">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Coins className="w-4 h-4 text-[#008375]" />
                          <span>MOH Subsidy Applied (CHAS Blue)</span>
                        </div>
                        <strong className="text-slate-800 font-mono">Est: S$18.50</strong>
                      </div>
                    </div>
                  );
                })()}

                {/* Step 2: Review state */}
                {bookingStep === 'review' && (selectedSlotObj !== null || selectedSlotIdx !== null) && (() => {
                  const slot = selectedSlotObj || clinicalSlots[selectedSlotIdx || 0];
                  return (
                    <div className="space-y-4 animate-fade-in text-left">
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-800">Review Booking Request</h3>
                        <p className="text-[11px] text-slate-500 mt-0.5">Please review before locking your counselling slot.</p>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3.5 shadow-3xs text-left">
                        <div className="space-y-1 border-b border-slate-100 pb-3 text-left font-sans">
                          <span className="text-[9px] font-mono text-slate-400 uppercase font-bold tracking-wider">Assigned Clinical Specialist</span>
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-slate-150 text-[#008375] font-extrabold flex items-center justify-center text-xs">
                              {slot.provider.split(' ').pop()?.substring(0, 2).toUpperCase() || 'HL'}
                            </div>
                            <div>
                              <h4 className="font-bold text-xs text-slate-800">{slot.provider}</h4>
                              <p className="text-[10px] text-slate-500">{slot.role}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs text-left">
                          <div className="flex justify-between items-start gap-4">
                            <span className="text-slate-500 font-medium">Location:</span>
                            <span className="text-slate-800 text-right font-semibold">{slot.clinic}</span>
                          </div>
                          <div className="flex justify-between items-start gap-4">
                            <span className="text-slate-500 font-medium">Address:</span>
                            <span className="text-slate-500 text-right text-[11px] leading-snug">{slot.address}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Date:</span>
                            <span className="text-slate-800 font-semibold font-mono">{slot.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Time:</span>
                            <span className="text-slate-800 font-semibold font-mono">{slot.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Session Duration:</span>
                            <span className="text-slate-800 font-semibold">{slot.duration}</span>
                          </div>
                          <div className="flex justify-between border-t border-slate-100 pt-2.5 mt-2.5">
                            <span className="text-slate-500 font-bold">Total Estimated Out-of-pocket Cost:</span>
                            <span className="text-[#008375] font-extrabold font-mono">S$18.50</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 space-y-2">
                        <button
                          onClick={() => handleBookSubmit(selectedSlotIdx || 0)}
                          className="w-full py-3 bg-[#008375] hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-700/10 transition cursor-pointer"
                        >
                          Confirm Appointment Booking
                        </button>
                        <button
                          onClick={() => {
                            setBookingStep('available');
                            setSelectedSlotIdx(null);
                            setSelectedSlotObj(null);
                          }}
                          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition cursor-pointer border border-slate-200"
                        >
                          Change Date/Time
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}


        {/* ----------------- SCREEN 4: REMINDERS ----------------- */}
        {activeScreen === ScreenId.ReminderSettings && (
          <div className="flex-col flex flex-1 pb-6">
            {/* Top Navigation */}
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-2 text-left">
              <button 
                onClick={() => onChangeScreen(ScreenId.Home)} 
                className="p-1 hover:bg-slate-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <span className="font-bold text-sm text-slate-800">Reminder Preferences</span>
            </div>

            <div className="p-4 space-y-4 text-left">
              <div>
                <h3 className="font-extrabold text-base text-slate-800">Your Communication Settings</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Configure how and when you receive genetic testing referrals and appointment alerts.</p>
              </div>

              {/* Master Toggle */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-xs text-slate-800">Active FH Reminders</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Receive educational updates and countdown reminders.</p>
                </div>
                <button
                  onClick={() => onUpdateReminderPrefs(!reminderPrefs.enabled, reminderPrefs.channel, reminderPrefs.frequency)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${reminderPrefs.enabled ? 'bg-[#008375]' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${reminderPrefs.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {reminderPrefs.enabled && (
                <div className="space-y-4 animate-fade-in text-left">
                  
                  {/* Select Channel */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Notification Channel</label>
                    <div className="space-y-2">
                      {[
                        { id: 'sms', label: 'SMS Messages Only', desc: 'Sent directly to your registered mobile: +65 9123 4567' },
                        { id: 'push', label: 'HealthHub App Push Only', desc: 'Secure local notifications on your lockscreen' },
                        { id: 'both', label: 'Send via Both Channels', desc: 'Highly recommended for older adults to prevent referral drop-off' }
                      ].map((ch) => (
                        <button
                          key={ch.id}
                          onClick={() => onUpdateReminderPrefs(reminderPrefs.enabled, ch.id as any, reminderPrefs.frequency)}
                          className={`w-full text-left p-3 rounded-xl border transition flex gap-3 cursor-pointer ${
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
                        { id: 'monthly', label: 'Monthly Info', sub: 'Education resources' },
                        { id: '2_weeks', label: '2 Weeks Before', sub: 'Initial nudge' },
                        { id: '1_week', label: '1 Week Before', sub: 'Highly protective' },
                        { id: '1_day', label: '1 Day Before', sub: 'Final prep check' },
                        { id: 'custom', label: 'Custom spacing', sub: 'User defined' }
                      ].map((f) => (
                        <button
                          key={f.id}
                          onClick={() => onUpdateReminderPrefs(reminderPrefs.enabled, reminderPrefs.channel, f.id as any)}
                          className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                            reminderPrefs.frequency === f.id
                              ? 'bg-teal-50 border-[#008375] font-bold'
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <p className="text-xs text-slate-800">{f.label}</p>
                          <p className="text-[9px] text-slate-400 mt-0.5 leading-snug">{f.sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic previews based on selected channels */}
                  {(reminderPrefs.channel === 'sms' || reminderPrefs.channel === 'both') && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex justify-between">
                        <span>SMS Broadcast Preview</span>
                        <span className="text-emerald-700">Verified MOH Sender</span>
                      </label>
                      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 border-b border-slate-100 pb-2">
                          <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                          <span>MOH-HealthHub</span>
                          <span className="ml-auto text-[9px] font-mono">Today, 09:41 AM</span>
                        </div>
                        <div className="bg-slate-100 p-3 rounded-xl rounded-tl-none text-[11px] text-slate-700 leading-normal font-sans border border-slate-200/50">
                          MOH HealthHub: Hi Lisa, your FH Genetic Counselling slot at National University Hospital Genetic Clinic is confirmed on {appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.date : '22 July 2026'} at {appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.timeSlot : '10:30 AM'}. Subsidies up to 75% are cleared. Bring Singpass. Info: https://hh.gov.sg/fh-ref
                        </div>
                      </div>
                    </div>
                  )}

                  {(reminderPrefs.channel === 'push' || reminderPrefs.channel === 'both') && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                        HealthHub App Lockscreen Preview
                      </label>
                      <div className="bg-slate-900 border border-slate-700 text-white rounded-xl p-4 shadow-md space-y-2">
                        <div className="flex items-center gap-1.5 text-[9px] text-slate-400 border-b border-slate-800 pb-1.5">
                          <div className="w-4 h-4 bg-[#008375] rounded flex items-center justify-center text-white text-[8px] font-black">HH</div>
                          <span>HealthHub Singapore • Just Now</span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-100">Counselling Appointment Reminder</h4>
                          <p className="text-[10.5px] text-slate-300 leading-snug">
                            Your genetic counseling is confirmed for {appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.date : '22 July 2026'} at {appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.timeSlot : '10:30 AM'}. Tap to complete checklist.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mock notify trigger */}
                  <button
                    onClick={onTriggerNotification}
                    className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
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
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-2 text-left">
              <button 
                onClick={() => onChangeScreen(ScreenId.Home)} 
                className="p-1 hover:bg-slate-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <span className="font-bold text-sm text-slate-800">Your Appointment Progress</span>
            </div>

            <div className="p-4 space-y-4 text-left">
              {/* Countdown Header */}
              <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white p-4 rounded-2xl shadow-sm text-left">
                <p className="text-[10px] font-mono uppercase tracking-widest text-teal-300 font-bold">Appointment Status</p>
                <h3 className="font-extrabold text-base mt-1">
                  {appointment.status === 'confirmed' 
                    ? 'Attendance Confirmed' 
                    : appointment.status === 'booked' 
                      ? 'Appointment Scheduled' 
                      : 'Counselling Booking Required'}
                </h3>
                <p className="text-[11px] text-teal-100 mt-1 max-w-[280px] leading-relaxed">
                  {appointment.status === 'confirmed' || appointment.status === 'booked'
                    ? `Confirmed for ${appointment.date} at ${appointment.timeSlot} at National University Hospital Genetic Clinic.` 
                    : 'Your active cardiac genetic referral requires you to schedule a counselling session.'
                  }
                </p>
              </div>

              {/* Progress Timeline Block */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-5">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Interactive Referral Timeline</h4>
                
                <div className="relative pl-6 space-y-6 text-left">
                  {/* Vertical connecting line */}
                  <div className="absolute left-2.5 top-2.5 bottom-2 w-0.5 bg-slate-200" />

                  {/* Step 1: Referral received */}
                  <div className="relative">
                    <div className="absolute -left-[21px] w-5 h-5 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-xs">
                      ✓
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">Referral received</h5>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Recommended by Clinical Cardiology Specialist on 12 Jul 2026.</p>
                    </div>
                  </div>

                  {/* Step 2: Education completed */}
                  <div className="relative">
                    <div className="absolute -left-[21px] w-5 h-5 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-xs">
                      ✓
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">Education materials reviewed</h5>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Subsidies, clinical video, and FAQs completed on Singapore HealthHub.</p>
                    </div>
                  </div>

                  {/* Step 3: Appointment Booked */}
                  <div className="relative">
                    <div className={`absolute -left-[21px] w-5 h-5 rounded-full border-4 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-xs ${
                      (appointment.status === 'booked' || appointment.status === 'confirmed') ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}>
                      {(appointment.status === 'booked' || appointment.status === 'confirmed') ? '✓' : '3'}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">Counselling slot booked</h5>
                      {(appointment.status === 'booked' || appointment.status === 'confirmed') ? (
                        <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Successfully scheduled for {appointment.date} @ {appointment.timeSlot} at NUH Genetic Clinic.</p>
                      ) : (
                        <div className="space-y-1.5 mt-1">
                          <p className="text-[10px] text-amber-700 font-semibold">Action needed: Choose your subsidized genetic counselling slot.</p>
                          <button 
                            onClick={() => onChangeScreen(ScreenId.Booking)}
                            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-bold transition cursor-pointer"
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
                      appointment.status === 'confirmed' 
                        ? 'bg-emerald-500' 
                        : appointment.status === 'booked' 
                          ? 'bg-teal-600 animate-pulse' 
                          : 'bg-slate-300'
                    }`}>
                      {appointment.status === 'confirmed' ? '✓' : '4'}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">Attend genetic counselling</h5>
                      {appointment.status === 'confirmed' ? (
                        <p className="text-[10px] text-emerald-700 font-bold leading-normal mt-0.5 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                          Ready & Registered • NRIC/Singpass pre-cleared for clinical intake.
                        </p>
                      ) : appointment.status === 'booked' ? (
                        <p className="text-[10px] text-teal-700 font-semibold leading-normal mt-0.5">
                          Attendance is unverified. Tap on lockscreen push alerts or settings to confirm attendance.
                        </p>
                      ) : (
                        <p className="text-[10px] text-slate-500 leading-normal mt-0.5">45-minute session to answer family worries and finalize testing.</p>
                      )}
                    </div>
                  </div>

                  {/* Step 5: Receive results */}
                  <div className="relative">
                    <div className="absolute -left-[21px] w-5 h-5 rounded-full bg-slate-300 border-4 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-xs">
                      5
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">Receive genetic results</h5>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Discussion of preventative steps and tailored medicine 4 weeks after blood drawn.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prep Checklist link shortcut */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2 text-xs text-left">
                <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-teal-600" />
                  Preparation Checklist
                </h5>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Make sure you know what to expect and what family history reports to bring. Review our guides.
                </p>
                <button
                  onClick={() => onChangeScreen(ScreenId.Education)}
                  className="text-[#008375] font-bold underline text-[11px] hover:text-teal-800 flex items-center gap-0.5 mt-1 cursor-pointer"
                >
                  Review checklist now <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        )}


        {/* ----------------- SCREEN 6: LOCK SCREEN NOTIFICATION ----------------- */}
        {activeScreen === ScreenId.NotificationMock && (
          <div className="flex-1 flex flex-col justify-between p-6 bg-cover bg-center relative select-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80')" }}>
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" />
            
            {/* Top Time Details */}
            <div className="relative text-center text-white space-y-1.5 pt-8 z-10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-200">Singapore Telecommunications</span>
              <h2 className="text-5xl font-thin tracking-tight font-sans">09:41</h2>
              <p className="text-xs font-medium text-slate-200">Wednesday, July 15, 2026</p>
            </div>

            {/* Notification Bubble (Feature 5) */}
            <div className="relative z-10 space-y-4 my-auto">
              
              <div className="bg-slate-900/85 backdrop-blur-md text-white border border-slate-700/50 p-4 rounded-2xl shadow-xl space-y-3 max-w-[320px] mx-auto animate-bounce-short text-left">
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
                  <h4 className="font-bold text-xs text-slate-100">Confirm your counselling appointment</h4>
                  <p className="text-[11px] text-slate-300 leading-snug font-sans">
                    Your subsidized FH Genetic Counselling at <strong className="text-white">NUH Genetic Clinic</strong> is scheduled on <strong className="text-white">{appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.date : '22 July 2026'} @ {appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.timeSlot : '10:30 AM'}</strong>.
                  </p>
                </div>

                {/* Subsidized tag */}
                <div className="bg-teal-900/30 border border-teal-850 p-2 rounded-lg text-[10px] text-teal-300 flex items-center justify-between">
                  <span>MOH Subsidized Slot</span>
                  <strong className="font-mono">S$18.50</strong>
                </div>

                {/* Lock Screen buttons */}
                <div className="flex flex-col gap-1.5 pt-1 text-left">
                  <button
                    onClick={() => handleNotificationClickAction('confirm')}
                    className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 shadow-sm cursor-pointer text-center"
                  >
                    Confirm Attendance
                  </button>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => handleNotificationClickAction('reschedule')}
                      className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[10px] font-semibold transition cursor-pointer text-center"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => handleNotificationClickAction('learn')}
                      className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[10px] font-semibold transition cursor-pointer text-center"
                    >
                      Read Prep Guide
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-300 text-center leading-normal max-w-[240px] mx-auto text-shadow-sm font-medium">
                Tap "Confirm Attendance" to log your confirmation instantly in Singapore HealthHub database.
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
