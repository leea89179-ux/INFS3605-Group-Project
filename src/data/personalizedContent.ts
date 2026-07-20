import { Language } from './translations';

export interface PersonalizedGuide {
  id: string;
  title: string;
  shortSummary: string;
  readingTime: string;
  iconName: string;
  keyTakeaway: string;
  content: string;
  subsections?: { title: string; text: string }[];
  steps?: { num: number; title: string; description: string }[];
}

export type KnowledgeLevel = 'new' | 'little' | 'research' | 'advanced';
type KnowledgeLevelKey = 'beginner' | 'basic' | 'researched' | 'advanced';
type ConcernKey = 'default' | 'family' | 'geneticTest' | 'cost' | 'insurance' | 'heartHealth' | 'medication' | 'results';

// Base layout and metadata definitions
const TOPICS_META: Record<string, { titleKey: string; icon: string; readTime: string; keyTakeawayKey: string }> = {
  'what-is-fh': { titleKey: 'what_is_fh_title', icon: 'BookOpen', readTime: '3 min read', keyTakeawayKey: 'what_is_fh_takeaway' },
  'heart-health': { titleKey: 'heart_health_title', icon: 'Heart', readTime: '2 min read', keyTakeawayKey: 'heart_health_takeaway' },
  'genetic-testing': { titleKey: 'genetic_testing_title', icon: 'Dna', readTime: '2 min read', keyTakeawayKey: 'genetic_testing_takeaway' },
  'cascade-screening': { titleKey: 'cascade_screening_title', icon: 'Users', readTime: '3 min read', keyTakeawayKey: 'cascade_screening_takeaway' },
  'treatment-medication': { titleKey: 'treatment_title', icon: 'Pill', readTime: '2 min read', keyTakeawayKey: 'treatment_takeaway' },
  'healthy-lifestyle': { titleKey: 'lifestyle_title', icon: 'HeartPulse', readTime: '2 min read', keyTakeawayKey: 'lifestyle_takeaway' },
  'testing-process': { titleKey: 'process_title', icon: 'ClipboardList', readTime: '4 min read', keyTakeawayKey: 'process_takeaway' },
  'costs-subsidies': { titleKey: 'costs_title', icon: 'Coins', readTime: '2.5 min read', keyTakeawayKey: 'costs_takeaway' },
  'insurance': { titleKey: 'insurance_title', icon: 'Shield', readTime: '3 min read', keyTakeawayKey: 'insurance_takeaway' }
};

// Map raw familiarity to level key
const mapFamiliarity = (fam: KnowledgeLevel): KnowledgeLevelKey => {
  if (fam === 'new') return 'beginner';
  if (fam === 'little') return 'basic';
  if (fam === 'research') return 'researched';
  return 'advanced';
};

// Map concerns to primary concern key
const resolvePrimaryConcern = (concerns: string[]): ConcernKey => {
  if (!concerns || concerns.length === 0) return 'default';
  for (const c of concerns) {
    if (c === 'concern-family') return 'family';
    if (c === 'concern-test') return 'geneticTest';
    if (c === 'concern-cost') return 'cost';
    if (c === 'concern-insurance') return 'insurance';
    if (c === 'concern-[#00a859]') return 'heartHealth';
    if (c === 'concern-meds') return 'medication';
    if (c === 'concern-diagnosis') return 'results';
  }
  return 'default';
};

// Dictionary of localized titles/headers
const LOCALIZED_STRINGS: Record<Language, Record<string, string>> = {
  en: {
    what_is_fh_title: 'What is FH?',
    heart_health_title: 'Heart Health & FH',
    genetic_testing_title: 'Genetic Testing',
    cascade_screening_title: 'Cascade Screening',
    treatment_title: 'Treatment & Medication',
    lifestyle_title: 'Healthy Lifestyle',
    process_title: 'Testing Process',
    costs_title: 'Costs & Subsidies',
    insurance_title: 'Insurance Rights',
    what_is_fh_takeaway: 'FH is 100% genetic, present from birth, and highly treatable.',
    heart_health_takeaway: 'Active management keeps plaque from forming and reduces cardiac risk.',
    genetic_testing_takeaway: 'A genetic test is a safe, definitive tool that takes the guesswork out of your care.',
    cascade_screening_takeaway: 'Testing close relatives is a proactive, protective measure for your family.',
    treatment_takeaway: 'Safe, daily medications protect your heart and lower risk back to normal.',
    lifestyle_takeaway: 'A strong lifestyle foundation optimizes how well medical therapies work.',
    process_takeaway: 'The testing journey is simple, comfortable, and fully outpatient.',
    costs_takeaway: 'Generous MOH subsidies and MediSave ensure minimal out-of-pocket cash cost.',
    insurance_takeaway: 'The LIA Moratorium completely protects voluntary test results from underwriters.'
  },
  ms: {
    what_is_fh_title: 'Apakah itu FH?',
    heart_health_title: 'Kesihatan Jantung & FH',
    genetic_testing_title: 'Ujian Genetik',
    cascade_screening_title: 'Saringan Lata',
    treatment_title: 'Rawatan & Ubat-ubatan',
    lifestyle_title: 'Gaya Hidup Sihat',
    process_title: 'Proses Ujian',
    costs_title: 'Kos & Subsidi',
    insurance_title: 'Perlindungan Insurans',
    what_is_fh_takeaway: 'FH adalah 100% genetik, hadir sejak lahir, dan sangat boleh dirawat.',
    heart_health_takeaway: 'Rawatan awal menghalang pembentukan plak kolesterol di arteri.',
    genetic_testing_takeaway: 'Ujian genetik adalah langkah yang selamat dan pasti untuk kesihatan jantung.',
    cascade_screening_takeaway: 'Saringan lata melindungi anak-anak dan ahli keluarga terdekat anda.',
    treatment_takeaway: 'Ubat harian yang selamat mengembalikan risiko sakit jantung ke tahap normal.',
    lifestyle_takeaway: 'Amalan gaya hidup sihat menyokong keberkesanan rawatan ubat-ubatan.',
    process_takeaway: 'Keseluruhan laluan ujian adalah pesakit luar yang ringkas dan mesra.',
    costs_takeaway: 'Subsidi MOH sehingga 75% dan baki MediSave mengurangkan bayaran tunai.',
    insurance_takeaway: 'Moratorium LIA melindungi ujian genetik sukarela daripada syarikat insurans.'
  },
  zh: {
    what_is_fh_title: '什么是 FH？',
    heart_health_title: '心脏健康与 FH',
    genetic_testing_title: '基因检测',
    cascade_screening_title: '家系筛查',
    treatment_title: '治疗与药物',
    lifestyle_title: '健康生活方式',
    process_title: '检测流程',
    costs_title: '费用与补贴',
    insurance_title: '保险权益保障',
    what_is_fh_takeaway: 'FH 完全由基因决定，自出生起就存在，且高度可控。',
    heart_health_takeaway: '积极的管理可以有效防止血管斑块积聚，降低心脏风险。',
    genetic_testing_takeaway: '基因检测是一项安全、确凿的医学工具，能让治疗更精准。',
    cascade_screening_takeaway: '让亲属尽早接受低成本筛查，是对家人最好的关爱。',
    treatment_takeaway: '安全、长期的药物治疗可让您的心血管风险回归普通人水平。',
    lifestyle_takeaway: '健康的生活方式可以显著提高降脂药物的心脏保护功效。',
    process_takeaway: '整个基因检测流程为门诊性质，轻松、高效且饱含关怀。',
    costs_takeaway: '新加坡政府提供高达 75% 的高额补贴，并支持 MediSave 支付。',
    insurance_takeaway: '人寿保险协会 (LIA) 协定确保自愿检测不影响标准承保。'
  },
  ta: {
    what_is_fh_title: 'FH என்றால் என்ன?',
    heart_health_title: 'இதய ஆரோக்கியம் & FH',
    genetic_testing_title: 'மரபணு சோதனை',
    cascade_screening_title: 'குடும்பப் பரிசோதனை',
    treatment_title: 'சிகிச்சை & மருந்துகள்',
    lifestyle_title: 'ஆரோக்கியமான வாழ்க்கை முறை',
    process_title: 'சோதனை செயல்முறை',
    costs_title: 'செலவுகள் & மானியங்கள்',
    insurance_title: 'காப்பீட்டு உரிமைகள்',
    what_is_fh_takeaway: 'FH என்பது 100% மரபணு சார்ந்தது மற்றும் எளிதில் குணப்படுத்தக்கூடியது.',
    heart_health_takeaway: 'செயலில் உள்ள மேலாண்மை இரத்த நாளங்களில் அடைப்பைத் தடுக்கிறது.',
    genetic_testing_takeaway: 'மரபணு சோதனை என்பது உங்கள் இதய ஆரோக்கியத்திற்கான பாதுகாப்பான வழிகாட்டியாகும்.',
    cascade_screening_takeaway: 'குடும்பப் பரிசோதனை உங்கள் நெருங்கிய உறவினர்களை முன்கூட்டியே பாதுகாக்கிறது.',
    treatment_takeaway: 'பாதுகாப்பான தினசரி மருந்துகள் உங்கள் இதய நோய் ஆபத்தைக் குறைக்கின்றன.',
    lifestyle_takeaway: 'ஆரோக்கியமான வாழ்க்கை முறை மருந்துகளின் செயல்திறனை அதிகரிக்கிறது.',
    process_takeaway: 'சோதனை செயல்முறை மிகவும் எளிதானது, வசதியானது மற்றும் வெளிநோயாளியானது.',
    costs_takeaway: 'அரசின் 75% மானியம் மற்றும் MediSave உங்களுக்கு குறைந்த செலவை உறுதி செய்கிறது.',
    insurance_takeaway: 'LIA உடன்படிக்கை உங்களின் மரபணு பரிசோதனை முடிவுகளை பாதுகாக்கிறது.'
  }
};

// Base text mappings for all topics, languages and knowledge levels
const BASE_TEXTS: Record<Language, Record<string, Record<KnowledgeLevelKey, string>>> = {
  en: {
    'what-is-fh': {
      beginner: "Familial Hypercholesterolaemia (FH) is a common genetic condition present from birth that prevents the body from naturally clearing 'bad' LDL cholesterol from the blood. Unlike standard high cholesterol which can come from diet or lifestyle, FH cholesterol is elevated from day one. Armed with a simple genetic diagnosis, your care team can help you lower your risk back to a completely normal level.",
      basic: "FH is an inherited lipid disorder that causes LDL cholesterol to build up in the bloodstream from birth. Standard lifestyle changes alone cannot lower these genetically driven levels. Fortunately, modern clinical screening and early diagnosis allow us to manage your cholesterol levels perfectly and protect your heart.",
      researched: "Familial Hypercholesterolaemia (FH) is a high-prevalence autosomal dominant disorder. It is primarily caused by loss-of-function mutations in the LDL receptor (LDLR) gene, or mutations in APOB and PCSK9. This leads to impaired hepatic clearance of LDL-C, resulting in lifelong exposure to elevated circulating lipid levels and accelerated plaque formation.",
      advanced: "For individuals with advanced FH knowledge: FH is characterized by severely elevated LDL-C and premature cardiovascular risk. Because it is genetic, pharmacological intervention is the primary driver of risk reduction. Early detection through molecular genetic testing ensures we can bypass standard diagnostic criteria with 100% certainty."
    },
    'heart-health': {
      beginner: "Inherited high cholesterol means that 'bad' LDL cholesterol can build up silently inside your blood vessels over time. This build-up, called arterial plaque, can narrow your arteries. Identifying FH early and starting treatment prevents this plaque from forming, keeping your heart and blood vessels strong and healthy.",
      basic: "Because FH starts at birth, blood vessels are exposed to high cholesterol levels for a longer duration. This exposure can accelerate the narrowing of arteries. However, early detection and treatment completely interrupt this process, ensuring your heart remains fully protected.",
      researched: "Elevated serum LDL-C in FH patients drives accelerated atherogenesis. Lifelong exposure to high circulating lipid levels leads to subendothelial accumulation of ApoB-containing lipoproteins, triggering macrophage activation and premature coronary artery disease if left unmanaged.",
      advanced: "Cardiovascular risk in FH is directly proportional to lifetime cumulative LDL-C exposure (often called 'LDL-cholesterol years'). Early pharmacological intervention drastically reduces this burden, resetting the patient's cardiovascular risk curve back to that of the general population."
    },
    'genetic-testing': {
      beginner: "Genetic testing is a safe, simple blood draw that looks at your DNA. While standard cholesterol tests only measure lipid levels in your blood, a genetic test identifies the specific gene variation responsible. It takes 4 to 6 weeks for results, which helps your care team personalize your protection plan.",
      basic: "A genetic test is the definitive way to confirm FH. It analyzes your DNA for variations in the LDLR, APOB, or PCSK9 genes. Confirming the genetic basis of your high cholesterol helps your specialist select the exact right care plan for your heart.",
      researched: "Clinical genetic testing utilizes Next-Generation Sequencing (NGS) to examine the primary genes linked to FH (LDLR, APOB, and PCSK9). This test provides molecular confirmation, resolving diagnostic ambiguity and identifying the specific pathogenic variant needed to initiate cascade screening.",
      advanced: "Molecular genetic testing represents the diagnostic benchmark for FH. By mapping the exact causative mutation, clinicians can stratify your cardiovascular risk with high precision and design targeted lipid-lowering therapies that maximize liver LDL receptor upregulation."
    },
    'cascade-screening': {
      beginner: "Cascade screening is a helpful family-based program. If you are diagnosed with FH, your parents, siblings, and children have a 50% chance of sharing the same gene variation. Reaching out to them early allows them to get a simple, heavily subsidized test to protect their hearts.",
      basic: "Because FH is inherited, first-degree relatives have a 50% chance of also having it. Cascade screening helps find affected family members early, so they can access effective preventive care before any silent plaque builds up in their arteries.",
      researched: "Cascade screening leverages contact tracing based on an index case. Once a pathogenic variant is identified, cascade testing of first-degree relatives (parents, siblings, offspring) is initiated. This family-based screening model is globally recognized as highly cost-effective for identifying individuals with silent, high-risk lipid profiles.",
      advanced: "Cascade screening utilizes genetic contact tracing. Because FH is an autosomal dominant condition, first-degree relatives have a 50% prior probability of inheritance. Our clinic provides direct support, supportive referral letters, and heavily subsidized screening rates to help you guide your family members through testing smoothly and without blame."
    },
    'treatment-medication': {
      beginner: "Because FH is genetic, diet and exercise alone are not enough to bring your cholesterol to safe levels. Daily medications like statins are highly safe, thoroughly studied, and play a critical role. They help your liver clear 'bad' cholesterol out of your blood, returning your heart health risk to normal.",
      basic: "Standard lipid-lowering therapies (like statins) act by helping the liver clear LDL cholesterol. Combined with a heart-healthy diet, these highly subsidized medications are excellent at managing FH and are designed to be taken long-term with great safety.",
      researched: "Pharmacotherapy for FH aims to maximize hepatic LDL receptor expression. High-potency statins act as HMG-CoA reductase inhibitors, reducing intracellular cholesterol synthesis. Combination therapy with Ezetimibe or PCSK9 inhibitors is frequently employed to meet target LDL-C guidelines.",
      advanced: "Aggressive lipid lowering is mandatory in FH. First-line therapy consists of high-intensity statins to achieve a minimum 50% reduction in LDL-C. In patients who fail to reach targets, add-on therapies including Ezetimibe and PCSK9 monoclonal antibodies are indicated and highly effective."
    },
    'healthy-lifestyle': {
      beginner: "A heart-healthy lifestyle is a vital foundation for managing FH. Focus on eating high-fiber foods (like oats, vegetables, and beans) and limiting saturated fats (found in fatty meats, coconut milk, and butter). Regular physical activity, such as 30 minutes of brisk walking, supports your heart muscles.",
      basic: "While lifestyle changes cannot cure FH because it is genetic, they optimize the effectiveness of your medical therapies. Incorporating soluble fibers and engaging in moderate aerobic exercises are key habits to support your blood circulation and overall vitality.",
      researched: "Lifestyle modification serves as an obligatory adjunct to pharmacotherapy. A low-saturated-fat, high-soluble-fiber diet reduces exogenous cholesterol absorption and enhances bile acid excretion, while aerobic exercise optimizes endothelial nitric oxide synthase (eNOS) activity.",
      advanced: "Saturated fat intake directly downregulates hepatic LDL receptor activity, exacerbating the genetic defect in FH. Therefore, a diet restricting saturated fats is essential to maximize the efficiency of receptor-targeted therapies."
    },
    'testing-process': {
      beginner: "Your genetic testing journey is fully outpatient and designed to fit easily into your normal schedule. It consists of three simple, clear steps: a friendly pre-test counselling chat, a standard 10-minute blood draw, and a follow-up results consultation.",
      basic: "The pathway involves counseling to map your family history, a simple blood test at the clinic, and a post-test results session 4 to 6 weeks later. It is highly streamlined to ensure a supportive experience.",
      researched: "The clinical testing pathway comprises pre-test genetic counseling to evaluate familial risk, obtain informed consent, and document a 3-generation pedigree. This is followed by genomic sample collection (saliva or peripheral blood) and laboratory NGS analysis.",
      advanced: "The diagnostic cascade starts with index patient consent, followed by targeted genotyping. Once a pathogenic variant is discovered, the clinical pathway facilitates automated referral generation to support familial contact tracing and cascade screening."
    },
    'costs-subsidies': {
      beginner: "Healthcare in Singapore is highly affordable. Genetic counselling and testing for FH are heavily subsidized by the Ministry of Health (MOH). Eligible Singapore Citizens receive up to 75% subsidies based on means-testing, and the rest can be paid using MediSave, keeping your cash out-of-pocket very low.",
      basic: "MOH clinical subsidies cover between 50% and 75% of genetic testing costs for eligible citizens. Crucially, the remaining co-payment is fully claimable under the Chronic Disease Management Scheme (CDMS) using MediSave, meaning no heavy cash burden.",
      researched: "FH genetic testing and counselling qualify for MOH clinical subventions. Singapore Citizens receive standard subsidy tiers (50% to 75%). The remaining balance is a MediSave-approved expense under the MediSave500/700 Chronic Disease Management Scheme (CDMS).",
      advanced: "The financial framework for FH diagnostics is optimized via MOH subventions. Out-of-pocket expenses are capped and co-paid via MediSave. For lower-income patients, additional safety nets including CHAS Blue/Orange benefits and Medifund ensure absolute financial accessibility."
    },
    'insurance': {
      beginner: "Singapore has very strict guidelines to protect you. The Ministry of Health and the Life Insurance Association (LIA) have established a rules-based moratorium. Insurers are strictly forbidden from asking you to take a genetic test, and they cannot use voluntary test results to deny you standard health or life insurance.",
      basic: "A national agreement (the LIA Moratorium on Genetic Testing) protects patients. It ensures that voluntary clinical genetic tests cannot be used by insurance companies to deny coverage or adjust premiums for standard policies, safeguarding your right to proactively manage your health.",
      researched: "The Singapore LIA Moratorium on Genetic Testing prevents risk-rating or coverage denial based on predictive clinical genetic tests. Underwriting for standard life and health policies under established financial caps (e.g. S$500,000 for life cover) remains unaffected by voluntary test results.",
      advanced: "The Life Insurance Association (LIA) Moratorium on Genetic Testing establishes a robust consumer safeguard. Insurers cannot require genetic testing for underwriting, nor can they request predictive genetic results for standard life, health, or critical illness insurance within specified high-value limits."
    }
  },
  ms: {},
  zh: {},
  ta: {}
};

// Define complete translations for non-English languages to keep them highly polished
BASE_TEXTS.ms = {
  'what-is-fh': {
    beginner: "Familial Hypercholesterolaemia (FH) adalah keadaan keturunan/genetik sejak lahir yang menghalang badan daripada membersihkan kolesterol LDL 'buruk' daripada darah. Berbeza dengan kolesterol tinggi biasa yang disebabkan oleh diet atau gaya hidup, kolesterol FH adalah tinggi sejak hari pertama. Dengan diagnosis genetik awal, doktor anda boleh membantu mengurangkan risiko kesihatan jantung anda ke tahap normal.",
    basic: "FH adalah gangguan lipid diwarisi yang menyebabkan kolesterol LDL terkumpul dalam aliran darah sejak lahir. Perubahan gaya hidup sahaja tidak dapat menurunkan tahap kolesterol genetik ini. Mujurlah, saringan klinikal moden membolehkan kami melindungi jantung anda dengan sempurna.",
    researched: "Familial Hypercholesterolaemia (FH) adalah gangguan genetik dominan autosomal yang disebabkan oleh mutasi pada gen LDLR, APOB, atau PCSK9. Ini menjejaskan fungsi penyingkiran LDL oleh hati, yang membawa kepada pendedahan kolesterol yang tinggi sepanjang hayat.",
    advanced: "Bagi individu dengan pengetahuan FH mendalam: FH dicirikan oleh LDL-C yang sangat tinggi dan risiko kardiovaskular pramatang. Oleh sebab ia berciri genetik, intervensi farmakologi awal adalah kunci utama bagi mengurangkan risiko plak arteri."
  },
  'heart-health': {
    beginner: "Kolesterol tinggi keturunan bermakna kolesterol LDL boleh terkumpul secara senyap di dalam saluran darah anda sejak lahir. Pengumpulan ini, yang dipanggil plak, boleh menyempitkan saluran darah. Mengesan FH awal dan memulakan rawatan menghalang pembentukan plak ini, memastikan jantung anda kekal kuat.",
    basic: "Oleh kerana FH bermula sejak lahir, saluran darah terdedah kepada tahap kolesterol tinggi untuk tempoh yang lama, yang boleh mempercepatkan penyempitan arteri. Walau bagaimanapun, rawatan awal dapat menghentikan proses ini sepenuhnya untuk melindungi jantung anda.",
    researched: "Tahap serum LDL-C yang tinggi dalam pesakit FH memacu pembentukan plak aterosklerosis yang cepat. Pengumpulan lipoprotein dalam dinding arteri membawa kepada risiko penyakit kardiovaskular pramatang jika tidak diuruskan secara agresif.",
    advanced: "Risiko kardiovaskular dalam FH adalah berkadar terus dengan pendedahan kolesterol LDL terkumpul sepanjang hayat. Intervensi awal mengurangkan beban ini, menetapkan semula lengkung risiko kardiovaskular pesakit ke tahap normal."
  },
  'genetic-testing': {
    beginner: "Ujian genetik adalah ujian darah mudah yang selamat untuk memeriksa DNA anda. Walaupun ujian kolesterol biasa hanya mengukur tahap lipid, ujian genetik mengenal pasti varian gen khusus yang bertanggungjawab. Keputusan mengambil masa 4 hingga 6 minggu.",
    basic: "Ujian genetik adalah cara terbaik untuk mengesahkan FH. Ia menganalisis DNA anda untuk mengesan variasi pada gen LDLR, APOB, atau PCSK9. Pengesahan genetik ini membantu pakar merancang terapi pencegahan yang tepat untuk jantung anda.",
    researched: "Ujian genetik klinikal menggunakan teknologi Penjenisan Generasi Seterusnya (NGS) untuk menganalisis gen utama FH (LDLR, APOB, PCSK9). Ini memberikan pengesahan molekul yang jelas, menyingkirkan sebarang keraguan diagnostik klinikal.",
    advanced: "Analisis genetik molekul adalah standard diagnostik utama bagi FH. Dengan memetakan mutasi khusus, pakar klinikal boleh menganggarkan risiko kardiovaskular dengan ketepatan tinggi serta menetapkan terapi pengurangan lipid yang optimum."
  },
  'cascade-screening': {
    beginner: "Saringan lata adalah program saringan keluarga yang sangat membantu. Jika anda didiagnosis dengan FH, ibu bapa, adik-beradik, dan anak-anak anda mempunyai peluang 50% untuk berkongsi genetik yang sama. Menjalankan ujian awal membolehkan mereka mendapat saringan yang sangat disubsidi untuk melindungi jantung mereka.",
    basic: "Oleh kerana FH diwarisi, saudara darjah pertama mempunyai kebarangkalian 50% untuk turut menghidapinya. Saringan lata membantu mengesan ahli keluarga yang terjejas lebih awal untuk akses kepada rawatan pencegahan sebelum plak terbentuk.",
    researched: "Saringan lata (cascade screening) menggunakan pengesanan kontak berasaskan kes indeks. Sebaik sahaja varian patogenik dikenal pasti, saringan keluarga dimulakan, yang terbukti sangat kos-efektif di seluruh dunia.",
    advanced: "Saringan lata menggunakan penjejakan kontak genetik. Memandangkan ia diwarisi secara dominan autosomal, waris terdekat mempunyai risiko 50%. Klinik kami menyediakan surat rujukan dan subsidi penuh bagi membantu proses saringan keluarga berjalan lancar."
  },
  'treatment-medication': {
    beginner: "Oleh sebab FH adalah genetik, diet dan senaman sahaja tidak mencukupi untuk menurunkan kolesterol. Ubat harian seperti statin adalah sangat selamat, dikaji secara meluas, dan memainkan peranan penting untuk membantu hati anda membersihkan kolesterol buruk dari darah.",
    basic: "Terapi pengurangan lipid standard bertindak membantu hati menyingkirkan LDL. Digabungkan dengan pemakanan sihat, ubat-ubatan disubsidi tinggi ini sangat selamat diambil untuk jangka panjang.",
    researched: "Farmakoterapi bertujuan meningkatkan ekspresi reseptor LDL hepatik. Statin berpotensi tinggi (Atorvastatin, Rosuvastatin) bertindak mengurangkan sintesis kolesterol, dan boleh digabungkan dengan Ezetimibe atau perencat PCSK9.",
    advanced: "Pengurangan lipid secara agresif adalah wajib bagi FH. Terapi barisan hadapan menggunakan statin berintensiti tinggi untuk pengurangan LDL minimum 50%. Terapi tambahan seperti Ezetimibe dan antibodi monoklonal PCSK9 amat berkesan bagi pesakit yang memerlukan rawatan lanjut."
  },
  'healthy-lifestyle': {
    beginner: "Gaya hidup sihat adalah asas penting dalam menguruskan FH. Fokus pada makanan tinggi serat (seperti oat dan sayur-sayuran) dan hadkan lemak tepu (seperti daging berlemak dan mentega). Senaman ringan seperti jalan laju 30 minit sangat membantu.",
    basic: "Walaupun gaya hidup sihat tidak dapat menyembuhkan FH kerana faktor genetik, ia mengoptimumkan keberkesanan rawatan ubat-ubatan anda bagi menyokong kesihatan jantung.",
    researched: "Gaya hidup sihat menyokong farmakoterapi secara wajib. Diet rendah lemak tepu mengurangkan penyerapan kolesterol, manakala senaman aerobik membantu mengoptimumkan fungsi endothelial darah anda.",
    advanced: "Pengambilan lemak tepu menjejaskan fungsi reseptor LDL hati. Oleh itu, kawalan ketat lemak tepu adalah penting bagi membolehkan terapi ubat-ubatan bertindak dengan prestasi maksimum."
  },
  'testing-process': {
    beginner: "Perjalanan ujian genetik anda adalah pesakit luar sepenuhnya dan disesuaikan mengikut jadual anda. Ia melibatkan tiga langkah mudah: kaunseling mesra 30 minit, ujian darah mudah 10 minit, dan sesi susulan untuk keputusan ubat.",
    basic: "Laluan ini melibatkan kaunseling untuk sejarah keluarga, ujian darah mudah di klinik, dan sesi keputusan susulan 4 hingga 6 minggu kemudian. Ia sangat teratur untuk sokongan terbaik.",
    researched: "Laluan klinikal terdiri daripada kaunseling genetik pra-ujian untuk menilai risiko keluarga, mendapatkan persetujuan, diikuti ujian darah molekul dan analisis NGS makmal.",
    advanced: "Proses diagnostik bermula daripada persetujuan pesakit indeks, diikuti dengan penjenisan sasaran. Sebaik sahaja varian patogenik ditemui, rujukan automatik dijana bagi menyokong saringan lata keluarga."
  },
  'costs-subsidies': {
    beginner: "Penjagaan kesihatan di Singapura kekal mampu milik. Ujian genetik klinikal untuk FH disubsidi oleh Kementerian Kesihatan (MOH). Rakyat Singapura yang layak menerima subsidi sehingga 75% berdasarkan ujian kelayakan, dan baki kos boleh dibayar menggunakan MediSave.",
    basic: "Subsidi klinikal MOH meliputi antara 50% hingga 75% kos ujian genetik bagi warganegara yang layak. Baki pembayaran boleh dituntut sepenuhnya menggunakan MediSave di bawah CDMS.",
    researched: "Ujian genetik FH melayakkan pesakit mendapat subsidi klinikal MOH antara 50% hingga 75%. Baki pembayaran boleh dituntut menggunakan akaun MediSave di bawah skim penyakit kronik CDMS.",
    advanced: "Rangka kerja kewangan dioptimumkan melalui subsidi MOH dan MediSave. Bagi pesakit berpendapatan rendah, bantuan tambahan CHAS Blue dan Medifund menjamin akses kewangan penuh."
  },
  'insurance': {
    beginner: "Singapura mempunyai garis panduan yang sangat ketat untuk melindungi anda. Kementerian Kesihatan dan Persatuan Insurans Hayat (LIA) menetapkan moratorium yang melarang syarikat insurans daripada meminta anda menjalani ujian genetik atau menggunakan keputusan ujian sukarela untuk menolak permohonan insurans standard.",
    basic: "Perjanjian moratorium LIA memastikan ujian genetik sukarela tidak boleh digunakan oleh syarikat insurans untuk menolak perlindungan atau menaikkan premium polisi hayat/kesihatan standard.",
    researched: "Moratorium LIA Singapura melindungi pengguna daripada sebarang diskriminasi insurans standard berdasarkan ujian genetik sukarela, mengekalkan kelayakan perlindungan standard.",
    advanced: "Moratorium LIA mewujudkan perlindungan pengguna yang kukuh. Syarikat insurans dilarang meminta keputusan ujian genetik bagi insurans standard di bawah had perlindungan tertentu."
  }
};

BASE_TEXTS.zh = {
  'what-is-fh': {
    beginner: "家族性高胆固醇血症 (FH) 是一种常见的先天性遗传疾病，它会阻碍身体自然清除血液中的“坏”LDL 胆固醇。与因饮食或生活方式引起的普通高胆固醇不同，FH 患者的胆固醇水平自出生起就极高。通过简单的基因诊断，您的医疗团队可以帮助您将心脏病风险降至完全正常的水平。",
    basic: "FH 是一种遗传性脂质代谢紊乱，导致低密度脂蛋白胆固醇自出生起就在血液中累积。单纯的生活方式改变通常无法有效降低这种受基因控制的胆固醇，需要专业的医学干预。",
    researched: "家族性高胆固醇血症 (FH) 是一种常染色体显性遗传病。常见原因包括低密度脂蛋白受体 (LDLR) 基因、APOB 或 PCSK9 基因突变，导致肝脏清除 LDL-C 的功能受损，导致血管内皮下斑块加速积聚。",
    advanced: "对于具备先进 FH 知识的个体：FH 的病理特征是由于 LDL 受体介导的清除途径缺陷，导致极高的 LDL-C 水平。分子基因检测是诊断的金标准，能排除临床评分系统的不确定性，提供 100% 确诊率。"
  },
  'heart-health': {
    beginner: "遗传性高胆固醇意味着“坏”LDL 胆固醇自出生起就会在血管壁上默默积聚。这种积聚被称为动脉粥样硬化斑块，随着时间推移会使血管变窄。及早诊断并启动治疗，能从根本上阻止斑块形成，保持您的血管和心脏年轻、强壮。",
    basic: "由于 FH 从出生就开始，血管壁暴露在高胆固醇环境下的时间更长，容易加速动脉狭窄。然而，早期发现并积极干预可以完全阻断这一病理过程，确保心脏健康。",
    researched: "FH 患者血清中高密度的 LDL-C 会加速动脉粥样硬化病程。如果不进行药物干预，脂质会在血管内皮下间隙累积，引发巨噬细胞活化并诱发早期冠心病。",
    advanced: "FH 的心血管风险与一生中累积的 LDL 胆固醇负荷（即“胆固醇年”）呈正相关。尽早启动强效药物治疗可明显降低这一负荷，将患者的心血管风险重置到普通人水平。"
  },
  'genetic-testing': {
    beginner: "基因检测是一项安全、简单的抽血检查，用于分析您的 DNA。与只测血脂的普通胆固醇检测不同，基因检测能直接找到导致高血脂的具体基因变异。结果通常需要 4 到 6 周时间。",
    basic: "基因检测是确诊 FH 的决定性方法。检测会分析您 DNA 中与 LDLR、APOB 或 PCSK9 相关的基因变异。确定病因有助于医生为您量身定制最有效的心脏保护方案。",
    researched: "临床基因检测主要采用二代测序 (NGS) 技术，对候选致病基因（LDLR、APOB 和 PCSK9）进行全面排查，提供分子诊断证据，并指导家系级联筛查的开展。",
    advanced: "分子遗传学诊断代表了 FH 诊断的行业基准。通过精确测序定位突变位点，临床医生可以精准评估患者的心血管风险，并制定能最大限度上调肝脏 LDL 受体的个性化降脂方案。"
  },
  'cascade-screening': {
    beginner: "家系筛查是一项充满关怀的家庭健康计划。如果您被确诊患有 FH，您的父母、兄弟姐妹和子女将有 50% 的概率也携带相同的基因变异。让他们尽早接受简单且享有高额补贴的筛查，是保护他们心脏健康、体现关爱且完全不含责备的重要一步。",
    basic: "由于 FH 呈家族遗传性质，患者的一级亲属有 50% 的概率患病。级联筛查可帮助尽早发现处于潜在心血管风险中的家庭成员，从而让他们能及时获取有效的预防性药物治疗。",
    researched: "家系级联筛查以确诊指示病例（Index Case）为起点，针对其直系亲属展开针对性的遗传变异检测。此筛查模式在国际上被公认为是控制高危脂质风险最经济且行之有效的方案。",
    advanced: "家系筛查采用分子接触者追踪方法。鉴于 FH 常染色体显性遗传的特征，一级亲属的先验概率为 50%。我们门诊将提供全面的咨询支持与介绍信函，帮助患者在温馨、毫无责备的前提下指导亲友受检。"
  },
  'treatment-medication': {
    beginner: "由于 FH 属于基因遗传，仅靠饮食和运动是不够的。每日服用他汀类等降脂药物至关重要。这些药物高度安全、经过全球广泛研究，能强力协助您的肝脏清除血液中的坏胆固醇，使您的健康风险恢复正常。",
    basic: "标准降脂治疗（如他汀类药物）的核心在于协助肝脏清除低密度脂蛋白。在健康饮食的辅佐下，这些享有高额政府补贴的药物适合长期服用且具有极高的安全性。",
    researched: "FH 药理学治疗旨在最大化上调肝细胞表面 LDL 受体。高强度他汀类药物抑制 HMG-CoA 还原酶从而减少内源性胆固醇合成。通常需要联合依折麦贝或 PCSK9 抑制剂共同达标。",
    advanced: "在 FH 临床管理中，必须采取进取的降脂策略。一线方案为高强度他汀治疗，目标使 LDL-C 至少降低 50%。对于未达标患者，联用依折麦贝和 PCSK9 单克隆抗体（如阿利西尤单抗等）具有极高的临床疗效。"
  },
  'healthy-lifestyle': {
    beginner: "健康的生活方式是管理 FH 的坚实基石。建议多摄入高纤维食物（如燕麦、蔬菜和豆类），严格限制饱和脂肪（如肥肉、椰浆和黄油）。每天进行 30 分钟的快走等有氧运动，能显著改善您的心肺耐力。",
    basic: "虽然生活方式调整本身由于遗传缺陷无法根治 FH，但它们能极大地配合并优化药物治疗的降脂效果，共同维护血管健康。",
    researched: "生活方式干预是降脂药物治疗不可或缺的辅助手段。低饱和脂肪、高可溶性纤维膳食可有效减少外源性胆固醇摄入；有氧运动则可促进血管内皮功能改善。",
    advanced: "饱和脂肪的摄入会直接导致肝脏低密度脂蛋白受体数量下调，从而加重 FH 患者的基因缺陷。因此限制膳食饱和脂肪是确保受体靶向药物（如他汀类）发挥最大疗效的核心。"
  },
  'testing-process': {
    beginner: "您的基因检测完全是门诊流程，可轻松融入您的日常日程中。它仅包含三个简单、清晰的步骤：30 分钟的检测前咨询、10 分钟的普通抽血，以及 4-6 周后的医生面谈与结果报告解读。",
    basic: "该流程包括绘制家族树的遗传咨询、诊所快速抽血以及 4 到 6 周后的报告面谈。过程非常高效，能给您提供全方位的支持与关怀。",
    researched: "基因检测流程包括：检测前进行详细的遗传咨询、签署知情同意书并绘制三代家系谱；随后进行唾液或外周血采集，并送至实验室进行 NGS 检测。",
    advanced: "诊断路径由指数病例发起并签署知情同意。一旦检出致病变异，系统将自动生成家族联系信函，协助启动患者直系亲属的靶向筛查计划。"
  },
  'costs-subsidies': {
    beginner: "在新加坡，FH 的基因咨询与检测享有卫生部 (MOH) 的高额补贴。符合条件的新加坡公民可根据家境情况获得高达 75% 的补贴，其余费用可直接使用 MediSave 支付，使您的自付现金降到极低水平。",
    basic: "针对合格公民，新加坡政府卫生部提供 50% 至 75% 的门诊诊费与检测补贴。剩下的个人共付额可全额使用 MediSave 账户在 CDMS 慢性病机制下进行抵扣。",
    researched: "新加坡公民的 FH 基因检测项目完全纳入卫生部临床财政补贴保障。自付余额属于 MediSave 批准的医疗开销，可在 CDMS（限额500/700新币）中报销。",
    advanced: "FH 诊断财务框架通过卫生部补贴与公积金 MediSave 联合支持，基本消除了财务障碍。对低收入群体，CHAS 蓝卡和 Medifund 可确保提供完全零自付兜底。"
  },
  'insurance': {
    beginner: "新加坡有非常严格的行业协定来保障您的权益。卫生部和人寿保险协会 (LIA) 签署了基因检测 moratorium 协定。保险公司严禁要求您接受基因检测，也不能使用您的自愿临床检测结果来拒保标准医疗或人寿保险。",
    basic: "新加坡消费者受 LIA 协定的强力保障。任何自愿在临床进行的基因检测结果，均不能被保险公司作为调整标准政策保费或直接拒保的依据，保障您的防病权益。",
    researched: "新加坡 LIA 基因检测 Moratorium 限制了保险公司在进行常规核保时向消费者索要自愿基因预测检测报告的权力，确保公众敢于进行预防性基因测试。",
    advanced: "LIA 协定针对基因测试建立了坚实的防火墙。对于标准额度以内（例如人寿保障50万新币以内）的保单核保，保险公司无权查阅自愿预测性测试报告，从制度上避免了遗传歧视。"
  }
};

BASE_TEXTS.ta = {
  'what-is-fh': {
    beginner: "குடும்பப் பரம்பரை கொலஸ்ட்ரால் (FH) என்பது பிறப்பிலிருந்தே உடலில் கெட்ட LDL கொழுப்பை அகற்றுவதைத் தடுக்கும் ஒரு பொதுவான மரபணு நிலையாகும். உணவு அல்லது வாழ்க்கை முறையால் ஏற்படும் சாதாரண கொழுப்பை விட இது முற்றிலும் வேறுபட்டது. எளிய பரிசோதனை மூலம் உங்கள் மருத்துவர்கள் ஆபத்தைக் கணிசமாகக் குறைக்க உதவ முடியும்.",
    basic: "FH என்பது உடலின் கெட்ட கொழுப்பை அகற்றும் திறனைக் குறைக்கும் ஒரு பரம்பரை நிலையாகும். உணவுக்கட்டுப்பாடு மட்டுமே இதற்குப் போதாது, முறையான மருத்துவ ஆலோசனை மிகவும் அவசியமாகும்.",
    researched: "FH என்பது மரபணுக்கள் மூலம் உடலிலுள்ள கல்லீரல் ஏற்பிகள் சேதமடைவதால் ஏற்படும் நிலை. இது உடலில் இரத்த நாளங்களில் அடைப்பை அதிகப்படுத்துகிறது.",
    advanced: "மரபணு ரீதியாக கெட்ட கொழுப்பை அகற்றும் திறன் குறைவதால் FH ஏற்படுகிறது. இதனை ஆரம்பத்திலேயே கண்டறிவது சிகிச்சையை மிக எளிதாக்கும்."
  },
  'heart-health': {
    beginner: "உடலில் பிறப்பிலிருந்தே கெட்ட கொழுப்பு அடைப்புகளை ஏற்படுத்துவதால், இரத்த நாளங்கள் குறுகலாம். ஆரம்ப நிலையிலேயே கண்டறிந்து சிகிச்சை பெறுவது இரத்த நாளங்களைச் சுத்தமாகவும் இதயத்தைப் பாதுகாப்பாகவும் வைத்திருக்க உதவும்.",
    basic: "இரத்த நாளங்கள் நீண்ட காலமாக அதிக கொழுப்பிற்கு ஆளாவதால் ஆபத்து அதிகரிக்கலாம். ஆனால், முன்கூட்டியே கண்டறிந்தால் இதயத்தை முழுமையாகப் பாதுகாக்க முடியும்.",
    researched: "உடலில் உள்ள இரத்த நாளங்களில் கெட்ட கொழுப்பு தொடர்ந்து படிவதால் இதய அடைப்பு ஏற்படலாம். எனவே, ஆரம்பத்திலேயே தீவிர சிகிச்சை பெறுவது மிகவும் முக்கியம்.",
    advanced: "இதய பாதிப்பு கொலஸ்ட்ரால் வெளிப்படும் காலத்தைப் பொறுத்தது. ஆரம்பகால மருத்துவத் தலையீடு இதய ஆரோக்கியத்தை மீண்டும் இயல்பு நிலைக்குக் கொண்டு வரும்."
  },
  'genetic-testing': {
    beginner: "மரபணு சோதனை என்பது உங்கள் இரத்தத்தில் உள்ள குறிப்பிட்ட மரபணு மாறுபாடுகளைக் கண்டறியும் எளிய மற்றும் பாதுகாப்பான இரத்தப் பரிசோதனை ஆகும். இதன் முடிவுகள் வர 4 முதல் 6 வாரங்கள் ஆகும்.",
    basic: "உங்கள் கொழுப்பின் மரபணு காரணத்தை அறிய இந்த சோதனை உதவுகிறது. LDLR, APOB, அல்லது PCSK9 மரபணுக்களை ஆராய்ந்து மிகத் துல்லியமான சிகிச்சையை மருத்துவர்கள் வழங்குவர்.",
    researched: "NGS தொழில்நுட்பம் மூலம் மரபணு சோதனைகள் செய்யப்படுகின்றன. இது துல்லியமான மூலக்கூறு உறுதிப்படுத்தலை வழங்கி சிகிச்சையை மேம்படுத்துகிறது.",
    advanced: "மூலக்கூறு மரபணு பரிசோதனை மூலம் இதய ஆபத்து மற்றும் சிகிச்சையை மிகவும் துல்லியமாகத் திட்டமிட முடியும்."
  },
  'cascade-screening': {
    beginner: "குடும்பப் பரிசோதனை (Cascade Screening) என்பது ஒரு முக்கியமான குடும்பத் திட்டமாகும். உங்களுக்கு FH இருப்பது உறுதி செய்யப்பட்டால், உங்கள் பெற்றோர், உடன்பிறந்தோர் மற்றும் குழந்தைகளுக்கு 50% வாய்ப்பு உள்ளது. அவர்களை முன்கூட்டியே பரிசோதிப்பது அவர்கள் இதயத்தைப் பாதுகாக்கும்.",
    basic: "இதய பாதிப்புகள் எதுவும் ஏற்படும் முன்னரே நெருங்கிய உறவினர்களைக் கண்டறிந்து சிகிச்சையளிக்க குடும்பப் பரிசோதனை பெரிதும் உதவுகிறது.",
    researched: "குடும்பப் பரிசோதனை மூலம் குடும்ப உறுப்பினர்களுக்கு எளிமையான முறையில் பரிசோதனைகள் செய்யப்பட்டு, இதய அடைப்பு வரும் முன்னரே தடுத்து நிறுத்தப்படும்.",
    advanced: "குடும்ப உறுப்பினர்களின் பாதுகாப்புக்காக, மரபணு மாறுபாடுகளின் அடிப்படையில் இலக்கு வைக்கப்பட்ட சோதனைகள் மிகவும் பயனுள்ளதாக அமைகின்றன."
  },
  'treatment-medication': {
    beginner: "ஏனெனில் FH என்பது மரபணு சார்ந்தது, உணவு மற்றும் உடற்பயிற்சி மட்டுமே இதைக் குறைக்கப் போதாது. ஸ்டாடின் போன்ற பாதுகாப்பான தினசரி மருந்துகள் உங்கள் இதயத்தைப் பாதுகாக்க மிகவும் முக்கியமாகும்.",
    basic: "ஸ்டாடின் போன்ற மருந்துகள் பாதுகாப்பானவை மற்றும் நீண்ட கால பயன்பாட்டிற்கு மிகவும் ஏற்றவை. இவை உடலில் கொழுப்பு வெளியேற்றத்தை அதிகரிக்கின்றன.",
    researched: "உடலில் கொழுப்பு வெளியேற்றத்தை மேம்படுத்தும் நோக்கில் ஸ்டாடின் மருந்துகள் மற்றும் பிற கூடுதல் மருந்துகள் மருத்துவர்களால் பரிந்துரைக்கப்படுகின்றன.",
    advanced: "அதிதீவிர ஸ்டாடின் மருந்துகள் மற்றும் PCSK9 தடுப்பான்கள் மூலம் உடலின் கொழுப்பை 50% க்கும் மேலாகக் குறைக்க முடியும்."
  },
  'healthy-lifestyle': {
    beginner: "ஆரோக்கியமான வாழ்க்கை முறை FH நிர்வாகத்திற்கு மிகவும் முக்கியமானது. நார்ச்சத்துக்கள் நிறைந்த உணவுகளை உட்செலுத்துங்கள் மற்றும் கொழுப்பு உணவுகளைத் தவிருங்கள். தினசரி 30 நிமிட உடற்பயிற்சி இதயத்தை மேம்படுத்தும்.",
    basic: "உணவுக் கட்டுப்பாடு மட்டுமே FH-ஐக் குணப்படுத்த முடியாது என்றாலும், அது மருந்துகளின் செயல் திறனை அதிகரிக்க பெரிதும் உதவும்.",
    researched: "ஆரோக்கியமான உணவுகள் மற்றும் உடற்பயிற்சி இதய செயல்பாட்டை அதிகரித்து இரத்த ஓட்டத்தை மேம்படுத்த இன்றியமையாதவை.",
    advanced: "கொழுப்பு உணவுகளைக் கட்டுப்படுத்துவது உடலின் மருந்து ஏற்பிகளின் திறனை அதிகரிக்கும்."
  },
  'testing-process': {
    beginner: "உங்கள் மரபணு சோதனைப் பயணம் மிகவும் எளிதானது. இது 30 நிமிட ஆலோசனை, 10 நிமிட இரத்தப் பரிசோதனை, மற்றும் முடிவுகள் ஆலோசனையைக் கொண்டது.",
    basic: "வரவிருக்கும் வாரங்களில் எளிய இரத்த பரிசோதனை மூலம் இந்த சோதனையை நீங்கள் வசதியாகச் செய்து கொள்ளலாம்.",
    researched: "மரபணு ஆலோசனையுடன் தொடங்கி, இரத்த மாதிரி சேகரிப்பு மற்றும் முடிவுகள் பகுப்பாய்வு வரை இந்த சோதனை சீரமைக்கப்பட்டுள்ளது.",
    advanced: "பரிந்துரை கடிதங்கள் மற்றும் முறையான வழிகாட்டுதல்களுடன் சோதனை செயல்முறை மிகவும் எளிதாக்கப்பட்டுள்ளது."
  },
  'costs-subsidies': {
    beginner: "சிங்கப்பூரில் மரபணு சோதனைக்கு அரசாங்கம் 75% வரை மானியம் வழங்குகிறது. மீதமுள்ள தொகையை MediSave மூலம் செலுத்தலாம் என்பதால் உங்கள் பணச் செலவு மிகவும் குறைவு.",
    basic: "அரசின் மானியம் மற்றும் CDMS MediSave மூலம் பெரும்பான்மையான மருத்துவச் செலவுகள் காப்பீடு செய்யப்படுகின்றன.",
    researched: "அரசின் 50% முதல் 75% மானியங்கள் மற்றும் MediSave மூலம் உங்களின் பரிசோதனை செலவுகள் மிகவும் எளிதாக்கப்படுகின்றன.",
    advanced: "குறைந்த வருமானம் உடையவர்களுக்கு CHAS மற்றும் Medifund மூலம் முழுமையான நிதிப் பாதுகாப்பு வழங்கப்படுகிறது."
  },
  'insurance': {
    beginner: "சிங்கப்பூரின் கடுமையான விதிகள் உங்களைப் பாதுகாக்கின்றன. சுகாதார அமைச்சு மற்றும் ஆயுள் காப்பீட்டு சங்கம் (LIA) உடன்படிக்கையின்படி, உங்களின் மரபணு சோதனை முடிவுகளைக் காப்பீட்டு நிறுவனங்கள் பயன்படுத்த முடியாது.",
    basic: "LIA Moratorium உடன்படிக்கை உங்களின்自願 மரபணு சோதனைக் காப்பீட்டுத் தகுதியை முழுமையாகப் பாதுகாக்கிறது.",
    researched: "சிங்கப்பூர் LIA Moratorium உடன்படிக்கையின் மூலம் நுகர்வோரின் காப்பீட்டு உரிமைகள் முழுமையாகப் பாதுகாக்கப்படுகின்றன.",
    advanced: "வழக்கமான காப்பீடுகளைப் பெறும்போது மரபணு பரிசோதனை முடிவுகள் எந்தவிதப் பாதிப்பையும் ஏற்படுத்தாது என்று LIA உடன்படிக்கை உறுதியளிக்கிறது."
  }
};

// Compact dynamic concern sentence overrides
const CONCERN_OVERRIDES: Record<Language, Record<string, Partial<Record<KnowledgeLevelKey, Partial<Record<ConcernKey, string>>>>>> = {
  en: {
    'genetic-testing': {
      beginner: {
        geneticTest: "Your care team will explain each step. You may give a blood or saliva sample, and your results will be discussed with you later."
      },
      advanced: {
        family: "Genetic testing identifies specific inherited variants in genes like LDLR or PCSK9. Confirming these results in you provides a molecular marker that guides cascade testing, helping close relatives understand their own risks and what they need to consider."
      }
    },
    'treatment-medication': {
      beginner: {
        medication: "Taking daily medicine might feel new, but these are simple, safe, and highly studied pills. They are recommended to give your liver a helping hand in clearing cholesterol, keeping your blood vessels clear and your heart completely safe."
      },
      researched: {
        heartHealth: "To achieve long-term LDL reduction and optimal heart-risk management, high-intensity statin therapy remains the clinical cornerstone. It significantly lowers cumulative lipid-exposure years, preventing coronary plaque progression and stabilizing existing lesions."
      }
    }
  },
  ms: {
    'genetic-testing': {
      beginner: {
        geneticTest: "Pasukan perubatan anda akan menerangkan setiap langkah. Anda mungkin perlu memberikan sampel darah atau air liur, dan keputusan anda akan dibincangkan bersama anda kemudian."
      },
      advanced: {
        family: "Ujian genetik mengenal pasti varian warisan khusus dalam gen seperti LDLR atau PCSK9. Pengesanan keputusan ini membantu saringan lata keluarga, membolehkan saudara terdekat memahami risiko mereka sendiri dan perkara yang perlu dipertimbangkan."
      }
    },
    'treatment-medication': {
      beginner: {
        medication: "Mengambil ubat harian mungkin terasa asing, tetapi ini adalah pil yang ringkas, selamat, dan dikaji secara meluas. Ubat ini disyorkan untuk membantu hati anda membersihkan kolesterol, memastikan saluran darah anda bersih dan jantung anda selamat."
      },
      researched: {
        heartHealth: "Untuk mencapai pengurangan LDL jangka panjang dan pengurusan risiko jantung yang optimum, terapi statin berintensiti tinggi kekal menjadi asas klinikal. Ia mengurangkan pendedahan kolesterol terkumpul secara dramatik, menghalang pembentukan plak arteri."
      }
    }
  },
  zh: {
    'genetic-testing': {
      beginner: {
        geneticTest: "您的医疗团队会详细解释每一个步骤。您可能会提供血液或唾液样本，稍后会与您讨论检测结果。"
      },
      advanced: {
        family: "基因检测可识别 LDLR 或 PCSK9 等基因中的特定遗传变异。在您身上确认这些结果可提供分子标记，指导家系筛查，帮助直系亲属了解自身风险以及需要考虑的事项。"
      }
    },
    'treatment-medication': {
      beginner: {
        medication: "每天服用药物可能会让您感到陌生，但这些都是简单、安全且经过充分研究的药物。建议使用它们来帮助您的肝脏清除胆固醇，保持您的血管通畅，确保心脏完全安全。"
      },
      researched: {
        heartHealth: "为了实现长期的 LDL 降低和最佳的心脏风险管理，高强度他汀类药物治疗仍是临床基石。它能显著降低累积的脂质暴露时间，防止冠状动脉斑块进展并稳定现有病变。"
      }
    }
  },
  ta: {
    'genetic-testing': {
      beginner: {
        geneticTest: "உங்கள் மருத்துவக் குழு ஒவ்வொரு படியையும் விளக்கும். நீங்கள் இரத்தம் அல்லது உமிழ்நீர் மாதிரியைக் கொடுக்கலாம், பின்னர் உங்கள் முடிவுகள் உங்களுடன் விவாதிக்கப்படும்."
      },
      advanced: {
        family: "மரபணு பரிசோதனை LDLR அல்லது PCSK9 போன்ற மரபணுக்களில் குறிப்பிட்ட மரபுரிமை மாறுபாடுகளைக் கண்டறிகிறது. உங்களில் இந்த முடிவுகளை உறுதிப்படுத்துவது குடும்பப் பரிசோதனைக்கு வழிகாட்டும் மூலக்கூறு குறியீட்டை வழங்குகிறது, நெருங்கிய உறவினர்கள் தங்கள் சொந்த அபாயங்களையும் அவர்கள் கருத்தில் கொள்ள வேண்டியவற்றையும் புரிந்து கொள்ள உதவுகிறது."
      }
    },
    'treatment-medication': {
      beginner: {
        medication: "தினமும் மருந்து உட்கொள்வது புதிதாகத் தோன்றலாம், ஆனால் இவை எளிய, பாதுகாப்பான மற்றும் நன்கு ஆராயப்பட்ட மாத்திரைகள். உங்கள் கல்லீரல் கொழுப்பை அகற்றுவதற்கு உதவவும், உங்கள் இரத்தக் குழாய்களைச் சுத்தமாகவும் உங்கள் இதயத்தைப் பாதுகாப்பாகவும் வைத்திருக்க இவை பரிந்துரைக்கப்படுகின்றன."
      },
      researched: {
        heartHealth: "நீண்ட கால எல்டிஎல் குறைப்பு மற்றும் உகந்த இதய-ஆபத்து மேலாண்மையை அடைவதற்கு, அதிக தீவிரம் கொண்ட ஸ்டாடின் சிகிச்சை மருத்துவக் கல்லாகத் தொடர்கிறது. இது கொலஸ்ட்ரால் வெளிப்படும் ஆண்டுகளைக் கணிசமாகக் குறைக்கிறது, இரத்தக் குழாய் அடைப்பைத் தடுக்கிறது."
      }
    }
  }
};

// Generates the massive nested variants exactly matching user specification:
// guideContent[topicId][knowledgeLevel][primaryConcern]
const buildGuideContent = (language: Language) => {
  const output: any = {};
  const topicIds = Object.keys(TOPICS_META);
  const levels: KnowledgeLevelKey[] = ['beginner', 'basic', 'researched', 'advanced'];
  const concerns: ConcernKey[] = ['default', 'family', 'geneticTest', 'cost', 'insurance', 'heartHealth', 'medication', 'results'];

  for (const tid of topicIds) {
    output[tid] = {};
    for (const lvl of levels) {
      output[tid][lvl] = {};
      
      // Use fallback to English if translation is missing
      const baseTextMap = BASE_TEXTS[language]?.[tid]?.[lvl] ? BASE_TEXTS[language] : BASE_TEXTS['en'];
      const baseContentText = baseTextMap[tid][lvl];
      
      const meta = TOPICS_META[tid];
      const localizedTitles = LOCALIZED_STRINGS[language] || LOCALIZED_STRINGS['en'];
      
      for (const con of concerns) {
        // Resolve custom overrides for specific profile combinations if written,
        // otherwise append concern helper context to vary the wording dynamically.
        const customOverrideText = CONCERN_OVERRIDES[language]?.[tid]?.[lvl]?.[con] 
          || CONCERN_OVERRIDES['en']?.[tid]?.[lvl]?.[con];

        let finalContent = customOverrideText || baseContentText;

        // If no custom override, slightly vary content for other concern choices to ensure high dynamic quality
        if (!customOverrideText && con !== 'default') {
          if (con === 'family') {
            if (language === 'zh') finalContent += " 特别需要注意的是，管理您的 FH 状况对于指导直系亲属及下一代的早期筛查非常有帮助。";
            else if (language === 'ms') finalContent += " Yang penting, pengurusan kesihatan anda amat berguna sebagai panduan saringan awal bagi ahli keluarga dan anak-anak anda.";
            else if (language === 'ta') finalContent += " முக்கியமாக, உங்கள் ஆரோக்கியத்தைப் பேணுவது உங்கள் உறவினர்கள் மற்றும் குழந்தைகளின் பாதுகாப்புப் பரிசோதனைக்கு வழிகாட்டும்.";
            else finalContent += " Crucially, managing your health serves as a vital blueprint for coordinating proactive family screening for your loved ones.";
          } else if (con === 'cost') {
            if (language === 'zh') finalContent += " 我们将优先为您对接 MOH 财务援助服务，确保诊疗开销完全在您的承受范围内。";
            else if (language === 'ms') finalContent += " Kami mengutamakan urusan bantuan kewangan MOH bagi memastikan kos rawatan anda kekal minimum.";
            else if (language === 'ta') finalContent += " உங்களுக்கு குறைந்த செலவில் சிகிச்சை கிடைப்பதை உறுதி செய்ய நிதி உதவிகள் முன்னிலைப்படுத்தப்படும்.";
            else finalContent += " We prioritize aligning available financial schemes to ensure absolute peace of mind regarding diagnostics and care costs.";
          } else if (con === 'insurance') {
            if (language === 'zh') finalContent += " 新加坡 LIA 协定为您保驾护航，您的自愿检测行为拥有完全不受保险核保影响的法定权利。";
            else if (language === 'ms') finalContent += " Anda dilindungi sepenuhnya oleh garis panduan moratorium LIA kebangsaan daripada sebarang risiko premium insurans.";
            else if (language === 'ta') finalContent += " உங்களின்自願 மரபணு பரிசோதனை முடிவுகளைப் பாதுகாக்க சிங்கப்பூர் LIA விதிகள் வழிவகை செய்கின்றன.";
            else finalContent += " National regulatory guidelines under the LIA moratorium fully protect your right to voluntary predictive testing.";
          }
        }

        output[tid][lvl][con] = {
          title: localizedTitles[meta.titleKey] || meta.titleKey,
          shortSummary: localizedTitles[meta.titleKey] + " - " + lvl,
          keyTakeaway: localizedTitles[meta.keyTakeawayKey] || meta.keyTakeawayKey,
          content: finalContent,
          readingTime: meta.readTime,
          subsections: tid === 'what-is-fh' ? [
            {
              title: language === 'zh' ? '常见提问' : language === 'ms' ? 'Soalan Lazim' : language === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Common Questions',
              text: language === 'zh' 
                ? "FH 完全由遗传决定。这并不是您的错，通过早期的精准药物介入可以完全消除心血管风险。" 
                : language === 'ms' 
                ? "FH diwarisi secara genetik. Ini bukan salah anda, dan risiko kardiovaskular dapat dikurangkan ke tahap normal dengan ubat awal."
                : language === 'ta'
                ? "FH மரபணு சார்ந்தது, எனவே ஆரம்ப கால சிகிச்சைகள் மூலம் இதய அடைப்பைத் தடுக்கலாம்."
                : "FH is genetic. It is not your fault, and cardiovascular risk can be completely normalized with early medical support."
            }
          ] : undefined,
          steps: tid === 'testing-process' ? [
            { num: 1, title: language === 'zh' ? '检测前咨询' : 'Pre-test Counselling', description: '30 min' },
            { num: 2, title: 'DNA Blood Draw', description: '10 min' },
            { num: 3, title: 'Results Review', description: '4 weeks' }
          ] : undefined
        };
      }
    }
  }

  return output;
};

// Main retriever function used by PhoneSimulator
export function getPersonalizedGuide(
  id: string,
  onboardingFamiliarity: KnowledgeLevel,
  onboardingConcerns: string[],
  language: Language
): PersonalizedGuide {
  // 1. Map knowledge familiarity to requested keys
  const knowledgeLevel = mapFamiliarity(onboardingFamiliarity);

  // 2. Resolve primary concern key from selections
  const primaryConcern = resolvePrimaryConcern(onboardingConcerns);

  // 3. Build dynamic guide content dictionary for the requested language
  const guideContent = buildGuideContent(language);

  // 4. Resolve exact variant using requested logic
  const resolvedVariant =
    guideContent[id]?.[knowledgeLevel]?.[primaryConcern]
    ?? guideContent[id]?.[knowledgeLevel]?.default;

  // Temporary development-only debug console log to verify answer mapping
  console.log(`[FH PERSONALIZATION DEBUG]:
- knowledgeLevel: "${onboardingFamiliarity}" (mapped: "${knowledgeLevel}")
- selectedTopics: "${id}"
- selectedConcerns: ${JSON.stringify(onboardingConcerns)}
- resolvedConcernVariant: "${primaryConcern}"
- selected content variant key: "guideContent['${id}']['${knowledgeLevel}']['${primaryConcern}']"`);

  // 5. Build final composite PersonalizedGuide object
  const meta = TOPICS_META[id] || { icon: 'BookOpen', readTime: '3 min read' };

  return {
    id,
    title: resolvedVariant.title,
    shortSummary: resolvedVariant.shortSummary,
    readingTime: resolvedVariant.readingTime,
    iconName: meta.icon,
    keyTakeaway: resolvedVariant.keyTakeaway,
    content: resolvedVariant.content,
    subsections: resolvedVariant.subsections,
    steps: resolvedVariant.steps
  };
}

export const getPersonalisedGuideContent = getPersonalizedGuide;

