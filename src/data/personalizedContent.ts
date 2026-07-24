import { Language } from './translations';

export interface PersonalizedGuide {
  id: string;
  title: string;
  shortSummary: string;
  readingTime: string;
  iconName: string;
  keyTakeaway: string;
  content: string; // Used as the 1 short introduction sentence
  visualItems?: { icon: string; label: string; text: string }[];
}

export type KnowledgeLevel = 'new' | 'little' | 'research' | 'advanced';
export type KnowledgeLevelKey = 'beginner' | 'basic' | 'researched' | 'advanced';

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

export interface VisualItem {
  icon: string;
  label: string;
  text: string;
}

export const VISUAL_CARDS_DB: Record<Language, Record<string, {
  intro: { beginner: string; advanced: string };
  points: {
    beginner: VisualItem[];
    advanced: VisualItem[];
  };
}>> = {
  en: {
    'what-is-fh': {
      intro: {
        beginner: "FH is a common inherited condition causing high cholesterol from birth.",
        advanced: "FH is a highly prevalent autosomal dominant lipid disorder present from birth."
      },
      points: {
        beginner: [
          { icon: "Dna", label: "Inherited", text: "Passed down through family genes, not diet or lifestyle." },
          { icon: "TrendingUp", label: "High LDL", text: "Extremely elevated 'bad' cholesterol levels from day one." },
          { icon: "ShieldCheck", label: "Treatable", text: "Highly manageable with early medical support and care." }
        ],
        advanced: [
          { icon: "Dna", label: "Genetic Mutation", text: "Autosomal dominant variant in LDLR, APOB, or PCSK9 genes." },
          { icon: "TrendingUp", label: "Reduced Clearance", text: "Impaired hepatic clearance severely elevates circulating LDL-C." },
          { icon: "ShieldCheck", label: "Pharmacotherapy", text: "Targeted clinical treatments can fully normalize cardiovascular risk." }
        ]
      }
    },
    'heart-health': {
      intro: {
        beginner: "High cholesterol can build up in blood vessels silently over time.",
        advanced: "Persistent elevated LDL-C drives accelerated atherogenesis in FH patients."
      },
      points: {
        beginner: [
          { icon: "Clock", label: "Silent Plaque", text: "Cholesterol forms hard deposits in arteries without symptoms." },
          { icon: "AlertTriangle", label: "Narrowing", text: "Over time, plaque buildup restricts vital blood flow." },
          { icon: "HeartPulse", label: "Prevention", text: "Early treatment keeps blood vessels flexible and healthy." }
        ],
        advanced: [
          { icon: "Clock", label: "Atherogenesis", text: "Lifelong ApoB-containing lipoprotein accumulation in arterial walls." },
          { icon: "AlertTriangle", label: "Lumen Reduction", text: "Fibrous plaques narrow arteries, increasing premature coronary risk." },
          { icon: "HeartPulse", label: "Risk Management", text: "Aggressive lipid lowering resets the lifetime cardiovascular curve." }
        ]
      }
    },
    'genetic-testing': {
      intro: {
        beginner: "A genetic test is a safe, simple tool that confirms FH with 100% certainty.",
        advanced: "Molecular genetic testing represents the diagnostic gold standard for FH."
      },
      points: {
        beginner: [
          { icon: "Activity", label: "Simple Test", text: "A quick, safe outpatient blood draw or saliva sample." },
          { icon: "Search", label: "Precise DNA", text: "Scans LDLR, APOB, or PCSK9 genes to find the exact variant." },
          { icon: "ClipboardList", label: "Clear Guidance", text: "Results help your doctor design a personalized care plan." }
        ],
        advanced: [
          { icon: "Activity", label: "Molecular Screening", text: "Targeted next-generation sequencing (NGS) of FH-linked genes." },
          { icon: "Search", label: "Confirm Genotype", text: "Pinpoints pathogenic variants to resolve clinical ambiguity." },
          { icon: "ClipboardList", label: "Cascade Marker", text: "Identifies the specific mutation needed for family-wide screening." }
        ]
      }
    },
    'cascade-screening': {
      intro: {
        beginner: "Cascade screening is a proactive program to protect your immediate family.",
        advanced: "Cascade screening is a family contact-tracing strategy based on the index case."
      },
      points: {
        beginner: [
          { icon: "Users", label: "50% Risk", text: "First-degree relatives share a 50% chance of inheriting FH." },
          { icon: "GitFork", label: "Family Tree", text: "Finding your variant serves as a marker to test loved ones." },
          { icon: "ShieldCheck", label: "Early Action", text: "Helps family access life-saving preventive care early." }
        ],
        advanced: [
          { icon: "Users", label: "Prior Probability", text: "First-degree relatives have a 50% prior probability of inheritance." },
          { icon: "GitFork", label: "Targeted Testing", text: "Utilizes the index patient's variant as an exact genetic marker." },
          { icon: "ShieldCheck", label: "Cost-Effective", text: "Globally recognized as a highly cost-effective preventive model." }
        ]
      }
    },
    'treatment-medication': {
      intro: {
        beginner: "Because FH is genetic, diet alone is not enough; safe medications are essential.",
        advanced: "Pharmacological intervention is mandatory to address genetically driven FH lipids."
      },
      points: {
        beginner: [
          { icon: "Pill", label: "Safe Statins", text: "Well-studied daily pills that help the liver clear bad cholesterol." },
          { icon: "RefreshCw", label: "LDL Clearance", text: "Boosts natural receptors to pull LDL out of your bloodstream." },
          { icon: "TrendingDown", label: "Risk Reset", text: "Brings cardiovascular risks back down to standard, healthy levels." }
        ],
        advanced: [
          { icon: "Pill", label: "HMG-CoA Blockers", text: "High-intensity statins (e.g. Rosuvastatin) inhibit cholesterol synthesis." },
          { icon: "RefreshCw", label: "Up-regulate LDLR", text: "Upregulates liver LDL receptors to clear circulating LDL-C." },
          { icon: "TrendingDown", label: "Combination Care", text: "Frequently combined with Ezetimibe or PCSK9 inhibitors for targets." }
        ]
      }
    },
    'healthy-lifestyle': {
      intro: {
        beginner: "A healthy lifestyle forms a vital foundation to support your medical treatment.",
        advanced: "Therapeutic lifestyle changes are critical adjuncts to FH pharmacotherapy."
      },
      points: {
        beginner: [
          { icon: "Apple", label: "More Fibre", text: "Choose oats, barley, and beans to block cholesterol absorption." },
          { icon: "Ban", label: "Limit Fats", text: "Reduce saturated fats like butter, palm oil, and fatty meats." },
          { icon: "Activity", label: "Stay Active", text: "Aim for 30 minutes of brisk walking daily to strengthen your heart." }
        ],
        advanced: [
          { icon: "Apple", label: "Fibre & sterols", text: "Water-soluble fibre actively blocks intestinal absorption." },
          { icon: "Ban", label: "Saturated Fats", text: "Saturated fatty acids downregulate hepatic LDL receptor activity." },
          { icon: "Activity", label: "Endothelial Health", text: "Regular aerobic exercise optimizes endothelial nitric oxide activity." }
        ]
      }
    },
    'testing-process': {
      intro: {
        beginner: "The testing journey is streamlined and fits easily into your normal schedule.",
        advanced: "The clinical diagnostic pathway is structured to maximize patient comfort."
      },
      points: {
        beginner: [
          { icon: "MessageSquare", label: "Counselling", text: "A 30-minute friendly talk to map history and protect privacy." },
          { icon: "FlaskConical", label: "Blood Draw", text: "A quick 10-minute outpatient blood sample with no fasting required." },
          { icon: "Calendar", label: "Results Visit", text: "Meet your care team in 4 to 6 weeks to discuss customized steps." }
        ],
        advanced: [
          { icon: "MessageSquare", label: "Pre-Test Consultation", text: "Detailed genetic counseling to construct a 3-generation pedigree." },
          { icon: "FlaskConical", label: "Outpatient Sample", text: "No-fasting blood or saliva draw for high-fidelity molecular NGS." },
          { icon: "Calendar", label: "Post-Test Review", text: "Comprehensive variant interpretation and clinical risk stratification." }
        ]
      }
    },
    'costs-subsidies': {
      intro: {
        beginner: "Healthcare in Singapore is heavily subsidized to ensure testing is highly affordable.",
        advanced: "Singapore's healthcare financing framework minimizes out-of-pocket costs."
      },
      points: {
        beginner: [
          { icon: "Building2", label: "MOH Subsidy", text: "Eligible citizens receive up to 75% subsidy for genetic tests." },
          { icon: "Building2", label: "MediSave Use", text: "Remaining out-of-pocket balance is fully coverable by MediSave." },
          { icon: "Coins", label: "Zero Cash", text: "Most patients pay little to no cash out-of-pocket." }
        ],
        advanced: [
          { icon: "Building2", label: "Public Subvention", text: "MOH provides 50% to 75% subvention for eligible citizens." },
          { icon: "Building2", label: "CDMS MediSave", text: "Residual balance is claimable under Chronic Disease Management Scheme." },
          { icon: "Coins", label: "Financial Safeguards", text: "CHAS Blue and Medifund provide extra protection for low-income patients." }
        ]
      }
    },
    'insurance': {
      intro: {
        beginner: "National regulatory safeguards in Singapore protect your genetic privacy.",
        advanced: "Regulatory frameworks protect consumers from genetic discrimination in Singapore."
      },
      points: {
        beginner: [
          { icon: "ShieldCheck", label: "Moratorium", text: "LIA rules forbid insurers from asking for voluntary genetic tests." },
          { icon: "Lock", label: "Active Policies", text: "Existing life and health policies cannot be canceled or modified." },
          { icon: "CheckCircle", label: "Standard Cover", text: "You remain fully eligible for standard coverage under standard terms." }
        ],
        advanced: [
          { icon: "ShieldCheck", label: "LIA Agreement", text: "Moratorium restricts use of voluntary predictive genetic tests in underwriting." },
          { icon: "Lock", label: "Inforce Protections", text: "Active standard policies cannot be re-priced or cancelled based on tests." },
          { icon: "CheckCircle", label: "Underwriting Limits", text: "Guarantees full access to standard insurance up to specified coverage caps." }
        ]
      }
    }
  },
  ms: {
    'what-is-fh': {
      intro: {
        beginner: "FH ialah keadaan warisan biasa yang menyebabkan kolesterol tinggi sejak lahir.",
        advanced: "FH ialah gangguan lipid dominan autosomal berprevalens tinggi sejak lahir."
      },
      points: {
        beginner: [
          { icon: "Dna", label: "Diwarisi", text: "Diwarisi melalui genetik keluarga, bukan disebabkan oleh diet atau gaya hidup." },
          { icon: "TrendingUp", label: "LDL Tinggi", text: "Tahap kolesterol 'buruk' yang sangat tinggi sejak hari pertama." },
          { icon: "ShieldCheck", label: "Boleh Dirawat", text: "Sangat mudah diuruskan dengan sokongan dan rawatan perubatan awal." }
        ],
        advanced: [
          { icon: "Dna", label: "Mutasi Genetik", text: "Varian dominan autosomal pada gen LDLR, APOB, atau PCSK9." },
          { icon: "TrendingUp", label: "Kurang Pembersihan", text: "Pembersihan hepatik terjejas teruk meningkatkan LDL-C dalam darah." },
          { icon: "ShieldCheck", label: "Farmakoterapi", text: "Rawatan klinikal khusus boleh menormalkan sepenuhnya risiko jantung." }
        ]
      }
    },
    'heart-health': {
      intro: {
        beginner: "Kolesterol tinggi boleh terkumpul dalam saluran darah secara senyap dari masa ke masa.",
        advanced: "Tahap LDL-C tinggi yang berterusan mempercepatkan aterogenesis dalam pesakit FH."
      },
      points: {
        beginner: [
          { icon: "Clock", label: "Plak Senyap", text: "Kolesterol membentuk mendapan keras dalam arteri tanpa sebarang gejala." },
          { icon: "AlertTriangle", label: "Penyempitan", text: "Lama kelamaan, plak mengehadkan aliran darah penting ke jantung." },
          { icon: "HeartPulse", label: "Pencegahan", text: "Rawatan awal memastikan saluran darah kekal fleksibel dan sihat." }
        ],
        advanced: [
          { icon: "Clock", label: "Aterogenesis", text: "Pengumpulan lipoprotein ApoB seumur hidup di dinding arteri." },
          { icon: "AlertTriangle", label: "Kurang Lumen", text: "Plak fibros menyempitkan arteri, meningkatkan risiko koronari awal." },
          { icon: "HeartPulse", label: "Urus Risiko", text: "Terapi agresif menurunkan pendedahan kolesterol seumur hidup." }
        ]
      }
    },
    'genetic-testing': {
      intro: {
        beginner: "Ujian genetik adalah alat yang selamat dan mudah untuk mengesahkan FH dengan kepastian 100%.",
        advanced: "Ujian genetik molekul mewakili piawaian emas diagnostik untuk FH."
      },
      points: {
        beginner: [
          { icon: "Activity", label: "Ujian Mudah", text: "Pengambilan sampel darah atau air liur pesakit luar yang cepat dan selamat." },
          { icon: "Search", label: "DNA Tepat", text: "Mengimbas gen LDLR, APOB, atau PCSK9 untuk mencari variasi gen." },
          { icon: "ClipboardList", label: "Panduan Jelas", text: "Keputusan membantu doktor merancang pelan rawatan diperibadikan." }
        ],
        advanced: [
          { icon: "Activity", label: "Saringan Molekul", text: "Penjenisan generasi seterusnya (NGS) sasaran gen berkait FH." },
          { icon: "Search", label: "Sahkan Genotip", text: "Mengenal pasti varian patogenik untuk menyelesaikan keraguan klinikal." },
          { icon: "ClipboardList", label: "Penanda Lata", text: "Mengenal pasti mutasi khusus yang diperlukan untuk saringan keluarga." }
        ]
      }
    },
    'cascade-screening': {
      intro: {
        beginner: "Saringan lata ialah program proaktif untuk melindungi keluarga terdekat anda.",
        advanced: "Saringan lata ialah strategi penjejakan kontak genetik berasaskan kes indeks."
      },
      points: {
        beginner: [
          { icon: "Users", label: "Risiko 50%", text: "Ahli keluarga darjah pertama mempunyai peluang 50% mewarisi FH." },
          { icon: "GitFork", label: "Salasilah Keluarga", text: "Menemui gen anda membantu menyaring orang tersayang dengan mudah." },
          { icon: "ShieldCheck", label: "Tindakan Awal", text: "Membantu keluarga mendapatkan rawatan pencegahan awal." }
        ],
        advanced: [
          { icon: "Users", label: "Kebarangkalian", text: "Ahli keluarga darjah pertama mempunyai risiko 50% mewarisi gen." },
          { icon: "GitFork", label: "Ujian Sasaran", text: "Menggunakan varian pesakit indeks sebagai penanda genetik tepat." },
          { icon: "ShieldCheck", label: "Kos Efektif", text: "Diiktiraf di seluruh dunia sebagai model pencegahan kos-efektif." }
        ]
      }
    },
    'treatment-medication': {
      intro: {
        beginner: "Oleh kerana FH adalah genetik, diet sahaja tidak mencukupi; ubat harian adalah penting.",
        advanced: "Intervensi farmakoterapi adalah wajib untuk menguruskan lipid FH genetik."
      },
      points: {
        beginner: [
          { icon: "Pill", label: "Statin Selamat", text: "Pil harian yang dikaji luas untuk membantu hati membuang kolesterol." },
          { icon: "RefreshCw", label: "Pembersihan LDL", text: "Meningkatkan reseptor semula jadi untuk menyerap LDL daripada darah." },
          { icon: "TrendingDown", label: "Risiko Normal", text: "Mengembalikan risiko serangan jantung ke tahap biasa yang sihat." }
        ],
        advanced: [
          { icon: "Pill", label: "Penghalang HMG-CoA", text: "Statin berintensiti tinggi menghalang sintesis kolesterol dalam hati." },
          { icon: "RefreshCw", label: "Upregulasi LDLR", text: "Meningkatkan reseptor LDL hepatik untuk menapis kolesterol LDL-C." },
          { icon: "TrendingDown", label: "Terapi Kombinasi", text: "Sering digabungkan dengan Ezetimibe atau perencat PCSK9." }
        ]
      }
    },
    'healthy-lifestyle': {
      intro: {
        beginner: "Gaya hidup sihat menjadi asas penting untuk menyokong keberkesanan rawatan ubat anda.",
        advanced: "Perubahan gaya hidup terapeutik adalah pembantu penting kepada farmakoterapi."
      },
      points: {
        beginner: [
          { icon: "Apple", label: "Lebih Serat", text: "Pilih oat, barli, dan kekacang untuk menyekat penyerapan kolesterol." },
          { icon: "Ban", label: "Had Lemak", text: "Kurangkan lemak tepu seperti mentega, minyak sawit, dan daging berlemak." },
          { icon: "Activity", label: "Kekal Aktif", text: "Jalan laju selama 30 minit setiap hari untuk menguatkan jantung." }
        ],
        advanced: [
          { icon: "Apple", label: "Serat Larut", text: "Serat larut air menyekat penyerapan kolesterol dalam usus." },
          { icon: "Ban", label: "Lemak Tepu", text: "Asid lemak tepu mengurangkan aktiviti reseptor LDL hati." },
          { icon: "Activity", label: "Kesihatan Endotelial", text: "Senaman aerobik kerap mengoptimumkan aktiviti nitrik oksida endotelial." }
        ]
      }
    },
    'testing-process': {
      intro: {
        beginner: "Perjalanan ujian diselaraskan dengan lancar untuk dipadankan dengan jadual harian anda.",
        advanced: "Laluan diagnostik klinikal distrukturkan untuk memaksimumkan keselesaan pesakit."
      },
      points: {
        beginner: [
          { icon: "MessageSquare", label: "Kaunseling", text: "Sesi mesra 30 minit untuk menilai sejarah keluarga dan privasi." },
          { icon: "FlaskConical", label: "Ambil Darah", text: "Sampel darah pesakit luar cepat 10 minit tanpa perlu berpuasa." },
          { icon: "Calendar", label: "Sesi Keputusan", text: "Bincang langkah rawatan selepas 4-6 minggu dengan doktor." }
        ],
        advanced: [
          { icon: "MessageSquare", label: "Rundingan Pra-Ujian", text: "Kaunseling genetik terperinci membina silsilah keluarga 3 generasi." },
          { icon: "FlaskConical", label: "Sampel Darah", text: "Sampel darah tanpa puasa diambil untuk ujian NGS molekul." },
          { icon: "Calendar", label: "Tinjauan Susulan", text: "Tafsiran keputusan varian dan stratifikasi risiko klinikal penuh." }
        ]
      }
    },
    'costs-subsidies': {
      intro: {
        beginner: "Penjagaan kesihatan di Singapura sangat disubsidi untuk memastikan ujian mampu dimiliki.",
        advanced: "Rangka kerja pembiayaan kesihatan Singapura meminimumkan bayaran tunai."
      },
      points: {
        beginner: [
          { icon: "Building2", label: "Subsidi MOH", text: "Warganegara layak menerima subsidi sehingga 75% untuk ujian genetik." },
          { icon: "Building2", label: "Guna MediSave", text: "Baki kos rawatan boleh dibayar sepenuhnya menggunakan MediSave." },
          { icon: "Coins", label: "Tunai Minimum", text: "Kebanyakan pesakit membayar sedikit atau sifar wang tunai." }
        ],
        advanced: [
          { icon: "Building2", label: "Subsidi Awam", text: "MOH menyediakan subsidi 50% hingga 75% bagi pesakit yang layak." },
          { icon: "Building2", label: "CDMS MediSave", text: "Baki boleh dituntut di bawah skim pengurusan penyakit kronik." },
          { icon: "Coins", label: "Bantuan Finansial", text: "CHAS Blue dan Medifund menjamin perlindungan kewangan tambahan." }
        ]
      }
    },
    'insurance': {
      intro: {
        beginner: "Garis panduan perlindungan kebangsaan di Singapura melindungi privasi genetik anda.",
        advanced: "Rangka kerja kawal selia melindungi pengguna daripada diskriminasi insurans."
      },
      points: {
        beginner: [
          { icon: "ShieldCheck", label: "Moratorium", text: "Peraturan LIA melarang syarikat insurans meminta keputusan ujian sukarela." },
          { icon: "Lock", label: "Polisi Aktif", text: "Insurans hayat dan kesihatan sedia ada tidak boleh dibatalkan atau diubah." },
          { icon: "CheckCircle", label: "Saringan Standard", text: "Anda kekal layak sepenuhnya mendapat perlindungan insurans biasa." }
        ],
        advanced: [
          { icon: "ShieldCheck", label: "Persetujuan LIA", text: "Moratorium mengehadkan ujian genetik sukarela daripada digunakan untuk dinilai." },
          { icon: "Lock", label: "Polisi Sedia Ada", text: "Polisi inforce standard tidak boleh dinilai semula atau dinaikkan premium." },
          { icon: "CheckCircle", label: "Had Perlindungan", text: "Menjamin akses perlindungan standard sehingga had polisi tertentu." }
        ]
      }
    }
  },
  zh: {
    'what-is-fh': {
      intro: {
        beginner: "FH 是一种常见的遗传性健康状况，导致患者自出生起胆固醇水平就处于高位。",
        advanced: "FH 是一种高外显率的常染色体显性遗传脂质代谢障碍。"
      },
      points: {
        beginner: [
          { icon: "Dna", label: "家族遗传", text: "由家族基因引起，而非饮食或生活方式造成。" },
          { icon: "TrendingUp", label: "超高 LDL", text: "自出生起，血液中的“坏”胆固醇水平便异常升高。" },
          { icon: "ShieldCheck", label: "高度可控", text: "及早通过科学的医学干优可安全、有效地控制指标。" }
        ],
        advanced: [
          { icon: "Dna", label: "致病突变", text: "LDLR、APOB 或 PCSK9 基因的常染色体显性突变。" },
          { icon: "TrendingUp", label: "清除受损", text: "肝脏清除循环低密度脂蛋白胆固醇（LDL-C）的能力严重受阻。" },
          { icon: "ShieldCheck", label: "靶向降脂", text: "通过强化药物干预可以使终身心血管风险回归标准水平。" }
        ]
      }
    },
    'heart-health': {
      intro: {
        beginner: "过高的胆固醇会日复一日地在您的血管壁内默默积聚，逐渐形成动脉粥样硬化斑块。",
        advanced: "FH 患者血清中持续升高的 LDL-C 是驱动早发性动脉粥样硬化病变的核心因素。"
      },
      points: {
        beginner: [
          { icon: "Clock", label: "无声斑块", text: "胆固醇在动脉内壁默默沉积，起初并无任何明显症状。" },
          { icon: "AlertTriangle", label: "血管变窄", text: "随时间推移，斑块积聚会限制血液顺畅流动。" },
          { icon: "HeartPulse", label: "主动预防", text: "及早治疗可保持血管弹性，从根本上保护心脏健康。" }
        ],
        advanced: [
          { icon: "Clock", label: "内皮下沉积", text: "终身暴露于高脂血症导致含有 ApoB 的脂蛋白大量浸润沉积。" },
          { icon: "AlertTriangle", label: "内膜炎症", text: "巨噬细胞转化为泡沫细胞，加速形成不稳定的冠脉斑块。" },
          { icon: "HeartPulse", label: "风险对齐", text: "及早降脂可最大程度降低累积脂质暴露（“LDL-胆固醇年”）。" }
        ]
      }
    },
    'genetic-testing': {
      intro: {
        beginner: "基因检测是一项安全、便捷的临床诊断工具，能 100% 确凿地证实 FH。",
        advanced: "分子遗传学检测构成了 FH 诊断与危险分层的基础基石。"
      },
      points: {
        beginner: [
          { icon: "Activity", label: "检测简便", text: "门诊性质的快速抽血或唾液采样，10分钟内即可完成。" },
          { icon: "Search", label: "精准 DNA", text: "深度筛查 LDLR、APOB 或 PCSK9 基因以找出致病变异。" },
          { icon: "ClipboardList", label: "明确指导", text: "检测报告能协助医疗团队为您量身定制个人保护方案。" }
        ],
        advanced: [
          { icon: "Activity", label: "分子筛查", text: "主要采用二代测序 (NGS) 技术进行多基因靶向深度测序。" },
          { icon: "Search", label: "确证基因型", text: "厘清临床拟诊中存在的灰色地带，获取确定性的基因确诊。" },
          { icon: "ClipboardList", label: "家系标记", text: "为后续亲属开展家系筛查 (Cascade Screening) 奠定先证者标记。" }
        ]
      }
    },
    'cascade-screening': {
      intro: {
        beginner: "家系筛查是一项关爱且主动的预防项目，旨在保护您的直系亲属。",
        advanced: "家系筛查 (Cascade Screening) 是一种行之有效的流行病学“接触者追踪”机制。"
      },
      points: {
        beginner: [
          { icon: "Users", label: "50% 遗传概率", text: "您的父母、兄弟姐妹和子女均有 50% 的几率遗传该基因。" },
          { icon: "GitFork", label: "家系传递", text: "确立您的基因变异后，即可作为家族成员的专属定位标记。" },
          { icon: "ShieldCheck", label: "及早行动", text: "协助家人在血管受到伤害前获得高额补贴的早期干预。" }
        ],
        advanced: [
          { icon: "Users", label: "先验概率", text: "依托常染色体显性遗传规律，一级亲属先验遗传概率高达 50%。" },
          { icon: "GitFork", label: "靶向突变验证", text: "以先证者为中心，快速并顺畅地引导家属完成基因验证。" },
          { icon: "ShieldCheck", label: "卫生经济学", text: "在卫生经济学上被全球公认为是最具成本效益的预防医学范式。" }
        ]
      }
    },
    'treatment-medication': {
      intro: {
        beginner: "由于 FH 是由基因引起的，单纯改变饮食是不够的，安全、长期的药物治疗不可或缺。",
        advanced: "在 FH 的治疗中，积极、长期的药理学降脂是强制性的临床要求。"
      },
      points: {
        beginner: [
          { icon: "Pill", label: "安全他汀", text: "经历数十年广泛研究的日服药物，可有效辅助肝脏清脂。" },
          { icon: "RefreshCw", label: "清除 LDL", text: "激发肝脏表面受体数量，拉网式清除循环 LDL。" },
          { icon: "TrendingDown", label: "阻断风险", text: "显著削减累积的血管脂质暴露总量，使心脏风险回归正常。" }
        ],
        advanced: [
          { icon: "Pill", label: "强化他汀", text: "一线方案为高强度他汀（如瑞舒伐他汀）抑制胆固醇合成。" },
          { icon: "RefreshCw", label: "上调受体", text: "代偿性地诱导 LDLR 大量表达，加速血浆中 LDL-C 的抓取清除。" },
          { icon: "TrendingDown", label: "联合疗法", text: "常联合依折麦贝或 PCSK9 抑制剂，阻断 LDLR 降解路径达标。" }
        ]
      }
    },
    'healthy-lifestyle': {
      intro: {
        beginner: "健康的生活方式是管理 FH 的基石，能最大化放大降脂药物的保护疗效。",
        advanced: "生活方式干预是 FH 全面药物管理中不可获缺的辅助与协同手段。"
      },
      points: {
        beginner: [
          { icon: "Apple", label: "高纤维膳食", text: "首选燕麦、大麦和豆类，以减少肠道对胆固醇的吸收。" },
          { icon: "Ban", label: "限制饱和脂肪", text: "少吃椰浆、黄油、棕榈油和各类肥肉。" },
          { icon: "Activity", label: "规律运动", text: "每天坚持 30 分钟快步走等有氧运动以强健心肌。" }
        ],
        advanced: [
          { icon: "Apple", label: "可溶性纤维", text: "水溶性膳食纤维减少胆固醇吸收，并促进胆汁酸排泄。" },
          { icon: "Ban", label: "受体活性", text: "膳食饱和脂肪直接导致肝细胞表面 LDL 受体活性下调。" },
          { icon: "Activity", label: "血管内皮", text: "规律有氧运动能提高 eNOS 活性，改善和优化内皮细胞功能。" }
        ]
      }
    },
    'testing-process': {
      intro: {
        beginner: "整个基因检测旅程非常精简，能轻松融入您的日常日程中。",
        advanced: "基因检测的临床路径遵循严格的标准，确保患者无缝衔接。"
      },
      points: {
        beginner: [
          { icon: "MessageSquare", label: "检测咨询", text: "30分钟门诊评估，详尽绘制家族谱系并解答您的各种隐私疑虑。" },
          { icon: "FlaskConical", label: "样本采集", text: "抽血采样仅需10分钟，且完全无需提前进行任何空腹或禁食。" },
          { icon: "Calendar", label: "结果解读", text: "4至6周后回诊会见专家，为您量身制定后续防病和关怀方案。" }
        ],
        advanced: [
          { icon: "MessageSquare", label: "预检咨询", text: "绘制至少三代家族谱系图并评估心血管风险，签署知情同意。" },
          { icon: "FlaskConical", label: "高通量测序", text: "采集外周血或唾液，行高通量二代测序（NGS）深度扫描致病变异。" },
          { icon: "Calendar", label: "变异解读", text: "遗传专家精确分析基因结果，并引导亲属启动家系级联筛查。" }
        ]
      }
    },
    'costs-subsidies': {
      intro: {
        beginner: "新加坡的公共医疗保障十分完善，确保每一位患者都能负担得起检测费用。",
        advanced: "新加坡国民健康财务保障体系确保基因检测费用完全合理可控。"
      },
      points: {
        beginner: [
          { icon: "Building2", label: "政府资助", text: "合资格的新加坡公民可获得高达 75% 的 MOH 政府专项补贴。" },
          { icon: "Building2", label: "保健储蓄", text: "补贴后的自付余额，支持 100% 通过个人 MediSave 支付。" },
          { icon: "Coins", label: "零现金自付", text: "绝大多数患者在补贴与 MediSave 的支持下无需自掏腰包。" }
        ],
        advanced: [
          { icon: "Building2", label: "政府专项补贴", text: "卫生部（MOH）为符合资质的公民提供 50% 至 75% 临床财政补贴。" },
          { icon: "Building2", label: "慢性病 MediSave", text: "自付余额可在 CDMS 慢性病门诊机制内完全报销，减轻现金流负担。" },
          { icon: "Coins", label: "多重兜底保障", text: "低收入居民可申请 CHAS Blue 或 Medifund 获得完全免费的补助。" }
        ]
      }
    },
    'insurance': {
      intro: {
        beginner: "新加坡拥有极其严格的行业协定，全力保障您的基因隐私与投保权利。",
        advanced: "新加坡人寿保险协会 (LIA) 建立了强力的限制协定，杜绝基因歧视。"
      },
      points: {
        beginner: [
          { icon: "ShieldCheck", label: "停征协定", text: "LIA 协定严禁保险公司强求或使用自愿基因测试结果来调整保费。" },
          { icon: "Lock", label: "既有保单", text: "您已经生效人寿与健康保单完全受法律保护，不可取消或变更。" },
          { icon: "CheckCircle", label: "标体承保", text: "您拥有完全平等的权利，按标准条款与费率申请标准保险。" }
        ],
        advanced: [
          { icon: "ShieldCheck", label: "Moratorium 防火墙", text: "限制核保人员调取或评估自愿性预测性基因检测报告的权利。" },
          { icon: "Lock", label: "生效保单豁免", text: "凡已在保的标准保单绝无查验或根据后续检测重新定价的风险。" },
          { icon: "CheckCircle", label: "承保额度上限", text: "在特定保额（如人寿50万新币）内，完全豁免测试结果申报。" }
        ]
      }
    }
  },
  ta: {
    'what-is-fh': {
      intro: {
        beginner: "FH என்பது பிறப்பிலிருந்தே அதிக கொழுப்புச் சத்தை ஏற்படுத்தும் ஒரு பொதுவான மரபணுக் கோளாறாகும்.",
        advanced: "FH என்பது ஆட்டோசோமால் டாமினண்ட் வகை பரம்பரை கொழுப்புப் பரிமாற்றக் குறைபாடாகும்."
      },
      points: {
        beginner: [
          { icon: "Dna", label: "பரம்பரை", text: "குடும்ப மரபணுக்கள் மூலம் பரவுகிறது, உணவு அல்லது வாழ்க்கை முறை அல்ல." },
          { icon: "TrendingUp", label: "அதிக LDL", text: "பிறப்பிலிருந்தே 'கெட்ட' கொலஸ்ட்ரால் மிக அதிகமாக உள்ளது." },
          { icon: "ShieldCheck", label: "சிகிச்சை பெறலாம்", text: "ஆரம்பகால மருத்துவ ஆதரவுடன் எளிதாகக் குணப்படுத்த முடியும்." }
        ],
        advanced: [
          { icon: "Dna", label: "மரபணு பிறழ்வு", text: "LDLR, APOB அல்லது PCSK9 மரபணுக்களில் ஏற்படும் டாமினண்ட் மாற்றம்." },
          { icon: "TrendingUp", label: "குறைந்த அகற்றல்", text: "கல்லீரலால் LDL-C கொழுப்பை அகற்றுவது குறைகிறது." },
          { icon: "ShieldCheck", label: "மருந்து சிகிச்சை", text: "துல்லியமான சிகிச்சைகள் இதய நோய் ஆபத்தைக் கணிசமாகக் குறைக்கின்றன." }
        ]
      }
    },
    'heart-health': {
      intro: {
        beginner: "இரத்த நாளங்களில் கொழுப்பு அமைதியாகச் சேர்ந்து இரத்த ஓட்டத்தைக் குறைக்கும்.",
        advanced: "இரத்தத்தில் தொடர்ந்து LDL-C அதிகமாக இருப்பது இதய தமனிகளில் அடைப்பை ஏற்படுத்தும்."
      },
      points: {
        beginner: [
          { icon: "Clock", label: "அமைதியான அடைப்பு", text: "அறிகுறிகள் இன்றி தமனிகளில் கொழுப்பு படிவங்களை உருவாக்குகிறது." },
          { icon: "AlertTriangle", label: "இரத்தக்குழாய் சுருங்குதல்", text: "காலப்போக்கில், கொழுப்பு படிவுகள் இரத்த ஓட்டத்தை தடுத்து விடுகின்றன." },
          { icon: "HeartPulse", label: "இதயப் பாதுகாப்பு", text: "ஆரம்பகால சிகிச்சை இரத்த நாளங்களை ஆரோக்கியமாக வைத்திருக்கும்." }
        ],
        advanced: [
          { icon: "Clock", label: "இரத்தநாளப் பாதிப்பு", text: "தமனிச் சுவர்களில் ApoB லிப்போபுரோட்டீன் படிதல்." },
          { icon: "AlertTriangle", label: "லூமன் சுருக்கம்", text: "திசுக்களில் கொழுப்பு படிவத்தால் தமனிகள் குறுகலாகி மாரடைப்பு நேரிடுகிறது." },
          { icon: "HeartPulse", label: "ஆபத்து தடுப்பு", text: "அங்கீகரிக்கப்பட்ட சிகிச்சை வாழ்நாள் கொழுப்பு அபாயத்தை நீக்கும்." }
        ]
      }
    },
    'genetic-testing': {
      intro: {
        beginner: "மரபணு சோதனை என்பது 100% உறுதியுடன் FH-ஐ உறுதிப்படுத்தும் ஒரு எளிய கருவியாகும்.",
        advanced: "FH நோயறிதலில் மூலக்கூறு மரபணு பரிசோதனை முதன்மையான பங்கு வகிக்கிறது."
      },
      points: {
        beginner: [
          { icon: "Activity", label: "எளிய சோதனை", text: "வெளிநோயாளியாக 10 நிமிடத்தில் செய்யப்படும் எளிய இரத்தப் பரிசோதனை." },
          { icon: "Search", label: "துல்லிய DNA", text: "LDLR, APOB, அல்லது PCSK9 போன்ற மரபணுக்களை ஆராய்கிறது." },
          { icon: "ClipboardList", label: "தெளிவான வழிகாட்டுதல்", text: "முடிவுகள் துல்லியமான சிகிச்சையைத் தேர்வு செய்ய உதவும்." }
        ],
        advanced: [
          { icon: "Activity", label: "மூலக்கூறு சோதனை", text: "FH உடன் தொடர்புடைய மரபணுக்களை கண்டறிய NGS தொழில்நுட்பம் பயன்பாடு." },
          { icon: "Search", label: "மரபணு வகை கண்டறிதல்", text: "நோயறிதலில் உள்ள சந்தேகங்களைத் தீர்த்து துல்லியமான முடிவுகளைத் தரும்." },
          { icon: "ClipboardList", label: "குடும்பப் பரிசோதனை", text: "குடும்பத்தினருக்குச் சோதனை செய்ய இது ஒரு முக்கியமான வழிகாட்டியாகும்." }
        ]
      }
    },
    'cascade-screening': {
      intro: {
        beginner: "குடும்பப் பரிசோதனை என்பது உங்கள் நெருங்கிய உறவினர்களைப் பாதுகாக்கும் ஒரு செயலூக்கத் திட்டமாகும்.",
        advanced: "குடும்பப் பரிசோதனை (Cascade screening) என்பது நோயாளியின் அடிப்படையில் குடும்பத்தைக் கண்டறியும் முறையாகும்."
      },
      points: {
        beginner: [
          { icon: "Users", label: "50% ஆபத்து", text: "உங்களது நெருங்கிய உறவினர்களுக்கு இந்த பாதிப்பு ஏற்பட 50% வாய்ப்பு உண்டு." },
          { icon: "GitFork", label: "குடும்ப மரம்", text: "உங்களுக்கு பாதிப்பு இருந்தால் மற்ற உறுப்பினர்களை எளிதாகச் சோதிக்கலாம்." },
          { icon: "ShieldCheck", label: "ஆரம்ப நடவடிக்கை", text: "அடைப்பு ஏற்படுவதற்கு முன் உங்கள் குடும்பத்தைக் காக்க உதவும்." }
        ],
        advanced: [
          { icon: "Users", label: "மரபியல் வாய்ப்பு", text: "நெருங்கிய உறவினர்களுக்கு 50% மரபு வாய்ப்பு உள்ளது." },
          { icon: "GitFork", label: "இலக்கு சோதனை", text: "பாதிக்கப்பட்டவரின் பிறழ்வைக் கொண்டு குடும்ப உறுப்பினர்களை எளிதாகச் சோதித்தல்." },
          { icon: "ShieldCheck", label: "செலவு சேமிப்பு", text: "உலகளவில் பொருளாதார ரீதியாகப் பரிந்துரைக்கப்படும் சிறந்த தடுப்பு முறை." }
        ]
      }
    },
    'treatment-medication': {
      intro: {
        beginner: "FH மரபணு சார்ந்தது என்பதால், வெறும் உணவு முறை மட்டும் போதாது; பாதுகாப்பான மருந்துகள் அவசியம்.",
        advanced: "FH கொழுப்பைக் கட்டுப்படுத்த வாழ்நாள் மருந்துச் சிகிச்சை மிகவும் அவசியமான ஒன்றாகும்."
      },
      points: {
        beginner: [
          { icon: "Pill", label: "பாதுகாப்பான மருந்துகள்", text: "கல்லீரலில் கொழுப்பை அகற்ற உதவும் எளிய மற்றும் பாதுகாப்பான ஸ்டாடின் மாத்திரைகள்." },
          { icon: "RefreshCw", label: "LDL சுத்தம்", text: "உடலின் இயற்கை ஏற்பிகளின் திறனை அதிகரித்து கொழுப்பை நீக்குகிறது." },
          { icon: "TrendingDown", label: "ஆபத்து குறைப்பு", text: "மாரடைப்பு ஏற்படும் அபாயத்தை முழுமையாகக் குறைக்கிறது." }
        ],
        advanced: [
          { icon: "Pill", label: "ஸ்டாடின் சிகிச்சை", text: "அதிக திறன் கொண்ட ஸ்டாடின் மருந்துகள் கொழுப்பு உற்பத்தியைத் தடுக்கின்றன." },
          { icon: "RefreshCw", label: "LDLR அதிகரிப்பு", text: "இரத்தத்தில் இருந்து LDL கொழுப்பை உறிஞ்சும் கல்லீரல் வாங்கிகளை ஊக்குவித்தல்." },
          { icon: "TrendingDown", label: "கூட்டுச் சிகிச்சை", text: "தேவைக்கேற்ப Ezetimibe அல்லது PCSK9 தடுப்பான்களுடன் இணைந்து பயன்படுத்தப்படுகிறது." }
        ]
      }
    },
    'healthy-lifestyle': {
      intro: {
        beginner: "ஆரோக்கியமான வாழ்க்கை முறை உங்களின் மருத்துவ சிகிச்சைக்கு சிறந்த அடித்தளமாகும்.",
        advanced: "ஆரோக்கியமான உணவு முறைகள் மருந்தின் செயல்திறனை அதிகரிக்க உதவும் முக்கியமான காரணியாகும்."
      },
      points: {
        beginner: [
          { icon: "Apple", label: "அதிக நார்ச்சத்து", text: "கொழுப்பு உறிஞ்சப்படுவதைத் தடுக்க ஓட்ஸ், பீன்ஸ் போன்றவற்றைத் தேர்ந்தெடுக்கவும்." },
          { icon: "Ban", label: "கொழுப்புத் தவிர்ப்பு", text: "வெண்ணெய், தேங்காய் எண்ணெய், கொழுப்பு இறைச்சிகளைக் குறைக்கவும்." },
          { icon: "Activity", label: "உடற்பயிற்சி", text: "இதயத்தை வலுப்படுத்த தினமும் 30 நிமிடங்கள் வேகமாக நடக்கவும்." }
        ],
        advanced: [
          { icon: "Apple", label: "நார்ச்சத்து உணவு", text: "நார்ச்சத்து உணவுகள் குடலில் கொழுப்பு உறிஞ்சப்படுவதைத் தடுக்கின்றன." },
          { icon: "Ban", label: "வாங்கித் தடை", text: "அதிக கொழுப்பு உணவுகள் கல்லீரல் LDL வாங்கிகளின் திறனைக் குறைக்கின்றன." },
          { icon: "Activity", label: "இரத்த ஓட்டம்", text: "ஏரோபிக் உடற்பயிற்சி இரத்த ஓட்டத்தை மேம்படுத்த இன்றியமையாதது." }
        ]
      }
    },
    'testing-process': {
      intro: {
        beginner: "சோதனை செயல்முறை மிகவும் எளிதானது மற்றும் உங்கள் நேரத்திற்கு ஏற்றது.",
        advanced: "சோதனை செயல்முறை மிகவும் எளிதானது மற்றும் உங்கள் நேரத்திற்கு ஏற்றது."
      },
      points: {
        beginner: [
          { icon: "MessageSquare", label: "ஆலோசனை", text: "30 நிமிடத்தில் உங்களின் குடும்பப் பின்னணி மற்றும் தனியுரிமை விளக்கம்." },
          { icon: "FlaskConical", label: "இரத்த மாதிரி", text: "எளிய 10 நிமிட வெளிநோயாளி இரத்தப் பரிசோதனை, விரதம் தேவையில்லை." },
          { icon: "Calendar", label: "முடிவுகள் ஆய்வு", text: "4-6 வாரங்களில் உங்களின் தனிப்பயனாக்கப்பட்ட சிகிச்சைத் திட்டம்." }
        ],
        advanced: [
          { icon: "MessageSquare", label: "முன்னோடி ஆலோசனை", text: "மூன்று தலைமுறை குடும்ப வரலாற்றை ஆராய்ந்து ஆலோசனை வழங்குதல்." },
          { icon: "FlaskConical", label: "மூலக்கூறு மாதிரி", text: "விரதமில்லா எளிய இரத்த மாதிரி மூலம் NGS சோதனை மேற்கொள்ளப்படுகிறது." },
          { icon: "Calendar", label: "முடிவுகள் பகுப்பாய்வு", text: "மரபணு முடிவுகளைப் பகுப்பாய்வு செய்து உரிய பாதுகாப்பு சிகிச்சை அளித்தல்." }
        ]
      }
    },
    'costs-subsidies': {
      intro: {
        beginner: "சிங்கப்பூரில் மருத்துவப் பரிசோதனைகள் மிகவும் மலிவான விலையில் கிடைக்கின்றன.",
        advanced: "சிங்கப்பூரின் நிதி உதவித் திட்டங்கள் பரிசோதனைச் செலவுகளைக் கணிசமாகக் குறைக்கின்றன."
      },
      points: {
        beginner: [
          { icon: "Building2", label: "அரசு மானியம்", text: "தகுதியுள்ள குடிமக்களுக்கு 75% வரை அரசு மானியம் வழங்கப்படுகிறது." },
          { icon: "Building2", label: "MediSave", text: "மீதமுள்ள தொகையை உங்களது MediSave மூலம் முழுமையாகச் செலுத்தலாம்." },
          { icon: "Coins", label: "பணச் செலவின்மை", text: "பெரும்பாலானோர் கையில் இருந்து பணம் செலுத்த வேண்டியதில்லை." }
        ],
        advanced: [
          { icon: "Building2", label: "அரசு மானியம்", text: "சுகாதார அமைச்சகம் (MOH) தகுதியுள்ளோருக்கு 50% முதல் 75% வரை மானியம் வழங்குகிறது." },
          { icon: "Building2", label: "CDMS MediSave", text: "மீதமுள்ள தொகையை CDMS திட்டத்தின் கீழ் MediSave மூலம் செலுத்தலாம்." },
          { icon: "Coins", label: "கூடுதல் உதவிகள்", text: "கூடுதல் நிதிப் பாதுகாப்பு CHAS மற்றும் Medifund மூலம் உறுதி செய்யப்படுகிறது." }
        ]
      }
    },
    'insurance': {
      intro: {
        beginner: "சிங்கப்பூரின் கடுமையான விதிகள் உங்களின் மரபணு தனியுரிமையைப் பாதுகாக்கின்றன.",
        advanced: "சிங்கப்பூர் நுகர்வோரை காப்பீட்டுத் துன்புறுத்தலில் இருந்து சட்ட விதிகள் பாதுகாக்கின்றன."
      },
      points: {
        beginner: [
          { icon: "ShieldCheck", label: "LIA உடன்படிக்கை", text: "மரபணு சோதனை முடிவுகளைக் கேட்க காப்பீட்டு நிறுவனங்களுக்குத் தடை." },
          { icon: "Lock", label: "காப்பீடு பாதுகாப்பு", text: "உங்களிடம் இருக்கும் பழைய காப்பீடுகளை ரத்து செய்ய முடியாது." },
          { icon: "CheckCircle", label: "சாதாரண காப்பீடு", text: "சாதாரண விதிமுறைகளின் கீழ் காப்பீடுகளைப் பெற முழுத் தகுதியுண்டு." }
        ],
        advanced: [
          { icon: "ShieldCheck", label: "LIA Moratorium", text: "சுயவிவர மரபணு சோதனைகளைப் பயன்படுத்திப் பயமுறுத்துவதை இது தடுக்கிறது." },
          { icon: "Lock", label: "மாற்றமின்மை", text: "ஏற்கனவே இருக்கும் காப்பீட்டுக்கான பிரீமியம் அல்லது பலன்கள் மாறாது." },
          { icon: "CheckCircle", label: "சாதாரண விதிமுறைகள்", text: "குறிப்பிட்ட தொகைக்கு உட்பட்ட காப்பீடுகளைச் சாதாரண நிபந்தனைகளில் பெறலாம்." }
        ]
      }
    }
  }
};

export function getPersonalizedGuide(
  id: string,
  onboardingFamiliarity: KnowledgeLevel,
  onboardingConcerns: string[],
  language: Language
): PersonalizedGuide {
  const isAdvanced = onboardingFamiliarity === 'research' || onboardingFamiliarity === 'advanced';
  const levelKey = isAdvanced ? 'advanced' : 'beginner';

  // Define shortSummaries first so we can reference it in validation check
  const shortSummaries: Record<Language, Record<string, string>> = {
    en: {
      'what-is-fh': 'Learn what FH is and why early diagnosis matters.',
      'heart-health': 'Understand how inherited high cholesterol impacts cardiovascular risk over time.',
      'genetic-testing': 'Learn how genetic testing works and what the results mean.',
      'cascade-screening': 'How testing helps identify and protect your close blood relatives.',
      'treatment-medication': 'How highly effective, subsidized treatments protect your heart.',
      'healthy-lifestyle': 'Optimizing your lifestyle to support medical treatment.',
      'testing-process': 'Step-by-step from counselling to results.',
      'costs-subsidies': 'Singapore MOH subsidies and MediSave support.',
      'insurance': 'How national guidelines protect your right to take a voluntary test.'
    },
    ms: {
      'what-is-fh': 'Ketahui apakah itu FH dan mengapa diagnosis awal sangat penting.',
      'heart-health': 'Fahami bagaimana kolesterol tinggi warisan memberi kesan kepada kesihatan jantung.',
      'genetic-testing': 'Ketahui cara ujian genetik berfungsi dan maksud keputusan ujian.',
      'cascade-screening': 'Bagaimana saringan lata melindungi ahli keluarga terdekat anda.',
      'treatment-medication': 'Bagaimana rawatan berkesan dan bersubsidi melindungi jantung anda.',
      'healthy-lifestyle': 'Mengoptimumkan gaya hidup untuk menyokong keberkesanan rawatan.',
      'testing-process': 'Langkah demi langkah dari kaunseling sehingga keputusan ujian.',
      'costs-subsidies': 'Subsidi MOH Singapura dan bantuan skim MediSave.',
      'insurance': 'Bagaimana garis panduan melindungi hak ujian sukarela anda.'
    },
    zh: {
      'what-is-fh': '了解什么是 FH 以及为什么早期诊断至关重要。',
      'heart-health': '理解遗传性高胆固醇如何随时间影响心血管健康。',
      'genetic-testing': '了解基因检测如何运作以及结果的医学意义。',
      'cascade-screening': '了解家系筛查如何帮助并保护您的直系血亲。',
      'treatment-medication': '了解高效且享有高额补贴的药物治疗如何保护心脏。',
      'healthy-lifestyle': '优化生活方式以支持和放大药物治疗功效。',
      'testing-process': '从咨询、抽血到获取结果的完整步骤指南。',
      'costs-subsidies': '了解新加坡卫生部政府补贴及 MediSave 保健储蓄。',
      'insurance': '了解新加坡国家协定如何全力保障您的自愿测试权利。'
    },
    ta: {
      'what-is-fh': 'FH என்றால் என்ன மற்றும் ஆரம்ப கால நோயறிதல் ஏன் முக்கியம் என்பதை அறியவும்.',
      'heart-health': 'பரம்பரை அதிக கொழுப்பு எவ்வாறு இதயத்தை பாதிக்கிறது என்பதைப் புரிந்து கொள்ளுங்கள்.',
      'genetic-testing': 'மரபணு சோதனை எவ்வாறு செயல்படுகிறது மற்றும் முடிவுகள் என்ன என்பதை அறியவும்.',
      'cascade-screening': 'சோதனை எவ்வாறு உங்கள் நெருங்கிய உறவினர்களைக் கண்டறிந்து பாதுகாக்கிறது.',
      'treatment-medication': 'மானிய விலையிலான மருந்துகள் உங்கள் இதயத்தை எவ்வாறு பாதுகாக்கின்றன.',
      'healthy-lifestyle': 'சிகிச்சையை ஆதரிக்க உங்கள் வாழ்க்கை முறையை மேம்படுத்துதல்.',
      'testing-process': 'ஆலோசனை முதல் முடிவுகள் வரையிலான எளிய படிகள்.',
      'costs-subsidies': 'சிங்கப்பூர் MOH மானியங்கள் மற்றும் MediSave ஆதரவு.',
      'insurance': 'கடுமையான தேசிய விதிகள் உங்கள் தனியுரிமையை எவ்வாறு பாதுகாக்கின்றன.'
    }
  };

  const meta = TOPICS_META[id] || { titleKey: 'what_is_fh_title', icon: 'BookOpen', readTime: '3 min read', keyTakeawayKey: 'what_is_fh_takeaway' };

  // Determine if translation is fully complete for this specific card
  let targetLanguage = language;
  let isComplete = true;

  if (targetLanguage !== 'en') {
    const localizedMeta = LOCALIZED_STRINGS[targetLanguage];
    const visualCardInfo = VISUAL_CARDS_DB[targetLanguage]?.[id];
    const shortSummary = shortSummaries[targetLanguage]?.[id];

    if (!localizedMeta || !localizedMeta[meta.titleKey] || !localizedMeta[meta.keyTakeawayKey]) {
      isComplete = false;
    }
    if (!visualCardInfo || !visualCardInfo.intro[levelKey] || !visualCardInfo.points[levelKey] || visualCardInfo.points[levelKey].length === 0) {
      isComplete = false;
    } else {
      // Check if any point has missing label or text
      for (const pt of visualCardInfo.points[levelKey]) {
        if (!pt.label || !pt.text) {
          isComplete = false;
          break;
        }
      }
    }
    if (!shortSummary) {
      isComplete = false;
    }

    if (!isComplete) {
      targetLanguage = 'en';
    }
  }

  const localizedMeta = LOCALIZED_STRINGS[targetLanguage] || LOCALIZED_STRINGS['en'];
  const visualCardInfo = VISUAL_CARDS_DB[targetLanguage]?.[id] || VISUAL_CARDS_DB['en']?.[id];

  const title = localizedMeta[meta.titleKey] || meta.titleKey;
  const keyTakeaway = localizedMeta[meta.keyTakeawayKey] || meta.keyTakeawayKey;
  
  const intro = visualCardInfo?.intro[levelKey] || "";
  const visualItems = visualCardInfo?.points[levelKey] || [];
  const shortSummary = shortSummaries[targetLanguage]?.[id] || shortSummaries['en']?.[id] || title;

  return {
    id,
    title,
    shortSummary,
    readingTime: meta.readTime,
    iconName: meta.icon,
    keyTakeaway,
    content: intro,
    visualItems
  };
}

export const getPersonalisedGuideContent = getPersonalizedGuide;
