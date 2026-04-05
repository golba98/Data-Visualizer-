export type ProofCaseId = "01-09" | "10-19" | "20-29" | "30-31";

export interface ProofCase {
  id: ProofCaseId;
  rangeLabel: string;
  notation: string;
  summary: string;
  examples: string[];
}

export const PROOF_CASES: ProofCase[] = [
  {
    id: "01-09",
    rangeLabel: "01-09",
    notation: "0 in A and B*; units 1..5 in A and 6..9 in B* (9 via rotated 6)",
    summary:
      "Use a zero on one block and any required unit on the other. Digits 1-5 come from A, 6-8 from B*, and 9 by rotating the 6 face.",
    examples: ["01", "05", "08", "09"],
  },
  {
    id: "10-19",
    rangeLabel: "10-19",
    notation: "1 in A and B*; units 0..5 in A and 6..9 in B*",
    summary:
      "The tens digit 1 is available on either block, so we can orient blocks to place 1 on the left and any valid unit on the right.",
    examples: ["10", "14", "17", "19"],
  },
  {
    id: "20-29",
    rangeLabel: "20-29",
    notation: "2 in A and B*; units handled exactly as in 10-19",
    summary:
      "Same argument as the teens, replacing the tens digit with 2. Rotation of 6 gives 29 when needed.",
    examples: ["20", "23", "26", "29"],
  },
  {
    id: "30-31",
    rangeLabel: "30-31",
    notation: "3 appears in A; 0 and 1 appear in B*",
    summary:
      "Only two days are needed in this final range. Place 3 from A in the tens position and 0 or 1 from B* in the units position.",
    examples: ["30", "31"],
  },
];

export const getProofCase = (day: number): ProofCaseId => {
  if (day >= 1 && day <= 9) return "01-09";
  if (day >= 10 && day <= 19) return "10-19";
  if (day >= 20 && day <= 29) return "20-29";
  return "30-31";
};

export const getCaseExplanation = (caseId: ProofCaseId): string => {
  const found = PROOF_CASES.find((entry) => entry.id === caseId);
  return found?.summary ?? "";
};
