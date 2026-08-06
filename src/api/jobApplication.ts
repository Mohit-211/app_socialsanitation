import { apiClient } from "./client";
import type { JobApplicationFormData } from "../types/jobApplication";
import type { Language } from "../translation/types";

export const submitJobApplication = (
  formData: JobApplicationFormData,
  language: Language
) => apiClient.post("/form/submitForm", { formData, language });
