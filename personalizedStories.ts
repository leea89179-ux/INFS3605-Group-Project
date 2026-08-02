export interface CostData {
  indexPatientEstimatedCash: string;
  cardHeading: string;
  supportingText: string;
  bookingConfirmationSubtext: string;
  bookingSlotSummaryNote: string;
  reviewDetailsSupportingText: string;
}

export const FH_COST_DATA: CostData = {
  indexPatientEstimatedCash: "S$18–87",
  cardHeading: "Estimated out-of-pocket cost:",
  supportingText: "After MOH subsidies and MediSave (where eligible).",
  bookingConfirmationSubtext: "Fully claimable via MediSave under MOH Chronic Care guidelines.",
  bookingSlotSummaryNote: "Subsidised rate applicable for Singapore Citizens & PRs.",
  reviewDetailsSupportingText: "Includes pre-test counselling and outpatient genetic screening package.",
};

export const getLocalizedCostData = (lang: string): CostData => {
  switch (lang) {
    case 'ms':
      return {
        indexPatientEstimatedCash: "S$18–87",
        cardHeading: "Anggaran kos tunai keluar dari poket:",
        supportingText: "Selepas subsidi MOH dan MediSave (jika layak).",
        bookingConfirmationSubtext: "Boleh dituntut sepenuhnya melalui MediSave di bawah garis panduan Penjagaan Kronik MOH.",
        bookingSlotSummaryNote: "Kadar bersubsidi terpakai untuk Warganegara Singapura & PR.",
        reviewDetailsSupportingText: "Termasuk kaunseling pra-ujian dan pakej saringan genetik pesakit luar.",
      };
    case 'zh':
      return {
        indexPatientEstimatedCash: "S$18–87",
        cardHeading: "预估个人自付费用：",
        supportingText: "扣除卫生部 (MOH) 津贴与 MediSave 扣除后（如适用）。",
        bookingConfirmationSubtext: "符合 MOH 慢性病护理指南，可通过 MediSave 全额报销。",
        bookingSlotSummaryNote: "津贴价格适用于新加坡公民和永久居民。",
        reviewDetailsSupportingText: "包含检测前基因咨询及门诊基因筛查套餐。",
      };
    case 'ta':
      return {
        indexPatientEstimatedCash: "S$18–87",
        cardHeading: "மதிப்பிடப்பட்ட கைசெலவுத் தொகை:",
        supportingText: "MOH மானியங்கள் மற்றும் MediSave (தகுதியிருந்தால்) கழித்த பிறகு.",
        bookingConfirmationSubtext: "MOH நாள்பட்ட பராமரிப்பு வழிகாட்டுதல்களின் கீழ் MediSave மூலம் முழுமையாக உரிமை கோரலாம்.",
        bookingSlotSummaryNote: "சிங்கப்பூர் குடிமக்கள் மற்றும் PRகளுக்கு மானிய விலை பொருந்தும்.",
        reviewDetailsSupportingText: "சோதனைக்கு முந்தைய ஆலோசனை மற்றும் வெளிநோயாளி மரபணுத் திரையிடல் தொகுப்பு ஆகியவை அடங்கும்.",
      };
    default:
      return FH_COST_DATA;
  }
};

