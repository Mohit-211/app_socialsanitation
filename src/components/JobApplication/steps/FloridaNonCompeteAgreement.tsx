import { useState, type Dispatch, type SetStateAction } from "react";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import type { FormInstance } from "antd/es/form";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
 import advancedFormat from "dayjs/plugin/advancedFormat";
import SignatureInput from "@/components/common/SignatureInput";
import { floridaJurisdictions } from "@/config/floridaJurisdictions";
import { useTranslation } from "@/translation/useTranslation";
import type { Language } from "@/translation/types";
import type { JobApplicationFormData } from "@/types/jobApplication";

 
dayjs.extend(advancedFormat); // needed for the "Do" (ordinal day) display token below

const DATE_STORAGE_FORMAT = "MM-DD-YYYY";
const DATE_DISPLAY_FORMAT = "Do [day of] MMMM, YYYY";

const jurisdictionSelectOptions = floridaJurisdictions.map((county) => ({
  label: county,
  value: county,
}));

interface FloridaNonCompeteAgreementProps {
  form: FormInstance;
  formData: JobApplicationFormData;
  setFormData: Dispatch<SetStateAction<JobApplicationFormData>>;
  language: Language;
}

const FloridaNonCompeteAgreement = ({
  form,
  formData,
  setFormData,
  language,
}: FloridaNonCompeteAgreementProps) => {
  const { t, tList } = useTranslation(language);

  const [companySignature, setCompanySignature] = useState<string | null>(
    formData.floridaAgreement?.companysignature ?? null
  );
  const [recipientSignature, setRecipientSignature] = useState<string | null>(
    formData.floridaAgreement?.recipientsignature ?? null
  );
  const [isSignature1ModalOpen, setIsSignature1ModalOpen] = useState(false);
  const [isSignature2ModalOpen, setIsSignature2ModalOpen] = useState(false);

  const handleValuesChange = (
    _changed: unknown,
    allValues: JobApplicationFormData["floridaAgreement"]
  ) => {
    setFormData((prev) => ({
      ...prev,
      floridaAgreement: { ...prev.floridaAgreement, ...allValues },
    }));
  };

  const handleSaveSignature1 = (signatureData: string) => {
    setCompanySignature(signatureData);
    form.setFieldsValue({ companysignature: signatureData });
    setFormData((prev) => ({
      ...prev,
      floridaAgreement: {
        ...prev.floridaAgreement,
        companysignature: signatureData,
      },
    }));
    setIsSignature1ModalOpen(false);
  };

  const handleSaveSignature2 = (signatureData: string) => {
    setRecipientSignature(signatureData);
    form.setFieldsValue({ recipientsignature: signatureData });
    setFormData((prev) => ({
      ...prev,
      floridaAgreement: {
        ...prev.floridaAgreement,
        recipientsignature: signatureData,
      },
    }));
    setIsSignature2ModalOpen(false);
  };

  const handleClearSignature1 = () => {
    setCompanySignature(null);
    form.setFieldsValue({ companysignature: null });
    setFormData((prev) => ({
      ...prev,
      floridaAgreement: { ...prev.floridaAgreement, companysignature: null },
    }));
  };

  const handleClearSignature2 = () => {
    setRecipientSignature(null);
    form.setFieldsValue({ recipientsignature: null });
    setFormData((prev) => ({
      ...prev,
      floridaAgreement: { ...prev.floridaAgreement, recipientsignature: null },
    }));
  };

  const inlineFieldStyle = {
    border: "1px solid black",
    borderTop: "0",
    borderLeft: "0",
    borderRight: "0",
    background: "transparent",
    padding: "0",
    width: "auto",
    borderRadius: "0",
  };

  const nonCompeteItems = tList(
    "floridaAgreement.nonCompete.items"
  ) as unknown as {
    bold: string;
    text: string;
  }[];
  const permittedDisclosureItems = tList(
    "floridaAgreement.permittedDisclosure.items"
  );

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        onValuesChange={handleValuesChange}
        initialValues={formData.floridaAgreement || {}}
      >
        <ol>
          <li>
            <div>
              <b>{t("floridaAgreement.purpose.heading")}</b>
              <p>
                {t("floridaAgreement.purpose.intro")}
                &nbsp;
                <span>
                  <Form.Item
                    name="companyNameTitle"
                    style={{ display: "inline-block", margin: "0" }}
                    rules={[
                      {
                        required: true,
                        message: t(
                          "floridaAgreement.purpose.companyNameTitleRequired"
                        ),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t(
                        "floridaAgreement.purpose.companyNameTitlePlaceholder"
                      )}
                      style={inlineFieldStyle}
                    />
                  </Form.Item>
                </span>
                &nbsp;{t("floridaAgreement.purpose.middle")}
              </p>
              <p>{t("floridaAgreement.purpose.paragraph2")}</p>
            </div>
          </li>

          <li>
            <div>
              <b>{t("floridaAgreement.nonCompete.heading")}</b>
              <p>
                {t("floridaAgreement.nonCompete.intro")}
                <br />
                {t("floridaAgreement.nonCompete.checkAllThatApply")}
              </p>
              <ul style={{ marginBottom: "1rem" }}>
                {nonCompeteItems.map((item, index) => (
                  <li key={index}>
                    <b>{item.bold}</b>
                    {item.text}
                    {index === 3 && (
                      <>
                        &nbsp;
                        <span>
                          <Form.Item
                            name="specific_competitor"
                            style={{ display: "inline-block", margin: "0" }}
                            rules={[
                              {
                                required: true,
                                message: t(
                                  "floridaAgreement.nonCompete.specificCompetitorRequired"
                                ),
                              },
                            ]}
                          >
                            <Input
                              placeholder={t(
                                "floridaAgreement.nonCompete.specificCompetitorPlaceholder"
                              )}
                              style={inlineFieldStyle}
                            />
                          </Form.Item>
                        </span>
                        &nbsp;
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li>
            <div>
              <b>{t("floridaAgreement.timePeriod.heading")}</b>
              <p>
                {t("floridaAgreement.timePeriod.intro")}
                &nbsp;
                <span>
                  <Form.Item
                    name="time_period"
                    style={{ display: "inline-block", margin: "0" }}
                    rules={[
                      {
                        required: true,
                        message: t("floridaAgreement.timePeriod.required"),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t("floridaAgreement.timePeriod.placeholder")}
                      style={inlineFieldStyle}
                    />
                  </Form.Item>
                </span>
                &nbsp;{t("floridaAgreement.timePeriod.outro")}
              </p>
            </div>
          </li>

          <li>
            <b>{t("floridaAgreement.purchaseOption.heading")}</b>
            <p>{t("floridaAgreement.purchaseOption.body")}</p>
          </li>

          <li>
            <b>{t("floridaAgreement.jurisdiction.heading")}</b>
            <p>
              {t("floridaAgreement.jurisdiction.intro")}
              &nbsp;
              <Form.Item
                name="select_jurisdiction"
                style={{ display: "inline-block", margin: "0" }}
                rules={[
                  {
                    required: true,
                    message: t("floridaAgreement.jurisdiction.required"),
                  },
                ]}
              >
                <Select
                  style={{ width: 200 }}
                  placeholder={t("floridaAgreement.jurisdiction.placeholder")}
                  options={jurisdictionSelectOptions}
                />
              </Form.Item>
              &nbsp;
            </p>
          </li>

          <li>
            <b>{t("floridaAgreement.confidentialInformation.heading")}</b>
            <p>{t("floridaAgreement.confidentialInformation.body")}</p>
          </li>

          <li>
            <b>{t("floridaAgreement.permittedDisclosure.heading")}</b>
            <p>{t("floridaAgreement.permittedDisclosure.intro")}</p>
            <ol type="i">
              {permittedDisclosureItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </li>

          <li style={{ marginTop: "1rem" }}>
            <b>{t("floridaAgreement.confidentiality.heading")}</b>
            <p>{t("floridaAgreement.confidentiality.body")}</p>
          </li>

          <li>
            <b>{t("floridaAgreement.consultantsEmployeesBound.heading")}</b>
            <p>{t("floridaAgreement.consultantsEmployeesBound.body")}</p>
          </li>

          <li>
            <b>{t("floridaAgreement.returnOfMaterials.heading")}</b>
            <p>{t("floridaAgreement.returnOfMaterials.body")}</p>
          </li>

          <li>
            <b>{t("floridaAgreement.remedies.heading")}</b>
            <p>{t("floridaAgreement.remedies.body")}</p>
          </li>

          <li>
            <b>{t("floridaAgreement.choiceOfLaw.heading")}</b>
            <p>{t("floridaAgreement.choiceOfLaw.body")}</p>
          </li>

          <li>
            <b>{t("floridaAgreement.entireAgreement.heading")}</b>
            <p style={{ margin: 0 }}>
              {t("floridaAgreement.entireAgreement.paragraph1")}
            </p>
            <p style={{ marginTop: 0 }}>
              {t("floridaAgreement.entireAgreement.paragraph2Intro")}{" "}
              <Form.Item
                name="agreement_date"
                style={{ display: "inline-block", margin: "0" }}
                rules={[
                  {
                    required: true,
                    message: t("floridaAgreement.entireAgreement.dateRequired"),
                  },
                ]}
                // Store a plain "MM-DD-YYYY" string (consistent with the rest of the app)
                // instead of a raw Day.js instance. The DatePicker still *displays* the
                // ordinal "Do [day of] MMMM, YYYY" format independently via its own
                // `format` prop below.
                getValueFromEvent={(date: Dayjs | null) =>
                  date ? date.format(DATE_STORAGE_FORMAT) : null
                }
                getValueProps={(value?: string | null) => ({
                  value: value ? dayjs(value, DATE_STORAGE_FORMAT, true) : null,
                })}
              >
                <DatePicker
                  format={DATE_DISPLAY_FORMAT}
                  placeholder={t(
                    "floridaAgreement.entireAgreement.datePlaceholder"
                  )}
                />
              </Form.Item>
            </p>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <h4>
                  {t("floridaAgreement.entireAgreement.companyColumnHeading")}
                </h4>
                <Form.Item
                  label={t("floridaAgreement.entireAgreement.signatureLabel")}
                  name="companysignature"
                  rules={[
                    {
                      required: true,
                      message: t(
                        "floridaAgreement.entireAgreement.signatureRequired"
                      ),
                    },
                  ]}
                >
                  <SignatureInput
                    onSave={handleSaveSignature1}
                    onClear={handleClearSignature1}
                    imageURL={companySignature}
                    onOpenModal={() => setIsSignature1ModalOpen(true)}
                    isOpen={isSignature1ModalOpen}
                    onCancel={() => setIsSignature1ModalOpen(false)}
                    label={t("personalInfo.signature.openButton")}
                  />
                </Form.Item>
                <b>{t("floridaAgreement.entireAgreement.companyLegalName")}</b>
              </Col>
              <Col xs={24} sm={12}>
                <h4>
                  {t("floridaAgreement.entireAgreement.recipientColumnHeading")}
                </h4>
                <Form.Item
                  label={t("floridaAgreement.entireAgreement.signatureLabel")}
                  name="recipientsignature"
                  rules={[
                    {
                      required: true,
                      message: t(
                        "floridaAgreement.entireAgreement.signatureRequired"
                      ),
                    },
                  ]}
                >
                  <SignatureInput
                    onSave={handleSaveSignature2}
                    onClear={handleClearSignature2}
                    imageURL={recipientSignature}
                    onOpenModal={() => setIsSignature2ModalOpen(true)}
                    isOpen={isSignature2ModalOpen}
                    onCancel={() => setIsSignature2ModalOpen(false)}
                    label={t("personalInfo.signature.openButton")}
                  />
                </Form.Item>
                <Form.Item
                  name="recipientName"
                  label={t(
                    "floridaAgreement.entireAgreement.recipientNameLabel"
                  )}
                  rules={[
                    {
                      required: true,
                      message: t(
                        "floridaAgreement.entireAgreement.recipientNameRequired"
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={t(
                      "floridaAgreement.entireAgreement.recipientNameLabel"
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
          </li>
        </ol>
      </Form>
    </div>
  );
};

export default FloridaNonCompeteAgreement;
