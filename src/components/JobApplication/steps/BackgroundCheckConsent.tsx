import { Form, Radio } from "antd";
import type { FormInstance } from "antd/es/form";
import { useTranslation } from "../../../translation/useTranslation";
import type { Language } from "../../../translation/types";
import type { JobApplicationFormData } from "../../../types/jobApplication";

interface BackgroundCheckConsentProps {
  form: FormInstance;
  formData: JobApplicationFormData;
  setFormData: React.Dispatch<React.SetStateAction<JobApplicationFormData>>;
  language: Language;
}

const BackgroundCheckConsent = ({
  form,
  formData,
  setFormData,
  language,
}: BackgroundCheckConsentProps) => {
  const { t } = useTranslation(language);

  const handleChange = (
    changedValues: Partial<JobApplicationFormData["backgroundCheck"]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      backgroundCheck: { ...prev.backgroundCheck, ...changedValues },
    }));
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={formData.backgroundCheck || {}}
      onValuesChange={handleChange}
    >
      {/* Intentionally not required in the original - preserved as-is. */}
      <Form.Item label={t("backgroundCheck.label")} name="consent">
        <Radio.Group>
          <Radio value="yes">{t("backgroundCheck.yes")}</Radio>
          <Radio value="no">{t("backgroundCheck.no")}</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default BackgroundCheckConsent;
