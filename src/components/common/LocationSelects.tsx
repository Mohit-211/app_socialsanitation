import { Col, Form, Select, type ColProps } from "antd";
import type { FormInstance, Rule } from "antd/es/form";
import { countryOptions } from "@/config/personalInfoFields";
import { toNameOptions, useLocationOptions } from "@/hooks/useCountryStates";
import { useTranslation } from "@/translation/useTranslation";
import type { Language } from "@/translation/types";

export type LocationKey = "country" | "state" | "city";
type NamePart = string | number;

interface LocationSelectsProps {
  form: FormInstance;
  language: Language;
  /** Field names; inside a Form.List these are the keys within the row. */
  names: Record<LocationKey, NamePart>;
  /** When rendered inside a Form.List: its absolute path and this row's index. */
  list?: { path: NamePart[]; index: number };
  labels: Record<LocationKey, string>;
  placeholders: Record<LocationKey, string>;
  /** Omit to make the three fields optional. */
  requiredMessages?: Record<LocationKey, string>;
  colProps?: ColProps;
  /** Extra Form.Item props, e.g. `restField` from Form.List. */
  itemProps?: Record<string, unknown>;
  /**
   * Called after a selection, with the dependent fields that were cleared
   * (a new country clears state and city, a new state clears city). Those
   * resets go through form.setFieldValue, which doesn't fire onValuesChange.
   */
  onChange?: (changed: Partial<Record<LocationKey, string | null>>) => void;
}

/** Country -> State -> City dropdowns; states and cities come from the API. */
const LocationSelects = ({
  form,
  language,
  names,
  list,
  labels,
  placeholders,
  requiredMessages,
  colProps = { xs: 24, sm: 12, md: 8 },
  itemProps,
  onChange,
}: LocationSelectsProps) => {
  const { t } = useTranslation(language);
  // Form.Item names inside a Form.List are relative to the list, so they carry
  // the row index; form.setFieldValue/useWatch need the full path.
  const itemName = (key: LocationKey) =>
    list ? [list.index, names[key]] : names[key];
  const absolute = (key: LocationKey) =>
    list ? [...list.path, list.index, names[key]] : [names[key]];

  const country = Form.useWatch(absolute("country"), form) as string | null;
  const state = Form.useWatch(absolute("state"), form) as string | null;
  const { states, statesLoading, cities, citiesLoading } = useLocationOptions(
    country,
    state
  );

  const handleSelect = (key: LocationKey, value: string) => {
    const changed: Partial<Record<LocationKey, string | null>> = {
      [key]: value,
    };
    if (key === "country") changed.state = null;
    if (key !== "city") changed.city = null;
    (["state", "city"] as const).forEach((k) => {
      if (k in changed && k !== key) form.setFieldValue(absolute(k), null);
    });
    onChange?.(changed);
  };

  const fields: {
    key: LocationKey;
    options: { name: string }[];
    loading?: boolean;
    emptyMessage?: string;
  }[] = [
    { key: "country", options: countryOptions },
    {
      key: "state",
      options: states,
      loading: statesLoading,
      emptyMessage: !country
        ? t("personalInfo.validation.selectCountryFirst")
        : undefined,
    },
    {
      key: "city",
      options: cities,
      loading: citiesLoading,
      emptyMessage: !state
        ? t("personalInfo.validation.selectStateFirst")
        : undefined,
    },
  ];

  return (
    <>
      {fields.map(({ key, options, loading, emptyMessage }) => {
        const rules: Rule[] = requiredMessages
          ? [{ required: true, message: requiredMessages[key] }]
          : [];
        return (
          <Col {...colProps} key={key}>
            <Form.Item
              {...itemProps}
              label={labels[key]}
              name={itemName(key)}
              rules={rules}
            >
              <Select
                placeholder={placeholders[key]}
                showSearch={{ optionFilterProp: "label" }}
                loading={loading}
                notFoundContent={emptyMessage}
                options={toNameOptions(options)}
                onChange={(value: string) => handleSelect(key, value)}
              />
            </Form.Item>
          </Col>
        );
      })}
    </>
  );
};

export default LocationSelects;
