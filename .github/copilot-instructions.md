# Copilot Instructions: Two Sets, All Dates

## Project Overview

An interactive math visualization proving that two digit sets can generate every date from 01 to 31. This project demonstrates the mathematical proof that using sets **A = {0, 1, 2, 3, 4, 5}** and **B = {0, 1, 2, 6, 7, 8}** (where 6 can be rotated to act as 9), you can construct all calendar dates.

The proof models a real physical display where one block supplies the tens digit and another supplies the units digit, with the ability to swap block roles (left/right) to expand coverage.

## Build, Test, and Lint Commands

```bash
# Development
npm run dev          # Start Vite dev server

# Building
npm run build        # Type check with tsc --noEmit, then build with Vite

# Testing
npm run test         # Run all tests once with Vitest
npm run test:watch   # Run tests in watch mode

# Preview
npm run preview      # Preview production build locally
```

### Running a Single Test File

```bash
npx vitest run src/logic/canMakeDate.test.ts
npx vitest run src/logic/generatePairs.test.ts
npx vitest run src/logic/proofHelpers.test.ts
```

## Architecture

### Core Logic Structure

The application is built around a three-layer architecture:

1. **Data Layer** (`src/data/`)
   - `digitSets.ts`: Defines SET_A, SET_B, SET_B_STAR (B augmented with rotated 6→9)
   - `dates.ts`: Enumeration of all valid dates (01-31)

2. **Logic Layer** (`src/logic/`)
   - `generatePairs.ts`: Core algorithm that generates OrderedPairMapping objects for each date
   - `canMakeDate.ts`: Public API for checking if a date is constructible
   - `proofHelpers.ts`: Verification functions for the mathematical proof
   - Each module has corresponding `.test.ts` files

3. **Component Layer** (`src/components/`)
   - Visualization components for the interactive proof
   - Uses React + Framer Motion for animations
   - Modular components: DateGrid, DigitCube, CombinationViewer, ProofSection, etc.

### Key Data Flow

```
DATE_ENTRIES → getDateMappings(day) → generateMappingsForDay(day) → OrderedPairMapping[]
```

Each `OrderedPairMapping` contains:

- Which pair family it belongs to: "A×B\*" or "B\*×A" (order matters for display)
- DigitOrigin for left and right positions (digit, sourceSet, faceDigit, rotated flag)
- Whether rotation is used (6→9)
- Human-readable explanation

### Styling Architecture

- **Tailwind CSS** with custom design tokens
- Theme defined in `src/styles/theme.css` with CSS custom properties
- Extended Tailwind config in `tailwind.config.ts`:
  - Custom colors mapped to CSS variables (--bg, --surface, --accent, etc.)
  - Glassmorphism effects (--glass-light, --glass-medium, --glass-heavy)
  - Multi-layered elevation shadows (--shadow-sm through --shadow-2xl)
  - Colored glow effects (--glow-blue, --glow-violet, etc.)
- Custom fonts: Sora (display), Space Grotesk (body)

## Key Conventions

### The "6 rotates to 9" Rule

- Physical constant: `ROTATABLE_FACE = 6`, `ROTATED_DIGIT = 9`
- SET_B is the physical set: `{0, 1, 2, 6, 7, 8}`
- SET_B_STAR is the augmented set: `{0, 1, 2, 6, 7, 8, 9}` (used in logic)
- When constructing dates with 9, `DigitOrigin.rotated = true` and `faceDigit = 6`

### Ordered Pairs and Pair Families

The proof uses **ordered pairs** because position matters in date display:

- "A×B\*": SET_A supplies left (tens), SET_B_STAR supplies right (units)
- "B\*×A": SET_B_STAR supplies left (tens), SET_A supplies right (units)

A date may have multiple valid mappings (e.g., 01 can be made as both "A×B\*" and "B\*×A").

### Type Safety for Digit Sets

Digit sets use `as const` for literal types:

```typescript
export const SET_A = [0, 1, 2, 3, 4, 5] as const;
```

Type guards are used throughout:

```typescript
const inA = (digit: number): boolean => SET_A.includes(digit as (typeof SET_A)[number]);
```

### Component Organization

- One component per file in `src/components/`
- Components are organized by purpose: visualization (DateGrid, DigitCube), controls (FilterControls, AnimationControls), content sections (Hero, ProofSection)
- State management uses React hooks (useState, useMemo) at the App.tsx level
- Props are typed with TypeScript interfaces defined in the same file or imported from logic modules

### Test Organization

- Tests co-located with logic modules: `*.test.ts` files in `src/logic/`
- Vitest configured with globals enabled (`globals: true` in vitest.config.ts)
- Tests verify mathematical properties (e.g., "every date from 1-31 is constructible")
- No component tests; focus is on logic correctness

### Vite Base Path

Production builds use dynamic base path from GitHub repository name:

```typescript
base: mode === "production" && repoName ? `/${repoName}/` : "/";
```

This allows deployment to GitHub Pages at `/<repo-name>/`.

### Date Formatting

- Dates are 1-31 internally (number type)
- Displayed as zero-padded strings: "01", "02", ..., "31"
- `formatDate()` utility in `src/utils/formatDate.ts` handles conversion

### Animation Control

- Framer Motion animations can be toggled via `isAnimated` state
- Controlled by AnimationControls component
- When disabled, components render without motion properties for accessibility/performance
