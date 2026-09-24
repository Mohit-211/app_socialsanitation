export type EducationFieldType = "text" | "range" | "radio" | "location";

export interface EducationFieldConfig {
  name: string;
  type: EducationFieldType;
  /** For "location": the stored country/state/city field names. */
  location?: Record<"country" | "state" | "city", string>;
}

export interface EducationSectionConfig {
  key: string; // used to build locale keys, e.g. education.sections.highSchool
  fields: EducationFieldConfig[];
}

// Country -> State -> City dropdowns, stored under the given field names.
const locationField = (prefix: string): EducationFieldConfig => ({
  name: `${prefix}Location`,
  type: "location",
  location: {
    country: `${prefix}Country`,
    state: `${prefix}State`,
    city: `${prefix}City`,
  },
});

export const educationSections: EducationSectionConfig[] = [
  {
    key: "highSchool",
    fields: [
      { name: "highSchoolName", type: "text" },
      locationField("highSchool"),
      { name: "highSchoolDuration", type: "range" },
      { name: "highSchoolGraduate", type: "radio" },
      { name: "highSchoolDiploma", type: "text" },
    ],
  },
  {
    key: "college",
    fields: [
      { name: "collegeName", type: "text" },
      locationField("college"),
      { name: "collegeDuration", type: "range" },
      { name: "collegeGraduate", type: "radio" },
      { name: "collegeDegree", type: "text" },
    ],
  },
  {
    key: "other",
    fields: [
      { name: "otherEducation", type: "text" },
      locationField("other"),
      { name: "otherDuration", type: "range" },
      { name: "otherDegree", type: "text" },
    ],
  },
];
