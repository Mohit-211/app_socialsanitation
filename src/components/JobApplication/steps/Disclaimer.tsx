import { useState, type Dispatch, type SetStateAction } from "react";
import { DatePicker, Form, Input, Space } from "antd";
import type { FormInstance } from "antd/es/form";
import SignatureInput from "@/components/common/SignatureInput";
import { useTranslation } from "@/translation/useTranslation";
import type { Language } from "@/translation/types";
import type { JobApplicationFormData } from "@/types/jobApplication";

interface DisclaimerProps {
  form: FormInstance;
  formData: JobApplicationFormData;
  setFormData: Dispatch<SetStateAction<JobApplicationFormData>>;
  language: Language;
}

const Disclaimer = ({
  form,
  formData,
  setFormData,
  language,
}: DisclaimerProps) => {
  const { t, tList } = useTranslation(language);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [signatureImageURL, setSignatureImageURL] = useState<string | null>(
    formData.disclaimer?.signature ?? null
  );

  const handleChange = (
    changedValues: Partial<JobApplicationFormData["disclaimer"]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      disclaimer: { ...prev.disclaimer, ...changedValues },
    }));
  };

  const handleSaveSignature = (signatureData: string) => {
    setSignatureImageURL(signatureData);
    form.setFieldsValue({ signature: signatureData });
    setFormData((prev) => ({
      ...prev,
      disclaimer: { ...prev.disclaimer, signature: signatureData },
    }));
    setIsSignatureModalOpen(false);
  };

  const handleClearSignature = () => {
    setSignatureImageURL(null);
    form.setFieldsValue({ signature: null });
    setFormData((prev) => ({
      ...prev,
      disclaimer: { ...prev.disclaimer, signature: null },
    }));
  };

  const paragraphs = tList("disclaimer.paragraphs");

  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <Form
        layout="vertical"
        form={form}
        initialValues={formData.disclaimer || {}}
        onValuesChange={handleChange}
      >
        <Space size="large" align="start">
          <Form.Item
            label={t("disclaimer.signatureLabel")}
            name="signature"
            rules={[
              { required: true, message: t("disclaimer.signatureRequired") },
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
          <Form.Item
            label={t("disclaimer.dateLabel")}
            name="date"
            rules={[{ required: true, message: t("disclaimer.dateRequired") }]}
          >
            <DatePicker style={{ width: "100%" }} format="MM-DD-YYYY" />
          </Form.Item>
          <Form.Item
            label={t("disclaimer.printedNameLabel")}
            name="printedName"
            rules={[
              { required: true, message: t("disclaimer.printedNameRequired") },
            ]}
          >
            <Input
              placeholder={t("disclaimer.printedNamePlaceholder")}
              style={{ maxWidth: 400 }}
            />
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
};

export default Disclaimer;
