import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  Form,
  Input,
  DatePicker,
  Checkbox,
  Row,
  Col,
  Space,
  Select,
} from "antd";
import type { FormInstance, Rule } from "antd/es/form";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SignatureInput from "@/components/common/SignatureInput";
import {
  personalInfoFields,
  countryOptions,
  type FieldConfig,
} from "@/config/personalInfoFields";
import { toNameOptions, useLocationOptions } from "@/hooks/useCountryStates";
import { useTranslation } from "@/translation/useTranslation";
import type { Language } from "@/translation/types";
import type {
  JobApplicationFormData,
  PersonalInfo,
} from "@/types/jobApplication";

dayjs.extend(customParseFormat);

const DATE_FORMAT = "MM-DD-YYYY";

// Config spans are authored for desktop (24/12/8 out of 24). On phones every
// field should stack full-width regardless of its desktop span.
function getResponsiveColProps(span: number) {
  if (span >= 24) return { xs: 24 };
  if (span >= 12) return { xs: 24, sm: 12 };
  return { xs: 24, sm: 12, md: 8 };
}

interface PersonalInformationProps {
  form: FormInstance;
  formData: JobApplicationFormData;
  setFormData: Dispatch<SetStateAction<JobApplicationFormData>>;
  language: Language;
}

function buildRules(
  field: FieldConfig,
  t: (key: string, vars?: Record<string, string>) => string
): Rule[] {
  if (field.isPhone) {
    return [
      {
        required: field.required,
        message: t("personalInfo.validation.phoneRequired"),
      },
      {
        pattern: /^\d{10}$/,
        message: t("personalInfo.validation.phonePattern"),
      },
    ];
  }

  const rules: Rule[] = [];
  if (field.required) {
    rules.push({
      required: true,
      message: t("personalInfo.validation.requiredTemplate", {
        field: t(`personalInfo.fields.${field.name}`).toLowerCase(),
      }),
    });
  }
  // Both languages now validate email format (previously Spanish-only).
  if (field.name === "email") {
    rules.push({
      type: "email",
      message: t("personalInfo.validation.emailFormat"),
    });
  }
  return rules;
}

const PersonalInformation = ({
  form,
  formData,
  setFormData,
  language,
}: PersonalInformationProps) => {
  const { t, tList } = useTranslation(language);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [signatureImageURL, setSignatureImageURL] = useState<string | null>(
    formData.personalInfo?.signature ?? null
  );

useEffect(() => {
  form.setFieldsValue({
    ...formData.personalInfo,
    employmentType: formData.personalInfo?.employmentType || [],
  });
}, [formData.personalInfo]);
const { states, statesLoading, cities, citiesLoading } = useLocationOptions(
  formData.personalInfo?.country,
  formData.personalInfo?.state
);

// Options for each dropdown field, plus the message shown while its parent
// (country -> state -> city) hasn't been picked yet.
const selectFields: Record<
  string,
  {
    options: { name: string }[];
    loading?: boolean;
    emptyMessage?: string;
  }
> = {
  country: { options: countryOptions },
  state: {
    options: states,
    loading: statesLoading,
    emptyMessage: !formData.personalInfo?.country
      ? t("personalInfo.validation.selectCountryFirst")
      : undefined,
  },
  city: {
    options: cities,
    loading: citiesLoading,
    emptyMessage: !formData.personalInfo?.state
      ? t("personalInfo.validation.selectStateFirst")
      : undefined,
  },
};

const handleChange = (
  changedValues: Partial<PersonalInfo>,
  allValues: Partial<PersonalInfo>
) => {
  // A new country invalidates the state and city; a new state invalidates the city.
  const resets: Partial<PersonalInfo> = {};
  if ("country" in changedValues) resets.state = null;
  if ("country" in changedValues || "state" in changedValues) resets.city = null;
  if (Object.keys(resets).length) form.setFieldsValue(resets);

  setFormData((prev) => ({
    ...prev,
    personalInfo: {
      ...prev.personalInfo,
      ...allValues,
      ...changedValues,
      ...resets,
    },
  }));
};

  const handleSaveSignature = (signatureData: string) => {
    setSignatureImageURL(signatureData);
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, signature: signatureData },
    }));
    setIsSignatureModalOpen(false);
  };

  const handleClearSignature = () => {
    setSignatureImageURL(null);
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, signature: null },
    }));
  };

  const employmentTypeOptions = tList("personalInfo.employmentType.options");

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={formData.personalInfo || {}}
      onValuesChange={handleChange}
    >
      <Row gutter={[16, 16]}>
        {personalInfoFields.map((field) => {
          const label = t(`personalInfo.fields.${field.name}`);
          return (
            <Col {...getResponsiveColProps(field.span)} key={field.name}>
              <Form.Item
                label={label}
                name={field.name}
                rules={buildRules(field, t)}
                {...(field.type === "date"
                  ? {
                      getValueFromEvent: (date: Dayjs | null) =>
                        date ? date.format(DATE_FORMAT) : null,
                      getValueProps: (value?: string | null) => ({
                        value: value ? dayjs(value, DATE_FORMAT, true) : null,
                      }),
                    }
                  : {})}
              >
                {field.type === "select" ? (
                  <Select
                    placeholder={label}
                    showSearch={{ optionFilterProp: "label" }}
                    loading={selectFields[field.name]?.loading}
                    notFoundContent={selectFields[field.name]?.emptyMessage}
                    options={toNameOptions(selectFields[field.name]?.options ?? [])}
                    // Needed like the other inputs here: this step shares `form` with
                    // EmploymentEligibility, whose <Form> replaces our onValuesChange.
                    onChange={(value: string) =>
                      handleChange(
                        { [field.name]: value } as Partial<PersonalInfo>,
                        {
                          ...formData.personalInfo,
                          [field.name]: value,
                        } as Partial<PersonalInfo>
                      )
                    }
                  />
                ) : field.type === "text" || field.type === "email" ? (
                  <Input
                    type={field.type}
                    placeholder={label}
                    prefix={field.prefix}
                    maxLength={field.isPhone ? 10 : undefined}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (field.isPhone) {
                        value = value.replace(/\D/g, "").slice(0, 10);
                      }
                      if (field.name === "email") {
                        value = value.replace(/\s/g, "");
                      }
                      handleChange(
                        { [field.name]: value } as Partial<PersonalInfo>,
                        {
                          ...formData.personalInfo,
                          [field.name]: value,
                        } as Partial<PersonalInfo>
                      );
                    }}
                    onKeyDown={(e) => {
                      if (
                        field.isPhone &&
                        !/[0-9]/.test(e.key) &&
                        ![
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ].includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                ) : (
<DatePicker
  style={{ width: "100%" }}
  format={DATE_FORMAT}
   placeholder={t(
                    "floridaAgreement.entireAgreement.datePlaceholder"
                  )}
  value={
    formData.personalInfo?.[field.name]
      ? dayjs(
          formData.personalInfo[field.name] as string,
          DATE_FORMAT,
          true
        )
      : null
  }
  onChange={(date) => {
    const value = date ? date.format(DATE_FORMAT) : null;

    console.log("DATE FIELD:", field.name, value);

    handleChange(
      {
        [field.name]: value,
      } as Partial<PersonalInfo>,
      {
        ...formData.personalInfo,
        [field.name]: value,
      }
    );
  }}
/>
                )}
              </Form.Item>
            </Col>
          );
        })}
      </Row>

      <Form.Item
        label={t("personalInfo.employmentType.label")}
        name="employmentType"
        rules={[
          {
            required: true,
            message: t("personalInfo.employmentType.required"),
          },
        ]}
      >
        <Checkbox.Group
          onChange={(checkedValues) => {
            form.setFieldsValue({ employmentType: checkedValues });
            handleChange(
              { employmentType: checkedValues as string[] },
              form.getFieldsValue()
            );
          }}
        >
          <Space>
            {employmentTypeOptions.map((option) => (
              // Value is intentionally language-specific (legacy behavior preserved).
              <Checkbox key={option} value={option.toLowerCase()}>
                {option}
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item
        label={t("personalInfo.signature.label")}
        name="signature"
        rules={[
          { required: true, message: t("personalInfo.signature.required") },
        ]}
      >
        <SignatureInput
          onSave={handleSaveSignature}
          onClear={handleClearSignature}
          imageURL={signatureImageURL}
          onOpenModal={() => setIsSignatureModalOpen(true)}
          isOpen={isSignatureModalOpen}
          onCancel={() => setIsSignatureModalOpen(false)}
          label={t("personalInfo.signature.openButton")}
        />
      </Form.Item>
    </Form>
  );
};

export default PersonalInformation;
