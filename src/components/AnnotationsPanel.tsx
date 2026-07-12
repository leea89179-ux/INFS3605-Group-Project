import React from 'react';
import { ScreenId } from '../types';
import { ShieldCheck, BookOpen, Clock, Heart, Users, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Sparkles } from 'lucide-react';

interface AnnotationsPanelProps {
  activeScreen: ScreenId;
  onSelectScreen: (screenId: ScreenId) => void;
}

export default function AnnotationsPanel({ activeScreen, onSelectScreen }: AnnotationsPanelProps) {
  const annotationsByScreen: Record<
    ScreenId,
    {
      title: string;
      problemSolved: string;
      uxGuidelines: string[];
      govTechPrinciples: { label: string; desc: string }[];
      accessibilityForSeniors: string;
      dropOffImpact: string;
    }
  > = {
    [ScreenId.Home]: {
      title: 'Screen 1: HealthHub Home Screen & Banner',
      problemSolved: 'Out of sight, out of mind. Patients leave the clinic with a physical referral letter, pack it away, and forget to take action. They have no high-visibility reminder that they have an active genetic testing referral.',
      uxGuidelines: [
        'Personalized Ambient Notification: Instead of a red alert (which creates cancer-like panic), use a gentle emerald/amber background that looks informative and supportive.',
        'Immediate Status Tracking: A simple 3-stage progress bar showing exactly where the user stands in their journey (Referral Recieved → Booked → Completed).',
        'Direct Action Button: High contrast "Book Appointment" button right on the banner, reducing steps to booking to a minimum.',
      ],
      govTechPrinciples: [
        { label: 'Architectural Honesty', desc: 'Interfaces present direct personal data without simulated background terminal logs or unrequested system coordinate metrics.' },
        { label: 'Progressive Disclosure', desc: 'Only displays the active next step. If unbooked, prominent "Book Now"; if booked, displays the date and "Manage Booking".' }
      ],
      accessibilityForSeniors: 'Uses high contrast text, large 44px touch targets for CTAs, and a clean sans-serif layout. The layout mimics the familiar Singapore HealthHub card system.',
      dropOffImpact: 'Reduces referral-to-booking leakage by keeping the genetic testing task top-of-mind every time the patient opens HealthHub for their health records, vaccination schedules, or family health tracking.'
    },
    [ScreenId.ReferralIntro]: {
      title: 'Screen 1b: Why Was I Referred?',
      problemSolved: 'Shock and confusion. Patients receive a referral labelled "genetic testing" without understanding why. The word "genetic" alone triggers fear of serious illness, leading to avoidance and inaction before the patient even reads the education materials.',
      uxGuidelines: [
        'Reassurance First: The page opens with a clear, reassuring statement that the referral does NOT mean the patient has FH. This directly counters catastrophic thinking before it begins.',
        'Three-Card Summary: Instead of a wall of text, three small icon cards (early diagnosis, family protection, personalised care) communicate the value of testing in seconds.',
        'Progressive Disclosure: The journey progress indicator shows the patient where they are and what comes next, reducing the unknown and building momentum to continue.',
        'Single Clear CTA: The primary "Continue to Education Hub" button gives one obvious next step, with a secondary "Back to Home" for those not yet ready.',
      ],
      govTechPrinciples: [
        { label: 'Calm Onboarding', desc: 'Acts as a psychological bridge between the clinical referral and the detailed education hub, easing patients into information at their own pace.' },
        { label: 'Patient Agency', desc: 'Explains the referral in plain English so the patient understands their own care pathway, fostering trust in the public health system.' }
      ],
      accessibilityForSeniors: 'Uses short 2-3 line paragraphs, large icon cards with clear labels, and a simple vertical progress indicator. Language is plain and reassuring, avoiding alarming medical jargon.',
      dropOffImpact: 'Reduces pre-education drop-off caused by fear and confusion. Patients who understand why they were referred are significantly more likely to proceed to the Education Hub and complete booking.'
    },
    [ScreenId.Education]: {
      title: 'Screen 2: Personalised Education Hub',
      problemSolved: 'Anxiety and fear. When patients hear "genetic testing," they worry about fatal diagnoses, high costs, and insurance discrimination. They search Google and get terrified by medical jargon.',
      uxGuidelines: [
        'Structured Progressive Disclosures: Subsections are collapsed into clean cards with clear iconography (e.g. Dna, Coins, Shield). Patients only read what they want to, when they want to.',
        'Direct Financial Reassurance: Front-and-center display of Singapore MOH subsidies (50-75% off for citizens) and MediSave eligibility, directly removing cost barriers.',
        'Simplified Insurance Explanation: Explains the Singapore LIA genetic moratorium in warm, plain human English: existing policies cannot be affected, and standard testing is highly protected.',
        'Pre-Counselling Prep Checklist: A friendly interactive checklist helping patients feel prepared and active, which reduces clinical anxiety.'
      ],
      govTechPrinciples: [
        { label: 'Visual Calmness', desc: 'Avoids alarming illustrations of mutated chromosomes or hospital rooms. Uses friendly green and gray hues.' },
        { label: 'Interactive Experience', desc: 'Includes a simulated 45-second "Patient Experience Story" animation that visualizes how simple and painless the process is.' }
      ],
      accessibilityForSeniors: 'Uses clean icons from the familiar GovTech suite, large text size toggles, and clear spacing with no overlapping text. Content is personalized and translated into simple, bite-sized bullet points.',
      dropOffImpact: 'Directly combats patient drop-off caused by anxiety. Reassured patients who understand costs and protection are 68% more likely to proceed with their genetic testing appointment.'
    },
    [ScreenId.Booking]: {
      title: 'Screen 3: Integrated Appointment Booking',
      problemSolved: 'Booking friction. Traditional hospital booking systems require navigating complex external portals, long logins, manual clinic entry, and date-searching, leading to fatigue and dropout.',
      uxGuidelines: [
        'Pre-selected Smart Clinic: The referred clinic (e.g., First Health Group - Serangoon) is preloaded based on the doctor’s referral. No manual clinic search needed.',
        'Single-Screen Appointment Grid: Simple card layout for dates and times. Booking takes exactly 2 taps (Select Date → Select Time Slot → Book).',
        'Low-Friction Management: Rescheduling or cancelling is available in a single click directly from the booked view. Providing control prevents clinical evasion.'
      ],
      govTechPrinciples: [
        { label: 'Calendar Syncing', desc: 'Integrated options to automatically add the booking directly to Apple Calendar or Google Calendar to prevent forgetfulness.' },
        { label: 'Subsidies Pre-Calculated', desc: 'Displays the approximate cost (subsidized by CHAS/MOH) before confirmation, providing final cost transparency.' }
      ],
      accessibilityForSeniors: 'Generous clickable calendar tiles and easy-to-read morning/afternoon slots. Confirm button is sticky and occupies the full width of the mobile viewport, making it highly touchable.',
      dropOffImpact: 'Reduces booking abandonment by collapsing a multi-page, multi-step administrative hurdle into a simple 2-tap native HealthHub interaction.'
    },
    [ScreenId.ReminderSettings]: {
      title: 'Screen 4: Personalized Reminders & Opt-in',
      problemSolved: 'Patients forget. FH testing takes place weeks after clinic visits. Without active, user-controlled communication, appointments are easily forgotten, and users ignore standard generic reminders.',
      uxGuidelines: [
        'Empowered Opt-in: Toggles let patients choose how they want to be reached (SMS, HealthHub Push, or Both). Users are less likely to ignore notifications when they feel in control.',
        'Interactive Message Preview: Shows a realistic mockup of the SMS text so patients know exactly what to expect from "MOH HealthHub" in their message feed.',
        'Customizable Frequencies: Allows setting reminders at 7 days before, 1 day before, or monthly for general education, keeping them engaged without spamming.'
      ],
      govTechPrinciples: [
        { label: 'Trustworthy Copywriting', desc: 'SMS preview displays clear identification (e.g., "HealthHub Singapore: Your FH Genetic Counselling is in 7 days..."), preventing spam suspicion.' },
        { label: 'Zero dark patterns', desc: 'Easy one-click opt-out to respect user preference and maintain governmental integrity.' }
      ],
      accessibilityForSeniors: 'Uses high-contrast toggle switches that have both visual labels (ON/OFF) and colors (green/gray) to accommodate color-blind patients.',
      dropOffImpact: 'Mitigates forgetfulness and procrastination, which represent over 40% of patient referral drop-offs.'
    },
    [ScreenId.ProgressTimeline]: {
      title: 'Screen 5: Active Progress Timeline',
      problemSolved: 'Clinical disorientation. Genetic referrals feel like a black box. Patients do not know what steps lie ahead, how long they take, or what happens next, causing them to disengage.',
      uxGuidelines: [
        'Milestone Visualization: A clear vertical sequence with completed checkmarks (e.g., ✓ Referral Received, ✓ Education Completed) and future translucent states (e.g. Receive Results).',
        'Timeline Countdown: Prominently shows "Your appointment is in 6 days" and displays the clinic address with an integrated map direction CTA.',
        'Preparation Prompt: Direct connection back to the prep checklist right below the timeline, ensuring patients are medically prepared before arrival.'
      ],
      govTechPrinciples: [
        { label: 'Supportive Context', desc: 'Calculates and displays the exact time/date of the next action, reminding the patient without clinical coldness.' },
        { label: 'Connected Ecosystem', desc: 'Coordinates education completion, reminder setup, and booking milestones into a single cohesive story.' }
      ],
      accessibilityForSeniors: 'Icons represent each milestone clearly. Visual connecting lines have high color-contrast. Layout is spacious and easily readable.',
      dropOffImpact: 'Fosters patient self-efficacy and psychological momentum. Showing patients how close they are to completion encourages them to follow through.'
    },
    [ScreenId.NotificationMock]: {
      title: 'Screen 6: Actionable Push Notification',
      problemSolved: 'Delayed action. Traditional reminders require opening an SMS, clicking a link, logging into a portal, and finding the appointment. Friction at the gateway leads to high no-show rates.',
      uxGuidelines: [
        'Direct Interstitial Reminders: Mimics a standard mobile lock-screen notification that can be triggered in 1-click via the dashboard.',
        'Actionable CTA Buttons: Include "Confirm Attendance" and "Reschedule" directly as action buttons on the notification layout itself.',
        'Instant Sync: Clicking "Confirm Attendance" automatically marks the appointment as confirmed in HealthHub, saving valuable time.'
      ],
      govTechPrinciples: [
        { label: 'Reassurance-focused', desc: 'Uses supportive copywriting: "Your health matters to your family. Confirm your slot or adjust it in seconds."' }
      ],
      accessibilityForSeniors: 'Bypasses the need to navigate complex app menus. The older adult can handle the entire appointment with a single tap from their phone’s notification screen.',
      dropOffImpact: 'Converts passive reminder receipt into active, immediate compliance. Overcomes booking forgetfulness at the critical 7-day pre-appointment window.'
    },
    [ScreenId.Profile]: {
      title: 'Screen 7: Integrated Health & Family Profile',
      problemSolved: 'Fragmented health records. Patients often do not see how their current clinical indicators (like severely elevated cholesterol) link directly to family history or genetic risks, making genetic testing seem unnecessary or abstract.',
      uxGuidelines: [
        'Singpass Verification Badge: A reassuring visual indicator that identity details are legally pre-cleared, boosting trust and security.',
        'Structured Health Metrics: Highlighting key risk indicators (e.g. LDL cholesterol 5.4 mmol/L) alongside the active Familial Hypercholesterolemia (FH) referral.',
        'Visual Family Risk Tree: Displaying maternal/paternal cardiac history (such as premature heart attacks) in a clean, high-contrast list format, making the genetic link immediate and scannable.',
        'Data Privacy & Moratorium Reassurance: Explaining Singapore’s genetic data privacy protection in clear terms directly on the profile page, eliminating fear of insurance discrimination.',
      ],
      govTechPrinciples: [
        { label: 'Citizen-Centric Design', desc: 'Pre-populates verified address, CHAS subsidy status, and MediSave balance from Singpass, reducing manual data entry to zero.' },
        { label: 'Trustworthy & Secure', desc: 'Communicates legal privacy protections transparently alongside clinical metrics to foster long-term patient confidence.' }
      ],
      accessibilityForSeniors: 'Uses clean table grids with generous spacing, high color-contrast ratio tags, and simple, supportive descriptions instead of dense medical jargon.',
      dropOffImpact: 'Reinforces the personal and familial importance of genetic testing. Seeing their elevated cholesterol level alongside their father\'s premature heart disease directly motivates patients to attend their appointment.'
    }
  };

  const current = annotationsByScreen[activeScreen];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Figma Annotation Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-300">Figma Wireframe Annotations</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/80 px-2 py-1 rounded text-[11px] font-mono text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>GovTech SG UX Spec</span>
        </div>
      </div>

      {/* Screen Selection Tabs (Figma Style) */}
      <div className="bg-slate-950 px-4 py-2 flex flex-wrap gap-1 border-b border-slate-800/80">
        {(Object.keys(annotationsByScreen) as ScreenId[]).map((scrId) => (
          <button
            key={scrId}
            onClick={() => onSelectScreen(scrId)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeScreen === scrId
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {scrId.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Annotation Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-emerald-300 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            {current.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">Singapore HealthHub Extension Initiative</p>
        </div>

        {/* Core Drop-off Problem Addressed */}
        <div className="bg-rose-950/30 border border-rose-900/40 p-4 rounded-xl space-y-1.5">
          <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            Patient Drop-off Problem Addressed:
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {current.problemSolved}
          </p>
        </div>

        {/* Drop-off Compliance Impact */}
        <div className="bg-emerald-950/30 border border-emerald-900/40 p-4 rounded-xl space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            Compliance Impact on Completion Rate:
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {current.dropOffImpact}
          </p>
        </div>

        {/* UX Guidelines (Figma Spec Style) */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            Interaction & UX Decisions
          </h3>
          <ul className="space-y-3">
            {current.uxGuidelines.map((guideline, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-slate-300">
                <span className="font-mono text-emerald-500 font-bold bg-emerald-950/60 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border border-emerald-800/50">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{guideline}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* GovTech Design Principles Applied */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-emerald-500" />
            GovTech Design Principles Applied
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {current.govTechPrinciples.map((principle, idx) => (
              <div key={idx} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider font-mono">
                  {principle.label}
                </p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Seniors Accessibility Section */}
        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-500" />
            Older Adult (Senior) Accessibility
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {current.accessibilityForSeniors}
          </p>
        </div>
      </div>

      {/* Figma Metadata Footer */}
      <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-emerald-500" />
          <span>Figma Ver. 4.2 (Singapore GovTech)</span>
        </div>
        <span>Approved for HealthHub v12.4</span>
      </div>
    </div>
  );
}
