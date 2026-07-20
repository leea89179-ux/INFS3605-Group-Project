import { FAQItem } from '../types';
import { EduSection, educationalSections, HelpfulResource } from './education';

import enPersonalisation from '../locales/en/personalisation.json';
import enChecklist from '../locales/en/checklist.json';
import msPersonalisation from '../locales/ms/personalisation.json';
import msChecklist from '../locales/ms/checklist.json';
import zhPersonalisation from '../locales/zh-SG/personalisation.json';
import zhChecklist from '../locales/zh-SG/checklist.json';
import taPersonalisation from '../locales/ta-SG/personalisation.json';
import taChecklist from '../locales/ta-SG/checklist.json';

export type Language = 'en' | 'ms' | 'zh' | 'ta';

export const LANG_LABELS: Record<Language, string> = {
  en: 'English (EN)',
  ms: 'Bahasa Melayu (MS)',
  zh: '中文 (ZH)',
  ta: 'தமிழ் (TA)',
};

export const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    ...enPersonalisation,
    ...enChecklist,
    // Top Bar & Greetings
    health: 'Health',
    hub: 'Hub',
    active_user: 'Active User',
    chas_blue: 'CHAS Blue Member',
    action_recommended: 'Action Recommended',
    
    // Home Screen Referral Card
    fh_referral_title: 'FH Genetic Testing Referral',
    fh_referral_desc: 'Based on your recent cholesterol results, your doctor recommends FH genetic testing to better understand your condition.',
    recommended_next_step: 'Recommended Next Step',
    book_counselling_step: 'Book your pre-test counselling appointment.',
    next_appointment: 'Next Appointment',
    learn_why: 'Learn Why',
    why_referred_btn: 'Why Referred?',
    book_now_btn: 'Book Now',
    manage_slot_btn: 'Manage Slot',
    your_journey: 'YOUR JOURNEY',
    step_referral: 'Referral',
    step_counselling: 'Book Counselling',
    step_testing: 'Genetic Testing',
    
    // Quick Links
    quick_links: 'Quick Links',
    edit: 'Edit',
    link_appointments: 'Appointments',
    link_learn: 'Learn & Info',
    link_subsidies: 'Subsidies',
    link_care_team: 'Care Team',
    link_call: 'Direct Call',
    link_faqs: 'FAQs',
    
    // Care Team Card
    your_care_team: 'YOUR CARE TEAM',
    specialist_role: 'Senior Genetic Counsellor',
    specialist_hospital: 'National University Hospital',
    
    // Referral Details Screen
    referral_details_title: 'Referral Details',
    why_am_i_referred_title: 'Why am I referred for FH genetic testing?',
    explanation_1: 'Your lipid panel indicates extremely high LDL (bad) cholesterol levels. FH is a hereditary condition, meaning lifestyle alone is not the cause.',
    explanation_2: 'Genetic testing confirms if a specific gene variation is responsible. It helps your clinician custom-tailor highly effective preventative treatments for you and your family.',
    govt_subsidies_title: 'Government Subsidies',
    subsidies_desc: 'Up to 75% MOH subsidy for CHAS Blue / Pioneer Generation. MediSave can also be used for remaining co-payment.',
    what_should_i_do: 'What should I do now?',
    what_should_i_do_desc: 'We strongly recommend booking your 45-minute pre-test counselling. The session carries no obligation and explains all medical implications clearly.',
    book_counselling_session: 'Book Counselling Session',
    
    // Learn Screen
    education_hub_title: 'Genetic Education Hub',
    tab_guides: 'Videos & Guides',
    tab_checklist: 'Pre-Test Checklist',
    tab_faqs: 'Questions & Answers',
    
    // Booking Screen
    select_clinic_title: 'Select Hospital Clinic',
    search_placeholder: 'Search for hospital or location...',
    use_gps: 'Use My Live GPS',
    gps_calculating: 'Detecting live location...',
    available_slots: 'Available Slots',
    review_booking_title: 'Review Appointment Details',
    confirm_booking_btn: 'Confirm Booking',
    appointment_confirmed_title: 'Appointment Confirmed!',
    booking_success_desc: 'Your genetic counselling slot is locked. An SMS and Push notification have been scheduled.',
    booking_success_details: 'Your session is scheduled for {date} at {time} at {clinic}.',
    booking_scheduled_upcoming: 'Scheduled & Upcoming',
    add_to_calendar: 'Add to Calendar',
    reschedule_slot: 'Reschedule Slot',
    back_to_home: 'Back to Home',
    
    // Settings Screen
    settings_title: 'Settings',
    settings_desc: 'Configure how and when you receive genetic testing referrals and appointment alerts.',
    active_reminders: 'Active FH Reminders',
    active_reminders_desc: 'Receive educational updates and countdown reminders.',
    notification_channel: 'Notification Channel',
    reminder_frequency: 'Reminder Frequency',
    frequency_desc: 'Adjust how far in advance your reminder schedule triggers leading up to the appointment date.',
    freq_comprehensive: 'Comprehensive',
    freq_standard: 'Standard',
    freq_minimal: 'Minimal',
    freq_comprehensive_desc: 'Comprehensive: Sends alerts 1 month, 2 weeks, 1 week, and 1 day before your scheduled session.',
    freq_standard_desc: 'Standard: Sends alerts 1 week and 1 day before your scheduled session.',
    freq_minimal_desc: 'Minimal: Sends a single alert 1 day before your scheduled session.',
    active_schedule: 'Active Schedule',
    active_freq_comprehensive: 'Reminder 1 month, 2 weeks, 1 week, & 1 day before',
    active_freq_standard: 'Reminder 1 week & 1 day before',
    active_freq_minimal: 'Reminder 1 day before only',
    lang_pref_title: 'Language Preferences',
    lang_pref_desc: 'Select your preferred language. This updates all text content dynamically to ensure accessibility.',
    select_app_language: 'Select App Language',
    
    // Journey Screen
    progress_journey_title: 'My Patient Journey',
    status_unbooked: 'Counselling Booking Required',
    status_booked: 'Appointment Scheduled',
    status_confirmed: 'Attendance Confirmed',
    unbooked_journey_desc: 'Your active cardiac genetic referral requires you to schedule a counselling session.',
    timeline_title: 'Interactive Referral Timeline',
    
    // Common Action elements
    back: 'Back',

    // New additions for full translation support
    lab_reports_btn: 'Lab reports',
    med_reports_btn: 'Medical reports',
    med_refill_btn: 'Medication refill',
    payment_btn: 'Payment',
    health_profiles: 'Health Profiles',
    view_all_btn: 'View all',
    programmes_title: 'Programmes',
    referred_intro_title: 'Why Was I Referred?',
    referred_hi_lisa: 'Hi Lisa.',
    referred_doctor_rec: 'Your doctor has recommended genetic testing after reviewing your recent cholesterol results.',
    referred_means: "Here's what this means.",
    referred_why_doctor: 'Why your doctor referred you',
    referred_cholesterol_may_fh: 'Your recent cholesterol results suggest you may have Familial Hypercholesterolaemia (FH).',
    not_mean_have_fh: 'This does NOT mean you have FH.',
    genetic_testing_confirms: 'Genetic testing helps confirm whether FH is the cause.',
    referred_results_help_team: 'Your results help your healthcare team recommend the right care.',
    why_this_matters: 'Why this matters',
    early_diagnosis: 'Early diagnosis',
    early_diagnosis_desc: 'Start treatment sooner.',
    protect_family: 'Protect your family',
    protect_family_desc: 'FH can run in families.',
    personalized_care: 'Personalised care',
    personalized_care_desc: 'Results help guide your care.',
    what_happens_next: 'What happens next?',
    step_referral_received: 'Referral received',
    step_learn_about_fh: 'Learn about FH',
    step_current: 'Current',
    step_pre_test_counselling: 'Pre-test counselling',
    step_genetic_results: 'Genetic testing results',
    referred_next_step_learning: 'The next step is learning more about FH before attending your pre-test counselling appointment.',
    referred_before_app: 'Before your appointment',
    referred_spend_time: 'Spend just 2–3 minutes learning about FH before your counselling appointment.',
    referred_short_what_is: 'What is FH?',
    referred_short_why: 'Why testing?',
    referred_short_process: 'Testing process',
    referred_short_costs: 'Costs',
    referred_short_insurance: 'Insurance',
    referred_continue_learn: 'Continue to learn about FH before your appointment.',
    booking_secure_title: 'Secure Appointment Booking',
    booking_confirmed_status: 'Your appointment is confirmed',
    booking_subsidized_slot: 'MOH Subsidized Slot',
    booking_care_clinic: 'Care Clinic:',
    booking_specialist: 'Specialist:',
    booking_scheduled_date: 'Scheduled Date:',
    booking_confirmed_time: 'Confirmed Time:',
    booking_session_duration: 'Session Duration:',
    booking_out_of_pocket: 'Out-of-pocket Cost:',
    booking_chas_subsidized: 'CHAS Subsidized',
    booking_add_device_calendar: 'Add to Device Calendar',
    booking_essential_prep: 'Essential Preparation Instructions',
    booking_prep_no_fasting: 'No Fasting Required: Eat and drink normally before your session.',
    booking_prep_id_verif: 'ID Verification: Bring your NRIC physical card or log in via Singpass.',
    booking_prep_checklist: 'Complete your Pre-counselling Checklist before your appointment',
    booking_view_checklist: 'View Pre-Appointment Checklist',
    booking_reschedule_slot: 'Reschedule Appointment Slot',
    booking_cancel_slot: 'Cancel Appointment Booking',
    booking_eligible_subsidies: 'Based on your clinical referral, you are eligible for up to 75% MOH subsidies at these registered institutions.',
    booking_nearest_tag: 'NEAREST',
    booking_select_counselling_slot: 'Select counselling slot',
    booking_choose_subsidized_slot: 'Choose your subsidized genetic counselling slot.',
    booking_select_month: 'Select Month',
    booking_reschedule_alert: 'Reschedule mode active: Select a new slot below.',
    booking_nric_verified: 'Ready & Registered • NRIC/Singpass pre-cleared for clinical intake.',
    booking_unverified_alert: 'Attendance is unverified. Tap on lockscreen push alerts or settings to confirm attendance.',
    booking_session_desc: '45-minute session to answer family worries and finalize testing.',
    booking_setup_reminders: 'Set up your reminder alerts & frequency',
    booking_review_details: 'Review Appointment Details',
    booking_confirm_slot_btn: 'Confirm Booking',
    booking_add_calendar_success: 'Apple Calendar .ics event downloaded successfully!',
    profile_my_health_profile: 'My Health Profile',
    profile_singpass_linked: 'Singpass Linked',
    profile_moh_identity_cleared: 'MOH Identity Cleared',
    profile_personal_particulars: 'Personal Particulars',
    profile_full_name: 'Full Name:',
    profile_nric_fin: 'NRIC/FIN:',
    profile_dob: 'Date of Birth:',
    profile_nationality: 'Nationality:',
    profile_mobile_number: 'Mobile Number:',
    profile_email_address: 'Email Address:',
    profile_residential: 'Residential:',
    profile_clinical_metrics: 'Clinical Metrics & Risks',
    profile_blood_group: 'Blood Group:',
    profile_height_weight: 'Height / Weight:',
    profile_known_allergies: 'Known Allergies:',
    profile_none_declared: 'None Declared',
    profile_cholesterol_level: 'Cholesterol Level:',
    profile_elevated_risk: 'Elevated risk',
    profile_active_referral: 'Active Referral:',
    profile_referred_by: 'Referred by Specialist Cardiology',
    profile_subsidies_financing: 'Subsidies & Financing',
    profile_chas_blue_member: 'CHAS Blue Tier Member',
    profile_chas_subsidy_level: 'MOH Subsidy level capped at 75%',
    profile_chas_card_expiry: 'CHAS Card Expiry:',
    profile_medisave_account: 'MediSave Account:',
    profile_medisave_note: '*Outpatient genetic counselling and test panels are fully claimable under MOH MediSave rules.',
    profile_family_cardiac_history: 'Family Cardiac History',
    profile_family_history_desc: "Familial Hypercholesterolemia (FH) is passed down from parents. Knowing your family's history provides critical context for testing:",
    journey_my_patient_journey: 'My Patient Journey',
    journey_appointment_progress: 'Your Appointment Progress',
    journey_appointment_status: 'Appointment Status',
    journey_interactive_referral_timeline: 'Interactive Referral Timeline',
    journey_referral_received: 'Referral received',
    journey_referral_received_desc: 'Recommended by Clinical Cardiology Specialist on 12 Jul 2026.',
    journey_edu_completed: 'Education materials reviewed',
    journey_edu_completed_desc: 'Subsidies, clinical video, and FAQs completed on Singapore HealthHub.',
    journey_slot_booked: 'Counselling slot booked',
    journey_slot_booked_desc: 'Successfully scheduled for {date} @ {time} at NUH Genetic Clinic.',
    journey_slot_action_needed: 'Action needed: Choose your subsidized genetic counselling slot.',
    journey_attend_counselling: 'Attend genetic counselling',
    journey_receive_results: 'Receive genetic results',
    journey_receive_results_desc: 'Discussion of preventative steps and tailored medicine 4 weeks after blood drawn.',
    lock_healthhub_preview: 'HealthHub App Lockscreen Preview',
    lock_just_now: 'Just Now',
    lock_counselling_reminder: 'Counselling Appointment Reminder',
    lock_counselling_confirmed_msg: 'Your genetic counselling is confirmed for {date} at {time}. Tap to complete checklist.',
    lock_counselling_tap_confirm_msg: 'Confirm your FH Genetic Counselling on {date} @ {time}.',
    lock_trigger_push_alert: 'Trigger Simulated Push Alert',
    lock_confirm_attendance_btn: 'Confirm Attendance',
    lock_reschedule_btn: 'Reschedule',
    lock_read_prep_btn: 'Read Prep Guide',
    lock_tap_confirm_db_msg: 'Tap "Confirm Attendance" to log your confirmation instantly in Singapore HealthHub database.',
    lock_swipe_hint: 'Swipe up to open registered credentials',
    profile_female_age: 'Female • 36',
    profile_full_name_val: 'Lisa Ho Siew Lan',
    profile_dob_val: '14 August 1989 (36 yrs)',
    profile_nationality_val: 'Singapore Citizen',
    profile_residential_val: 'Blk 451 Ang Mo Kio Ave 10, #08-122, Singapore 560451',
    profile_blood_group_val: 'O Rh+ (Positive)',
    profile_height_weight_val: '162 cm / 54 kg (BMI 20.6)',
    profile_cholesterol_level_val: 'LDL 5.4 mmol/L (Elevated risk)',
    profile_active_referral_val: 'FH Genetic Testing',
    profile_referred_by_val: 'Referred by Specialist Cardiology',
    profile_card_expiry_val: '31 Dec 2028',
    profile_father_history: 'Father (Diagnosed Age 48):',
    profile_father_history_desc: 'Coronary Heart Disease (Angioplasty & Stent)',
    profile_grandfather_history: 'Paternal Grandfather (Deceased Age 52):',
    profile_grandfather_history_desc: 'Fatal Myocardial Infarction (Acute Heart Attack)',
    profile_aunt_history: 'Paternal Aunt:',
    profile_aunt_history_desc: 'Severely high cholesterol (treated with Statins)',
    profile_mother_history: 'Mother & Siblings:',
    profile_mother_history_desc: 'No early history of heart disease declared',
    profile_care_coordination: 'Care Coordination',
    profile_primary_clinic_val: 'Ang Mo Kio Polyclinic',
    profile_referred_clinic_val: 'NUH Genetic Clinic',
    profile_emergency_contact_val: 'Ho Chin Teck',
    profile_relationship_no_val: 'Spouse • 9876 5432',
    profile_privacy_statement: "Your genetic profile data is fully protected under Singapore's national privacy laws and the Life Insurance Association (LIA) Moratorium. Your details will never be shared without your explicit consent.",
    settings_option_sms_only: 'SMS Messages Only (+65 9123 4567)',
    settings_option_push_only: 'HealthHub App Push Notifications',
    settings_option_both: 'Both SMS & App Push (Recommended)',
    settings_help_sms: 'Reminders will be sent directly via SMS text message to your registered mobile number.',
    settings_help_push: 'Reminders will appear on your lockscreen from the HealthHub app.',
    settings_help_both: 'Our system sends alerts to both SMS and App Push channels, ensuring older adults avoid missing referrals.',
    settings_freq_monthly: 'Monthly Info (Educational resources)',
    settings_freq_2_weeks: '2 Weeks Before (Initial nudge)',
    settings_freq_1_week: '1 Week Before (Highly protective)',
    settings_freq_1_day: '1 Day Before (Final preparation check)',
    settings_sms_preview_title: 'SMS Broadcast Preview',
    settings_sms_verified_sender: 'Verified MOH Sender',
    settings_lockscreen_preview_title: 'HealthHub App Lockscreen Preview',
    settings_lockscreen_header: 'HealthHub Singapore • Just Now',
    settings_sms_prefix: 'MOH HealthHub: Hi Lisa, your FH Genetic Counselling slot at National University Hospital Genetic Clinic is confirmed on {date} at {time}. Subsidies up to 75% are cleared. Bring Singpass. Info: https://hh.gov.sg/fh-ref',
    journey_prep_title: 'Preparation Checklist',
    journey_prep_desc: 'Make sure you know what to expect and what family history reports to bring. Review our guides.',
    journey_review_checklist_btn: 'Review checklist now',
    lockscreen_telco: 'Singapore Telecommunications',
    lockscreen_date: 'Wednesday, July 15, 2026',
    lockscreen_days_left: '7 Days Left',
    lockscreen_push_msg: 'Your genetic counselling is confirmed for {date} at {time}. Tap to complete checklist.',
    lockscreen_tap_confirm_info: 'Tap "Confirm Attendance" to log your confirmation instantly in Singapore HealthHub database.',
    lockscreen_swipe_hint: 'Swipe up to open registered credentials',
    booking_subsidies_computed: 'MOH Subsidies automatically computed via your linked Singpass status.',
    booking_no_slots_alert: 'No slots available on this date. Please select a highlighted day on the calendar above.',
    booking_assigned_specialist: 'Assigned Clinical Specialist',
    booking_address_label: 'Address:',
    booking_date_label: 'Date:',
    booking_time_label: 'Time:',
    booking_duration_label: 'Session Duration:',
    booking_out_of_pocket_label: 'Total Estimated Out-of-pocket Cost:',
    // Bottom Navigation Bar
    nav_home: 'Home',
    nav_learn: 'Learn',
    nav_book: 'Book',
    nav_journey: 'Journey',
    nav_profile: 'Profile',
    // Home Page Profiles
    home_profile_lisa: 'LISA HO',
    home_profile_spouse: 'HO CHIN TECK',
    // Home Page Programmes
    prog_active_hub: 'Active Hub',
    prog_diabetes_title: 'Diabetes Hub',
    prog_diabetes_desc: 'Personalized guides for managing and preventing diabetes.',
    prog_resource: 'Resource',
    prog_mental_title: 'Mental Well-being',
    prog_mental_desc: 'Mindfulness guides and support networks for emotional safety.',
    // Book Screen Selector Buttons
    booking_close_selector_btn: 'Close Selector',
    booking_change_estate_btn: 'Change Estate / GPS',
    // Clinic Names & Addresses
    clinic_nuh_name: 'National University Hospital Genetic Clinic',
    clinic_nuh_address: '5 Lower Kent Ridge Rd, Main Building Zone B, Singapore 119074',
    clinic_sgh_name: 'Singapore General Hospital Genetics Service',
    clinic_sgh_address: 'Outram Rd, Academic Medicine Basement 1, Singapore 169608',
    clinic_ttsh_name: 'Tan Tock Seng Hospital Clinical Genomics',
    clinic_ttsh_address: '11 Jalan Tan Tock Seng, Clinic 4B, Singapore 308433',
    clinic_kkh_name: "KK Women's and Children's Hospital Genetics Clinic",
    clinic_kkh_address: "100 Bukit Timah Rd, Children's Tower Level 5, Singapore 229899",
    // Doctors
    doc_helen_lim: 'Dr. Helen Lim',
    doc_albert_chiang: 'Dr. Albert Chiang',
    doc_marcus_goh: 'Dr. Marcus Goh',
    doc_fiona_lee: 'Dr. Fiona Lee',
    doc_benjamin_chew: 'Dr. Benjamin Chew',
    doc_sarah_tan: 'Dr. Sarah Tan',
    doc_claire_wong: 'Dr. Claire Wong',
    doc_jeanette_tan: 'Dr. Jeanette Tan',
    // Specialist Roles
    role_senior_genetic_counsellor: 'Senior Genetic Counsellor',
    role_consultant_cardiogeneticist: 'Consultant Cardiogeneticist',
    role_principal_genetics_specialist: 'Principal Genetics Specialist',
    role_senior_clinical_geneticist: 'Senior Clinical Geneticist',
    role_consultant_paediatric_geneticist: 'Consultant Paediatric Geneticist',
    role_lead_paediatric_counsellor: 'Lead Paediatric Counsellor',
    role_consultant_geneticist: 'Consultant Geneticist',
    chatbot_greeting: "Hello! I am **HealthBuddy**, your GovTech Singapore FH Assistant. I can help answer questions about **Familial Hypercholesterolaemia (FH)**, test costs, insurance moratoriums, and booking. What's on your mind today?",
    chatbot_placeholder: 'Ask about subsidies, insurance protection, prep...',
    chatbot_quick_insurance: 'Will this affect my insurance?',
    chatbot_quick_cost: 'How much does FH testing cost?',
    chatbot_quick_family: 'Does it affect my family?',
    chatbot_quick_prep: 'What should I prepare?',
    chatbot_footer: 'Providing official MOH Singapore and GovTech policy answers.',
    chatbot_online: 'GovTech Support - Online',
    chatbot_title: 'HealthBuddy Assistant',
    chatbot_reset: 'Reset conversation',
    chatbot_banner_title: 'Have FH Genetic testing concerns?',
    chatbot_banner_body: 'Get instant, secure answers on CHAS subsidies, insurance protections, and clinic preparation.',
    edu_hub_title: 'Education Hub',
    edu_note: 'Please note: Being referred for a genetic test does not mean you have FH. It is simply a proactive measure to assess your natural risk.',
    edu_video_title: '▶ What happens during FH testing?',
    edu_video_subtitle: 'See what to expect before your appointment.',
    edu_play_story: 'Play Story',
    edu_pause_story: 'Pause Story',
    edu_view_transcript: 'View Transcript',
    edu_hide_transcript: 'Hide Transcript',
    edu_video_story_label: 'Patient Experience Story (Chloe, 21)',
    edu_video_frame_0: '"I eat healthy and stay active. I thought high cholesterol was only for elderly people or those who lead an unhealthy lifestyle."',
    edu_video_frame_1: '"The genetic counsellor didn\'t push me at all. They just laid out the facts and let me make my own decision."',
    edu_video_frame_2: '"I found out existing health insurance is fully protected, and MOH subsidies cover up to 75% of the cost."',
    edu_video_frame_3: '"I decided to do the test because getting clear facts helped me take control of my health and clarity on how to keep myself healthy."',
    edu_video_transcript_title: 'Video Transcript & Captions',
    edu_video_transcript_1: '"Hey everyone, I\'m Chloe. When a screening flagged my LDL cholesterol as extremely high, I was totally confused. I live a healthy lifestyle, exercise regularly, and eat well, so I assumed high cholesterol was something only older people get, or maybe people who lead unhealty lifestyles. My doctor explained that FH is inherited from birth—it has nothing to do with lifestyle or age."',
    edu_video_transcript_2: '"I was really skeptical about genetic counselling at first but, the counsellor didn\'t try to push me. She just explained how the genetics work, answered my questions about privacy, and left the decision completely up to me."',
    edu_video_transcript_3: '"We talked about the practical side too. She clarified that under Singapore\'s guidelines, existing health insurance can\'t be touched, and MOH covers up to 75% of the costs. There were no hidden catches."',
    edu_video_transcript_4: '"In the end, I decided to go ahead and take the blood test. Getting the facts didn\'t change who I am, but it did give me clarity on how to keep myself healthy. It\'s about knowing your body, not living in fear."',
    booking_header_title: 'Book Appointment',
    faq_title: 'Frequently Asked Questions',
    faq_category_all: 'ALL',
    faq_category_cost: 'COST',
    faq_category_insurance: 'INSURANCE',
    faq_category_testing: 'TESTING',
    faq_category_medication: 'MEDICATION',
    edu_did_you_know: 'Did You Know?',
    edu_stat1_label: 'Singaporeans have FH',
    edu_stat1_body: 'More common than most realize — over 22,000 Singaporeans are affected.',
    edu_stat2_label: 'go undiagnosed',
    edu_stat2_body: '9 out of 10 people with FH currently do not know they have it.',
    edu_stat3_label: 'lower heart risk',
    edu_stat3_body: 'Early diagnosis and simple treatment make a very big difference.',
    edu_stat4_label: 'family risk',
    edu_stat4_body: 'Each parent, sibling, or child has a 50% chance of inheritance.',
    edu_learning_hub: 'LEARNING HUB',
    edu_modules_summary: '3 Modules • 6 Topics',
    edu_group_basics_title: 'Understanding FH & Meds',
    edu_group_basics_desc: 'Learn about the genetic condition, physical signs, and standard treatments.',
    edu_group_journey_title: 'Your Clinical Journey',
    edu_group_journey_desc: 'A step-by-step guide to testing and protecting your family.',
    edu_group_costs_title: 'Subsidies & Protections',
    edu_group_costs_desc: 'MOH subsidies, MediSave coverage, and your legal insurance rights.',
    booking_mins: 'mins',
    chatbot_fallback_insurance: "Under the Singapore **LIA Moratorium**, insurers **cannot** ask you to disclose genetic test results. Existing plans like **MediShield Life** and Integrated Shield are completely unaffected.",
    chatbot_fallback_cost: "FH testing is subsidized **50–75%** by MOH for eligible Singaporeans. Out-of-pocket costs typically range from **S$50 to S$120** and can be **fully paid using MediSave**.",
    chatbot_fallback_family: "FH is inherited — first-degree family members have a **50% chance** of sharing the gene. Your team will coordinate **cascade screening** to protect your family early.",
    chatbot_fallback_prep: "No fasting needed! Prepare your **family medical history**, **current medications**, and your **Singpass**. A 30-minute counselling session will guide you first.",
    chatbot_fallback_default: "I am here to help with FH testing. Your referral is a **subsidized, protected preventative screen**. Check the **Learn** tab or **Book** tab for more.",
    // Home quick links
    link_ask_ai: 'Ask AI',
    link_help_desk: 'Help Desk',
    link_medical_reports: 'Medical reports',
    link_medication_refill: 'Medication refill',
    link_payment: 'Payment',
    link_programmes: 'Programmes',
    // Notifications popup
    notif_header: 'Notifications',
    notif_close: 'Close',
    notif_referral_title: 'FH Genetic Referral Active',
    notif_referral_desc: 'Your clinical referral is active. Read why your doctor recommended testing.',
    notif_referral_time: '2h ago',
    notif_booking_booked: 'Counselling Appointment Booked',
    notif_booking_unbooked: 'Action Required: Book Counselling',
    notif_booking_confirmed_msg: 'Pre-test genetic counselling confirmed for {date} @ {time}.',
    notif_booking_pending_msg: 'Please secure your pre-test genetic counselling session slot.',
    notif_time_just_now: 'Just now',
    notif_time_1d_ago: '1d ago',
    // Cancel flow
    cancel_worries_text: 'Have worries about costs, safety, or procedures?',
    cancel_address_concerns: 'Address your concerns in our',
    cancel_faq_link: 'FAQ section',
    cancel_if_need_diff_time: 'If you need a different time, you can reschedule without losing your place in the programme.',
    cancel_reschedule_btn: 'Reschedule Instead',
    cancel_continue_btn: 'Continue Cancelling',
    cancel_confirm_title: 'Confirm cancellation',
    cancel_confirm_desc: 'Cancelling will release this booked slot. You are welcome to book again at any time, though availability may vary.',
    cancel_yes_btn: 'Yes, Cancel This Appointment',
    cancel_keep_btn: 'Keep My Appointment',
    cancel_success_title: 'Your appointment has been cancelled.',
    cancel_success_desc: 'You can book a new slot whenever you are ready.',
    cancel_book_new_btn: 'Book a New Appointment',
    cancel_return_home: 'Return to Home',
    // Reschedule flow
    reschedule_select_title: 'Select a new slot',
    reschedule_current_appt: 'Current appointment',
    reschedule_choose_desc: 'Choose a replacement clinic, date and time. Your current appointment stays confirmed until you complete the reschedule.',
    reschedule_select_clinic: 'Select clinic',
    reschedule_nearest: 'Nearest',
    reschedule_no_slots: 'No available slots on this day.',
    reschedule_keep_current: 'Keep current appointment',
    reschedule_review_title: 'Review change',
    reschedule_review_desc: 'Review the change before confirming. Your current appointment will remain active until you press Confirm Reschedule.',
    reschedule_new_appt: 'New appointment',
    reschedule_confirm_btn: 'Confirm Reschedule',
    reschedule_different_slot: 'Choose a Different Slot',
    reschedule_success_title: 'Appointment rescheduled.',
    reschedule_success_desc: 'Your appointment has been updated.',
    reschedule_done_btn: 'Done',
    // Profile screen
    profile_my_profile: 'My Profile',
    profile_section_personal: 'Personal Information',
    profile_section_contact: 'Contact Information',
    profile_section_emergency: 'Emergency Contact',
    profile_section_healthcare: 'Healthcare Preferences',
    profile_section_medical: 'Medical Information',
    profile_section_account: 'Account',
    profile_label_full_name: 'Full name',
    profile_label_dob: 'Date of birth',
    profile_label_gender: 'Gender',
    profile_label_nric: 'NRIC / Health ID',
    profile_label_preferred_lang: 'Preferred language',
    profile_label_mobile: 'Mobile number',
    profile_label_email: 'Email address',
    profile_label_address: 'Residential address',
    profile_label_contact_name: 'Contact name',
    profile_label_relationship: 'Relationship',
    profile_label_phone: 'Phone number',
    profile_label_preferred_clinic: 'Preferred clinic',
    profile_label_ldl: 'LDL cholesterol',
    profile_label_active_referrals: 'Active referrals',
    profile_label_upcoming_appts: 'Upcoming appts',
    profile_fh_testing_badge: 'FH Genetic Testing (MOH Subsidised)',
    profile_no_appointments: 'No scheduled appointments',
    profile_book_session_now: 'Book counselling session now',
    profile_view_reminder_settings: 'View Reminder & Notification Settings',
    profile_label_linked_account: 'Linked HealthHub account',
    profile_label_privacy: 'Privacy settings',
    profile_verified_singpass: 'Verified via Singpass',
    profile_privacy_registry: 'National Genomic Registry Secure',
    profile_logout: 'Log out from HealthHub',
    profile_yrs: 'yrs',
    gender_male: 'Male',
    gender_female: 'Female',
    // Booking screen – location / calendar
    booking_location_label: 'Location:',
    booking_change_location: 'Change Location',
    booking_default_address: 'Default address',
    booking_search_location: 'Search Location:',
    booking_detecting: 'Detecting...',
    booking_live_location: 'Live Location',
    booking_search_results: 'Search Results:',
    booking_suggestions: 'Suggestions:',
    booking_no_matches: 'No matches. Click below to use:',
    booking_distance: 'Distance:',
    booking_nearest_clinic: 'Nearest Clinic',
    booking_legend_today: 'Today',
    booking_legend_selected: 'Selected Day',
    booking_km_away: 'km away',
    // Learn FH screen
    edu_learning_guide_title: 'Your FH Learning Guide',
    edu_learning_guide_subtitle: 'A personalised guide on why and how to prepare after you have been referred for FH genetic testing.',
    edu_tab_guides: 'Guides',
    edu_tab_checklist: 'Checklist',
    edu_tab_faqs: 'FAQs & Links',
    edu_topics: 'Topics',
    edu_helpful_resources: 'Helpful Resources',
    edu_view_resource: 'View Resource',
    edu_checklist_progress_title: 'Preparation Progress',
    edu_checklist_progress_detail: '{completed} of {total} completed ({percent}%)',
    edu_checklist_progress_success: 'Excellent! You are fully prepared for your consultation.',
    edu_checklist_progress_desc: 'Complete these steps before your appointment to make the most of your session with the genetic counsellor.',
    edu_checklist_card_title: 'Pre-Counselling Checklist',
    edu_checklist_card_desc: 'Completing these simple tasks reduces appointment anxiety and ensures highly customized care:',
    patient_label: 'Patient',
    edu_hi_greeting: 'HI {name},',
    edu_cta_title: 'Ready to book your GAC counselling slot?',
    edu_cta_subtitle: 'Take the active step today. Booking takes under 20 seconds within HealthHub.',
    edu_cta_btn: 'Go to Secure Booking',
    edu_key_takeaway: 'Key Takeaway',
    edu_doc_page_of: 'PAGE {current} OF {total}',
    edu_website_btn: 'WEBSITE',
    edu_print_btn: 'PRINT',
    edu_page_label: 'Page',
    edu_prev_btn: 'Prev',
    edu_next_btn: 'Next Page',
    edu_finish_btn: 'Finish Reading',
    not_on_file: 'Not on file',
    not_yet_assigned: 'Not yet assigned',
    sms_today: 'Today',
    concern_test_desc: 'Learn what happens before, during and after genetic testing.',
  },
  ms: {
    ...msPersonalisation,
    ...msChecklist,
    health: 'Health',
    hub: 'Hub',
    active_user: 'Pengguna Aktif',
    chas_blue: 'Ahli Biru CHAS',
    action_recommended: 'Tindakan Disyorkan',
    
    fh_referral_title: 'Rujukan Ujian Genetik FH',
    fh_referral_desc: 'Berdasarkan keputusan kolesterol anda baru-baru ini, doktor anda mengesyorkan ujian genetik FH untuk memahami keadaan anda dengan lebih baik.',
    recommended_next_step: 'Langkah Seterusnya Sila Ambil',
    book_counselling_step: 'Tempah janji temu kaunseling pra-ujian anda.',
    next_appointment: 'Janji Temu Seterusnya',
    learn_why: 'Ketahui Sebabnya',
    why_referred_btn: 'Kenapa Dirujuk?',
    book_now_btn: 'Tempah Sekarang',
    manage_slot_btn: 'Urus Slot',
    your_journey: 'PERJALANAN ANDA',
    step_referral: 'Rujukan',
    step_counselling: 'Tempah Kaunseling',
    step_testing: 'Ujian Genetik',
    
    quick_links: 'Pautan Pantas',
    edit: 'Edit',
    link_appointments: 'Janji Temu',
    link_learn: 'Belajar & Info',
    link_subsidies: 'Subsidi',
    link_care_team: 'Pasukan Penjagaan',
    link_call: 'Panggilan Terus',
    link_faqs: 'Soalan Lazim',
    
    your_care_team: 'PASUKAN PENJAGAAN ANDA',
    specialist_role: 'Kaunselor Genetik Kanan',
    specialist_hospital: 'National University Hospital',
    
    referral_details_title: 'Butiran Rujukan',
    why_am_i_referred_title: 'Mengapa saya dirujuk untuk ujian genetik FH?',
    explanation_1: 'Profil lipid anda menunjukkan tahap kolesterol LDL (buruk) yang sangat tinggi. FH adalah keadaan keturunan, bermakna gaya hidup sahaja bukanlah puncanya.',
    explanation_2: 'Ujian genetik mengesahkan jika variasi gen tertentu bertanggungjawab. Ia membantu pakar klinikal anda menyesuaikan rawatan pencegahan yang sangat berkesan untuk anda dan keluarga.',
    govt_subsidies_title: 'Subsidi Kerajaan',
    subsidies_desc: 'Subsidi MOH sehingga 75% untuk ahli CHAS Biru / Generasi Pioneer. MediSave juga boleh digunakan untuk baki pembayaran bersama.',
    what_should_i_do: 'Apakah yang perlu saya lakukan sekarang?',
    what_should_i_do_desc: 'Kami amat mengesyorkan anda menempah sesi kaunseling pra-ujian selama 45 minit. Sesi ini tiada sebarang kewajipan dan menerangkan implikasi perubatan dengan jelas.',
    book_counselling_session: 'Tempah Sesi Kaunseling',
    
    education_hub_title: 'Hab Pendidikan Genetik',
    tab_guides: 'Video & Panduan',
    tab_checklist: 'Senarai Semak',
    tab_faqs: 'Soalan & Jawapan',
    
    select_clinic_title: 'Pilih Klinik Hospital',
    search_placeholder: 'Cari hospital atau lokasi...',
    use_gps: 'Gunakan GPS Saya',
    gps_calculating: 'Mengesan lokasi semasa...',
    available_slots: 'Slot yang Tersedia',
    review_booking_title: 'Semak Butiran Janji Temu',
    confirm_booking_btn: 'Sahkan Tempahan',
    appointment_confirmed_title: 'Janji Temu Disahkan!',
    booking_success_desc: 'Slot kaunseling genetik anda telah ditempah. SMS dan pemberitahuan Push telah dijadualkan.',
    booking_success_details: 'Sesi anda dijadualkan pada {date} pukul {time} di {clinic}.',
    booking_scheduled_upcoming: 'Dijadualkan & Akan Datang',
    add_to_calendar: 'Tambah ke Kalendar',
    reschedule_slot: 'Penjadualan Semula',
    back_to_home: 'Kembali ke Laman Utama',
    
    settings_title: 'Tetapan',
    settings_desc: 'Konfigurasikan bagaimana dan bila anda menerima rujukan ujian genetik dan makluman janji temu.',
    active_reminders: 'Peringatan Aktif FH',
    active_reminders_desc: 'Terima kemas kini pendidikan dan peringatan undur.',
    notification_channel: 'Saluran Pemberitahuan',
    reminder_frequency: 'Kekerapan Peringatan',
    frequency_desc: 'Laraskan berapa hari lebih awal jadual peringatan anda diaktifkan menjelang tarikh janji temu.',
    freq_comprehensive: 'Komprehensif',
    freq_standard: 'Standard',
    freq_minimal: 'Minimal',
    freq_comprehensive_desc: 'Komprehensif: Menghantar makluman 1 bulan, 2 minggu, 1 minggu, dan 1 hari sebelum sesi janji temu anda.',
    freq_standard_desc: 'Standard: Menghantar makluman 1 minggu dan 1 hari sebelum sesi janji temu anda.',
    freq_minimal_desc: 'Minimal: Menghantar makluman tunggal 1 hari sebelum sesi janji temu anda.',
    active_schedule: 'Jadual Aktif',
    active_freq_comprehensive: 'Peringatan 1 bulan, 2 minggu, 1 minggu, & 1 hari sebelum',
    active_freq_standard: 'Peringatan 1 minggu & 1 hari sebelum',
    active_freq_minimal: 'Peringatan 1 hari sebelum sahaja',
    lang_pref_title: 'Tetapan Bahasa',
    lang_pref_desc: 'Pilih bahasa kegemaran anda. Ini mengemas kini semua kandungan teks secara dinamik untuk komuniti Singapura.',
    select_app_language: 'Pilih Bahasa Aplikasi',
    
    progress_journey_title: 'Perjalanan Pesakit Saya',
    status_unbooked: 'Pendaftaran Kaunseling Diperlukan',
    status_booked: 'Janji Temu Dijadualkan',
    status_confirmed: 'Kehadiran Disahkan',
    unbooked_journey_desc: 'Rujukan genetik kardio aktif anda memerlukan anda menjadualkan sesi kaunseling.',
    timeline_title: 'Garis Masa Rujukan Interaktif',
    
    back: 'Kembali',

    // New additions for full translation support
    lab_reports_btn: 'Laporan makmal',
    med_reports_btn: 'Laporan perubatan',
    med_refill_btn: 'Isi semula ubat',
    payment_btn: 'Bayaran',
    health_profiles: 'Profil Kesihatan',
    view_all_btn: 'Lihat semua',
    programmes_title: 'Program',
    referred_intro_title: 'Kenapa Saya Dirujuk?',
    referred_hi_lisa: 'Hai Lisa.',
    referred_doctor_rec: 'Doktor anda telah mengesyorkan ujian genetik selepas menyemak keputusan kolesterol anda baru-baru ini.',
    referred_means: 'Inilah maksud perkara ini.',
    referred_why_doctor: 'Sebab doktor merujuk anda',
    referred_cholesterol_may_fh: 'Keputusan kolesterol baru-baru ini menunjukkan anda mungkin mempunyai Familial Hypercholesterolaemia (FH).',
    not_mean_have_fh: 'Ini BUKAN bermakna anda menghidap FH.',
    genetic_testing_confirms: 'Ujian genetik membantu mengesahkan sama ada FH adalah puncanya.',
    referred_results_help_team: 'Keputusan anda membantu pasukan penjagaan kesihatan anda mengesyorkan penjagaan yang betul.',
    why_this_matters: 'Mengapa ini penting',
    early_diagnosis: 'Diagnosis awal',
    early_diagnosis_desc: 'Mulakan rawatan lebih awal.',
    protect_family: 'Lindungi keluarga anda',
    protect_family_desc: 'FH boleh diwarisi dalam keluarga.',
    personalized_care: 'Penjagaan peribadi',
    personalized_care_desc: 'Keputusan membantu membimbing penjagaan anda.',
    what_happens_next: 'Apakah yang berlaku seterusnya?',
    step_referral_received: 'Rujukan diterima',
    step_learn_about_fh: 'Ketahui tentang FH',
    step_current: 'Semasa',
    step_pre_test_counselling: 'Kaunseling pra-ujian',
    step_genetic_results: 'Keputusan ujian genetik',
    referred_next_step_learning: 'Langkah seterusnya ialah mengetahui lebih lanjut tentang FH sebelum menghadiri janji temu kaunseling pra-ujian anda.',
    referred_before_app: 'Sebelum janji temu anda',
    referred_spend_time: 'Luangkan masa 2-3 minit untuk mengetahui tentang FH sebelum janji temu kaunseling anda.',
    referred_short_what_is: 'Apakah itu FH?',
    referred_short_why: 'Kenapa ujian?',
    referred_short_process: 'Proses ujian',
    referred_short_costs: 'Kos',
    referred_short_insurance: 'Insurans',
    referred_continue_learn: 'Teruskan belajar tentang FH sebelum janji temu anda.',
    booking_secure_title: 'Tempahan Janji Temu Selamat',
    booking_confirmed_status: 'Janji temu anda telah disahkan',
    booking_subsidized_slot: 'Slot Subsidi MOH',
    booking_care_clinic: 'Klinik Penjagaan:',
    booking_specialist: 'Pakar:',
    booking_scheduled_date: 'Tarikh Dijadualkan:',
    booking_confirmed_time: 'Masa Disahkan:',
    booking_session_duration: 'Tempoh Sesi:',
    booking_out_of_pocket: 'Kos Sendiri:',
    booking_chas_subsidized: 'Disubsidi CHAS',
    booking_add_device_calendar: 'Tambah ke Kalendar Peranti',
    booking_essential_prep: 'Arahan Penyediaan Penting',
    booking_prep_no_fasting: 'Tidak Perlu Berpuasa: Makan dan minum secara normal sebelum sesi anda.',
    booking_prep_id_verif: 'Pengesahan ID: Bawa kad fizikal NRIC anda atau log masuk melalui Singpass.',
    booking_prep_checklist: 'Lengkapkan Senarai Semak Pra-kaunseling sebelum janji temu anda',
    booking_view_checklist: 'Lihat Senarai Semak Pra-Janji Temu',
    booking_reschedule_slot: 'Penjadualan Semula Slot Janji Temu',
    booking_cancel_slot: 'Batalkan Tempahan Janji Temu',
    booking_eligible_subsidies: 'Berdasarkan rujukan klinikal anda, anda layak mendapat subsidi MOH sehingga 75% di institusi berdaftar ini.',
    booking_nearest_tag: 'TERDEKAT',
    booking_select_counselling_slot: 'Pilih slot kaunseling',
    booking_choose_subsidized_slot: 'Pilih slot kaunseling genetik bersubsidi anda.',
    booking_select_month: 'Pilih Bulan',
    booking_reschedule_alert: 'Mod penjadualan semula aktif: Pilih slot baharu di bawah.',
    booking_nric_verified: 'Sedia & Berdaftar • NRIC/Singpass pra-dibersihkan untuk kemasukan klinikal.',
    booking_unverified_alert: 'Kehadiran tidak disahkan. Ketik pada makluman tolak skrin kunci atau tetapan untuk mengesahkan kehadiran.',
    booking_session_desc: 'Sesi 45 minit untuk menjawab kebimbangan keluarga dan memuktamadkan ujian.',
    booking_setup_reminders: 'Sediakan isyarat & kekerapan peringatan anda',
    booking_review_details: 'Semak Butiran Janji Temu',
    booking_confirm_slot_btn: 'Sahkan Tempahan',
    booking_add_calendar_success: 'Acara kalendar Apple .ics berjaya dimuat turun!',
    profile_my_health_profile: 'Profil Kesihatan Saya',
    profile_singpass_linked: 'Singpass Dipautkan',
    profile_moh_identity_cleared: 'Identiti MOH Dibersihkan',
    profile_personal_particulars: 'Butiran Peribadi',
    profile_full_name: 'Nama Penuh:',
    profile_nric_fin: 'NRIC/FIN:',
    profile_dob: 'Tarikh Lahir:',
    profile_nationality: 'Kewarganegaraan:',
    profile_mobile_number: 'Nombor Telefon Bimbit:',
    profile_email_address: 'Alamat E-mel:',
    profile_residential: 'Kediaman:',
    profile_clinical_metrics: 'Metrik Klinikal & Risiko',
    profile_blood_group: 'Kumpulan Darah:',
    profile_height_weight: 'Tinggi / Berat:',
    profile_known_allergies: 'Alergi Diketahui:',
    profile_none_declared: 'Tiada Diisytiharkan',
    profile_cholesterol_level: 'Tahap Kolesterol:',
    profile_elevated_risk: 'Risiko meningkat',
    profile_active_referral: 'Rujukan Aktif:',
    profile_referred_by: 'Dirujuk oleh Kardiologi Pakar',
    profile_subsidies_financing: 'Subsidi & Pembiayaan',
    profile_chas_blue_member: 'Ahli CHAS Blue Tier',
    profile_chas_subsidy_level: 'Tahap subsidi MOH dihadkan pada 75%',
    profile_chas_card_expiry: 'Tamat Tempoh Kad CHAS:',
    profile_medisave_account: 'Akaun MediSave:',
    profile_medisave_note: '*Kaunseling genetik pesakit luar dan panel ujian boleh dituntut sepenuhnya di bawah peraturan MediSave MOH.',
    profile_family_cardiac_history: 'Sejarah Jantung Keluarga',
    profile_family_history_desc: 'Familial Hypercholesterolemia (FH) diwarisi daripada ibu bapa. Mengetahui sejarah keluarga anda memberikan konteks kritikal untuk ujian:',
    journey_my_patient_journey: 'Perjalanan Pesakit Saya',
    journey_appointment_progress: 'Kemajuan Janji Temu Anda',
    journey_appointment_status: 'Status Janji Temu',
    journey_interactive_referral_timeline: 'Garis Masa Rujukan Interaktif',
    journey_referral_received: 'Rujukan diterima',
    journey_referral_received_desc: 'Disyorkan oleh Pakar Kardiologi Klinikal pada 12 Jul 2026.',
    journey_edu_completed: 'Bahan pendidikan disemak',
    journey_edu_completed_desc: 'Subsidi, video klinikal, dan FAQ selesai di HealthHub Singapura.',
    journey_slot_booked: 'Slot kaunseling ditempah',
    journey_slot_booked_desc: 'Berjaya dijadualkan untuk {date} @ {time} di Klinik Genetik NUH.',
    journey_slot_action_needed: 'Tindakan diperlukan: Pilih slot kaunseling genetik bersubsidi anda.',
    journey_attend_counselling: 'Hadir ke kaunseling genetik',
    journey_receive_results: 'Terima keputusan genetik',
    journey_receive_results_desc: 'Perbincangan langkah-langkah pencegahan dan rawatan tersuai 4 minggu selepas darah diambil.',
    lock_healthhub_preview: 'Pratonton Skrin Kunci Aplikasi HealthHub',
    lock_just_now: 'Baru Sahaja',
    lock_counselling_reminder: 'Peringatan Janji Temu Kaunseling',
    lock_counselling_confirmed_msg: 'Kaunseling genetik anda telah disahkan untuk {date} pada {time}. Ketik untuk melengkapkan senarai semak.',
    lock_counselling_tap_confirm_msg: 'Sahkan Kaunseling Genetik FH anda pada {date} @ {time}.',
    lock_trigger_push_alert: 'Cetuskan Amaran Simpanan Tolak Simpanan',
    lock_confirm_attendance_btn: 'Sahkan Kehadiran',
    lock_reschedule_btn: 'Penjadualan Semula',
    lock_read_prep_btn: 'Baca Panduan Persediaan',
    lock_tap_confirm_db_msg: 'Ketik "Sahkan Kehadiran" untuk mendaftarkan pengesahan anda serta-merta dalam pangkalan data HealthHub Singapura.',
    lock_swipe_hint: 'Slaid ke atas untuk membuka bukti kelayakan berdaftar',
    profile_female_age: 'Perempuan • 36',
    profile_full_name_val: 'Lisa Ho Siew Lan',
    profile_dob_val: '14 Ogos 1989 (36 thn)',
    profile_nationality_val: 'Warganegara Singapura',
    profile_residential_val: 'Blk 451 Ang Mo Kio Ave 10, #08-122, Singapura 560451',
    profile_blood_group_val: 'O Rh+ (Positif)',
    profile_height_weight_val: '162 cm / 54 kg (BMI 20.6)',
    profile_cholesterol_level_val: 'LDL 5.4 mmol/L (Risiko meningkat)',
    profile_active_referral_val: 'Ujian Genetik FH',
    profile_referred_by_val: 'Dirujuk oleh Kardiologi Pakar',
    profile_card_expiry_val: '31 Dis 2028',
    profile_father_history: 'Bapa (Didiagnosis Umur 48):',
    profile_father_history_desc: 'Penyakit Jantung Koronari (Angioplasti & Stent)',
    profile_grandfather_history: 'Datuk Sebelah Bapa (Meninggal Dunia Umur 52):',
    profile_grandfather_history_desc: 'Infarksi Miokardial Maut (Serangan Jantung Akut)',
    profile_aunt_history: 'Ibu Saudara Sebelah Bapa:',
    profile_aunt_history_desc: 'Kolesterol sangat tinggi (dirawat dengan Statin)',
    profile_mother_history: 'Ibu & Adik-beradik:',
    profile_mother_history_desc: 'Tiada sejarah awal penyakit jantung diisytiharkan',
    profile_care_coordination: 'Penyelarasan Penjagaan',
    profile_primary_clinic_val: 'Poliklinik Ang Mo Kio',
    profile_referred_clinic_val: 'Klinik Genetik NUH',
    profile_emergency_contact_val: 'Ho Chin Teck',
    profile_relationship_no_val: 'Pasangan • 9876 5432',
    profile_privacy_statement: 'Data profil genetik anda dilindungi sepenuhnya di bawah undang-undang privasi kebangsaan Singapura dan Moratorium Persatuan Insurans Hayat (LIA). Butiran anda tidak akan sekali-kali dikongsi tanpa persetujuan jelas anda.',
    settings_option_sms_only: 'Mesej SMS Sahaja (+65 9123 4567)',
    settings_option_push_only: 'Pemberitahuan Push Aplikasi HealthHub',
    settings_option_both: 'Kedua-dua SMS & Aplikasi Push (Disyorkan)',
    settings_help_sms: 'Peringatan akan dihantar terus melalui mesej teks SMS ke nombor mudah alih anda yang berdaftar.',
    settings_help_push: 'Peringatan akan dipaparkan pada skrin kunci anda daripada aplikasi HealthHub.',
    settings_help_both: 'Sistem kami menghantar makluman kepada kedua-dua saluran SMS dan Push Aplikasi, memastikan warga emas tidak terlepas rujukan.',
    settings_freq_monthly: 'Maklumat Bulanan (Bahan pendidikan)',
    settings_freq_2_weeks: '2 Minggu Sebelum (Dorongan awal)',
    settings_freq_1_week: '1 Minggu Sebelum (Sangat menyokong)',
    settings_freq_1_day: '1 Hari Sebelum (Pemeriksaan persediaan terakhir)',
    settings_sms_preview_title: 'Pratonton Siaran SMS',
    settings_sms_verified_sender: 'Penghantar MOH Disahkan',
    settings_lockscreen_preview_title: 'Pratonton Skrin Kunci Aplikasi HealthHub',
    settings_lockscreen_header: 'HealthHub Singapura • Baru Sahaja',
    settings_sms_prefix: 'MOH HealthHub: Hai Lisa, slot Kaunseling Genetik FH anda di Klinik Genetik Hospital Universiti Nasional disahkan pada {date} pukul {time}. Subsidi sehingga 75% telah diluluskan. Bawa Singpass. Info: https://hh.gov.sg/fh-ref',
    journey_prep_title: 'Senarai Semak Persediaan',
    journey_prep_desc: 'Pastikan anda mengetahui apa yang diharapkan dan laporan sejarah keluarga apa yang perlu dibawa. Semak panduan kami.',
    journey_review_checklist_btn: 'Semak senarai semak sekarang',
    lockscreen_telco: 'Singapore Telecommunications',
    lockscreen_date: 'Rabu, 15 Julai 2026',
    lockscreen_days_left: 'Tinggal 7 Hari',
    lockscreen_push_msg: 'Kaunseling genetik anda telah disahkan untuk {date} pukul {time}. Ketik untuk melengkapkan senarai semak.',
    lockscreen_tap_confirm_info: 'Ketik "Sahkan Kehadiran" untuk mendaftarkan pengesahan anda serta-merta dalam pangkalan data HealthHub Singapura.',
    lockscreen_swipe_hint: 'Slaid ke atas untuk membuka bukti kelayakan berdaftar',
    booking_subsidies_computed: 'Subsidi MOH dikira secara automatik melalui status Singpass anda yang dipautkan.',
    booking_no_slots_alert: 'Tiada slot tersedia pada tarikh ini. Sila pilih hari yang diserlahkan pada kalendar di atas.',
    booking_assigned_specialist: 'Pakar Klinikal yang Ditugaskan',
    booking_address_label: 'Alamat:',
    booking_date_label: 'Tarikh:',
    booking_time_label: 'Masa:',
    booking_duration_label: 'Tempoh Sesi:',
    booking_out_of_pocket_label: 'Jumlah Anggaran Kos Sendiri:',
    // Bottom Navigation Bar
    nav_home: 'Laman Utama',
    nav_learn: 'Belajar',
    nav_book: 'Tempah',
    nav_journey: 'Perjalanan',
    nav_profile: 'Profil',
    // Home Page Profiles
    home_profile_lisa: 'LISA HO',
    home_profile_spouse: 'HO CHIN TECK',
    // Home Page Programmes
    prog_active_hub: 'Hub Aktif',
    prog_diabetes_title: 'Hub Diabetes',
    prog_diabetes_desc: 'Panduan diperibadikan untuk mengurus dan mencegah diabetes.',
    prog_resource: 'Sumber',
    prog_mental_title: 'Kesejahteraan Mental',
    prog_mental_desc: 'Panduan kesedaran dan rangkaian sokongan untuk keselamatan emosi.',
    // Book Screen Selector Buttons
    booking_close_selector_btn: 'Tutup Pemilih',
    booking_change_estate_btn: 'Tukar Estet / GPS',
    // Clinic Names & Addresses
    clinic_nuh_name: 'Klinik Genetik Hospital Universiti Nasional',
    clinic_nuh_address: '5 Lower Kent Ridge Rd, Bangunan Utama Zon B, Singapura 119074',
    clinic_sgh_name: 'Perkhidmatan Genetik Hospital Umum Singapura',
    clinic_sgh_address: 'Outram Rd, Aras Bawah Perubatan Akademik 1, Singapura 169608',
    clinic_ttsh_name: 'Genomik Klinikal Hospital Tan Tock Seng',
    clinic_ttsh_address: '11 Jalan Tan Tock Seng, Klinik 4B, Singapura 308433',
    clinic_kkh_name: 'Klinik Genetik Hospital Wanita dan Kanak-kanak KK',
    clinic_kkh_address: '100 Bukit Timah Rd, Menara Kanak-kanak Aras 5, Singapura 229899',
    // Doctors
    doc_helen_lim: 'Dr. Helen Lim',
    doc_albert_chiang: 'Dr. Albert Chiang',
    doc_marcus_goh: 'Dr. Marcus Goh',
    doc_fiona_lee: 'Dr. Fiona Lee',
    doc_benjamin_chew: 'Dr. Benjamin Chew',
    doc_sarah_tan: 'Dr. Sarah Tan',
    doc_claire_wong: 'Dr. Claire Wong',
    doc_jeanette_tan: 'Dr. Jeanette Tan',
    // Specialist Roles
    role_senior_genetic_counsellor: 'Kaunselor Genetik Kanan',
    role_consultant_cardiogeneticist: 'Pakar Kardiogenetik Perunding',
    role_principal_genetics_specialist: 'Pakar Genetik Utama',
    role_senior_clinical_geneticist: 'Pakar Genetik Klinikal Kanan',
    role_consultant_paediatric_geneticist: 'Pakar Genetik Pediatrik Perunding',
    role_lead_paediatric_counsellor: 'Kaunselor Pediatrik Utama',
    role_consultant_geneticist: 'Pakar Genetik Perunding',
    chatbot_greeting: "Hai! Saya **HealthBuddy**, Pembantu FH GovTech Singapura anda. Saya boleh membantu menjawab soalan tentang **Familial Hypercholesterolaemia (FH)**, kos ujian, moratorium insurans, dan tempahan. Apakah yang ingin anda tanyakan hari ini?",
    chatbot_placeholder: 'Tanya tentang subsidi, perlindungan insurans, persediaan...',
    chatbot_quick_insurance: 'Adakah ini menjejaskan insurans saya?',
    chatbot_quick_cost: 'Berapakah kos ujian FH?',
    chatbot_quick_family: 'Adakah ini menjejaskan keluarga saya?',
    chatbot_quick_prep: 'Apakah yang perlu saya sediakan?',
    chatbot_footer: 'Memberikan jawapan dasar rasmi MOH Singapura dan GovTech.',
    chatbot_online: 'Sokongan GovTech - Dalam Talian',
    chatbot_title: 'Pembantu HealthBuddy',
    chatbot_reset: 'Set semula perbualan',
    chatbot_banner_title: 'Ada kebimbangan mengenai ujian genetik FH?',
    chatbot_banner_body: 'Dapatkan jawapan segera dan selamat mengenai subsidi CHAS, perlindungan insurans, dan persediaan klinik.',
    edu_hub_title: 'Pusat Pendidikan',
    edu_note: 'Sila ambil perhatian: Dirujuk untuk ujian genetik tidak bermakna anda menghidap FH. Ia hanyalah langkah pencegahan untuk menilai risiko semula jadi anda.',
    edu_video_title: '▶ Apa yang berlaku semasa ujian FH?',
    edu_video_subtitle: 'Ketahui apa yang perlu dijangkakan sebelum temujanji anda.',
    edu_play_story: 'Main Cerita',
    edu_pause_story: 'Jeda Cerita',
    edu_view_transcript: 'Lihat Transkrip',
    edu_hide_transcript: 'Sembunyikan Transkrip',
    edu_video_story_label: 'Cerita Pengalaman Pesien (Chloe, 21)',
    edu_video_frame_0: '"Saya makan dengan sihat dan aktif. Saya ingat kolesterol tinggi hanya untuk orang tua atau mereka yang mempunyai gaya hidup tidak sihat."',
    edu_video_frame_1: '"Kaunselor genetik tidak memaksa saya langsung. Mereka hanya menyenaraikan fakta dan membiarkan saya membuat keputusan sendiri."',
    edu_video_frame_2: '"Saya dapati insurans kesihatan sedia ada dilindungi sepenuhnya, dan subsidi MOH menampung sehingga 75% daripada kos."',
    edu_video_frame_3: '"Saya memutuskan untuk melakukan ujian kerana mendapatkan fakta yang jelas membantu saya mengawal kesihatan saya dan kejelasan tentang cara untuk kekal sihat."',
    edu_video_transcript_title: 'Transkrip & Sari Kata Video',
    edu_video_transcript_1: '"Hei semua, saya Chloe. Apabila ujian menandakan kolesterol LDL saya sebagai sangat tinggi, saya sangat keliru. Saya hidup dengan gaya hidup sihat, bersenam secara teratur, dan makan dengan baik, jadi saya menganggap kolesterol tinggi adalah sesuatu yang hanya dialami orang tua, atau mungkin orang yang mempunyai gaya hidup tidak sihat. Doktor saya menerangkan bahawa FH diwarisi sejak lahir—tiada kaitan dengan gaya hidup atau umur."',
    edu_video_transcript_2: '"Pada mulanya saya sangat skeptikal tentang kaunseling genetik, tetapi kaunselor tidak cuba memaksa saya. Dia hanya menerangkan cara genetik berfungsi, menjawab soalan saya tentang privasi, dan membiarkan keputusan sepenuhnya kepada saya."',
    edu_video_transcript_3: '"Kami juga membincangkan aspek praktikal. Dia menjelaskan bahawa di bawah garis panduan Singapura, insurans kesihatan sedia ada tidak boleh diubah, dan MOH menampung sehingga 75% kos. Tiada perangkap tersembunyi."',
    edu_video_transcript_4: '"Akhirnya, saya memutuskan untuk meneruskan dan mengambil ujian darah. Mendapatkan fakta tidak mengubah siapa saya, tetapi ia memberi saya kejelasan tentang cara untuk kekal sihat. Ia tentang mengenali badan anda, bukan hidup dalam ketakutan."',
    booking_header_title: 'Tempah Janji Temu',
    faq_title: 'Soalan Lazim',
    faq_category_all: 'SEMUA',
    faq_category_cost: 'KOS',
    faq_category_insurance: 'INSURAN',
    faq_category_testing: 'UJIAN',
    faq_category_medication: 'UBATAN',
    edu_did_you_know: 'Tahukah Anda?',
    edu_stat1_label: 'rakyat Singapura menghidap FH',
    edu_stat1_body: 'Lebih biasa daripada yang disedari — lebih 22,000 rakyat Singapura terjejas.',
    edu_stat2_label: 'tidak didiagnosis',
    edu_stat2_body: '9 daripada 10 orang yang menghidap FH tidak tahu mereka menghidapnya.',
    edu_stat3_label: 'risiko jantung lebih rendah',
    edu_stat3_body: 'Diagnosis awal dan rawatan ringkas membuat perbezaan yang sangat besar.',
    edu_stat4_label: 'risiko keluarga',
    edu_stat4_body: 'Setiap ibu bapa, adik beradik, atau anak mempunyai peluang warisan 50%.',
    edu_learning_hub: 'HUB PEMBELAJARAN',
    edu_modules_summary: '3 Modul • 6 Topik',
    edu_group_basics_title: 'Memahami FH & Ubat',
    edu_group_basics_desc: 'Ketahui tentang keadaan genetik, tanda fizikal, dan rawatan standard.',
    edu_group_journey_title: 'Perjalanan Klinikal Anda',
    edu_group_journey_desc: 'Panduan langkah demi langkah untuk ujian dan melindungi keluarga anda.',
    edu_group_costs_title: 'Subsidi & Perlindungan',
    edu_group_costs_desc: 'Subsidi MOH, liputan MediSave, dan hak insurans undang-undang anda.',
    booking_mins: 'minit',
    chatbot_fallback_insurance: "Di bawah **Moratorium LIA Singapura**, syarikat insurans **tidak boleh** meminta anda mendedahkan keputusan ujian genetik. Pelan sedia ada seperti **MediShield Life** dan Integrated Shield tidak terjejas langsung.",
    chatbot_fallback_cost: "Ujian FH disubsidi **50–75%** oleh MOH untuk rakyat Malaysia yang layak. Kos sendiri biasanya antara **S$50 hingga S$120** dan boleh **dibayar sepenuhnya menggunakan MediSave**.",
    chatbot_fallback_family: "FH diwarisi — ahli keluarga darjah pertama mempunyai **peluang 50%** mewarisi gen tersebut. Pasukan anda akan menyelaras **pemeriksaan kaskad** untuk melindungi keluarga anda.",
    chatbot_fallback_prep: "Tidak perlu berpuasa! Sediakan **sejarah perubatan keluarga**, **ubat-ubatan semasa**, dan **Singpass** anda. Sesi kaunseling 30 minit akan membimbing anda terlebih dahulu.",
    chatbot_fallback_default: "Saya sedia membantu mengenai ujian FH. Rujukan anda adalah **saringan pencegahan yang disubsidi dan dilindungi**. Semak tab **Belajar** atau **Tempah** untuk maklumat lanjut.",
    // Home quick links
    link_ask_ai: 'Tanya AI',
    link_help_desk: 'Meja Bantuan',
    link_medical_reports: 'Laporan Perubatan',
    link_medication_refill: 'Tambah Ubat',
    link_payment: 'Pembayaran',
    link_programmes: 'Program Kesihatan',
    // Notifications popup
    notif_header: 'Pemberitahuan',
    notif_close: 'Tutup',
    notif_referral_title: 'Rujukan Genetik FH Aktif',
    notif_referral_desc: 'Rujukan klinikal anda aktif. Baca sebab doktor anda mengesyorkan ujian.',
    notif_referral_time: '2 jam lalu',
    notif_booking_booked: 'Janji Temu Kaunseling Ditempah',
    notif_booking_unbooked: 'Tindakan Diperlukan: Tempah Kaunseling',
    notif_booking_confirmed_msg: 'Kaunseling genetik pra-ujian disahkan pada {date} @ {time}.',
    notif_booking_pending_msg: 'Sila tempah slot sesi kaunseling genetik pra-ujian anda.',
    notif_time_just_now: 'Baru sahaja',
    notif_time_1d_ago: '1 hari lalu',
    // Cancel flow
    cancel_worries_text: 'Ada kebimbangan tentang kos, keselamatan, atau prosedur?',
    cancel_address_concerns: 'Selesaikan kebimbangan anda di bahagian',
    cancel_faq_link: 'Soalan Lazim kami',
    cancel_if_need_diff_time: 'Jika anda memerlukan waktu yang berbeza, anda boleh menjadualkan semula tanpa kehilangan tempat dalam program.',
    cancel_reschedule_btn: 'Jadualkan Semula Sebaliknya',
    cancel_continue_btn: 'Teruskan Pembatalan',
    cancel_confirm_title: 'Sahkan pembatalan',
    cancel_confirm_desc: 'Pembatalan akan melepaskan slot ini. Anda boleh menempah semula bila-bila masa, walaupun ketersediaan mungkin berbeza.',
    cancel_yes_btn: 'Ya, Batalkan Janji Temu Ini',
    cancel_keep_btn: 'Kekalkan Janji Temu Saya',
    cancel_success_title: 'Janji temu anda telah dibatalkan.',
    cancel_success_desc: 'Anda boleh menempah slot baru bila-bila masa anda bersedia.',
    cancel_book_new_btn: 'Tempah Janji Temu Baru',
    cancel_return_home: 'Kembali ke Laman Utama',
    // Reschedule flow
    reschedule_select_title: 'Pilih slot baru',
    reschedule_current_appt: 'Janji temu semasa',
    reschedule_choose_desc: 'Pilih klinik, tarikh dan masa pengganti. Janji temu semasa anda kekal disahkan sehingga anda selesai menjadualkan semula.',
    reschedule_select_clinic: 'Pilih klinik',
    reschedule_nearest: 'Terdekat',
    reschedule_no_slots: 'Tiada slot tersedia pada hari ini.',
    reschedule_keep_current: 'Kekalkan janji temu semasa',
    reschedule_review_title: 'Semak perubahan',
    reschedule_review_desc: 'Semak perubahan sebelum mengesahkan. Janji temu semasa anda kekal aktif sehingga anda tekan Sahkan Penjadualan Semula.',
    reschedule_new_appt: 'Janji temu baru',
    reschedule_confirm_btn: 'Sahkan Penjadualan Semula',
    reschedule_different_slot: 'Pilih Slot Berbeza',
    reschedule_success_title: 'Janji temu telah dijadualkan semula.',
    reschedule_success_desc: 'Janji temu anda telah dikemas kini.',
    reschedule_done_btn: 'Selesai',
    // Profile screen
    profile_my_profile: 'Profil Saya',
    profile_section_personal: 'Maklumat Peribadi',
    profile_section_contact: 'Maklumat Hubungan',
    profile_section_emergency: 'Kenalan Kecemasan',
    profile_section_healthcare: 'Pilihan Penjagaan Kesihatan',
    profile_section_medical: 'Maklumat Perubatan',
    profile_section_account: 'Akaun',
    profile_label_full_name: 'Nama penuh',
    profile_label_dob: 'Tarikh lahir',
    profile_label_gender: 'Jantina',
    profile_label_nric: 'NRIC / ID Kesihatan',
    profile_label_preferred_lang: 'Bahasa pilihan',
    profile_label_mobile: 'Nombor telefon bimbit',
    profile_label_email: 'Alamat e-mel',
    profile_label_address: 'Alamat kediaman',
    profile_label_contact_name: 'Nama kenalan',
    profile_label_relationship: 'Hubungan',
    profile_label_phone: 'Nombor telefon',
    profile_label_preferred_clinic: 'Klinik pilihan',
    profile_label_ldl: 'Kolesterol LDL',
    profile_label_active_referrals: 'Rujukan aktif',
    profile_label_upcoming_appts: 'Janji temu akan datang',
    profile_fh_testing_badge: 'Ujian Genetik FH (Bersubsidi MOH)',
    profile_no_appointments: 'Tiada janji temu dijadualkan',
    profile_book_session_now: 'Tempah sesi kaunseling sekarang',
    profile_view_reminder_settings: 'Lihat Tetapan Peringatan & Pemberitahuan',
    profile_label_linked_account: 'Akaun HealthHub yang dipautkan',
    profile_label_privacy: 'Tetapan privasi',
    profile_verified_singpass: 'Disahkan melalui Singpass',
    profile_privacy_registry: 'Pendaftaran Genomik Nasional Selamat',
    profile_logout: 'Log keluar dari HealthHub',
    profile_yrs: 'thn',
    gender_male: 'Lelaki',
    gender_female: 'Perempuan',
    // Booking screen – location / calendar
    booking_location_label: 'Lokasi:',
    booking_change_location: 'Tukar Lokasi',
    booking_default_address: 'Alamat lalai',
    booking_search_location: 'Cari Lokasi:',
    booking_detecting: 'Mengesan...',
    booking_live_location: 'Lokasi Semasa',
    booking_search_results: 'Keputusan Carian:',
    booking_suggestions: 'Cadangan:',
    booking_no_matches: 'Tiada padanan. Klik di bawah untuk menggunakan:',
    booking_distance: 'Jarak:',
    booking_nearest_clinic: 'Klinik Terdekat',
    booking_legend_today: 'Hari Ini',
    booking_legend_selected: 'Hari Dipilih',
    booking_km_away: 'km jauh',
    // Learn FH screen
    edu_learning_guide_title: 'Panduan Pembelajaran FH Anda',
    edu_learning_guide_subtitle: 'Panduan peribadi tentang sebab dan cara bersedia setelah anda dirujuk untuk ujian genetik FH.',
    edu_tab_guides: 'Panduan',
    edu_tab_checklist: 'Senarai Semak',
    edu_tab_faqs: 'Soal Jawab & Pautan',
    edu_topics: 'Topik',
    edu_helpful_resources: 'Sumber Berguna',
    edu_view_resource: 'Lihat Sumber',
    edu_checklist_progress_title: 'Kemajuan Persediaan',
    edu_checklist_progress_detail: '{completed} daripada {total} selesai ({percent}%)',
    edu_checklist_progress_success: 'Cemerlang! Anda telah bersedia sepenuhnya untuk sesi konsultasi anda.',
    edu_checklist_progress_desc: 'Lengkapkan langkah-langkah ini sebelum janji temu anda untuk memanfaatkan sesi anda bersama kaunselor genetik dengan sebaiknya.',
    edu_checklist_card_title: 'Senarai Semak Pra-Kaunseling',
    edu_checklist_card_desc: 'Melengkapkan tugasan mudah ini dapat mengurangkan kebimbangan janji temu dan memastikan penjagaan yang sangat disesuaikan:',
    patient_label: 'Pesakit',
    edu_hi_greeting: 'HAI {name},',
    edu_cta_title: 'Bersedia untuk menempah slot kaunseling GAC anda?',
    edu_cta_subtitle: 'Ambil langkah aktif hari ini. Tempahan mengambil masa kurang daripada 20 saat dalam HealthHub.',
    edu_cta_btn: 'Pergi ke Tempahan Selamat',
    edu_key_takeaway: 'Rumusan Utama',
    edu_doc_page_of: 'MUKA SURAT {current} DARIPADA {total}',
    edu_website_btn: 'LAMAN WEB',
    edu_print_btn: 'CETAK',
    edu_page_label: 'Muka surat',
    edu_prev_btn: 'Sblm',
    edu_next_btn: 'Seterusnya',
    edu_finish_btn: 'Selesai Membaca',
    not_on_file: 'Tiada dalam rekod',
    not_yet_assigned: 'Belum ditentukan',
    sms_today: 'Hari Ini',
    concern_test_desc: 'Ketahui apa yang berlaku sebelum, semasa dan selepas ujian genetik.',
  },
  zh: {
    ...zhPersonalisation,
    ...zhChecklist,
    health: 'Health',
    hub: 'Hub',
    active_user: '活跃用户',
    chas_blue: 'CHAS蓝色社保卡会员',
    action_recommended: '建议采取行动',
    
    fh_referral_title: 'FH 基因检测转诊推荐',
    fh_referral_desc: '根据您最近的胆固醇检查结果，您的医生建议进行FH基因检测，以更好地了解您的健康状况。',
    recommended_next_step: '推荐下一步行动',
    book_counselling_step: '预约您的检测前基因咨询。',
    next_appointment: '下一次预约',
    learn_why: '了解原因',
    why_referred_btn: '为何被转诊？',
    book_now_btn: '立即预约',
    manage_slot_btn: '管理预约',
    your_journey: '您的康复之旅',
    step_referral: '转诊推荐',
    step_counselling: '预约咨询',
    step_testing: '基因检测',
    
    quick_links: '快速链接',
    edit: '编辑',
    link_appointments: '预约服务',
    link_learn: '科普与资讯',
    link_subsidies: '政府津贴',
    link_care_team: '医疗团队',
    link_call: '直接通话',
    link_faqs: '常见问题',
    
    your_care_team: '您的医疗团队',
    specialist_role: '高级基因咨询师',
    specialist_hospital: '国立大学医院 (NUH)',
    
    referral_details_title: '转诊详情',
    why_am_i_referred_title: '为什么我被推荐进行FH基因检测？',
    explanation_1: '您的血脂报告显示低密度脂蛋白（坏胆固醇）水平极高。FH是一种遗传性疾病，这意味着单靠改善生活方式无法完全解决。',
    explanation_2: '基因检测能确认是否存在特定的基因变异。这有助于您的临床医生为您和您的家人量身定制高效的预防性治疗方案。',
    govt_subsidies_title: '政府津贴与补助',
    subsidies_desc: 'CHAS蓝色卡和建国一代享有高达75%的卫生部 (MOH) 津贴。MediSave（保健储蓄）也可用来自付剩余的共付额。',
    what_should_i_do: '我现在应该做什么？',
    what_should_i_do_desc: '我们强烈建议您预约45分钟的免费检测前咨询。此咨询无强制检测义务，将为您清晰解答所有医学影响。',
    book_counselling_session: '预约基因咨询',
    
    education_hub_title: '基因科普中心',
    tab_guides: '视频与指南',
    tab_checklist: '准备清单',
    tab_faqs: '常见问答',
    
    select_clinic_title: '选择就诊医院',
    search_placeholder: '搜索医院或地点...',
    use_gps: '使用我的实时GPS位置',
    gps_calculating: '正在定位中...',
    available_slots: '可选预约时段',
    review_booking_title: '核对预约信息',
    confirm_booking_btn: '确认预约',
    appointment_confirmed_title: '预约已确认！',
    booking_success_desc: '您的基因咨询时段已锁定。我们已为您安排了短信和应用推送提醒。',
    booking_success_details: '您的咨询时段已安排在 {date} 的 {time}，地点为 {clinic}。',
    booking_scheduled_upcoming: '已安排与即将进行',
    add_to_calendar: '添加到日历',
    reschedule_slot: '重新安排预约',
    back_to_home: '返回主页',
    
    settings_title: '设置',
    settings_desc: '配置您接收基因检测转诊和预约提醒的方式和时间。',
    active_reminders: '启用 FH 转诊提醒',
    active_reminders_desc: '接收科普资讯和倒计时消息提醒。',
    notification_channel: '通知渠道',
    reminder_frequency: '提醒频率',
    frequency_desc: '调整在预约日期之前多久触发提醒通知。',
    freq_comprehensive: '全面提醒 (Comprehensive)',
    freq_standard: '标准提醒 (Standard)',
    freq_minimal: '极简提醒 (Minimal)',
    freq_comprehensive_desc: '全面提醒：在您预约时间前1个月、2周、1周及1天发送多次提醒，提供全面而贴心的保障。',
    freq_standard_desc: '标准提醒：在您预约时间前1周和1天发送关键提醒。',
    freq_minimal_desc: '极简提醒：仅在您预约时间前1天发送一次单次提醒。',
    active_schedule: '当前提醒计划',
    active_freq_comprehensive: '预约前1个月、2周、1周及1天提醒',
    active_freq_standard: '预约前1周及1天提醒',
    active_freq_minimal: '仅在预约前1天提醒',
    lang_pref_title: '语言偏好设置',
    lang_pref_desc: '选择您偏好的语言。此设置将实时更新所有文本内容，以支持新加坡的各个多元化社区。',
    select_app_language: '选择应用语言',
    
    progress_journey_title: '我的就医时间线',
    status_unbooked: '需要预约基因咨询',
    status_booked: '预约已安排',
    status_confirmed: '到场出席已确认',
    unbooked_journey_desc: '您目前有一项有效的心脏基因转诊，需要您安排一次咨询服务。',
    timeline_title: '转诊互动时间线',
    
    back: '返回',

    // New additions for full translation support
    lab_reports_btn: '化验报告',
    med_reports_btn: '医疗报告',
    med_refill_btn: '药物配给',
    payment_btn: '账单与付款',
    health_profiles: '健康档案',
    view_all_btn: '查看全部',
    programmes_title: '健康计划',
    referred_intro_title: '为什么我被推荐转诊？',
    referred_hi_lisa: '您好，Lisa。',
    referred_doctor_rec: '医生在查看了您最近的胆固醇检查结果后，建议您进行基因检测。',
    referred_means: '以下是这其中的含义。',
    referred_why_doctor: '医生推荐您转诊的原因',
    referred_cholesterol_may_fh: '您最近的胆固醇结果表明您可能患有家族性高胆固醇血症 (FH)。',
    not_mean_have_fh: '这并不意味着您一定患有 FH。',
    genetic_testing_confirms: '基因检测有助于确认 FH 是否是根本原因。',
    referred_results_help_team: '检测结果将协助您的医疗团队为您推荐最合适的治疗方案。',
    why_this_matters: '为什么这很重要',
    early_diagnosis: '早期诊断',
    early_diagnosis_desc: '尽早开始预防与治疗。',
    protect_family: '保护您的家人',
    protect_family_desc: 'FH 是一种可在家族中遗传的疾病。',
    personalized_care: '个性化医疗健康',
    personalized_care_desc: '检测结果将引导您的个性化护理。',
    what_happens_next: '接下来会发生什么？',
    step_referral_received: '已收到转诊推荐',
    step_learn_about_fh: '了解家族性高胆固醇血症 (FH)',
    step_current: '当前步骤',
    step_pre_test_counselling: '检测前咨询',
    step_genetic_results: '基因检测结果报告',
    referred_next_step_learning: '下一步行动是在参加检测前遗传学咨询之前，了解更多关于 FH 的科普知识。',
    referred_before_app: '预约就诊前准备',
    referred_spend_time: '在您参加咨询预约前，只需花 2-3 分钟了解 FH 即可。',
    referred_short_what_is: '什么是FH？',
    referred_short_why: '为何检测？',
    referred_short_process: '检测流程',
    referred_short_costs: '津贴与费用',
    referred_short_insurance: '保险权益',
    referred_continue_learn: '请在预约就诊前继续了解 FH 科普。',
    booking_secure_title: '安全预约服务',
    booking_confirmed_status: '您的预约已确认',
    booking_subsidized_slot: '卫生部 (MOH) 资助时段',
    booking_care_clinic: '就诊诊所：',
    booking_specialist: '医生专长：',
    booking_scheduled_date: '预约日期：',
    booking_confirmed_time: '确认时间：',
    booking_session_duration: '问诊时长：',
    booking_out_of_pocket: '个人自付费用：',
    booking_chas_subsidized: 'CHAS 资助',
    booking_add_device_calendar: '添加到手机日历',
    booking_essential_prep: '重要就诊准备说明',
    booking_prep_no_fasting: '无需空腹：问诊前可正常饮食。',
    booking_prep_id_verif: '身份验证：请携带您的身份证件 NRIC 或通过 Singpass 登录。',
    booking_prep_checklist: '请在就诊前在应用中完成您的“检测前咨询准备清单”',
    booking_view_checklist: '查看就诊前准备清单',
    booking_reschedule_slot: '重新安排预约时段',
    booking_cancel_slot: '取消预约就诊',
    booking_eligible_subsidies: '根据您的临床转诊推荐，您有资格在这些注册医疗机构享受高达 75% 的 MOH 转诊津贴。',
    booking_nearest_tag: '最近距离',
    booking_select_counselling_slot: '选择基因咨询时段',
    booking_choose_subsidized_slot: '选择您的政府资助基因咨询预约时段。',
    booking_select_month: '选择月份',
    booking_reschedule_alert: '重新预约模式已激活：请在下方选择一个新时段。',
    booking_nric_verified: '已就绪并登记 • NRIC/Singpass 临床入院前验证已通过。',
    booking_unverified_alert: '到场状态尚未验证。请点击锁屏推送或设置页面来确认您将按时出席。',
    booking_session_desc: '45分钟的专家问诊，为您解答家族担忧并最终确定检测细节。',
    booking_setup_reminders: '设置您的提醒警报与通知频率',
    booking_review_details: '核对预约细节',
    booking_confirm_slot_btn: '确认预约时段',
    booking_add_calendar_success: 'Apple日历 .ics 事件已成功下载！',
    profile_my_health_profile: '我的健康档案',
    profile_singpass_linked: 'Singpass 已联接',
    profile_moh_identity_cleared: '卫生部 MOH 身份验证已通过',
    profile_personal_particulars: '个人基本信息',
    profile_full_name: '姓名：',
    profile_nric_fin: '身份证号 / NRIC:',
    profile_dob: '出生日期：',
    profile_nationality: '国籍：',
    profile_mobile_number: '手机号码：',
    profile_email_address: '电子邮箱：',
    profile_residential: '家庭住址：',
    profile_clinical_metrics: '临床指标与健康风险',
    profile_blood_group: '血型：',
    profile_height_weight: '身高 / 体重：',
    profile_known_allergies: '已知过敏史：',
    profile_none_declared: '无已知过敏',
    profile_cholesterol_level: '胆固醇指标：',
    profile_elevated_risk: '偏高（存在风险）',
    profile_active_referral: '有效转诊推荐：',
    profile_referred_by: '由心脏专科门诊医生推荐',
    profile_subsidies_financing: '政府津贴与补助',
    profile_chas_blue_member: 'CHAS 蓝色社保卡会员',
    profile_chas_subsidy_level: '卫生部 MOH 津贴比例最高达 75%',
    profile_chas_card_expiry: 'CHAS 卡有效期至：',
    profile_medisave_account: '保健储蓄账户 (MediSave):',
    profile_medisave_note: '*门诊基因咨询和检测项目完全符合卫生部 MOH MediSave 报销规定。',
    profile_family_cardiac_history: '家族心脏病史',
    profile_family_history_desc: '家族性高胆固醇血症 (FH) 会在家族中遗传。了解您的家族病史可为基因检测提供极其关键的医学上下文背景：',
    journey_my_patient_journey: '我的就医时间线',
    journey_appointment_progress: '您的就诊进度条',
    journey_appointment_status: '就诊状态',
    journey_interactive_referral_timeline: '转诊互动时间线',
    journey_referral_received: '已收到转诊推荐',
    journey_referral_received_desc: '于 2026年7月12日 由心脏科专科门诊医生推荐。',
    journey_edu_completed: '已阅读科普内容',
    journey_edu_completed_desc: '已在新加坡 HealthHub 上完成津贴、科普视频和常见问答的阅读。',
    journey_slot_booked: '已预约咨询时段',
    journey_slot_booked_desc: '已成功预约 {date} @ {time} 国立大学医院 (NUH) 基因诊所。',
    journey_slot_action_needed: '需要采取行动：请选择您的政府资助基因咨询预约时段。',
    journey_attend_counselling: '到场出席基因咨询',
    journey_receive_results: '获取基因检测报告',
    journey_receive_results_desc: '在抽取血样 4 周后，医生将和您共同讨论预防步骤和个性化药物治疗方案。',
    lock_healthhub_preview: 'HealthHub 锁屏推送预览',
    lock_just_now: '刚刚',
    lock_counselling_reminder: '基因咨询就诊提醒',
    lock_counselling_confirmed_msg: '您的基因咨询预约已确认，时间为 {date} {time}。请点击以完善您的准备清单。',
    lock_counselling_tap_confirm_msg: '请确认您将于 {date} @ {time} 参加 FH 基因咨询。',
    lock_trigger_push_alert: '触发模拟锁屏推送提醒',
    lock_confirm_attendance_btn: '确认到场出席',
    lock_reschedule_btn: '重新安排预约',
    lock_read_prep_btn: '查看就诊准备说明',
    lock_tap_confirm_db_msg: '点击“确认到场出席”将实时在新加坡卫生部 HealthHub 数据库中为您登记到场确认状态。',
    lock_swipe_hint: '向上滑动以查看已登记的电子凭证',
    profile_female_age: '女 • 36岁',
    profile_full_name_val: 'Lisa Ho Siew Lan (何秀兰)',
    profile_dob_val: '1989年8月14日 (36岁)',
    profile_nationality_val: '新加坡公民',
    profile_residential_val: '宏茂桥10道第451座, #08-122, 新加坡 560451',
    profile_blood_group_val: 'O Rh+ (阳性)',
    profile_height_weight_val: '162 厘米 / 54 公斤 (BMI 20.6)',
    profile_cholesterol_level_val: 'LDL 5.4 mmol/L (风险偏高)',
    profile_active_referral_val: 'FH 基因检测',
    profile_referred_by_val: '由心脏专科门诊医生推荐',
    profile_card_expiry_val: '2028年12月31日',
    profile_father_history: '父亲 (48岁时确诊):',
    profile_father_history_desc: '冠心病 (血管成形术与支架)',
    profile_grandfather_history: '祖父 (52岁时去世):',
    profile_grandfather_history_desc: '致命性心肌梗死 (急性心脏病发作)',
    profile_aunt_history: '姑姑:',
    profile_aunt_history_desc: '极高胆固醇 (使用他汀类药物治疗)',
    profile_mother_history: '母亲与兄弟姐妹:',
    profile_mother_history_desc: '无早期心脏病史申报',
    profile_care_coordination: '医疗照护协调',
    profile_primary_clinic_val: '宏茂桥综合诊疗所',
    profile_referred_clinic_val: '国大医院 (NUH) 基因诊所',
    profile_emergency_contact_val: 'Ho Chin Teck (何振德)',
    profile_relationship_no_val: '配偶 • 9876 5432',
    profile_privacy_statement: '您的基因档案数据受到新加坡国家隐私法和人寿保险公会 (LIA) 暂停条例的完全保护。未经您的明确同意，您的详细信息绝不会被共享。',
    settings_option_sms_only: '仅限短信通知 (+65 9123 4567)',
    settings_option_push_only: '仅限 HealthHub 应用推送',
    settings_option_both: '短信与应用推送（推荐）',
    settings_help_sms: '提醒将通过短信直接发送到您注册的手机号码。',
    settings_help_push: '提醒将通过 HealthHub 应用程序显示在您的手机锁屏上。',
    settings_help_both: '系统将同时发送短信和应用推送提醒，以防年长者遗漏重要转诊通知。',
    settings_freq_monthly: '按月发送（科普资讯）',
    settings_freq_2_weeks: '就诊前 2 周（首次提醒）',
    settings_freq_1_week: '就诊前 1 周（推荐，强效提醒）',
    settings_freq_1_day: '就诊前 1 天（最后就诊准备确认）',
    settings_sms_preview_title: '短信提醒预览',
    settings_sms_verified_sender: '卫生部官方发送渠道',
    settings_lockscreen_preview_title: 'HealthHub 应用锁屏推送预览',
    settings_lockscreen_header: '新加坡 HealthHub • 刚刚',
    settings_sms_prefix: 'MOH HealthHub: 您的 FH 基因咨询预约已确认，时间为 {date} {time}，地点为国立大学医院基因诊所。最高 75% 的政府津贴已通过审核。请携带您的 NRIC/Singpass。详情：https://hh.gov.sg/fh-ref',
    journey_prep_title: '就诊前准备清单',
    journey_prep_desc: '确保您清楚了解就诊细节以及需要携带的家族病史报告。请仔细核对我们的指南。',
    journey_review_checklist_btn: '立即核对准备清单',
    lockscreen_telco: '新加坡电信 (Singtel)',
    lockscreen_date: '2026年7月15日 星期三',
    lockscreen_days_left: '剩余 7 天',
    lockscreen_push_msg: '您的基因咨询预约已确认，时间为 {date} {time}。请点击以完善您的准备清单。',
    lockscreen_tap_confirm_info: '点击“确认到场出席”将实时在新加坡卫生部 HealthHub 数据库中为您登记到场确认状态。',
    lockscreen_swipe_hint: '向上滑动以查看已登记的电子凭证',
    booking_subsidies_computed: '政府卫生部津贴已根据您绑定的 Singpass 身份自动计算。',
    booking_no_slots_alert: '此日期没有可选的预约时段。请选择上方日历中高亮显示的日期。',
    booking_assigned_specialist: '为您分配的专科临床专家',
    booking_address_label: '地址：',
    booking_date_label: '日期：',
    booking_time_label: '时间：',
    booking_duration_label: '门诊时长：',
    booking_out_of_pocket_label: '预计个人自付总金额：',
    // Bottom Navigation Bar
    nav_home: '主页',
    nav_learn: '科普',
    nav_book: '预约',
    nav_journey: '历程',
    nav_profile: '档案',
    // Home Page Profiles
    home_profile_lisa: '何秀兰 (LISA HO)',
    home_profile_spouse: '何振德 (HO CHIN TECK)',
    // Home Page Programmes
    prog_active_hub: '活跃计划',
    prog_diabetes_title: '糖尿病健康计划',
    prog_diabetes_desc: '用于管理和预防糖尿病的个性化指南。',
    prog_resource: '健康资源',
    prog_mental_title: '心理健康提升计划',
    prog_mental_desc: '正念医学指导和提供情感支持的安全网络。',
    // Book Screen Selector Buttons
    booking_close_selector_btn: '关闭选择器',
    booking_change_estate_btn: '更改小区 / GPS定位',
    // Clinic Names & Addresses
    clinic_nuh_name: '新加坡国立大学医院 (NUH) 基因诊所',
    clinic_nuh_address: '肯特岗下路5号，主楼B区，新加坡 119074',
    clinic_sgh_name: '新加坡中央医院 (SGH) 基因医学部',
    clinic_sgh_address: '欧南路，学术医学大楼地下一层，新加坡 169608',
    clinic_ttsh_name: '陈笃生医院 (TTSH) 临床基因组学部',
    clinic_ttsh_address: '惹兰陈笃生11号，4B诊所，新加坡 308433',
    clinic_kkh_name: '竹脚妇幼医院 (KKH) 基因诊所',
    clinic_kkh_address: '武吉知马路100号，儿童大楼5层，新加坡 229899',
    // Doctors
    doc_helen_lim: '林海伦医生 (Dr. Helen Lim)',
    doc_albert_chiang: '蒋艾伯特医生 (Dr. Albert Chiang)',
    doc_marcus_goh: '吴马库斯医生 (Dr. Marcus Goh)',
    doc_fiona_lee: '李菲奥娜医生 (Dr. Fiona Lee)',
    doc_benjamin_chew: '周本杰明医生 (Dr. Benjamin Chew)',
    doc_sarah_tan: '陈莎拉医生 (Dr. Sarah Tan)',
    doc_claire_wong: '黄克莱尔医生 (Dr. Claire Wong)',
    doc_jeanette_tan: '陈珍妮特医生 (Dr. Jeanette Tan)',
    // Specialist Roles
    role_senior_genetic_counsellor: '高级基因咨询师',
    role_consultant_cardiogeneticist: '心血管基因专科顾问医生',
    role_principal_genetics_specialist: '首席基因学家',
    role_senior_clinical_geneticist: '高级临床基因学家',
    role_consultant_paediatric_geneticist: '儿科基因专科顾问医生',
    role_lead_paediatric_counsellor: '首席儿科基因咨询师',
    role_consultant_geneticist: '基因专科顾问医生',
    chatbot_greeting: "您好！我是 **HealthBuddy**，您的新加坡卫生部 FH 智能助理。我可以回答有关**家族性高胆固醇血症 (FH)**、检测费用、保险保护以及预约相关的问题。请问您今天有什么需要了解的？",
    chatbot_placeholder: '询问津贴、保险保障、检测准备...',
    chatbot_quick_insurance: '这会影响我的保险吗？',
    chatbot_quick_cost: 'FH检测需要多少费用？',
    chatbot_quick_family: '这会影响我的家人吗？',
    chatbot_quick_prep: '我需要做什么准备？',
    chatbot_footer: '提供新加坡卫生部 MOH 和 GovTech 官方政策解答。',
    chatbot_online: 'GovTech 支持 - 在线',
    chatbot_title: 'HealthBuddy 助理',
    chatbot_reset: '重置对话',
    chatbot_banner_title: '对FH基因检测有疑虑？',
    chatbot_banner_body: '立即获得关于CHAS补贴、保险保障和诊所准备的安全解答。',
    edu_hub_title: '教育中心',
    edu_note: '请注意：被转介进行基因检测并不意味着您患有FH，这只是一项主动评估您自然风险的预防措施。',
    edu_video_title: '▶ FH检测期间会发生什么？',
    edu_video_subtitle: '在预约前了解您可以预期的内容。',
    edu_play_story: '播放故事',
    edu_pause_story: '暂停故事',
    edu_view_transcript: '查看文字稿',
    edu_hide_transcript: '隐藏文字稿',
    edu_video_story_label: '患者体验故事 (Chloe, 21)',
    edu_video_frame_0: '"我饮食健康并保持活跃。我以为高胆固醇只属于老年人或生活方式不健康的人。"',
    edu_video_frame_1: '"遗传咨询师完全没有强迫我。他们只是列出事实，让我自己做决定。"',
    edu_video_frame_2: '"我发现现有的健康保险受到完全保护，MOH补贴覆盖高达75%的费用。"',
    edu_video_frame_3: '"我决定做这个检测，因为获得清晰的事实帮助我掌控自己的健康，并明确如何保持健康。"',
    edu_video_transcript_title: '视频文字稿与字幕',
    edu_video_transcript_1: '"大家好，我是Chloe。当一次筛查显示我的LDL胆固醇极高时，我完全困惑了。我生活方式健康，定期运动，饮食均衡，所以我以为高胆固醇只是老年人才会有的问题，或者那些生活方式不健康的人。我的医生解释说FH是从出生时就遗传的——与生活方式或年龄无关。"',
    edu_video_transcript_2: '"起初我对遗传咨询持怀疑态度，但咨询师并没有试图强迫我。她只是解释了遗传学的原理，回答了我关于隐私的问题，并完全把决定权留给了我。"',
    edu_video_transcript_3: '"我们还讨论了实际问题。她澄清说在新加坡的指导方针下，现有的健康保险不会受到影响，MOH覆盖高达75%的费用。没有任何隐藏的陷阱。"',
    edu_video_transcript_4: '"最终，我决定继续进行血液检测。获得事实并没有改变我是谁，但它确实让我清楚地知道如何保持健康。这是关于了解你的身体，而不是生活在恐惧中。"',
    booking_header_title: '预约挂号',
    faq_title: '常见问题',
    faq_category_all: '全部',
    faq_category_cost: '费用',
    faq_category_insurance: '保险',
    faq_category_testing: '检测',
    faq_category_medication: '药物',
    edu_did_you_know: '您知道吗？',
    edu_stat1_label: '新加坡人患有FH',
    edu_stat1_body: '比大多数人意识到的更常见——超过22,000名新加坡人受到影响。',
    edu_stat2_label: '未被诊断',
    edu_stat2_body: '10人中有9人患有FH却不知道自己有这种病。',
    edu_stat3_label: '降低心脏风险',
    edu_stat3_body: '早期诊断和简单治疗能产生很大的积极影响。',
    edu_stat4_label: '家族风险',
    edu_stat4_body: '每位父母、兄弟姐妹或子女都有50%的遗传概率。',
    edu_learning_hub: '学习中心',
    edu_modules_summary: '3 个模块 • 6 个主题',
    edu_group_basics_title: '了解FH与药物',
    edu_group_basics_desc: '了解遗传病症、身体症状和标准治疗方法。',
    edu_group_journey_title: '您的临床旅程',
    edu_group_journey_desc: '检测和保护家人的逐步指南。',
    edu_group_costs_title: '补贴与保障',
    edu_group_costs_desc: 'MOH补贴、MediSave保障及您的法定保险权利。',
    booking_mins: '分钟',
    chatbot_fallback_insurance: "根据新加坡**LIA暂停协议**，保险公司**不得**要求您披露基因检测结果。**MediShield Life**等现有保单完全不受影响。",
    chatbot_fallback_cost: "FH检测获MOH **50–75%** 补贴（符合资格的新加坡公民）。自付费用通常为 **S$50至S$120**，可**全额使用MediSave支付**。",
    chatbot_fallback_family: "FH具有遗传性——直系亲属有 **50%** 的概率携带相同基因。您的医疗团队将协调**级联筛查**，及早保护家人健康。",
    chatbot_fallback_prep: "无需空腹！请准备好**家族病史**（尤其是早发心脏病史）、**当前用药清单**及**Singpass**。30分钟咨询会首先为您详细说明。",
    chatbot_fallback_default: "我在此协助您了解FH检测。您的转诊是一项**受补贴、受保护的预防性筛查**。欢迎查阅**学习**或**预约**标签页。",
    chatbot_close: '关闭聊天',
    // Home quick links
    link_ask_ai: 'AI咨询',
    link_help_desk: '帮助台',
    link_medical_reports: '病历报告',
    link_medication_refill: '药物续配',
    link_payment: '付款',
    link_programmes: '健康项目',
    // Notifications popup
    notif_header: '通知',
    notif_close: '关闭',
    notif_referral_title: 'FH基因检测转诊已启动',
    notif_referral_desc: '您的临床转诊已启动。了解医生建议检测的原因。',
    notif_referral_time: '2小时前',
    notif_booking_booked: '遗传咨询预约已完成',
    notif_booking_unbooked: '需要行动：立即预约咨询',
    notif_booking_confirmed_msg: '检测前基因咨询已确认，时间为 {date} @ {time}。',
    notif_booking_pending_msg: '请预约您的检测前基因咨询时段。',
    notif_time_just_now: '刚刚',
    notif_time_1d_ago: '1天前',
    // Cancel flow
    cancel_worries_text: '对费用、安全性或流程有疑虑？',
    cancel_address_concerns: '请查阅我们的',
    cancel_faq_link: '常见问答',
    cancel_if_need_diff_time: '如需更换时间，您可以重新安排，不会失去在计划中的位置。',
    cancel_reschedule_btn: '改为重新安排',
    cancel_continue_btn: '继续取消',
    cancel_confirm_title: '确认取消',
    cancel_confirm_desc: '取消将释放此预约时段。您可随时重新预约，但名额可能有所变化。',
    cancel_yes_btn: '是的，取消此预约',
    cancel_keep_btn: '保留我的预约',
    cancel_success_title: '您的预约已取消。',
    cancel_success_desc: '您可以在准备好后随时预约新时段。',
    cancel_book_new_btn: '预约新时段',
    cancel_return_home: '返回主页',
    // Reschedule flow
    reschedule_select_title: '选择新时段',
    reschedule_current_appt: '当前预约',
    reschedule_choose_desc: '请选择替代诊所、日期和时间。完成重新安排之前，您的当前预约仍保持有效。',
    reschedule_select_clinic: '选择诊所',
    reschedule_nearest: '最近',
    reschedule_no_slots: '今天没有可用时段。',
    reschedule_keep_current: '保留当前预约',
    reschedule_review_title: '审核更改',
    reschedule_review_desc: '确认前请先审核更改。当前预约将保持有效，直到您点击确认重新安排。',
    reschedule_new_appt: '新预约',
    reschedule_confirm_btn: '确认重新安排',
    reschedule_different_slot: '选择其他时段',
    reschedule_success_title: '预约已重新安排。',
    reschedule_success_desc: '您的预约已更新。',
    reschedule_done_btn: '完成',
    // Profile screen
    profile_my_profile: '我的档案',
    profile_section_personal: '个人信息',
    profile_section_contact: '联系信息',
    profile_section_emergency: '紧急联系人',
    profile_section_healthcare: '医疗偏好',
    profile_section_medical: '医疗信息',
    profile_section_account: '账户',
    profile_label_full_name: '全名',
    profile_label_dob: '出生日期',
    profile_label_gender: '性别',
    profile_label_nric: '身份证 / 健康ID',
    profile_label_preferred_lang: '首选语言',
    profile_label_mobile: '手机号码',
    profile_label_email: '电邮地址',
    profile_label_address: '住宅地址',
    profile_label_contact_name: '联系人姓名',
    profile_label_relationship: '关系',
    profile_label_phone: '电话号码',
    profile_label_preferred_clinic: '首选诊所',
    profile_label_ldl: 'LDL胆固醇',
    profile_label_active_referrals: '活跃转诊',
    profile_label_upcoming_appts: '即将到来的预约',
    profile_fh_testing_badge: 'FH基因检测（MOH补贴）',
    profile_no_appointments: '暂无预约',
    profile_book_session_now: '立即预约咨询',
    profile_view_reminder_settings: '查看提醒与通知设置',
    profile_label_linked_account: '已关联的HealthHub账户',
    profile_label_privacy: '隐私设置',
    profile_verified_singpass: '已通过Singpass验证',
    profile_privacy_registry: '国家基因组注册库安全',
    profile_logout: '从HealthHub退出',
    profile_yrs: '岁',
    gender_male: '男',
    gender_female: '女',
    // Booking screen – location / calendar
    booking_location_label: '位置：',
    booking_change_location: '更改位置',
    booking_default_address: '默认地址',
    booking_search_location: '搜索位置：',
    booking_detecting: '正在检测...',
    booking_live_location: '实时位置',
    booking_search_results: '搜索结果：',
    booking_suggestions: '建议：',
    booking_no_matches: '未找到匹配项。点击下方使用：',
    booking_distance: '距离：',
    booking_nearest_clinic: '最近诊所',
    booking_legend_today: '今天',
    booking_legend_selected: '已选日期',
    booking_km_away: '公里外',
    // Learn FH screen
    edu_learning_guide_title: '您的FH学习指南',
    edu_learning_guide_subtitle: '一份个性化指南，帮助您了解为何以及如何在被转诊接受FH基因检测后做好准备。',
    edu_tab_guides: '指南',
    edu_tab_checklist: '清单',
    edu_tab_faqs: '常见问答与链接',
    edu_topics: '主题',
    edu_helpful_resources: '有用资源',
    edu_view_resource: '查看资源',
    edu_checklist_progress_title: '准备工作进度',
    edu_checklist_progress_detail: '已完成 {completed} / {total} ({percent}%)',
    edu_checklist_progress_success: '非常棒！您已为咨询做好了充分准备。',
    edu_checklist_progress_desc: '请在预约前完成这些步骤，以便在与基因咨询师面谈时获得最大的收获。',
    edu_checklist_card_title: '咨询前准备清单',
    edu_checklist_card_desc: '完成这些简单的步骤可以减轻您对预约的焦虑，并确保获得高度定制化的照护：',
    patient_label: '患者',
    edu_hi_greeting: '您好 {name}，',
    edu_cta_title: '准备好预约您的GAC咨询时段了吗？',
    edu_cta_subtitle: '今天就行动。在HealthHub内预约仅需20秒。',
    edu_cta_btn: '前往安全预约',
    edu_key_takeaway: '核心要点',
    edu_doc_page_of: '第 {current} 页，共 {total} 页',
    edu_website_btn: '官方网站',
    edu_print_btn: '打印',
    edu_page_label: '页',
    edu_prev_btn: '上一页',
    edu_next_btn: '下一页',
    edu_finish_btn: '阅读完毕',
    not_on_file: '暂无记录',
    not_yet_assigned: '暂未指定',
    sms_today: '今天',
    concern_test_desc: '了解基因检测前、检测中和检测后会发生什么。',
  },
  ta: {
    ...taPersonalisation,
    ...taChecklist,
    health: 'Health',
    hub: 'Hub',
    active_user: 'செயலில் உள்ள பயனர்',
    chas_blue: 'CHAS ப்ளூ உறுப்பினர்',
    action_recommended: 'நடவடிக்கை பரிந்துரைக்கப்படுகிறது',
    
    fh_referral_title: 'FH மரபணு சோதனை பரிந்துரை',
    fh_referral_desc: 'உங்கள் சமீபத்திய கொலஸ்ட்ரால் முடிவுகளின் அடிப்படையில், உங்கள் ஆரோக்கியத்தை நன்கு புரிந்துகொள்ள FH மரபணு சோதனையை மருத்துவர் பரிந்துரைக்கிறார்.',
    recommended_next_step: 'பரிந்துரைக்கப்பட்ட அடுத்த படி',
    book_counselling_step: 'உங்களின் சோதனைக்கு முந்தைய ஆலோசனையை முன்பதிவு செய்யவும்.',
    next_appointment: 'அடுத்த சந்திப்பு',
    learn_why: 'காரணத்தை அறிய',
    why_referred_btn: 'ஏன் பரிந்துரைக்கப்பட்டேன்?',
    book_now_btn: 'முன்பதிவு செய்ய',
    manage_slot_btn: 'முன்பதிவை நிர்வகிக்க',
    your_journey: 'உங்கள் சிகிச்சை பயணம்',
    step_referral: 'பரிந்துரை',
    step_counselling: 'ஆலோசனை முன்பதிவு',
    step_testing: 'மரபணு சோதனை',
    
    quick_links: 'விரைவு இணைப்புகள்',
    edit: 'திருத்து',
    link_appointments: 'சந்திப்புகள் முன்பதிவு',
    link_learn: 'விவரம் & கல்வி',
    link_subsidies: 'அரசு மானியங்கள்',
    link_care_team: 'சிகிச்சைக் குழு',
    link_call: 'நேரடி அழைப்பு',
    link_faqs: 'கேள்வி பதில்கள்',
    
    your_care_team: 'உங்கள் சிகிச்சைக் குழு',
    specialist_role: 'மூத்த மரபணு ஆலோசகர்',
    specialist_hospital: 'National University Hospital',
    
    referral_details_title: 'பரிந்துரை விவரங்கள்',
    why_am_i_referred_title: 'நான் ஏன் FH மரபணு சோதனைக்கு பரிந்துரைக்கப்பட்டேன்?',
    explanation_1: 'உங்கள் கொழுப்பு அளவு மிகவும் அதிகமான LDL (கெட்ட) கொழுப்பைக் காட்டுகிறது. FH என்பது மரபுவழி நிலை, அதாவது வாழ்க்கை முறை மட்டுமே இதற்குக் காரணம் அல்ல.',
    explanation_2: 'ஒரு குறிப்பிட்ட மரபணு மாறுபாடு காரணமா என்பதை மரபணு சோதனை உறுதிப்படுத்துகிறது. இது உங்களுக்கும் உங்கள் குடும்பத்திற்கும் மிகவும் பயனுள்ள தடுப்பு சிகிச்சைகளை வடிவமைக்க உதவுகிறது.',
    govt_subsidies_title: 'அரசு மானியங்கள்',
    subsidies_desc: 'CHAS ப்ளூ / முன்னோடி தலைமுறையினருக்கு 75% வரை MOH மானியம். மீதமுள்ள கட்டணத்தை செலுத்த MediSave ஐயும் பயன்படுத்தலாம்.',
    what_should_i_do: 'நான் இப்போது என்ன செய்ய வேண்டும்?',
    what_should_i_do_desc: 'உங்களது 45 நிமிட ஆலோசனை சந்திப்பை முன்பதிவு செய்யுமாறு பரிந்துரைக்கிறோம். இந்த அமர்வுக்கு எவ்வித கட்டாயமும் இல்லை, மேலும் இது மருத்துவ தாக்கங்களை தெளிவாக விளக்கும்.',
    book_counselling_session: 'ஆலோசனை அமர்வை முன்பதிவு செய்',
    
    education_hub_title: 'மரபணு கல்வி மையம்',
    tab_guides: 'வீடியோ & வழிகாட்டிகள்',
    tab_checklist: 'சரிபார்ப்புப் பட்டியல்',
    tab_faqs: 'கேள்விகள் & பதில்கள்',
    
    select_clinic_title: 'மருத்துவமனையைத் தேர்வு செய்யவும்',
    search_placeholder: 'மருத்துவமனை அல்லது இடத்தை தேடு...',
    use_gps: 'எனது நேரடி ஜி.பி.எஸ் பயன்படுத்தவும்',
    gps_calculating: 'இருப்பிடத்தைக் கண்டறிகிறது...',
    available_slots: 'கிடைக்கும் நேரங்கள்',
    review_booking_title: 'முன்பதிவை சரிபார்க்கவும்',
    confirm_booking_btn: 'முன்பதிவை உறுதி செய்',
    appointment_confirmed_title: 'சந்திப்பு உறுதி செய்யப்பட்டது!',
    booking_success_desc: 'உங்கள் ஆலோசனை முன்பதிவு உறுதி செய்யப்பட்டது. உங்களுக்கு எஸ்.எம்.எஸ் மற்றும் புஷ் அறிவிப்பு நினைவூட்டல்கள் அனுப்பப்படும்.',
    booking_success_details: 'உங்கள் ஆலோசனை {date} அன்று {time} மணிக்கு {clinic}-ல் திட்டமிடப்பட்டுள்ளது.',
    booking_scheduled_upcoming: 'திட்டமிடப்பட்டது & வரவிருப்பது',
    add_to_calendar: 'நாட்காட்டியில் சேர்க்கவும்',
    reschedule_slot: 'முன்பதிவு மாற்றம்',
    back_to_home: 'முகப்புப் பக்கத்திற்குச் செல்',
    
    settings_title: 'அமைப்புகள்',
    settings_desc: 'மரபணு சோதனை பரிந்துரைகள் மற்றும் சந்திப்பு விழிப்பூட்டல்களை எப்போது பெறுவது என்பதை அமைக்கவும்.',
    active_reminders: 'செயலில் உள்ள FH நினைவூட்டல்கள்',
    active_reminders_desc: 'கல்வி புதுப்பிப்புகள் மற்றும் நினைவூட்டல்களைப் பெறுங்கள்.',
    notification_channel: 'அறிவிப்பு சேனல்',
    reminder_frequency: 'நினைவூட்டல் அதிர்வெண்',
    frequency_desc: 'சந்திப்பு தேதிக்கு எவ்வளவு காலத்திற்கு முன்பு நினைவூட்டல் அனுப்பப்பட வேண்டும் என்பதை அமைக்கவும்.',
    freq_comprehensive: 'விரிவானது (Comprehensive)',
    freq_standard: 'தரநிலையானது (Standard)',
    freq_minimal: 'குறைந்தது (Minimal)',
    freq_comprehensive_desc: 'விரிவானது: உங்கள் சந்திப்பிற்கு 1 மாதம், 2 வாரங்கள், 1 வாரம் மற்றும் 1 நாளுக்கு முன்பு நினைவூட்டல்களை அனுப்புகிறது.',
    freq_standard_desc: 'தரநிலையானது: உங்கள் சந்திப்பிற்கு 1 வாரம் மற்றும் 1 நாளுக்கு முன்பு நினைவூட்டல்களை அனுப்புகிறது.',
    freq_minimal_desc: 'குறைந்தது: உங்கள் சந்திப்பிற்கு 1 நாளுக்கு முன்பு ஒரு நினைவூட்டலை அனுப்புகிறது.',
    active_schedule: 'செயலில் உள்ள அட்டவணை',
    active_freq_comprehensive: 'சந்திப்பிற்கு 1 மாதம், 2 வாரங்கள், 1 வாரம், & 1 நாளுக்கு முன் நினைவூட்டல்',
    active_freq_standard: 'சந்திப்பிற்கு 1 வாரம் & 1 நாளுக்கு முன் நினைவூட்டல்',
    active_freq_minimal: 'சந்திப்பிற்கு 1 நாளுக்கு முன் நினைவூட்டல் மட்டும்',
    lang_pref_title: 'மொழி விருப்பத்தேர்வுகள்',
    lang_pref_desc: 'உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும். இது சிங்கப்பூரின் அனைத்து சமூகத்தினருக்கும் உதவும் வகையில் அனைத்து உரை உள்ளடக்கத்தையும் மாறும் வகையில் புதுப்பிக்கிறது.',
    select_app_language: 'செயலி மொழியைத் தேர்ந்தெடுக்கவும்',
    
    progress_journey_title: 'எனது சிகிச்சை பயணம்',
    status_unbooked: 'ஆலோசனை முன்பதிவு தேவை',
    status_booked: 'சந்திப்பு திட்டமிடப்பட்டுள்ளது',
    status_confirmed: 'வருகை உறுதி செய்யப்பட்டது',
    unbooked_journey_desc: 'செயலில் உள்ள உங்கள் கார்டியாக் மரபணு பரிந்துரைக்கு நீங்கள் ஒரு ஆலோசனை அமர்வை திட்டமிட வேண்டும்.',
    timeline_title: 'ஊடாடும் பரிந்துரை காலவரிசை',
    
    back: 'பின்செல்',

    // New additions for full translation support
    lab_reports_btn: 'ஆய்வக அறிக்கைகள்',
    med_reports_btn: 'மருத்துவ அறிக்கைகள்',
    med_refill_btn: 'மருந்து நிரப்புதல்',
    payment_btn: 'கட்டணம்',
    health_profiles: 'சுகாதார விவரக்குறிப்புகள்',
    view_all_btn: 'அனைத்தையும் பார்',
    programmes_title: 'திட்டங்கள்',
    referred_intro_title: 'நான் ஏன் பரிந்துரைக்கப்பட்டேன்?',
    referred_hi_lisa: 'வணக்கம் லிசா.',
    referred_doctor_rec: 'உங்களின் சமீபத்திய கொலஸ்ட்ரால் முடிவுகளை ஆய்வு செய்த பின்னர், உங்கள் மருத்துவர் உங்களுக்கு மரபணு சோதனையை பரிந்துரைத்துள்ளார்.',
    referred_means: 'இதன் பொருள் என்ன என்பது இங்கே.',
    referred_why_doctor: 'உங்கள் மருத்துவர் உங்களை பரிந்துரைத்ததற்கான காரணம்',
    referred_cholesterol_may_fh: 'உங்களுக்கு FH (உயர் கொழுப்பு நிலை) இருக்க வாய்ப்புள்ளது என்பதை உங்கள் கொலஸ்ட்ரால் முடிவுகள் காட்டுகின்றன.',
    not_mean_have_fh: 'உங்களுக்கு நிச்சயம் FH இருக்கிறது என்று அர்த்தமல்ல.',
    genetic_testing_confirms: 'மரபணு சோதனை மட்டுமே இதற்கான காரணத்தை உறுதிப்படுத்த உதவும்.',
    referred_results_help_team: 'சரியான சிகிச்சையைத் தேர்வுசெய்ய இந்த முடிவுகள் உங்கள் மருத்துவக் குழுவிற்கு உதவும்.',
    why_this_matters: 'இது ஏன் முக்கியம்',
    early_diagnosis: 'ஆரம்ப கால கண்டறிதல்',
    early_diagnosis_desc: 'சிகிச்சையை விரைவாகத் தொடங்குங்கள்.',
    protect_family: 'உங்கள் குடும்பத்தைப் பாதுகாக்கவும்',
    protect_family_desc: 'இது குடும்பங்களில் பரவக்கூடிய ஒரு மரபுவழி நிலை.',
    personalized_care: 'தனிப்பயனாக்கப்பட்ட சிகிச்சை',
    personalized_care_desc: 'முடிவுகள் உங்கள் சிகிச்சை முறையை வழிநடத்த உதவும்.',
    what_happens_next: 'அடுத்து என்ன நடக்கும்?',
    step_referral_received: 'பரிந்துரை பெறப்பட்டது',
    step_learn_about_fh: 'FH பற்றி அறியவும்',
    step_current: 'தற்போதைய',
    step_pre_test_counselling: 'முன் சோதனை ஆலோசனை',
    step_genetic_results: 'மரபணு சோதனை முடிவுகள்',
    referred_next_step_learning: 'உங்களது முன்-சோதனை ஆலோசனை சந்திப்பில் பங்கேற்பதற்கு முன்பு FH பற்றி மேலும் அறிந்து கொள்வதே அடுத்த படியாகும்.',
    referred_before_app: 'உங்கள் சந்திப்பிற்கு முன்',
    referred_spend_time: 'ஆலோசனை சந்திப்பிற்கு முன் 2-3 நிமிடங்கள் செலவழித்து FH பற்றி அறிந்து கொள்ளவும்.',
    referred_short_what_is: 'FH என்றால் என்ன?',
    referred_short_why: 'ஏன் சோதனை?',
    referred_short_process: 'சோதனை செயல்முறை',
    referred_short_costs: 'கட்டணங்கள்',
    referred_short_insurance: 'காப்பீடு',
    referred_continue_learn: 'சந்திப்பிற்கு முன் FH பற்றி தொடர்ந்து அறிந்து கொள்ளவும்.',
    booking_secure_title: 'பாதுகாப்பான சந்திப்பு முன்பதிவு',
    booking_confirmed_status: 'உங்கள் சந்திப்பு உறுதி செய்யப்பட்டுள்ளது',
    booking_subsidized_slot: 'MOH மானியம் பெற்ற நேரம்',
    booking_care_clinic: 'சிகிச்சை கிளினிக்:',
    booking_specialist: 'நிபுணர்:',
    booking_scheduled_date: 'திட்டமிடப்பட்ட தேதி:',
    booking_confirmed_time: 'உறுதி செய்யப்பட்ட நேரம்:',
    booking_session_duration: 'அமர்வு காலம்:',
    booking_out_of_pocket: 'நேரடி கட்டணம்:',
    booking_chas_subsidized: 'CHAS மானியம்',
    booking_add_device_calendar: 'நாட்காட்டியில் சேர்க்கவும்',
    booking_essential_prep: 'முக்கிய தயாரிப்பு வழிமுறைகள்',
    booking_prep_no_fasting: 'உண்ணாவிரதம் தேவையில்லை: உங்கள் அமர்வுக்கு முன் சாதாரணமாக சாப்பிட்டு குடிக்கவும்.',
    booking_prep_id_verif: 'அடையாள சரிபார்ப்பு: உங்கள் அசல் NRIC அட்டை அல்லது Singpass மூலம் உள்நுழையவும்.',
    booking_prep_checklist: 'உங்கள் சந்திப்பிற்கு முன் முன்-ஆலோசனை சரிபார்ப்புப் பட்டியலை முடிக்கவும்',
    booking_view_checklist: 'முன்-சந்திப்பு சரிபார்ப்புப் பட்டியலைப் பார்',
    booking_reschedule_slot: 'முன்பதிவு மாற்றம்',
    booking_cancel_slot: 'சந்திப்பு முன்பதிவை ரத்து செய்',
    booking_eligible_subsidies: 'உங்கள் மருத்துவ பரிந்துரையின் அடிப்படையில், இந்த பதிவு செய்யப்பட்ட நிறுவனங்களில் 75% வரை MOH மானியங்களைப் பெற நீங்கள் தகுதியுடையவர்.',
    booking_nearest_tag: 'அருகிலுள்ள',
    booking_select_counselling_slot: 'ஆலோசனை நேரத்தைத் தேர்ந்தெடுக்கவும்',
    booking_choose_subsidized_slot: 'உங்களுக்கு மானியம் பெற்ற மரபணு ஆலோசனை நேரத்தைத் தேர்ந்தெடுக்கவும்.',
    booking_select_month: 'மாதத்தைத் தேர்ந்தெடு',
    booking_reschedule_alert: 'முன்பதிவு மாற்ற முறை செயலில் உள்ளது: கீழே புதிய நேரத்தைத் தேர்ந்தெடுக்கவும்.',
    booking_nric_verified: 'தயார் & பதிவு செய்யப்பட்டது • மருத்துவ சேர்க்கைக்கு முன் NRIC/Singpass சரிபார்க்கப்பட்டது.',
    booking_unverified_alert: 'வருகை சரிபார்க்கப்படவில்லை. வருகையை உறுதிப்படுத்த பூட்டுத் திரை அறிவிப்பு அல்லது அமைப்புகளைத் தட்டவும்.',
    booking_session_desc: 'குடும்ப கவலைகளுக்கு பதிலளிக்கவும் சோதனையை இறுதி செய்யவும் 45 நிமிட அமர்வு.',
    booking_setup_reminders: 'உங்கள் நினைவூட்டல் அறிவிப்புகள் & அதிர்வெண்ணை அமைக்கவும்',
    booking_review_details: 'முன்பதிவை சரிபார்க்கவும்',
    booking_confirm_slot_btn: 'முன்பதிவை உறுதி செய்',
    booking_add_calendar_success: 'ஆப்பிள் காலண்டர் .ics நிகழ்வு வெற்றிகரமாக பதிவிறக்கம் செய்யப்பட்டது!',
    profile_my_health_profile: 'எனது சுகாதார விவரக்குறிப்பு',
    profile_singpass_linked: 'Singpass இணைக்கப்பட்டுள்ளது',
    profile_moh_identity_cleared: 'MOH அடையாள சரிபார்ப்பு முடிந்தது',
    profile_personal_particulars: 'தனிப்பட்ட விவரங்கள்',
    profile_full_name: 'முழு பெயர்:',
    profile_nric_fin: 'NRIC/FIN:',
    profile_dob: 'பிறந்த தேதி:',
    profile_nationality: 'தேசியம்:',
    profile_mobile_number: 'கைபேசி எண்:',
    profile_email_address: 'மின்னஞ்சல் முகவரி:',
    profile_residential: 'இருப்பிடம்:',
    profile_clinical_metrics: 'மருத்துவ அளவீடுகள் & அபாயங்கள்',
    profile_blood_group: 'இரத்த வகை:',
    profile_height_weight: 'உயரம் / எடை:',
    profile_known_allergies: 'அறியப்பட்ட ஒவ்வாமைகள்:',
    profile_none_declared: 'ஒன்றுமில்லை',
    profile_cholesterol_level: 'கொலஸ்ட்rஆல் அளவு:',
    profile_elevated_risk: 'அதிக அபாயம்',
    profile_active_referral: 'செயலில் உள்ள பரிந்துரை:',
    profile_referred_by: 'இதயவியல் நிபுணரால் பரிந்துரைக்கப்பட்டது',
    profile_subsidies_financing: 'மானியங்கள் & நிதி',
    profile_chas_blue_member: 'CHAS ப்ளூ அடுக்கு உறுப்பினர்',
    profile_chas_subsidy_level: 'MOH மானியம் 75% வரை வரையறுக்கப்பட்டுள்ளது',
    profile_chas_card_expiry: 'CHAS அட்டை காலாவதி தேதி:',
    profile_medisave_account: 'MediSave கணக்கு:',
    profile_medisave_note: '*வெளிநோயாளி மரபணு ஆலோசனை மற்றும் சோதனை கட்டணங்களை MOH MediSave விதிகளின் கீழ் முழுமையாகப் பெறலாம்.',
    profile_family_cardiac_history: 'குடும்ப இதய வரலாறு',
    profile_family_history_desc: 'உயர் கொழுப்பு நிலை (FH) பெற்றோரிடமிருந்து பரவுகிறது. உங்கள் குடும்ப வரலாற்றை அறிவது சோதனைக்கு முக்கியமான பின்னணியை வழங்குகிறது:',
    journey_my_patient_journey: 'எனது சிகிச்சை பயணம்',
    journey_appointment_progress: 'உங்கள் சந்திப்பு முன்னேற்றம்',
    journey_appointment_status: 'சந்திப்பு நிலை',
    journey_interactive_referral_timeline: 'ஊடாடும் பரிந்துரை காலவரிசை',
    journey_referral_received: 'பரிந்துரை பெறப்பட்டது',
    journey_referral_received_desc: '12 ஜூலை 2026 அன்று இதயவியல் நிபுணரால் பரிந்துரைக்கப்பட்டது.',
    journey_edu_completed: 'கல்விப் பொருட்கள் மதிப்பாய்வு செய்யப்பட்டன',
    journey_edu_completed_desc: 'சிங்கப்பூர் ஹெல்த்ஹப்பில் மானியங்கள், மருத்துவ வீடியோ மற்றும் கேள்வி பதில்கள் சரிபார்க்கப்பட்டன.',
    journey_slot_booked: 'ஆலோசனை நேரம் முன்பதிவு செய்யப்பட்டது',
    journey_slot_booked_desc: '{date} அன்று {time} மணிக்கு NUH மரபணு கிளினிக்கில் திட்டமிடப்பட்டுள்ளது.',
    journey_slot_action_needed: 'நடவடிக்கை தேவை: உங்களுக்கு மானியம் பெற்ற மரபணு ஆலோசனை நேரத்தைத் தேர்ந்தெடுக்கவும்.',
    journey_attend_counselling: 'மரபணு ஆலோசனையில் பங்கேற்கவும்',
    journey_receive_results: 'மரபணு முடிவுகளைப் பெறவும்',
    journey_receive_results_desc: 'இரத்தம் எடுக்கப்பட்ட 4 வாரங்களுக்குப் பிறகு தடுப்பு நடவடிக்கைகள் மற்றும் சிகிச்சை பற்றிய கலந்துரையாடல்.',
    lock_healthhub_preview: 'பூட்டுத் திரை அறிவிப்பு முன்னோட்டம்',
    lock_just_now: 'இப்போது',
    lock_counselling_reminder: 'ஆலோசனை சந்திப்பு நினைவூட்டல்',
    lock_counselling_confirmed_msg: 'உங்கள் மரபணு ஆலோசனை {date} அன்று {time} மணிக்கு உறுதிப்படுத்தப்பட்டுள்ளது. சரிபார்ப்புப் பட்டியலை முடிக்க தட்டவும்.',
    lock_counselling_tap_confirm_msg: '{date} @ {time} மணிக்கு உங்கள் FH மரபணு ஆலோசனையை உறுதிப்படுத்தவும்.',
    lock_trigger_push_alert: 'பூட்டுத் திரை அறிவிப்பை உருவகப்படுத்து',
    lock_confirm_attendance_btn: 'வருகையை உறுதி செய்',
    lock_reschedule_btn: 'முன்பதிவு மாற்றம்',
    lock_read_prep_btn: 'தயாரிப்பு வழிகாட்டியைப் படி',
    lock_tap_confirm_db_msg: 'சிங்கப்பூர் ஹெல்த்ஹப் தரவுத்தளத்தில் உங்கள் வருகையை உடனடியாக பதிவு செய்ய "வருகையை உறுதி செய்" என்பதைத் தட்டவும்.',
    lock_swipe_hint: 'பதிவு செய்யப்பட்ட சான்றுகளைத் திறக்க மேலே ஸ்வைப் செய்யவும்',
    profile_female_age: 'பெண் • 36',
    profile_full_name_val: 'Lisa Ho Siew Lan',
    profile_dob_val: '14 ஆகஸ்ட் 1989 (36 வயது)',
    profile_nationality_val: 'சிங்கப்பூர் குடிமகன்',
    profile_residential_val: 'பிளாக் 451 ஆங் மோ கியோ அவென்யூ 10, #08-122, சிங்கப்பூர் 560451',
    profile_blood_group_val: 'O Rh+ (பாசிட்டிவ்)',
    profile_height_weight_val: '162 செ.மீ / 54 கிலோ (BMI 20.6)',
    profile_cholesterol_level_val: 'LDL 5.4 mmol/L (அதிகரித்த ஆபத்து)',
    profile_active_referral_val: 'FH மரபணு சோதனை',
    profile_referred_by_val: 'இருதய நோய் நிபுணரால் பரிந்துரைக்கப்பட்டது',
    profile_card_expiry_val: '31 டிசம்பர் 2028',
    profile_father_history: 'தந்தை (கண்டறியப்பட்ட வயது 48):',
    profile_father_history_desc: 'கொரோனரி இதய நோய் (ஆஞ்சியோபிளாஸ்டி & ஸ்டென்ட்)',
    profile_grandfather_history: 'தந்தைவழி பாட்டனார் (இறந்த வயது 52):',
    profile_grandfather_history_desc: 'மரணத்தை விளைவிக்கும் மாரடைப்பு (கடுமையான மாரடைப்பு)',
    profile_aunt_history: 'தந்தைவழி அத்தை:',
    profile_aunt_history_desc: 'கடுமையான கொலஸ்ட்ரால் (ஸ்டேடின்களுடன் சிகிச்சை)',
    profile_mother_history: 'தாய் மற்றும் உடன்பிறப்புகள்:',
    profile_mother_history_desc: 'ஆரம்பகால இதய நோய் வரலாறு இல்லை',
    profile_care_coordination: 'சிகிச்சை ஒருங்கிணைப்பு',
    profile_primary_clinic_val: 'ஆங் மோ கியோ பாலிக்ளினிக்',
    profile_referred_clinic_val: 'NUH மரபணு கிளினிக்',
    profile_emergency_contact_val: 'Ho Chin Teck',
    profile_relationship_no_val: 'துணைவி • 9876 5432',
    profile_privacy_statement: 'சிங்கப்பூரின் தேசிய தனியுரிமைச் சங்கங்கள் மற்றும் ஆயுள் காப்பீட்டுச் சங்கத்தின் (LIA) தற்காலிகத் தடை ஆகியவற்றின் கீழ் உங்கள் மரபணு விவரத் தரவு முழுமையாகப் பாதுகாக்கப்படுகிறது. உங்கள் வெளிப்படையான ஒப்புதல் இன்றி உங்கள் விவரங்கள் ஒருபோதும் பகிர込ま மாட்டாது.',
    settings_option_sms_only: 'எஸ்.எம்.எஸ் செய்திகள் மட்டும் (+65 9123 4567)',
    settings_option_push_only: 'ஹெல்த்ஹப் செயலி புஷ் அறிவிப்புகள்',
    settings_option_both: 'எஸ்.எம்.எஸ் மற்றும் புஷ் அறிவிப்புகள் இரண்டும் (பரிந்துரைக்கப்படுகிறது)',
    settings_help_sms: 'பதிவுசெய்யப்பட்ட உங்களது கைபேசி எண்ணிற்கு எஸ்.எம்.எஸ் மூலம் நினைவூட்டல் நேரடியாக அனுப்பப்படும்.',
    settings_help_push: 'ஹெல்த்ஹப் செயலியிலிருந்து நினைவூட்டல் உங்களது பூட்டுத் திரையில் தோன்றும்.',
    settings_help_both: 'எஸ்.எம்.எஸ் மற்றும் புஷ் அறிவிப்புகள் இரண்டிலும் நினைவூட்டல்கள் அனுப்பப்படும்.',
    settings_freq_monthly: 'மாதாந்திர தகவல் (கல்விப் பொருட்கள்)',
    settings_freq_2_weeks: '2 வாரங்களுக்கு முன்பு (தொடக்க நினைவூட்டல்)',
    settings_freq_1_week: '1 வாரத்திற்கு முன்பு (அதிக பாதுகாப்பு கொண்டது)',
    settings_freq_1_day: '1 நாளுக்கு முன்பு (இறுதி தயாரிப்பு சரிபார்ப்பு)',
    settings_sms_preview_title: 'எஸ்.எம்.எஸ் நினைவூட்டல் முன்னோட்டம்',
    settings_sms_verified_sender: 'அங்கீகரிக்கப்பட்ட MOH அனுப்புநர்',
    settings_lockscreen_preview_title: 'பூட்டுத் திரை அறிவிப்பு முன்னோட்டம்',
    settings_lockscreen_header: 'ஹெல்த்ஹப் சிங்கப்பூர் • இப்போது',
    settings_sms_prefix: 'MOH HealthHub: {date} அன்று {time} மணிக்கு NUH மரபணு கிளினிக்கில் உங்கள் FH ஆலோசனை உறுதிப்படுத்தப்பட்டுள்ளது. 75% வரை மானியம் வழங்கப்பட்டுள்ளது. Singpass கொண்டு வரவும். விவரம்: https://hh.gov.sg/fh-ref',
    journey_prep_title: 'தயாரிப்பு சரிபார்ப்புப் பட்டியல்',
    journey_prep_desc: 'நீங்கள் எதை எதிர்பார்க்க வேண்டும் மற்றும் என்ன குடும்ப வரலாற்று அறிக்கைகளைக் கொண்டு வர வேண்டும் என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள். எங்கள் வழிகாட்டிகளைப் படிக்கவும்.',
    journey_review_checklist_btn: 'சரிபார்ப்பு பட்டியலை இப்போது சரிபார்க்கவும்',
    lockscreen_telco: 'சிங்கப்பூர் தொலைத்தொடர்பு',
    lockscreen_date: 'புதன்கிழமை, ஜூலை 15, 2026',
    lockscreen_days_left: '7 நாட்கள் உள்ளன',
    lockscreen_push_msg: 'உங்கள் மரபணு ஆலோசனை {date} அன்று {time} மணிக்கு உறுதிப்படுத்தப்பட்டுள்ளது. சரிபார்ப்புப் பட்டியலை முடிக்க தட்டவும்.',
    lockscreen_tap_confirm_info: 'சிங்கப்பூர் ஹெல்த்ஹப் தரவுத்தளத்தில் உங்கள் வருகையை உடனடியாக பதிவு செய்ய "வருகையை உறுதி செய்" என்பதைத் தட்டவும்.',
    lockscreen_swipe_hint: 'பதிவு செய்யப்பட்ட சான்றுகளைத் திறக்க மேலே ஸ்வைப் செய்யவும்',
    booking_subsidies_computed: 'உங்களது இணைக்கப்பட்ட Singpass நிலை மூலம் MOH மானியங்கள் தானாகவே கணக்கிடப்படும்.',
    booking_no_slots_alert: 'இந்த தேதியில் முன்பதிவு செய்ய இடங்கள் இல்லை. மேலே உள்ள காலண்டரில் சிறப்பிக்கப்பட்டுள்ள நாளைத் தேர்ந்தெடுக்கவும்.',
    booking_assigned_specialist: 'ஒதுக்கப்பட்ட மருத்துவ நிபுணர்',
    booking_address_label: 'முகவரி:',
    booking_date_label: 'தேதி:',
    booking_time_label: 'நேரம்:',
    booking_duration_label: 'அமர்வின் கால அளவு:',
    booking_out_of_pocket_label: 'மதிப்பிடப்பட்ட மொத்தக் கட்டணம்:',
    // Bottom Navigation Bar
    nav_home: 'முகப்பு',
    nav_learn: 'கற்க',
    nav_book: 'முன்பதிவு',
    nav_journey: 'பயணம்',
    nav_profile: 'விவரக்குறிப்பு',
    // Home Page Profiles
    home_profile_lisa: 'லிசா ஹோ (LISA HO)',
    home_profile_spouse: 'ஹோ சின் டெக் (HO CHIN TECK)',
    // Home Page Programmes
    prog_active_hub: 'செயலில் உள்ள மையம்',
    prog_diabetes_title: 'நீரிழிவு மையம்',
    prog_diabetes_desc: 'நீரிழிவு நோயை நிர்வகிப்பதற்கும் தடுப்பதற்கும் தனிப்பயனாக்கப்பட்ட வழிகாட்டிகள்.',
    prog_resource: 'வளங்கள்',
    prog_mental_title: 'மன நலம்',
    prog_mental_desc: 'உணர்ச்சி பாதுகாப்புக்கான தியான வழிகாட்டிகள் மற்றும் ஆதரவு நெட்வொர்க்குகள்.',
    // Book Screen Selector Buttons
    booking_close_selector_btn: 'தேர்வியைக் மூடு',
    booking_change_estate_btn: 'எஸ்டேட் / ஜிபிஎஸ் மாற்றவும்',
    // Clinic Names & Addresses
    clinic_nuh_name: 'தேசிய பல்கலைக்கழக மருத்துவமனை மரபணு கிளினிக் (NUH)',
    clinic_nuh_address: '5 லோயர் கென்ட் ரிட்ஜ் ரோடு, முதன்மை கட்டிடம் மண்டலம் B, சிங்கப்பூர் 119074',
    clinic_sgh_name: 'சிங்கப்பூர் பொது மருத்துவமனை மரபியல் சேவை (SGH)',
    clinic_sgh_address: 'அவுட்ராம் ரோடு, கல்வி மருத்துவம் அடித்தளம் 1, சிங்கப்பூர் 169608',
    clinic_ttsh_name: 'டான் டோக் செங் மருத்துவமனை மருத்துவ மரபியல் (TTSH)',
    clinic_ttsh_address: '11 ஜாலான் டான் டோக் செங், கிளினிக் 4B, சிங்கப்பூர் 308433',
    clinic_kkh_name: 'கேகே பெண்கள் மற்றும் குழந்தைகள் மருத்துவமனை மரபணு கிளினிக் (KKH)',
    clinic_kkh_address: '100 புக்கிட் திமா ரோடு, குழந்தைகள் கோபுரம் நிலை 5, சிங்கப்பூர் 229899',
    // Doctors
    doc_helen_lim: 'டாக்டர் ஹெலன் லிம்',
    doc_albert_chiang: 'டாக்டர் ஆல்பர்ட் சியாங்',
    doc_marcus_goh: 'டாக்டர் மார்கஸ் கோ',
    doc_fiona_lee: 'டாக்டர் பியோனா லீ',
    doc_benjamin_chew: 'டாக்டர் பெஞ்சமின் செவ்',
    doc_sarah_tan: 'டாக்டர் சாரா டான்',
    doc_claire_wong: 'டாக்டர் கிளாரி வோங்',
    doc_jeanette_tan: 'டாக்டர் ஜீனெட் டான்',
    // Specialist Roles
    role_senior_genetic_counsellor: 'மூத்த மரபணு ஆலோசகர்',
    role_consultant_cardiogeneticist: 'இருதய மரபியல் ஆலோசகர்',
    role_principal_genetics_specialist: 'முதன்மை மரபியல் நிபுணர்',
    role_senior_clinical_geneticist: 'முதுநிலை மருத்துவ மரபியல் நிபுணர்',
    role_consultant_paediatric_geneticist: 'குழந்தை மருத்துவ மரபியல் ஆலோசகர்',
    role_lead_paediatric_counsellor: 'முதன்மை குழந்தை மருத்துவ ஆலோசகர்',
    role_consultant_geneticist: 'மரபியல் ஆலோசகர்',
    chatbot_greeting: "வணக்கம்! நான் **HealthBuddy**, உங்கள் GovTech சிங்கப்பூர் FH உதவியாளர். **FH (Familial Hypercholesterolaemia)**, சோதனை கட்டணங்கள், காப்பீட்டு பாதுகாப்பு மற்றும் முன்பதிவு பற்றிய கேள்விகளுக்கு நான் உதவலாம். இன்று என்ன அறிய விரும்புகிறீர்கள்?",
    chatbot_placeholder: 'மானியங்கள், காப்பீட்டு பாதுகாப்பு, தயாரிப்பு பற்றி கேளுங்கள்...',
    chatbot_quick_insurance: 'இது என் காப்பீட்டை பாதிக்குமா?',
    chatbot_quick_cost: 'FH சோதனைக்கு எவ்வளவு கட்டணம்?',
    chatbot_quick_family: 'இது என் குடும்பத்தை பாதிக்குமா?',
    chatbot_quick_prep: 'நான் என்ன தயார் செய்ய வேண்டும்?',
    chatbot_footer: 'MOH சிங்கப்பூர் மற்றும் GovTech அலுவலக கொள்கை பதில்களை வழங்குகிறேன்.',
    chatbot_online: 'GovTech ஆதரவு - ஆன்லைன்',
    chatbot_title: 'HealthBuddy உதவியாளர்',
    chatbot_reset: 'உரையாடலை மீட்டமை',
    chatbot_banner_title: 'FH மரபணு சோதனை குறித்து கவலைகள் உள்ளதா?',
    chatbot_banner_body: 'CHAS மானியங்கள், காப்பீட்டு பாதுகாப்பு மற்றும் கிளினிக் தயாரிப்பு குறித்து உடனடி, பாதுகாப்பான பதில்களைப் பெறுங்கள்.',
    edu_hub_title: 'கல்வி மையம்',
    edu_note: 'தயவுசெய்து கவனிக்கவும்: மரபணு சோதனைக்கு பரிந்துரைக்கப்படுவது உங்களுக்கு FH இருப்பதாக அர்த்தமில்லை. இது உங்கள் இயற்கையான அபாயத்தை மதிப்பிட ஒரு முன்னெச்சரிக்கை நடவடிக்கை மட்டுமே.',
    edu_video_title: '▶ FH சோதனையின் போது என்ன நடக்கும்?',
    edu_video_subtitle: 'உங்கள் சந்திப்பிற்கு முன் என்ன எதிர்பார்க்கலாம் என்று அறிந்துகொள்ளுங்கள்.',
    edu_play_story: 'கதையை இயக்கு',
    edu_pause_story: 'கதையை இடைநிறுத்து',
    edu_view_transcript: 'படியெடுப்பைக் காண்க',
    edu_hide_transcript: 'படியெடுப்பை மறை',
    edu_video_story_label: 'நோயாளி அனுபவக் கதை (Chloe, 21)',
    edu_video_frame_0: '"நான் ஆரோக்கியமாக உண்ணுகிறேன் மற்றும் சுறுசுறுப்பாக இருக்கிறேன். அதிக கொலஸ்ட்ரால் மூத்தவர்களுக்கு அல்லது ஆரோக்கியமற்ற வாழ்க்கை முறை கொண்டவர்களுக்கு மட்டுமே என நான் நினைத்தேன்."',
    edu_video_frame_1: '"மரபணு ஆலோசகர் என்னை வற்புறுத்தவில்லை. அவர்கள் உண்மைகளை மட்டுமே முன்வைத்து முடிவெடுக்க எனக்கு விட்டுவிட்டார்கள்."',
    edu_video_frame_2: '"இருக்கும் சுகாதார காப்பீடு முழுமையாக பாதுகாக்கப்பட்டுள்ளது, மேலும் MOH மானியங்கள் செலவின் 75% வரை ஈடுசெய்கிறது என நான் அறிந்தேன்."',
    edu_video_frame_3: '"தெளிவான உண்மைகளை அறிந்துகொள்வது என் ஆரோக்கியத்தை கட்டுப்பாட்டில் வைக்கவும், ஆரோக்கியமாக இருக்க எனக்கு தெளிவைத் தந்ததால் சோதனை செய்ய முடிவு செய்தேன்."',
    edu_video_transcript_title: 'வீடியோ படியெடுப்பு & வசனம்',
    edu_video_transcript_1: '"அனைவருக்கும் வணக்கம், நான் Chloe. ஒரு பரிசோதனை என் LDL கொலஸ்ட்ரால் மிக அதிகமாக இருப்பதைக் காட்டியபோது, நான் முற்றிலும் குழப்பமடைந்தேன். நான் ஆரோக்கியமான வாழ்க்கை முறை, தொடர்ச்சியான உடற்பயிற்சி, மற்றும் சரியான உணவு கொண்டவனாக இருந்ததால், அதிக கொலஸ்ட்ரால் வயதானவர்களுக்கு மட்டுமே அல்லது ஆரோக்கியமற்ற வாழ்க்கை முறை கொண்டவர்களுக்கு மட்டுமே என நான் நினைத்தேன். என் மருத்துவர் FH பிறப்பிலிருந்தே மரபணு ரீதியாக பெறப்படுகிறது என விளக்கினார்—வாழ்க்கை முறை அல்லது வயதுடன் எந்த தொடர்பும் இல்லை."',
    edu_video_transcript_2: '"மரபணு ஆலோசனை பற்றி நான் ஆரம்பத்தில் சந்தேகம் கொண்டிருந்தேன், ஆனால் ஆலோசகர் என்னை வற்புறுத்த முயற்சிக்கவில்லை. அவள் மரபணுக்கள் எப்படி வேலை செய்கின்றன என்பதை விளக்கினாள், தனியுரிமை பற்றிய என் கேள்விகளுக்கு பதிலளித்தாள், மேலும் முடிவை முழுமையாக எனக்கே விட்டுவிட்டாள்."',
    edu_video_transcript_3: '"நாங்கள் நடைமுறை அம்சங்களையும் விவாதித்தோம். சிங்கப்பூர் வழிகாட்டுதல்களின் கீழ், இருக்கும் சுகாதார காப்பீட்டை மாற்ற முடியாது, மேலும் MOH செலவின் 75% வரை ஈடுசெய்கிறது என அவள் தெளிவுபடுத்தினாள். எந்த மறைக்கப்பட்ட சிக்கல்களும் இல்லை."',
    edu_video_transcript_4: '"இறுதியில், இரத்த பரிசோதனை செய்ய முடிவு செய்தேன். உண்மைகளை அறிந்துகொள்வது நான் யார் என்பதை மாற்றவில்லை, ஆனால் ஆரோக்கியமாக இருக்க எனக்கு தெளிவைத் தந்தது. இது உங்கள் உடலை அறிந்துகொள்வதற்கானது, பயத்தில் வாழ்வதற்கல்ல."',
    booking_header_title: 'சந்திப்பை பதிவு செய்',
    faq_title: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    faq_category_all: 'அனைத்தும்',
    faq_category_cost: 'கட்டணம்',
    faq_category_insurance: 'காப்பீடு',
    faq_category_testing: 'பரிசோதனை',
    faq_category_medication: 'மருந்து',
    edu_did_you_know: 'உங்களுக்கு தெரியுமா?',
    edu_stat1_label: 'சிங்கப்பூரர்களுக்கு FH உள்ளது',
    edu_stat1_body: 'பெரும்பாலானோர் நினைப்பதை விட அதிகம் — 22,000க்கும் மேற்பட்ட சிங்கப்பூரர்கள் பாதிக்கப்பட்டுள்ளனர்.',
    edu_stat2_label: 'கண்டறியப்படவில்லை',
    edu_stat2_body: 'FH உள்ள 10 பேரில் 9 பேருக்கு தங்களுக்கு இது இருப்பதாக தெரியாது.',
    edu_stat3_label: 'இதய அபாயம் குறைவு',
    edu_stat3_body: 'ஆரம்ப நோயறிதல் மற்றும் எளிய சிகிச்சை மிகவும் பெரிய மாற்றத்தை ஏற்படுத்துகின்றன.',
    edu_stat4_label: 'குடும்ப அபாயம்',
    edu_stat4_body: 'ஒவ்வொரு பெற்றோர், உடன்பிறந்தவர் அல்லது குழந்தைக்கும் 50% மரபு வாய்ப்பு உள்ளது.',
    edu_learning_hub: 'கற்றல் மையம்',
    edu_modules_summary: '3 தொகுதிகள் • 6 தலைப்புகள்',
    edu_group_basics_title: 'FH மற்றும் மருந்துகளை புரிந்துகொள்ளுங்கள்',
    edu_group_basics_desc: 'மரபணு நிலை, உடல் அறிகுறிகள் மற்றும் நிலையான சிகிச்சைகளைப் பற்றி அறிந்துகொள்ளுங்கள்.',
    edu_group_journey_title: 'உங்கள் மருத்துவ பயணம்',
    edu_group_journey_desc: 'சோதனை மற்றும் உங்கள் குடும்பத்தை பாதுகாக்க படிப்படியான வழிகாட்டி.',
    edu_group_costs_title: 'மானியங்கள் & பாதுகாப்புகள்',
    edu_group_costs_desc: 'MOH மானியங்கள், MediSave காப்பீடு மற்றும் உங்கள் சட்ட காப்பீட்டு உரிமைகள்.',
    booking_mins: 'நிமிடம்',
    chatbot_fallback_insurance: "சிங்கப்பூர் **LIA இடைநிறுத்த உடன்படிக்கையின்** படி, காப்பீட்டு நிறுவனங்கள் உங்கள் மரபணு சோதனை முடிவுகளை வெளியிடுமாறு **கோரக்கூடாது**. **MediShield Life** போன்ற தற்போதைய திட்டங்கள் முற்றிலும் பாதிக்கப்படாது.",
    chatbot_fallback_cost: "FH சோதனைக்கு தகுதியுள்ள சிங்கப்பூரியர்களுக்கு MOH **50–75%** மானியம் வழங்குகிறது. சொந்த செலவு பொதுவாக **S$50 முதல் S$120** வரை இருக்கும், **MediSave மூலம் முழுமையாக செலுத்தலாம்**.",
    chatbot_fallback_family: "FH மரபுவழியில் பரவுகிறது — நெருங்கிய குடும்பத்தினருக்கு **50% வாய்ப்பு** உள்ளது. உங்கள் குழு **cascade screening** ஒருங்கிணைத்து குடும்பத்தை பாதுகாக்கும்.",
    chatbot_fallback_prep: "உண்ணாவிரதம் தேவையில்லை! **குடும்ப மருத்துவ வரலாறு**, **தற்போதைய மருந்துகள்**, மற்றும் **Singpass** தயாராக வையுங்கள். 30 நிமிட ஆலோசனை முதலில் வழிகாட்டும்.",
    chatbot_fallback_default: "FH சோதனை குறித்து உதவ நான் இங்கே இருக்கிறேன். உங்கள் பரிந்துரை ஒரு **மானியம் பெற்ற, பாதுகாக்கப்பட்ட தடுப்பு பரிசோதனை**. **கற்றல்** அல்லது **முன்பதிவு** தாவலை பாருங்கள்.",
    chatbot_close: 'அரட்டையை மூடு',
    // Home quick links
    link_ask_ai: 'AI கேள்',
    link_help_desk: 'உதவி மையம்',
    link_medical_reports: 'மருத்துவ அறிக்கைகள்',
    link_medication_refill: 'மருந்து நிரப்புதல்',
    link_payment: 'கட்டணம்',
    link_programmes: 'திட்டங்கள்',
    // Notifications popup
    notif_header: 'அறிவிப்புகள்',
    notif_close: 'மூடு',
    notif_referral_title: 'FH மரபணு பரிந்துரை செயலில் உள்ளது',
    notif_referral_desc: 'உங்கள் மருத்துவ பரிந்துரை செயலில் உள்ளது. மருத்துவர் சோதனையை ஏன் பரிந்துரைத்தார் என படியுங்கள்.',
    notif_referral_time: '2 மணி நேரம் முன்',
    notif_booking_booked: 'ஆலோசனை முன்பதிவு உறுதி செய்யப்பட்டது',
    notif_booking_unbooked: 'நடவடிக்கை தேவை: ஆலோசனை முன்பதிவு செய்யவும்',
    notif_booking_confirmed_msg: 'சோதனைக்கு முந்தைய மரபணு ஆலோசனை {date} @ {time} அன்று உறுதி செய்யப்பட்டது.',
    notif_booking_pending_msg: 'உங்கள் சோதனைக்கு முந்தைய மரபணு ஆலோசனை நேரத்தை முன்பதிவு செய்யவும்.',
    notif_time_just_now: 'இப்போதே',
    notif_time_1d_ago: '1 நாள் முன்',
    // Cancel flow
    cancel_worries_text: 'கட்டணம், பாதுகாப்பு அல்லது செயல்முறை பற்றி கவலைகளா?',
    cancel_address_concerns: 'எங்கள் பிரிவில் உங்கள் கவலைகளை தீர்க்கவும்',
    cancel_faq_link: 'கேள்வி பதில் பிரிவு',
    cancel_if_need_diff_time: 'வேறு நேரம் தேவைப்பட்டால், திட்டத்தில் உங்கள் இடத்தை இழக்காமல் மீட்டமைக்கலாம்.',
    cancel_reschedule_btn: 'மாறாக மீண்டும் திட்டமிடுங்கள்',
    cancel_continue_btn: 'ரத்து செய்யத் தொடரவும்',
    cancel_confirm_title: 'ரத்தை உறுதி செய்யவும்',
    cancel_confirm_desc: 'ரத்து செய்வதால் இந்த முன்பதிவு நேரம் விடுவிக்கப்படும். எப்போது வேண்டுமானாலும் மீண்டும் முன்பதிவு செய்யலாம், ஆனால் கிடைக்கும் தன்மை மாறலாம்.',
    cancel_yes_btn: 'ஆம், இந்த சந்திப்பை ரத்து செய்',
    cancel_keep_btn: 'என் சந்திப்பை வைத்திரு',
    cancel_success_title: 'உங்கள் சந்திப்பு ரத்து செய்யப்பட்டது.',
    cancel_success_desc: 'நீங்கள் தயாராக இருக்கும்போது புதிய நேரத்தை முன்பதிவு செய்யலாம்.',
    cancel_book_new_btn: 'புதிய சந்திப்பை முன்பதிவு செய்',
    cancel_return_home: 'முகப்புக்கு திரும்பு',
    // Reschedule flow
    reschedule_select_title: 'புதிய நேரத்தைத் தேர்வு செய்யவும்',
    reschedule_current_appt: 'தற்போதைய சந்திப்பு',
    reschedule_choose_desc: 'மாற்று கிளினிக், தேதி மற்றும் நேரத்தை தேர்வு செய்யவும். மீட்டமைக்கும் வரை தற்போதைய சந்திப்பு செல்லுபடியாகும்.',
    reschedule_select_clinic: 'கிளினிக்கை தேர்வு செய்யவும்',
    reschedule_nearest: 'அருகில்',
    reschedule_no_slots: 'இந்த நாளில் கிடைக்கும் நேரங்கள் இல்லை.',
    reschedule_keep_current: 'தற்போதைய சந்திப்பை வைத்திரு',
    reschedule_review_title: 'மாற்றத்தை சரிபார்க்கவும்',
    reschedule_review_desc: 'உறுதி செய்வதற்கு முன் மாற்றத்தை சரிபார்க்கவும். மீட்டமைப்பை உறுதிப்படுத்தும் வரை தற்போதைய சந்திப்பு செயலில் இருக்கும்.',
    reschedule_new_appt: 'புதிய சந்திப்பு',
    reschedule_confirm_btn: 'மீட்டமைப்பை உறுதி செய்',
    reschedule_different_slot: 'வேறு நேரத்தை தேர்வு செய்யவும்',
    reschedule_success_title: 'சந்திப்பு மீட்டமைக்கப்பட்டது.',
    reschedule_success_desc: 'உங்கள் சந்திப்பு புதுப்பிக்கப்பட்டது.',
    reschedule_done_btn: 'முடிந்தது',
    // Profile screen
    profile_my_profile: 'என் சுயவிவரம்',
    profile_section_personal: 'தனிப்பட்ட தகவல்',
    profile_section_contact: 'தொடர்பு தகவல்',
    profile_section_emergency: 'அவசர தொடர்பு',
    profile_section_healthcare: 'சுகாதார விருப்பங்கள்',
    profile_section_medical: 'மருத்துவ தகவல்',
    profile_section_account: 'கணக்கு',
    profile_label_full_name: 'முழு பெயர்',
    profile_label_dob: 'பிறந்த தேதி',
    profile_label_gender: 'பாலினம்',
    profile_label_nric: 'அடையாள அட்டை / சுகாதார ID',
    profile_label_preferred_lang: 'விரும்பிய மொழி',
    profile_label_mobile: 'கைபேசி எண்',
    profile_label_email: 'மின்னஞ்சல் முகவரி',
    profile_label_address: 'குடியிருப்பு முகவரி',
    profile_label_contact_name: 'தொடர்பு பெயர்',
    profile_label_relationship: 'உறவு',
    profile_label_phone: 'தொலைபேசி எண்',
    profile_label_preferred_clinic: 'விரும்பிய கிளினிக்',
    profile_label_ldl: 'LDL கொழுப்பு',
    profile_label_active_referrals: 'செயலில் உள்ள பரிந்துரைகள்',
    profile_label_upcoming_appts: 'வரவிருக்கும் சந்திப்புகள்',
    profile_fh_testing_badge: 'FH மரபணு சோதனை (MOH மானியம்)',
    profile_no_appointments: 'திட்டமிடப்பட்ட சந்திப்புகள் இல்லை',
    profile_book_session_now: 'ஆலோசனை அமர்வை இப்போதே முன்பதிவு செய்',
    profile_view_reminder_settings: 'நினைவூட்டல் & அறிவிப்பு அமைப்புகளைக் காண்க',
    profile_label_linked_account: 'இணைக்கப்பட்ட HealthHub கணக்கு',
    profile_label_privacy: 'தனியுரிமை அமைப்புகள்',
    profile_verified_singpass: 'Singpass மூலம் சரிபார்க்கப்பட்டது',
    profile_privacy_registry: 'தேசிய மரபணு பதிவேட்டில் பாதுகாப்பானது',
    profile_logout: 'HealthHub இலிருந்து வெளியேறு',
    profile_yrs: 'வயது',
    gender_male: 'ஆண்',
    gender_female: 'பெண்',
    // Booking screen – location / calendar
    booking_location_label: 'இடம்:',
    booking_change_location: 'இடத்தை மாற்று',
    booking_default_address: 'இயல்புநிலை முகவரி',
    booking_search_location: 'இடத்தை தேடு:',
    booking_detecting: 'கண்டறிகிறது...',
    booking_live_location: 'நேரடி இடம்',
    booking_search_results: 'தேடல் முடிவுகள்:',
    booking_suggestions: 'பரிந்துரைகள்:',
    booking_no_matches: 'பொருத்தம் இல்லை. கீழே கிளிக் செய்யவும்:',
    booking_distance: 'தூரம்:',
    booking_nearest_clinic: 'அருகிலுள்ள கிளினிக்',
    booking_legend_today: 'இன்று',
    booking_legend_selected: 'தேர்ந்த நாள்',
    booking_km_away: 'கி.மீ தொலைவு',
    // Learn FH screen
    edu_learning_guide_title: 'உங்கள் FH கற்றல் வழிகாட்டி',
    edu_learning_guide_subtitle: 'FH மரபணு சோதனைக்கு பரிந்துரைக்கப்பட்ட பின், ஏன் மற்றும் எவ்வாறு தயார் செய்வது என்பதற்கான தனிப்பட்ட வழிகாட்டி.',
    edu_tab_guides: 'வழிகாட்டிகள்',
    edu_tab_checklist: 'சரிபார்ப்பு பட்டியல்',
    edu_tab_faqs: 'கேள்வி-பதில் & இணைப்புகள்',
    edu_topics: 'தலைப்புகள்',
    edu_helpful_resources: 'பயனுள்ள வளங்கள்',
    edu_view_resource: 'வளத்தை காண்க',
    edu_checklist_progress_title: 'தயாரிப்பு முன்னேற்றம்',
    edu_checklist_progress_detail: '{completed}-ல் {total} நிறைவுற்றது ({percent}%)',
    edu_checklist_progress_success: 'அருமை! உங்கள் ஆலோசனைக்கு நீங்கள் முழுமையாக தயாராகிவிட்டீர்கள்.',
    edu_checklist_progress_desc: 'மரபணு ஆலோசகருடனான உங்கள் சந்திப்பை மிகவும் பயனுள்ளதாக்க, இந்த எளிய படிகளைச் சந்திப்பிற்கு முன் முடிக்கவும்.',
    edu_checklist_card_title: 'ஆலோசனைக்கு முந்தைய சரிபார்ப்புப் பட்டியல்',
    edu_checklist_card_desc: 'இந்த எளிய பணிகளை முடிப்பது சந்திப்பு குறித்த கவலையைக் குறைக்கிறது மற்றும் மிகவும் தனிப்பயனாக்கப்பட்ட கவனிப்பை உறுதி செய்கிறது:',
    patient_label: 'நோயாளி',
    edu_hi_greeting: 'வணக்கம் {name},',
    edu_cta_title: 'உங்கள் GAC ஆலோசனை நேரத்தை முன்பதிவு செய்ய தயாரா?',
    edu_cta_subtitle: 'இன்றே செயலில் ஈடுபடுங்கள். HealthHub-ல் முன்பதிவு 20 வினாடிகளுக்கும் குறைவாக ஆகும்.',
    edu_cta_btn: 'பாதுகாப்பான முன்பதிவுக்கு செல்க',
    edu_key_takeaway: 'முக்கிய கருத்து',
    edu_doc_page_of: 'பக்கம் {current} / {total}',
    edu_website_btn: 'இணையதளம்',
    edu_print_btn: 'அச்சிடுக',
    edu_page_label: 'பக்கம்',
    edu_prev_btn: 'முந்தைய',
    edu_next_btn: 'அடுத்த பக்கம்',
    edu_finish_btn: 'வாசித்து முடிந்தது',
    not_on_file: 'பதிவேட்டில் இல்லை',
    not_yet_assigned: 'இன்னும் ஒதுக்கப்படவில்லை',
    sms_today: 'இன்று',
    concern_test_desc: 'மரபணு சோதனைக்கு முன், அதன் போது மற்றும் அதற்குப் பிறகு என்ன நடக்கும் என்பதை அறிந்து கொள்ளுங்கள்.',
  },
};

// Localized preCounsellingChecklist
export const getLocalizedChecklist = (
  lang: Language,
  familiarity?: string | null,
  topics: string[] = [],
  concerns: string[] = []
) => {
  const t = (key: string): string => {
    return UI_TRANSLATIONS[lang]?.[key] || UI_TRANSLATIONS['en']?.[key] || key;
  };

  // 1. Mandatory items (always shown)
  const items = [
    { id: 'mandatory_nric', text: t('mandatory_nric'), checked: false, isPersonalized: false },
    { id: 'mandatory_meds', text: t('mandatory_meds'), checked: false, isPersonalized: false },
  ];

  // If onboarding is completed (or details are provided), add personalized tasks
  if (familiarity) {
    // 2. Knowledge-based preparation tasks
    if (familiarity === 'new' || familiarity === 'beginner') {
      items.push({ id: 'knowledge_new', text: t('knowledge_new'), checked: false, isPersonalized: true });
    } else if (familiarity === 'little' || familiarity === 'research' || familiarity === 'intermediate') {
      items.push({ id: 'knowledge_little_research', text: t('knowledge_little_research'), checked: false, isPersonalized: true });
    } else if (familiarity === 'advanced') {
      items.push({ id: 'knowledge_advanced', text: t('knowledge_advanced'), checked: false, isPersonalized: true });
    }

    // 3. Topic-based preparation tasks
    if (
      topics.includes('topic-costs') ||
      topics.includes('topic-subsidies') ||
      topics.includes('costs-subsidies') ||
      topics.includes('costs')
    ) {
      items.push({ id: 'topic_costs', text: t('topic_costs'), checked: false, isPersonalized: true });
    }
    if (
      topics.includes('topic-insurance') ||
      topics.includes('insurance-rights') ||
      topics.includes('insurance')
    ) {
      items.push({ id: 'topic_insurance', text: t('topic_insurance'), checked: false, isPersonalized: true });
    }
    if (
      topics.includes('topic-family') ||
      topics.includes('cascade-screening') ||
      topics.includes('family')
    ) {
      items.push({ id: 'topic_family', text: t('topic_family'), checked: false, isPersonalized: true });
    }
    if (
      topics.includes('topic-treatment') ||
      topics.includes('topic-medication') ||
      topics.includes('treatment-medication') ||
      topics.includes('medication')
    ) {
      items.push({ id: 'topic_treatment', text: t('topic_treatment'), checked: false, isPersonalized: true });
    }

    // 4. Concern-based preparation tasks
    if (
      concerns.includes('concern-test') ||
      concerns.includes('concern-testing') ||
      concerns.includes('testing-process') ||
      concerns.includes('test')
    ) {
      items.push({ id: 'concern_test', text: t('concern_test'), checked: false, isPersonalized: true });
    }
    if (
      concerns.includes('concern-family') ||
      concerns.includes('family')
    ) {
      items.push({ id: 'concern_family', text: t('concern_family'), checked: false, isPersonalized: true });
    }
    if (
      concerns.includes('concern-cost') ||
      concerns.includes('concern-costs') ||
      concerns.includes('cost')
    ) {
      items.push({ id: 'concern_cost', text: t('concern_cost'), checked: false, isPersonalized: true });
    }
    if (
      concerns.includes('concern-insurance') ||
      concerns.includes('insurance')
    ) {
      items.push({ id: 'concern_insurance', text: t('concern_insurance'), checked: false, isPersonalized: true });
    }
  } else {
    // Fallback/standard items when onboarding is skipped or not completed yet
    items.push({
      id: 'prep_review',
      text: t('edu_checklist_progress_desc') || 'Review Learn section for resources and common questions',
      checked: false,
      isPersonalized: false,
    });
  }

  return items;
};

// Localized educationalSections
export const getLocalizedEducationalSections = (lang: Language): EduSection[] => {
  switch (lang) {
    case 'ms':
      return [
        {
          id: 'what-is-fh',
          title: 'Apakah itu FH?',
          shortSummary: 'Apakah itu FH dan mengapa diagnosis awal sangat penting.',
          readingTime: 'Masa membaca: 3 minit',
          content: "Familial Hypercholesterolaemia (FH) adalah keadaan keturunan yang menghalang badan daripada membersihkan kolesterol LDL 'buruk' daripada darah. Berbeza dengan kolesterol tinggi biasa yang disebabkan oleh diet atau gaya hidup, tahap kolesterol FH adalah sangat tinggi sejak lahir, yang boleh merosakkan saluran darah secara senyap dan meningkatkan risiko penyakit jantung awal.",
          keyTakeaway: 'FH sepenuhnya genetik dan hadir sejak lahir, bermakna terapi perubatan hampir sentiasa diperlukan bersama tabiat sihat.',
          iconName: 'BookOpen',
          tags: ['kolesterol', 'genetik', 'kesihatan jantung'],
          subsections: [
            {
              title: 'BERAPA BIASAKAH IA BERLAKU?',
              text: 'FH menjejaskan kira-kira 1 daripada 250 rakyat Singapura. Kebanyakan orang dengan FH tidak menyedari mereka menghidapinya sehinggalah mereka menerima ujian genetik.'
            },
            {
              title: 'ADAKAH IA SALAH SAYA?',
              text: 'Tidak. FH sepenuhnya genetik. Ia diwarisi daripada ibu bapa dan tidak boleh diselesaikan melalui diet atau senaman sahaja—walaupun tabiat sihat masih penting.'
            }
          ]
        },
        {
          id: 'why-testing-matters',
          title: 'Melindungi Keluarga Anda',
          shortSummary: 'Bagaimana saringan lata memastikan orang tersayang selamat.',
          readingTime: 'Masa membaca: 3 minit',
          content: "Ujian genetik adalah standard emas untuk mengesahkan jika anda mempunyai FH. Menemui variasi gen khusus yang bertanggungjawab terhadap kolesterol tinggi membolehkan doktor menyesuaikan penjagaan pencegahan anda dan melindungi orang yang paling anda sayangi.",
          keyTakeaway: 'Satu ujian boleh melindungi kedua-dua diri anda dan orang yang anda sayangi.',
          iconName: 'Users',
          tags: ['keluarga', 'saringan lata', 'anak-anak'],
          subsections: [
            {
              title: 'MELINDUNGI KELUARGA ANDA (SARINGAN LATA)',
              text: 'Jika ujian anda positif, ibu bapa, adik-beradik, dan anak-anak anda mempunyai 50% peluang untuk mempunyai gen yang sama. Ujian membolehkan mereka disaring dan memulakan penjagaan pencegahan awal, menyelamatkan nyawa.'
            },
            {
              title: 'RAWATAN JITU',
              text: 'Mengesahkan genotip FH anda membantu doktor memilih dos yang tepat dan jenis ubat penurun lipid (seperti statin berpotensi tinggi).'
            }
          ]
        },
        {
          id: 'testing-guide',
          title: 'Panduan Ujian Anda',
          shortSummary: 'Langkah demi langkah daripada kaunseling ke keputusan anda.',
          readingTime: 'Masa membaca: 4 minit',
          content: "Perjalanan rujukan anda direka bentuk untuk sangat tersusun, menyokong, dan sepenuhnya pesakit luar. Tiada puasa diperlukan untuk ujian darah standard.",
          keyTakeaway: 'Setiap langkah direka untuk disesuaikan dengan lancar ke dalam jadual biasa anda.',
          iconName: 'ClipboardList',
          tags: ['ujian darah', 'kaunseling', 'apa yang dijangkakan'],
          steps: [
            { num: 1, title: 'Ketahui tentang FH', description: 'Baca panduan ringkas dan diperibadikan ini di aplikasi HealthHub anda.' },
            { num: 2, title: 'Tempah kaunseling', description: 'Jadualkan sesi anda dengan mudah terus di aplikasi ini dengan slot pilihan anda.' },
            { num: 3, title: 'Hadir ke sesi', description: 'Perbualan mesra selama 30 minit dengan kaunselor genetik untuk menyemak sejarah keluarga.' },
            { num: 4, title: 'Ujian darah standard', description: 'Pengambilan darah ringkas selama 10 minit di klinik. Tiada puasa atau persediaan diet diperlukan.' },
            { num: 5, title: 'Dapatkan keputusan dalam 4-6 minggu', description: 'Bertemu dengan pakar anda untuk menerima penjelasan yang jelas dan mudah difahami.' },
            { num: 6, title: 'Pelan pencegahan tersuai', description: 'Jika disahkan, mulakan terapi selamat dan bersubsidi yang mengembalikan risiko anda ke paras normal.' }
          ]
        },
        {
          id: 'costs-subsidies',
          title: 'Kos dan Subsidi',
          shortSummary: 'Kos yang anda bayar serta cara subsidi dan MediSave membantu.',
          readingTime: 'Masa membaca: 2.5 minit',
          content: "GovTech Singapore bekerjasama dengan Kementerian Kesihatan untuk memastikan penjagaan kesihatan kekal berpatutan. Ujian genetik untuk FH disubsidi dengan banyak.",
          keyTakeaway: 'Kos sendiri boleh dituntut melalui MediSave di bawah garis panduan pengurusan penyakit kronik.',
          iconName: 'Coins',
          tags: ['MediSave', 'CHAS', 'subsidi'],
          subsections: [
            {
              title: 'SUBSIDI MOH',
              text: 'Warganegara Singapura yang layak menerima subsidi 50% hingga 75% untuk kaunseling genetik dan ujian, bergantung pada tahap ujian kemampuan isi rumah mereka.'
            },
            {
              title: 'PENGGUNAAN MEDISAVE',
              text: 'Baki kos sendiri boleh ditolak menggunakan akaun MediSave anda di bawah garis panduan pengurusan penyakit kronik, meminimumkan pembayaran tunai segera.'
            },
            {
              title: 'MANFAAT KAD CHAS',
              text: 'Pemegang kad CHAS Biru, Jingga, dan Generasi Pioneer/Merdeka menerima subsidi yang dipertingkatkan, yang digunakan secara automatik semasa pembayaran.'
            }
          ]
        },
        {
          id: 'insurance-rights',
          title: 'Insurans & Hak Anda',
          shortSummary: 'Bagaimana Moratorium LIA melindungi anda.',
          readingTime: 'Masa membaca: 3 minit',
          content: "Kementerian Kesihatan Singapura dan Persatuan Insurans Hayat (LIA) mengekalkan Kod Pengguna yang ketat mengenai Ujian Genetik untuk melindungi data penjagaan kesihatan dan akses insurans anda.",
          keyTakeaway: 'Garis panduan kebangsaan melindungi sepenuhnya hak anda untuk mengambil ujian proaktif tanpa sebarang kesan polisi.',
          iconName: 'Shield',
          tags: ['insurans', 'privasi', 'moratorium LIA'],
          subsections: [
            {
              title: 'TIADA KESAN KEPADA PELAN SEDIA ADA',
              text: 'Polisi aktif sedia ada (seperti MediShield Life atau Pelan Integrated Shield) tidak boleh diubah, dibatalkan, atau ditetapkan semula harganya.'
            },
            {
              title: 'MORATORIUM LIA YANG KETAT',
              text: 'Syarikat insurans dilarang meminta anda mengambil ujian genetik, atau daripada meminta keputusan genetik untuk polisi hayat/kesihatan standard di bawah ambang yang tinggi.'
            }
          ]
        },
        {
          id: 'medication-fh',
          title: 'Ubat-ubatan & FH',
          shortSummary: 'Bagaimana statin berfungsi dan apa yang dijangkakan.',
          readingTime: 'Masa membaca: 2 minit',
          content: "Oleh kerana FH adalah keadaan genetik sejak lahir, perubahan gaya hidup sahaja biasanya tidak mencukupi untuk menurunkan kolesterol ke tahap selamat. Ubat-ubatan harian memainkan peranan penting dalam mengukuhkan risiko anda.",
          keyTakeaway: 'Memulakan rawatan awal boleh mengurangkan risiko kardiovaskular anda kembali ke tahap populasi umum.',
          iconName: 'Pill',
          tags: ['statin', 'ubat-ubatan', 'rawatan'],
          subsections: [
            {
              title: 'PERANAN STATIN',
              text: 'Statin adalah ubat yang sangat selamat dan telah dikaji dengan teliti untuk membantu hati anda membersihkan kolesterol dari darah.'
            },
            {
              title: 'RAWATAN AWAL MENYELAMATKAN NYAWA',
              text: 'Memulakan rawatan awal boleh mengurangkan risiko kardiovaskular anda kembali ke tahap populasi umum.'
            }
          ]
        }
      ];
    case 'zh':
      return [
        {
          id: 'what-is-fh',
          title: '什么是 FH？',
          shortSummary: '了解什么是家族性高胆固醇血症，以及早期诊断的关键性。',
          readingTime: '3分钟阅读',
          content: "家族性高胆固醇血症 (FH) 是一种常染色体显性遗传病，导致患者体内的受体无法正常清除血液中的低密度脂蛋白（即“坏”胆固醇）。与因不良饮食或生活方式引起的普通高胆固醇不同，FH 患者体内的胆固醇水平自出生起便极高，会悄无声息地损伤血管，大幅增加早期罹患心脏病的风险。",
          keyTakeaway: 'FH 完全由遗传基因决定。这意味着除了健康生活习惯外，患者几乎都需要配合药物治疗。',
          iconName: 'BookOpen',
          tags: ['胆固醇', '基因科学', '心脏健康'],
          subsections: [
            {
              title: '患病率如何？',
              text: '在新加坡，约每250人中就有1人患有 FH。绝大多数 FH 患者在进行基因检测前都对自己的病情一无所知。'
            },
            {
              title: '这是我的错吗？',
              text: '不。FH 是100%遗传性疾病，由父母传给子女。单靠改善饮食或增加锻炼无法完全解决它——尽管健康的生活习惯依旧不可或缺。'
            }
          ]
        },
        {
          id: 'why-testing-matters',
          title: '保护您的至亲',
          shortSummary: '级联筛查如何守护您和您家人的生命安全。',
          readingTime: '3分钟阅读',
          content: "基因检测是确诊您是否患有 FH 的金标准。找出引起您高胆固醇的具体基因变异，能使医生为您量身定制最有效的预防治疗方案，从而保护您和您的挚爱。",
          keyTakeaway: '一次简单检测，可以守护您和您家人的双重健康。',
          iconName: 'Users',
          tags: ['家庭健康', '级联筛查', '关爱下一代'],
          subsections: [
            {
              title: '级联筛查（Cascade Screening）',
              text: '如果您确诊，您的父母、兄弟姐妹以及子女有50%的几率也携带有相同的 FH 致病基因。基因检测能帮助他们及早筛查，并在发生不测前采取有效的预防举措。'
            },
            {
              title: '精准医疗方案',
              text: '明确您的 FH 基因型，可以帮助医生精准选择最适合您的药剂用量和降脂药类型（如高效力他汀类药物）。'
            }
          ]
        },
        {
          id: 'testing-guide',
          title: '基因检测指南',
          shortSummary: '一步步了解从基因咨询到获取检测报告的全过程。',
          readingTime: '4分钟阅读',
          content: "您的转诊流程非常专业、人性化且完全在门诊进行。常规采血无需空腹，不影响日常安排。",
          keyTakeaway: '转诊旅程的每一步都是为您量身设计的，极其轻松便利。',
          iconName: 'ClipboardList',
          tags: ['采血化验', '医学咨询', '诊疗预期'],
          steps: [
            { num: 1, title: '了解 FH', description: '通过 HealthHub 应用程序阅读浅显易懂、专为您量身定制的科普指南。' },
            { num: 2, title: '预约咨询', description: '直接通过此应用轻松预约您心仪的基因咨询时段。' },
            { num: 3, title: '进行咨询', description: '与专业的基因咨询师进行30分钟亲切详实的谈话，评估家族病史。' },
            { num: 4, title: '常规采血', description: '在医院进行简单的10分钟采血，无需禁食空腹。' },
            { num: 5, title: '4-6周后获取报告', description: '再次与专科医生会面，听取全面、清晰且通俗易懂的报告解读。' },
            { num: 6, title: '定制预防方案', description: '一旦确诊，您将开启安全且享受政府高额津贴的预防性治疗，使心血管风险恢复正常。' }
          ]
        },
        {
          id: 'costs-subsidies',
          title: '费用与政府津贴',
          shortSummary: '详细了解自付费用、政府高额补贴以及如何使用 MediSave。',
          readingTime: '2.5分钟阅读',
          content: "新加坡卫生部 (MOH) 与 GovTech 紧密合作，确保所有国人都可轻松负担高品质医疗。FH 基因检测已纳入高额政府补贴。 ",
          keyTakeaway: '根据慢性疾病管理指南，您可以使用 MediSave（保健储蓄）报销绝大多数的自付费用。',
          iconName: 'Coins',
          tags: ['MediSave储蓄', 'CHAS津贴', '政府补贴'],
          subsections: [
            {
              title: '新加坡卫生部 (MOH) 补贴',
              text: '符合资格的新加坡公民在接受基因咨询和检测时，可根据家庭收入调查级别，获得 50% 至 75% 的高额政府直接津贴。'
            },
            {
              title: '使用 MediSave 保健储蓄',
              text: '剩余的个人自付费用，可在慢性疾病管理计划（CDMP）下通过您的 MediSave 账户予以扣除，最大程度降低现金支出压力。'
            },
            {
              title: 'CHAS 卡尊享福利',
              text: 'CHAS蓝色卡、橙色卡，以及建国一代或立国一代卡持有者可直接享有更高的专属额外补贴，该费用在结算时会自动进行抵扣。'
            }
          ]
        },
        {
          id: 'insurance-rights',
          title: '商业保险与您的合法权益',
          shortSummary: '深入了解人寿保险公会 (LIA) 暂缓执行令如何守护您。',
          readingTime: '3分钟阅读',
          content: "新加坡卫生部与人寿保险公会联合颁布并坚决执行严格的《基因检测消费者守则》，以全力保护您的个人健康隐私和未来的商业投保权益。",
          keyTakeaway: '国家专属守则完全保障您的权益，您可安心检测，毫无后顾之忧。',
          iconName: 'Shield',
          tags: ['商业投保', '隐私权保护', 'LIA暂缓执行令'],
          subsections: [
            {
              title: '不影响已生效的保单',
              text: '任何您已经购买且正在生效的保单（如 MediShield Life 终身健保或 Integrated Shield Plans 综合健保双全计划）绝不会受到影响，保险公司无权将其终止、取消或上调保费。'
            },
            {
              title: '严苛的 LIA 暂缓执行令',
              text: '保险公司严禁强制要求您进行基因检测；在申请常规人寿或健康保险时（只要保额不超过法定高额限度），保险商也严禁向您索取基因检测结果。'
            }
          ]
        },
        {
          id: 'medication-fh',
          title: '药物与 FH',
          shortSummary: '他汀类药物的作用原理及诊疗预期。',
          readingTime: '2分钟阅读',
          content: "由于 FH 是一种自出生起就存在的遗传性疾病，单靠改善生活方式通常无法将胆固醇降至安全水平。每日药物治疗在降低您的健康风险中起着至关重要的作用。",
          keyTakeaway: '尽早开始治疗可以将您的心血管风险降低至普通人群的正常水平。',
          iconName: 'Pill',
          tags: ['他汀类药物', '药物治疗', '医疗方案'],
          subsections: [
            {
              title: '他汀类药物的作用',
              text: '他汀类药物是非常安全且经过广泛研究的药物，能有效协助您的肝脏清除血液中的胆固醇。'
            },
            {
              title: '及早治疗，挽救生命',
              text: '尽早开始治疗可以将您的心血管风险降低至普通人群的正常水平。'
            }
          ]
        }
      ];
    case 'ta':
      return [
        {
          id: 'what-is-fh',
          title: 'FH என்றால் என்ன?',
          shortSummary: 'FH என்றால் என்ன மற்றும் ஆரம்ப கட்டத்திலேயே கண்டறிவதன் முக்கியத்துவம்.',
          readingTime: '3 நிமிட வாசிப்பு',
          content: "குடும்பவழி ஹைபர்கொலஸ்டிரோலேமியா (FH) என்பது உடலிலிருந்து 'கெட்ட' எல்.டி.எல் கொழுப்பை அகற்றுவதைத் தடுக்கும் ஒரு பரம்பரை நிலையாகும். உணவு அல்லது வாழ்க்கை முறையால் ஏற்படும் சாதாரண கொலஸ்ட்ராலை விட, FH கொலஸ்ட்ரால் பிறப்பிலிருந்தே மிக அதிகமாக உள்ளது, இது இரத்த நாளங்களை சேதப்படுத்தி, இதய நோய் அபாயத்தை உருவாக்குகிறது.",
          keyTakeaway: 'FH முற்றிலும் மரபணு சார்ந்தது, எனவே ஆரோக்கியமான பழக்கவழக்கங்களுடன் மருத்துவ சிகிச்சையும் அவசியமாகும்.',
          iconName: 'BookOpen',
          tags: ['கொலஸ்ட்ரால்', 'மரபியல்', 'இதய ஆரோக்கியம்'],
          subsections: [
            {
              title: 'இது எவ்வளவு பொதுவானது?',
              text: 'சிங்கப்பூரியர்களில் 250 பேரில் ஒருவரை FH பாதிக்கிறது. மரபணு சோதனை செய்யும் வரை தங்களுக்கு இந்த நோய் இருப்பது பெரும்பாலான மக்களுக்குத் தெரியாது.'
            },
            {
              title: 'இது என் தவறா?',
              text: 'இல்லை. FH முற்றிலும் மரபணு சார்ந்தது. இது பெற்றோரிடமிருந்து பெறப்படுகிறது, உணவு அல்லது உடற்பயிற்சியால் மட்டும் இதைக் குணப்படுத்த முடியாது.'
            }
          ]
        },
        {
          id: 'why-testing-matters',
          title: 'உங்கள் குடும்பத்தைப் பாதுகாத்தல்',
          shortSummary: 'மரபணு சோதனை எவ்வாறு உங்கள் அன்புக்குரியவர்களைப் பாதுகாக்கிறது.',
          readingTime: '3 நிமிட வாசிப்பு',
          content: "உங்களுக்கு FH உள்ளதா என்பதை உறுதிப்படுத்த மரபணு சோதனை சிறந்த வழியாகும். குறிப்பிட்ட மரபணு மாறுபாட்டைக் கண்டறிவது, மருத்துவர்கள் உங்களது தடுப்பு சிகிச்சையைத் தனிப்பயனாக்கவும், உங்கள் அன்புக்குரியவர்களைப் பாதுகாக்கவும் உதவுகிறது.",
          keyTakeaway: 'ஒரு சோதனை உங்களையும் உங்கள் அன்பானவர்களையும் பாதுகாக்கும்.',
          iconName: 'Users',
          tags: ['குடும்பம்', 'மரபணு சோதனை', 'குழந்தைகள்'],
          subsections: [
            {
              title: 'குடும்பத்தைப் பாதுகாத்தல் (Cascade Screening)',
              text: 'உங்களுக்குப் பாதிப்பு இருந்தால், உங்கள் பெற்றோர், உடன்பிறந்தோர் மற்றும் குழந்தைகளுக்கு அதே மரபணு இருக்க 50% வாய்ப்பு உள்ளது. சோதனை மூலம் அவர்களைக் கண்டறிந்து ஆரம்பத்திலேயே சிகிச்சை அளிக்கலாம்.'
            },
            {
              title: 'துல்லியமான சிகிச்சை',
              text: 'உங்கள் FH மரபணு வகையை உறுதிப்படுத்துவது, மருத்துவர் சரியான அளவு மற்றும் மருந்து வகையைத் தேர்வு செய்ய உதவுகிறது.'
            }
          ]
        },
        {
          id: 'testing-guide',
          title: 'உங்கள் சோதனை வழிகாட்டி',
          shortSummary: 'ஆலோசனை முதல் முடிவுகள் வரையிலான படிப்படியான வழிகாட்டி.',
          readingTime: '4 நிமிட வாசிப்பு',
          content: "உங்கள் மருத்துவப் பயணம் மிகவும் ஒழுங்கமைக்கப்பட்டதாகவும், ஆதரவானதாகவும் வடிவமைக்கப்பட்டுள்ளது. இரத்தப் பரிசோதனைக்கு உண்ணாவிரதம் தேவையில்லை.",
          keyTakeaway: 'ஒவ்வொரு படியும் உங்கள் சாதாரண அட்டவணையுடன் எளிதாகப் பொருந்தும் வகையில் வடிவமைக்கப்பட்டுள்ளது.',
          iconName: 'ClipboardList',
          tags: ['இரத்த பரிசோதனை', 'ஆலோசனை', 'எதிர்பார்ப்பு'],
          steps: [
            { num: 1, title: 'FH பற்றி அறியவும்', description: 'உங்களது HealthHub செயலியில் தனிப்பயனாக்கப்பட்ட வழிகாட்டிகளைப் படிக்கவும்.' },
            { num: 2, title: 'ஆலோசனையை முன்பதிவு செய்ய', description: 'விரும்பிய நேரத்தைத் தேர்வுசெய்து இந்த செயலியில் எளிதாக முன்பதிவு செய்யவும்.' },
            { num: 3, title: 'ஆலோசனை பெறவும்', description: 'மரபணு ஆலோசகருடன் குடும்ப வரலாறு குறித்து 30 நிமிட உரையாடல்.' },
            { num: 4, title: 'இரத்தப் பரிசோதனை', description: 'மருத்துவமனையில் 10 நிமிட எளிய இரத்தப் பரிசோதனை. உண்ணாவிரதம் தேவையில்லை.' },
            { num: 5, title: '4-6 வாரங்களில் முடிவுகள்', description: 'முடிவுகளைப் பெற உங்கள் மருத்துவரைச் சந்தித்து எளிய விளக்கத்தைப் பெறவும்.' },
            { num: 6, title: 'தனிப்பயனாக்கப்பட்ட சிகிச்சை', description: 'உறுதிசெய்யப்பட்டால், உங்களது ஆரோக்கியத்தை சீராக்கும் மானியம் பெற்ற பாதுகாப்பான சிகிச்சையைத் தொடங்கவும்.' }
          ]
        },
        {
          id: 'costs-subsidies',
          title: 'கட்டணம் மற்றும் மானியங்கள்',
          shortSummary: 'நீங்கள் செலுத்தும் கட்டணம் மற்றும் அரசு மானியம், MediSave எவ்வாறு உதவுகிறது.',
          readingTime: '2.5 நிமிட வாசிப்பு',
          content: "சுகாதாரச் சேவைகள் மலிவு விலையில் கிடைப்பதை உறுதி செய்ய சிங்கப்பூர் சுகாதார அமைச்சகம் (MOH) மானியங்களை வழங்குகிறது.",
          keyTakeaway: 'மீதமுள்ள கட்டணத்தை நாள்பட்ட நோய் மேலாண்மை வழிகாட்டுதலின் கீழ் MediSave மூலம் செலுத்தலாம்.',
          iconName: 'Coins',
          tags: ['MediSave', 'CHAS', 'மானியங்கள்'],
          subsections: [
            {
              title: 'MOH மானியங்கள்',
              text: 'தகுதியான சிங்கப்பூர் குடிமக்கள் தங்களது குடும்ப வருமான வரம்பிற்கு ஏற்ப 50% முதல் 75% வரை மானியம் பெறலாம்.'
            },
            {
              title: 'MEDISAVE பயன்பாடு',
              text: 'மீதமுள்ள கட்டணத்தை உங்கள் MediSave கணக்கிலிருந்து செலுத்தலாம், இதனால் உடனடி பணத் தொகை குறைகிறது.'
            },
            {
              title: 'CHAS அட்டை நன்மைகள்',
              text: 'CHAS ப்ளூ, ஆரஞ்சு மற்றும் முன்னோடித் தலைமுறை அட்டைதாரர்களுக்கு கூடுதல் மானியங்கள் தானாகவே பயன்படுத்தப்படும்.'
            }
          ]
        },
        {
          id: 'insurance-rights',
          title: 'காப்பீடு & உங்கள் உரிமைகள்',
          shortSummary: 'LIA மொராட்டோரியம் எவ்வாறு உங்களைப் பாதுகாக்கிறது.',
          readingTime: '3 நிமிட வாசிப்பு',
          content: "சிங்கப்பூர் சுகாதார அமைச்சகம் மற்றும் காப்பீட்டு சங்கம் (LIA) உங்கள் தரவு மற்றும் காப்பீட்டைப் பாதுகாக்க கடுமையான விதிகளைப் பின்பற்றுகின்றன.",
          keyTakeaway: 'தேசிய வழிகாட்டுதல்கள் உங்களது காப்பீட்டைப் பாதிக்காமல் சோதனை செய்ய உங்களை முழுமையாகப் பாதுகாக்கின்றன.',
          iconName: 'Shield',
          tags: ['காப்பீடு', 'தனியுரிமை', 'LIA மொராட்டோரியம்'],
          subsections: [
            {
              title: 'தற்போதுள்ள காப்பீடுகளில் பாதிப்பு இல்லை',
              text: 'உங்களிடம் ஏற்கனவே உள்ள காப்பீடுகளை (MediShield Life போன்றவை) காப்பீட்டு நிறுவனங்கள் ரத்து செய்யவோ அல்லது பிரீமியத்தை உயர்த்தவோ முடியாது.'
            },
            {
              title: 'கடுமையான LIA கட்டுப்பாடு',
              text: 'உங்களை மரபணு சோதனை செய்ய காப்பீட்டு நிறுவனங்கள் கட்டாயப்படுத்தக் கூடாது, அல்லது சாதாரண காப்பீடுகளுக்கு அதன் முடிவுகளைக் கேட்கக் கூடாது.'
            }
          ]
        },
        {
          id: 'medication-fh',
          title: 'மருந்து & FH',
          shortSummary: 'ஸ்டேடின்கள் எவ்வாறு செயல்படுகின்றன மற்றும் எதை எதிர்பார்ப்பது.',
          readingTime: '2 நிமிட வாசிப்பு',
          content: "FH என்பது பிறப்பிலிருந்தே இருக்கும் ஒரு மரபணு நிலை என்பதால், கொலஸ்ட்ராலைக் குறைக்க வாழ்க்கை முறை மாற்றங்கள் மட்டுமே போதுமானதாக இருக்காது. தினசரி மருந்துகள் உங்கள் ஆபத்தைக் குறைப்பதில் முக்கிய பங்கு வகிக்கின்றன.",
          keyTakeaway: 'ஆரம்பத்திலேயே சிகிச்சையைத் தொடங்குவது உங்கள் இருதய ஆபத்தை பொதுவான மக்களின் அளவிற்கு குறைக்கலாம்.',
          iconName: 'Pill',
          tags: ['ஸ்டேடின்கள்', 'மருந்துகள்', 'சிகிச்சை'],
          subsections: [
            {
              title: 'ஸ்டேடின்களின் பங்கு',
              text: 'ஸ்டேடின்கள் மிகவும் பாதுகாப்பான மற்றும் நன்கு ஆய்வு செய்யப்பட்ட மருந்துகள் ஆகும், இவை உங்கள் கல்லீரல் இரத்தத்தில் உள்ள கொழுப்பை அகற்ற உதவுகின்றன.'
            },
            {
              title: 'ஆரம்ப சிகிச்சை உயிரைக் காக்கும்',
              text: 'ஆரம்பத்திலேயே சிகிச்சையைத் தொடங்குவது உங்கள் இருதய ஆபத்தை பொதுவான மக்களின் அளவிற்கு குறைக்கலாம்.'
            }
          ]
        }
      ];
    case 'en':
    default:
      return educationalSections;
  }
};

// Localized FAQs
export const getLocalizedFaqs = (lang: Language): FAQItem[] => {
  switch (lang) {
    case 'ms':
      return [
        {
          question: 'Adakah saya perlu berpuasa sebelum janji temu kaunseling genetik atau ujian darah?',
          answer: 'Tidak. Kaunseling genetik adalah perbincangan, dan ujian darah FH tidak memerlukan sebarang puasa. Anda boleh makan, minum, dan mengambil ubat biasa anda seperti biasa sebelum hadir.',
          category: 'testing'
        },
        {
          question: 'Berapakah kos ujian darah genetik selepas subsidi?',
          answer: 'Bagi Warganegara Singapura yang layak mendapat subsidi MOH (seperti pemegang CHAS Biru), kos sendiri yang tinggal biasanya adalah antara S$15 hingga S$45 sahaja. Baki ini juga boleh dibayar sepenuhnya menggunakan MediSave.',
          category: 'cost'
        },
        {
          question: 'Adakah keputusan ujian genetik saya akan menjejaskan insurans hayat atau perubatan sedia ada?',
          answer: 'Sama sekali tidak. Di bawah Moratorium Persatuan Insurans Hayat (LIA) Singapura yang ketat, semua insurans perubatan sedia ada dan insurans hayat di bawah had tertentu tidak boleh diubah, dibatalkan, atau dinaikkan harga berdasarkan keputusan ujian genetik sukarela.',
          category: 'insurance'
        },
        {
          question: 'Sekiranya keputusan saya adalah positif, adakah anak-anak atau ahli keluarga saya perlu diuji juga?',
          answer: 'Ya, ini dipanggil saringan lata (cascade screening). Oleh kerana FH diwarisi, ahli keluarga terdekat anda (ibu bapa, adik-beradik, dan anak-anak) mempunyai peluang 50% untuk mempunyai keadaan yang sama. Kami akan membimbing anda tentang cara membantu mereka mendapatkan ujian bersubsidi tinggi dengan selamat.',
          category: 'family'
        },
        {
          question: 'Berapa lamakah masa yang diambil untuk mendapatkan keputusan ujian darah genetik?',
          answer: 'Sampel dihantar ke makmal khusus genetik klinikal. Keputusan penuh biasanya tersedia dalam tempoh 4 hingga 6 minggu. Anda akan dipanggil untuk sesi susulan bagi menerangkan hasil keputusan secara terperinci.',
          category: 'testing'
        },
        {
          question: 'Bolehkah saya menghentikan ubat kolesterol saya semasa ujian dijalankan?',
          answer: 'Tidak, anda tidak boleh menghentikan atau mengubah ubat yang ditetapkan melainkan diarahkan secara eksplisit oleh doktor anda. Ujian genetik menganalisis DNA anda, yang kekal tidak berubah oleh sebarang ubat yang anda ambil.',
          category: 'medication'
        }
      ];
    case 'zh':
      return [
        {
          question: '基因咨询或采血化验前需要禁食空腹吗？',
          answer: '完全不需要。基因咨询是以谈话和评估为主，而针对 FH 的基因采血检查也不需要禁食。您可以照常饮食、喝水，并照常服用您平时所需的任何日常药物。',
          category: 'testing'
        },
        {
          question: '扣除政府津贴后，基因检测的实际个人自付费用是多少？',
          answer: '符合新加坡卫生部补贴资格的公民（例如 CHAS 蓝色卡持有者），在享受高达 75% 的政府直接直接津贴后，个人自付费用通常仅在 15 至 45 新元之间。此外，剩余的全部账单均可直接使用您的 MediSave 账户予以支付，无需支付现金。',
          category: 'cost'
        },
        {
          question: '基因检测结果会影响我已有的商业人寿险或重疾险保单吗？',
          answer: '绝对不会。根据新加坡人寿保险公会（LIA）颁布的严格暂缓执行令，您已购买并生效的商业医疗险、重疾险和常规人寿保单绝不会因为您自愿进行的基因检测而受到任何惩罚、修改、取消或保费上调。',
          category: 'insurance'
        },
        {
          question: '如果检测结果呈阳性，我的子女或兄弟姐妹也必须进行检测吗？',
          answer: '非常建议他们进行检测。这在医学上被称为级联筛查（Cascade Screening）。由于 FH 是强遗传病，您的直系亲属（父母、兄弟姐妹及子女）有高达 50% 的几率携带有相同的突变基因。我们专业的咨询团队会指引您如何帮助家人安全、便捷地申请相同的高额津贴筛查。',
          category: 'family'
        },
        {
          question: '采血化验后需要多久才能拿到基因报告？',
          answer: '采血样本会被送往国家临床基因专科实验室进行精密的定序分析。完整的基因检测报告通常需要 4 至 6 周的时间出炉。报告出来后，主治专科医生会为您安排复诊，为您进行通俗且详实的面对面解读。',
          category: 'testing'
        },
        {
          question: '在进行基因检测期间，我可以停止服用胆固醇药物吗？',
          answer: '不可以。除非您的主治医生明确指示，否则您绝不应停止或更改您已配给的处方药。基因检测分析的是您的 DNA，它完全不会因您服用的任何药物而改变。',
          category: 'medication'
        }
      ];
    case 'ta':
      return [
        {
          question: 'மரபணு ஆலோசனை அல்லது இரத்த பரிசோதனைக்கு முன்பு நான் உண்ணாவிரதம் இருக்க வேண்டுமா?',
          answer: 'இல்லை. மரபணு ஆலோசனை என்பது ஒரு கலந்துரையாடல், மேலும் FH இரத்த பரிசோதனைக்கு உண்ணாவிரதம் தேவையில்லை. நீங்கள் சாதாரணமாக சாப்பிட்டு, உங்கள் வழக்கமான மருந்துகளை உட்கொள்ளலாம்.',
          category: 'testing'
        },
        {
          question: 'மானியங்களுக்குப் பிறகு மரபணு பரிசோதனைக்கான கட்டணம் எவ்வளவு இருக்கும்?',
          answer: 'MOH மானியம் பெற தகுதியுள்ள சிங்கப்பூர் குடிமக்களுக்கு (CHAS ப்ளூ அட்டைதாரர்கள் போன்றவை), மீதமுள்ள கட்டணம் பொதுவாக S$15 முதல் S$45 வரை மட்டுமே இருக்கும். இதை உங்கள் MediSave கணக்கைப் பயன்படுத்தி முழுமையாக செலுத்தலாம்.',
          category: 'cost'
        },
        {
          question: 'எனது மரபணு சோதனை முடிவுகள் தற்போதுள்ள காப்பீடுகளைப் பாதிக்குமா?',
          answer: 'கண்டிப்பாகப் பாதிக்காது. சிங்கப்பூர் காப்பீட்டு சங்கத்தின் (LIA) கடுமையான விதிகளின்படி, தற்போதுள்ள காப்பீடுகளை காப்பீட்டு நிறுவனங்கள் ரத்து செய்யவோ அல்லது பிரீமியத்தை உயர்த்தவோ முடியாது.',
          category: 'insurance'
        },
        {
          question: 'முடிவு சாதகமாக இருந்தால், எனது குழந்தைகள் அல்லது குடும்பத்தினரும் சோதனை செய்ய வேண்டுமா?',
          answer: 'ஆம், இது Cascade Screening என்று அழைக்கப்படுகிறது. FH மரபுவழியாக பரவுவதால், உங்கள் பெற்றோர், உடன்பிறந்தோர் மற்றும் குழந்தைகளுக்கு 50% வாய்ப்பு உள்ளது. அவர்களுக்கு மானிய விலையில் சோதனை செய்ய நாங்கள் உங்களுக்கு வழிகாட்டுவோம்.',
          category: 'family'
        },
        {
          question: 'மரபணு சோதனை முடிவுகள் கிடைக்க எவ்வளவு காலம் ஆகும்?',
          answer: 'மரபணு சோதனை முடிவுகள் கிடைக்க பொதுவாக 4 முதல் 6 வாரங்கள் வரை ஆகும். முடிவுகள் வந்தவுடன், விரிவான விளக்கத்தைப் பெற உங்களை மீண்டும் சந்திப்பிற்கு அழைப்போம்.',
          category: 'testing'
        },
        {
          question: 'சோதனையின் போது நான் கொலஸ்ட்ரால் மருந்து உட்கொள்வதை நிறுத்தலாமா?',
          answer: 'இல்லை, உங்கள் மருத்துவர் அறிவுறுத்தாத வரை நீங்கள் பரிந்துரைக்கப்பட்ட மருந்தை உட்கொள்வதை நிறுத்தவோ மாற்றவோ கூடாது. மரபணு சோதனை உங்கள் டிஎன்ஏவை பகுப்பாய்வு செய்கிறது, இது நீங்கள் உட்கொள்ளும் எந்த மருந்தினாலும் மாறாது.',
          category: 'medication'
        }
      ];
    case 'en':
    default:
      return [
        {
          question: 'Do I need to fast before the genetic counselling appointment or blood draw?',
          answer: 'No. Genetic counselling is a discussion, and the FH genetic blood test does not require any fasting. You can eat, drink, and take your regular daily medications normally beforehand.',
          category: 'testing'
        },
        {
          question: 'How much does the genetic test actually cost after subsidies?',
          answer: 'For Singapore Citizens eligible for MOH subsidies (such as CHAS Blue cardholders), the remaining out-of-pocket cost is typically between S$15 to S$45. The entire remaining balance can be fully paid using your MediSave account, requiring zero cash up-front.',
          category: 'cost'
        },
        {
          question: 'Will my genetic test results affect my existing life or health insurance policies?',
          answer: 'Absolutely not. Under Singapore\'s strict Life Insurance Association (LIA) Moratorium, all existing active health and life insurance policies below high thresholds can never be modified, canceled, or re-priced based on a voluntary clinical genetic test.',
          category: 'insurance'
        },
        {
          question: 'If my test is positive, do my children or siblings need to be tested too?',
          answer: 'Yes, this is called cascade screening. Because FH is highly hereditary, your first-degree relatives (parents, siblings, and children) have a 50% chance of sharing the same variation. We will guide you on how to help them access highly subsidized testing safely.',
          category: 'family'
        },
        {
          question: 'How long does it take to receive the clinical genetic testing results?',
          answer: 'Samples are processed in a clinical genetics lab. Complete results are typically returned in 4 to 6 weeks. You will be scheduled for a follow-up consultation where your clinician will explain the findings in detail.',
          category: 'testing'
        },
        {
          question: 'Can I stop my cholesterol medication during testing?',
          answer: 'No, you should never stop or change your prescribed medication unless explicitly directed by your physician. The genetic test analyzes your DNA, which remains completely unchanged by any medications you are taking.',
          category: 'medication'
        }
      ];
  }
};

// Localized helper to convert "D Month YYYY" strings into selected languages
export const getLocalizedDate = (dateStr: string, lang: Language): string => {
  if (!dateStr) return dateStr;
  const parts = dateStr.split(' ');
  if (parts.length !== 3) return dateStr;
  const day = parts[0];
  const monthName = parts[1];
  const year = parts[2];

  const msMonths: Record<string, string> = {
    'January': 'Januari', 'February': 'Februari', 'March': 'Mac', 'April': 'April', 'May': 'Mei', 'June': 'Jun',
    'July': 'Julai', 'August': 'Ogos', 'September': 'September', 'October': 'Oktober', 'November': 'November', 'December': 'Disember'
  };
  const zhMonths: Record<string, string> = {
    'January': '1月', 'February': '2月', 'March': '3月', 'April': '4月', 'May': '5月', 'June': '6月',
    'July': '7月', 'August': '8月', 'September': '9月', 'October': '10月', 'November': '11月', 'December': '12月'
  };
  const taMonths: Record<string, string> = {
    'January': 'ஜனவரி', 'February': 'பிப்ரவரி', 'March': 'மார்ச்', 'April': 'ஏப்ரல்', 'May': 'மே', 'June': 'ஜூன்',
    'July': 'ஜூலை', 'August': 'ஆகஸ்ட்', 'September': 'செப்டம்பர்', 'October': 'அக்டோபர்', 'November': 'நவம்பர்', 'December': 'டிசம்பர்'
  };

  if (lang === 'ms') {
    return `${day} ${msMonths[monthName] || monthName} ${year}`;
  }
  if (lang === 'zh') {
    return `${year}年${zhMonths[monthName] || monthName}${day}日`;
  }
  if (lang === 'ta') {
    return `${day} ${taMonths[monthName] || monthName} ${year}`;
  }
  return dateStr;
};

// Localized helper to convert English month and year "Month YYYY" to localized forms
export const getLocalizedMonthOnly = (monthStr: string, lang: Language): string => {
  const parts = monthStr.split(' ');
  const monthName = parts[0];
  
  const msMap: Record<string, string> = {
    'January': 'Jan', 'February': 'Feb', 'March': 'Mac', 'April': 'Apr', 'May': 'Mei', 'June': 'Jun',
    'July': 'Jul', 'August': 'Ogos', 'September': 'Sept', 'October': 'Okt', 'November': 'Nov', 'December': 'Dis'
  };
  const zhMap: Record<string, string> = {
    'January': '1月', 'February': '2月', 'March': '3月', 'April': '4月', 'May': '5月', 'June': '6月',
    'July': '7月', 'August': '8月', 'September': '9月', 'October': '10月', 'November': '11月', 'December': '12月'
  };
  const taMap: Record<string, string> = {
    'January': 'ஜன', 'February': 'பிப்', 'March': 'மார்', 'April': 'ஏப்', 'May': 'மே', 'June': 'ஜூன்',
    'July': 'ஜூலை', 'August': 'ஆக', 'September': 'செப்', 'October': 'அக்', 'November': 'நவ', 'December': 'டிச'
  };
  const enMap: Record<string, string> = {
    'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun',
    'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
  };

  const map = lang === 'ms' ? msMap : lang === 'zh' ? zhMap : lang === 'ta' ? taMap : enMap;
  return map[monthName] || monthName;
};

// Localized helper for helpful resources translation
export const getLocalizedHelpfulResources = (resources: HelpfulResource[], lang: Language): HelpfulResource[] => {
  if (lang === 'en') return resources;

  const msResources: Record<string, Partial<HelpfulResource>> = {
    'res-7': {
      title: "Kisah Pesakit: Perjuangan Ibu untuk Anak-Anaknya",
      summary: "Video kisah pesakit yang menyentuh hati berkongsi perspektif ibu tentang kehidupan dengan FH dan harapannya agar dua orang anaknya yang masih kecil disaring awal untuk melindungi masa depan mereka.",
      type: "Kisah Video",
      keywords: ['kisah-pesakit', 'video', 'ibu', 'saringan-pediatrik', 'harapan-keluarga'],
      readingTime: 'Video 6-min',
      pages: [
        {
          title: "Perjalanan Seorang Ibu: Hidup dengan FH Diwarisi",
          paragraphs: [
            "Sarah, seorang ibu penyayang kepada dua anak kecil, didiagnosis dengan Hiperkolesterolemia Keluarga (FH) selepas bapanya sendiri mengalami serangan jantung pramatang.",
            "Membesar dengan pengetahuan tentang betapa buruknya penyakit jantung jika tidak diuruskan, dia telah mengikuti pelan rawatan klinikal yang ketat selama bertahun-tahun.",
            "\"Mempunyai FH bukanlah pilihan, tetapi mengambil kawalan aktif terhadapnya adalah satu pilihan,\" kongsinya. \"Rawatan saya membolehkan saya menjalani kehidupan yang penuh dan aktif demi keluarga saya.\""
          ]
        },
        {
          title: "Harapan untuk Dua Anak Kecilnya",
          paragraphs: [
            "Oleh kerana FH diwarisi dalam corak dominan autosom, setiap anak Sarah mempunyai peluang 50% untuk mewarisi mutasi genetik yang sama.",
            "Sarah bercakap tentang naluri keibuan yang mendalam untuk melindungi anak-anaknya daripada pengumpulan plak senyap awal yang disaksikannya dalam kalangan saudara-maranya.",
            "\"Harapan saya adalah untuk mendapatkan anak-anak saya disaring awal,\" jelasnya. \"Menjalani saringan pediatrik bermakna kami akan mengetahui status mereka dan boleh mengambil tindakan pencegahan segera jika perlu, lama sebelum sebarang risiko berkembang.\""
          ]
        },
        {
          title: "Kuasa Intervensi Awal dalam Pediatrik",
          paragraphs: [
            "Garis panduan klinikal menyokong saringan kanak-kanak daripada ibu bapa FH seawal usia 2 hingga 10 tahun. Pengurusan pemakanan awal dan sokongan perubatan akhirnya boleh memastikan kanak-kanak ini mempunyai jangka hayat yang normal.",
            "Sarah ingin menyebarkan kesedaran kepada keluarga lain supaya mereka tidak takut dengan ujian genetik, sebaliknya melihatnya sebagai hadiah berharga untuk perlindungan kesihatan.",
            "\"Saya mahu anak-anak saya membesar dengan mengetahui mereka selamat dan dilindungi. Saringan awal memberi kami ketenangan minda dan alat untuk melindungi masa depan mereka.\""
          ]
        }
      ]
    },
    'res-6': {
      title: "Kisah Pesakit: Hidup dengan FH (Perjalanan Seorang Pemuda)",
      summary: "Video pesakit yang memberi inspirasi berkongsi pengalaman seorang pemuda yang didiagnosis dengan FH, mengharungi pengesanan awal, saringan genetik dan memulakan hidup dengan kolesterol tinggi.",
      type: "Kisah Video",
      keywords: ['kisah-pesakit', 'video', 'dewasa-muda', 'pengalaman-hidup'],
      readingTime: 'Video 5-min',
      pages: [
        {
          title: "Kenali Joshua: Didiagnosis dengan FH pada Usia 22 Tahun",
          paragraphs: [
            "Joshua ialah seorang dewasa muda yang aktif dan sihat yang memulakan kerjayanya apabila pemeriksaan kesihatan insurans rutin mendedahkan tahap kolesterol yang sangat tinggi.",
            "Walaupun makan dengan baik dan bersenam secara teratur, tahap LDL beliau melebihi 7.5 mmol/L. \"Saya tidak percaya,\" kongsi Joshua. \"Saya fikir kolesterol hanya menjadi masalah bagi orang yang lebih tua dan tidak aktif.\"",
            "Rujukan kepada kaunseling genetik mengesahkan beliau mempunyai Hiperkolesterolemia Keluarga (FH), yang diwarisi daripada sebelah bapanya."
          ]
        },
        {
          title: "Memulakan Hidup & Kerjaya dengan Diagnosis Genetik",
          paragraphs: [
            "Menerima keadaan genetik seumur hidup pada awal usia 20-an boleh mencabar emosi. Joshua bercakap tentang mengatasi penafian awal dan belajar untuk menjaga kesihatannya.",
            "\"Mengetahui lebih awal sebenarnya adalah satu rahmat,\" jelasnya. \"Ini bermakna saya boleh memulakan terapi statin awal, sebelum sebarang pengumpulan plak senyap boleh menyebabkan serangan jantung pada usia 30-an atau 40-an.\"",
            "Joshua menekankan betapa kritikalnya bagi lelaki dan wanita muda lain untuk tidak mengabaikan sejarah keluarga mereka yang mempunyai penyakit jantung awal."
          ]
        }
      ]
    },
    'res-9': {
      title: "Panduan Pengguna: Moratorium Ujian Genetik dan Insurans",
      summary: "Panduan pengguna rasmi Kementerian Kesihatan Singapura yang menerangkan moratorium kebangsaan, bagaimana keputusan ujian genetik mempengaruhi permohonan insurans anda dan hak anda sebagai pengguna.",
      type: "Panduan Klinikal",
      keywords: ['insurans', 'moratorium', 'ujian-genetik', 'hak-pengguna'],
      readingTime: 'Slaid 3-min',
      pages: [
        {
          title: "Memahami Moratorium Ujian Genetik",
          paragraphs: [
            "Singapura mengekalkan moratorium genetik kebangsaan yang dipersetujui antara Kementerian Kesihatan (MOH) dan Persatuan Insurans Hayat (LIA) Singapura.",
            "Di bawah perjanjian ini, syarikat insurans dilarang sama sekali daripada meminta atau menggunakan keputusan ujian genetik sukarela untuk menafikan perlindungan insurans asas atau menaikkan premium.",
            "Ini memastikan rakyat Singapura boleh menjalani ujian genetik yang diperlukan secara klinikal tanpa rasa takut kehilangan akses kepada keselamatan kewangan asas."
          ]
        }
      ]
    },
    'res-5': {
      title: "Panduan FH Yayasan Jantung Singapura",
      summary: "Panduan bermaklumat Yayasan Jantung Singapura mengenai faktor risiko FH, implikasi kardiovaskular dan pengubahsuaian gaya hidup untuk menguruskan kolesterol tinggi genetik.",
      type: "Panduan Klinikal",
      keywords: ['yjs', 'faktor-risiko', 'kesihatan-jantung', 'pencegahan'],
      readingTime: 'Slaid 4-min',
      pages: [
        {
          title: "Memahami Faktor Risiko FH & Kesihatan Jantung",
          paragraphs: [
            "Yayasan Jantung Singapura (SHF) menekankan bahawa FH adalah keadaan senyap di mana kolesterol LDL tinggi sejak lahir perlahan-lahan menyumbat arteri.",
            "Tanpa diagnosis awal, individu yang mempunyai FH mempunyai risiko penyakit jantung pramatang sehingga 20 kali ganda lebih tinggi berbanding populasi umum.",
            "Walau bagaimanapun, pengesanan awal dan terapi perubatan yang sesuai boleh mengurangkan risiko ini kembali ke tahap normal."
          ]
        }
      ]
    },
    'res-4': {
      title: "Risalah FH Rangkaian Penjagaan Utama",
      summary: "Risalah pendidikan komprehensif yang diedarkan oleh Rangkaian Penjagaan Utama Singapura untuk pesakit dan keluarga mengenai pengesanan FH, risiko genetik dan pilihan rawatan.",
      type: "Risalah PDF",
      keywords: ['penjagaan-utama', 'risalah', 'panduan-pesakit'],
      readingTime: 'PDF 5-min',
      pages: [
        {
          title: "Apakah Itu Hiperkolesterolemia Keluarga?",
          paragraphs: [
            "Risalah ini menerangkan asas-asas genetik FH sebagai gangguan gen tunggal yang menjejaskan keupayaan hati untuk membersihkan kolesterol LDL.",
            "Ia menggariskan kepentingan saringan lata keluarga untuk mengenal pasti ahli keluarga lain yang mungkin tidak menyedari bahawa mereka juga berisiko tinggi."
          ]
        }
      ]
    },
    'res-8': {
      title: "Risalah Klinik Penilaian Genomik NHG (GAC)",
      summary: "Panduan pesakit rasmi Klinik Penilaian Genomik National Healthcare Group mengenai kaunseling genetik klinikal, penilaian risiko dan ujian DNA di Singapura.",
      type: "Risalah PDF",
      keywords: ['nhg', 'gac', 'kaunseling-genetik', 'ujian-dna', 'genomik-klinikal'],
      readingTime: 'PDF 4-min',
      pages: [
        {
          title: "Pengenalan kepada Klinik Penilaian Genomik NHG",
          paragraphs: [
            "Panduan ini memperkenalkan perkhidmatan khusus yang disediakan oleh Klinik Penilaian Genomik NHG, termasuk kaunseling genetik pakar dan ujian DNA.",
            "Ia memperincikan proses langkah demi langkah untuk pesakit yang dirujuk, memastikan perjalanan klinikal yang lancar dan disokong sepenuhnya."
          ]
        }
      ]
    },
    'res-1': {
      title: "Pamflet Pesakit FH Klinikal NUHS",
      summary: "Pamflet klinikal rasmi National University Health System yang menerangkan mekanik ujian DNA, risiko kardiovaskular dan pengurusan lipid di Singapura.",
      type: "Risalah PDF",
      keywords: ['nuhs', 'panduan-pesakit', 'pamflet-klinikal'],
      readingTime: 'PDF 3-min',
      pages: [
        {
          title: "Memahami Rujukan & Kaunseling Genetik Anda",
          paragraphs: [
            "NUHS menyediakan risalah bermaklumat ini untuk membantu pesakit memahami peranan kaunselor genetik dalam menganalisis sejarah kesihatan keluarga.",
            "Ia membincangkan gen khusus yang dikaitkan dengan FH, kepentingan ujian lipid biasa, dan pilihan terapi pencegahan yang disubsidi."
          ]
        }
      ]
    },
    'res-2': {
      title: "Program Ujian Genetik FH Kebangsaan MOH",
      summary: "Pengumuman akhbar rasmi Kementerian Kesihatan Singapura melancarkan inisiatif ujian DNA klinikal kebangsaan bersubsidi dan saringan lata.",
      type: "Panduan Klinikal",
      keywords: ['moh', 'garis-panduan', 'standard-klinikal'],
      readingTime: 'Slaid 5-min',
      pages: [
        {
          title: "Pelancaran Inisiatif Saringan FH Kebangsaan",
          paragraphs: [
            "Kementerian Kesihatan (MOH) Singapura telah melancarkan program kebangsaan untuk mensubsidi ujian genetik FH, menjadikannya sangat mampu milik untuk semua rakyat Singapura yang layak.",
            "Inisiatif ini bertujuan untuk mengurangkan beban penyakit kardiovaskular pramatang di Singapura melalui pengesanan awal dan pencegahan yang proaktif."
          ]
        }
      ]
    }
  };

  const zhResources: Record<string, Partial<HelpfulResource>> = {
    'res-7': {
      title: "患者故事：一位母亲为孩子们的奋斗",
      summary: "感人至深的患者视频，分享了一位母亲对于伴随 FH 生活的看法，以及她希望及早为两个幼儿进行筛查以守护他们未来的期望。",
      type: "视频故事",
      keywords: ['患者故事', '视频', '母亲', '儿童筛查', '家庭希望'],
      readingTime: '6分钟视频',
      pages: [
        {
          title: "母亲的旅程：伴随遗传性 FH 生活",
          paragraphs: [
            "莎拉 (Sarah) 是两个年幼孩子的母亲，在她自己的父亲突发早发性心脏病后，她被诊断出患有家族性高胆固醇血症 (FH)。",
            "深知心脏病在不加管理的情况下会带来多么毁灭性的后果，她多年来一直坚持严格的临床治疗计划。",
            "“患有 FH 不是一种选择，但主动控制它是可以自主决定的，”她分享道。“我的药物治疗让我能够为了家庭过上充实、充满活力的生活。”"
          ]
        },
        {
          title: "对两个年幼孩子的期望",
          paragraphs: [
            "由于 FH 是以常染色体显性遗传方式遗传的，莎拉的每个孩子都有 50% 的几率遗传相同的基因突变。",
            "莎拉讲述了她保护孩子免受她在亲属身上目睹的早期无声斑块积聚的深层母性本能。",
            "“我的希望是让我的孩子们尽早接受筛查，”她解释道。“接受儿童期筛查意味着我们将知道他们的状况，并可以在需要时立即采取预防行动，远远在任何风险形成之前。”"
          ]
        },
        {
          title: "儿科早期干预的力量",
          paragraphs: [
            "临床指南支持最早在 2 至 10 岁之间对有 FH 父母的孩子进行筛查。早期的饮食管理和随后的医疗支持可以确保这些孩子拥有与常人无异的预期寿命。",
            "莎拉希望向其他家庭传播这种意识，让他们不要害怕基因检测，而是将其视为一份关于健康守护的珍贵礼物。",
            "“我希望我的孩子们在成长过程中感到安全和受到保护。早期筛查给了我们这种内心的平静和保护他们未来的工具。”"
          ]
        }
      ]
    },
    'res-6': {
      title: "患者故事：伴随 FH 生活（一个年轻人的旅程）",
      summary: "具有启发性的患者视频，分享了一位被诊断患有 FH 的年轻人的经历，讲述了他如何应对早期发现、基因筛查以及如何在伴随高胆固醇的情况下开启人生。",
      type: "视频故事",
      keywords: ['患者故事', '视频', '年轻成人', '亲身经历'],
      readingTime: '5分钟视频',
      pages: [
        {
          title: "认识祖舒亚：在 22 岁时确诊 FH",
          paragraphs: [
            "祖舒亚 (Joshua) 是一名积极、健康的年轻上班族，当时一次例行的保险体检揭示了他的胆固醇水平异常偏高。",
            "尽管饮食健康且规律锻炼，他的 LDL 水平依然超过了 7.5 mmol/L。“我简直不敢相信，”祖舒亚分享道。“我以为胆固醇只是老年人或生活方式不健康的人才需要担心的问题。”",
            "转诊进行基因咨询证实他患有家族性高胆固醇血症 (FH)，遗传自他的父亲一方。"
          ]
        },
        {
          title: "带着基因诊断开启人生与职业生涯",
          paragraphs: [
            "在 20 多岁出头接受一种终身遗传性疾病在情感上具有挑战性。祖舒亚谈到他如何克服初期的否认态度并学会为自己的健康负责。",
            "“及早发现其实是一种恩赐，”他解释道。“这意味着我可以在三十多岁或四十多岁时因无声斑块积聚导致心脏病发作之前，及早开始他汀类药物治疗。”",
            "祖舒亚强调，其他年轻男女绝对不要忽视早发性心脏病的家族历史。"
          ]
        }
      ]
    },
    'res-9': {
      title: "消费者指南：基因检测与保险暂行停征令",
      summary: "新加坡卫生部官方消费者指南，详细阐述了国家暂行停征令、基因检测结果如何影响您的保险申请，以及您作为消费者的合法权益。",
      type: "临床指南",
      keywords: ['保险', '停征令', '基因检测', '消费者权益'],
      readingTime: '3分钟阅读',
      pages: [
        {
          title: "理解基因检测暂行停征令",
          paragraphs: [
            "新加坡目前实施一项由新加坡卫生部 (MOH) 与新加坡人寿保险公会 (LIA) 共同达成的国家基因检测暂行停征令协议。",
            "根据该协议，保险公司被严格禁止要求您提供或利用您的自愿性基因检测结果来拒绝最基础的保险承保或以此提高保费。",
            "这确保了新加坡人可以安心地接受临床必需的基因检测，而无需担心失去获取基本财务安全保障的权利。"
          ]
        }
      ]
    },
    'res-5': {
      title: "新加坡心脏基金会 FH 指南",
      summary: "新加坡心脏基金会提供的信息指南，介绍 FH 的危险因素、心血管影响以及管理基因遗传性高胆固醇的生活方式改善方法。",
      type: "临床指南",
      keywords: ['心脏基金会', '危险因素', '心脏健康', '预防措施'],
      readingTime: '4分钟阅读',
      pages: [
        {
          title: "认识 FH 危险因素与心脏健康",
          paragraphs: [
            "新加坡心脏基金会 (SHF) 强调，FH 是一种静悄悄的疾病，自出生起就偏高的 LDL 胆固醇会逐渐阻塞动脉血管。",
            "如果不进行早期诊断，FH 患者发生早发性心脏病的风险比普通人群高出多达 20 倍。",
            "然而，早期发现和科学合理的药物治疗可以将这种心脏病风险完全降低至正常人水平。"
          ]
        }
      ]
    },
    'res-4': {
      title: "基层医疗 FH 教育手册",
      summary: "新加坡基层医疗网络为患者和家属分发的综合教育手册，包含 FH 检测、基因风险和治疗方案选择。",
      type: "PDF 宣传册",
      keywords: ['基层医疗', '宣传册', '患者手册'],
      readingTime: '5分钟阅读',
      pages: [
        {
          title: "什么是家族性高胆固醇血症？",
          paragraphs: [
            "本手册通俗易懂地解释了 FH 的基因机制，指出其作为单基因遗传病，影响了肝脏清除血液中 LDL 胆固醇的能力。",
            "手册强调了进行家庭级联筛查的重要性，以帮助找出其他可能同样面临高风险但至今依然毫无察觉的家庭成员。"
          ]
        }
      ]
    },
    'res-8': {
      title: "NHG 基因组评估诊所 (GAC) 宣传册",
      summary: "国家健康集团 (NHG) 官方基因组评估诊所患者指南，内容涉及新加坡的临床基因咨询、风险评估和 DNA 检测。",
      type: "PDF 宣传册",
      keywords: ['国家健康集团', '基因咨询诊所', '基因咨询', 'DNA检测', '临床基因组学'],
      readingTime: '4分钟阅读',
      pages: [
        {
          title: "NHG 基因组评估诊所简介",
          paragraphs: [
            "本手册详细介绍了 NHG 基因组评估诊所提供的专业化医疗服务，包括专家级基因咨询和精密的 DNA 测序分析。",
            "手册还为被转诊推荐的患者清晰阐述了每一步的门诊流程，确保患者在整个临床诊疗旅程中得到充分支持与守护。"
          ]
        }
      ]
    },
    'res-1': {
      title: "NUHS 临床 FH 患者手册",
      summary: "国立大学医学组织 (NUHS) 官方临床手册，解释了新加坡的 DNA 检测机制、心血管风险和血脂管理。",
      type: "PDF 宣传册",
      keywords: ['国立大学医学组织', '患者手册', '临床手册'],
      readingTime: '3分钟阅读',
      pages: [
        {
          title: "读懂您的转诊推荐与基因咨询",
          paragraphs: [
            "新加坡国立大学医学组织 (NUHS) 精心编制了本教育手册，帮助患者理解基因咨询师在分析家族遗传健康史中的重要作用。",
            "手册介绍了与 FH 密切相关的特定基因，开展常规血脂测试的必要性，以及享受高额政府补贴的预防性治疗方案。"
          ]
        }
      ]
    },
    'res-2': {
      title: "新加坡卫生部 (MOH) 国家 FH 基因检测计划",
      summary: "新加坡卫生部官方新闻公告，正式启动了享受政府补贴的国家临床 DNA 检测以及家族级联筛查计划。",
      type: "临床指南",
      keywords: ['卫生部', '指南规范', '临床标准'],
      readingTime: '5分钟阅读',
      pages: [
        {
          title: "启动国家 FH 筛查战略计划",
          paragraphs: [
            "新加坡卫生部 (MOH) 已正式启动了资助 FH 基因检测的国家健康专项计划，使所有符合条件的本地公民都能以极低的、可负担的价格参与筛查。",
            "这一极具前瞻性的公共卫生计划旨在通过主动的早期筛查与预防，极大地降低新加坡本地早发性心血管疾病的发生率和家庭社会负担。"
          ]
        }
      ]
    }
  };

  const taResources: Record<string, Partial<HelpfulResource>> = {
    'res-7': {
      title: "நோயாளி கதை: தன் குழந்தைகளுக்காக ஒரு தாயின் போராட்டம்",
      summary: "FH உடன் வாழ்வது குறித்த தாயின் பார்வையை விவரிக்கும் ஒரு மனதைத் தொடும் வீடியோ கதை மற்றும் அவர்களின் எதிர்காலத்தைப் பாதுகாக்க தனது இரு குழந்தைகளையும் ஆரம்பத்திலேயே பரிசோதிக்க வேண்டும் என்ற அவரது நம்பிக்கை.",
      type: "வீடியோ கதை",
      keywords: ['நோயாளி-கதை', 'வீடியோ', 'தாய்', 'குழந்தைகள்-பரிசோதனை', 'குடும்ப-நம்பிக்கை'],
      readingTime: '6-நிமிடம் வீடியோ',
      pages: [
        {
          title: "ஒரு தாயின் பயணம்: பரம்பரை FH உடன் வாழ்வது",
          paragraphs: [
            "இரண்டு இளம் குழந்தைகளின் அன்பான தாயான சாரா (Sarah), அவரது சொந்த தந்தை இளம் வயதிலேயே மாரடைப்பால் பாதிக்கப்பட்டதைத் தொடர்ந்து, ஃபாமிலியல் ஹைபர்கொலஸ்டிரோலீமியா (FH) நோயால் பாதிக்கப்பட்டது கண்டறியப்பட்டது.",
            "சரியான முறையில் நிர்வகிக்கப்படாத போது இதய நோய் எவ்வளவு கடுமையான பாதிப்பை ஏற்படுத்தும் என்ற பயத்துடன் வளர்ந்த அவர், பல ஆண்டுகளாக கண்டிப்பான மருத்துவ சிகிச்சை திட்டத்தில் இருந்து வருகிறார்.",
            "\"FH இருப்பது என்பது நமது தேர்வல்ல, ஆனால் அதை தீவிரமாக கட்டுப்படுத்துவது நமது கையில் உள்ளது,\" என்று அவர் பகிர்ந்து கொள்கிறார். \"எனது மருந்து முறை எனது குடும்பத்திற்காக முழுமையான, சுறுசுறுப்பான வாழ்க்கையை வாழ எனக்கு உதவுகிறது.\""
          ]
        },
        {
          title: "தனது இரு இளம் குழந்தைகள் மீதான அவரது நம்பிக்கை",
          paragraphs: [
            "FH ஒரு ஆட்டோசோமால் மேலாதிக்க முறையில் பரவுவதால், சாராவின் ஒவ்வொரு குழந்தைக்கும் அதே மரபணு மாற்றத்தைப் பெறுவதற்கான 50% வாய்ப்பு உள்ளது.",
            "சாரா தனது உறவினர்களிடம் கண்ட மாரடைப்பு மற்றும் தமனி அடைப்பு ஆகியவற்றிலிருந்து தனது குழந்தைகளைப் பாதுகாக்க விரும்பும் ஆழமான தாய்மை உணர்வு குறித்து பேசுகிறார்.",
            "\"எனது நம்பிக்கை எனது குழந்தைகளை ஆரம்பத்திலேயே பரிசோதிக்க வேண்டும்,\" என்று அவர் விளக்குகிறார். \"குழந்தை பருவத்திலேயே சல்லடை பரிசோதனை செய்வது அவர்களின் நிலையை அறியவும், ஏதேனும் ஆபத்து ஏற்படும் முன்பே தடுப்பு நடவடிக்கைகளை உடனடியாக எடுக்கவும் உதவும்.\""
          ]
        }
      ]
    },
    'res-6': {
      title: "நோயாளி கதை: FH உடன் வாழ்வது (ஒரு இளைஞனின் பயணம்)",
      summary: "FH நோயால் பாதிக்கப்பட்ட ஒரு இளைஞனின் அனுபவம், ஆரம்பக்கால கண்டறிதல், மரபணு பரிசோதனை மற்றும் அதிக கொழுப்புடன் வாழ்க்கையைத் தொடங்குதல் ஆகியவற்றைப் பகிர்ந்து கொள்ளும் ஒரு சக்திவாய்ந்த வீடியோ.",
      type: "வீடியோ கதை",
      keywords: ['நோயாளி-கதை', 'வீடியோ', 'இளைஞர்', 'வாழ்நாள்-அனுபவம்'],
      readingTime: '5-நிமிடம் வீடியோ',
      pages: [
        {
          title: "ஜோஷுவாவைச் சந்திக்கவும்: 22 வயதில் FH கண்டறியப்பட்டது",
          paragraphs: [
            "ஜோஷுவா (Joshua) தனது வாழ்க்கையைத் தொடங்கிய ஆரோக்கியமான இளைஞனாக இருந்தார், அப்போது ஒரு வழக்கமான காப்பீட்டு சுகாதார பரிசோதனை அவருக்கு கொழுப்பின் அளவு மிக அதிகமாக இருப்பதைக் காட்டியது.",
            "சரியான உணவு முறை மற்றும் தொடர்ந்து உடற்பயிற்சி செய்த போதிலும், அவரது LDL அளவு 7.5 mmol/L-க்கு மேல் இருந்தது. \"என்னால் நம்ப முடியவில்லை,\" என்று ஜோஷுவா பகிர்ந்து கொள்கிறார். \"கொழுப்பு என்பது வயதானவர்கள் அல்லது ஆரோக்கியமற்ற வாழ்க்கை முறையைக் கொண்டவர்களுக்கு மட்டுமே ஏற்படும் பிரச்சனை என்று நான் நினைத்தேன்.\"",
            "மரபணு ஆலோசனைக்கான பரிந்துரை, அவருக்கு தந்தையின் வழியிலிருந்து வந்த ஃபாமிலியல் ஹைபர்கொலஸ்டிரோலீமியா (FH) இருப்பதை உறுதிப்படுத்தியது."
          ]
        },
        {
          title: "மரபணு கண்டறிதலுடன் வாழ்க்கை மற்றும் தொழில் தொடங்குதல்",
          paragraphs: [
            "20களின் ஆரம்பத்தில் வாழ்நாள் முழுவதற்குமான மரபணு நிலையை ஏற்றுக்கொள்வது உணர்வுப்பூர்வமாக சவாலானது. ஜோஷுவா ஆரம்பக்கால மறுப்பை வென்று தனது ஆரோக்கியத்தைக் கவனித்துக் கொள்ளக் கற்றுக்கொண்டதை விளக்குகிறார்.",
            "\"ஆரம்பத்திலேயே கண்டறிந்தது உண்மையில் ஒரு ஆசீர்வாதம்,\" என்று அவர் விளக்குகிறார். \"இதன் பொருள், 30 அல்லது 40களில் மாரடைப்பு ஏற்படும் முன் நான் ஆரம்பத்திலேயே ஸ்டேடின் சிகிச்சையைத் தொடங்க முடிந்தது.\"",
            "இளம் வயதிலேயே இதய நோய் கண்டறியப்பட்ட குடும்ப வரலாற்றை மற்ற இளம் ஆண்களும் பெண்களும் புறக்கணிக்கக் கூடாது என்று ஜோஷுவா வலியுறுத்துகிறார்."
          ]
        }
      ]
    },
    'res-9': {
      title: "நுகர்வோர் வழிகாட்டி: மரபணு சோதனை மற்றும் காப்பீடு மீதான தற்காலிகத் தடை",
      summary: "தேசிய தற்காலிகத் தடையை விளக்கும் சிங்கப்பூர் சுகாதார அமைச்சகத்தின் அதிகாரப்பூர்வ நுகர்வோர் வழிகாட்டி, மரபணு சோதனை முடிவுகள் உங்கள் காப்பீட்டு விண்ணப்பங்களை எவ்வாறு பாதிக்கின்றன மற்றும் ஒரு நுகர்வோராக உங்களுக்கான உரிமைகள்.",
      type: "மருத்துவ வழிகாட்டி",
      keywords: ['காப்பீடு', 'தற்காலிக-தடை', 'மரபணு-சோதனை', 'நுகர்வோர்-உரிமைகள்'],
      readingTime: '3-நிமிடம் வாசிப்பு',
      pages: [
        {
          title: "மரபணு சோதனை தற்காலிகத் தடையைப் புரிந்துகொள்வது",
          paragraphs: [
            "சிங்கப்பூர் சுகாதார அமைச்சகம் (MOH) மற்றும் சிங்கப்பூர் ஆயுள் காப்பீட்டாளர்கள் சங்கம் (LIA) ஆகியவற்றிற்கு இடையே ஒப்புக்கொள்ளப்பட்ட தேசிய மரபணு சோதனை தற்காலிகத் தடையை சிங்கப்பூர் பராமரிக்கிறது.",
            "இந்த ஒப்பந்தத்தின் கீழ், காப்பீட்டு நிறுவனங்கள் அடிப்படை காப்பீட்டை மறுக்கவோ அல்லது பிரீமியத்தை அதிகரிக்கவோ உங்களின் தன்னார்வ மரபணு சோதனை முடிவுகளைக் கேட்கவோ அல்லது பயன்படுத்தவோ கண்டிப்பாக தடைசெய்யப்பட்டுள்ளது."
          ]
        }
      ]
    },
    'res-5': {
      title: "சிங்கப்பூர் இதய அறக்கட்டளை FH வழிகாட்டி",
      summary: "FH ஆபத்து காரணிகள், இருதய பாதிப்புகள் மற்றும் மரபணு சார்ந்த அதிக கொழுப்பை நிர்வகிப்பதற்கான வாழ்க்கை முறை மாற்றங்கள் குறித்த சிங்கப்பூர் இதய அறக்கட்டளையின் தகவல் வழிகாட்டி.",
      type: "மருத்துவ வழிகாட்டி",
      keywords: ['இதய-அறக்கட்டளை', 'ஆபத்து-காரணிகள்', 'இதய-ஆரோக்கியம்', 'தடுப்பு'],
      readingTime: '4-நிமிடம் வாசிப்பு',
      pages: [
        {
          title: "FH ஆபத்து காரணிகள் மற்றும் இதய ஆரோக்கியத்தைப் புரிந்துகொள்வது",
          paragraphs: [
            "சிங்கப்பூர் இதய அறக்கட்டளை (SHF) வலியுறுத்துகிறது, பிறப்பிலிருந்தே அதிக LDL கொழுப்பு தமனிகளை மெதுவாக அடைக்கும் ஒரு அமைதியான நிலை தான் FH ஆகும்.",
            "ஆரம்பக்கால கண்டறிதல் மற்றும் தகுந்த மருத்துவ சிகிச்சை ஆகியவை இந்த இதய நோய் அபாயத்தை சாதாரண நிலைக்குக் குறைக்கலாம்."
          ]
        }
      ]
    },
    'res-4': {
      title: "ஆரம்ப சுகாதார FH கையேடு",
      summary: "சிங்கப்பூர் ஆரம்ப சுகாதார வலையமைப்பால் விநியோகிக்கப்படும் விரிவான கல்வி கையேடு, நோயாளிகள் மற்றும் குடும்பங்களுக்கு FH கண்டறிதல், மரபணு அபாயங்கள் மற்றும் சிகிச்சை விருப்பங்கள் பற்றி விளக்குகிறது.",
      type: "PDF கையேடு",
      keywords: ['ஆரம்ப-சுகாதாரம்', 'கையேடு', 'நோயாளி-கைநூல்'],
      readingTime: '5-நிமிடம் வாசிப்பு',
      pages: [
        {
          title: "ஃபாமிலியல் ஹைபர்கொலஸ்டிரோலீமியா என்றால் என்ன?",
          paragraphs: [
            "இந்த கையேடு கொழுப்பை அகற்றும் கல்லீரலின் திறனைப் பாதிக்கும் ஒரு மரபணு கோளாறாக FH-ன் அடிப்படைகளை விளக்குகிறது.",
            "இது ஆபத்தில் இருக்கும் மற்ற குடும்ப உறுப்பினர்களைக் கண்டறிய குடும்ப அடுக்கு சல்லடை பரிசோதனையின் முக்கியத்துவத்தை கோடிட்டுக் காட்டுகிறது."
          ]
        }
      ]
    },
    'res-8': {
      title: "NHG மரபணு மதிப்பீட்டு மருத்துவமனை (GAC) கையேடு",
      summary: "சிங்கப்பூரில் உள்ள மருத்துவ மரபணு ஆலோசனை, ஆபத்து மதிப்பீடு மற்றும் DNA பரிசோதனை பற்றிய நேஷனல் ஹெல்த்கேர் குரூப்பின் (NHG) அதிகாரப்பூர்வ மரபணு மதிப்பீட்டு மருத்துவமனை நோயாளி வழிகாட்டி.",
      type: "PDF கையேடு",
      keywords: ['nhg', 'gac', 'மரபணு-ஆலோசனை', 'DNA-பரிசோதனை', 'மருத்துவ-மரபணுவியல்'],
      readingTime: '4-நிமிடம் வாசிப்பு',
      pages: [
        {
          title: "NHG மரபணு மதிப்பீட்டு மருத்துவமனை அறிமுகம்",
          paragraphs: [
            "இந்த வழிகாட்டி நிபுணர் மரபணு ஆலோசனை மற்றும் DNA பரிசோதனை உட்பட NHG மரபணு மதிப்பீட்டு மருத்துவமனை வழங்கும் சிறப்பு சேவைகளை அறிமுகப்படுத்துகிறது."
          ]
        }
      ]
    },
    'res-1': {
      title: "NUHS மருத்துவ FH நோயாளி துண்டுப்பிரசுரம்",
      summary: "சிங்கப்பூரில் DNA சோதனை முறைகள், இருதய ஆபத்து மற்றும் கொழுப்பு மேலாண்மை ஆகியவற்றை விளக்கும் நேஷனல் யுனிவர்சிட்டி ஹெல்த் சிஸ்டத்தின் (NUHS) அதிகாரப்பூர்வ மருத்துவ துண்டுப்பிரசுரம்.",
      type: "PDF கையேடு",
      keywords: ['nuhs', 'நோயாளி-கைநூல்', 'மருத்துவ-துண்டுப்பிரசுரம்'],
      readingTime: '3-நிமிடம் வாசிப்பு',
      pages: [
        {
          title: "உங்கள் பரிந்துரை மற்றும் மரபணு ஆலோசனையைப் புரிந்துகொள்வது",
          paragraphs: [
            "குடும்ப சுகாதார வரலாற்றை பகுப்பாய்வு செய்வதில் மரபணு ஆலோசகர்களின் பங்கைப் புரிந்துகொள்ள நோயாளிகளுக்கு உதவ NUHS இந்த தகவல் கையேட்டை வழங்குகிறது."
          ]
        }
      ]
    },
    'res-2': {
      title: "MOH தேசிய FH மரபணு சோதனை திட்டம்",
      summary: "மானியம் வழங்கப்பட்ட தேசிய மருத்துவ DNA சோதனை மற்றும் அடுக்கு முறை சல்லடை பரிசோதனை முயற்சியைத் தொடங்கும் சிங்கப்பூர் சுகாதார அமைச்சகத்தின் அதிகாரப்பூர்வ செய்தி அறிவிப்பு.",
      type: "மருத்துவ வழிகாட்டி",
      keywords: ['moh', 'வழிகாட்டுதல்கள்', 'மருத்துவ-தரநிலைகள்'],
      readingTime: '5-நிமிடம் வாசிப்பு',
      pages: [
        {
          title: "தேசிய FH சல்லடை பரிசோதனை முயற்சியின் தொடக்கம்",
          paragraphs: [
            "சிங்கப்பூர் சுகாதார அமைச்சகம் (MOH) FH மரபணு சோதனைகளுக்கு மானியம் வழங்குவதற்கான தேசிய திட்டத்தைத் தொடங்கியுள்ளது, இது அனைத்து தகுதியான சிங்கப்பூரர்களுக்கும் மிகவும் மலிவானதாக மாற்றுகிறது."
          ]
        }
      ]
    }
  };

  const lookup = lang === 'ms' ? msResources : lang === 'zh' ? zhResources : taResources;

  return resources.map(res => {
    const loc = lookup[res.id];
    if (!loc) return res;
    return {
      ...res,
      title: loc.title || res.title,
      summary: loc.summary || res.summary,
      type: loc.type || res.type,
      keywords: loc.keywords || res.keywords,
      readingTime: loc.readingTime || res.readingTime,
      pages: loc.pages ? loc.pages.map((p, idx) => ({
        ...p,
        paragraphs: p.paragraphs || res.pages[idx]?.paragraphs || []
      })) : res.pages
    };
  });
};

