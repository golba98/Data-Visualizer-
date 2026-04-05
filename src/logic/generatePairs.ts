import { SET_A, SET_B_STAR, ROTATABLE_FACE, ROTATED_DIGIT } from "../data/digitSets";
import { ALL_DATES } from "../data/dates";
import { formatDate } from "../utils/formatDate";

export type SourceSet = "A" | "B*";
export type PairFamily = "A×B*" | "B*×A";

/**
 * Represents the origin of a single digit in a date display.
 * Tracks which set provided the digit and whether rotation was used.
 */
export interface DigitOrigin {
  /** The digit shown to the user (0-9) */
  digit: number;
  /** Which digit set provided this digit */
  sourceSet: SourceSet;
  /** The physical face on the block (6 when rotated to show 9) */
  faceDigit: number;
  /** True if this digit uses the 6→9 rotation */
  rotated: boolean;
}

/**
 * Represents one valid way to construct a date using the two digit sets.
 * Ordered pairs matter because left/right position determines tens/units place.
 */
export interface OrderedPairMapping {
  /** The day number (1-31) */
  day: number;
  /** Zero-padded string representation (e.g., "01", "29") */
  formattedDay: string;
  /** Which ordered pair family this belongs to */
  pairFamily: PairFamily;
  /** Origin of the left (tens) digit */
  left: DigitOrigin;
  /** Origin of the right (units) digit */
  right: DigitOrigin;
  /** True if either digit uses the 6→9 rotation */
  usesRotation: boolean;
  /** Human-readable explanation of this mapping */
  explanation: string;
}

/**
 * Check if a digit exists in Set A
 */
const inA = (digit: number): boolean => SET_A.includes(digit as (typeof SET_A)[number]);

/**
 * Check if a digit exists in Set B* (B with rotation)
 */
const inBStar = (digit: number): boolean =>
  SET_B_STAR.includes(digit as (typeof SET_B_STAR)[number]);

/**
 * Create a DigitOrigin object for a digit from a specific set.
 * Automatically handles the 6→9 rotation for Set B*.
 */
const toOrigin = (digit: number, sourceSet: SourceSet): DigitOrigin => {
  const rotated = sourceSet === "B*" && digit === ROTATED_DIGIT;

  return {
    digit,
    sourceSet,
    faceDigit: rotated ? ROTATABLE_FACE : digit,
    rotated,
  };
};

/**
 * Build a human-readable explanation for an ordered pair mapping
 */
const buildExplanation = (
  pairFamily: PairFamily,
  left: DigitOrigin,
  right: DigitOrigin
): string => {
  const rotationNote = left.rotated || right.rotated ? " using rotated 6 to show 9" : "";

  return `${pairFamily}: left digit from ${left.sourceSet}, right digit from ${right.sourceSet}${rotationNote}.`;
};

/**
 * Generate all valid ordered pair mappings for a specific day.
 * Returns an array of all possible ways to construct the date using Sets A and B*.
 *
 * @param day - The day number (1-31)
 * @returns Array of valid mappings, or empty array if day is invalid
 *
 * @example
 * ```ts
 * const mappings = generateMappingsForDay(29);
 * // Returns mappings for "29" using "B*×A" pattern (2 from B*, 9 from rotated 6 in B*)
 * ```
 */
export const generateMappingsForDay = (day: number): OrderedPairMapping[] => {
  const leftDigit = Math.floor(day / 10);
  const rightDigit = day % 10;
  const mappings: OrderedPairMapping[] = [];

  if (inA(leftDigit) && inBStar(rightDigit)) {
    const left = toOrigin(leftDigit, "A");
    const right = toOrigin(rightDigit, "B*");

    mappings.push({
      day,
      formattedDay: formatDate(day),
      pairFamily: "A×B*",
      left,
      right,
      usesRotation: left.rotated || right.rotated,
      explanation: buildExplanation("A×B*", left, right),
    });
  }

  if (inBStar(leftDigit) && inA(rightDigit)) {
    const left = toOrigin(leftDigit, "B*");
    const right = toOrigin(rightDigit, "A");

    mappings.push({
      day,
      formattedDay: formatDate(day),
      pairFamily: "B*×A",
      left,
      right,
      usesRotation: left.rotated || right.rotated,
      explanation: buildExplanation("B*×A", left, right),
    });
  }

  return mappings;
};

export const generateOrderedPairs = (days: number[] = ALL_DATES): OrderedPairMapping[] => {
  return days.flatMap((day) => generateMappingsForDay(day));
};
