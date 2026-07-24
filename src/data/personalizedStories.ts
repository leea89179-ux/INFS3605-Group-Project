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
      subtitle: "How one family protected their next generation.",
      summary: "",
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
      subtitle: "Bagaimana satu keluarga melindungi generasi seterusnya.",
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
      subtitle: "一个家庭如何共同守护下一代的心脏健康。",
      summary: "",
      frames: [
        "确诊后，我了解到我的兄弟姐妹和孩子们都有 50% 的概率遗传相同的 FH 基因变异。",
        "咨询师为我提供了专业的家系告知书，让我能轻松、温情地向亲人解释这个健康状况。",
        "我的家人们拿着信去公立诊所接受了高额补贴筛查，在血管出现病变前就及早发现了隐患。",
        "现在我们共同管理。全家携手采取预防性措施，消除恐慌，让每个人都保持健康。"
      ],
      transcript: [
        "大家好，我是 Zack。当我被确诊为 FH 时，我首先想到的是我的家人。遗传咨询师解释说，直系亲属都有 50% 的概率携带相同的致病基因。这听起来有些沉重，但团队鼓励我，这份知情权是保护他们的有力武器。",
        "他们给了我简明易懂的家庭沟通指南和打印好的亲属告知信。这让对话变得简单得多，我不必亲自去解释那些复杂的医学名词。",
        "我的姐姐和哥哥拿着告知信去了最近的诊所。得益于卫生部 (MOH) 对家系筛查的特别补贴，他们的自费金额极低。姐姐查出了相同变异，而哥哥很幸运指标正常。因为发现得早，姐姐立刻开始了早期保护性治疗。",
        "现在，我们全家互相支持、共同关注心脏健康。基因筛查没有带来隔阂，反而让我们靠得更近。这不是为了去指责谁，而是给爱的人一个畅享长寿健康生活的机会。"
      ]
    },
    ta: {
      title: "குடும்பப் பரிசோதனைப் பயணம்",
      videoLabel: "நோயாளி அனுபவக் கதை (Zack, 34)",
      subtitle: "ஒரு குடும்பம் தங்களின் அடுத்த தலைமுறையை எவ்வாறு பாதுகாத்தது.",
      summary: "",
      frames: [
        "எனக்கு கண்டறியப்பட்ட பிறகு, என் உடன்பிறப்புகள் மற்றும் குழந்தைகளுக்கு FH மரபணு இருக்க 50% வாய்ப்பு உள்ளதை அறிந்தேன்.",
        "என் ஆலோசகர் பரிந்துரைக் கடிதங்களை வழங்கினார், இது என் உறவினர்களுக்கு விளக்குவதை எளிதாக்கியது.",
        "என் உடன்பிறப்புகள் பொது மருத்துவமனைகளில் மானியத்துடன் கூடிய பரிசோதனை செய்து, முன்கூட்டியே கண்டறிந்தனர்.",
        "நாங்கள் இப்போது அதை இணைந்து நிர்வகிக்கிறோம். குடும்பமாக எடுக்கும் முன்முயற்சி பயத்தைப் போக்குகிறது."
      ],
      transcript: [
        "வணக்கம், நான் Zack. எனக்கு FH கண்டறியப்பட்டபோது, எனது முதல் எண்ணம் எனது குடும்பத்தைப் பற்றியது. என் குடும்பத்தினருக்கும் 50% வாய்ப்பு உள்ளது என்று ஆலோசகர் விளக்கிய போது, அது பாரமாக இருந்தது. ஆனால் இந்த அறிவு அவர்களைப் பாதுகாக்கும் சக்தி வாய்ந்தது என்பதை உணர்ந்தேன்.",
        "அவர்கள் எனக்கு எளிய குடும்ப வழிகாட்டியையும் எனது உறவினர்களுக்கான பரிந்துரைக் கடிதங்களையும் வழங்கினர். இது சிக்கலான மருத்துவச் சொற்களை நானே விளக்க வேண்டிய அவசியமின்றி பேச உதவியது.",
        "என் சகோதரியும் சகோதரரும் கடிதங்களை மருத்துவமனைக்கு எடுத்துச் சென்றனர். MOH இன் மானியங்களுக்கு நன்றி, அவர்களின் செலவு மிகக் குறைவாக இருந்தது. என் சகோதரிக்கு தொற்று இருப்பது உறுதிசெய்யப்பட்டு, சிகிச்சை உடனடியாகத் தொடங்கியது.",
        "இன்று, நாங்கள் எங்கள் இதயங்களை ஆரோக்கியமாக வைத்திருக்க ஒருவருக்கொருவர் ஆதரவளிக்கிறோம். இது யாரையும் குற்றம் சாட்டுவது பற்றியது அல்ல; நீங்கள் நேசிக்கும் மக்களுக்கு நீண்ட, ஆரோக்கியமான வாழ்க்கையை வாழ்வதற்கான வாய்ப்பை வழங்குவது பற்றியது."
      ]
    }
  },
  testing: {
    en: {
      title: "What to Expect During Genetic Testing",
      videoLabel: "Clinical Journey (May, 28)",
      subtitle: "What happens before, during, and after testing.",
      summary: "",
      frames: [
        "Before: A 30-minute counselling session to map your family history and answer any questions.",
        "During: A quick, standard outpatient blood draw at the clinic.",
        "After: Specialized lab analysis takes 4 to 6 weeks to map FH gene variants.",
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
      subtitle: "Alur proses sebelum, semasa, dan selepas ujian.",
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
      subtitle: "检测前、检测中、检测后的简明指南。",
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
      subtitle: "சோதனைக்கு முன், போது மற்றும் பின் என்ன நடக்கும்.",
      summary: "",
      frames: [
        "முன்: குடும்ப வரலாற்றை வரையவும் சந்தேகங்களைத் தீர்க்கவும் 30 நிமிட ஆலோசனை அமர்வு.",
        "போது: வெளிநோயாளர் பிரிவில் எளிய, விரைவான இரத்த மாதிரி சேகரிப்பு.",
        "பின்: குறிப்பிட்ட FH மரபணு மாறுபாடுகளை பகுப்பாய்வு செய்ய 4 முதல் 6 வாரங்கள் ஆகும்.",
        "முடிவு: முடிவுகளைப் பற்றி விவாதிக்கவும் இதயப் பாதுகாப்புத் திட்டத்தை வகுக்கவும் ஆலோசனை."
      ],
      transcript: [
        "வணக்கம், நான் May. எனது மரபணு சோதனை அனுபவத்தை உங்களுடன் பகிர்ந்து கொள்ள விரும்புகிறேன், ஏனெனில் சோதனைக்கு முன் நான் மிகவும் கவலையாக இருந்தேன். இந்த செயல்முறை முற்றிலும் வெளிநோயாளியாக செய்யப்படுகிறது மற்றும் மூன்று எளிய படிகளைக் கொண்டது. முதலில் உங்கள் குடும்ப வரலாற்றை ஆராய்ந்து சந்தேகங்களுக்கு பதிலளிக்க ஆலோசகர் உதவுவார்.",
        "பரிசோதனை மிகவும் எளிதானது—சாதாரண 10 நிமிட இரத்த பரிசோதனை மட்டுமே. உண்ணாவிரதம் இருக்க வேண்டிய அவசியமில்லை.",
        "மாதிரி பெறப்பட்ட பிறகு 4 முதல் 6 வாரங்களில் முடிவுகள் கிடைக்கும்.",
        "இறுதியாக மருத்துவர் முடிவுகளை விளக்கி உங்களுக்கான பாதுகாப்புத் திட்டத்தை வகுப்பார்."
      ]
    }
  },
  treatment: {
    en: {
      title: "Managing FH After Diagnosis",
      videoLabel: "Patient Experience Story (Kumar, 42)",
      subtitle: "Managing risk with simple daily care.",
      summary: "",
      frames: [
        "Acceptance: Understanding that FH is genetic and standard lifestyle changes alone aren't enough.",
        "Simple Routine: Adding a daily statin pill keeps your liver from overproducing cholesterol.",
        "Healthy Balance: Combining daily medication with fiber-rich foods and exercise keeps your heart protected.",
        "Long-Term Health: Regular blood checks ensure your LDL levels stay safely within the healthy target zone."
      ],
      transcript: [
        "Hello, I'm Kumar. Being diagnosed with FH was a turning point for me. Before my test, I tried extreme diets and intense exercise to bring my cholesterol down, but nothing worked. Understanding that FH is genetic gave me immense clarity—it wasn't my fault, and diet alone couldn't fix it.",
        "My doctor prescribed a daily statin medication. It works by blocking the enzyme in the liver that produces excess cholesterol. Taking one small pill every night quickly became as natural as brushing my teeth.",
        "I still eat well and stay active, but now I know my medication is doing the heavy lifting. Together, they reduced my LDL cholesterol by over 50% within just a few months.",
        "Now, I simply do an annual blood check to monitor my levels. My cholesterol is completely under control, and I live a full, active life without any restrictions."
      ]
    },
    ms: {
      title: "Menguruskan FH Selepas Diagnosis",
      videoLabel: "Kisah Pengalaman Pesakit (Kumar, 42)",
      subtitle: "Menguruskan risiko dengan penjagaan harian mudah.",
      summary: "",
      frames: [
        "Penerimaan: Memahami bahawa FH adalah keturunan dan perubahan gaya hidup biasa sahaja tidak mencukupi.",
        "Rutin Mudah: Mengambil pil statin harian menghalang hati daripada menghasilkan kolesterol berlebihan.",
        "Keseimbangan Sihat: Menggabungkan ubat harian dengan makanan berserat dan senaman melindungi jantung anda.",
        "Kesihatan Jangka Panjang: Pemeriksaan darah berkala memastikan tahap LDL kekal dalam sasaran sihat."
      ],
      transcript: [
        "Helo, saya Kumar. Didiagnosis dengan FH adalah titik perubahan bagi saya. Sebelum ujian, saya mencuba diet ketat dan senaman untuk menurunkan kolesterol, tetapi tidak berkesan. Memahami bahawa FH adalah keturunan memberi kejelasan bahawa ia bukan salah saya.",
        "Doktor menetapkan ubat statin harian. Ia menghalang enzim di dalam hati daripada menghasilkan kolesterol berlebihan. Mengambil satu pil setiap malam menjadi rutin harian yang mudah.",
        "Saya kekal aktif dan makan dengan sihat, tetapi ubat adalah kunci utama. Gabungan ini menurunkan kolesterol LDL saya sebanyak lebih 50% dalam masa beberapa bulan sahaja.",
        "Kini, saya hanya membuat ujian darah tahunan untuk memantau paras kolesterol. Kesihatan saya terkawal dan saya menjalani kehidupan yang aktif."
      ]
    },
    zh: {
      title: "确诊后的科学管理",
      videoLabel: "患者体验故事 (Kumar, 42)",
      subtitle: "通过简单的日常护理稳妥管理风险。",
      summary: "",
      frames: [
        "心理释怀：理解 FH 是遗传特征，坦然接受单纯靠饮食运动无法完全降脂的事实。",
        "极简习惯：每晚服用一粒基础他汀药物，从源头上抑制肝脏过量合成胆固醇。",
        "协同养护：将规范服药与高纤维饮食、适度运动相结合，全方位加固心脏安全防线。",
        "长效达标：定期进行简单的门诊复查，确保坏胆固醇指标长期稳稳控制在理想范围内。"
      ],
      transcript: [
        "大家好，我是 Kumar。确诊 FH 是我人生健康管理的重要转折点。在做基因检测之前，我曾极度严格地节食、疯狂运动，试图把胆固醇降下来，但收效甚微。得知 FH 是基因决定的特征后，我彻底释怀了——这不是我的错，也不是光靠不吃肉就能解决的。",
        "我的医生为我开具了每日服用的基础他汀药物。它的作用原理非常明确，就是精准抑制肝脏中合成胆固醇的酶。每天晚上睡前服用一小粒药，就像刷牙一样简单自然。",
        "我依然保持良好的饮食和运动习惯，但现在有了药物这项保驾护航的利器。短短几个月内，我的坏胆固醇 (LDL) 水平就下降了 50% 以上，顺利达标。",
        "现在，我只需要每年做一次例行的常规抽血复查。我的胆固醇指标非常稳定，我也能没有任何顾虑地享受充满活力的健康生活。"
      ]
    },
    ta: {
      title: "கண்டறிந்த பிறகு FH-ஐ நிர்வகித்தல்",
      videoLabel: "நோயாளி அனுபவக் கதை (Kumar, 42)",
      subtitle: "எளிய தினசரி பராமரிப்பு மூலம் ஆபத்தைக் கட்டுப்படுத்துதல்.",
      summary: "",
      frames: [
        "ஏற்றுக்கொள்ளுதல்: FH என்பது மரபணு சார்ந்தது மற்றும் வெறும் வாழ்க்கைமுறை மாற்றங்களால் மட்டும் இதைக் கட்டுப்படுத்த முடியாது என்பதை அறிதல்.",
        "எளிய வழக்கம்: தினசரி ஸ்டாடின் மாத்திரை கல்லீரல் அதிக கொலஸ்ட்ராலை உருவாக்குவதைத் தடுக்கிறது.",
        "ஆரோக்கியமான சமநிலை: தினசரி மருந்துகளுடன் நார்ச்சத்து உணவுகள் மற்றும் உடற்பயிற்சியை இணைப்பது இதயத்தைப் பாதுகாக்கிறது.",
        "நீண்டகால ஆரோக்கியம்: வழக்கமான இரத்த பரிசோதனைகள் உங்கள் LDL அளவைப் பாதுகாப்பான இலக்கில் வைக்கின்றன."
      ],
      transcript: [
        "வணக்கம், நான் Kumar. FH கண்டறியப்பட்டது என் வாழ்க்கையில் ஒரு மாற்றத்தை ஏற்படுத்தியது. சோதனைக்கு முன், கொலஸ்ட்ராலைக் குறைக்க நான் தீவிர உணவு முறைகளையும் உடற்பயிற்சிகளையும் முயன்றேன், ஆனால் பலனில்லை. FH மரபணு சார்ந்தது என்பதைப் புரிந்துகொண்டது எனக்குத் தெளிவைத் தந்தது.",
        "என் மருத்துவர் தினமும் எடுத்துக்கொள்ளக்கூடிய ஸ்டாடின் மாத்திரையைப் பரிந்துரைத்தார். இது கல்லீரலில் அதிக கொலஸ்ட்ரால் உருவாவதைத் தடுக்கிறது. தினமும் இரவில் ஒரு சிறிய மாத்திரை சாப்பிடுவது எளிதான பழக்கமாக மாறியது.",
        "நான் இப்போதும் நல்ல உணவை உண்டு சுறுசுறுப்பாக இருக்கிறேன், ஆனால் மருந்துதான் முக்கியப் பங்காற்றுகிறது. சில மாதங்களிலேயே என் எல்டிஎல் கொலஸ்ட்ரால் 50%க்கும் மேல் குறைந்தது.",
        "இப்போது, நிலையைத் தெரிந்துகொள்ள வருடத்திற்கு ஒருமுறை இரத்தப் பரிசோதனை செய்துகொள்கிறேன். என் கொலஸ்ட்ரால் முழுமையாகக் கட்டுப்பாட்டில் உள்ளது."
      ]
    }
  },
  costs: {
    en: {
      title: "Understanding Costs and Support",
      videoLabel: "Financial Guide (Siti, 45)",
      subtitle: "MOH subsidies and MediSave support explained.",
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
      subtitle: "Subsidi MOH dan sokongan MediSave.",
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
      subtitle: "卫生部补贴与 MediSave 支持说明。",
      summary: "",
      frames: [
        "卫生部高额补贴：符合资格的新加坡公民在专家门诊和基因检测中可享受高达 75% 的政府补贴。",
        "MediSave 强力支持：个人共付部分完全属于 CDMS 慢性病可报销开支，可全额使用 MediSave 账户进行抵扣。",
        "几乎零现金开销：绝大多数患者通过补贴和公积金抵扣后，无需支付任何额外现金，毫无经济负担。",
        "全方位兜底资助：针对中低收入家庭，CHAS 蓝卡、建国一代卡以及 Medifund 医疗救助基金确保医疗费绝对能够负担。"
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
      subtitle: "MOH மானியங்கள் மற்றும் MediSave ஆதரவு விளக்கம்.",
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
      subtitle: "Preventing silent plaque buildup through early care.",
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
      subtitle: "Mencegah pembentukan plak melalui penjagaan awal.",
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
      subtitle: "通过早期护理预防隐性血管堵塞。",
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
      subtitle: "முன்கூட்டியே கண்டறிந்து இரத்த நாள அடைப்பைத் தடுத்தல்.",
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
      subtitle: "What to expect before your appointment.",
      summary: "FH is inherited from birth—unrelated to lifestyle or age.",
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
      subtitle: "Perkara yang dijangka sebelum janji temu anda.",
      summary: "FH diwarisi sejak lahir—tiada kaitan dengan gaya hidup atau umur.",
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
      subtitle: "预约前了解预期的流程。",
      summary: "FH是自出生遗传的特征，与生活方式或年龄无关。",
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
      subtitle: "உங்கள் சந்திப்பிற்கு முன் என்ன எதிர்பார்க்கலாம்.",
      summary: "FH பிறப்பிலிருந்தே மரபணு ரீதியாகப் பெறப்படுகிறது.",
      frames: [
        "நான் ஆரோக்கியமாக உண்ணுகிறேன் மற்றும் சுறுசுறுப்பாக இருக்கிறேன். அதிக கொலஸ்ட்ரால் மூத்தவர்களுக்கு அல்லது ஆரோக்கியமற்ற வாழ்க்கை முறை கொண்டவர்களுக்கு மட்டுமே என நான் நினைத்தேன்.",
        "மரபணு ஆலோசகர் என்னை வற்புறுத்தவில்லை. அவர்கள் உண்மைகளை மட்டுமே முன்வைத்து முடிவெடுக்க எனக்கு விட்டுவிட்டார்கள்.",
        "இருக்கும் சுகாதார காப்பீடு முழுமையாக பாதுகாக்கப்பட்டுள்ளது, மேலும் MOH மானியங்கள் செலவின் 75% வரை ஈடுசெய்கிறது என நான் அறிந்தேன்.",
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
      en: "How simple cascade screening protects your relatives.",
      ms: "Cara saringan lata melindungi keluarga anda.",
      zh: "家系筛查如何保护您的亲人。",
      ta: "குடும்பப் பரிசோதனை உறவினர்களைப் பாதுகாக்கும் விதம்."
    },
    advanced: {
      en: "Clinical overview of cascade screening and relative subvention.",
      ms: "Tinjauan klinikal saringan lata dan subsidi saudara.",
      zh: "家系筛查与亲属补贴机制概述。",
      ta: "மரபணு சல்லடை முறை மற்றும் மானியங்கள் பற்றிய விளக்கம்."
    }
  },
  testing: {
    beginner: {
      en: "A simple guide to counselling, blood draw, and results.",
      ms: "Panduan ringkas kaunseling, ujian darah, dan keputusan.",
      zh: "咨询、抽血与检测结果的简要指南。",
      ta: "ஆலோசனை, இரத்த பரிசோதனை மற்றும் முடிவுகளுக்கான வழிகாட்டி."
    },
    advanced: {
      en: "Overview of DNA sequencing and variant analysis.",
      ms: "Tinjauan penjujukan DNA dan analisis varian.",
      zh: "DNA测序与致病基因变异位点分析概述。",
      ta: "டிஎன்ஏ வரிசைமுறை மற்றும் மரபணு பகுப்பாய்வு விளக்கம்."
    }
  },
  treatment: {
    beginner: {
      en: "How daily medication and habits keep your heart safe.",
      ms: "Bagaimana ubat harian dan tabiat melindungi jantung anda.",
      zh: "每日药物与健康习惯如何守护心脏。",
      ta: "தினசரி மருந்துகளும் பழக்கங்களும் இதயத்தைப் பாதுகாக்கும் விதம்."
    },
    advanced: {
      en: "Clinical overview of statin therapy and risk reduction.",
      ms: "Tinjauan klinikal terapi statin dan pengurangan risiko.",
      zh: "他汀疗法与心血管风险控制临床评估。",
      ta: "ஸ்டாடின் சிகிச்சை மற்றும் ஆபத்தைக் குறைப்பது பற்றிய விளக்கம்."
    }
  },
  costs: {
    beginner: {
      en: "How MOH subsidies and MediSave make testing affordable.",
      ms: "Bagaimana subsidi MOH dan MediSave meringankan kos.",
      zh: "卫生部补贴与MediSave如何减免费用。",
      ta: "MOH மானியங்கள் மற்றும் MediSave செலவைக் குறைக்கும் விதம்."
    },
    advanced: {
      en: "Policy overview of MOH subvention and CDMS claims.",
      ms: "Tinjauan subvensi MOH dan tuntutan CDMS.",
      zh: "卫生部津贴与CDMS公积金支付政策指南。",
      ta: "MOH நிதியுதவி மற்றும் CDMS வழிகாட்டி."
    }
  },
  risk: {
    beginner: {
      en: "Why early detection keeps blood vessels healthy.",
      ms: "Mengapa pengesanan awal memastikan saluran darah sihat.",
      zh: "早发现为何能保护血管健康。",
      ta: "முன்கூட்டியே கண்டறிவது இரத்த நாளங்களைச் சுத்தமாக வைக்கும் விதம்."
    },
    advanced: {
      en: "Overview of cumulative LDL burden and early intervention.",
      ms: "Tinjauan beban LDL kumulatif dan intervensi awal.",
      zh: "累积性LDL胆固醇负荷与早期干预概述。",
      ta: "கொலஸ்ட்ரால் சேர்வது மற்றும் முன்கூட்டியே தடுப்பது பற்றிய விளக்கம்."
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
