import type { PersonalInfo } from "@/types/jobApplication";


export interface FieldConfig {
  name: keyof PersonalInfo;
  type: "text" | "email" | "date";
  span: number;
  required?: boolean;
  isPhone?: boolean;
  prefix?: string;
}

export const personalInfoFields: FieldConfig[] = [
  { name: "firstName", type: "text", required: true, span: 8 },
  { name: "middleName", type: "text", span: 8 },
  { name: "lastName", type: "text", required: true, span: 8 },
  { name: "streetAddress", type: "text", required: true, span: 24 },
  { name: "aptSuite", type: "text", span: 12 },
  { name: "city", type: "text", required: true, span: 12 },
  { name: "state", type: "text", required: true, span: 12 },
  { name: "zipCode", type: "text", required: true, span: 12 },
  { name: "dateOfBirth", type: "date", required: true, span: 12 },
  { name: "dateAvailable", type: "date", required: true, span: 12 },
  { name: "email", type: "email", required: true, span: 8 },
  { name: "phone", type: "text", required: true, span: 8, isPhone: true },
  { name: "ssn", type: "text", required: true, span: 8 },
  { name: "position", type: "text", required: true, span: 12 },
  { name: "desiredPay", type: "text", required: true, span: 12, prefix: "$" },
];
