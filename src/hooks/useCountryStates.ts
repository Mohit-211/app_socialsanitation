import { useEffect, useState } from "react";
import {
  getCountryStates,
  getStateCities,
  type CityOption,
  type StateOption,
} from "@/api/location";
import { countryOptions } from "@/config/personalInfoFields";

// Caches are module-level so switching between Personal Information and Policy
// doesn't refetch the same country's states or state's cities.
function useCachedOptions<T>(
  id: number | null | undefined,
  cache: Map<number, T[]>,
  fetcher: (id: number) => Promise<T[]>
) {
  // Bumped when a request settles so the component re-reads the cache.
  const [, setSettled] = useState(0);
  const [failed, setFailed] = useState<number | null>(null);

  useEffect(() => {
    if (!id || cache.has(id)) return;

    let cancelled = false;
    fetcher(id)
      .then((result) => {
        cache.set(id, result);
        if (!cancelled) setSettled((n) => n + 1);
      })
      .catch(() => {
        if (!cancelled) setFailed(id);
      });

    return () => {
      cancelled = true;
    };
  }, [id, cache, fetcher]);

  const options = id ? cache.get(id) ?? [] : [];
  const loading = !!id && !cache.has(id) && failed !== id;

  return { options, loading };
}

const statesCache = new Map<number, StateOption[]>();
const citiesCache = new Map<number, CityOption[]>();

export function useCountryStates(countryId?: number | null) {
  const { options, loading } = useCachedOptions(
    countryId,
    statesCache,
    getCountryStates
  );
  return { states: options, loading };
}

export function useStateCities(stateId?: number | null) {
  const { options, loading } = useCachedOptions(
    stateId,
    citiesCache,
    getStateCities
  );
  return { cities: options, loading };
}

/**
 * The form stores country/state/city by name, but the API is keyed by id, so
 * look the ids up from the loaded options to fetch the dependent lists.
 */
export function useLocationOptions(
  countryName?: string | null,
  stateName?: string | null
) {
  const countryId = countryOptions.find((c) => c.name === countryName)?.id;
  const { states, loading: statesLoading } = useCountryStates(countryId);
  const stateId = states.find((s) => s.name === stateName)?.id;
  const { cities, loading: citiesLoading } = useStateCities(stateId);
  return { states, statesLoading, cities, citiesLoading };
}

/** Select options whose value is the name, so the name is what gets saved. */
export const toNameOptions = (list: { name: string }[]) =>
  list.map((o) => ({ value: o.name, label: o.name }));
