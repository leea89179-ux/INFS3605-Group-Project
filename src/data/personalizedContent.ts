import { Language } from './translations';

export interface VisualItem {
  icon: string;
  label: string;
  text: string;
}

export interface PersonalizedGuide {
  id: string;
  title: string;
  shortSummary: string;
  readingTime: string;
  iconName: string;
  keyTakeaway: string;
  content: string; // Used as the 1 short introduction sentence
  visualItems?: VisualItem[];
  sourceId?: string;
  disclaimer?: string;
  isPersonalized?: boolean;
  
  // Explicit fields required by personalization spec
  personalisedIntroduction: string;
  personalisedKeyPoints: VisualItem[];
  relevantVisual: VisualItem[];
  practicalNextStep: string;
  personalisedKeyTakeaway: string;
  optionalLearnMore?: string;
}

export type KnowledgeLevelVariant = 'new' | 'little' | 'research' | 'advanced';
export type ConcernVariant = 'general' | 'test' | 'family' | 'cost' | 'insurance' | 'meds' | 'heart';

interface VariantContent {
  intro: string;
  keyTakeaway: string;
  practicalNextStep: string;
  points: VisualItem[];
}

export interface ResolveGuideOptions {
  topicId: string;
  knowledgeLevel: KnowledgeLevelVariant | string;
  selectedConcerns?: string[];
  preferredLanguage?: Language;
}

// Medical advice disclaimer across supported languages
const disclaimers: Record<Language, string> = {
  en: 'This information supports your learning and does not replace advice from your healthcare professional.',
  ms: 'Maklumat ini menyokong pembelajaran anda dan tidak menggantikan nasihat daripada profesional kesihatan anda.',
  zh: '此信息仅供学习参考，不能替代医疗专业人员的建议。',
  ta: 'இந்தத் தகவல் உங்கள் கற்றலை ஆதரிக்கிறது மற்றும் உங்கள் சுகாதார நிபுணரின் ஆலோசனையை மாற்றாது.'
};

// Approved Source IDs for Medical Accuracy Grounding
const sourceIdMap: Record<string, string> = {
  'what-is-fh': 'approved-fh-basics-01',
  'why-testing-matters': 'approved-fh-cascade-01',
  'testing-guide': 'approved-fh-genetic-testing-01',
  'costs-subsidies': 'approved-fh-costs-01',
  'insurance-rights': 'approved-fh-insurance-01',
  'medication-fh': 'approved-fh-treatment-01'
};

// Localized Title Metadata
const META_DATA: Record<Language, Record<string, { title: string; shortSummary: string; readTime: string; icon: string }>> = {
  en: {
    'what-is-fh': { title: 'What is FH?', shortSummary: 'Learn what FH is and why early diagnosis matters.', readTime: '3 min read', icon: 'BookOpen' },
    'why-testing-matters': { title: 'Protecting Your Family', shortSummary: 'How testing helps identify and protect your close blood relatives.', readTime: '3 min read', icon: 'Users' },
    'testing-guide': { title: 'Your Testing Process', shortSummary: 'Step-by-step from counselling to blood draw and results.', readTime: '4 min read', icon: 'ClipboardList' },
    'costs-subsidies': { title: 'Costs & Subsidies', shortSummary: 'Singapore MOH subsidies and MediSave support.', readTime: '2.5 min read', icon: 'Coins' },
    'insurance-rights': { title: 'Insurance Rights', shortSummary: 'How national guidelines protect your right to take a voluntary test.', readTime: '3 min read', icon: 'Shield' },
    'medication-fh': { title: 'Treatment & Medication', shortSummary: 'How highly effective, subsidized treatments protect your heart.', readTime: '2 min read', icon: 'Pill' }
  },
  ms: {
    'what-is-fh': { title: 'Apakah itu FH?', shortSummary: 'Ketahui apakah itu FH dan mengapa diagnosis awal adalah penting.', readTime: '3 minit bacaan', icon: 'BookOpen' },
    'why-testing-matters': { title: 'Melindungi Keluarga Anda', shortSummary: 'Bagaimana ujian membantu mengenalpasti dan melindungi sanak saudara terdekat anda.', readTime: '3 minit bacaan', icon: 'Users' },
    'testing-guide': { title: 'Proses Ujian Anda', shortSummary: 'Langkah demi langkah dari kaunseling hingga pengambilan darah dan keputusan.', readTime: '4 minit bacaan', icon: 'ClipboardList' },
    'costs-subsidies': { title: 'Kos & Subsidi', shortSummary: 'Subsidi MOH Singapura dan sokongan MediSave.', readTime: '2.5 minit bacaan', icon: 'Coins' },
    'insurance-rights': { title: 'Hak Insurans', shortSummary: 'Bagaimana garis panduan kebangsaan melindungi hak anda untuk mengambil ujian sukarela.', readTime: '3 minit bacaan', icon: 'Shield' },
    'medication-fh': { title: 'Rawatan & Ubat-ubatan', shortSummary: 'Bagaimana rawatan bersubsidi yang berkesan melindungi jantung anda.', readTime: '2 minit bacaan', icon: 'Pill' }
  },
  zh: {
    'what-is-fh': { title: '什么是 FH？', shortSummary: '了解什么是 FH 以及为什么早期诊断至关重要。', readTime: '3 分钟阅读', icon: 'BookOpen' },
    'why-testing-matters': { title: '保护您的家人', shortSummary: '检测如何帮助识别和保护您的直系亲属。', readTime: '3 分钟阅读', icon: 'Users' },
    'testing-guide': { title: '您的检测流程', shortSummary: '从基因咨询到抽血检测及结果分析的全流程指南。', readTime: '4 分钟阅读', icon: 'ClipboardList' },
    'costs-subsidies': { title: '费用与政府津贴', shortSummary: '新加坡卫生部 (MOH) 津贴与 MediSave 扣除说明。', readTime: '2.5 分钟阅读', icon: 'Coins' },
    'insurance-rights': { title: '保险权益', shortSummary: '国家监管指南如何保障您自愿参加检测的保险权益。', readTime: '3 分钟阅读', icon: 'Shield' },
    'medication-fh': { title: '治疗与药物', shortSummary: '高效且获津贴的针对性药物如何保护您的心血管。', readTime: '2 分钟阅读', icon: 'Pill' }
  },
  ta: {
    'what-is-fh': { title: 'FH என்றால் என்ன?', shortSummary: 'FH என்றால் என்ன மற்றும் ஆரம்பகால கண்டறிதல் ஏன் முக்கியம் என்பதைக் கற்றுக் கொள்ளுங்கள்.', readTime: '3 நிமிட வாசிப்பு', icon: 'BookOpen' },
    'why-testing-matters': { title: 'உங்கள் குடும்பத்தைப் பாதுகாத்தல்', shortSummary: 'சோதனை உங்கள் நெருங்கிய இரத்த உறவினர்களை எவ்வாறு கண்டறிந்து பாதுகாக்க உதவுகிறது.', readTime: '3 நிமிட வாசிப்பு', icon: 'Users' },
    'testing-guide': { title: 'உங்கள் சோதனை செயல்முறை', shortSummary: 'ஆலோசனையிலிருந்து ரத்தப் பரிசோதனை மற்றும் முடிவுகள் வரை படிப்படியாக.', readTime: '4 நிமிட வாசிப்பு', icon: 'ClipboardList' },
    'costs-subsidies': { title: 'செலவுகள் மற்றும் மானியங்கள்', shortSummary: 'சிங்கப்பூர் MOH மானியங்கள் மற்றும் MediSave ஆதரவு.', readTime: '2.5 நிமிட வாசிப்பு', icon: 'Coins' },
    'insurance-rights': { title: 'காப்பீட்டு உரிமைகள்', shortSummary: 'சுயவிருப்ப மரபணு பரிசோதனை உரிமையை தேசிய வழிகாட்டுதல்கள் எவ்வாறு பாதுகாக்கின்றன.', readTime: '3 நிமிட வாசிப்பு', icon: 'Shield' },
    'medication-fh': { title: 'சிகிச்சை & மருந்துகள்', shortSummary: 'அதிக திறன் கொண்ட மானிய சிகிச்சைகள் உங்கள் இதயத்தை எவ்வாறு பாதுகாக்கின்றன.', readTime: '2 நிமிட வாசிப்பு', icon: 'Pill' }
  }
};

// Base Builder for Multilingual Variant Generator
function createVariant(
  intro: string,
  keyTakeaway: string,
  practicalNextStep: string,
  points: VisualItem[]
): VariantContent & Record<ConcernVariant, VariantContent> {
  const v: VariantContent = { intro, keyTakeaway, practicalNextStep, points };
  return {
    ...v,
    general: v,
    test: v,
    family: v,
    cost: v,
    insurance: v,
    meds: v,
    heart: v
  };
}

// ----------------------------------------------------------------------
// ENGLISH VARIANTS
// ----------------------------------------------------------------------
const EN_VARIANTS: Record<string, Record<KnowledgeLevelVariant, Record<ConcernVariant, VariantContent>>> = {
  'what-is-fh': {
    new: {
      general: createVariant(
        "Familial Hypercholesterolaemia (FH) is a common genetic condition causing high cholesterol from birth.",
        "FH is 100% genetic and present from birth, meaning medical therapy is essential alongside healthy habits.",
        "Discuss your family health history with your doctor during your next visit.",
        [
          { icon: "Dna", label: "Inherited Cause", text: "Passed down through family genes, not caused by diet or lifestyle." },
          { icon: "TrendingUp", label: "High Cholesterol", text: "LDL cholesterol levels are elevated right from day one." },
          { icon: "ShieldCheck", label: "Highly Treatable", text: "Manageable with early medical guidance and routine care." }
        ]
      ),
      family: createVariant(
        "Familial Hypercholesterolaemia (FH) is an inherited condition passed down through family bloodlines.",
        "Because FH runs in families, identifying it early protects both you and your close relatives.",
        "Share basic FH learning materials with your parents, siblings, or children.",
        [
          { icon: "Users", label: "Family Connection", text: "First-degree blood relatives share a 50% chance of inheriting the gene." },
          { icon: "Dna", label: "Genetic Marker", text: "Finding the FH gene helps guide early testing for your loved ones." },
          { icon: "HeartPulse", label: "Early Protection", text: "Early identification prevents silent heart risk across generations." }
        ]
      ),
      cost: createVariant(
        "FH is a common genetic condition, and MOH subsidies ensure testing and care remain affordable.",
        "FH diagnosis and management are supported by government subsidies to keep your care low-cost.",
        "Check your MediSave balance in HealthHub before your outpatient appointment.",
        [
          { icon: "Coins", label: "Subsidized Care", text: "Eligible Singaporeans receive means-tested subsidies for FH care." },
          { icon: "Building2", label: "MediSave Support", text: "MediSave can offset eligible consultation and testing fees." },
          { icon: "ShieldCheck", label: "Affordable Plan", text: "Financial peace of mind allows you to focus on heart health." }
        ]
      ),
      test: createVariant(
        "FH is an inherited cholesterol condition that can be easily diagnosed with a simple blood test.",
        "Taking a genetic test clarifies your cholesterol cause so your doctor can personalize your care plan.",
        "Write down any questions about blood testing to ask your counsellor.",
        [
          { icon: "Search", label: "Definitive Diagnosis", text: "Genetic testing confirms whether high cholesterol is due to FH." },
          { icon: "Dna", label: "Simple Blood Test", text: "A routine outpatient sample takes the guesswork out of diagnosis." },
          { icon: "ShieldCheck", label: "Clear Next Steps", text: "Knowing your result helps your healthcare team protect your heart early." }
        ]
      ),
      insurance: createVariant(
        "FH is an inherited cholesterol condition protected under Singapore's national privacy safeguards.",
        "National regulations protect your voluntary genetic testing privacy under standard insurance terms.",
        "Review your current health policy to verify guaranteed renewal terms.",
        [
          { icon: "ShieldCheck", label: "LIA Moratorium", text: "Insurers cannot force you to undergo or disclose voluntary FH genetic tests." },
          { icon: "Lock", label: "Protected Policies", text: "Your existing life and health insurance policies remain fully active." },
          { icon: "CheckCircle", label: "Standard Rights", text: "You maintain access to standard insurance coverage." }
        ]
      ),
      meds: createVariant(
        "FH causes high cholesterol from birth, requiring gentle daily medications to protect blood vessels.",
        "Because FH is genetic, daily medical treatment is the key tool to lower cholesterol to normal levels.",
        "Take your prescribed cholesterol medications consistently every day.",
        [
          { icon: "Pill", label: "Proven Therapy", text: "Daily statin medications help your liver clear bad cholesterol efficiently." },
          { icon: "RefreshCw", label: "Natural Helper", text: "Complements diet by addressing the genetic root cause directly." },
          { icon: "TrendingDown", label: "Risk Reset", text: "Brings long-term cardiovascular risk back down to normal levels." }
        ]
      ),
      heart: createVariant(
        "FH causes elevated LDL cholesterol that can build up silently in heart arteries over time.",
        "Early diagnosis prevents plaque accumulation, keeping your heart arteries healthy and clear.",
        "Schedule regular cardiovascular check-ups with your polyclinic or specialist.",
        [
          { icon: "HeartPulse", label: "Silent Plaque", text: "High cholesterol can narrow blood vessels without causing early symptoms." },
          { icon: "Clock", label: "Lifelong Care", text: "Addressing FH early protects blood vessel walls from plaque deposits." },
          { icon: "ShieldCheck", label: "Heart Protection", text: "Proactive care keeps your heart strong and healthy for life." }
        ]
      )
    },
    little: {
      general: createVariant(
        "FH is a prevalent genetic lipid condition requiring medical therapy to control elevated LDL cholesterol.",
        "FH is an autosomal genetic condition where medical treatment restores normal cardiovascular risk.",
        "Prepare a list of your recent cholesterol blood test numbers for your doctor.",
        [
          { icon: "Dna", label: "Genetic Root", text: "Driven by specific gene variants altering hepatic LDL clearance." },
          { icon: "TrendingUp", label: "Elevated LDL-C", text: "LDL cholesterol remains high regardless of dietary changes." },
          { icon: "Pill", label: "Targeted Care", text: "High-potency lipid therapies control cholesterol effectively." }
        ]
      ),
      family: createVariant(
        "FH follows an autosomal dominant pattern, giving immediate family members a 50% inheritance chance.",
        "Cascade screening leverages your genetic diagnosis to safeguard your children and siblings early.",
        "Encourage first-degree relatives to get their lipid levels checked.",
        [
          { icon: "Users", label: "50% Inheritance Chance", text: "First-degree blood relatives share a 1-in-2 chance of inheriting FH." },
          { icon: "GitFork", label: "Targeted Screening", text: "Uses your variant to screen relatives with high accuracy." },
          { icon: "ShieldCheck", label: "Preventive Model", text: "World Health Organization recognized model for family heart care." }
        ]
      ),
      cost: createVariant(
        "FH consultations and genetic testing are eligible for MOH subsidies and MediSave coverage in Singapore.",
        "Singapore government subsidies cover up to 70% of costs, minimizing cash outlay for patients.",
        "Confirm your subsidy tier with the clinic counter staff before your visit.",
        [
          { icon: "Building2", label: "Up to 70% Subsidies", text: "Means-tested MOH subsidies reduce public healthcare charges." },
          { icon: "Coins", label: "MediSave Eligible", text: "Use MediSave balance under withdrawal limits for consultations." },
          { icon: "ShieldCheck", label: "Low Cash Outlay", text: "Out-of-pocket fees are structured to be manageable." }
        ]
      ),
      test: createVariant(
        "Molecular genetic testing clarifies the genetic cause of FH, guiding precision cholesterol management.",
        "Genetic confirmation pinpoints your exact FH variant to guide personalized clinical treatment.",
        "Confirm your pre-test appointment slot at NUH Genetic Clinic or SGH Genetics Service.",
        [
          { icon: "Search", label: "Gene Screening", text: "Identifies pathogenic variants in LDLR, APOB, or PCSK9 genes." },
          { icon: "Activity", label: "Clinical Precision", text: "Eliminates diagnostic ambiguity to fine-tune medical dosage." },
          { icon: "ClipboardList", label: "Family Blueprint", text: "Serves as a precise marker for testing family bloodlines." }
        ]
      ),
      insurance: createVariant(
        "Singapore's LIA Moratorium safeguards consumers by restricting genetic test usage in underwriting.",
        "Voluntary predictive FH testing is protected from mandatory insurance disclosure.",
        "Keep records of your voluntary diagnostic testing consent form for your files.",
        [
          { icon: "ShieldCheck", label: "Moratorium Protection", text: "Insurers cannot request voluntary predictive genetic test results." },
          { icon: "Lock", label: "Inforce Policies", text: "Existing insurance contracts cannot be repriced or cancelled." },
          { icon: "CheckCircle", label: "Standard Access", text: "Guarantees fair access to standard insurance limits." }
        ]
      ),
      meds: createVariant(
        "Pharmacotherapy is mandatory in FH to compensate for genetically reduced liver LDL clearance.",
        "Daily lipid-lowering therapies boost liver LDL receptors to pull cholesterol out of blood vessels.",
        "Set daily phone reminders to ensure medication compliance.",
        [
          { icon: "Pill", label: "High-Potency Statins", text: "First-line treatment reduces hepatic cholesterol production." },
          { icon: "RefreshCw", label: "Receptor Upregulation", text: "Helps liver cells absorb and clear excess circulating LDL." },
          { icon: "TrendingDown", label: "Plaque Stabilization", text: "Prevents new plaque formation and stabilizes existing vessels." }
        ]
      ),
      heart: createVariant(
        "Lifelong LDL elevation in FH accelerates arterial plaque formation if left unmanaged.",
        "Lowering lifetime LDL exposure resets your cardiovascular risk curve back to normal levels.",
        "Monitor your blood pressure and blood lipid levels every 6 months.",
        [
          { icon: "Clock", label: "Lifetime Cumulative Load", text: "Cardiovascular risk depends on total years of LDL exposure." },
          { icon: "AlertTriangle", label: "Arterial Walls", text: "High LDL infiltrates blood vessel linings silently over years." },
          { icon: "HeartPulse", label: "Risk Reduction", text: "Early lipid lowering completely halts accelerated plaque buildup." }
        ]
      )
    },
    research: createVariant(
      "Singapore healthcare framework provides targeted MOH subsidies and MediSave coverage for FH panels.",
      "MOH subsidies and MediSave ensure FH testing and treatment remain budget-friendly with no hidden costs.",
      "Check your MediSave balance in HealthHub and request financial counselling if needed.",
      [
        { icon: "Building2", label: "Subsidised Panel Tiers", text: "Subsidies cover up to 70% of outpatient genetic testing." },
        { icon: "Coins", label: "MediSave Claims", text: "Usable for eligible consultation and lab panel fees." },
        { icon: "ShieldCheck", label: "Transparent Rates", text: "Public hospital fees follow clear MOH fee benchmarks." }
      ]
    ),
    advanced: createVariant(
      "Familial Hypercholesterolaemia is an autosomal dominant lipid disorder characterized by impaired hepatic LDL clearance.",
      "FH is caused by pathogenic mutations affecting LDLR, APOB, or PCSK9 genes, requiring targeted pharmacotherapy.",
      "Request cascade screening referral letters for your first-degree blood relatives once variant is confirmed.",
      [
        { icon: "Dna", label: "Pathogenic Variant", text: "Monogenic mutation impairing receptor-mediated endocytosis." },
        { icon: "TrendingUp", label: "Severe Hypercholesterolemia", text: "Untreated plasma LDL-C typically exceeds 4.9 mmol/L in adults." },
        { icon: "Pill", label: "Pharmacotherapy", text: "Requires high-intensity statins often combined with Ezetimibe or PCSK9i." }
      ]
    )
  },
  'why-testing-matters': {
    new: createVariant(
      "Cascade screening is a protective health programme that helps identify FH in close family members.",
      "Cascade screening protects your family by identifying close blood relatives who share inherited FH risk.",
      "Start a family health discussion with your parents and siblings about cholesterol.",
      [
        { icon: "Users", label: "50% Shared Risk", text: "Parents, brothers, sisters, and children have a 50% chance of having FH." },
        { icon: "GitFork", label: "Simple Family Tree", text: "Your test result serves as a helpful map to test loved ones." },
        { icon: "ShieldCheck", label: "Early Protection", text: "Helps family members start preventive care before problems occur." }
      ]
    ),
    little: createVariant(
      "When a pathogenic FH variant is identified, cascade testing targets first-degree relatives with 50% prior probability.",
      "Identifying your genetic variant unlocks rapid single-site testing for your children and siblings.",
      "List the names and ages of your first-degree blood relatives for family counselling.",
      [
        { icon: "GitFork", label: "Single-Site Testing", text: "Relatives only need testing for your exact specific gene variant." },
        { icon: "Clock", label: "Early Intervention", text: "Allows young family members to begin protective care early." },
        { icon: "Building2", label: "Subsidized Relatives", text: "Relatives screened via cascade protocols qualify for MOH subsidies." }
      ]
    ),
    research: createVariant(
      "Targeted single-site variant testing in cascade screening minimizes costs while maximizing clinical sensitivity.",
      "Cascade protocols reduce genetic testing expenses for relatives by targeting only the index mutation.",
      "Confirm with your genetic counsellor how referral letters can be sent to relatives.",
      [
        { icon: "Search", label: "Index Mutation Target", text: "Avoids full panel sequencing costs for blood relatives." },
        { icon: "Coins", label: "Cost-Effective Cascade", text: "High cost-efficiency validated by MOH public health guidelines." },
        { icon: "ShieldCheck", label: "Actionable Prevention", text: "Prevents early coronary artery disease in family members." }
      ]
    ),
    advanced: createVariant(
      "Cascade screening utilizes index patient mutations to screen first-degree relatives systematically.",
      "First-degree relatives have a 50% prior probability, making cascade testing highly cost-effective.",
      "Facilitate cascade referral letters for first-degree relatives once pathogenic variant is confirmed.",
      [
        { icon: "Users", label: "Autosomal Dominant", text: "50% inheritance probability for parents, siblings, and offspring." },
        { icon: "GitFork", label: "Cascade Protocol", text: "Direct mutation testing of relatives minimizes diagnostic cost." },
        { icon: "ShieldCheck", label: "Cost-Effective Model", text: "Gold-standard strategy endorsed by global healthcare authorities." }
      ]
    )
  },
  'testing-guide': {
    new: createVariant(
      "FH genetic testing is a safe, simple outpatient blood test accompanied by professional guidance.",
      "Testing is straightforward: a brief discussion followed by a quick, routine blood draw.",
      "Bring your NRIC and appointment confirmation to your genetic counselling session.",
      [
        { icon: "MessageSquare", label: "Pre-Test Counselling", text: "A counsellor explains the test benefits and answers all questions." },
        { icon: "Search", label: "Simple Blood Sample", text: "A routine blood draw sent to a specialized genetics laboratory." },
        { icon: "FileText", label: "Clear Results", text: "Your specialist reviews the findings with you in 4 to 6 weeks." }
      ]
    ),
    little: createVariant(
      "The FH testing pathway consists of clinical evaluation, pre-test counselling, DNA analysis, and follow-up.",
      "Genetic testing provides a clear diagnosis to guide precise cholesterol management.",
      "Prepare any questions regarding test turnaround times for your doctor.",
      [
        { icon: "ClipboardList", label: "Clinical Review", text: "Assesses personal lipid levels and physical signs of high cholesterol." },
        { icon: "Dna", label: "NGS Gene Panel", text: "Sequences LDLR, APOB, and PCSK9 genes for pathogenic variants." },
        { icon: "CheckCircle", label: "Personalized Plan", text: "Results directly inform optimal medication selection." }
      ]
    ),
    research: createVariant(
      "NGS panel testing examines LDLR, APOB, and PCSK9 genes with high diagnostic sensitivity for FH.",
      "DNA sequencing pinpoints pathogenic variants to differentiate monogenic FH from polygenic hypercholesterolemia.",
      "Discuss variant interpretation details (VUS vs Pathogenic) during your results consultation.",
      [
        { icon: "Search", label: "Targeted Gene Panel", text: "Covers standard monogenic FH causative genes." },
        { icon: "Activity", label: "Diagnostic Certainty", text: "Distinguishes familial genetic FH from lifestyle lipid elevations." },
        { icon: "ShieldCheck", label: "Treatment Alignment", text: "Guides selection of high-intensity statins or PCSK9 inhibitors." }
      ]
    ),
    advanced: createVariant(
      "Next-generation sequencing confirms FH molecular etiology, establishing variant pathogenicity.",
      "NGS panel testing identifies the causative pathogenic mutation to optimize clinical lipid targets.",
      "Review ACMG variant classification guidelines with your clinical geneticist during review.",
      [
        { icon: "Search", label: "NGS Sequencing", text: "Targeted sequencing of LDLR, APOB, PCSK9, and LDLRAP1." },
        { icon: "Activity", label: "Genotype-Phenotype", text: "Correlates mutation severity with cardiovascular risk stratification." },
        { icon: "ClipboardList", label: "Cascade Index", text: "Establishes index patient variant for cascade family screening." }
      ]
    )
  },
  'costs-subsidies': {
    new: createVariant(
      "Singapore MOH subsidies and MediSave ensure FH testing and treatment are accessible and affordable.",
      "Government subsidies cover up to 70% of FH consultation and testing costs for Singaporeans.",
      "Check your MediSave balance in HealthHub prior to your consultation.",
      [
        { icon: "Coins", label: "Government Subsidies", text: "Up to 70% means-tested subsidies for Singapore Citizens and PRs." },
        { icon: "Building2", label: "MediSave Coverage", text: "Use MediSave balance for eligible consultation and lab fees." },
        { icon: "ShieldCheck", label: "Transparent Fees", text: "Clear out-of-pocket guidance with no unexpected bills." }
      ]
    ),
    little: createVariant(
      "Public hospital FH care is supported by MOH means-testing, MediSave withdrawal caps, and CHAS tiers.",
      "Subsidies and MediSave significantly lower out-of-pocket expenses for genetic evaluation.",
      "Inquire at clinic registration about CHAS card subsidy deductions.",
      [
        { icon: "Building2", label: "Means-Tested Tiers", text: "Subsidy percentage determined by household monthly income." },
        { icon: "Coins", label: "MediSave500 / 700", text: "Applicable under chronic disease outpatient withdrawal limits." },
        { icon: "ShieldCheck", label: "Capped Expenses", text: "Out-of-pocket co-payment is capped at affordable rates." }
      ]
    ),
    research: createVariant(
      "Singapore's Ministry of Health provides structured subsidy frameworks for complex genetic lipid panels.",
      "MOH subsidies and MediSave ensure FH testing and treatment remain budget-friendly with no hidden costs.",
      "Review the out-of-pocket cost breakdown in your booking summary.",
      [
        { icon: "Building2", label: "Subsidised Panel Tiers", text: "Subsidies cover up to 70% of outpatient genetic testing." },
        { icon: "Coins", label: "MediSave Claims", text: "Usable for eligible consultation and lab panel fees." },
        { icon: "ShieldCheck", label: "Transparent Rates", text: "Public hospital fees follow clear MOH fee benchmarks." }
      ]
    ),
    advanced: createVariant(
      "FH diagnostic pathways in Singapore are supported by MOH means-tested subsidies and MediSave accounts.",
      "Means-tested MOH subsidies up to 70% and MediSave limits significantly reduce patient co-payment.",
      "Confirm MediSave withdrawal limits with clinic financial counsellors.",
      [
        { icon: "Building2", label: "MOH Subsidy Tier", text: "Public clinics offer up to 70% means-tested subsidy." },
        { icon: "Coins", label: "MediSave Withdrawal", text: "Eligible outpatient testing uses MediSave500/700 caps." },
        { icon: "ShieldCheck", label: "Co-Payment Cap", text: "Out-of-pocket fees are capped for Singapore Citizens & PRs." }
      ]
    )
  },
  'insurance-rights': {
    new: createVariant(
      "In Singapore, national regulations protect your right to take voluntary genetic tests for FH.",
      "The LIA Moratorium ensures voluntary genetic tests do not adversely affect standard insurance coverage.",
      "Review your existing life insurance policies to confirm active status.",
      [
        { icon: "ShieldCheck", label: "Consumer Protection", text: "Insurers cannot force you to disclose voluntary predictive genetic tests." },
        { icon: "Lock", label: "Existing Policies Safe", text: "Your active insurance policies remain completely unchanged." },
        { icon: "CheckCircle", label: "Standard Coverage", text: "Access standard insurance limits without discrimination." }
      ]
    ),
    little: createVariant(
      "The Singapore LIA Moratorium governs genetic test disclosures for life and health insurance underwriting.",
      "Voluntary predictive FH genetic testing is protected under clear national guidelines.",
      "Ask your genetic counsellor if you have questions regarding insurance guidelines.",
      [
        { icon: "ShieldCheck", label: "LIA Guidelines", text: "Strict moratorium protects voluntary predictive DNA testing." },
        { icon: "Lock", label: "Policy Security", text: "Existing life and health coverage cannot be cancelled or repriced." },
        { icon: "CheckCircle", label: "Fair Underwriting", text: "Standard insurance coverage limits apply under moratorium rules." }
      ]
    ),
    research: createVariant(
      "Singapore's LIA Moratorium on genetic testing regulates underwriter access to voluntary predictive DNA tests.",
      "Voluntary predictive FH testing is protected from mandatory insurance disclosure under national policy.",
      "Keep a copy of the LIA Moratorium guide for your personal records.",
      [
        { icon: "ShieldCheck", label: "Moratorium Protection", text: "Insurers cannot request voluntary predictive genetic test results." },
        { icon: "Lock", label: "Inforce Policies", text: "Existing insurance contracts cannot be repriced or cancelled." },
        { icon: "CheckCircle", label: "Standard Access", text: "Guarantees fair access to standard insurance limits." }
      ]
    ),
    advanced: createVariant(
      "The Singapore LIA Moratorium on genetic testing regulates underwriter access to voluntary predictive DNA tests.",
      "National regulatory moratorium protects voluntary predictive test results from mandatory underwriting disclosure.",
      "Consult MOH LIA Code of Practice guidelines if applying for high-value policies.",
      [
        { icon: "ShieldCheck", label: "LIA Code of Practice", text: "Prohibits mandatory genetic testing for insurance applications." },
        { icon: "Lock", label: "Guaranteed Renewable", text: "Inforce standard policies cannot be re-underwritten." },
        { icon: "CheckCircle", label: "Financial Cap", text: "Standard coverage limits apply without genetic loading." }
      ]
    )
  },
  'medication-fh': {
    new: createVariant(
      "FH treatment uses safe, effective medications to lower bad cholesterol and protect your heart.",
      "Because FH is genetic, daily medication is the most effective tool to keep your heart healthy.",
      "Take your daily prescribed statin medication at the same time each evening.",
      [
        { icon: "Pill", label: "Daily Statin Therapy", text: "Helps your liver remove bad cholesterol from your bloodstream." },
        { icon: "RefreshCw", label: "Healthy Habits Complement", text: "Works together with balanced eating and exercise." },
        { icon: "HeartPulse", label: "Heart Protection", text: "Significantly lowers your long-term risk of heart disease." }
      ]
    ),
    little: createVariant(
      "Statins and combination lipid therapies effectively compensate for genetically impaired liver LDL clearance.",
      "Daily medication lowers circulating LDL cholesterol levels back down to normal target ranges.",
      "Discuss your lipid targets with your doctor during your next follow-up.",
      [
        { icon: "Pill", label: "Statin + Ezetimibe", text: "Combined therapy blocks cholesterol production and absorption." },
        { icon: "RefreshCw", label: "Receptor Helper", text: "Increases liver cell uptake of circulating LDL particles." },
        { icon: "TrendingDown", label: "Plaque Prevention", text: "Keeps blood vessel walls clear and healthy." }
      ]
    ),
    research: createVariant(
      "High-potency statins combined with Ezetimibe or PCSK9 inhibitors achieve target LDL-C reduction in FH.",
      "Targeted lipid therapy upregulates hepatic LDL receptors to normalize circulating LDL-C concentration.",
      "Schedule routine blood tests to track your LDL-C reduction trajectory.",
      [
        { icon: "Pill", label: "High-Potency Statins", text: "Suppresses hepatic cholesterol synthesis effectively." },
        { icon: "RefreshCw", label: "Receptor Upregulation", text: "Upregulates functional LDL receptors on liver cell surfaces." },
        { icon: "TrendingDown", label: "Plaque Stabilization", text: "Stabilizes arterial fibrous caps to prevent acute events." }
      ]
    ),
    advanced: createVariant(
      "Aggressive lipid lowering via HMG-CoA reductase inhibition and receptor upregulation restores endothelial safety.",
      "Targeted lipid therapy upregulates hepatic LDL receptors to normalize circulating LDL-C concentration.",
      "Discuss PCSK9 inhibitor add-on therapy if baseline LDL-C target remains >1.8 mmol/L.",
      [
        { icon: "Pill", label: "HMG-CoA Reductase", text: "High-intensity statins suppress endogenous hepatic cholesterol synthesis." },
        { icon: "RefreshCw", label: "LDLR Expression", text: "Compensatory LDLR upregulation clears circulating ApoB lipoproteins." },
        { icon: "TrendingDown", label: "Plaque Regression", text: "Acheives target LDL-C <1.8 mmol/L to halt coronary atherogenesis." }
      ]
    )
  }
};

// ----------------------------------------------------------------------
// BAHASA MELAYU (MS) VARIANTS
// ----------------------------------------------------------------------
const MS_VARIANTS: Record<string, Record<KnowledgeLevelVariant, Record<ConcernVariant, VariantContent>>> = {
  'what-is-fh': {
    new: {
      general: createVariant(
        "Familial Hypercholesterolaemia (FH) adalah keadaan genetik biasa yang menyebabkan kolesterol tinggi sejak lahir.",
        "FH adalah 100% genetik dan wujud sejak lahir, bermakna terapi perubatan adalah penting bersama amalan gaya hidup sihat.",
        "Bincangkan sejarah kesihatan keluarga anda dengan doktor semasa lawatan seterusnya.",
        [
          { icon: "Dna", label: "Punca Diwarisi", text: "Diturunkan melalui gen keluarga, bukan disebabkan oleh diet atau gaya hidup." },
          { icon: "TrendingUp", label: "Kolesterol Tinggi", text: "Tahap kolesterol LDL meningkat sejak hari pertama lagi." },
          { icon: "ShieldCheck", label: "Sangat Boleh Dirawat", text: "Dapat diuruskan dengan bimbingan perubatan awal dan penjagaan rutin." }
        ]
      ),
      family: createVariant(
        "Familial Hypercholesterolaemia (FH) adalah keadaan genetik yang diwarisi melalui keturunan keluarga.",
        "Oleh kerana FH diwarisi dalam keluarga, mengenalpasti lebih awal melindungi diri anda dan sanak saudara terdekat.",
        "Kongsi bahan pembelajaran FH asas dengan ibu bapa, adik-beradik, atau anak-anak anda.",
        [
          { icon: "Users", label: "Hubungan Keluarga", text: "Ahli keluarga darjah pertama mempunyai peluang 50% untuk mewarisi gen ini." },
          { icon: "Dna", label: "Penanda Genetik", text: "Mengenal pasti gen FH membantu membimbing ujian awal untuk orang tersayang." },
          { icon: "HeartPulse", label: "Perlindungan Awal", text: "Pengenalan awal mencegah risiko jantung senyap merentasi generasi." }
        ]
      ),
      cost: createVariant(
        "FH adalah keadaan genetik biasa, dan subsidi MOH memastikan ujian serta penjagaan kekal mampu milik.",
        "Diagnosis dan pengurusan FH disokong oleh subsidi kerajaan untuk memastikan kos penjagaan anda rendah.",
        "Semak baki MediSave anda di HealthHub sebelum janji niaga pesakit luar anda.",
        [
          { icon: "Coins", label: "Penjagaan Bersubsidi", text: "Warganegara Singapura yang layak menerima subsidi ujian kemampuan untuk penjagaan FH." },
          { icon: "Building2", label: "Sokongan MediSave", text: "MediSave boleh menampung yuran rundingan dan ujian yang layak." },
          { icon: "ShieldCheck", label: "Pelan Berpatutan", text: "Ketenangan fikiran dari segi kewangan membolehkan anda fokus pada kesihatan jantung." }
        ]
      ),
      test: createVariant(
        "FH adalah keadaan kolesterol diwarisi yang boleh didiagnosis dengan mudah melalui ujian darah ringkas.",
        "Mengambil ujian genetik menjelaskan punca kolesterol anda supaya doktor boleh membandingkan pelan penjagaan anda.",
        "Tuliskan sebarang soalan tentang ujian darah untuk ditanyakan kepada kaunselor anda.",
        [
          { icon: "Search", label: "Diagnosis Pasti", text: "Ujian genetik mengesahkan sama ada kolesterol tinggi disebabkan oleh FH." },
          { icon: "Dna", label: "Ujian Darah Ringkas", text: "Sampel pesakit luar rutin menghilangkan tekaan daripada diagnosis." },
          { icon: "ShieldCheck", label: "Langkah Seterusnya Jelas", text: "Mengetahui keputusan anda membantu pasukan kesihatan melindungi jantung anda lebih awal." }
        ]
      ),
      insurance: createVariant(
        "FH adalah keadaan kolesterol diwarisi yang dilindungi di bawah perlindungan privasi kebangsaan Singapura.",
        "Peraturan kebangsaan melindungi privasi ujian genetik sukarela anda di bawah terma insurans standard.",
        "Semak polisi kesihatan semasa anda untuk mengesahkan terma pembaruan terjamin.",
        [
          { icon: "ShieldCheck", label: "Moratorium LIA", text: "Syarikat insurans tidak boleh memaksa anda menjalani atau mendedahkan ujian genetik FH sukarela." },
          { icon: "Lock", label: "Polisi Dilindungi", text: "Polisi hayat dan kesihatan sedia ada anda kekal aktif sepenuhnya." },
          { icon: "CheckCircle", label: "Hak Standard", text: "Anda mengekalkan akses kepada perlindungan insurans standard." }
        ]
      ),
      meds: createVariant(
        "FH menyebabkan kolesterol tinggi sejak lahir, memerlukan ubat harian untuk melindungi salur darah.",
        "Oleh kerana FH adalah genetik, rawatan perubatan harian adalah alat utama untuk menurunkan kolesterol.",
        "Ambil ubat kolesterol yang ditetapkan secara konsisten setiap hari.",
        [
          { icon: "Pill", label: "Terapi Terbukti", text: "Ubat statin harian membantu hati anda membersihkan kolesterol jahat dengan cekap." },
          { icon: "RefreshCw", label: "Pembantu Semula Jadi", text: "Melengkapi diet dengan menangani punca genetik secara langsung." },
          { icon: "TrendingDown", label: "Pengurangan Risiko", text: "Mengembalikan risiko kardiovaskular jangka panjang ke tahap normal." }
        ]
      ),
      heart: createVariant(
        "FH menyebabkan kolesterol LDL meningkat yang boleh terkumpul secara senyap dalam arteri jantung dari semasa ke semasa.",
        "Diagnosis awal mencegah pengumpulan plak, memastikan arteri jantung anda kekal sihat.",
        "Jadualkan pemeriksaan kardiovaskular secara berkala dengan poliklinik atau pakar anda.",
        [
          { icon: "HeartPulse", label: "Plak Senyap", text: "Kolesterol tinggi boleh menyempitkan salur darah tanpa menimbulkan gejala awal." },
          { icon: "Clock", label: "Penjagaan Seumur Hidup", text: "Menangani FH lebih awal melindungi dinding salur darah daripada mendapan plak." },
          { icon: "ShieldCheck", label: "Perlindungan Jantung", text: "Penjagaan proaktif memastikan jantung anda kekal kuat dan sihat seumur hidup." }
        ]
      )
    },
    little: createVariant(
      "FH adalah keadaan lipid genetik lazim yang memerlukan terapi perubatan untuk mengawal kolesterol LDL.",
      "FH adalah keadaan genetik autosomal di mana rawatan perubatan memulihkan risiko kardiovaskular normal.",
      "Sediakan senarai bacaan ujian darah kolesterol terkini anda untuk doktor anda.",
      [
        { icon: "Dna", label: "Punca Genetik", text: "Didorong oleh varian gen khusus yang mengubah pembersihan LDL hati." },
        { icon: "TrendingUp", label: "LDL-C Tinggi", text: "Kolesterol LDL kekal tinggi tanpa kira perubahan diet." },
        { icon: "Pill", label: "Penjagaan Sasar", text: "Terapi lipid berpotensi tinggi mengawal kolesterol secara berkesan." }
      ]
    ),
    research: createVariant(
      "Rangka kerja penjagaan kesihatan Singapura menyediakan subsidi MOH dan perlindungan MediSave sasar untuk FH.",
      "Subsidi MOH dan MediSave memastikan ujian serta rawatan FH kekal berpatutan tanpa sebarang kos tersembunyi.",
      "Semak baki MediSave anda di HealthHub dan minta penerangan kaunseling kewangan semasa lawatan anda.",
      [
        { icon: "Building2", label: "Peringkat Panel Bersubsidi", text: "Subsidi menampung sehingga 70% ujian genetik pesakit luar." },
        { icon: "Coins", label: "Tuntutan MediSave", text: "Boleh digunakan untuk yuran rundingan dan makmal yang layak." },
        { icon: "ShieldCheck", label: "Kadar Telus", text: "Yuran hospital awam mengikut penanda aras yuran MOH yang jelas." }
      ]
    ),
    advanced: createVariant(
      "Saringan bertingkat (cascade screening) menilai sanak saudara ijazah pertama secara sistematik melalui ujian varian sasar.",
      "Ujian varian sasar pada ahli keluarga darjah pertama adalah sangat cekap dan membolehkan penjagaan pencegahan pra-simptomatik.",
      "Minta surat rujukan saringan bertingkat untuk ahli keluarga darjah pertama anda sebaik sahaja varian patogenik dikenal pasti.",
      [
        { icon: "Dna", label: "Varian Patogenik", text: "Mutasi monogenik yang menjejaskan endositosis diperantara reseptor." },
        { icon: "TrendingUp", label: "Hiperkolesterolemia Teruk", text: "LDL-C plasma tanpa rawatan biasanya melebihi 4.9 mmol/L pada orang dewasa." },
        { icon: "Pill", label: "Farmakoterapi", text: "Memerlukan statin intensiti tinggi yang sering digabungkan dengan Ezetimibe." }
      ]
    )
  },
  'why-testing-matters': {
    new: createVariant(
      "Saringan bertingkat adalah program kesihatan pelindung yang membantu mengenal pasti FH dalam kalangan ahli keluarga terdekat.",
      "Saringan bertingkat melindungi keluarga anda dengan mengenal pasti sanak saudara yang berkongsi risiko FH diwarisi.",
      "Mulakan perbincangan kesihatan keluarga dengan ibu bapa dan adik-beradik anda mengenai kolesterol.",
      [
        { icon: "Users", label: "50% Risiko Berkongsi", text: "Ibu bapa, adik-beradik, dan anak-anak mempunyai peluang 50% mendapat FH." },
        { icon: "GitFork", label: "Peta Salasilah Keluarga", text: "Keputusan ujian anda berfungsi sebagai panduan untuk menguji orang tersayang." },
        { icon: "ShieldCheck", label: "Perlindungan Awal", text: "Membantu ahli keluarga memulakan penjagaan pencegahan sebelum masalah berlaku." }
      ]
    ),
    little: createVariant(
      "Apabila varian FH patogenik dikenal pasti, saringan bertingkat menyasarkan saudara darjah pertama dengan kebarangkalian 50%.",
      "Mengenal pasti varian genetik anda membolehkan ujian tapak tunggal yang pantas untuk anak-anak dan adik-beradik anda.",
      "Senaraikan nama dan umur ahli keluarga darjah pertama anda untuk kaunseling keluarga.",
      [
        { icon: "GitFork", label: "Ujian Tapak Tunggal", text: "Ahli keluarga hanya perlu diuji untuk varian gen khusus anda." },
        { icon: "Clock", label: "Intervensi Awal", text: "Membolehkan ahli keluarga muda memulakan penjagaan pelindung lebih awal." },
        { icon: "Building2", label: "Ahli Keluarga Bersubsidi", text: "Saudara mara yang disaring melalui protokol bertingkat layak menerima subsidi MOH." }
      ]
    ),
    research: createVariant(
      "Ujian varian sasar tapak tunggal dalam saringan bertingkat meminimumkan kos sambil memaksimumkan kepekaan klinikal.",
      "Protokol bertingkat mengurangkan perbelanjaan ujian genetik untuk sanak saudara dengan menyasarkan mutasi indeks sahaja.",
      "Sahkan dengan kaunselor genetik anda bagaimana surat rujukan boleh dihantar kepada sanak saudara.",
      [
        { icon: "Search", label: "Sasaran Mutasi Indeks", text: "Mengelakkan kos pengurutan panel penuh untuk ahli keluarga." },
        { icon: "Coins", label: "Saringan Kos-Cekap", text: "Kecekapan kos tinggi yang disahkan oleh garis panduan kesihatan awam MOH." },
        { icon: "ShieldCheck", label: "Pencegahan Boleh Bertindak", text: "Mencegah penyakit arteri koronari awal dalam kalangan ahli keluarga." }
      ]
    ),
    advanced: createVariant(
      "Saringan bertingkat menilai sanak saudara ijazah pertama secara sistematik melalui ujian varian sasar.",
      "Ahli keluarga darjah pertama mempunyai kebarangkalian 50%, menjadikan ujian bertingkat sangat kos-efektif.",
      "Permudahkan surat rujukan saringan bertingkat untuk ahli keluarga darjah pertama sebaik sahaja varian disahkan.",
      [
        { icon: "Users", label: "Dominan Autosom", text: "Kebarangkalian warisan 50% untuk ibu bapa, adik-beradik, dan anak-anak." },
        { icon: "GitFork", label: "Protokol Bertingkat", text: "Ujian mutasi langsung untuk sanak saudara meminimumkan kos diagnosis." },
        { icon: "ShieldCheck", label: "Model Kos-Efektif", text: "Strategi standard emas yang disokong oleh pihak berkuasa kesihatan global." }
      ]
    )
  },
  'testing-guide': {
    new: createVariant(
      "Ujian genetik FH ialah ujian darah pesakit luar yang selamat, ringkas dan diiringi bimbingan profesional.",
      "Ujian adalah mudah: perbincangan ringkas diikuti dengan pengambilan darah rutin yang cepat.",
      "Bawa NRIC dan pengesahan janji niaga anda ke sesi kaunseling genetik anda.",
      [
        { icon: "MessageSquare", label: "Kaunseling Pra-Ujian", text: "Kaunselor menerangkan faedah ujian dan menjawab semua soalan." },
        { icon: "Search", label: "Sampel Darah Ringkas", text: "Pengambilan darah rutin yang dihantar ke makmal genetik khusus." },
        { icon: "FileText", label: "Keputusan Jelas", text: "Pakar anda menyemak penemuan bersama anda dalam masa 4 hingga 6 minggu." }
      ]
    ),
    little: createVariant(
      "Laluan ujian FH terdiri daripada penilaian klinikal, kaunseling pra-ujian, analisis DNA, dan susulan.",
      "Ujian genetik memberikan diagnosis yang jelas untuk membimbing pengurusan kolesterol yang tepat.",
      "Sediakan sebarang soalan mengenai masa pemprosesan ujian untuk doktor anda.",
      [
        { icon: "ClipboardList", label: "Semakan Klinikal", text: "Menilai tahap lipid peribadi dan tanda fizikal kolesterol tinggi." },
        { icon: "Dna", label: "Panel Gen NGS", text: "Mengurutkan gen LDLR, APOB, dan PCSK9 untuk varian patogenik." },
        { icon: "CheckCircle", label: "Pelan Peribadi", text: "Keputusan membimbing pemilihan ubat yang paling optimum secara langsung." }
      ]
    ),
    research: createVariant(
      "Ujian panel NGS memeriksa gen LDLR, APOB, dan PCSK9 dengan kepekaan diagnostik yang tinggi untuk FH.",
      "Pengurutan DNA mengenal pasti varian patogenik untuk membezakan FH monogenik daripada hiperkolesterolemia poligenik.",
      "Bincangkan butiran tafsiran varian (VUS lwn Patogenik) semasa rundingan keputusan anda.",
      [
        { icon: "Search", label: "Panel Gen Sasar", text: "Merangkumi gen pendorong FH monogenik standard." },
        { icon: "Activity", label: "Kepastian Diagnosis", text: "Membezakan FH genetik diwarisi daripada peningkatan lipid gaya hidup." },
        { icon: "ShieldCheck", label: "Penyelarasan Rawatan", text: "Membimbing pemilihan statin intensiti tinggi atau penghalang PCSK9." }
      ]
    ),
    advanced: createVariant(
      "Pengurutan generasi seterusnya (NGS) mengesahkan etiologi molekul FH, menetapkan keboleharusan varian.",
      "Ujian panel NGS mengenalpasti mutasi patogenik untuk mengoptimumkan sasaran lipid klinikal.",
      "Semak garis panduan klasifikasi varian ACMG bersama pakar genetik klinikal anda semasa semakan.",
      [
        { icon: "Search", label: "Pengurutan NGS", text: "Pengurutan sasaran LDLR, APOB, PCSK9, dan LDLRAP1." },
        { icon: "Activity", label: "Genotip-Fenotip", text: "Menghubungkan keterukan mutasi dengan stratifikasi risiko kardiovaskular." },
        { icon: "ClipboardList", label: "Indeks Bertingkat", text: "Menetapkan varian pesakit indeks untuk saringan keluarga bertingkat." }
      ]
    )
  },
  'costs-subsidies': {
    new: createVariant(
      "Subsidi MOH Singapura dan MediSave memastikan ujian serta rawatan FH mudah diakses dan berpatutan.",
      "Subsidi kerajaan menampung sehingga 70% daripada kos rundingan dan ujian FH untuk rakyat Singapura.",
      "Semak baki MediSave anda di HealthHub sebelum sesi rundingan anda.",
      [
        { icon: "Coins", label: "Subsidi Kerajaan", text: "Subsidi ujian kemampuan sehingga 70% untuk Warganegara dan PR Singapura." },
        { icon: "Building2", label: "Perlindungan MediSave", text: "Gunakan baki MediSave untuk yuran rundingan dan makmal yang layak." },
        { icon: "ShieldCheck", label: "Yuran Telus", text: "Panduan kos tunai yang jelas tanpa sebarang bil luar jangka." }
      ]
    ),
    little: createVariant(
      "Penjagaan FH hospital awam disokong oleh ujian kemampuan MOH, had pengeluaran MediSave, dan peringkat CHAS.",
      "Subsidi dan MediSave mengurangkan perbelanjaan keluar dari poket secara signifikan untuk penilaian genetik.",
      "Tanyakan di kaunter pendaftaran klinik mengenai potongan subsidi kad CHAS.",
      [
        { icon: "Building2", label: "Peringkat Ujian Kemampuan", text: "Peratusan subsidi ditentukan oleh pendapatan bulanan isi rumah." },
        { icon: "Coins", label: "MediSave500 / 700", text: "Terpakai di bawah had pengeluaran pesakit luar penyakit kronik." },
        { icon: "ShieldCheck", label: "Perbelanjaan Terhad", text: "Bayaran bersama keluar dari poket dihadkan pada kadar berpatutan." }
      ]
    ),
    research: createVariant(
      "Kementerian Kesihatan Singapura menyediakan rangka kerja subsidi terstruktur untuk panel lipid genetik kompleks.",
      "Subsidi MOH dan MediSave memastikan ujian dan rawatan FH kekal mesra belanjawan tanpa kos tersembunyi.",
      "Semak pecahan kos keluar dari poket dalam ringkasan tempahan anda.",
      [
        { icon: "Building2", label: "Peringkat Panel Bersubsidi", text: "Subsidi menampung sehingga 70% ujian genetik pesakit luar." },
        { icon: "Coins", label: "Tuntutan MediSave", text: "Boleh digunakan untuk yuran rundingan dan makmal yang layak." },
        { icon: "ShieldCheck", label: "Kadar Telus", text: "Yuran hospital awam mengikut penanda aras yuran MOH yang jelas." }
      ]
    ),
    advanced: createVariant(
      "Laluan diagnostik FH di Singapura disokong oleh subsidi ujian kemampuan MOH dan akaun MediSave.",
      "Subsidi MOH sehingga 70% dan had pengeluaran MediSave mengurangkan bayaran bersama pesakit secara ketara.",
      "Sahkan had pengeluaran MediSave dengan kaunselor kewangan klinik.",
      [
        { icon: "Building2", label: "Peringkat Subsidi MOH", text: "Klinik awam menawarkan subsidi ujian kemampuan sehingga 70%." },
        { icon: "Coins", label: "Pengeluaran MediSave", text: "Ujian pesakit luar yang layak menggunakan had MediSave500/700." },
        { icon: "ShieldCheck", label: "Had Bayaran Bersama", text: "Yuran keluar dari poket dihadkan untuk Warganegara Singapura & PR." }
      ]
    )
  },
  'insurance-rights': {
    new: createVariant(
      "Di Singapura, peraturan kebangsaan melindungi hak anda untuk mengambil ujian genetik sukarela untuk FH.",
      "Moratorium LIA memastikan ujian genetik sukarela tidak menjejaskan perlindungan insurans standard secara negatif.",
      "Semak polisi insurans hayat sedia ada anda untuk mengesahkan status aktif.",
      [
        { icon: "ShieldCheck", label: "Perlindungan Pengguna", text: "Syarikat insurans tidak boleh memaksa anda mendedahkan ujian genetik sukarela." },
        { icon: "Lock", label: "Polisi Sedia Ada Selamat", text: "Polisi insurans aktif anda kekal tidak berubah sepenuhnya." },
        { icon: "CheckCircle", label: "Perlindungan Standard", text: "Akses had insurans standard tanpa diskriminasi." }
      ]
    ),
    little: createVariant(
      "Moratorium LIA Singapura mengawal pendedahan ujian genetik untuk penajaan insurans hayat dan kesihatan.",
      "Ujian genetik prediktif FH sukarela dilindungi di bawah garis panduan kebangsaan yang jelas.",
      "Tanyakan kepada kaunselor genetik anda jika anda mempunyai soalan mengenai garis panduan insurans.",
      [
        { icon: "ShieldCheck", label: "Garis Panduan LIA", text: "Moratorium ketat melindungi ujian DNA prediktif sukarela." },
        { icon: "Lock", label: "Keselamatan Polisi", text: "Perlindungan hayat dan kesihatan sedia ada tidak boleh dibatalkan atau dinaikkan harga." },
        { icon: "CheckCircle", label: "Penajaan Adil", text: "Had perlindungan insurans standard terpakai di bawah peraturan moratorium." }
      ]
    ),
    research: createVariant(
      "Moratorium LIA Singapura mengenai ujian genetik mengawal akses penaja insurans kepada ujian DNA prediktif sukarela.",
      "Ujian prediktif FH sukarela dilindungi daripada pendedahan insurans mandatori di bawah dasar kebangsaan.",
      "Simpan salinan panduan Moratorium LIA untuk rekod peribadi anda.",
      [
        { icon: "ShieldCheck", label: "Perlindungan Moratorium", text: "Syarikat insurans tidak boleh meminta keputusan ujian genetik prediktif sukarela." },
        { icon: "Lock", label: "Polisi Berkuat Kuasa", text: "Kontrak insurans sedia ada tidak boleh dinaikkan harga atau dibatalkan." },
        { icon: "CheckCircle", label: "Akses Standard", text: "Menjamin akses adil kepada had insurans standard." }
      ]
    ),
    advanced: createVariant(
      "Moratorium LIA Singapura mengenai ujian genetik mengawal akses penaja insurans kepada ujian DNA prediktif sukarela.",
      "Moratorium kebangsaan melindungi keputusan ujian prediktif sukarela daripada pendedahan mandatori.",
      "Rujuk garis panduan Kod Amalan MOH LIA jika memohon polisi bernilai tinggi.",
      [
        { icon: "ShieldCheck", label: "Kod Amalan LIA", text: "Melarang ujian genetik mandatori untuk permohonan insurans." },
        { icon: "Lock", label: "Pembaruan Terjamin", text: "Polisi standard yang berkuat kuasa tidak boleh dinilai semula." },
        { icon: "CheckCircle", label: "Had Kewangan", text: "Had perlindungan standard terpakai tanpa beban genetik." }
      ]
    )
  },
  'medication-fh': {
    new: createVariant(
      "Rawatan FH menggunakan ubat yang selamat dan berkesan untuk menurunkan kolesterol jahat serta melindungi jantung anda.",
      "Oleh kerana FH adalah genetik, ubat harian adalah alat paling berkesan untuk menjaga kesihatan jantung anda.",
      "Ambil ubat statin harian anda pada waktu yang sama setiap malam.",
      [
        { icon: "Pill", label: "Terapi Statin Harian", text: "Membantu hati anda menyingkirkan kolesterol jahat daripada aliran darah." },
        { icon: "RefreshCw", label: "Pelengkap Gaya Hidup", text: "Bekerja bersama pemakanan seimbang dan senaman rutin." },
        { icon: "HeartPulse", label: "Perlindungan Jantung", text: "Menurunkan risiko penyakit jantung jangka panjang anda secara signifikan." }
      ]
    ),
    little: createVariant(
      "Statin dan terapi lipid gabungan mengimbangi pembersihan LDL hati yang terjejas secara genetik dengan berkesan.",
      "Ubat harian menurunkan tahap kolesterol LDL dalam darah kembali ke julat sasaran normal.",
      "Bincangkan sasaran lipid anda dengan doktor semasa lawatan susulan seterusnya.",
      [
        { icon: "Pill", label: "Statin + Ezetimibe", text: "Terapi gabungan menghalang penghasilan dan penyerapan kolesterol." },
        { icon: "RefreshCw", label: "Pembantu Reseptor", text: "Meningkatkan pengambilan zarah LDL dalam darah oleh sel hati." },
        { icon: "TrendingDown", label: "Pencegahan Plak", text: "Memastikan dinding salur darah kekal bersih dan sihat." }
      ]
    ),
    research: createVariant(
      "Statin potensi tinggi yang digabungkan dengan Ezetimibe atau penghalang PCSK9 mencapai penurunan sasaran LDL-C.",
      "Terapi lipid sasar meningkatkan reseptor LDL hati untuk menormalkan kepekatan LDL-C dalam darah.",
      "Jadualkan ujian darah rutin untuk memantau trajektori pengurangan LDL-C anda.",
      [
        { icon: "Pill", label: "Statin Potensi Tinggi", text: "Menekan sintesis kolesterol hati secara berkesan." },
        { icon: "RefreshCw", label: "Peningkatan Reseptor", text: "Meningkatkan ekspresi reseptor LDL berfungsi pada permukaan sel hati." },
        { icon: "TrendingDown", label: "Penstabilan Plak", text: "Menstabilkan cap gentian arteri untuk mencegah kejadian akut." }
      ]
    ),
    advanced: createVariant(
      "Penurunan lipid agresif melalui penghambatan HMG-CoA reductase memulihkan keselamatan endotelium.",
      "Terapi lipid sasar meningkatkan reseptor LDL hati untuk menormalkan kepekatan LDL-C dalam darah.",
      "Bincangkan terapi tambahan penghalang PCSK9 jika sasaran LDL-C asas kekal >1.8 mmol/L.",
      [
        { icon: "Pill", label: "HMG-CoA Reductase", text: "Statin intensiti tinggi menekan sintesis kolesterol hati endogen." },
        { icon: "RefreshCw", label: "Ekspresi LDLR", text: "Peningkatan LDLR pampasan membersihkan lipoprotein ApoB dalam darah." },
        { icon: "TrendingDown", label: "Regresi Plak", text: "Mencapai sasaran LDL-C <1.8 mmol/L untuk menghentikan aterogenesis koronari." }
      ]
    )
  }
};

// ----------------------------------------------------------------------
// SIMPLIFIED CHINESE (ZH) VARIANTS
// ----------------------------------------------------------------------
const ZH_VARIANTS: Record<string, Record<KnowledgeLevelVariant, Record<ConcernVariant, VariantContent>>> = {
  'what-is-fh': {
    new: {
      general: createVariant(
        "家族性高胆固醇血症 (FH) 是一种常见的遗传性疾病，从出生起就会导致血液中低密度脂蛋白 (LDL) 胆固醇偏高。",
        "FH 是 100% 由基因决定的，出生时即存在，因此除了健康生活习惯外，针对性的药物治疗至关重要。",
        "在下次就诊时与您的医生讨论您的家族健康史。",
        [
          { icon: "Dna", label: "遗传性病因", text: "通过家族基因代代相传，绝非由饮食或不良生活方式引起。" },
          { icon: "TrendingUp", label: "胆固醇显著升高", text: "从出生第一天起，体内坏胆固醇 (LDL-C) 水平就处于高位。" },
          { icon: "ShieldCheck", label: "完全可防可控", text: "通过早期医疗指导和规范化管理，可以有效保障心血管健康。" }
        ]
      ),
      family: createVariant(
        "家族性高胆固醇血症 (FH) 是一种在家族血统中世代相传的遗传性胆固醇疾病。",
        "因为 FH 具有家族遗传性，早期确诊不仅能保护您自己，也能守护您的直系亲属。",
        "向您的父母、兄弟姐妹或子女分享基础的 FH 科普知识。",
        [
          { icon: "Users", label: "50% 遗传概率", text: "父母、兄弟姐妹和子女等一级亲属均有 50% 的概率遗传该基因。" },
          { icon: "Dna", label: "基因标记确诊", text: "检测出 FH 致病基因有助于指导亲属开展早期针对性筛查。" },
          { icon: "HeartPulse", label: "跨代早期守护", text: "早期识别可阻断隐匿性心血管疾病在家族中的跨代风险。" }
        ]
      ),
      cost: createVariant(
        "FH 是一种常见的遗传病，新加坡 MOH 卫生部提供丰厚津贴，确保筛查与治疗人人负担得起。",
        "FH 的诊断与长期管理享有政府诊疗津贴，最大程度减轻您的个人自付负担。",
        "在门诊就诊前通过 HealthHub 查询您的 MediSave 余额。",
        [
          { icon: "Coins", label: "政府补贴保障", text: "符合条件的新加坡公民可享受高达 70% 的收入审查津贴。" },
          { icon: "Building2", label: "MediSave 扣除", text: "MediSave 可用于抵扣符合条件的基因咨询与门诊化验费用。" },
          { icon: "ShieldCheck", label: "合理安心预算", text: "清晰透明的收费标准让您无需担心财务压力，专心守护健康。" }
        ]
      ),
      test: createVariant(
        "FH 是一种遗传性胆固醇疾病，通过一次简单的抽血基因检测即可明确诊断。",
        "进行基因检测能彻底厘清胆固醇升高的根源，帮助医生为您量身定制治疗方案。",
        "写下您对基因抽血检测的疑问，以便在咨询时向专家请教。",
        [
          { icon: "Search", label: "明确分子诊断", text: "基因检测可精准确认高胆固醇是否由 FH 基因变异所致。" },
          { icon: "Dna", label: "便捷门诊抽血", text: "常规门诊抽血即可送检，省去繁琐手续与诊断猜想。" },
          { icon: "ShieldCheck", label: "指引后续治疗", text: "明确的结果能协助医疗团队提早介入，全方位保护您的心脏。" }
        ]
      ),
      insurance: createVariant(
        "FH 是一种遗传性胆固醇疾病，受新加坡国家级法规和隐私政策的严格保护。",
        "国家监管准则明确保障自愿基因检测的隐私，不影响标准保险保障权益。",
        "检查您现有的健康保单，确认保单的续保与生效条款。",
        [
          { icon: "ShieldCheck", label: "LIA 保险暂行规定", text: "保险公司不得强制要求您提供或接受自愿性 FH 预测性基因检测。" },
          { icon: "Lock", label: "现有保单不受影响", text: "您现有的寿险与医疗险保单完全保持有效，不得被无故加价。" },
          { icon: "CheckCircle", label: "公平投保权益", text: "保障您在标准限额内平等的投保与理赔权利。" }
        ]
      ),
      meds: createVariant(
        "FH 会导致自幼胆固醇偏高，需要每日坚持规范服药来保护血管健康。",
        "由于 FH 是基因决定的，每日规律药物治疗是降低坏胆固醇至安全范围的核心武器。",
        "遵医嘱每日按时服用为您开具的降胆固醇药物。",
        [
          { icon: "Pill", label: "疗效确切的药物", text: "每日服用他汀类药物可显著提升肝脏清除坏胆固醇的能力。" },
          { icon: "RefreshCw", label: "直击遗传根源", text: "补充饮食控制的不足，直接改善由基因引起代谢障碍。" },
          { icon: "TrendingDown", label: "重建血管安全", text: "将长期心血管病发风险拉回至正常人群水平。" }
        ]
      ),
      heart: createVariant(
        "FH 会导致 LDL 胆固醇长期异常升高，随时间推移可能悄无声息地在心血管内壁沉积。",
        "早期诊断能有效遏制斑块形成，保持心血管顺畅与健康。",
        "定期与您的 Polyclinic 或专科医生预约进行心血管健康复查。",
        [
          { icon: "HeartPulse", label: "无声的血管斑块", text: "高胆固醇可能在没有任何早期症状的情况下导致血管狭窄。" },
          { icon: "Clock", label: "终身健康守护", text: "及早干预 FH 可防止血管壁受到脂质斑块的侵蚀。" },
          { icon: "ShieldCheck", label: "强健心血管", text: "主动预防能让您的心脏终身保持强劲健康。" }
        ]
      )
    },
    little: createVariant(
      "FH 是一种高发率的单基因脂质代谢障碍，需要常年规范的药物干预以控制 LDL 胆固醇。",
      "FH 遵循常染色体显性遗传规律，科学正规的药物治疗能使心血管风险恢复正常。",
      "整理一份您近期验血报告中的胆固醇数值，以便就诊时参考。",
      [
        { icon: "Dna", label: "基因病因根源", text: "因特定基因突变导致肝脏表面的 LDL 受体清除功能受损。" },
        { icon: "TrendingUp", label: "顽固性 LDL-C 升高", text: "仅凭饮食控制无法使胆固醇恢复正常标准。" },
        { icon: "Pill", label: "高效针对性治疗", text: "强效降脂药能精准且安全地控制坏胆固醇水平。" }
      ]
    ),
    research: createVariant(
      "新加坡医疗体系为 FH 基因检测与诊疗方案提供针对性的 MOH 政府津贴和 MediSave 报销。",
      "MOH 政府津贴与 MediSave 确保 FH 检测与后续治疗价格亲民，没有任何隐藏费用。",
      "在 HealthHub 中查看您的 MediSave 余额，并在就诊时向诊所协调员咨询财务资助。",
      [
        { icon: "Building2", label: "最高 70% 津贴", text: "符合条件的新加坡公民可享受高达 70% 的门诊诊疗补贴。" },
        { icon: "Coins", label: "MediSave 全额抵扣", text: "可使用 MediSave 余额支付符合规定的门诊与检测费用。" },
        { icon: "ShieldCheck", label: "透明合理的自付额", text: "公立医院收费严格遵循 MOH 卫生部公布的指导标准。" }
      ]
    ),
    advanced: createVariant(
      "级联筛查 (Cascade Screening) 通过针对性基因变异检测，系统化评估一级亲属，从而实现早期心血管干预。",
      "对一级亲属进行针对性变异检测极具效率，能在症状出现前开展预防性护理。",
      "一旦确诊致病性基因变异，请为一级亲属开具专用的基因级联检测转诊信。",
      [
        { icon: "Dna", label: "致病性基因突变", text: "导致受体介导的胞吞作用受阻的单基因致病变异。" },
        { icon: "TrendingUp", label: "重度高胆固醇血症", text: "未受控时成年患者血浆 LDL-C 通常显著大于 4.9 mmol/L。" },
        { icon: "Pill", label: "联合降脂方案", text: "需使用高强度他汀联合依折麦布或 PCSK9 抑制剂进行联合干预。" }
      ]
    )
  },
  'why-testing-matters': {
    new: createVariant(
      "级联筛查是一项具有保护作用的家族健康计划，旨在帮助识别直系亲属中的 FH 隐患。",
      "级联筛查通过识别具有共同遗传风险的直系血亲，全方位守护您的家庭健康。",
      "与您的父母和兄弟姐妹开启一次关于胆固醇与家族健康的对话。",
      [
        { icon: "Users", label: "50% 共享遗传风险", text: "父母、兄弟姐妹和子女遗传 FH 基因的概率高达 50%。" },
        { icon: "GitFork", label: "家族精准防控", text: "您的检测结果能为亲属提供一份极具针对性的检测导航图。" },
        { icon: "ShieldCheck", label: "未雨绸缪防患未然", text: "帮助家人在心血管问题出现前尽早采取科学预防措施。" }
      ]
    ),
    little: createVariant(
      "当检测出明确的 FH 致病变异时，级联筛查将针对遗传概率为 50% 的一级亲属开展精准检测。",
      "明确您的基因突变位点后，亲属仅需针对该特定位点进行快速快捷的检测。",
      "列出您一级血亲的姓名与年龄，以便在家族遗传咨询时提供给医生。",
      [
        { icon: "GitFork", label: "单位点精准检测", text: "亲属无需进行全基因组测序，仅需检测您的特定变异位点。" },
        { icon: "Clock", label: "早期干预获益", text: "让年轻的家族成员能在极早期阶段即获得保护性医疗干预。" },
        { icon: "Building2", label: "家族成员享有津贴", text: "通过级联筛查流程参检的亲属同样享受 MOH 卫生部补贴。" }
      ]
    ),
    research: createVariant(
      "级联筛查中的单位点针对性变异检测极大地降低了检测费用，同时保持了极高的临床敏感性。",
      "级联筛选协议通过仅针对先证者基因突变位点，显著降低了亲属的基因检测开销。",
      "与您的基因咨询师确认如何将转诊信呈交给您的直系亲属。",
      [
        { icon: "Search", label: "先证者位点靶向", text: "免去血亲家族成员进行高昂的全基因组面板测序费用。" },
        { icon: "Coins", label: "高性价比级联模式", text: "经 MOH 卫生部公共卫生指南充分验证的高性价比防控方案。" },
        { icon: "ShieldCheck", label: "可落地的早期预防", text: "有效阻断早发性冠心病在家族多代成员中的发生。" }
      ]
    ),
    advanced: createVariant(
      "级联筛查利用先证者的基因突变位点，系统化地对一级亲属进行靶向基因筛查。",
      "一级亲属具有 50% 的先验遗传概率，使得级联基因检测成为极具成本效益的公共卫生策略。",
      "在明确致病变异后，协助为一级亲属开具级联转诊信。",
      [
        { icon: "Users", label: "常染色体显性遗传", text: "父母、兄弟姐妹和子女具有 50% 的孟德尔遗传概率。" },
        { icon: "GitFork", label: "级联筛查临床路径", text: "直系亲属变异直接检测显著降低了家族整体诊断成本。" },
        { icon: "ShieldCheck", label: "金标准防控模型", text: "获得世界卫生组织 (WHO) 和各国卫生部高度推荐的金标准模型。" }
      ]
    )
  },
  'testing-guide': {
    new: createVariant(
      "FH 基因检测是一项安全、简便的门诊抽血项目，并由专业基因咨询师全程指导。",
      "检测流程清晰简明：首先进行面对面解答咨询，随后完成一次常规抽血即可。",
      "请携带您的 NRIC 身份证及预约确认凭证前往基因咨询诊所。",
      [
        { icon: "MessageSquare", label: "检测前基因咨询", text: "咨询师将详细讲解检测意义并耐心地解答您的所有疑虑。" },
        { icon: "Search", label: "常规门诊抽血", text: "只需抽取少量常规静脉血，样本将送往专业基因实验室。" },
        { icon: "FileText", label: "清晰易懂的报告", text: "专科医生将在 4 至 6 周内与您面对面解读详细报告。" }
      ]
    ),
    little: createVariant(
      "FH 基因检测路径包括临床评估、检测前咨询、DNA 测序分析及后续随访复诊。",
      "基因检测能提供确凿的分子诊断，为后续精准降脂治疗提供关键依据。",
      "准备好您关心的检测出结果周期等问题，以便向医生咨询。",
      [
        { icon: "ClipboardList", label: "临床综合评估", text: "综合评估个人血脂水平、家族史及高胆固醇体征。" },
        { icon: "Dna", label: "NGS 基因面板测序", text: "对 LDLR、APOB 和 PCSK9 等核心致病基因进行全面测序。" },
        { icon: "CheckCircle", label: "定制化治疗方案", text: "检测结果将直接指导医生为您选择最匹配的强效药物。" }
      ]
    ),
    research: createVariant(
      "NGS 基因面板检测针对 LDLR、APOB 和 PCSK9 基因进行测序，对 FH 具有极高诊断敏感性。",
      "DNA 测序能精准定位致病变异，明确区分单基因 FH 与多基因引起的胆固醇升高。",
      "在复诊解读结果时，与医生探讨变异分类详细信息 (VUS 意义未明变异与 Pathogenic 致病变异)。",
      [
        { icon: "Search", label: "靶向基因面板", text: "覆盖目前医学界已明确的所有单基因 FH 致病基因。" },
        { icon: "Activity", label: "分子诊断确定性", text: "将遗传性 FH 与生活方式引起的血脂偏高明确区分开来。" },
        { icon: "ShieldCheck", label: "精准对症下药", text: "指导高强度他汀或 PCSK9 抑制剂等精准用药方案。" }
      ]
    ),
    advanced: createVariant(
      "二代测序 (NGS) 技术可确认 FH 的分子病因，确定基因突变的致病性分类。",
      "NGS 面板测序能锁定致病突变，协助医生优化临床降脂目标值。",
      "复诊时与临床基因学家共同讨论 ACMG 基因变异分类指南标准。",
      [
        { icon: "Search", label: "NGS 高通量测序", text: "针对 LDLR、APOB、PCSK9 及 LDLRAP1 基因进行深度测序。" },
        { icon: "Activity", label: "基因型与表现型", text: "将基因突变严重程度与心血管风险分层进行精准关联。" },
        { icon: "ClipboardList", label: "先证者级联索引", text: "建立先证者变异索引，为全家族级联筛查打下基础。" }
      ]
    )
  },
  'costs-subsidies': {
    new: createVariant(
      "新加坡 MOH 卫生部津贴与 MediSave 确保每个人都能负担得起 FH 的检测与治疗费用。",
      "新加坡公民享受高达 70% 的政府诊疗补贴，大幅度减轻门诊及检测支出。",
      "就诊前在 HealthHub APP 中提前查询您的 MediSave 账户可用余额。",
      [
        { icon: "Coins", label: "政府丰厚补贴", text: "新加坡公民及永久居民均享有基于收入审查的门诊津贴。" },
        { icon: "Building2", label: "MediSave 余额抵扣", text: "可使用 MediSave 支付符合条件的诊疗咨询与化验检测费用。" },
        { icon: "ShieldCheck", label: "费用透明安心", text: "清晰明了的自付费用指引，绝无任何意料之外的隐藏账单。" }
      ]
    ),
    little: createVariant(
      "公立医院 FH 诊疗支持 MOH 收入审查补贴、MediSave 提取额度及 CHAS 健保卡折扣。",
      "补贴与 MediSave 的叠加使用可极大程度降低基因评估的个人现金支出。",
      "在诊所前台登记时询问您的 CHAS 健保卡扣减详情。",
      [
        { icon: "Building2", label: "收入审查分级津贴", text: "补贴比例根据家庭月均收入情况进行分级认定。" },
        { icon: "Coins", label: "MediSave500 / 700", text: "适用于慢性病门诊提取额度政策下的费用报销。" },
        { icon: "ShieldCheck", label: "自付封顶保护", text: "个人自付部分均设立了合理亲民的封顶限额。" }
      ]
    ),
    research: createVariant(
      "新加坡卫生部 (MOH) 为复杂遗传性脂质检测建立了结构化的补贴与报销框架。",
      "MOH 政府津贴与 MediSave 确保 FH 检测与后续治疗价格亲民，没有任何隐藏费用。",
      "在您的预约确认单中查看详细的个人自付费用明细。",
      [
        { icon: "Building2", label: "基因面板补贴分级", text: "门诊基因检测享受最高达 70% 的政府专项津贴。" },
        { icon: "Coins", label: "MediSave 报销申请", text: "可用于符合条件的专家咨询费及实验室化验面板费。" },
        { icon: "ShieldCheck", label: "收费公开透明", text: "公立医院收费严格遵循 MOH 卫生部制定的费用基准。" }
      ]
    ),
    advanced: createVariant(
      "新加坡 FH 诊断与治疗路径均获得 MOH 收入审查津贴与 MediSave 账户资金的强力支持。",
      "高达 70% 的 MOH 审查津贴叠加 MediSave 提取限额，极大程度降低了患者的实际自付共付额。",
      "向诊所的财务咨询师确认 MediSave 具体的年度提取限额细节。",
      [
        { icon: "Building2", label: "MOH 津贴分级", text: "公立诊所提供高达 70% 的收入审查诊疗津贴。" },
        { icon: "Coins", label: "MediSave 提取额度", text: "符合条件的门诊检测项目可使用 MediSave500/700 额度。" },
        { icon: "ShieldCheck", label: "公民共付额封顶", text: "新加坡公民与永久居民的自付费用设有保护性上限。" }
      ]
    )
  },
  'insurance-rights': {
    new: createVariant(
      "在新加坡，国家法规明确保障您自愿参加 FH 基因检测的各项合法权益。",
      "LIA 人寿保险协会暂行规定确保自愿基因检测不会对您的标准保险保障产生不利影响。",
      "检查您现有的寿险保单，确认保单处于持续正常生效状态。",
      [
        { icon: "ShieldCheck", label: "消费者权益保障", text: "保险公司不得强制要求您透露自愿参加的预测性基因检测结果。" },
        { icon: "Lock", label: "现有保单绝对安全", text: "您已生效的投保保单条款及保费保持完全不变。" },
        { icon: "CheckCircle", label: "标准保障额度", text: "依法享有标准保额范围内的公平投保权利。" }
      ]
    ),
    little: createVariant(
      "新加坡 LIA 人寿保险协会暂停规定严格监管核保人员获取自愿基因检测信息的权限。",
      "自愿性 FH 预测基因检测受到国家明确法律准则的妥善保护。",
      "如果您对保险相关指引有任何疑问，可向您的基因咨询师咨询。",
      [
        { icon: "ShieldCheck", label: "LIA 监管准则", text: "严格的暂行规定保护公民自愿性 DNA 预测检测隐私。" },
        { icon: "Lock", label: "保单安全无虞", text: "现有的寿险及医疗险保障不得被强制退保或单方面加价。" },
        { icon: "CheckCircle", label: "公平核保环境", text: "在暂行规定框架下，患者享有标准保额的公平投保环境。" }
      ]
    ),
    research: createVariant(
      "新加坡 LIA 基因检测暂行规定明确规范了保险核保人员调取自愿预测性 DNA 检测报告的边界。",
      "根据国家政策，自愿性 FH 预测检测结果免于强制性保险核保披露。",
      "妥善保存一份 LIA 暂行规定指南复印件以备个人查阅。",
      [
        { icon: "ShieldCheck", label: "暂行规定强效保护", text: "保险公司无权索要自愿预测性基因检测的结果报告。" },
        { icon: "Lock", label: "生效保单受保护", text: "已生效的保险合同不得被重新核保或提高加收保费。" },
        { icon: "CheckCircle", label: "平等投保权利", text: "保障公民在标准保额范围内享有平等的投保权益。" }
      ]
    ),
    advanced: createVariant(
      "新加坡 LIA 基因检测暂行规定明确规范了保险核保人员调取自愿预测性 DNA 检测报告的边界。",
      "国家监管暂停规定保护自愿预测检测结果免于强制核保披露。",
      "如需申请超高保额保单，可参阅 MOH 卫生部与 LIA 的行业行为守则指南。",
      [
        { icon: "ShieldCheck", label: "LIA 行业行为守则", text: "严禁在标准保险申请中强制要求投保人提供基因检测。" },
        { icon: "Lock", label: "保证续保与生效", text: "已在保的标准保单不得因基因检测被重新评估加费。" },
        { icon: "CheckCircle", label: "财务保额上限", text: "在标准保额限制范围内不施加额外的基因风险加费。" }
      ]
    )
  },
  'medication-fh': {
    new: createVariant(
      "FH 治疗采用安全、高效的针对性药物，能显著降低坏胆固醇并全方位保护您的心血管。",
      "由于 FH 是基因决定的，每日坚持服药是保持心脏健康最强有力的手段。",
      "请在每天傍晚固定时间服用为您开具的每日他汀类药物。",
      [
        { icon: "Pill", label: "每日他汀类药物治疗", text: "帮助您的肝脏高效清除血液中的坏胆固醇 (LDL)。" },
        { icon: "RefreshCw", label: "配合健康生活方式", text: "与均衡饮食和适度运动相辅相成，相得益彰。" },
        { icon: "HeartPulse", label: "全方位心脏守护", text: "大幅度降低您未来发生心血管疾病的远期风险。" }
      ]
    ),
    little: createVariant(
      "他汀类药物联合治疗能有效弥补由于基因缺陷导致的肝脏 LDL 清除能力不足。",
      "规范的每日服药能将血液中的坏胆固醇 (LDL) 拉回至正常安全的目标范围内。",
      "在下次复诊时与医生探讨您具体的胆固醇控制目标值。",
      [
        { icon: "Pill", label: "他汀 + 依折麦布", text: "联合方案同时阻断胆固醇的内源合成与肠道吸收。" },
        { icon: "RefreshCw", label: "受体辅助加速", text: "显著提升肝细胞吸收并清除血液循环中 LDL 颗粒的能力。" },
        { icon: "TrendingDown", label: "预防斑块形成", text: "保持心血管壁平滑健康，防止血管硬化。" }
      ]
    ),
    research: createVariant(
      "高强度他汀类药物联合依折麦布或 PCSK9 抑制剂能帮助 FH 患者达到理想的降脂目标。",
      "针对性降脂药物能上调肝脏 LDL 受体表达，使血液循环中的 LDL-C 浓度恢复正常。",
      "定期预约抽血检查，追踪您的坏胆固醇 (LDL-C) 下降轨迹。",
      [
        { icon: "Pill", label: "强效他汀类药物", text: "强效抑制肝脏内源性胆固醇的合成途径。" },
        { icon: "RefreshCw", label: "上调受体表达", text: "增加肝细胞表面具备功能的 LDL 受体数量。" },
        { icon: "TrendingDown", label: "稳定血管斑块", text: "稳定动脉纤维帽，防止发生急性心肌梗死等严重事件。" }
      ]
    ),
    advanced: createVariant(
      "通过 HMG-CoA 还原酶抑制及受体上调进行强化降脂，可有效重建内皮细胞安全。",
      "针对性降脂药物能上调肝脏 LDL 受体表达，使血液循环中的 LDL-C 浓度恢复正常。",
      "若基线 LDL-C 仍 >1.8 mmol/L，可与医生讨论加用 PCSK9 抑制剂靶向药物。",
      [
        { icon: "Pill", label: "HMG-CoA 还原酶抑制", text: "高强度他汀类药物全面抑制肝脏内源性胆固醇合成。" },
        { icon: "RefreshCw", label: "LDLR 代偿性表达", text: "代偿性上调 LDLR 表达，加速清除循环中的 ApoB 脂蛋白。" },
        { icon: "TrendingDown", label: "斑块逆转与消退", text: "实现目标 LDL-C <1.8 mmol/L，全面阻断冠状动脉粥样硬化进程。" }
      ]
    )
  }
};

// ----------------------------------------------------------------------
// TAMIL (TA) VARIANTS
// ----------------------------------------------------------------------
const TA_VARIANTS: Record<string, Record<KnowledgeLevelVariant, Record<ConcernVariant, VariantContent>>> = {
  'what-is-fh': {
    new: {
      general: createVariant(
        "குடும்பவழி ஹைபர்கொலஸ்டிரோலேமியா (FH) என்பது பிறப்பிலிருந்தே அதிக கொழுப்பை ஏற்படுத்தும் ஒரு பொதுவான மரபணு நிலையாகும்.",
        "FH 100% மரபணு சார்ந்த நிலை மற்றும் பிறப்பிலிருந்தே உள்ளது, அதாவது ஆரோக்கியமான பழக்கவழக்கங்களுடன் மருத்துவ சிகிச்சையும் அவசியமாகும்.",
        "உங்கள் அடுத்த வருகையின் போது உங்கள் குடும்ப சுகாதார வரலாற்றைப் பற்றி மருத்துவருடன் விவாதிக்கவும்.",
        [
          { icon: "Dna", label: "பரம்பரை காரணம்", text: "உணவு முறையால் அல்ல, குடும்ப மரபணுக்கள் வழியாக பரவுகிறது." },
          { icon: "TrendingUp", label: "அதிக கொலஸ்ட்ரால்", text: "முதல் நாளிலிருந்தே LDL கொலஸ்ட்ரால் அளவுகள் அதிகமாக இருக்கும்." },
          { icon: "ShieldCheck", label: "சிகிச்சை அளிக்கக்கூடியது", text: "ஆரம்பகால மருத்துவ வழிகாட்டுதல் மற்றும் வழக்கமான பராமரிப்புடன் நிர்வகிக்கலாம்." }
        ]
      ),
      family: createVariant(
        "குடும்பவழி ஹைபர்கொலஸ்டிரோலேமியா (FH) என்பது குடும்ப இரத்த வழிகள் வழியாக பரவும் ஒரு பரம்பரை நிலை.",
        "FH குடும்பங்களில் பரவுவதால், அதை ஆரம்பத்திலேயே கண்டறிவது உங்களையும் உங்கள் நெருங்கிய உறவினர்களையும் பாதுகாக்கிறது.",
        "உங்கள் பெற்றோர், உடன்பிறந்தவர்கள் அல்லது குழந்தைகளுடன் அடிப்படை FH கற்றல் பொருட்களைப் பகிரவும்.",
        [
          { icon: "Users", label: "குடும்ப தொடர்பு", text: "முதல் நிலை இரத்த உறவினர்களுக்கு இந்த மரபணுவைப் பெறுவதற்கு 50% வாய்ப்பு உள்ளது." },
          { icon: "Dna", label: "மரபணு குறிப்பான்", text: "FH மரபணுவைக் கண்டறிவது அன்பானவர்களுக்கு ஆரம்பகால சோதனையை வழிநடத்த உதவுகிறது." },
          { icon: "HeartPulse", label: "ஆரம்பகால பாதுகாப்பு", text: "ஆரம்பகால அடையாளம் தலைமுறைகள் முழுவதும் அமைதியான இதய அபாயத்தைத் தடுக்கிறது." }
        ]
      ),
      cost: createVariant(
        "FH என்பது ஒரு பொதுவான மரபணு நிலையாகும், மேலும் MOH மானியங்கள் சோதனையும் பராமரிப்பும் மலிவாக இருப்பதை உறுதி செய்கின்றன.",
        "உங்கள் பராமரிப்பு செலவைக் குறைவாக வைத்திருக்க அரசு மானியங்கள் ஆதரவு அளிக்கின்றன.",
        "உங்கள் வெளிநோயாளி சந்திப்பிற்கு முன் HealthHub இல் உங்கள் MediSave இருப்பைச் சரிபார்க்கவும்.",
        [
          { icon: "Coins", label: "மானிய பராமரிப்பு", text: "தகுதியுள்ள சிங்கப்பூரர்கள் FH பராமரிப்பிற்கு வருமான சோதிக்கப்பட்ட மானியங்களைப் பெறுகிறார்கள்." },
          { icon: "Building2", label: "MediSave ஆதரவு", text: "தகுதியான கலந்தாய்வு மற்றும் ஆய்வகக் கட்டணங்களை MediSave ஈடுசெய்யும்." },
          { icon: "ShieldCheck", label: "மலிவு திட்டம்", text: "நிதி அமைதி உங்கள் இதய ஆரோக்கியத்தில் கவனம் செலுத்த அனுமதிக்கிறது." }
        ]
      ),
      test: createVariant(
        "FH என்பது ஒரு பரம்பரை கொலஸ்ட்ரால் நிலை, இது ஒரு எளிய இரத்த பரிசோதனை மூலம் எளிதில் கண்டறியப்படலாம்.",
        "மரபணு பரிசோதனை உங்கள் கொலஸ்ட்ரால் காரணத்தை தெளிவுபடுத்துகிறது.",
        "இரத்த பரிசோதனை பற்றிய கேள்விகளை உங்கள் ஆலோசகரிடம் கேட்க எழுதி வையுங்கள்.",
        [
          { icon: "Search", label: "தெளிவான நோயறிதல்", text: "அதிக கொலஸ்ட்ரால் FH காரணமாக உள்ளதா என்பதை மரபணு பரிசோதனை உறுதிப்படுத்துகிறது." },
          { icon: "Dna", label: "எளிய இரத்த பரிசோதனை", text: "வழக்கமான வெளிநோயாளி மாதிரி நோயறிதலிலிருந்து ஊகங்களை அகற்றுகிறது." },
          { icon: "ShieldCheck", label: "தெளிவான அடுத்த கட்டங்கள்", text: "உங்கள் முடிவை அறிவது உங்கள் இதயத்தை ஆரம்பத்திலேயே பாதுகாக்க உதவுகிறது." }
        ]
      ),
      insurance: createVariant(
        "FH என்பது சிங்கப்பூரின் தேசிய தனியுரிமைப் பாதுகாப்பின் கீழ் பாதுகாக்கப்பட்ட ஒரு பரம்பரை கொலஸ்ட்ரால் நிலையாகும்.",
        "தேசிய விதிமுறைகள் உங்கள் சுயவிருப்ப மரபணு பரிசோதனை தனியுரிமையைப் பாதுகாக்கின்றன.",
        "உத்தரவாதம் அளிக்கப்பட்ட புதுப்பித்தல் விதிமுறைகளை உறுதிப்படுத்த உங்கள் தற்போதைய கொள்கையை மதிப்பாய்வு செய்யவும்.",
        [
          { icon: "ShieldCheck", label: "LIA மொராட்டோரியம்", text: "சுயவிருப்ப மரபணு சோதனைகளை வெளிப்படுத்த காப்பீட்டாளர்கள் உங்களை வற்புறுத்த முடியாது." },
          { icon: "Lock", label: "பாதுகாக்கப்பட்ட பாலிசிகள்", text: "உங்கள் தற்போதைய ஆயுள் மற்றும் சுகாதார காப்பீட்டு பாலிசிகள் முழுமையாக செயல்படும்." },
          { icon: "CheckCircle", label: "நிலையான உரிமைகள்", text: "நிலையான காப்பீட்டுப் பாதுகாப்பிற்கான அணுகலை நீங்கள் பராமரிக்கிறீர்கள்." }
        ]
      ),
      meds: createVariant(
        "FH பிறப்பிலிருந்தே அதிக கொலஸ்ட்ராலை ஏற்படுத்துகிறது, இரத்த நாளங்களைப் பாதுகாக்க தினசரி மருந்துகள் தேவைப்படுகின்றன.",
        "FH மரபணு சார்ந்த என்பதால், தினசரி மருத்துவ சிகிச்சை கொலஸ்ட்ராலைக் குறைக்க முக்கிய கருவியாகும்.",
        "ஒவ்வொரு நாளும் பரிந்துரைக்கப்பட்ட கொலஸ்ட்ரால் மருந்துகளை தவறாமல் எடுத்துக்கொள்ளுங்கள்.",
        [
          { icon: "Pill", label: "நிரூபிக்கப்பட்ட சிகிச்சை", text: "தினசரி ஸ்டேட்டின் மருந்துகள் கல்லீரல் கெட்ட கொலஸ்ட்ராலை திறம்பட அகற்ற உதவுகின்றன." },
          { icon: "RefreshCw", label: "இயற்கை உதவியாளர்", text: "மரபணு மூல காரணத்தை நேரடியாக உரையாற்றுவதன் மூலம் உணவை பூர்த்தி செய்கிறது." },
          { icon: "TrendingDown", label: "அபாயக் குறைப்பு", text: "நீண்டகால இருதய நோய்க்கான ஆபத்தை சாதாரண நிலைக்கு கொண்டு வருகிறது." }
        ]
      ),
      heart: createVariant(
        "FH அதிகப்படியான LDL கொலஸ்ட்ராலை ஏற்படுத்துகிறது, இது காலப்போக்கில் இதய தமனிகளில் அமைதியாக உருவாகலாம்.",
        "ஆரம்பகால நோயறிதல் தகடு சேருவதைத் தடுக்கிறது, இதய தமனிகளை ஆரோக்கியமாக வைத்திருக்கிறது.",
        "உங்கள் பொலிக்ளினிக் அல்லது நிபுணருடன் வழக்கமான இருதய பரிசோதனைகளை திட்டமிடுங்கள்.",
        [
          { icon: "HeartPulse", label: "அமைதியான பிளேக்", text: "அதிக கொலஸ்ட்ரால் அறிகுறிகளை உருவாக்காமல் இரத்த நாளங்களை சுருக்கும்." },
          { icon: "Clock", label: "வாழ்நாள் பராமரிப்பு", text: "FH-ஐ ஆரம்பத்தில் கையாள்வது இரத்த நாளச் சுவர்களைப் பாதுகாக்கிறது." },
          { icon: "ShieldCheck", label: "இதய பாதுகாப்பு", text: "செயலூக்கமான பராமரிப்பு உங்கள் இதயத்தை வாழ்நாள் முழுவதும் ஆரோக்கியமாக வைத்திருக்கிறது." }
        ]
      )
    },
    little: createVariant(
      "FH என்பது ஒரு பொதுவான மரபணு லிப்பிட் நிலையாகும், இதற்கு மருத்துவ சிகிச்சை தேவைப்படுகிறது.",
      "FH என்பது ஒரு ஆட்டோசோமால் மரபணு நிலை, இங்கு மருத்துவ சிகிச்சை இயல்பான இருதய ஆபத்தை மீட்டெடுக்கிறது.",
      "உங்கள் மருத்துவருக்கு உங்கள் சமீபத்திய கொலஸ்ட்ரால் இரத்த பரிசோதனை எண்களின் பட்டியலை தயார் செய்யவும்.",
      [
        { icon: "Dna", label: "மரபணு மூலம்", text: "கல்லீரல் LDL அகற்றுதலை மாற்றும் குறிப்பிட்ட மரபணு மாறுபாடுகளால் இயக்கப்படுகிறது." },
        { icon: "TrendingUp", label: "உயர்ந்த LDL-C", text: "உணவு மாற்றங்களைப் பொருட்படுத்தாமல் LDL கொலஸ்ட்ரால் அதிகமாகவே உள்ளது." },
        { icon: "Pill", label: "இலக்கு பராமரிப்பு", text: "உயர் திறன் கொண்ட லிப்பிட் சிகிச்சைகள் கொலஸ்ட்ராலை திறம்பட கட்டுப்படுத்துகின்றன." }
      ]
    ),
    research: createVariant(
      "சிங்கப்பூரின் சுகாதார கட்டமைப்பு FH கண்டறிதல் மற்றும் நிர்வாகத்திற்கு இலக்கு வைக்கப்பட்ட MOH மானியங்களை வழங்குகிறது.",
      "MOH மானியங்கள் மற்றும் MediSave ஆகியவை FH சோதனை மற்றும் சிகிச்சையை மறைக்கப்பட்ட செலவுகள் இல்லாமல் வைத்திருப்பதை உறுதி செய்கின்றன.",
      "HealthHub இல் உங்கள் MediSave இருப்பைச் சரிபார்த்து, நிதி ஆலோசனையைக் கேட்கவும்.",
      [
        { icon: "Building2", label: "மானிய குழு நிலைகள்", text: "மானியங்கள் 70% வரை வெளிநோயாளி மரபணு சோதனைகளை உள்ளடக்குகின்றன." },
        { icon: "Coins", label: "MediSave உரிமைகோரல்கள்", text: "தகுதியான கலந்தாய்வு மற்றும் ஆய்வகக் கட்டணங்களுக்குப் பயன்படுத்தக்கூடியது." },
        { icon: "ShieldCheck", label: "வெளிப்படையான விகிதங்கள்", text: "அரசு மருத்துவமனைக் கட்டணங்கள் தெளிவான MOH வழிகாட்டுதல்களைப் பின்பற்றுகின்றன." }
      ]
    ),
    advanced: createVariant(
      "கேஸ்கேட் திரையிடல் (Cascade screening) இலக்கு வைக்கப்பட்ட மரபணு சோதனை மூலம் முதல் நிலை உறவினர்களை மதிப்பிடுகிறது.",
      "முதல் நிலை உறவினர்களிடம் இலக்கு வைக்கப்பட்ட சோதனை மிகவும் திறமையானது மற்றும் தடுப்பு பராமரிப்பை செயல்படுத்துகிறது.",
      "உங்கள் நோய்க்காரணி மரபணு கண்டறியப்பட்டதும், உங்கள் முதல் நிலை உறவினர்களுக்கான பரிந்துரை கடிதங்களைக் கேட்கவும்.",
      [
        { icon: "Dna", label: "நோய்க்காரணி மாறுபாடு", text: "வாங்கி வழிநடத்தும் எண்டோசைட்டோசிஸைக் குறைக்கும் ஒற்றை மரபணு பிறழ்வு." },
        { icon: "TrendingUp", label: "கடுமையான கொலஸ்டிரோலேமியா", text: "சிகிச்சையளிக்கப்படாத பிளாஸ்மா LDL-C வழக்கமாக பெரியவர்களுக்கு 4.9 mmol/L ஐ விட அதிகமாக இருக்கும்." },
        { icon: "Pill", label: "மருந்தியல் சிகிச்சை", text: "உயர் தீவிர ஸ்டேடின்கள் பெரும்பாலும் Ezetimibe உடன் இணைந்து தேவைப்படுகின்றன." }
      ]
    )
  },
  'why-testing-matters': {
    new: createVariant(
      "கேஸ்கேட் திரையிடல் என்பது நெருங்கிய குடும்ப உறுப்பினர்களிடம் FH-ஐக் கண்டறிய உதவும் ஒரு பாதுகாப்புத் திட்டமாகும்.",
      "கேஸ்கேட் திரையிடல் பரம்பரை FH அபாயத்தைப் பகிர்ந்து கொள்ளும் உறவினர்களை அடையாளம் கண்டு பாதுகாக்கிறது.",
      "கொலஸ்ட்ரால் பற்றி உங்கள் பெற்றோர் மற்றும் உடன்பிறந்தவர்களுடன் ஒரு குடும்ப சுகாதார விவாதத்தைத் தொடங்கவும்.",
      [
        { icon: "Users", label: "50% பகிர்வு ஆபத்து", text: "பெற்றோர், சகோதரர்கள், சகோதரிகள் மற்றும் குழந்தைகளுக்கு FH இருக்க 50% வாய்ப்பு உள்ளது." },
        { icon: "GitFork", label: "குடும்ப மர வரைபடம்", text: "உங்கள் சோதனை முடிவு அன்பானவர்களைச் சோதிப்பதற்கான வழிகாட்டியாகச் செயல்படுகிறது." },
        { icon: "ShieldCheck", label: "ஆரம்பகால பாதுகாப்பு", text: "பிரச்சனைகள் தோன்றுவதற்கு முன்பே தடுப்பு பராமரிப்பைத் தொடங்க உதவுகிறது." }
      ]
    ),
    little: createVariant(
      "ஒரு FH மாறுபாடு அடையாளம் காணப்படும் போது, கேஸ்கேட் சோதனை 50% வாய்ப்பு கொண்ட முதல் நிலை உறவினர்களை இலக்காகக் கொள்கிறது.",
      "உங்கள் மரபணு மாறுபாட்டை அடையாளம் காண்பது உங்கள் குழந்தைகளுக்கான விரைவான சோதனையை திறக்கிறது.",
      "குடும்ப ஆலோசனைக்காக உங்கள் முதல் நிலை இரத்த உறவினர்களின் பெயர்கள் மற்றும் வயதைப் பட்டியலிடவும்.",
      [
        { icon: "GitFork", label: "ஒற்றை-தள சோதனை", text: "உறவினர்களுக்கு உங்கள் குறிப்பிட்ட மரபணு மாறுபாட்டிற்கு மட்டுமே சோதனை தேவை." },
        { icon: "Clock", label: "ஆரம்பகால தலையீடு", text: "இளம் குடும்ப உறுப்பினர்கள் ஆரம்பத்திலேயே பாதுகாப்பு பராமரிப்பைத் தொடங்க அனுமதிக்கிறது." },
        { icon: "Building2", label: "மானிய குடும்பத்தினர்", text: "கேஸ்கேட் நெறிமுறைகள் மூலம் திரையிடப்பட்ட உறவினர்கள் MOH மானியங்களுக்குத் தகுதி பெறுகிறார்கள்." }
      ]
    ),
    research: createVariant(
      "கேஸ்கேட் திரையிடலில் இலக்கு வைக்கப்பட்ட சோதனை செலவுகளைக் குறைக்கும் அதே வேளையில் உணர்திறனை அதிகப்படுத்துகிறது.",
      "கேஸ்கேட் நெறிமுறைகள் உறவினர்களுக்கான மரபணு சோதனைச் செலவுகளைக் குறைக்கின்றன.",
      "உறவினர்களுக்கு பரிந்துரை கடிதங்கள் எவ்வாறு அனுப்பப்படலாம் என்பதை உங்கள் ஆலோசகரிடம் உறுதிப்படுத்தவும்.",
      [
        { icon: "Search", label: "இலக்கு மரபணு சோதனை", text: "இரத்த உறவினர்களுக்கான முழு குழு வரிசைமுறை செலவுகளைத் தவிர்க்கிறது." },
        { icon: "Coins", label: "செலவு குறைந்த திரையிடல்", text: "MOH பொது சுகாதார வழிகாட்டுதல்களால் சரிபார்க்கப்பட்ட உயர் செலவு திறன்." },
        { icon: "ShieldCheck", label: "செயல்படக்கூடிய தடுப்பு", text: "குடும்ப உறுப்பினர்களுக்கு ஆரம்பகால இருதய நோயைத் தடுக்கிறது." }
      ]
    ),    advanced: createVariant(
      "கேஸ்கேட் திரையிடல் முதல் நிலை உறவினர்களை திட்டமிட்டு பரிசோதிக்க பயன்படுத்தப்படுகிறது.",
      "முதல் நிலை உறவினர்களுக்கு 50% வாய்ப்பு உள்ளது, இது கேஸ்கேட் சோதனையை மிகவும் செலவு குறைந்ததாக ஆக்குகிறது.",
      "நோய்க்காரணி மரபணு உறுதி செய்யப்பட்டதும் முதல் நிலை உறவினர்களுக்கான பரிந்துரை கடிதங்களை வழங்கவும்.",
      [
        { icon: "Users", label: "ஆட்டோசோமால் ஆதிக்கம்", text: "பெற்றோர், உடன்பிறந்தவர்கள் மற்றும் குழந்தைகளுக்கு 50% பரம்பரை வாய்ப்பு." },
        { icon: "GitFork", label: "கேஸ்கேட் நெறிமுறை", text: "நேரடி பிறழ்வு சோதனை நோயறிதல் செலவைக் குறைக்கிறது." },
        { icon: "ShieldCheck", label: "செலவு குறைந்த மாதிரி", text: "உலகளாவிய சுகாதார அதிகாரிகளால் அங்கீகரிக்கப்பட்ட தங்க தரநிலை உத்தி." }
      ]
    )
  },
  'testing-guide': {
    new: createVariant(
      "FH மரபணு பரிசோதனை என்பது பாதுகாப்பான, எளிய வெளிநோயாளி இரத்த பரிசோதனையாகும்.",
      "பரிசோதனை நேரடியானது: ஒரு சுருக்கமான விவாதத்தைத் தொடர்ந்து ஒரு விரைவான இரத்த மாதிரி எடுக்கப்படும்.",
      "உங்கள் ஆலோசனை அமர்வுக்கு உங்கள் NRIC மற்றும் நியமன உறுதிப்படுத்தலை எடுத்து வாருங்கள்.",
      [
        { icon: "MessageSquare", label: "சோதனைக்கு முந்தைய ஆலோசனை", text: "ஒரு ஆலோசகர் சோதனையின் நன்மைகளை விளக்குகிறார் மற்றும் அனைத்து கேள்விகளுக்கும் பதிலளிக்கிறார்." },
        { icon: "Search", label: "எளிய இரத்த மாதிரி", text: "சிறப்பு மரபியல் ஆய்வகத்திற்கு அனுப்பப்படும் வழக்கமான இரத்த மாதிரி." },
        { icon: "FileText", label: "தெளிவான முடிவுகள்", text: "உங்கள் நிபுணர் 4 முதல் 6 வாரங்களில் உங்களுடன் முடிவுகளை மதிப்பாய்வு செய்வார்." }
      ]
    ),
    little: createVariant(
      "FH சோதனை பாதை மருத்துவ மதிப்பீடு, ஆலோசனை, DNA பகுப்பாய்வு மற்றும் பின்தொடர்தல் ஆகியவற்றைக் கொண்டுள்ளது.",
      "மரபணு பரிசோதனை துல்லியமான கொலஸ்ட்ரால் மேலாண்மையை வழிநடத்த ஒரு தெளிவான நோயறிதலை வழங்குகிறது.",
      "சோதனை திருப்புமுனை நேரங்கள் குறித்த கேள்விகளை உங்கள் மருத்துவரிடம் தயார் செய்யவும்.",
      [
        { icon: "ClipboardList", label: "மருத்துவ மதிப்பாய்வு", text: "தனிப்பட்ட லிப்பிட் அளவுகள் மற்றும் அதிக கொலஸ்ட்ராலின் உடல் அறிகுறிகளை மதிப்பிடுகிறது." },
        { icon: "Dna", label: "NGS மரபணு குழு", text: "LDLR, APOB மற்றும் PCSK9 மரபணுக்களை சோதிக்கிறது." },
        { icon: "CheckCircle", label: "தனிப்பயனாக்கப்பட்ட திட்டம்", text: "முடிவுகள் சிறந்த மருந்துத் தேர்வை நேரடியாகத் தெரிவிக்கின்றன." }
      ]
    ),
    research: createVariant(
      "NGS பேனல் சோதனை LDLR, APOB மற்றும் PCSK9 மரபணுக்களை உயர் உணர்திறனுடன் பரிசோதிக்கிறது.",
      "DNA வரிசைமுறை FH-ஐ பிற லிப்பிட் உயர்வுகளிலிருந்து வேறுபடுத்தி நோய்க்காரணி மாறுபாடுகளை சுட்டிக்காட்டுகிறது.",
      "உங்கள் முடிவுகள் ஆலோசனையின் போது மாறுபாடு விளக்க விவரங்களைப் பற்றி விவாதிக்கவும்.",
      [
        { icon: "Search", label: "இலக்கு வைக்கப்பட்ட குழு", text: "நிலையான FH காரண மரபணுக்களை உள்ளடக்கியது." },
        { icon: "Activity", label: "நோயறிதல் நிச்சயம்", text: "பரம்பரை மரபணு FH-ஐ வாழ்க்கை முறை கொலஸ்ட்ரால் உயர்வுகளிலிருந்து வேறுபடுத்துகிறது." },
        { icon: "ShieldCheck", label: "சிகிச்சை சீரமைப்பு", text: "ஸ்டேடின்கள் அல்லது PCSK9 இன்ஹிபிட்டர்களைத் தேர்ந்தெடுப்பதை வழிநடத்துகிறது." }
      ]
    ),
    advanced: createVariant(
      "அடுத்த தலைமுறை வரிசைமுறை (NGS) FH மூலக்கூறு காரணத்தை உறுதிப்படுத்துகிறது.",
      "NGS பேனல் சோதனை மருத்துவ லிப்பிட் இலக்குகளை மேம்படுத்த காரணமான பிறழ்வை அடையாளம் காண்கிறது.",
      "மதிப்பாய்வின் போது உங்கள் மருத்துவ மரபியல் நிபுணருடன் ACMG வழிகாட்டுதல்களை மதிப்பாய்வு செய்யவும்.",
      [
        { icon: "Search", label: "NGS வரிசைமுறை", text: "LDLR, APOB, PCSK9 மற்றும் LDLRAP1 ஆகியவற்றின் இலக்கு வரிசைமுறை." },
        { icon: "Activity", label: "மரபணு வகை", text: "பிறழ்வு తీవ్రமையை இருதய ஆபத்து வகைப்பாட்டுடன் தொடர்புபடுத்துகிறது." },
        { icon: "ClipboardList", label: "கேஸ்கேட் குறியீடு", text: "குடும்ப திரையிடலுக்கான குறியீட்டு நோயாளி மாறுபாட்டை நிறுவுகிறது." }
      ]
    )
  },
  'costs-subsidies': {
    new: createVariant(
      "சிங்கப்பூர் MOH மானியங்கள் மற்றும் MediSave ஆகியவை FH சோதனை மற்றும் சிகிச்சை அணுகக்கூடியதாக இருப்பதை உறுதி செய்கின்றன.",
      "அரசு மானியங்கள் சிங்கப்பூரர்களுக்கான கலந்தாய்வு மற்றும் சோதனைச் செலவுகளில் 70% வரை அடங்கும்.",
      "உங்கள் கலந்தாய்வுக்கு முன் HealthHub இல் உங்கள் MediSave இருப்பைச் சரிபார்க்கவும்.",
      [
        { icon: "Coins", label: "அரசு மானியங்கள்", text: "சிங்கப்பூர் குடிமக்கள் மற்றும் PRகளுக்கு 70% வரை வருமான சோதிக்கப்பட்ட மானியங்கள்." },
        { icon: "Building2", label: "MediSave பாதுகாப்பு", text: "தகுதியான கலந்தாய்வு மற்றும் ஆய்வகக் கட்டணங்களுக்கு MediSave இருப்பைப் பயன்படுத்தவும்." },
        { icon: "ShieldCheck", label: "வெளிப்படையான கட்டணங்கள்", text: "எதிர்பாராத கட்டணங்கள் இல்லாத தெளிவான கைசெலவு வழிகாட்டுதல்." }
      ]
    ),
    little: createVariant(
      "அரசு மருத்துவமனை FH பராமரிப்பு MOH வருமான சோதனை, MediSave வரம்புகள் மற்றும் CHAS அடுக்குகளால் ஆதரிக்கப்படுகிறது.",
      "மானியங்கள் மற்றும் MediSave ஆகியவை மரபணு மதிப்பீட்டிற்கான கைசெலவுச் செலவுகளை கணிசமாகக் குறைக்கின்றன.",
      "CHAS அட்டை மானியக் கழிவுகள் பற்றி மருத்துவமனை வரவேற்பறையில் கேட்கவும்.",
      [
        { icon: "Building2", label: "வருமான சோதிக்கப்பட்ட அடுக்குகள்", text: "குடும்ப மாதாந்திர வருமானத்தால் மானிய சதவீதம் தீர்மானிக்கப்படுகிறது." },
        { icon: "Coins", label: "MediSave500 / 700", text: "நாள்பட்ட நோய் வெளிநோயாளி திரும்பப் பெறும் வரம்புகளின் கீழ் பொருந்தும்." },
        { icon: "ShieldCheck", label: "வரம்பிடப்பட்ட செலவுகள்", text: "கைசெலவுத் தொகை மலிவு விலையில் உச்சவரம்பு செய்யப்பட்டுள்ளது." }
      ]
    ),
    research: createVariant(
      "சிங்கப்பூர் சுகாதார அமைச்சகம் மரபணு லிப்பிட் பேனல்களுக்கு கட்டமைக்கப்பட்ட மானிய கட்டமைப்பை வழங்குகிறது.",
      "MOH மானியங்கள் மற்றும் MediSave ஆகியவை FH சோதனை மற்றும் சிகிச்சையை மறைக்கப்பட்ட செலவுகள் இல்லாமல் வைத்திருப்பதை உறுதி செய்கின்றன.",
      "உங்கள் முன்பதிவு சுருக்கத்தில் கைசெலவுத் தொகை முறிவை மதிப்பாய்வு செய்யவும்.",
      [
        { icon: "Building2", label: "மானிய குழு நிலைகள்", text: "மானியங்கள் 70% வரை வெளிநோயாளி மரபணு சோதனைகளை உள்ளடக்குகின்றன." },
        { icon: "Coins", label: "MediSave உரிமைகோரல்கள்", text: "தகுதியான கலந்தாய்வு மற்றும் ஆய்வகக் கட்டணங்களுக்குப் பயன்படுத்தக்கூடியது." },
        { icon: "ShieldCheck", label: "வெளிப்படையான விகிதங்கள்", text: "அரசு மருத்துவமனைக் கட்டணங்கள் தெளிவான MOH வழிகாட்டுதல்களைப் பின்பற்றுகின்றன." }
      ]
    ),
    advanced: createVariant(
      "சிங்கப்பூரில் FH கண்டறிதல் பாதைகள் MOH வருமான சோதிக்கப்பட்ட மானியங்கள் மற்றும் MediSave கணக்குகளால் ஆதரிக்கப்படுகின்றன.",
      "70% வரையிலான MOH மானியங்கள் மற்றும் MediSave வரம்புகள் நோயாளி செலுத்த வேண்டிய தொகையைக் கணிசமாகக் குறைக்கின்றன.",
      "மருத்துவமனை நிதி ஆலோசகர்களிடம் MediSave திரும்பப் பெறும் வரம்புகளை உறுதிப்படுத்தவும்.",
      [
        { icon: "Building2", label: "MOH மானிய அடுக்கு", text: "பொது கிளினிக்குகள் 70% வரை வருமான சோதிக்கப்பட்ட மானியத்தை வழங்குகின்றன." },
        { icon: "Coins", label: "MediSave திரும்பப் பெறுதல்", text: "தகுதியான வெளிநோயாளி சோதனைகள் MediSave500/700 தொப்பிகளைப் பயன்படுத்துகின்றன." },
        { icon: "ShieldCheck", label: "கூட்டு கட்டண வரம்பு", text: "சிங்கப்பூர் குடிமக்கள் & PRகளுக்கு கைசெலவு கட்டணம் வரம்பிடப்பட்டுள்ளது." }
      ]
    )
  },
  'insurance-rights': {
    new: createVariant(
      "சிங்கப்பூரில், FH-க்கான சுயவிருப்ப மரபணு சோதனைகளை எடுப்பதற்கான உங்கள் உரிமையை தேசிய விதிமுறைகள் பாதுகாக்கின்றன.",
      "LIA மொராட்டோரியம் சுயவிருப்ப மரபணு சோதனைகள் காப்பீட்டைப் பாதிக்காது என்பதை உறுதி செய்கிறது.",
      "செயலில் உள்ள நிலையை உறுதிப்படுத்த உங்கள் தற்போதைய ஆயுள் காப்பீட்டு பாலிசிகளை மதிப்பாய்வு செய்யவும்.",
      [
        { icon: "ShieldCheck", label: "நுகர்வோர் பாதுகாப்பு", text: "சுயவிருப்ப மரபணு சோதனைகளை வெளிப்படுத்த காப்பீட்டாளர்கள் உங்களைக் கட்டாயப்படுத்த முடியாது." },
        { icon: "Lock", label: "தற்போதைய பாலிசிகள் பாதுகாப்பானவை", text: "உங்கள் செயலில் உள்ள காப்பீட்டு பாலிசிகள் மாறாமல் இருக்கும்." },
        { icon: "CheckCircle", label: "நிலையான பாதுகாப்பு", text: "பாகுபாடு இன்றி நிலையான காப்பீட்டு வரம்புகளை அணுகலாம்." }
      ]
    ),
    little: createVariant(
      "சிங்கப்பூர் LIA மொராட்டோரியம் காப்பீட்டு ஒப்புறுதிக்கான மரபணு சோதனை வெளிப்பாடுகளை நிர்வகிக்கிறது.",
      "சுயவிருப்ப FH மரபணு பரிசோதனை தெளிவான தேசிய வழிகாட்டுதலின் கீழ் பாதுகாக்கப்படுகிறது.",
      "காப்பீட்டு வழிகாட்டுதல்கள் பற்றிய கேள்விகள் இருந்தால் உங்கள் மரபணு ஆலோசகரிடம் கேட்கவும்.",
      [
        { icon: "ShieldCheck", label: "LIA வழிகாட்டுதல்கள்", text: "கண்டிப்பான மொராட்டோரியம் சுயவிருப்ப DNA சோதனையைப் பாதுகாக்கிறது." },
        { icon: "Lock", label: "பாலிசி பாதுகாப்பு", text: "தற்போதைய ஆயுள் மற்றும் சுகாதாரப் பாதுகாப்பை ரத்து செய்யவோ அல்லது உயர்த்தவோ முடியாது." },
        { icon: "CheckCircle", label: "நியாயமான ஒப்புறுதி", text: "மொராட்டோரியம் விதிகளின் கீழ் நிலையான வரம்புகள் பொருந்தும்." }
      ]
    ),
    research: createVariant(
      "மரபணு பரிசோதனை குறித்த சிங்கப்பூரின் LIA மொராட்டோரியம் காப்பீட்டு நிறுவனங்களின் அணுகலைக் கட்டுப்படுத்துகிறது.",
      "தேசியக் கொள்கையின் கீழ் சுயவிருப்ப FH பரிசோதனை கட்டாயக் காப்பீட்டு வெளிப்பாட்டிலிருந்து பாதுகாக்கப்படுகிறது.",
      "உங்கள் தனிப்பட்ட பதிவுகளுக்கு LIA மொராட்டோரியம் வழிகாட்டியின் நகலை வைத்திருங்கள்.",
      [
        { icon: "ShieldCheck", label: "மொராட்டோரியம் பாதுகாப்பு", text: "காப்பீட்டாளர்கள் சுயவிருப்ப மரபணு சோதனை முடிவுகளைக் கேட்க முடியாது." },
        { icon: "Lock", label: "செயலில் உள்ள பாலிசிகள்", text: "தற்போதைய காப்பீட்டு ஒப்பந்தங்களை உயர்த்தவோ ரத்து செய்யவோ முடியாது." },
        { icon: "CheckCircle", label: "நிலையான அணுகல்", text: "நிலையான காப்பீட்டு வரம்புகளுக்கு நியாயமான அணுகலை உறுதி செய்கிறது." }
      ]
    ),
    advanced: createVariant(
      "மரபணு பரிசோதனை குறித்த சிங்கப்பூரின் LIA மொராட்டோரியம் காப்பீட்டு நிறுவனங்களின் அணுகலைக் கட்டுப்படுத்துகிறது.",
      "தேசிய ஒழுங்குமுறை மொராட்டோரியம் சுயவிருப்ப சோதனை முடிவுகளைக் கட்டாய வெளிப்பாட்டிலிருந்து பாதுகாக்கிறது.",
      "உயர் மதிப்புடைய பாலிசிகளுக்கு விண்ணப்பித்தால் MOH LIA நடத்தை விதிகள் வழிகாட்டுதல்களைப் பார்க்கவும்.",
      [
        { icon: "ShieldCheck", label: "LIA நடத்தை விதிகள்", text: "காப்பீட்டு விண்ணப்பங்களுக்கு கட்டாய மரபணு சோதனையைத் தடை செய்கிறது." },
        { icon: "Lock", label: "உத்தரவாதமளிக்கப்பட்ட புதுப்பித்தல்", text: "செயலில் உள்ள நிலையான பாலிசிகளை மீண்டும் மதிப்பிட முடியாது." },
        { icon: "CheckCircle", label: "நிதி வரம்பு", text: "மரபணு சுமை இல்லாமல் நிலையான பாதுகாப்பு வரம்புகள் பொருந்தும்." }
      ]
    )
  },
  'medication-fh': {
    new: createVariant(
      "FH சிகிச்சை கெட்ட கொலஸ்ட்ராலைக் குறைக்கவும் உங்கள் இதயத்தைப் பாதுகாக்கவும் பாதுகாப்பான, பயனுள்ள மருந்துகளைப் பயன்படுத்துகிறது.",
      "FH மரபணு சார்ந்த என்பதால், உங்கள் இதயத்தை ஆரோக்கியமாக வைத்திருக்க தினசரி மருந்து மிகவும் பயனுள்ள கருவியாகும்.",
      "ஒவ்வொரு மாலையும் ஒரே நேரத்தில் உங்களுக்கு பரிந்துரைக்கப்பட்ட தினசரி ஸ்டேட்டின் மருந்தை எடுத்துக்கொள்ளுங்கள்.",
      [
        { icon: "Pill", label: "தினசரி ஸ்டேட்டின் சிகிச்சை", text: "உங்கள் கல்லீரல் இரத்த ஓட்டத்தில் இருந்து கெட்ட கொலஸ்ட்ராலை அகற்ற உதவுகிறது." },
        { icon: "RefreshCw", label: "ஆரோக்கியமான பழக்கவழக்கங்கள்", text: "சீரான உணவு மற்றும் உடற்பயிற்சியுடன் இணைந்து செயல்படுகிறது." },
        { icon: "HeartPulse", label: "இதய பாதுகாப்பு", text: "உங்கள் நீண்டகால இதய நோய் ஆபத்தைக் கணிசமாகக் குறைக்கிறது." }
      ]
    ),
    little: createVariant(
      "ஸ்டேடின்கள் மற்றும் கூட்டு சிகிச்சைகள் குறைக்கப்பட்ட கல்லீரல் LDL அகற்றுதலை திறம்பட ஈடுசெய்கின்றன.",
      "தினசரி மருந்து இரத்தத்தில் உள்ள LDL கொலஸ்ட்ரால் அளவை சாதாரண இலக்கு வரம்பிற்குள் கொண்டு வருகிறது.",
      "உங்கள் அடுத்த பின்தொடர்தலின் போது உங்கள் மருத்துவர் இலக்குகளைப் பற்றி விவாதிக்கவும்.",
      [
        { icon: "Pill", label: "ஸ்டேட்டின் + எசெட்டிமிப்", text: "கூட்டு சிகிச்சை கொலஸ்ட்ரால் உற்பத்தி மற்றும் உறிஞ்சுதலைத் தடுக்கிறது." },
        { icon: "RefreshCw", label: "வாங்கி உதவியாளர்", text: "கல்லீரல் செல்கள் LDL துகள்களை எடுப்பதை அதிகரிக்கிறது." },
        { icon: "TrendingDown", label: "பிளேக் தடுப்பு", text: "இரத்த நாளச் சுவர்களை சுத்தமாகவும் ஆரோக்கியமாகவும் வைத்திருக்கிறது." }
      ]
    ),
    research: createVariant(
      "Ezetimibe அல்லது PCSK9 இன்ஹிபிட்டர்களுடன் இணைக்கப்பட்ட உயர் திறன் கொண்ட ஸ்டேடின்கள் இலக்கு LDL-C குறைப்பை அடைகின்றன.",
      "இலக்கு வைக்கப்பட்ட லிப்பிட் சிகிச்சை சுழற்சியில் உள்ள LDL-C செறிவை இயல்பாக்க கல்லீரல் LDL வாங்கிகளை அதிகரிக்கிறது.",
      "உங்கள் LDL-C குறைப்பு பாதையைக் கண்காணிக்க வழக்கமான இரத்த பரிசோதனைகளை திட்டமிடுங்கள்.",
      [
        { icon: "Pill", label: "உயர் திறன் ஸ்டேடின்கள்", text: "கல்லீரல் கொலஸ்ட்ரால் உற்பத்தியை திறம்பட அடக்குகிறது." },
        { icon: "RefreshCw", label: "வாங்கி அதிகரிப்பு", text: "கல்லீரல் செல் பரப்பில் செயல்படும் LDL வாங்கிகளை அதிகரிக்கிறது." },
        { icon: "TrendingDown", label: "பிளேக் സ്ഥിரத்தன்மை", text: "கடுமையான நிகழ்வுகளைத் தடுக்க தமனி நார் தொப்பிகளை உறுதிப்படுத்துகிறது." }
      ]
    ),
    advanced: createVariant(
      "HMG-CoA ரெடக்டேஸ் தடுப்பு மற்றும் வாங்கி அதிகரிப்பு மூலம் தீவிர லிப்பிட் குறைப்பு எண்டோதீலியல் பாதுகாப்பை மீட்டெடுக்கிறது.",
      "இலக்கு வைக்கப்பட்ட லிப்பிட் சிகிச்சை சுழற்சியில் உள்ள LDL-C செறிவை இயல்பாக்க கல்லீரல் LDL வாங்கிகளை அதிகரிக்கிறது.",
      "ஆரம்பக்கட்ட LDL-C இலக்கு >1.8 mmol/L ஆக இருந்தால் PCSK9 இன்ஹிபிட்டர் கூடுதலான சிகிச்சையைப் பற்றி விவாதிக்கவும்.",
      [
        { icon: "Pill", label: "HMG-CoA ரெடக்டேஸ்", text: "உயர் தீவிர ஸ்டேடின்கள் உள்ளக கல்லீரல் கொலஸ்ட்ரால் உற்பத்தியை அடக்குகின்றன." },
        { icon: "RefreshCw", label: "LDLR வெளிப்பாடு", text: "ஈடுசெய்யும் LDLR அதிகரிப்பு சுழலும் ApoB லிப்போபுரோட்டீன்களை அகற்றுகிறது." },
        { icon: "TrendingDown", label: "பிளேக் பின்வாங்குதல்", text: "தமனி அடைப்பை நிறுத்த இலக்கு LDL-C <1.8 mmol/L ஐ அடைகிறது." }
      ]
    )
  }
};

const ALL_VARIANTS: Record<Language, Record<string, Record<KnowledgeLevelVariant, Record<ConcernVariant, VariantContent>>>> = {
  en: EN_VARIANTS,
  ms: MS_VARIANTS,
  zh: ZH_VARIANTS,
  ta: TA_VARIANTS,
};

// Main Resolver Function matching exact spec: resolveGuideContent
export function resolveGuideContent(options: ResolveGuideOptions): PersonalizedGuide {
  const {
    topicId,
    knowledgeLevel,
    selectedConcerns = [],
    preferredLanguage = 'en'
  } = options;

  const lang: Language = (['en', 'ms', 'zh', 'ta'].includes(preferredLanguage))
    ? preferredLanguage as Language
    : 'en';

  // Normalize ID
  let normId = topicId;
  if (topicId === 'heart-health') normId = 'what-is-fh';
  if (topicId === 'cascade-screening') normId = 'why-testing-matters';
  if (topicId === 'genetic-testing' || topicId === 'testing-process') normId = 'testing-guide';
  if (topicId === 'insurance') normId = 'insurance-rights';
  if (topicId === 'treatment-medication' || topicId === 'healthy-lifestyle') normId = 'medication-fh';

  // Normalize Knowledge Level
  let kLevel: KnowledgeLevelVariant = 'new';
  const klStr = String(knowledgeLevel || '').toLowerCase();
  if (klStr === 'little' || klStr === 'some') {
    kLevel = 'little';
  } else if (klStr === 'research') {
    kLevel = 'research';
  } else if (klStr === 'advanced' || klStr === 'confident') {
    kLevel = 'advanced';
  } else {
    kLevel = 'new';
  }

  // Normalize Concern Variant
  let cVariant: ConcernVariant = 'general';
  if (selectedConcerns.some(c => c.includes('family'))) cVariant = 'family';
  else if (selectedConcerns.some(c => c.includes('cost'))) cVariant = 'cost';
  else if (selectedConcerns.some(c => c.includes('test') || c.includes('diagnosis') || c.includes('results'))) cVariant = 'test';
  else if (selectedConcerns.some(c => c.includes('insurance'))) cVariant = 'insurance';
  else if (selectedConcerns.some(c => c.includes('med'))) cVariant = 'meds';
  else if (selectedConcerns.some(c => c.includes('heart'))) cVariant = 'heart';

  // Resolve dictionary
  const langDict = ALL_VARIANTS[lang] || ALL_VARIANTS['en'];
  const topicDict = langDict[normId] || ALL_VARIANTS['en'][normId] || ALL_VARIANTS['en']['what-is-fh'];
  const levelDict = topicDict[kLevel] || topicDict['new'];
  const variant = levelDict[cVariant] || levelDict['general'] || ALL_VARIANTS['en']['what-is-fh']['new']['general'];

  const metaDict = META_DATA[lang] || META_DATA['en'];
  const meta = metaDict[normId] || metaDict['what-is-fh'];

  return {
    id: topicId,
    title: meta.title,
    shortSummary: meta.shortSummary,
    readingTime: meta.readTime,
    iconName: meta.icon,
    keyTakeaway: variant.keyTakeaway,
    content: variant.intro,
    visualItems: variant.points,
    sourceId: sourceIdMap[normId] || 'approved-fh-basics-01',
    disclaimer: disclaimers[lang] || disclaimers['en'],
    isPersonalized: true,
    
    // Spec required properties
    personalisedIntroduction: variant.intro,
    personalisedKeyPoints: variant.points,
    relevantVisual: variant.points,
    practicalNextStep: variant.practicalNextStep,
    personalisedKeyTakeaway: variant.keyTakeaway,
    optionalLearnMore: meta.shortSummary
  };
}

// Flexible export supporting legacy positional arguments
export function getPersonalizedGuide(
  id: string,
  onboardingFamiliarity: KnowledgeLevelVariant | string,
  onboardingConcerns: string[] = [],
  param4?: any,
  param5?: any
): PersonalizedGuide {
  let language: Language = 'en';
  let questionnaireStatus: string = 'completed';

  if (typeof param4 === 'string') {
    if (['en', 'ms', 'zh', 'ta'].includes(param4)) {
      language = param4 as Language;
      if (typeof param5 === 'string') questionnaireStatus = param5;
    } else {
      questionnaireStatus = param4;
      if (typeof param5 === 'string' && ['en', 'ms', 'zh', 'ta'].includes(param5)) {
        language = param5 as Language;
      }
    }
  }

  const guide = resolveGuideContent({
    topicId: id,
    knowledgeLevel: onboardingFamiliarity,
    selectedConcerns: onboardingConcerns,
    preferredLanguage: language
  });

  if (questionnaireStatus === 'skipped') {
    guide.isPersonalized = false;
  }

  return guide;
}

export const getPersonalisedGuideContent = getPersonalizedGuide;
