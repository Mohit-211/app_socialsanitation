export interface PersonalInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  streetAddress: string;
  aptSuite?: string;
  city: string | null;
  state: string | null;
  zipCode: string;
  country: string | null;
  dateOfBirth: string | null;
  dateAvailable: string | null;
  email: string;
  phone: string;
  ssn: string;
  position: string;
  desiredPay: string;
  employmentType: string[];
  signature: string | null;
}

export interface AuthorizationData {
  signature?: string | null;
  printedName?: string;
  date?: string | null;
}

// Field names intentionally match the exact keys already sent to the API today
// (spaces/apostrophes and all) so this typing doesn't change the submitted payload
// shape. Only "License State" is new - it replaces the second field that used to
// collide with "State" under the same name.
export interface PolicyData {
  "Applicant's Name"?: string;
  "Applicant's Address"?: string;
  City?: string | null;
  State?: string | null;
  Zip?: string;
  Country?: string | null;
  signature1?: string | null;
  "Social Security Number"?: string;
  "Date of Birth"?: string | null;
  "Driver's License Number"?: string;
  "License State"?: string | null;
  signature2?: string | null;
}

export interface EmploymentEligibilityData {
  legallyEligible?: "yes" | "no";
  workedBefore?: "yes" | "no";
  employmentDates?: [string, string] | null;
  convictedFelony?: "yes" | "no";
  felonyExplanation?: string;
}

export interface EducationData {
  // Country/state/city fields hold location names; they may be cleared to null.
  [fieldName: string]: string | null | [string, string] | undefined;
}

export interface ReferenceEntry {
  firstName: string;
  lastName: string;
  relationship: string;
  company: string;
  title: string;
  email: string;
  phone: string;
}

export interface EmployerEntry {
  companyName: string;
  email: string;
  address: string;
  country: string | null;
  state: string | null;
  city: string | null;
  zip: string;
  phone: string;
  jobTitle: string;
  duration?: [string | null, string | null] | null;
  responsibilities: string;
  reasonForLeaving: string;
}

export interface PreviousEmploymentData {
  hasJob: "yes" | "no";
  employers: Partial<EmployerEntry>[];
}

export interface MilitaryServiceRecord {
  branch: string;
  servicePeriod?: [string | null, string | null] | null;
  rank: string;
  dischargeType: string;
  dischargeExplanation?: string;
}

export interface MilitaryServiceData {
  veteran: "yes" | "no";
  records: Partial<MilitaryServiceRecord>[];
}

export interface BackgroundCheckData {
  consent?: "yes" | "no";
}

export interface DisclaimerData {
  signature?: string | null;
  date?: string | null;
  printedName?: string;
}

export interface FloridaAgreementData {
  companyNameTitle?: string;
  specific_competitor?: string;
  time_period?: string;
  select_jurisdiction?: string;
  agreement_date?: string | null;
  companysignature?: string | null;
  recipientsignature?: string | null;
  recipientName?: string;
}

export interface DirectDepositBankRow {
  bankInfo: string;
  accountType: "Checking" | "Savings";
  routingNumber: string;
  accountNumber: string;
  amount: string;
  percentage: string;
}

export interface DirectDepositData {
  employee_name?: string;
  signature?: string | null;
  date?: string | null;
  banks: Partial<DirectDepositBankRow>[];
}

export interface JobApplicationFormData {
  personalInfo: PersonalInfo;
  employmentEligibility: EmploymentEligibilityData;
  education: EducationData;
  previousEmployment: PreviousEmploymentData;
  references: ReferenceEntry[];
  militaryService: MilitaryServiceData;
  backgroundCheck: BackgroundCheckData;
  authorization: AuthorizationData;
  policy: PolicyData;
  disclaimer: DisclaimerData;
  floridaAgreement: FloridaAgreementData;
  directDeposit: DirectDepositData;
}
