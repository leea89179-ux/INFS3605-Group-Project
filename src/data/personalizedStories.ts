export interface StoryDetails {
  title: string;
  videoLabel: string;
  subtitle: string;
  summary: string;
  frames: string[];
  transcript: string[];
}

export interface LocalizedStory {
  en: StoryDetails;
  ms: StoryDetails;
  zh: StoryDetails;
  ta: StoryDetails;
}

export const STORIES: Record<string, LocalizedStory> = {
  family: {
    en: {
      title: "A Family Screening Journey",
      videoLabel: "Patient Experience Story (Zack, 34)",
      subtitle: "Learn how one family discovered FH and protected their next generation.",
      summary: "", // Will be dynamically selected based on knowledgeLevel
      frames: [
        "After my diagnosis, I learned my siblings and kids each have a 50% chance of inheriting the FH gene variant.",
        "My counsellor provided supportive referral letters, making it easy to explain the condition to my relatives.",
        "My siblings went for heavily subsidized testing at public clinics, finding out early before any symptoms appeared.",
        "We manage it together now. Taking proactive steps as a family takes away the fear and keeps us all healthy."
      ],
      transcript: [
        "Hi, I'm Zack. When I was diagnosed with FH, my first thought was about my family. The counsellor explained that FH is autosomal dominant, meaning my parents, siblings, and children each have a 50% chance of having it too. It felt heavy, but the team reassured me that this knowledge is a powerful tool to protect them.",
        "They gave me a simple family guide and personalized referral letters for my relatives. This made the conversation so much easier because I didn't have to explain all the complex medical terms myself. It was presented as a proactive health check, not a family burden.",
        "My sister and brother took the letters to their nearest clinic. Thanks to cascade screening subsidies from MOH, their out-of-pocket costs were minimal. My sister tested positive, while my brother was clear. Because we caught it early, she started mild treatment immediately.",
        "Today, we support each other in keeping our hearts healthy. Sifting through our genetics together has brought us closer. It is not about assigning blame; it is about giving the people you love the chance to lead long, healthy lives."
      ]
    },
    ms: {
      title: "Perjalanan Saringan Keluarga",
      videoLabel: "Kisah Pengalaman Pesakit (Zack, 34)",
      subtitle: "Bagaimana satu keluarga menemui FH dan melindungi generasi seterusnya.",
      summary: "",
      frames: [
        "Selepas diagnosis saya, adik-beradik dan anak-anak saya masing-masing mempunyai peluang 50% untuk mewarisi varian gen FH.",
        "Kaunselor saya memberikan surat rujukan sokongan, memudahkan saya menerangkan keadaan ini kepada saudara-mara.",
        "Adik-beradik saya menjalani ujian yang disubsidi tinggi di klinik awam sebelum sebarang gejala muncul.",
        "Kami menguruskannya bersama sekarang. Langkah proaktif keluarga menghilangkan rasa takut dan memastikan kami sihat."
      ],
      transcript: [
        "Hai, saya Zack. Apabila saya didiagnosis dengan FH, fikiran pertama saya adalah tentang keluarga saya. Kaunselor menerangkan bahawa ahli keluarga terdekat mempunyai peluang 50% untuk mewarisi keadaan ini. Ia terasa berat, tetapi pengetahuan ini membantu melindungi mereka.",
        "Mereka memberi saya panduan mudah dan surat rujukan peribadi untuk saudara-mara saya. Ini memudahkan perbualan tanpa saya perlu menerangkan istilah perubatan yang rumit.",
        "Kakak dan abang saya membawa surat itu ke klinik. Dengan subsidi saringan daripada MOH, kos mereka amat minimum. Kakak saya dikesan positif dan memulakan rawatan awal, manakala abang saya bebas gen tersebut.",
        "Kini kami menyokong satu sama lain. Menguruskan kesihatan bersama merapatkan kami. Ia bukan tentang menyalahkan, tetapi memberi orang tersayang peluang untuk hidup sihat."
      ]
    },
    zh: {
      title: "家系筛查与关爱之旅",
      videoLabel: "患者体验故事 (Zack, 34)",
      subtitle: "了解一个家庭如何共同应对FH，守护下一代的心脏健康。",
      summary: "",
      frames: [
        "确诊后，我了解到我的兄弟姐妹和孩子们都有 50% 的概率遗传相同的 FH 基因变异。",
        "咨询师为我提供了专业的家系告知书，让我能轻松、温情地向亲人解释这个健康状况。",
        "我的家人们拿着信去公立诊所接受了高额补贴筛查，在血管出现病变前就及早发现了隐患。",
        "现在我们共同管理。全家携手采取预防性措施，消除恐慌，让每个人都保持健康。"
      ],
      transcript: [
        "大家好，我是 Zack。当我被确诊为 FH 时，我首先想到的是我的家人。咨询师解释说，FH 遵循显性遗传规律，这意味着我的父母、兄弟姐妹和孩子们各有 50% 的概率也携带这一基因。起初我感到很沉重，但医疗团队安慰我，这种遗传学认知其实是保护他们的一把保护伞。",
        "他们给了我一份简明的家庭指南和专为亲属定制的转诊告知信。这让沟通变得容易得多，因为我不需要自己去解释那些复杂的医学术语。它被呈现为一项主动的预防性健康检查，而不是家庭的负担。",
        "我的姐姐和弟弟拿着这些信去了最近的诊所。得益于卫生部 (MOH) 提供的家系筛查专项补贴，他们的实际自付费用非常低。结果姐姐被检测出携带变异，而弟弟则完全正常。因为发现得早，姐姐立即启动了温和的预防性治疗。",
        "现在，我们每天都互相督促，共同保持心脏健康。全家人一起直面遗传特征，反倒让我们的纽带更加紧密。这绝不是为了怪罪任何人，而是为了给我们所爱的人一个健康、长寿的机会。"
      ]
    },
    ta: {
      title: "குடும்பப் பரிசோதனைப் பயணம்",
      videoLabel: "நோயாளி அனுபவக் கதை (Zack, 34)",
      subtitle: "ஒரு குடும்பம் எவ்வாறு FH-ஐக் கண்டறிந்து தங்களின் அடுத்த தலைமுறையைப் பாதுகாத்தது.",
      summary: "",
      frames: [
        "எனக்கு கண்டறியப்பட்ட பிறகு, என் உடன்பிறப்புகள் மற்றும் குழந்தைகளுக்கு FH மரபணு இருக்க 50% வாய்ப்பு உள்ளதை அறிந்தேன்.",
        "என் ஆலோசகர் பரிந்துரைக் கடிதங்களை வழங்கினார், இது என் உறவினர்களுக்கு விளக்குவதை எளிதாக்கியது.",
        "என் உடன்பிறப்புகள் பொது மருத்துவமனைகளில் மானியத்துடன் கூடிய பரிசோதனை செய்து, முன்கூட்டியே கண்டறிந்தனர்.",
        "நாங்கள் இப்போது அதை இணைந்து நிர்வகிக்கிறோம். குடும்பமாக முன்னெச்சரிக்கை நடவடிக்கை எடுப்பது பயத்தைப் போக்குகிறது."
      ],
      transcript: [
        "வணக்கம், நான் Zack. எனக்கு FH இருப்பதாகக் கண்டறியப்பட்டபோது, என் முதல் எண்ணம் என் குடும்பத்தைப் பற்றியதுதான். FH என்பது ஒருவருக்கு இருந்தால் அவரது பெற்றோர், உடன்பிறப்புகள் மற்றும் குழந்தைகளுக்கு 50% வாய்ப்பு இருப்பதாக ஆலோசகர் விளக்கினார். ஆரம்பத்தில் கவலையாக இருந்தது, ஆனால் அவர்களைப் பாதுகாக்க இந்த அறிவு உதவும் என மருத்துவக் குழுவினர் கூறினர்.",
        "அவர்கள் எனக்கு ஒரு எளிய குடும்ப வழிகாட்டியையும் உறவினர்களுக்கான பரிந்துரைக் கடிதங்களையும் வழங்கினர். இது உரையாடலை எளிதாக்கியது, ஏனெனில் நான் சிக்கலான மருத்துவ சொற்களை விளக்க வேண்டிய அவசியமில்லை. இது ஒரு எளிய முன்கூட்டிய பரிசோதனையாகக் காட்டப்பட்டது.",
        "என் சகோதரியும் சகோதரனும் கடிதங்களை எடுத்துக்கொண்டு அருகில் உள்ள மருத்துவமனைக்குச் சென்றனர். MOH மானியங்கள் காரணமாக, அவர்களின் செலவு மிகவும் குறைவாகவே இருந்தது. என் சகோதரிக்கு மரபணு இருப்பது உறுதியானது, சகோதரனுக்கு இல்லை. முன்கூட்டியே கண்டறிந்ததால், அவள் உடனே சிகிச்சையைத் தொடங்கினாள்.",
        "இன்று, நாங்கள் எங்கள் இதயங்களை ஆரோக்கியமாக வைத்திருக்க ஒருவருக்கொருவர் ஆதரவளிக்கிறோம். மரபணுக்களை ஒன்றாக ஆராய்ந்தது எங்களை நெருக்கமாக்கியுள்ளது. இது யாரையும் குற்றம் சாட்டுவதற்காக அல்ல; நாம் நேசிக்கும் நபர்களுக்கு ஆரோக்கியமான வாழ்வை வழங்குவதற்காகும்."
      ]
    }
  },
  testing: {
    en: {
      title: "What to Expect During Genetic Testing",
      videoLabel: "Clinical Journey (May, 28)",
      subtitle: "A step-by-step visual guide of what happens before, during, and after the test.",
      summary: "",
      frames: [
        "Before: A 30-minute counselling session to map your family history and answer any questions.",
        "During: A standard, quick blood draw or saliva collection at the outpatient clinic.",
        "After: Specialized laboratory analysis takes 4 to 6 weeks to map specific FH gene variants.",
        "Follow-up: A personalized consultation to discuss results and outline a tailored heart plan."
      ],
      transcript: [
        "Hello, I'm May. I want to share my genetic testing experience because I was quite nervous beforehand. The process is completely outpatient and has three clear steps. It starts with pre-test counselling where a specialist maps your family health tree and answers any questions about privacy or insurance.",
        "The test itself is extremely simple—just a standard 10-minute blood draw. There is no fasting required, and you can go right back to your day immediately. The sample is then sent to a specialized local laboratory for DNA sequencing.",
        "Over the next 4 to 6 weeks, geneticists analyze the sample, looking specifically for variations in the LDLR, APOB, and PCSK9 genes. The wait can feel long, but it is because they are doing a highly precise medical mapping.",
        "Finally, you return for a post-test consultation. Your doctor explains the results clearly. If a variant is found, they help you start subsidized treatment that protects your heart. Knowing my genetic status took away the mystery and gave me a clear path forward."
      ]
    },
    ms: {
      title: "Apa yang Dijangka Semasa Ujian Genetik",
      videoLabel: "Perjalanan Klinikal (May, 28)",
      subtitle: "Panduan visual langkah demi langkah sebelum, semasa, dan selepas ujian.",
      summary: "",
      frames: [
        "Sebelum: Sesi kaunseling 30 minit untuk memetakan sejarah keluarga dan menjawab soalan anda.",
        "Semasa: Pengambilan darah standard yang cepat di klinik pesakit luar.",
        "Selepas: Analisis makmal khusus mengambil masa 4 hingga 6 minggu untuk memetakan varian gen FH.",
        "Susulan: Sesi rundingan peribadi untuk membincangkan keputusan dan merangka rancangan penjagaan jantung."
      ],
      transcript: [
        "Helo, saya May. Saya ingin berkongsi pengalaman ujian genetik saya kerana saya agak gementar sebelum ini. Proses ini adalah pesakit luar sepenuhnya dan mempunyai tiga langkah yang jelas. Ia bermula dengan kaunseling pra-ujian untuk memetakan kesihatan keluarga dan menjawab soalan privasi atau insurans.",
        "Ujian itu sendiri sangat mudah—hanya pengambilan darah standard selama 10 minit. Tiada puasa diperlukan, dan anda boleh kembali menjalankan aktiviti harian dengan segera.",
        "Dalam tempoh 4 hingga 6 minggu seterusnya, pakar genetik menganalisis sampel, mencari secara khusus variasi dalam gen utama FH. Menunggu mungkin terasa lama, tetapi ini untuk pemetaan perubatan yang sangat tepat.",
        "Akhirnya, anda kembali untuk rundingan pasca-ujian di mana doktor menerangkan keputusan. Jika varian ditemui, mereka membantu memulakan rawatan bersubsidi untuk melindungi jantung anda."
      ]
    },
    zh: {
      title: "基因检测流程与体验",
      videoLabel: "临床体验 (May, 28)",
      subtitle: "为您详细拆解检测前、检测中、检测后的全流程视觉指南。",
      summary: "",
      frames: [
        "检测前：大约 30 分钟的温馨咨询，绘制您的家族健康树并解答所有疑问。",
        "检测中：无需空腹，在门诊进行不超过 10 分钟的普通血液或唾液采集。",
        "检测后：样本送往专门的本地实验室，进行 4 到 6 周的精密 DNA 测序分析。",
        "出报告：回诊听取详细的报告解读，定制专属于您的心脏长效保护计划。"
      ],
      transcript: [
        "大家好，我是 May。我想分享我的基因检测经历，因为检测前我其实非常紧张。整个过程完全在门诊进行，步骤非常清晰。首先是预检咨询，遗传学专家会细心绘制您的家族健康图谱，并解答关于隐私、费用和保险等所有现实层面的疑问。",
        "检测本身其实再简单不过了——就是一次不到 10 分钟的普通抽血。不需要空腹，抽完血您就可以立刻去忙别的事。样本会被安全送往本地的专业基因实验室进行高精度测序。",
        "在接下来的 4 到 6 周里，实验室专家会对样本进行深度分析，专门筛查基因中是否存在致病性突变。等待的时间可能会觉得有些长，但这是因为高精度测序需要严格的医学质控。",
        "最后，您回诊参加报告咨询。医生会用通俗易懂的语言解释结果。如果发现了变异，他们会为您制定有政府补贴的保护性治疗方案。明确了我的基因状态，消除了心中的不确定性，让我觉得未来有了清晰的方向。"
      ]
    },
    ta: {
      title: "மரபணு சோதனையின் போது என்ன எதிர்பார்ப்பது",
      videoLabel: "மருத்துவப் பயணம் (May, 28)",
      subtitle: "சோதனைக்கு முன், போது மற்றும் பின் என்ன நடக்கும் என்பதற்கான படிப்படியான எளிய வழிகாட்டி.",
      summary: "",
      frames: [
        "முன்: குடும்ப வரலாற்றை வரையவும் சந்தேகங்களைத் தீர்க்கவும் 30 நிமிட ஆலோசனை அமர்வு.",
        "போது: வெளிநோயாளர் பிரிவில் எளிய, விரைவான இரத்த மாதிரி சேகரிப்பு.",
        "பின்: குறிப்பிட்ட FH மரபணு மாறுபாடுகளை பகுப்பாய்வு செய்ய 4 முதல் 6 வாரங்கள் ஆகும்.",
        "முடிவு: முடிவுகளைப் பற்றி விவாதிக்கவும் இதயப் பாதுகாப்புத் திட்டத்தை வகுக்கவும் ஆலோசனை."
      ],
      transcript: [
        "வணக்கம், நான் May. எனது மரபணு சோதனை அனுபவத்தை உங்களுடன் பகிர்ந்து கொள்ள விரும்புகிறேன், ஏனெனில் சோதனைக்கு முன் நான் மிகவும் கவலையாக இருந்தேன். இந்த செயல்முறை முற்றிலும் வெளிநோயாளியாக செய்யப்படுகிறது மற்றும் மூன்று எளிய படிகளைக் கொண்டது. முதலில் உங்கள் குடும்ப வரலாற்றை ஆராய்ந்து சந்தேகங்களுக்கு பதிலளிக்க ஆலோசகர் உதவுவார்.",
        "பரிசோதனை மிகவும் எளிதானது—சாதாரண 10 நிமிட இரத்த பரிசோதனை மட்டுமே. உண்ணாவிரதம் இருக்க வேண்டிய அவசியமில்லை, பரிசோதனைக்கு பின் நீங்கள் உடனடியாக உங்கள் பணிகளைத் தொடரலாம்.",
        "அடுத்த 4 முதல் 6 வாரங்களில், ஆய்வக நிபுணர்கள் உங்கள் மாதிரியை பகுப்பாய்வு செய்து, முக்கிய மரபணுக்களில் ஏதேனும் மாற்றங்கள் உள்ளதா என ஆராய்வார்கள். காத்திருப்பு காலம் சற்று நீளமாகத் தோன்றினாலும், இது மிகவும் துல்லியமான மருத்துவ வரைபடத்திற்காக செய்யப்படுகிறது.",
        "இறுதியாக, நீங்கள் முடிவுகளைப் பெற மருத்துவமனைக்கு வருவீர்கள். மருத்துவர் முடிவுகளைத் தெளிவாக விளக்குவார். மரபணு மாறுபாடு இருந்தால், உங்கள் இதயத்தைப் பாதுகாக்கும் மானிய விலையிலான சிகிச்சையை அவர்கள் பரிந்துரைப்பார்கள்."
      ]
    }
  },
  treatment: {
    en: {
      title: "Managing FH After Diagnosis",
      videoLabel: "Patient Experience Story (Kumar, 42)",
      subtitle: "How monitoring, simple daily medication, and lifestyle keep risk at normal levels.",
      summary: "",
      frames: [
        "Acceptance: Understanding that FH is genetic and standard lifestyle changes alone aren't enough.",
        "Medication: Safe, highly-studied daily therapies like statins help the liver clear bad cholesterol.",
        "Lifestyle: Incorporating high-fiber foods and regular aerobic exercise builds a strong heart foundation.",
        "Results: Regular follow-ups show my LDL levels are back in the safe zone, fully protecting my heart."
      ],
      transcript: [
        "Hello, Kumar here. When I first got my FH diagnosis, I was worried about being on lifelong medication. I tried strict dieting for six months, but my LDL barely budged. My specialist explained that because FH is genetic, my liver lacks enough receptors to clear cholesterol naturally. It wasn't my fault.",
        "I started taking a daily statin. It is a highly safe, affordable medication that is heavily subsidized. I had no side effects at all. What it does is simple—it helps my liver work the way it's supposed to, clearing the bad cholesterol from my blood.",
        "I also focused on lifestyle, not as a replacement for medicine, but to support it. I eat more oats, vegetables, and fish, and walk 30 minutes daily. This combination keeps my blood vessels clean and flexible.",
        "Now, my LDL is back to a completely normal level. Managing FH has just become a small, simple part of my daily routine, like brushing my teeth. I feel active, strong, and confident that my future is secure."
      ]
    },
    ms: {
      title: "Menguruskan FH Selepas Diagnosis",
      videoLabel: "Kisah Pengalaman Pesakit (Kumar, 42)",
      subtitle: "Bagaimana pemantauan, ubat harian mudah, dan gaya hidup mengekalkan risiko pada tahap normal.",
      summary: "",
      frames: [
        "Penerimaan: Memahami bahawa FH adalah keturunan dan perubahan gaya hidup biasa sahaja tidak mencukupi.",
        "Ubat-ubatan: Terapi harian yang selamat seperti statin membantu hati membersihkan kolesterol buruk.",
        "Gaya Hidup: Mengamalkan makanan tinggi serat dan senaman aerobik membina asas jantung yang kuat.",
        "Keputusan: Pemeriksaan berkala menunjukkan tahap LDL kembali ke zon selamat, melindungi jantung sepenuhnya."
      ],
      transcript: [
        "Helo, Kumar di sini. Apabila pertama kali mendapat diagnosis FH, saya bimbang tentang keperluan mengambil ubat sepanjang hayat. Saya diet ketat selama enam bulan, tetapi LDL hampir tidak berubah. Pakar menerangkan bahawa kerana FH adalah genetik, ia bukan salah gaya hidup saya.",
        "Saya mula mengambil statin harian. Ia selamat, berpatutan, dan disubsidi tinggi oleh kerajaan. Ia tiada kesan sampingan dan membantu hati membersihkan kolesterol buruk dari darah.",
        "Saya juga menjaga gaya hidup untuk menyokong ubat. Saya makan oat, sayur, ikan, dan berjalan 30 minit sehari bagi mengekalkan saluran darah yang bersih.",
        "Kini, LDL saya kembali ke paras normal. Menguruskan FH kini hanya sebahagian kecil rutin harian saya seperti menggosok gigi. Saya berasa cergas dan yakin dengan masa depan saya."
      ]
    },
    zh: {
      title: "确诊后的科学管理",
      videoLabel: "患者体验故事 (Kumar, 42)",
      subtitle: "科学的指标监测、安全的每日药物与健康生活如何让心脏回归安全状态。",
      summary: "",
      frames: [
        "心理释怀：理解 FH 是遗传特征，坦然接受单纯靠饮食运动无法完全降脂的事实。",
        "科学服药：每日服用经历数十年验证的安全药物（如他汀），协助肝脏高效清除血液垃圾。",
        "健康生活：多吃高纤维食物（如燕麦），配合适度有氧运动，为心肌打下坚实基础。",
        "指标正常：定期复查显示 LDL 指标已稳稳回归正常范围，动脉血管重获完备保护。"
      ],
      transcript: [
        "大家好，我是 Kumar。当我第一次被确诊为 FH 时，一想到要终身服药，我感到非常抗拒。我坚持了六个月极其严苛的饮食和运动，但我的坏胆固醇指标几乎没有动静。医生耐心向我解释，因为 FH 是基因造成的，我的肝细胞表面缺少抓取胆固醇的受体，所以多余的胆固醇无法自然代谢。这根本不是我的错。",
        "于是我开始每天服用一颗他汀类药物。这是世界上研究最透彻、安全性极高且获得新加坡政府高额补贴的药物。我服药后没有任何副作用。它的原理其实很简单——就是给肝脏提供助力，让它能够清除血液中的坏胆固醇。",
        "同时我也坚持健康的生活习惯。这不是为了替代药物，而是为了支持药物发挥最大疗效。我现在每天吃燕麦、蔬菜和鱼类，并坚持快走 30 分钟。药疗加食疗的结合，能让我的血管保持年轻和弹性。",
        "现在，我的坏胆固醇指标已经彻底降到了正常安全区。管理 FH 已经变成了我日常生活中极其微小、极其简单的一部分，就像每天刷牙一样自然。我现在精力充沛，对未来的健康充满了底气。"
      ]
    },
    ta: {
      title: "கண்டறிந்த பிறகு FH-ஐ நிர்வகித்தல்",
      videoLabel: "நோயாளி அனுபவக் கதை (Kumar, 42)",
      subtitle: "முறையான கண்காணிப்பு, எளிய தினசரி மருந்துகள் மற்றும் வாழ்க்கை முறை உங்கள் கொலஸ்ட்ரால் அளவை எவ்வாறு பாதுகாப்பாக வைத்திருக்கின்றன.",
      summary: "",
      frames: [
        "ஏற்றுக்கொள்ளுதல்: FH என்பது மரபணு சார்ந்தது மற்றும் வெறும் வாழ்க்கைமுறை மாற்றங்களால் மட்டும் இதைக் கட்டுப்படுத்த முடியாது என்பதை அறிதல்.",
        "மருந்துகள்: ஸ்டாடின் போன்ற எளிய தினசரி மருந்துகள் கல்லீரல் கெட்ட கொழுப்பை அகற்ற உதவுகின்றன.",
        "வாழ்க்கை முறை: நார்ச்சத்து அதிகம் உள்ள உணவுகள் மற்றும் உடற்பயிற்சி இதயத்தை ஆரோக்கியமாக வைத்திருக்க உதவும்.",
        "முடிவு: முறையான கண்காணிப்பிற்குப் பிறகு, என் கொலஸ்ட்ரால் அளவு குறைந்து இதயம் பாதுகாப்பாக உள்ளது."
      ],
      transcript: [
        "வணக்கம், என் பெயர் Kumar. எனக்கு FH இருப்பது கண்டறியப்பட்டபோது, வாழ்நாள் முழுவதும் மருந்து உட்கொள்ள வேண்டுமா என்று கவலையாக இருந்தது. ஆறு மாதங்கள் கடுமையான உணவு முறையைப் பின்பற்றினேன், ஆனால் கொலஸ்ட்ரால் குறையவில்லை. இது மரபணு சார்ந்தது என்பதால் கல்லீரலால் தானாக கொழுப்பை அகற்ற முடியாது என்று மருத்துவர் விளக்கினார். இது என் தவறு அல்ல.",
        "நான் தினமும் ஸ்டாடின் மாத்திரை எடுக்கத் தொடங்கினேன். இது மிகவும் பாதுகாப்பானது, எளிமையானது மற்றும் மானிய விலையிலானது. எனக்கு எந்த பக்கவிளைவுகளும் ஏற்படவில்லை. இது கல்லீரல் இயற்கையாக செயல்பட்டு இரத்தத்திலிருந்து கெட்ட கொழுப்பை அகற்ற உதவுகிறது.",
        "உணவுக் கட்டுப்பாட்டையும் உடற்பயிற்சியையும் மருந்துகளுக்குப் பதிலாக அல்லாமல், அவற்றிற்கு ஆதரவாகப் பின்பற்றினேன். ஓட்ஸ், காய்கறிகள் மற்றும் மீன் சாப்பிடுகிறேன், தினமும் 30 நிமிடங்கள் நடக்கிறேன்.",
        "இப்போது, என் LDL கொலஸ்ட்ரால் முற்றிலும் சாதாரண அளவிற்கு வந்துவிட்டது. FH-ஐ நிர்வகிப்பது பல் துலக்குவது போல என் தினசரி வழக்கத்தின் ஒரு எளிய பகுதியாக மாறிவிட்டது. நான் மிகவும் ஆரோக்கியமாக இருக்கிறேன்."
      ]
    }
  },
  costs: {
    en: {
      title: "Understanding Costs and Support",
      videoLabel: "Financial Guide (Siti, 45)",
      subtitle: "How MOH subsidies and MediSave ensure testing is affordable for everyone.",
      summary: "",
      frames: [
        "MOH Subsidies: Eligible Singapore citizens receive up to 75% subsidies for counselling and testing.",
        "MediSave Approved: Co-payments are fully claimable under the Chronic Disease Management Scheme.",
        "Low Cash Out-of-Pocket: Most patients pay very little cash, making testing highly accessible.",
        "Additional Support: Safety nets like Medifund and CHAS benefits ensure no one is left behind."
      ],
      transcript: [
        "Hello, I'm Siti. I want to talk about the financial side of FH testing because that was my biggest worry. In Singapore, the Ministry of Health has made genetic testing highly subsidized. As an eligible citizen, I received a 75% subsidy on my counselling and genetic test.",
        "For the remaining co-payment, I didn't have to pay cash. It is a MediSave-approved clinical expense under the Chronic Disease Management Scheme (CDMS). They easily processed it using my MediSave account, which was a huge relief.",
        "Because of these subsidies, my actual cash out-of-pocket cost was zero. The process is streamlined so the clinic handles all the subsidy and MediSave applications directly during your registration.",
        "For lower-income families, there are extra safety nets like CHAS Blue/Orange benefits and Medifund to ensure absolute affordability. Don't let cost worries stand in the way of protecting your heart health."
      ]
    },
    ms: {
      title: "Memahami Kos dan Sokongan",
      videoLabel: "Panduan Kewangan (Siti, 45)",
      subtitle: "Bagaimana subsidi MOH dan MediSave memastikan ujian mampu milik untuk semua.",
      summary: "",
      frames: [
        "Subsidi MOH: Warganegara Singapura yang layak menerima subsidi sehingga 75% untuk kaunseling dan ujian.",
        "Lulus MediSave: Bayaran bersama boleh dituntut sepenuhnya di bawah Skim Pengurusan Penyakit Kronik.",
        "Kos Tunai Rendah: Kebanyakan pesakit membayar sedikit tunai, menjadikan ujian sangat mudah diakses.",
        "Sokongan Tambahan: Jaring keselamatan seperti bantuan Medifund dan CHAS memastikan tiada sesiapa terpinggir."
      ],
      transcript: [
        "Helo, saya Siti. Saya ingin bercakap tentang aspek kewangan ujian FH kerana itu kebimbangan terbesar saya. Di Singapura, Kementerian Kesihatan menyediakan subsidi yang tinggi untuk ujian genetik. Sebagai warganegara yang layak, saya menerima subsidi 75% untuk ujian saya.",
        "Untuk baki bayaran, saya tidak mengeluarkan tunai. Ia merupakan perbelanjaan diluluskan MediSave di bawah Skim Pengurusan Penyakit Kronik (CDMS). Mereka memprosesnya dengan mudah menggunakan akaun MediSave.",
        "Oleh kerana subsidi ini, kos tunai keluar dari poket sebenar saya adalah sifar. Proses ini sangat teratur di mana klinik menguruskan semua permohonan subsidi dan MediSave secara langsung semasa pendaftaran.",
        "Bagi keluarga berpendapatan rendah, terdapat jaring keselamatan tambahan seperti bantuan CHAS dan Medifund untuk menjamin kemampuan. Jangan biarkan kebimbangan kos menghalang anda melindungi kesihatan jantung."
      ]
    },
    zh: {
      title: "费用与政府补贴说明",
      videoLabel: "财务指南 (Siti, 45)",
      subtitle: "了解政府高额补贴与 MediSave 如何共同保障新加坡公民轻松负担基因检测。",
      summary: "",
      frames: [
        "卫生部高额补贴：符合资格的新加坡公民在专家门诊和基因检测中可享受高达 75% 的政府补贴。",
        "MediSave 强力支持：个人共付部分完全属于 CDMS 慢性病可报销开支，可全额使用 MediSave 账户进行抵扣。",
        "几乎零现金开销：绝大多数患者通过补贴和公积金抵扣后，无需支付任何额外现金，毫无经济负担。",
        "全方位兜底资助：针对中低收入家庭，CHAS 蓝卡、建国一代卡以及 Medifund 确保医疗费绝对能够负担。"
      ],
      transcript: [
        "大家好，我是 Siti。我想和大家聊聊 FH 基因检测的费用问题，因为这曾是我最担心的事情。在新加坡，卫生部 (MOH) 对临床遗传学咨询和基因检测提供了非常丰厚的补贴。作为符合条件的新加坡公民，我的咨询和检测当场享受了 75% 的补贴。",
        "而对于剩下需要个人承担的自付部分，我其实根本不用掏现金。这笔费用已经纳入了慢性病管理计划 (CDMS) 下的 MediSave 支付目录。医院在收费时直接刷了我的 MediSave 账户，这让我松了一口气。",
        "得益于这些贴心的补贴政策，我最后实际掏腰包的现金开销为零。诊所的后台系统非常智能，在您登记注册时，工作人员就会直接帮您办理好补贴和 MediSave 的划扣申请，无需跑繁杂的手续。",
        "对于中低收入的家庭，政府还额外提供了 CHAS 蓝卡/橙卡以及 Medifund 医疗救助基金等方案，确保绝对不会有人因为经济困难而看不起病。所以，千万不要因为担心费用，而耽误了保护您和家人的心脏健康。"
      ]
    },
    ta: {
      title: "செலவுகள் மற்றும் ஆதரவைப் புரிந்துகொள்ளுதல்",
      videoLabel: "நிதி வழிகாட்டி (Siti, 45)",
      subtitle: "MOH மானியங்கள் மற்றும் MediSave எவ்வாறு அனைவரும் எளிதில் பரிசோதனை செய்ய உதவுகின்றன.",
      summary: "",
      frames: [
        "MOH மானியங்கள்: தகுதியுள்ள சிங்கப்பூர் குடிமக்களுக்கு ஆலோசனை மற்றும் பரிசோதனைக்கு 75% வரை மானியம் வழங்கப்படுகிறது.",
        "MediSave அனுமதி: மீதமுள்ள தொகையை நாள்பட்ட நோய் மேலாண்மை திட்டத்தின் கீழ் MediSave மூலம் செலுத்தலாம்.",
        "குறைந்த கட்டணம்: பெரும்பாலான நோயாளிகள் மிகக் குறைந்த கட்டணமே செலுத்துகின்றனர், இது பரிசோதனையை எளிதாக்குகிறது.",
        "கூடுதல் ஆதரவு: Medifund மற்றும் CHAS போன்ற பாதுகாப்புத் திட்டங்கள் நிதி நெருக்கடியில் உள்ளவர்களுக்கும் உதவுகின்றன."
      ],
      transcript: [
        "வணக்கம், நான் Siti. FH சோதனையின் நிதிப் பக்கத்தைப் பற்றி பேச விரும்புகிறேன், ஏனெனில் அதுதான் என் மிகப்பெரிய கவலையாக இருந்தது. சிங்கப்பூரில் சுகாதார அமைச்சகம் மரபணு சோதனைக்கு அதிக மானியம் வழங்குகிறது. தகுதியுள்ள குடிமகள் என்ற முறையில், எனது ஆலோசனை மற்றும் சோதனைக்கு 75% மானியம் பெற்றேன்.",
        "மீதமுள்ள தொகையை நான் பணமாக செலுத்த வேண்டியதில்லை. இது நாள்பட்ட நோய் மேலாண்மை திட்டத்தின் (CDMS) கீழ் MediSave அங்கீகரிக்கப்பட்ட மருத்துவ செலவு ஆகும். அவர்கள் அதை என் MediSave கணக்கைப் பயன்படுத்தி எளிதாகக் கழித்தனர், இது எனக்குப் பெரிய நிம்மதியைத் தந்தது.",
        "இந்த மானியங்கள் காரணமாக, என் கையில் இருந்து செலவான தொகை கிட்டத்தட்ட ஏதுமில்லை. இந்த செயல்முறை மிகவும் எளிமையானது, உங்கள் பதிவின் போது மானியம் மற்றும் MediSave விண்ணப்பங்களை மருத்துவமனையே நேரடியாக நிர்வகிக்கும்.",
        "குறைந்த வருமானம் உள்ள குடும்பங்களுக்கு, CHAS Blue/Orange மற்றும் Medifund போன்ற கூடுதல் பாதுகாப்புத் திட்டங்கள் உள்ளன. எனவே, நிதி கவலைகள் உங்கள் இதய ஆரோக்கியத்தைப் பாதுகாப்பதைத் தடுக்க அனுமதிக்காதீர்கள்."
      ]
    }
  },
  risk: {
    en: {
      title: "Early Detection and Reducing Future Risk",
      videoLabel: "Preventive Care (Alex, 29)",
      subtitle: "Why identifying FH early prevents silent plaque buildup and secures your future.",
      summary: "",
      frames: [
        "Silent Danger: High LDL cholesterol from birth slowly accumulates in blood vessels without any warning signs.",
        "Early Intervention: Catching FH before any plaque builds up keeps your arteries clean and healthy.",
        "Normalizing Risk: Modern clinical care reduces cardiovascular risk back to that of the general public.",
        "Peace of Mind: Proactive management allows you to live a long, active life without worry."
      ],
      transcript: [
        "Hi, I'm Alex. I look healthy and feel great, so finding out I had extreme high cholesterol was a shock. My doctor explained that FH is a silent condition. Because it is present from birth, LDL cholesterol slowly builds up inside your blood vessels for decades before any symptoms appear.",
        "That's why early detection is so critical. A genetic test gives you 100% certainty. It allows you to intervene before any permanent plaque forms in your arteries, keeping them clean and fully functional.",
        "Once diagnosed, managing FH is highly effective. With modern, subsidized therapies, we can bring your LDL levels right back down to normal. This completely resets your cardiovascular risk curve, making it identical to someone without FH.",
        "Taking action early gave me immense peace of mind. I no longer worry about what might happen. I eat well, take my daily pill, and enjoy my life knowing my heart is protected for the long run."
      ]
    },
    ms: {
      title: "Pengesanan Awal dan Mengurangkan Risiko Masa Depan",
      videoLabel: "Penjagaan Pencegahan (Alex, 29)",
      subtitle: "Mengapa mengesan FH awal menghalang pembentukan plak senyap dan menjamin masa depan.",
      summary: "",
      frames: [
        "Bahaya Senyap: Kolesterol LDL tinggi sejak lahir perlahan-lahan terkumpul di dalam saluran darah tanpa amaran.",
        "Intervensi Awal: Mengesan FH sebelum plak terbentuk memastikan arteri bersih dan sihat sepenuhnya.",
        "Menormalkan Risiko: Penjagaan klinikal moden mengurangkan risiko kardiovaskular kembali ke tahap masyarakat umum.",
        "Ketenangan Fikiran: Pengurusan proaktif membolehkan anda hidup lama dan aktif tanpa rasa bimbang."
      ],
      transcript: [
        "Hai, saya Alex. Saya kelihatan sihat, jadi mengetahui saya mempunyai kolesterol sangat tinggi adalah kejutan. Doktor menerangkan bahawa FH adalah keadaan senyap sejak lahir di mana kolesterol LDL perlahan-lahan terkumpul di dalam saluran darah sebelum gejala muncul.",
        "Sebab itulah pengesanan awal penting. Ujian genetik memberi kepastian 100% dan membolehkan anda bertindak sebelum sebarang plak kekal terbentuk di arteri.",
        "Sebaik sahaja didiagnosis, pengurusan FH sangat berkesan. Terapi moden bersubsidi boleh menurunkan tahap LDL kembali ke paras normal, menetapkan semula keluk risiko kardiovaskular anda.",
        "Mengambil tindakan awal memberi ketenangan fikiran yang tidak terhingga. Saya makan secara sihat, mengambil ubat harian, dan menikmati hidup saya dengan mengetahui jantung saya dilindungi."
      ]
    },
    zh: {
      title: "早期发现与防范未来风险",
      videoLabel: "预防医学 (Alex, 29)",
      subtitle: "了解为什么及早发现并锁定 FH，能阻断血管中的无声病变，掌握健康主动权。",
      summary: "",
      frames: [
        "无声威胁：来自基因的高 LDL 胆固醇从出生起便在血管中缓慢积聚，在没有症状的情况下悄然伤害心血管。",
        "早期干预：在坚硬的动脉粥样硬化斑块形成前锁定 FH，能使您的血管终身保持干净、通畅和富有弹性。",
        "风险回归正常：现代补贴疗法可以让您的坏胆固醇水平降至与普通人相同的安全值，彻底抹平心脏风险。",
        "收获平和心态：防患于未然的主动管理，让您摆脱未知的焦虑，畅享长寿、活跃和充满底气的人生。"
      ],
      transcript: [
        "大家好，我是 Alex。我看起来很强壮，也觉得自己非常健康，所以在体检发现我的坏胆固醇水平极高时，我完全惊呆了。我的医生和顾问向我解释，FH 是一种极具欺骗性的无声状态。因为它自出生起就存在，高浓度的坏胆固醇会在长达数十年的时间里慢慢累积在血管壁中，直到引发严重后果之前，人体往往没有任何不适。",
        "这就是为什么提早发现、科学诊断如此关键。基因检测能为您提供 100% 确凿的诊断。它能让我们在不可逆的坚硬斑块在动脉中堆积起来之前，及早进行科学干预，确保血管长久保持通畅、富有弹性的健康状态。",
        "一旦确诊，FH 的临床管理其实非常成熟且行之有效。配合新加坡卫生部提供的丰厚补贴，使用现代降脂药可以安全、轻松地将您的 LDL 降回到完全健康的标准。这等于将您的心血管风险彻底复位，使之与普通人群完全相同。",
        "正是及早采取的主动防范，给了我无可比拟的平和心境。我再也不用每天担惊受怕。我规律地吃饭、每天服药，并且无忧无虑地享受生活，因为我深知，我的心脏已经在科学的保护伞下安全地运转了。"
      ]
    },
    ta: {
      title: "முன்கூட்டியே கண்டறிதல் மற்றும் எதிர்கால ஆபத்தைக் குறைத்தல்",
      videoLabel: "முன்னெச்சரிக்கை பராமரிப்பு (Alex, 29)",
      subtitle: "முன்கூட்டியே FH-ஐக் கண்டறிவது இரத்த நாளங்களில் அடைப்பைத் தடுத்து உங்கள் எதிர்காலத்தை எவ்வாறு பாதுகாக்கிறது.",
      summary: "",
      frames: [
        "அமைதியான ஆபத்து: பிறப்பிலிருந்தே இருக்கும் அதிக LDL கொலஸ்ட்ரால் எந்த அறிகுறியும் இல்லாமல் இரத்த நாளங்களில் மெதுவாக வடிகிறது.",
        "முன்கூட்டியே கண்டறிதல்: இரத்த நாளங்களில் அடைப்பு ஏற்படுவதற்கு முன் FH-ஐக் கண்டறிவது தமனிகளைச் சுத்தமாக வைத்திருக்கும்.",
        "ஆபத்தைக் குறைத்தல்: நவீன மருத்துவ சிகிச்சை இதய நோய் ஆபத்தை சாதாரண மனிதர்களின் அளவிற்கு குறைக்கிறது.",
        "நிம்மதியான வாழ்வு: முன்கூட்டியே நிர்வகிப்பது கவலையின்றி சுறுசுறுப்பாகவும் நீண்ட காலம் வாழவும் உதவுகிறது."
      ],
      transcript: [
        "வணக்கம், நான் Alex. நான் ஆரோக்கியமாக இருக்கிறேன், எனவே எனக்கு அதிக கொலஸ்ட்ரால் இருப்பதைக் கேட்டபோது அதிர்ச்சியாக இருந்தது. FH என்பது அமைதியான நோய் என்று என் மருத்துவர் விளக்கினார். இது பிறப்பிலிருந்தே இருப்பதால், எந்த அறிகுறியும் தோன்றுவதற்கு முன்பே பல தசாப்தங்களாக தமனிகளில் கொழுப்பு மெதுவாக சேர்கிறது.",
        "அதனால்தான் முன்கூட்டியே கண்டறிவது மிகவும் அவசியம். மரபணு சோதனை உங்களுக்கு 100% துல்லியமான முடிவை வழங்குகிறது. தமனிகளில் அடைப்பு ஏற்படுவதற்கு முன்பே சிகிச்சையைத் தொடங்க இது உதவுகிறது.",
        "கண்டறியப்பட்ட பிறகு, FH-ஐ நிர்வகிப்பது மிகவும் எளிது. நவீன மானிய விலையிலான சிகிச்சைகள் மூலம், கொலஸ்ட்ரால் அளவை சாதாரண நிலைக்குக் கொண்டுவர முடியும். இது உங்கள் இதய நோய் ஆபத்தைக் குறைத்து உங்களை முழுமையாகப் பாதுகாக்கிறது.",
        "முன்கூட்டியே நடவடிக்கை எடுத்தது எனக்குப் பெரிய நிம்மதியைத் தந்துள்ளது. எதிர்காலத்தைப் பற்றிய கவலை எனக்கு இப்போது இல்லை. நல்ல உணவை உண்டு, மாத்திரையைத் தவறாமல் எடுத்துக்கொண்டு மகிழ்ச்சியாக வாழ்கிறேன்."
      ]
    }
  },
  default: {
    en: {
      title: "What happens during FH testing?",
      videoLabel: "Patient Experience Story (Chloe, 21)",
      subtitle: "See what to expect before your appointment.",
      summary: "I live a healthy lifestyle, exercise regularly, and eat well, so I assumed high cholesterol was something only older people get. My doctor explained that FH is inherited from birth—it has nothing to do with lifestyle or age.",
      frames: [
        "I eat healthy and stay active. I thought high cholesterol was only for elderly people or those who lead an unhealthy lifestyle.",
        "The genetic counsellor didn't push me at all. They just laid out the facts and let me make my own decision.",
        "I found out existing health insurance is fully protected, and MOH subsidies cover up to 75% of the cost.",
        "I decided to do the test because getting clear facts helped me take control of my health and clarity on how to keep myself healthy."
      ],
      transcript: [
        "Hey everyone, I'm Chloe. When a screening flagged my LDL cholesterol as extremely high, I was totally confused. I live a healthy lifestyle, exercise regularly, and eat well, so I assumed high cholesterol was something only older people get, or maybe people who lead unhealthy lifestyles. My doctor explained that FH is inherited from birth—it has nothing to do with lifestyle or age.",
        "I was really skeptical about genetic counselling at first but, the counsellor didn't try to push me. She just explained how the genetics work, answered my questions about privacy, and left the decision completely up to me.",
        "We talked about the practical side too. She clarified that under Singapore's guidelines, existing health insurance can't be touched, and MOH covers up to 75% of the costs. There were no hidden catches.",
        "In the end, I decided to go ahead and take the blood test. Getting the facts didn't change who I am, but it did give me clarity on how to keep myself healthy. It's about knowing your body, not living in fear."
      ]
    },
    ms: {
      title: "Apa yang berlaku semasa ujian FH?",
      videoLabel: "Kisah Pengalaman Pesakit (Chloe, 21)",
      subtitle: "Lihat apa yang dijangka sebelum janji temu anda.",
      summary: "Saya mengamalkan gaya hidup sihat tetapi doktor menjelaskan bahawa FH diwarisi sejak lahir—ia tiada kaitan dengan gaya hidup atau umur.",
      frames: [
        "Saya makan sihat dan aktif. Saya fikir kolesterol tinggi hanya untuk orang tua atau gaya hidup tidak sihat.",
        "Kaunselor genetik tidak mendesak saya. Mereka hanya membentangkan fakta dan membiarkan saya membuat keputusan sendiri.",
        "Saya dapati insurans kesihatan sedia ada dilindungi sepenuhnya, dan subsidi MOH meliputi sehingga 75% kos.",
        "Saya memutuskan untuk melakukan ujian kerana mendapat fakta jelas membantu saya mengawal kesihatan saya."
      ],
      transcript: [
        "Hai semua, saya Chloe. Apabila saringan menunjukkan kolesterol LDL saya sangat tinggi, saya keliru kerana saya aktif dan makan sihat. Doktor menjelaskan FH diwarisi sejak lahir.",
        "Saya ragu-ragu tentang kaunseling genetik pada mulanya, tetapi kaunselor tidak memaksa. Beliau menerangkan prinsip genetik dan menjawab soalan privasi saya.",
        "Kami berbincang tentang kos juga. Di bawah garis panduan Singapura, insurans kesihatan sedia ada tidak terjejas dan MOH menampung sehingga 75% kos.",
        "Akhirnya saya mengambil ujian darah. Mendapat fakta memberi saya kejelasan cara untuk kekal sihat. Ini tentang mengenali badan anda, bukan hidup dalam ketakutan."
      ]
    },
    zh: {
      title: "FH检测期间会发生什么？",
      videoLabel: "患者体验故事 (Chloe, 21)",
      subtitle: "在预约前了解您可以预期的内容。",
      summary: "我保持着健康的生活方式，但医生解释说，FH 是自出生起就遗传的，与生活方式或年龄无关。",
      frames: [
        "我饮食健康并保持活跃。我以为高胆固醇只属于老年人或生活方式不健康的人。",
        "遗传咨询师完全没有强迫我。他们只是列出事实，让我自己做决定。",
        "我发现现有的健康保险受到完全保护，MOH补贴覆盖高达75%的费用。",
        "我决定做这个检测，因为获得清晰的事实帮助我掌控自己的健康，并明确如何保持健康。"
      ],
      transcript: [
        "大家好，我是Chloe。当一次筛查显示我的LDL胆固醇极高时，我完全困惑了。我生活方式健康，定期运动，饮食均衡，所以我以为高胆固醇只是老年人才会有的问题。我的医生解释说FH是从出生时就遗传的——与生活方式或年龄无关。",
        "起初我对遗传咨询持怀疑态度，但咨询师并没有试图强迫我。她只是解释了遗传学的原理，回答了我关于隐私的问题，并完全把决定权留给了我。",
        "我们还讨论了实际问题。她澄清说在新加坡的指导方针下，现有的健康保险不会受到影响，MOH覆盖高达75%的费用。没有任何隐藏的陷阱。",
        "最终，我决定继续进行血液检测。获得事实并没有改变我是谁，但它确实让我清楚地知道如何保持健康。这是关于了解你的身体，而不是生活在恐惧中。"
      ]
    },
    ta: {
      title: "FH சோதனையின் போது என்ன நடக்கும்?",
      videoLabel: "நோயாளி அனுபவக் கதை (Chloe, 21)",
      subtitle: "உங்கள் சந்திப்பிற்கு முன் என்ன எதிர்பார்க்கலாம் என்று அறிந்துகொள்ளுங்கள்.",
      summary: "நான் ஆரோக்கியமான வாழ்க்கை முறையைப் பின்பற்றினாலும், FH பிறப்பிலிருந்தே மரபணு ரீதியாகப் பெறப்படுகிறது என்று மருத்துவர் விளக்கினார்.",
      frames: [
        "நான் ஆரோக்கியமாக உண்ணுகிறேன் மற்றும் சுறுசுறுப்பாக இருக்கிறேன். அதிக கொலஸ்ட்ரால் மூத்தவர்களுக்கு அல்லது ஆரோக்கியமற்ற வாழ்க்கை முறை கொண்டவர்களுக்கு மட்டுமே என நான் நினைத்தேன்.",
        "மரபணு ஆலோசகர் என்னை வற்புறுத்தவில்லை. அவர்கள் உண்மைகளை மட்டுமே முன்வைத்து முடிவெடுக்க எனக்கு விட்டுவிட்டார்கள்.",
        "இருக்கும் சுகாதார காப்பீடு முழுமையாக பாதுகாக்கப்பட்டுள்ளது, மேலும் MOH மானியங்கள் செலவின் 75% வரை ஈடுசெயksிறது என நான் அறிந்தேன்.",
        "தெளிவான உண்மைகளை அறிந்துகொள்வது என் ஆரோக்கியத்தை கட்டுப்பாட்டில் வைக்கவும், ஆரோக்கியமாக இருக்க எனக்கு தெளிவைத் தந்ததால் சோதனை செய்ய முடிவு செய்தேன்."
      ],
      transcript: [
        "அனைவருக்கும் வணக்கம், நான் Chloe. என் கொலஸ்ட்ரால் அதிகமாக இருப்பதைக் கண்டபோது குழம்பினேன். நான் ஆரோக்கியமாக இருப்பதால், அதிக கொலஸ்ட்ரால் வயதானவர்களுக்கு மட்டுமே என நினைத்தேன். ஆனால் FH பிறப்பிலிருந்தே பெறப்படுகிறது என்று மருத்துவர் விளக்கினார்.",
        "ஆலோசகர் என்னை வற்புறுத்தவில்லை. மரபணுக்கள் எப்படி வேலை செய்கின்றன என்பதை விளக்கி முடிவை எனக்கே விட்டுவிட்டார்.",
        "சிங்கப்பூர் வழிகாட்டுதல்களின்படி காப்பீடு பாதிக்கப்படாது, மேலும் MOH 75% வரை செலவை ஏற்கும் என்று தெளிவுபடுத்தினார்.",
        "இறுதியில் இரத்த பரிசோதனை செய்ய முடிவு செய்தேன். இது உடலை அறிந்துகொள்வதற்கானது, பயத்தில் வாழ்வதற்கல்ல."
      ]
    }
  }
};

// Adaptation summaries based on Step 1 (knowledgeLevel)
export const ADAPTATIONS: Record<string, Record<'beginner' | 'advanced', Record<'en' | 'ms' | 'zh' | 'ta', string>>> = {
  family: {
    beginner: {
      en: "A reassuring family story. Learn how simple cascade checks work and how they protect your brothers, sisters, and children without any scary medical terms.",
      ms: "Kisah keluarga yang menenangkan. Ketahui cara pemeriksaan lata mudah berfungsi dan bagaimana ia melindungi adik-beradik serta anak-anak anda tanpa istilah perubatan yang menakutkan.",
      zh: "一个温馨的家庭故事。带您了解轻松的家系筛查流程，在没有深奥医学术语的前提下，了解它如何守护您的兄弟姐妹和子女。",
      ta: "குடும்பப் பரிசோதனை எவ்வாறு எளிய முறையில் செயல்படுகிறது மற்றும் அது உங்கள் உடன்பிறப்புகள், குழந்தைகளை எவ்வாறு பாதுகாக்கிறது என்பதைக் காட்டும் கதை."
    },
    advanced: {
      en: "A focused clinical walkthrough of autosomal dominant cascade screening. Understand clinical referral mechanisms and subvention policies for first-degree relatives.",
      ms: "Panduan klinikal saringan lata dominan autosomal. Fahami mekanisma rujukan klinik dan polisi subvensi kerajaan untuk saudara darjah pertama.",
      zh: "常染色体显性遗传家系筛查的临床路径解析。深入了解一级亲属的临床转诊机制、筛查比例和卫生部专项财政资助政策。",
      ta: "நெருங்கிய உறவினர்களுக்கான மரபணு சல்லடை முறை, மருத்துவ பரிந்துரை வழிமுறைகள் மற்றும் நிதி மானியங்கள் பற்றிய விரிவான விளக்கம்."
    }
  },
  testing: {
    beginner: {
      en: "A warm step-by-step walkthrough. We explain what pre-test counselling is, the quick blood draw, and how the results give you safe, clear facts.",
      ms: "Langkah demi langkah yang mesra. Kami menerangkan maksud kaunseling pra-ujian, pengambilan darah yang cepat, dan bagaimana keputusan memberikan fakta yang selamat.",
      zh: "轻松温和的步骤指南。为您揭秘预检咨询、不超过10分钟的门诊抽血，以及检测报告如何为您提供安全确凿的健康依据。",
      ta: "சோதனைக்கு முந்தைய ஆலோசனை, எளிய இரத்த பரிசோதனை மற்றும் அதன் முடிவுகள் உங்களுக்கு எவ்வாறு தெளிவான உண்மைகளைத் தருகின்றன என்பது பற்றிய எளிய விளக்கம்."
    },
    advanced: {
      en: "A professional mapping of the DNA sequencing journey. Details pre-test pedigree mapping, PCR/Next-Generation Sequencing, and post-test genetic variant reviews.",
      ms: "Pemetaan profesional perjalanan penjujukan DNA. Memperincikan pemetaan salasilah pra-ujian, Penjujukan Generasi Seterusnya (NGS), dan penilaian varian genetik.",
      zh: "高通量测序的专业医学图谱。系统剖析预检家族谱系绘制、高通量测序 (NGS) 技术和后期致病性变异位点分析流程。",
      ta: "டிஎன்ஏ வரிசைமுறை சோதனையின் முழு மருத்துவ வரைபடம். சோதனைக்கு முந்தைய குடும்ப வரைபடம், என்ஜிஎஸ் சோதனை மற்றும் மாறுபாடு பகுப்பாய்வு பற்றிய விளக்கம்."
    }
  },
  treatment: {
    beginner: {
      en: "A positive story about daily heart care. See how standard daily medicines and high-fiber foods protect your blood vessels and keep you fully active.",
      ms: "Kisah positif tentang penjagaan jantung harian. Lihat bagaimana ubat harian biasa dan makanan berserat tinggi melindungi saluran darah anda.",
      zh: "有关心脏日常护理的积极故事。了解科学安全的每日药物搭配高纤维膳食如何保护您的血管，让您充满活力地畅享生活。",
      ta: "தினசரி இதயப் பராமரிப்பு பற்றிய நேர்மறையான கதை. எளிய தினசரி மருந்துகளும் நார்ச்சத்து உணவுகளும் இரத்த நாளங்களைப் பாதுகாப்பதை விளக்குகிறது."
    },
    advanced: {
      en: "A clinical overview of LDL receptor upregulation therapies. Focuses on statin mechanisms, lifestyle integration, and reducing lifetime cumulative cardiovascular risk.",
      ms: "Tinjauan klinikal mengenai terapi peningkatan reseptor LDL. Fokus kepada mekanisma statin dan pengurangan risiko kardiovaskular kumulatif.",
      zh: "坏胆固醇 (LDL) 受体上调疗法的医学评估。侧重于他汀类药理作用机制、协同生活方式干预以及降低生存期累积心血管风险的目标。",
      ta: "எல்டிஎல் ஏற்புத்திறனை அதிகரிக்கும் சிகிச்சைகள், மருந்துகள் செயல்படும் விதம் மற்றும் வாழ்நாள் இதய நோய் ஆபத்தைக் குறைப்பது பற்றிய விளக்கம்."
    }
  },
  costs: {
    beginner: {
      en: "Clear, simple answers to your financial questions. We show you how MOH subsidies make testing extremely cheap and how MediSave covers your clinic bills.",
      ms: "Jawapan mudah untuk soalan kewangan anda. Kami tunjukkan bagaimana subsidi MOH menjadikan ujian sangat murah dan penggunaan MediSave.",
      zh: "关于检测费用的通俗解读。了解卫生部高额补贴如何大幅减免账单，以及如何直接使用公积金 (MediSave) 抵扣个人自付部分。",
      ta: "நிதி பற்றிய எளிய விளக்கங்கள். MOH மானியங்கள் சோதனையைக் குறைந்த செலவாக்குவதையும், MediSave மூலம் செலுத்துவதையும் விளக்குகிறது."
    },
    advanced: {
      en: "A comprehensive policy overview of MOH subvention categories, Chronic Disease Management Scheme (CDMS) MediSave claim limits, and financial safety nets.",
      ms: "Tinjauan menyeluruh polisi kategori subvensi MOH, had tuntutan MediSave Skim Pengurusan Penyakit Kronik (CDMS), dan jaring keselamatan bantuan kewangan.",
      zh: "新加坡医疗财政资助政策总览。深度剖析卫生部津贴级比例、CDMS慢性病MediSave支付限额以及Medifund兜底财务援助方案。",
      ta: "MOH நிதியுதவி பிரிவுகள், நாள்பட்ட நோய் மேலாண்மை திட்ட MediSave வரம்புகள் மற்றும் கூடுதல் நிதிப் பாதுகாப்பு வழிகள் பற்றிய விரிவான விளக்கம்."
    }
  },
  risk: {
    beginner: {
      en: "A supportive guide to keeping your heart safe. Understand why finding FH early keeps your blood vessels fully clean and gives you total peace of mind.",
      ms: "Panduan mesra untuk menjaga keselamatan jantung. Fahami mengapa pengesanan awal FH memastikan saluran darah bersih dan memberi anda ketenangan fikiran.",
      zh: "呵护您心脏健康的预防指南。了解为什么在无症状阶段及早锁定 FH 能够阻断血管垃圾积聚，让您收获长久的平和心态。",
      ta: "இதயத்தைப் பாதுகாப்பாக வைப்பதற்கான எளிய வழிகாட்டி. முன்கூட்டியே கண்டறிவது இரத்த நாளங்களைச் சுத்தமாக வைத்து நிம்மதியைத் தருவதை விளக்குகிறது."
    },
    advanced: {
      en: "A diagnostic pathogenetic overview of cumulative LDL burden. Focuses on early intervention to preserve endothelial integrity and reduce cardiovascular events.",
      ms: "Tinjauan patogenesis diagnostik beban LDL kumulatif. Fokus kepada intervensi awal untuk memelihara integriti endotelial dan mengelakkan strok/serangan jantung.",
      zh: "累积性 LDL 胆固醇负荷的病理生化学原理。侧重于通过超早期医学干预维护血管内皮功能，从根本上降低终身心肌梗死等急性事件发生率。",
      ta: "கொலஸ்ட்ரால் சேர்வதால் ஏற்படும் தமனி அடைப்பு, இரத்த நாளங்களின் சுவர்களைப் பாதுகாத்தல் மற்றும் முன்கூட்டியே தடுப்பது பற்றிய மருத்துவ கண்ணோட்டம்."
    }
  }
};

/**
 * Selector function that returns the best matching story and dynamic summary based on questionnaire values.
 */
export function getPersonalizedStory(
  familiarity: 'new' | 'little' | 'research' | 'advanced' | null,
  topics: string[],
  concerns: string[],
  status: 'completed' | 'skipped' | null,
  language: 'en' | 'ms' | 'zh' | 'ta'
): StoryDetails {
  // 1. If skipped, not completed, or default is explicitly required
  if (status === 'skipped' || !familiarity) {
    const base = STORIES.default[language] || STORIES.default.en;
    return { ...base };
  }

  // 2. Map Step 2 (selectedTopics) and Step 3 (selectedConcerns) to approved journeys
  let key = 'default';

  const hasFamily = topics.includes('topic-family') || concerns.includes('concern-family');
  const hasTesting = topics.includes('topic-testing') || topics.includes('topic-next') || concerns.includes('concern-test');
  const hasCosts = topics.includes('topic-costs') || concerns.includes('concern-cost');
  const hasTreatment = topics.includes('topic-treatment') || topics.includes('topic-lifestyle') || concerns.includes('concern-meds');
  const hasRisk = topics.includes('topic-risk') || topics.includes('topic-basics') || concerns.includes('concern-diagnosis') || concerns.includes('concern-heart') || concerns.includes('concern-[#00a859]');

  if (hasFamily) {
    key = 'family';
  } else if (hasTesting) {
    key = 'testing';
  } else if (hasCosts) {
    key = 'costs';
  } else if (hasTreatment) {
    key = 'treatment';
  } else if (hasRisk) {
    key = 'risk';
  }

  // Fallback if no specific topic/concern matched
  if (key === 'default') {
    const base = STORIES.default[language] || STORIES.default.en;
    return { ...base };
  }

  const selectedLocalizedStory = STORIES[key][language] || STORIES[key].en;
  
  // 3. Adapt explanation depth based on Step 1 (knowledgeLevel)
  // 'new' and 'little' map to 'beginner'
  // 'research' and 'advanced' map to 'advanced'
  const isAdvanced = familiarity === 'research' || familiarity === 'advanced';
  const levelKey = isAdvanced ? 'advanced' : 'beginner';

  const dynamicSummary = ADAPTATIONS[key]?.[levelKey]?.[language] || ADAPTATIONS[key]?.[levelKey]?.en || "";

  return {
    ...selectedLocalizedStory,
    summary: dynamicSummary
  };
}
