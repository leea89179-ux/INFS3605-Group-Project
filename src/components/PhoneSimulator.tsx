import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId, Appointment, ReminderPreferences, PatientRecord } from '../types';
import { HeartPulse, Dna, ClipboardList, Coins, ShieldAlert, Pill, ChevronRight, Calendar, Bell, Check, ArrowLeft, Play, Pause, MapPin, SquareCheck as CheckSquare, Square, Info, ShieldCheck, ExternalLink, MessageCircle, Smartphone, CircleAlert as AlertCircle, Share2, Users, Sparkles, BookOpen, FileText, Shield, Settings, CreditCard, User, ChevronDown, Clock, X, Download, Printer, ChevronLeft, CircleHelp as HelpCircle, Globe, CircleCheck as CheckCircle, Phone, LogOut, Search, Send, RefreshCw, MessageSquare, Mail } from 'lucide-react';
import { educationalSections, preCounsellingChecklist, faqs, HelpfulResource, helpfulResources } from '../data/education';
import { Language, LANG_LABELS, UI_TRANSLATIONS, getLocalizedChecklist, getLocalizedEducationalSections, getLocalizedFaqs, getLocalizedDate, getLocalizedMonthOnly, getLocalizedHelpfulResources } from '../data/translations';
import { getPersonalizedGuide, getPersonalisedGuideContent } from '../data/personalizedContent';
import { getPersonalizedStory } from '../data/personalizedStories';

interface PhoneSimulatorProps {
  activeScreen: ScreenId;
  onChangeScreen: (screenId: ScreenId) => void;
  appointment: Appointment;
  onBookAppointment: (date: string, time: string, clinic: string) => void;
  onAddCalendarEvent: () => void;
  reminderPrefs: ReminderPreferences;
  onUpdateReminderPrefs: (enabled: boolean, channel: string, frequency: 'monthly' | '2_weeks' | '1_week' | '1_day' | 'custom') => void;
  onTriggerNotification: () => void;
  onNotificationAction: (action: 'confirmed' | 'rescheduled' | 'education_viewed') => void;
  onCancelAppointment: () => void;
  isFHReferred: boolean;
  patientRecord?: PatientRecord;
  percentComplete?: number;
  onUpdateEducationProgress?: (patientId: string, percent: number) => void;
}

export const PERSONA_DETAILS: Record<string, { fullName: string; nric: string; dob: string; gender: string; email: string; age: number; address: string }> = {
  SL001: { fullName: 'Sarah Lim Mei Ting', nric: 'SXXXX123B', dob: '12 January 1995', gender: 'Female', email: 'sarah.lim@gmail.com', age: 31, address: 'Blk 123 Toa Payoh Lor 4, #05-67, Singapore 310123' },
  DT002: { fullName: 'Daniel Tan Wei Jie', nric: 'SXXXX456C', dob: '23 May 1988', gender: 'Male', email: 'daniel.tan@gmail.com', age: 38, address: 'Blk 543 Bedok North St 3, #11-92, Singapore 460543' },
  EW003: { fullName: 'Emily Wong Sook Yee', nric: 'SXXXX789D', dob: '04 October 1991', gender: 'Female', email: 'emily.wong@gmail.com', age: 35, address: 'Blk 890 Jurong West St 91, #02-14, Singapore 640890' },
  ML004: { fullName: 'Michael Lee Kian Seng', nric: 'SXXXX012E', dob: '15 December 1980', gender: 'Male', email: 'michael.lee@gmail.com', age: 46, address: 'Blk 234 Yishun Ring Rd, #09-33, Singapore 760234' },
  PN005: { fullName: 'Priya Nair', nric: 'SXXXX345F', dob: '27 June 1987', gender: 'Female', email: 'priya.nair@gmail.com', age: 39, address: 'Blk 765 Clementi West St 2, #04-18, Singapore 120765' },
  LH321: { fullName: 'Lisa Ho Siew Lan', nric: 'SXXXX321A', dob: '14 August 1989', gender: 'Female', email: 'lisa.ho@gmail.com', age: 37, address: 'Blk 451 Ang Mo Kio Ave 10, #08-122, Singapore 560451' },
};

export const PERSONA_COORDS: Record<string, { lat: number; lng: number }> = {
  SL001: { lat: 1.3353, lng: 103.8497 },
  DT002: { lat: 1.3324, lng: 103.9290 },
  EW003: { lat: 1.3401, lng: 103.6888 },
  ML004: { lat: 1.4304, lng: 103.8402 },
  PN005: { lat: 1.3035, lng: 103.7663 },
  LH321: { lat: 1.3625, lng: 103.8542 },
};

export const formatMonthShorthand = (monthStr: string, lang: Language = 'en'): string => {
  const parts = monthStr.split(' ');
  if (parts.length < 2) return monthStr;
  const monthName = parts[0];
  const year = parts[1];
  const localized = getLocalizedMonthOnly(monthStr, lang);
  if (lang === 'zh') {
    return `${year}年 ${localized}`;
  }
  return `${localized} ${year}`;
};

export const clinicalSlots = [
  {
    date: '21 July 2026',
    time: '10:00 AM',
    provider: 'Dr. Helen Lim',
    role: 'Senior Genetic Counsellor',
    duration: '45 mins',
    clinic: 'National University Hospital Genetic Clinic',
    address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074',
    cost: 'S$18.50'
  },
  {
    date: '23 July 2026',
    time: '2:00 PM',
    provider: 'Dr. Helen Lim',
    role: 'Senior Genetic Counsellor',
    duration: '45 mins',
    clinic: 'National University Hospital Genetic Clinic',
    address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074',
    cost: 'S$18.50'
  },
  {
    date: '24 July 2026',
    time: '9:30 AM',
    provider: 'Dr. Helen Lim',
    role: 'Senior Genetic Counsellor',
    duration: '45 mins',
    clinic: 'National University Hospital Genetic Clinic',
    address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074',
    cost: 'S$18.50'
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

export const GENERAL_CLINICS: ClinicOption[] = [
  {
    id: 'nuh',
    name: 'Toa Payoh Polyclinic',
    address: '2003 Toa Payoh Lor 8, Singapore 319260',
    lat: 1.3392,
    lng: 103.8565,
    provider: 'Dr. Audrey Ng',
    role: 'Family Physician'
  },
  {
    id: 'sgh',
    name: 'Ang Mo Kio Polyclinic',
    address: '21 Ang Mo Kio Central 2, Singapore 569666',
    lat: 1.3785,
    lng: 103.8454,
    provider: 'Dr. Kevin Tan',
    role: 'Senior Resident Physician'
  },
  {
    id: 'ttsh',
    name: 'Kallang Polyclinic',
    address: '190 Serangoon Road, Singapore 218064',
    lat: 1.3125,
    lng: 103.8580,
    provider: 'Dr. Priya Ramasamy',
    role: 'Family Physician'
  },
  {
    id: 'kkh',
    name: 'Gleneagles General Outpatient Clinic',
    address: '6A Napier Rd, Singapore 258500',
    lat: 1.3065,
    lng: 103.8015,
    provider: 'Dr. Christopher de Souza',
    role: 'General Practitioner'
  }
];

export function getClinicSlotsDb(isFHReferred: boolean): Record<string, Record<string, Record<number, ClinicSlot[]>>> {
  if (isFHReferred) {
    return CLINIC_SLOTS_DB;
  }
  
  const mappedDb: Record<string, Record<string, Record<number, ClinicSlot[]>>> = {};
  for (const clinicId of Object.keys(CLINIC_SLOTS_DB)) {
    const generalClinic = GENERAL_CLINICS.find(c => c.id === clinicId);
    if (!generalClinic) continue;
    
    mappedDb[clinicId] = {};
    const months = CLINIC_SLOTS_DB[clinicId];
    for (const month of Object.keys(months)) {
      mappedDb[clinicId][month] = {};
      const days = months[month];
      for (const day of Object.keys(days).map(Number)) {
        const slots = days[day];
        mappedDb[clinicId][month][day] = slots.map(slot => ({
          ...slot,
          clinic: generalClinic.name,
          address: generalClinic.address,
          provider: generalClinic.provider,
          role: generalClinic.role,
          duration: '15 mins',
          cost: 'S$4.00'
        }));
      }
    }
  }
  return mappedDb;
}

export const SEARCHABLE_LOCATIONS = [
  { name: 'Blk 451 Ang Mo Kio Ave 10, #08-122, Singapore 560451', lat: 1.3625, lng: 103.8542 },
  { name: 'Orchard Road (Central)', lat: 1.3036, lng: 103.8318 },
  { name: 'Blk 233 Tampines Street 21, Singapore 520233', lat: 1.3534, lng: 103.9531 },
  { name: 'Blk 12 Bedok South Ave 1, Singapore 460012', lat: 1.3240, lng: 103.9333 },
  { name: 'Blk 812 Woodlands Street 82, Singapore 730812', lat: 1.4359, lng: 103.7869 },
  { name: 'Blk 104 Jurong East Street 13, Singapore 600104', lat: 1.3329, lng: 103.7436 },
  { name: 'Blk 721 Yishun Street 71, Singapore 760721', lat: 1.4285, lng: 103.8364 },
  { name: 'Blk 201 Serangoon Central, Singapore 550201', lat: 1.3503, lng: 103.8727 },
  { name: 'Blk 506 Bukit Batok Street 52, Singapore 650506', lat: 1.3443, lng: 103.7529 },
  { name: 'Blk 49 Stirling Road, Singapore 141049', lat: 1.2942, lng: 103.8016 },
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
  if (clinicName.includes("Toa Payoh Polyclinic")) {
    return "2003 Toa Payoh Lor 8, Singapore 319260";
  } else if (clinicName.includes("Ang Mo Kio Polyclinic")) {
    return "21 Ang Mo Kio Central 2, Singapore 569666";
  } else if (clinicName.includes("Kallang Polyclinic")) {
    return "190 Serangoon Road, Singapore 218064";
  } else if (clinicName.includes("Gleneagles")) {
    return "6A Napier Rd, Singapore 258500";
  }
  if (clinicName.includes("National University") || clinicName.includes("NUH")) {
    return "5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074";
  } else if (clinicName.includes("Singapore General") || clinicName.includes("SGH")) {
    return "Outram Rd, Academic Medicine Basement 1, Singapore 169608";
  } else if (clinicName.includes("Tan Tock Seng") || clinicName.includes("TTSH")) {
    return "11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433";
  } else if (clinicName.includes("KK Women") || clinicName.includes("KKH")) {
    return "100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899";
  }
  return "Singapore General Outpatient Clinic";
};

export const getClinicSpecialist = (clinicName: string) => {
  if (clinicName.includes("Toa Payoh Polyclinic")) {
    return "Dr. Audrey Ng (Family Physician)";
  } else if (clinicName.includes("Ang Mo Kio Polyclinic")) {
    return "Dr. Kevin Tan (Senior Resident Physician)";
  } else if (clinicName.includes("Kallang Polyclinic")) {
    return "Dr. Priya Ramasamy (Family Physician)";
  } else if (clinicName.includes("Gleneagles")) {
    return "Dr. Christopher de Souza (General Practitioner)";
  }
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

export const CLINIC_SLOTS_DB: Record<string, Record<string, Record<number, ClinicSlot[]>>> = {
  nuh: {
    'July 2026': {
      21: [
        { date: '21 July 2026', time: '10:00 AM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '21 July 2026', time: '1:30 PM', provider: 'Dr. Albert Chiang', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      22: [
        { date: '22 July 2026', time: '10:30 AM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '22 July 2026', time: '11:30 AM', provider: 'Dr. Albert Chiang', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '22 July 2026', time: '2:30 PM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '22 July 2026', time: '4:00 PM', provider: 'Dr. Albert Chiang', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      23: [
        { date: '23 July 2026', time: '9:00 AM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '23 July 2026', time: '11:00 AM', provider: 'Dr. Albert Chiang', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '23 July 2026', time: '2:00 PM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '23 July 2026', time: '3:30 PM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      24: [
        { date: '24 July 2026', time: '9:30 AM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '24 July 2026', time: '11:00 AM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '24 July 2026', time: '1:30 PM', provider: 'Dr. Albert Chiang', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '24 July 2026', time: '4:00 PM', provider: 'Dr. Albert Chiang', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ]
    },
    'August 2026': {
      12: [
        { date: '12 August 2026', time: '10:00 AM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '12 August 2026', time: '1:30 PM', provider: 'Dr. Albert Chiang', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      13: [
        { date: '13 August 2026', time: '11:30 AM', provider: 'Dr. Albert Chiang', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '13 August 2026', time: '2:30 PM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      14: [
        { date: '14 August 2026', time: '9:00 AM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '14 August 2026', time: '3:30 PM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      18: [
        { date: '18 August 2026', time: '1:30 PM', provider: 'Dr. Albert Chiang', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '18 August 2026', time: '4:00 PM', provider: 'Dr. Albert Chiang', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ]
    },
    'September 2026': {
      8: [
        { date: '8 September 2026', time: '10:00 AM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '8 September 2026', time: '1:30 PM', provider: 'Dr. Albert Chiang', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      9: [
        { date: '9 September 2026', time: '11:30 AM', provider: 'Dr. Albert Chiang', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '9 September 2026', time: '2:30 PM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      10: [
        { date: '10 September 2026', time: '9:00 AM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '10 September 2026', time: '3:30 PM', provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      15: [
        { date: '15 September 2026', time: '1:30 PM', provider: 'Dr. Albert Chiang', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '15 September 2026', time: '4:00 PM', provider: 'Dr. Albert Chiang', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ]
    }
  },
  sgh: {
    'July 2026': {
      22: [
        { date: '22 July 2026', time: '9:00 AM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$24.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '22 July 2026', time: '10:30 AM', provider: 'Dr. Fiona Lee', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '22 July 2026', time: '1:30 PM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$24.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '22 July 2026', time: '3:00 PM', provider: 'Dr. Fiona Lee', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ],
      23: [
        { date: '23 July 2026', time: '11:30 AM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$24.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '23 July 2026', time: '1:30 PM', provider: 'Dr. Fiona Lee', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '23 July 2026', time: '3:00 PM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$24.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ],
      25: [
        { date: '25 July 2026', time: '10:00 AM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$24.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '25 July 2026', time: '11:30 AM', provider: 'Dr. Fiona Lee', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '25 July 2026', time: '2:00 PM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$24.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ]
    },
    'August 2026': {
      12: [
        { date: '12 August 2026', time: '9:00 AM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$24.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '12 August 2026', time: '10:30 AM', provider: 'Dr. Fiona Lee', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ],
      13: [
        { date: '13 August 2026', time: '1:30 PM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$24.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '13 August 2026', time: '3:00 PM', provider: 'Dr. Fiona Lee', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ],
      19: [
        { date: '19 August 2026', time: '11:30 AM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$24.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '19 August 2026', time: '1:30 PM', provider: 'Dr. Fiona Lee', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ]
    },
    'September 2026': {
      8: [
        { date: '8 September 2026', time: '9:00 AM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$24.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '8 September 2026', time: '10:30 AM', provider: 'Dr. Fiona Lee', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ],
      9: [
        { date: '9 September 2026', time: '1:30 PM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$24.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '9 September 2026', time: '3:00 PM', provider: 'Dr. Fiona Lee', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ],
      16: [
        { date: '16 September 2026', time: '11:30 AM', provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$24.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '16 September 2026', time: '1:30 PM', provider: 'Dr. Fiona Lee', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ]
    }
  },
  ttsh: {
    'July 2026': {
      21: [
        { date: '21 July 2026', time: '10:30 AM', provider: 'Dr. Benjamin Chew', role: 'Consultant Geneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '21 July 2026', time: '1:30 PM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$32.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '21 July 2026', time: '3:00 PM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$32.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
      ],
      23: [
        { date: '23 July 2026', time: '10:00 AM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$32.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '23 July 2026', time: '11:30 AM', provider: 'Dr. Benjamin Chew', role: 'Consultant Geneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '23 July 2026', time: '4:00 PM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$32.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
      ],
      24: [
        { date: '24 July 2026', time: '9:00 AM', provider: 'Dr. Benjamin Chew', role: 'Consultant Geneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '24 July 2026', time: '11:00 AM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$32.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '24 July 2026', time: '2:30 PM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$32.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
      ]
    },
    'August 2026': {
      14: [
        { date: '14 August 2026', time: '10:30 AM', provider: 'Dr. Benjamin Chew', role: 'Consultant Geneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '14 August 2026', time: '1:30 PM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$32.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
      ],
      20: [
        { date: '20 August 2026', time: '10:00 AM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$32.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '20 August 2026', time: '4:00 PM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$32.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
      ]
    },
    'September 2026': {
      10: [
        { date: '10 September 2026', time: '10:30 AM', provider: 'Dr. Benjamin Chew', role: 'Consultant Geneticist', duration: '45 mins', cost: 'S$28.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '10 September 2026', time: '1:30 PM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$32.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
      ],
      17: [
        { date: '17 September 2026', time: '10:00 AM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$32.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '17 September 2026', time: '4:00 PM', provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$32.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
      ]
    }
  },
  kkh: {
    'July 2026': {
      22: [
        { date: '22 July 2026', time: '11:00 AM', provider: 'Dr. Claire Wong', role: 'Consultant Paediatric Geneticist', duration: '45 mins', cost: 'S$30.00', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '22 July 2026', time: '1:30 PM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$22.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '22 July 2026', time: '3:30 PM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$22.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
      ],
      24: [
        { date: '24 July 2026', time: '10:30 AM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$22.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '24 July 2026', time: '1:30 PM', provider: 'Dr. Claire Wong', role: 'Consultant Paediatric Geneticist', duration: '45 mins', cost: 'S$30.00', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '24 July 2026', time: '3:30 PM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$22.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
      ],
      27: [
        { date: '27 July 2026', time: '10:00 AM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$22.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '27 July 2026', time: '1:00 PM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$22.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '27 July 2026', time: '3:00 PM', provider: 'Dr. Claire Wong', role: 'Consultant Paediatric Geneticist', duration: '45 mins', cost: 'S$30.00', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
      ]
    },
    'August 2026': {
      12: [
        { date: '12 August 2026', time: '11:00 AM', provider: 'Dr. Claire Wong', role: 'Consultant Paediatric Geneticist', duration: '45 mins', cost: 'S$30.00', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '12 August 2026', time: '1:30 PM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$22.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
      ],
      18: [
        { date: '18 August 2026', time: '10:30 AM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$22.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '18 August 2026', time: '3:30 PM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$22.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
      ]
    },
    'September 2026': {
      8: [
        { date: '8 September 2026', time: '11:00 AM', provider: 'Dr. Claire Wong', role: 'Consultant Paediatric Geneticist', duration: '45 mins', cost: 'S$30.00', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '8 September 2026', time: '1:30 PM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$22.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
      ],
      15: [
        { date: '15 September 2026', time: '10:30 AM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$22.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '15 September 2026', time: '3:30 PM', provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$22.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
      ]
    }
  }
};

// Dynamically generate extra monthly offerings throughout 2026 and 2027 to satisfy the user request beautifully
const extraOfferingsMonths = [
  'October 2026', 'November 2026', 'December 2026',
  'January 2027', 'February 2027', 'March 2027', 'April 2027', 'May 2027',
  'June 2027', 'July 2027', 'August 2027', 'September 2027', 'October 2027', 'November 2027', 'December 2027'
];

const referenceClinicDetails: Record<string, { provider: string; role: string; cost: string; clinic: string; address: string }[]> = {
  nuh: [
    { provider: 'Dr. Helen Lim', role: 'Senior Genetic Counsellor', cost: 'S$18.50', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
    { provider: 'Dr. Albert Chiang', role: 'Consultant Cardiogeneticist', cost: 'S$28.00', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
  ],
  sgh: [
    { provider: 'Dr. Marcus Goh', role: 'Principal Genetics Specialist', cost: 'S$24.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
    { provider: 'Dr. Fiona Lee', role: 'Senior Genetic Counsellor', cost: 'S$18.50', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
  ],
  ttsh: [
    { provider: 'Dr. Benjamin Chew', role: 'Consultant Geneticist', cost: 'S$28.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
    { provider: 'Dr. Sarah Tan', role: 'Senior Clinical Geneticist', cost: 'S$32.00', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
  ],
  kkh: [
    { provider: 'Dr. Claire Wong', role: 'Consultant Paediatric Geneticist', cost: 'S$30.00', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
    { provider: 'Dr. Jeanette Tan', role: 'Lead Paediatric Counsellor', cost: 'S$22.50', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
  ]
};

for (const clinicId of Object.keys(referenceClinicDetails)) {
  const clinicSlots = CLINIC_SLOTS_DB[clinicId];
  if (clinicSlots) {
    extraOfferingsMonths.forEach((monthYear, monthIdx) => {
      const clinicIdx = Object.keys(referenceClinicDetails).indexOf(clinicId);
      // Generate 4 distinct days distributed across weeks 1, 2, 3, and 4
      const seed = (monthIdx * 7 + clinicIdx * 13) % 5;
      
      const day1 = 4 + seed;               // Week 1: 4 to 8
      const day2 = 11 + ((seed + 2) % 5); // Week 2: 11 to 15
      const day3 = 18 + ((seed + 4) % 5); // Week 3: 18 to 22
      const day4 = 25 + ((seed + 1) % 5); // Week 4: 25 to 29

      clinicSlots[monthYear] = {
        [day1]: [
          {
            date: `${day1} ${monthYear}`,
            time: '10:00 AM',
            provider: referenceClinicDetails[clinicId][0].provider,
            role: referenceClinicDetails[clinicId][0].role,
            duration: '45 mins',
            cost: referenceClinicDetails[clinicId][0].cost,
            clinic: referenceClinicDetails[clinicId][0].clinic,
            address: referenceClinicDetails[clinicId][0].address
          },
          {
            date: `${day1} ${monthYear}`,
            time: '1:30 PM',
            provider: referenceClinicDetails[clinicId][1].provider,
            role: referenceClinicDetails[clinicId][1].role,
            duration: '45 mins',
            cost: referenceClinicDetails[clinicId][1].cost,
            clinic: referenceClinicDetails[clinicId][1].clinic,
            address: referenceClinicDetails[clinicId][1].address
          }
        ],
        [day2]: [
          {
            date: `${day2} ${monthYear}`,
            time: '11:00 AM',
            provider: referenceClinicDetails[clinicId][1].provider,
            role: referenceClinicDetails[clinicId][1].role,
            duration: '45 mins',
            cost: referenceClinicDetails[clinicId][1].cost,
            clinic: referenceClinicDetails[clinicId][1].clinic,
            address: referenceClinicDetails[clinicId][1].address
          },
          {
            date: `${day2} ${monthYear}`,
            time: '3:00 PM',
            provider: referenceClinicDetails[clinicId][0].provider,
            role: referenceClinicDetails[clinicId][0].role,
            duration: '45 mins',
            cost: referenceClinicDetails[clinicId][0].cost,
            clinic: referenceClinicDetails[clinicId][0].clinic,
            address: referenceClinicDetails[clinicId][0].address
          }
        ],
        [day3]: [
          {
            date: `${day3} ${monthYear}`,
            time: '9:30 AM',
            provider: referenceClinicDetails[clinicId][0].provider,
            role: referenceClinicDetails[clinicId][0].role,
            duration: '45 mins',
            cost: referenceClinicDetails[clinicId][0].cost,
            clinic: referenceClinicDetails[clinicId][0].clinic,
            address: referenceClinicDetails[clinicId][0].address
          },
          {
            date: `${day3} ${monthYear}`,
            time: '2:30 PM',
            provider: referenceClinicDetails[clinicId][1].provider,
            role: referenceClinicDetails[clinicId][1].role,
            duration: '45 mins',
            cost: referenceClinicDetails[clinicId][1].cost,
            clinic: referenceClinicDetails[clinicId][1].clinic,
            address: referenceClinicDetails[clinicId][1].address
          }
        ],
        [day4]: [
          {
            date: `${day4} ${monthYear}`,
            time: '10:30 AM',
            provider: referenceClinicDetails[clinicId][1].provider,
            role: referenceClinicDetails[clinicId][1].role,
            duration: '45 mins',
            cost: referenceClinicDetails[clinicId][1].cost,
            clinic: referenceClinicDetails[clinicId][1].clinic,
            address: referenceClinicDetails[clinicId][1].address
          },
          {
            date: `${day4} ${monthYear}`,
            time: '4:00 PM',
            provider: referenceClinicDetails[clinicId][0].provider,
            role: referenceClinicDetails[clinicId][0].role,
            duration: '45 mins',
            cost: referenceClinicDetails[clinicId][0].cost,
            clinic: referenceClinicDetails[clinicId][0].clinic,
            address: referenceClinicDetails[clinicId][0].address
          }
        ]
      };
    });
  }
}

export const availableMonths = [
  'July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026',
  'January 2027', 'February 2027', 'March 2027', 'April 2027', 'May 2027', 'June 2027',
  'July 2027', 'August 2027', 'September 2027', 'October 2027', 'November 2027', 'December 2027'
];

export const getAppointmentSlotDetails = (clinicName: string, date: string, timeSlot: string) => {
  const isGeneral = GENERAL_CLINICS.some(c => c.name === clinicName);
  const slotsDb = getClinicSlotsDb(!isGeneral);
  const clinicKey = Object.keys(slotsDb).find(key => {
    const months = slotsDb[key];
    if (!months) return false;
    const monthKeys = Object.keys(months);
    if (monthKeys.length === 0) return false;
    const firstMonth = monthKeys[0];
    const days = months[firstMonth];
    if (!days) return false;
    const dayKeys = Object.keys(days);
    if (dayKeys.length === 0) return false;
    const firstDay = dayKeys[0];
    const slots = days[Number(firstDay)];
    if (!slots || slots.length === 0) return false;
    const firstSlot = slots[0];
    return firstSlot && (firstSlot.clinic === clinicName || clinicName.toLowerCase().includes(key.toLowerCase()));
  });
  if (clinicKey) {
    const months = slotsDb[clinicKey];
    if (months) {
      for (const mKey of Object.keys(months)) {
        const days = months[mKey];
        if (days) {
          for (const day of Object.keys(days)) {
            const slots = days[Number(day)];
            if (slots) {
              for (const slot of slots) {
                if (slot.date === date && slot.time === timeSlot) {
                  return slot;
                }
              }
            }
          }
        }
      }
    }
  }
  return {
    provider: getClinicSpecialist(clinicName).split(' (')[0],
    role: getClinicSpecialist(clinicName).includes('(') ? getClinicSpecialist(clinicName).split('(')[1].replace(')', '') : 'Specialist',
    cost: isGeneral ? 'S$4.00' : 'S$18.50',
    duration: isGeneral ? '15 mins' : '45 mins',
    clinic: clinicName,
    address: getClinicAddress(clinicName)
  };
};

const getFormattedDatePart = (dateStr: string) => {
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length === 3) {
    const dayVal = parseInt(parts[0], 10);
    const day = dayVal < 10 ? `0${dayVal}` : `${dayVal}`;
    const monthStr = parts[1].toLowerCase();
    let month = "07";
    if (monthStr.includes("aug")) month = "08";
    else if (monthStr.includes("sep")) month = "09";
    const year = parts[2];
    return `${year}${month}${day}`;
  }
  return "20260722";
};

const getMonthConfig = (monthStr: string) => {
  const parts = monthStr.split(' ');
  const monthName = parts[0];
  const year = parts[1] ? parseInt(parts[1], 10) : 2026;
  
  const monthIndex = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ].indexOf(monthName);
  
  if (monthIndex === -1) {
    return { emptyCells: 3, totalDays: 31 };
  }
  
  const firstDay = new Date(year, monthIndex, 1);
  const emptyCells = firstDay.getDay(); // Sunday-start offset
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();
  
  return { emptyCells, totalDays };
};

const isDateBeforeToday = (monthStr: string, dayNum: number) => {
  const parts = monthStr.split(' ');
  const monthName = parts[0];
  const year = parts[1] ? parseInt(parts[1], 10) : 2026;
  
  const monthIndex = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ].indexOf(monthName);
  
  if (monthIndex === -1) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(year, monthIndex, dayNum);
  targetDate.setHours(0, 0, 0, 0);
  
  return targetDate.getTime() < today.getTime();
};

const isToday = (monthStr: string, dayNum: number) => {
  const parts = monthStr.split(' ');
  const monthName = parts[0];
  const year = parts[1] ? parseInt(parts[1], 10) : 2026;
  
  const monthIndex = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ].indexOf(monthName);
  
  if (monthIndex === -1) return false;
  
  const today = new Date();
  return today.getDate() === dayNum && today.getMonth() === monthIndex && today.getFullYear() === year;
};

const getTodayMonthStr = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const d = new Date();
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
};

const getFirstAvailableDay = (month: string, clinicId: string, customSlotsDb?: any) => {
  const db = customSlotsDb || CLINIC_SLOTS_DB;
  const slots = db[clinicId]?.[month] || {};
  const daysWithSlots = Object.keys(slots).map(Number).sort((a, b) => a - b);
  const validDay = daysWithSlots.find(day => !isDateBeforeToday(month, day));
  return validDay || daysWithSlots[0] || 21;
};

export const downloadICSFile = (slot: { date: string; time: string; clinic: string; address: string }) => {
  const datePart = getFormattedDatePart(slot.date);

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
  const datePart = getFormattedDatePart(slot.date);

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

const deserializeChannels = (channelStr: string): string[] => {
  if (!channelStr) return ['sms', 'push'];
  if (channelStr === 'both') return ['sms', 'push'];
  return channelStr.split(',').map(c => {
    if (c === 'wa') return 'whatsapp';
    return c;
  });
};

const serializeChannels = (channels: string[]): string => {
  return channels.map(c => c === 'whatsapp' ? 'wa' : c).join(',');
};

const channelInfo: Record<string, Record<string, { title: string; desc: string }>> = {
  sms: {
    en: { title: 'SMS Messages', desc: 'Standard cellular alerts to your registered mobile (+65 9123 4567)' },
    ms: { title: 'Mesej SMS', desc: 'Amaran selular standard ke telefon bimbit berdaftar anda (+65 9123 4567)' },
    zh: { title: '短信通知', desc: '发送至您注册手机号的普通短信提醒 (+65 9123 4567)' },
    ta: { title: 'எஸ்.எம்.எஸ் செய்திகள்', desc: 'பதிவுசெய்யப்பட்ட மொபைலுக்கு நிலையான செல்லுலார் விழிப்பூட்டல்கள் (+65 9123 4567)' },
  },
  push: {
    en: { title: 'App Push Notifications', desc: 'Lock screen banner alerts directly via the HealthHub app' },
    ms: { title: 'Pemberitahuan Push Aplikasi', desc: 'Amaran banner skrin kunci terus melalui aplikasi HealthHub' },
    zh: { title: '应用推送通知', desc: '直接通过 HealthHub 应用发送锁屏横幅提醒' },
    ta: { title: 'செயலி புஷ் அறிவிப்புகள்', desc: 'ஹெல்த்ஹப் செயலி வழியாக பூட்டுத் திரை பேனர் விழிப்பூட்டல்கள்' },
  },
  email: {
    en: { title: 'Email Alerts', desc: 'Detailed appointment reminders sent to your registered email address' },
    ms: { title: 'Amaran Emel', desc: 'Peringatan janji temu terperinci dihantar ke alamat emel berdaftar anda' },
    zh: { title: '电子邮件通知', desc: '发送至您注册邮箱的详细预约提醒' },
    ta: { title: 'மின்னஞ்சல் விழிப்பூட்டல்கள்', desc: 'பதிவுசெய்யப்பட்ட மின்னஞ்சல் முகவரிக்கு அனுப்பப்படும் சந்திப்பு நினைவூட்டல்கள்' },
  },
  whatsapp: {
    en: { title: 'WhatsApp Messages', desc: 'Instant messaging notifications from official MOH-HealthHub account' },
    ms: { title: 'Mesej WhatsApp', desc: 'Peringatan mesej segera daripada akaun rasmi MOH-HealthHub' },
    zh: { title: 'WhatsApp 消息通知', desc: '来自官方卫生部 HealthHub 账号的即时消息提醒' },
    ta: { title: 'வாட்ஸ்அப் செய்திகள்', desc: 'அதிகாரப்பூர்வ MOH-HealthHub கணக்கிலிருந்து உடனடி செய்தி அறிவிப்புகள்' },
  }
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
  onCancelAppointment,
  isFHReferred,
  patientRecord,
  percentComplete,
  onUpdateEducationProgress,
}: PhoneSimulatorProps) {

  // Local state for interactive elements
  const [language, setLanguage] = useState<Language>(() => {
    // 1. Check URL path for locale prefix
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const urlLocale = pathParts[0];
    const urlToLang: Record<string, Language> = { en: 'en', ms: 'ms', 'zh-CN': 'zh', ta: 'ta' };
    if (urlToLang[urlLocale]) return urlToLang[urlLocale];
    // 2. Check localStorage
    const stored = localStorage.getItem('fh-app-language') as Language | null;
    if (stored && (['en', 'ms', 'zh', 'ta'] as Language[]).includes(stored)) return stored;
    // 3. Browser language detection
    const bl = (navigator.language || '').toLowerCase();
    if (bl.startsWith('ms') || bl.startsWith('id')) return 'ms';
    if (bl.startsWith('zh')) return 'zh';
    if (bl.startsWith('ta')) return 'ta';
    return 'en';
  });

  const t = (key: string): string => {
    return UI_TRANSLATIONS[language]?.[key] || UI_TRANSLATIONS['en']?.[key] || key;
  };

  const activeClinicSlotsDb = getClinicSlotsDb(isFHReferred);
  const activeClinics = isFHReferred ? CLINICS : GENERAL_CLINICS;

  const currentPatientId = patientRecord?.patient_id || 'LH321';
  // PERSONA_DETAILS is now only a fallback (e.g. while the database
  // hasn't finished loading, or a field hasn't been populated for a
  // given patient). Whenever the real patientRecord has a value, that
  // takes priority — this is what makes the Profile screen reflect
  // the actual database instead of one shared hardcoded set of values.
  const patientDetails = PERSONA_DETAILS[currentPatientId] || PERSONA_DETAILS['LH321'];
  const patientName = patientRecord?.name || 'Lisa Ho';
  const patientFullName = patientRecord?.name || patientDetails.fullName;
  const patientNric = patientRecord?.nric_fin || patientDetails.nric;
  const patientFirstName = patientName.split(' ')[0].toUpperCase();
  const patientFirstNameCapitalized = patientName.split(' ')[0];
  const getTamilName = (engName: string): string => {
    switch (engName) {
      case 'Sarah': return 'சாரா';
      case 'Daniel': return 'டேனியல்';
      case 'Emily': return 'எமிலி';
      case 'Michael': return 'மைக்கேல்';
      case 'Priya': return 'பிரியா';
      case 'Lisa': return 'லிசா';
      default: return engName;
    }
  };
  const patientAge = patientRecord?.age ?? patientDetails.age;
  const patientGender = patientRecord?.gender || patientDetails.gender;
  const patientEmail = patientRecord?.email || patientDetails.email;
  const patientAddress = patientRecord?.residential_address || patientDetails.address;

  const formatDob = (iso?: string | null): string => {
    if (!iso) return getLocalizedDate(patientDetails.dob, language);
    const d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return getLocalizedDate(patientDetails.dob, language);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const localeMap: Record<Language, string> = { en: 'en-GB', ms: 'ms-MY', zh: 'zh-SG', ta: 'ta-SG' };
    return d.toLocaleDateString(localeMap[language], options);
  };
  const patientDob = formatDob(patientRecord?.date_of_birth);

  const patientEmergencyName = patientRecord?.emergency_contact_name || t('not_on_file');
  const patientEmergencyRelationship = patientRecord?.emergency_contact_relationship || t('not_on_file');
  const patientEmergencyPhone = patientRecord?.emergency_contact_phone || t('not_on_file');
  const patientPrimaryClinic = patientRecord?.primary_clinic || t('not_yet_assigned');
  const patientLdlCholesterol = patientRecord?.ldl_cholesterol_mmol;

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };
  const patientInitials = getInitials(patientName);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('fh-app-language', lang);
    setLangMenuOpen(false);
    const langToUrl: Record<Language, string> = { en: 'en', ms: 'ms', zh: 'zh-CN', ta: 'ta' };
    const htmlLang: Record<Language, string> = { en: 'en', ms: 'ms', zh: 'zh-Hans', ta: 'ta' };
    window.history.replaceState({}, '', `/${langToUrl[lang]}/`);
    const htmlEl = document.getElementById('html-root');
    if (htmlEl) htmlEl.setAttribute('lang', htmlLang[lang]);
    document.title = {
      en: 'HealthHub FH Assistant – GovTech Singapore',
      ms: 'Pembantu FH HealthHub – GovTech Singapura',
      zh: 'HealthHub FH 助理 – 新加坡 GovTech',
      ta: 'HealthHub FH உதவியாளர் – GovTech சிங்கப்பூர்',
    }[lang] || 'HealthHub FH Assistant – GovTech Singapore';
  };

  const countToPercent = (count: number): number => {
    if (count === 3) return 100;
    if (count === 2) return 80;
    if (count === 1) return 30;
    return 0;
  };

  const percentToCount = (percent: number): number => {
    if (percent === 100) return 3;
    if (percent >= 80) return 2;
    if (percent >= 30) return 1;
    return 0;
  };

  // Onboarding Personalisation Feature states
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('fh-onboarding-completed');
      return stored === 'true';
    } catch {
      return false;
    }
  });
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [onboardingFamiliarity, setOnboardingFamiliarity] = useState<'new' | 'little' | 'research' | 'advanced' | null>(() => {
    try {
      return (localStorage.getItem('fh-onboarding-familiarity') as any) || null;
    } catch {
      return null;
    }
  });
  const [onboardingTopics, setOnboardingTopics] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('fh-onboarding-topics');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [onboardingConcerns, setOnboardingConcerns] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('fh-onboarding-concerns');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [questionnaireStatus, setQuestionnaireStatus] = useState<'completed' | 'skipped' | null>(() => {
    try {
      return (localStorage.getItem('fh-questionnaire-status') as any) || null;
    } catch {
      return null;
    }
  });

  // Keep checklist synced with language, onboarding status, and database percentComplete
  useEffect(() => {
    const rawItems = getLocalizedChecklist(
      language,
      onboardingCompleted ? onboardingFamiliarity : null,
      onboardingTopics,
      onboardingConcerns
    );

    setChecklist((currentList) => {
      const isFirstInit = !currentList || currentList.length === 0;
      
      if (isFirstInit && percentComplete !== undefined) {
        const itemsToCheckCount = Math.round((percentComplete / 100) * rawItems.length);
        return rawItems.map((item, idx) => ({
          ...item,
          checked: idx < itemsToCheckCount,
        }));
      }

      return rawItems.map((item) => {
        const existing = currentList.find((c) => c.id === item.id);
        return {
          ...item,
          checked: existing ? existing.checked : false,
        };
      });
    });
  }, [language, onboardingCompleted, onboardingFamiliarity, onboardingTopics, onboardingConcerns, percentComplete]);

  const [eduExpanded, setEduExpanded] = useState<Record<string, boolean>>({});
  const [forceFullExpand, setForceFullExpand] = useState<Record<string, boolean>>({});
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('all');
  const [faqExpanded, setFaqExpanded] = useState<Record<number, boolean>>({});
  const [checklist, setChecklist] = useState<any[]>([]);
  const [viewingChecklist, setViewingChecklist] = useState<boolean>(false);
  const [eduSubTab, setEduSubTab] = useState<'guides' | 'checklist' | 'faq'>('guides');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoFrame, setVideoFrame] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [faqActiveIdx, setFaqActiveIdx] = useState<number | null>(null);
  const [textSize, setTextSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [questionnaireTextSize, setQuestionnaireTextSize] = useState<'sm' | 'md' | 'lg'>('md');

  const [showOtherTopics, setShowOtherTopics] = useState<boolean>(false);
  const [expandedOtherTopicId, setExpandedOtherTopicId] = useState<string | null>(null);
  const [showCascadeTooltip, setShowCascadeTooltip] = useState<boolean>(false);

  const handleCompleteOnboarding = (completed: boolean = true, status?: 'completed' | 'skipped') => {
    setOnboardingCompleted(completed);
    setShowOtherTopics(false);
    setExpandedOtherTopicId(null);
    const resolvedStatus = status || (completed ? 'completed' : 'skipped');
    setQuestionnaireStatus(resolvedStatus);
    try {
      localStorage.setItem('fh-onboarding-completed', completed ? 'true' : 'false');
      localStorage.setItem('fh-questionnaire-status', resolvedStatus);
      localStorage.setItem('fh-onboarding-familiarity', onboardingFamiliarity || '');
      localStorage.setItem('fh-onboarding-topics', JSON.stringify(onboardingTopics));
      localStorage.setItem('fh-onboarding-concerns', JSON.stringify(onboardingConcerns));
    } catch (e) {
      console.error(e);
    }
  };

  const handleRetakeOnboarding = () => {
    setOnboardingStep(1);
    setOnboardingCompleted(false);
    setShowOtherTopics(false);
    setExpandedOtherTopicId(null);
    setQuestionnaireStatus(null);
    try {
      localStorage.removeItem('fh-questionnaire-status');
    } catch (e) {
      console.error(e);
    }
  };

  const scaleText = (defaultClass: string) => {
    if (textSize === 'md') return defaultClass;
    let res = defaultClass;
    if (textSize === 'sm') {
      res = res.replace('text-[9px]', 'text-[8px]');
      res = res.replace('text-[9.5px]', 'text-[8.5px]');
      res = res.replace('text-[10px]', 'text-[9px]');
      res = res.replace('text-[10.5px]', 'text-[9.5px]');
      res = res.replace('text-[11px]', 'text-[10px]');
      res = res.replace('text-xs', 'text-[11px]');
      res = res.replace('text-sm', 'text-xs');
    } else if (textSize === 'lg') {
      res = res.replace('text-[9px]', 'text-[11px]');
      res = res.replace('text-[9.5px]', 'text-[11.5px]');
      res = res.replace('text-[10px]', 'text-[12px]');
      res = res.replace('text-[10.5px]', 'text-[12.5px]');
      res = res.replace('text-[11px]', 'text-[13px]');
      res = res.replace('text-xs', 'text-[13.5px]');
      res = res.replace('text-sm', 'text-base');
    }
    return res;
  };

  const getButtonTextSizeClass = (lang: string) => {
    if (lang === 'ta') return 'text-[9.5px] px-1.5 py-2 leading-tight break-words';
    if (lang === 'ms') return 'text-[10.5px] px-1.5 py-2.5 leading-tight break-words';
    return 'text-xs py-2.5 px-3';
  };

  const renderRichContent = (content: string) => {
    if (!content) return null;
    const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
    return (
      <div className="space-y-1.5 text-[10.5px] text-slate-600 font-sans leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
            const cleanText = line.replace(/^[•\-\*]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1 my-0.5">
                <span className="text-[#00a859] font-bold shrink-0 mt-0.5">•</span>
                <span className="text-slate-700 text-[10px] leading-relaxed">{cleanText}</span>
              </div>
            );
          }
          return (
            <p key={idx} className="text-slate-600 text-[10.5px] leading-relaxed">
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    basics: true,
    journey: false,
    costs: false,
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  // Deep-read document viewer states
  const [selectedResource, setSelectedResource] = useState<HelpfulResource | null>(null);
  const [resourcePage, setResourcePage] = useState<number>(0);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // 1. Personalized Onboarding - Helper to determine if a section is recommended
  const isSectionRecommended = (secId: string) => {
    if (!onboardingCompleted) return false;
    if (secId === 'what-is-fh' && (onboardingFamiliarity === 'new' || onboardingTopics.includes('topic-basics') || onboardingConcerns.includes('concern-diagnosis') || onboardingConcerns.includes('concern-curious'))) return true;
    if (secId === 'why-testing-matters' && (onboardingTopics.includes('topic-family') || onboardingConcerns.includes('concern-family'))) return true;
    if (secId === 'testing-guide' && (onboardingTopics.includes('topic-testing') || onboardingTopics.includes('topic-next') || onboardingConcerns.includes('concern-test'))) return true;
    if (secId === 'costs-subsidies' && (onboardingTopics.includes('topic-costs') || onboardingConcerns.includes('concern-cost'))) return true;
    if (secId === 'insurance-rights' && (onboardingTopics.includes('topic-insurance') || onboardingConcerns.includes('concern-insurance'))) return true;
    if (secId === 'medication-fh' && (onboardingTopics.includes('topic-treatment') || onboardingConcerns.includes('concern-meds'))) return true;
    return false;
  };

  // 2. Learning Groups in their default order
  const sortedGroups = [
    {
      id: 'basics',
      title: t('edu_group_basics_title'),
      description: t('edu_group_basics_desc'),
      icon: 'BookOpen',
      sectionIds: ['what-is-fh', 'medication-fh'],
    },
    {
      id: 'journey',
      title: t('edu_group_journey_title'),
      description: t('edu_group_journey_desc'),
      icon: 'ClipboardList',
      sectionIds: ['testing-guide', 'why-testing-matters'],
    },
    {
      id: 'costs',
      title: t('edu_group_costs_title'),
      description: t('edu_group_costs_desc'),
      icon: 'Shield',
      sectionIds: ['costs-subsidies', 'insurance-rights'],
    },
  ];

  // List of all 9 guide topics
  const allGuideTopics = useMemo(() => {
    const orderedIds = [
      'what-is-fh',
      'heart-health',
      'genetic-testing',
      'cascade-screening',
      'treatment-medication',
      'healthy-lifestyle',
      'testing-process',
      'costs-subsidies',
      'insurance'
    ];

    const level = onboardingFamiliarity || 'new';
    return orderedIds.map(id => {
      return getPersonalisedGuideContent(id, level, onboardingConcerns || [], language);
    });
  }, [language, onboardingFamiliarity, onboardingConcerns]);

  const selectedTopicsList = useMemo(() => {
    const raw = onboardingTopics || [];
    const hasNotSure = raw.includes('topic-notsure');
    const mapped = raw
      .filter(t => t !== 'topic-resources' && t !== 'helpful-resources' && t !== 'topic-faqs' && t !== 'topic-stories')
      .map(t => {
        if (t === 'topic-basics') return 'what-is-fh';
        if (t === 'topic-family' || t === 'cascade-screening') return 'cascade-screening';
        if (t === 'topic-testing' || t === 'genetic-testing') return 'genetic-testing';
        if (t === 'topic-risk' || t === 'heart-health') return 'heart-health';
        if (t === 'topic-treatment' || t === 'treatment-medication') return 'treatment-medication';
        if (t === 'topic-lifestyle' || t === 'healthy-lifestyle') return 'healthy-lifestyle';
        if (t === 'topic-costs' || t === 'costs-subsidies') return 'costs-subsidies';
        if (t === 'topic-insurance' || t === 'insurance-rights') return 'insurance';
        if (t === 'topic-next' || t === 'testing-process') return 'testing-process';
        return t;
      })
      .filter(t => t !== 'patient-experiences' && t !== 'topic-stories');

    if (hasNotSure) {
      const beginnerTopics = ['what-is-fh', 'heart-health', 'testing-process'];
      const combined = Array.from(new Set([...mapped, ...beginnerTopics]));
      return combined;
    }

    return mapped;
  }, [onboardingTopics]);

  const selectedGuideTopics = useMemo(() => {
    if (!onboardingCompleted) return [];
    return allGuideTopics.filter(topic => selectedTopicsList.includes(topic.id));
  }, [allGuideTopics, selectedTopicsList, onboardingCompleted]);

  const unselectedGuideTopics = useMemo(() => {
    if (!onboardingCompleted) return allGuideTopics;
    return allGuideTopics.filter(topic => !selectedTopicsList.includes(topic.id));
  }, [allGuideTopics, selectedTopicsList, onboardingCompleted]);

  // Auto-expand recommended groups and sections when onboarding completes
  useEffect(() => {
    if (onboardingCompleted) {
      // Expand all main groups so sections inside are visible immediately
      setExpandedGroups({
        basics: true,
        journey: true,
        costs: true,
      });

      // Expand core sections and recommended/selected sections by default
      const initialEduExpanded: Record<string, boolean> = {};
      const sections = ['what-is-fh', 'why-testing-matters', 'testing-guide', 'costs-subsidies', 'insurance-rights', 'medication-fh'];
      sections.forEach(secId => {
        const isCore = secId === 'what-is-fh' || secId === 'why-testing-matters';
        const isRec = isSectionRecommended(secId);
        initialEduExpanded[secId] = isCore || isRec;
      });
      setEduExpanded(initialEduExpanded);
    }
  }, [onboardingCompleted, onboardingFamiliarity, onboardingTopics.length, onboardingConcerns.length]);

  // 3. Personalized Onboarding - Sort FAQs based on Concerns
  const sortedFaqs = [...getLocalizedFaqs(language)].sort((a, b) => {
    if (!onboardingCompleted) return 0;
    
    // Determine if a category is prioritized
    const isAPrioritized = 
      (a.category === 'cost' && onboardingConcerns.includes('concern-cost')) ||
      (a.category === 'insurance' && onboardingConcerns.includes('concern-insurance')) ||
      (a.category === 'testing' && onboardingConcerns.includes('concern-test')) ||
      (a.category === 'medication' && onboardingConcerns.includes('concern-meds')) ||
      (a.category === 'family' && onboardingConcerns.includes('concern-family'));
      
    const isBPrioritized = 
      (b.category === 'cost' && onboardingConcerns.includes('concern-cost')) ||
      (b.category === 'insurance' && onboardingConcerns.includes('concern-insurance')) ||
      (b.category === 'testing' && onboardingConcerns.includes('concern-test')) ||
      (b.category === 'medication' && onboardingConcerns.includes('concern-meds')) ||
      (b.category === 'family' && onboardingConcerns.includes('concern-family'));

    if (isAPrioritized && !isBPrioritized) return -1;
    if (!isAPrioritized && isBPrioritized) return 1;
    return 0;
  });

  // 4. Personalized Onboarding - Sort Helpful Resources based on Concerns
  const sortedHelpfulResources = [...getLocalizedHelpfulResources(helpfulResources, language)].sort((a, b) => {
    if (!onboardingCompleted) return 0;
    
    // Compute score for resource a
    let scoreA = 0;
    if (onboardingConcerns.includes('concern-insurance') && (a.id === 'res-9')) scoreA += 5; // Moratorium clinical guide
    if (onboardingConcerns.includes('concern-family') && (a.id === 'res-7')) scoreA += 5; // Patient Story: A mother's fight
    if (onboardingConcerns.includes('concern-cost') && (a.id === 'res-1' || a.id === 'res-4' || a.id === 'res-8')) scoreA += 5; // Brochures/Subsidies
    if (onboardingConcerns.includes('concern-test') && (a.id === 'res-2')) scoreA += 5; // Clinical Guide

    // Compute score for resource b
    let scoreB = 0;
    if (onboardingConcerns.includes('concern-insurance') && (b.id === 'res-9')) scoreB += 5;
    if (onboardingConcerns.includes('concern-family') && (b.id === 'res-7')) scoreB += 5;
    if (onboardingConcerns.includes('concern-cost') && (b.id === 'res-1' || b.id === 'res-4' || b.id === 'res-8')) scoreB += 5;
    if (onboardingConcerns.includes('concern-test') && (b.id === 'res-2')) scoreB += 5;

    return scoreB - scoreA;
  });

  useEffect(() => {
    if (activeScreen !== ScreenId.Education) {
      setViewingChecklist(false);
    }
  }, [activeScreen]);

  useEffect(() => {
    if (viewingChecklist) {
      setEduSubTab('checklist');
    }
  }, [viewingChecklist]);

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
  const [patientCoords, setPatientCoords] = useState<{ lat: number; lng: number }>(() => {
    return PERSONA_COORDS[currentPatientId] || { lat: 1.3625, lng: 103.8542 };
  });
  const [patientLocName, setPatientLocName] = useState<string>(() => patientAddress);
  const [locationSearchQuery, setLocationSearchQuery] = useState<string>('');
  const [isDetectingLoc, setIsDetectingLoc] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  const [showClinicDropdown, setShowClinicDropdown] = useState<boolean>(false);

  // Calendar Booking States (User request 2)
  const [selectedCalendarMonth, setSelectedCalendarMonth] = useState<string>(() => {
    const todayMonth = getTodayMonthStr();
    const available = [
      'July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026',
      'January 2027', 'February 2027', 'March 2027', 'April 2027', 'May 2027', 'June 2027',
      'July 2027', 'August 2027', 'September 2027', 'October 2027', 'November 2027', 'December 2027'
    ];
    return available.includes(todayMonth) ? todayMonth : 'July 2026';
  });
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(() => {
    const todayMonth = getTodayMonthStr();
    const initialMonth = [
      'July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026'
    ].includes(todayMonth) ? todayMonth : 'July 2026';
    return getFirstAvailableDay(initialMonth, 'nuh', activeClinicSlotsDb);
  });
  const [selectedSlotObj, setSelectedSlotObj] = useState<ClinicSlot | null>(null);
  const [showMonthPopup, setShowMonthPopup] = useState<boolean>(false);

  useEffect(() => {
    if (patientAddress) {
      setPatientLocName(patientAddress);
      const coords = PERSONA_COORDS[currentPatientId] || { lat: 1.3625, lng: 103.8542 };
      setPatientCoords(coords);
    }
  }, [currentPatientId, patientAddress]);

  const selectMonth = (month: string) => {
    setSelectedCalendarMonth(month);
    const availableDays = Object.keys(activeClinicSlotsDb[selectedClinicId]?.[month] || {})
      .map(Number)
      .filter(day => !isDateBeforeToday(month, day));
    if (availableDays.length > 0) {
      setSelectedCalendarDay(availableDays[0]);
    } else {
      setSelectedCalendarDay(1);
    }
  };

  // Custom non-blocking alert/confirm dialog states to bypass iframe restrictions
  const [bookingSubFlow, setBookingSubFlow] = useState<
    | 'reschedule-select'
    | 'reschedule-review'
    | 'reschedule-success'
    | 'cancel-initial'
    | 'cancel-confirm'
    | 'cancel-success'
    | null
  >(null);
  const [proposedSlotObj, setProposedSlotObj] = useState<ClinicSlot | null>(null);

  // Reschedule-specific clinic selection state
  const [rescheduleClinicId, setRescheduleClinicId] = useState<string>('nuh');
  const [showRescheduleClinicDropdown, setShowRescheduleClinicDropdown] = useState<boolean>(false);
  const [rescheduleCalendarMonth, setRescheduleCalendarMonth] = useState<string>(() => {
    const todayMonth = getTodayMonthStr();
    const available = [
      'July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026',
      'January 2027', 'February 2027', 'March 2027', 'April 2027', 'May 2027', 'June 2027',
      'July 2027', 'August 2027', 'September 2027', 'October 2027', 'November 2027', 'December 2027'
    ];
    return available.includes(todayMonth) ? todayMonth : 'July 2026';
  });
  const [rescheduleCalendarDay, setRescheduleCalendarDay] = useState<number>(() => {
    const todayMonth = getTodayMonthStr();
    const initialMonth = [
      'July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026'
    ].includes(todayMonth) ? todayMonth : 'July 2026';
    return getFirstAvailableDay(initialMonth, 'nuh', activeClinicSlotsDb);
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showNotificationPopup, setShowNotificationPopup] = useState<boolean>(false);

  // Knowledge Check State inside PhoneSimulator
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Reset quiz when onboarding status or persona changes
  useEffect(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  }, [onboardingCompleted, questionnaireStatus, onboardingFamiliarity, onboardingTopics, currentPatientId]);

  // Dynamic Knowledge Check Questions based on Onboarding Status & Preferences
  const quizQuestions = useMemo(() => {
    const isGeneral = !onboardingCompleted || questionnaireStatus === 'skipped';

    if (isGeneral) {
      return [
        {
          id: 'q1',
          question: language === 'ms' ? 'Apakah itu Familial Hypercholesterolaemia (FH)?' :
                    language === 'zh' ? '什么是家族性高胆固醇血症 (FH)？' :
                    language === 'ta' ? 'குடும்ப மிகை கொழுப்புத்தன்மை (FH) என்றால் என்ன?' :
                    'What is Familial Hypercholesterolaemia (FH)?',
          options: [
            language === 'ms' ? 'Keadaan genetik diwarisi yang menyebabkan kolesterol LDL tinggi sejak lahir' :
            language === 'zh' ? '一种导致自出生起低密度脂蛋白(LDL)偏高的遗传性疾病' :
            language === 'ta' ? 'பிறப்பிலிருந்தே அதிக LDL கொழுப்பை ஏற்படுத்தும் பரம்பரை நோய்' :
            'An inherited genetic condition causing high LDL cholesterol from birth',

            language === 'ms' ? 'Keadaan sementara disebabkan oleh makanan berlemak' :
            language === 'zh' ? '高脂肪饮食引起的临时状况' :
            language === 'ta' ? 'அதிக கொழுப்புள்ள உணவால் ஏற்படும் தற்காலிக நிலை' :
            'A temporary condition caused by a high-fat diet',

            language === 'ms' ? 'Kekurangan vitamin ringan yang mudah diubat' :
            language === 'zh' ? '轻微的维生素缺乏症' :
            language === 'ta' ? 'ஒரு லேசான வைட்டமின் குறைபாடு' :
            'A mild vitamin deficiency'
          ],
          correctAnswer: 0,
          explanation: language === 'ms' ? 'FH adalah keadaan genetik yang mengurangkan keupayaan hati untuk membersihkan kolesterol LDL ("jahat").' :
                       language === 'zh' ? 'FH 是一种遗传性疾病，会削弱肝脏清除“坏”胆固醇 (LDL) 的能力。' :
                       language === 'ta' ? 'FH என்பது கல்லீரலின் LDL கொழுப்பை அகற்றும் திறனைக் குறைக்கும் ஒரு மரபணு நிலை.' :
                       'FH is a genetic condition present from birth that impairs the liver\'s ability to clear bad LDL cholesterol.'
        },
        {
          id: 'q2',
          question: language === 'ms' ? 'Mengapa ujian genetik untuk FH penting?' :
                    language === 'zh' ? '为什么 FH 基因检测非常重要？' :
                    language === 'ta' ? 'FH மரபணு சோதனை ஏன் முக்கியமானது?' :
                    'Why is genetic testing for FH important?',
          options: [
            language === 'ms' ? 'Ia mengesahkan genotip anda dan membolehkan rawatan awal yang disasarkan' :
            language === 'zh' ? '它可以确诊您的基因型，从而支持早期针对性治疗' :
            language === 'ta' ? 'இது உங்கள் மரபணு வகையை உறுதிசெய்து ஆரம்பகால சிகிச்சையை அனுமதிக்கிறது' :
            'It confirms your genotype and enables early, targeted treatment',

            language === 'ms' ? 'Ia menggantikan keperluan untuk pemakanan sihat' :
            language === 'zh' ? '它可以完全替代健康饮食' :
            language === 'ta' ? 'இது ஆரோக்கியமான உணவின் தேவையை மாற்றுகிறது' :
            'It replaces the need for healthy eating',

            language === 'ms' ? 'Ia diwajibkan untuk semua kemasukan hospital' :
            language === 'zh' ? '新加坡所有住院患者都必须强制进行此检测' :
            language === 'ta' ? 'இது அனைத்து மருத்துவமனை சேர்க்கைகளுக்கும் கட்டாயமாகும்' :
            'It is mandatory for all hospital admissions'
          ],
          correctAnswer: 0,
          explanation: language === 'ms' ? 'Pengesahan genetik membantu doktor memilih rawatan yang tepat sebelum kolesterol membina plak.' :
                       language === 'zh' ? '基因确诊有助于医生在胆固醇堆积前制定精准治疗方案。' :
                       language === 'ta' ? 'மரபணு உறுதிப்படுத்தல் மருத்துவர்களுக்கு துல்லியமான சிகிச்சையைத் தேர்வுசெய்ய உதவுகிறது.' :
                       'Genetic testing confirms diagnosis and enables early intervention before plaque builds up.'
        },
        {
          id: 'q3',
          question: language === 'ms' ? 'Berapakah peluang ahli keluarga darjah pertama mewarisi gen FH?' :
                    language === 'zh' ? '直系亲属（父母、兄弟姐妹、子女）遗传 FH 基因的概率是多少？' :
                    language === 'ta' ? 'முதல் நிலை குடும்ப உறுப்பினர்களுக்கு FH மரபணுவை பரம்பரை பெற எவ்வளவு வாய்ப்பு உள்ளது?' :
                    'What chance do first-degree family members have of inheriting the FH gene?',
          options: [
            '10%',
            '25%',
            '50%'
          ],
          correctAnswer: 2,
          explanation: language === 'ms' ? 'FH diwarisi secara dominan autosomal, jadi ahli keluarga terdekat mempunyai peluang 50%.' :
                       language === 'zh' ? 'FH 属于常染色体显性遗传，直系亲属有 50% 的概率携带相同基因。' :
                       language === 'ta' ? 'FH ஆட்டோசோமால் ஆதிக்கம் செலுத்துகிறது, எனவே நெருங்கிய குடும்பத்தினருக்கு 50% வாய்ப்பு உள்ளது.' :
                       'FH is autosomal dominant, meaning first-degree relatives have a 50% chance of carrying the gene.'
        },
        {
          id: 'q4',
          question: language === 'ms' ? 'Apakah faedah utama diagnosis dan rawatan awal FH?' :
                    language === 'zh' ? '早期诊断和治疗 FH 的主要好处是什么？' :
                    language === 'ta' ? 'FH ஆரம்பகால நோயறிதல் மற்றும் சிகிச்சையின் முக்கிய நன்மை என்ன?' :
                    'What is a primary benefit of early diagnosis and treatment for FH?',
          options: [
            language === 'ms' ? 'Ia mengurangkan risiko penyakit jantung jangka panjang kembali ke paras normal' :
            language === 'zh' ? '它可以将长期心血管疾病风险大幅降低至普通人群水平' :
            language === 'ta' ? 'இது நீண்ட கால இதய நோய் அபாயத்தை சாதாரண நிலைக்குக் குறைக்கிறது' :
            'It reduces long-term heart disease risk back down to normal levels',

            language === 'ms' ? 'Ia menghapuskan keperluan untuk pemeriksaan kesihatan berterusan' :
            language === 'zh' ? '它无需后续进行任何健康复查' :
            language === 'ta' ? 'இது எதிர்கால மருத்துவ பரிசோதனைகளின் தேவையை நீக்குகிறது' :
            'It eliminates the need for future health checkups',

            language === 'ms' ? 'Ia menyembuhkan kolesterol sepenuhnya dalam 1 minggu' :
            language === 'zh' ? '它可在 1 周内永久治愈高胆固醇' :
            language === 'ta' ? 'இது 1 வாரத்தில் கொழுப்பை நிரந்தரமாக குணப்படுத்துகிறது' :
            'It cures cholesterol permanently in 1 week'
          ],
          correctAnswer: 0,
          explanation: language === 'ms' ? 'Rawatan awal seperti statin mengurangkan risiko serangan jantung sehingga 80%.' :
                       language === 'zh' ? '早期应用他汀类药物治疗可将心血管疾病风险降低高达 80%。' :
                       language === 'ta' ? 'ஆரம்பகால சிகிச்சை இதய நோய் அபாயத்தை 80% வரை குறைக்கிறது.' :
                       'Early diagnosis and treatment reduce long-term cardiovascular risk by up to 80%.'
        }
      ];
    }

    const isAdvanced = onboardingFamiliarity === 'research' || onboardingFamiliarity === 'advanced';
    const questions: any[] = [];

    // Question 1: FH Core / Diagnosis (adjusted by familiarity)
    questions.push({
      id: 'pq1',
      question: isAdvanced
        ? (language === 'ms' ? 'Apakah mekanisme utama yang menyebabkan kolesterol LDL amat tinggi dalam pesakit FH?' :
           language === 'zh' ? '导致 FH 患者体内的 LDL 胆固醇极其高升的主要机制是什么？' :
           language === 'ta' ? 'FH நோயாளிகளில் LDL கொழுப்பு மிக அதிகமாக இருப்பதற்கான முக்கிய காரணம் என்ன?' :
           'What is the physiological mechanism responsible for elevated LDL cholesterol in FH?')
        : (language === 'ms' ? 'Apakah sifat utama Familial Hypercholesterolaemia (FH)?' :
           language === 'zh' ? '家族性高胆固醇血症 (FH) 的主要特征是什么？' :
           language === 'ta' ? 'குடும்ப மிகை கொழுப்புத்தன்மையின் (FH) முக்கிய அம்சம் என்ன?' :
           'What is the primary characteristic of Familial Hypercholesterolaemia (FH)?'),
      options: isAdvanced ? [
        language === 'ms' ? 'Kerosakan penerima LDLR genetik yang mengurangkan pembersihan LDL oleh hati' :
        language === 'zh' ? 'LDLR 基因突变导致肝脏 LDL 受体清除能力下降' :
        language === 'ta' ? 'கல்லீரல் LDL அகற்றுதலைக் குறைக்கும் LDLR மரபணு குறைபாடு' :
        'Genetic mutations (e.g. LDLR) that impair hepatic clearance of LDL particles',

        language === 'ms' ? 'Penyerapan vitamin berlebihan dalam usus' :
        language === 'zh' ? '肠道对维生素的过度吸收' :
        language === 'ta' ? 'குடலில் அதிகப்படியான வைட்டமின் உறிஞ்சப்படுதல்' :
        'Excessive intestinal absorption of dietary vitamins',

        language === 'ms' ? 'Kegagalan sementara pengeluaran hormon ginjal' :
        language === 'zh' ? '肾脏激素分泌的暂时失调' :
        language === 'ta' ? 'சிறுநீரக ஹார்மோன் உற்பத்தியின் தற்காலிக செயலிழப்பு' :
        'Temporary suppression of renal hormone secretion'
      ] : [
        language === 'ms' ? 'Ia adalah keadaan diwarisi dari lahir yang menyebabkan kolesterol tinggi tanpa kira diet' :
        language === 'zh' ? '这是一种出生即有的遗传性疾病，仅靠饮食无法完全控制' :
        language === 'ta' ? 'இது பிறப்பிலிருந்தே உள்ள பரம்பரை நிலை, உணவால் மட்டும் கட்டுப்படுத்த முடியாது' :
        'It is an inherited condition present from birth causing high cholesterol regardless of diet',

        language === 'ms' ? 'Ia adalah penyakit yang berpunca daripada pengambilan gula berlebihan sahaja' :
        language === 'zh' ? '这是一种单纯因过度食用糖分引起的疾病' :
        language === 'ta' ? 'இது அதிகப்படியான சர்க்கரையால் மட்டுமே ஏற்படும் நோய்' :
        'It is caused purely by consuming too much sugar',

        language === 'ms' ? 'Ia hanya menjejas orang warga tua berumur 70 tahun ke atas' :
        language === 'zh' ? '它只影响 70 岁以上的年长人群' :
        language === 'ta' ? 'இது 70 வயதிற்கு மேற்பட்ட முதியவர்களை மட்டுமே பாதிக்கும்' :
        'It only affects elderly individuals aged over 70'
      ],
      correctAnswer: 0,
      explanation: isAdvanced
        ? 'FH is predominantly caused by mutations in the LDLR, APOB, or PCSK9 genes affecting hepatic clearance.'
        : 'FH is an inherited condition from birth, meaning medication alongside healthy lifestyle is usually necessary.'
    });

    // Question 2: Topic specific based on onboardingTopics
    if (onboardingTopics.includes('topic-costs') || onboardingTopics.includes('topic-family')) {
      questions.push({
        id: 'pq_costs_family',
        question: onboardingTopics.includes('topic-costs')
          ? (language === 'ms' ? 'Bagaimanakah Kementerian Kesihatan (MOH) menyubsidi ujian genetik FH?' :
             language === 'zh' ? '新加坡卫生部 (MOH) 如何资助 FH 基因检测与咨询？' :
             language === 'ta' ? 'சிங்கப்பூர் சுகாதார அமைச்சகம் (MOH) FH சோதனையை எவ்வாறு மானியம் செய்கிறது?' :
             'How does MOH Singapore support FH genetic testing and counselling?')
          : (language === 'ms' ? 'Apakah yang dimaksudkan dengan Saringan Kaskad Keluarga untuk FH?' :
             language === 'zh' ? '什么是 FH 的“级联家系筛查” (Cascade Screening)？' :
             language === 'ta' ? 'FH-க்கான "குடும்ப அடுக்கு திரையிடல்" (Cascade Screening) என்றால் என்ன?' :
             'What is Cascade Screening for FH?'),
        options: onboardingTopics.includes('topic-costs') ? [
          language === 'ms' ? 'Rakyat Singapore menerima subsidi MOH 50%–75% dan boleh menggunakan MediSave' :
          language === 'zh' ? '符合资格的新加坡公民享有 50%–75% MOH 补贴，并可用 MediSave 支付' :
          language === 'ta' ? 'சிங்கப்பூரியர்கள் 50%-75% MOH மானியத்தைப் பெறுகிறார்கள் மற்றும் MediSave ஐப் பயன்படுத்தலாம்' :
          'Eligible Singapore Citizens receive 50%–75% MOH subsidies and can fully use MediSave',

          language === 'ms' ? 'Tiada subsidi diberikan untuk sebarang ujian genetik' :
          language === 'zh' ? '基因检测完全没有任何政府补贴' :
          language === 'ta' ? 'மரபணு சோதனைக்கு அரசு மானியம் எதுவும் இல்லை' :
          'No subsidies are provided for genetic testing',

          language === 'ms' ? 'Ujian hanya percuma jika dirawat di hospital swasta' :
          language === 'zh' ? '检测仅在私立医院免费提供' :
          language === 'ta' ? 'தனியார் மருத்துவமனைகளில் மட்டுமே சோதனை இலவசம்' :
          'Testing is only free at private hospitals'
        ] : [
          language === 'ms' ? 'Menyaring ahli keluarga darjah pertama untuk mengesan FH awal dan melindungi mereka' :
          language === 'zh' ? '对先证者的直系亲属进行针对性筛查，及早保护家人' :
          language === 'ta' ? 'முதல் நிலை குடும்ப உறுப்பினர்களை சோதித்து ஆரம்பத்திலேயே பாதுகாத்தல்' :
          'Testing first-degree relatives of an identified patient to detect FH early and protect loved ones',

          language === 'ms' ? 'Ujian larian bertubi-tubi di gimnasium' :
          language === 'zh' ? '在体育馆进行的多次连续体能测试' :
          language === 'ta' ? 'உடற்பயிற்சி கூடத்தில் தொடர்ச்சியான உடற்பயிற்சி சோதனை' :
          'A sequence of physical fitness tests',

          language === 'ms' ? 'Saringan darah berulang setiap hari selama seminggu' :
          language === 'zh' ? '连续一周每天重复抽血的测试' :
          language === 'ta' ? 'ஒரு வாரம் தினமும் இரத்த பரிசோதனை செய்தல்' :
          'Daily repeated blood draws for a week'
        ],
        correctAnswer: 0,
        explanation: onboardingTopics.includes('topic-costs')
          ? 'Singapore Citizens get 50-75% subsidies for FH counselling and genetic testing, with MediSave coverage.'
          : 'Cascade screening tests parents, siblings, and children of an index patient who have a 50% inheritance chance.'
      });
    }

    // Question 3: Insurance / Rights or Testing Process
    if (onboardingTopics.includes('topic-insurance') || onboardingTopics.includes('topic-testing') || onboardingTopics.includes('topic-next')) {
      questions.push({
        id: 'pq_insurance_testing',
        question: onboardingTopics.includes('topic-insurance')
          ? (language === 'ms' ? 'Bagaimanakah Moratorium LIA melindungi hak insurans anda semasa ujian genetik?' :
             language === 'zh' ? '新加坡 LIA 暂行规定如何在基因检测期间保障您的保险权益？' :
             language === 'ta' ? 'மரபணு சோதனையின் போது LIA ஒப்பந்தம் உங்கள் காப்பீட்டு உரிமைகளை எவ்வாறு பாதுகாக்கிறது?' :
             'How does the LIA Moratorium protect your insurance rights during genetic testing?')
          : (language === 'ms' ? 'Apakah persediaan yang diperlukan sebelum ujian darah genetik FH?' :
             language === 'zh' ? '进行 FH 基因检测抽血前需要做哪些准备？' :
             language === 'ta' ? 'FH மரபணு இரத்த பரிசோதனைக்கு முன் என்ன தயாரிப்பு தேவை?' :
             'What preparation is needed before the FH genetic test blood draw?'),
        options: onboardingTopics.includes('topic-insurance') ? [
          language === 'ms' ? 'Syarikat insurans tidak boleh memaksa pengeluaran keputusan ujian atau mengubah polisi sedia ada' :
          language === 'zh' ? '保险公司不得要求强制披露基因检测结果，现有保单（如 MediShield Life）完全不受影响' :
          language === 'ta' ? 'காப்பீட்டு நிறுவனங்கள் முடிவுகளை வெளியிட கட்டாயப்படுத்தக்கூடாது, தற்போதைய பாலிசிகள் பாதிக்கப்படாது' :
          'Insurers cannot force disclosure of genetic test results, and existing policies remain 100% protected',

          language === 'ms' ? 'Semua insuran dibatalkan secara automatik apabila mengambil ujian' :
          language === 'zh' ? '进行检测后，所有保险将被自动取消' :
          language === 'ta' ? 'சோதனை செய்தவுடன் அனைத்து காப்பீடுகளும் ரத்து செய்யப்படும்' :
          'All existing insurance policies are automatically canceled',

          language === 'ms' ? 'Insurans menaikkan kadar premium secara serta-merta sebanyak 200%' :
          language === 'zh' ? '保险保费将立即大幅上涨 200%' :
          language === 'ta' ? 'காப்பீட்டு கட்டணம் உடனடியாக 200% உயரும்' :
          'Insurers immediately double all premium rates'
        ] : [
          language === 'ms' ? 'Tiada puasa diperlukan; ia adalah ujian darah pesakit luar yang ringkas' :
          language === 'zh' ? '无需禁食；这是一项简短的门诊普通抽血' :
          language === 'ta' ? 'உண்ணாவிரதம் தேவையில்லை; இது ஒரு எளிய வெளிநோயாளி இரத்த பரிசோதனை' :
          'No fasting is required; it is a simple outpatient blood draw',

          language === 'ms' ? 'Perlu berpuasa ketat selama 24 jam tanpa air' :
          language === 'zh' ? '需要严格禁食禁水 24 小时' :
          language === 'ta' ? '24 மணி நேரம் தண்ணீர் இன்றி உண்ணாவிரதம் இருக்க வேண்டும்' :
          'Strict 24-hour water and food fasting',

          language === 'ms' ? 'Perlu dimasukkan ke wad hospital selama 2 hari' :
          language === 'zh' ? '必须住院观察 2 天' :
          language === 'ta' ? '2 நாட்களுக்கு மருத்துவமனையில் தங்கி இருக்க வேண்டும்' :
          'Inpatient hospital stay for 2 days'
        ],
        correctAnswer: 0,
        explanation: onboardingTopics.includes('topic-insurance')
          ? 'Under Singapore\'s LIA moratorium, test results cannot be demanded for standard policies and active plans cannot be altered.'
          : 'The FH blood draw requires no fasting and takes only a few minutes during an outpatient visit.'
      });
    }

    // Question 4: Treatment / Lifestyle / General fallback
    questions.push({
      id: 'pq_treatment',
      question: language === 'ms' ? 'Apakah peranan ubat-ubatan (seperti statin) dalam pengurusan FH?' :
                language === 'zh' ? '药物（如他汀类药物）在 FH 治疗管理中发挥什么作用？' :
                language === 'ta' ? 'FH மேலாண்மையில் மருந்துகளின் (ஸ்டேடின்கள் போன்றவை) பங்கு என்ன?' :
                'What role do medications (such as statins) play in managing FH?',
      options: [
        language === 'ms' ? 'Ia membantu hati membersihkan kolesterol LDL dan mengurangkan risiko penyakit jantung' :
        language === 'zh' ? '它们能有效帮助肝脏清除血液中的 LDL 胆固醇，大幅降低心血管风险' :
        language === 'ta' ? 'அவை கல்லீரலுக்கு LDL கொழுப்பை அகற்ற உதவுகின்றன மற்றும் இதய நோய் அபாயத்தைக் குறைக்கின்றன' :
        'They assist the liver in clearing bad LDL cholesterol, significantly lowering heart disease risk',

        language === 'ms' ? 'Ia mengubah DNA anda secara kekal' :
        language === 'zh' ? '它们会永久改变您的人体 DNA 结构' :
        language === 'ta' ? 'அவை உங்கள் டிஎன்ஏவை நிரந்தரமாக மாற்றுகின்றன' :
        'They permanently modify your body\'s DNA structure',

        language === 'ms' ? 'Ia hanya digunakan selama 3 hari sahaja' :
        language === 'zh' ? '它们只需连续服用 3 天即可' :
        language === 'ta' ? 'அவை 3 நாட்களுக்கு மட்டுமே பயன்படுத்தப்படுகின்றன' :
        'They are only used temporarily for 3 days'
      ],
      correctAnswer: 0,
      explanation: language === 'ms' ? 'Statin adalah ubat yang sangat selamat dan terbukti meningkatkan keupayaan pembersihan kolesterol.' :
                   language === 'zh' ? '他汀类药物高度安全、疗效明确，是帮助 FH 患者控制胆固醇的核心有效保障。' :
                   language === 'ta' ? 'ஸ்டேடின்கள் பாதுகாப்பானவை மற்றும் கொழுப்பைக் குறைக்க பெரிதும் உதவுகின்றன.' :
                   'Statins are well-studied, safe medications that help your liver clear bad cholesterol efficiently.'
    });

    return questions;
  }, [onboardingCompleted, questionnaireStatus, onboardingFamiliarity, onboardingTopics, language]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const detectLiveLocation = () => {
    setIsDetectingLoc(true);
    setGpsError(null);
    if (!navigator.geolocation) {
      setTimeout(() => {
        setPatientCoords({ lat: 1.2931, lng: 103.7845 }); // Kent Ridge
        setPatientLocName('My live location');
        setIsDetectingLoc(false);
        triggerToast('Simulated live location successfully!');
      }, 600);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPatientCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setPatientLocName('My live location');
        setIsDetectingLoc(false);
        triggerToast('Detected live location!');
      },
      (error) => {
        console.warn('GPS blocked, falling back to simulated location:', error);
        setPatientCoords({ lat: 1.2931, lng: 103.7845 }); // Kent Ridge
        setPatientLocName('My live location');
        setIsDetectingLoc(false);
        triggerToast('Simulated live location successfully!');
      },
      { timeout: 4000 }
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
    setChecklist((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
      const checkedCount = next.filter(item => item.checked).length;
      const totalCount = next.length;
      const newPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
      if (patientRecord?.patient_id && onUpdateEducationProgress) {
        onUpdateEducationProgress(patientRecord.patient_id, newPercent);
      }
      return next;
    });
  };

  const handleBookSubmit = (slotIdx: number) => {
    const slot = selectedSlotObj || clinicalSlots[slotIdx] || clinicalSlots[0];
    onBookAppointment(slot.date, slot.time, slot.clinic);
    setBookingStep('confirmed');
  };

  const handleCancelBooking = () => {
    setBookingStep('available');
    setSelectedSlotIdx(null);
    setSelectedSlotObj(null);
    setSelectedCalendarDay(22);
  };

  const handleEnterReschedule = () => {
    setProposedSlotObj(null);
    const currentClinicId = activeClinics.find(c => c.name === appointment?.clinic)?.id || 'nuh';
    setRescheduleClinicId(currentClinicId);

    // Derive month and day from appointment.date (format: "22 July 2026")
    const dateParts = appointment?.date?.split(' ');
    const apptDay = dateParts?.length === 3 ? parseInt(dateParts[0], 10) : NaN;
    const apptMonth = dateParts?.length === 3 ? `${dateParts[1]} ${dateParts[2]}` : 'July 2026';
    const derivedMonth = isNaN(apptDay) ? 'July 2026' : apptMonth;

    setRescheduleCalendarMonth(derivedMonth);
    const availableDays = Object.keys(activeClinicSlotsDb[currentClinicId]?.[derivedMonth] || {})
      .map(Number)
      .filter(d => !isDateBeforeToday(derivedMonth, d));
    const apptDayAvailable = !isNaN(apptDay) && availableDays.includes(apptDay);
    setRescheduleCalendarDay(apptDayAvailable ? apptDay : (availableDays[0] ?? 22));

    setShowRescheduleClinicDropdown(false);
    setBookingSubFlow('reschedule-select');
  };

  const handleExitReschedule = () => {
    setProposedSlotObj(null);
    setBookingSubFlow(null);
  };

  const handleProposedSlotSelected = (slot: ClinicSlot) => {
    setProposedSlotObj(slot);
    setBookingSubFlow('reschedule-review');
  };

  const handleConfirmReschedule = () => {
    if (!proposedSlotObj) return;
    onBookAppointment(proposedSlotObj.date, proposedSlotObj.time, proposedSlotObj.clinic);
    setBookingSubFlow('reschedule-success');
  };

  const handleEnterCancelFlow = () => {
    setBookingSubFlow('cancel-initial');
  };

  const handleExitCancelFlow = () => {
    setBookingSubFlow(null);
  };

  const handleContinueCancelling = () => {
    setBookingSubFlow('cancel-confirm');
  };

  const handleConfirmCancellation = () => {
    onCancelAppointment();
    setBookingSubFlow('cancel-success');
  };

  const handleNotificationClickAction = (action: 'confirm' | 'reschedule' | 'learn') => {
    if (action === 'confirm') {
      onNotificationAction('confirmed');
      onChangeScreen(ScreenId.ProgressTimeline);
    } else if (action === 'reschedule') {
      onChangeScreen(ScreenId.Booking);
      handleEnterReschedule();
    } else if (action === 'learn') {
      onNotificationAction('education_viewed');
      onChangeScreen(ScreenId.Education);
    }
  };

  const filteredFaqs = activeFaqCategory === 'all' 
    ? getLocalizedFaqs(language) 
    : getLocalizedFaqs(language).filter(faq => faq.category === activeFaqCategory);

  // Icon selector helper
  const getIcon = (name: string, customColor?: string) => {
    const color = customColor || "text-[#00a859]";
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
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold py-2 px-4 rounded-full shadow-lg z-50 flex items-center gap-2 border border-slate-800 animate-fade-in whitespace-nowrap">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Booking sub-flow overlays ───────────────────────────────────────── */}

            {/* CANCEL – initial screen */}
      {bookingSubFlow === 'cancel-initial' && (
        <div className="absolute inset-0 bg-slate-950/60 flex items-end justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full p-5 space-y-4 shadow-2xl text-left border border-slate-100 animate-slide-up">
            {/* Header */}
            <div className="flex items-start justify-between">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <span className="p-1 bg-emerald-50 text-[#00a859] rounded-lg">
                  <Calendar className="w-4 h-4" />
                </span>
                Change this appointment?
              </h4>
              <button
                onClick={handleExitCancelFlow}
                className="p-1 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Appointment details */}
            {appointment && (
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1">
                <p className="text-[10.5px] font-bold text-slate-700">{getLocalizedDate(appointment.date, language)}</p>
                <p className="text-[10.5px] text-slate-600">{appointment.timeSlot} · {appointment.clinic}</p>
              </div>
            )}

            <p className="text-[11px] text-slate-500 leading-relaxed">
              {t('cancel_if_need_diff_time')}
            </p>

            {/* Custom interactive FAQ link block */}
            <div className="bg-[#f8fafc] border border-slate-200/40 rounded-2xl p-3.5 text-left shadow-3xs">
              <p className="text-[10.5px] text-slate-500 leading-normal font-medium">
                {t('cancel_worries_text')}
              </p>
              <p className="text-[10.5px] text-slate-500 leading-normal font-medium mt-0.5">
                {t('cancel_address_concerns')}{' '}
                <button
                  onClick={() => {
                    handleExitCancelFlow();
                    setActiveFaqCategory('cost');
                    setEduSubTab('faq');
                    onChangeScreen(ScreenId.Education);
                  }}
                  className="font-bold text-[#00a859] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                >
                  {t('cancel_faq_link')}
                  <HelpCircle className="w-3.5 h-3.5 text-[#00a859] shrink-0" />
                </button>
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => { handleExitCancelFlow(); handleEnterReschedule(); }}
                className="w-full py-3 bg-[#00a859] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" /> {t('cancel_reschedule_btn')}
              </button>
              <button
                onClick={handleContinueCancelling}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition cursor-pointer text-center border border-slate-200"
              >
                {t('cancel_continue_btn')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL – final confirmation */}
      {bookingSubFlow === 'cancel-confirm' && (
        <div className="absolute inset-0 bg-slate-950/60 flex items-end justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full p-5 space-y-4 shadow-2xl text-left border border-slate-100 animate-slide-up">
            <div className="flex items-start justify-between">
              <h4 className="font-extrabold text-sm text-slate-900">{t('cancel_confirm_title')}</h4>
              <button
                onClick={handleExitCancelFlow}
                className="p-1 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {appointment && (
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1">
                <p className="text-[10.5px] font-bold text-slate-700">{getLocalizedDate(appointment.date, language)}</p>
                <p className="text-[10.5px] text-slate-600">{appointment.timeSlot} · {appointment.clinic}</p>
              </div>
            )}

            <p className="text-[11px] text-slate-500 leading-relaxed">
              {t('cancel_confirm_desc')}
            </p>

            {/* Custom interactive FAQ link block */}
            <div className="bg-[#f8fafc] border border-slate-200/40 rounded-2xl p-3.5 text-left shadow-3xs">
              <p className="text-[10.5px] text-slate-500 leading-normal font-medium">
                {t('cancel_worries_text')}
              </p>
              <p className="text-[10.5px] text-slate-500 leading-normal font-medium mt-0.5">
                {t('cancel_address_concerns')}{' '}
                <button
                  onClick={() => {
                    handleExitCancelFlow();
                    setActiveFaqCategory('cost');
                    setEduSubTab('faq');
                    onChangeScreen(ScreenId.Education);
                  }}
                  className="font-bold text-[#00a859] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                >
                  {t('cancel_faq_link')}
                  <HelpCircle className="w-3.5 h-3.5 text-[#00a859] shrink-0" />
                </button>
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleConfirmCancellation}
                className="w-full py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer text-center"
              >
                {t('cancel_yes_btn')}
              </button>
              <button
                onClick={handleExitCancelFlow}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition cursor-pointer text-center border border-slate-200"
              >
                {t('cancel_keep_btn')}
              </button>
            </div>
          </div>
        </div>
      )}

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
      <div className="flex-1 bg-slate-50 text-slate-800 flex flex-col relative overflow-hidden">

        {/* ── Full-screen appointment sub-flows (inside chrome so status bar stays visible) ── */}

        {/* RESCHEDULE – select new slot */}
        {bookingSubFlow === 'reschedule-select' && (() => {
          const rclinicsWithDistances = activeClinics.map(c => ({
            ...c,
            distance: calculateDistance(patientCoords.lat, patientCoords.lng, c.lat, c.lng),
          })).sort((a, b) => a.distance - b.distance);
          const rminDistance = Math.min(...rclinicsWithDistances.map(c => c.distance));
          return (
            <div className="flex flex-col flex-1 h-full overflow-hidden bg-slate-50 animate-fade-in">
              {/* Header – matches "Secure Appointment Booking" layout */}
              <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center shrink-0 relative">
                <div className="w-8" />
                <span className="flex-1 text-center font-bold text-sm text-slate-800">{t('reschedule_select_title')}</span>
                <button
                  onClick={handleExitReschedule}
                  className="w-8 flex items-center justify-center p-1 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto flex flex-col">
                {/* Current appointment banner */}
                {appointment && (
                  <div className="mx-4 mt-3 bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-2">
                    <span className="mt-0.5 text-[#00a859]"><Calendar className="w-4 h-4" /></span>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">{t('reschedule_current_appt')}</p>
                      <p className="text-[11px] text-emerald-900 font-semibold mt-0.5">{getLocalizedDate(appointment.date, language)}</p>
                      <p className="text-[10.5px] text-emerald-700">{appointment.timeSlot} · {appointment.clinic}</p>
                    </div>
                  </div>
                )}

                <p className="mx-4 mt-3 text-[10.5px] text-slate-500">
                  {t('reschedule_choose_desc')}
                </p>

                <div className="px-4 pb-4 mt-3 space-y-4">
                  {/* Clinic selector */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">{t('reschedule_select_clinic')}</label>
                    <div className="relative">
                      <button
                        onClick={() => setShowRescheduleClinicDropdown(!showRescheduleClinicDropdown)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 flex justify-between items-center shadow-3xs cursor-pointer text-left transition hover:border-emerald-600/40"
                      >
                        <div className="flex gap-2.5 min-w-0 items-center">
                          <div className="p-1.5 bg-emerald-50 rounded-lg shrink-0">
                            <MapPin className="w-4 h-4 text-[#00a859]" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs text-slate-800 truncate">
                              {activeClinics.find(c => c.id === rescheduleClinicId)?.name}
                            </h4>
                            <p className="text-[10px] text-slate-500 leading-snug mt-0.5 truncate">
                              {rclinicsWithDistances.find(c => c.id === rescheduleClinicId)?.distance.toFixed(1)} {t('booking_km_away')}
                              {rclinicsWithDistances.find(c => c.id === rescheduleClinicId)?.distance === rminDistance && (
                                <span className="ml-1 text-emerald-700 font-semibold">· {t('reschedule_nearest')}</span>
                              )}
                            </p>
                          </div>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                      </button>

                      {showRescheduleClinicDropdown && (
                        <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-xl mt-1.5 shadow-md z-40 overflow-hidden divide-y divide-slate-100 animate-fade-in max-h-48 overflow-y-auto">
                          {rclinicsWithDistances.map((clinic) => {
                            const isSelected = rescheduleClinicId === clinic.id;
                            const isNearest = clinic.distance === rminDistance;
                            return (
                              <button
                                key={clinic.id}
                                onClick={() => {
                                  setRescheduleClinicId(clinic.id);
                                  setShowRescheduleClinicDropdown(false);
                                  const availableDays = Object.keys(activeClinicSlotsDb[clinic.id]?.[rescheduleCalendarMonth] || {}).map(Number).filter(d => !isDateBeforeToday(rescheduleCalendarMonth, d));
                                  setRescheduleCalendarDay(availableDays[0] ?? 1);
                                }}
                                className={`w-full text-left p-3 transition flex justify-between items-start gap-3 hover:bg-emerald-50/10 cursor-pointer ${isSelected ? 'bg-emerald-50/20' : 'bg-white'}`}
                              >
                                <div className="space-y-0.5 min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <h5 className={`font-bold text-xs ${isSelected ? 'text-[#00a859]' : 'text-slate-800'}`}>{clinic.name}</h5>
                                    {isNearest && <span className="text-[8px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">{t('reschedule_nearest')}</span>}
                                  </div>
                                  <p className="text-[9px] font-mono text-slate-400">
                                    <span className="text-emerald-700 font-bold">{clinic.distance.toFixed(1)} km</span>
                                  </p>
                                </div>
                                {isSelected && <Check className="w-4 h-4 text-[#00a859] shrink-0 mt-0.5" />}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Month selector row */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        const idx = availableMonths.indexOf(rescheduleCalendarMonth);
                        if (idx > 0) {
                          const m = availableMonths[idx - 1];
                          setRescheduleCalendarMonth(m);
                          const days = Object.keys(activeClinicSlotsDb[rescheduleClinicId]?.[m] || {}).map(Number).filter(d => !isDateBeforeToday(m, d));
                          setRescheduleCalendarDay(days[0] ?? 1);
                        }
                      }}
                      disabled={availableMonths.indexOf(rescheduleCalendarMonth) === 0}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-slate-700">{formatMonthShorthand(rescheduleCalendarMonth, language)}</span>
                    <button
                      onClick={() => {
                        const idx = availableMonths.indexOf(rescheduleCalendarMonth);
                        if (idx < availableMonths.length - 1) {
                          const m = availableMonths[idx + 1];
                          setRescheduleCalendarMonth(m);
                          const days = Object.keys(activeClinicSlotsDb[rescheduleClinicId]?.[m] || {}).map(Number).filter(d => !isDateBeforeToday(m, d));
                          setRescheduleCalendarDay(days[0] ?? 1);
                        }
                      }}
                      disabled={availableMonths.indexOf(rescheduleCalendarMonth) === availableMonths.length - 1}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Day grid */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                      <span key={d} className="text-[9px] font-bold text-slate-400">{d}</span>
                    ))}
                    {Array.from({ length: getMonthConfig(rescheduleCalendarMonth).emptyCells }).map((_, i) => (
                      <span key={`pad-${i}`} />
                    ))}
                    {Array.from({ length: getMonthConfig(rescheduleCalendarMonth).totalDays }).map((_, i) => {
                      const dayNum = i + 1;
                      const hasSlots = !!activeClinicSlotsDb[rescheduleClinicId]?.[rescheduleCalendarMonth]?.[dayNum] && !isDateBeforeToday(rescheduleCalendarMonth, dayNum);
                      const isSelected = rescheduleCalendarDay === dayNum;
                      const isRescheduleCurrentDay = isToday(rescheduleCalendarMonth, dayNum);
                      return (
                        <button
                          key={`day-${dayNum}`}
                          disabled={!hasSlots}
                          onClick={() => setRescheduleCalendarDay(dayNum)}
                          className={`h-8 w-8 rounded-full flex flex-col items-center justify-center text-[10.5px] font-extrabold transition relative cursor-pointer mx-auto ${
                            isSelected
                              ? 'bg-[#00a859] text-white shadow-xs'
                              : isRescheduleCurrentDay
                              ? 'bg-slate-200/60 border border-slate-300 text-slate-800 hover:bg-slate-300/60'
                              : hasSlots
                              ? 'bg-emerald-50 text-[#00a859] border border-emerald-200/55 hover:bg-emerald-100/60'
                              : 'text-slate-300 pointer-events-none'
                          }`}
                        >
                          <span>{dayNum}</span>
                          {hasSlots && !isSelected && <span className="absolute bottom-1 w-1 h-1 bg-[#00a859] rounded-full" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Time slots */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{t('available_slots')}</label>
                    {activeClinicSlotsDb[rescheduleClinicId]?.[rescheduleCalendarMonth]?.[rescheduleCalendarDay] ? (
                      activeClinicSlotsDb[rescheduleClinicId][rescheduleCalendarMonth][rescheduleCalendarDay]
                        .filter(slot => !(
                          appointment &&
                          slot.date === appointment.date &&
                          slot.time === appointment.timeSlot &&
                          slot.clinic === appointment.clinic
                        ))
                        .map((slot, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleProposedSlotSelected(slot)}
                            className="w-full bg-white hover:bg-emerald-50/15 border border-slate-200 hover:border-[#00a859]/40 p-3.5 rounded-xl text-left transition flex justify-between items-center cursor-pointer shadow-3xs hover:shadow-2xs"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-slate-50 rounded-lg shrink-0">
                                <Clock className="w-4 h-4 text-[#00a859]" />
                              </div>
                              <div className="space-y-0.5">
                                <p className="text-xs font-extrabold text-slate-800">{slot.time}</p>
                                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                  <span className="font-semibold text-slate-600">{slot.provider}</span>
                                  <span className="text-slate-300">·</span>
                                  <span>{slot.duration.replace('mins', t('booking_mins'))}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-[#00a859] font-mono bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">{slot.cost}</span>
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                          </button>
                        ))
                    ) : (
                      <div className="bg-white border border-dashed border-slate-200 p-6 rounded-xl text-center text-xs text-slate-400">
                        {t('reschedule_no_slots')}
                      </div>
                    )}
                  </div>
                </div>
              </div>{/* end scrollable body */}

              {/* Pinned footer */}
              <div className="px-4 py-4 text-center bg-slate-50 border-t border-slate-100 shrink-0">
                <button
                  onClick={handleExitReschedule}
                  className="text-[10.5px] text-slate-400 hover:text-slate-600 transition cursor-pointer"
                >
                  {t('reschedule_keep_current')}
                </button>
              </div>
            </div>
          );
        })()}

        {/* RESCHEDULE – review comparison */}
        {bookingSubFlow === 'reschedule-review' && proposedSlotObj && (
          <div className="flex flex-col flex-1 h-full overflow-hidden bg-slate-50 animate-fade-in">
            {/* Header */}
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center shrink-0 relative">
              <button
                onClick={() => setBookingSubFlow('reschedule-select')}
                className="w-16 flex items-center gap-0.5 p-1 text-slate-400 hover:text-slate-700 transition cursor-pointer text-[10.5px]"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back
              </button>
              <span className="flex-1 text-center font-bold text-sm text-slate-800">{t('reschedule_review_title')}</span>
              <button
                onClick={handleExitReschedule}
                className="w-16 flex items-center justify-end p-1 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 px-4 py-5 space-y-4 overflow-y-auto">
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {t('reschedule_review_desc')}
              </p>

              {/* Current appointment */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-3 py-2 border-b border-slate-100">
                  <p className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide">{t('reschedule_current_appt')}</p>
                </div>
                <div className="px-3 py-3 space-y-0.5">
                  {appointment && (
                    <>
                      <p className="text-[11px] font-bold text-slate-800">{getLocalizedDate(appointment.date, language)}</p>
                      <p className="text-[10.5px] text-slate-600">{appointment.timeSlot}</p>
                      <p className="text-[10px] text-slate-500">{appointment.clinic}</p>
                    </>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-slate-300">
                <ChevronDown className="w-5 h-5" />
              </div>

              {/* Proposed appointment */}
              <div className="bg-white rounded-xl border border-emerald-200 overflow-hidden ring-1 ring-emerald-100">
                <div className="bg-emerald-50 px-3 py-2 border-b border-emerald-100">
                  <p className="text-[9.5px] font-bold text-emerald-700 uppercase tracking-wide">{t('reschedule_new_appt')}</p>
                </div>
                <div className="px-3 py-3 space-y-0.5">
                  <p className="text-[11px] font-bold text-slate-800">{getLocalizedDate(proposedSlotObj.date, language)}</p>
                  <p className="text-[10.5px] text-slate-600">{proposedSlotObj.time}</p>
                  <p className="text-[10px] text-slate-500">{proposedSlotObj.clinic}</p>
                </div>
              </div>
            </div>

            <div className="px-4 pb-6 space-y-2.5 bg-white border-t border-slate-100 pt-4 shrink-0">
              <button
                onClick={handleConfirmReschedule}
                className="w-full py-3 bg-[#00a859] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer text-center"
              >
                {t('reschedule_confirm_btn')}
              </button>
              <button
                onClick={() => setBookingSubFlow('reschedule-select')}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition cursor-pointer text-center border border-slate-200"
              >
                {t('reschedule_different_slot')}
              </button>
              <button
                onClick={handleExitReschedule}
                className="w-full py-2 text-slate-400 hover:text-slate-600 text-[10.5px] font-medium transition cursor-pointer text-center"
              >
                {t('reschedule_keep_current')}
              </button>
            </div>
          </div>
        )}

        {/* RESCHEDULE – success */}
        {bookingSubFlow === 'reschedule-success' && (
          <div className="flex flex-col flex-1 bg-white items-center justify-center p-6 text-center gap-5 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-[#00a859]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-extrabold text-base text-slate-900">{t('reschedule_success_title')}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">{t('reschedule_success_desc')}</p>
            </div>
            {appointment && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 w-full text-left space-y-0.5">
                <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">{t('reschedule_new_appt')}</p>
                <p className="text-[11px] font-bold text-slate-800 mt-1">{getLocalizedDate(appointment.date, language)}</p>
                <p className="text-[10.5px] text-slate-600">{appointment.timeSlot}</p>
                <p className="text-[10px] text-slate-500">{appointment.clinic}</p>
              </div>
            )}
            <button
              onClick={() => setBookingSubFlow(null)}
              className="w-full py-3 bg-[#00a859] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer text-center"
            >
              {t('reschedule_done_btn')}
            </button>
          </div>
        )}

        {/* CANCEL – success */}
        {bookingSubFlow === 'cancel-success' && (
          <div className="flex flex-col flex-1 bg-white items-center justify-center p-6 text-center gap-5 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-slate-400" />
            </div>
            <div className="space-y-2">
              <h3 className="font-extrabold text-base text-slate-900">{t('cancel_success_title')}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {t('cancel_success_desc')}
              </p>
            </div>
            <div className="flex flex-col gap-2.5 w-full">
              <button
                onClick={() => {
                  setBookingSubFlow(null);
                  setBookingStep('available');
                  setSelectedSlotIdx(null);
                  setSelectedSlotObj(null);
                  setSelectedCalendarDay(22);
                }}
                className="w-full py-3 bg-[#00a859] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" /> {t('cancel_book_new_btn')}
              </button>
              <button
                onClick={() => { setBookingSubFlow(null); onChangeScreen(ScreenId.Home); }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition cursor-pointer text-center border border-slate-200"
              >
                {t('cancel_return_home')}
              </button>
            </div>
          </div>
        )}

        {/* ── Normal screens (only shown when no full-screen subflow is active) ── */}
        {!bookingSubFlow || bookingSubFlow === 'cancel-initial' || bookingSubFlow === 'cancel-confirm' ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeScreen}
              initial={{ x: 12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -12, opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="flex-col flex flex-1 min-h-0 h-full overflow-hidden relative"
            >

        {/* ----------------- SCREEN 1: HOME ----------------- */}
        {activeScreen === ScreenId.Home && (
          <div className="flex-col flex flex-1 h-full overflow-hidden bg-slate-50 relative">
            {/* 1. Official HealthHub Top Header Row */}
            <div className="bg-white px-4 py-3 flex justify-between items-center border-b border-slate-100 shrink-0">
              {/* Notification Bell */}
              <button 
                onClick={() => setShowNotificationPopup(true)} 
                className="relative transition p-1 hover:bg-slate-100 rounded-full cursor-pointer border-none"
                id="hh-home-bell-btn"
              >
                <Bell className="w-5 h-5 text-slate-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border border-white" />
              </button>

              {/* HealthHub Center Logo */}
              <div className="flex items-center gap-1">
                <span className="font-bold text-slate-800 text-sm tracking-tight">Health</span>
                <span className="font-black text-[#00a859] text-sm tracking-tight mr-1">Hub</span>
                {/* Custom multi-color flower logo SVG resembling Singapore HealthHub */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="6" fill="#FBBF24" fillOpacity="0.85" />
                  <circle cx="16" cy="8" r="6" fill="#10B981" fillOpacity="0.85" />
                  <circle cx="12" cy="15" r="6" fill="#3B82F6" fillOpacity="0.85" />
                  <circle cx="10" cy="12" r="4.5" fill="#EF4444" fillOpacity="0.75" />
                </svg>
              </div>

              {/* Right controls: Language + Settings */}
              <div className="flex items-center gap-1 relative">
                {/* Globe / Language Selector */}
                <button
                  onClick={() => setLangMenuOpen(prev => !prev)}
                  className="p-1 hover:bg-slate-100 rounded-full transition cursor-pointer"
                  title={t('select_app_language')}
                >
                  <Globe className="w-5 h-5 text-slate-700" />
                </button>

                {/* Dropdown Menu */}
                {langMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                    <div className="absolute right-0 top-8 bg-white border border-slate-200 rounded-xl shadow-lg p-1 z-50 min-w-[120px] text-xs font-medium animate-fade-in">
                      {[
                        { code: 'en', label: 'English' },
                        { code: 'ms', label: 'Bahasa Melayu' },
                        { code: 'zh', label: '简体中文' },
                        { code: 'ta', label: 'தமிழ்' }
                      ].map(({ code, label }) => (
                        <button
                          key={code}
                          onClick={() => {
                            setLanguage(code as any);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between text-xs cursor-pointer ${
                            language === code 
                              ? 'bg-emerald-50 text-[#00a859] font-bold' 
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {label}
                          {language === code && (
                            <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-black">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Settings Cog */}
                <div className="cursor-pointer hover:opacity-80 transition p-1 hover:bg-slate-100 rounded-full" onClick={() => onChangeScreen(ScreenId.ReminderSettings)}>
                  <Settings className="w-5 h-5 text-slate-700" />
                </div>
              </div>
            </div>

            {/* Notifications Pop-up Dialog */}
            {showNotificationPopup && (
              <div className="absolute inset-x-4 top-14 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 animate-fade-in p-4 text-left space-y-3.5 max-w-[340px] mx-auto">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-[#00a859]" />
                    <h4 className="font-bold text-xs text-slate-800">{t('notif_header')}</h4>
                  </div>
                  <button 
                    onClick={() => setShowNotificationPopup(false)} 
                    className="text-slate-400 hover:text-slate-600 font-bold text-xs p-1 cursor-pointer"
                  >
                    {t('notif_close')}
                  </button>
                </div>
                <div className="space-y-3">
                  {/* Notification 1: Active referral */}
                  <button 
                    onClick={() => {
                      onChangeScreen(ScreenId.ReferralIntro);
                      setShowNotificationPopup(false);
                    }}
                    className="w-full text-left bg-slate-50 hover:bg-emerald-50/25 border border-slate-100 p-3 rounded-xl flex items-start gap-3 transition cursor-pointer"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00a859] mt-1.5 shrink-0" />
                    <div className="space-y-0.5">
                      <p className="text-xs font-extrabold text-slate-800">{t('notif_referral_title')}</p>
                      <p className="text-[10px] text-slate-500 leading-normal">{t('notif_referral_desc')}</p>
                      <span className="text-[9px] text-slate-400 block pt-0.5">{t('notif_referral_time')}</span>
                    </div>
                  </button>

                  {/* Notification 2: Booking status */}
                  <button 
                    onClick={() => {
                      onChangeScreen(ScreenId.Booking);
                      setShowNotificationPopup(false);
                    }}
                    className="w-full text-left bg-slate-50 hover:bg-emerald-50/25 border border-slate-100 p-3 rounded-xl flex items-start gap-3 transition cursor-pointer"
                  >
                    <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${appointment.status === 'booked' ? 'bg-slate-300' : 'bg-rose-500'}`} />
                    <div className="space-y-0.5">
                      <p className="text-xs font-extrabold text-slate-800">
                        {appointment.status === 'booked' ? t('notif_booking_booked') : t('notif_booking_unbooked')}
                      </p>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        {appointment.status === 'booked' 
                          ? t('notif_booking_confirmed_msg').replace('{date}', getLocalizedDate(appointment.date, language)).replace('{time}', appointment.timeSlot)
                          : t('notif_booking_pending_msg')}
                      </p>
                      <span className="text-[9px] text-slate-400 block pt-0.5">
                        {appointment.status === 'booked' ? t('notif_time_just_now') : t('notif_time_1d_ago')}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto pb-6 space-y-4">
              
              {/* 2. User Welcome Greeting Row */}
              <div className="bg-white px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#00a859] font-extrabold flex items-center justify-center text-xs border border-emerald-100 shadow-inner">
                    {patientInitials}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-800">{patientName}</h4>
                    <p className="text-[9px] text-slate-400 font-medium">{patientNric} • {t('active_user')}</p>
                  </div>
                </div>
                <span className="bg-emerald-50 text-[#00a859] text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-100/70 font-sans">
                  {t('chas_blue')}
                </span>
              </div>

              {/* 3. Primary Focus: Personalised FH Genetic Testing Referral Banner */}
              {isFHReferred && (
                <div className="px-4">
                  <div className="bg-[#f0fbf5] border border-emerald-200/80 shadow-[0_4px_16px_rgba(0,168,89,0.06)] rounded-2xl p-5 space-y-4" id="hh-referral-banner-card">
                    
                    {/* Status Chip and Title */}
                    <div className="space-y-1.5">
                      <div className="flex items-center">
                        <span className="bg-white text-[#00a859] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-100/80 font-sans shadow-xs">
                          {t('action_recommended')}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-sm text-slate-900 tracking-tight leading-snug">
                        {t('fh_referral_title')}
                      </h3>
                    </div>

                    {/* One sentence explaining WHY (Concise, preferred wording) */}
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {t('fh_referral_desc')}
                    </p>

                    {/* Recommended Next Step or Next Appointment Box */}
                    <div className="bg-white/80 p-3.5 rounded-xl border border-emerald-100/40 space-y-1" id="hh-next-step-box">
                      {appointment.status === 'booked' ? (
                        <>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">{t('next_appointment')}</p>
                          <p className="text-xs font-extrabold text-slate-800">Thursday, 9 July</p>
                          <p className="text-[11px] text-slate-500 font-medium">10:00 AM</p>
                        </>
                      ) : (
                        <>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#00a859] font-mono">{t('recommended_next_step')}</p>
                          <p className="text-xs font-extrabold text-slate-800 leading-tight">
                            {t('book_counselling_step')}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Primary & Secondary Call to Actions */}
                    <div className="flex flex-col gap-2">
                      <button
                        id="hh-home-primary-cta"
                        onClick={() => onChangeScreen(ScreenId.Booking)}
                        className="w-full h-11 bg-[#00a859] hover:bg-emerald-800 text-white rounded-xl text-xs font-bold tracking-wide transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer select-none border border-transparent"
                      >
                        {appointment.status === 'booked' ? 'Manage booking' : t('book_now_btn')} <ChevronRight className="w-4 h-4" />
                      </button>
                      {isFHReferred && (
                        <button
                          onClick={() => onChangeScreen(ScreenId.ReferralIntro)}
                          className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer select-none"
                        >
                          {t('why_referred_btn')}
                        </button>
                      )}
                    </div>

                    {/* Patient Journey Progress Pathway */}
                    {isFHReferred && (
                      <div 
                        onClick={() => onChangeScreen(ScreenId.ProgressTimeline)}
                        className="space-y-3 pt-3.5 px-2 pb-1.5 border-t border-emerald-100/50 cursor-pointer hover:bg-emerald-50/50 rounded-xl transition-all duration-200 group"
                      >
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] font-bold text-emerald-800/80 uppercase tracking-widest font-sans group-hover:text-[#00a859] transition-colors">{t('your_journey')}</p>
                          <ChevronRight className="w-3.5 h-3.5 text-emerald-600/70 group-hover:text-[#00a859] transition-all transform group-hover:translate-x-0.5" />
                        </div>
                        <div className="relative flex items-start justify-between px-3 pt-1" style={{ minHeight: '52px' }}>
                          {/* Connecting Line Background */}
                          <div className="absolute top-[9px] left-[12%] right-[12%] h-[3px] bg-slate-100 rounded-full" />
                          {/* Colored Active Line */}
                          <div 
                            className="absolute top-[9px] left-[12%] h-[3px] bg-gradient-to-r from-emerald-400 to-[#00a859] rounded-full transition-all duration-500" 
                            style={{ width: appointment.status === 'booked' ? '76%' : '38%' }} 
                          />

                          {/* Step 1: Referral */}
                          <div className="flex flex-col items-center relative z-10 w-[64px]">
                            <div className="w-5 h-5 rounded-full bg-[#00a859] text-white flex items-center justify-center text-[10px] font-bold shadow-xs ring-4 ring-emerald-50">
                              ✓
                            </div>
                            <span className="text-[9px] font-bold text-[#00a859] mt-1.5 text-center leading-tight">
                              {t('step_referral')}
                            </span>
                          </div>

                          {/* Step 2: Book Counselling */}
                          <div className="flex flex-col items-center relative z-10 w-[96px]">
                            {appointment.status === 'booked' ? (
                              <>
                                <div className="w-5 h-5 rounded-full bg-[#00a859] text-white flex items-center justify-center text-[10px] font-bold shadow-xs ring-4 ring-emerald-50">
                                  ✓
                                </div>
                                <span className="text-[9px] font-bold text-[#00a859] mt-1.5 text-center leading-tight">
                                  {t('step_counselling')}
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="w-5 h-5 rounded-full border-2 border-[#00a859] bg-white flex items-center justify-center shadow-xs">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#00a859]" />
                                </div>
                                <span className="text-[9px] font-bold text-[#00a859] mt-1.5 text-center leading-tight">
                                  {t('step_counselling')}
                                </span>
                              </>
                            )}
                          </div>

                          {/* Step 3: Genetic Testing */}
                          <div className="flex flex-col items-center relative z-10 w-[80px]">
                            <div className="w-5 h-5 rounded-full border border-slate-300 bg-white flex items-center justify-center shadow-3xs">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                            </div>
                            <span className="text-[9px] font-semibold text-slate-400 mt-1.5 text-center leading-tight">
                              {t('step_testing')}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 4. Quick Links Grid (1:1 with reference screenshot) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-4">
                  <h3 className="font-display font-bold text-slate-900 text-xs tracking-tight">{t('quick_links')}</h3>
                  <button className="text-[#00a859] text-[11px] font-bold hover:underline">{t('edit')}</button>
                </div>

                {/* CTAs in 3-column grid layout */}
                <div className="grid grid-cols-3 gap-2 mt-4 px-4">
                  <button
                    onClick={() => onChangeScreen(ScreenId.Booking)}
                    className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center mb-1 shrink-0">
                      <Calendar className="w-4 h-4 text-rose-500" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight">{t('link_appointments')}</span>
                  </button>

                  {/* Card 2: CHAS */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-1 shrink-0">
                      <div className="border-1.5 border-blue-400 rounded px-1.5 py-0.5 text-[8px] font-black text-blue-500 bg-white leading-none scale-90">CHAS</div>
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight">CHAS</span>
                  </div>

                  {/* Card 4: Medical reports / certs */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mb-1 shrink-0">
                      <FileText className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight">{t('link_medical_reports')}</span>
                  </div>

                  {/* Card 5: Medication Refill */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square">
                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mb-1 shrink-0">
                      <Pill className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight">{t('link_medication_refill')}</span>
                  </div>

                  {/* Card 6: Payment */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square">
                    <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center mb-1 shrink-0">
                      <CreditCard className="w-4 h-4 text-sky-600" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight">{t('link_payment')}</span>
                  </div>
                </div>
              </div>

              {/* 6. Programmes Section (1:1 with reference screenshot) */}
              <div className="space-y-2">
                <div className="px-4">
                  <h3 className="font-display font-bold text-slate-900 text-xs tracking-tight">{t('link_programmes')}</h3>
                </div>

                <div className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none">
                  {/* Card 1: Diabetes Hub (Beautiful custom stylized graphic matching screenshot style) */}
                  <div className="bg-amber-100/90 border border-amber-200 rounded-2xl p-4 flex flex-col justify-between h-32 min-w-[220px] relative overflow-hidden shrink-0 shadow-xs">
                    <div className="absolute right-2 bottom-2 text-5xl opacity-40 select-none">🩺</div>
                    <div>
                      <span className="bg-amber-500/20 text-amber-800 text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full font-mono">
                        {language === 'ms' ? 'Hab Aktif' :
                         language === 'zh' ? '活跃中心' :
                         language === 'ta' ? 'செயலில் உள்ள மையம்' :
                         'Active Hub'}
                      </span>
                      <h4 className="font-display font-bold text-slate-900 text-[11px] mt-1.5">
                        {language === 'ms' ? 'Hab Diabetes' :
                         language === 'zh' ? '糖尿病管理中心' :
                         language === 'ta' ? 'நீரிழிவு மையம்' :
                         'Diabetes Hub'}
                      </h4>
                    </div>
                    <p className="text-[9px] text-slate-600 leading-snug">
                      {language === 'ms' ? 'Panduan peribadi untuk mengurus dan mencegah diabetes.' :
                       language === 'zh' ? '个性化糖尿病管理和预防指南。' :
                       language === 'ta' ? 'நீரிழிவு நோயை நிர்வகிப்பதற்கும் தடுப்பதற்கும் தனிப்பயனாக்கப்பட்ட வழிகாட்டிகள்.' :
                       'Personalised guides for managing and preventing diabetes.'}
                    </p>
                  </div>

                  {/* Card 2: Mental Well-being */}
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex flex-col justify-between h-32 min-w-[220px] relative overflow-hidden shrink-0 shadow-xs">
                    <div className="absolute right-2 bottom-2 text-5xl opacity-40 select-none">🧠</div>
                    <div>
                      <span className="bg-emerald-500/20 text-emerald-800 text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full font-mono">
                        {language === 'ms' ? 'Sumber' :
                         language === 'zh' ? '资源区' :
                         language === 'ta' ? 'வளங்கள்' :
                         'Resource'}
                      </span>
                      <h4 className="font-display font-bold text-slate-900 text-[11px] mt-1.5">
                        {language === 'ms' ? 'Kesejahteraan Mental' :
                         language === 'zh' ? '心理健康与福祉' :
                         language === 'ta' ? 'மன நலம்' :
                         'Mental Well-being'}
                      </h4>
                    </div>
                    <p className="text-[9px] text-slate-600 leading-snug">
                      {language === 'ms' ? 'Panduan kesedaran dan rangkaian sokongan untuk keselamatan emosi.' :
                       language === 'zh' ? '关于情感支持、正念练习和支持网络的指南。' :
                       language === 'ta' ? 'உணர்ச்சிப் பாதுகாப்பிற்கான தியான வழிகாட்டிகள் மற்றும் ஆதரவு நெட்வொர்க்குகள்.' :
                       'Mindfulness guides and support networks for emotional safety.'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}


        {/* ----------------- SCREEN 1b: WHY WAS I REFERRED? ----------------- */}
        {activeScreen === ScreenId.ReferralIntro && (
          <div className="flex-col flex flex-1 min-h-0 max-h-full overflow-hidden bg-slate-50 animate-fade-in">
            {/* Top Navigation */}
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-2">
              <button onClick={() => onChangeScreen(ScreenId.Home)} className="p-1 hover:bg-slate-100 rounded-full">
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <span className="font-bold text-sm text-slate-800">{t('referred_intro_title')}</span>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5 space-y-6 bg-slate-50">
              {/* Page title + subtitle (three short sentences) */}
              <div>
                <h3 className="text-base font-bold text-slate-800 leading-snug">{t('referred_intro_title')}</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {t('referred_hi_lisa')
                      .replace('Lisa', patientFirstNameCapitalized)
                      .replace('லிசா', getTamilName(patientFirstNameCapitalized))}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t('referred_doctor_rec')}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">{t('referred_means')}</p>
                </div>
              </div>

              {/* SECTION 1 — Personalised Explanation */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                    <HeartPulse className="w-5 h-5 text-[#00a859]" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">{t('referred_why_doctor')}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t('referred_cholesterol_may_fh')}
                </p>
                {/* Reassurance highlighted box — strongest visual element */}
                <div className="mt-4 bg-emerald-50 border-2 border-emerald-300 rounded-lg px-4 py-4 flex items-center justify-center">
                  <p className="text-sm text-[#00a859] font-bold leading-relaxed text-center">
                    {t('not_mean_have_fh')}
                  </p>
                </div>
                {/* Two icon rows — top-aligned with first line of text */}
                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                      <Dna className="w-5 h-5 text-[#00a859]" />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-2">
                      {t('genetic_testing_confirms')}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                      <HeartPulse className="w-5 h-5 text-[#00a859]" />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-2">
                      {t('referred_results_help_team')}
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 2 — Why this matters */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-4">{t('why_this_matters')}</h4>
                <div className="space-y-3">
                  {/* Card 1 */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3 items-center shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                      <Check className="w-5 h-5 text-[#00a859]" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-xs font-bold text-slate-800">{t('early_diagnosis')}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">{t('early_diagnosis_desc')}</p>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3 items-center shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                      <Users className="w-5 h-5 text-[#00a859]" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-xs font-bold text-slate-800">{t('protect_family')}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">{t('protect_family_desc')}</p>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3 items-center shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                      <Sparkles className="w-5 h-5 text-[#00a859]" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-xs font-bold text-slate-800">{t('personalized_care')}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">{t('personalized_care_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3 — What happens next? */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-4">{t('what_happens_next')}</h4>
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  {/* Progress indicator */}
                  <div className="space-y-4">
                    {/* Step 1 — done */}
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#00a859] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs text-slate-500 line-through">{t('step_referral_received')}</span>
                    </div>
                    {/* Step 2 — current */}
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#00a859] flex items-center justify-center shrink-0 ring-4 ring-emerald-100">
                        <BookOpen className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs font-bold text-[#00a859]">{t('step_learn_about_fh')}</span>
                      <span className="text-[9px] text-[#00a859] bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full font-bold ml-2">{t('step_current')}</span>
                    </div>
                    {/* Step 3 — upcoming */}
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                        <ClipboardList className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <span className="text-xs text-slate-400">{t('step_pre_test_counselling')}</span>
                    </div>
                    {/* Step 4 — future */}
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                        <Dna className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <span className="text-xs text-slate-400">{t('step_genetic_results')}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {t('referred_next_step_learning')}
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 4 — Before your appointment */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">{t('referred_before_app')}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {t('referred_spend_time')}
                </p>
                {/* Five compact preview cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm">
                    <Dna className="w-5 h-5 text-[#00a859]" />
                    <span className="text-xs font-bold text-slate-800 text-center">{t('referred_short_what_is')}</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm">
                    <ClipboardList className="w-5 h-5 text-[#00a859]" />
                    <span className="text-xs font-bold text-slate-800 text-center">{t('referred_short_why')}</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm">
                    <HeartPulse className="w-5 h-5 text-[#00a859]" />
                    <span className="text-xs font-bold text-slate-800 text-center">{t('referred_short_process')}</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm">
                    <Coins className="w-5 h-5 text-[#00a859]" />
                    <span className="text-xs font-bold text-slate-800 text-center">{t('referred_short_costs')}</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm col-span-2">
                    <ShieldAlert className="w-5 h-5 text-[#00a859]" />
                    <span className="text-xs font-bold text-slate-800 text-center">{t('referred_short_insurance')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="px-4 py-4 bg-white border-t border-slate-200 space-y-2 shrink-0">
              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                {t('referred_continue_learn')}
              </p>
              <button
                onClick={() => onChangeScreen(ScreenId.Education)}
                className="w-full py-3 bg-[#00a859] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20"
              >
                {t('step_learn_about_fh')}
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onChangeScreen(ScreenId.Home)}
                className="w-full py-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t('back_to_home')}
              </button>
            </div>
          </div>
        )}

        {/* ----------------- SCREEN 2: EDUCATION HUB ----------------- */}
        {activeScreen === ScreenId.Education && (
          isFHReferred && !onboardingCompleted ? (
              <div className={`flex-col flex flex-1 h-full overflow-hidden bg-slate-50 ${
                questionnaireTextSize === 'sm' ? 'education-text-sm' :
                questionnaireTextSize === 'lg' ? 'education-text-lg' :
                'education-text-md'
              }`}>
                {/* Dedicated Questionnaire Header */}
                <div className="bg-white px-3 py-2.5 border-b border-slate-100 flex items-center justify-between gap-1 shrink-0">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <button 
                      onClick={() => {
                        if (onboardingStep > 1) {
                          setOnboardingStep(onboardingStep - 1);
                        } else {
                          onChangeScreen(ScreenId.Home);
                        }
                      }} 
                      className="p-1.5 hover:bg-slate-100 rounded-full cursor-pointer transition flex items-center justify-center shrink-0"
                    >
                      <ArrowLeft className="w-5 h-5 text-slate-700" />
                    </button>
                    <span className={`font-extrabold text-slate-800 tracking-tight truncate ${
                      language === 'ta' ? 'text-[11.5px]' : 'text-[13.5px]'
                    }`}>
                      {t('title')}
                    </span>
                  </div>
                  <button 
                    id="onboarding-skip-btn"
                    onClick={() => handleCompleteOnboarding(true, 'skipped')}
                    className={`font-semibold bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition cursor-pointer select-none shrink-0 ${
                      language === 'ta' ? 'text-[9.5px] px-2 py-1' : 'text-xs px-3 py-1.5'
                    }`}
                  >
                    {t('btn_skip')}
                  </button>
                </div>

                {/* Questionnaire Text-Size Control */}
                <div className="bg-white px-4 py-2 border-b border-slate-100 flex items-center justify-between gap-2 shrink-0 flex-wrap">
                  <span className={`font-extrabold text-slate-500 uppercase tracking-tight select-none font-sans ${
                    language === 'ta' ? 'text-[9.5px]' : 'text-[10px]'
                  }`}>
                    {t('text_size_label')}
                  </span>
                  <div className="flex items-center gap-1 bg-slate-100/80 px-1 py-0.5 rounded-lg border border-slate-200 shrink-0">
                    <button
                      onClick={() => setQuestionnaireTextSize('sm')}
                      title="Small Text"
                      className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold transition cursor-pointer select-none ${
                        questionnaireTextSize === 'sm'
                          ? 'bg-white text-[#00a859] shadow-3xs border border-slate-200/40 font-black'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/30'
                      }`}
                    >
                      A-
                    </button>
                    <button
                      onClick={() => setQuestionnaireTextSize('md')}
                      title="Medium Text"
                      className={`px-1.5 py-0.5 rounded-md text-[10.5px] font-extrabold transition cursor-pointer select-none ${
                        questionnaireTextSize === 'md'
                          ? 'bg-white text-[#00a859] shadow-3xs border border-slate-200/40 font-black'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/30'
                      }`}
                    >
                      A
                    </button>
                    <button
                      onClick={() => setQuestionnaireTextSize('lg')}
                      title="Large Text"
                      className={`px-1.5 py-0.5 rounded-md text-[11.5px] font-extrabold transition cursor-pointer select-none ${
                        questionnaireTextSize === 'lg'
                          ? 'bg-white text-[#00a859] shadow-3xs border border-slate-200/40 font-black'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/30'
                      }`}
                    >
                      A+
                    </button>
                  </div>
                </div>

                {/* Questionnaire Content */}
                <div className="flex-1 flex flex-col bg-white text-slate-800 overflow-y-auto">
                  {/* Step Indicator and Content */}
                  <div className="flex-1 p-5 flex flex-col justify-between space-y-6">
                     {/* Progress Indicator */}
                    <div className="space-y-2">
                      <div className={`flex justify-between items-center text-slate-500 font-bold ${
                        language === 'ta' || language === 'ms' ? 'text-[9.5px]' : 'text-[11px]'
                      }`}>
                        <span>{t('question_indicator').replace('{step}', onboardingStep.toString())}</span>
                        <span className="text-[#00a859]">{t('percentage_complete').replace('{percent}', Math.round((onboardingStep / 3) * 100).toString())}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="bg-[#00a859] h-full transition-all duration-300" style={{ width: `${(onboardingStep / 3) * 100}%` }} />
                      </div>
                    </div>

                    {/* STEP 1: FAMILIARITY */}
                    {onboardingStep === 1 && (
                      <div className="flex-1 flex flex-col space-y-4 animate-fade-in text-left">
                        <div className="space-y-1">
                          <h3 className="font-bold text-[16px] text-slate-900 tracking-tight leading-snug">{t('step1_title')}</h3>
                          <p className="text-[11.5px] text-slate-500 leading-relaxed">
                            {t('step1_subtitle')}
                          </p>
                        </div>

                        <div className={`bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 flex items-center gap-2 text-slate-600 font-medium shrink-0 leading-normal ${
                          language === 'ta' ? 'text-[9.5px]' : 'text-[11px]'
                        }`}>
                          <Clock className="w-4 h-4 text-[#00a859] shrink-0" />
                          <span>{t('est_time_desc')}</span>
                        </div>

                        <div className="space-y-3 pt-2 flex-1">
                          <label className="block text-[12px] font-bold text-slate-800">
                            {t('step1_q')}
                          </label>
                          <div className="space-y-2">
                            {[
                              { id: 'new', label: t('step1_opt1_title'), desc: t('step1_opt1_desc') },
                              { id: 'little', label: t('step1_opt2_title'), desc: t('step1_opt2_desc') },
                              { id: 'research', label: t('step1_opt3_title'), desc: t('step1_opt3_desc') },
                              { id: 'advanced', label: t('step1_opt4_title'), desc: t('step1_opt4_desc') },
                            ].map((opt) => {
                              const isSelected = onboardingFamiliarity === opt.id;
                              return (
                                <button
                                  key={opt.id}
                                  onClick={() => setOnboardingFamiliarity(opt.id as any)}
                                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                                    isSelected
                                      ? 'bg-emerald-50/50 border-[#00a859] text-slate-900 shadow-xs'
                                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                                    isSelected ? 'border-[#00a859] bg-[#00a859]' : 'border-slate-300 bg-white'
                                  }`}>
                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                  </div>
                                  <div className="space-y-0.5 min-w-0 flex-1">
                                    <span className="text-[12px] font-bold text-slate-800 leading-tight block">{opt.label}</span>
                                    <span className="text-[10px] text-slate-500 leading-normal block">{opt.desc}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: TOPICS OF INTEREST */}
                    {onboardingStep === 2 && (
                      <div className="flex-1 flex flex-col space-y-4 animate-fade-in text-left">
                        <div className="space-y-1">
                          <h3 className="font-bold text-[16px] text-slate-900 tracking-tight leading-snug">{t('step2_q')}</h3>
                          <p className="text-[11.5px] text-slate-500 leading-relaxed">
                            {t('step2_sub')}
                          </p>
                        </div>

                        <div className={`grid gap-2.5 pt-1 overflow-y-auto max-h-[340px] pr-1 ${
                          language === 'ta' || language === 'ms' ? 'grid-cols-1' : 'grid-cols-2'
                        }`}>
                          {[
                            { id: 'topic-basics', icon: '🧬', label: t('step2_opt_basics') },
                            { id: 'topic-risk', icon: '❤️', label: t('step2_opt_risk') },
                            { id: 'topic-testing', icon: '🧪', label: t('step2_opt_testing') },
                            { id: 'topic-family', icon: '👨‍👩‍👧', label: t('step2_opt_family') },
                            { id: 'topic-treatment', icon: '💊', label: t('step2_opt_treatment') },
                            { id: 'topic-lifestyle', icon: '🥗', label: t('step2_opt_lifestyle') },
                            { id: 'topic-costs', icon: '💰', label: t('step2_opt_costs') },
                            { id: 'topic-insurance', icon: '🛡️', label: t('step2_opt_insurance') },
                            { id: 'topic-next', icon: '📋', label: t('step2_opt_testing_process') },
                            { id: 'topic-notsure', icon: '🤔', label: t('step2_opt_not_sure') },
                          ].map((opt) => {
                            const isSelected = onboardingTopics.includes(opt.id);
                            return (
                              <div
                                key={opt.id}
                                onClick={() => {
                                  if (isSelected) {
                                    setOnboardingTopics(onboardingTopics.filter(t => t !== opt.id));
                                  } else {
                                    if (opt.id === 'topic-notsure') {
                                      setOnboardingTopics(['topic-notsure']);
                                    } else {
                                      setOnboardingTopics([...onboardingTopics.filter(t => t !== 'topic-notsure'), opt.id]);
                                    }
                                  }
                                  setShowCascadeTooltip(false);
                                }}
                                className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between min-h-[56px] relative bg-white ${
                                  isSelected
                                    ? 'border-[#00a859] bg-emerald-50/40 ring-1 ring-[#00a859]/30 shadow-xs'
                                    : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                  }`}
                              >
                                <div className="flex items-center gap-2 min-w-0 flex-1 pr-1.5">
                                  <span className="text-[13px] shrink-0">{opt.icon}</span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center flex-wrap gap-1">
                                      <span className={`font-semibold text-slate-800 leading-tight ${
                                        language === 'ta' || language === 'ms' ? 'text-[11.5px]' : 'text-[11px]'
                                      }`}>
                                        {opt.label}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                                  isSelected ? 'bg-[#00a859] border-[#00a859] text-white' : 'border-slate-300 bg-white'
                                }`}>
                                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[4px]" />}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: CONCERNS */}
                    {onboardingStep === 3 && (
                      <div className="flex-1 flex flex-col space-y-4 animate-fade-in text-left">
                        <div className="space-y-1">
                          <h3 className="font-bold text-[16px] text-slate-900 tracking-tight leading-snug">{t('step3_q')}</h3>
                          <p className="text-[11.5px] text-slate-500 leading-relaxed">
                            {t('step3_sub')}
                          </p>
                        </div>

                        <div className="space-y-2 pt-1 overflow-y-auto max-h-[340px] pr-1">
                          {[
                            { id: 'concern-diagnosis', label: '😟 ' + t('concern_diagnosis_title'), desc: t('concern_diagnosis_desc') },
                            { id: 'concern-family', label: '👨‍👩‍👧 ' + t('concern_family_title'), desc: t('concern_family_desc') },
                            { id: 'concern-cost', label: '💰 ' + t('concern_cost_title'), desc: t('concern_cost_desc') },
                            { id: 'concern-test', label: '🧪 ' + t('concern_test_title'), desc: t('concern_test_desc') },
                            { id: 'concern-meds', label: '💊 ' + t('concern_meds_title'), desc: t('concern_meds_desc') },
                            { id: 'concern-[#00a859]', label: '❤️ ' + t('concern_heart_title'), desc: t('concern_heart_desc') },
                            { id: 'concern-insurance', label: '🛡️ ' + t('concern_insurance_title'), desc: t('concern_insurance_desc') },
                            { id: 'concern-curious', label: '😊 ' + t('concern_curious_title'), desc: t('concern_curious_desc') },
                          ].map((opt) => {
                            const isSelected = onboardingConcerns.includes(opt.id);
                            return (
                              <button
                                key={opt.id}
                                onClick={() => {
                                  if (isSelected) {
                                    setOnboardingConcerns(onboardingConcerns.filter(c => c !== opt.id));
                                  } else {
                                    setOnboardingConcerns([...onboardingConcerns, opt.id]);
                                  }
                                }}
                                className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 bg-white ${
                                  isSelected
                                    ? 'border-[#00a859] bg-emerald-50/40 shadow-xs'
                                    : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                }`}
                              >
                                <div className={`w-4 h-4 rounded border mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                                  isSelected ? 'bg-[#00a859] border-[#00a859] text-white' : 'border-slate-300 bg-white'
                                }}`}>
                                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[4px]" />}
                                </div>
                                <div className="space-y-0.5 min-w-0 flex-1">
                                  <span className="text-[12px] font-bold text-slate-800 leading-tight block">{opt.label}</span>
                                  <span className="text-[10px] text-slate-500 leading-normal block">{opt.desc}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-slate-100 shrink-0 font-sans">
                      {onboardingStep > 1 && (
                        <button
                          onClick={() => setOnboardingStep(onboardingStep - 1)}
                          className={`flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition cursor-pointer text-center select-none border border-slate-200 ${getButtonTextSizeClass(language)}`}
                        >
                          {t('btn_back')}
                        </button>
                      )}
                      
                      {onboardingStep < 3 ? (
                        <button
                          onClick={() => setOnboardingStep(onboardingStep + 1)}
                          className={`flex-1 bg-[#00a859] hover:bg-emerald-800 text-white rounded-xl font-bold shadow-xs transition cursor-pointer text-center select-none ${getButtonTextSizeClass(language)}`}
                        >
                          {t('btn_next')}
                        </button>
                      ) : (
                        <button
                          id="onboarding-finish-btn"
                          onClick={() => handleCompleteOnboarding(true, 'completed')}
                          className={`flex-1 bg-[#00a859] hover:bg-emerald-800 text-white rounded-xl font-bold shadow-xs transition cursor-pointer text-center select-none ${getButtonTextSizeClass(language)}`}
                        >
                          {t('btn_get_guide')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          ) : (
          <div className="flex-col flex flex-1 h-full overflow-hidden bg-slate-50">
              {/* Top Navigation */}
              <div className="bg-white px-3 py-2.5 border-b border-slate-200 flex items-center justify-between gap-1 shrink-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <button onClick={() => onChangeScreen(ScreenId.Home)} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer shrink-0">
                    <ArrowLeft className="w-4 h-4 text-slate-700" />
                  </button>
                  <span className="font-bold text-[13px] text-slate-800 truncate">{t('edu_hub_title')}</span>
                </div>
              </div>

              {/* Text Size Accessibility Control Bar */}
              <div className="bg-white px-3 py-1.5 border-b border-slate-200 flex items-center justify-between gap-2 shrink-0 select-none">
                <span className={`font-extrabold text-slate-500 uppercase tracking-tight select-none font-sans ${
                  language === 'ta' ? 'text-[9.5px]' : 'text-[10px]'
                }`}>
                  {t('text_size_label')}
                </span>
                <div className="flex items-center gap-1 bg-slate-100/80 px-1 py-0.5 rounded-lg border border-slate-200 shrink-0">
                  <button
                    onClick={() => setTextSize('sm')}
                    title="Small Text"
                    className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold transition cursor-pointer select-none ${
                      textSize === 'sm'
                        ? 'bg-white text-[#00a859] shadow-3xs border border-slate-200/40 font-black'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/30'
                    }`}
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setTextSize('md')}
                    title="Medium Text"
                    className={`px-1.5 py-0.5 rounded-md text-[10.5px] font-extrabold transition cursor-pointer select-none ${
                      textSize === 'md'
                        ? 'bg-white text-[#00a859] shadow-3xs border border-slate-200/40 font-black'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/30'
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setTextSize('lg')}
                    title="Large Text"
                    className={`px-1.5 py-0.5 rounded-md text-[11.5px] font-extrabold transition cursor-pointer select-none ${
                      textSize === 'lg'
                        ? 'bg-white text-[#00a859] shadow-3xs border border-slate-200/40 font-black'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/30'
                    }`}
                  >
                    A+
                  </button>
                </div>
              </div>

              {!isFHReferred ? (
                /* Fallback state when patient is not referred */
                <div className="flex-col flex flex-1 pb-12 items-center justify-center p-6 text-center space-y-4 my-auto">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                    <ShieldAlert className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-800">No Active Genetic Referrals</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[280px]">
                    This personalised educational hub is only visible for patients with an active clinical referral for FH genetic testing.
                  </p>
                  <button 
                    onClick={() => onChangeScreen(ScreenId.Home)} 
                    className="px-4 py-2.5 bg-[#00a859] hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition cursor-pointer"
                  >
                    Back to HealthHub Home
                  </button>
                </div>
              ) : (
                /* High-fidelity Education Hub content for referred patients */
                <div className={`flex-1 overflow-y-auto flex flex-col pb-6 ${
                  textSize === 'sm' ? 'education-text-sm' :
                  textSize === 'lg' ? 'education-text-lg' :
                  'education-text-md'
                }`}>
                {/* Profile Info Row */}
                <div className="bg-emerald-50/60 border-b border-emerald-100 px-4 py-2.5 flex justify-between items-center text-[11px] shrink-0">
                  <span className="text-slate-600">{t('patient_label')}: <strong className="text-slate-800">{patientName} ({patientNric})</strong></span>
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-extrabold border border-emerald-200/50">
                    {language === 'ms' ? 'Dirujuk MOH' :
                     language === 'zh' ? 'MOH 已转诊' :
                     language === 'ta' ? 'MOH பரிந்துரைக்கப்பட்டது' :
                     'MOH Referred'}
                  </span>
                </div>

                {/* Hero Section - Edge-to-edge Deep Teal Banner */}
                <div className="bg-[#00a859] text-white px-5 py-5 space-y-2 shrink-0">
                  <span className="text-[9.5px] font-bold tracking-widest text-emerald-100 font-mono uppercase">{t('edu_hi_greeting').replace('{name}', patientFirstName)}</span>
                  <h3 className="font-display font-extrabold text-sm text-white tracking-tight leading-snug">
                    {t('edu_learning_guide_title')}
                  </h3>
                  <p className="text-[11px] text-emerald-50/90 leading-relaxed font-sans">
                    {t('edu_learning_guide_subtitle')}
                  </p>

                  {/* Personalization Status Bar & Retake Hook */}
                  {onboardingCompleted ? (
                    <div className="bg-emerald-950/40 border border-emerald-400/20 rounded-xl p-2.5 flex flex-col gap-2 text-[10.5px]">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                        <span className="text-emerald-50 leading-tight">{t('feed_personalized')}</span>
                      </div>
                      <div className="flex justify-end border-t border-emerald-800/30 pt-1.5">
                        <button
                          onClick={handleRetakeOnboarding}
                          className="font-extrabold text-amber-300 hover:text-amber-200 uppercase tracking-wider font-mono text-[9px] hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                          {t('retake_onboarding')}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-emerald-950/25 border border-emerald-400/10 rounded-xl p-2.5 flex flex-col gap-2 text-[10.5px]">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5 animate-pulse" />
                        <span className="text-emerald-50/80 leading-tight">{t('personalize_feed_prompt')}</span>
                      </div>
                      <div className="flex justify-end border-t border-emerald-800/20 pt-1.5">
                        <button
                          onClick={handleRetakeOnboarding}
                          className="font-extrabold text-white bg-emerald-800 hover:bg-emerald-700 px-2 py-0.5 rounded uppercase tracking-wider font-mono text-[9.5px] cursor-pointer"
                        >
                          {t('btn_start')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Segmented Control Sub-Tabs */}
                <div className="px-4 pt-4 pb-1 bg-slate-50 shrink-0 border-b border-slate-200/40">
                  <div className="bg-slate-200/50 p-1 rounded-xl flex gap-1 border border-slate-200/30">
                    <button
                      id="edu-tab-guides"
                      onClick={() => {
                        setEduSubTab('guides');
                        setViewingChecklist(false);
                      }}
                      className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer leading-tight text-center ${
                        language === 'ta' || language === 'ms' ? 'text-[9.2px] px-0.5' : 'text-[10.5px] px-1'
                      } ${
                        eduSubTab === 'guides'
                          ? 'bg-[#00a859] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-800 bg-transparent hover:bg-slate-200/30'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      <span>{t('edu_tab_guides')}</span>
                    </button>
                    <button
                      id="edu-tab-checklist"
                      onClick={() => {
                        setEduSubTab('checklist');
                        setViewingChecklist(true);
                      }}
                      className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer leading-tight text-center ${
                        language === 'ta' || language === 'ms' ? 'text-[9.2px] px-0.5' : 'text-[10.5px] px-1'
                      } ${
                        eduSubTab === 'checklist'
                          ? 'bg-[#00a859] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-800 bg-transparent hover:bg-slate-200/30'
                      }`}
                    >
                      <CheckSquare className="w-3.5 h-3.5 shrink-0" />
                      <span>{t('edu_tab_checklist')}</span>
                    </button>
                    <button
                      id="edu-tab-faq"
                      onClick={() => {
                        setEduSubTab('faq');
                        setViewingChecklist(false);
                      }}
                      className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer leading-tight text-center ${
                        language === 'ta' || language === 'ms' ? 'text-[9.2px] px-0.5' : 'text-[10.5px] px-1'
                      } ${
                        eduSubTab === 'faq'
                          ? 'bg-[#00a859] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-800 bg-transparent hover:bg-slate-200/30'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{t('edu_tab_faqs')}</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {/* TAB 1: GUIDES & LEARNING HUB */}
                  {eduSubTab === 'guides' && (
                    <div className="space-y-4 animate-fade-in">
                      {/* Natural Clinical Note Banner */}
                      <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-xl p-3 flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-[#00a859] shrink-0 mt-0.5" />
                        <p className="text-[10px] text-emerald-800 leading-normal font-medium">
                          {t('edu_note')}
                        </p>
                      </div>

                      {/* Dynamic Video Recommendation Banner and Patient Experience Section */}
                      {(() => {
                        const activeStory = getPersonalizedStory(
                          onboardingFamiliarity,
                          onboardingTopics,
                          onboardingConcerns,
                          questionnaireStatus,
                          language
                        );
                        return (
                          <>
                            {onboardingCompleted && questionnaireStatus === 'completed' && (
                              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-start gap-2.5 shadow-3xs">
                                <Sparkles className="w-4 h-4 text-[#00a859] mt-0.5 shrink-0" />
                                <div className="space-y-0.5 text-left">
                                  <span className="text-[9px] font-extrabold text-emerald-800 uppercase tracking-widest font-mono">
                                    {language === 'ms' ? 'Disyorkan Untuk Anda' :
                                     language === 'zh' ? '为您推荐' :
                                     language === 'ta' ? 'உங்களுக்கு பரிந்துரைக்கப்படுகிறது' :
                                     'RECOMMENDED FOR YOU'}
                                  </span>
                                  <p className="text-[10.5px] text-slate-700 leading-normal">
                                    {language === 'ms' ? 'Disyorkan berdasarkan topik yang anda pilih.' :
                                     language === 'zh' ? '根据您选择的主题推荐。' :
                                     language === 'ta' ? 'நீங்கள் தேர்ந்தெடுத்த தலைப்புகளின் அடிப்படையில் பரிந்துரைக்கப்படுகிறது.' :
                                     'Recommended based on the topics you selected.'}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Patient Experience Wrapper Card */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3 text-left">
                              <div className="flex justify-between items-start gap-2">
                                <div className="space-y-0.5">
                                  <span className="text-[9px] font-extrabold text-[#00a859] uppercase tracking-widest font-mono">
                                    {language === 'ms' ? 'Pengalaman Pesakit' :
                                     language === 'zh' ? '患者体验故事' :
                                     language === 'ta' ? 'நோயாளி அனுபவம்' :
                                     'Patient Experience'}
                                  </span>
                                  <h4 className="font-display font-extrabold text-slate-900 text-[13px] leading-snug">
                                    {activeStory.title}
                                  </h4>
                                </div>
                                <div className="bg-slate-100 px-1.5 py-0.5 rounded text-[8.5px] font-mono font-bold text-slate-500 shrink-0">
                                  0:45
                                </div>
                              </div>

                              {activeStory.summary && (
                                <p className="text-[10.5px] text-slate-600 leading-relaxed">
                                  {activeStory.summary}
                                </p>
                              )}

                              {/* Patient Experience Video Section */}
                              <div className="bg-slate-900 rounded-2xl overflow-hidden relative shadow-md">
                                {/* Simulated Video Frame */}
                                <div className="h-44 flex flex-col items-center justify-center relative p-4 text-center">
                                  {isPlayingVideo ? (
                                    <div className="absolute inset-0 bg-emerald-950/85 flex flex-col justify-between p-4 text-white">
                                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 self-start">{activeStory.videoLabel}</span>
                                      
                                      {/* CSS cartoon animations based on active simulated frame */}
                                      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                                        <div className="animate-fade-in space-y-1">
                                          <span className="text-2xl">
                                            {videoFrame === 0 ? '💡' : videoFrame === 1 ? '🤝' : videoFrame === 2 ? '🛡️' : '❤️'}
                                          </span>
                                          <p className="text-[11px] font-semibold leading-normal">
                                            {activeStory.frames[videoFrame]}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Video progress indicator bar */}
                                      <div className="w-full flex items-center gap-2">
                                        <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                                          <div className="bg-emerald-400 h-full transition-all duration-300" style={{ width: `${(videoFrame + 1) * 25}%` }} />
                                        </div>
                                        <span className="text-[9px] font-mono">0:{(videoFrame + 1) * 11} / 0:45</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="absolute inset-0 bg-slate-900/90 flex flex-col justify-center items-center text-white p-4">
                                      <div className="w-12 h-12 rounded-full bg-[#00a859] hover:bg-emerald-500 flex items-center justify-center shadow-lg cursor-pointer transform active:scale-95 transition" onClick={() => setIsPlayingVideo(true)}>
                                        <Play className="w-6 h-6 text-white ml-0.5 fill-current" />
                                      </div>
                                      <h4 className="font-bold text-xs mt-3">{activeStory.title}</h4>
                                      <p className="text-[10px] text-slate-400 mt-1 max-w-[240px] leading-normal">{activeStory.subtitle}</p>
                                    </div>
                                  )}
                                </div>

                                {/* Video controls */}
                                <div className="bg-slate-950 px-4 py-2 flex justify-between items-center text-xs text-slate-300 border-t border-slate-800">
                                  <button 
                                    onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                                    className="text-emerald-400 font-bold hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                                  >
                                    {isPlayingVideo ? <><Pause className="w-3.5 h-3.5" /> {t('edu_pause_story')}</> : <><Play className="w-3.5 h-3.5" /> {t('edu_play_story')}</>}
                                  </button>
                                  
                                  <button 
                                    onClick={() => setShowTranscript(!showTranscript)}
                                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium transition cursor-pointer"
                                  >
                                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                                    {showTranscript ? t('edu_hide_transcript') : t('edu_view_transcript')}
                                  </button>
                                </div>
                              </div>

                              {/* Accessible Transcript Container */}
                              {showTranscript && (
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[10px] text-slate-600 leading-relaxed space-y-1.5 animate-fade-in">
                                  <p className="font-bold text-emerald-800 uppercase tracking-wider text-[8px] font-mono border-b border-slate-200 pb-1">{t('edu_video_transcript_title')}</p>
                                  {activeStory.transcript.map((para, index) => (
                                    <p key={index} className="leading-relaxed">{para}</p>
                                  ))}
                                </div>
                              )}
                            </div>
                          </>
                        );
                      })()}

                      {/* Spec 4: Statistics 2x2 Grid 'Did You Know?' */}
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">💡</span>
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#00a859] font-mono">{t('edu_did_you_know')}</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {/* Stat 1 */}
                          <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between shadow-3xs space-y-1.5">
                            <div className="text-xl">🇸🇬</div>
                            <div>
                              <h5 className="font-display font-extrabold text-[#00a859] text-[15px] leading-tight">1 in 250</h5>
                              <p className="font-bold text-[10px] text-slate-800 leading-snug">{t('edu_stat1_label')}</p>
                            </div>
                            <p className="text-[9.5px] text-slate-500 leading-relaxed">
                              {t('edu_stat1_body')}
                            </p>
                          </div>

                          {/* Stat 2 */}
                          <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between shadow-3xs space-y-1.5">
                            <div className="text-xl">🔍</div>
                            <div>
                              <h5 className="font-display font-extrabold text-[#00a859] text-[15px] leading-tight">~90%</h5>
                              <p className="font-bold text-[10px] text-slate-800 leading-snug font-sans">{t('edu_stat2_label')}</p>
                            </div>
                            <p className="text-[9.5px] text-slate-500 leading-relaxed font-sans">
                              {t('edu_stat2_body')}
                            </p>
                          </div>

                          {/* Stat 3 */}
                          <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between shadow-3xs space-y-1.5">
                            <div className="text-xl">❤️</div>
                            <div>
                              <h5 className="font-display font-extrabold text-[#00a859] text-[15px] leading-tight">Up to 80%</h5>
                              <p className="font-bold text-[10px] text-slate-800 leading-snug font-sans">{t('edu_stat3_label')}</p>
                            </div>
                            <p className="text-[9.5px] text-slate-500 leading-relaxed font-sans">
                              {t('edu_stat3_body')}
                            </p>
                          </div>

                          {/* Stat 4 */}
                          <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between shadow-3xs space-y-1.5">
                            <div className="text-xl">👥</div>
                            <div>
                              <h5 className="font-display font-extrabold text-[#00a859] text-[15px] leading-tight">1 in 2</h5>
                              <p className="font-bold text-[10px] text-slate-800 leading-snug font-sans">{t('edu_stat4_label')}</p>
                            </div>
                            <p className="text-[9.5px] text-slate-500 leading-relaxed font-sans">
                              {t('edu_stat4_body')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Learning Hub Accordions - Grouped */}
                      {(() => {
                        const useDefaultLayout = !onboardingCompleted || questionnaireStatus === 'skipped' || selectedGuideTopics.length === 0;

                        // Unified helpers for content richness, shared between Default Layout and Personalized Layout
                         const getCustomIllus = (id: string) => {
                           if (id === 'testing-process' || id === 'testing-guide' || id === 'genetic-testing') return (
                             <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-xl p-3 text-center my-2">
                               <div className="text-[9.5px] font-bold text-emerald-800 mb-1.5">{t('illus_clinical_testing_flow')}</div>
                               <div className="flex justify-between text-[8px] font-bold text-slate-500">
                                 <span>{t('illus_step_booked')}</span><span>{t('illus_step_consult')}</span><span>{t('illus_step_blood_draw')}</span><span>{t('illus_step_results')}</span>
                               </div>
                             </div>
                           );
                           if (id === 'costs-subsidies') return (
                             <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-xl p-3 space-y-1 my-2">
                               <div className="text-[9.5px] font-bold text-emerald-800">{t('illus_singapore_financing_model')}</div>
                               <div className="flex justify-between text-[8.5px]"><span>{t('illus_government_subsidy')}</span><span className="text-[#00a859] font-bold">{t('illus_up_to_75_covered')}</span></div>
                             </div>
                           );
                           if (id === 'insurance-rights' || id === 'insurance') return (
                             <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-xl p-3 my-2">
                               <div className="text-[9.5px] font-bold text-emerald-800 mb-1">{t('illus_consumer_safeguard_grid')}</div>
                               <div className="text-[8.5px] text-slate-600">{t('illus_active_policies_note')}</div>
                             </div>
                           );
                           if (id === 'treatment-medication' || id === 'medication-fh') return (
                             <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-xl p-3 my-2">
                               <div className="text-[9.5px] font-bold text-emerald-800 mb-1">{t('illus_liver_ldl_clearance')}</div>
                               <div className="text-[8.5px] text-slate-600">{t('illus_statins_boost_note')}</div>
                             </div>
                           );
                           if (id === 'cascade-screening' || id === 'why-testing-matters') return (
                             <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-xl p-2.5 text-center my-2 space-y-1.5">
                               <div className="text-[9.5px] font-bold text-emerald-800">{t('illus_family_cascade_tree')}</div>
                               <div className="flex flex-col items-center space-y-1 text-[8.5px] text-slate-700">
                                 <div className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">{t('illus_index_patient')}</div>
                                 <div className="text-slate-400 font-mono text-[8px] leading-none">{t('illus_inheritance_prob')}</div>
                                 <div className="flex gap-2 justify-center">
                                   <div className="bg-slate-100 font-medium px-1.5 py-0.5 rounded border border-slate-200">{t('illus_parents')}</div>
                                   <div className="bg-slate-100 font-medium px-1.5 py-0.5 rounded border border-slate-200">{t('illus_siblings')}</div>
                                   <div className="bg-slate-100 font-medium px-1.5 py-0.5 rounded border border-slate-200">{t('illus_children')}</div>
                                 </div>
                               </div>
                             </div>
                           );
                           if (id === 'what-is-fh') return (
                             <div className="grid grid-cols-2 gap-2 my-2">
                               <div className="bg-slate-50 border border-slate-150 p-2 rounded-lg text-center">
                                 <div className="text-[8.5px] font-extrabold text-slate-500 uppercase tracking-tight">{t('illus_standard_high_cholesterol')}</div>
                                 <div className="text-[8.5px] text-slate-600 mt-1">{t('illus_standard_desc')}</div>
                               </div>
                               <div className="bg-emerald-50/50 border border-emerald-100/60 p-2 rounded-lg text-center">
                                 <div className="text-[8.5px] font-extrabold text-emerald-700 uppercase tracking-tight">{t('illus_fh_familial')}</div>
                                 <div className="text-[8.5px] text-emerald-800 mt-1">{t('illus_fh_desc')}</div>
                                </div>
                             </div>
                           );
                           if (id === 'heart-health') return (
                             <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-xl p-2.5 my-2">
                               <div className="text-[9.5px] font-bold text-emerald-800 mb-1.5 text-center">{t('illus_lipids_over_time')}</div>
                               <div className="flex items-center justify-between text-[7.5px] font-bold text-slate-500 relative">
                                 <div className="flex flex-col items-center">
                                   <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mb-1"></span>
                                   <span>{t('illus_birth_clear')}</span>
                                 </div>
                                 <div className="h-0.5 bg-slate-200 flex-1 mx-1 -mt-3"></div>
                                 <div className="flex flex-col items-center">
                                   <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mb-1"></span>
                                   <span>{t('illus_adulthood_plaque')}</span>
                                 </div>
                                 <div className="h-0.5 bg-slate-200 flex-1 mx-1 -mt-3"></div>
                                 <div className="flex flex-col items-center">
                                   <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mb-1"></span>
                                   <span>{t('illus_early_treatment_safe')}</span>
                                 </div>
                               </div>
                             </div>
                           );
                           if (id === 'healthy-lifestyle' || id === 'lifestyle') return (
                             <div className="grid grid-cols-3 gap-1.5 my-2">
                               <div className="bg-white border border-slate-150 p-1.5 rounded-lg text-center space-y-0.5 shadow-3xs">
                                 <span className="text-xs">🍎</span>
                                 <div className="text-[7.5px] font-extrabold text-slate-700">{t('illus_fiber')}</div>
                                 <div className="text-[7px] text-slate-400 leading-tight">{t('illus_fiber_desc')}</div>
                               </div>
                               <div className="bg-white border border-slate-150 p-1.5 rounded-lg text-center space-y-0.5 shadow-3xs">
                                 <span className="text-xs">🚫</span>
                                 <div className="text-[7.5px] font-extrabold text-slate-700">{t('illus_limits')}</div>
                                 <div className="text-[7px] text-slate-400 leading-tight">{t('illus_limits_desc')}</div>
                               </div>
                               <div className="bg-white border border-slate-150 p-1.5 rounded-lg text-center space-y-0.5 shadow-3xs">
                                 <span className="text-xs">🏃‍♂️</span>
                                 <div className="text-[7.5px] font-extrabold text-slate-700">{t('illus_active')}</div>
                                 <div className="text-[7px] text-slate-400 leading-tight">{t('illus_active_desc')}</div>
                               </div>
                             </div>
                           );
                           return null;
                         };

                        const getRelatedFaq = (id: string) => {
                          if (id === 'testing-process' || id === 'testing-guide' || id === 'genetic-testing') return { q: t('edu_faq_testing_q'), a: t('edu_faq_testing_a') };
                          if (id === 'costs-subsidies') return { q: t('edu_faq_costs_q'), a: t('edu_faq_costs_a') };
                          if (id === 'insurance-rights' || id === 'insurance') return { q: t('edu_faq_insurance_q'), a: t('edu_faq_insurance_a') };
                          if (id === 'treatment-medication' || id === 'medication-fh') return { q: t('edu_faq_meds_q'), a: t('edu_faq_meds_a') };
                          return null;
                        };

                        const getRecommendedResource = (id: string) => {
                          const targetResId = (() => {
                            if (id === 'testing-process' || id === 'testing-guide' || id === 'genetic-testing') return 'res-8';
                            if (id === 'costs-subsidies') return 'res-5';
                            if (id === 'insurance-rights' || id === 'insurance') return 'res-9';
                            if (id === 'treatment-medication' || id === 'medication-fh') return 'res-4';
                            return null;
                          })();
                          return targetResId ? helpfulResources.find(r => r.id === targetResId) : null;
                        };

                        const getPersonalizedNote = (id: string) => {
                          let note = "";
                          if ((id === 'cascade-screening' || id === 'why-testing-matters') && onboardingConcerns.includes('concern-family')) {
                            note = t('edu_note_cascade');
                          } else if (id === 'costs-subsidies' && onboardingConcerns.includes('concern-cost')) {
                             note = t('edu_note_costs');
                          } else if ((id === 'insurance-rights' || id === 'insurance') && onboardingConcerns.includes('concern-insurance')) {
                            note = t('edu_note_insurance');
                          } else if ((id === 'treatment-medication' || id === 'medication-fh') && onboardingConcerns.includes('concern-meds')) {
                            note = t('edu_note_meds');
                          }
                          if (!note) return null;
                          return (
                            <div className="bg-emerald-50 border border-emerald-100/50 p-2.5 rounded-lg text-emerald-800 text-[9px] font-medium leading-relaxed">
                              🛡️ <span className="font-bold">{t('edu_personalized_support_prefix')}</span> {note}
                            </div>
                          );
                        };

                        const renderGuideCard = (topic: any, isSelected: boolean) => {
                          const isExpanded = isSelected ? !!eduExpanded[topic.id] : expandedOtherTopicId === topic.id;

                          const toggleCard = () => {
                            if (isSelected) {
                              setEduExpanded(prev => ({ ...prev, [topic.id]: !prev[topic.id] }));
                            } else {
                              setExpandedOtherTopicId(isExpanded ? null : topic.id);
                            }
                          };

                          const customIllus = getCustomIllus(topic.id);
                          const relatedFaq = getRelatedFaq(topic.id);
                          const res = getRecommendedResource(topic.id);

                          return (
                            <div key={topic.id} className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-3xs transition-all duration-200 text-left">
                              <button onClick={toggleCard} aria-expanded={isExpanded} className="w-full text-left p-3.5 flex items-start gap-3 justify-between hover:bg-slate-50/55 transition cursor-pointer">
                                <div className="flex gap-3 items-start flex-1 min-w-0">
                                  <div className="mt-0.5 p-1.5 bg-emerald-50/70 rounded-lg border border-emerald-100/40 shrink-0 flex items-center justify-center">
                                    {getIcon(topic.iconName || 'HelpCircle')}
                                  </div>
                                  <div className="flex-1 min-w-0 space-y-0.5">
                                    <h5 className="font-display font-extrabold text-[11px] text-slate-900 leading-tight tracking-tight">{topic.title}</h5>
                                    <p className="text-[10px] text-slate-500 leading-relaxed">{topic.shortSummary}</p>
                                    {!isExpanded && (
                                      <div className="flex items-center justify-between pt-1 w-full">
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-[8px] bg-slate-50 text-slate-400 font-medium px-1.5 py-0.5 rounded border border-slate-200/30">{topic.readingTime}</span>
                                          {isSelected && (
                                            <span className="text-[8px] bg-emerald-50 text-emerald-600 font-bold px-1.5 py-0.5 rounded border border-emerald-100/30">{t('edu_selected_for_you')}</span>
                                          )}
                                        </div>
                                        {!isSelected && (
                                          <span className="text-[9.5px] font-extrabold text-[#00a859] flex items-center gap-0.5">
                                            {t('step2_opt_learn_more') || 'Learn More'} <ChevronRight className="w-3 h-3" />
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''} self-start mt-0.5`} />
                              </button>

                              {isExpanded && (
                                <div className="px-3.5 pb-3.5 pt-2.5 border-t border-slate-100 bg-slate-50/50 text-[10.5px] text-slate-600 leading-relaxed space-y-3">
                                  {/* 1 short introduction sentence */}
                                  <p className="text-slate-700 font-medium text-[10px] leading-normal font-sans">
                                    {topic.content}
                                  </p>

                                  {/* up to 3 short points or visual items */}
                                  {topic.visualItems && topic.visualItems.length > 0 && (
                                    <div className="grid grid-cols-1 gap-2 my-2">
                                      {topic.visualItems.map((item: any, itemIdx: number) => (
                                        <div key={itemIdx} className="bg-white border border-slate-200/50 rounded-xl p-2.5 flex items-start gap-3 shadow-3xs transition hover:border-emerald-200/50">
                                          <div className="text-sm shrink-0 leading-none mt-0.5 select-none bg-slate-50 border border-slate-100 p-1 rounded-lg w-7 h-7 flex items-center justify-center">
                                            {item.icon}
                                          </div>
                                          <div className="space-y-0.5 flex-1 min-w-0 text-left">
                                            <h6 className="font-bold text-[10px] text-slate-900 leading-tight">
                                              {item.label}
                                            </h6>
                                            <p className="text-[9px] text-slate-500 leading-normal">
                                              {item.text}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Reassuring support note */}
                                  {getPersonalizedNote(topic.id)}

                                  {/* Only render old steps if no visualItems are present to avoid duplication */}
                                  {(!topic.visualItems || topic.visualItems.length === 0) && topic.steps && topic.steps.length > 0 && (
                                    <div className="relative pl-4 border-l-2 border-emerald-100 my-3 ml-2 space-y-3">
                                      {topic.steps.map((st: any) => (
                                        <div key={st.num} className="relative">
                                          <div className="absolute -left-[22px] top-0.5 w-4 h-4 rounded-full bg-[#00a859] text-white flex items-center justify-center text-[9px] font-extrabold ring-4 ring-slate-50">{st.num}</div>
                                          <div className="space-y-0.5">
                                            <h6 className="font-bold text-[9.5px] text-slate-800">{st.title}</h6>
                                            <p className="text-[9px] text-slate-500 leading-normal">{st.description}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Only render old subsections if no visualItems are present */}
                                  {(!topic.visualItems || topic.visualItems.length === 0) && topic.subsections && topic.subsections.length > 0 && (
                                    <div className="space-y-2 my-2">
                                      {topic.subsections.map((sub: any, sIdx: number) => (
                                        <div key={sIdx} className="bg-white border border-slate-150 p-2.5 rounded-lg shadow-3xs space-y-1">
                                          <h6 className="font-bold text-[9px] text-[#00a859] tracking-wider uppercase font-sans">{sub.title}</h6>
                                          <p className="text-[9.5px] text-slate-600 leading-relaxed font-sans">{sub.text}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {customIllus}

                                  {/* 1 short Key Takeaway */}
                                  <div className="border-l-4 border-emerald-500 bg-emerald-50/60 px-2.5 py-1.5 rounded-r-lg">
                                    <p className="font-bold text-[8.5px] text-emerald-900 uppercase tracking-tight font-mono">{t('edu_key_takeaway') || 'Key Takeaway'}</p>
                                    <p className="text-emerald-800 text-[9.5px] mt-0.5 leading-normal">{topic.keyTakeaway}</p>
                                  </div>

                                  {!isSelected && (
                                    <div className="flex justify-end pt-1">
                                      <button onClick={(e) => { e.stopPropagation(); setExpandedOtherTopicId(null); }} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[9.5px] font-extrabold rounded-lg transition">
                                        {t('step2_opt_show_less') || 'Show Less'}
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        };

                        if (useDefaultLayout) {
                          return (
                            <div className="space-y-3.5">
                              <div className="flex justify-between items-center">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">{t('edu_learning_hub')}</h4>
                                <span className="text-[10px] text-slate-500 font-medium">{t('edu_modules_summary')}</span>
                              </div>

                              {sortedGroups.map((group) => {
                                const isGroupExpanded = !!expandedGroups[group.id];
                                return (
                                  <div key={group.id} className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden transition-all duration-250 text-left">
                                    <button onClick={() => toggleGroup(group.id)} className={`w-full text-left p-4 flex items-center justify-between transition-colors cursor-pointer ${isGroupExpanded ? 'bg-slate-50/70 border-b border-slate-100' : 'hover:bg-slate-50/30'}`}>
                                      <div className="flex gap-3.5 items-center flex-1 min-w-0">
                                        <div className="p-2 bg-emerald-50 rounded-full border border-emerald-100/55 shrink-0 flex items-center justify-center">{getIcon(group.icon || 'HelpCircle')}</div>
                                        <div className="flex-1 min-w-0 space-y-0.5">
                                          <div className="flex items-center gap-2">
                                            <h4 className="font-display font-extrabold text-[12px] text-slate-900 leading-tight tracking-tight">{group.title}</h4>
                                            <span className="text-[8.5px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md border border-emerald-100/35 shrink-0">{group.sectionIds.length} {t('edu_topics')}</span>
                                          </div>
                                          <p className="text-[10.5px] text-slate-500 leading-relaxed">{group.description}</p>
                                        </div>
                                      </div>
                                      <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-250 ${isGroupExpanded ? 'rotate-180' : ''} ml-2`} />
                                    </button>

                                    {isGroupExpanded && (
                                      <div className="p-3 bg-slate-50/40 space-y-2.5 border-t border-slate-100 animate-fade-in">
                                        {group.sectionIds.map((secId) => {
                                          let sec: any = null;
                                          const idMapping: Record<string, string> = {
                                            'what-is-fh': 'what-is-fh',
                                            'why-testing-matters': 'cascade-screening',
                                            'genetic-testing': 'genetic-testing',
                                            'heart-health': 'heart-health',
                                            'medication-fh': 'treatment-medication',
                                            'healthy-lifestyle': 'healthy-lifestyle',
                                            'testing-guide': 'testing-process',
                                            'costs-subsidies': 'costs-subsidies',
                                            'insurance-rights': 'insurance'
                                          };

                                          if (questionnaireStatus === 'completed') {
                                            const mappedId = idMapping[secId] || secId;
                                            const level = onboardingFamiliarity || 'new';
                                            const pGuide = getPersonalisedGuideContent(mappedId, level, onboardingConcerns, language);
                                            sec = {
                                              id: secId,
                                              title: pGuide.title,
                                              shortSummary: pGuide.shortSummary,
                                              readingTime: pGuide.readingTime,
                                              iconName: pGuide.iconName || 'BookOpen',
                                              keyTakeaway: pGuide.keyTakeaway,
                                              content: pGuide.content,
                                              visualItems: pGuide.visualItems
                                            };
                                          } else {
                                            sec = getLocalizedEducationalSections(language).find(s => s.id === secId);
                                          }

                                          if (!sec) return null;
                                          const isExpanded = !!eduExpanded[sec.id];
                                          let displayTitle = sec.title;
                                          let displaySubtitle = sec.shortSummary;

                                          if (language === 'en' && questionnaireStatus !== 'completed') {
                                            if (sec.id === 'what-is-fh') { displayTitle = isExpanded ? 'What is FH?' : 'Understanding FH'; displaySubtitle = isExpanded ? 'Familial Hypercholesterolaemia (FH) is a common genetic condition.' : 'What FH is and why early diagnosis matters.'; }
                                            else if (sec.id === 'fh-symptoms') { displayTitle = isExpanded ? 'Symptoms & Physical Signs' : 'Visible Physical Signs'; displaySubtitle = isExpanded ? 'Learn the three main visible indicators of inherited high cholesterol on the body.' : 'Identify waxy deposits and yellow patches.'; }
                                            else if (sec.id === 'testing-guide') { displayTitle = 'Your Testing Guide'; displaySubtitle = isExpanded ? 'Six straightforward steps from referral to your personal care plan.' : 'Step by step from counselling to your results.'; }
                                            else if (sec.id === 'medication-fh') { displayTitle = 'Medication & FH'; displaySubtitle = isExpanded ? 'Highly effective, subsidized medical therapies.' : 'How statins work and what to expect.'; }
                                            else if (sec.id === 'why-testing-matters') { displayTitle = 'Protecting Your Family'; displaySubtitle = isExpanded ? 'Confirming FH unlocks personalised care.' : 'How cascade screening keeps your loved ones safe.'; }
                                            else if (sec.id === 'costs-subsidies') { displayTitle = 'Costs and Subsidies'; displaySubtitle = isExpanded ? 'Up to 75% MOH subsidies.' : 'What you pay and how subsidies and MediSave help.'; }
                                            else if (sec.id === 'insurance-rights') { displayTitle = 'Insurance & Your Rights'; displaySubtitle = isExpanded ? 'National guidelines safeguard your right.' : 'How the LIA Moratorium protects you.'; }
                                          }

                                          return (
                                            <div key={sec.id} className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-3xs transition-all duration-200">
                                              <button onClick={() => toggleEdu(sec.id)} className="w-full text-left p-3.5 flex items-start gap-3 justify-between hover:bg-slate-50/55 transition cursor-pointer">
                                                <div className="flex gap-3 items-start flex-1 min-w-0">
                                                  <div className="mt-0.5 p-1.5 bg-emerald-50/70 rounded-lg border border-emerald-100/40 shrink-0 flex items-center justify-center">{getIcon(sec.iconName || 'HelpCircle')}</div>
                                                  <div className="flex-1 min-w-0 space-y-0.5">
                                                    <h5 className="font-display font-extrabold text-[11px] text-slate-900 leading-tight tracking-tight">{displayTitle}</h5>
                                                    <p className="text-[10px] text-slate-500 leading-relaxed">{displaySubtitle}</p>
                                                    {!isExpanded && sec.tags && sec.tags.length > 0 && (
                                                      <div className="flex flex-wrap gap-1 pt-1">
                                                        {sec.tags.map((tag, tIdx) => (
                                                          <span key={tIdx} className="text-[8px] bg-slate-50 text-slate-400 font-medium px-1.5 py-0.5 rounded border border-slate-200/30">{tag}</span>
                                                        ))}
                                                      </div>
                                                    )}
                                                  </div>
                                                </div>
                                                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''} self-start mt-0.5`} />
                                              </button>

                                              {isExpanded && (() => {
                                                const isCoreSection = sec.id === 'what-is-fh' || sec.id === 'why-testing-matters';
                                                const isSelectedSection = isSectionRecommended(sec.id);
                                                const shouldShowFullDepth = !onboardingCompleted || isCoreSection || isSelectedSection || !!forceFullExpand[sec.id];

                                                if (!shouldShowFullDepth) {
                                                  let summaryText = sec.id === 'testing-guide' ? (t('edu_testing_guide_summary') || "Your journey is fully structured, covering counselling and blood draw.") : sec.shortSummary;
                                                  let readingTimeLabel = sec.readingTime || "1-min read";
                                                  return (
                                                    <div className="px-3.5 pb-3.5 pt-2.5 border-t border-slate-100 bg-slate-50/50 text-[10.5px] text-slate-600 leading-relaxed space-y-2.5 text-left">
                                                      <p className="text-slate-600 font-sans leading-relaxed text-[10.5px] font-medium">{summaryText}</p>
                                                      <div className="flex items-center justify-between pt-1">
                                                        <span className="text-[9px] text-slate-400 font-mono font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> {readingTimeLabel}</span>
                                                        <button onClick={(e) => { e.stopPropagation(); setForceFullExpand(prev => ({ ...prev, [sec.id]: true })); }} className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#00a859] font-extrabold text-[9.5px] rounded-lg border border-emerald-100/40 cursor-pointer">{t('step2_opt_learn_more') || 'Learn More'}</button>
                                                      </div>
                                                    </div>
                                                  );
                                                }

                                                return (
                                                  <div className="px-3.5 pb-3.5 pt-2.5 border-t border-slate-100 bg-slate-50/50 text-[10.5px] text-slate-600 leading-relaxed space-y-3.5 text-left animate-fade-in">
                                                    {/* 1 short introduction sentence */}
                                                    <p className="text-slate-700 font-medium text-[10px] leading-normal font-sans">
                                                      {sec.content}
                                                    </p>

                                                    {/* up to 3 short points or visual items */}
                                                    {sec.visualItems && sec.visualItems.length > 0 && (
                                                      <div className="grid grid-cols-1 gap-2 my-2">
                                                        {sec.visualItems.map((item: any, itemIdx: number) => (
                                                          <div key={itemIdx} className="bg-white border border-slate-200/50 rounded-xl p-2.5 flex items-start gap-3 shadow-3xs transition hover:border-emerald-200/50">
                                                            <div className="text-sm shrink-0 leading-none mt-0.5 select-none bg-slate-50 border border-slate-100 p-1 rounded-lg w-7 h-7 flex items-center justify-center">
                                                              {item.icon}
                                                            </div>
                                                            <div className="space-y-0.5 flex-1 min-w-0 text-left">
                                                              <h6 className="font-bold text-[10px] text-slate-900 leading-tight">
                                                                {item.label}
                                                              </h6>
                                                              <p className="text-[9px] text-slate-500 leading-normal">
                                                                {item.text}
                                                              </p>
                                                            </div>
                                                          </div>
                                                        ))}
                                                      </div>
                                                    )}

                                                    {/* Unified Support Notes */}
                                                    {getPersonalizedNote(sec.id)}

                                                    {/* Only render old steps if no visualItems are present to avoid duplication */}
                                                    {(!sec.visualItems || sec.visualItems.length === 0) && sec.steps && sec.steps.length > 0 && (
                                                      <div className="relative pl-4 border-l-2 border-emerald-100 my-4 ml-2 space-y-3.5">
                                                        {sec.steps.map((st) => (
                                                          <div key={st.num} className="relative">
                                                            <div className="absolute -left-[22px] top-0.5 w-4 h-4 rounded-full bg-[#00a859] text-white flex items-center justify-center text-[9px] font-extrabold ring-4 ring-slate-50">{st.num}</div>
                                                            <div className="space-y-0.5">
                                                              <h6 className="font-bold text-[9.5px] text-slate-800">{st.title}</h6>
                                                              <p className="text-[9px] text-slate-500 leading-normal">{st.description}</p>
                                                            </div>
                                                          </div>
                                                        ))}
                                                      </div>
                                                    )}

                                                    {/* Only render old subsections if no visualItems are present */}
                                                    {(!sec.visualItems || sec.visualItems.length === 0) && sec.subsections && sec.subsections.length > 0 && (
                                                      <div className="space-y-2 my-2">
                                                        {sec.subsections.map((sub: any, sIdx: number) => (
                                                          <div key={sIdx} className="bg-white border border-slate-150 p-2.5 rounded-lg shadow-3xs space-y-1">
                                                            <h6 className="font-bold text-[9px] text-[#00a859] tracking-wider uppercase font-sans">{sub.title}</h6>
                                                            <p className="text-[9.5px] text-slate-600 leading-relaxed font-sans">{sub.text}</p>
                                                          </div>
                                                        ))}
                                                      </div>
                                                    )}

                                                    {/* Unified custom illustration diagrams */}
                                                    {getCustomIllus(sec.id)}

                                                    {/* 1 short Key Takeaway */}
                                                    <div className="border-l-4 border-emerald-500 bg-emerald-50/60 px-2.5 py-1.5 rounded-r-lg">
                                                      <p className="font-bold text-[8.5px] text-emerald-900 uppercase tracking-tight font-mono">{t('edu_key_takeaway')}</p>
                                                      <p className="text-emerald-800 text-[10px] mt-0.5 leading-normal">{sec.keyTakeaway}</p>
                                                    </div>
                                                  </div>
                                                );
                                              })()}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }

                        // Personalized Layout
                        return (
                          <div className="space-y-5 text-left">
                            {/* Section 1: Selected for You */}
                            {selectedGuideTopics.length > 0 && (
                              <div className="space-y-3">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                  <h4 className="text-[12px] font-extrabold text-slate-900 font-display tracking-tight flex items-center gap-1.5">✨ {t('edu_selected_for_you')}</h4>
                                  <span className="text-[9.5px] bg-emerald-50 text-[#00a859] px-2 py-0.5 rounded-full font-bold border border-emerald-100/50">{t('edu_personalised_badge')}</span>
                                </div>
                                <div className="space-y-3">
                                  {selectedGuideTopics.map(topic => renderGuideCard(topic, true))}
                                </div>
                              </div>
                            )}

                             {/* Section 2: Other Topics You Can Explore */}
                             {unselectedGuideTopics.length > 0 && (
                               <div className="pt-2 border-t border-slate-100/60">
                                 <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 transition-all duration-200 text-left">
                                   <div className="flex items-center justify-between gap-2">
                                     <div className="space-y-0.5">
                                       <h4 className="text-[11.5px] font-extrabold text-slate-800 font-display tracking-tight flex items-center gap-1.5">
                                         📚 {t('step2_opt_other_topics') || 'Other Topics You Can Explore'}
                                       </h4>
                                       <p className="text-[9.5px] text-slate-500 leading-relaxed font-medium">
                                         {t('step2_opt_other_topics_desc') || 'More FH topics are available whenever you are ready.'}
                                       </p>
                                     </div>
                                     <button
                                       onClick={() => setShowOtherTopics(!showOtherTopics)}
                                       aria-expanded={showOtherTopics}
                                       className="flex items-center gap-1 text-[10px] font-extrabold text-[#00a859] hover:text-[#008f4c] transition cursor-pointer shrink-0 py-1 px-2 border border-emerald-100/50 hover:bg-emerald-50/30 rounded-lg"
                                     >
                                       <span>{showOtherTopics ? (t('step2_opt_minimise') || 'Minimise') : (t('step2_opt_view_other_topics') || 'View Other Topics')}</span>
                                       <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showOtherTopics ? 'rotate-180' : ''}`} />
                                     </button>
                                   </div>

                                   {showOtherTopics && (
                                     <div className="space-y-3 pt-3 mt-3 border-t border-slate-100 animate-fade-in">
                                       {unselectedGuideTopics.map(topic => renderGuideCard(topic, false))}
                                     </div>
                                   )}
                                 </div>
                               </div>
                             )}
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* TAB 2: MY CHECKLIST */}
                  {eduSubTab === 'checklist' && (
                    <div className="space-y-4 animate-fade-in">
                      {/* Checklist Progress Bar */}
                      {(() => {
                        const completedCount = checklist.filter(item => item.checked).length;
                        const totalCount = checklist.length;
                        const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
                        return (
                          <div className="bg-emerald-50/40 border border-emerald-100/60 rounded-xl p-3.5 space-y-2">
                            <div className="flex justify-between text-[11px] text-slate-700 font-bold">
                              <span>{t('edu_checklist_progress_title')}</span>
                              <span className="text-emerald-700">
                                {t('edu_checklist_progress_detail')
                                  .replace('{completed}', String(completedCount))
                                  .replace('{total}', String(totalCount))
                                  .replace('{percent}', String(percent))}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-200/75 rounded-full overflow-hidden">
                              <div className="bg-[#00a859] h-full transition-all duration-300" style={{ width: `${percent}%` }} />
                            </div>
                            {percent === 100 ? (
                              <p className="text-[10px] text-emerald-800 font-medium flex items-center gap-1">
                                <span className="text-emerald-600 font-bold">✓</span> {t('edu_checklist_progress_success')}
                              </p>
                            ) : (
                              <p className="text-[10px] text-slate-500 leading-normal">
                                {t('edu_checklist_progress_desc')}
                              </p>
                            )}
                          </div>
                        );
                      })()}

                      {/* Pre-counselling Preparation Checklist Card */}
                      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-1.5">
                            <CheckSquare className="w-4 h-4 text-[#00a859]" />
                            <h4 className="font-bold text-xs text-slate-800 font-sans">{t('edu_checklist_card_title')}</h4>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                          {t('edu_checklist_card_desc')}
                        </p>
                        <div className="space-y-4">
                          {/* 1. Selected for You (Personalised Items) */}
                          {onboardingCompleted && checklist.some(item => item.isPersonalized) && (
                            <div className="space-y-2.5">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                                <span className="text-[10px] font-extrabold text-slate-950 flex items-center gap-1">✨ {t('edu_selected_for_you')}</span>
                                <span className="text-[8px] font-bold bg-emerald-50 text-[#00a859] px-1.5 py-0.5 rounded border border-emerald-100/40">{t('edu_personalised_badge') || 'Personalised'}</span>
                              </div>
                              <div className="space-y-2">
                                {checklist.filter(item => item.isPersonalized).map((item) => (
                                  <button
                                    key={item.id}
                                    onClick={() => toggleChecklist(item.id)}
                                    className="w-full text-left flex gap-2.5 items-start text-xs text-slate-700 hover:text-slate-900 transition cursor-pointer"
                                  >
                                    {item.checked ? (
                                      <CheckSquare className="w-4 h-4 text-[#00a859] mt-0.5 shrink-0" />
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
                          )}

                          {/* 2. Essential Requirements / General */}
                          <div className="space-y-2.5">
                            {onboardingCompleted && checklist.some(item => item.isPersonalized) && (
                              <div className="flex items-center border-b border-slate-100 pb-1.5 pt-1">
                                <span className="text-[10px] font-extrabold text-slate-500">📋 {t('edu_checklist_essential_prep')}</span>
                              </div>
                            )}
                            <div className="space-y-2">
                              {checklist.filter(item => !item.isPersonalized).map((item) => (
                                <button
                                  key={item.id}
                                  onClick={() => toggleChecklist(item.id)}
                                  className="w-full text-left flex gap-2.5 items-start text-xs text-slate-700 hover:text-slate-900 transition cursor-pointer"
                                >
                                  {item.checked ? (
                                    <CheckSquare className="w-4 h-4 text-[#00a859] mt-0.5 shrink-0" />
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
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: FAQS & RESOURCES */}
                  {eduSubTab === 'faq' && (
                    <div className="space-y-4 animate-fade-in">
                      {/* FAQ Accordion Section */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">{t('faq_title').toUpperCase()}</h4>
                        </div>

                        {/* Category Filter Tabs */}
                        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                          {[
                            { id: 'all', label: t('faq_category_all') },
                            { id: 'cost', label: t('faq_category_cost') },
                            { id: 'insurance', label: t('faq_category_insurance') },
                            { id: 'testing', label: t('faq_category_testing') },
                            { id: 'medication', label: t('faq_category_medication') },
                          ].map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setActiveFaqCategory(cat.id);
                                setFaqActiveIdx(null);
                              }}
                              className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-tight shrink-0 transition cursor-pointer border ${
                                activeFaqCategory === cat.id
                                  ? 'bg-[#00a859] text-white border-[#00a859] shadow-3xs'
                                  : 'bg-white text-slate-600 hover:text-slate-800 border-slate-200'
                              }`}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>

                        <div className="space-y-2">
                          {sortedFaqs
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
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono font-sans">{t('edu_helpful_resources')}</h4>
                        </div>

                        <div className="space-y-2.5">
                          {sortedHelpfulResources.map((res) => {
                            // Dynamic color configurations for appealing & diverse icon cards based on immutable ID
                            let bgClass = "bg-slate-50 group-hover:bg-emerald-50 border-slate-100 group-hover:border-emerald-200";
                            let iconColor = "text-[#00a859]";
                            let typeTagClass = "bg-emerald-50 text-[#00a859] border-emerald-100/55";
                            let viewLinkColor = "text-[#00a859] group-hover:text-emerald-700";
                            let hoverBorderClass = "hover:border-emerald-200 hover:bg-emerald-50/10";

                            if (res.id === 'res-7' || res.id === 'res-6') { // Video Stories
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
                            } else if (res.id === 'res-2') { // Clinical Guide
                              bgClass = "bg-amber-50 group-hover:bg-amber-100/80 border-amber-100 group-hover:border-amber-150";
                              iconColor = "text-amber-600";
                              typeTagClass = "bg-amber-50 text-amber-700 border-amber-100";
                              viewLinkColor = "text-amber-600 group-hover:text-amber-700";
                              hoverBorderClass = "hover:border-amber-200 hover:bg-amber-50/10";
                            } else if (res.id === 'res-1' || res.id === 'res-4' || res.id === 'res-8') { // PDF Brochures
                              bgClass = "bg-sky-50 group-hover:bg-sky-100/80 border-sky-100 group-hover:border-sky-150";
                              iconColor = "text-sky-600";
                              typeTagClass = "bg-sky-50 text-sky-700 border-sky-100";
                              viewLinkColor = "text-sky-600 group-hover:text-sky-700";
                              hoverBorderClass = "hover:border-sky-200 hover:bg-sky-50/10";
                            }

                            return (
                              <button
                                key={res.id}
                                onClick={() => {
                                  setSelectedResource(res);
                                  setResourcePage(0);
                                }}
                                className={`block w-full text-left bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-3xs transition group cursor-pointer ${hoverBorderClass}`}
                              >
                                <div className="flex items-start gap-2.5">
                                  <div className={`p-1.5 rounded-lg border shrink-0 mt-0.5 transition ${bgClass}`}>
                                    {getIcon(res.iconName, iconColor)}
                                  </div>
                                  <div className="space-y-0.5 flex-1 min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                      <h5 className="font-bold text-[11px] text-slate-800 group-hover:text-[#00a859] transition leading-tight">{res.title}</h5>
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
                                    <span>{t('edu_view_resource')}</span>
                                    <ExternalLink className="w-2.5 h-2.5 transition" />
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Knowledge Check Section (Part 2) */}
                  <div className="bg-white border border-emerald-200/80 rounded-2xl p-4 shadow-3xs text-left space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#00a859] flex items-center justify-center font-bold text-xs">
                          <CheckSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-display font-extrabold text-xs text-slate-900">Knowledge Check</h4>
                          <p className="text-[10px] text-slate-500 font-medium">3 questions • &lt; 1 minute</p>
                        </div>
                      </div>
                      <span className="text-[9px] bg-emerald-50 text-[#00a859] px-2 py-0.5 rounded-full font-extrabold border border-emerald-100">
                        Optional
                      </span>
                    </div>

                    {!quizSubmitted ? (
                      <div className="space-y-4">
                        {quizQuestions.map((q, idx) => {
                          const selectedOpt = quizAnswers[q.id];
                          return (
                            <div key={q.id} className="space-y-2 bg-slate-50/70 border border-slate-150 p-3 rounded-xl">
                              <p className="text-[11px] font-bold text-slate-800 leading-snug">
                                {idx + 1}. {q.question}
                              </p>
                              <div className="space-y-1.5 pt-1">
                                {q.options.map((opt, optIdx) => {
                                  const isSelected = selectedOpt === optIdx;
                                  return (
                                    <button
                                      key={optIdx}
                                      onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                                      className={`w-full text-left p-2.5 rounded-lg text-[10.5px] font-medium transition flex items-center gap-2.5 cursor-pointer border ${
                                        isSelected
                                          ? 'bg-emerald-50 border-[#00a859] text-emerald-900 font-bold'
                                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/60'
                                      }`}
                                    >
                                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                        isSelected ? 'border-[#00a859] bg-[#00a859] text-white' : 'border-slate-300'
                                      }`}>
                                        {isSelected && <span className="text-[9px] font-bold">✓</span>}
                                      </div>
                                      <span className="leading-tight">{opt}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}

                        <button
                          onClick={() => setQuizSubmitted(true)}
                          disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                          className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                            Object.keys(quizAnswers).length >= quizQuestions.length
                              ? 'bg-[#00a859] hover:bg-emerald-700 text-white shadow-sm'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          Submit Answers
                        </button>
                      </div>
                    ) : (
                      /* Quiz Results View */
                      <div className="space-y-4 animate-fade-in">
                        {/* Score summary banner */}
                        {(() => {
                          const correctCount = quizQuestions.filter(q => quizAnswers[q.id] === q.correctAnswer).length;
                          const total = quizQuestions.length;
                          const percentage = Math.round((correctCount / total) * 100);
                          return (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 space-y-2 text-left">
                              <div className="flex items-center justify-between">
                                <h5 className="font-extrabold text-xs text-emerald-900">Knowledge Check Complete</h5>
                                <span className="font-display font-extrabold text-lg text-[#00a859]">
                                  {percentage}%
                                </span>
                              </div>
                              <div className="space-y-1">
                                <p className="font-bold text-xs text-emerald-950">Great work!</p>
                                <p className="text-[10.5px] text-emerald-800 leading-relaxed font-sans">
                                  You've completed the Knowledge Check and reinforced the key information to help prepare for your counselling appointment.
                                </p>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Questions feedback */}
                        <div className="space-y-3">
                          {quizQuestions.map((q, idx) => {
                            const userAns = quizAnswers[q.id];
                            const isCorrect = userAns === q.correctAnswer;
                            return (
                              <div key={q.id} className={`p-3 rounded-xl border space-y-2 ${
                                isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/30 border-rose-200'
                              }`}>
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-[11px] font-bold text-slate-800 leading-snug">
                                    {idx + 1}. {q.question}
                                  </p>
                                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                                    isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                  }`}>
                                    {isCorrect ? '✓ Correct' : '✕ Incorrect'}
                                  </span>
                                </div>

                                <div className="space-y-1 pt-1">
                                  {q.options.map((opt, optIdx) => {
                                    const isUserChoice = userAns === optIdx;
                                    const isCorrectChoice = q.correctAnswer === optIdx;
                                    let badgeStyle = 'bg-white border-slate-200 text-slate-600';
                                    if (isCorrectChoice) {
                                      badgeStyle = 'bg-emerald-100/80 border-emerald-300 text-emerald-900 font-bold';
                                    } else if (isUserChoice && !isCorrect) {
                                      badgeStyle = 'bg-rose-100/80 border-rose-300 text-rose-900 font-medium';
                                    }

                                    return (
                                      <div key={optIdx} className={`p-2 rounded-lg text-[10px] border flex items-center justify-between ${badgeStyle}`}>
                                        <span>{opt}</span>
                                        {isCorrectChoice && <span className="text-[9px] text-emerald-700 font-bold">✓ Correct Answer</span>}
                                        {isUserChoice && !isCorrectChoice && <span className="text-[9px] text-rose-700 font-bold">Your Choice</span>}
                                      </div>
                                    );
                                  })}
                                </div>

                                <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/60 text-[10px] text-slate-600 leading-relaxed">
                                  <span className="font-bold text-slate-800">Explanation: </span>
                                  {q.explanation}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => {
                            setQuizAnswers({});
                            setQuizSubmitted(false);
                          }}
                          className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                        >
                          Try Again
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Contextual Booking Reinforcement Card */}
                  <div className="bg-[#00a859] rounded-2xl p-5 text-center space-y-3.5 shadow-sm">
                    <div className="space-y-1.5 px-1">
                      <h4 className="font-display font-extrabold text-sm sm:text-base text-white leading-snug">
                        Ready to book your GAC counselling slot?
                      </h4>
                      <p className="text-[11px] text-white/95 font-medium leading-relaxed max-w-[290px] mx-auto">
                        Take the active step today. Booking takes under 20 seconds within HealthHub.
                      </p>
                    </div>
                    <button
                      onClick={() => onChangeScreen(ScreenId.Booking)}
                      className="w-full py-3 bg-white hover:bg-emerald-50 text-[#00a859] rounded-2xl text-xs font-extrabold transition cursor-pointer shadow-xs active:scale-[0.99]"
                    >
                      Go to Secure Booking
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}


        {/* ----------------- SCREEN 3: BOOKING ----------------- */}
        {activeScreen === ScreenId.Booking && (
          <div className="flex-col flex flex-1 h-full overflow-hidden relative">
            {showMonthPopup && (
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl w-full max-w-[325px] p-6 shadow-2xl border border-slate-100 animate-fade-in text-left">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#00a859]" />
                      <h4 className="font-extrabold text-[15px] text-slate-800 tracking-tight">{t('booking_select_month')}</h4>
                    </div>
                    <button
                      onClick={() => setShowMonthPopup(false)}
                      className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer transition-colors"
                    >
                      <X className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                  
                  {(() => {
                    const grouped: { [year: string]: string[] } = {};
                    availableMonths.forEach((m) => {
                      const parts = m.split(' ');
                      const year = parts[1] || '2026';
                      if (!grouped[year]) grouped[year] = [];
                      grouped[year].push(m);
                    });

                    return (
                      <div className="space-y-5 max-h-[350px] overflow-y-auto pr-1">
                        {Object.keys(grouped).sort().map((year) => (
                          <div key={year} className="space-y-2.5 text-left">
                            <div className="flex items-center pl-2 py-1 bg-slate-50/75 border-l-[3px] border-[#00a859] rounded-r-lg">
                              <span className="text-[11.5px] font-extrabold text-slate-400 tracking-wider font-mono">{year}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {grouped[year].map((m) => {
                                const isSelected = m === selectedCalendarMonth;
                                const shortName = getLocalizedMonthOnly(m, language);
                                return (
                                  <button
                                    key={m}
                                    onClick={() => {
                                      selectMonth(m);
                                      setShowMonthPopup(false);
                                    }}
                                    className={`h-9 px-1 rounded-xl text-[10.5px] font-bold text-center flex items-center justify-center transition-all cursor-pointer w-full border ${
                                      isSelected
                                        ? 'bg-[#00a859] border-[#00a859] text-white shadow-md shadow-emerald-700/10'
                                        : 'bg-slate-50 border-slate-200/50 text-slate-700 hover:bg-emerald-50 hover:text-[#00a859] hover:border-emerald-200'
                                    }`}
                                  >
                                    {shortName}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
            {/* Top Navigation */}
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-2 shrink-0">
              <button 
                onClick={() => {
                  setBookingStep('available');
                  onChangeScreen(ScreenId.Home);
                }} 
                className="p-1 hover:bg-slate-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <span className="font-bold text-sm text-slate-800">{t('booking_header_title')}</span>
            </div>

            {/* If appointment is BOOKED or CONFIRMED, show Feature 2 Confirmation Screen */}
            {appointment.status === 'booked' || appointment.status === 'confirmed' ? (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 animate-fade-in text-left">
                {/* Booking Confirmation Card (Feature 2) */}
                <div className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-xs text-center space-y-3.5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  
                  <div>
                    <h3 className="font-extrabold text-base text-slate-850">{t('booking_confirmed_status')}</h3>
                    <p className="text-[10px] text-[#00a859] font-extrabold uppercase tracking-wide mt-1 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block border border-emerald-100">
                      {t('booking_subsidized_slot')}
                    </p>
                  </div>

                  {/* Interactive Notification Bell to configure reminders (User Request 3) */}
                  <button
                    onClick={() => onChangeScreen(ScreenId.ReminderSettings)}
                    className="w-full mt-1.5 p-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-[10px] text-amber-800 font-extrabold transition flex items-center justify-start gap-2 cursor-pointer shadow-3xs group relative overflow-hidden whitespace-nowrap"
                  >
                    <Bell className="w-3.5 h-3.5 text-amber-650 shrink-0" />
                    <span className="truncate">{t('booking_setup_reminders')}</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-auto text-amber-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </button>

                  {/* Relational details matching selected July dates */}
                  {(() => {
                    const details = getAppointmentSlotDetails(
                      appointment.clinic || "National University Hospital Genetic Clinic",
                      appointment.date,
                      appointment.timeSlot
                    );
                    return (
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left space-y-3 text-xs">
                        <div className="grid grid-cols-12 gap-x-2 items-start">
                          <span className="col-span-5 text-slate-500 font-medium">{t('booking_care_clinic')}</span>
                          <strong className="col-span-7 text-slate-800 text-right font-semibold leading-relaxed">
                            {appointment.clinic || "National University Hospital Genetic Clinic"}
                          </strong>
                        </div>
                        <div className="grid grid-cols-12 gap-x-2 items-start">
                          <span className="col-span-5 text-slate-500 font-medium">{t('booking_specialist')}</span>
                          <strong className="col-span-7 text-slate-800 text-right font-semibold leading-relaxed">
                            {details.provider} <span className="text-[10px] text-slate-500 font-normal block">({details.role})</span>
                          </strong>
                        </div>
                        <div className="grid grid-cols-12 gap-x-2 items-center">
                          <span className="col-span-5 text-slate-500 font-medium">{t('booking_scheduled_date')}</span>
                          <strong className="col-span-7 text-slate-800 text-right font-semibold font-mono">{getLocalizedDate(appointment.date, language)}</strong>
                        </div>
                        <div className="grid grid-cols-12 gap-x-2 items-center">
                          <span className="col-span-5 text-slate-500 font-medium">{t('booking_confirmed_time')}</span>
                          <strong className="col-span-7 text-slate-800 text-right font-semibold font-mono">{appointment.timeSlot}</strong>
                        </div>
                        <div className="grid grid-cols-12 gap-x-2 items-center">
                          <span className="col-span-5 text-slate-500 font-medium">{t('booking_session_duration')}</span>
                          <strong className="col-span-7 text-slate-800 text-right font-semibold">{details.duration.replace('mins', t('booking_mins'))}</strong>
                        </div>
                        <div className="grid grid-cols-12 gap-x-2 items-start pt-2 border-t border-slate-200">
                          <span className="col-span-5 text-slate-500 font-bold">{t('booking_out_of_pocket')}</span>
                          <strong className="col-span-7 text-emerald-700 text-right font-extrabold font-mono">
                            {details.cost} <span className="text-[10px] text-slate-550 font-normal block">({t('booking_chas_subsidized')})</span>
                          </strong>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Feature 3: Calendar Integration buttons with elegant toggle menu */}
                  <div className="space-y-2.5 pt-1.5">
                    <button 
                      onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      {t('booking_add_device_calendar')}
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
                            triggerToast(t('booking_add_calendar_success'));
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
                          <Calendar className="w-3.5 h-3.5 text-[#00a859]" /> Google Calendar
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Secure, calm prep card */}
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 space-y-3 text-xs text-left">
                  <h4 className="font-bold text-emerald-900 flex items-center gap-2">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0" /> {t('booking_essential_prep')}
                  </h4>
                  <ul className="space-y-2 text-slate-600 text-[11px] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">•</span>
                      <span>{t('booking_prep_no_fasting')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">•</span>
                      <span>{t('booking_prep_id_verif')}</span>
                    </li>
                    {/* Pre-counselling Checklist instruction */}
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">•</span>
                      <span>{t('booking_prep_checklist')}</span>
                    </li>
                  </ul>
                  <button 
                    onClick={() => {
                      setViewingChecklist(true);
                      onChangeScreen(ScreenId.Education);
                    }}
                    className="text-[#00a859] font-extrabold text-[11px] hover:underline flex items-center gap-0.5 text-left pt-1"
                  >
                    {t('booking_view_checklist')} <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Manage and reschedule options */}
                <div className="space-y-2 pt-1 text-left">
                  <button
                    onClick={handleEnterReschedule}
                    className="w-full py-2.5 bg-white hover:bg-slate-50 text-[#00a859] border border-emerald-600/40 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    {t('booking_reschedule_slot')}
                  </button>
                  <button
                    onClick={handleEnterCancelFlow}
                    className="w-full py-2.5 bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-xl text-xs font-semibold border border-slate-200 transition cursor-pointer"
                  >
                    {t('booking_cancel_slot')}
                  </button>
                </div>
              </div>
            ) : (
              /* Active Booking Steps */
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-left">
                {/* Step 1: Available list */}
                {bookingStep === 'available' && (() => {
                  // Pre-compute distances to find nearest clinic and sort by shortest to longest distance
                  const clinicsWithDistances = activeClinics.map(clinic => {
                    const dist = calculateDistance(
                      patientCoords.lat,
                      patientCoords.lng,
                      clinic.lat,
                      clinic.lng
                    );
                    return { ...clinic, distance: dist };
                  }).sort((a, b) => a.distance - b.distance);
                  const minDistance = Math.min(...clinicsWithDistances.map(c => c.distance));

                  return (
                    <div className="space-y-4">
                      {/* Clinical recommendation banner */}
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex gap-2.5 items-start text-xs text-emerald-900">
                        <ShieldAlert className="w-4.5 h-4.5 text-emerald-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-extrabold text-emerald-950">{t('action_recommended')}:</strong>
                          <p className="text-[11px] text-emerald-800 leading-relaxed mt-0.5">
                            {t('booking_eligible_subsidies')}
                          </p>
                        </div>
                      </div>

                      {/* Your Location & Geolocation Control (User request 1) */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-3xs text-left">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">{t('booking_location_label')}</span>
                          <button 
                            onClick={() => setShowLocationModal(!showLocationModal)}
                            className="text-[11px] text-[#00a859] font-extrabold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            {showLocationModal ? t('booking_close_selector_btn') : t('booking_change_location')}
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-emerald-50 rounded-lg shrink-0">
                            <MapPin className="w-4 h-4 text-[#00a859]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="font-bold text-xs text-slate-800">{patientLocName}</h4>
                              {patientLocName === patientAddress && (
                                <span className="bg-emerald-50 text-[#00a859] text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-100 shrink-0">
                                  {t('booking_default_address')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {showLocationModal && (
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-3 animate-fade-in text-xs">
                            <div className="space-y-1.5">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono">{t('booking_search_location')}</span>
                              <div className="relative flex items-center">
                                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                                <input
                                  type="text"
                                  value={locationSearchQuery}
                                  onChange={(e) => setLocationSearchQuery(e.target.value)}
                                  placeholder="Type to search e.g. Ang Mo Kio, Bedok..."
                                  className="w-full pl-8 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#00a859] focus:border-[#00a859]"
                                />
                                {locationSearchQuery && (
                                  <button
                                    onClick={() => setLocationSearchQuery('')}
                                    className="absolute right-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Live location / home shortcuts */}
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={detectLiveLocation}
                                disabled={isDetectingLoc}
                                className="py-2 px-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                              >
                                📍 {isDetectingLoc ? t('booking_detecting') : t('booking_live_location')}
                              </button>
                              <button
                                onClick={() => {
                                  const coords = PERSONA_COORDS[currentPatientId] || { lat: 1.3625, lng: 103.8542 };
                                  setPatientCoords(coords);
                                  setPatientLocName(patientAddress);
                                  setLocationSearchQuery('');
                                  triggerToast('Defaulted to profile residential address');
                                }}
                                className="py-2 px-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                              >
                                🏠 {t('booking_default_address')}
                              </button>
                            </div>

                            {/* Search Results / Suggestions */}
                            <div className="space-y-1">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                                {locationSearchQuery ? t('booking_search_results') : t('booking_suggestions')}
                              </span>
                              <div className="max-h-32 overflow-y-auto space-y-1 divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white p-1">
                                {(locationSearchQuery 
                                  ? SEARCHABLE_LOCATIONS.filter(loc => loc.name.toLowerCase().includes(locationSearchQuery.toLowerCase()))
                                  : SEARCHABLE_LOCATIONS
                                ).map((loc, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => {
                                      setPatientCoords({ lat: loc.lat, lng: loc.lng });
                                      setPatientLocName(loc.name);
                                      setLocationSearchQuery('');
                                      setShowLocationModal(false);
                                      triggerToast(`Location changed to ${loc.name.split(',')[0]}`);
                                    }}
                                    className="w-full text-left p-2 hover:bg-emerald-50/50 rounded transition text-[11px] font-medium text-slate-700 flex items-center justify-between gap-1 cursor-pointer"
                                  >
                                    <span className="truncate flex-1">{loc.name}</span>
                                    {loc.name === patientAddress && (
                                      <span className="bg-emerald-50 text-[#00a859] text-[8px] font-extrabold px-1 py-0.5 rounded border border-emerald-100 shrink-0">
                                        {t('booking_default_address')}
                                      </span>
                                    )}
                                  </button>
                                ))}
                                {locationSearchQuery && SEARCHABLE_LOCATIONS.filter(loc => loc.name.toLowerCase().includes(locationSearchQuery.toLowerCase())).length === 0 && (
                                  <div className="p-2 text-center text-[10px] text-slate-500">
                                    {t('booking_no_matches')}
                                    <button
                                      onClick={() => {
                                        setPatientCoords({ lat: 1.3521, lng: 103.8198 });
                                        setPatientLocName(locationSearchQuery);
                                        setLocationSearchQuery('');
                                        setShowLocationModal(false);
                                        triggerToast(`Custom location set!`);
                                      }}
                                      className="mt-1 w-full p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-bold block truncate"
                                    >
                                      "{locationSearchQuery}"
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {gpsError && (
                              <p className="text-[9px] text-red-600 font-semibold leading-tight bg-red-50 border border-red-100 p-2 rounded">
                                ⚠️ {gpsError}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Specialized Clinic Location Dropdown (User request 1) */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">{t('select_clinic_title')}</label>
                        <div className="relative">
                          <button
                            onClick={() => setShowClinicDropdown(!showClinicDropdown)}
                            className="w-full bg-white border border-slate-200 rounded-xl p-3.5 flex justify-between items-center shadow-3xs cursor-pointer text-left transition hover:border-emerald-600/40"
                          >
                            <div className="flex gap-3 min-w-0">
                              <div className="p-2 bg-emerald-50 rounded-lg shrink-0 self-center">
                                <MapPin className="w-4.5 h-4.5 text-[#00a859]" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-bold text-xs text-slate-800 truncate">
                                  {activeClinics.find(c => c.id === selectedClinicId)?.name}
                                </h4>
                                <p className="text-[10px] text-slate-500 leading-snug mt-0.5 truncate">
                                  {activeClinics.find(c => c.id === selectedClinicId)?.address}
                                </p>
                                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                  <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                    {t('booking_distance')} {clinicsWithDistances.find(c => c.id === selectedClinicId)?.distance.toFixed(1)} km
                                  </span>
                                  {clinicsWithDistances.find(c => c.id === selectedClinicId)?.distance === minDistance && (
                                    <span className="text-[9px] font-sans font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5">
                                      ⭐ {t('booking_nearest_clinic')}
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
                                      const availableDays = Object.keys(activeClinicSlotsDb[clinic.id]?.[selectedCalendarMonth] || {})
                                        .map(Number)
                                        .filter(day => !isDateBeforeToday(selectedCalendarMonth, day));
                                      if (availableDays.length > 0) {
                                        setSelectedCalendarDay(availableDays[0]);
                                      }
                                    }}
                                    className={`w-full text-left p-3.5 transition flex justify-between items-start gap-3 hover:bg-emerald-50/10 cursor-pointer ${
                                      isSelected ? 'bg-emerald-50/20' : 'bg-white'
                                    }`}
                                  >
                                    <div className="space-y-1 min-w-0 flex-1">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <h5 className={`font-bold text-xs ${isSelected ? 'text-[#00a859]' : 'text-slate-800'}`}>
                                          {clinic.name}
                                        </h5>
                                        {isNearest && (
                                          <span className="text-[8px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                                            {t('booking_nearest_tag')}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[10px] text-slate-500 leading-tight truncate">
                                        {clinic.address}
                                      </p>
                                      <p className="text-[9px] font-mono font-bold text-slate-400">
                                        {t('booking_distance')} <span className="text-emerald-700">{clinic.distance.toFixed(1)} km</span>
                                      </p>
                                    </div>
                                    {isSelected && <Check className="w-4 h-4 text-[#00a859] shrink-0 mt-0.5" />}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Feature 1 Calendar Layout Month Grid (User request 2) */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3.5 shadow-3xs text-left animate-fade-in">
                        <div className="flex flex-col gap-2.5 border-b border-slate-150 pb-3">
                          <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-mono">
                            {isFHReferred ? t('booking_select_counselling_slot') : (
                              language === 'ms' ? 'Pilih slot janji temu' :
                              language === 'zh' ? '选择预约时段' :
                              language === 'ta' ? 'சந்திப்பு நேரத்தைத் தேர்ந்தெடுக்கவும்' :
                              'Select appointment slot'
                            )}
                          </h4>
                          
                          {/* Easy Month-Flipping Header */}
                          <div className="flex justify-between items-center bg-slate-50 border border-slate-200/60 p-2 rounded-xl">
                            <button
                              onClick={() => {
                                const idx = availableMonths.indexOf(selectedCalendarMonth);
                                if (idx > 0) {
                                  selectMonth(availableMonths[idx - 1]);
                                }
                              }}
                              disabled={availableMonths.indexOf(selectedCalendarMonth) === 0}
                              className="p-1.5 hover:bg-slate-200 disabled:hover:bg-transparent rounded-lg disabled:opacity-25 cursor-pointer transition text-slate-600 self-center"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            
                            <button
                              onClick={() => setShowMonthPopup(true)}
                              className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 tracking-wide cursor-pointer transition"
                            >
                              <span>{formatMonthShorthand(selectedCalendarMonth, language)}</span>
                              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                            </button>
                            
                            <button
                              onClick={() => {
                                const idx = availableMonths.indexOf(selectedCalendarMonth);
                                if (idx < availableMonths.length - 1) {
                                  selectMonth(availableMonths[idx + 1]);
                                }
                              }}
                              disabled={availableMonths.indexOf(selectedCalendarMonth) === availableMonths.length - 1}
                              className="p-1.5 hover:bg-slate-200 disabled:hover:bg-transparent rounded-lg disabled:opacity-25 cursor-pointer transition text-slate-600 self-center"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
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
                            {/* Empty cells to align correct starting weekday */}
                            {Array.from({ length: getMonthConfig(selectedCalendarMonth).emptyCells }).map((_, i) => (
                              <div key={`empty-${i}`} className="h-8" />
                            ))}

                            {/* Days 1 to totalDays */}
                            {Array.from({ length: getMonthConfig(selectedCalendarMonth).totalDays }).map((_, i) => {
                              const dayNum = i + 1;
                              const hasSlots = !!activeClinicSlotsDb[selectedClinicId]?.[selectedCalendarMonth]?.[dayNum] && !isDateBeforeToday(selectedCalendarMonth, dayNum);
                              const isSelected = selectedCalendarDay === dayNum;
                              const isCurrentDay = isToday(selectedCalendarMonth, dayNum);

                              return (
                                <button
                                  key={`day-${dayNum}`}
                                  disabled={!hasSlots}
                                  onClick={() => setSelectedCalendarDay(dayNum)}
                                  className={`h-8 w-8 rounded-full flex flex-col items-center justify-center text-[10.5px] font-extrabold transition relative cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#00a859] text-white shadow-xs'
                                      : isCurrentDay
                                      ? 'bg-slate-400/20 border border-slate-300/80 text-slate-800 hover:bg-slate-400/30'
                                      : hasSlots
                                      ? 'bg-emerald-50 text-[#00a859] border border-emerald-200/55 hover:bg-emerald-100/60'
                                      : 'text-slate-300 pointer-events-none'
                                  }`}
                                >
                                  <span>{dayNum}</span>
                                  {hasSlots && !isSelected && (
                                    <span className="absolute bottom-1 w-1 h-1 bg-[#00a859] rounded-full" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex gap-3 items-center justify-center text-[9px] text-slate-400 pt-1.5 border-t border-slate-100 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center"><span className="w-1 h-1 bg-[#00a859] rounded-full" /></span>
                            <span>{t('available_slots')}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-400/20 border border-slate-300/80" />
                            <span>{t('booking_legend_today')}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#00a859]" />
                            <span>{t('booking_legend_selected')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Slots for Selected Calendar Day */}
                      <div className="space-y-2.5 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex justify-between items-center">
                          <span>{t('available_slots')}</span>
                        </label>
                        <div className="space-y-2">
                          {activeClinicSlotsDb[selectedClinicId]?.[selectedCalendarMonth]?.[selectedCalendarDay] ? (
                            activeClinicSlotsDb[selectedClinicId][selectedCalendarMonth][selectedCalendarDay].map((slot, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSelectedSlotObj(slot);
                                  setSelectedSlotIdx(idx);
                                  setBookingStep('review');
                                }}
                                className="w-full bg-white hover:bg-emerald-50/15 border border-slate-200 hover:border-[#00a859]/40 p-3.5 rounded-xl text-left transition flex justify-between items-center cursor-pointer shadow-3xs hover:shadow-2xs"
                                style={{ minHeight: '64px' }}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-slate-50 text-slate-500 rounded-lg shrink-0">
                                    <Clock className="w-4 h-4 text-[#00a859]" />
                                  </div>
                                  <div className="space-y-0.5">
                                    <p className="text-xs font-extrabold text-slate-800">{slot.time}</p>
                                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                      <span className="font-semibold text-slate-600">{slot.provider}</span>
                                      <span className="text-slate-300">•</span>
                                      <span>{slot.duration.replace('mins', t('booking_mins'))}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-bold text-[#00a859] font-mono bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                    {slot.cost}
                                  </span>
                                  <ChevronRight className="w-4 h-4 text-slate-400" />
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="bg-white border border-dashed border-slate-200 p-6 rounded-xl text-center text-xs text-slate-400">
                              {t('booking_no_slots_alert')}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 flex gap-2.5 items-center text-xs text-slate-600">
                        <Coins className="w-4 h-4 text-[#00a859] shrink-0" />
                        <p className="text-[11px] leading-snug">
                          {t('booking_subsidies_computed')}
                        </p>
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
                        <h3 className="font-extrabold text-sm text-slate-800">{t('booking_review_details')}</h3>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {isFHReferred ? t('booking_choose_subsidized_slot') : (
                            language === 'ms' ? 'Pilih slot janji temu klinik am anda.' :
                            language === 'zh' ? '选择您的普通门诊预约时段。' :
                            language === 'ta' ? 'உங்கள் பொது மருத்துவமனை சந்திப்பு நேரத்தைத் தேர்ந்தெடுக்கவும்.' :
                            'Choose your general clinic appointment slot.'
                          )}
                        </p>
                      </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3.5 shadow-3xs text-left">
                          <div className="space-y-1 border-b border-slate-100 pb-3 text-left font-sans">
                            <span className="text-[9px] font-mono text-slate-400 uppercase font-bold tracking-wider">{t('booking_assigned_specialist')}</span>
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-slate-150 text-[#00a859] font-extrabold flex items-center justify-center text-xs">
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
                              <span className="text-slate-500 font-medium">{t('booking_care_clinic')}</span>
                              <span className="text-slate-800 text-right font-semibold">{slot.clinic}</span>
                            </div>
                            <div className="flex justify-between items-start gap-4">
                              <span className="text-slate-500 font-medium">{t('booking_address_label')}</span>
                              <span className="text-slate-500 text-right text-[11px] leading-snug">{slot.address}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">{t('booking_date_label')}</span>
                              <span className="text-slate-800 font-semibold font-mono">{getLocalizedDate(slot.date, language)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">{t('booking_time_label')}</span>
                              <span className="text-slate-800 font-semibold font-mono">{slot.time}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">{t('booking_duration_label')}</span>
                              <span className="text-slate-800 font-semibold">{slot.duration.replace('mins', t('booking_mins'))}</span>
                            </div>
                            <div className="flex justify-between border-t border-slate-100 pt-2.5 mt-2.5">
                              <span className="text-slate-500 font-bold">{t('booking_out_of_pocket_label')}</span>
                              <span className="text-[#00a859] font-extrabold font-mono">{slot.cost}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 space-y-2">
                          <button
                            onClick={() => handleBookSubmit(selectedSlotIdx || 0)}
                            className="w-full py-3 bg-[#00a859] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-700/10 transition cursor-pointer"
                          >
                            {t('booking_confirm_slot_btn')}
                          </button>
                          <button
                            onClick={() => {
                              setBookingStep('available');
                              setSelectedSlotIdx(null);
                              setSelectedSlotObj(null);
                            }}
                            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition cursor-pointer border border-slate-200"
                          >
                            {t('reschedule_slot')}
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
          {activeScreen === ScreenId.ReminderSettings && (() => {
            const selectedChannels = deserializeChannels(reminderPrefs.channel);
          return (
            <div className="flex-col flex flex-1 h-full overflow-hidden">
              {/* Top Navigation */}
              <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-2 text-left shrink-0">
                <button 
                  onClick={() => onChangeScreen(ScreenId.Home)} 
                  className="p-1 hover:bg-slate-100 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-700" />
                </button>
                <span className="font-bold text-sm text-slate-800">{t('settings_title')}</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-left pb-12">
                <div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {isFHReferred ? t('settings_desc') : (
                      language === 'ms' ? 'Konfigurasikan bagaimana dan bila anda menerima rujukan pesakit luar am dan makluman janji temu.' :
                      language === 'zh' ? '配置您接收普通门诊转诊和预约提醒的方式和时间。' :
                      language === 'ta' ? 'பொது வெளிநோயாளி பரிந்துரைகள் மற்றும் சந்திப்பு விழிப்பூட்டல்களை எப்போது பெறுவது என்பதை அமைக்கவும்.' :
                      'Configure how and when you receive outpatient referral and appointment alerts.'
                    )}
                  </p>
                </div>

                {/* Master Toggle */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-xs text-slate-800">
                      {isFHReferred ? t('active_reminders') : (
                        language === 'ms' ? 'Peringatan Aktif' :
                        language === 'zh' ? '启用提醒' :
                        language === 'ta' ? 'செயலில் உள்ள நினைவூட்டல்கள்' :
                        'Active Reminders'
                      )}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">{t('active_reminders_desc')}</p>
                  </div>
                  <button
                    onClick={() => onUpdateReminderPrefs(!reminderPrefs.enabled, reminderPrefs.channel, reminderPrefs.frequency)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${reminderPrefs.enabled ? 'bg-[#00a859]' : 'bg-slate-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${reminderPrefs.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                {reminderPrefs.enabled && (
                  <div className="space-y-4 animate-fade-in text-left">
                    
                    {/* Select Channel - Multi-select Checkbox list */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">{t('notification_channel')}</label>
                      
                      <div className="space-y-2.5">
                        {['sms', 'push', 'email', 'whatsapp'].map((chan) => {
                          const isChecked = selectedChannels.includes(chan);
                          const info = channelInfo[chan][language] || channelInfo[chan]['en'];
                          
                          let IconComponent = Smartphone;
                          if (chan === 'push') IconComponent = Bell;
                          else if (chan === 'email') IconComponent = Mail;
                          else if (chan === 'whatsapp') IconComponent = MessageCircle;

                          const handleToggle = () => {
                            let nextChannels = [...selectedChannels];
                            if (isChecked) {
                              if (nextChannels.length > 1) {
                                nextChannels = nextChannels.filter(c => c !== chan);
                              }
                            } else {
                              nextChannels.push(chan);
                            }
                            onUpdateReminderPrefs(
                              reminderPrefs.enabled,
                              serializeChannels(nextChannels),
                              reminderPrefs.frequency
                            );
                          };

                          return (
                            <button
                              key={chan}
                              onClick={handleToggle}
                              className="w-full text-left flex gap-3 items-start p-2.5 rounded-xl border border-slate-150 hover:bg-slate-50/50 transition cursor-pointer select-none"
                            >
                              <div className="mt-0.5 shrink-0">
                                {isChecked ? (
                                  <CheckSquare className="w-5 h-5 text-[#00a859]" />
                                ) : (
                                  <Square className="w-5 h-5 text-slate-300" />
                                )}
                              </div>
                              
                              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100 shrink-0 text-[#00a859]">
                                <IconComponent className="w-4 h-4" />
                              </div>

                              <div className="flex-1 space-y-0.5 min-w-0">
                                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                  <span>{info.title}</span>
                                </div>
                                <p className="text-[10px] text-slate-500 leading-normal">{info.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <p className="text-[10px] text-emerald-800 bg-emerald-50/50 border border-emerald-100/60 rounded-lg p-2.5 leading-normal font-medium flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00a859] animate-pulse shrink-0"></span>
                        <span>
                          {language === 'ms' ? 'Peringatan akan dihantar ke semua saluran aktif terpilih secara serentak.' :
                           language === 'zh' ? '提醒将同时发送至所有已启用的活跃渠道。' :
                           language === 'ta' ? 'விழிப்பூட்டல்கள் ஒரே நேரத்தில் தேர்ந்தெடுக்கப்பட்ட அனைத்து செயலில் உள்ள சேனல்களுக்கும் அனுப்பப்படும்.' :
                           'Reminders will be sent to all active checked channels simultaneously.'}
                        </span>
                      </p>
                    </div>

                    {/* Frequency settings */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">{t('reminder_frequency')}</label>
                      <div className="relative">
                        <select
                          id="reminder-frequency-select"
                          value={reminderPrefs.frequency === 'custom' || reminderPrefs.frequency === '1_day' ? '1_week' : reminderPrefs.frequency}
                          onChange={(e) => onUpdateReminderPrefs(reminderPrefs.enabled, reminderPrefs.channel, e.target.value as any)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-3 pr-10 text-xs text-slate-800 font-medium cursor-pointer appearance-none focus:outline-none focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] transition"
                        >
                          <option value="2_weeks">{t('freq_comprehensive')}</option>
                          <option value="1_week">{t('freq_standard')}</option>
                          <option value="monthly">{t('freq_minimal')}</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        {t('frequency_desc')}
                      </p>
                      <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 space-y-1 text-left">
                        <div className="text-[9.5px] font-bold text-emerald-800 tracking-wider font-mono uppercase">{t('active_schedule')}</div>
                        <p className="text-xs font-bold text-slate-800 font-sans">
                          {reminderPrefs.frequency === '2_weeks' && t('active_freq_comprehensive')}
                          {reminderPrefs.frequency === '1_week' && t('active_freq_standard')}
                          {reminderPrefs.frequency === 'monthly' && t('active_freq_minimal')}
                          {reminderPrefs.frequency !== '2_weeks' && reminderPrefs.frequency !== '1_week' && reminderPrefs.frequency !== 'monthly' && t('active_freq_standard')}
                        </p>
                      </div>
                    </div>

                    {/* Dynamic previews based on selected channels */}
                    {selectedChannels.includes('sms') && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex justify-between">
                          <span>{t('settings_sms_preview_title')}</span>
                          <span className="text-emerald-700">{t('settings_sms_verified_sender')}</span>
                        </label>
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 border-b border-slate-100 pb-2">
                            <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                            <span>MOH-HealthHub</span>
                            <span className="ml-auto text-[9px] font-mono">{t('sms_today')}, 09:41 AM</span>
                          </div>
                          <div className="bg-slate-100 p-3 rounded-xl rounded-tl-none text-[11px] text-slate-700 leading-normal font-sans border border-slate-200/50">
                            {(() => {
                              const dateStr = getLocalizedDate(appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.date : '22 July 2026', language);
                              const timeStr = appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.timeSlot : '10:30 AM';
                              const bookedClinicName = appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.clinic : activeClinics[0].name;
                              const nameStr = patientFirstName.charAt(0) + patientFirstName.slice(1).toLowerCase();

                              if (isFHReferred) {
                                return t('settings_sms_prefix')
                                  .replace('Lisa', nameStr)
                                  .replace('{date}', dateStr)
                                  .replace('{time}', timeStr);
                              }

                              if (language === 'ms') {
                                return `MOH HealthHub: Hai ${nameStr}, slot Konsultasi Pesakit Luar Am anda di ${bookedClinicName} disahkan pada ${dateStr} pukul ${timeStr}. Subsidi sehingga 75% telah diluluskan. Bawa Singpass. Info: https://hh.gov.sg/gen-ref`;
                              } else if (language === 'zh') {
                                return `MOH HealthHub: 您在 ${bookedClinicName} 的普通门诊咨询预约已确认，时间为 ${dateStr} ${timeStr}。最高 75% 的政府津贴已通过审核。请携带您的 NRIC/Singpass。详情：https://hh.gov.sg/gen-ref`;
                              } else if (language === 'ta') {
                                return `MOH HealthHub: ${dateStr} அன்று ${timeStr} மணிக்கு ${bookedClinicName}-இல் உங்கள் பொது வெளிநோயாளி ஆலோசனை உறுதிப்படுத்தப்பட்டுள்ளது. 75% வரை மானியம் வழங்கப்பட்டுள்ளது. Singpass கொண்டு வரவும். விவரம்: https://hh.gov.sg/gen-ref`;
                              } else {
                                return `MOH HealthHub: Hi ${nameStr}, your General Outpatient Consultation slot at ${bookedClinicName} is confirmed on ${dateStr} at ${timeStr}. Subsidies up to 75% are cleared. Bring Singpass. Info: https://hh.gov.sg/gen-ref`;
                              }
                            })()}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedChannels.includes('push') && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                          {t('settings_lockscreen_preview_title')}
                        </label>
                        <div className="bg-slate-900 border border-slate-700 text-white rounded-xl p-4 shadow-md space-y-2">
                          <div className="flex items-center gap-1.5 text-[9px] text-slate-400 border-b border-slate-800 pb-1.5">
                            <div className="w-4 h-4 bg-[#00a859] rounded flex items-center justify-center text-white text-[8px] font-black">HH</div>
                            <span>{t('settings_lockscreen_header')}</span>
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-slate-100">
                              {isFHReferred ? t('lock_counselling_reminder') : (
                                language === 'ms' ? 'Peringatan Janji Temu Pesakit Luar' :
                                language === 'zh' ? '普通门诊就诊提醒' :
                                language === 'ta' ? 'வெளிநோயாளி சந்திப்பு நினைவூட்டல்' :
                                'Outpatient Appointment Reminder'
                              )}
                            </h4>
                            <p className="text-[10.5px] text-slate-300 leading-snug">
                              {(() => {
                                const dateStr = getLocalizedDate(appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.date : '22 July 2026', language);
                                const timeStr = appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.timeSlot : '10:30 AM';
                                if (isFHReferred) {
                                  return t('lockscreen_push_msg')
                                    .replace('{date}', dateStr)
                                    .replace('{time}', timeStr);
                                }
                                if (language === 'ms') {
                                  return `Konsultasi pesakit luar anda telah disahkan untuk ${dateStr} pukul ${timeStr}. Ketik untuk melengkapkan senarai semak.`;
                                } else if (language === 'zh') {
                                  return `您的普通门诊咨询预约已确认，时间为 ${dateStr} ${timeStr}。请点击以完善您的准备清单。`;
                                } else if (language === 'ta') {
                                  return `உங்கள் வெளிநோயாளி ஆலோசனை ${dateStr} அன்று ${timeStr} மணிக்கு உறுதிப்படுத்தப்பட்டுள்ளது. சரிபார்ப்புப் பட்டியலை முடிக்க தட்டவும்.`;
                                } else {
                                  return `Your outpatient consultation is confirmed for ${dateStr} at ${timeStr}. Tap to complete checklist.`;
                                }
                              })()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedChannels.includes('email') && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex justify-between">
                          <span>{language === 'ms' ? 'Pratonton Makluman Emel' : language === 'zh' ? '电子邮件提醒预览' : language === 'ta' ? 'மின்னஞ்சல் விழிப்பூட்டல் முன்னோட்டம்' : 'Email Notification Preview'}</span>
                          <span className="text-emerald-700">Official MOH Domain</span>
                        </label>
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2">
                          <div className="text-[9.5px] font-bold text-slate-800 border-b border-slate-100 pb-2 flex justify-between">
                            <span>From: appointment-reminders@healthhub.sg</span>
                            <span className="text-slate-400 font-normal">{t('sms_today')}</span>
                          </div>
                          <div className="text-xs font-bold text-slate-800 font-sans mt-1">
                            {isFHReferred ? 'Upcoming Outpatient Appointment: Genetic Counselling' : 'MOH HealthHub: Outpatient Appointment Confirmed'}
                          </div>
                          <p className="text-[10.5px] text-slate-600 leading-normal mt-1">
                            {(() => {
                              const dateStr = getLocalizedDate(appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.date : '22 July 2026', language);
                              const timeStr = appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.timeSlot : '10:30 AM';
                              const bookedClinicName = appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.clinic : activeClinics[0].name;
                              
                              if (language === 'ms') {
                                return <>
                                  Tuan/Puan yang dihormati, ini adalah peringatan rasmi untuk janji temu klinikal anda yang dijadualkan. Sila sahkan butiran:
                                  <br /><strong>Klinik:</strong> {bookedClinicName}
                                  <br /><strong>Tarikh/Masa:</strong> {dateStr}, {timeStr}
                                  <br />Sila lengkapkan senarai semak pra-janji temu di aplikasi HealthHub sebelum anda hadir.
                                </>;
                              } else if (language === 'zh') {
                                return <>
                                  尊贵的朋友，这是您已预约临床就诊的官方提醒。请核对以下详情：
                                  <br /><strong>科室/诊所:</strong> {bookedClinicName}
                                  <br /><strong>日期与时间:</strong> {dateStr}, {timeStr}
                                  <br />请在就诊前通过 HealthHub 应用完成您的预约前核对清单。
                                </>;
                              } else if (language === 'ta') {
                                return <>
                                  மதிப்பிற்குரிய நோயாளிக்கு, இது உங்களின் திட்டமிடப்பட்ட மருத்துவ சந்திப்பிற்கான அதிகாரப்பூர்வ நினைவூட்டலாகும். விவரங்களைச் சரிபார்க்கவும்:
                                  <br /><strong>மருத்துவமனை:</strong> {bookedClinicName}
                                  <br /><strong>தேதி/நேரம்:</strong> {dateStr}, {timeStr}
                                  <br />தயவுசெய்து சந்திப்பிற்கு முன் ஹெல்த்ஹப் செயலியில் சரிபார்ப்புப் பட்டியலை முடிக்கவும்.
                                </>;
                              } else {
                                return <>
                                  Dear Patient, this is an official reminder for your scheduled clinical appointment. Please verify details:
                                  <br /><strong>Clinic:</strong> {bookedClinicName}
                                  <br /><strong>Date/Time:</strong> {dateStr}, {timeStr}
                                  <br />Please complete your pre-appointment checklist on the HealthHub app before you attend.
                                </>;
                              }
                            })()}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedChannels.includes('whatsapp') && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex justify-between">
                          <span>{language === 'ms' ? 'Pratonton Makluman WhatsApp' : language === 'zh' ? 'WhatsApp 提醒预览' : language === 'ta' ? 'வாட்ஸ்அப் விழிப்பூட்டல் முன்னோட்டம்' : 'WhatsApp Notification Preview'}</span>
                          <span className="text-emerald-700">Verified Business Account</span>
                        </label>
                        <div className="bg-[#e5ddd5] border border-slate-300 text-slate-800 rounded-xl p-4 shadow-2xs space-y-2 bg-[radial-gradient(#d5cdc5_1.2px,transparent_1.2px)] [background-size:16px_16px]">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 border-b border-slate-300/40 pb-2">
                            <div className="w-4 h-4 bg-[#075e54] rounded-full flex items-center justify-center text-white text-[8px] font-black">✔</div>
                            <span>MOH HealthHub (Singapore)</span>
                            <span className="ml-auto text-[9px] font-normal text-slate-500">09:41 AM</span>
                          </div>
                          <div className="bg-[#e2f4c5] p-3 rounded-xl rounded-tl-none text-[11px] text-slate-700 leading-normal font-sans border border-[#d3eab0] relative shadow-3xs max-w-[280px]">
                            <h4 className="text-[11px] font-extrabold text-emerald-900 mb-1">MOH Appointment Alert</h4>
                            {(() => {
                              const dateStr = getLocalizedDate(appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.date : '22 July 2026', language);
                              const timeStr = appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.timeSlot : '10:30 AM';
                              const bookedClinicName = appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.clinic : activeClinics[0].name;

                              if (language === 'ms') {
                                return <>
                                  Hi, janji temu rujukan pesakit luar anda telah disahkan.
                                  <br /><br />
                                  🏥 <strong>Klinik:</strong> {bookedClinicName}
                                  <br />📅 <strong>Tarikh:</strong> {dateStr}
                                  <br />🕙 <strong>Masa:</strong> {timeStr}
                                  <br /><br />
                                  Sila lengkapkan senarai semak rujukan pesakit luar anda dalam HealthHub.
                                </>;
                              } else if (language === 'zh') {
                                return <>
                                  您好，您的预约普通门诊转诊咨询已成功确认。
                                  <br /><br />
                                  🏥 <strong>门诊:</strong> {bookedClinicName}
                                  <br />📅 <strong>日期:</strong> {dateStr}
                                  <br />🕙 <strong>时间:</strong> {timeStr}
                                  <br /><br />
                                  请登录 HealthHub 应用完善您的准备信息。
                                </>;
                              } else if (language === 'ta') {
                                return <>
                                  வணக்கம், உங்களின் சந்திப்பு வெற்றிகரமாக உறுதிப்படுத்தப்பட்டுள்ளது.
                                  <br /><br />
                                  🏥 <strong>சந்திப்பு:</strong> {bookedClinicName}
                                  <br />📅 <strong>தேதி:</strong> {dateStr}
                                  <br />🕙 <strong>நேரம்:</strong> {timeStr}
                                  <br /><br />
                                  ஹெல்த்ஹப் செயலியில் உங்கள் சரிபார்ப்புப் பட்டியலை முடிக்கவும்.
                                </>;
                              } else {
                                return <>
                                  Hi, your upcoming outpatient referral consultation is confirmed.
                                  <br /><br />
                                  🏥 <strong>Clinic:</strong> {bookedClinicName}
                                  <br />📅 <strong>Date:</strong> {dateStr}
                                  <br />🕙 <strong>Time:</strong> {timeStr}
                                  <br /><br />
                                  Please complete your pre-appointment checklist on the HealthHub app.
                                </>;
                              }
                            })()}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mock notify trigger */}
                    <button
                      onClick={onTriggerNotification}
                      className="w-full py-2.5 bg-[#00a859] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Bell className="w-4 h-4" /> {t('lock_trigger_push_alert')}
                    </button>
                  </div>
                )}

              {/* ── Language Preferences ── */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  {t('lang_pref_title')}
                </label>
                <p className="text-[10px] text-slate-500 leading-relaxed">{t('lang_pref_desc')}</p>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(LANG_LABELS) as [Language, string][]).map(([code, label]) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition border cursor-pointer ${
                        language === code
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-200'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        );
      })()}


        {/* ----------------- SCREEN 5: PROGRESS TIMELINE ----------------- */}
        {activeScreen === ScreenId.ProgressTimeline && (
          <div className="flex-col flex flex-1 h-full overflow-hidden">
            {/* Top Navigation */}
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-2 text-left shrink-0">
              <button 
                onClick={() => onChangeScreen(ScreenId.Home)} 
                className="p-1 hover:bg-slate-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <span className="font-bold text-sm text-slate-800">{t('journey_appointment_progress')}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-left pb-12">
              {/* Countdown Header */}
              <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white p-4 rounded-2xl shadow-sm text-left">
                <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold">{t('journey_appointment_status')}</p>
                <h3 className="font-extrabold text-base mt-1">
                  {appointment.status === 'confirmed' 
                    ? t('status_confirmed') 
                    : appointment.status === 'booked' 
                      ? t('status_booked') 
                      : t('status_unbooked')}
                </h3>
                <p className="text-[11px] text-emerald-100 mt-1 max-w-[280px] leading-relaxed">
                  {appointment.status === 'confirmed' || appointment.status === 'booked'
                    ? t('journey_slot_booked_desc')
                        .replace('{date}', getLocalizedDate(appointment.date, language))
                        .replace('{time}', appointment.timeSlot)
                    : t('unbooked_journey_desc')
                  }
                </p>
              </div>

              {/* Progress Timeline Block */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-5">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">{t('journey_interactive_referral_timeline')}</h4>
                
                <div className="relative pl-6 space-y-6 text-left">
                  {/* Vertical connecting line */}
                  <div className="absolute left-2.5 top-2.5 bottom-2 w-0.5 bg-slate-200" />

                  {/* Step 1: Referral received */}
                  <div className="relative">
                    <div className="absolute -left-[21px] w-5 h-5 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-xs">
                      ✓
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">{t('journey_referral_received')}</h5>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{t('journey_referral_received_desc')}</p>
                    </div>
                  </div>

                  {/* Step 2: Education completed */}
                  <div className="relative">
                    <div className="absolute -left-[21px] w-5 h-5 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-xs">
                      ✓
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">{t('journey_edu_completed')}</h5>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{t('journey_edu_completed_desc')}</p>
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
                      <h5 className="font-bold text-xs text-slate-800">{t('journey_slot_booked')}</h5>
                      {(appointment.status === 'booked' || appointment.status === 'confirmed') ? (
                        <p className="text-[10px] text-slate-500 leading-normal mt-0.5">
                          {t('journey_slot_booked_desc')
                            .replace('{date}', getLocalizedDate(appointment.date, language))
                            .replace('{time}', appointment.timeSlot)}
                        </p>
                      ) : (
                        <div className="space-y-1.5 mt-1">
                          <p className="text-[10px] text-amber-700 font-semibold">{t('journey_slot_action_needed')}</p>
                          <button 
                            onClick={() => onChangeScreen(ScreenId.Booking)}
                            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-bold transition cursor-pointer"
                          >
                            {t('book_now_btn')}
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
                          ? 'bg-amber-500' 
                          : 'bg-slate-300'
                    }`}>
                      {appointment.status === 'confirmed' ? '✓' : '4'}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">{t('journey_attend_counselling')}</h5>
                      {appointment.status === 'confirmed' ? (
                        <p className="text-[10px] text-emerald-700 font-bold leading-normal mt-0.5 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                          {t('booking_nric_verified')}
                        </p>
                      ) : appointment.status === 'booked' ? (
                        <div className="text-[10px] text-amber-805 font-medium leading-normal mt-0.5 bg-amber-50 px-2.5 py-1.5 rounded border border-amber-100">
                          <p className="font-bold">{t('booking_scheduled_upcoming')}</p>
                          <p className="mt-0.5">
                            {t('booking_success_details')
                              .split(/(\{date\}|\{time\}|\{clinic\})/g)
                              .map((part, index) => {
                                if (part === '{date}') return <strong key={index}>{getLocalizedDate(appointment.date, language)}</strong>;
                                if (part === '{time}') return <strong key={index}>{appointment.timeSlot}</strong>;
                                if (part === '{clinic}') return <strong key={index}>{appointment.clinic}</strong>;
                                return part;
                              })}
                          </p>
                        </div>
                      ) : (
                        <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{t('booking_session_desc')}</p>
                      )}
                    </div>
                  </div>

                  {/* Step 5: Receive results */}
                  <div className="relative">
                    <div className="absolute -left-[21px] w-5 h-5 rounded-full bg-slate-300 border-4 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-xs">
                      5
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">{t('journey_receive_results')}</h5>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{t('journey_receive_results_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prep Checklist link shortcut */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2 text-xs text-left">
                <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                  {t('journey_prep_title')}
                </h5>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  {t('journey_prep_desc')}
                </p>
                <button
                  onClick={() => onChangeScreen(ScreenId.Education)}
                  className="text-[#00a859] font-bold underline text-[11px] hover:text-emerald-800 flex items-center gap-0.5 mt-1 cursor-pointer"
                >
                  {t('journey_review_checklist_btn')} <ChevronRight className="w-3.5 h-3.5" />
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
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-200">{t('lockscreen_telco')}</span>
              <h2 className="text-5xl font-thin tracking-tight font-sans">09:41</h2>
              <p className="text-xs font-medium text-slate-200">{t('lockscreen_date')}</p>
            </div>

            {/* Notification Bubble (Feature 5) */}
            <div className="relative z-10 space-y-4 my-auto">
              
              <div className="bg-slate-900/85 backdrop-blur-md text-white border border-slate-700/50 p-4 rounded-2xl shadow-xl space-y-3 max-w-[320px] mx-auto text-left">
                {/* Header info */}
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 bg-[#00a859] rounded flex items-center justify-center text-white text-[9px] font-extrabold select-none">
                      HH
                    </div>
                    <span className="text-[11px] font-bold text-slate-200">{t('lock_healthhub_header')}</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">{t('lockscreen_days_left')}</span>
                </div>

                {/* Body message */}
                <div className="space-y-1">
                  <h4 className="font-bold text-xs text-slate-100">
                    {isFHReferred ? t('lock_counselling_reminder') : (
                      language === 'ms' ? 'Peringatan Janji Temu Pesakit Luar' :
                      language === 'zh' ? '普通门诊就诊提醒' :
                      language === 'ta' ? 'வெளிநோயாளி சந்திப்பு நினைவூட்டல்' :
                      'Outpatient Appointment Reminder'
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-snug font-sans">
                    {(() => {
                      const dateStr = getLocalizedDate(appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.date : '22 July 2026', language);
                      const timeStr = appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.timeSlot : '10:30 AM';
                      if (isFHReferred) {
                        return t('lock_counselling_tap_confirm_msg')
                          .replace('{date}', dateStr)
                          .replace('{time}', timeStr);
                      }
                      if (language === 'ms') {
                        return `Sahkan Konsultasi Pesakit Luar Am anda pada ${dateStr} @ ${timeStr}.`;
                      } else if (language === 'zh') {
                        return `请确认您将于 ${dateStr} @ ${timeStr} 参加普通门诊咨询。`;
                      } else if (language === 'ta') {
                        return `${dateStr} @ ${timeStr} மணிக்கு உங்கள் பொது வெளிநோயாளி ஆலோசனையை உறுதிப்படுத்தவும்.`;
                      } else {
                        return `Confirm your General Outpatient Consultation on ${dateStr} @ ${timeStr}.`;
                      }
                    })()}
                  </p>
                </div>

                {/* Lock Screen buttons */}
                <div className="flex flex-col gap-1.5 pt-1 text-left">
                  <button
                    onClick={() => handleNotificationClickAction('confirm')}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 shadow-sm cursor-pointer text-center"
                  >
                    {t('lock_confirm_attendance_btn')}
                  </button>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => handleNotificationClickAction('reschedule')}
                      className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[10px] font-semibold transition cursor-pointer text-center"
                    >
                      {t('lock_reschedule_btn')}
                    </button>
                    <button
                      onClick={() => handleNotificationClickAction('learn')}
                      className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[10px] font-semibold transition cursor-pointer text-center"
                    >
                      {t('lock_read_prep_btn')}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-300 text-center leading-normal max-w-[240px] mx-auto text-shadow-sm font-medium">
                {t('lockscreen_tap_confirm_info')}
              </p>
            </div>

            {/* Bottom Swipe hint */}
            <div className="relative text-center text-white/60 text-[10px] z-10 pb-4 font-mono animate-pulse">
              <span>{t('lockscreen_swipe_hint')}</span>
            </div>
          </div>
        )}


        {/* ----------------- SCREEN 7: PROFILE ----------------- */}
        {activeScreen === ScreenId.Profile && (
          <div className="flex-col flex flex-1 h-full overflow-hidden bg-slate-50 animate-fade-in">
            {/* Top Navigation Header */}
            <div className="bg-white px-4 py-3.5 border-b border-slate-200 flex justify-between items-center sticky top-0 z-10 shrink-0">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onChangeScreen(ScreenId.Home)} 
                  className="p-1 hover:bg-slate-100 rounded-full transition cursor-pointer"
                  id="profile-back-btn"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-700" />
                </button>
                <span className="font-bold text-sm text-slate-800">{t('profile_my_profile')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-emerald-50 text-[#00a859] font-extrabold uppercase px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#00a859]" /> {t('profile_singpass_linked')}
                </span>
                <button
                  onClick={() => onChangeScreen(ScreenId.ReminderSettings)}
                  className="p-1.5 hover:bg-slate-100 rounded-full transition cursor-pointer text-slate-600 hover:text-[#00a859]"
                  title={t('settings_title')}
                  id="profile-settings-btn"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-left pb-12">
              
              {/* Profile Avatar & Primary Status Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs flex items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/20 rounded-full translate-x-12 -translate-y-12 pointer-events-none" />
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-[#00a859] text-white font-extrabold flex items-center justify-center text-lg shadow-sm border border-emerald-400 shrink-0 select-none">
                  {patientInitials}
                </div>
                <div className="space-y-1 z-10">
                  <h3 className="font-display font-extrabold text-sm text-slate-900">{patientFullName}</h3>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] bg-emerald-50 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded border border-emerald-100">{patientNric}</span>
                    <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded border border-slate-200">{patientGender === 'Male' ? t('gender_male') : t('gender_female')}, {patientAge} {t('profile_yrs')}</span>
                  </div>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase font-mono tracking-wider">{t('profile_moh_identity_cleared')}</p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#00a859] font-mono border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#00a859]" /> {t('profile_section_personal')}
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">{t('profile_label_full_name')}</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">{patientFullName}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">{t('profile_label_dob')}</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">{patientDob}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">{t('profile_label_gender')}</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">{patientGender === 'Male' ? t('gender_male') : t('gender_female')}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">{t('profile_label_nric')}</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right font-mono">{patientNric} / HH-98315</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5">
                    <span className="col-span-5 text-slate-500 font-medium">{t('profile_label_preferred_lang')}</span>
                    <span className="col-span-7 text-right flex items-center justify-end gap-1 font-semibold text-slate-800">
                      <Globe className="w-3.5 h-3.5 text-emerald-600" />
                      {LANG_LABELS[language]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#00a859] font-mono border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#00a859]" /> {t('profile_section_contact')}
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">{t('profile_label_mobile')}</span>
                    <span className="col-span-7 text-[#00a859] font-bold text-right font-mono">{patientRecord?.contact_details || '+65 9123 4567'}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">{t('profile_label_email')}</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right truncate">{patientEmail}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5">
                    <span className="col-span-4 text-slate-500 font-medium">{t('profile_label_address')}</span>
                    <span className="col-span-8 text-slate-600 text-[11px] leading-tight text-right">
                      {patientAddress}
                    </span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#00a859] font-mono border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#00a859]" /> {t('profile_section_emergency')}
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">{t('profile_label_contact_name')}</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">{patientEmergencyName}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">{t('profile_label_relationship')}</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">{patientEmergencyRelationship}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5">
                    <span className="col-span-5 text-slate-500 font-medium">{t('profile_label_phone')}</span>
                    <span className={`col-span-7 text-right ${patientEmergencyPhone === t('not_on_file') ? 'font-semibold text-slate-800' : 'font-bold font-mono text-slate-800'}`}>{patientEmergencyPhone}</span>
                  </div>
                </div>
              </div>

              {/* Healthcare Preferences */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#00a859] font-mono border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00a859]" /> {t('profile_section_healthcare')}
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">{t('profile_label_preferred_clinic')}</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">{patientPrimaryClinic}</span>
                  </div>
                  
                  {/* Interactive link to settings */}
                  <button
                    onClick={() => onChangeScreen(ScreenId.ReminderSettings)}
                    className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-[#00a859] rounded-xl text-xs font-bold transition flex items-center justify-between border border-emerald-100 cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-[#00a859]" />
                      {t('profile_view_reminder_settings')}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#00a859]" />
                  </button>
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3.5">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#00a859] font-mono border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-[#00a859]" /> {t('profile_section_medical')}
                </h4>
                <div className="space-y-2.5 text-xs">
                  {patientLdlCholesterol != null && (
                    <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                      <span className="col-span-5 text-slate-500 font-medium">{t('profile_label_ldl')}</span>
                      <span className={`col-span-7 text-right font-bold ${patientLdlCholesterol >= 4.9 ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {patientLdlCholesterol.toFixed(1)} mmol/L
                      </span>
                    </div>
                  )}
                  {isFHReferred && (
                    <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                      <span className="col-span-5 text-slate-500 font-medium">{t('profile_label_active_referrals')}</span>
                      <span className="col-span-7 text-right">
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-100 rounded text-[10px]">{t('profile_fh_testing_badge')}</span>
                      </span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-12 gap-x-2 py-0.5">
                    <span className="col-span-4 text-slate-500 font-medium">{t('profile_label_upcoming_appts')}</span>
                    <span className="col-span-8 text-right font-medium text-slate-800 leading-normal">
                      {appointment.status === 'booked' || appointment.status === 'confirmed' ? (
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-emerald-700">{appointment.clinic}</span>
                          <span className="text-[10px] text-slate-500 mt-0.5 font-mono">{getLocalizedDate(appointment.date, language)} @ {appointment.timeSlot}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-slate-400">{t('profile_no_appointments')}</span>
                          <button 
                            onClick={() => onChangeScreen(ScreenId.Booking)}
                            className="text-[#00a859] font-bold text-[10px] hover:underline"
                          >
                            {isFHReferred ? t('profile_book_session_now') : (
                              language === 'ms' ? 'Tempah janji temu sekarang' :
                              language === 'zh' ? '立即预约普通门诊' :
                              language === 'ta' ? 'இப்போதே முன்பதிவு செய்யுங்கள்' :
                              'Book general appointment now'
                            )}
                          </button>
                        </div>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Account Section */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#00a859] font-mono border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 text-[#00a859]" /> {t('profile_section_account')}
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">{t('profile_label_linked_account')}</span>
                    <span className="col-span-7 text-emerald-700 font-extrabold text-right flex items-center justify-end gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00a859]" /> {t('profile_verified_singpass')}
                    </span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">{t('profile_label_privacy')}</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">
                      {isFHReferred ? t('profile_privacy_registry') : (
                        language === 'ms' ? 'Privasi Klinikal Standard Selamat' :
                        language === 'zh' ? '标准临床隐私安全' :
                        language === 'ta' ? 'நிலையான மருத்துவ தனியுரிமை பாதுகாப்பானது' :
                        'Standard Clinical Privacy Secure'
                      )}
                    </span>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        triggerToast("Successfully logged out from HealthHub simulation");
                        onChangeScreen(ScreenId.Home);
                      }}
                      className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('profile_logout')}
                    </button>
                  </div>
                </div>
              </div>

              {/* Data Privacy Legal Statement */}
              <div className="bg-slate-100 border border-slate-200 rounded-xl p-3.5 flex gap-2.5 items-start text-[10.5px] leading-relaxed text-slate-500">
                <Shield className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p>
                  {t('profile_privacy_statement')}
                </p>
              </div>

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
                  <div className="p-1.5 bg-emerald-50 text-[#00a859] rounded-lg border border-emerald-200">
                    <FileText className="w-4 h-4 text-[#00a859]" />
                  </div>
                  <div className="text-left">
                    <span className="text-[8px] font-extrabold text-[#00a859] uppercase tracking-wider font-mono bg-emerald-50 px-1 py-0.2 border border-emerald-100/50 rounded">
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
                <span className="font-bold text-[9px]">{t('edu_doc_page_of').replace('{current}', String(resourcePage + 1)).replace('{total}', String(selectedResource.pages.length))}</span>
                <div className="flex items-center gap-1.5">
                  {selectedResource.externalUrl && (
                    <a 
                      href={selectedResource.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#00a859] hover:text-emerald-800 font-bold bg-white px-2 py-1 rounded border border-slate-200 cursor-pointer shadow-3xs"
                    >
                      <ExternalLink className="w-3 h-3 text-[#00a859]" /> {t('edu_website_btn')}
                    </a>
                  )}
                  <button 
                    onClick={() => {
                      setDownloadToast(`Saved ${selectedResource.title} (${selectedResource.downloadSize}) to local storage.`);
                    }}
                    className="flex items-center gap-1 hover:text-emerald-700 font-bold bg-white px-2 py-1 rounded border border-slate-200 cursor-pointer shadow-3xs"
                  >
                    <Download className="w-3 h-3 text-[#00a859]" /> {selectedResource.downloadSize}
                  </button>
                  <button 
                    onClick={() => {
                      setDownloadToast("Sent document to printer...");
                    }}
                    className="flex items-center gap-1 hover:text-emerald-700 font-bold bg-white px-2 py-1 rounded border border-slate-200 cursor-pointer shadow-3xs"
                  >
                    <Printer className="w-3 h-3 text-slate-500" /> {t('edu_print_btn')}
                  </button>
                </div>
              </div>

              {/* Document Page Canvas */}
              <div className="flex-1 bg-slate-200 p-4 overflow-y-auto flex justify-center">
                <div className={`bg-white w-full max-w-[340px] min-h-[380px] rounded-lg shadow-md p-4.5 flex flex-col border border-slate-300 relative select-text ${
                  textSize === 'sm' ? 'education-text-sm' :
                  textSize === 'lg' ? 'education-text-lg' :
                  'education-text-md'
                }`}>
                  {/* Subtle watermarks and page header */}
                  <div className="border-b border-slate-100 pb-2 mb-3 flex justify-between items-center text-[8px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                    <span>FIRST HEALTH GROUP • EDUCATIONAL SERVICES</span>
                    <span>CONFIDENTIAL</span>
                  </div>

                  <h4 className="font-display font-extrabold text-[12.5px] text-slate-900 tracking-tight leading-snug border-l-4 border-emerald-500 pl-2">
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
                    <span>{t('edu_page_label')} {resourcePage + 1}</span>
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
                  <ChevronLeft className="w-4 h-4" /> {t('edu_prev_btn')}
                </button>
                
                <span className="text-[10px] text-slate-500 font-mono font-bold">
                  {resourcePage + 1} / {selectedResource.pages.length}
                </span>

                {resourcePage < selectedResource.pages.length - 1 ? (
                  <button
                    onClick={() => setResourcePage(prev => prev + 1)}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-emerald-700 cursor-pointer shadow-3xs"
                  >
                    {t('edu_next_btn')} <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="px-4 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-900 cursor-pointer shadow-3xs"
                  >
                    {t('edu_finish_btn')}
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

            </motion.div>
          </AnimatePresence>
        ) : null}

        {/* Floating Contextual Action Button for FH Referred patients */}
        {isFHReferred && activeScreen !== ScreenId.Booking && (
          <button
            onClick={() => onChangeScreen(ScreenId.Booking)}
            className="absolute bottom-4 right-4 z-40 bg-[#00a859] hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-full flex items-center gap-1.5 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-500/20 text-xs font-bold font-sans animate-subtle-pulse"
            title={appointment.status === 'booked' ? 'View Booking' : 'Book Now'}
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>{appointment.status === 'booked' ? 'View Booking' : 'Book Now'}</span>
          </button>
        )}

      </div>

      <div className="bg-white border-t border-slate-200 py-3 px-3 flex justify-around items-center z-40 select-none shrink-0">
        {[
          { icon: <HeartPulse className="w-5 h-5" />, label: 'Home', screen: ScreenId.Home },
          ...(isFHReferred ? [{ icon: <Dna className="w-5 h-5" />, label: 'Learn', screen: ScreenId.Education }] : []),
          { icon: <Calendar className="w-5 h-5" />, label: 'Book', screen: ScreenId.Booking },
          ...(isFHReferred ? [{ icon: <ClipboardList className="w-5 h-5" />, label: 'Journey', screen: ScreenId.ProgressTimeline }] : []),
          { icon: <User className="w-5 h-5" />, label: 'Profile', screen: ScreenId.Profile }
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={() => onChangeScreen(tab.screen)}
            className={`flex flex-col items-center gap-0.5 transition ${
              activeScreen === tab.screen ? 'text-[#00a859]' : 'text-slate-400 hover:text-slate-600'
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
