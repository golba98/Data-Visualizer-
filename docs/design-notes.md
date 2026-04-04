# Design Notes

## Visual direction

The UI uses a dark premium palette with near-black backgrounds, slate/graphite surfaces, and cool blue-violet accents. The goal is a technical product aesthetic rather than classroom styling.

## Why proof is split across files

The README gives a concise, fast-to-scan proof summary so visitors understand the result quickly. The full formal argument is moved to `docs/proof.md` to keep the landing page readable while preserving rigor.

## Interaction choices

- Date grid supports hover and click states.
- Selected date opens a combination viewer with all valid mappings.
- Rotation usage (`6 -> 9`) is always surfaced in labels and badges.
- Proof section is chunked into four case cards that align with the formal partition.

These decisions keep the logic inspectable without overloading a single panel.

## Motion and restraint

Framer Motion is used only for subtle reveal and transition behavior. Motion supports hierarchy and readability but does not dominate interaction.

## Accessibility considerations

- High-contrast text and controls on dark backgrounds.
- Distinctions are not color-only; labels and badges repeat semantics.
- Buttons are keyboard-focusable and stateful.
- Type sizes and spacing are tuned for desktop and mobile.
