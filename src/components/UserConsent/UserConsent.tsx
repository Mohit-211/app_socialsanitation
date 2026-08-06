import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { submitUserConsent } from "../../api/userConsent";
import type {
  UserConsentFormValues,
  UserConsentFormErrors,
  UserConsentFormTouched,
} from "../../types/userConsent";

const services = [
  "Electrostatic Disinfection",
  "Strip & Wax",
  "Acid Wash",
  "Tile & Grout Cleaning",
  "Carpet Cleaning",
  "Carpet Extraction",
  "High Dusting",
  "Window Cleaning",
  "First Time Clean",
  "Day Porter Services",
  "Janitorial Services",
  "Housekeeping Services",
  "Move-In (Multi-Family Homes & Apartments) Services",
  "Custodial Services",
  "Surgical Room Sanitizing Services",
  "Post-Construction Clean",
  "Dishes",
  "Refrigerator Clean-out",
  "Interior Cabinets Clean-out",
  "Laundry 3 loads",
  "Oven Clean-out",
  "Baseboards",
  "Window cleaning under 46''",
  "Bio Clean",
  "Deep Clean",
  "Move-Out Clean",
  "Interior Window Cleaning",
];

interface ConsentFieldConfig {
  field: keyof UserConsentFormValues;
  required: boolean;
  text: string;
}

const CONSENT_FIELDS: ConsentFieldConfig[] = [
  {
    field: "consent_calls",
    required: true,
    text: "I agree to receive phone calls from Social Sanitation Commercial Cleaning Solutions regarding my inquiry, requested services, and related follow-ups.",
  },
  {
    field: "consent_autodialer",
    required: true,
    text: "I consent to receive calls using an automated dialing system and/or prerecorded voice messages.",
  },
  {
    field: "consent_marketing",
    required: false,
    text: "I agree to receive promotional and marketing calls.",
  },
  {
    field: "consent_sms",
    required: false,
    text: "I agree to receive SMS/text messages. Message and data rates may apply.",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600&display=swap');

  .cf-root * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

  .cf-root {
    min-height: 100vh;
    background: #f5f3ee;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 48px 16px;
  }

  .cf-wrapper { width: 100%; max-width: 740px; }

  .cf-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #2c7a4b;
    margin-bottom: 12px;
  }

  .cf-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    background: #2c7a4b;
    border-radius: 1px;
  }

  .cf-title {
    font-family: 'Playfair Display', serif;
    font-size: 38px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 1.15;
    margin: 0 0 12px 0;
  }

  .cf-subtitle {
    font-size: 15px;
    color: #6b7280;
    font-weight: 400;
    line-height: 1.6;
    margin: 0 0 36px 0;
  }

  .cf-card {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid #e8e4dc;
    overflow: hidden;
  }

  .cf-section {
    padding: 28px 36px;
    border-bottom: 1px solid #f0ece4;
  }

  .cf-section:last-child { border-bottom: none; }

  .cf-section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #9ca3af;
    margin: 0 0 20px 0;
  }

  .cf-field-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 560px) {
    .cf-field-group { grid-template-columns: 1fr; }
    .cf-section { padding: 20px; }
    .cf-title { font-size: 28px; }
    .cf-submit-section { padding: 20px 20px 28px; }
  }

  .cf-field { display: flex; flex-direction: column; gap: 6px; }
  .cf-field.full-width { grid-column: 1 / -1; }

  .cf-label { font-size: 13px; font-weight: 500; color: #374151; }
  .cf-label span { color: #ef4444; margin-left: 2px; }

  .cf-input {
    height: 44px;
    padding: 0 14px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: #111827;
    background: #fafaf9;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
    width: 100%;
  }

  .cf-input:hover { border-color: #d1d5db; }
  .cf-input:focus {
    border-color: #2c7a4b;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(44, 122, 75, 0.1);
  }
  .cf-input.error { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.08); }

  .cf-textarea { padding: 12px 14px; min-height: 110px; resize: vertical; height: auto; line-height: 1.6; }

  .cf-select-wrapper { position: relative; }

  .cf-select {
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    height: 44px;
    padding: 0 40px 0 14px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: #111827;
    background: #fafaf9;
    cursor: pointer;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
  }

  .cf-select:hover { border-color: #d1d5db; }
  .cf-select:focus { border-color: #2c7a4b; background: #fff; box-shadow: 0 0 0 3px rgba(44,122,75,0.1); }
  .cf-select.error { border-color: #ef4444; }

  .cf-select-arrow {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #9ca3af;
  }

  .cf-error-msg { font-size: 12px; color: #ef4444; font-weight: 500; margin-top: 2px; }

  /* Consent checkboxes */
  .cf-consent-list { display: flex; flex-direction: column; gap: 10px; }

  .cf-consent-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 10px;
    border: 1.5px solid #e5e7eb;
    background: #fafaf9;
    cursor: pointer;
    transition: border-color 0.18s, background 0.18s;
    user-select: none;
  }

  .cf-consent-row:hover { border-color: #d1d5db; background: #f5f3ee; }
  .cf-consent-row.checked { border-color: #2c7a4b; background: #f0faf4; }
  .cf-consent-row.has-error { border-color: #ef4444; background: #fff8f8; }

  .cf-checkbox {
    width: 18px;
    height: 18px;
    min-width: 18px;
    border-radius: 5px;
    border: 2px solid #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
    transition: all 0.15s;
    background: #fff;
    flex-shrink: 0;
  }

  .cf-checkbox.checked { background: #2c7a4b; border-color: #2c7a4b; }

  .cf-consent-text-wrap { display: flex; flex-direction: column; gap: 4px; flex: 1; }

  .cf-consent-text { font-size: 13.5px; color: #374151; line-height: 1.55; font-weight: 400; }

  .cf-badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border-radius: 4px;
    padding: 1px 6px;
    margin-left: 7px;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }

  .cf-badge.required { color: #b45309; background: #fef3c7; }
  .cf-badge.optional { color: #9ca3af; background: #f3f4f6; }

  .cf-opt-out-note {
    margin-top: 14px;
    font-size: 12px;
    color: #9ca3af;
    line-height: 1.6;
    padding: 10px 14px;
    background: #f9f9f7;
    border-radius: 8px;
    border-left: 3px solid #e5e7eb;
  }

  .cf-submit-section {
    padding: 28px 36px 36px;
    background: #fafaf9;
  }

  .cf-submit-btn {
    width: 100%;
    height: 52px;
    background: #1a1a1a;
    color: #ffffff;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.18s, transform 0.12s;
    font-family: 'DM Sans', sans-serif;
  }

  .cf-submit-btn:hover:not(:disabled) { background: #2c7a4b; }
  .cf-submit-btn:active:not(:disabled) { transform: scale(0.99); }
  .cf-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .cf-spinner {
    width: 18px;
    height: 18px;
    border: 2.5px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .cf-privacy-note {
    margin-top: 14px;
    font-size: 12px;
    color: #9ca3af;
    text-align: center;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`;

const CheckIcon = () => (
  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
    <path
      d="M1 4L4 7.5L10 1"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M3.5 5.5L7 9L10.5 5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ConsentForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState<UserConsentFormValues>({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    service: "",
    message: "",
    consent_calls: false,
    consent_autodialer: false,
    consent_marketing: false,
    consent_sms: false,
  });

  const [errors, setErrors] = useState<UserConsentFormErrors>({});
  const [touched, setTouched] = useState<UserConsentFormTouched>({});

  const validate = (
    vals: UserConsentFormValues = values
  ): UserConsentFormErrors => {
    const errs: UserConsentFormErrors = {};
    if (!vals.first_name.trim()) errs.first_name = "First name is required";
    if (!vals.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email))
      errs.email = "Enter a valid email";
    if (!vals.phone_no.trim()) errs.phone_no = "Phone number is required";
    if (!vals.service) errs.service = "Please select a service";
    if (!vals.consent_calls)
      errs.consent_calls = "You must agree to receive calls";
    if (!vals.consent_autodialer)
      errs.consent_autodialer = "You must consent to automated calls";
    return errs;
  };

  const handleChange = <K extends keyof UserConsentFormValues>(
    field: K,
    value: UserConsentFormValues[K]
  ) => {
    const updated = { ...values, [field]: value };
    setValues(updated);
    if (touched[field]) {
      const errs = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: errs[field] }));
    }
  };

  const handleBlur = (field: keyof UserConsentFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate();
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  };

  const handleSubmit = async () => {
    const allTouched = (
      Object.keys(values) as (keyof UserConsentFormValues)[]
    ).reduce((acc, k) => ({ ...acc, [k]: true }), {} as UserConsentFormTouched);
    setTouched(allTouched);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      setLoading(true);
      await submitUserConsent(values);
      message.success("Form submitted successfully!");
      navigate("/user-consent/thank-you");
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message
        : undefined;
      message.error(errorMessage || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="cf-root">
        <div className="cf-wrapper">
          <div className="cf-eyebrow">Client Consent</div>
          <h1 className="cf-title">Service Agreement Form</h1>
          <p className="cf-subtitle">
            Please fill in your details below to get started with your selected
            cleaning service.
          </p>

          <div className="cf-card">
            {/* Personal Info */}
            <div className="cf-section">
              <p className="cf-section-label">Personal Information</p>
              <div className="cf-field-group">
                <div className="cf-field">
                  <label className="cf-label">
                    First name <span>*</span>
                  </label>
                  <input
                    className={`cf-input${
                      touched.first_name && errors.first_name ? " error" : ""
                    }`}
                    placeholder="Jane"
                    value={values.first_name}
                    onChange={(e) => handleChange("first_name", e.target.value)}
                    onBlur={() => handleBlur("first_name")}
                  />
                  {touched.first_name && errors.first_name && (
                    <span className="cf-error-msg">{errors.first_name}</span>
                  )}
                </div>
                <div className="cf-field">
                  <label className="cf-label">Last name</label>
                  <input
                    className="cf-input"
                    placeholder="Doe"
                    value={values.last_name}
                    onChange={(e) => handleChange("last_name", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="cf-section">
              <p className="cf-section-label">Contact Details</p>
              <div className="cf-field-group">
                <div className="cf-field">
                  <label className="cf-label">
                    Email <span>*</span>
                  </label>
                  <input
                    type="email"
                    className={`cf-input${
                      touched.email && errors.email ? " error" : ""
                    }`}
                    placeholder="jane@example.com"
                    value={values.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                  />
                  {touched.email && errors.email && (
                    <span className="cf-error-msg">{errors.email}</span>
                  )}
                </div>
                <div className="cf-field">
                  <label className="cf-label">
                    Phone number <span>*</span>
                  </label>
                  <input
                    type="tel"
                    className={`cf-input${
                      touched.phone_no && errors.phone_no ? " error" : ""
                    }`}
                    placeholder="+1 (555) 000-0000"
                    value={values.phone_no}
                    onChange={(e) => handleChange("phone_no", e.target.value)}
                    onBlur={() => handleBlur("phone_no")}
                  />
                  {touched.phone_no && errors.phone_no && (
                    <span className="cf-error-msg">{errors.phone_no}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Service */}
            <div className="cf-section">
              <p className="cf-section-label">Service Selection</p>
              <div className="cf-field-group">
                <div className="cf-field full-width">
                  <label className="cf-label">
                    Select service <span>*</span>
                  </label>
                  <div className="cf-select-wrapper">
                    <select
                      className={`cf-select${
                        touched.service && errors.service ? " error" : ""
                      }`}
                      value={values.service}
                      onChange={(e) => handleChange("service", e.target.value)}
                      onBlur={() => handleBlur("service")}
                    >
                      <option value="" disabled>
                        Choose a service...
                      </option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <span className="cf-select-arrow">
                      <ChevronIcon />
                    </span>
                  </div>
                  {touched.service && errors.service && (
                    <span className="cf-error-msg">{errors.service}</span>
                  )}
                </div>
                <div className="cf-field full-width">
                  <label className="cf-label">Message / Comments</label>
                  <textarea
                    className="cf-input cf-textarea"
                    placeholder="Any special instructions or questions..."
                    value={values.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Consent */}
            <div className="cf-section">
              <p className="cf-section-label">Communication Consent</p>
              <div className="cf-consent-list">
                {CONSENT_FIELDS.map(({ field, required, text }) => (
                  <div
                    key={field}
                    className={`cf-consent-row${
                      values[field] ? " checked" : ""
                    }${touched[field] && errors[field] ? " has-error" : ""}`}
                    onClick={() => {
                      handleChange(field, !values[field]);
                      setTouched((prev) => ({ ...prev, [field]: true }));
                    }}
                  >
                    <div
                      className={`cf-checkbox${
                        values[field] ? " checked" : ""
                      }`}
                    >
                      {values[field] && <CheckIcon />}
                    </div>
                    <div className="cf-consent-text-wrap">
                      <span className="cf-consent-text">
                        {text}
                        <span
                          className={`cf-badge ${
                            required ? "required" : "optional"
                          }`}
                        >
                          {required ? "Required" : "Optional"}
                        </span>
                      </span>
                      {touched[field] && errors[field] && (
                        <span className="cf-error-msg">{errors[field]}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="cf-opt-out-note">
                You may opt out of receiving communications at any time by
                informing us during a call or by contacting us directly.
              </p>
            </div>

            {/* Submit */}
            <div className="cf-submit-section">
              <button
                className="cf-submit-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="cf-spinner" /> Submitting...
                  </>
                ) : (
                  "Submit Form"
                )}
              </button>
              <p className="cf-privacy-note">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M6.5 1L2 3v3.5C2 9.5 4 11.5 6.5 12c2.5-.5 4.5-2.5 4.5-5.5V3L6.5 1z"
                    stroke="#9ca3af"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Your information is kept private and used solely for service
                coordination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsentForm;
