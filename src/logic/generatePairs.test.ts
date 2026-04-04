import { describe, expect, it } from "vitest";
import { generateMappingsForDay, generateOrderedPairs } from "./generatePairs";

describe("generateMappingsForDay", () => {
  it("returns both families when both are valid", () => {
    const mappings = generateMappingsForDay(11);
    const families = mappings.map((entry) => entry.pairFamily).sort();
    expect(families).toEqual(["A×B*", "B*×A"]);
  });

  it("includes rotation metadata for 09", () => {
    const mappings = generateMappingsForDay(9);
    expect(mappings.some((entry) => entry.usesRotation)).toBe(true);
  });
});

describe("generateOrderedPairs", () => {
  it("covers all requested dates", () => {
    const pairs = generateOrderedPairs();
    const coveredDates = new Set(pairs.map((entry) => entry.day));

    for (let day = 1; day <= 31; day += 1) {
      expect(coveredDates.has(day)).toBe(true);
    }
  });

  it("never emits an impossible pair family", () => {
    const pairs = generateOrderedPairs([31]);
    expect(pairs.every((entry) => entry.pairFamily === "A×B*" || entry.pairFamily === "B*×A")).toBe(true);
  });
});
