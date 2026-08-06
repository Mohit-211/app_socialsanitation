import type { Dispatch, SetStateAction } from "react";
import { Form, Input, DatePicker, Radio, Button, Row, Col } from "antd";
import type { FormInstance } from "antd/es/form";
import dayjs, { type Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "@/translation/useTranslation";
import type { Language } from "@/translation/types";
import type {
  EmployerEntry,
  JobApplicationFormData,
} from "@/types/jobApplication";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const DURATION_FORMAT = "MM-01-YYYY"; // month/year picker, stored with a fixed day of 01

interface PreviousEmploymentProps {
  form: FormInstance;
  formData: JobApplicationFormData;
  setFormData: Dispatch<SetStateAction<JobApplicationFormData>>;
  language: Language;
}

const PreviousEmployment = ({
  form,
  formData,
  setFormData,
  language,
}: PreviousEmploymentProps) => {
  const { t } = useTranslation(language);

  const handleChange = (
    _changed: unknown,
    allValues: {
      previousEmployment: JobApplicationFormData["previousEmployment"];
    }
  ) => {
    setFormData((prev) => ({
      ...prev,
      previousEmployment: allValues.previousEmployment,
    }));
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onValuesChange={handleChange}
      initialValues={{
        previousEmployment: formData.previousEmployment || {
          hasJob: "no",
          employers: [{}],
        },
      }}
    >
      <Form.Item
        label={t("previousEmployment.hasJob.label")}
        name={["previousEmployment", "hasJob"]}
        rules={[
          { required: true, message: t("previousEmployment.hasJob.required") },
        ]}
      >
        <Radio.Group
          onChange={(e) => {
            const value = e.target.value;
            setFormData((prev) => ({
              ...prev,
              previousEmployment: {
                hasJob: value,
                employers:
                  value === "yes"
                    ? prev.previousEmployment?.employers || [{}]
                    : [],
              },
            }));
            form.setFieldsValue({
              previousEmployment: {
                hasJob: value,
                employers: value === "yes" ? [{}] : [],
              },
            });
          }}
        >
          <Radio value="yes">{t("previousEmployment.yes")}</Radio>
          <Radio value="no">{t("previousEmployment.no")}</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.List name={["previousEmployment", "employers"]}>
        {(fields, { add, remove }) =>
          form.getFieldValue(["previousEmployment", "hasJob"]) === "yes" && (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <div
                  key={key}
                  style={{
                    border: "1px solid #ddd",
                    padding: "16px",
                    marginBottom: "16px",
                    borderRadius: "5px",
                  }}
                >
                  <h3>
                    {t("previousEmployment.heading", {
                      index: String(index + 1),
                    })}
                  </h3>

                  <Form.Item
                    {...restField}
                    label={t("previousEmployment.companyName.label")}
                    name={[name, "companyName"]}
                    rules={[
                      {
                        required: true,
                        message: t("previousEmployment.companyName.required"),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t(
                        "previousEmployment.companyName.placeholder"
                      )}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label={t("previousEmployment.email.label")}
                    name={[name, "email"]}
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: t("previousEmployment.email.required"),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t("previousEmployment.email.placeholder")}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label={t("previousEmployment.address.label")}
                    name={[name, "address"]}
                    rules={[
                      {
                        required: true,
                        message: t("previousEmployment.address.required"),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t("previousEmployment.address.placeholder")}
                    />
                  </Form.Item>

                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        {...restField}
                        label={t("previousEmployment.city.label")}
                        name={[name, "city"]}
                        rules={[
                          {
                            required: true,
                            message: t("previousEmployment.city.required"),
                          },
                        ]}
                      >
                        <Input
                          placeholder={t("previousEmployment.city.placeholder")}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        {...restField}
                        label={t("previousEmployment.state.label")}
                        name={[name, "state"]}
                        rules={[
                          {
                            required: true,
                            message: t("previousEmployment.state.required"),
                          },
                        ]}
                      >
                        <Input
                          placeholder={t(
                            "previousEmployment.state.placeholder"
                          )}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        {...restField}
                        label={t("previousEmployment.zip.label")}
                        name={[name, "zip"]}
                        rules={[
                          {
                            required: true,
                            message: t("previousEmployment.zip.required"),
                          },
                        ]}
                      >
                        <Input
                          placeholder={t("previousEmployment.zip.placeholder")}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    {...restField}
                    label={t("previousEmployment.phone.label")}
                    name={[name, "phone"]}
                    rules={[
                      {
                        required: true,
                        message: t("previousEmployment.phone.required"),
                      },
                      {
                        pattern: /^\d{10}$/,
                        message: t("previousEmployment.phone.pattern"),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t("previousEmployment.phone.placeholder")}
                      maxLength={10}
                      inputMode="numeric"
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        form.setFieldValue(
                          ["previousEmployment", "employers", name, "phone"],
                          value
                        );
                      }}
                      onKeyDown={(e) => {
                        const allowedKeys = [
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ];
                        if (
                          !/[0-9]/.test(e.key) &&
                          !allowedKeys.includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label={t("previousEmployment.jobTitle.label")}
                    name={[name, "jobTitle"]}
                    rules={[
                      {
                        required: true,
                        message: t("previousEmployment.jobTitle.required"),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t("previousEmployment.jobTitle.placeholder")}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label={t("previousEmployment.duration.label")}
                    name={[name, "duration"]}
                    rules={[
                      {
                        required: true,
                        message: t("previousEmployment.duration.required"),
                      },
                    ]}
                    // Store a [string, string] pair instead of raw Day.js instances - same
                    // fix already applied to Policy's Date of Birth and the employment
                    // eligibility date range.
                    getValueFromEvent={(
                      dates: [Dayjs | null, Dayjs | null] | null
                    ) =>
                      dates
                        ? dates.map((d) =>
                            d ? d.format(DURATION_FORMAT) : null
                          )
                        : null
                    }
                    getValueProps={(
                      value?: [string | null, string | null] | null
                    ) => ({
                      value: value
                        ? value.map((v) =>
                            v ? dayjs(v, DURATION_FORMAT, true) : null
                          )
                        : undefined,
                    })}
                  >
                    <RangePicker
                      picker="month"
                      style={{ width: "100%" }}
                      format="MM-YYYY"
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label={t("previousEmployment.responsibilities.label")}
                    name={[name, "responsibilities"]}
                    rules={[
                      {
                        required: true,
                        message: t(
                          "previousEmployment.responsibilities.required"
                        ),
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder={t(
                        "previousEmployment.responsibilities.placeholder"
                      )}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label={t("previousEmployment.reasonForLeaving.label")}
                    name={[name, "reasonForLeaving"]}
                    rules={[
                      {
                        required: true,
                        message: t(
                          "previousEmployment.reasonForLeaving.required"
                        ),
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder={t(
                        "previousEmployment.reasonForLeaving.placeholder"
                      )}
                    />
                  </Form.Item>

                  {fields.length > 1 && (
                    <Button
                      danger
                      onClick={() => remove(name)}
                      icon={<DeleteOutlined />}
                      style={{ marginTop: "8px" }}
                    >
                      {t("previousEmployment.removeButton")}
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => add({} as Partial<EmployerEntry>)}
                block
                icon={<PlusOutlined />}
              >
                {t("previousEmployment.addButton")}
              </Button>
            </>
          )
        }
      </Form.List>
    </Form>
  );
};

export default PreviousEmployment;
