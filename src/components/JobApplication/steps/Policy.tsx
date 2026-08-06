import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Col, DatePicker, Form, Input, Row } from "antd";
import type { FormInstance } from "antd/es/form";
import dayjs, { type Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SignatureInput from "@/components/common/SignatureInput";
import { useTranslation } from "@/translation/useTranslation";
import type { Language } from "@/translation/types";
import type { JobApplicationFormData } from "@/types/jobApplication";

dayjs.extend(customParseFormat);

const DATE_FORMAT = "MM-DD-YYYY";

interface PolicyProps {
  form: FormInstance;
  formData: JobApplicationFormData;
  setFormData: Dispatch<SetStateAction<JobApplicationFormData>>;
  language: Language;
}

const Policy = ({ form, formData, setFormData, language }: PolicyProps) => {
  const { t, tList } = useTranslation(language);

  const [signature1, setSignature1] = useState<string | null>(
    formData.policy?.signature1 ?? null
  );
  const [signature2, setSignature2] = useState<string | null>(
    formData.policy?.signature2 ?? null
  );
  const [isSignature1ModalOpen, setIsSignature1ModalOpen] = useState(false);
  const [isSignature2ModalOpen, setIsSignature2ModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    // Restores values on mount / when navigating back to this step.
    form.setFieldsValue({
      ...formData.policy,
      signature1: formData.policy?.signature1 ?? null,
      signature2: formData.policy?.signature2 ?? null,
    });
  }, [formData, form]);

  const handleValuesChange = (
    changedValues: Partial<JobApplicationFormData["policy"]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      policy: { ...prev.policy, ...changedValues },
    }));
  };

  const handleSaveSignature1 = (signatureData: string) => {
    setSignature1(signatureData);
    form.setFieldsValue({ signature1: signatureData });
    setFormData((prev) => ({
      ...prev,
      policy: { ...prev.policy, signature1: signatureData },
    }));
    setIsSignature1ModalOpen(false);
  };

  const handleClearSignature1 = () => {
    setSignature1(null);
    form.setFieldsValue({ signature1: null });
    setFormData((prev) => ({
      ...prev,
      policy: { ...prev.policy, signature1: null },
    }));
  };

  const handleSaveSignature2 = (signatureData: string) => {
    setSignature2(signatureData);
    form.setFieldsValue({ signature2: signatureData });
    setFormData((prev) => ({
      ...prev,
      policy: { ...prev.policy, signature2: signatureData },
    }));
    setIsSignature2ModalOpen(false);
  };

  const handleClearSignature2 = () => {
    setSignature2(null);
    form.setFieldsValue({ signature2: null });
    setFormData((prev) => ({
      ...prev,
      policy: { ...prev.policy, signature2: null },
    }));
  };

  const paragraphs = tList("policy.paragraphs");

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <div className="section_form_layout">
        <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
          <Form.Item
            label={t("policy.applicantName.label")}
            name="Applicant's Name"
            rules={[
              { required: true, message: t("policy.applicantName.required") },
            ]}
          >
            <Input placeholder={t("policy.applicantName.placeholder")} />
          </Form.Item>

          <Form.Item
            label={t("policy.applicantAddress.label")}
            name="Applicant's Address"
            rules={[
              {
                required: true,
                message: t("policy.applicantAddress.required"),
              },
            ]}
          >
            <Input placeholder={t("policy.applicantAddress.placeholder")} />
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={t("policy.city.label")}
                name="City"
                rules={[{ required: true, message: t("policy.city.required") }]}
              >
                <Input placeholder={t("policy.city.placeholder")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={t("policy.state.label")}
                name="State"
                rules={[
                  { required: true, message: t("policy.state.required") },
                ]}
              >
                <Input placeholder={t("policy.state.placeholder")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={t("policy.zip.label")}
                name="Zip"
                rules={[{ required: true, message: t("policy.zip.required") }]}
              >
                <Input placeholder={t("policy.zip.placeholder")} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={t("policy.signature1.label")}
            name="signature1"
            rules={[
              { required: true, message: t("policy.signature1.required") },
            ]}
          >
            <SignatureInput
              onSave={handleSaveSignature1}
              onClear={handleClearSignature1}
              imageURL={signature1}
              onOpenModal={() => setIsSignature1ModalOpen(true)}
              isOpen={isSignature1ModalOpen}
              onCancel={() => setIsSignature1ModalOpen(false)}
              label={t("personalInfo.signature.openButton")}
            />
          </Form.Item>

          <Form.Item
            label={t("policy.ssn.label")}
            name="Social Security Number"
            rules={[{ required: true, message: t("policy.ssn.required") }]}
          >
            <Input
              placeholder={t("policy.ssn.placeholder")}
              style={{ maxWidth: 260 }}
            />
          </Form.Item>

          <Form.Item
            label={t("policy.dob.label")}
            name="Date of Birth"
            rules={[{ required: true, message: t("policy.dob.required") }]}
            // Store a plain formatted string in state (consistent with the rest of the
            // app) instead of a raw Day.js instance, which doesn't serialize cleanly
            // when the form is submitted.
            getValueFromEvent={(date: Dayjs | null) =>
              date ? date.format(DATE_FORMAT) : null
            }
            getValueProps={(value?: string | null) => ({
              value: value ? dayjs(value, DATE_FORMAT, true) : null,
            })}
          >
            <DatePicker style={{ width: "100%" }} format={DATE_FORMAT} />
          </Form.Item>

          <p>{t("policy.eeocNote")}</p>

          <Form.Item
            label={t("policy.licenseNumber.label")}
            name="Driver's License Number"
            rules={[
              { required: true, message: t("policy.licenseNumber.required") },
            ]}
          >
            <Input
              placeholder={t("policy.licenseNumber.placeholder")}
              style={{ maxWidth: 260 }}
            />
          </Form.Item>

          {/* Previously also named "State" and silently collided with the field above -
              renamed so each field keeps its own value. */}
          <Form.Item
            label={t("policy.licenseState.label")}
            name="License State"
            rules={[
              { required: true, message: t("policy.licenseState.required") },
            ]}
          >
            <Input
              placeholder={t("policy.licenseState.placeholder")}
              style={{ maxWidth: 260 }}
            />
          </Form.Item>

          <p>{t("policy.toAllApplicants")}</p>
          <p>{t("policy.infoUseNote")}</p>
          <p>
            <b>{t("policy.rightsReceivedStatement")}</b>
          </p>

          {/* Previously an unconnected second <Form> - folded into the shared form so
              this signature is actually included in validateFields(). */}
          <Form.Item
            label={t("policy.signature2.label")}
            name="signature2"
            rules={[
              { required: true, message: t("policy.signature2.required") },
            ]}
            style={{ paddingBottom: "30px" }}
          >
            <SignatureInput
              onSave={handleSaveSignature2}
              onClear={handleClearSignature2}
              imageURL={signature2}
              onOpenModal={() => setIsSignature2ModalOpen(true)}
              isOpen={isSignature2ModalOpen}
              onCancel={() => setIsSignature2ModalOpen(false)}
              label={t("personalInfo.signature.openButton")}
            />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Policy;
