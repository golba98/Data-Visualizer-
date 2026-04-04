export const SET_A = [0, 1, 2, 3, 4, 5] as const;
export const SET_B = [0, 1, 2, 6, 7, 8] as const;

export const ROTATABLE_FACE = 6 as const;
export const ROTATED_DIGIT = 9 as const;

export const SET_B_STAR = [0, 1, 2, 6, 7, 8, 9] as const;

export type SetName = "A" | "B" | "B*";

export const SET_LABELS: Record<SetName, string> = {
  A: "{0, 1, 2, 3, 4, 5}",
  B: "{0, 1, 2, 6, 7, 8}",
  "B*": "{0, 1, 2, 6, 7, 8, 9}"
};
