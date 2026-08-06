export interface StepConfig {
  key: string;
  titleKey: string; // path into the locale JSON, e.g. "steps.personalInfo"
}

export const jobApplicationSteps: StepConfig[] = [
  {
    key: "disclosureAndAuthorization",
    titleKey: "steps.disclosureAndAuthorization",
  },
  { key: "personalInfo", titleKey: "steps.personalInfo" },
  { key: "education", titleKey: "steps.education" },
  { key: "previousEmployment", titleKey: "steps.previousEmployment" },
  { key: "references", titleKey: "steps.references" },
  { key: "militaryService", titleKey: "steps.militaryService" },
  { key: "backgroundCheck", titleKey: "steps.backgroundCheck" },
  { key: "disclaimer", titleKey: "steps.disclaimer" },
  { key: "floridaAgreement", titleKey: "steps.floridaAgreement" },
  { key: "directDeposit", titleKey: "steps.directDeposit" },
];
