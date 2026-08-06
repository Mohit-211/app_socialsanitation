export type EducationFieldType = "text" | "range" | "radio";

export interface EducationFieldConfig {
  name: string;
  type: EducationFieldType;
}

export interface EducationSectionConfig {
  key: string; // used to build locale keys, e.g. education.sections.highSchool
  fields: EducationFieldConfig[];
}

export const educationSections: EducationSectionConfig[] = [
  {
    key: "highSchool",
    fields: [
      { name: "highSchoolName", type: "text" },
      { name: "highSchoolCity", type: "text" },
      { name: "highSchoolState", type: "text" },
      { name: "highSchoolDuration", type: "range" },
      { name: "highSchoolGraduate", type: "radio" },
      { name: "highSchoolDiploma", type: "text" },
    ],
  },
  {
    key: "college",
    fields: [
      { name: "collegeName", type: "text" },
      { name: "collegeCity", type: "text" },
      { name: "collegeState", type: "text" },
      { name: "collegeDuration", type: "range" },
      { name: "collegeGraduate", type: "radio" },
      { name: "collegeDegree", type: "text" },
    ],
  },
  {
    key: "other",
    fields: [
      { name: "otherEducation", type: "text" },
      { name: "otherCity", type: "text" },
      { name: "otherState", type: "text" },
      { name: "otherDuration", type: "range" },
      { name: "otherDegree", type: "text" },
    ],
  },
];
