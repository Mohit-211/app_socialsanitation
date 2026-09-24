import type { AxiosError } from "axios";
import { apiClient } from "./client";

export interface StateOption {
  id: number;
  name: string;
  country_id: number;
}

export interface CityOption {
  id: number;
  name: string;
}

interface StateResponse {
  success: boolean;
  data: {
    id: number;
    name: string;
    all_city: CityOption[];
  };
}

// `/city/:id` looks up a single city; `/state/:id` is what lists a state's cities.
export const getStateCities = async (stateId: number) => {
  const { data } = await apiClient.get<StateResponse>(`/state/${stateId}`);
  return data.data?.all_city ?? [];
};

interface CountryResponse {
  success: boolean;
  data: {
    id: number;
    name: string;
    all_state: StateOption[];
  };
}

export const getCountryStates = async (countryId: number) => {
  // TEMP debug logging - remove once the country API is confirmed working.
  const url = `/country/${String(countryId)}`;
  try {
    console.log("Country API Request:", {
      url,
      countryId,
      baseURL: apiClient.defaults.baseURL,
    });

    const { data } = await apiClient.get<CountryResponse>(url);

    console.log("Country API Response:", data);
    return data.data?.all_state ?? [];
  } catch (error: unknown) {
    const err = error as AxiosError;
    console.error("Country API Error:", {
      status: err?.response?.status,
      data: err?.response?.data,
      headers: err?.response?.headers,
      url: err?.config?.url,
      baseURL: err?.config?.baseURL,
      requestHeaders: err?.config?.headers,
    });
    throw error;
  }
};
