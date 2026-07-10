import { FAQItem } from '../types';

export interface EduSection {
  id: string;
  title: string;
  shortSummary: string;
  content: string;
  iconName: string;
  subsections?: { title: string; text: string }[];
}

export const educationalSections: EduSection[] = [
  {
    id: 'what-is-fh',
    title: 'What is FH?',
    shortSummary: 'Familial Hypercholesterolaemia (FH) is a common genetic condition that causes very high cholesterol.',
    iconName: 'HeartPulse',
    content: `Familial Hypercholesterolaemia (FH) is an inherited condition that prevents the body from clearing 'bad' LDL cholesterol from the blood. Unlike standard high cholesterol caused by diet or lifestyle, FH cholesterol levels are extremely high from birth, which can silently damage blood vessels and increase the risk of early heart disease.`,
    subsections: [
      {
        title: 'How common is it?',
        text: 'FH affects approximately 1 in 250 Singaporeans. Most people with FH are unaware they have it until they receive a genetic test.'
      },
      {
        title: 'Is it my fault?',
        text: 'No. FH is entirely genetic. It is inherited from parents and cannot be resolved through diet or exercise alone—though healthy habits are still crucial.'
      }
    ]
  },
  {
    id: 'why-testing-matters',
    title: 'Why Genetic Testing Matters',
    shortSummary: 'Confirming FH unlocks personalized care and protects your loved ones through cascade screening.',
    iconName: 'Dna',
    content: `Genetic testing is the gold standard to confirm if you have FH. Finding the specific gene variation responsible for your high cholesterol allows doctors to customize your preventative care.`,
    subsections: [
      {
        title: 'Protecting your family (Cascade Screening)',
        text: 'If you test positive, your parents, siblings, and children have a 50% chance of having the same gene. Testing allows them to get screened and start preventative care early, saving lives.'
      },
      {
        title: 'Precision Treatment',
        text: 'Confirming your FH genotype helps your doctor select the precise dosage and type of lipid-lowering medication (such as high-potency statins).'
      }
    ]
  },
  {
    id: 'how-it-works',
    title: 'The Testing Process',
    shortSummary: 'A simple blood test accompanied by genetic counselling—no special fasting required.',
    iconName: 'ClipboardList',
    content: `The entire process is designed to support you. It consists of three clear steps.`,
    subsections: [
      {
        title: '1. Genetic Counselling Session (30 mins)',
        text: 'A genetic counsellor will review your family medical history, explain what the test results mean, and answer any concerns you or your family may have.'
      },
      {
        title: '2. Simple Blood Test (10 mins)',
        text: 'If you consent, a small blood sample is collected. You do not need to fast for this specific genetic test.'
      },
      {
        title: '3. Result Discussion (4-6 weeks later)',
        text: 'You will meet your doctor or counsellor again to review the results and adjust your health plan accordingly.'
      }
    ]
  },
  {
    id: 'costs-and-subsidies',
    title: 'Costs and Subsidies',
    shortSummary: 'Up to 75% Ministry of Health (MOH) subsidies for eligible Singapore citizens.',
    iconName: 'Coins',
    content: `GovTech Singapore works with the Ministry of Health to ensure healthcare remains accessible. Genetic testing for FH is heavily subsidized.`,
    subsections: [
      {
        title: 'MOH Subsidies',
        text: 'Eligible Singapore Citizens receive 50% to 75% subsidies for the genetic counselling and test, depending on their household means-testing tier.'
      },
      {
        title: 'MediSave Usage',
        text: 'The remaining out-of-pocket costs can be offset using your MediSave account under the chronic disease management guidelines, minimizing immediate cash payment.'
      },
      {
        title: 'CHAS Card Benefits',
        text: 'CHAS Blue, Orange, and Pioneer/Merdeka Generation cardholders receive enhanced subsidies, which are automatically applied at checkout.'
      }
    ]
  },
  {
    id: 'insurance-implications',
    title: 'Insurance & Healthcare Policies',
    shortSummary: 'FH genetic testing is protected under national moratoriums and does not affect your existing shield plans.',
    iconName: 'ShieldAlert',
    content: `A common concern is whether a genetic diagnosis will affect your insurance coverage. Singapore has strong consumer protections in place.`,
    subsections: [
      {
        title: 'Singapore Insurance Moratorium',
        text: 'Singapore Life Insurance Association (LIA) maintains a moratorium. Insurers cannot ask you to undergo or disclose genetic test results for standard life or health insurance coverage below high limits.'
      },
      {
        title: 'Existing Policies',
        text: 'Existing medical insurance (such as MediShield Life or Integrated Shield Plans) already active cannot be altered or cancelled due to new genetic test results.'
      }
    ]
  },
  {
    id: 'medications',
    title: 'Medication Considerations',
    shortSummary: 'Statins are highly effective, well-tolerated, and play a key role in managing FH cholesterol.',
    iconName: 'Pills',
    content: `Since FH causes high cholesterol since birth, lifestyle modifications are typically supplemented with prescription medications to bring LDL down to safe levels.`,
    subsections: [
      {
        title: 'Statins',
        text: 'Statins work by blocking the enzyme in your liver that makes cholesterol. They are highly researched and proven to reduce cardiovascular risks by up to 50%.'
      },
      {
        title: 'PCSK9 Inhibitors',
        text: 'For patients requiring stronger LDL reduction, modern injectable therapies (PCSK9 inhibitors) are available and eligible for MOH medication subsidies.'
      }
    ]
  }
];

export const preCounsellingChecklist = [
  { id: 'prep-1', text: 'Gather family history of heart disease, heart attacks, or high cholesterol (noting ages).', checked: false },
  { id: 'prep-2', text: 'Prepare a list of your current medications and supplements.', checked: false },
  { id: 'prep-3', text: 'Write down questions you want to ask your genetic counsellor.', checked: false },
  { id: 'prep-4', text: 'Review and pre-sign the HealthHub Genetic Counselling Consent Info-sheet.', checked: false },
];

export const faqs: FAQItem[] = [
  {
    category: 'about',
    question: 'How is FH different from diet-induced high cholesterol?',
    answer: 'Standard high cholesterol fluctuates with diet and exercise. FH is a genetic fault where the liver lacks the receptors to clear cholesterol, leading to persistent, high cholesterol starting from infancy. Diet and lifestyle alone cannot reduce FH cholesterol to safe levels.'
  },
  {
    category: 'testing',
    question: 'Does a positive test mean I have heart disease?',
    answer: 'No. A positive test confirms you have the FH gene, meaning you are at higher risk. It does NOT mean you have heart disease. Confirming early allows you to take preventative medications, effectively reducing your risk back to that of a person without FH.'
  },
  {
    category: 'cost',
    question: 'How much will I pay out-of-pocket?',
    answer: 'With government subsidies and MediSave, the average out-of-pocket cost for a subsidized Singapore Citizen ranges between S$50 and S$120. Genetic counselling sessions are priced separately and are also heavily subsidized.'
  },
  {
    category: 'insurance',
    question: 'Will this affect my children’s ability to get insurance?',
    answer: 'No. Insurance companies cannot discriminate against family members of individuals who have tested positive. Family members are only requested to share their own medical histories, and under Singapore’s moratorium guidelines, standard genetic tests are protected.'
  },
  {
    category: 'medication',
    question: 'Can I stop my cholesterol medication during testing?',
    answer: 'Never stop or change your cholesterol medications unless instructed by your cardiologist or lipid specialist. The genetic test analyzes DNA, which is unaffected by whether you are currently taking medications.'
  }
];
