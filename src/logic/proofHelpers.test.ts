import { describe, expect, it } from "vitest";
import { getCaseExplanation, getProofCase, PROOF_CASES } from "./proofHelpers";

describe("proof helper boundaries", () => {
  it("assigns ranges correctly", () => {
    expect(getProofCase(9)).toBe("01-09");
    expect(getProofCase(10)).toBe("10-19");
    expect(getProofCase(19)).toBe("10-19");
    expect(getProofCase(20)).toBe("20-29");
    expect(getProofCase(29)).toBe("20-29");
    expect(getProofCase(30)).toBe("30-31");
    expect(getProofCase(31)).toBe("30-31");
  });

  it("returns known explanation strings", () => {
    for (const proofCase of PROOF_CASES) {
      expect(getCaseExplanation(proofCase.id).length).toBeGreaterThan(0);
    }
  });
});
