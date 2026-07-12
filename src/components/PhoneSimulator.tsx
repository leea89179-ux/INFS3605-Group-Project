import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId, Appointment, ReminderPreferences } from '../types';
import { HeartPulse, Dna, ClipboardList, Coins, ShieldAlert, Pill, ChevronRight, Calendar, Bell, Check, ArrowLeft, Play, Pause, MapPin, SquareCheck as CheckSquare, Square, Info, ShieldCheck, ExternalLink, MessageCircle, Smartphone, CircleAlert as AlertCircle, Share2, Users, Sparkles, BookOpen, FileText, Shield, Settings, CreditCard, User, ChevronDown, Clock, X, Download, Printer, ChevronLeft, CircleHelp as HelpCircle, Globe, CircleCheck as CheckCircle, Phone, LogOut, Search } from 'lucide-react';
import { educationalSections, preCounsellingChecklist, faqs, HelpfulResource, helpfulResources } from '../data/education';
import { Language, LANG_LABELS, UI_TRANSLATIONS, getLocalizedChecklist, getLocalizedEducationalSections, getLocalizedFaqs } from '../data/translations';

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
  onCancelAppointment: () => void;
  isFHReferred: boolean;
}

export const formatMonthShorthand = (monthStr: string): string => {
  const parts = monthStr.split(' ');
  if (parts.length < 2) return monthStr;
  const monthName = parts[0];
  const year = parts[1];
  const shortMap: Record<string, string> = {
    'January': 'Jan',
    'February': 'Feb',
    'March': 'Mar',
    'April': 'Apr',
    'May': 'May',
    'June': 'Jun',
    'July': 'Jul',
    'August': 'Aug',
    'September': 'Sept',
    'October': 'Oct',
    'November': 'Nov',
    'December': 'Dec',
  };
  return `${shortMap[monthName] || monthName} ${year}`;
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
  const clinicKey = Object.keys(CLINIC_SLOTS_DB).find(key => {
    const months = CLINIC_SLOTS_DB[key];
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
    const months = CLINIC_SLOTS_DB[clinicKey];
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
    cost: 'S$18.50',
    duration: '45 mins',
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
}: PhoneSimulatorProps) {
  // Local state for interactive elements
  const [language, setLanguage] = useState<Language>('en');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = (key: string): string => {
    return UI_TRANSLATIONS[language]?.[key] || UI_TRANSLATIONS['en']?.[key] || key;
  };

  useEffect(() => {
    const localized = getLocalizedChecklist(language);
    setChecklist((prev) =>
      localized.map((item, idx) => ({
        ...item,
        checked: prev[idx]?.checked ?? false,
      }))
    );
  }, [language]);

  const [eduExpanded, setEduExpanded] = useState<Record<string, boolean>>({});
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('all');
  const [faqExpanded, setFaqExpanded] = useState<Record<number, boolean>>({});
  const [checklist, setChecklist] = useState(preCounsellingChecklist);
  const [viewingChecklist, setViewingChecklist] = useState<boolean>(false);
  const [eduSubTab, setEduSubTab] = useState<'guides' | 'checklist' | 'faq'>('guides');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoFrame, setVideoFrame] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [faqActiveIdx, setFaqActiveIdx] = useState<number | null>(null);
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
  const [patientCoords, setPatientCoords] = useState<{ lat: number; lng: number }>({ lat: 1.3625, lng: 103.8542 }); // default Ang Mo Kio Ave 10 (Home)
  const [patientLocName, setPatientLocName] = useState<string>('Blk 451 Ang Mo Kio Ave 10, #08-122, Singapore 560451');
  const [locationSearchQuery, setLocationSearchQuery] = useState<string>('');
  const [isDetectingLoc, setIsDetectingLoc] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  const [showClinicDropdown, setShowClinicDropdown] = useState<boolean>(false);

  // Calendar Booking States (User request 2)
  const [selectedCalendarMonth, setSelectedCalendarMonth] = useState<string>('July 2026');
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(21); // Day of the month
  const [selectedSlotObj, setSelectedSlotObj] = useState<ClinicSlot | null>(null);
  const [showMonthPopup, setShowMonthPopup] = useState<boolean>(false);

  const selectMonth = (month: string) => {
    setSelectedCalendarMonth(month);
    const availableDays = Object.keys(CLINIC_SLOTS_DB[selectedClinicId]?.[month] || {})
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
  const [rescheduleCalendarMonth, setRescheduleCalendarMonth] = useState<string>('July 2026');
  const [rescheduleCalendarDay, setRescheduleCalendarDay] = useState<number>(21);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showNotificationPopup, setShowNotificationPopup] = useState<boolean>(false);

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
    setBookingStep('available');
    setSelectedSlotIdx(null);
    setSelectedSlotObj(null);
    setSelectedCalendarDay(22);
  };

  const handleEnterReschedule = () => {
    setProposedSlotObj(null);
    const currentClinicId = CLINICS.find(c => c.name === appointment?.clinic)?.id || 'nuh';
    setRescheduleClinicId(currentClinicId);

    // Derive month and day from appointment.date (format: "22 July 2026")
    const dateParts = appointment?.date?.split(' ');
    const apptDay = dateParts?.length === 3 ? parseInt(dateParts[0], 10) : NaN;
    const apptMonth = dateParts?.length === 3 ? `${dateParts[1]} ${dateParts[2]}` : 'July 2026';
    const derivedMonth = isNaN(apptDay) ? 'July 2026' : apptMonth;

    setRescheduleCalendarMonth(derivedMonth);
    const availableDays = Object.keys(CLINIC_SLOTS_DB[currentClinicId]?.[derivedMonth] || {})
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
                <p className="text-[10.5px] font-bold text-slate-700">{appointment.date}</p>
                <p className="text-[10.5px] text-slate-600">{appointment.timeSlot} · {appointment.clinic}</p>
              </div>
            )}

            <p className="text-[11px] text-slate-500 leading-relaxed">
              If you need a different time, you can reschedule without losing your place in the programme.
            </p>

            {/* Custom interactive FAQ link block */}
            <div className="bg-[#f8fafc] border border-slate-200/40 rounded-2xl p-3.5 text-left shadow-3xs">
              <p className="text-[10.5px] text-slate-500 leading-normal font-medium">
                Have worries about costs, safety, or procedures?
              </p>
              <p className="text-[10.5px] text-slate-500 leading-normal font-medium mt-0.5">
                Address your concerns in our{' '}
                <button
                  onClick={() => {
                    handleExitCancelFlow();
                    setActiveFaqCategory('cost');
                    setEduSubTab('faq');
                    onChangeScreen(ScreenId.Education);
                  }}
                  className="font-bold text-[#00a859] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                >
                  FAQ section
                  <HelpCircle className="w-3.5 h-3.5 text-[#00a859] shrink-0" />
                </button>
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => { handleExitCancelFlow(); handleEnterReschedule(); }}
                className="w-full py-3 bg-[#00a859] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" /> Reschedule Instead
              </button>
              <button
                onClick={handleContinueCancelling}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition cursor-pointer text-center border border-slate-200"
              >
                Continue Cancelling
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
              <h4 className="font-extrabold text-sm text-slate-900">Confirm cancellation</h4>
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
                <p className="text-[10.5px] font-bold text-slate-700">{appointment.date}</p>
                <p className="text-[10.5px] text-slate-600">{appointment.timeSlot} · {appointment.clinic}</p>
              </div>
            )}

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Cancelling will release this booked slot. You are welcome to book again at any time, though availability may vary.
            </p>

            {/* Custom interactive FAQ link block */}
            <div className="bg-[#f8fafc] border border-slate-200/40 rounded-2xl p-3.5 text-left shadow-3xs">
              <p className="text-[10.5px] text-slate-500 leading-normal font-medium">
                Have worries about costs, safety, or procedures?
              </p>
              <p className="text-[10.5px] text-slate-500 leading-normal font-medium mt-0.5">
                Address your concerns in our{' '}
                <button
                  onClick={() => {
                    handleExitCancelFlow();
                    setActiveFaqCategory('cost');
                    setEduSubTab('faq');
                    onChangeScreen(ScreenId.Education);
                  }}
                  className="font-bold text-[#00a859] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                >
                  FAQ section
                  <HelpCircle className="w-3.5 h-3.5 text-[#00a859] shrink-0" />
                </button>
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleConfirmCancellation}
                className="w-full py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer text-center"
              >
                Yes, Cancel This Appointment
              </button>
              <button
                onClick={handleExitCancelFlow}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition cursor-pointer text-center border border-slate-200"
              >
                Keep My Appointment
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
          const rclinicsWithDistances = CLINICS.map(c => ({
            ...c,
            distance: calculateDistance(patientCoords.lat, patientCoords.lng, c.lat, c.lng),
          })).sort((a, b) => a.distance - b.distance);
          const rminDistance = Math.min(...rclinicsWithDistances.map(c => c.distance));
          return (
            <div className="flex flex-col flex-1 bg-slate-50 animate-fade-in">
              {/* Header – matches "Secure Appointment Booking" layout */}
              <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center shrink-0 relative">
                <div className="w-8" />
                <span className="flex-1 text-center font-bold text-sm text-slate-800">Select a new slot</span>
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
                      <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">Current appointment</p>
                      <p className="text-[11px] text-emerald-900 font-semibold mt-0.5">{appointment.date}</p>
                      <p className="text-[10.5px] text-emerald-700">{appointment.timeSlot} · {appointment.clinic}</p>
                    </div>
                  </div>
                )}

                <p className="mx-4 mt-3 text-[10.5px] text-slate-500">
                  Choose a replacement clinic, date and time. Your current appointment stays confirmed until you complete the reschedule.
                </p>

                <div className="px-4 pb-4 mt-3 space-y-4">
                  {/* Clinic selector */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Select clinic</label>
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
                              {CLINICS.find(c => c.id === rescheduleClinicId)?.name}
                            </h4>
                            <p className="text-[10px] text-slate-500 leading-snug mt-0.5 truncate">
                              {rclinicsWithDistances.find(c => c.id === rescheduleClinicId)?.distance.toFixed(1)} km away
                              {rclinicsWithDistances.find(c => c.id === rescheduleClinicId)?.distance === rminDistance && (
                                <span className="ml-1 text-emerald-700 font-semibold">· Nearest</span>
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
                                  const availableDays = Object.keys(CLINIC_SLOTS_DB[clinic.id]?.[rescheduleCalendarMonth] || {}).map(Number).filter(d => !isDateBeforeToday(rescheduleCalendarMonth, d));
                                  setRescheduleCalendarDay(availableDays[0] ?? 1);
                                }}
                                className={`w-full text-left p-3 transition flex justify-between items-start gap-3 hover:bg-emerald-50/10 cursor-pointer ${isSelected ? 'bg-emerald-50/20' : 'bg-white'}`}
                              >
                                <div className="space-y-0.5 min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <h5 className={`font-bold text-xs ${isSelected ? 'text-[#00a859]' : 'text-slate-800'}`}>{clinic.name}</h5>
                                    {isNearest && <span className="text-[8px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Nearest</span>}
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
                          const days = Object.keys(CLINIC_SLOTS_DB[rescheduleClinicId]?.[m] || {}).map(Number).filter(d => !isDateBeforeToday(m, d));
                          setRescheduleCalendarDay(days[0] ?? 1);
                        }
                      }}
                      disabled={availableMonths.indexOf(rescheduleCalendarMonth) === 0}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-slate-700">{formatMonthShorthand(rescheduleCalendarMonth)}</span>
                    <button
                      onClick={() => {
                        const idx = availableMonths.indexOf(rescheduleCalendarMonth);
                        if (idx < availableMonths.length - 1) {
                          const m = availableMonths[idx + 1];
                          setRescheduleCalendarMonth(m);
                          const days = Object.keys(CLINIC_SLOTS_DB[rescheduleClinicId]?.[m] || {}).map(Number).filter(d => !isDateBeforeToday(m, d));
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
                      const hasSlots = !!CLINIC_SLOTS_DB[rescheduleClinicId]?.[rescheduleCalendarMonth]?.[dayNum] && !isDateBeforeToday(rescheduleCalendarMonth, dayNum);
                      const isSelected = rescheduleCalendarDay === dayNum;
                      const isRescheduleCurrentDay = rescheduleCalendarMonth === 'July 2026' && dayNum === 12;
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
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Available slots</label>
                    {CLINIC_SLOTS_DB[rescheduleClinicId]?.[rescheduleCalendarMonth]?.[rescheduleCalendarDay] ? (
                      CLINIC_SLOTS_DB[rescheduleClinicId][rescheduleCalendarMonth][rescheduleCalendarDay]
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
                                  <span>{slot.duration}</span>
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
                        No available slots on this day.
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
                  Keep current appointment
                </button>
              </div>
            </div>
          );
        })()}

        {/* RESCHEDULE – review comparison */}
        {bookingSubFlow === 'reschedule-review' && proposedSlotObj && (
          <div className="flex flex-col flex-1 bg-slate-50 animate-fade-in">
            {/* Header */}
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center shrink-0 relative">
              <button
                onClick={() => setBookingSubFlow('reschedule-select')}
                className="w-16 flex items-center gap-0.5 p-1 text-slate-400 hover:text-slate-700 transition cursor-pointer text-[10.5px]"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back
              </button>
              <span className="flex-1 text-center font-bold text-sm text-slate-800">Review change</span>
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
                Review the change before confirming. Your current appointment will remain active until you press Confirm Reschedule.
              </p>

              {/* Current appointment */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-3 py-2 border-b border-slate-100">
                  <p className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide">Current appointment</p>
                </div>
                <div className="px-3 py-3 space-y-0.5">
                  {appointment && (
                    <>
                      <p className="text-[11px] font-bold text-slate-800">{appointment.date}</p>
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
                  <p className="text-[9.5px] font-bold text-emerald-700 uppercase tracking-wide">New appointment</p>
                </div>
                <div className="px-3 py-3 space-y-0.5">
                  <p className="text-[11px] font-bold text-slate-800">{proposedSlotObj.date}</p>
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
                Confirm Reschedule
              </button>
              <button
                onClick={() => setBookingSubFlow('reschedule-select')}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition cursor-pointer text-center border border-slate-200"
              >
                Choose a Different Slot
              </button>
              <button
                onClick={handleExitReschedule}
                className="w-full py-2 text-slate-400 hover:text-slate-600 text-[10.5px] font-medium transition cursor-pointer text-center"
              >
                Keep current appointment
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
              <h3 className="font-extrabold text-base text-slate-900">Appointment rescheduled.</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">Your appointment has been updated.</p>
            </div>
            {appointment && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 w-full text-left space-y-0.5">
                <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">New appointment</p>
                <p className="text-[11px] font-bold text-slate-800 mt-1">{appointment.date}</p>
                <p className="text-[10.5px] text-slate-600">{appointment.timeSlot}</p>
                <p className="text-[10px] text-slate-500">{appointment.clinic}</p>
              </div>
            )}
            <button
              onClick={() => setBookingSubFlow(null)}
              className="w-full py-3 bg-[#00a859] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer text-center"
            >
              Done
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
              <h3 className="font-extrabold text-base text-slate-900">Your appointment has been cancelled.</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                You can book a new slot whenever you are ready.
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
                <Calendar className="w-4 h-4" /> Book a New Appointment
              </button>
              <button
                onClick={() => { setBookingSubFlow(null); onChangeScreen(ScreenId.Home); }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition cursor-pointer text-center border border-slate-200"
              >
                Return to Home
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

              {/* Settings Cog */}
              <div className="cursor-pointer hover:opacity-80 transition" onClick={() => onChangeScreen(ScreenId.ReminderSettings)}>
                <Settings className="w-5 h-5 text-slate-700" />
              </div>
            </div>

            {/* Notifications Pop-up Dialog */}
            {showNotificationPopup && (
              <div className="absolute inset-x-4 top-14 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 animate-fade-in p-4 text-left space-y-3.5 max-w-[340px] mx-auto">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-[#00a859]" />
                    <h4 className="font-bold text-xs text-slate-800">Notifications</h4>
                  </div>
                  <button 
                    onClick={() => setShowNotificationPopup(false)} 
                    className="text-slate-400 hover:text-slate-600 font-bold text-xs p-1 cursor-pointer"
                  >
                    Close
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
                      <p className="text-xs font-extrabold text-slate-800">FH Genetic Referral Active</p>
                      <p className="text-[10px] text-slate-500 leading-normal">Your clinical referral is active. Read why your doctor recommended testing.</p>
                      <span className="text-[9px] text-slate-400 block pt-0.5">2h ago</span>
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
                        {appointment.status === 'booked' ? 'Counselling Appointment Booked' : 'Action Required: Book Counselling'}
                      </p>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        {appointment.status === 'booked' 
                          ? `Pre-test genetic counselling confirmed for ${appointment.date} @ ${appointment.timeSlot}.`
                          : 'Please secure your pre-test genetic counselling session slot.'}
                      </p>
                      <span className="text-[9px] text-slate-400 block pt-0.5">
                        {appointment.status === 'booked' ? 'Just now' : '1d ago'}
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
                    LH
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-800">Lisa Ho</h4>
                    <p className="text-[9px] text-slate-400 font-medium">SXXXX321A • {t('active_user')}</p>
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
                      <button
                        onClick={() => onChangeScreen(ScreenId.ReferralIntro)}
                        className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer select-none"
                      >
                        {t('why_referred_btn')}
                      </button>
                    </div>

                    {/* Patient Journey Progress Pathway */}
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



                  </div>
                </div>
              )}

              {/* 4. Quick Links Grid (1:1 with reference screenshot) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-4">
                  <h3 className="font-display font-bold text-slate-900 text-xs tracking-tight">Quick Links</h3>
                  <button className="text-[#00a859] text-[11px] font-bold hover:underline">Edit</button>
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
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight">Appointments</span>
                  </button>

                  {/* Card 2: CHAS */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-1 shrink-0">
                      <div className="border-1.5 border-blue-400 rounded px-1.5 py-0.5 text-[8px] font-black text-blue-500 bg-white leading-none scale-90">CHAS</div>
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight">CHAS</span>
                  </div>

                  {/* Card 3: Lab Reports */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mb-1 shrink-0">
                      <ClipboardList className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight">Lab reports</span>
                  </div>

                  {/* Card 4: Medical reports / certs */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mb-1 shrink-0">
                      <FileText className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight">Medical reports</span>
                  </div>

                  {/* Card 5: Medication Refill */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square">
                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mb-1 shrink-0">
                      <Pill className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight">Medication refill</span>
                  </div>

                  {/* Card 6: Payment */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-slate-200 transition aspect-square">
                    <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center mb-1 shrink-0">
                      <CreditCard className="w-4 h-4 text-sky-600" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight">Payment</span>
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
                    <p className="text-[9px] text-slate-600 leading-snug">Personalised guides for managing and preventing diabetes.</p>
                  </div>

                  {/* Card 2: Mental Well-being */}
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex flex-col justify-between h-32 min-w-[220px] relative overflow-hidden shrink-0 shadow-xs">
                    <div className="absolute right-2 bottom-2 text-5xl opacity-40 select-none">🧠</div>
                    <div>
                      <span className="bg-emerald-500/20 text-emerald-800 text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full font-mono">Resource</span>
                      <h4 className="font-display font-bold text-slate-900 text-[11px] mt-1.5">Mental Well-being</h4>
                    </div>
                    <p className="text-[9px] text-slate-600 leading-snug">Mindfulness guides and support networks for emotional safety.</p>
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
                  <p className="text-xs text-slate-700 leading-relaxed">{t('referred_hi_lisa')}</p>
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
          <div className="flex-col flex flex-1 h-full overflow-hidden bg-slate-50">
            {/* Top Navigation */}
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center shrink-0">
              <div className="flex items-center gap-2">
                <button onClick={() => onChangeScreen(ScreenId.Home)} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer">
                  <ArrowLeft className="w-5 h-5 text-slate-700" />
                </button>
                <span className="font-bold text-sm text-slate-800">Education Hub</span>
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
              <div className="flex-1 overflow-y-auto flex flex-col pb-6">
                {/* Profile Info Row */}
                <div className="bg-emerald-50/60 border-b border-emerald-100 px-4 py-2.5 flex justify-between items-center text-[11px] shrink-0">
                  <span className="text-slate-600">Patient: <strong className="text-slate-800">Lisa Ho (SXXXX321A)</strong></span>
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-extrabold border border-emerald-200/50">MOH Referred</span>
                </div>

                {/* Hero Section - Edge-to-edge Deep Teal Banner */}
                <div className="bg-[#00a859] text-white px-5 py-5 space-y-1.5 shrink-0">
                  <span className="text-[9.5px] font-bold tracking-widest text-emerald-100 font-mono uppercase">HI LISA,</span>
                  <h3 className="font-display font-extrabold text-sm text-white tracking-tight leading-snug">
                    Your FH Learning Guide
                  </h3>
                  <p className="text-[11px] text-emerald-50/90 leading-relaxed font-sans">
                    A personalised guide on why and how to prepare after you have been referred for FH genetic testing.
                  </p>
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
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10.5px] font-extrabold transition-all cursor-pointer ${
                        eduSubTab === 'guides'
                          ? 'bg-[#00a859] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-800 bg-transparent hover:bg-slate-200/30'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      <span>Guides</span>
                    </button>
                    <button
                      id="edu-tab-checklist"
                      onClick={() => {
                        setEduSubTab('checklist');
                        setViewingChecklist(true);
                      }}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10.5px] font-extrabold transition-all cursor-pointer ${
                        eduSubTab === 'checklist'
                          ? 'bg-[#00a859] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-800 bg-transparent hover:bg-slate-200/30'
                      }`}
                    >
                      <CheckSquare className="w-3.5 h-3.5 shrink-0" />
                      <span>Checklist</span>
                    </button>
                    <button
                      id="edu-tab-faq"
                      onClick={() => {
                        setEduSubTab('faq');
                        setViewingChecklist(false);
                      }}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10.5px] font-extrabold transition-all cursor-pointer ${
                        eduSubTab === 'faq'
                          ? 'bg-[#00a859] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-800 bg-transparent hover:bg-slate-200/30'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>FAQs & Links</span>
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
                          Please note: Being referred for a genetic test does not mean you have FH. It is simply a proactive measure to assess your natural risk.
                        </p>
                      </div>

                      {/* Patient Experience Video Section */}
                      <div className="bg-slate-900 rounded-2xl overflow-hidden relative shadow-md">
                        {/* Simulated Video Frame */}
                        <div className="h-44 flex flex-col items-center justify-center relative p-4 text-center">
                          {isPlayingVideo ? (
                            <div className="absolute inset-0 bg-emerald-950/85 flex flex-col justify-between p-4 text-white">
                              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 self-start">Patient Experience Story (Chloe, 21)</span>
                              
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
                                  <div className="bg-emerald-400 h-full transition-all duration-300" style={{ width: `${(videoFrame + 1) * 25}%` }} />
                                </div>
                                <span className="text-[9px] font-mono">0:{(videoFrame + 1) * 11} / 0:45</span>
                              </div>
                            </div>
                          ) : (
                            <div className="absolute inset-0 bg-slate-900/90 flex flex-col justify-center items-center text-white p-4">
                              <div className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center shadow-lg cursor-pointer transform active:scale-95 transition" onClick={() => setIsPlayingVideo(true)}>
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
                            className="text-emerald-400 font-bold hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                          >
                            {isPlayingVideo ? <><Pause className="w-3.5 h-3.5" /> Pause Story</> : <><Play className="w-3.5 h-3.5" /> Play Story</>}
                          </button>
                          
                          <button 
                            onClick={() => setShowTranscript(!showTranscript)}
                            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium transition cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-emerald-400" />
                            {showTranscript ? 'Hide Transcript' : 'View Transcript'}
                          </button>
                        </div>
                      </div>

                      {/* Accessible Transcript Container */}
                      {showTranscript && (
                        <div className="bg-white border border-slate-200 rounded-xl p-3.5 text-[10px] text-slate-600 leading-relaxed space-y-1.5 shadow-3xs animate-fade-in">
                          <p className="font-bold text-emerald-800 uppercase tracking-wider text-[8px] font-mono border-b border-slate-100 pb-1">Video Transcript & Captions</p>
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
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#00a859] font-mono">Did You Know?</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {/* Stat 1 */}
                          <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between shadow-3xs space-y-1.5">
                            <div className="text-xl">🇸🇬</div>
                            <div>
                              <h5 className="font-display font-extrabold text-[#00a859] text-[15px] leading-tight">1 in 250</h5>
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
                              <h5 className="font-display font-extrabold text-[#00a859] text-[15px] leading-tight">~90%</h5>
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
                              <h5 className="font-display font-extrabold text-[#00a859] text-[15px] leading-tight">Up to 80%</h5>
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
                              <h5 className="font-display font-extrabold text-[#00a859] text-[15px] leading-tight">1 in 2</h5>
                              <p className="font-bold text-[10px] text-slate-800 leading-snug font-sans">family risk</p>
                            </div>
                            <p className="text-[9.5px] text-slate-500 leading-relaxed font-sans">
                              Each parent, sibling, or child has a 50% chance of inheritance.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Learning Hub Accordions - Grouped */}
                      <div className="space-y-3.5">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">LEARNING HUB</h4>
                          <span className="text-[10px] text-slate-500 font-medium">3 Modules • 6 Topics</span>
                        </div>

                        {[
                          {
                            id: 'basics',
                            title: 'Understanding FH & Meds',
                            description: 'Learn about the genetic condition, physical signs, and standard treatments.',
                            icon: 'BookOpen',
                            sectionIds: ['what-is-fh', 'medication-fh'],
                          },
                          {
                            id: 'journey',
                            title: 'Your Clinical Journey',
                            description: 'A step-by-step guide to testing and protecting your family.',
                            icon: 'ClipboardList',
                            sectionIds: ['testing-guide', 'why-testing-matters'],
                          },
                          {
                            id: 'costs',
                            title: 'Subsidies & Protections',
                            description: 'MOH subsidies, MediSave coverage, and your legal insurance rights.',
                            icon: 'Shield',
                            sectionIds: ['costs-subsidies', 'insurance-rights'],
                          },
                        ].map((group) => {
                          const isGroupExpanded = !!expandedGroups[group.id];
                          return (
                            <div key={group.id} className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden transition-all duration-250">
                              {/* Group Header Row */}
                              <button
                                onClick={() => toggleGroup(group.id)}
                                className={`w-full text-left p-4 flex items-center justify-between transition-colors cursor-pointer ${
                                  isGroupExpanded ? 'bg-slate-50/70 border-b border-slate-100' : 'hover:bg-slate-50/30'
                                }`}
                              >
                                <div className="flex gap-3.5 items-center flex-1 min-w-0">
                                  <div className="p-2 bg-emerald-50 rounded-full border border-emerald-100/55 shrink-0 flex items-center justify-center">
                                    {getIcon(group.icon || 'HelpCircle')}
                                  </div>
                                  <div className="flex-1 min-w-0 space-y-0.5">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-display font-extrabold text-[12px] text-slate-900 leading-tight tracking-tight">
                                        {group.title}
                                      </h4>
                                      <span className="text-[8.5px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md border border-emerald-100/35 shrink-0">
                                        {group.sectionIds.length} Topics
                                      </span>
                                    </div>
                                    <p className="text-[10.5px] text-slate-500 leading-relaxed">
                                      {group.description}
                                    </p>
                                  </div>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-250 ${isGroupExpanded ? 'rotate-180' : ''} ml-2`} />
                              </button>

                              {/* Group Content (Nested Topics) */}
                              {isGroupExpanded && (
                                <div className="p-3 bg-slate-50/40 space-y-2.5 border-t border-slate-100 animate-fade-in">
                                  {group.sectionIds.map((secId) => {
                                    const sec = getLocalizedEducationalSections(language).find(s => s.id === secId);
                                    if (!sec) return null;

                                    const isExpanded = !!eduExpanded[sec.id];

                                    // Custom high fidelity titles and subtitles for collapsed/expanded states (English overrides)
                                    let displayTitle = sec.title;
                                    let displaySubtitle = sec.shortSummary;

                                    if (language === 'en') {
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
                                          ? 'Confirming FH unlocks personalised care and protects your loved ones through cascade screening.' 
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
                                    }

                                    return (
                                      <div key={sec.id} className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-3xs transition-all duration-200">
                                        <button
                                          onClick={() => toggleEdu(sec.id)}
                                          className="w-full text-left p-3.5 flex items-start gap-3 justify-between hover:bg-slate-50/55 transition cursor-pointer"
                                        >
                                          <div className="flex gap-3 items-start flex-1 min-w-0">
                                            <div className="mt-0.5 p-1.5 bg-emerald-50/70 rounded-lg border border-emerald-100/40 shrink-0 flex items-center justify-center">
                                              {getIcon(sec.iconName || 'HelpCircle')}
                                            </div>
                                            <div className="flex-1 min-w-0 space-y-0.5">
                                              <h5 className="font-display font-extrabold text-[11px] text-slate-900 leading-tight tracking-tight">
                                                {displayTitle}
                                              </h5>
                                              <p className="text-[10px] text-slate-500 leading-relaxed">
                                                {displaySubtitle}
                                              </p>
                                              
                                              {/* Keyword Tag Bubbles - only shown when collapsed */}
                                              {!isExpanded && sec.tags && sec.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1 pt-1">
                                                  {sec.tags.map((tag, tIdx) => (
                                                    <span key={tIdx} className="text-[8px] bg-slate-50 text-slate-400 font-medium px-1.5 py-0.5 rounded border border-slate-200/30">
                                                      {tag}
                                                    </span>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''} self-start mt-0.5`} />
                                        </button>
                                        
                                        {isExpanded && (
                                          <div className="px-3.5 pb-3.5 pt-2.5 border-t border-slate-100 bg-slate-50/50 text-[10.5px] text-slate-600 leading-relaxed space-y-3">
                                            <p className="text-slate-600 font-sans leading-relaxed text-[10.5px]">{sec.content}</p>

                                            {/* Structured vertical steps timeline if steps exist */}
                                            {sec.steps && sec.steps.length > 0 && (
                                              <div className="relative pl-4 border-l-2 border-emerald-100 my-4 ml-2 space-y-3.5">
                                                {sec.steps.map((st) => (
                                                  <div key={st.num} className="relative">
                                                    {/* Numbered visual dot */}
                                                    <div className="absolute -left-[22px] top-0.5 w-4 h-4 rounded-full bg-[#00a859] text-white flex items-center justify-center text-[9px] font-extrabold ring-4 ring-slate-50">
                                                      {st.num}
                                                    </div>
                                                    <div className="space-y-0.5">
                                                      <h6 className="font-bold text-[9.5px] text-slate-800">{st.title}</h6>
                                                      <p className="text-[9px] text-slate-500 leading-normal">{st.description}</p>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            )}

                                            {/* Dynamic subsections like cascade screening/cost details */}
                                            {sec.subsections && sec.subsections.length > 0 && (
                                              <div className="space-y-2.5 my-2.5">
                                                {sec.subsections.map((sub, sIdx) => (
                                                  <div key={sIdx} className="bg-white border border-slate-150 p-3 rounded-lg shadow-3xs space-y-1">
                                                    <h6 className="font-bold text-[9px] text-[#00a859] tracking-wider uppercase font-sans">{sub.title}</h6>
                                                    <p className="text-[10px] text-slate-600 leading-relaxed font-sans">{sub.text}</p>
                                                  </div>
                                                ))}
                                              </div>
                                            )}

                                            <div className="border-l-4 border-emerald-500 bg-emerald-50/60 px-2.5 py-1.5 rounded-r-lg">
                                              <p className="font-bold text-[8.5px] text-emerald-900 uppercase tracking-tight font-mono">Key Takeaway</p>
                                              <p className="text-emerald-800 text-[10px] mt-0.5 leading-normal">{sec.keyTakeaway}</p>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
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
                              <span>Preparation Progress</span>
                              <span className="text-emerald-700">{completedCount} of {totalCount} completed ({percent}%)</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200/75 rounded-full overflow-hidden">
                              <div className="bg-[#00a859] h-full transition-all duration-300" style={{ width: `${percent}%` }} />
                            </div>
                            {percent === 100 ? (
                              <p className="text-[10px] text-emerald-800 font-medium flex items-center gap-1">
                                <span className="text-emerald-600 font-bold">✓</span> Excellent! You are fully prepared for your consultation.
                              </p>
                            ) : (
                              <p className="text-[10px] text-slate-500 leading-normal">
                                Complete these steps before your appointment to make the most of your session with the genetic counsellor.
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
                  )}

                  {/* TAB 3: FAQS & RESOURCES */}
                  {eduSubTab === 'faq' && (
                    <div className="space-y-4 animate-fade-in">
                      {/* FAQ Accordion Section */}
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
                                  ? 'bg-[#00a859] text-white border-[#00a859] shadow-3xs'
                                  : 'bg-white text-slate-600 hover:text-slate-800 border-slate-200'
                              }`}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>

                        <div className="space-y-2">
                          {getLocalizedFaqs(language)
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
                            let bgClass = "bg-slate-50 group-hover:bg-emerald-50 border-slate-100 group-hover:border-emerald-200";
                            let iconColor = "text-[#00a859]";
                            let typeTagClass = "bg-emerald-50 text-[#00a859] border-emerald-100/55";
                            let viewLinkColor = "text-[#00a859] group-hover:text-emerald-700";
                            let hoverBorderClass = "hover:border-emerald-200 hover:bg-emerald-50/10";

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
                                    <span>View Resource</span>
                                    <ExternalLink className="w-2.5 h-2.5 transition" />
                                  </div>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Secure Booking CTA prompt */}
                  <div className="bg-[#00a859] text-white p-5 rounded-2xl shadow-sm text-center space-y-2.5">
                    <h4 className="font-bold text-xs">Ready to book your GAC counselling slot?</h4>
                    <p className="text-[10px] text-emerald-100 max-w-[260px] mx-auto leading-normal">
                      Take the active step today. Booking takes under 20 seconds within HealthHub.
                    </p>
                    <button
                      onClick={() => onChangeScreen(ScreenId.Booking)}
                      className="w-full py-2.5 bg-white hover:bg-slate-100 text-[#00a859] rounded-xl text-xs font-bold shadow-sm transition cursor-pointer select-none border border-transparent"
                    >
                      Go to Secure Booking
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}


        {/* ----------------- SCREEN 3: BOOKING ----------------- */}
        {activeScreen === ScreenId.Booking && (
          <div className="flex-col flex flex-1 h-full overflow-hidden relative">
            {showMonthPopup && (
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl w-full max-w-[325px] p-6 shadow-2xl border border-slate-100 animate-fade-in text-left">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#00a859]" />
                      <h4 className="font-extrabold text-[15px] text-slate-800 tracking-tight">Select Month</h4>
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
                                const shortName = m.split(' ')[0].substring(0, 3);
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
              <span className="font-bold text-sm text-slate-800">Book Appointment</span>
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
                    <span className="truncate">Set up your reminder alerts & frequency</span>
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
                          <strong className="col-span-7 text-slate-800 text-right font-semibold font-mono">{appointment.date}</strong>
                        </div>
                        <div className="grid grid-cols-12 gap-x-2 items-center">
                          <span className="col-span-5 text-slate-500 font-medium">{t('booking_confirmed_time')}</span>
                          <strong className="col-span-7 text-slate-800 text-right font-semibold font-mono">{appointment.timeSlot}</strong>
                        </div>
                        <div className="grid grid-cols-12 gap-x-2 items-center">
                          <span className="col-span-5 text-slate-500 font-medium">{t('booking_session_duration')}</span>
                          <strong className="col-span-7 text-slate-800 text-right font-semibold">{details.duration}</strong>
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
                  const clinicsWithDistances = CLINICS.map(clinic => {
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
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Location:</span>
                          <button 
                            onClick={() => setShowLocationModal(!showLocationModal)}
                            className="text-[11px] text-[#00a859] font-extrabold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            {showLocationModal ? 'Close Selector' : 'Change Location'}
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-emerald-50 rounded-lg shrink-0">
                            <MapPin className="w-4 h-4 text-[#00a859]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="font-bold text-xs text-slate-800">{patientLocName}</h4>
                              {patientLocName.includes('Blk 451 Ang Mo Kio Ave 10') && (
                                <span className="bg-emerald-50 text-[#00a859] text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-100 shrink-0">
                                  Default address
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {showLocationModal && (
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-3 animate-fade-in text-xs">
                            <div className="space-y-1.5">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono">Search Location:</span>
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
                                📍 {isDetectingLoc ? 'Detecting...' : 'Live Location'}
                              </button>
                              <button
                                onClick={() => {
                                  setPatientCoords({ lat: 1.3625, lng: 103.8542 });
                                  setPatientLocName('Blk 451 Ang Mo Kio Ave 10, #08-122, Singapore 560451');
                                  setLocationSearchQuery('');
                                  triggerToast('Defaulted to profile residential address');
                                }}
                                className="py-2 px-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                              >
                                🏠 Default address
                              </button>
                            </div>

                            {/* Search Results / Suggestions */}
                            <div className="space-y-1">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                                {locationSearchQuery ? 'Search Results:' : 'Suggestions:'}
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
                                    {loc.name.includes('Blk 451 Ang Mo Kio Ave 10') && (
                                      <span className="bg-emerald-50 text-[#00a859] text-[8px] font-extrabold px-1 py-0.5 rounded border border-emerald-100 shrink-0">
                                        Default
                                      </span>
                                    )}
                                  </button>
                                ))}
                                {locationSearchQuery && SEARCHABLE_LOCATIONS.filter(loc => loc.name.toLowerCase().includes(locationSearchQuery.toLowerCase())).length === 0 && (
                                  <div className="p-2 text-center text-[10px] text-slate-500">
                                    No matches. Click below to use:
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
                                  {CLINICS.find(c => c.id === selectedClinicId)?.name}
                                </h4>
                                <p className="text-[10px] text-slate-500 leading-snug mt-0.5 truncate">
                                  {CLINICS.find(c => c.id === selectedClinicId)?.address}
                                </p>
                                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                  <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
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
                                      const availableDays = Object.keys(CLINIC_SLOTS_DB[clinic.id]?.[selectedCalendarMonth] || {})
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
                                        Distance: <span className="text-emerald-700">{clinic.distance.toFixed(1)} km</span>
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
                            {t('booking_select_counselling_slot')}
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
                              <span>{formatMonthShorthand(selectedCalendarMonth)}</span>
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
                              const hasSlots = !!CLINIC_SLOTS_DB[selectedClinicId]?.[selectedCalendarMonth]?.[dayNum] && !isDateBeforeToday(selectedCalendarMonth, dayNum);
                              const isSelected = selectedCalendarDay === dayNum;
                              const isCurrentDay = selectedCalendarMonth === 'July 2026' && dayNum === 12;

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
                            <span>Today</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#00a859]" />
                            <span>Selected Day</span>
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Slots for Selected Calendar Day */}
                      <div className="space-y-2.5 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex justify-between items-center">
                          <span>{t('available_slots')}</span>
                        </label>
                        <div className="space-y-2">
                          {CLINIC_SLOTS_DB[selectedClinicId]?.[selectedCalendarMonth]?.[selectedCalendarDay] ? (
                            CLINIC_SLOTS_DB[selectedClinicId][selectedCalendarMonth][selectedCalendarDay].map((slot, idx) => (
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
                                      <span>{slot.duration}</span>
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
                        <p className="text-[11px] text-slate-500 mt-0.5">{t('booking_choose_subsidized_slot')}</p>
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
                            <span className="text-slate-800 font-semibold font-mono">{slot.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">{t('booking_time_label')}</span>
                            <span className="text-slate-800 font-semibold font-mono">{slot.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">{t('booking_duration_label')}</span>
                            <span className="text-slate-800 font-semibold">{slot.duration}</span>
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
        {activeScreen === ScreenId.ReminderSettings && (
          <div className="flex-col flex flex-1 h-full overflow-hidden">
            {/* Top Navigation */}
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-2 text-left shrink-0">
              <button 
                onClick={() => onChangeScreen(ScreenId.Home)} 
                className="p-1 hover:bg-slate-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <span className="font-bold text-sm text-slate-800">Settings</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-left pb-12">
              <div>
                <p className="text-xs text-slate-500 leading-relaxed">{t('settings_desc')}</p>
              </div>

              {/* Language Preferences Section (User Request 5 & 6) */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                <div>
                  <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    {t('lang_pref_title')}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t('lang_pref_desc')}</p>
                </div>
                <div className="relative">
                  <select
                    id="settings-language-select"
                    value={language}
                    onChange={(e) => {
                      const newLang = e.target.value as Language;
                      setLanguage(newLang);
                      triggerToast(`Language updated: ${LANG_LABELS[newLang]}`);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-3 pr-10 text-xs text-slate-800 font-medium cursor-pointer appearance-none focus:outline-none focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] transition"
                  >
                    {(Object.keys(LANG_LABELS) as Language[]).map((lang) => (
                      <option key={lang} value={lang}>
                        {LANG_LABELS[lang]}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
              </div>

              {/* Master Toggle */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-xs text-slate-800">{t('active_reminders')}</h4>
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
                  
                  {/* Select Channel */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">{t('notification_channel')}</label>
                    <div className="relative">
                      <select
                        id="reminder-channel-select"
                        value={reminderPrefs.channel}
                        onChange={(e) => onUpdateReminderPrefs(reminderPrefs.enabled, e.target.value as any, reminderPrefs.frequency === 'custom' ? '1_week' : reminderPrefs.frequency)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-3 pr-10 text-xs text-slate-800 font-medium cursor-pointer appearance-none focus:outline-none focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] transition"
                      >
                        <option value="sms">{t('settings_option_sms_only')}</option>
                        <option value="push">{t('settings_option_push_only')}</option>
                        <option value="both">{t('settings_option_both')}</option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      </div>
                    </div>
                    {/* Short explanatory help text below dropdown */}
                    <p className="text-[10px] text-slate-500 leading-normal">
                      {reminderPrefs.channel === 'sms' && t('settings_help_sms')}
                      {reminderPrefs.channel === 'push' && t('settings_help_push')}
                      {reminderPrefs.channel === 'both' && t('settings_help_both')}
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
                  {(reminderPrefs.channel === 'sms' || reminderPrefs.channel === 'both') && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex justify-between">
                        <span>{t('settings_sms_preview_title')}</span>
                        <span className="text-emerald-700">{t('settings_sms_verified_sender')}</span>
                      </label>
                      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 border-b border-slate-100 pb-2">
                          <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                          <span>MOH-HealthHub</span>
                          <span className="ml-auto text-[9px] font-mono">Today, 09:41 AM</span>
                        </div>
                        <div className="bg-slate-100 p-3 rounded-xl rounded-tl-none text-[11px] text-slate-700 leading-normal font-sans border border-slate-200/50">
                          {t('settings_sms_prefix')
                            .replace('{date}', appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.date : '22 July 2026')
                            .replace('{time}', appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.timeSlot : '10:30 AM')}
                        </div>
                      </div>
                    </div>
                  )}

                  {(reminderPrefs.channel === 'push' || reminderPrefs.channel === 'both') && (
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
                          <h4 className="text-xs font-bold text-slate-100">{t('lock_counselling_reminder')}</h4>
                          <p className="text-[10.5px] text-slate-300 leading-snug">
                            {t('lockscreen_push_msg')
                              .replace('{date}', appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.date : '22 July 2026')
                              .replace('{time}', appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.timeSlot : '10:30 AM')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mock notify trigger */}
                  <button
                    onClick={onTriggerNotification}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Bell className="w-4 h-4" /> {t('lock_trigger_push_alert')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}


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
                        .replace('{date}', appointment.date)
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
                            .replace('{date}', appointment.date)
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
                        <div className="text-[10px] text-amber-800 font-medium leading-normal mt-0.5 bg-amber-50 px-2.5 py-1.5 rounded border border-amber-100">
                          <p className="font-bold">Scheduled & Upcoming</p>
                          <p className="mt-0.5">Your session is scheduled for <strong>{appointment.date}</strong> at <strong>{appointment.timeSlot}</strong> at {appointment.clinic}.</p>
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
                  <h4 className="font-bold text-xs text-slate-100">{t('lock_counselling_reminder')}</h4>
                  <p className="text-[11px] text-slate-300 leading-snug font-sans">
                    {t('lock_counselling_tap_confirm_msg')
                      .replace('{date}', appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.date : '22 July 2026')
                      .replace('{time}', appointment.status === 'booked' || appointment.status === 'confirmed' ? appointment.timeSlot : '10:30 AM')}
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
                <span className="font-bold text-sm text-slate-800">My Profile</span>
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
                  LH
                </div>
                <div className="space-y-1 z-10">
                  <h3 className="font-display font-extrabold text-sm text-slate-900">Lisa Ho Siew Lan</h3>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] bg-emerald-50 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded border border-emerald-100">SXXXX321A</span>
                    <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded border border-slate-200">Female, 36 yrs</span>
                  </div>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase font-mono tracking-wider">{t('profile_moh_identity_cleared')}</p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#00a859] font-mono border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#00a859]" /> Personal Information
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">Full name</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">Lisa Ho Siew Lan</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">Date of birth</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">14 August 1989</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">Gender</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">Female</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">NRIC / Health ID</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right font-mono">SXXXX321A / HH-98315</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5">
                    <span className="col-span-5 text-slate-500 font-medium">Preferred language</span>
                    <span className="col-span-7 text-right flex items-center justify-end gap-1 font-semibold text-slate-800">
                      <Globe className="w-3.5 h-3.5 text-emerald-600" />
                      English
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#00a859] font-mono border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#00a859]" /> Contact Information
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">Mobile number</span>
                    <span className="col-span-7 text-[#00a859] font-bold text-right font-mono">+65 9123 4567</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">Email address</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right truncate">lisa.ho@gmail.com</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5">
                    <span className="col-span-4 text-slate-500 font-medium">Residential address</span>
                    <span className="col-span-8 text-slate-600 text-[11px] leading-tight text-right">
                      Blk 451 Ang Mo Kio Ave 10, #08-122, Singapore 560451
                    </span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#00a859] font-mono border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#00a859]" /> Emergency Contact
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">Contact name</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">Ho Chin Teck</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">Relationship</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">Spouse</span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5">
                    <span className="col-span-5 text-slate-500 font-medium">Phone number</span>
                    <span className="col-span-7 text-slate-800 font-bold text-right font-mono">+65 9876 5432</span>
                  </div>
                </div>
              </div>

              {/* Healthcare Preferences */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#00a859] font-mono border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00a859]" /> Healthcare Preferences
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">Preferred clinic</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">Ang Mo Kio Polyclinic</span>
                  </div>
                  
                  {/* Interactive link to settings */}
                  <button
                    onClick={() => onChangeScreen(ScreenId.ReminderSettings)}
                    className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-[#00a859] rounded-xl text-xs font-bold transition flex items-center justify-between border border-emerald-100 cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-[#00a859]" />
                      View Reminder & Notification Settings
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#00a859]" />
                  </button>
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3.5">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#00a859] font-mono border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-[#00a859]" /> Medical Information
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">Active referrals</span>
                    <span className="col-span-7 text-right">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-100 rounded text-[10px]">FH Genetic Testing (MOH Subsidised)</span>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-4 text-slate-500 font-medium">Upcoming appts</span>
                    <span className="col-span-8 text-right font-medium text-slate-800 leading-normal">
                      {appointment.status === 'booked' || appointment.status === 'confirmed' ? (
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-emerald-700">{appointment.clinic}</span>
                          <span className="text-[10px] text-slate-500 mt-0.5 font-mono">{appointment.date} @ {appointment.timeSlot}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-slate-400">No scheduled appointments</span>
                          <button 
                            onClick={() => onChangeScreen(ScreenId.Booking)}
                            className="text-[#00a859] font-bold text-[10px] hover:underline"
                          >
                            Book counselling session now
                          </button>
                        </div>
                      )}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">Allergies (mock)</span>
                    <span className="col-span-7 text-right font-semibold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded text-[10px] inline-block ml-auto">Penicillin (Mild rash)</span>
                  </div>

                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">Current meds (mock)</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">Atorvastatin 20mg (once daily)</span>
                  </div>

                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">Existing conditions (mock)</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">Hypercholesterolaemia</span>
                  </div>

                  {/* Family History Card */}
                  <div className="pt-1.5">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider font-mono">Family History Summary</span>
                    <div className="mt-2 bg-slate-50 rounded-xl p-3 border border-slate-150 space-y-2 text-[10.5px] text-slate-600">
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-800">Father (Diagnosed Age 48)</p>
                          <p className="text-[10px] text-slate-500">Coronary Heart Disease (Angioplasty & Stent)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-800">Paternal Grandfather (Deceased Age 52)</p>
                          <p className="text-[10px] text-slate-500">Fatal Myocardial Infarction (Acute Heart Attack)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-800">Paternal Aunt</p>
                          <p className="text-[10px] text-slate-500">Severely high cholesterol (treated with Statins)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-800">Mother & Siblings</p>
                          <p className="text-[10px] text-slate-500">No early history of heart disease declared</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Section */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#00a859] font-mono border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 text-[#00a859]" /> Account
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">Linked HealthHub account</span>
                    <span className="col-span-7 text-emerald-700 font-extrabold text-right flex items-center justify-end gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00a859]" /> Verified via Singpass
                    </span>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 py-0.5 border-b border-slate-50">
                    <span className="col-span-5 text-slate-500 font-medium">Privacy settings</span>
                    <span className="col-span-7 text-slate-800 font-semibold text-right">National Genomic Registry Secure</span>
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
                      Log out from HealthHub
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
                <span className="font-bold text-[9px]">PAGE {resourcePage + 1} OF {selectedResource.pages.length}</span>
                <div className="flex items-center gap-1.5">
                  {selectedResource.externalUrl && (
                    <a 
                      href={selectedResource.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#00a859] hover:text-emerald-800 font-bold bg-white px-2 py-1 rounded border border-slate-200 cursor-pointer shadow-3xs"
                    >
                      <ExternalLink className="w-3 h-3 text-[#00a859]" /> WEBSITE
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
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-emerald-700 cursor-pointer shadow-3xs"
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

            </motion.div>
          </AnimatePresence>
        ) : null}

      </div>

      {/* Simulated Device Home Indicator Button */}
      <div className="bg-white border-t border-slate-200 py-3 px-4 flex justify-around items-center z-40 select-none shrink-0">
        {[
          { icon: <HeartPulse className="w-5 h-5" />, label: 'Home', screen: ScreenId.Home },
          ...(isFHReferred ? [{ icon: <Dna className="w-5 h-5" />, label: 'Learn', screen: ScreenId.Education }] : []),
          { icon: <Calendar className="w-5 h-5" />, label: 'Book', screen: ScreenId.Booking },
          { icon: <ClipboardList className="w-5 h-5" />, label: 'Journey', screen: ScreenId.ProgressTimeline },
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
