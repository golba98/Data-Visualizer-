import { SET_A, SET_B_STAR, ROTATABLE_FACE, ROTATED_DIGIT } from "../data/digitSets";
import { ALL_DATES } from "../data/dates";
import { formatDate } from "../utils/formatDate";

export type SourceSet = "A" | "B*";
export type PairFamily = "A×B*" | "B*×A";

export interface DigitOrigin {
  digit: number;
  sourceSet: SourceSet;
  faceDigit: number;
  rotated: boolean;
}

export interface OrderedPairMapping {
  day: number;
  formattedDay: string;
  pairFamily: PairFamily;
  left: DigitOrigin;
  right: DigitOrigin;
  usesRotation: boolean;
  explanation: string;
}

const inA = (digit: number): boolean => SET_A.includes(digit as (typeof SET_A)[number]);
const inBStar = (digit: number): boolean => SET_B_STAR.includes(digit as (typeof SET_B_STAR)[number]);

const toOrigin = (digit: number, sourceSet: SourceSet): DigitOrigin => {
  const rotated = sourceSet === "B*" && digit === ROTATED_DIGIT;

  return {
    digit,
    sourceSet,
    faceDigit: rotated ? ROTATABLE_FACE : digit,
    rotated
  };
};

const buildExplanation = (pairFamily: PairFamily, left: DigitOrigin, right: DigitOrigin): string => {
  const rotationNote = left.rotated || right.rotated ? " using rotated 6 to show 9" : "";

  return `${pairFamily}: left digit from ${left.sourceSet}, right digit from ${right.sourceSet}${rotationNote}.`;
};

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
      explanation: buildExplanation("A×B*", left, right)
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
      explanation: buildExplanation("B*×A", left, right)
    });
  }

  return mappings;
};

export const generateOrderedPairs = (days: number[] = ALL_DATES): OrderedPairMapping[] => {
  return days.flatMap((day) => generateMappingsForDay(day));
};
