export interface UserConsentFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  service: string;
  message: string;
  consent_calls: boolean;
  consent_autodialer: boolean;
  consent_marketing: boolean;
  consent_sms: boolean;
}

export type UserConsentFormErrors = Partial<
  Record<keyof UserConsentFormValues, string>
>;
export type UserConsentFormTouched = Partial<
  Record<keyof UserConsentFormValues, boolean>
>;
