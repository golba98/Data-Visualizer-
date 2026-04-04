import { generateMappingsForDay, type OrderedPairMapping } from "./generatePairs";

const parseDayInput = (input: number | string): number | null => {
  if (typeof input === "number") {
    return Number.isInteger(input) ? input : null;
  }

  const trimmed = input.trim();

  if (!/^\d+$/.test(trimmed)) {
    return null;
  }

  const parsed = Number.parseInt(trimmed, 10);
  return Number.isInteger(parsed) ? parsed : null;
};

export const getDateMappings = (input: number | string): OrderedPairMapping[] => {
  const parsed = parseDayInput(input);

  if (parsed === null || parsed < 1 || parsed > 31) {
    return [];
  }

  return generateMappingsForDay(parsed);
};

export const canMakeDate = (input: number | string): boolean => getDateMappings(input).length > 0;

export { parseDayInput };
