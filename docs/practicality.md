# Practicality Notes

The construction is useful because it mirrors a real-world display constraint: two physical blocks must show a two-digit day value.

## Why this arrangement is practical

A month display needs 31 outcomes but has very limited symbol slots. Using

- Block A: `0 1 2 3 4 5`
- Block B: `0 1 2 6 7 8`

is enough when we permit `6` to serve as `9` after rotation.

## Why swapping matters

If one block were fixed as left-only and the other right-only, coverage would be much weaker. Allowing either block to occupy either position corresponds exactly to the union

`(A × B*) ∪ (B* × A)`.

That swap is what turns two partial sets into complete date coverage.

## Why duplication matters

Digits `0`, `1`, and `2` appear on both blocks. This overlap is essential for tens digits and for flexibility when units demand special digits. Without duplication, many valid dates would disappear.

## Why 6/9 reuse is efficient

A distinct `9` face would consume one of six face slots on a cube. Reusing `6` as `9` is a compact encoding trick that increases expressiveness at zero face-cost.

## Translation from proof to object

The formal proof guarantees constructibility. The physical interpretation shows that the guarantee can be realized with practical hardware choices (tiles, cubes, or flip blocks) without adding complexity.
