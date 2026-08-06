import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Col, Form, Input, Row, Button } from "antd";
import type { FormInstance } from "antd/es/form";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "@/translation/useTranslation";
import type { Language } from "@/translation/types";
import type {
  JobApplicationFormData,
  ReferenceEntry,
} from "@/types/jobApplication";

const MIN_REFERENCES = 2;
const MAX_REFERENCES = 3;

const blankReference = (): ReferenceEntry => ({
  firstName: "",
  lastName: "",
  relationship: "",
  company: "",
  title: "",
  email: "",
  phone: "",
});

interface ReferencesProps {
  form: FormInstance;
  formData: JobApplicationFormData;
  setFormData: Dispatch<SetStateAction<JobApplicationFormData>>;
  language: Language;
}

const References = ({
  form,
  formData,
  setFormData,
  language,
}: ReferencesProps) => {
  const { t } = useTranslation(language);

  useEffect(() => {
    if (!formData.references || formData.references.length < MIN_REFERENCES) {
      const defaultReferences = Array.from(
        { length: MIN_REFERENCES },
        blankReference
      );
      setFormData((prev) => ({ ...prev, references: defaultReferences }));
      form.setFieldsValue({ references: defaultReferences });
    }
  }, [formData.references, setFormData, form]);

  const handleChange = (
    _: unknown,
    allValues: { references: ReferenceEntry[] }
  ) => {
    setFormData((prev) => ({ ...prev, references: allValues.references }));
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onValuesChange={handleChange}
      initialValues={{ references: formData.references }}
    >
      <Form.List name="references">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <div
                key={key}
                style={{
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "16px",
                  marginBottom: "16px",
                  position: "relative",
                }}
              >
                <h3>{t("references.heading", { index: String(index + 1) })}</h3>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      label={t("references.firstName.label")}
                      name={[name, "firstName"]}
                      rules={[
                        {
                          required: true,
                          message: t("references.firstName.required"),
                        },
                      ]}
                    >
                      <Input
                        placeholder={t("references.firstName.placeholder")}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      label={t("references.lastName.label")}
                      name={[name, "lastName"]}
                      rules={[
                        {
                          required: true,
                          message: t("references.lastName.required"),
                        },
                      ]}
                    >
                      <Input
                        placeholder={t("references.lastName.placeholder")}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  {...restField}
                  label={t("references.relationship.label")}
                  name={[name, "relationship"]}
                  rules={[
                    {
                      required: true,
                      message: t("references.relationship.required"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("references.relationship.placeholder")}
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={t("references.company.label")}
                  name={[name, "company"]}
                  rules={[
                    {
                      required: true,
                      message: t("references.company.required"),
                    },
                  ]}
                >
                  <Input placeholder={t("references.company.placeholder")} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={t("references.title.label")}
                  name={[name, "title"]}
                  rules={[
                    { required: true, message: t("references.title.required") },
                  ]}
                >
                  <Input placeholder={t("references.title.placeholder")} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={t("references.email.label")}
                  name={[name, "email"]}
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: t("references.email.required"),
                    },
                  ]}
                >
                  <Input placeholder={t("references.email.placeholder")} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={t("references.phone.label")}
                  name={[name, "phone"]}
                  rules={[
                    { required: true, message: t("references.phone.required") },
                    {
                      pattern: /^\d{10}$/,
                      message: t("references.phone.pattern"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("references.phone.placeholder")}
                    maxLength={10}
                    inputMode="numeric"
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      form.setFieldValue(["references", name, "phone"], value);
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
                {fields.length > MIN_REFERENCES && (
                  <Button
                    type="link"
                    icon={<MinusCircleOutlined />}
                    onClick={() => remove(name)}
                    danger
                  >
                    {t("references.removeButton")}
                  </Button>
                )}
              </div>
            ))}
            {fields.length < MAX_REFERENCES && (
              <Button
                type="dashed"
                onClick={() => add(blankReference())}
                icon={<PlusOutlined />}
              >
                {t("references.addButton")}
              </Button>
            )}
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default References;
