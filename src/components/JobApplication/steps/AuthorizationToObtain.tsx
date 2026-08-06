import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
  type ChangeEvent,
} from "react";
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
interface AuthorizationToObtainProps {
  form: FormInstance;
  formData: JobApplicationFormData;
  setFormData: Dispatch<SetStateAction<JobApplicationFormData>>;
  language: Language;
}
const AuthorizationToObtain = ({
  form,
  formData,
  setFormData,
  language,
}: AuthorizationToObtainProps) => {
  const { t } = useTranslation(language);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [signatureImageURL, setSignatureImageURL] = useState<string | null>(
    formData.authorization?.signature ?? null
  );
 useEffect(() => {
  form.setFieldsValue({
    printedName: formData.authorization?.printedName || "",
    signature: formData.authorization?.signature ?? null,
  });
}, [formData.authorization, form]);
  const handleSaveSignature = (signatureData: string) => {
    setSignatureImageURL(signatureData);
    form.setFieldsValue({ signature: signatureData });
    setFormData((prev) => ({
      ...prev,
      authorization: { ...prev.authorization, signature: signatureData },
    }));
    setIsSignatureModalOpen(false);
  };
  const handleClearSignature = () => {
    setSignatureImageURL(null);
    form.setFieldsValue({ signature: null });
    setFormData((prev) => ({
      ...prev,
      authorization: { ...prev.authorization, signature: null },
    }));
  };
  const handleDateChange = (date: Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      authorization: {
        ...prev.authorization,
        date: date ? date.format(DATE_FORMAT) : null,
      },
    }));
  };
  const handlePrintedNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      authorization: { ...prev.authorization, printedName: e.target.value },
    }));
  };
  return (
    <div>
      <p>{t("authorizationToObtain.intro")}</p>
      <Form form={form} layout="vertical">
        <Space orientation="vertical" style={{ width: "100%" }}>
          <Form.Item
            label={t("authorizationToObtain.signatureLabel")}
            name="signature"
            rules={[
              {
                required: true,
                message: t("authorizationToObtain.signatureRequired"),
              },
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
            label={t("authorizationToObtain.printedNameLabel")}
            name="printedName"
            rules={[
              {
                required: true,
                message: t("authorizationToObtain.printedNameRequired"),
              },
            ]}
          >
            <Input
              placeholder={t("authorizationToObtain.printedNamePlaceholder")}
              onChange={handlePrintedNameChange}
              style={{ maxWidth: 400 }}
            />
          </Form.Item>
       <Form.Item
  label={t("authorizationToObtain.dateLabel")}
  rules={[
    {
      required: true,
      message: t("authorizationToObtain.dateRequired"),
    },
  ]}
>
  <DatePicker
    style={{ width: "100%" }}
    format={DATE_FORMAT}
    value={
      formData.authorization?.date
        ? dayjs(formData.authorization.date, DATE_FORMAT)
        : null
    }
      placeholder={t(
                    "floridaAgreement.entireAgreement.datePlaceholder"
                  )}
    onChange={handleDateChange}
  />
</Form.Item>
        </Space>
      </Form>
      <p>{t("authorizationToObtain.enclosures")}</p>
    </div>
  );
};
export default AuthorizationToObtain;