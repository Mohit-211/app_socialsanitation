import { apiClient } from "./client";
import type { UserConsentFormValues } from "../types/userConsent";

export const submitUserConsent = (values: UserConsentFormValues) =>
  apiClient.post("/user/createUserConsent", values);
