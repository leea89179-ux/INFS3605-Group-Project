import { FAQItem } from '../types';

export interface EduSection {
  id: string;
  title: string;
  shortSummary: string;
  readingTime: string;
  content: string;
  keyTakeaway: string;
  iconName?: string;
  tags?: string[];
  subsections?: { title: string; text: string }[];
  steps?: { num: number; title: string; description: string }[];
}

export interface HelpfulResource {
  id: string;
  title: string;
  summary: string;
  keywords: string[];
  readingTime: string;
  iconName: string;
  type: 'PDF Brochure' | 'Clinical Guide' | 'Official Code' | 'Video Story' | string;
  downloadSize: string;
  pages: { title: string; paragraphs: string[] }[];
  externalUrl?: string;
}

export const educationalSections: EduSection[] = [
  {
    id: 'what-is-fh',
    title: 'What is FH?',
    shortSummary: 'What FH is and why early diagnosis matters.',
    readingTime: '3 min read',
    content: "Familial Hypercholesterolaemia (FH) is an inherited condition that prevents the body from clearing 'bad' LDL cholesterol from the blood. Unlike standard high cholesterol caused by diet or lifestyle, FH cholesterol levels are extremely high from birth, which can silently damage blood vessels and increase the risk of early heart disease.",
    keyTakeaway: 'FH is entirely genetic and present from birth, meaning medical therapy is almost always required alongside healthy habits.',
    iconName: 'BookOpen',
    tags: ['cholesterol', 'genetics', 'heart health'],
    subsections: [
      {
        title: 'HOW COMMON IS IT?',
        text: 'FH affects approximately 1 in 250 Singaporeans. Most people with FH are unaware they have it until they receive a genetic test.'
      },
      {
        title: 'IS IT MY FAULT?',
        text: 'No. FH is entirely genetic. It is inherited from parents and cannot be resolved through diet or exercise alone—though healthy habits are still crucial.'
      }
    ]
  },
  {
    id: 'why-testing-matters',
    title: 'Protecting Your Family',
    shortSummary: 'How cascade screening keeps your loved ones safe.',
    readingTime: '3 min read',
    content: "Genetic testing is the gold standard to confirm if you have FH. Finding the specific gene variation responsible for your high cholesterol allows doctors to customize your preventative care and protect those you love most.",
    keyTakeaway: 'One test can protect both you and the people you love.',
    iconName: 'Users',
    tags: ['family', 'cascade screening', 'children'],
    subsections: [
      {
        title: 'PROTECTING YOUR FAMILY (CASCADE SCREENING)',
        text: 'If you test positive, your parents, siblings, and children have a 50% chance of having the same gene. Testing allows them to get screened and start preventative care early, saving lives.'
      },
      {
        title: 'PRECISION TREATMENT',
        text: 'Confirming your FH genotype helps your doctor select the precise dosage and type of lipid-lowering medication (such as high-potency statins).'
      }
    ]
  },
  {
    id: 'testing-guide',
    title: 'Your Testing Guide',
    shortSummary: 'Step by step from counselling to your results.',
    readingTime: '4 min read',
    content: "Your referral journey is designed to be highly structured, supportive, and completely outpatient. No fasting is required for the standard blood draw.",
    keyTakeaway: 'Every step is designed to fit seamlessly into your normal schedule.',
    iconName: 'ClipboardList',
    tags: ['blood test', 'counselling', 'what to expect'],
    steps: [
      { num: 1, title: 'Learn about FH', description: 'Read these simple, personalised guides in your HealthHub app.' },
      { num: 2, title: 'Book counselling', description: 'Schedule your session easily directly on this app with your preferred slot.' },
      { num: 3, title: 'Attend the session', description: 'A friendly 30-minute talk with a genetic counsellor to review family history.' },
      { num: 4, title: 'Standard blood draw', description: 'A simple 10-minute draw at the clinic. No fasting or diet prep needed.' },
      { num: 5, title: 'Get results in 4-6 weeks', description: 'Meet with your specialist to receive a clear, easy-to-understand explanation.' },
      { num: 6, title: 'Custom preventative plan', description: 'If confirmed, start safe, subsidized therapies that bring your risk back to normal.' }
    ]
  },
  {
    id: 'costs-subsidies',
    title: 'Costs and Subsidies',
    shortSummary: 'What you pay and how subsidies and MediSave help.',
    readingTime: '2.5 min read',
    content: "GovTech Singapore works with the Ministry of Health to ensure healthcare remains accessible. Genetic testing for FH is heavily subsidized.",
    keyTakeaway: 'Out-of-pocket costs are highly claimable via MediSave under chronic disease management guidelines.',
    iconName: 'Coins',
    tags: ['MediSave', 'CHAS', 'subsidies'],
    subsections: [
      {
        title: 'MOH SUBSIDIES',
        text: 'Eligible Singapore Citizens receive 50% to 75% subsidies for the genetic counselling and test, depending on their household means-testing tier.'
      },
      {
        title: 'MEDISAVE USAGE',
        text: 'The remaining out-of-pocket costs can be offset using your MediSave account under the chronic disease management guidelines, minimizing immediate cash payment.'
      },
      {
        title: 'CHAS CARD BENEFITS',
        text: 'CHAS Blue, Orange, and Pioneer/Merdeka Generation cardholders receive enhanced subsidies, which are automatically applied at checkout.'
      }
    ]
  },
  {
    id: 'insurance-rights',
    title: 'Insurance & Your Rights',
    shortSummary: 'How the LIA Moratorium protects you.',
    readingTime: '3 min read',
    content: "Singapore's Ministry of Health and the Life Insurance Association (LIA) maintain a strict Consumer Code on Genetic Testing to safeguard your healthcare data and insurance access.",
    keyTakeaway: 'National guidelines completely safeguard your right to take a proactive test without any policy impact.',
    iconName: 'Shield',
    tags: ['insurance', 'privacy', 'LIA moratorium'],
    subsections: [
      {
        title: 'NO IMPACT ON EXISTING PLANS',
        text: 'Existing active policies (like MediShield Life or Integrated Shield Plans) can never be altered, canceled, or re-priced.'
      },
      {
        title: 'STRICT LIA MORATORIUM',
        text: 'Insurers are prohibited from asking you to take a genetic test, or from asking for genetic results for standard life/health policies below high thresholds.'
      }
    ]
  },
  {
    id: 'medication-fh',
    title: 'Medication & FH',
    shortSummary: 'How statins work and what to expect.',
    readingTime: '2 min read',
    content: "Because FH is a genetic condition present from birth, lifestyle changes alone are usually not enough to lower cholesterol to safe levels. Daily medications play a critical role in reducing your risk.",
    keyTakeaway: 'Starting treatment early can reduce your cardiovascular risk back to that of the general population.',
    iconName: 'Pill',
    tags: ['statins', 'medication', 'treatment'],
    subsections: [
      {
        title: 'ROLE OF STATINS',
        text: 'Statins are extremely safe and well-studied medications that help your liver clear cholesterol from your blood.'
      },
      {
        title: 'EARLY TREATMENT SAVES LIVES',
        text: 'Starting treatment early can reduce your cardiovascular risk back to that of the general population.'
      }
    ]
  }
];

export const preCounsellingChecklist = [
  { id: 'prep-1', text: 'Bring your NRIC or Singpass for identity verification', checked: false },
  { id: 'prep-2', text: 'Prepare a list of your current medications & supplements', checked: false },
  { id: 'prep-3', text: 'Review Learn section for resources and common questions.', checked: false },
];

export const faqs: FAQItem[] = [
  {
    category: 'testing',
    question: 'How is FH different from diet-induced high cholesterol?',
    answer: "Unlike standard high cholesterol which is often influenced by lifestyle factors (like diet or a lack of exercise), FH high cholesterol is genetic. This means your body is naturally less efficient at clearing 'bad' LDL cholesterol from your blood from birth, regardless of your lifestyle choices."
  },
  {
    category: 'testing',
    question: 'Does a positive test mean I have heart disease?',
    answer: "No. A positive genetic test is not a diagnosis of heart disease or an indication that you will have a heart attack. It simply identifies an inherited risk. Armed with this knowledge early, your medical team can take highly effective preventative steps to keep your heart healthy."
  },
  {
    category: 'cost',
    question: 'How much will I pay out-of-pocket?',
    answer: "Between S$18 and S$120 after MOH subsidies and CHAS benefits. Crucially, the remaining balance can be 100% paid using MediSave under the Chronic Disease Management Scheme, meaning many Singaporeans pay S$0 cash out-of-pocket."
  },
  {
    category: 'insurance',
    question: "Will this affect my children's ability to get insurance?",
    answer: "No. Singapore's Life Insurance Association (LIA) maintains a strict genetic testing moratorium. Insurers are legally prohibited from asking you or your children for genetic test results to deny coverage or increase premiums for standard life or health insurance policies."
  },
  {
    category: 'medication',
    question: 'Can I stop my cholesterol medication during testing?',
    answer: "No, you should never stop or change your prescribed medication unless explicitly directed by your physician. The genetic test analyzes your DNA, which remains completely unchanged by any medications you are taking."
  }
];

export const helpfulResources: HelpfulResource[] = [
  {
    id: 'res-7',
    title: 'Patient Story: A Mother\'s Fight for Her Children',
    summary: 'A moving patient video sharing a mother’s perspective on living with FH and her hopes to get her two young children screened early to safeguard their future.',
    keywords: ['patient-story', 'video', 'mother', 'pediatric-screening', 'family-hope'],
    readingTime: '6-min Video',
    iconName: 'Play',
    type: 'Video Story',
    downloadSize: 'Video Stream',
    externalUrl: 'https://www.youtube.com/watch?v=3IKZzICJacw&feature=emb_imp_woyt',
    pages: [
      {
        title: 'A Mother\'s Journey: Living with Inherited FH',
        paragraphs: [
          'Sarah, a devoted mother of two young children, was diagnosed with Familial Hypercholesterolaemia (FH) after her own father suffered a premature heart attack.',
          'Growing up with the knowledge of how devastating heart disease can be when left unmanaged, she has been on a strict clinical treatment plan for years.',
          '"Having FH isn\'t a choice, but taking active control of it is," she shares. "My medication allows me to lead a full, active life for my family."'
        ]
      },
      {
        title: 'Hopes for Her Two Young Children',
        paragraphs: [
          'Because FH is inherited in an autosomal dominant pattern, each of Sarah\'s children has a 50% chance of inheriting the same genetic mutation.',
          'Sarah talks about her deep maternal instinct to protect her children from the early silent plaque build-ups she witnessed in her relatives.',
          '"My hope is to get my children screened early," she explains. "Undergoing pediatric screening means we will know their status and can take preventative action immediately if needed, long before any risk develops."'
        ]
      },
      {
        title: 'The Power of Early Intervention in Pediatrics',
        paragraphs: [
          'Clinical guidelines support screening children of FH parents as early as age 2 to 10. Early dietary management and eventual medical support can ensure these children have normal life expectancies.',
          'Sarah wants to spread awareness to other families so they don\'t fear genetic testing, but rather see it as a powerful gift of foresight and health preservation.',
          '"I want my children to grow up knowing they are safe and protected. Early screening gives us that peace of mind and the tools to protect their future."'
        ]
      }
    ]
  },
  {
    id: 'res-6',
    title: 'Patient Story: Living with FH (A Young Man\'s Journey)',
    summary: 'A powerful patient video sharing the experience of a young man diagnosed with FH, navigating early detection, genetic screening, and starting life with high cholesterol.',
    keywords: ['patient-story', 'video', 'young-adult', 'lived-experience'],
    readingTime: '5-min Video',
    iconName: 'Play',
    type: 'Video Story',
    downloadSize: 'Video Stream',
    externalUrl: 'https://www.youtube.com/watch?v=zEYN4xg5ACw',
    pages: [
      {
        title: 'Meet Joshua: Diagnosed with FH at Age 22',
        paragraphs: [
          'Joshua was an active, healthy young adult starting out his career when a routine insurance health check revealed extremely high cholesterol levels.',
          'Despite eating well and exercising regularly, his LDL level was over 7.5 mmol/L. "I couldn’t believe it," Joshua shares. "I thought cholesterol was only an issue for older, inactive people."',
          'A referral to genetic counselling confirmed he had Familial Hypercholesterolaemia (FH), inherited from his father\'s side.'
        ]
      },
      {
        title: 'Starting Life & Careers with a Genetic Diagnosis',
        paragraphs: [
          'Accepting a lifelong genetic condition in your early 20s can be emotionally challenging. Joshua talks about overcoming initial denial and learning to take charge of his health.',
          '"Finding out early was actually a blessing," he explains. "It meant I could start statin therapy early, before any silent plaque build-up could cause a heart attack in my 30s or 40s."',
          'Joshua emphasizes how critical it is for other young men and women not to ignore their family history of early heart disease.'
        ]
      },
      {
        title: 'Cascade Screening: Protecting the Next Generation',
        paragraphs: [
          'Joshua’s diagnosis prompted his sister and several cousins to get checked. Two of his cousins were also found to have FH and successfully started management.',
          'By sharing his story, Joshua hopes to de-stigmatize genetic cholesterol conditions and encourage active family conversations around cardiovascular health.',
          '"A simple DNA test and early support can literally save your family\'s lives. It did for mine."'
        ]
      }
    ]
  },
  {
    id: 'res-9',
    title: 'Consumer Guide: Moratorium on Genetic Testing and Insurance',
    summary: 'The official Ministry of Health Singapore consumer guide explaining the national moratorium, how genetic test results affect your insurance applications, and your rights as a consumer.',
    keywords: ['insurance', 'moratorium', 'genetic-testing', 'rights', 'lia-guidelines'],
    readingTime: '6-page Guide',
    iconName: 'ShieldCheck',
    type: 'Clinical Guide',
    downloadSize: '820 KB',
    externalUrl: 'https://www.nhghealth.com.sg/media/public/content/41a563bac4ea4b1aa78bfb5920db4e52?v=e3572947',
    pages: [
      {
        title: 'Understanding the Genetic Testing Moratorium',
        paragraphs: [
          'The Ministry of Health (MOH) Singapore and the Life Insurance Association (LIA) have established a national moratorium on genetic testing and insurance.',
          'Under this agreement, individuals who undergo diagnostic or predictive genetic testing for clinical purposes, such as Familial Hypercholesterolaemia (FH), are protected against unfair insurance discrimination.',
          'This means you can pursue early, life-saving clinical DNA tests and counselling with peace of mind.'
        ]
      },
      {
        title: 'What Policies and Financial Limits Apply?',
        paragraphs: [
          'The moratorium covers most common consumer insurance plans up to high financial coverage limits.',
          'For instance, standard life insurance policies up to S$500,000, and critical illness policies up to S$150,000, do not require you to disclose predictive genetic test results.',
          'As long as your applied coverage falls within these limits, you can obtain standard protection without any premium loading or coverage denial based on your genetic test results.'
        ]
      },
      {
        title: 'Your Safeguarded Rights as a Consumer',
        paragraphs: [
          'Insurers in Singapore are strictly prohibited from asking you to undergo a genetic test in order to apply for an insurance policy.',
          'Furthermore, they cannot ask you to disclose the results of any predictive genetic tests you have previously completed, whether for research or clinical care.',
          'These guidelines are designed to support patient wellness, ensuring genetic testing is seen as a helpful health-management tool rather than a financial liability.'
        ]
      }
    ]
  },
  {
    id: 'res-5',
    title: 'Singapore Heart Foundation FH Guide',
    summary: 'The Singapore Heart Foundation informative guide on FH risk factors, cardiovascular implications, and lifestyle modifications to manage genetic high cholesterol.',
    keywords: ['shf', 'risk-factors', 'heart-health', 'prevention'],
    readingTime: '5-page Digital Guide',
    iconName: 'Heart',
    type: 'Clinical Guide',
    downloadSize: '450 KB',
    externalUrl: 'https://www.myheart.org.sg/health/risk-factors/familial-hypercholesterolemia/',
    pages: [
      {
        title: 'Understanding FH Risk Factors & Heart Health',
        paragraphs: [
          'The Singapore Heart Foundation emphasizes that FH is not caused by unhealthy diet or lifestyle choices alone, but is a genetic disorder passed down through families.',
          'Due to the mutated gene, the liver is unable to recycle and clear the "bad" LDL cholesterol, resulting in circulating cholesterol levels that are 2 to 4 times higher than normal.',
          'This lifelong exposure can damage the arterial walls, forming plaques that narrow arteries. This increases the risk of coronary heart disease, angina, and early heart attacks.'
        ]
      },
      {
        title: 'Preventative Actions and Lifestyle Adjustments',
        paragraphs: [
          'While medical therapy is paramount for FH, healthy lifestyle habits form the foundation of cardiovascular disease prevention.',
          'SHF recommends a diet low in saturated and trans fats, replacing them with heart-healthy monounsaturated and polyunsaturated fats found in olive oil, nuts, and fish.',
          'Regular physical activity, maintaining a healthy weight, and avoiding smoking are essential to reduce overall cardiovascular risk factors and protect the blood vessels.'
        ]
      }
    ]
  },
  {
    id: 'res-4',
    title: 'Primary Care FH English Brochure',
    summary: 'A comprehensive educational brochure distributed by Singapore Primary Care Network for patients and families about FH detection, genetic risks, and treatment options.',
    keywords: ['primary-care', 'brochure', 'patient-handout'],
    readingTime: '4-page Brochure',
    iconName: 'BookOpen',
    type: 'PDF Brochure',
    downloadSize: '1.1 MB',
    externalUrl: 'https://www.primarycarepages.sg/schemes-and-programmes/Documents/Familial%20Hypercholesterolaemia%20Brochures%20(English).pdf',
    pages: [
      {
        title: 'What is Familial Hypercholesterolaemia?',
        paragraphs: [
          'Familial Hypercholesterolaemia (FH) is an inherited condition that causes extremely high levels of low-density lipoprotein (LDL) cholesterol (often called "bad" cholesterol) from birth.',
          'If you have FH, your body is unable to remove LDL cholesterol from your blood effectively. Over time, this excess cholesterol builds up in your blood vessels, including the coronary arteries of the heart.',
          'Because this build-up starts in childhood, it can lead to early-onset heart disease if left untreated. Recognizing the signs early is key to initiating protective treatment.'
        ]
      },
      {
        title: 'Signs, Symptoms & Clinical Diagnosis',
        paragraphs: [
          'Most people with FH do not look or feel sick. However, some individuals may develop physical signs of cholesterol build-up on their bodies.',
          'These physical signs include xanthomas (waxy cholesterol deposits on the tendons, particularly the Achilles tendon or knuckles), xanthelasmas (yellowish cholesterol patches around the eyelids), or corneal arcus (a white or grey ring around the iris of the eye before the age of 45).',
          'Clinical diagnosis is based on these physical findings, exceptionally high LDL-C levels, and a family history of early heart disease. A DNA genetic test confirms the specific gene variation.'
        ]
      },
      {
        title: 'Why Family Cascade Screening is Crucial',
        paragraphs: [
          'Because FH is inherited in a 50/50 autosomal dominant pattern, identifying one person with FH means their close family members—parents, siblings, and children—are also at high risk.',
          'Cascade screening is the clinical process of testing these family members. By testing relatives, we can find others who have the condition and start treatment early, long before any cardiovascular damage or symptoms develop.',
          'Subsidised cholesterol checks and genetic counselling are available in Singapore polyclinics to assist families with cascade screening.'
        ]
      }
    ]
  },
  {
    id: 'res-8',
    title: 'NHG Genomics Assessment Clinic (GAC) Brochure',
    summary: 'The National Healthcare Group official Genomics Assessment Clinic patient guide on clinical genetic counselling, risk assessment, and DNA testing in Singapore.',
    keywords: ['nhg', 'gac', 'genetic-counselling', 'dna-testing', 'clinical-genomics'],
    readingTime: '8-page Brochure',
    iconName: 'ClipboardList',
    type: 'PDF Brochure',
    downloadSize: '1.2 MB',
    externalUrl: 'https://www.nhghealth.com.sg/media/public/content/776b3bf7ad7c40cfb26440ae0d92b572?v=6b7d92d2',
    pages: [
      {
        title: 'Introduction to NHG Genomics Assessment Clinic',
        paragraphs: [
          'The NHG Genomics Assessment Clinic (GAC) is a specialized clinic focused on providing genetic risk assessments, counselling, and clinical diagnostic testing for inherited conditions.',
          'At GAC, multi-disciplinary teams of clinical geneticists, cardiologists, and certified genetic counsellors work together to evaluate individuals and families with suspected inherited cardiovascular risks, such as Familial Hypercholesterolaemia (FH).',
          'Our mission is to help you understand your genetic health, identify risks early, and coordinate appropriate medical management.'
        ]
      },
      {
        title: 'What to Expect During Genetic Counselling',
        paragraphs: [
          'Genetic counselling is a supportive process where a genetic counsellor explains how genetic factors contribute to your family’s medical history.',
          'During your session, the counsellor will construct a detailed multi-generational family health tree, evaluate your specific risk factors, and discuss the benefits, limitations, and implications of genetic testing.',
          'Our goal is to empower you to make informed decisions about genetic testing in a private, supportive, and non-judgmental environment.'
        ]
      },
      {
        title: 'The Role of DNA Testing and Cascade Screening',
        paragraphs: [
          'A simple clinical genetic test (such as a saliva or blood sample) can identify specific DNA variants responsible for FH.',
          'Once a genetic variant is found, Cascade Screening can be offered to your direct relatives—including parents, siblings, and children—to determine if they also carry the same genetic risk.',
          'By identifying FH early through coordinated genetic assessments, individuals can start proactive medical therapies and lifestyle modifications decades before any cardiac symptoms occur.'
        ]
      }
    ]
  },
  {
    id: 'res-1',
    title: 'NUHS Clinical FH Patient Pamphlet',
    summary: 'The official National University Health System clinical pamphlet explaining DNA test mechanics, cardiovascular risk, and lipid management in Singapore.',
    keywords: ['nuhs', 'patient-handout', 'clinical-pamphlet'],
    readingTime: '6-page Brochure',
    iconName: 'BookOpen',
    type: 'PDF Brochure',
    downloadSize: '920 KB',
    externalUrl: 'https://www.nuhs.edu.sg/docs/nuhslibraries/content-document/research/familial-hypercholesterolemia-english.pdf?sfvrsn=6b9d15ae_1',
    pages: [
      {
        title: 'Understanding Your Referral & Genetic Counselling',
        paragraphs: [
          'Welcome to the National Heart Centre Singapore (NHCS). You have been referred here because your clinical profile or family history indicates a high likelihood of Familial Hypercholesterolaemia (FH).',
          'FH is a genetic condition present from birth. Unlike regular high cholesterol, which is heavily influenced by diet, FH is caused by an inherited variation that prevents your liver from clearing "bad" LDL cholesterol. Left untreated, high cholesterol silently damages coronary arteries.',
          'Your first step is genetic counselling. A trained genetic counsellor will review your 3-generation family tree, answer your questions, and walk you through the DNA test. No fasting is required for the test, and your results are completely confidential.'
        ]
      },
      {
        title: 'The Genetics of FH & Autosomal Dominant Inheritance',
        paragraphs: [
          'FH is inherited in an autosomal dominant pattern. This means you only need to inherit one copy of the altered gene from one parent to have the condition.',
          'Consequently, if you test positive for FH, each of your first-degree relatives—including parents, brothers, sisters, and children—has a 50% (1-in-2) chance of carrying the exact same gene variation.',
          'This is why genetic testing is so powerful: once we identify your specific genetic marker, we can offer targeted "cascade screening" to your family members. Testing your children early (from age 2 onwards) allows us to safeguard their cardiovascular health before any damage begins.'
        ]
      },
      {
        title: 'Initiating the Conversation with Family',
        paragraphs: [
          'Sharing your genetic risk with your loved ones can feel daunting, but it is one of the most proactive and loving steps you can take to protect them.',
          'Most people with FH have no physical symptoms and feel entirely healthy, meaning they are unaware of their cardiovascular risk. We provide you with a structured, professional family letter that you can share with your siblings, parents, and children.',
          'This letter invites them to undergo simple, highly subsidized lipid checks and genetic screening. Early treatment with safe, standard therapies brings their life expectancy and heart health back to the Singapore national average.'
        ]
      }
    ]
  },
  {
    id: 'res-2',
    title: 'MOH National FH Genetic Testing Programme',
    summary: 'The official Ministry of Health Singapore press announcement launching the subsidized national clinical DNA testing and cascade screening initiative.',
    keywords: ['moh', 'guidelines', 'clinical-standards'],
    readingTime: '18-page Document',
    iconName: 'Dna',
    type: 'Clinical Guide',
    downloadSize: '1.4 MB',
    externalUrl: 'https://www.moh.gov.sg/newsroom/launch-of-national-familial-hypercholesterolaemia-genetic-testing-programme-/',
    pages: [
      {
        title: 'Diagnostic Criteria & Dutch Lipid Clinic Network Score',
        paragraphs: [
          'The Ministry of Health (MOH) of Singapore recommends utilizing the Dutch Lipid Clinic Network (DLCN) criteria as the clinical gold standard for diagnosing FH.',
          'Scores are calculated based on family history (early cardiovascular disease in relatives), personal history (premature coronary artery disease or stroke), physical examination (presence of tendon xanthomas or corneal arcus before age 45), and baseline LDL cholesterol levels.',
          'An LDL cholesterol level exceeding 8.5 mmol/L (330 mg/dL) or a confirmed functional mutation in the LDLR, APOB, or PCSK9 genes yields a definitive diagnosis of Familial Hypercholesterolaemia.'
        ]
      },
      {
        title: 'Therapeutic Targets & Pharmacotherapy Protocols',
        paragraphs: [
          'Because FH results in lifelong elevation of LDL cholesterol from birth, aggressive pharmacological intervention is critical. Lifestyle changes are valuable adjuncts but are insufficient to treat the root genetic clearance defect.',
          'MOH clinical practice guidelines advocate for high-potency statin therapy (e.g., Atorvastatin or Rosuvastatin) as the primary treatment line. The goal is to achieve a ≥50% reduction in LDL cholesterol from baseline levels.',
          'For patients who do not reach their target lipid levels on maximally tolerated statin doses, combination therapy with Ezetimibe or PCSK9 inhibitors is highly recommended and subsidized under the MOH Medication Assistance Scheme.'
        ]
      },
      {
        title: 'Implementation of National Cascade Screening',
        paragraphs: [
          'A key directive of Singapore\'s National Precision Medicine program is the systematic rollout of cascade screening. Cascade screening is the active process of identifying and testing the relatives of an individual diagnosed with FH (the proband).',
          'Clinical evidence demonstrates that cascade screening is one of the most cost-effective interventions in modern genetics. For every proband identified, an average of 2.6 family members are successfully screened and treated, significantly reducing premature heart attacks nationwide.',
          'Subsidies of up to 75% are available at all public polyclinics and specialist outpatient clinics to ensure financial barriers do not prevent families from accessing this life-saving preventive care.'
        ]
      }
    ]
  }
];
