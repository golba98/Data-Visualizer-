import { describe, expect, it } from "vitest";
import { canMakeDate, getDateMappings, parseDayInput } from "./canMakeDate";

describe("parseDayInput", () => {
  it("parses integer-like inputs", () => {
    expect(parseDayInput(7)).toBe(7);
    expect(parseDayInput("09")).toBe(9);
    expect(parseDayInput("31")).toBe(31);
  });

  it("rejects invalid inputs", () => {
    expect(parseDayInput(1.25)).toBeNull();
    expect(parseDayInput("1a")).toBeNull();
    expect(parseDayInput(" ")).toBeNull();
  });
});

describe("date constructibility", () => {
  it("constructs every date from 01 to 31", () => {
    for (let day = 1; day <= 31; day += 1) {
      expect(canMakeDate(day)).toBe(true);
      expect(getDateMappings(day).length).toBeGreaterThan(0);
    }
  });

  it("rejects out-of-range values", () => {
    expect(canMakeDate(0)).toBe(false);
    expect(canMakeDate(32)).toBe(false);
    expect(getDateMappings("00")).toHaveLength(0);
  });

  it("uses rotated 6 for dates containing 9", () => {
    const mappings = getDateMappings(29);
    expect(mappings.some((entry) => entry.usesRotation)).toBe(true);
    expect(mappings.some((entry) => entry.left.rotated || entry.right.rotated)).toBe(true);
  });
});
