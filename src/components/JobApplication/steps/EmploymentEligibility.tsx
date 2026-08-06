import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Form, Input, DatePicker, Radio } from "antd";
import type { FormInstance } from "antd/es/form";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
 import { useTranslation } from "@/translation/useTranslation";
import type { Language } from "@/translation/types";
import type {
  EmploymentEligibilityData,
  JobApplicationFormData,
} from "@/types/jobApplication";

 

const { RangePicker } = DatePicker;
const DATE_FORMAT = "MM-DD-YYYY";

interface RawEmploymentEligibilityChange {
  legallyEligible?: "yes" | "no";
  workedBefore?: "yes" | "no";
  employmentDates?: [string | null, string | null] | null;
  convictedFelony?: "yes" | "no";
  felonyExplanation?: string;
}

interface EmploymentEligibilityProps {
  form: FormInstance;
  formData: JobApplicationFormData;
  setFormData: Dispatch<SetStateAction<JobApplicationFormData>>;
  language: Language;
}

const EmploymentEligibility = ({
  form,
  formData,
  setFormData,
  language,
}: EmploymentEligibilityProps) => {
  const { t } = useTranslation(language);
  const [workedBefore, setWorkedBefore] = useState(
    formData.employmentEligibility?.workedBefore || "no"
  );
  const [convictedFelony, setConvictedFelony] = useState(
    formData.employmentEligibility?.convictedFelony || "no"
  );

  useEffect(() => {
    form.setFieldsValue({
      employmentEligibility: { ...formData.employmentEligibility },
    });
  }, [formData, form]);

  const handleChange = (changedValues: {
    employmentEligibility?: RawEmploymentEligibilityChange;
  }) => {
    const changed = changedValues.employmentEligibility;
    if (!changed) return;

    if (changed.workedBefore) {
      setWorkedBefore(changed.workedBefore);
      if (changed.workedBefore === "no") {
        form.resetFields(["employmentEligibility.employmentDates"]);
      }
    }

    if (changed.convictedFelony) {
      setConvictedFelony(changed.convictedFelony);
      if (changed.convictedFelony === "no") {
        form.resetFields(["employmentEligibility.felonyExplanation"]);
      }
    }

    setFormData((prev) => ({
      ...prev,
      employmentEligibility: {
        ...prev.employmentEligibility,
        ...(changed as Partial<EmploymentEligibilityData>),
      },
    }));
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        employmentEligibility: formData.employmentEligibility || {},
      }}
      onValuesChange={handleChange}
    >
      <Form.Item
        label={t("employmentEligibility.legallyEligible.label")}
        name={["employmentEligibility", "legallyEligible"]}
        rules={[
          {
            required: true,
            message: t("employmentEligibility.legallyEligible.required"),
          },
        ]}
      >
        <Radio.Group>
          <Radio value="yes">{t("employmentEligibility.yes")}</Radio>
          <Radio value="no">{t("employmentEligibility.no")}</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label={t("employmentEligibility.workedBefore.label")}
        name={["employmentEligibility", "workedBefore"]}
        rules={[
          {
            required: true,
            message: t("employmentEligibility.workedBefore.required"),
          },
        ]}
      >
        <Radio.Group onChange={(e) => setWorkedBefore(e.target.value)}>
          <Radio value="yes">{t("employmentEligibility.yes")}</Radio>
          <Radio value="no">{t("employmentEligibility.no")}</Radio>
        </Radio.Group>
      </Form.Item>

      {workedBefore === "yes" && (
        <Form.Item
          label={t("employmentEligibility.employmentDates.label")}
          name={["employmentEligibility", "employmentDates"]}
          rules={[
            {
              required: true,
              message: t("employmentEligibility.employmentDates.required"),
            },
          ]}
          getValueFromEvent={(dates: [Dayjs | null, Dayjs | null] | null) =>
            dates ? dates.map((d) => (d ? d.format(DATE_FORMAT) : null)) : null
          }
          getValueProps={(value?: [string | null, string | null] | null) => ({
            value: value
              ? value.map((v) => (v ? dayjs(v, DATE_FORMAT, true) : null))
              : undefined,
          })}
        >
          <RangePicker style={{ width: "100%" }} format={DATE_FORMAT} />
        </Form.Item>
      )}

      <Form.Item
        label={t("employmentEligibility.convictedFelony.label")}
        name={["employmentEligibility", "convictedFelony"]}
        rules={[
          {
            required: true,
            message: t("employmentEligibility.convictedFelony.required"),
          },
        ]}
      >
        <Radio.Group onChange={(e) => setConvictedFelony(e.target.value)}>
          <Radio value="yes">{t("employmentEligibility.yes")}</Radio>
          <Radio value="no">{t("employmentEligibility.no")}</Radio>
        </Radio.Group>
      </Form.Item>

      {convictedFelony === "yes" && (
        <Form.Item
          label={t("employmentEligibility.felonyExplanation.label")}
          name={["employmentEligibility", "felonyExplanation"]}
          rules={[
            {
              required: true,
              message: t("employmentEligibility.felonyExplanation.required"),
            },
          ]}
        >
          <Input.TextArea
            rows={3}
            placeholder={t(
              "employmentEligibility.felonyExplanation.placeholder"
            )}
          />
        </Form.Item>
      )}
    </Form>
  );
};

export default EmploymentEligibility;
