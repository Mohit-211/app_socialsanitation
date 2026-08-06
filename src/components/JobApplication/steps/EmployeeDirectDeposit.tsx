import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Button, Form, Input, Radio, DatePicker, Space, Table } from "antd";
import type { FormInstance } from "antd/es/form";
import type { ColumnsType } from "antd/es/table";
import dayjs, { type Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { PlusOutlined } from "@ant-design/icons";
import SignatureInput from "@/components/common/SignatureInput";
import { useTranslation } from "@/translation/useTranslation";
import type { Language } from "@/translation/types";
import type { JobApplicationFormData } from "@/types/jobApplication";

dayjs.extend(customParseFormat);

const DATE_STORAGE_FORMAT = "MM-DD-YYYY"; // internal storage, consistent with the rest of the app
const DATE_DISPLAY_FORMAT = "DD / MM / YYYY"; // kept exactly as the original UI showed it

interface EmployeeDirectDepositProps {
  form: FormInstance;
  formData: JobApplicationFormData;
  setFormData: Dispatch<SetStateAction<JobApplicationFormData>>;
  language: Language;
}

interface BankRow {
  key: string | number;
}

const EmployeeDirectDeposit = ({
  form,
  formData,
  setFormData,
  language,
}: EmployeeDirectDepositProps) => {
  const { t, tList } = useTranslation(language);

  useEffect(() => {
    if (
      !formData.directDeposit?.banks ||
      formData.directDeposit.banks.length === 0
    ) {
      setFormData((prev) => ({
        ...prev,
        directDeposit: { ...prev.directDeposit, banks: [{}] },
      }));
    }
    form.setFieldsValue({
      date: formData.directDeposit?.date
        ? dayjs(formData.directDeposit.date, DATE_STORAGE_FORMAT, true)
        : null,
      banks: formData.directDeposit?.banks || [{}],
      signature: formData.directDeposit?.signature || null,
    });
  }, [formData, setFormData, form]);

  const handleChange = (
    _changed: unknown,
    allValues: JobApplicationFormData["directDeposit"]
  ) => {
    setFormData((prev) => ({
      ...prev,
      directDeposit: { ...allValues },
    }));
  };

  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [signatureImageURL, setSignatureImageURL] = useState<string | null>(
    formData.directDeposit?.signature ?? null
  );

  const handleSaveSignature = (signatureData: string) => {
    setSignatureImageURL(signatureData);
    form.setFieldsValue({ signature: signatureData });
    setFormData((prev) => ({
      ...prev,
      directDeposit: { ...prev.directDeposit, signature: signatureData },
    }));
    setIsSignatureModalOpen(false);
  };

  const handleClearSignature = () => {
    setSignatureImageURL(null);
    form.setFieldsValue({ signature: null });
    setFormData((prev) => ({
      ...prev,
      directDeposit: { ...prev.directDeposit, signature: null },
    }));
  };

  const items = tList("directDeposit.items");

  return (
    <div>
      <ul>
        <p>
          {t("directDeposit.introBeforeName")}
          &nbsp;
          <span>
            <Form.Item
              name="employee_name"
              style={{ display: "inline-block", margin: "0" }}
              rules={[
                {
                  required: true,
                  message: t("directDeposit.employeeNameRequired"),
                },
              ]}
            >
              <Input
                placeholder={t("directDeposit.employeeNamePlaceholder")}
                style={{
                  border: "1px solid black",
                  borderTop: "0",
                  borderLeft: "0",
                  borderRight: "0",
                  background: "transparent",
                  padding: "0",
                  width: "auto",
                  borderRadius: "0",
                }}
              />
            </Form.Item>
          </span>
          &nbsp;{t("directDeposit.introAfterName")}
        </p>
        <li>
          {t("directDeposit.item1Pre")}{" "}
          <b>{t("directDeposit.companyLegalName")}</b>{" "}
          {t("directDeposit.item1Post")}
        </li>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <Form
        form={form}
        layout="vertical"
        initialValues={formData.directDeposit}
        onValuesChange={handleChange}
      >
        <Form.Item
          label={t("directDeposit.signatureLabel")}
          name="signature"
          rules={[
            { required: true, message: t("directDeposit.signatureRequired") },
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
          label={t("directDeposit.dateLabel")}
          name="date"
          rules={[{ required: true, message: t("directDeposit.dateRequired") }]}
          getValueFromEvent={(date: Dayjs | null) =>
            date ? date.format(DATE_STORAGE_FORMAT) : null
          }
          getValueProps={(value?: string | null) => ({
            value: value ? dayjs(value, DATE_STORAGE_FORMAT, true) : null,
          })}
        >
          <DatePicker format={DATE_DISPLAY_FORMAT} />
        </Form.Item>

        <Form.List name="banks">
          {(fields, { add }) => {
            const columns: ColumnsType<BankRow> = [
              {
                title: t("directDeposit.bank.bankName.columnTitle"),
                dataIndex: "bankInfo",
                render: (_, __, index) => (
                  <div>
                    <label>
                      <span style={{ color: "red" }}>*</span>{" "}
                      {t("directDeposit.bank.bankName.label")}
                    </label>
                    <Form.Item
                      name={[fields[index].name, "bankInfo"]}
                      rules={[
                        {
                          required: true,
                          message: t("directDeposit.bank.bankName.required"),
                        },
                      ]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        placeholder={t(
                          "directDeposit.bank.bankName.placeholder"
                        )}
                      />
                    </Form.Item>
                  </div>
                ),
              },
              {
                title: t("directDeposit.bank.accountType.columnTitle"),
                dataIndex: "accountType",
                render: (_, __, index) => (
                  <div>
                    <label>
                      <span style={{ color: "red" }}>*</span>{" "}
                      {t("directDeposit.bank.accountType.label")}
                    </label>
                    <Form.Item
                      name={[fields[index].name, "accountType"]}
                      rules={[
                        {
                          required: true,
                          message: t("directDeposit.bank.accountType.required"),
                        },
                      ]}
                      style={{ marginBottom: 0 }}
                    >
                      <Radio.Group>
                        <Radio value="Checking">
                          {t("directDeposit.bank.accountType.checking")}
                        </Radio>
                        <Radio value="Savings">
                          {t("directDeposit.bank.accountType.savings")}
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                ),
              },
              {
                title: t("directDeposit.bank.routingNumber.columnTitle"),
                dataIndex: "routingNumber",
                render: (_, __, index) => (
                  <div>
                    <label>
                      <span style={{ color: "red" }}>*</span>{" "}
                      {t("directDeposit.bank.routingNumber.label")}
                    </label>
                    <Form.Item
                      name={[fields[index].name, "routingNumber"]}
                      rules={[
                        {
                          required: true,
                          message: t(
                            "directDeposit.bank.routingNumber.required"
                          ),
                        },
                      ]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        placeholder={t(
                          "directDeposit.bank.routingNumber.placeholder"
                        )}
                      />
                    </Form.Item>
                  </div>
                ),
              },
              {
                title: t("directDeposit.bank.accountNumber.columnTitle"),
                dataIndex: "accountNumber",
                render: (_, __, index) => (
                  <div>
                    <label>
                      <span style={{ color: "red" }}>*</span>{" "}
                      {t("directDeposit.bank.accountNumber.label")}
                    </label>
                    <Form.Item
                      name={[fields[index].name, "accountNumber"]}
                      rules={[
                        {
                          required: true,
                          message: t(
                            "directDeposit.bank.accountNumber.required"
                          ),
                        },
                      ]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        placeholder={t(
                          "directDeposit.bank.accountNumber.placeholder"
                        )}
                      />
                    </Form.Item>
                  </div>
                ),
              },
              {
                title: t("directDeposit.bank.amount.columnTitle"),
                dataIndex: "amount",
                render: (_, __, index) => (
                  <div>
                    <label>
                      <span style={{ color: "red" }}>*</span>{" "}
                      {t("directDeposit.bank.amount.label")}
                    </label>
                    <Form.Item
                      name={[fields[index].name, "amount"]}
                      rules={[
                        {
                          required: true,
                          message: t("directDeposit.bank.amount.required"),
                        },
                      ]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        placeholder={t("directDeposit.bank.amount.placeholder")}
                      />
                    </Form.Item>
                  </div>
                ),
              },
              {
                title: t("directDeposit.bank.percentage.columnTitle"),
                dataIndex: "percentage",
                render: (_, __, index) => (
                  <div>
                    <label>
                      <span style={{ color: "red" }}>*</span>{" "}
                      {t("directDeposit.bank.percentage.label")}
                    </label>
                    <Form.Item
                      name={[fields[index].name, "percentage"]}
                      rules={[
                        {
                          required: true,
                          message: t("directDeposit.bank.percentage.required"),
                        },
                      ]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        placeholder={t(
                          "directDeposit.bank.percentage.placeholder"
                        )}
                      />
                    </Form.Item>
                  </div>
                ),
              },
            ];

            return (
              <>
                <Table<BankRow>
                  columns={columns}
                  dataSource={fields.map((field, i) => ({
                    key: field.key ?? i,
                  }))}
                  pagination={false}
                  bordered
                  scroll={{ x: "max-content" }}
                />
                <Space style={{ marginTop: 16 }}>
                  <Button
                    type="dashed"
                    onClick={() => add({})}
                    icon={<PlusOutlined />}
                  >
                    {t("directDeposit.addRowButton")}
                  </Button>
                </Space>
              </>
            );
          }}
        </Form.List>
      </Form>
    </div>
  );
};

export default EmployeeDirectDeposit;
