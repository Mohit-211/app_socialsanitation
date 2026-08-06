import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { DatePicker, Form, Input, Space } from "antd";
import type { FormInstance } from "antd/es/form";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SignatureInput from "@/components/common/SignatureInput";
import { useTranslation } from "@/translation/useTranslation";
import type { Language } from "@/translation/types";
import type { JobApplicationFormData } from "@/types/jobApplication";

dayjs.extend(customParseFormat);

const DATE_FORMAT = "MM-DD-YYYY";

interface DisclaimerProps {
  form: FormInstance;
  formData: JobApplicationFormData;
  setFormData: Dispatch<SetStateAction<JobApplicationFormData>>;
  language: Language;
}

const parseStoredDate = (value?: string | null): Dayjs | null => {
  if (!value) return null;
  // Try the expected storage format first.
  const strict = dayjs(value, DATE_FORMAT, true);
  if (strict.isValid()) return strict;
  // Fallback: let dayjs try to infer (handles ISO strings, etc.)
  const loose = dayjs(value);
  return loose.isValid() ? loose : null;
};

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

  useEffect(() => {
    form.setFieldsValue({
      signature: formData.disclaimer?.signature || null,
      date: parseStoredDate(formData.disclaimer?.date),
      printedName: formData.disclaimer?.printedName || "",
    });
    setSignatureImageURL(formData.disclaimer?.signature ?? null);
  }, [formData, form]);

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
            getValueFromEvent={(date: Dayjs | null) =>
              date ? date.format(DATE_FORMAT) : null
            }
            getValueProps={(value?: string | Dayjs | null) => ({
              value:
                value && dayjs.isDayjs(value)
                  ? value
                  : parseStoredDate(value as string | null),
            })}
          >
            <DatePicker style={{ width: "100%" }} format={DATE_FORMAT} 
             placeholder={t(
                    "floridaAgreement.entireAgreement.datePlaceholder"
                  )}
            />
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