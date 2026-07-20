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
    beginner: "家族性高胆固醇血症 (FH) 是一种常见的先天性遗传特征，它会阻碍身体自然清除血液中的“坏” LDL 胆固醇。与因饮食或生活方式引起的普通高胆固醇不同，FH 患者的胆固醇水平自出生起就处于高位。在精准的基因诊断指导下，医疗团队可以帮助您将心血管风险降至完全正常的水平。",
    basic: "FH 是一种遗传性脂质代谢障碍，导致 LDL 胆固醇自出生起就在血液中异常积聚。单纯依靠传统的生活方式改变通常无法有效降低这种由基因驱动的高胆固醇。幸运的是，现代临床筛查与早期干预能帮助我们完美掌控您的指标，为心脏保驾护航。",
    researched: "家族性高胆固醇血症 (FH) 是一种高外显率的常染色体显性遗传病。其发病机制主要与低密度脂蛋白受体 (LDLR) 基因、APOB 基因或 PCSK9 基因的功能丧失型/获得功能型突变有关。这导致肝脏清除循环中 LDL-C 的能力受损，使患者终身暴露于极高水平的脂质环境中，显著加速血管内皮斑块的形成。",
    advanced: "针对具备深度医学认知的人群：FH 典型特征为血清 LDL-C 水平严重升高，并伴有显著提前的早发性心血管事件风险。由于其病因源自基因缺陷，药理学干预是重塑患者风险曲线的核心手段。分子遗传学检测能够不依赖常规的临床拟诊标准，为您提供 100% 确凿的分子医学诊断。"
  },
  'heart-health': {
    beginner: "由于遗传因素，大量的“坏” LDL 胆固醇会日复一日地在您的血管壁内默默积聚，逐渐形成动脉粥样硬化斑块，导致血管变窄。及早发现 FH 并启动科学干预，能够从根本上遏制斑块的生长，使您的心脏和血管保持年轻、强韧与健康。",
    basic: "由于 FH 从出生时就已经存在，患者的血管承受高胆固醇暴露的时间远远超过常人。这种长期的脂质浸润会加速动脉变窄的进程。然而，只要及早进行临床干预，这一病理生理学进程可以被完全阻断，从而确保您的心脏得到完备的主动保护。",
    researched: "FH 患者血清中持续升高的 LDL-C 是驱动早发性动脉粥样硬化病变的核心因素。终身的高脂血症暴露导致含有 ApoB 的脂蛋白在动脉内膜下大量沉积，诱发巨噬细胞吞噬脂质转化为泡沫细胞，启动炎症级联反应。若不进行科学的降脂管理，将导致冠脉粥样硬化病变迅速进展。",
    advanced: "FH 引起的心血管病变风险与患者生存期内累积的 LDL-C 暴露总量（临床常称为“LDL-胆固醇年”）呈直接线性相关。及早启动高强度药理干预能最大程度地削减累积的脂质暴露总量，从而将患者的远期心血管风险曲线拉回、并重合至普通人群的安全阈值内。"
  },
  'genetic-testing': {
    beginner: "基因检测是一种非常安全、便捷的门诊检测，仅需采集您的血液或唾液样本即可完成。普通的胆固醇检查只能测量血液中的脂肪含量，而基因检测能精确识别出导致问题的特定基因缺陷。检测报告通常在 4 到 6 周内出炉，为您的医疗团队定制个性化心脏保护方案提供最坚实的依据。",
    basic: "基因检测是确诊 FH 的临床金标准。它通过对您的 DNA 样本进行高科技分析，寻找是否存在 LDLR、APOB 或 PCSK9 基因的致病性突变。明确高胆固醇背后的遗传学本质，有助于临床专家为您精准匹配最具保护效能的治疗方案。",
    researched: "临床基因检测主要采用二代测序 (NGS) 技术对已知的 FH 致病基因（包括 LDLR、APOB、PCSK9 等核心基因，以及偶发的 LDLRAP1 基因）进行靶向深度测序。分子诊断能够彻底厘清临床拟诊中存在的灰色地带，不仅为您提供确定性的基因型确诊，更为后续在家族成员中开展家系筛查 (Cascade Screening) 奠定关键的先证者遗传学标记。",
    advanced: "分子遗传学分析构成了 FH 诊断与危险分层的基础基石。通过精确勾勒致病突变的位点与类型（如受体缺失型 vs 受体缺陷型），临床医师能够以极高的精度评估患者的远期心血管预后，并定制旨在最大化上调肝脏低密度脂蛋白受体活性的分子靶向降脂策略。"
  },
  'cascade-screening': {
    beginner: "家系筛查是一项关爱您所有家人的健康预防项目。当您被确诊为 FH 时，您的父母、兄弟姐妹以及子女都有 50% 的概率遗传相同的基因特征。尽早通知他们接受一项极其简单、且获得政府高额补贴的针对性筛查，是守护他们免受心脏病隐患侵害的最佳方式。",
    basic: "由于 FH 遵循显性遗传规律，患者的一级亲属（父母、子女、同胞）均有 50% 的概率共同承载这一遗传缺陷。家系筛查旨在趁着亲属血管尚未形成默默无闻的硬化斑块之前，及早发现这些潜在的患者，从而让他们提早获得极具成效的保护性诊疗服务。",
    researched: "家系筛查 (Cascade Screening) 是一种行之有效的流行病学“接触者追踪”机制。一旦先证者 (Index Case) 确诊致病变异，即应当以先证者为中心，顺藤摸瓜地对所有一级、二级亲属启动针对特定突变位点的靶向筛查。这一筛查模式在卫生经济学上被全球公认为是最具成本效益的预防医学范式之一。",
    advanced: "家系筛查策略依托于常染色体显性遗传的孟德尔定律：一级亲属的先验遗传概率高达 50%。我们的诊疗中心提供全面的系统性支持，包括出具专业的家系告知书、提供精简优惠的靶向突变验证流程，旨在协助您在免除愧疚感与心理压力的前提下，温情而顺畅地引导您的家人完成预防性医学验证。"
  },
  'treatment-medication': {
    beginner: "因为 FH 是一种由基因决定的健康特征，单纯依靠调整饮食或加强运动，是不足以将胆固醇降低到安全范围内的。他汀类等每日口服药极为安全、经历了数十年的广泛研究。它们的主要工作是“帮助”您的肝脏更高效地抓取并清除血液中的坏胆固醇，让您的心脏风险回归平常。",
    basic: "传统的降脂药物（如他汀类药物）的核心机制是促进肝细胞清除循环中的 LDL 胆固醇。这些药物在新加坡获得了极高比例的政府财政补贴，安全稳妥，适合长期服用，与健康的膳食习惯相得益彰，共同构筑起保护心脏的坚固防线。",
    researched: "FH 的现代药理学干预以强化肝脏低密度脂蛋白受体 (LDLR) 的表达为核心靶点。高强度他汀类药物（如阿托伐他汀、瑞舒伐他汀）通过抑制限速酶 HMG-CoA 还原酶，减少细胞内胆固醇合成，从而代偿性地诱导 LDLR 大量表达。临床上常联合应用依折麦贝或 PCSK9 抑制剂，以实现指南推荐的靶标脂质水平。",
    advanced: "在 FH 的治疗中，积极、长期的药理学降脂是强制性的临床要求。一线方案为最大耐受剂量的高强度他汀，旨在让 LDL-C 水平较基线降低至少 50%。对于未达标的超高危患者，应尽早联合使用依折麦贝以及新型的 PCSK9 单克隆抗体或小干扰 RNA (siRNA) 药物，从分子生物学层面彻底阻断 LDLR 的降解。"
  },
  'healthy-lifestyle': {
    beginner: "健康的生活方式是管理 FH 的重要基石。建议多吃高纤维食物（如燕麦、蔬菜和豆类），并限制饱和脂肪（如肥肉、椰浆和黄油）的摄入。每天进行 30 分钟的快走等规律运动，能让您的心肌更加强健、血液循环更顺畅。",
    basic: "虽然生活方式的改变无法改变致病的遗传基因，但它能为您打下坚实的身体机能基础，极大地放大降脂药物的医学疗效。增加膳食纤维的摄入并进行中等强度的有氧运动，是激发药物保护潜力、焕发生命活力的最佳日常习惯。",
    researched: "生活方式干预是 FH 全面药物管理中不可或缺的辅助手段。低饱和脂肪、高水溶性膳食纤维饮食不仅能减少外源性胆固醇的肠道吸收，还能促进胆汁酸的排泄；而规律的有氧运动则能显著改善内皮型一氧化氮合酶 (eNOS) 的活性，优化血管内皮功能。",
    advanced: "膳食中的饱和脂肪摄入会直接导致肝细胞表面 LDL 受体活性的下调，从而在分子水平上加剧 FH 本已存在的基因缺陷。因此，严格限制饱和脂肪酸的摄入是确保受体靶向降脂药物发挥最佳临床效应的病理生理学先决条件。"
  },
  'testing-process': {
    beginner: "您的基因检测旅程完全在门诊进行，无需住院，能轻松融入您的日常日程中。它由三个温馨、清晰的步骤组成：一次轻松耐心的预检遗传咨询、一次不超过 10 分钟的普通抽血，以及几周后的报告解读与关怀会诊。",
    basic: "诊疗路径十分高效且井然有序：首先由专家详细评估您的家族病史，接着在门诊完成快速的抽血采样，4 到 6 周后回诊听取报告并共同商讨保健方案，旨在为您提供最舒心、最受支持的医学体验。",
    researched: "基因检测的临床路径遵循严格的标准： pre-test 咨询用于绘制包含至少三代成员的家族系谱图、评估心血管累积风险并签署知情同意书；随后在门诊采集外周血或唾液样本进行高通量 NGS 测序；最终由遗传专家进行变异解读并提供定制报告。",
    advanced: "诊断级联流程始于先证者的知情同意与精准靶向测序。一旦实验室鉴定出致病性突变，我们的医学管理系统将自动为您生成个性化的亲属告知函，并在临床路径中嵌入针对家庭接触者的自动化预约指引，全面支持家系级联筛查的高效运转。"
  },
  'costs-subsidies': {
    beginner: "在新加坡，医疗保障非常完善且触手可及。针对 FH 的基因检测与专家咨询获得了卫生部 (MOH) 的大力资助。合资格的新加坡公民在经过经济审查后，可以获得高达 75% 的政府补贴，剩余的自付额还可以全额使用 MediSave 账户支付，几乎不占用您的现金储蓄。",
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
    beginner: "குடும்பவழி ஹைபர்கொலஸ்டிரோலேமியா (FH) என்பது பிறப்பிலிருந்தே கெட்ட கொழுப்பை உடல் அகற்றுவதைக் கடினமாக்கும் ஒரு மரபணுப் பிரச்சனை ஆகும். சாதாரண கொலஸ்ட்ரால் போலல்லாமல், இது பிறப்பிலிருந்தே மிக அதிகமாக உள்ளது. ஆரம்பக் கண்டறிதல் மூலம் உங்கள் இதயத்தைப் பாதுகாக்க முடியும்.",
    basic: "FH என்பது மரபுவழியாக வரும் கொழுப்புச் சத்து கோளாறாகும், இது பிறப்பிலிருந்தே இரத்தத்தில் கொழுப்புச் சத்து சேரக் காரணமாகிறது. வெறும் வாழ்க்கைமுறை மாற்றங்களால் மட்டும் இதைக் கட்டுப்படுத்த முடியாது.",
    researched: "குடும்பவழி ஹைபர்கொலஸ்டிரோலேமியா (FH) என்பது LDLR, APOB, அல்லது PCSK9 மரபணுக்களில் ஏற்படும் மாற்றத்தால் உண்டாகும் ஒரு மரபணு நோயாகும். இது கல்லீரல் கொழுழுப்பை அகற்றுவதைத் தடுக்கிறது.",
    advanced: "மரபணு ரீதியாக LDL வாங்கிகளில் ஏற்படும் கோளாறே FH-ன் முக்கிய காரணியாகும். இதைக் கண்டறிய மூலக்கூறு மரபணுப் பரிசோதனை மிக அவசியமான ஒன்றாகும்."
  },
  'heart-health': {
    beginner: "பிறப்பிலிருந்தே இருக்கும் அதிக கொழுப்புச் சத்து, இதய இரத்தக் குழாய்களில் கொழுப்பாகச் சேர்ந்து இரத்த ஓட்டத்தைக் குறைக்கும். ஆரம்பத்திலேயே சிகிச்சையைத் தொடங்குவதன் மூலம் இதயம் வலுவாக இருக்கும்.",
    basic: "பிறப்பிலிருந்தே இரத்தக் குழாய்கள் அதிக கொழுப்புக்கு உள்ளாவதால் தமனிகள் குறுகலாகும் அபாயம் அதிகம். ஆரம்பகால சிகிச்சை இந்த ஆபத்தைத் தடுத்து இதயம் காக்கும்.",
    researched: "இரத்தத்தில் இருக்கும் அதிக அளவிலான LDL-C கொழுப்பு இரத்த நாளங்களில் அடைப்பை ஏற்படுத்தும். உரிய சிகிச்சை அளிக்கப்படாவிட்டால், இது மாரடைப்புக்கு வழிவகுக்கும்.",
    advanced: "இதய நோய் அபாயம் என்பது வாழ்நாள் முழுவதிலும் உள்ள LDL அளவைப் பொறுத்தது. ஆரம்ப கட்ட ஸ்டாடின் சிகிச்சை இந்த அபாயத்தை முழுமையாகக் குறைந்து இயல்பு நிலைக்குக் கொண்டுவரும்."
  },
  'genetic-testing': {
    beginner: "மரபணு சோதனை என்பது உங்கள் இரத்த மாதிரியை எடுத்துச் செய்யப்படும் எளிய மற்றும் பாதுகாப்பான பரிசோதனை ஆகும். இது உங்கள் உயர் கொலஸ்ட்ராலுக்கான மரபணு காரணத்தைக் கண்டறியும்.",
    basic: "உங்களுக்கு FH உள்ளதா என்பதை உறுதிப்படுத்த மரபணுப் பரிசோதனை சிறந்த வழியாகும். இது LDLR, APOB, அல்லது PCSK9 போன்ற மரபணுக்களை ஆராயும்.",
    researched: "NGS போன்ற நவீன தொழில்நுட்பங்களைப் பயன்படுத்தி FH-க்கு காரணமான முக்கிய மரபணுக்கள் பகுப்பாய்வு செய்யப்படுகின்றன. இது குடும்பப் பரிசோதனைக்கும் வழிகாட்டும்.",
    advanced: "மரபணுப் பரிசோதனை என்பது துல்லியமான சிகிச்சைக்கு வழிகாட்டும் ஒரு முக்கிய கருவியாகும். இதன் மூலம் நோயாளியின் ஆபத்தை அறிந்து அதற்கேற்ப மருந்துகளைத் தேர்வு செய்யலாம்."
  },
  'cascade-screening': {
    beginner: "குடும்பப் பரிசோதனை என்பது உங்கள் குடும்பத்தினருக்கான பாதுகாப்புத் திட்டம். உங்களுக்கு FH இருந்தால், உங்கள் பெற்றோர், உடன்பிறப்புகள் மற்றும் குழந்தைகளுக்கு இதே மரபணு இருக்க 50% வாய்ப்பு உள்ளது. ஆரம்பத்திலேயே சோதனை செய்வது அவர்களைப் பாதுகாக்கும்.",
    basic: "பரம்பரை நோய் என்பதால், நெருங்கிய உறவினர்களுக்கு 50% பாதிப்பு ஏற்பட வாய்ப்புள்ளது. குடும்பப் பரிசோதனை மூலம் ஆபத்தைக் கண்டறிந்து முன்கூட்டியே தற்காத்துக் கொள்ளலாம்.",
    researched: "பாதிக்கப்பட்ட நபர் மூலம் குடும்பத்தில் உள்ள மற்ற உறுப்பினர்களைக் கண்டறிவது மிகவும் பயனுள்ள அணுகுமுறையாகும். இது உலகளவில் பரிந்துரைக்கப்படும் ஒரு பொருளாதார ரீதியான வழிமுறை.",
    advanced: "குடும்ப உறுப்பினர்களுக்கு 50% பரம்பரை வாய்ப்பு உள்ளதால், எங்களின் ஆலோசனை மற்றும் அரசு மானியங்களைப் பயன்படுத்தி உங்களது நெருங்கிய உறவினர்களை எளிதாகச் சோதனைக்கு உட்படுத்தலாம்."
  },
  'treatment-medication': {
    beginner: "மரபணுப் பிரச்சனை என்பதால், வெறும் உணவு முறை மற்றும் உடற்பயிற்சி மட்டும் போதாது. தினமும் மருந்து உட்கொள்வது மிகவும் பாதுகாப்பானது மற்றும் முக்கியமானது. இவை உங்கள் கல்லீரல் கெட்ட கொழுப்பை அகற்ற உதவும்.",
    basic: "வழக்கமான ஸ்டாடின் போன்ற மருந்துகள் கல்லீரலில் கொழுப்பை அகற்ற உதவுகின்றன. ஆரோக்கியமான உணவுகளோடு சேர்த்து இந்த மானிய விலையிலான மருந்துகள் நீண்ட காலத்திற்குப் பாதுகாப்பானவை.",
    researched: "FH சிகிச்சையானது கல்லீரல் LDL வாங்கிகளின் செயல்பாட்டை அதிகரிப்பதை நோக்கமாகக் கொண்டது. தீவிரமான கொலஸ்ட்ரால் குறைப்பிற்கு ஸ்டாடின் மருந்துகளுடன் இதர சிகிச்சைகளும் இணைக்கப்படலாம்.",
    advanced: "FH உள்ளவர்களுக்கு 50% வரை LDL அளவைக் குறைக்க தீவிரமான ஸ்டாடின் சிகிச்சைகள் தேவைப்படும். தேவைப்பட்டால் Ezetimibe மற்றும் PCSK9 தடுப்பான்களும் இணைக்கப்படலாம்."
  },
  'healthy-lifestyle': {
    beginner: "ஆரோக்கியமான வாழ்க்கை முறை இதயத்தைப் பாதுகாக்க மிகவும் முக்கியமானது. நார்ச்சத்து கொண்ட உணவுகளை அதிகம் எடுத்துக்கொண்டு, கொழுப்பு நிறைந்த உணவுகளைத் தவிர்க்கவும். தினமும் 30 நிமிடங்கள் வேகமாக நடப்பது நல்லது.",
    basic: "மரபணு குறைபாட்டை வாழ்க்கை முறையால் மட்டும் தீர்க்க முடியாது என்றாலும், இது மருந்துகளின் செயல்திறனை அதிகரிக்க பெரிதும் உதவும்.",
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
    basic: "LIA Moratorium உடன்படிக்கை உங்களின் சுயவிவர மரபணு சோதனைக் காப்பீட்டுத் தகுதியை முழுமையாகப் பாதுகாக்கிறது.",
    researched: "சிங்கப்பூர் LIA Moratorium உடன்படிக்கையின் மூலம் நுகர்வோரின் காப்பீட்டு உரிமைகள் முழுமையாகப் பாதுகாக்கப்படுகின்றன.",
    advanced: "வழக்கமான காப்பீடுகளைப் பெறும்போது மரபணு பரிசோதனை முடிவுகள் எந்தவிதப் பாதிப்பையும் ஏற்படுத்தாது என்று LIA உடன்படிக்கை உறுதியளிக்கிறது."
  }
};

const CONCERN_OVERRIDES: Record<Language, Record<string, Partial<Record<KnowledgeLevelKey, Partial<Record<ConcernKey, string>>>>>> = {
  en: {
    'genetic-testing': {
      beginner: {
        geneticTest: "It is completely normal to feel a bit anxious about a genetic test, but the process is very simple, safe, and reassuring. The test is a straightforward, outpatient blood draw or saliva sample that takes less than 10 minutes. Before the test, a friendly genetic counsellor will walk you through what the test looks for, explain how your privacy is fully protected in Singapore, and answer any questions you have. During the test, a trained nurse will gently collect the sample. After the test, you can go right back to your day—there is no downtime. Your results will be ready in 4 to 6 weeks, and your care team will meet with you to explain what they mean in plain language, helping you take proactive steps to protect your heart."
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
        medication: "We understand that side effects are a major concern when starting lifelong therapy. Standard lipid-lowering pharmacotherapy for FH relies on high-potency statins (e.g., Atorvastatin or Rosuvastatin) which inhibit HMG-CoA reductase, upregulating hepatic LDL receptors to clear circulating LDL-C. To achieve aggressive clinical targets, statins are frequently combined with Ezetimibe (which inhibits cholesterol absorption via NPC1L1) or PCSK9 inhibitors (which prevent LDL receptor degradation). Regarding safety, statin-associated muscle symptoms (SAMS) or myalgia occur in a small minority of patients; true statin-induced myopathy is extremely rare. Our protocol includes baseline liver enzyme monitoring (ALT/AST) and routine assessment of muscle symptoms. If myalgia or muscle pain occurs, we can easily manage it by adjusting the dosage, switching to an alternative statin, or incorporating non-statin therapies like PCSK9 monoclonal antibodies to ensure robust cardiovascular protection with zero compromise on your quality of life.",
        heartHealth: "To achieve long-term LDL reduction and optimal heart-risk management, high-intensity statin therapy remains the clinical cornerstone. It significantly lowers cumulative lipid-exposure years, preventing coronary plaque progression and stabilizing existing lesions."
      },
      advanced: {
        medication: "We understand that side effects are a major concern when starting lifelong therapy. Standard lipid-lowering pharmacotherapy for FH relies on high-potency statins (e.g., Atorvastatin or Rosuvastatin) which inhibit HMG-CoA reductase, upregulating hepatic LDL receptors to clear circulating LDL-C. To achieve aggressive clinical targets, statins are frequently combined with Ezetimibe (which inhibits cholesterol absorption via NPC1L1) or PCSK9 inhibitors (which prevent LDL receptor degradation). Regarding safety, statin-associated muscle symptoms (SAMS) or myalgia occur in a small minority of patients; true statin-induced myopathy is extremely rare. Our protocol includes baseline liver enzyme monitoring (ALT/AST) and routine assessment of muscle symptoms. If myalgia or muscle pain occurs, we can easily manage it by adjusting the dosage, switching to an alternative statin, or incorporating non-statin therapies like PCSK9 monoclonal antibodies to ensure robust cardiovascular protection with zero compromise on your quality of life."
      }
    }
  },
  ms: {
    'genetic-testing': {
      beginner: {
        geneticTest: "Adalah normal untuk berasa bimbang tentang ujian genetik, tetapi proses ini sangat mudah, selamat, dan melegakan. Ujian ini hanyalah pengambilan darah atau sampel air liur mudah di luar pesakit yang mengambil masa kurang daripada 10 minit. Sebelum ujian, kaunselor genetik yang mesra akan menerangkan apa yang dicari, bagaimana privasi anda dilindungi sepenuhnya di Singapura, dan menjawab soalan anda. Semasa ujian, jururawat terlatih akan mengambil sampel dengan lembut. Selepas ujian, anda boleh meneruskan aktiviti harian anda serta-merta. Keputusan akan siap dalam 4 hingga 6 minggu, dan pasukan perubatan akan membincangkannya dalam bahasa yang mudah difahami untuk membantu melindungi jantung anda."
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
        medication: "Kami memahami bahawa kesan sampingan adalah kebimbangan utama apabila memulakan terapi seumur hidup. Farmakoterapi pengurangan lipid standard untuk FH bergantung kepada statin berpotensi tinggi (cth., Atorvastatin atau Rosuvastatin) yang menghalang HMG-CoA reduktase, sekali gus meningkatkan ekspresi reseptor LDL hepatik untuk membersihkan LDL-C. Untuk mencapai sasaran klinikal yang agresif, statin sering digabungkan dengan Ezetimibe (yang menghalang penyerapan kolesterol melalui NPC1L1) atau perencat PCSK9 (yang menghalang kemerosotan reseptor LDL). Berkenaan keselamatan, gejala otot berkaitan statin (SAMS) atau mialgia hanya berlaku dalam sebahagian kecil pesakit; miopati sebenar adalah sangat jarang berlaku. Protokol kami merangkumi pemantauan enzim hati (ALT/AST) pada tahap asas dan penilaian rutin gejala otot. Jika mialgia berlaku, kami boleh menguruskannya dengan mudah dengan melaraskan dos, menukar kepada statin alternatif, atau menggunakan terapi bukan statin seperti antibodi monoklonal PCSK9 untuk perlindungan kardiovaskular optimum tanpa menjejaskan kualiti hidup anda.",
        heartHealth: "Untuk mencapai pengurangan LDL jangka panjang dan pengurusan risiko jantung yang optimum, terapi statin berintensiti tinggi kekal menjadi asas klinikal. Ia mengurangkan pendedahan kolesterol terkumpul secara dramatik, menghalang pembentukan plak arteri."
      },
      advanced: {
        medication: "Kami memahami bahawa kesan sampingan adalah kebimbangan utama apabila memulakan terapi seumur hidup. Farmakoterapi pengurangan lipid standard untuk FH bergantung kepada statin berpotensi tinggi (cth., Atorvastatin atau Rosuvastatin) yang menghalang HMG-CoA reduktase, sekali gus meningkatkan ekspresi reseptor LDL hepatik untuk membersihkan LDL-C. Untuk mencapai sasaran klinikal yang agresif, statin sering digabungkan dengan Ezetimibe (yang menghalang penyerapan kolesterol melalui NPC1L1) atau perencat PCSK9 (yang menghalang kemerosotan reseptor LDL). Berkenaan keselamatan, gejala otot berkaitan statin (SAMS) atau mialgia hanya berlaku dalam sebahagian kecil pesakit; miopati sebenar adalah sangat jarang berlaku. Protokol kami merangkumi pemantauan enzim hati (ALT/AST) pada tahap asas dan penilaian rutin gejala otot. Jika mialgia berlaku, kami boleh menguruskannya dengan mudah dengan melaraskan dos, menukar kepada statin alternatif, atau menggunakan terapi bukan statin seperti antibodi monoklonal PCSK9 untuk perlindungan kardiovaskular optimum tanpa menjejaskan kualiti hidup anda."
      }
    }
  },
  zh: {
    'genetic-testing': {
      beginner: {
        geneticTest: "对基因检测感到有些紧张是完全正常的，但整个过程其实非常简单、安全且令人安心。检测仅需在门诊进行不超过10分钟的普通抽血或唾液采集。在检测前，亲切的遗传学咨询师会为您详细讲解检测内容、解答疑虑，并解释新加坡法律如何全面保护您的个人隐私；在检测中，专业护士会轻柔地采集样本；检测后，您可立即恢复正常生活，无需任何静养。报告将在4至6周内出炉，您的医疗团队会用通俗易懂的语言为您解读，帮助您积极主动地守护心脏健康。"
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
        medication: "我们非常理解，在启动终身药物治疗时，药物副作用是患者最关心的问题。针对FH的标准降脂药物治疗主要依托强效他汀类药物（如阿托伐他汀或瑞舒伐他汀），其作用机制是通过抑制 HMG-CoA 还原酶，从而上调肝细胞表面的 LDL 受体以加速清除循环中的 LDL-C。为了达到进取的临床靶标，他汀通常与依折麦贝（通过抑制 NPC1L1 靶点减少肠道胆固醇吸收）或 PCSK9 抑制剂（阻断 LDL 受体降解路径）联合使用。在安全性方面，他汀类药物相关的肌肉症状（SAMS）或肌痛仅在极少数患者中出现，而真正的他汀诱导型肌病极其罕见。我们的临床随访流程包括基线肝酶监测（ALT/AST）以及常规肌肉症状评估。即使出现肌痛，我们也能够通过调整剂量、更换他汀种类或联用非他汀类靶向疗法（如 PCSK9 单克隆抗体）来轻松化解，在确保心血管保护最大化的同时，完全不影响您的生活质量。",
        heartHealth: "为了实现长期的 LDL 降低和最佳的心脏风险管理，高强度他汀类药物治疗仍是临床基石。它能显著降低累积的脂质暴露时间，防止冠状动脉斑块进展并稳定现有病变。"
      },
      advanced: {
        medication: "我们非常理解，在启动终身药物治疗时，药物副作用是患者最关心的问题。针对FH的标准降脂药物治疗主要依托强效他汀类药物（如阿托伐他汀或瑞舒伐他汀），其作用机制是通过抑制 HMG-CoA 还原酶，从而上调肝细胞表面的 LDL 受体以加速清除循环中的 LDL-C。为了达到进取的临床靶标，他汀通常与依折麦贝（通过抑制 NPC1L1 靶点减少肠道胆固醇吸收）或 PCSK9 抑制剂（阻断 LDL 受体降解路径）联合使用。在安全性方面，他汀类药物相关的肌肉症状（SAMS）或肌痛仅在极少数患者中出现，而真正的他汀诱导型肌病极其罕见。我们的临床随访流程包括基线肝酶监测（ALT/AST）以及常规肌肉症状评估。即使出现肌痛，我们也能够通过调整剂量、更换他汀种类或联用非他汀类靶向疗法（如 PCSK9 单克隆抗体）来轻松化解，在确保心血管保护最大化的同时，完全不影响您的生活质量。"
      }
    }
  },
  ta: {
    'genetic-testing': {
      beginner: {
        geneticTest: "மரபணு பரிசோதனை பற்றி சற்று கவலைப்படுவது முற்றிலும் இயல்பானது, ஆனால் இந்த செயல்முறை மிகவும் எளிமையானது, பாதுகாப்பானது மற்றும் நிம்மதியானது. இந்த சோதனை 10 நிமிடங்களுக்கும் குறைவாகவே ஆகும் ஒரு சாதாரண இரத்த பரிசோதனை ஆகும். சோதனைக்கு முன், ஒரு அன்பான மரபணு ஆலோசகர் சோதனை எதைச் சரிபார்க்கிறது மற்றும் சிங்கப்பூரில் உங்கள் தனியுriமை எவ்வாறு பாதுகாக்கப்படுகிறது என்பதை விளக்குவார். சோதனையின் போது, ஒரு பயிற்சி பெற்ற செவிலியர் மாதிரியை எடுப்பார். சோதனைக்குப் பிறகு, நீங்கள் உடனடியாக உங்கள் அன்றாடப் பணிகளுக்குத் திரும்பலாம். முடிவுகள் 4 முதல் 6 வாரங்களில் தயாராகிவிடும், மேலும் உங்கள் மருத்துவக் குழு முடிவுகளை எளிய மொழியில் விளக்கி உங்கள் இதயத்தைப் பாதுகாக்க உதவும்."
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
        medication: "தினசரி மருந்துகள் எடுக்கும்போது அதன் பக்கவிளைவுகள் பற்றிய கவலைகள் ஏற்படுவது இயல்பானது. FH சிகிச்சைக்காகப் பயன்படுத்தப்படும் உயர் ரக ஸ்டாடின் மருந்துகள் (Atorvastatin அல்லது Rosuvastatin போன்றவை) கல்லீரலில் கொழுப்பை அகற்றும் ஏற்பிகளை அதிகரிக்கின்றன. கொழுப்பைக் குறைக்க ஸ்டாடின் மருந்துகளுடன் Ezetimibe அல்லது PCSK9 தடுப்பான்கள் போன்ற நவீன சிகிச்சைகளும் பயன்படுத்தப்படுகின்றன. பக்கவிளைவுகளைப் பொறுத்தமட்டில், தசை வலி (myalgia) மிகக் குறைந்த எண்ணிக்கையிலான நோயாளிகளுக்கே ஏற்படுகிறது; கடுமையான தசைப் பாதிப்புகள் மிகவும் அரிதானவை. எங்களின் சிகிச்சை முறையில் ஆரம்பகட்ட கல்லீரல் என்சைம் கண்காணிப்பு (ALT/AST) மற்றும் தசை வலி பரிசோதனைகள் தொடர்ந்து செய்யப்படும். தசை வலி ஏற்பட்டால், மருந்தின் அளவை மாற்றுவது அல்லது மாற்று மருந்துகளுக்கு மாறுவது மூலம் இதனை எளிதில் சரிசெய்ய முடியும்.",
        heartHealth: "நீண்ட கால எல்டிஎல் குறைப்பு மற்றும் உகந்த இதய-ஆபத்து மேலாண்மையை அடைவதற்கு, அதிக தீவிரம் கொண்ட ஸ்டாடின் சிகிச்சை மருத்துவக் கல்லாகத் தொடர்கிறது. இது கொலஸ்ட்ரால் வெளிப்படும் ஆண்டுகளைக் கணிசமாகக் குறைக்கிறது, இரத்தக் குழாய் அடைப்பைத் தடுக்கிறது."
      },
      advanced: {
        medication: "தினசரி மருந்துகள் எடுக்கும்போது அதன் பக்கவிளைவுகள் பற்றிய கவலைகள் ஏற்படுவது இயல்பானது. FH சிகிச்சைக்காகப் பயன்படுத்தப்படும் உயர் ரக ஸ்டாடின் மருந்துகள் (Atorvastatin அல்லது Rosuvastatin போன்றவை) கல்லீரலில் கொழுப்பை அகற்றும் ஏற்பிகளை அதிகரிக்கின்றன. கொழுப்பைக் குறைக்க ஸ்டாடின் மருந்துகளுடன் Ezetimibe அல்லது PCSK9 தடுப்பான்கள் போன்ற நவீன சிகிச்சைகளும் பயன்படுத்தப்படுகின்றன. பக்கவிளைவுகளைப் பொறுத்தமட்டில், தசை வலி (myalgia) மிகக் குறைந்த எண்ணிக்கையிலான நோயாளிகளுக்கே ஏற்படுகிறது; கடுமையான தசைப் பாதிப்புகள் மிகவும் அரிதானவை. எங்களின் சிகிச்சை முறையில் ஆரம்பகட்ட கல்லீரல் என்சைம் கண்காணிப்பு (ALT/AST) மற்றும் தசை வலி பரிசோதனைகள் தொடர்ந்து செய்யப்படும். தசை வலி ஏற்பட்டால், மருந்தின் அளவை மாற்றுவது அல்லது மாற்று மருந்துகளுக்கு மாறுவது மூலம் இதனை எளிதில் சரிசெய்ய முடியும்."
      }
    }
  }
};

// Define personalized fallback content for each topic and level in case any localized concern variant is missing
export const personalisedFallbackContent: Record<string, Record<KnowledgeLevelKey, any>> = {
  'what-is-fh': {
    beginner: { title: 'What is FH?', shortSummary: 'Understanding FH', content: BASE_TEXTS['en']['what-is-fh'].beginner, keyTakeaway: LOCALIZED_STRINGS['en'].what_is_fh_takeaway, readingTime: '3 min read' },
    basic: { title: 'What is FH?', shortSummary: 'Understanding FH', content: BASE_TEXTS['en']['what-is-fh'].basic, keyTakeaway: LOCALIZED_STRINGS['en'].what_is_fh_takeaway, readingTime: '3 min read' },
    researched: { title: 'What is FH?', shortSummary: 'Understanding FH', content: BASE_TEXTS['en']['what-is-fh'].researched, keyTakeaway: LOCALIZED_STRINGS['en'].what_is_fh_takeaway, readingTime: '3 min read' },
    advanced: { title: 'What is FH?', shortSummary: 'Understanding FH', content: BASE_TEXTS['en']['what-is-fh'].advanced, keyTakeaway: LOCALIZED_STRINGS['en'].what_is_fh_takeaway, readingTime: '3 min read' }
  },
  'heart-health': {
    beginner: { title: 'Heart Health & FH', shortSummary: 'Heart Health', content: BASE_TEXTS['en']['heart-health'].beginner, keyTakeaway: LOCALIZED_STRINGS['en'].heart_health_takeaway, readingTime: '2 min read' },
    basic: { title: 'Heart Health & FH', shortSummary: 'Heart Health', content: BASE_TEXTS['en']['heart-health'].basic, keyTakeaway: LOCALIZED_STRINGS['en'].heart_health_takeaway, readingTime: '2 min read' },
    researched: { title: 'Heart Health & FH', shortSummary: 'Heart Health', content: BASE_TEXTS['en']['heart-health'].researched, keyTakeaway: LOCALIZED_STRINGS['en'].heart_health_takeaway, readingTime: '2 min read' },
    advanced: { title: 'Heart Health & FH', shortSummary: 'Heart Health', content: BASE_TEXTS['en']['heart-health'].advanced, keyTakeaway: LOCALIZED_STRINGS['en'].heart_health_takeaway, readingTime: '2 min read' }
  },
  'genetic-testing': {
    beginner: { title: 'Genetic Testing', shortSummary: 'Genetic Testing', content: BASE_TEXTS['en']['genetic-testing'].beginner, keyTakeaway: LOCALIZED_STRINGS['en'].genetic_testing_takeaway, readingTime: '2 min read' },
    basic: { title: 'Genetic Testing', shortSummary: 'Genetic Testing', content: BASE_TEXTS['en']['genetic-testing'].basic, keyTakeaway: LOCALIZED_STRINGS['en'].genetic_testing_takeaway, readingTime: '2 min read' },
    researched: { title: 'Genetic Testing', shortSummary: 'Genetic Testing', content: BASE_TEXTS['en']['genetic-testing'].researched, keyTakeaway: LOCALIZED_STRINGS['en'].genetic_testing_takeaway, readingTime: '2 min read' },
    advanced: { title: 'Genetic Testing', shortSummary: 'Genetic Testing', content: BASE_TEXTS['en']['genetic-testing'].advanced, keyTakeaway: LOCALIZED_STRINGS['en'].genetic_testing_takeaway, readingTime: '2 min read' }
  },
  'cascade-screening': {
    beginner: { title: 'Cascade Screening', shortSummary: 'Cascade Screening', content: BASE_TEXTS['en']['cascade-screening'].beginner, keyTakeaway: LOCALIZED_STRINGS['en'].cascade_screening_takeaway, readingTime: '3 min read' },
    basic: { title: 'Cascade Screening', shortSummary: 'Cascade Screening', content: BASE_TEXTS['en']['cascade-screening'].basic, keyTakeaway: LOCALIZED_STRINGS['en'].cascade_screening_takeaway, readingTime: '3 min read' },
    researched: { title: 'Cascade Screening', shortSummary: 'Cascade Screening', content: BASE_TEXTS['en']['cascade-screening'].researched, keyTakeaway: LOCALIZED_STRINGS['en'].cascade_screening_takeaway, readingTime: '3 min read' },
    advanced: { title: 'Cascade Screening', shortSummary: 'Cascade Screening', content: BASE_TEXTS['en']['cascade-screening'].advanced, keyTakeaway: LOCALIZED_STRINGS['en'].cascade_screening_takeaway, readingTime: '3 min read' }
  },
  'treatment-medication': {
    beginner: { title: 'Treatment & Medication', shortSummary: 'Treatment', content: BASE_TEXTS['en']['treatment-medication'].beginner, keyTakeaway: LOCALIZED_STRINGS['en'].treatment_takeaway, readingTime: '2 min read' },
    basic: { title: 'Treatment & Medication', shortSummary: 'Treatment', content: BASE_TEXTS['en']['treatment-medication'].basic, keyTakeaway: LOCALIZED_STRINGS['en'].treatment_takeaway, readingTime: '2 min read' },
    researched: { title: 'Treatment & Medication', shortSummary: 'Treatment', content: BASE_TEXTS['en']['treatment-medication'].researched, keyTakeaway: LOCALIZED_STRINGS['en'].treatment_takeaway, readingTime: '2 min read' },
    advanced: { title: 'Treatment & Medication', shortSummary: 'Treatment', content: BASE_TEXTS['en']['treatment-medication'].advanced, keyTakeaway: LOCALIZED_STRINGS['en'].treatment_takeaway, readingTime: '2 min read' }
  },
  'healthy-lifestyle': {
    beginner: { title: 'Healthy Lifestyle', shortSummary: 'Healthy Lifestyle', content: BASE_TEXTS['en']['healthy-lifestyle'].beginner, keyTakeaway: LOCALIZED_STRINGS['en'].lifestyle_takeaway, readingTime: '2 min read' },
    basic: { title: 'Healthy Lifestyle', shortSummary: 'Healthy Lifestyle', content: BASE_TEXTS['en']['healthy-lifestyle'].basic, keyTakeaway: LOCALIZED_STRINGS['en'].lifestyle_takeaway, readingTime: '2 min read' },
    researched: { title: 'Healthy Lifestyle', shortSummary: 'Healthy Lifestyle', content: BASE_TEXTS['en']['healthy-lifestyle'].researched, keyTakeaway: LOCALIZED_STRINGS['en'].lifestyle_takeaway, readingTime: '2 min read' },
    advanced: { title: 'Healthy Lifestyle', shortSummary: 'Healthy Lifestyle', content: BASE_TEXTS['en']['healthy-lifestyle'].advanced, keyTakeaway: LOCALIZED_STRINGS['en'].lifestyle_takeaway, readingTime: '2 min read' }
  },
  'testing-process': {
    beginner: { title: 'Testing Process', shortSummary: 'Testing Process', content: BASE_TEXTS['en']['testing-process'].beginner, keyTakeaway: LOCALIZED_STRINGS['en'].process_takeaway, readingTime: '4 min read' },
    basic: { title: 'Testing Process', shortSummary: 'Testing Process', content: BASE_TEXTS['en']['testing-process'].basic, keyTakeaway: LOCALIZED_STRINGS['en'].process_takeaway, readingTime: '4 min read' },
    researched: { title: 'Testing Process', shortSummary: 'Testing Process', content: BASE_TEXTS['en']['testing-process'].researched, keyTakeaway: LOCALIZED_STRINGS['en'].process_takeaway, readingTime: '4 min read' },
    advanced: { title: 'Testing Process', shortSummary: 'Testing Process', content: BASE_TEXTS['en']['testing-process'].advanced, keyTakeaway: LOCALIZED_STRINGS['en'].process_takeaway, readingTime: '4 min read' }
  },
  'costs-subsidies': {
    beginner: { title: 'Costs & Subsidies', shortSummary: 'Costs & Subsidies', content: BASE_TEXTS['en']['costs-subsidies'].beginner, keyTakeaway: LOCALIZED_STRINGS['en'].costs_takeaway, readingTime: '2.5 min read' },
    basic: { title: 'Costs & Subsidies', shortSummary: 'Costs & Subsidies', content: BASE_TEXTS['en']['costs-subsidies'].basic, keyTakeaway: LOCALIZED_STRINGS['en'].costs_takeaway, readingTime: '2.5 min read' },
    researched: { title: 'Costs & Subsidies', shortSummary: 'Costs & Subsidies', content: BASE_TEXTS['en']['costs-subsidies'].researched, keyTakeaway: LOCALIZED_STRINGS['en'].costs_takeaway, readingTime: '2.5 min read' },
    advanced: { title: 'Costs & Subsidies', shortSummary: 'Costs & Subsidies', content: BASE_TEXTS['en']['costs-subsidies'].advanced, keyTakeaway: LOCALIZED_STRINGS['en'].costs_takeaway, readingTime: '2.5 min read' }
  },
  'insurance': {
    beginner: { title: 'Insurance Rights', shortSummary: 'Insurance Rights', content: BASE_TEXTS['en']['insurance'].beginner, keyTakeaway: LOCALIZED_STRINGS['en'].insurance_takeaway, readingTime: '3 min read' },
    basic: { title: 'Insurance Rights', shortSummary: 'Insurance Rights', content: BASE_TEXTS['en']['insurance'].basic, keyTakeaway: LOCALIZED_STRINGS['en'].insurance_takeaway, readingTime: '3 min read' },
    researched: { title: 'Insurance Rights', shortSummary: 'Insurance Rights', content: BASE_TEXTS['en']['insurance'].researched, keyTakeaway: LOCALIZED_STRINGS['en'].insurance_takeaway, readingTime: '3 min read' },
    advanced: { title: 'Insurance Rights', shortSummary: 'Insurance Rights', content: BASE_TEXTS['en']['insurance'].advanced, keyTakeaway: LOCALIZED_STRINGS['en'].insurance_takeaway, readingTime: '3 min read' }
  }
};

// Generates the massive nested variants exactly matching user specification:
// guideContent[topicId][knowledgeLevel][primaryConcern]

const LOCALIZED_CONCERN_PARAGRAPHS: Record<Language, Record<string, Record<'beginner' | 'advanced', string>>> = {
  en: {
    family: {
      beginner: "Since FH runs in families, finding out you have it is actually a wonderful opportunity to protect your loved ones. Each of your immediate family members—including your parents, brothers, sisters, and children—has a 50% chance of inheriting the same gene. By sharing your results, you can guide them to get a simple, highly subsidized test. Finding FH early means your children and family can grow up with strong, healthy hearts and never have to worry.",
      advanced: "Due to the autosomal dominant nature of Familial Hypercholesterolaemia, first-degree relatives have a 50% prior probability of inheriting the genetic variant. Identifying a specific pathogenic mutation (such as in the LDLR gene) provides the molecular target required for highly precise cascade screening. Rather than general lipid panels, relatives can be genotyped with 100% diagnostic certainty. Early pharmacological intervention in affected family members prevents decades of cumulative LDL exposure, effectively normalizing their cardiovascular risk trajectory."
    },
    geneticTest: {
      beginner: "It is completely normal to feel a bit anxious about a genetic test, but the process is very simple, safe, and reassuring. The test is a straightforward, outpatient blood draw or saliva sample that takes less than 10 minutes. Before the test, a friendly genetic counsellor will walk you through what the test looks for, explain how your privacy is fully protected in Singapore, and answer any questions you have. During the test, a trained nurse will gently collect the sample. After the test, you can go right back to your day—there is no downtime. Your results will be ready in 4 to 6 weeks, and your care team will meet with you to explain what they mean in plain language, helping you take proactive steps to protect your heart.",
      advanced: "The molecular diagnostic process utilizes Next-Generation Sequencing (NGS) to analyze key loci within the LDLR, APOB, and PCSK9 genes. The assay is highly specific and sensitive, running on isolated genomic DNA from a standard peripheral blood draw. Clinical pre-test counseling is integrated into the workflow to discuss the probability of identifying pathogenic, likely pathogenic, or variants of uncertain significance (VUS). The procedure is non-invasive, requiring no pre-analytical preparation or fasting. Turnaround time is typically 4 to 6 weeks, culminating in a post-test consultation to translate genomic findings into targeted, precision-medicine therapeutic strategies."
    },
    cost: {
      beginner: "To ease any financial worries, Singapore's healthcare system ensures that FH genetic testing and counselling are highly affordable. Eligible Singapore Citizens receive up to 75% subsidies from the Ministry of Health (MOH). For the remaining balance, you can pay the full amount using your MediSave account under the Chronic Disease Management Scheme (CDMS). This means you can complete your entire test with little to no cash out-of-pocket, ensuring your family's health is never compromised by cost.",
      advanced: "Financial barriers to molecular diagnostics are mitigated via the Ministry of Health's clinical subvention framework. Eligible Singapore Citizens receive standardized subsidy tiers of 50% to 75% based on means-testing. The residual co-payment is fully claimable under the Chronic Disease Management Scheme (CDMS) using MediSave 500/700 allocations. For lower-income households, supplementary financial safety nets such as Community Health Assist Scheme (CHAS) subsidies and Medifund are seamlessly integrated to ensure zero out-of-pocket financial distress."
    },
    insurance: {
      beginner: "To give you complete peace of mind, Singapore has very strict guidelines to protect your insurance rights. The Ministry of Health and the Life Insurance Association (LIA) have established a rules-based agreement called a moratorium. This means insurance companies are legally forbidden from asking you to take a genetic test, and they cannot use voluntary test results to deny you standard health or life insurance. Your decision to proactively protect your heart is entirely safe and private.",
      advanced: "Consumer protection is legislated via the joint Ministry of Health (MOH) and Life Insurance Association (LIA) Moratorium on Genetic Testing. Under these strict regulatory guidelines, underwriters are prohibited from requiring genetic tests for risk-rating or policy issuance. Furthermore, voluntary clinical genetic test results cannot be requested or used to deny coverage or escalate premiums for standard health, life, or critical illness insurance policies up to established high-value financial caps (e.g., S$500,000 for life coverage), safeguarding patient autonomy in proactive health management."
    },
    heartHealth: {
      beginner: "Your heart's safety is our top priority. Because FH starts at birth, your blood vessels are exposed to high cholesterol levels for a longer duration than usual. By identifying FH early and starting treatment, we can stop cholesterol from sticking to your vessel walls, completely preventing heart disease. This proactive step ensures your heart remains strong, allowing you to live a full, active, and worry-free life.",
      advanced: "Primary cardiovascular risk reduction in FH centers on mitigating cumulative lifetime LDL-C exposure, or 'LDL-C years'. Prolonged exposure to elevated circulating ApoB-containing lipoproteins drives subendothelial accumulation, inflammatory macrophage recruitment, and rapid coronary atherogenesis. Initiating high-potency lipid-lowering therapy stabilizes existing vascular lesions, prevents endothelial dysfunction, and resets the patient's long-term cardiovascular event curve to match the general population's baseline."
    },
    medication: {
      beginner: "If you are concerned about taking daily medications, rest assured that these treatments are safe, gentle, and highly studied. Think of statins as a helping hand for your liver, allowing it to naturally clear 'bad' cholesterol from your blood. They are designed for long-term safety with very rare side effects. Your care team will monitor you closely and can easily adjust your plan to ensure you feel comfortable, energetic, and fully protected.",
      advanced: "Lifelong lipid-lowering pharmacotherapy is the cornerstone of FH management. High-potency statins (e.g., Atorvastatin, Rosuvastatin) act as HMG-CoA reductase inhibitors, upregulating hepatic LDL receptors to clear circulating LDL-C. Statin-associated muscle symptoms (SAMS) occur in less than 5% of patients, and true myopathy is exceptionally rare. Clinical protocols mandate baseline liver function (ALT/AST) and creatine kinase (CK) monitoring. Any localized muscle symptoms are clinically managed via dosage titration, switching statin classes, or combining with Ezetimibe or PCSK9 inhibitors to ensure target lipid clearance without compromising patient quality of life."
    },
    results: {
      beginner: "We understand that waiting for a diagnosis can be stressful, but confirming whether you have FH is the most powerful thing you can do for your health. A genetic test gives you a clear, definitive answer, taking away all the guesswork. If your test is positive, it simply means you now have a highly effective roadmap to keep your heart safe. If it is negative, you can breathe a sigh of relief knowing standard care is all you need.",
      advanced: "Definitive diagnosis of FH is achieved through molecular validation, bypassing the diagnostic ambiguity of clinical scoring systems such as the Dutch Lipid Clinic Network (DLCN) or Simon Broome criteria. Molecular identification of a pathogenic variant in the LDLR, APOB, or PCSK9 genes establishes a definitive diagnosis regardless of fluctuating baseline lipid levels. This diagnostic precision facilitates targeted therapeutic stratification, establishing clear LDL-C targets (<1.8 mmol/L or a >50% reduction) to guide your personalized cardiovascular care plan."
    }
  },
  zh: {
    family: {
      beginner: "由于家族性高胆固醇血症（FH）具有家族遗传性，因此发现您患有此病实际上是保护您至爱家人的绝佳机会。您的直系亲属——包括您的父母、兄弟姐妹和子女——都有 50% 的几率遗传相同的基因。通过分享您的检测结果，您可以引导他们接受简单且享有高额补贴的筛查。及早发现 FH 意味着您的子女和家人可以拥有强健、健康的心脏，终身无忧。",
      advanced: "由于家族性高胆固醇血症具有常染色体显性遗传特征，先证者的直系亲属有 50% 的先验遗传概率。识别出特定的致病突变（如 LDLR 基因突变）可提供进行精准家系筛查所需的分子靶点。亲属无需依赖波动性较大的血脂筛查，即可通过基因检测获得 100% 确凿的诊断。在受影响的家族成员中及早进行药物干预，可防止数十年的累积 LDL 暴露，从而使他们的心血管风险轨迹重归正常。"
    },
    geneticTest: {
      beginner: "对基因检测感到有些紧张是完全正常的，但整个过程其实非常简单、安全且令人安心。检测仅需在门诊进行不超过10分钟的普通抽血或唾液采集。在检测前，亲切的遗传学咨询师会为您详细讲解检测内容、解答疑虑，并解释新加坡法律如何全面保护您的个人隐私；在检测中，专业护士会轻柔地采集样本；检测后，您可立即恢复正常生活，无需任何静养。报告将在4至6周内出炉，您的医疗团队会用通俗易懂的语言为您解读，帮助您积极主动地守护心脏健康。",
      advanced: "分子诊断流程利用二代测序（NGS）技术对 LDLR、APOB 和 PCSK9 基因中的关键位点进行分析。该检测具有极高的特异性和敏感性，基于标准外周血样本提取的基因组 DNA 进行。临床检测前咨询已融入工作流中，以讨论发现致病、可能致病或临床意义未明变异（VUS）的概率。该程序为非侵入性，无需进行特殊的分析前准备或空腹。检测周期通常为 4 至 6 周，随后进行检测后咨询，将基因检测结果转化为精准医疗方案。"
    },
    cost: {
      beginner: "为了缓解您的财务顾虑，新加坡的医疗保障体系确保了 FH 基因检测和咨询的高负担性。符合条件的新加坡公民可获得卫生部（MOH）高达 75% 的高额补贴。至于剩余的自付额，您可以在慢性疾病管理计划（CDMS）下使用您的 MediSave 账户全额支付。这意味着您无需支付高昂的现金即可完成检测，确保家人的健康绝不会因费用而受到影响。",
      advanced: "分子诊断的财务壁垒已通过卫生部（MOH）的临床补贴框架得到有效缓解。符合条件的新加坡公民可根据经济状况调查获得 50% 至 75% 的标准补贴。剩余的自付额可在慢性疾病管理计划（CDMS）下通过 MediSave 500/700 额度进行全额报销。对于低收入家庭，CHAS 蓝卡/橙卡以及 Medifund 财务救助网已实现无缝对接，确保患者不会面临任何现金支付压力。"
    },
    insurance: {
      beginner: "为了让您完全放心，新加坡制定了非常严格的准则来保障您的保险权益。卫生部与人寿保险协会（LIA）确立了一项名为限制令（Moratorium）的行业协定。这意味着保险公司依法不得要求您进行基因检测，也绝不能将您自愿进行的基因检测结果用于拒绝标准寿险或医疗险。您主动守护心脏健康的决定是完全安全、受保护且私密的。",
      advanced: "消费者权益通过新加坡卫生部（MOH）与人寿保险协会（LIA）联合颁布的《基因检测限制令》获得严格保障。在这些明确的行业准则下，承保人被禁止要求客户进行基因检测以进行风险费率评定或保单核保。此外，对于在规定限额内的标准寿险、医疗险或重疾险保单（例如人寿保障额度在 50 万新币以内），保险公司不得索要或使用自愿性临床基因检测结果来拒绝承保或上调保费，切实维护了患者在主动健康管理中的自主权。"
    },
    heartHealth: {
      beginner: "您的心脏安全是我们最关心的事。由于 FH 自出生起就存在，您的血管暴露在高胆固醇环境下的时间比普通人更长。通过及早发现 FH 并启动治疗，我们可以有效阻止胆固醇黏附在血管壁上，从而完全预防心脏病。这一积极的举措能够确保您的心脏保持强健，让您享受充实、活跃且无忧无虑的生活。",
      advanced: "FH 患者的心血管原发性风险防范，核心在于减轻终身累积的 LDL-C 暴露量（即‘LDL-C暴露年’）。长期暴露于高循环含 ApoB 的脂蛋白，会促使其在血管内皮下积聚，激活巨噬细胞并加速冠状动脉粥样硬化的进展。及早启动高活性降脂药物治疗能够稳定现有的血管病变，改善内皮细胞功能，并将患者的长期心血管事件风险曲线重置至普通人群的基线水平。"
    },
    medication: {
      beginner: "如果您对每天服用药物有所顾虑，请完全放心，这些治疗方案均非常安全、温和且经过了极其充分的研究。您可以将他汀类药物看作肝脏的‘好帮手’，协助其自然清除血液中的“坏”胆固醇。这些药物专为长期安全使用而设计，副作用极其罕见。您的医疗团队将对您进行密切监测，并可轻松调整方案，确保您感到舒适、充满活力且得到全方位的保护。",
      advanced: "终身降脂药物治疗是 FH 临床管理的核心基石。强效他汀类药物（如阿托伐他汀、瑞舒伐他汀）作为 HMG-CoA 还原酶抑制剂，能够上调肝脏 LDL 受体活性以清除循环中的 LDL-C。他汀相关的肌肉症状（SAMS）发生率低于 5%，真正的肌病极为罕见。临床随访流程强制要求进行基线肝功能（ALT/AST）和肌酸激酶（CK）监测。任何局部的肌肉症状均可通过剂量滴定、更换他汀种类或联合使用依折麦贝或 PCSK9 抑制剂来轻松管理，在确保靶标脂质清除的同时保障患者的生活质量。"
    },
    results: {
      beginner: "我们非常理解等待确诊的过程可能会令人焦虑，但确认您是否患有 FH 是您能为自身健康做出的最强有力的行动。基因检测能为您提供清晰、确凿的答案，告别所有的无端猜想。如果检测呈阳性，这仅意味着您现在有了一条极其高效的路线图来守护心脏安全。如果呈阴性，您也可以松一口气，因为这表明您仅需接受常规健康管理即可。",
      advanced: "FH 的金标准诊断需通过分子生物学验证，这有助于规避传统临床评分系统（如荷兰脂质诊所网络 DLCN 或 Simon Broome 标准）带来的诊断模糊性。在 LDLR、APOB 或 PCSK9 基因中鉴定出致病突变可确立 100% 的分子层诊断。这种精准诊断有助于指导后续的治疗分层，确立清晰的降脂靶标（LDL-C < 1.8 mmol/L 或降幅 > 50%），以实现真正的高度个性化心脏健康管理。"
    }
  },
  ms: {
    family: {
      beginner: "Memandangkan FH diwarisi dalam keluarga, mengetahui diagnosis anda adalah peluang keemasan untuk melindungi orang tersayang. Setiap ahli keluarga terdekat anda—termasuk ibu bapa, adik-beradik, dan anak-anak—mempunyai peluang 50% untuk mewarisi gen yang sama. Dengan berkongsi keputusan anda, anda boleh membimbing mereka untuk mendapatkan ujian mudah yang disubsidi tinggi. Pengesanan awal FH bermakna anak-anak dan keluarga anda boleh membesar dengan jantung yang sihat dan kuat, tanpa sebarang bimbang.",
      advanced: "Disebabkan sifat dominan autosomal Familial Hypercholesterolaemia, saudara darjah pertama mempunyai kebarangkalian 50% untuk mewarisi varian genetik. Mengenal pasti mutasi patogenik tertentu (seperti gen LDLR) memberikan sasaran molekul yang diperlukan untuk saringan lata keluarga yang sangat tepat. Saudara terdekat boleh disaring melalui genotip dengan 100% kepastian diagnosis. Intervensi awal ubat-ubatan dalam kalangan ahli keluarga yang terjejas mengurangkan beban LDL terkumpul, sekali gus menormalkan lengkung risiko kardiovaskular mereka."
    },
    geneticTest: {
      beginner: "Adalah perkara biasa untuk berasa sedikit bimbang tentang ujian genetik, tetapi proses ini sebenarnya sangat mudah, selamat, dan melegakan. Ujian ini hanyalah pengambilan darah atau sampel air liur mudah di luar pesakit yang mengambil masa kurang daripada 10 minit. Sebelum ujian, kaunselor genetik yang mesra akan membimbing anda tentang apa yang dicari, bagaimana privasi anda dilindungi sepenuhnya di Singapura, dan menjawab soalan anda. Semasa ujian, jururawat terlatih akan mengambil sampel dengan lembut. Keputusan akan siap dalam 4 hingga 6 minggu, dan pasukan perubatan akan membincangkannya dalam bahasa mudah untuk membantu melindungi jantung anda.",
      advanced: "Proses diagnostik molekul menggunakan teknologi NGS untuk menganalisis lokus utama dalam gen LDLR, APOB, dan PCSK9. Ujian ini mempunyai spesifikasi dan kepekaan yang tinggi berdasarkan DNA genamik daripada sampel darah biasa. Sesi kaunseling pra-ujian membincangkan kebarangkalian mengenal pasti varian patogenik atau varian yang tidak dapat dipastikan (VUS). Prosedur ini adalah pesakit luar tanpa memerlukan persiapan khas atau puasa, mengambil masa 4 hingga 6 minggu diikuti sesi pasca-ujian untuk menterjemah penemuan genetik kepada strategi rawatan perubatan jitu."
    },
    cost: {
      beginner: "Bagi mengurangkan kebimbangan kewangan anda, sistem penjagaan kesihatan Singapura memastikan ujian genetik dan kaunseling FH adalah sangat mampu milik. Warganegara Singapura yang layak menerima subsidi sehingga 75% daripada Kementerian Kesihatan (MOH). Untuk baki bayaran, anda boleh membayar sepenuhnya menggunakan akaun MediSave anda di bawah Skim Pengurusan Penyakit Kronik (CDMS). Ini bermakna anda boleh menyelesaikan ujian ini dengan bayaran tunai minimum atau tanpa tunai langsung, memastikan kesihatan keluarga anda terpelihara.",
      advanced: "Halangan kewangan terhadap ujian molekul dikurangkan melalui rangka kerja subsidi klinikal MOH. Warganegara Singapura yang layak menerima subsidi standard antara 50% hingga 75% berdasarkan ujian kelayakan. Baki kos boleh dituntut sepenuhnya di bawah CDMS menggunakan peruntukan MediSave 500/700. Bagi keluarga berpendapatan rendah, rangkaian bantuan kewangan tambahan seperti subsidi CHAS dan Medifund disediakan bagi menjamin akses kewangan penuh tanpa sebarang kesulitan wang tunai."
    },
    insurance: {
      beginner: "Bagi memberikan anda ketenangan minda sepenuhnya, Singapura mempunyai garis panduan yang sangat ketat untuk melindungi hak insurans anda. Kementerian Kesihatan dan Persatuan Insurans Hayat (LIA) telah menetapkan perjanjian moratorium. Ini bermakna syarikat insurans dilarang sekali daripada meminta anda menjalani ujian genetik, dan mereka tidak boleh menggunakan keputusan ujian sukarela anda untuk menolak perlindungan insurans kesihatan atau hayat standard. Langkah anda untuk melindungi jantung anda adalah selamat dan dilindungi sepenuhnya.",
      advanced: "Perlindungan pengguna dijamin melalui Moratorium Ujian Genetik bersama oleh MOH dan LIA. Di bawah garis panduan ketat ini, syarikat insurans dilarang daripada meminta ujian genetik untuk penilaian kadar risiko. Keputusan ujian genetik sukarela juga tidak boleh digunakan untuk menolak perlindungan atau menaikkan premium polisi hayat/kesihatan standard di bawah had perlindungan tertentu (cth., S$500,000 untuk perlindungan hayat), bagi memelihara hak pesakit dalam menguruskan kesihatan secara proaktif."
    },
    heartHealth: {
      beginner: "Keselamatan jantung anda adalah keutamaan kami. Memandangkan FH bermula sejak lahir, saluran darah anda terdedah kepada tahap kolesterol tinggi untuk jangka masa yang lebih lama. Dengan mengesan FH awal dan memulakan rawatan, kami boleh menghalang kolesterol daripada melekat pada dinding arteri anda, sekali gus mencegah penyakit jantung sepenuhnya. Langkah proaktif ini memastikan jantung anda kekal kuat agar anda dapat menikmati kehidupan yang aktif dan bebas bimbang.",
      advanced: "Pengurangan risiko kardiovaskular dalam FH bertumpu kepada pengurangan pendedahan kolesterol LDL terkumpul sepanjang hayat (atau 'tahun LDL-C'). Pendedahan jangka panjang kepada lipoprotein ApoB memacu pengumpulan kolesterol di dinding pembuluh darah, yang membawa kepada penyakit jantung pramatang jika tidak dirawat. Memulakan rawatan statin berpotensi tinggi membantu menstabilkan plak arteri sedia ada, meningkatkan fungsi endotelial, dan menormalkan risiko kardiovaskular pesakit ke tahap populasi umum."
    },
    medication: {
      beginner: "Jika anda bimbang tentang pengambilan ubat harian, yakinlah bahawa ubat-ubatan ini adalah sangat selamat, lembut, dan telah dikaji dengan teliti. Anggaplah ubat statin sebagai pembantu kepada hati anda untuk membersihkan kolesterol buruk dari darah secara semula jadi. Ia direka untuk keselamatan jangka panjang dengan kesan sampingan yang sangat jarang berlaku. Pasukan perubatan kami akan sentiasa memantau kesihatan anda untuk memastikan anda berasa selesa dan dilindungi sepenuhnya.",
      advanced: "Farmakoterapi pengurangan lipid seumur hidup adalah asas pengurusan klinikal FH. Statin berpotensi tinggi (cth., Atorvastatin, Rosuvastatin) bertindak sebagai perencat HMG-CoA reduktase untuk meningkatkan reseptor LDL hati. Gejala otot berkaitan statin (SAMS) berlaku dalam kurang daripada 5% pesakit, dan miopati sebenar adalah sangat jarang berlaku. Protokol kami merangkumi pemantauan enzim hati (ALT/AST) dan CK. Gejala tarian diuruskan secara klinikal dengan melaraskan dos, menukar jenis statin, atau menggabungkan dengan Ezetimibe/perencat PCSK9 untuk perlindungan optimum tanpa menjejaskan kualiti hidup pesakit."
    },
    results: {
      beginner: "Kami memahami bahawa menunggu keputusan ujian boleh menimbulkan tekanan, tetapi mengesahkan sama ada anda menghidap FH adalah langkah paling berkuasa untuk kesihatan anda. Ujian genetik memberikan jawapan yang pasti dan jelas, menyingkirkan sebarang ketidakpastian. Sekiranya keputusan anda positif, ia bermakna anda kini mempunyai panduan rawatan yang sangat berkesan untuk melindungi jantung anda. Jika negatif, anda boleh berasa lega kerana anda hanya memerlukan penjagaan kesihatan biasa.",
      advanced: "Diagnosis pasti FH dicapai melalui pengesahan molekul, sekali gus mengelakkan ketidakpastian daripada sistem pemarkahan klinikal (seperti DLCN atau Simon Broome). Mengenal pasti varian patogenik dalam gen LDLR, APOB, atau PCSK9 menetapkan diagnosis pasti 100% tanpa mengira turun naik tahap lipid asas. Ketepatan diagnostik ini membolehkan penentuan sasaran LDL-C yang jelas (<1.8 mmol/L atau pengurangan >50%) bagi membimbing pelan rawatan kardiovaskular peribadi anda."
    }
  },
  ta: {
    family: {
      beginner: "குடும்பத்தில் FH பரம்பரையாக வருவதால், உங்களைக் கண்டறிவது உங்கள் குடும்பத்தினரைப் பாதுகாக்க ஒரு சிறந்த வாய்ப்பாகும். உங்கள் பெற்றோர், உடன்பிறப்புகள் மற்றும் குழந்தைகளுக்கு இந்த மரபணு இருக்க 50% வாய்ப்பு உள்ளது. உங்கள் முடிவுகளைப் பகிர்வதன் மூலம், அவர்கள் மானிய விலையிலான சோதனையைப் பெற உதவலாம். FH-ஐ முன்கூட்டியே கண்டறிவது உங்கள் குடும்பத்தினர் ஆரோக்கியமான இதயத்துடன் வாழ உதவும்.",
      advanced: "FH மரபணு சார்ந்த நோய் என்பதால், நெருங்கிய உறவினர்களுக்கு 50% பாதிப்பு ஏற்பட வாய்ப்புள்ளது. LDLR போன்ற குறிப்பிட்ட மரபணுக்களைக் கண்டறிவது குடும்பப் பரிசோதனைக்கு (cascade screening) வழிகாட்டும் மூலக்கூறு குறியீட்டை வழங்குகிறது. ஆரம்பத்திலேயே சிகிச்சை அளிப்பது குடும்ப உறுப்பினர்களின் இதய நோய் அபாயத்தை முற்றிலும் குறைக்கும்."
    },
    geneticTest: {
      beginner: "மரபணு பரிசோதனை பற்றி சற்று கவலைப்படுவது முற்றிலும் இயல்பானது, ஆனால் இந்த செயல்முறை மிகவும் எளிமையானது, பாதுகாப்பானது மற்றும் நிம்மதியானது. இது 10 நிமிடங்களுக்கும் குறைவாகவே ஆகும் ஒரு சாதாரண இரத்த பரிசோதனை ஆகும். சோதனைக்கு முன், ஒரு அன்பான மரபணு ஆலோசகர் சோதனை எதைச் சரிபார்க்கிறது மற்றும் சிங்கப்பூரில் உங்கள் தனியுரிமை எவ்வாறு பாதுகாக்கப்படுகிறது என்பதை விளக்குவார். 4 முதல் 6 வாரங்களில் முடிவுகள் தயாராகிவிடும், மருத்துவக் குழு எளிய மொழியில் விளக்கும்.",
      advanced: "மரபணு சோதனை NGS தொழில்நுட்பத்தைப் பயன்படுத்தி LDLR, APOB, மற்றும் PCSK9 மரபணுக்களை பகுப்பாய்வு செய்கிறது. இது இரத்த மாதிரி மூலம் செய்யப்படும் மிகவும் துல்லியமான சோதனையாகும். சோதனைக்கு முந்தைய ஆலோசனையின் மூலம், மரபணு மாறுபாடுகள் மற்றும் சிங்கப்பூர் LIA விதிகள் பற்றி விரிவாக அறியலாம்."
    },
    cost: {
      beginner: "சிங்கப்பூரில் மரபணு சோதனைக்கு அரசாங்கம் 75% வரை மானியம் வழங்குகிறது. மீதமுள்ள தொகையை CDMS MediSave மூலம் செலுத்தலாம் என்பதால் உங்கள் பணச் செலவு மிகவும் குறைவு, நிதிச் சுமையின்றி இதயத்தைப் பாதுகாக்கலாம்.",
      advanced: "அரசின் 50% முதல் 75% மானியங்கள் மற்றும் Chronic Disease Management Scheme (CDMS) கீழ் MediSave 500/700 பயன்படுத்தி சோதனைக் கட்டணங்களை எளிதாகச் செலுத்தலாம். குறைந்த வருமானம் உடையவர்களுக்கு CHAS மற்றும் Medifund மூலம் முழுமையான நிதிப் பாதுகாப்பு வழங்கப்படுகிறது."
    },
    insurance: {
      beginner: "சிங்கப்பூரின் கடுமையான விதிகள் உங்களைப் பாதுகாக்கின்றன. சுகாதார அமைச்சு மற்றும் ஆயுள் காப்பீட்டு சங்கம் (LIA) உடன்படிக்கையின்படி, உங்களின் மரபணு சோதனை முடிவுகளைக் காப்பீட்டு நிறுவனங்கள் பயன்படுத்த முடியாது. உங்களின் சோதனை முற்றிலும் பாதுகாப்பானது.",
      advanced: "Predictive மரபணு சோதனை முடிவுகள் சிங்கப்பூர் LIA Moratorium உடன்படிக்கையின் மூலம் காப்பீட்டுத் தகுதியை முழுமையாகப் பாதுகாக்கின்றன. நிறுவனங்கள் சோதனை முடிவுகளைக் கேட்கவோ அல்லது பிரீமியத்தை அதிகரிக்கவோ முடியாது."
    },
    heartHealth: {
      beginner: "உங்கள் இதயத்தின் பாதுகாப்புதான் எங்கள் முதல் கடமை. FH பிறப்பிலிருந்தே அதிக கொழுப்புக்கு வழிவகுப்பதால், தமனிகள் குறுகலாகும் அபாயம் அதிகம். ஆரம்பகால சிகிச்சை இந்த ஆபத்தைத் தடுத்து, இதயம் வலுவாக இருக்க உதவும்.",
      advanced: "FH இதய நோய் அபாயம் என்பது வாழ்நாள் முழுவதிலும் உள்ள LDL அளவைப் பொறுத்தது. தமனிகளில் கொழுப்புப் படிவதைத் தடுத்து, இதயம் காக்கும் சிகிச்சைகளை ஆரம்பத்திலேயே தொடங்குவது இதய நோய் அபாயத்தை முற்றிலும் குறைக்கும்."
    },
    medication: {
      beginner: "தினமும் மருந்து உட்கொள்வது புதிதாகத் தோன்றலாம், ஆனால் இவை எளிய, பாதுகாப்பான மாத்திரைகள் ஆகும். உங்கள் கல்லீரல் இரத்தத்தில் உள்ள கெட்ட கொழுப்பை அகற்ற இவை உதவுகின்றன. பக்கவிளைவுகள் மிகவும் அரிதானவை.",
      advanced: "ஸ்டாடின் மருந்துகள் (Atorvastatin, Rosuvastatin) கல்லீரல் LDL வாங்கிகளை அதிகரித்து கொழுப்பைக் குறைக்கின்றன. தசை வலி போன்ற பக்கவிளைவுகள் ஏற்பட்டால், அளவை மாற்றுவது அல்லது மாற்று மருந்துகளுக்கு மாறுவது மூலம் சரிசெய்யலாம்."
    },
    results: {
      beginner: "முடிவுக்காகக் காத்திருப்பது கவலையாக இருக்கலாம், ஆனால் பரிசோதனை மூலம் துல்லியமாக அறிந்துகொள்வது உங்கள் இதயப் பாதுகாப்பிற்கு மிகச் சிறந்த வழியாகும். முடிவு நேர்மறையாக இருந்தால், அது உங்கள் இதயத்தை ஆரோக்கியமாக வைத்திருக்க உதவும்.",
      advanced: "மரபணு பரிசோதனை மூலம் துல்லியமான மூலக்கூறு கண்டறிதலை அடைவது, வழக்கமான மருத்துவ மதிப்பீடுகளை விட நம்பகமானது. இது துல்லியமான சிகிச்சை மற்றும் LDL இலக்குகளை (<1.8 mmol/L) அடைய வழிகாட்டுகிறது."
    }
  }
};

const buildGuideContent = (language: Language) => {
  const output: any = {};
  const topicIds = Object.keys(TOPICS_META);
  const levels: KnowledgeLevelKey[] = ['beginner', 'basic', 'researched', 'advanced'];
  const concerns: ConcernKey[] = ['default', 'family', 'geneticTest', 'cost', 'insurance', 'heartHealth', 'medication', 'results'];

  const localShortSummaries: Record<Language, Record<string, Record<string, string>>> = {
    en: {
      'what-is-fh': {
        family: "How inheriting FH affects your family and kids.",
        heartHealth: "Why FH causes high cholesterol and heart risk.",
        default: "What FH is and why early diagnosis matters."
      },
      'heart-health': {
        heartHealth: "Protecting your blood vessels and heart from plaque.",
        medication: "How medical therapies prevent arterial narrowing.",
        family: "Keeping your heart healthy to support your family.",
        default: "How high cholesterol impacts your heart over time."
      },
      'genetic-testing': {
        geneticTest: "A safe, 10-minute DNA test to confirm FH.",
        family: "How your genetic test helps protect your relatives.",
        insurance: "Your test results are strictly private and secure.",
        default: "Why a genetic test is the standard for FH diagnosis."
      },
      'cascade-screening': {
        family: "A loving, family-based plan to protect loved ones.",
        cost: "Highly subsidized family screening in Singapore.",
        default: "How cascade screening keeps your family safe."
      },
      'treatment-medication': {
        medication: "Safe, effective medications to lower lipid levels.",
        heartHealth: "How treatment lowers your cardiovascular risk to normal.",
        default: "Highly effective, subsidized medical therapies."
      },
      'healthy-lifestyle': {
        medication: "How diet and exercise support your daily therapy.",
        heartHealth: "Establishing a lifestyle foundation for heart safety.",
        default: "Optimal nutrition and activity guidelines for FH."
      },
      'testing-process': {
        geneticTest: "Step-by-step from counselling to your DNA results.",
        default: "Six straightforward steps to complete your genetic test."
      },
      'costs-subsidies': {
        cost: "Up to 75% MOH subsidies and MediSave coverage.",
        default: "What you pay and how subsidies keep costs minimal."
      },
      'insurance': {
        insurance: "How the LIA Moratorium safeguards your coverage.",
        default: "Your legal rights and insurance protection guidelines."
      }
    },
    zh: {
      'what-is-fh': {
        family: "遗传 FH 如何影响您的家庭与子女。",
        heartHealth: "为何 FH 会导致高胆固醇与心脏风险。",
        default: "什么是 FH 以及为何早期诊断至关重要。"
      },
      'heart-health': {
        heartHealth: "保护您的血管与心脏免受斑块积聚的影响。",
        medication: "药物治疗如何预防动脉狭窄。",
        family: "保持心脏健康以支持您的家庭。",
        default: "高胆固醇随着时间的推移如何影响您的心脏。"
      },
      'genetic-testing': {
        geneticTest: "安全、仅需10分钟的 DNA 检测以确诊 FH。",
        family: "您的基因检测如何帮助保护您的亲人。",
        insurance: "您的检测结果是严格保密且安全的。",
        default: "为什么基因检测是 FH 诊断的标准。"
      },
      'cascade-screening': {
        family: "一项充满关爱的、基于家庭的保护挚爱的计划。",
        cost: "在新加坡享有高额补贴的家系筛查。",
        default: "家系筛查如何确保您家人的安全。"
      },
      'treatment-medication': {
        medication: "安全、有效的降低脂质水平的药物。",
        heartHealth: "治疗如何让您的心血管风险回归正常。",
        default: "高效、享有补贴的药物治疗方案。"
      },
      'healthy-lifestyle': {
        medication: "饮食与运动如何支持您的每日药物治疗。",
        heartHealth: "为心脏安全奠定生活方式基础。",
        default: "FH 患者的最佳营养与活动指南。"
      },
      'testing-process': {
        geneticTest: "从咨询到您的 DNA 结果的直观步骤。",
        default: "完成您基因检测的六个直接步骤。"
      },
      'costs-subsidies': {
        cost: "高达 75% 的 MOH 补贴与 MediSave 支付。",
        default: "您需要支付的费用以及补贴如何保持最低开销。"
      },
      'insurance': {
        insurance: "限制令（Moratorium）如何保障您的保险权益。",
        default: "您的法定权利与保险保障准则。"
      }
    },
    ms: {
      'what-is-fh': {
        family: "Bagaimana mewarisi FH menjejaskan keluarga dan anak-anak anda.",
        heartHealth: "Sebab FH menyebabkan kolesterol tinggi dan risiko jantung.",
        default: "Apakah itu FH dan mengapa diagnosis awal amat penting."
      },
      'heart-health': {
        heartHealth: "Melindungi pembuluh darah dan jantung anda daripada plak.",
        medication: "Bagaimana terapi perubatan menghalang penyempitan arteri.",
        family: "Memastikan jantung anda sihat untuk menyokong keluarga anda.",
        default: "Kesan kolesterol tinggi terhadap jantung anda dari semasa ke semasa."
      },
      'genetic-testing': {
        geneticTest: "Ujian DNA 10 minit yang selamat untuk mengesahkan FH.",
        family: "Bagaimana ujian genetik anda membantu melindungi saudara anda.",
        insurance: "Keputusan ujian anda adalah sulit dan selamat sepenuhnya.",
        default: "Mengapa ujian genetik menjadi standard untuk diagnosis FH."
      },
      'cascade-screening': {
        family: "Pelan berasaskan keluarga yang prihatin untuk melindungi orang tersayang.",
        cost: "Saringan keluarga yang disubsidi tinggi di Singapura.",
        default: "Bagaimana saringan lata memastikan keluarga anda selamat."
      },
      'treatment-medication': {
        medication: "Ubat-ubatan yang selamat dan berkesan untuk menurunkan tahap lipid.",
        heartHealth: "Bagaimana rawatan menurunkan risiko kardiovaskular anda ke tahap normal.",
        default: "Terapi perubatan yang sangat berkesan dan disubsidi."
      },
      'healthy-lifestyle': {
        medication: "Bagaimana diet dan senaman menyokong terapi harian anda.",
        heartHealth: "Membina asas gaya hidup untuk keselamatan jantung.",
        default: "Panduan pemakanan dan aktiviti optimum untuk FH."
      },
      'testing-process': {
        geneticTest: "Langkah demi langkah dari kaunseling ke keputusan DNA anda.",
        default: "Enam langkah mudah untuk melengkapkan ujian genetik anda."
      },
      'costs-subsidies': {
        cost: "Subsidi MOH sehingga 75% dan perlindungan MediSave.",
        default: "Bayaran anda dan bagaimana subsidi memastikan kos minimum."
      },
      'insurance': {
        insurance: "Bagaimana Moratorium LIA melindungi perlindungan anda.",
        default: "Hak undang-undang anda dan garis panduan perlindungan insurans."
      }
    },
    ta: {
      'what-is-fh': {
        family: "FH பரம்பரை உங்கள் குடும்பத்தையும் குழந்தைகளையும் எவ்வாறு பாதிக்கிறது.",
        heartHealth: "ஏன் FH அதிக கொழுப்பு மற்றும் இதய அபாயத்தை ஏற்படுத்துகிறது.",
        default: "FH என்றால் என்ன மற்றும் ஆரம்பகால கண்டறிதல் ஏன் முக்கியம்."
      },
      'heart-health': {
        heartHealth: "இரத்த நாளங்கள் மற்றும் இதயத்தை கொழுப்புப் படிவிலிருந்து பாதுகாத்தல்.",
        medication: "மருத்துவ சிகிச்சைகள் எவ்வாறு தமனி குறுகலைத் தடுக்கின்றன.",
        family: "உங்கள் குடும்பத்தை ஆதரிக்க உங்கள் இதயத்தை ஆரோக்கியமாக வைத்திருத்தல்.",
        default: "அதிக கொழுப்பு உங்கள் இதயத்தை எவ்வாறு பாதிக்கிறது."
      },
      'genetic-testing': {
        geneticTest: "FH ஐ உறுதிப்படுத்த பாதுகாப்பான, 10 நிமிட DNA சோதனை.",
        family: "உங்கள் மரபணு சோதனை உறவினர்களைப் பாதுகாக்க எவ்வாறு உதவுகிறது.",
        insurance: "உங்கள் சோதனை முடிவுகள் முற்றிலும் பாதுகாப்பானவை.",
        default: "மரபணு பரிசோதனை ஏன் FH கண்டறிதலின் தரநிலையாகும்."
      },
      'cascade-screening': {
        family: "அன்பானவர்களைப் பாதுகாக்க அன்பான குடும்ப அடிப்படையிலான திட்டம்.",
        cost: "சிங்கப்பூரில் மானிய விலையிலான குடும்பப் பரிசோதனை.",
        default: "குடும்பப் பரிசோதனை எவ்வாறு குடும்பத்தைப் பாதுகாக்கிறது."
      },
      'treatment-medication': {
        medication: "கொழுப்பைக் குறைக்க பாதுகாப்பான, பயனுள்ள மருந்துகள்.",
        heartHealth: "சிகிச்சை உங்கள் இதய நோய் அபாயத்தை எவ்வாறு குறைக்கிறது.",
        default: "மிகவும் பயனுள்ள, மானிய விலையிலான மருத்துவ சிகிச்சைகள்."
      },
      'healthy-lifestyle': {
        medication: "உணவு மற்றும் உடற்பயிற்சி உங்கள் சிகிச்சையை எவ்வாறு ஆதரிக்கிறது.",
        heartHealth: "இதயப் பாதுகாப்பிற்கான வாழ்க்கை முறை அடித்தளம்.",
        default: "FH க்கான உகந்த ஊட்டச்சத்து மற்றும் செயல்பாட்டு வழிகாட்டுதல்கள்."
      },
      'testing-process': {
        geneticTest: "ஆலோசனை முதல் உங்கள் DNA முடிவுகள் வரையிலான எளிய படிகள்.",
        default: "உங்கள் மரபணு சோதனையை முடிக்க ஆறு எளிய படிகள்."
      },
      'costs-subsidies': {
        cost: "75% வரை MOH மானியம் மற்றும் MediSave பாதுகாப்பு.",
        default: "கட்டணங்கள் மற்றும் மானியங்கள் எவ்வாறு செலவைக் குறைக்கின்றன."
      },
      'insurance': {
        insurance: "LIA உடன்படிக்கை உங்கள் காப்பீட்டை எவ்வாறு பாதுகாக்கிறது.",
        default: "உங்கள் சட்டபூர்வமான உரிமைகள் மற்றும் காப்பீட்டு வழிகாட்டுதல்கள்."
      }
    }
  };

  for (const tid of topicIds) {
    output[tid] = {};
    for (const lvl of levels) {
      output[tid][lvl] = {};
      
      const baseTextMap = BASE_TEXTS[language]?.[tid]?.[lvl] ? BASE_TEXTS[language] : BASE_TEXTS['en'];
      const baseContentText = baseTextMap[tid][lvl];
      
      const meta = TOPICS_META[tid];
      const localizedTitles = LOCALIZED_STRINGS[language] || LOCALIZED_STRINGS['en'];
      
      for (const con of concerns) {
        const customOverrideText = CONCERN_OVERRIDES[language]?.[tid]?.[lvl]?.[con] 
          || CONCERN_OVERRIDES['en']?.[tid]?.[lvl]?.[con];

        let finalContent = customOverrideText || baseContentText;

        // Dynamic concern-specific paragraphs based on language, level, and concern
        let concernParagraph = "";
        const mappingLevel = (lvl === 'beginner' || lvl === 'basic') ? 'beginner' : 'advanced';
        
        if (con !== 'default') {
          const langParagraphs = LOCALIZED_CONCERN_PARAGRAPHS[language] || LOCALIZED_CONCERN_PARAGRAPHS['en'];
          concernParagraph = langParagraphs[con]?.[mappingLevel] || "";
        }

        if (concernParagraph) {
          finalContent = (customOverrideText || baseContentText) + " " + concernParagraph;
        } else if (!customOverrideText && con !== 'default') {
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
            else if (language === 'ta') finalContent += " உங்களின் சுயவிவர மரபணு பரிசோதனை முடிவுகளைப் பாதுகாக்க சிங்கப்பூர் LIA விதிகள் வழிவகை செய்கின்றன.";
            else finalContent += " National regulatory guidelines under the LIA moratorium fully protect your right to voluntary predictive testing.";
          }
        }

        // Resolve dynamic subsections
        let finalSubsections = undefined;
        if (tid === 'what-is-fh') {
          let subTitle = "";
          let subText = "";
          
          if (con === 'family') {
            if (language === 'zh') {
              subTitle = "家族守护计划";
              subText = lvl === 'beginner' || lvl === 'basic'
                ? "您的每个直系亲属都有 50% 的几率遗传 FH 基因。通过家系筛查，您的家人可以及早获得低成本保护。"
                : "FH 呈常染色体显性遗传，外显率极高。对先证者进行分子基因检测是实现亲属精确家系筛查（Cascade Screening）的前提。";
            } else if (language === 'ms') {
              subTitle = "Pelan Perlindungan Keluarga";
              subText = lvl === 'beginner' || lvl === 'basic'
                ? "Setiap ahli keluarga terdekat anda mempunyai 50% peluang mewarisi gen FH. Saringan awal melindungi mereka daripada risiko jantung."
                : "FH diwarisi secara dominan autosomal. Mengenal pasti varian patogenik membolehkan saringan lata keluarga dilaksanakan secara kos-efektif.";
            } else if (language === 'ta') {
              subTitle = "குடும்பப் பாதுகாப்புத் திட்டம்";
              subText = lvl === 'beginner' || lvl === 'basic'
                ? "உங்களின் நெருங்கிய உறவினர்களுக்கு 50% FH மரபணு இருக்க வாய்ப்புள்ளது. ஆரம்பக்கால பரிசோதனை அவர்களின் இதயத்தைப் பாதுகாக்கும்."
                : "நெருங்கிய உறவினர்களிடையே 50% மரபுரிமை சாத்தியம் உள்ளதால், மூலக்கூறு கண்டறிதல் குடும்பப் பரிசோதனைக்கு (cascade screening) வழிவகுக்கும்.";
            } else {
              subTitle = "Family Care Program";
              subText = lvl === 'beginner' || lvl === 'basic'
                ? "Each of your first-degree family members has a 50% chance of sharing the FH gene. Screening them early keeps their hearts safe."
                : "FH is an autosomal dominant condition with high penetrance. Molecular confirmation in index cases facilitates predictive genetic screening.";
            }
          } else if (con === 'cost') {
            if (language === 'zh') {
              subTitle = "财务补贴支持";
              subText = lvl === 'beginner' || lvl === 'basic'
                ? "新加坡公民享有高达 75% 的政府补贴，剩余款项可完全使用 MediSave 支付，现金负担接近为零。"
                : "新加坡政府通过卫生部补贴框架提供 50% 至 75% 资助，自付额在 CDMS 计划下支持 MediSave 支付。";
            } else if (language === 'ms') {
              subTitle = "Subsidi & Pembiayaan Kewangan";
              subText = lvl === 'beginner' || lvl === 'basic'
                ? "Warganegara Singapura layak mendapat subsidi sehingga 75% daripada MOH, dan baki kos boleh dibayar sepenuhnya menggunakan MediSave."
                : "MOH menyediakan subsidi 50% hingga 75% bagi ujian genetik. Baki kos boleh dituntut di bawah CDMS menggunakan MediSave.";
            } else if (language === 'ta') {
              subTitle = "நிதி உதவிகள் & மானியங்கள்";
              subText = lvl === 'beginner' || lvl === 'basic'
                ? "தகுதியுள்ள சிங்கப்பூர் குடிமக்களுக்கு 75% வரை அரசு மானியம் வழங்கப்படுகிறது, மீதமுள்ள தொகையை MediSave மூலம் செலுத்தலாம்."
                : "MOH 50% முதல் 75% வரை மானியம் வழங்குகிறது. மீதமுள்ள தொகையை CDMS திட்டத்தின் கீழ் MediSave மூலம் செலுத்தலாம்.";
            } else {
              subTitle = "Financial Support";
              subText = lvl === 'beginner' || lvl === 'basic'
                ? "Eligible citizens receive up to 75% MOH subsidies, with the remainder fully claimable under MediSave for minimal cash costs."
                : "Financial subventions from MOH cover 50% to 75% of genetic testing costs, with residual co-payment fully claimable under CDMS via MediSave.";
            }
          } else {
            if (language === 'zh') {
              subTitle = "常见提问";
              subText = "FH 完全由遗传决定。这并不是您的错，通过早期的精准药物介入可以完全消除心血管风险。";
            } else if (language === 'ms') {
              subTitle = "Soalan Lazim";
              subText = "FH diwarisi secara genetik. Ini bukan salah anda, dan risiko kardiovaskular dapat dikurangkan ke tahap normal dengan ubat awal.";
            } else if (language === 'ta') {
              subTitle = "அடிக்கடி கேட்கப்படும் கேள்விகள்";
              subText = "FH மரபணு சார்ந்தது, எனவே ஆரம்ப கால சிகிச்சைகள் மூலம் இதய அடைப்பைத் தடுக்கலாம்.";
            } else {
              subTitle = "Common Questions";
              subText = "FH is genetic. It is not your fault, and cardiovascular risk can be completely normalized with early medical support.";
            }
          }

          finalSubsections = [{ title: subTitle, text: subText }];
        }

        // Resolve dynamic steps
        let finalSteps = undefined;
        if (tid === 'testing-process') {
          let s1Title = "";
          let s1Desc = "";
          let s2Title = "";
          let s2Desc = "";
          let s3Title = "";
          let s3Desc = "";

          if (con === 'cost') {
            if (language === 'zh') {
              s1Title = "补贴前咨询"; s1Desc = "30分钟咨询，政府高额补贴";
              s2Title = "DNA 抽血检测"; s2Desc = "10分钟，支持 MediSave 支付";
              s3Title = "低成本管理方案"; s3Desc = "4周出结果，量身定制财务援助";
            } else if (language === 'ms') {
              s1Title = "Kaunseling Disubsidi"; s1Desc = "Rundingan 30 minit dengan subsidi MOH";
              s2Title = "Sampel Darah DNA"; s2Desc = "10 minit, bayar guna MediSave";
              s3Title = "Pelan Kos Mampu Milik"; s3Desc = "Keputusan siap 4 minggu, bantuan kewangan sedia ada";
            } else if (language === 'ta') {
              s1Title = "மானிய ஆலோசனை"; s1Desc = "அரசு மானியத்துடன் கூடிய 30 நிமிட ஆலோசனை";
              s2Title = "இரத்தப் பரிசோதனை"; s2Desc = "10 நிமிடம், MediSave மூலம் செலுத்தலாம்";
              s3Title = "குறைந்த செலவு திட்டம்"; s3Desc = "4 வாரங்களில் முடிவுகள், நிதி உதவிகள்";
            } else {
              s1Title = "Subsidised Counselling"; s1Desc = "30-min talk with high MOH subsidies";
              s2Title = "DNA Blood Draw"; s2Desc = "10-min outpatient draw covered by MediSave";
              s3Title = "Low-Cost Care Plan"; s3Desc = "Results in 4 weeks, financial aid aligned";
            }
          } else if (con === 'family') {
            if (language === 'zh') {
              s1Title = "家系史评估"; s1Desc = "30分钟，建立三代家系图谱";
              s2Title = "精准突变检测"; s2Desc = "10分钟抽血，寻找特异致病基因";
              s3Title = "家系筛查规划"; s3Desc = "4周出结果，协助亲属开展筛查";
            } else if (language === 'ms') {
              s1Title = "Penilaian Sejarah Keluarga"; s1Desc = "Kaunseling 30 minit membina silsilah keluarga";
              s2Title = "Ujian Genetik DNA"; s2Desc = "Sampel darah 10 minit mencari mutasi khusus";
              s3Title = "Pelan Saringan Keluarga"; s3Desc = "Keputusan siap 4 minggu, bimbing saringan keluarga";
            } else if (language === 'ta') {
              s1Title = "குடும்ப மரபுவழி ஆலோசனை"; s1Desc = "30 நிமிடத்தில் குடும்பப் பின்னணி ஆய்வு";
              s2Title = "மரபணு பரிசோதனை"; s2Desc = "10 நிமிடம், இரத்த மாதிரி சேகரிப்பு";
              s3Title = "குடும்பப் பரிசோதனைத் திட்டம்"; s3Desc = "4 வாரங்களில் முடிவுகள், உறவினர்களுக்கான பரிசோதனைத் திட்டம்";
            } else {
              s1Title = "Family History Pedigree"; s1Desc = "30-min counselling mapping a 3-generation pedigree";
              s2Title = "Targeted DNA Test"; s2Desc = "10-min blood draw to identify specific mutations";
              s3Title = "Family Cascade Plan"; s3Desc = "Results in 4 weeks, guiding relatives to screening";
            }
          } else {
            if (language === 'zh') {
              s1Title = "检测前咨询"; s1Desc = "30分钟";
              s2Title = "DNA 抽血"; s2Desc = "10分钟";
              s3Title = "结果评估"; s3Desc = "4周";
            } else if (language === 'ms') {
              s1Title = "Kaunseling Pra-ujian"; s1Desc = "30 min";
              s2Title = "Ujian Darah DNA"; s2Desc = "10 min";
              s3Title = "Tinjauan Keputusan"; s3Desc = "4 minggu";
            } else if (language === 'ta') {
              s1Title = "சோதனைக்கு முந்தைய ஆலோசனை"; s1Desc = "30 நிமிடம்";
              s2Title = "இரத்தப் பரிசோதனை"; s2Desc = "10 நிமிடம்";
              s3Title = "முடிவுகள் ஆய்வு"; s3Desc = "4 வாரங்கள்";
            } else {
              s1Title = "Pre-test Counselling"; s1Desc = "30 min";
              s2Title = "DNA Blood Draw"; s2Desc = "10 min";
              s3Title = "Results Review"; s3Desc = "4 weeks";
            }
          }

          finalSteps = [
            { num: 1, title: s1Title, description: s1Desc },
            { num: 2, title: s2Title, description: s2Desc },
            { num: 3, title: s3Title, description: s3Desc }
          ];
        }

        // Get dynamic short summary and key takeaway
        const langShortSummaries = localShortSummaries[language] || localShortSummaries['en'];
        const topicShortSummaries = langShortSummaries[tid] || { default: localizedTitles[meta.titleKey] };
        const finalShortSummary = topicShortSummaries[con] || topicShortSummaries['default'] || localizedTitles[meta.titleKey];

        output[tid][lvl][con] = {
          title: localizedTitles[meta.titleKey] || meta.titleKey,
          shortSummary: finalShortSummary,
          keyTakeaway: localizedTitles[meta.keyTakeawayKey] || meta.keyTakeawayKey,
          content: finalContent,
          readingTime: meta.readTime,
          subsections: finalSubsections,
          steps: finalSteps
        };
      }
    }
  }

  return output;
};

// Map concerns to primary concern key on a topic-by-topic basis to ensure extremely precise personalization
const resolveConcernForTopic = (topicId: string, concerns: string[]): ConcernKey => {
  if (!concerns || concerns.length === 0) return 'default';
  
  // Topic-specific concern preferences:
  // If the user selected a concern that directly relates to this topic, prioritize it!
  const topicConcernMap: Record<string, string[]> = {
    'what-is-fh': ['concern-[#00a859]', 'concern-diagnosis', 'concern-family'],
    'heart-health': ['concern-[#00a859]', 'concern-diagnosis'],
    'genetic-testing': ['concern-test', 'concern-diagnosis'],
    'cascade-screening': ['concern-family'],
    'treatment-medication': ['concern-meds', 'concern-[#00a859]'],
    'healthy-lifestyle': ['concern-meds', 'concern-[#00a859]'],
    'testing-process': ['concern-test', 'concern-diagnosis'],
    'costs-subsidies': ['concern-cost'],
    'insurance': ['concern-insurance']
  };

  const relevantSelected = concerns.find(c => topicConcernMap[topicId]?.includes(c));
  const chosenConcern = relevantSelected || concerns[0];

  if (chosenConcern === 'concern-family') return 'family';
  if (chosenConcern === 'concern-test') return 'geneticTest';
  if (chosenConcern === 'concern-cost') return 'cost';
  if (chosenConcern === 'concern-insurance') return 'insurance';
  if (chosenConcern === 'concern-[#00a859]') return 'heartHealth';
  if (chosenConcern === 'concern-meds') return 'medication';
  if (chosenConcern === 'concern-diagnosis') return 'results';
  
  return 'default';
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

  // 2. Resolve concern specifically tailored for this topic
  const resolvedConcern = resolveConcernForTopic(id, onboardingConcerns);

  // 3. Build dynamic guide content dictionary for the requested language
  const guideContent = buildGuideContent(language);

  // 4. Resolve exact variant using requested logic
  const resolvedVariant =
    guideContent[id]?.[knowledgeLevel]?.[resolvedConcern]
    ?? guideContent[id]?.[knowledgeLevel]?.default
    ?? personalisedFallbackContent[id]?.[knowledgeLevel];

  // Temporary development-only debug console log to verify answer mapping
  console.log(`[FH PERSONALIZATION DEBUG]:
  - knowledgeLevel: "${onboardingFamiliarity}" (mapped: "${knowledgeLevel}")
  - selectedTopics: "${id}"
  - selectedConcerns: ${JSON.stringify(onboardingConcerns)}
  - resolvedConcernVariant: "${resolvedConcern}"
  - selected content variant key: "guideContent['${id}']['${knowledgeLevel}']['${resolvedConcern}']"`);

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
