import { formatDate } from "../utils/formatDate";

export const ALL_DATES = Array.from({ length: 31 }, (_, index) => index + 1);

export interface DateEntry {
  day: number;
  label: string;
}

export const DATE_ENTRIES: DateEntry[] = ALL_DATES.map((day) => ({
  day,
  label: formatDate(day)
}));
