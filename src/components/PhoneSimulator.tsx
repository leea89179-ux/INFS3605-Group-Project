import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId, Appointment, ReminderPreferences, PatientRecord } from '../types';
import { HeartPulse, Dna, ClipboardList, Coins, ShieldAlert, Pill, ChevronRight, Calendar, CalendarX, Bell, Check, ArrowLeft, Play, Pause, MapPin, SquareCheck as CheckSquare, Square, Info, ShieldCheck, ExternalLink, MessageCircle, Smartphone, CircleAlert as AlertCircle, Share2, Users, Sparkles, BookOpen, FileText, Shield, Settings, CreditCard, User, ChevronDown, Clock, X, Download, Printer, ChevronLeft, CircleHelp as HelpCircle, Globe, CircleCheck as CheckCircle, Phone, LogOut, Search, Send, RefreshCw, MessageSquare, Mail, Lightbulb, Handshake, Heart, FlaskConical, Apple, Ban, Activity, Building2, Home, AlertTriangle, Brain, Crosshair, Navigation, LogIn, Type, Lock, Eye, EyeOff } from 'lucide-react';
import { educationalSections, faqs, HelpfulResource, helpfulResources } from '../data/education';
import { Language, LANG_LABELS, UI_TRANSLATIONS, getLocalizedEducationalSections, getLocalizedFaqs, getLocalizedDate, getLocalizedMonthOnly, getLocalizedHelpfulResources } from '../data/translations';
import { getPersonalizedGuide, getPersonalisedGuideContent } from '../data/personalizedContent';
import { getPersonalizedStory } from '../data/personalizedStories';
import { FH_COST_DATA, getLocalizedCostData } from '../data/pricingConstants';

interface PhoneSimulatorProps {
  activeScreen: ScreenId;
  onChangeScreen: (screenId: ScreenId) => void;
  appointment: Appointment;
  onBookAppointment: (date: string, time: string, clinic: string) => void;
  onAddCalendarEvent: () => void;
  reminderPrefs: ReminderPreferences;
  onUpdateReminderPrefs: (enabled: boolean, channel: string, frequency: string) => void;
  onTriggerNotification: () => void;
  onNotificationAction: (action: 'confirmed' | 'rescheduled' | 'education_viewed') => void;
  onCancelAppointment: () => void;
  isFHReferred: boolean;
  patientRecord?: PatientRecord;
  percentComplete?: number;
  onUpdateEducationProgress?: (patientId: string, percent: number) => void;
  emilyWongRefreshTrigger?: number;
  onSelectPersona?: (patientId: string) => void;
  onResetEmily?: () => void;
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
    provider: 'Clinical Specialist',
    role: 'Senior Genetic Counsellor',
    duration: '45 mins',
    clinic: 'National University Hospital Genetic Clinic',
    address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074',
    cost: 'S$18.50'
  },
  {
    date: '23 July 2026',
    time: '2:00 PM',
    provider: 'Clinical Specialist',
    role: 'Senior Genetic Counsellor',
    duration: '45 mins',
    clinic: 'National University Hospital Genetic Clinic',
    address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074',
    cost: 'S$18.50'
  },
  {
    date: '24 July 2026',
    time: '9:30 AM',
    provider: 'Clinical Specialist',
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
    provider: 'Clinical Specialist',
    role: 'Senior Genetic Counsellor'
  },
  {
    id: 'sgh',
    name: 'Singapore General Hospital Genetics Service',
    address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608',
    lat: 1.2798,
    lng: 103.8329,
    provider: 'Clinical Specialist',
    role: 'Principal Genetics Specialist'
  },
  {
    id: 'ttsh',
    name: 'Tan Tock Seng Hospital Clinical Genomics',
    address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433',
    lat: 1.3214,
    lng: 103.8458,
    provider: 'Clinical Specialist',
    role: 'Senior Clinical Geneticist'
  },
  {
    id: 'kkh',
    name: 'KK Women\'s and Children\'s Hospital Genetics Clinic',
    address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899',
    lat: 1.3094,
    lng: 103.8456,
    provider: 'Clinical Specialist',
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
    provider: 'Clinical Specialist',
    role: 'Family Physician'
  },
  {
    id: 'sgh',
    name: 'Ang Mo Kio Polyclinic',
    address: '21 Ang Mo Kio Central 2, Singapore 569666',
    lat: 1.3785,
    lng: 103.8454,
    provider: 'Clinical Specialist',
    role: 'Senior Resident Physician'
  },
  {
    id: 'ttsh',
    name: 'Kallang Polyclinic',
    address: '190 Serangoon Road, Singapore 218064',
    lat: 1.3125,
    lng: 103.8580,
    provider: 'Clinical Specialist',
    role: 'Family Physician'
  },
  {
    id: 'kkh',
    name: 'Gleneagles General Outpatient Clinic',
    address: '6A Napier Rd, Singapore 258500',
    lat: 1.3065,
    lng: 103.8015,
    provider: 'Clinical Specialist',
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
    return "Clinical Specialist (Family Physician)";
  } else if (clinicName.includes("Ang Mo Kio Polyclinic")) {
    return "Clinical Specialist (Senior Resident Physician)";
  } else if (clinicName.includes("Kallang Polyclinic")) {
    return "Clinical Specialist (Family Physician)";
  } else if (clinicName.includes("Gleneagles")) {
    return "Clinical Specialist (General Practitioner)";
  }
  if (clinicName.includes("Singapore General") || clinicName.includes("SGH")) {
    return "Clinical Specialist (Principal Genetics Specialist)";
  } else if (clinicName.includes("Tan Tock Seng") || clinicName.includes("TTSH")) {
    return "Clinical Specialist (Senior Clinical Geneticist)";
  } else if (clinicName.includes("KK Women") || clinicName.includes("KKH")) {
    return "Clinical Specialist (Lead Paediatric Counsellor)";
  }
  return "Clinical Specialist (Senior Genetic Counsellor)";
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
        { date: '21 July 2026', time: '10:00 AM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '21 July 2026', time: '1:30 PM', provider: 'Consultant Specialist', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      22: [
        { date: '22 July 2026', time: '10:30 AM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '22 July 2026', time: '11:30 AM', provider: 'Consultant Specialist', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '22 July 2026', time: '2:30 PM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '22 July 2026', time: '4:00 PM', provider: 'Consultant Specialist', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      23: [
        { date: '23 July 2026', time: '9:00 AM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '23 July 2026', time: '11:00 AM', provider: 'Consultant Specialist', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '23 July 2026', time: '2:00 PM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '23 July 2026', time: '3:30 PM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      24: [
        { date: '24 July 2026', time: '9:30 AM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '24 July 2026', time: '11:00 AM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '24 July 2026', time: '1:30 PM', provider: 'Consultant Specialist', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '24 July 2026', time: '4:00 PM', provider: 'Consultant Specialist', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ]
    },
    'August 2026': {
      12: [
        { date: '12 August 2026', time: '10:00 AM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '12 August 2026', time: '1:30 PM', provider: 'Consultant Specialist', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      13: [
        { date: '13 August 2026', time: '11:30 AM', provider: 'Consultant Specialist', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '13 August 2026', time: '2:30 PM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      14: [
        { date: '14 August 2026', time: '9:00 AM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '14 August 2026', time: '3:30 PM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      18: [
        { date: '18 August 2026', time: '1:30 PM', provider: 'Consultant Specialist', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '18 August 2026', time: '4:00 PM', provider: 'Consultant Specialist', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ]
    },
    'September 2026': {
      8: [
        { date: '8 September 2026', time: '10:00 AM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '8 September 2026', time: '1:30 PM', provider: 'Consultant Specialist', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      9: [
        { date: '9 September 2026', time: '11:30 AM', provider: 'Consultant Specialist', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '9 September 2026', time: '2:30 PM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      10: [
        { date: '10 September 2026', time: '9:00 AM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '10 September 2026', time: '3:30 PM', provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ],
      15: [
        { date: '15 September 2026', time: '1:30 PM', provider: 'Consultant Specialist', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
        { date: '15 September 2026', time: '4:00 PM', provider: 'Consultant Specialist', role: 'Consultant Cardiogeneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
      ]
    }
  },
  sgh: {
    'July 2026': {
      22: [
        { date: '22 July 2026', time: '9:00 AM', provider: 'Clinical Specialist', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '22 July 2026', time: '10:30 AM', provider: 'Consultant Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '22 July 2026', time: '1:30 PM', provider: 'Clinical Specialist', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '22 July 2026', time: '3:00 PM', provider: 'Consultant Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ],
      23: [
        { date: '23 July 2026', time: '11:30 AM', provider: 'Clinical Specialist', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '23 July 2026', time: '1:30 PM', provider: 'Consultant Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '23 July 2026', time: '3:00 PM', provider: 'Clinical Specialist', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ],
      25: [
        { date: '25 July 2026', time: '10:00 AM', provider: 'Clinical Specialist', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '25 July 2026', time: '11:30 AM', provider: 'Consultant Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '25 July 2026', time: '2:00 PM', provider: 'Clinical Specialist', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ]
    },
    'August 2026': {
      12: [
        { date: '12 August 2026', time: '9:00 AM', provider: 'Clinical Specialist', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '12 August 2026', time: '10:30 AM', provider: 'Consultant Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ],
      13: [
        { date: '13 August 2026', time: '1:30 PM', provider: 'Clinical Specialist', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '13 August 2026', time: '3:00 PM', provider: 'Consultant Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ],
      19: [
        { date: '19 August 2026', time: '11:30 AM', provider: 'Clinical Specialist', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '19 August 2026', time: '1:30 PM', provider: 'Consultant Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ]
    },
    'September 2026': {
      8: [
        { date: '8 September 2026', time: '9:00 AM', provider: 'Clinical Specialist', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '8 September 2026', time: '10:30 AM', provider: 'Consultant Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ],
      9: [
        { date: '9 September 2026', time: '1:30 PM', provider: 'Clinical Specialist', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '9 September 2026', time: '3:00 PM', provider: 'Consultant Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ],
      16: [
        { date: '16 September 2026', time: '11:30 AM', provider: 'Clinical Specialist', role: 'Principal Genetics Specialist', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
        { date: '16 September 2026', time: '1:30 PM', provider: 'Consultant Specialist', role: 'Senior Genetic Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
      ]
    }
  },
  ttsh: {
    'July 2026': {
      21: [
        { date: '21 July 2026', time: '10:30 AM', provider: 'Clinical Specialist', role: 'Consultant Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '21 July 2026', time: '1:30 PM', provider: 'Consultant Specialist', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '21 July 2026', time: '3:00 PM', provider: 'Consultant Specialist', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
      ],
      23: [
        { date: '23 July 2026', time: '10:00 AM', provider: 'Consultant Specialist', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '23 July 2026', time: '11:30 AM', provider: 'Clinical Specialist', role: 'Consultant Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '23 July 2026', time: '4:00 PM', provider: 'Consultant Specialist', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
      ],
      24: [
        { date: '24 July 2026', time: '9:00 AM', provider: 'Clinical Specialist', role: 'Consultant Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '24 July 2026', time: '11:00 AM', provider: 'Consultant Specialist', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '24 July 2026', time: '2:30 PM', provider: 'Consultant Specialist', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
      ]
    },
    'August 2026': {
      14: [
        { date: '14 August 2026', time: '10:30 AM', provider: 'Clinical Specialist', role: 'Consultant Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '14 August 2026', time: '1:30 PM', provider: 'Consultant Specialist', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
      ],
      20: [
        { date: '20 August 2026', time: '10:00 AM', provider: 'Consultant Specialist', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '20 August 2026', time: '4:00 PM', provider: 'Consultant Specialist', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
      ]
    },
    'September 2026': {
      10: [
        { date: '10 September 2026', time: '10:30 AM', provider: 'Clinical Specialist', role: 'Consultant Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '10 September 2026', time: '1:30 PM', provider: 'Consultant Specialist', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
      ],
      17: [
        { date: '17 September 2026', time: '10:00 AM', provider: 'Consultant Specialist', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
        { date: '17 September 2026', time: '4:00 PM', provider: 'Consultant Specialist', role: 'Senior Clinical Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
      ]
    }
  },
  kkh: {
    'July 2026': {
      22: [
        { date: '22 July 2026', time: '11:00 AM', provider: 'Clinical Specialist', role: 'Consultant Paediatric Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '22 July 2026', time: '1:30 PM', provider: 'Consultant Specialist', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '22 July 2026', time: '3:30 PM', provider: 'Consultant Specialist', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
      ],
      24: [
        { date: '24 July 2026', time: '10:30 AM', provider: 'Consultant Specialist', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '24 July 2026', time: '1:30 PM', provider: 'Clinical Specialist', role: 'Consultant Paediatric Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '24 July 2026', time: '3:30 PM', provider: 'Consultant Specialist', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
      ],
      27: [
        { date: '27 July 2026', time: '10:00 AM', provider: 'Consultant Specialist', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '27 July 2026', time: '1:00 PM', provider: 'Consultant Specialist', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '27 July 2026', time: '3:00 PM', provider: 'Clinical Specialist', role: 'Consultant Paediatric Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
      ]
    },
    'August 2026': {
      12: [
        { date: '12 August 2026', time: '11:00 AM', provider: 'Clinical Specialist', role: 'Consultant Paediatric Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '12 August 2026', time: '1:30 PM', provider: 'Consultant Specialist', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
      ],
      18: [
        { date: '18 August 2026', time: '10:30 AM', provider: 'Consultant Specialist', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '18 August 2026', time: '3:30 PM', provider: 'Consultant Specialist', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
      ]
    },
    'September 2026': {
      8: [
        { date: '8 September 2026', time: '11:00 AM', provider: 'Clinical Specialist', role: 'Consultant Paediatric Geneticist', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '8 September 2026', time: '1:30 PM', provider: 'Consultant Specialist', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
      ],
      15: [
        { date: '15 September 2026', time: '10:30 AM', provider: 'Consultant Specialist', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
        { date: '15 September 2026', time: '3:30 PM', provider: 'Consultant Specialist', role: 'Lead Paediatric Counsellor', duration: '45 mins', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
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
    { provider: 'Clinical Specialist', role: 'Senior Genetic Counsellor', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' },
    { provider: 'Consultant Specialist', role: 'Consultant Cardiogeneticist', cost: 'S$18–87', clinic: 'National University Hospital Genetic Clinic', address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074' }
  ],
  sgh: [
    { provider: 'Clinical Specialist', role: 'Principal Genetics Specialist', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' },
    { provider: 'Consultant Specialist', role: 'Senior Genetic Counsellor', cost: 'S$18–87', clinic: 'Singapore General Hospital Genetics Service', address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608' }
  ],
  ttsh: [
    { provider: 'Clinical Specialist', role: 'Consultant Geneticist', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' },
    { provider: 'Consultant Specialist', role: 'Senior Clinical Geneticist', cost: 'S$18–87', clinic: 'Tan Tock Seng Hospital Clinical Genomics', address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433' }
  ],
  kkh: [
    { provider: 'Clinical Specialist', role: 'Consultant Paediatric Geneticist', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' },
    { provider: 'Consultant Specialist', role: 'Lead Paediatric Counsellor', cost: 'S$18–87', clinic: 'KK Women\'s and Children\'s Hospital Genetics Clinic', address: '100 Bukit Timah Rd, Children\'s Tower Level 5, Singapore 229899' }
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
  'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026',
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
    cost: isGeneral ? 'S$4.00' : FH_COST_DATA.indexPatientEstimatedCash,
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

const getTodayNormalized = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

const parseCalendarDate = (monthStr: string, dayNum: number): Date | null => {
  if (!monthStr) return null;
  const parts = monthStr.trim().split(/\s+/);
  if (parts.length < 2) return null;
  const monthName = parts[0];
  const year = parseInt(parts[1], 10);
  if (isNaN(year)) return null;

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthIndex = months.indexOf(monthName);
  if (monthIndex === -1) return null;

  return new Date(year, monthIndex, dayNum);
};

// Returns true if target date is today or in the past (<= today)
const isTodayOrPast = (monthStr: string, dayNum: number): boolean => {
  const targetDate = parseCalendarDate(monthStr, dayNum);
  if (!targetDate) return true;
  const today = getTodayNormalized();
  return targetDate.getTime() <= today.getTime();
};

const isDateBeforeToday = (monthStr: string, dayNum: number): boolean => {
  return isTodayOrPast(monthStr, dayNum);
};

const isToday = (monthStr: string, dayNum: number): boolean => {
  const targetDate = parseCalendarDate(monthStr, dayNum);
  if (!targetDate) return false;
  const today = getTodayNormalized();
  return targetDate.getTime() === today.getTime();
};

const isMonthBeforeCurrent = (monthStr: string): boolean => {
  if (!monthStr) return false;
  const parts = monthStr.trim().split(/\s+/);
  if (parts.length < 2) return false;
  const monthName = parts[0];
  const year = parseInt(parts[1], 10);
  if (isNaN(year)) return false;

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthIndex = months.indexOf(monthName);
  if (monthIndex === -1) return false;

  const today = getTodayNormalized();
  const currentYear = today.getFullYear();
  const currentMonthIndex = today.getMonth();

  if (year < currentYear) return true;
  if (year === currentYear && monthIndex < currentMonthIndex) return true;
  return false;
};

const isAfterDecember2026 = (monthStr: string): boolean => {
  if (!monthStr) return false;
  const parts = monthStr.trim().split(/\s+/);
  if (parts.length < 2) return false;
  const year = parseInt(parts[1], 10);
  if (isNaN(year)) return false;
  return year > 2026;
};

const getEarliestFutureAppointment = (clinicId: string, customSlotsDb?: any) => {
  const db = customSlotsDb || CLINIC_SLOTS_DB;
  const clinicData = db[clinicId];
  if (!clinicData) return null;

  const today = getTodayNormalized();
  const candidates: { monthStr: string; dayNum: number; dateObj: Date }[] = [];

  for (const monthStr of Object.keys(clinicData)) {
    const daysObj = clinicData[monthStr];
    if (!daysObj) continue;

    for (const dayStr of Object.keys(daysObj)) {
      const dayNum = parseInt(dayStr, 10);
      if (isNaN(dayNum)) continue;

      const slots = daysObj[dayStr];
      if (!Array.isArray(slots) || slots.length === 0) continue;

      const dateObj = parseCalendarDate(monthStr, dayNum);
      if (!dateObj) continue;

      if (dateObj.getTime() > today.getTime()) {
        candidates.push({ monthStr, dayNum, dateObj });
      }
    }
  }

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
  return candidates[0];
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
  const validDay = daysWithSlots.find(day => !isTodayOrPast(month, day));
  return validDay || 0;
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
  emilyWongRefreshTrigger,
  onSelectPersona,
  onResetEmily,
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
  const PERSONA_MOBILE: Record<string, string> = {
    SL001: '+65 9123 4567',
    DT002: '+65 9234 5678',
    EW003: '+65 9345 6789',
    ML004: '+65 9456 7890',
    PN005: '+65 9567 8901',
    LH321: '+65 9876 5432',
  };
  const patientMobile = (patientRecord?.contact_details && !patientRecord.contact_details.includes('@'))
    ? patientRecord.contact_details
    : (PERSONA_MOBILE[currentPatientId] || '+65 9123 4567');
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
  const [titleLangMenuOpen, setTitleLangMenuOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('fh-app-language', lang);
    setLangMenuOpen(false);
    setTitleLangMenuOpen(false);
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

  const [eduExpanded, setEduExpanded] = useState<Record<string, boolean>>({});
  const [forceFullExpand, setForceFullExpand] = useState<Record<string, boolean>>({});
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>(() => {
    try {
      const qStatus = localStorage.getItem('fh-questionnaire-status');
      if (qStatus === 'completed') return 'recommended';
    } catch {}
    return 'all';
  });
  const [faqExpanded, setFaqExpanded] = useState<Record<number, boolean>>({});
  const [eduSubTab, setEduSubTab] = useState<'guides' | 'faq'>('guides');
  const [brochureSlideIndex, setBrochureSlideIndex] = useState(0);
  const [clinicalSlideIndex, setClinicalSlideIndex] = useState(0);
  const [videoSlideIndex, setVideoSlideIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoFrame, setVideoFrame] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [faqActiveIdx, setFaqActiveIdx] = useState<number | null>(null);
  const [textSize, setTextSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [questionnaireTextSize, setQuestionnaireTextSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [showTextSizeMenu, setShowTextSizeMenu] = useState<boolean>(false);
  const [showQuestionnaireTextSizeMenu, setShowQuestionnaireTextSizeMenu] = useState<boolean>(false);

  const [showOtherTopics, setShowOtherTopics] = useState<boolean>(false);
  const [expandedOtherTopicId, setExpandedOtherTopicId] = useState<string | null>(null);
  const [showCascadeTooltip, setShowCascadeTooltip] = useState<boolean>(false);

  // Simple Green Title / Splash Screen State
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [splashFading, setSplashFading] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [authTab, setAuthTab] = useState<'persona' | 'singpass'>('persona');
  const [authStage, setAuthStage] = useState<'credentials' | 'otp'>('credentials');
  const [nricInput, setNricInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [otpInput, setOtpInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [otpSending, setOtpSending] = useState<boolean>(false);

  const handleLoginSelectPersona = (patientId: string) => {
    if (onSelectPersona) {
      onSelectPersona(patientId);
    }
    setShowLoginModal(false);
    setSplashFading(true);
    setAuthError(null);
    setAuthStage('credentials');
    setTimeout(() => {
      setShowSplash(false);
      onChangeScreen(ScreenId.Home);
    }, 400);
  };

  const handleSingpassLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!nricInput.trim()) {
      setAuthError(t('auth_error_nric'));
      return;
    }
    if (!passwordInput.trim()) {
      setAuthError(t('auth_error_password'));
      return;
    }
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      setAuthStage('otp');
    }, 600);
  };

  const handleVerifyOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (otpInput.trim().length !== 6) {
      setAuthError(t('auth_otp_error'));
      return;
    }
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      handleLoginSelectPersona('EW003');
    }, 600);
  };

  const handleResendOtp = () => {
    setOtpSending(true);
    setTimeout(() => {
      setOtpSending(false);
      triggerToast(t('auth_otp_resent_success'));
    }, 800);
  };

  const handleCompleteOnboarding = (completed: boolean = true, status?: 'completed' | 'skipped') => {
    setOnboardingCompleted(completed);
    setShowOtherTopics(false);
    setExpandedOtherTopicId(null);
    const resolvedStatus = status || (completed ? 'completed' : 'skipped');
    setQuestionnaireStatus(resolvedStatus);
    if (resolvedStatus === 'completed') {
      setActiveFaqCategory('recommended');
    }
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
    setOnboardingFamiliarity(null);
    setOnboardingTopics([]);
    setOnboardingConcerns([]);
    try {
      localStorage.removeItem('fh-questionnaire-status');
      localStorage.removeItem('fh-onboarding-completed');
      localStorage.removeItem('fh-onboarding-familiarity');
      localStorage.removeItem('fh-onboarding-topics');
      localStorage.removeItem('fh-onboarding-concerns');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (emilyWongRefreshTrigger && emilyWongRefreshTrigger > 0) {
      handleRetakeOnboarding();
    }
  }, [emilyWongRefreshTrigger]);

  const scaleText = (defaultClass: string) => {
    return defaultClass;
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
    basics: false,
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

  // List of all 6 educational sections from localized sections source of truth, enriched with questionnaire personalization
  const allGuideTopics = useMemo(() => {
    const defaultSections = getLocalizedEducationalSections(language);
    if (!onboardingCompleted || questionnaireStatus === 'skipped') {
      return defaultSections;
    }
    return defaultSections.map(sec => {
      const pGuide = getPersonalizedGuide(
        sec.id,
        onboardingFamiliarity,
        onboardingConcerns,
        language,
        questionnaireStatus
      );
      return {
        ...sec,
        title: pGuide.title || sec.title,
        content: pGuide.content || sec.content,
        keyTakeaway: pGuide.keyTakeaway || sec.keyTakeaway,
        visualItems: (pGuide.visualItems && pGuide.visualItems.length > 0) ? pGuide.visualItems : sec.visualItems,
        readingTime: pGuide.readingTime || sec.readingTime,
        disclaimer: pGuide.disclaimer || sec.disclaimer,
        shortSummary: pGuide.shortSummary || sec.shortSummary,
      };
    });
  }, [language, onboardingCompleted, questionnaireStatus, onboardingFamiliarity, onboardingConcerns]);

  const selectedTopicsList = useMemo(() => {
    const raw = onboardingTopics || [];
    const hasNotSure = raw.includes('topic-notsure');
    const mapped = raw
      .filter(t => t !== 'topic-resources' && t !== 'helpful-resources' && t !== 'topic-faqs' && t !== 'topic-stories')
      .map(t => {
        if (t === 'topic-basics' || t === 'what-is-fh' || t === 'topic-risk' || t === 'heart-health') return 'what-is-fh';
        if (t === 'topic-family' || t === 'cascade-screening' || t === 'why-testing-matters') return 'why-testing-matters';
        if (t === 'topic-testing' || t === 'genetic-testing' || t === 'topic-next' || t === 'testing-process' || t === 'testing-guide') return 'testing-guide';
        if (t === 'topic-costs' || t === 'costs-subsidies') return 'costs-subsidies';
        if (t === 'topic-insurance' || t === 'insurance-rights' || t === 'insurance') return 'insurance-rights';
        if (t === 'topic-treatment' || t === 'topic-lifestyle' || t === 'treatment-medication' || t === 'healthy-lifestyle' || t === 'medication-fh') return 'medication-fh';
        return t;
      })
      .filter(t => t !== 'patient-experiences' && t !== 'topic-stories');

    if (hasNotSure) {
      const beginnerTopics = ['what-is-fh', 'why-testing-matters', 'testing-guide'];
      const combined = Array.from(new Set([...mapped, ...beginnerTopics]));
      return combined;
    }

    return Array.from(new Set(mapped));
  }, [onboardingTopics]);

  const selectedGuideTopics = useMemo(() => {
    if (!onboardingCompleted) return [];
    return allGuideTopics.filter(topic => selectedTopicsList.includes(topic.id));
  }, [allGuideTopics, selectedTopicsList, onboardingCompleted]);

  const unselectedGuideTopics = useMemo(() => {
    if (!onboardingCompleted) return allGuideTopics;
    return allGuideTopics.filter(topic => !selectedTopicsList.includes(topic.id));
  }, [allGuideTopics, selectedTopicsList, onboardingCompleted]);

  // Ensure all Education Hub tabs and groups remain closed by default when viewing
  useEffect(() => {
    // Keep all topic cards closed by default unless user explicitly clicks them
    setEduExpanded({});
    setExpandedGroups({
      basics: false,
      journey: false,
      costs: false,
    });
  }, [onboardingCompleted]);

  // 3. Personalized Onboarding - FAQ & Resource Scoring based on Questionnaire Answers
  const getFaqMatchScore = (faq: { category: string; question: string; answer: string }) => {
    if (!onboardingCompleted || questionnaireStatus === 'skipped') return 0;
    let score = 0;
    
    // Check concerns
    if (onboardingConcerns.includes('concern-cost') && faq.category === 'cost') score += 10;
    if (onboardingConcerns.includes('concern-insurance') && faq.category === 'insurance') score += 10;
    if (onboardingConcerns.includes('concern-test') && faq.category === 'testing') score += 10;
    if (onboardingConcerns.includes('concern-meds') && faq.category === 'medication') score += 10;
    if (onboardingConcerns.includes('concern-family') && faq.category === 'family') score += 10;
    if (onboardingConcerns.includes('concern-diagnosis') && faq.category === 'testing') score += 8;

    // Check topics
    if ((onboardingTopics.includes('topic-costs') || onboardingTopics.includes('costs-subsidies')) && faq.category === 'cost') score += 6;
    if ((onboardingTopics.includes('topic-insurance') || onboardingTopics.includes('insurance')) && faq.category === 'insurance') score += 6;
    if ((onboardingTopics.includes('topic-testing') || onboardingTopics.includes('topic-next') || onboardingTopics.includes('genetic-testing') || onboardingTopics.includes('testing-process')) && faq.category === 'testing') score += 6;
    if ((onboardingTopics.includes('topic-treatment') || onboardingTopics.includes('treatment-medication')) && faq.category === 'medication') score += 6;
    if ((onboardingTopics.includes('topic-family') || onboardingTopics.includes('cascade-screening')) && faq.category === 'family') score += 6;
    if ((onboardingTopics.includes('topic-basics') || onboardingTopics.includes('topic-risk')) && faq.category === 'testing') score += 4;

    return score;
  };

  const getFaqMatchReason = (faq: { category: string }) => {
    if (!onboardingCompleted || questionnaireStatus === 'skipped') return null;
    const score = getFaqMatchScore(faq as any);
    if (score <= 0) return null;

    if (faq.category === 'cost') return language === 'ms' ? 'Kos & Subsidi' : language === 'zh' ? '费用与津贴' : language === 'ta' ? 'செலவு' : 'Costs & Subsidies';
    if (faq.category === 'insurance') return language === 'ms' ? 'Insurans' : language === 'zh' ? '保险权益' : language === 'ta' ? 'காப்பீடு' : 'Insurance';
    if (faq.category === 'testing') return language === 'ms' ? 'Ujian Genetic' : language === 'zh' ? '基因检测' : language === 'ta' ? 'பரிசோதனை' : 'Testing';
    if (faq.category === 'medication') return language === 'ms' ? 'Ubat-ubatan' : language === 'zh' ? '药物治疗' : language === 'ta' ? 'மருந்துகள்' : 'Medication';
    if (faq.category === 'family') return language === 'ms' ? 'Pemeriksaan Keluarga' : language === 'zh' ? '家属筛查' : language === 'ta' ? 'குடும்ப பரிசோதனை' : 'Family Screening';

    return null;
  };

  const sortedFaqs = [...getLocalizedFaqs(language)].sort((a, b) => {
    return getFaqMatchScore(b) - getFaqMatchScore(a);
  });

  const getResourceMatchScore = (res: HelpfulResource) => {
    if (!onboardingCompleted || questionnaireStatus === 'skipped') return 0;
    let score = 0;

    // res-9: Consumer Guide: Moratorium on Genetic Testing and Insurance
    if (res.id === 'res-9') {
      if (onboardingConcerns.includes('concern-insurance')) score += 10;
      if (onboardingTopics.includes('topic-insurance') || onboardingTopics.includes('insurance')) score += 6;
    }

    // res-7: Patient Story: A Mother's Fight for Her Children (Video)
    if (res.id === 'res-7') {
      if (onboardingConcerns.includes('concern-family')) score += 10;
      if (onboardingTopics.includes('topic-family') || onboardingTopics.includes('cascade-screening')) score += 6;
      if (onboardingConcerns.includes('concern-[#00a859]') || onboardingTopics.includes('topic-risk')) score += 3;
    }

    // res-6: Patient Story: Living with FH (Young Adult Video)
    if (res.id === 'res-6') {
      if (onboardingConcerns.includes('concern-diagnosis') || onboardingConcerns.includes('concern-curious')) score += 10;
      if (onboardingTopics.includes('topic-basics') || onboardingTopics.includes('topic-testing')) score += 6;
    }

    // res-1: MOH Familial Hypercholesterolaemia Patient Information Leaflet
    if (res.id === 'res-1') {
      if (onboardingConcerns.includes('concern-cost')) score += 8;
      if (onboardingTopics.includes('topic-basics') || onboardingTopics.includes('topic-costs')) score += 6;
      if (onboardingConcerns.includes('concern-curious') || onboardingConcerns.includes('concern-diagnosis')) score += 6;
    }

    // res-4: Primary Care FH English Brochure
    if (res.id === 'res-4') {
      if (onboardingConcerns.includes('concern-meds') || onboardingConcerns.includes('concern-cost')) score += 10;
      if (onboardingTopics.includes('topic-treatment') || onboardingTopics.includes('topic-costs') || onboardingTopics.includes('treatment-medication')) score += 6;
    }

    // res-8: Genetic Testing for FH: Patient Decision Aid
    if (res.id === 'res-8') {
      if (onboardingConcerns.includes('concern-test') || onboardingConcerns.includes('concern-cost')) score += 10;
      if (onboardingTopics.includes('topic-testing') || onboardingTopics.includes('topic-next') || onboardingTopics.includes('genetic-testing')) score += 6;
    }

    // res-5: Singapore Heart Foundation FH Guide
    if (res.id === 'res-5') {
      if (onboardingConcerns.includes('concern-[#00a859]') || onboardingConcerns.includes('concern-curious')) score += 10;
      if (onboardingTopics.includes('topic-risk') || onboardingTopics.includes('topic-lifestyle')) score += 6;
    }

    // res-2: Clinical Practice Guidelines for Familial Hypercholesterolaemia
    if (res.id === 'res-2') {
      if (onboardingConcerns.includes('concern-test')) score += 8;
      if (onboardingTopics.includes('topic-testing') || onboardingTopics.includes('topic-next')) score += 6;
      if (onboardingFamiliarity === 'research' || onboardingFamiliarity === 'advanced') score += 8;
    }

    return score;
  };

  const getResourceMatchReason = (res: HelpfulResource) => {
    if (!onboardingCompleted || questionnaireStatus === 'skipped') return null;
    const score = getResourceMatchScore(res);
    if (score <= 0) return null;

    if (res.id === 'res-9') return language === 'ms' ? 'Insurans' : language === 'zh' ? '保险权益' : language === 'ta' ? 'காப்பீடு' : 'Insurance Protections';
    if (res.id === 'res-7') return language === 'ms' ? 'Keluarga' : language === 'zh' ? '家庭故事' : language === 'ta' ? 'குடும்பம்' : 'Family & Children';
    if (res.id === 'res-6') return language === 'ms' ? 'Pengalaman' : language === 'zh' ? '确诊经历' : language === 'ta' ? 'அனுபவம்' : 'Living with Diagnosis';
    if (res.id === 'res-1' || res.id === 'res-4' || res.id === 'res-8') {
      if (onboardingConcerns.includes('concern-cost') || onboardingTopics.includes('topic-costs')) {
        return language === 'ms' ? 'Kos & Subsidi' : language === 'zh' ? '费用津贴' : language === 'ta' ? 'செலவு' : 'Costs & Subsidies';
      }
    }
    if (res.id === 'res-8') return language === 'ms' ? 'Panduan Ujian' : language === 'zh' ? '检测指南' : language === 'ta' ? 'பரிசோதனை' : 'Testing Decision Aid';
    if (res.id === 'res-4') return language === 'ms' ? 'Ubat-ubatan' : language === 'zh' ? '药物治疗' : language === 'ta' ? 'மருந்துகள்' : 'Treatment & Meds';
    if (res.id === 'res-5') return language === 'ms' ? 'Kesihatan Jantung' : language === 'zh' ? '心脏健康' : language === 'ta' ? 'இதய ஆரோக்கியம்' : 'Heart Health';
    if (res.id === 'res-2') return language === 'ms' ? 'Panduan Klinikal' : language === 'zh' ? '临床指南' : language === 'ta' ? 'மருத்துவ வழிகாட்டி' : 'Clinical Practice';

    return language === 'ms' ? 'Padanan Relevan' : language === 'zh' ? '契合需求' : language === 'ta' ? 'பொருத்தமானது' : 'Relevant Match';
  };

  const sortedHelpfulResources = [...getLocalizedHelpfulResources(helpfulResources, language)].sort((a, b) => {
    return getResourceMatchScore(b) - getResourceMatchScore(a);
  });

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
  const [locationType, setLocationType] = useState<'registered' | 'live' | 'custom'>('registered');
  const [locationSearchQuery, setLocationSearchQuery] = useState<string>('');
  const [isDetectingLoc, setIsDetectingLoc] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  const [showChasModal, setShowChasModal] = useState<boolean>(false);
  const [showClinicDropdown, setShowClinicDropdown] = useState<boolean>(false);

  // Calendar Booking States (User request 2)
  const [selectedSlotMonth, setSelectedSlotMonth] = useState<string>(() => {
    const earliest = getEarliestFutureAppointment('nuh', CLINIC_SLOTS_DB);
    return earliest?.monthStr || getTodayMonthStr();
  });
  const [selectedCalendarMonth, setSelectedCalendarMonth] = useState<string>(() => {
    const earliest = getEarliestFutureAppointment('nuh', CLINIC_SLOTS_DB);
    return earliest?.monthStr || getTodayMonthStr();
  });
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(() => {
    const earliest = getEarliestFutureAppointment('nuh', CLINIC_SLOTS_DB);
    return earliest?.dayNum || 0;
  });
  const [selectedSlotObj, setSelectedSlotObj] = useState<ClinicSlot | null>(null);
  const [showMonthPopup, setShowMonthPopup] = useState<boolean>(false);

  useEffect(() => {
    if (patientAddress) {
      setPatientLocName(patientAddress);
      setLocationType('registered');
      setGpsError(null);
      const coords = PERSONA_COORDS[currentPatientId] || { lat: 1.3625, lng: 103.8542 };
      setPatientCoords(coords);
    }

    // Reset previous patient's booking state and modals to avoid carrying data over
    setBookingStep('available');
    setSelectedSlotObj(null);
    setSelectedSlotIdx(null);
    setProposedSlotObj(null);
    setBookingSubFlow(null);
    setShowChasModal(false);
    setShowClinicDropdown(false);

    const patientClinics = isFHReferred ? CLINICS : GENERAL_CLINICS;
    const matchingClinic = patientClinics.find(c => c.name === appointment?.clinic);
    const targetClinicId = matchingClinic ? matchingClinic.id : patientClinics[0].id;
    setSelectedClinicId(targetClinicId);
    setRescheduleClinicId(targetClinicId);

    const slotsDb = getClinicSlotsDb(isFHReferred);
    const earliest = getEarliestFutureAppointment(targetClinicId, slotsDb);
    if (earliest) {
      setSelectedCalendarMonth(earliest.monthStr);
      setSelectedCalendarDay(earliest.dayNum);
      setSelectedSlotMonth(earliest.monthStr);
    } else {
      setSelectedCalendarDay(0);
      setSelectedSlotMonth('');
    }
  }, [currentPatientId, patientAddress, isFHReferred, appointment?.clinic]);

  const handleClinicChange = (clinicId: string) => {
    setSelectedClinicId(clinicId);
    setShowClinicDropdown(false);
    setSelectedSlotObj(null);
    setSelectedSlotIdx(null);

    const earliest = getEarliestFutureAppointment(clinicId, activeClinicSlotsDb);
    if (earliest) {
      setSelectedCalendarMonth(earliest.monthStr);
      setSelectedCalendarDay(earliest.dayNum);
      setSelectedSlotMonth(earliest.monthStr);
    } else {
      setSelectedCalendarDay(0);
      setSelectedSlotMonth('');
    }
  };

  const selectMonth = (month: string) => {
    if (isMonthBeforeCurrent(month)) return;
    setSelectedCalendarMonth(month);
  };

  useEffect(() => {
    if (activeScreen === ScreenId.Booking) {
      const earliest = getEarliestFutureAppointment(selectedClinicId, activeClinicSlotsDb);
      if (earliest) {
        if (!selectedSlotMonth || selectedCalendarDay === 0 || !activeClinicSlotsDb[selectedClinicId]?.[selectedSlotMonth]?.[selectedCalendarDay] || isTodayOrPast(selectedSlotMonth, selectedCalendarDay)) {
          setSelectedCalendarMonth(earliest.monthStr);
          setSelectedCalendarDay(earliest.dayNum);
          setSelectedSlotMonth(earliest.monthStr);
        }
      } else {
        setSelectedCalendarDay(0);
        setSelectedSlotMonth('');
      }
    }
  }, [activeScreen, selectedClinicId, isFHReferred]);

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
      'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026',
      'January 2027', 'February 2027', 'March 2027', 'April 2027', 'May 2027', 'June 2027',
      'July 2027', 'August 2027', 'September 2027', 'October 2027', 'November 2027', 'December 2027'
    ];
    return available.includes(todayMonth) ? todayMonth : 'August 2026';
  });
  const [rescheduleCalendarDay, setRescheduleCalendarDay] = useState<number>(() => {
    const todayMonth = getTodayMonthStr();
    const initialMonth = [
      'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026'
    ].includes(todayMonth) ? todayMonth : 'August 2026';
    return getFirstAvailableDay(initialMonth, 'nuh', activeClinicSlotsDb);
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showNotificationPopup, setShowNotificationPopup] = useState<boolean>(false);

  // Knowledge Check State inside PhoneSimulator
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizSlideIndex, setQuizSlideIndex] = useState<number>(0);

  // Reset quiz when onboarding status or persona changes
  useEffect(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizSlideIndex(0);
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
                       language === 'ta' ? 'FH என்பது கல்லீரலின் LDL கொழுப்பை அகற்றும் திறனைக் குறைக்கிறது.' :
                       'FH is a genetic condition that reduces the liver\'s ability to clear "bad" LDL cholesterol.'
        },
        {
          id: 'q2',
          question: language === 'ms' ? 'Mengapakah diagnosis awal FH sangat penting?' :
                    language === 'zh' ? '为什么早期诊断 FH 至关重要？' :
                    language === 'ta' ? 'FH-ஐ ஆரம்பத்தில் கண்டறிவது ஏன் முக்கியம்?' :
                    'Why is early diagnosis of FH critical?',
          options: [
            language === 'ms' ? 'Diagnosis dan rawatan awal mengurangkan risiko kardiovaskular jangka panjang sehingga 80%' :
            language === 'zh' ? '早期诊断与治疗可将长期心血管风险降低高达 80%' :
            language === 'ta' ? 'ஆரம்பகால நோயறிதல் மற்றும் சிகிச்சை நீண்டகால இதய நோய் ஆபத்தை 80% வரை குறைக்கிறது' :
            'Early diagnosis and treatment reduce long-term cardiovascular risk by up to 80%',

            language === 'ms' ? 'Ia mengelakkan keperluan untuk senaman harian' :
            language === 'zh' ? '它可以完全免除日常运动的需求' :
            language === 'ta' ? 'இது உடற்பயிற்சி செய்ய வேண்டிய அவசியத்தைத் தவிர்க்கிறது' :
            'It eliminates the need for daily exercise',

            language === 'ms' ? 'Ia hanya penting jika seseorang ingin menjadi atlet' :
            language === 'zh' ? '它仅对计划成为专业运动员的人重要' :
            language === 'ta' ? 'விளையாட்டு வீரராக மாற விரும்புபவர்களுக்கு மட்டுமே இது முக்கியம்' :
            'It is only relevant if one wants to become a professional athlete'
          ],
          correctAnswer: 0,
          explanation: language === 'ms' ? 'Diagnosis dan rawatan awal mengurangkan risiko kardiovaskular jangka panjang sehingga 80%.' :
                       language === 'zh' ? '早期诊断与治疗可将长期心血管风险降低高达 80%。' :
                       language === 'ta' ? 'ஆரம்பகால நோயறிதல் மற்றும் சிகிச்சை நீண்டகால இதய நோய் ஆபத்தை 80% வரை குறைக்கிறது.' :
                       'Early diagnosis and treatment reduce long-term cardiovascular risk by up to 80%.'
        },
        {
          id: 'q3',
          question: language === 'ms' ? 'Berapakah peluang ahli keluarga darjah pertama mewarisi gen FH?' :
                    language === 'zh' ? '直系亲属（父母、兄弟姐妹、子女）遗传 FH 基因的概率是多少？' :
                    language === 'ta' ? 'முதல் நிலை குடும்ப உறுப்பினர்கள் FH மரபணுவைப் பெறுவதற்கான வாய்ப்பு என்ன?' :
                    'What is the chance a first-degree family member inherits the FH gene?',
          options: [
            '50%',
            '25%',
            '100%'
          ],
          correctAnswer: 0,
          explanation: language === 'ms' ? 'FH diwarisi secara dominan autosom, memberikan setiap anak peluang 50%.' :
                       language === 'zh' ? 'FH 是常染色体显性遗传，因此每个直系亲属有 50% 的概率遗传。' :
                       language === 'ta' ? 'FH என்பது ஆட்டோசோமால் ஆதிக்க முறையில் பரவுகிறது, எனவே 50% வாய்ப்பு உள்ளது.' :
                       'FH is inherited in an autosomal dominant pattern, meaning each child/sibling has a 50% chance.'
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
           language === 'ta' ? 'FH நோயாளிகளிடம் LDL கொலஸ்ட்ரால் மிகவும் அதிகமாக இருப்பதற்கான முக்கிய காரணம் என்ன?' :
           'What is the primary mechanism causing severely elevated LDL cholesterol in FH patients?')
        : (language === 'ms' ? 'Apakah itu Hiperkolesterolemia Familial (FH)?' :
           language === 'zh' ? '什么是家族性高胆固醇血症 (FH)？' :
           language === 'ta' ? 'குடும்பவழி ஹைபர்கொலஸ்டிரோலேமியா (FH) என்றால் என்ன?' :
           'What is Familial Hypercholesterolaemia (FH)?'),
      options: isAdvanced ? [
        language === 'ms' ? 'Mutasi genetik (seperti LDLR) yang menjejaskan pembersihan zarah LDL oleh hati' :
        language === 'zh' ? '导致肝脏 LDL 清除功能受损的基因突变 (例如 LDLR)' :
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
        ? (language === 'ms' ? 'FH disebabkan terutamanya oleh mutasi pada gen LDLR, APOB, atau PCSK9 yang menjejaskan pembersihan hati.' :
           language === 'zh' ? 'FH 主要是由于 LDLR、APOB 或 PCSK9 基因突变导致肝脏清除功能受损所致。' :
           language === 'ta' ? 'FH என்பது கல்லீரல் சுத்திகரிப்பை பாதிக்கும் LDLR, APOB அல்லது PCSK9 மரபணு மாற்றங்களால் ஏற்படுகிறது.' :
           'FH is predominantly caused by mutations in the LDLR, APOB, or PCSK9 genes affecting hepatic clearance.')
        : (language === 'ms' ? 'FH adalah keadaan keturunan sejak lahir, bermakna ubat bersama gaya hidup sihat biasanya diperlukan.' :
           language === 'zh' ? 'FH 是自出生起即存在的遗传性疾病，这意味着通常需要药物联合健康生活方式进行管理。' :
           language === 'ta' ? 'FH என்பது பிறப்பிலிருந்தே உள்ள பரம்பரை நிலை, மருந்துகளும் ஆரோக்கியமான பழக்கவழக்கங்களும் தேவை.' :
           'FH is an inherited condition from birth, meaning medication alongside healthy lifestyle is usually necessary.')
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
          language === 'ms' ? 'Rakyat Singapore dan PR yang layak menerima subsidi berperingkat MOH sehingga 70% dan boleh menggunakan MediSave500/700' :
          language === 'zh' ? '符合资格的新加坡公民与 PR 享有高达 70% MOH 审查津贴，并可用 MediSave500/700 支付' :
          language === 'ta' ? 'தகுதியுள்ள குடிமக்கள் மற்றும் PR-கள் 70% வரை MOH மானியம் மற்றும் MediSave500/700 ஐப் பயன்படுத்தலாம்' :
          'Eligible Singapore Citizens and Permanent Residents receive up to 70% means-tested MOH subsidies and can use MediSave500/700',

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
          ? (language === 'ms' ? 'Rakyat Singapura dan PR menerima subsidi MOH sehingga 70% untuk kaunseling dan ujian FH, serta perlindungan MediSave500/700.' :
             language === 'zh' ? '新加坡公民与永久居民享有高达 70% 的 MOH 基因检测与咨询津贴，并可用 MediSave500/700 支付。' :
             language === 'ta' ? 'சிங்கப்பூர் குடிமக்கள் மற்றும் PR-கள் FH ஆலோசனை மற்றும் பரிசோதனைக்கு 70% வரை MOH மானியம் மற்றும் MediSave500/700 பெறுகிறார்கள்.' :
             'Singapore Citizens and PRs receive up to 70% means-tested subsidies for FH counselling and genetic testing, with MediSave500/700 coverage.')
          : (language === 'ms' ? 'Saringan kaskad menguji ibu bapa, adik-beradik dan anak-anak pesakit indeks yang mempunyai 50% peluang pewarisan.' :
             language === 'zh' ? '级联家系筛查对具有 50% 遗传概率的患者父母、兄弟姐妹和子女进行针对性检测。' :
             language === 'ta' ? 'அடுக்கு திரையிடல் 50% பரம்பரை வாய்ப்புள்ள பெற்றோர், உடன்பிறந்தோர் மற்றும் குழந்தைகளை சோதிக்கிறது.' :
             'Cascade screening tests parents, siblings, and children of an index patient who have a 50% inheritance chance.')
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
          'All existing insurance policies are automatically cancelled',

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
          ? (language === 'ms' ? 'Di bawah moratorium LIA Singapura, keputusan ujian tidak boleh dituntut untuk polisi biasa dan pelan aktif tidak boleh diubah.' :
             language === 'zh' ? '在新加坡 LIA 暂行规定下，标准保单不得要求出示检测结果，现有生效保单亦不得擅自更改。' :
             language === 'ta' ? 'சிங்கப்பூரின் LIA உடன்படிக்கையின் கீழ், வழக்கமான பாலிசிகளுக்கு முடிவுகளைக் கேட்க முடியாது.' :
             'Under Singapore\'s LIA moratorium, test results cannot be demanded for standard policies and active plans cannot be altered.')
          : (language === 'ms' ? 'Ujian darah FH tidak memerlukan puasa dan hanya mengambil masa beberapa minit semasa lawatan pesakit luar.' :
             language === 'zh' ? 'FH 抽血检测无需禁食，门诊仅需几分钟即可完成。' :
             language === 'ta' ? 'FH இரத்த பரிசோதனைக்கு உண்ணாவிரதம் தேவையில்லை மற்றும் சில நிமிடங்கள் மட்டுமே ஆகும்.' :
             'The FH blood draw requires no fasting and takes only a few minutes during an outpatient visit.')
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
      setIsDetectingLoc(false);
      setGpsError('Geolocation is not supported by your browser or environment. Please use your registered address.');
      triggerToast('Live location not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPatientCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setPatientLocName('Current Device Live GPS Location');
        setLocationType('live');
        setIsDetectingLoc(false);
        setGpsError(null);
        triggerToast('Detected live location!');
      },
      (error) => {
        console.warn('GPS blocked/denied:', error);
        setIsDetectingLoc(false);
        let errorMsg = 'Location permission denied by browser or device settings. Please allow location access or choose your registered address.';
        if (error.code === 2) {
          errorMsg = 'GPS location position is unavailable. Please try again or choose your registered address.';
        } else if (error.code === 3) {
          errorMsg = 'Location detection request timed out. Please try again or choose your registered address.';
        }
        setGpsError(errorMsg);
        triggerToast('Location access denied');
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
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isPlayingVideo]);

  // Expand helper
  const toggleEdu = (id: string) => {
    setEduExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
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
    const currentClinicId = activeClinics.find(c => c.name === appointment?.clinic)?.id || activeClinics[0].id;
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
    setBookingStep('available');
    setSelectedSlotIdx(null);
    setSelectedSlotObj(null);
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

  const filteredFaqs = activeFaqCategory === 'recommended'
    ? sortedFaqs.filter(faq => getFaqMatchScore(faq) > 0)
    : activeFaqCategory === 'all' 
    ? getLocalizedFaqs(language) 
    : getLocalizedFaqs(language).filter(faq => faq.category === activeFaqCategory);

  // Icon selector helper
  const getIcon = (name: string, customColor?: string) => {
    const color = customColor || "text-[#00a859]";
    switch (name) {
      case 'HeartPulse':
      case '❤️':
      case 'heart': return <HeartPulse className={`w-5 h-5 ${color}`} />;
      case 'Dna':
      case '🧬': return <Dna className={`w-5 h-5 ${color}`} />;
      case 'ClipboardList':
      case '📋': return <ClipboardList className={`w-5 h-5 ${color}`} />;
      case 'Coins':
      case '💰':
      case '💵': return <Coins className={`w-5 h-5 ${color}`} />;
      case 'ShieldAlert': return <ShieldAlert className={`w-5 h-5 ${color}`} />;
      case 'Pills':
      case 'Pill':
      case '💊': return <Pill className={`w-5 h-5 ${color}`} />;
      case 'HelpCircle':
      case '🤔':
      case '😟':
      case '😊': return <Info className={`w-5 h-5 ${color}`} />;
      case 'FileText': return <FileText className={`w-5 h-5 ${color}`} />;
      case 'BookOpen': return <BookOpen className={`w-5 h-5 ${color}`} />;
      case 'Users':
      case '👥':
      case '👨‍👩‍👧': return <Users className={`w-5 h-5 ${color}`} />;
      case 'Shield':
      case 'ShieldCheck':
      case '🛡️':
      case '🛡': return <ShieldCheck className={`w-5 h-5 ${color}`} />;
      case 'Play': return <Play className={`w-5 h-5 ${color} fill-current ml-0.5`} />;
      case 'FlaskConical':
      case '🧪':
      case '💉': return <FlaskConical className={`w-5 h-5 ${color}`} />;
      case 'Apple':
      case '🥗':
      case '🍎': return <Apple className={`w-5 h-5 ${color}`} />;
      case 'Ban':
      case '🚫': return <Ban className={`w-5 h-5 ${color}`} />;
      case 'Activity':
      case '🏃‍♂️':
      case '🏃':
      case '🩸':
      case 'TrendingUp':
      case '📈':
      case 'TrendingDown':
      case '📉': return <Activity className={`w-5 h-5 ${color}`} />;
      case 'RefreshCw':
      case '🔄': return <RefreshCw className={`w-5 h-5 ${color}`} />;
      case 'Search':
      case '🔍': return <Search className={`w-5 h-5 ${color}`} />;
      case 'MessageSquare':
      case '🗣️':
      case '🗣': return <MessageSquare className={`w-5 h-5 ${color}`} />;
      case 'Calendar':
      case '📅': return <Calendar className={`w-5 h-5 ${color}`} />;
      case 'Building2':
      case '🇸🇬':
      case '🏦': return <Building2 className={`w-5 h-5 ${color}`} />;
      case 'Lock':
      case '🔒': return <Shield className={`w-5 h-5 ${color}`} />;
      case 'CheckCircle':
      case '✅': return <CheckCircle className={`w-5 h-5 ${color}`} />;
      case 'Clock':
      case '⏳': return <Clock className={`w-5 h-5 ${color}`} />;
      case 'Sparkles':
      case '✨':
      case '⭐': return <Sparkles className={`w-5 h-5 ${color}`} />;
      default: return <Info className={`w-5 h-5 ${color}`} />;
    }
  };

  return (
    <div 
      data-lang={language}
      className={`relative w-[375px] h-[780px] bg-slate-950 rounded-[55px] border-[12px] border-slate-800 shadow-2xl overflow-hidden flex flex-col shrink-0 select-none lang-${language} ${
      textSize === 'sm' ? 'education-text-sm' :
      textSize === 'lg' ? 'education-text-lg' :
      'education-text-md'
    }`}>
      
      {/* Simple Green Title / Splash Screen */}
      {showSplash && (
        <div
          className={`absolute inset-0 z-[100] bg-gradient-to-b from-[#009b52] via-[#00a859] to-[#008f4c] text-white flex flex-col justify-between items-center p-6 transition-opacity duration-500 ease-out select-none ${
            splashFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Top Header Controls: Language Selector centred near top */}
          <div className="w-full flex justify-center items-center pt-3 relative z-50">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTitleLangMenuOpen(prev => !prev);
                }}
                className="px-4 py-1.5 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-md text-white rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border border-white/30 shadow-xs"
                title={t('auth_aria_select_language')}
                id="title-page-language-select-btn"
              >
                <Globe className="w-4 h-4 text-white shrink-0" />
                <span>{LANG_LABELS[language]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/80 shrink-0" />
              </button>

              {/* Language Dropdown Menu */}
              {titleLangMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setTitleLangMenuOpen(false)} />
                  <div className="absolute left-1/2 -translate-x-1/2 top-9 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 min-w-[170px] text-xs font-medium animate-fade-in text-slate-800">
                    {[
                      { code: 'en', label: 'English (EN)' },
                      { code: 'ms', label: 'Bahasa Melayu (MS)' },
                      { code: 'zh', label: '简体中文 (ZH)' },
                      { code: 'ta', label: 'தமிழ் (TA)' }
                    ].map(({ code, label }) => (
                      <button
                        key={code}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLanguageChange(code as Language);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-xs cursor-pointer ${
                          language === code 
                            ? 'bg-emerald-50 text-[#00a859] font-bold' 
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {label}
                        {language === code && (
                          <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Center Brand Identity: HealthHub Logo + FHAssistant */}
          <div className="flex flex-col items-center text-center space-y-6 my-auto">
            {/* White Card with HealthHub Logo */}
            <div className="bg-white text-slate-900 px-8 py-5 rounded-3xl shadow-xl flex items-center justify-center gap-2 border border-emerald-100/40">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-sans">Health</span>
              <span className="font-black text-2xl tracking-tight text-[#00a859] font-sans">Hub</span>
              <svg className="w-7 h-7 ml-0.5 drop-shadow-xs" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="6" fill="#FBBF24" fillOpacity="0.9" />
                <circle cx="16" cy="8" r="6" fill="#10B981" fillOpacity="0.9" />
                <circle cx="12" cy="15" r="6" fill="#3B82F6" fillOpacity="0.9" />
                <circle cx="10" cy="12" r="4.5" fill="#EF4444" fillOpacity="0.85" />
              </svg>
            </div>

            {/* App Name & Subtitle */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2.5">
                <HeartPulse className="w-7 h-7 text-white stroke-[2.5]" />
                <h1 className="text-3xl font-black tracking-tight text-white font-display">
                  FHAssistant
                </h1>
              </div>
              <p className="text-xs font-semibold text-white/95 tracking-wide text-center max-w-[250px] leading-snug">
                {t('login_app_subtitle')}
              </p>
            </div>
          </div>

          {/* Bottom Footer & Login Button */}
          <div className="w-full flex flex-col items-center pb-8 space-y-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowLoginModal(true);
              }}
              className="px-9 py-3 bg-white text-[#008f4c] hover:bg-slate-50 active:scale-95 rounded-full font-bold text-base shadow-xl flex items-center justify-center gap-2.5 border border-emerald-100/50 transition-all duration-200 cursor-pointer"
            >
              <LogIn className="w-4.5 h-4.5 text-[#008f4c] stroke-[2.5]" />
              <span>{t('login_button')}</span>
            </button>
            <p className="text-xs font-bold text-white/90 tracking-wide">
              {t('login_footer')}
            </p>
          </div>
        </div>
      )}

      {/* Screen 2: Health-record selection modal */}
      {showLoginModal && (
        <div
          onClick={() => {
            setShowLoginModal(false);
          }}
          className="absolute inset-0 z-[150] bg-black/20 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in transition-all duration-300 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-[300px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col text-slate-800 animate-slide-up cursor-default"
          >
            {/* Header */}
            <div className="bg-[#00a859] px-4 py-3.5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-extrabold text-base text-white tracking-tight">
                  {t('login_select_persona')}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                }}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 active:bg-white/20 transition cursor-pointer"
                aria-label={t('auth_aria_close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Health-record options: 3 items */}
            <div className="p-4 space-y-3 bg-slate-50/50">
              {[
                { id: 'EW003', initials: 'EW', name: 'Emily Wong' },
                { id: 'SL001', initials: 'SL', name: 'Sarah Lim' },
                { id: 'DT002', initials: 'DT', name: 'Daniel Tan' },
              ].map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => handleLoginSelectPersona(persona.id)}
                  className="w-full text-left p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-[#00a859]/50 active:scale-[0.99] transition-all duration-200 flex items-center gap-3.5 cursor-pointer group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-10 h-10 rounded-full bg-[#00a859] text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                    {persona.initials}
                  </div>
                  <span className="font-extrabold text-sm text-slate-900 group-hover:text-[#00733a] transition-colors flex-1">
                    {persona.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#00a859] shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>

            {/* Security Footer inside Modal */}
            <div className="bg-slate-50 px-4 py-3.5 border-t border-slate-100 text-center">
              <p className="text-xs font-semibold text-slate-700 leading-snug max-w-[210px] mx-auto">
                {t('login_singpass_security')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold py-2 px-4 rounded-full shadow-lg z-50 flex items-center gap-2 border border-slate-800 animate-fade-in whitespace-nowrap">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
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
                {t('change_this_appointment')}
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
                      <p className="text-[10px] font-bold text-emerald-800">{t('reschedule_current_appt')}</p>
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
                    <label className="text-[10px] font-bold text-slate-500">{t('reschedule_select_clinic')}</label>
                    <div className="relative">
                      <button
                        onClick={() => setShowRescheduleClinicDropdown(!showRescheduleClinicDropdown)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 flex justify-between items-center shadow-3xs cursor-pointer text-left transition hover:border-emerald-600/40"
                      >
                        <div className="flex gap-2.5 min-w-0 items-center">
                          <div className="p-1.5 bg-emerald-50 rounded-lg shrink-0">
                            <MapPin className="w-4 h-4 text-[#00a859]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-xs text-slate-800 break-words">
                              {activeClinics.find(c => c.id === rescheduleClinicId)?.name}
                            </h4>
                          </div>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                      </button>

                      {showRescheduleClinicDropdown && (
                        <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-xl mt-1.5 shadow-md z-40 overflow-hidden divide-y divide-slate-100 animate-fade-in max-h-48 overflow-y-auto">
                          {activeClinics.map((clinic) => {
                            const isSelected = rescheduleClinicId === clinic.id;
                            return (
                              <button
                                key={clinic.id}
                                onClick={() => {
                                  setRescheduleClinicId(clinic.id);
                                  setShowRescheduleClinicDropdown(false);
                                  setProposedSlotObj(null);
                                  const earliest = getEarliestFutureAppointment(clinic.id, activeClinicSlotsDb);
                                  if (earliest) {
                                    setRescheduleCalendarMonth(earliest.monthStr);
                                    setRescheduleCalendarDay(earliest.dayNum);
                                  } else {
                                    setRescheduleCalendarDay(0);
                                  }
                                }}
                                className={`w-full text-left p-3 transition flex justify-between items-start gap-3 hover:bg-emerald-50/10 cursor-pointer ${isSelected ? 'bg-emerald-50/20' : 'bg-white'}`}
                              >
                                <div className="space-y-0.5 min-w-0 flex-1">
                                  <h5 className={`font-bold text-xs ${isSelected ? 'text-[#00a859]' : 'text-slate-800'}`}>{clinic.name}</h5>
                                  {clinic.address && <p className="text-[10px] text-slate-500 leading-snug">{clinic.address}</p>}
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
                  <div className="relative">
                    <div className={`grid grid-cols-7 gap-1 text-center transition-all ${isAfterDecember2026(rescheduleCalendarMonth) ? 'opacity-25 grayscale pointer-events-none blur-[0.5px]' : ''}`}>
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

                    {isAfterDecember2026(rescheduleCalendarMonth) && (
                      <div className="absolute inset-0 bg-slate-800/65 backdrop-blur-xs rounded-xl p-3 flex flex-col items-center justify-center text-center space-y-2 z-20 animate-fade-in shadow-xl border border-slate-600/40">
                        <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30">
                          <CalendarX className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 max-w-[220px]">
                          <h4 className="font-extrabold text-xs text-white leading-tight">
                            {t('schedule_not_released')}
                          </h4>
                          <p className="text-[9.5px] text-slate-200 leading-snug font-medium">
                            {t('schedule_not_released_desc')}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setRescheduleCalendarMonth('December 2026');
                            const days = Object.keys(activeClinicSlotsDb[rescheduleClinicId]?.['December 2026'] || {}).map(Number).filter(d => !isDateBeforeToday('December 2026', d));
                            setRescheduleCalendarDay(days[0] ?? 1);
                          }}
                          className="mt-1 px-3 py-1 bg-[#00a859] hover:bg-emerald-600 text-white font-extrabold text-[9.5px] rounded-lg transition cursor-pointer shadow-sm"
                        >
                          {t('return_to_dec_2026')}
                        </button>
                      </div>
                    )}
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
                                  <span>{slot.duration.replace('mins', t('booking_mins'))}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
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

                  {/* Detailed Cost card */}
                  <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-2xl space-y-2 text-left mt-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-800">
                        {getLocalizedCostData(language).cardHeading}
                      </span>
                      <span className="text-base font-black text-[#00a859] font-mono tracking-tight shrink-0 bg-white px-2.5 py-1 rounded-lg border border-emerald-200/80 shadow-2xs">
                        {getLocalizedCostData(language).indexPatientEstimatedCash}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal font-medium border-t border-emerald-200/60 pt-2">
                      {getLocalizedCostData(language).supportingText}
                    </p>
                  </div>
                </div>
              </div>{/* end scrollable body */}

              {/* Pinned footer */}
              <div className="px-4 py-3 bg-white border-t border-slate-200/80 shrink-0">
                <button
                  onClick={handleExitReschedule}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition cursor-pointer text-center border border-slate-200/90 flex items-center justify-center gap-1.5 shadow-3xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t('reschedule_keep_current')}</span>
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
                <ChevronLeft className="w-3.5 h-3.5" /> {t('btn_back') || 'Back'}
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

              {/* Cost card */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-2xl space-y-2 text-left">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    {getLocalizedCostData(language).cardHeading}
                  </span>
                  <span className="text-base font-black text-[#00a859] font-mono tracking-tight shrink-0 bg-white px-2.5 py-1 rounded-lg border border-emerald-200/80 shadow-2xs">
                    {getLocalizedCostData(language).indexPatientEstimatedCash}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal font-medium border-t border-emerald-200/60 pt-2">
                  {getLocalizedCostData(language).supportingText}
                </p>
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
                className="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition cursor-pointer text-center border border-slate-200 flex items-center justify-center gap-1.5 shadow-3xs"
              >
                <X className="w-3.5 h-3.5 text-slate-400" />
                <span>{t('reschedule_keep_current')}</span>
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
              initial={{ x: 14, opacity: 0.96 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -14, opacity: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className={`flex-col flex flex-1 min-h-0 h-full overflow-hidden relative animate-slide-in ${
                textSize === 'sm' ? 'education-text-sm' :
                textSize === 'lg' ? 'education-text-lg' :
                'education-text-md'
              }`}
            >

        {/* ----------------- SCREEN 1: HOME ----------------- */}
        {activeScreen === ScreenId.Home && (
          <div className="flex-col flex flex-1 h-full overflow-hidden bg-slate-50 relative animate-slide-in">
            {/* 1. Official HealthHub Top Header Row */}
            <div className="bg-white px-4 py-3 flex justify-between items-center border-b border-slate-100 shrink-0 no-text-scale">
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

              {/* Right controls: Language + Text Size + Settings */}
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
                            handleLanguageChange(code as Language);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between text-xs cursor-pointer ${
                            language === code 
                              ? 'bg-emerald-50 text-[#00a859] font-bold' 
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {label}
                          {language === code && (
                            <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white"><Check className="w-2.5 h-2.5 stroke-[3]" /></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Text Size Accessibility Controller */}
                <div className="relative no-text-scale">
                  <button
                    onClick={() => setShowTextSizeMenu(prev => !prev)}
                    className="p-1 hover:bg-slate-100 rounded-full transition cursor-pointer flex items-center justify-center no-text-scale"
                    title="Text Size & Accessibility"
                  >
                    <Type className="w-5 h-5 text-slate-700 no-text-scale" />
                  </button>

                  <AnimatePresence>
                    {showTextSizeMenu && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowTextSizeMenu(false)} />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -4 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl p-2 shadow-xl z-50 flex items-center gap-2 shrink-0 whitespace-nowrap no-text-scale"
                        >
                          <span className="text-[11px] font-bold text-slate-500 font-sans tracking-tight shrink-0 no-text-scale px-0.5">
                            {t('text_size_label')}
                          </span>
                          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-lg border border-slate-200/80 no-text-scale shrink-0">
                            <button
                              onClick={() => {
                                setTextSize('sm');
                                setShowTextSizeMenu(false);
                              }}
                              title="Small Text"
                              className={`h-7 px-2.5 rounded-md text-xs font-bold transition flex items-center justify-center cursor-pointer select-none no-text-scale shrink-0 min-w-[30px] ${
                                textSize === 'sm'
                                  ? 'bg-white text-[#00a859] shadow-2xs border border-slate-200/60 font-black'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              A-
                            </button>
                            <button
                              onClick={() => {
                                setTextSize('md');
                                setShowTextSizeMenu(false);
                              }}
                              title="Medium Text"
                              className={`h-7 px-2.5 rounded-md text-xs font-bold transition flex items-center justify-center cursor-pointer select-none no-text-scale shrink-0 min-w-[30px] ${
                                textSize === 'md'
                                  ? 'bg-white text-[#00a859] shadow-2xs border border-slate-200/60 font-black'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              A
                            </button>
                            <button
                              onClick={() => {
                                setTextSize('lg');
                                setShowTextSizeMenu(false);
                              }}
                              title="Large Text"
                              className={`h-7 px-2.5 rounded-md text-xs font-bold transition flex items-center justify-center cursor-pointer select-none no-text-scale shrink-0 min-w-[30px] ${
                                textSize === 'lg'
                                  ? 'bg-white text-[#00a859] shadow-2xs border border-slate-200/60 font-black'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              A+
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

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

            {/* CHAS Status & Subsidies Pop-up Dialog */}
            {showChasModal && (
              <div className="absolute inset-x-3 top-10 bottom-16 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 animate-fade-in flex flex-col max-w-[350px] mx-auto overflow-hidden">
                {/* Sticky Header */}
                <div className="flex justify-between items-center border-b border-slate-100 p-3.5 shrink-0 bg-white">
                  <div className="flex items-center gap-2 min-w-0">
                    <ShieldCheck className="w-4 h-4 text-[#00a859] shrink-0" />
                    <h4 className="font-bold text-xs text-slate-800 break-words truncate">{t('chas_status_subsidies')}</h4>
                  </div>
                  <button 
                    onClick={() => setShowChasModal(false)} 
                    className="text-slate-400 hover:text-slate-600 font-bold text-xs p-1 cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Scrollable Modal Body */}
                <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-left">
                  {/* Digital Card Preview */}
                  <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white rounded-xl p-3.5 shadow-md space-y-2">
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-blue-100 font-mono">{t('chas_blue_card_title')}</span>
                      </div>
                      <span className="text-[9px] font-extrabold bg-emerald-400 text-slate-900 px-2 py-0.5 rounded-full uppercase shrink-0">{t('chas_active_status')}</span>
                    </div>
                    <div>
                      <p className="text-xs font-black tracking-wide break-words">{patientName}</p>
                      <p className="text-[10px] text-blue-200 font-mono">NRIC: {patientNric}</p>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-blue-500/40 text-[9px] text-blue-200 flex-wrap gap-1">
                      <span>{t('moh_means_tested_tier')}</span>
                      <span className="font-mono">{t('chas_expires_date')}</span>
                    </div>
                  </div>

                  {/* Benefits Breakdown */}
                  <div className="space-y-2 text-xs">
                    <p className="font-bold text-slate-800 text-[11px] leading-snug">{t('your_subsidised_benefits')}</p>
                    <div className="space-y-2 bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#00a859] shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="font-extrabold text-[11px] text-slate-800 leading-snug">{t('polyclinic_gp_subsidies')}</p>
                          <p className="text-[10px] text-slate-600 leading-normal break-words">{t('polyclinic_gp_subsidies_desc')}</p>
                        </div>
                      </div>
                      {isFHReferred && (
                        <div className="flex items-start gap-2 pt-2 border-t border-emerald-100">
                          <CheckCircle className="w-3.5 h-3.5 text-[#00a859] shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <p className="font-extrabold text-[11px] text-slate-800 leading-snug">{t('fh_genetic_screening_coverage')}</p>
                            <p className="text-[10px] text-slate-600 leading-normal break-words">{t('fh_genetic_screening_coverage_desc')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sticky Footer */}
                <div className="p-3 border-t border-slate-100 flex gap-2 shrink-0 bg-white">
                  {isFHReferred && (
                    <button
                      onClick={() => {
                        setShowChasModal(false);
                        onChangeScreen(ScreenId.Booking);
                      }}
                      className="flex-1 py-2 px-3 bg-[#00a859] hover:bg-[#008f4c] text-white font-bold text-xs rounded-xl shadow-xs transition text-center cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {t('book_subsidised_slot')}
                    </button>
                  )}
                  <button
                    onClick={() => setShowChasModal(false)}
                    className={`${isFHReferred ? 'px-3.5' : 'w-full'} py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer text-center`}
                  >
                    {t('close')}
                  </button>
                </div>
              </div>
            )}

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto pb-36 space-y-4">
              
              {/* 2. User Welcome Greeting Row */}
              <div className="bg-white px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#00a859] font-extrabold flex items-center justify-center text-xs border border-emerald-100 shadow-inner">
                    {patientInitials}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-800">{patientName}</h4>
                    <p className="text-[9px] text-slate-400 font-medium">{patientNric}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowChasModal(true)}
                  className="bg-emerald-50 text-[#00a859] hover:bg-emerald-100/80 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200/70 font-sans transition cursor-pointer"
                >
                  {t('chas_blue')}
                </button>
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
                      {appointment.status === 'booked' || appointment.status === 'confirmed' ? (
                        <>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#00a859] font-sans">{t('next_appointment')}</p>
                          <p className="text-xs font-extrabold text-slate-800">
                            {(() => {
                              try {
                                const d = new Date(appointment.date);
                                if (!isNaN(d.getTime())) {
                                  const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
                                  return `${dayName}, ${getLocalizedDate(appointment.date, language)}`;
                                }
                              } catch (e) {}
                              return getLocalizedDate(appointment.date, language);
                            })()}
                          </p>
                          <p className="text-[11px] text-slate-600 font-medium leading-snug">
                            {appointment.timeSlot}{appointment.clinic ? ` • ${appointment.clinic}` : ''}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#00a859] font-sans">{t('recommended_next_step')}</p>
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
                        className="w-full min-h-[44px] py-2.5 px-3 bg-[#00a859] hover:bg-emerald-800 text-white rounded-xl text-xs font-bold tracking-wide transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer select-none border border-transparent leading-snug break-words text-center"
                      >
                        <span>{appointment.status === 'booked' || appointment.status === 'confirmed' ? t('manage_booking') : t('book_now_btn')}</span> <ChevronRight className="w-4 h-4 shrink-0" />
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
                            style={{ width: (appointment.status === 'booked' || appointment.status === 'confirmed') ? '76%' : '38%' }} 
                          />

                          {/* Step 1: Referral */}
                          <div className="flex flex-col items-center relative z-10 flex-1 min-w-0 px-0.5">
                            <div className="w-5 h-5 rounded-full bg-[#00a859] text-white flex items-center justify-center shadow-xs ring-4 ring-emerald-50 shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span className="text-[9px] font-bold text-[#00a859] mt-1.5 text-center leading-tight break-words max-w-full">
                              {t('step_referral')}
                            </span>
                          </div>

                          {/* Step 2: Book Counselling */}
                          <div className="flex flex-col items-center relative z-10 flex-1 min-w-0 px-0.5">
                            {(appointment.status === 'booked' || appointment.status === 'confirmed') ? (
                              <>
                                <div className="w-5 h-5 rounded-full bg-[#00a859] text-white flex items-center justify-center shadow-xs ring-4 ring-emerald-50 shrink-0">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </div>
                                <span className="text-[9px] font-bold text-[#00a859] mt-1.5 text-center leading-tight break-words max-w-full">
                                  {t('step_counselling')}
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="w-5 h-5 rounded-full border-2 border-[#00a859] bg-white flex items-center justify-center shadow-xs shrink-0">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#00a859]" />
                                </div>
                                <span className="text-[9px] font-bold text-[#00a859] mt-1.5 text-center leading-tight break-words max-w-full">
                                  {t('step_counselling')}
                                </span>
                              </>
                            )}
                          </div>

                          {/* Step 3: Genetic Testing */}
                          <div className="flex flex-col items-center relative z-10 flex-1 min-w-0 px-0.5">
                            <div className="w-5 h-5 rounded-full border border-slate-300 bg-white flex items-center justify-center shadow-3xs shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                            </div>
                            <span className="text-[9px] font-semibold text-slate-400 mt-1.5 text-center leading-tight break-words max-w-full">
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
                  {/* Card 1: Translation / Language */}
                  <button
                    onClick={() => {
                      setLangMenuOpen(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 hover:bg-slate-50/50 transition min-h-[82px] cursor-pointer active:scale-95"
                    title={t('select_app_language')}
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center mb-1 shrink-0">
                      <Globe className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight break-words">{t('link_translate')}</span>
                  </button>

                  {/* Card 2: Appointments */}
                  <button
                    onClick={() => onChangeScreen(ScreenId.Booking)}
                    className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition min-h-[82px] cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center mb-1 shrink-0">
                      <Calendar className="w-4 h-4 text-rose-500" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight break-words">{t('link_appointments')}</span>
                  </button>

                  {/* Card 3: CHAS Card & Subsidies */}
                  <button
                    onClick={() => setShowChasModal(true)}
                    className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-emerald-200 hover:bg-emerald-50/40 transition min-h-[82px] cursor-pointer active:scale-95"
                    title={t('chas_status_subsidies')}
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mb-1 shrink-0">
                      <ShieldCheck className="w-4 h-4 text-[#00a859]" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight break-words">{t('link_chas')}</span>
                  </button>

                  {/* Card 4: Medical reports / certs */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition min-h-[82px]">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mb-1 shrink-0">
                      <FileText className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight break-words">{t('link_medical_reports')}</span>
                  </div>

                  {/* Card 5: Medication Refill */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition min-h-[82px]">
                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mb-1 shrink-0">
                      <Pill className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight break-words">{t('link_medication_refill')}</span>
                  </div>

                  {/* Card 6: Payment */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition min-h-[82px]">
                    <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center mb-1 shrink-0">
                      <CreditCard className="w-4 h-4 text-sky-600" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight break-words">{t('link_payment')}</span>
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
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-2 shrink-0">
              <button onClick={() => onChangeScreen(ScreenId.Home)} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer transition shrink-0">
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <span className="font-bold text-sm text-slate-800 break-words min-w-0 flex-1">{t('referred_intro_title')}</span>
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
                <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-2 shrink-0 no-text-scale">
                  <div className="flex items-center gap-2 min-w-0">
                    <button 
                      onClick={() => {
                        if (onboardingStep > 1) {
                          setOnboardingStep(onboardingStep - 1);
                        } else {
                          onChangeScreen(ScreenId.Home);
                        }
                      }} 
                      className="p-1 hover:bg-slate-100 rounded-full cursor-pointer transition shrink-0"
                    >
                      <ArrowLeft className="w-5 h-5 text-slate-700" />
                    </button>
                    <span className="font-bold text-sm text-slate-800 break-words min-w-0 flex-1">
                      {t('title')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Expandable Single Accessibility Icon */}
                    <div className="relative no-text-scale">
                      <button
                        onClick={() => setShowQuestionnaireTextSizeMenu(prev => !prev)}
                        title={t('text_size_accessibility')}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center border no-text-scale ${
                          showQuestionnaireTextSizeMenu
                            ? 'bg-emerald-50 text-[#00a859] border-[#00a859]'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        <Type className="w-4 h-4 no-text-scale" />
                      </button>

                      <AnimatePresence>
                        {showQuestionnaireTextSizeMenu && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowQuestionnaireTextSizeMenu(false)} />
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -4 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -4 }}
                              transition={{ duration: 0.15 }}
                              className="absolute right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl p-2 shadow-xl z-50 flex items-center gap-2 shrink-0 whitespace-nowrap no-text-scale"
                            >
                              <span className="text-[11px] font-bold text-slate-500 font-sans tracking-tight shrink-0 no-text-scale px-0.5">
                                {t('text_size_label')}
                              </span>
                              <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-lg border border-slate-200/80 no-text-scale shrink-0">
                                <button
                                  onClick={() => {
                                    setTextSize('sm');
                                    setShowQuestionnaireTextSizeMenu(false);
                                  }}
                                  title={t('text_size_small')}
                                  className={`h-7 px-2.5 rounded-md text-xs font-bold transition flex items-center justify-center cursor-pointer select-none no-text-scale shrink-0 min-w-[30px] ${
                                    textSize === 'sm'
                                      ? 'bg-white text-[#00a859] shadow-2xs border border-slate-200/60 font-black'
                                      : 'text-slate-600 hover:text-slate-900'
                                  }`}
                                >
                                  A-
                                </button>
                                <button
                                  onClick={() => {
                                    setTextSize('md');
                                    setShowQuestionnaireTextSizeMenu(false);
                                  }}
                                  title={t('text_size_medium')}
                                  className={`h-7 px-2.5 rounded-md text-xs font-bold transition flex items-center justify-center cursor-pointer select-none no-text-scale shrink-0 min-w-[30px] ${
                                    textSize === 'md'
                                      ? 'bg-white text-[#00a859] shadow-2xs border border-slate-200/60 font-black'
                                      : 'text-slate-600 hover:text-slate-900'
                                  }`}
                                >
                                  A
                                </button>
                                <button
                                  onClick={() => {
                                    setTextSize('lg');
                                    setShowQuestionnaireTextSizeMenu(false);
                                  }}
                                  title={t('text_size_large')}
                                  className={`h-7 px-2.5 rounded-md text-xs font-bold transition flex items-center justify-center cursor-pointer select-none no-text-scale shrink-0 min-w-[30px] ${
                                    textSize === 'lg'
                                      ? 'bg-white text-[#00a859] shadow-2xs border border-slate-200/60 font-black'
                                      : 'text-slate-600 hover:text-slate-900'
                                  }`}
                                >
                                  A+
                                </button>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
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
                </div>

                {/* Questionnaire Content */}
                <div className="flex-1 flex flex-col bg-white text-slate-800 overflow-y-auto">
                  {/* Step Indicator and Content */}
                  <div className="flex-1 p-4 flex flex-col justify-between space-y-4">
                     {/* Progress Indicator */}
                    <div className="space-y-1.5">
                      <div className={`flex justify-between items-center text-slate-500 font-bold ${
                        language === 'ta' || language === 'ms' ? 'text-[9.5px]' : 'text-[11px]'
                      }`}>
                        <span>{t('question_indicator').replace('{step}', onboardingStep.toString())}</span>
                        <span className="text-[#00a859]">{t('percentage_complete').replace('{percent}', Math.round((onboardingStep / 3) * 100).toString())}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="bg-[#00a859] h-full transition-all duration-300" style={{ width: `${(onboardingStep / 3) * 100}%` }} />
                      </div>
                    </div>

                    {/* STEP 1: FAMILIARITY */}
                    {onboardingStep === 1 && (
                      <div className="flex-1 flex flex-col space-y-3 animate-fade-in text-left">
                        <h3 className="font-display font-extrabold text-[16px] sm:text-[17px] text-slate-900 tracking-tight leading-snug">
                          {t('step1_q')}
                        </h3>

                        <div className="space-y-2 pt-1 flex-1">
                          <div className="space-y-2">
                            {[
                              { id: 'new', label: t('step1_opt1_title') },
                              { id: 'little', label: t('step1_opt2_title') },
                              { id: 'research', label: t('step1_opt3_title') },
                              { id: 'advanced', label: t('step1_opt4_title') },
                            ].map((opt) => {
                              const isSelected = onboardingFamiliarity === opt.id;
                              return (
                                <button
                                  key={opt.id}
                                  onClick={() => setOnboardingFamiliarity(opt.id as any)}
                                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                                    isSelected
                                      ? 'bg-emerald-50/50 border-[#00a859] text-slate-900 shadow-xs'
                                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                                    isSelected ? 'border-[#00a859] bg-[#00a859]' : 'border-slate-300 bg-white'
                                  }`}>
                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[12.5px] font-normal text-slate-800 leading-snug block">{opt.label}</span>
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

                        <div className="grid grid-cols-2 gap-2 pt-1 overflow-y-auto max-h-[360px] pr-1">
                          {[
                            { id: 'topic-basics', iconName: 'Dna', label: t('step2_opt_basics') },
                            { id: 'topic-risk', iconName: 'HeartPulse', label: t('step2_opt_risk') },
                            { id: 'topic-testing', iconName: 'FlaskConical', label: t('step2_opt_testing') },
                            { id: 'topic-family', iconName: 'Users', label: t('step2_opt_family') },
                            { id: 'topic-treatment', iconName: 'Pill', label: t('step2_opt_treatment') },
                            { id: 'topic-lifestyle', iconName: 'Apple', label: t('step2_opt_lifestyle') },
                            { id: 'topic-costs', iconName: 'Coins', label: t('step2_opt_costs') },
                            { id: 'topic-insurance', iconName: 'ShieldCheck', label: t('step2_opt_insurance') },
                            { id: 'topic-next', iconName: 'ClipboardList', label: t('step2_opt_testing_process') },
                            { id: 'topic-notsure', iconName: 'HelpCircle', label: t('step2_opt_not_sure') },
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
                                className={`w-full text-left py-2 px-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between min-h-[44px] relative bg-white ${
                                  isSelected
                                    ? 'border-[#00a859] bg-emerald-50/40 ring-1 ring-[#00a859]/30 shadow-xs'
                                    : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                  }`}
                              >
                                <div className="flex items-center gap-1.5 min-w-0 flex-1 pr-1">
                                  <span className="text-[12px] shrink-0">{getIcon(opt.iconName || 'HelpCircle', "text-[#00a859]")}</span>
                                  <div className="flex-1 min-w-0">
                                    <span className="font-normal text-slate-800 leading-tight text-[11px] block break-words whitespace-normal">
                                      {opt.label}
                                    </span>
                                  </div>
                                </div>
                                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-all ${
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
                          {(
                            [
                              { id: 'concern-diagnosis', iconName: 'HelpCircle', label: t('concern_diagnosis_title')},
                              { id: 'concern-family', iconName: 'Users', label: t('concern_family_title')},
                              { id: 'concern-cost', iconName: 'Coins', label: t('concern_cost_title')},
                              { id: 'concern-test', iconName: 'FlaskConical', label: t('concern_test_title') },
                              { id: 'concern-meds', iconName: 'Pill', label: t('concern_meds_title') },
                              { id: 'concern-heart', iconName: 'HeartPulse', label: t('concern_heart_title') },
                              { id: 'concern-insurance', iconName: 'ShieldCheck', label: t('concern_insurance_title') },
                              { id: 'concern-curious', iconName: 'Sparkles', label: t('concern_curious_title') },
                            ] as Array<{ id: string; iconName: string; label: string; desc?: string }>
                          ).map((opt) => {
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
                                  <span className="text-[12px] font-normal text-slate-800 leading-tight block">{opt.label}</span>
                                  {opt.desc && <span className="text-[10px] text-slate-500 leading-normal block">{opt.desc}</span>}
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
              <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-2 shrink-0 no-text-scale">
                <div className="flex items-center gap-2 min-w-0">
                  <button onClick={() => onChangeScreen(ScreenId.Home)} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer transition shrink-0">
                    <ArrowLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <span className="font-bold text-sm text-slate-800 break-words min-w-0 flex-1">{t('edu_hub_title')}</span>
                </div>

                {/* Expandable Single Accessibility Icon */}
                <div className="relative no-text-scale">
                  <button
                    onClick={() => setShowTextSizeMenu(prev => !prev)}
                    title="Text Size & Accessibility"
                    className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center border no-text-scale ${
                      showTextSizeMenu
                        ? 'bg-emerald-50 text-[#00a859] border-[#00a859]'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    <Type className="w-4 h-4 no-text-scale" />
                  </button>

                  <AnimatePresence>
                    {showTextSizeMenu && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowTextSizeMenu(false)} />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -4 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl p-2 shadow-xl z-50 flex items-center gap-2 shrink-0 whitespace-nowrap no-text-scale"
                        >
                          <span className="text-[11px] font-bold text-slate-500 font-sans tracking-tight shrink-0 no-text-scale px-0.5">
                            {t('text_size_label')}
                          </span>
                          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-lg border border-slate-200/80 no-text-scale shrink-0">
                            <button
                              onClick={() => {
                                setTextSize('sm');
                                setShowTextSizeMenu(false);
                              }}
                              title="Small Text"
                              className={`h-7 px-2.5 rounded-md text-xs font-bold transition flex items-center justify-center cursor-pointer select-none no-text-scale shrink-0 min-w-[30px] ${
                                textSize === 'sm'
                                  ? 'bg-white text-[#00a859] shadow-2xs border border-slate-200/60 font-black'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              A-
                            </button>
                            <button
                              onClick={() => {
                                setTextSize('md');
                                setShowTextSizeMenu(false);
                              }}
                              title="Medium Text"
                              className={`h-7 px-2.5 rounded-md text-xs font-bold transition flex items-center justify-center cursor-pointer select-none no-text-scale shrink-0 min-w-[30px] ${
                                textSize === 'md'
                                  ? 'bg-white text-[#00a859] shadow-2xs border border-slate-200/60 font-black'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              A
                            </button>
                            <button
                              onClick={() => {
                                setTextSize('lg');
                                setShowTextSizeMenu(false);
                              }}
                              title="Large Text"
                              className={`h-7 px-2.5 rounded-md text-xs font-bold transition flex items-center justify-center cursor-pointer select-none no-text-scale shrink-0 min-w-[30px] ${
                                textSize === 'lg'
                                  ? 'bg-white text-[#00a859] shadow-2xs border border-slate-200/60 font-black'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              A+
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {!isFHReferred ? (
                /* Fallback state when patient is not referred */
                <div className="flex-col flex flex-1 pb-12 items-center justify-center p-6 text-center space-y-4 my-auto">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                    <ShieldAlert className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-800">{t('no_active_referrals_title')}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[280px]">
                    {t('no_active_referrals_desc')}
                  </p>
                  <button 
                    onClick={() => onChangeScreen(ScreenId.Home)} 
                    className="px-4 py-2.5 bg-[#00a859] hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition cursor-pointer"
                  >
                    {t('back_to_healthhub_home')}
                  </button>
                </div>
              ) : (
                /* High-fidelity Education Hub content for referred patients */
                <div className={`flex-1 overflow-y-auto flex flex-col pb-36 ${
                  textSize === 'sm' ? 'education-text-sm' :
                  textSize === 'lg' ? 'education-text-lg' :
                  'education-text-md'
                }`}>
                {/* Hero Section - Edge-to-edge Deep Teal Banner */}
                <div className="bg-[#00a859] text-white px-5 py-4.5 space-y-2.5 shrink-0 shadow-xs">
                  <div className="space-y-0.5 text-left">
                    <span className="text-xs font-semibold text-emerald-100 tracking-wide block">
                      {t('edu_hi_greeting').replace('{name}', language === 'ta' ? getTamilName(patientFirstNameCapitalized) : patientFirstNameCapitalized)}
                    </span>
                    <h3 className="font-display font-black text-base text-white tracking-tight leading-snug">
                      {t('edu_learning_guide_title')}
                    </h3>
                  </div>

                  <p className="text-[12px] text-emerald-50/95 leading-relaxed font-normal text-left">
                    {t('edu_banner_personalized_desc')}
                  </p>

                  <div className="pt-0.5 text-left">
                    <button
                      onClick={handleRetakeOnboarding}
                      className="inline-flex items-center gap-1.5 bg-white text-[#00a859] hover:bg-emerald-50 active:scale-95 font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all cursor-pointer border border-white/20"
                    >
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#00a859]" />
                      <span>{t('edu_banner_update_prefs_btn')}</span>
                    </button>
                  </div>
                </div>

                {/* Segmented Control Sub-Tabs */}
                <div className="px-4 pt-4 pb-1 bg-slate-50 shrink-0 border-b border-slate-200/40">
                  <div className="bg-slate-200/50 p-1 rounded-xl flex gap-1 border border-slate-200/30">
                    <button
                      id="edu-tab-guides"
                      onClick={() => setEduSubTab('guides')}
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
                      id="edu-tab-faq"
                      onClick={() => setEduSubTab('faq')}
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
                            {/* Patient Experience Wrapper Card */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-3xs space-y-4 text-left">
                              {/* Lesson Card Header: Title & Key Takeaway */}
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[11px] font-bold text-[#00a859] font-mono">
                                    {language === 'ms' ? 'Pengalaman pesakit' :
                                     language === 'zh' ? '患者体验故事' :
                                     language === 'ta' ? 'நோயாளி அனுபவம்' :
                                     'Patient experience'}
                                  </span>
                                </div>
                                <h4 className="font-display font-extrabold text-slate-900 text-[14px] leading-snug">
                                  {activeStory.title}
                                </h4>
                              </div>

                              {/* Patient Experience Video/Audio Player Section */}
                              <div className="bg-slate-900 rounded-xl overflow-hidden relative shadow-sm border border-slate-800">
                                {/* Player Header Label */}
                                <div className="bg-slate-950/90 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between text-white shrink-0">
                                  <span className="text-[11.5px] font-semibold text-emerald-400 break-words leading-tight min-w-0 pr-2">
                                    {activeStory.videoLabel}
                                  </span>
                                </div>

                                {/* Simulated Video Frame - Fixed Height prevents layout shifts across slides */}
                                <div 
                                  className="w-full h-[180px] sm:h-[190px] relative text-center cursor-pointer select-none overflow-hidden"
                                  onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                                >
                                  {isPlayingVideo ? (
                                    <div className="w-full h-full bg-emerald-950/90 flex flex-col justify-center items-center p-4 text-white animate-fade-in">
                                      {/* Center text area (flexible, centered, guaranteed to fit within fixed height) */}
                                      <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-2 overflow-y-auto w-full">
                                        <div className="animate-fade-in space-y-2 w-full my-auto">
                                          <p className="text-[12px] sm:text-[12.5px] font-medium leading-relaxed text-slate-100 max-w-full">
                                            {activeStory.frames[videoFrame]}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="w-full h-full bg-slate-900 flex flex-col justify-center items-center text-white p-4">
                                      <div 
                                        className="w-12 h-12 rounded-full bg-[#00a859] hover:bg-emerald-500 flex items-center justify-center shadow-md cursor-pointer transform active:scale-95 transition" 
                                        onClick={(e) => { e.stopPropagation(); setIsPlayingVideo(true); }}
                                      >
                                        <Play className="w-5 h-5 text-white ml-0.5 fill-current" />
                                      </div>
                                      <p className="text-[12px] text-slate-300 font-medium mt-3">
                                        {t('edu_play_story') || 'Play Audio Guide'}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                {/* Dedicated Bottom Control Bar */}
                                <div className="bg-slate-950 px-3.5 py-2.5 space-y-2 border-t border-slate-800 text-slate-300">
                                  {/* Row 1: Progress Bar & Slide Counter */}
                                  <div className="flex items-center gap-2.5 w-full min-w-0">
                                    <div className="flex-1 min-w-[70px] h-2 bg-slate-800 rounded-full overflow-hidden">
                                      <div 
                                        className="bg-[#00a859] h-full transition-all duration-300 rounded-full" 
                                        style={{ width: `${isPlayingVideo ? (((videoFrame + 1) / activeStory.frames.length) * 100) : 0}%` }} 
                                      />
                                    </div>
                                    <span className="text-[10px] font-mono font-bold text-slate-300 shrink-0 select-none">
                                      {isPlayingVideo ? `${videoFrame + 1}/${activeStory.frames.length}` : `0/${activeStory.frames.length}`}
                                    </span>
                                  </div>

                                  {/* Row 2: Playback Controls & Transcript Button */}
                                  <div className="flex items-center justify-between gap-2 w-full pt-0.5 min-w-0">
                                    <button 
                                      type="button"
                                      onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                                      className="text-emerald-400 hover:text-emerald-300 font-extrabold flex items-center gap-1.5 cursor-pointer text-[11.5px] shrink-0 transition whitespace-nowrap"
                                    >
                                      {isPlayingVideo ? (
                                        <><Pause className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> <span>{t('edu_pause_story') || 'Pause Story'}</span></>
                                      ) : (
                                        <><Play className="w-3.5 h-3.5 text-emerald-400 shrink-0 fill-current" /> <span>{t('edu_play_story') || 'Play Story'}</span></>
                                      )}
                                    </button>
                                    
                                    <button 
                                      type="button"
                                      onClick={() => setShowTranscript(!showTranscript)}
                                      className="text-[11.5px] text-slate-300 hover:text-white flex items-center gap-1.5 font-medium transition cursor-pointer shrink-0 whitespace-nowrap ml-auto"
                                    >
                                      <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                      <span>{showTranscript ? (t('edu_hide_transcript') || 'Hide Transcript') : (t('edu_view_transcript') || 'View Transcript')}</span>
                                    </button>
                                  </div>
                                </div>

                                {/* Accessible Transcript Container inside the dark player container */}
                                {showTranscript && (
                                  <div className="bg-slate-950/95 border-t border-slate-800 p-3.5 text-[10.5px] text-slate-200 leading-relaxed space-y-2 animate-fade-in text-left">
                                    <p className="font-bold text-emerald-400 text-[10px] border-b border-slate-800 pb-1.5">{t('edu_video_transcript_title')}</p>
                                    {activeStory.transcript.map((para, index) => (
                                      <p key={index} className="leading-relaxed text-slate-200">{para}</p>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        );
                      })()}

                      {/* Spec 4: Statistics 2x2 Grid 'Did You Know?' (Personalised & Concise) */}
                      {(() => {
                        const isQuestionnaireActive = onboardingCompleted && questionnaireStatus === 'completed';

                        const allCandidateStats = [
                          {
                            id: 'prevalence',
                            value: t('edu_stat_prevalence_val'),
                            label: t('edu_stat_prevalence_lbl'),
                            Icon: Building2,
                            baseScore: 10,
                            match: () => onboardingTopics.includes('topic-basics') || onboardingConcerns.includes('concern-diagnosis') || onboardingFamiliarity === 'new',
                          },
                          {
                            id: 'undiagnosed',
                            value: t('edu_stat_undiagnosed_val'),
                            label: t('edu_stat_undiagnosed_lbl'),
                            Icon: Search,
                            baseScore: 9,
                            match: () => onboardingTopics.includes('topic-basics') || onboardingTopics.includes('topic-testing') || onboardingConcerns.includes('concern-test') || onboardingConcerns.includes('concern-diagnosis'),
                          },
                          {
                            id: 'risk',
                            value: t('edu_stat_risk_val'),
                            label: t('edu_stat_risk_lbl'),
                            Icon: HeartPulse,
                            baseScore: 8,
                            match: () => onboardingTopics.includes('topic-risk') || onboardingTopics.includes('topic-lifestyle') || onboardingConcerns.includes('concern-heart') || onboardingConcerns.includes('concern-[#00a859]') || onboardingConcerns.includes('concern-curious'),
                          },
                          {
                            id: 'family',
                            value: t('edu_stat_family_val'),
                            label: t('edu_stat_family_lbl'),
                            Icon: Users,
                            baseScore: 7,
                            match: () => onboardingTopics.includes('topic-family') || onboardingConcerns.includes('concern-family'),
                          },
                          {
                            id: 'subsidies',
                            value: t('edu_stat_subsidies_val'),
                            label: t('edu_stat_subsidies_lbl'),
                            Icon: Coins,
                            baseScore: 6,
                            match: () => onboardingTopics.includes('topic-costs') || onboardingConcerns.includes('concern-cost'),
                          },
                          {
                            id: 'cost',
                            value: t('edu_stat_cost_val'),
                            label: t('edu_stat_cost_lbl'),
                            Icon: Coins,
                            baseScore: 5,
                            match: () => onboardingTopics.includes('topic-costs') || onboardingConcerns.includes('concern-cost'),
                          },
                          {
                            id: 'insurance',
                            value: t('edu_stat_insurance_val'),
                            label: t('edu_stat_insurance_lbl'),
                            Icon: ShieldCheck,
                            baseScore: 4,
                            match: () => onboardingTopics.includes('topic-insurance') || onboardingConcerns.includes('concern-insurance'),
                          },
                          {
                            id: 'meds',
                            value: t('edu_stat_meds_val'),
                            label: t('edu_stat_meds_lbl'),
                            Icon: Pill,
                            baseScore: 3,
                            match: () => onboardingTopics.includes('topic-treatment') || onboardingConcerns.includes('concern-meds'),
                          },
                          {
                            id: 'testing',
                            value: t('edu_stat_testing_val'),
                            label: t('edu_stat_testing_lbl'),
                            Icon: FlaskConical,
                            baseScore: 2,
                            match: () => onboardingTopics.includes('topic-testing') || onboardingTopics.includes('topic-next') || onboardingConcerns.includes('concern-test'),
                          },
                        ];

                        const scoredStats = allCandidateStats.map(stat => {
                          let matched = false;
                          let score = stat.baseScore;
                          if (isQuestionnaireActive && stat.match()) {
                            matched = true;
                            score += 50;
                          }
                          return { ...stat, score, isPersonalized: matched };
                        });

                        scoredStats.sort((a, b) => b.score - a.score);
                        const displayedStats = scoredStats.slice(0, 4);

                        return (
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <Lightbulb className="w-3.5 h-3.5 text-[#00a859]" />
                                <h4 className="text-[11.5px] font-bold text-[#00a859]">{t('edu_did_you_know')}</h4>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                              {displayedStats.map((stat) => {
                                const StatIcon = stat.Icon;
                                return (
                                  <div key={stat.id} className="bg-white rounded-xl p-3 flex flex-col justify-between shadow-3xs space-y-1.5 transition-colors border border-slate-200/90 hover:border-emerald-300">
                                    <div className="flex items-center justify-between">
                                      <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#00a859] flex items-center justify-center">
                                        <StatIcon className="w-3.5 h-3.5 text-[#00a859]" />
                                      </div>
                                    </div>
                                    <div>
                                      <h5 className="font-display font-extrabold text-[#00a859] text-[16px] leading-tight tracking-tight">
                                        {stat.value}
                                      </h5>
                                      <p className="font-bold text-[10px] text-slate-800 leading-snug mt-0.5">
                                        {stat.label}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}

                      {/* Learning Hub Accordions - Grouped */}
                      {(() => {
                        const useDefaultLayout = !onboardingCompleted || questionnaireStatus === 'skipped' || selectedGuideTopics.length === 0;

                        // Unified helpers for content richness, shared between Default Layout and Personalized Layout
                         const getCustomIllus = (id: string) => {
                           if (id === 'testing-process' || id === 'testing-guide' || id === 'genetic-testing') return (
                             <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-3 my-2.5 space-y-2.5 text-left shadow-2xs">
                               <div className="text-[11px] font-extrabold text-emerald-900 border-b border-emerald-200/60 pb-1.5 flex items-center gap-2">
                                 <ClipboardList className="w-4 h-4 text-emerald-600 shrink-0" />
                                 <span>{t('illus_clinical_testing_flow') || 'Clinical Testing Flow'}</span>
                               </div>
                               <div className="grid grid-cols-1 gap-2 text-[10px]">
                                 <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-lg border border-emerald-100/80 shadow-3xs">
                                   <span className="w-5 h-5 rounded-full bg-[#00a859] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                                   <div className="space-y-0.5 flex-1 min-w-0">
                                     <span className="font-bold text-slate-900 block leading-tight">{t('illus_step_1_title')}</span>
                                     <span className="text-[9.5px] text-slate-500 block leading-relaxed">{t('illus_step_1_desc')}</span>
                                   </div>
                                 </div>
                                 <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-lg border border-emerald-100/80 shadow-3xs">
                                   <span className="w-5 h-5 rounded-full bg-[#00a859] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                                   <div className="space-y-0.5 flex-1 min-w-0">
                                     <span className="font-bold text-slate-900 block leading-tight">{t('illus_step_2_title')}</span>
                                     <span className="text-[9.5px] text-slate-500 block leading-relaxed">{t('illus_step_2_desc')}</span>
                                   </div>
                                 </div>
                                 <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-lg border border-emerald-100/80 shadow-3xs">
                                   <span className="w-5 h-5 rounded-full bg-[#00a859] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                                   <div className="space-y-0.5 flex-1 min-w-0">
                                     <span className="font-bold text-slate-900 block leading-tight">{t('illus_step_3_title')}</span>
                                     <span className="text-[9.5px] text-slate-500 block leading-relaxed">{t('illus_step_3_desc')}</span>
                                   </div>
                                 </div>
                                 <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-lg border border-emerald-100/80 shadow-3xs">
                                   <span className="w-5 h-5 rounded-full bg-[#00a859] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">4</span>
                                   <div className="space-y-0.5 flex-1 min-w-0">
                                     <span className="font-bold text-slate-900 block leading-tight">{t('illus_step_4_title')}</span>
                                     <span className="text-[9.5px] text-slate-500 block leading-relaxed">{t('illus_step_4_desc')}</span>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           );
                           if (id === 'costs-subsidies') return null;
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
                                 <div className="text-[8.5px] font-bold text-slate-500">{t('illus_standard_high_cholesterol')}</div>
                                 <div className="text-[8.5px] text-slate-600 mt-1">{t('illus_standard_desc')}</div>
                               </div>
                               <div className="bg-emerald-50/50 border border-emerald-100/60 p-2 rounded-lg text-center">
                                 <div className="text-[8.5px] font-bold text-emerald-700">{t('illus_fh_familial')}</div>
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
                                 <Apple className="w-4 h-4 text-emerald-600 mx-auto mb-0.5" />
                                 <div className="text-[7.5px] font-extrabold text-slate-700">{t('illus_fiber')}</div>
                                 <div className="text-[7px] text-slate-400 leading-tight">{t('illus_fiber_desc')}</div>
                               </div>
                               <div className="bg-white border border-slate-150 p-1.5 rounded-lg text-center space-y-0.5 shadow-3xs">
                                 <Ban className="w-4 h-4 text-rose-500 mx-auto mb-0.5" />
                                 <div className="text-[7.5px] font-extrabold text-slate-700">{t('illus_limits')}</div>
                                 <div className="text-[7px] text-slate-400 leading-tight">{t('illus_limits_desc')}</div>
                               </div>
                               <div className="bg-white border border-slate-150 p-1.5 rounded-lg text-center space-y-0.5 shadow-3xs">
                                 <Activity className="w-4 h-4 text-sky-600 mx-auto mb-0.5" />
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
                          } else if (id === 'costs-subsidies') {
                             return null;
                          } else if ((id === 'insurance-rights' || id === 'insurance') && onboardingConcerns.includes('concern-insurance')) {
                            note = t('edu_note_insurance');
                          } else if ((id === 'treatment-medication' || id === 'medication-fh') && onboardingConcerns.includes('concern-meds')) {
                            note = t('edu_note_meds');
                          }
                          if (!note) return null;
                          return (
                            <div className="bg-emerald-50 border border-emerald-100/50 p-2.5 rounded-lg text-emerald-800 text-[9px] font-medium leading-relaxed">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline mr-1 -mt-0.5" /><span className="font-bold">{t('edu_personalized_support_prefix')}</span> {note}
                            </div>
                          );
                        };

                        const renderGuideCard = (rawTopic: any, isSelected: boolean) => {
                          const topic = (onboardingCompleted && questionnaireStatus === 'completed')
                            ? getPersonalisedGuideContent(rawTopic.id, onboardingFamiliarity, onboardingConcerns, questionnaireStatus, language)
                            : rawTopic;

                          const isExpanded = !!eduExpanded[topic.id];

                          const toggleCard = () => {
                            setEduExpanded(prev => ({ ...prev, [topic.id]: !prev[topic.id] }));
                          };

                          const customIllus = getCustomIllus(topic.id);

                          // Prepare points (up to 3 max)
                          const points = topic.visualItems && topic.visualItems.length > 0
                            ? topic.visualItems.slice(0, 3)
                            : (topic.subsections && topic.subsections.length > 0
                              ? topic.subsections.slice(0, 3)
                              : (topic.steps ? topic.steps.slice(0, 3) : []));

                          const btnLabel = isExpanded ? (t('step2_opt_show_less') || 'Show Less') : (t('read_guide') || 'Read Guide');
                          const titleLen = topic.title?.length || 0;
                          const summaryLen = topic.shortSummary?.length || 0;
                          const shouldStack = (titleLen + summaryLen) > 28 || textSize === 'lg' || textSize === 'md' || language !== 'en';

                          return (
                            <div key={topic.id} className="bg-white rounded-xl shadow-3xs transition-all duration-200 text-left border border-slate-200/80 w-full overflow-hidden">
                              {/* Preview Card: Topic title, One summary sentence, One clear action button */}
                              {shouldStack ? (
                                <div className="p-3.5 flex flex-col gap-3 text-left w-full">
                                  <div className="flex gap-3 items-start w-full">
                                    <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100/50 shrink-0 flex items-center justify-center text-[#00a859] mt-0.5">
                                      {getIcon(topic.iconName || 'HelpCircle')}
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-1 w-full text-left break-words [word-break:break-word] [hyphens:none]">
                                      <h5 className="font-extrabold text-[#00a859] font-sans leading-snug tracking-tight text-sm break-words [word-break:break-word] [hyphens:none]">{topic.title}</h5>
                                      <p className="text-xs text-slate-500 leading-relaxed font-sans break-words [word-break:break-word] [hyphens:none]">{topic.shortSummary}</p>
                                    </div>
                                  </div>
                                  <div className="w-full pt-0.5">
                                    <button
                                      onClick={toggleCard}
                                      aria-expanded={isExpanded}
                                      className="w-full px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#00a859] rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-200 shrink-0 min-h-[36px]"
                                    >
                                      <span className="whitespace-nowrap">{btnLabel}</span>
                                      <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="p-3.5 flex items-start justify-between gap-3 text-left w-full">
                                  <div className="flex gap-3 items-start flex-1 min-w-0">
                                    <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100/50 shrink-0 flex items-center justify-center text-[#00a859] mt-0.5">
                                      {getIcon(topic.iconName || 'HelpCircle')}
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-1 text-left break-words [word-break:break-word] [hyphens:none]">
                                      <h5 className="font-extrabold text-[#00a859] font-sans leading-snug tracking-tight text-sm break-words [word-break:break-word] [hyphens:none]">{topic.title}</h5>
                                      <p className="text-xs text-slate-500 leading-relaxed font-sans break-words [word-break:break-word] [hyphens:none]">{topic.shortSummary}</p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={toggleCard}
                                    aria-expanded={isExpanded}
                                    className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#00a859] rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-200 shrink-0 min-h-[36px]"
                                  >
                                    <span className="whitespace-nowrap">{btnLabel}</span>
                                    <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                              )}

                              {/* Expanded Guide: Short intro, Up to 3 points, 1 visual, 1 takeaway, optional details */}
                              {isExpanded && (
                                <div className="px-3.5 pb-3.5 pt-2.5 border-t border-slate-100 bg-slate-50/50 text-slate-600 leading-relaxed space-y-3 font-sans">
                                  {/* 1 short introduction */}
                                  {topic.content && (
                                    <p className="text-slate-700 font-medium leading-normal font-sans text-xs">
                                      {topic.content}
                                    </p>
                                  )}

                                  {/* Up to 3 concise points */}
                                  {points.length > 0 && (
                                    <div className="space-y-2 my-2">
                                      {points.map((pt: any, ptIdx: number) => (
                                        <div key={ptIdx} className="bg-white border border-slate-200/60 rounded-xl p-2.5 flex items-start gap-2.5 shadow-3xs">
                                          <div className="shrink-0 leading-none mt-0.5 bg-emerald-50 border border-emerald-100 p-1 rounded-lg text-[#00a859]">
                                            {pt.icon ? getIcon(pt.icon, "text-[#00a859]") : <Check className="w-3.5 h-3.5" />}
                                          </div>
                                          <div className="space-y-0.5 flex-1 min-w-0 text-left">
                                            <h6 className="font-bold text-xs text-slate-900 leading-tight">
                                              {pt.label || pt.title || pt.heading}
                                            </h6>
                                            <p className="text-xs text-slate-500 leading-normal">
                                              {pt.text || pt.description}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* 1 relevant visual where useful */}
                                  {customIllus}

                                  {/* 1 topic-specific Key Takeaway */}
                                  {topic.keyTakeaway && (
                                    <div className="border-l-4 border-[#00a859] bg-emerald-50/80 px-3 py-2 rounded-r-xl">
                                      <p className="font-bold text-xs text-emerald-900">{t('edu_key_takeaway') || 'Key Takeaway'}</p>
                                      <p className="text-emerald-800 text-xs mt-0.5 leading-normal">{topic.keyTakeaway}</p>
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
                                <h4 className="text-[10px] font-bold text-slate-500">{t('edu_learning_hub')}</h4>
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
                                          const sec = getLocalizedEducationalSections(language).find(s => s.id === secId);
                                          if (!sec) return null;
                                          return renderGuideCard(sec, false);
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
                                  <h4 className="text-[12px] font-extrabold text-slate-900 font-display tracking-tight flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#00a859]" /> {t('edu_selected_for_you')}</h4>
                                </div>
                                <div className="space-y-3">
                                  {selectedGuideTopics.map(topic => renderGuideCard(topic, true))}
                                </div>
                              </div>
                            )}

                            {/* Section 2: View Other Topics */}
                            {unselectedGuideTopics.length > 0 && (
                              <div className="pt-2 border-t border-slate-100/60">
                                <div className="bg-white border border-slate-200/80 rounded-xl p-3 transition-all duration-200 text-left">
                                  <button
                                    onClick={() => setShowOtherTopics(!showOtherTopics)}
                                    aria-expanded={showOtherTopics}
                                    className="w-full flex items-center justify-between gap-2 text-left cursor-pointer"
                                  >
                                    <h4 className="text-[11.5px] font-extrabold text-slate-800 font-display tracking-tight flex items-center gap-1.5">
                                      <BookOpen className="w-3.5 h-3.5 text-[#00a859] shrink-0" />
                                      <span>{showOtherTopics ? (t('step2_opt_minimise') || 'Minimise') : (t('step2_opt_view_other_topics') || 'View Other Topics')}</span>
                                    </h4>
                                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${showOtherTopics ? 'rotate-180' : ''}`} />
                                  </button>

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

                      {/* Knowledge Check Section (Carousel) - Strictly under Guides tab only */}
                      <div className="bg-white border border-emerald-200/80 rounded-2xl p-4 shadow-3xs text-left space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#00a859] flex items-center justify-center font-bold text-xs">
                              <CheckSquare className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="font-display font-extrabold text-xs text-slate-900">{t('knowledge_check_title')}</h4>
                            </div>
                          </div>
                        </div>

                        {!quizSubmitted ? (
                          <div className="space-y-2">
                            {/* Carousel Stepper / Header */}
                            <div className="px-0.5 py-0.5">
                              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                                <span className="flex items-center gap-1.5">
                                  <span className="font-bold text-[#00a859]">{t('quiz_question_label')} {quizSlideIndex + 1}</span>
                                  <span className="text-slate-400 font-normal">{t('quiz_of')} {quizQuestions.length}</span>
                                </span>
                              </div>
                            </div>

                            {/* Active Question Carousel Card */}
                            {(() => {
                              const currentQ = quizQuestions[quizSlideIndex] || quizQuestions[0];
                              const selectedOpt = quizAnswers[currentQ.id];
                              const totalAnswered = Object.keys(quizAnswers).length;
                              const allAnswered = totalAnswered >= quizQuestions.length;

                              return (
                                <div className="bg-slate-50/70 p-3.5 rounded-xl min-h-[380px] flex flex-col justify-between">
                                  <div className="space-y-2.5 flex-1">
                                    <p className="text-[12px] font-bold text-slate-800 leading-snug">
                                      {quizSlideIndex + 1}. {currentQ.question}
                                    </p>
                                    <div className="space-y-2">
                                      {currentQ.options.map((opt, optIdx) => {
                                        const isSelected = selectedOpt === optIdx;
                                        return (
                                          <button
                                            key={optIdx}
                                            onClick={() => setQuizAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }))}
                                            className={`w-full text-left p-2.5 rounded-lg text-[11px] font-medium transition flex items-center gap-2.5 cursor-pointer border ${
                                              isSelected
                                                ? 'bg-emerald-50 border-[#00a859] text-emerald-900 font-bold'
                                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/60'
                                            }`}
                                          >
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                              isSelected ? 'border-[#00a859] bg-[#00a859] text-white' : 'border-slate-300'
                                            }`}>
                                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                            </div>
                                            <span className="leading-tight">{opt}</span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  {/* Carousel Navigation Controls */}
                                  <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-slate-200/60 mt-2 shrink-0">
                                    <button
                                      onClick={() => setQuizSlideIndex(prev => Math.max(0, prev - 1))}
                                      disabled={quizSlideIndex === 0}
                                      className={`px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition flex items-center gap-1 ${
                                        quizSlideIndex === 0
                                          ? 'text-slate-300 bg-slate-100 cursor-not-allowed'
                                          : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 cursor-pointer'
                                      }`}
                                    >
                                      <ChevronLeft className="w-3.5 h-3.5" />
                                      <span>{t('quiz_prev')}</span>
                                    </button>

                                    <div className="flex items-center gap-1.5">
                                      {quizSlideIndex < quizQuestions.length - 1 ? (
                                        <button
                                          onClick={() => setQuizSlideIndex(prev => Math.min(quizQuestions.length - 1, prev + 1))}
                                          className="px-3.5 py-1.5 bg-[#00a859] hover:bg-emerald-700 text-white rounded-lg text-[10.5px] font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                                        >
                                          <span>{t('quiz_next')}</span>
                                          <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => {
                                            setQuizSubmitted(true);
                                            setQuizSlideIndex(0);
                                          }}
                                          disabled={!allAnswered}
                                          className={`px-3.5 py-1.5 rounded-lg text-[10.5px] font-bold transition flex items-center gap-1 cursor-pointer ${
                                            allAnswered
                                              ? 'bg-[#00a859] hover:bg-emerald-700 text-white shadow-xs'
                                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                          }`}
                                        >
                                          <span>{t('quiz_submit')}</span>
                                          <Check className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : (
                          /* Quiz Results View with Carousel review */
                          <div className="space-y-4 animate-fade-in">
                            {/* Score summary banner */}
                            {(() => {
                              const correctCount = quizQuestions.filter(q => quizAnswers[q.id] === q.correctAnswer).length;
                              const total = quizQuestions.length;
                              const percentage = Math.round((correctCount / total) * 100);
                              return (
                                <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 text-left">
                                  <p className="text-[11px] text-emerald-800 font-medium">
                                    {t('quiz_score_msg').replace('{percentage}', String(percentage))}
                                  </p>
                                </div>
                              );
                            })()}

                            {/* Carousel Review for Results */}
                            <div className="space-y-3">
                              <div className="px-0.5 pt-0.5">
                                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                                  <span className="flex items-center gap-1.5">
                                    <span className="font-bold text-[#00a859]">{t('quiz_review_label')} {quizSlideIndex + 1}</span>
                                    <span className="text-slate-400 font-normal">{t('quiz_of')} {quizQuestions.length}</span>
                                  </span>
                                </div>
                              </div>

                              {(() => {
                                const q = quizQuestions[quizSlideIndex] || quizQuestions[0];
                                const userAns = quizAnswers[q.id];
                                const isCorrect = userAns === q.correctAnswer;
                                return (
                                  <div className={`p-3.5 rounded-xl border space-y-2.5 animate-fade-in ${
                                    isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/30 border-rose-200'
                                  }`}>
                                    <div className="space-y-1.5">
                                      <div>
                                        <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                                          isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                        }`}>
                                          {isCorrect ? t('quiz_correct') : t('quiz_incorrect')}
                                        </span>
                                      </div>
                                      <p className="text-[11px] font-bold text-slate-800 leading-snug">
                                        {quizSlideIndex + 1}. {q.question}
                                      </p>
                                    </div>

                                    <div className="space-y-1.5 pt-1">
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
                                          <div key={optIdx} className={`p-2 rounded-lg text-[10px] border flex flex-col gap-0.5 items-start text-left ${badgeStyle}`}>
                                            {(isCorrectChoice || (isUserChoice && !isCorrectChoice)) && (
                                              <div className="flex items-center gap-1 flex-wrap">
                                                {isCorrectChoice && (
                                                  <span className="text-[7.5px] text-emerald-800 font-bold flex items-center gap-0.5 bg-emerald-200/90 px-1 py-0.5 rounded-xs leading-none">
                                                    <Check className="w-2.5 h-2.5 stroke-[3]" /> {t('quiz_correct_answer_badge')}
                                                  </span>
                                                )}
                                                {isUserChoice && !isCorrectChoice && (
                                                  <span className="text-[7.5px] text-rose-800 font-bold bg-rose-200/90 px-1 py-0.5 rounded-xs leading-none">
                                                    {t('quiz_your_choice_badge')}
                                                  </span>
                                                )}
                                              </div>
                                            )}
                                            <span className="leading-relaxed">{opt}</span>
                                          </div>
                                        );
                                      })}
                                    </div>

                                    {/* Results Carousel Controls */}
                                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/60 mt-1">
                                      <button
                                        onClick={() => setQuizSlideIndex(prev => Math.max(0, prev - 1))}
                                        disabled={quizSlideIndex === 0}
                                        className={`px-3 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${
                                          quizSlideIndex === 0
                                            ? 'text-slate-300 bg-slate-100 cursor-not-allowed'
                                            : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 cursor-pointer'
                                        }`}
                                      >
                                        <ChevronLeft className="w-3 h-3" />
                                        <span>{t('quiz_prev_question')}</span>
                                      </button>

                                      <button
                                        onClick={() => setQuizSlideIndex(prev => Math.min(quizQuestions.length - 1, prev + 1))}
                                        disabled={quizSlideIndex === quizQuestions.length - 1}
                                        className={`px-3 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${
                                          quizSlideIndex === quizQuestions.length - 1
                                            ? 'text-slate-300 bg-slate-100 cursor-not-allowed'
                                            : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 cursor-pointer'
                                        }`}
                                      >
                                        <span>{t('quiz_next_question')}</span>
                                        <ChevronRight className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>

                            <button
                              onClick={() => {
                                setQuizAnswers({});
                                setQuizSubmitted(false);
                                setQuizSlideIndex(0);
                              }}
                              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                            >
                              Try Again
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: FAQS & RESOURCES */}
                  {eduSubTab === 'faq' && (
                    <div className="space-y-4 animate-fade-in">
                      {/* FAQ Accordion Section */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[10px] font-bold text-slate-500">{t('faq_title')}</h4>
                        </div>


                        {/* Category Filter Tabs */}
                        {(() => {
                          const isQuizComplete = onboardingCompleted && questionnaireStatus === 'completed';
                          return (
                            <div className="space-y-1.5 pb-1">
                              {isQuizComplete ? (
                                <>
                                  {/* Row 1: RECOMMENDED, ALL, COST */}
                                  <div className="flex gap-1.5">
                                    {[
                                      { id: 'recommended', label: t('faq_category_recommended') },
                                      { id: 'all', label: t('faq_category_all') },
                                      { id: 'cost', label: t('faq_category_cost') },
                                    ].map((cat) => (
                                      <button
                                        key={cat.id}
                                        onClick={() => {
                                          setActiveFaqCategory(cat.id);
                                          setFaqActiveIdx(null);
                                        }}
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight transition cursor-pointer border flex-1 text-center ${
                                          activeFaqCategory === cat.id
                                            ? 'bg-[#00a859] text-white border-[#00a859] shadow-3xs'
                                            : 'bg-white text-slate-600 hover:text-slate-800 border-slate-200'
                                        }`}
                                      >
                                        {cat.label}
                                      </button>
                                    ))}
                                  </div>
                                  {/* Row 2: INSURANCE, TESTING, MEDICATION */}
                                  <div className="flex gap-1.5">
                                    {[
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
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight transition cursor-pointer border flex-1 text-center ${
                                          activeFaqCategory === cat.id
                                            ? 'bg-[#00a859] text-white border-[#00a859] shadow-3xs'
                                            : 'bg-white text-slate-600 hover:text-slate-800 border-slate-200'
                                        }`}
                                      >
                                        {cat.label}
                                      </button>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <>
                                  {/* Row 1: ALL, COST, INSURANCE */}
                                  <div className="flex gap-1.5">
                                    {[
                                      { id: 'all', label: t('faq_category_all') },
                                      { id: 'cost', label: t('faq_category_cost') },
                                      { id: 'insurance', label: t('faq_category_insurance') },
                                    ].map((cat) => (
                                      <button
                                        key={cat.id}
                                        onClick={() => {
                                          setActiveFaqCategory(cat.id);
                                          setFaqActiveIdx(null);
                                        }}
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight transition cursor-pointer border flex-1 text-center ${
                                          activeFaqCategory === cat.id
                                            ? 'bg-[#00a859] text-white border-[#00a859] shadow-3xs'
                                            : 'bg-white text-slate-600 hover:text-slate-800 border-slate-200'
                                        }`}
                                      >
                                        {cat.label}
                                      </button>
                                    ))}
                                  </div>
                                  {/* Row 2: TESTING, MEDICATION */}
                                  <div className="flex gap-1.5">
                                    {[
                                      { id: 'testing', label: t('faq_category_testing') },
                                      { id: 'medication', label: t('faq_category_medication') },
                                    ].map((cat) => (
                                      <button
                                        key={cat.id}
                                        onClick={() => {
                                          setActiveFaqCategory(cat.id);
                                          setFaqActiveIdx(null);
                                        }}
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight transition cursor-pointer border flex-1 text-center ${
                                          activeFaqCategory === cat.id
                                            ? 'bg-[#00a859] text-white border-[#00a859] shadow-3xs'
                                            : 'bg-white text-slate-600 hover:text-slate-800 border-slate-200'
                                        }`}
                                      >
                                        {cat.label}
                                      </button>
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })()}

                        <div className="space-y-2">
                          {(() => {
                            const matchedFaqs = sortedFaqs.filter(faq => {
                              if (activeFaqCategory === 'recommended') {
                                return getFaqMatchScore(faq) > 0;
                              }
                              if (activeFaqCategory === 'all') return true;
                              return faq.category === activeFaqCategory;
                            });
                            const listToRender = (activeFaqCategory === 'recommended' && matchedFaqs.length === 0)
                              ? sortedFaqs.slice(0, 3)
                              : matchedFaqs;

                            return listToRender.map((faq, idx) => {
                              const isFaqExpanded = faqActiveIdx === idx;
                              return (
                                <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-3xs transition">
                                  <button
                                    onClick={() => setFaqActiveIdx(isFaqExpanded ? null : idx)}
                                    className="w-full text-left p-3.5 text-xs font-bold text-slate-800 flex justify-between items-start hover:bg-slate-50 transition cursor-pointer gap-2"
                                  >
                                    <div className="space-y-1 flex-1 pr-1 min-w-0">
                                      <span className="block font-bold text-slate-900 leading-snug">{faq.question}</span>
                                    </div>
                                    <ChevronRight className={`w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5 transition-transform ${isFaqExpanded ? 'rotate-90' : ''}`} />
                                  </button>
                                  
                                  {isFaqExpanded && (
                                    <div className="px-4 pb-3.5 text-[11px] text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/50 animate-fade-in">
                                      {faq.answer}
                                    </div>
                                  )}
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>

                      {/* Helpful Resources Section (Grouped by Category) */}
                      <div className="space-y-3 pt-1">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[11px] font-bold text-slate-500">{t('edu_helpful_resources')}</h4>
                        </div>

                        {/* Resource Groups in Slide / Carousel Format */}
                        <div className="space-y-3">
                          {[
                            {
                              id: 'videos',
                              title: language === 'ms' ? 'Kisah Pesakit & Panduan Video' : language === 'zh' ? '患者故事与视频指南' : language === 'ta' ? 'நோயாளி கதைகள் & வீடியோ வழிகாட்டிகள்' : 'Patient Stories & Video Guides',
                              iconName: 'Play',
                              headerBg: 'bg-rose-50/80 text-rose-900',
                              iconColor: 'text-rose-600',
                              badgeBg: 'bg-rose-100/80 text-rose-800',
                              items: sortedHelpfulResources.filter(r => r.id === 'res-7' || r.id === 'res-6'),
                              slideIdx: videoSlideIndex,
                              setSlideIdx: setVideoSlideIndex
                            },
                            {
                              id: 'brochures',
                              title: language === 'ms' ? 'Panduan Pesakit & Risalah' : language === 'zh' ? '患者指南与宣传册' : language === 'ta' ? 'நோயாளி வழிகாட்டிகள் & சிற்றேடுகள்' : 'Patient Guides & Brochures',
                              iconName: 'FileText',
                              headerBg: 'bg-sky-50/80 text-sky-900',
                              iconColor: 'text-sky-600',
                              badgeBg: 'bg-sky-100/80 text-sky-800',
                              items: sortedHelpfulResources.filter(r => r.id === 'res-1' || r.id === 'res-4' || r.id === 'res-8'),
                              slideIdx: brochureSlideIndex,
                              setSlideIdx: setBrochureSlideIndex
                            },
                            {
                              id: 'clinical',
                              title: language === 'ms' ? 'Sumber Klinikal & Polisi' : language === 'zh' ? '临床与政策资源' : language === 'ta' ? 'மருத்துவ & கொள்கை வளங்கள்' : 'Clinical & Policy Resources',
                              iconName: 'Shield',
                              headerBg: 'bg-emerald-50/80 text-emerald-900',
                              iconColor: 'text-emerald-700',
                              badgeBg: 'bg-emerald-100/80 text-emerald-800',
                              items: sortedHelpfulResources.filter(r => r.id === 'res-2' || r.id === 'res-9' || r.id === 'res-5'),
                              slideIdx: clinicalSlideIndex,
                              setSlideIdx: setClinicalSlideIndex
                            }
                          ].map((group) => {
                            if (group.items.length === 0) return null;
                            const currentIdx = Math.min(Math.max(0, group.slideIdx), group.items.length - 1);
                            const activeRes = group.items[currentIdx];
                            const matchReason = getResourceMatchReason(activeRes);

                            let bgClass = "bg-slate-50 group-hover:bg-emerald-50";
                            let itemIconColor = "text-[#00a859]";
                            let typeTagClass = "bg-emerald-50 text-[#00a859]";
                            let viewLinkColor = "text-[#00a859] group-hover:text-emerald-700";
                            let hoverBorderClass = "hover:border-emerald-200 hover:bg-emerald-50/10";

                            if (group.id === 'videos') {
                              bgClass = "bg-rose-50 group-hover:bg-rose-100/80";
                              itemIconColor = "text-rose-600";
                              typeTagClass = "bg-rose-50 text-rose-700";
                              viewLinkColor = "text-rose-600 group-hover:text-rose-700";
                              hoverBorderClass = "hover:border-rose-200 hover:bg-rose-50/10";
                            } else if (group.id === 'brochures') {
                              bgClass = "bg-sky-50 group-hover:bg-sky-100/80";
                              itemIconColor = "text-sky-600";
                              typeTagClass = "bg-sky-50 text-sky-700";
                              viewLinkColor = "text-sky-600 group-hover:text-sky-700";
                              hoverBorderClass = "hover:border-sky-200 hover:bg-sky-50/10";
                            } else if (group.id === 'clinical') {
                              bgClass = "bg-emerald-50 group-hover:bg-emerald-100/80";
                              itemIconColor = "text-emerald-600";
                              typeTagClass = "bg-emerald-50 text-emerald-700";
                              viewLinkColor = "text-emerald-600 group-hover:text-emerald-700";
                              hoverBorderClass = "hover:border-emerald-200 hover:bg-emerald-50/10";
                            }

                            return (
                              <div key={group.id} className="space-y-2 bg-white border border-slate-200/70 rounded-2xl p-3 shadow-3xs">
                                {/* Group Category Bar */}
                                <div className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-[11px] font-extrabold ${group.headerBg}`}>
                                  <div className="flex items-center gap-1.5">
                                    <div className="p-1 bg-white rounded-md shadow-2xs">
                                      {getIcon(group.iconName, group.iconColor)}
                                    </div>
                                    <span>{group.title}</span>
                                  </div>
                                </div>

                                {/* Slide Dots Indicator & Navigation Controls */}
                                <div className="flex items-center justify-between px-1 text-[10px]">
                                  <div className="flex items-center gap-1.5">
                                    {group.items.map((_, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() => group.setSlideIdx(idx)}
                                        title={`Go to Slide ${idx + 1}`}
                                        className={`transition-all rounded-full cursor-pointer ${
                                          idx === currentIdx
                                            ? 'w-5 h-1.5 bg-[#00a859]'
                                            : 'w-1.5 h-1.5 bg-slate-200 hover:bg-slate-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-[9px] text-slate-400 font-mono font-medium mr-1">
                                      {activeRes.type}
                                    </span>
                                    <button
                                      onClick={() => group.setSlideIdx(prev => Math.max(0, prev - 1))}
                                      disabled={currentIdx === 0}
                                      title="Previous Slide"
                                      className={`p-1 rounded-md transition shrink-0 flex items-center justify-center cursor-pointer ${
                                        currentIdx === 0
                                          ? 'text-slate-300 bg-slate-100/60 cursor-not-allowed opacity-40'
                                          : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-3xs'
                                      }`}
                                    >
                                      <ChevronLeft className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => group.setSlideIdx(prev => Math.min(group.items.length - 1, prev + 1))}
                                      disabled={currentIdx === group.items.length - 1}
                                      title="Next Slide"
                                      className={`p-1 rounded-md transition shrink-0 flex items-center justify-center cursor-pointer ${
                                        currentIdx === group.items.length - 1
                                          ? 'text-slate-300 bg-slate-100/60 cursor-not-allowed opacity-40'
                                          : 'text-white bg-[#00a859] hover:bg-emerald-700 shadow-3xs'
                                      }`}
                                    >
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                {/* Active Slide Resource Card */}
                                <button
                                  onClick={() => {
                                    setSelectedResource(activeRes);
                                    setResourcePage(0);
                                  }}
                                  className={`w-full min-h-[110px] text-left bg-slate-50/60 border border-slate-100 rounded-xl p-3 transition group cursor-pointer flex flex-col justify-between ${hoverBorderClass}`}
                                >
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 transition ${bgClass}`}>
                                      {getIcon(activeRes.iconName, itemIconColor)}
                                    </div>
                                    <div className="space-y-0.5 flex-1 min-w-0">
                                      <div className="flex justify-between items-start gap-1">
                                        <h5 className="font-bold text-[11px] text-slate-800 group-hover:text-[#00a859] transition leading-snug line-clamp-2">{activeRes.title}</h5>
                                      </div>
                                      <p className="text-[10px] text-slate-500 leading-normal line-clamp-3 mt-0.5">{activeRes.summary}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="pt-2 space-y-1">
                                    <div className="flex flex-wrap items-center gap-1 min-w-0">
                                      {matchReason && (
                                        <span className="text-[8px] hashtag-tag micro-badge bg-emerald-50 text-[#00a859] px-1.5 py-0.5 rounded font-mono font-extrabold border border-emerald-200/80 flex items-center gap-0.5 shrink-0">
                                          <Sparkles className="w-2 h-2 text-[#00a859]" />
                                          {matchReason}
                                        </span>
                                      )}
                                      {activeRes.keywords.slice(0, 2).map((kw, i) => (
                                        <span key={i} className="text-[8px] hashtag-tag micro-badge font-mono bg-white text-slate-500 px-1.5 py-0.5 rounded border border-slate-200/40 break-words max-w-full">
                                          #{kw}
                                        </span>
                                      ))}
                                    </div>
                                    <div className={`flex items-center text-[9.5px] font-bold gap-0.5 transition ${viewLinkColor} shrink-0 justify-end`}>
                                      <span>{t('edu_view_resource')}</span>
                                      <ExternalLink className="w-2.5 h-2.5 transition" />
                                    </div>
                                  </div>
                                </button>


                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}


        {/* ----------------- SCREEN 3: BOOKING ----------------- */}
        {activeScreen === ScreenId.Booking && (
          <div className="flex-col flex flex-1 h-full overflow-hidden relative animate-slide-in">
            {showMonthPopup && (
              <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
                <div className="bg-white rounded-3xl w-full max-w-[335px] p-5 shadow-2xl border border-slate-100 text-left space-y-4">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-emerald-100/90 rounded-xl text-[#00a859] shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-800 tracking-tight leading-tight">
                        {t('booking_select_month')}
                      </h4>
                    </div>
                    <button
                      onClick={() => setShowMonthPopup(false)}
                      className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-full cursor-pointer transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Year & Month Grid */}
                  {(() => {
                    const grouped: { [year: string]: string[] } = {};
                    availableMonths.forEach((m) => {
                      const parts = m.split(' ');
                      const year = parts[1] || '2026';
                      if (!grouped[year]) grouped[year] = [];
                      grouped[year].push(m);
                    });

                    return (
                      <div className="space-y-3.5 max-h-[320px] overflow-y-auto pr-1 text-left">
                        {Object.keys(grouped).sort().map((year) => (
                          <div key={year} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 font-mono">
                                {year}
                              </span>
                              <div className="h-px bg-slate-100 flex-1" />
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                              {grouped[year].map((m) => {
                                const isSelected = m === selectedCalendarMonth;
                                const isPast = isMonthBeforeCurrent(m);
                                const shortName = getLocalizedMonthOnly(m, language);
                                return (
                                  <button
                                    key={m}
                                    disabled={isPast}
                                    onClick={() => {
                                      if (!isPast) {
                                        selectMonth(m);
                                        setShowMonthPopup(false);
                                      }
                                    }}
                                    className={`py-2 px-1.5 rounded-xl text-[11.5px] font-extrabold text-center flex items-center justify-center transition-all cursor-pointer w-full border ${
                                      isPast
                                        ? 'opacity-30 bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed pointer-events-none'
                                        : isSelected
                                        ? 'bg-[#00a859] border-[#00a859] text-white shadow-md shadow-emerald-700/20'
                                        : 'bg-slate-50 hover:bg-emerald-50/80 border-slate-200/70 hover:border-emerald-300 text-slate-800 hover:text-[#00a859]'
                                    }`}
                                  >
                                    <span>{shortName}</span>
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
              <span className="font-bold text-sm text-slate-800">
                {appointment.status === 'booked' || appointment.status === 'confirmed' 
                  ? t('booking_header_details') 
                  : t('booking_header_title')}
              </span>
            </div>

            {/* If appointment is BOOKED or CONFIRMED, show Feature 2 Confirmation Screen */}
            {appointment.status === 'booked' || appointment.status === 'confirmed' ? (
              <div className="flex-1 overflow-y-auto p-4 pb-36 space-y-4 animate-fade-in text-left">
                {/* Booking Confirmation Header Status */}
                <div className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-xs text-center space-y-2.5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#00a859] flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  
                  <div>
                    <h3 className="font-extrabold text-base text-slate-850">{t('booking_confirmed_status')}</h3>
                  </div>
                </div>

                {/* Single Combined Appointment Details Card (Care Clinic, Date, and Time in the SAME card) */}
                {(() => {
                  const clinicName = appointment.clinic || (isFHReferred ? "National University Hospital Genetic Clinic" : activeClinics[0].name);
                  const clinicAddress = getClinicAddress(clinicName);
                  const details = getAppointmentSlotDetails(
                    clinicName,
                    appointment.date,
                    appointment.timeSlot
                  );
                  return (
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs text-left overflow-hidden">
                      {/* Card Header Label */}
                      <div className="px-4 pt-3 pb-2 border-b border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                          {t('booking_header_details')}
                        </span>
                      </div>

                      <div className="p-4 space-y-3.5">
                        {/* Care Clinic Details */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[10.5px]">
                            <Building2 className="w-3.5 h-3.5 text-[#00a859] shrink-0" />
                            <span className="font-semibold">{t('booking_care_clinic')}</span>
                          </div>
                          <p className="font-extrabold text-slate-850 text-xs leading-snug pl-5">
                            {clinicName}
                          </p>
                          {clinicAddress && (
                            <div className="flex items-start gap-1.5 text-[10.5px] text-slate-500 font-medium leading-relaxed pl-5 pt-0.5">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                              <span>{clinicAddress}</span>
                            </div>
                          )}
                        </div>

                        {/* Scheduled Date & Confirmed Time Block */}
                        <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-3 bg-slate-50/70 -mx-4 -mb-4 p-3.5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[10px]">
                              <Calendar className="w-3.5 h-3.5 text-[#00a859] shrink-0" />
                              <span className="font-semibold">{t('booking_scheduled_date')}</span>
                            </div>
                            <p className="font-extrabold text-slate-850 text-xs font-mono pl-5">
                              {getLocalizedDate(appointment.date, language)}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[10px]">
                              <Clock className="w-3.5 h-3.5 text-[#00a859] shrink-0" />
                              <span className="font-semibold">{t('booking_confirmed_time')}</span>
                            </div>
                            <p className="font-extrabold text-slate-850 text-xs font-mono pl-5">
                              {appointment.timeSlot}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Estimated Out-of-Pocket Cost Block */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 space-y-2 text-left shadow-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-800">
                      {getLocalizedCostData(language).cardHeading}
                    </span>
                    <span className="text-sm font-black text-[#00a859] font-mono tracking-tight shrink-0 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80">
                      {getLocalizedCostData(language).indexPatientEstimatedCash}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium leading-normal border-t border-slate-100 pt-2">
                    {getLocalizedCostData(language).supportingText}
                  </p>
                </div>

                {/* Secondary Actions: Device Calendar + Customise Reminders */}
                <div className="space-y-2 pt-1">
                  <button 
                    onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
                    className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t('booking_add_device_calendar')}</span>
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

                  <button
                    onClick={() => onChangeScreen(ScreenId.ReminderSettings)}
                    className="w-full py-2.5 px-3 bg-white hover:bg-emerald-50 text-[#00a859] border border-[#00a859]/60 hover:border-[#00a859] rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-3xs group"
                  >
                    <Bell className="w-3.5 h-3.5 text-[#00a859] shrink-0" />
                    <span>{t('booking_setup_reminders')}</span>
                  </button>
                </div>

                {/* "What's Next?" Section - Only shown for referred patients */}
                {isFHReferred && (
                  <div className="space-y-2 pt-2 text-left border-t border-slate-100">
                    <h3 className="font-extrabold text-[11px] text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#00a859]" />
                      <span>{t('booking_whats_next')}</span>
                    </h3>

                    <div className="bg-emerald-50/50 border border-emerald-200/90 rounded-2xl p-4 space-y-3 text-xs text-left">
                      <h4 className="font-bold text-emerald-900 flex items-center gap-2">
                        <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{t('booking_essential_prep')}</span>
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
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold shrink-0">•</span>
                          <span>{t('booking_prep_checklist')}</span>
                        </li>
                      </ul>
                      <button 
                        onClick={() => {
                          setEduSubTab('guides');
                          onChangeScreen(ScreenId.Education);
                        }}
                        className="text-[#00a859] font-extrabold text-[11px] hover:underline flex items-center gap-0.5 text-left pt-1 cursor-pointer"
                      >
                        {t('booking_prep_learn_more')} <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Primary Action Button (Return to Home) below preparation instructions */}
                <button
                  onClick={() => onChangeScreen(ScreenId.Home)}
                  className="w-full py-3 bg-[#00a859] hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-emerald-700/15 transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Home className="w-4 h-4" />
                  <span>{t('booking_return_home_btn')}</span>
                </button>

                {/* Manage and Reschedule Options */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2.5 text-xs">
                  <button
                    onClick={handleEnterReschedule}
                    className="flex-1 py-2 bg-white hover:bg-emerald-50 text-[#00a859] border border-slate-200 hover:border-emerald-300 rounded-xl text-[11px] font-bold transition cursor-pointer text-center"
                  >
                    {t('booking_reschedule_slot')}
                  </button>
                  <button
                    onClick={handleEnterCancelFlow}
                    className="flex-1 py-2 bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-200 rounded-xl text-[11px] font-semibold transition cursor-pointer text-center"
                  >
                    {t('booking_cancel_slot')}
                  </button>
                </div>
              </div>
            ) : (
              /* Active Booking Steps - Redesigned 4-Section Flow */
              <div className="flex-1 flex flex-col min-h-0 relative bg-slate-50/50">
                <div className="flex-1 overflow-y-auto p-4 space-y-6 text-left pb-36">
                  {bookingStep === 'available' && (() => {
                    const selectedClinicObj = activeClinics.find(c => c.id === selectedClinicId);
                    const daySlots = (selectedSlotMonth === selectedCalendarMonth && selectedCalendarDay > 0 && activeClinicSlotsDb[selectedClinicId]?.[selectedSlotMonth]?.[selectedCalendarDay] && !isTodayOrPast(selectedSlotMonth, selectedCalendarDay))
                      ? activeClinicSlotsDb[selectedClinicId][selectedSlotMonth][selectedCalendarDay]
                      : [];

                    return (
                      <div className="space-y-6">
                        {/* SECTION 1: Location & Recommended Clinic */}
                        <section className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#00a859] flex items-center justify-center text-[11px] font-black shrink-0">1</span>
                            <h3 className="font-extrabold text-xs text-slate-800">
                              {t('booking_section1_title')}
                            </h3>
                          </div>

                          <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 space-y-3 shadow-3xs text-left">
                            {/* Address & Outlined Change Location Button */}
                            <div className="space-y-2.5">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <span className="text-[10px] font-bold text-slate-500 block">
                                    {t('booking_location_label')}
                                  </span>
                                </div>
                                {locationType === 'live' && (
                                  <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-2xs shrink-0">
                                    <Navigation className="w-2.5 h-2.5 fill-white" />
                                    <span>{t('live_gps_location')}</span>
                                  </span>
                                )}
                              </div>

                              {(() => {
                                const cleanAddr = (patientLocName || '').replace(/,\s*Singapore\s*\d{6}/gi, '').trim();

                                return (
                                  <div className="flex items-start gap-2.5 bg-slate-50/80 border border-slate-150 rounded-xl p-2.5">
                                    <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                                      locationType === 'live'
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-slate-200 text-slate-700'
                                    }`}>
                                      {locationType === 'live' ? (
                                        <Crosshair className="w-4 h-4" />
                                      ) : (
                                        <MapPin className="w-4 h-4" />
                                      )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <h4 className="font-bold text-xs text-slate-800 leading-snug">
                                        {locationType === 'live'
                                          ? t('current_device_live_gps')
                                          : cleanAddr}
                                      </h4>
                                    </div>
                                  </div>
                                );
                              })()}

                              <button 
                                onClick={() => setShowLocationModal(!showLocationModal)}
                                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[11px] text-[#00a859] font-bold bg-white hover:bg-emerald-50 border border-[#00a859]/40 hover:border-[#00a859] rounded-xl cursor-pointer transition shadow-2xs mt-1"
                              >
                                <MapPin className="w-3.5 h-3.5 text-[#00a859] shrink-0" />
                                <span>{showLocationModal ? t('booking_close_selector_btn') : t('booking_change_location')}</span>
                              </button>

                              {showLocationModal && (
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-3 animate-fade-in text-xs shadow-inner">
                                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                                    <span className="text-[10px] font-bold text-slate-600">
                                      {t('booking_location_label')}
                                    </span>
                                  </div>

                                  {/* Registered Address Option */}
                                  <button
                                    onClick={() => {
                                      setPatientCoords(PERSONA_COORDS[currentPatientId] || { lat: 1.3625, lng: 103.8542 });
                                      setPatientLocName(patientAddress);
                                      setLocationType('registered');
                                      setGpsError(null);
                                      setShowLocationModal(false);
                                      triggerToast(t('location_set_registered'));
                                    }}
                                    className={`w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                                      locationType === 'registered'
                                        ? 'bg-emerald-50/90 border-[#00a859] ring-1 ring-[#00a859]/30'
                                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                      <div className={`p-1.5 rounded-lg shrink-0 ${locationType === 'registered' ? 'bg-[#00a859] text-white' : 'bg-emerald-100 text-[#00a859]'}`}>
                                        <Home className="w-3.5 h-3.5" />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <p className="font-extrabold text-[11px] text-slate-800 leading-tight">
                                          {t('registered_address')}
                                        </p>
                                        <p className="text-[9.5px] text-slate-500 break-words mt-0.5">
                                          {patientAddress}
                                        </p>
                                      </div>
                                    </div>
                                    {locationType === 'registered' && (
                                      <span className="text-[8px] font-black uppercase text-[#00a859] bg-emerald-100 px-1.5 py-0.5 rounded shrink-0 ml-1">{t('status_active')}</span>
                                    )}
                                  </button>

                                  {/* Live GPS Button */}
                                  <div>
                                    <button
                                      onClick={detectLiveLocation}
                                      disabled={isDetectingLoc}
                                      className={`w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                                        locationType === 'live'
                                          ? 'bg-emerald-50/90 border-[#00a859] ring-1 ring-[#00a859]/30'
                                          : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
                                      } disabled:opacity-60`}
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <div className={`p-1.5 rounded-lg ${locationType === 'live' ? 'bg-[#00a859] text-white' : 'bg-emerald-100 text-[#00a859]'}`}>
                                          <Crosshair className="w-3.5 h-3.5" />
                                        </div>
                                        <p className="font-extrabold text-[11px] text-slate-800 leading-tight">
                                          {isDetectingLoc ? t('gps_calculating') : t('live_gps_location')}
                                        </p>
                                      </div>
                                      {locationType === 'live' && (
                                        <span className="text-[8px] font-black uppercase text-[#00a859] bg-emerald-100 px-1.5 py-0.5 rounded">{t('status_active')}</span>
                                      )}
                                    </button>
                                  </div>

                                  {/* Denial Error Message Box */}
                                  {gpsError && (
                                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-1 text-left animate-fade-in">
                                      <div className="flex items-center gap-1.5 text-red-700">
                                        <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                                        <h5 className="font-bold text-xs text-red-800 leading-tight">
                                          {t('location_permission_denied')}
                                        </h5>
                                      </div>
                                      <p className="text-[10.5px] text-red-700 font-medium leading-relaxed pl-5.5">
                                        {gpsError}
                                      </p>
                                    </div>
                                  )}


                                </div>
                              )}
                            </div>

                            {/* Recommended Clinic Selection */}
                            <div className="pt-2 border-t border-slate-100 space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-500 block">
                                {t('select_clinic_title')}
                              </label>
                              <div className="relative">
                                <button
                                  onClick={() => setShowClinicDropdown(!showClinicDropdown)}
                                  className="w-full bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200 rounded-xl p-3 flex justify-between items-center cursor-pointer text-left transition gap-2"
                                >
                                  <div className="flex gap-2.5 min-w-0 flex-1 items-center">
                                    <div className="p-2 bg-emerald-100/70 rounded-lg shrink-0 text-[#00a859]">
                                      <Building2 className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <h4 className="font-bold text-xs text-slate-800 break-words leading-snug">
                                        {selectedClinicObj?.name}
                                      </h4>
                                      <p className="text-[10.5px] text-slate-500 leading-snug mt-0.5 break-words">
                                        {selectedClinicObj?.address}
                                      </p>
                                    </div>
                                  </div>
                                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                                </button>

                                {showClinicDropdown && (
                                  <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-xl mt-1.5 shadow-md z-40 overflow-hidden divide-y divide-slate-100 animate-fade-in max-h-52 overflow-y-auto">
                                    {activeClinics.map((clinic) => {
                                      const isSelected = selectedClinicId === clinic.id;
                                      return (
                                        <button
                                          key={clinic.id}
                                          onClick={() => handleClinicChange(clinic.id)}
                                          className={`w-full text-left p-3 transition flex justify-between items-start gap-2.5 hover:bg-emerald-50/10 cursor-pointer ${
                                            isSelected ? 'bg-emerald-50/20' : 'bg-white'
                                          }`}
                                        >
                                          <div className="space-y-1 min-w-0 flex-1">
                                            <h5 className={`font-bold text-xs ${isSelected ? 'text-[#00a859]' : 'text-slate-800'} break-words leading-snug`}>
                                              {clinic.name}
                                            </h5>
                                            <p className="text-[10px] text-slate-500 leading-snug break-words">
                                              {clinic.address}
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
                          </div>
                        </section>

                        {/* SECTION 2: Choose a Date */}
                        <section className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#00a859] flex items-center justify-center text-[11px] font-black shrink-0">2</span>
                            <h3 className="font-extrabold text-xs text-slate-800">
                              {t('booking_choose_date')}
                            </h3>
                          </div>

                          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3.5 shadow-3xs text-left">
                            {/* Month Switcher Header */}
                            <div className="flex justify-between items-center bg-slate-50 border border-slate-200/60 p-2 rounded-xl">
                              <button
                                onClick={() => {
                                  const idx = availableMonths.indexOf(selectedCalendarMonth);
                                  if (idx > 0 && !isMonthBeforeCurrent(availableMonths[idx - 1])) {
                                    selectMonth(availableMonths[idx - 1]);
                                  }
                                }}
                                disabled={
                                  availableMonths.indexOf(selectedCalendarMonth) <= 0 ||
                                  isMonthBeforeCurrent(
                                    availableMonths[availableMonths.indexOf(selectedCalendarMonth) - 1] || ''
                                  )
                                }
                                className="p-1.5 hover:bg-slate-200 disabled:hover:bg-transparent rounded-lg disabled:opacity-25 cursor-pointer transition text-slate-600"
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
                                className="p-1.5 hover:bg-slate-200 disabled:hover:bg-transparent rounded-lg disabled:opacity-25 cursor-pointer transition text-slate-600"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Clean Calendar Grid without Legend */}
                            <div className="relative">
                              <div className={`space-y-2 transition-all ${isAfterDecember2026(selectedCalendarMonth) ? 'opacity-20 grayscale pointer-events-none select-none blur-[0.5px]' : ''}`}>
                                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-extrabold text-slate-400">
                                  <span>S</span>
                                  <span>M</span>
                                  <span>T</span>
                                  <span>W</span>
                                  <span>T</span>
                                  <span>F</span>
                                  <span>S</span>
                                </div>

                                <div className="grid grid-cols-7 gap-1">
                                  {Array.from({ length: getMonthConfig(selectedCalendarMonth).emptyCells }).map((_, i) => (
                                    <div key={`empty-${i}`} className="h-8" />
                                  ))}

                                  {Array.from({ length: getMonthConfig(selectedCalendarMonth).totalDays }).map((_, i) => {
                                    const dayNum = i + 1;
                                    const hasSlots = !!activeClinicSlotsDb[selectedClinicId]?.[selectedCalendarMonth]?.[dayNum] && !isTodayOrPast(selectedCalendarMonth, dayNum);
                                    const isSelected = selectedSlotMonth === selectedCalendarMonth && selectedCalendarDay === dayNum;
                                    const isCurrentDay = isToday(selectedCalendarMonth, dayNum);

                                    return (
                                      <button
                                        key={`day-${dayNum}`}
                                        disabled={!hasSlots}
                                        onClick={() => {
                                          setSelectedCalendarDay(dayNum);
                                          setSelectedSlotMonth(selectedCalendarMonth);
                                          const slots = activeClinicSlotsDb[selectedClinicId]?.[selectedCalendarMonth]?.[dayNum];
                                          if (slots && slots.length > 0) {
                                            setSelectedSlotObj(slots[0]);
                                            setSelectedSlotIdx(0);
                                          } else {
                                            setSelectedSlotObj(null);
                                            setSelectedSlotIdx(null);
                                          }
                                        }}
                                        className={`h-8 w-8 rounded-full flex flex-col items-center justify-center text-[10.5px] font-extrabold transition relative cursor-pointer mx-auto ${
                                          isSelected
                                            ? 'bg-[#00a859] text-white shadow-xs ring-2 ring-[#00a859]/30'
                                            : isCurrentDay
                                            ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                                            : hasSlots
                                            ? 'bg-emerald-50/90 text-[#00a859] border border-emerald-200/70 hover:bg-emerald-100/80 font-bold'
                                            : 'text-slate-300 pointer-events-none'
                                        }`}
                                      >
                                        <span>{dayNum}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Overlay for months after December 2026 */}
                              {isAfterDecember2026(selectedCalendarMonth) && (
                                <div className="absolute inset-0 bg-slate-800/65 backdrop-blur-xs rounded-xl p-3.5 flex flex-col items-center justify-center text-center space-y-2 z-20 animate-fade-in shadow-xl border border-slate-600/40">
                                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30">
                                    <CalendarX className="w-4 h-4" />
                                  </div>
                                  <div className="space-y-1 max-w-[220px]">
                                    <h4 className="font-extrabold text-xs text-white leading-tight">
                                      {t('schedule_not_released')}
                                    </h4>
                                    <p className="text-[10px] text-slate-200 leading-snug font-medium">
                                      {t('schedule_not_released_desc')}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => selectMonth('December 2026')}
                                    className="mt-1 px-3 py-1.5 bg-[#00a859] hover:bg-emerald-600 text-white font-extrabold text-[10px] rounded-xl transition cursor-pointer shadow-sm flex items-center gap-1"
                                  >
                                    <span>{t('return_to_dec_2026')}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </section>

                        {/* SECTION 3: Choose an Appointment Time */}
                        <section className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#00a859] flex items-center justify-center text-[11px] font-black shrink-0">3</span>
                            <h3 className="font-extrabold text-xs text-slate-800">
                              {t('booking_choose_time')}
                            </h3>
                          </div>

                          {isAfterDecember2026(selectedCalendarMonth) ? (
                            <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-center space-y-1">
                              <p className="text-xs font-bold text-slate-700">{t('no_slots_2027_title')}</p>
                              <p className="text-[10.5px] text-slate-500">{t('no_slots_2027_desc')}</p>
                            </div>
                          ) : daySlots.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2.5">
                              {daySlots.map((slot, idx) => {
                                const isSelected = selectedSlotObj?.time === slot.time || selectedSlotIdx === idx;
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => {
                                      setSelectedSlotObj(slot);
                                      setSelectedSlotIdx(idx);
                                    }}
                                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between gap-2 ${
                                      isSelected
                                        ? 'bg-emerald-50/80 border-[#00a859] ring-2 ring-[#00a859]/25 shadow-xs'
                                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                                    }`}
                                  >
                                    <div className="space-y-0.5 min-w-0">
                                      <p className="text-xs font-extrabold text-slate-900 font-mono tracking-tight">{slot.time}</p>
                                      <p className="text-[10px] text-slate-500 font-medium">
                                        {slot.duration.replace('mins', t('booking_mins'))}
                                      </p>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                      isSelected ? 'border-[#00a859] bg-[#00a859]' : 'border-slate-300 bg-white'
                                    }`}>
                                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="bg-white border border-dashed border-slate-200 p-5 rounded-2xl text-center text-xs text-slate-400">
                              {t('booking_no_slots_alert')}
                            </div>
                          )}
                        </section>

                        {/* SECTION 4: Appointment Summary */}
                        <section className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#00a859] flex items-center justify-center text-[11px] font-black shrink-0">4</span>
                            <h3 className="font-extrabold text-xs text-slate-800">
                              {t('booking_appointment_summary')}
                            </h3>
                          </div>

                          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-3xs text-left">
                            <div className="p-4 space-y-3.5">
                              {/* Clinic */}
                              <div className="flex items-start gap-2.5">
                                <Building2 className="w-4 h-4 text-[#00a859] shrink-0 mt-0.5" />
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-bold text-slate-800 leading-snug break-words">
                                    {selectedClinicObj?.name}
                                  </p>
                                  <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5 break-words">
                                    {selectedClinicObj?.address}
                                  </p>
                                </div>
                              </div>

                              <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-3">
                                {/* Date */}
                                <div className="flex items-start gap-2">
                                  <Calendar className="w-4 h-4 text-[#00a859] shrink-0 mt-0.5" />
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[10px] font-bold text-slate-500 block">
                                      {t('booking_date_label')}
                                    </span>
                                    <p className="text-xs font-extrabold text-slate-800 font-mono leading-snug break-words">
                                      {selectedSlotMonth && selectedCalendarDay > 0
                                        ? getLocalizedDate(`${selectedCalendarDay} ${selectedSlotMonth}`, language)
                                        : (t('booking_choose_date') || 'Select a date')}
                                    </p>
                                  </div>
                                </div>

                                {/* Time */}
                                <div className="flex items-start gap-2">
                                  <Clock className="w-4 h-4 text-[#00a859] shrink-0 mt-0.5" />
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[10px] font-bold text-slate-500 block">
                                      {t('booking_time_label')}
                                    </span>
                                    <p className="text-xs font-extrabold text-slate-800 font-mono leading-snug break-words">
                                      {selectedSlotObj ? selectedSlotObj.time : (t('booking_select_a_time') || 'Select a time')}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Integrated Estimated Out-of-Pocket Cost */}
                            <div className="bg-emerald-50/90 border-t border-emerald-200/80 p-3.5 space-y-2 text-left">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-bold text-slate-800">
                                  {getLocalizedCostData(language).cardHeading}
                                </span>
                                <span className="text-base font-black text-[#00a859] font-mono tracking-tight shrink-0 bg-white px-2.5 py-1 rounded-lg border border-emerald-200/80 shadow-2xs">
                                  {getLocalizedCostData(language).indexPatientEstimatedCash}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 font-medium leading-normal border-t border-emerald-200/60 pt-2">
                                {getLocalizedCostData(language).supportingText}
                              </p>
                            </div>
                          </div>
                        </section>
                      </div>
                    );
                  })()}
                </div>

                {/* Sticky Bottom Book Appointment Bar */}
                {bookingStep === 'available' && (
                  <div className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 z-30 shadow-lg shrink-0">
                    <button
                      onClick={() => {
                        if (selectedSlotObj || selectedSlotIdx !== null) {
                          handleBookSubmit(selectedSlotIdx || 0);
                        }
                      }}
                      disabled={!selectedSlotObj && selectedSlotIdx === null}
                      className="w-full py-3.5 px-4 bg-[#00a859] hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-extrabold shadow-md shadow-emerald-700/15 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{t('booking_confirm_slot_btn')}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}


          {/* ----------------- SCREEN 4: REMINDERS ----------------- */}
          {activeScreen === ScreenId.ReminderSettings && (() => {
            const selectedChannels = deserializeChannels(reminderPrefs.channel);
            
            const ALL_FREQUENCIES = ['monthly', '2_weeks', '1_week', '1_day'];
            const parseFrequencies = (freqStr: string): string[] => {
              if (!freqStr) return ALL_FREQUENCIES;
              const split = freqStr.split(',').map(s => s.trim()).filter(Boolean);
              return split.length > 0 ? split : ALL_FREQUENCIES;
            };
            const serializeFrequencies = (freqs: string[]): string => freqs.join(',');

            const selectedFrequencies = parseFrequencies(reminderPrefs.frequency);

            const handleToggleFrequency = (freqId: string) => {
              let next = [...selectedFrequencies];
              if (next.includes(freqId)) {
                if (next.length > 1) {
                  next = next.filter(f => f !== freqId);
                }
              } else {
                next.push(freqId);
              }
              onUpdateReminderPrefs(
                reminderPrefs.enabled,
                reminderPrefs.channel,
                serializeFrequencies(next) as any
              );
            };

          return (
            <div className="flex-col flex flex-1 h-full overflow-hidden animate-slide-in">
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

              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-left pb-36">
                {/* My Profile Access Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs flex justify-between items-center text-left">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-[#00a859] font-extrabold flex items-center justify-center text-sm shrink-0">
                      {patientInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-xs text-slate-800 break-words">{patientFullName}</h4>
                      <p className="text-[10px] text-slate-500 break-words">{patientNric} • {t('profile_verified_singpass')}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onChangeScreen(ScreenId.Profile)}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#00a859] rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer border border-emerald-200 shrink-0 ml-2"
                    id="settings-view-profile-btn"
                  >
                    <User className="w-3.5 h-3.5 text-[#00a859]" />
                    <span>{t('profile_my_profile')}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#00a859]" />
                  </button>
                </div>

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
                  <div className="min-w-0 flex-1 pr-3">
                    <h4 className={scaleText("font-bold text-base text-slate-800 font-sans break-words")}>
                      {isFHReferred ? t('active_reminders') : (
                        language === 'ms' ? 'Peringatan Aktif' :
                        language === 'zh' ? '启用提醒' :
                        language === 'ta' ? 'செயலில் உள்ள நினைவூட்டல்கள்' :
                        'Active Reminders'
                      )}
                    </h4>
                    <p className={scaleText("text-sm text-slate-500 mt-0.5 font-sans break-words")}>{t('active_reminders_desc')}</p>
                  </div>
                  <button
                    onClick={() => onUpdateReminderPrefs(!reminderPrefs.enabled, reminderPrefs.channel, reminderPrefs.frequency)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${reminderPrefs.enabled ? 'bg-[#00a859]' : 'bg-slate-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${reminderPrefs.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                {reminderPrefs.enabled && (
                  <div className="space-y-4 animate-fade-in text-left">
                    
                    {/* Select Channel - Multi-select Checkbox list (Without subdescriptions) */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                      <label className={scaleText("text-sm font-bold uppercase tracking-wider text-slate-500 font-sans block")}>{t('notification_channel')}</label>
                      
                      <div className="space-y-2">
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
                              type="button"
                              onClick={handleToggle}
                              className="w-full text-left flex gap-3 items-center p-2.5 rounded-xl border border-slate-150 hover:bg-slate-50/50 transition cursor-pointer select-none"
                            >
                              <div className="shrink-0">
                                {isChecked ? (
                                  <CheckSquare className="w-5 h-5 text-[#00a859]" />
                                ) : (
                                  <Square className="w-5 h-5 text-slate-300" />
                                )}
                              </div>
                              
                              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100 shrink-0 text-[#00a859]">
                                <IconComponent className="w-4 h-4" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <span className={scaleText("text-base font-bold text-slate-800 font-sans break-words")}>{info.title}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <p className={scaleText("text-sm text-emerald-900 bg-emerald-50/50 border border-emerald-100/60 rounded-lg p-2.5 leading-relaxed font-medium font-sans flex items-start gap-1.5 break-words")}>
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00a859] shrink-0 mt-2"></span>
                        <span>
                          {language === 'ms' ? 'Peringatan akan dihantar ke semua saluran aktif terpilih secara serentak.' :
                           language === 'zh' ? '提醒将同时发送至所有已启用的活跃渠道。' :
                           language === 'ta' ? 'விழிப்பூட்டல்கள் ஒரே நேரத்தில் தேர்ந்தெடுக்கப்பட்ட அனைத்து செயலில் உள்ள சேனல்களுக்கும் அனுப்பப்படும்.' :
                           'Reminders will be sent to all active checked channels simultaneously.'}
                        </span>
                      </p>
                    </div>

                    {/* Frequency settings - Multi-select Checkboxes Format (Without descriptions) */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                      <div className="space-y-0.5">
                        <label className={scaleText("text-sm font-bold uppercase tracking-wider text-slate-500 font-sans block")}>
                          {t('reminder_frequency')}
                        </label>
                        <p className={scaleText("text-sm text-slate-500 leading-relaxed font-sans break-words")}>
                          {t('frequency_desc')}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {[
                          {
                            id: 'monthly',
                            label: language === 'ms' ? '1 bulan' : language === 'zh' ? '1个月' : language === 'ta' ? '1 மாதம்' : '1 month',
                          },
                          {
                            id: '2_weeks',
                            label: language === 'ms' ? '2 minggu' : language === 'zh' ? '2周' : language === 'ta' ? '2 வாரங்கள்' : '2 weeks',
                          },
                          {
                            id: '1_week',
                            label: language === 'ms' ? '1 minggu' : language === 'zh' ? '1周' : language === 'ta' ? '1 வாரம்' : '1 week',
                          },
                          {
                            id: '1_day',
                            label: language === 'ms' ? '1 hari' : language === 'zh' ? '1天' : language === 'ta' ? '1 நாள்' : '1 day',
                          },
                        ].map((freqOption) => {
                          const isSelected = selectedFrequencies.includes(freqOption.id);

                          return (
                            <button
                              key={freqOption.id}
                              type="button"
                              onClick={() => handleToggleFrequency(freqOption.id)}
                              className="w-full text-left p-2.5 rounded-xl border border-slate-150 hover:bg-slate-50/50 transition cursor-pointer flex items-center gap-3 select-none"
                            >
                              <div className="shrink-0">
                                {isSelected ? (
                                  <CheckSquare className="w-5 h-5 text-[#00a859]" />
                                ) : (
                                  <Square className="w-5 h-5 text-slate-300" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <span className={scaleText("text-base font-bold text-slate-800 font-sans break-words")}>{freqOption.label}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dynamic previews based on selected channels */}
                    {isFHReferred && selectedChannels.includes('sms') && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                          {t('settings_sms_preview_title')}
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
                                return `MOH HealthHub: Hai ${nameStr}, slot Konsultasi Pesakit Luar Am anda di ${bookedClinicName} disahkan pada ${dateStr} pukul ${timeStr}. Subsidi berperingkat MOH sehingga 70% telah diluluskan. Bawa Singpass. Info: https://hh.gov.sg/gen-ref`;
                              } else if (language === 'zh') {
                                return `MOH HealthHub: 您在 ${bookedClinicName} 的普通门诊咨询预约已确认，时间为 ${dateStr} ${timeStr}。最高 70% 的 MOH 审查津贴已通过审核。请携带您的 NRIC/Singpass。详情：https://hh.gov.sg/gen-ref`;
                              } else if (language === 'ta') {
                                return `MOH HealthHub: ${dateStr} அன்று ${timeStr} மணிக்கு ${bookedClinicName}-இல் உங்கள் பொது வெளிநோயாளி ஆலோசனை உறுதிப்படுத்தப்பட்டுள்ளது. 70% வரை மானியம் வழங்கப்பட்டுள்ளது. Singpass கொண்டு வரவும். விவரம்: https://hh.gov.sg/gen-ref`;
                              } else {
                                return `MOH HealthHub: Hi ${nameStr}, your General Outpatient Consultation slot at ${bookedClinicName} is confirmed on ${dateStr} at ${timeStr}. Means-tested MOH subsidies up to 70% cleared. Bring Singpass. Info: https://hh.gov.sg/gen-ref`;
                              }
                            })()}
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
                            <div className="w-4 h-4 bg-[#075e54] rounded-full flex items-center justify-center text-white"><Check className="w-2.5 h-2.5 stroke-[3]" /></div>
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
                                  <Building2 className="w-3 h-3 text-emerald-800 inline mr-1 -mt-0.5" /><strong>Klinik:</strong> {bookedClinicName}
                                  <br /><Calendar className="w-3 h-3 text-emerald-800 inline mr-1 -mt-0.5" /><strong>Tarikh:</strong> {dateStr}
                                  <br /><Clock className="w-3 h-3 text-emerald-800 inline mr-1 -mt-0.5" /><strong>Masa:</strong> {timeStr}
                                  <br /><br />
                                  Sila lengkapkan senarai semak rujukan pesakit luar anda dalam HealthHub.
                                </>;
                              } else if (language === 'zh') {
                                return <>
                                  您好，您的预约普通门诊转诊咨询已成功确认。
                                  <br /><br />
                                  <Building2 className="w-3 h-3 text-emerald-800 inline mr-1 -mt-0.5" /><strong>门诊:</strong> {bookedClinicName}
                                  <br /><Calendar className="w-3 h-3 text-emerald-800 inline mr-1 -mt-0.5" /><strong>日期:</strong> {dateStr}
                                  <br /><Clock className="w-3 h-3 text-emerald-800 inline mr-1 -mt-0.5" /><strong>时间:</strong> {timeStr}
                                  <br /><br />
                                  请登录 HealthHub 应用完善您的准备信息。
                                </>;
                              } else if (language === 'ta') {
                                return <>
                                  வணக்கம், உங்களின் சந்திப்பு வெற்றிகரமாக உறுதிப்படுத்தப்பட்டுள்ளது.
                                  <br /><br />
                                  <Building2 className="w-3 h-3 text-emerald-800 inline mr-1 -mt-0.5" /><strong>சந்திப்பு:</strong> {bookedClinicName}
                                  <br /><Calendar className="w-3 h-3 text-emerald-800 inline mr-1 -mt-0.5" /><strong>தேதி:</strong> {dateStr}
                                  <br /><Clock className="w-3 h-3 text-emerald-800 inline mr-1 -mt-0.5" /><strong>நேரம்:</strong> {timeStr}
                                  <br /><br />
                                  ஹெல்த்ஹப் செயலியில் உங்கள் சரிபார்ப்புப் பட்டியலை முடிக்கவும்.
                                </>;
                              } else {
                                return <>
                                  Hi, your upcoming outpatient referral consultation is confirmed.
                                  <br /><br />
                                  <Building2 className="w-3 h-3 text-emerald-800 inline mr-1 -mt-0.5" /><strong>Clinic:</strong> {bookedClinicName}
                                  <br /><Calendar className="w-3 h-3 text-emerald-800 inline mr-1 -mt-0.5" /><strong>Date:</strong> {dateStr}
                                  <br /><Clock className="w-3 h-3 text-emerald-800 inline mr-1 -mt-0.5" /><strong>Time:</strong> {timeStr}
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
                    {isFHReferred && (
                      <button
                        onClick={onTriggerNotification}
                        className="w-full py-2.5 bg-[#00a859] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <Bell className="w-4 h-4" /> {t('lock_trigger_push_alert')}
                      </button>
                    )}
                  </div>
                )}

                {/* Log Out Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      triggerToast(t('logout_toast'));
                      setShowSplash(true);
                      setSplashFading(false);
                      setShowLoginModal(false);
                      onChangeScreen(ScreenId.Home);
                    }}
                    className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    id="settings-logout-btn"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('profile_logout')}
                  </button>
                </div>

            </div>
          </div>
        );
      })()}


        {/* ----------------- SCREEN 5: PROGRESS TIMELINE ----------------- */}
        {activeScreen === ScreenId.ProgressTimeline && (
          <div className="flex-col flex flex-1 h-full overflow-hidden animate-slide-in">
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

            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-left pb-36">
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
                    <div className="absolute -left-[21px] w-5 h-5 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center text-white shadow-xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">{t('journey_referral_received')}</h5>
                      <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{t('journey_referral_received_desc')}</p>
                    </div>
                  </div>

                  {/* Step 2: Appointment Booked */}
                  <div className="relative">
                    <div className={`absolute -left-[21px] w-5 h-5 rounded-full border-4 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-xs ${
                      (appointment.status === 'booked' || appointment.status === 'confirmed') ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}>
                      {(appointment.status === 'booked' || appointment.status === 'confirmed') ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '2'}
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

                  {/* Step 3: Attend Counselling */}
                  <div className="relative">
                    <div className={`absolute -left-[21px] w-5 h-5 rounded-full border-4 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-xs ${
                      appointment.status === 'confirmed' 
                        ? 'bg-emerald-500' 
                        : appointment.status === 'booked' 
                          ? 'bg-amber-500' 
                          : 'bg-slate-300'
                    }`}>
                      {appointment.status === 'confirmed' ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '3'}
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
            <div className="relative text-center text-white/60 text-[10px] z-10 pb-4 font-mono">
              <span>{t('lockscreen_swipe_hint')}</span>
            </div>
          </div>
        )}


        {/* ----------------- SCREEN 7: PROFILE ----------------- */}
        {activeScreen === ScreenId.Profile && (
          <div className="flex-col flex flex-1 h-full overflow-hidden bg-slate-50 animate-fade-in">
            {/* Top Navigation Header */}
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex justify-between items-center sticky top-0 z-10 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <button 
                  onClick={() => onChangeScreen(ScreenId.ReminderSettings)} 
                  className="p-1 hover:bg-slate-100 rounded-full transition cursor-pointer shrink-0"
                  id="profile-back-btn"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-700" />
                </button>
                <span className="font-bold text-sm text-slate-800 break-words min-w-0 flex-1">{t('profile_my_profile')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-emerald-50 text-[#00a859] font-extrabold uppercase px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#00a859]" /> {t('profile_singpass_linked')}
                </span>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-left pb-36">
              
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
              <div className="bg-slate-50 px-3.5 sm:px-4 py-3 border-b border-slate-200 flex justify-between items-center shrink-0 gap-2">
                <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-1">
                  <div className="p-1.5 bg-emerald-50 text-[#00a859] rounded-lg border border-emerald-200 shrink-0">
                    <FileText className="w-4 h-4 text-[#00a859]" />
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <span className="text-[8px] font-extrabold text-[#00a859] uppercase tracking-wider font-mono bg-emerald-50 px-1 py-0.2 border border-emerald-100/50 rounded inline-block">
                      {selectedResource.type}
                    </span>
                    <h3 className="font-bold text-[12px] sm:text-[13px] text-slate-800 leading-snug mt-0.5">
                      {selectedResource.title}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedResource(null)}
                  className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer transition shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Document Sub-Header / Tool Controls */}
              <div className="bg-slate-100/80 px-3.5 sm:px-4 py-2 border-b border-slate-200 flex justify-end items-center text-[10px] text-slate-600 font-mono">
                <div className="flex items-center gap-1.5">
                  {selectedResource.externalUrl && (
                    <a 
                      href={selectedResource.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#00a859] hover:text-emerald-800 font-bold bg-white px-2 py-1 rounded border border-slate-200 cursor-pointer shadow-3xs text-[9.5px]"
                    >
                      <ExternalLink className="w-3 h-3 text-[#00a859]" /> {t('edu_website_btn') || 'WEBSITE'}
                    </a>
                  )}
                  <button 
                    onClick={() => {
                      setDownloadToast(`Saved ${selectedResource.title} to local storage.`);
                    }}
                    className="flex items-center gap-1 hover:text-emerald-700 font-bold bg-white px-2 py-1 rounded border border-slate-200 cursor-pointer shadow-3xs text-[9.5px]"
                  >
                    <Download className="w-3 h-3 text-[#00a859]" /> {t('edu_download_btn') || 'DOWNLOAD'}
                  </button>
                </div>
              </div>

              {/* Document Page Canvas */}
              <div className="flex-1 bg-slate-200 p-3 sm:p-4 overflow-y-auto flex justify-center items-start">
                <div className={`bg-white w-full max-w-full rounded-lg shadow-md p-4 sm:p-5 flex flex-col border border-slate-300 relative select-text ${
                  textSize === 'sm' ? 'education-text-sm' :
                  textSize === 'lg' ? 'education-text-lg' :
                  'education-text-md'
                }`}>
                  {/* Watermarks and page header */}
                  <div className="border-b border-slate-100 pb-2 mb-3 flex justify-between items-center text-[8.5px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                    <span>MOH CLINICAL EXCELLENCE ALLIANCE</span>
                    <span>{t('edu_page_label')} {resourcePage + 1} / {selectedResource.pages.length}</span>
                  </div>

                  <h4 className="font-display font-extrabold text-[13px] text-slate-900 tracking-tight leading-snug border-l-4 border-emerald-500 pl-2">
                    {selectedResource.pages[resourcePage].title}
                  </h4>

                  <div className="mt-3.5 space-y-3 text-[11px] text-slate-700 leading-relaxed font-sans flex-1 text-left">
                    {selectedResource.pages[resourcePage].paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="indent-2">{p}</p>
                    ))}
                  </div>

                  {/* Watermark Logo */}
                  <div className="absolute bottom-12 right-4 opacity-5 pointer-events-none">
                    <HeartPulse className="w-20 h-20 text-slate-950" />
                  </div>

                  {/* Page Footer */}
                  <div className="border-t border-slate-100 pt-2.5 mt-5 flex justify-between items-center text-[8.5px] text-slate-400 font-medium font-sans">
                    <span>MOH Clinical Excellence Alliance</span>
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
        {isFHReferred && !selectedResource && activeScreen !== ScreenId.Home && activeScreen !== ScreenId.Booking && activeScreen !== ScreenId.ReminderSettings && activeScreen !== ScreenId.Profile && !(activeScreen === ScreenId.Education && !onboardingCompleted) && (
          <button
            onClick={() => onChangeScreen(ScreenId.Booking)}
            className="absolute bottom-4 right-4 z-40 bg-[#00a859] hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-full flex items-center gap-1.5 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-500/20 text-xs font-bold font-sans"
            title={appointment.status === 'booked' ? t('view_booking') : t('book_now_btn')}
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>{appointment.status === 'booked' ? t('view_booking') : t('book_now_btn')}</span>
          </button>
        )}

      </div>

      <div className="bg-white border-t-2 border-slate-200 py-2 px-2.5 flex justify-between items-center gap-1.5 z-40 select-none shrink-0 shadow-lg no-text-scale">
        {[
          { icon: <HeartPulse className="w-5 h-5 shrink-0 no-text-scale" />, label: t('nav_home'), screen: ScreenId.Home },
          ...(isFHReferred ? [
            { icon: <Calendar className="w-5 h-5 shrink-0 no-text-scale" />, label: t('nav_book'), screen: ScreenId.Booking },
            { icon: <Dna className="w-5 h-5 shrink-0 no-text-scale" />, label: t('nav_learn'), screen: ScreenId.Education },
          ] : []),
        ].map((tab) => (
          <button
            key={tab.screen}
            onClick={() => {
              if (bookingSubFlow) {
                handleExitReschedule();
                handleExitCancelFlow();
              }
              if (appointment?.status !== 'booked' && appointment?.status !== 'confirmed') {
                setBookingStep('available');
              }
              onChangeScreen(tab.screen);
            }}
            className={`flex-1 min-w-0 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer py-1.5 px-1 rounded-xl min-h-[52px] no-text-scale ${
              activeScreen === tab.screen && !bookingSubFlow 
                ? 'text-[#00733a] font-extrabold bg-emerald-50/80 border border-emerald-200' 
                : 'text-slate-700 hover:text-slate-900 font-bold hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span className="font-bold tracking-tight text-center leading-tight break-words max-w-full line-clamp-2 text-[11px] no-text-scale">
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-slate-100 py-2.5 flex justify-center items-center z-40 shrink-0 select-none">
        <div className="w-28 h-1 bg-slate-400 rounded-full" />
      </div>

    </div>
  );
}
