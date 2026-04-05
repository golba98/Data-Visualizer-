import { useEffect, useState, useCallback } from "react";
import type { FilterType } from "../components/FilterControls";

interface URLState {
  date: number;
  filter: FilterType;
}

/**
 * Custom hook to manage application state in URL parameters.
 * Enables shareable URLs and browser back/forward navigation.
 *
 * @param initialDate - Default date if not in URL
 * @param initialFilter - Default filter if not in URL
 * @returns Current state and update function
 */
export function useURLState(
  initialDate: number,
  initialFilter: FilterType
): [URLState, (updates: Partial<URLState>) => void] {
  const [state, setState] = useState<URLState>(() => {
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get("date");
    const filterParam = params.get("filter");

    return {
      date: dateParam ? parseInt(dateParam, 10) : initialDate,
      filter: (filterParam as FilterType) || initialFilter,
    };
  });

  const updateURL = useCallback(
    (newState: URLState) => {
      const params = new URLSearchParams();
      if (newState.date !== initialDate) {
        params.set("date", newState.date.toString());
      }
      if (newState.filter !== "all") {
        params.set("filter", newState.filter);
      }

      const newURL = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

      window.history.pushState({}, "", newURL);
    },
    [initialDate]
  );

  const updateState = useCallback(
    (updates: Partial<URLState>) => {
      setState((prev) => {
        const newState = { ...prev, ...updates };
        updateURL(newState);
        return newState;
      });
    },
    [updateURL]
  );

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const dateParam = params.get("date");
      const filterParam = params.get("filter");

      setState({
        date: dateParam ? parseInt(dateParam, 10) : initialDate,
        filter: (filterParam as FilterType) || initialFilter,
      });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [initialDate, initialFilter]);

  return [state, updateState];
}
