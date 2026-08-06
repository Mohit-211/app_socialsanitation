import { useEffect, useState } from "react";
import { DatePicker, Form, Input, Radio } from "antd";
import type { FormInstance } from "antd/es/form";
import dayjs, { type Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useTranslation } from "../../../translation/useTranslation";
import type { Language } from "../../../translation/types";
import type { JobApplicationFormData } from "../../../types/jobApplication";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const SERVICE_PERIOD_FORMAT = "MM-01-YYYY"; // month/year picker, stored with a fixed day of 01

interface MilitaryServiceProps {
  form: FormInstance;
  formData: JobApplicationFormData;
  setFormData: React.Dispatch<React.SetStateAction<JobApplicationFormData>>;
  language: Language;
}

const MilitaryService = ({
  form,
  formData,
  setFormData,
  language,
}: MilitaryServiceProps) => {
  const { t } = useTranslation(language);
  const [isVeteran, setIsVeteran] = useState(
    formData.militaryService?.veteran || "no"
  );

  useEffect(() => {
    const currentVeteranStatus = form.getFieldValue("veteran");
    setIsVeteran(currentVeteranStatus);
  }, [form]);

  const handleChange = (
    _changed: unknown,
    allValues: JobApplicationFormData["militaryService"]
  ) => {
    setFormData((prev) => ({
      ...prev,
      militaryService: allValues,
    }));
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={formData.militaryService || { veteran: "no", records: [] }}
      onValuesChange={handleChange}
    >
      <Form.Item
        label={t("militaryService.veteranLabel")}
        name="veteran"
        rules={[
          { required: true, message: t("militaryService.veteranRequired") },
        ]}
      >
        <Radio.Group
          onChange={(e) => {
            const value = e.target.value;
            setIsVeteran(value);
            if (value === "yes") {
              form.setFieldsValue({ records: [{}] }); // Ensure only one record exists
            } else {
              form.setFieldsValue({ records: [] }); // Clear records if "No"
            }
          }}
        >
          <Radio value="yes">{t("militaryService.yes")}</Radio>
          <Radio value="no">{t("militaryService.no")}</Radio>
        </Radio.Group>
      </Form.Item>

      {isVeteran === "yes" && (
        <Form.List name="records">
          {(fields) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  style={{
                    border: "1px solid #ddd",
                    padding: "16px",
                    marginBottom: "16px",
                    borderRadius: "5px",
                  }}
                >
                  <Form.Item
                    {...restField}
                    label={t("militaryService.branch.label")}
                    name={[name, "branch"]}
                    rules={[
                      {
                        required: true,
                        message: t("militaryService.branch.required"),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t("militaryService.branch.placeholder")}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label={t("militaryService.servicePeriod.label")}
                    name={[name, "servicePeriod"]}
                    rules={[
                      {
                        required: true,
                        message: t("militaryService.servicePeriod.required"),
                      },
                    ]}
                    // Store a [string, string] pair instead of raw Day.js instances - same
                    // fix already applied elsewhere (Policy DOB, employment eligibility
                    // dates, previous employment duration).
                    getValueFromEvent={(
                      dates: [Dayjs | null, Dayjs | null] | null
                    ) =>
                      dates
                        ? dates.map((d) =>
                            d ? d.format(SERVICE_PERIOD_FORMAT) : null
                          )
                        : null
                    }
                    getValueProps={(
                      value?: [string | null, string | null] | null
                    ) => ({
                      value: value
                        ? value.map((v) =>
                            v ? dayjs(v, SERVICE_PERIOD_FORMAT, true) : null
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
                    label={t("militaryService.rank.label")}
                    name={[name, "rank"]}
                    rules={[
                      {
                        required: true,
                        message: t("militaryService.rank.required"),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t("militaryService.rank.placeholder")}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label={t("militaryService.dischargeType.label")}
                    name={[name, "dischargeType"]}
                    rules={[
                      {
                        required: true,
                        message: t("militaryService.dischargeType.required"),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t(
                        "militaryService.dischargeType.placeholder"
                      )}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label={t("militaryService.dischargeExplanation.label")}
                    name={[name, "dischargeExplanation"]}
                    dependencies={["dischargeType"]}
                    rules={[
                      ({ getFieldValue }) => ({
                        required:
                          getFieldValue([
                            "records",
                            name,
                            "dischargeType",
                          ])?.toLowerCase() !== "honorable",
                        message: t(
                          "militaryService.dischargeExplanation.required"
                        ),
                      }),
                    ]}
                  >
                    <Input.TextArea
                      placeholder={t(
                        "militaryService.dischargeExplanation.placeholder"
                      )}
                      rows={3}
                    />
                  </Form.Item>
                </div>
              ))}
            </>
          )}
        </Form.List>
      )}
    </Form>
  );
};

export default MilitaryService;
