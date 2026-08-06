import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Form, Input, DatePicker, Radio, Row, Col } from "antd";
import type { FormInstance } from "antd/es/form";
import type { Dayjs } from "dayjs";
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
    const updatedValues: EducationData = {};

    Object.entries(changedValues).forEach(([key, value]) => {
      if (
        Array.isArray(value) &&
        value.length === 2 &&
        (value[0] as Dayjs)?.format
      ) {
        const [start, end] = value as Dayjs[];
        updatedValues[key] = [
          start.format(YEAR_FORMAT),
          end.format(YEAR_FORMAT),
        ];
      } else if ((value as Dayjs)?.format) {
        updatedValues[key] = (value as Dayjs).format(YEAR_FORMAT);
      } else {
        updatedValues[key] = value as string | undefined;
      }
    });

    setFormData((prev) => ({
      ...prev,
      education: {
        ...(prev.education || {}),
        ...updatedValues,
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

        return (
          <div key={section.key}>
            <h5>{sectionTitle}</h5>
            {section.fields.map((field, index, arr) => {
              const nextField = arr[index + 1];

              if (
                field.name.includes("City") &&
                nextField?.name.includes("State")
              ) {
                return (
                  <Row key={field.name} gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={fieldLabel(field.name)}
                        name={field.name}
                      >
                        <Input placeholder={placeholder(field.name)} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={fieldLabel(nextField.name)}
                        name={nextField.name}
                      >
                        <Input placeholder={placeholder(nextField.name)} />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              }

              // The paired "State" field was already rendered above alongside "City".
              if (field.name.includes("State")) return null;

              return (
                <Form.Item
                  key={field.name}
                  label={fieldLabel(field.name)}
                  name={field.name}
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
