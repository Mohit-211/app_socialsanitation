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
    city: null,
    state: null,
    zipCode: "",
    country: null,
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

const STORAGE_KEY = "jobApplicationFormData";
const STEP_STORAGE_KEY = "jobApplicationCurrentStep";

const loadStoredFormData = (): JobApplicationFormData => {
  const initialData = createInitialFormData();

  if (typeof window === "undefined") {
    return initialData;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return initialData;
    }

    const parsed = JSON.parse(stored);

    return {
      ...initialData,
      ...parsed,
      authorization: {
        ...initialData.authorization,
        ...(parsed.authorization || {}),
      },
    };
  } catch (error) {
    console.error("Failed to load form data:", error);
    return initialData;
  }
};

const loadStoredStep = (): number => {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const stored = localStorage.getItem(STEP_STORAGE_KEY);
    const parsed = stored ? Number(stored) : 0;

    if (
      Number.isInteger(parsed) &&
      parsed >= 0 &&
      parsed <= LAST_STEP_INDEX
    ) {
      return parsed;
    }
  } catch (error) {
    console.error("Failed to load step:", error);
  }

  return 0;
};


const JobApplicationForm = ({ language }: JobApplicationFormProps) => {
  const { t, tList } = useTranslation(language);
  const screens = useBreakpoint();
  const isCompactStepper = !screens.md;
  const [currentStep, setCurrentStep] = useState(loadStoredStep);
  const formRef = useRef<HTMLDivElement>(null);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<JobApplicationFormData>(
    loadStoredFormData
  );
  const [formKey, setFormKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentStep]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // storage unavailable or quota exceeded; skip persisting
    }
  }, [formData]);

  useEffect(() => {
    try {
      localStorage.setItem(STEP_STORAGE_KEY, String(currentStep));
    } catch {
      // storage unavailable; skip persisting
    }
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

  const handleResetRequest = () => setIsResetModalVisible(true);
  const handleCancelReset = () => setIsResetModalVisible(false);
  const handleConfirmReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_STORAGE_KEY);
    } catch {
      // storage unavailable; nothing to clean up
    }
    form.resetFields();
    setFormData(createInitialFormData());
    setCurrentStep(0);
    setFormKey((prev) => prev + 1);
    setIsResetModalVisible(false);
  };

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

      <Modal
        title={t("resetConfirm.title")}
        open={isResetModalVisible}
        onCancel={handleCancelReset}
        footer={[
          <Button key="cancel" onClick={handleCancelReset}>
            {t("resetConfirm.cancel")}
          </Button>,
          <Button key="ok" danger type="primary" onClick={handleConfirmReset}>
            {t("resetConfirm.ok")}
          </Button>,
        ]}
      >
        <p>{t("resetConfirm.body")}</p>
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
        <Flex justify="flex-end">
          <Button onClick={handleResetRequest}>{t("buttons.resetForm")}</Button>
        </Flex>
        <div className="form-content" ref={formRef} key={formKey}>
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
