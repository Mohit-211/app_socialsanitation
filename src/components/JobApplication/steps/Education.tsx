import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Form, Input, DatePicker, Radio, Row } from "antd";
import type { FormInstance } from "antd/es/form";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import LocationSelects, {
  type LocationKey,
} from "@/components/common/LocationSelects";
import { educationSections } from "@/config/educationFields";
import { useTranslation } from "@/translation/useTranslation";
import type { Language } from "@/translation/types";
import type {
  EducationData,
  JobApplicationFormData,
} from "@/types/jobApplication";

 

const { RangePicker } = DatePicker;
const YEAR_FORMAT = "YYYY";

interface EducationProps {
  form: FormInstance;
  formData: JobApplicationFormData;
  setFormData: Dispatch<SetStateAction<JobApplicationFormData>>;
  language: Language;
}

const Education = ({
  form,
  formData,
  setFormData,
  language,
}: EducationProps) => {
  const { t } = useTranslation(language);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleChange = (changedValues: Record<string, unknown>) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...(prev.education || {}),
        ...(changedValues as EducationData),
      },
    }));
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={formData.education || {}}
      onValuesChange={handleChange}
    >
      {educationSections.map((section) => {
        const sectionTitle = t(`education.sections.${section.key}.title`);
        const fieldLabel = (name: string) =>
          t(`education.sections.${section.key}.fields.${name}`);
        const placeholder = (name: string) =>
          t("education.placeholderTemplate", { field: fieldLabel(name) });
        const selectPlaceholder = (name: string) =>
          t("education.selectPlaceholderTemplate", { field: fieldLabel(name) });

        return (
          <div key={section.key}>
            <h5>{sectionTitle}</h5>
            {section.fields.map((field) => {
              if (field.type === "location" && field.location) {
                const names = field.location;
                const byKey = (fn: (name: string) => string) => ({
                  country: fn(names.country),
                  state: fn(names.state),
                  city: fn(names.city),
                });
                return (
                  <Row key={field.name} gutter={[16, 16]}>
                    <LocationSelects
                      form={form}
                      language={language}
                      names={names}
                      labels={byKey(fieldLabel)}
                      placeholders={byKey(selectPlaceholder)}
                      onChange={(changed) =>
                        handleChange(
                          Object.fromEntries(
                            Object.entries(changed).map(([key, value]) => [
                              names[key as LocationKey],
                              value,
                            ])
                          )
                        )
                      }
                    />
                  </Row>
                );
              }

              return (
                <Form.Item
                  key={field.name}
                  label={fieldLabel(field.name)}
                  name={field.name}
                  {...(field.type === "range"
                    ? {
                        getValueFromEvent: (
                          dates: [Dayjs | null, Dayjs | null] | null
                        ) =>
                          dates
                            ? dates.map((d) => (d ? d.format(YEAR_FORMAT) : null))
                            : null,
                        getValueProps: (
                          value?: [string | null, string | null] | null
                        ) => ({
                          value: value
                            ? value.map((v) =>
                                v ? dayjs(v, YEAR_FORMAT, true) : null
                              )
                            : undefined,
                        }),
                      }
                    : {})}
                >
                  {field.type === "text" ? (
                    <Input placeholder={placeholder(field.name)} />
                  ) : field.type === "range" ? (
                    <RangePicker
                      picker="year"
                      format={YEAR_FORMAT}
                      style={{ width: "100%" }}
                    />
                  ) : field.type === "radio" ? (
                    <Radio.Group>
                      <Radio value="yes">{t("education.yes")}</Radio>
                      <Radio value="no">{t("education.no")}</Radio>
                    </Radio.Group>
                  ) : null}
                </Form.Item>
              );
            })}
          </div>
        );
      })}
    </Form>
  );
};

export default Education;
