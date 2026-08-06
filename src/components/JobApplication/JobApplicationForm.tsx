import { useEffect, useRef, useState } from "react";
import {
  Steps,
  Button,
  Form,
  message,
  Spin,
  Modal,
  Flex,
  Progress,
  Typography,
  Grid,
} from "antd";
import { useNavigate } from "react-router-dom";

import PersonalInformation from "./steps/PersonalInformation";
import DisclosureAndAuthorization from "./steps/DisclosureAndAuthorization";
import AuthorizationToObtain from "./steps/AuthorizationToObtain";
import Policy from "./steps/Policy";
import EmploymentEligibility from "./steps/EmploymentEligibility";
import Education from "./steps/Education";
import PreviousEmployment from "./steps/PreviousEmployment";
import References from "./steps/References";
import MilitaryService from "./steps/MilitaryService";
import BackgroundCheckConsent from "./steps/BackgroundCheckConsent";
import Disclaimer from "./steps/Disclaimer";
import FloridaNonCompeteAgreement from "./steps/FloridaNonCompeteAgreement";
import EmployeeDirectDeposit from "./steps/EmployeeDirectDeposit";

import { submitJobApplication } from "@/api/jobApplication";
import { jobApplicationSteps } from "@/config/jobApplicationSteps";
import { useTranslation } from "@/translation/useTranslation";
import type { Language } from "@/translation/types";
import type { JobApplicationFormData } from "@/types/jobApplication";

import "./JobApplication.scss";

interface JobApplicationFormProps {
  language: Language;
}

const createInitialFormData = (): JobApplicationFormData => ({
  personalInfo: {
    firstName: "",
    middleName: "",
    lastName: "",
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: null,
    dateAvailable: null,
    email: "",
    phone: "",
    ssn: "",
    position: "",
    desiredPay: "",
    employmentType: [],
    signature: null,
  },
  employmentEligibility: {},
  education: {},
  previousEmployment: { hasJob: "no", employers: [{}] },
  references: [],
  militaryService: { veteran: "no", records: [] },
  backgroundCheck: {},
  authorization: {},
  policy: {},
  disclaimer: {},
  floridaAgreement: {},
  directDeposit: { banks: [{}] },
});

const { useBreakpoint } = Grid;
const LAST_STEP_INDEX = jobApplicationSteps.length - 1;

const JobApplicationForm = ({ language }: JobApplicationFormProps) => {
  const { t, tList } = useTranslation(language);
  const screens = useBreakpoint();
  const isCompactStepper = !screens.md;
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<JobApplicationFormData>(
    createInitialFormData()
  );
  const navigate = useNavigate();

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentStep]);

  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep((prev) => prev + 1);
    } catch {
      setIsModalVisible(true);
    }
  };

  const handleCloseModal = () => setIsModalVisible(false);
  const handlePrev = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      await form.validateFields();

      if (currentStep !== LAST_STEP_INDEX) {
        message.error(t("messages.submitIncomplete"));
        return;
      }

      setLoading(true);
      const response = await submitJobApplication(formData, language);

      if (response?.data?.message) {
        message.success(t("messages.submitSuccess"));
        navigate("/thank-you");
      } else {
        message.error(t("messages.submitUnexpected"));
      }
    } catch (error) {
      console.error("Submission Error:", error);
      message.error(t("messages.submitFailed"));
    } finally {
      setLoading(false);
    }
  };

  const policyTopLeftLines = tList("stepHeadings.policyTopLeftLines");
  const stepItems = jobApplicationSteps.map((step) => ({
    title: t(step.titleKey),
  }));

  return (
    <>
      <Modal
        title={t("modal.title")}
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="ok" type="primary" onClick={handleCloseModal}>
            {t("modal.ok")}
          </Button>,
        ]}
      >
        <p>{t("modal.body")}</p>
      </Modal>

      <Flex vertical gap="large" className="job-application-layout">
        {isCompactStepper ? (
          <div className="stepper-mobile">
            <Typography.Text strong>
              {t("stepper.progressLabel", {
                current: String(currentStep + 1),
                total: String(jobApplicationSteps.length),
              })}
              : {t(jobApplicationSteps[currentStep].titleKey)}
            </Typography.Text>
            <Progress
              percent={Math.round(
                ((currentStep + 1) / jobApplicationSteps.length) * 100
              )}
              showInfo={false}
              size="small"
            />
          </div>
        ) : (
          <div className="stepper-container">
            <Steps current={currentStep} items={stepItems} size="small" />
          </div>
        )}

        <div className="form-content" ref={formRef}>
          {currentStep === 0 && (
            <>
              <h5>{t("stepHeadings.disclosureAndAuthorization")}</h5>
              <DisclosureAndAuthorization language={language} />
              <h5>{t("stepHeadings.authorizationToObtain")}</h5>
              <AuthorizationToObtain
                form={form}
                formData={formData}
                setFormData={setFormData}
                language={language}
              />
              <div className="top_left_heading">
                {policyTopLeftLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <Policy
                form={form}
                formData={formData}
                setFormData={setFormData}
                language={language}
              />
            </>
          )}

          {currentStep === 1 && (
            <>
              <h4>{t("stepHeadings.employmentJobApplication")}</h4>
              <div className="form_section">
                <div className="Form_section_heading">
                  {t("stepHeadings.personalInformation")}
                </div>
                <PersonalInformation
                  form={form}
                  formData={formData}
                  setFormData={setFormData}
                  language={language}
                />
              </div>
              <div className="form_section">
                <div className="Form_section_heading">
                  {t("stepHeadings.employmentEligibility")}
                </div>
                <EmploymentEligibility
                  form={form}
                  formData={formData}
                  setFormData={setFormData}
                  language={language}
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <div className="form_section">
              <div className="Form_section_heading">
                {t("stepHeadings.education")}
              </div>
              <Education
                form={form}
                formData={formData}
                setFormData={setFormData}
                language={language}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="form_section">
              <div className="Form_section_heading">
                {t("stepHeadings.previousEmployment")}
              </div>
              <PreviousEmployment
                form={form}
                formData={formData}
                setFormData={setFormData}
                language={language}
              />
            </div>
          )}

          {currentStep === 4 && (
            <div className="form_section">
              <div className="Form_section_heading">
                {t("stepHeadings.references")}
              </div>
              <References
                form={form}
                formData={formData}
                setFormData={setFormData}
                language={language}
              />
            </div>
          )}

          {currentStep === 5 && (
            <div className="form_section">
              <div className="Form_section_heading">
                {t("stepHeadings.militaryService")}
              </div>
              <MilitaryService
                form={form}
                formData={formData}
                setFormData={setFormData}
                language={language}
              />
            </div>
          )}

          {currentStep === 6 && (
            <div className="form_section">
              <div className="Form_section_heading">
                {t("stepHeadings.backgroundCheckConsent")}
              </div>
              <BackgroundCheckConsent
                form={form}
                formData={formData}
                setFormData={setFormData}
                language={language}
              />
            </div>
          )}

          {currentStep === 7 && (
            <div className="form_section">
              <div className="Form_section_heading">
                {t("stepHeadings.disclaimer")}
              </div>
              <Disclaimer
                form={form}
                formData={formData}
                setFormData={setFormData}
                language={language}
              />
            </div>
          )}

          {currentStep === 8 && (
            <>
              <h4>{t("stepHeadings.floridaNonCompeteAgreement")}</h4>
              <FloridaNonCompeteAgreement
                form={form}
                formData={formData}
                setFormData={setFormData}
                language={language}
              />
            </>
          )}

          {currentStep === 9 && (
            <>
              <h4>{t("stepHeadings.employeeDirectDepositAuthorization")}</h4>
              <EmployeeDirectDeposit
                form={form}
                formData={formData}
                setFormData={setFormData}
                language={language}
              />
            </>
          )}

          <div className="step-buttons">
            {currentStep > 0 && (
              <Button onClick={handlePrev}>{t("buttons.previous")}</Button>
            )}
            {currentStep < LAST_STEP_INDEX ? (
              <Button type="primary" onClick={handleNext}>
                {t("buttons.next")}
              </Button>
            ) : (
              <Button type="primary" onClick={handleSubmit} disabled={loading}>
                {loading ? <Spin size="small" /> : t("buttons.submit")}
              </Button>
            )}
          </div>
        </div>
      </Flex>
    </>
  );
};

export default JobApplicationForm;
