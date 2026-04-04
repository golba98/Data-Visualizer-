# Formal Proof: Two Sets Cover All Dates 01-31

## Definitions

Let

- \(A = \{0,1,2,3,4,5\}\)
- \(B = \{0,1,2,6,7,8\}\)

Define \(B^*\) by allowing the symbol `6` to be rotated and read as `9`:

\[
B^* = \{0,1,2,6,7,8,9\}.
\]

A two-digit date \(xy\) is **constructible** when there exists an assignment of blocks to positions such that

\[
(x,y) \in (A \times B^*) \cup (B^* \times A).
\]

Interpretation: one block contributes the tens digit and the other the units digit; the blocks may be swapped.

## Claim

Every date from 01 to 31 is constructible.

## Proof by Cases

### Case 1: 01-09

Tens digit is \(0\), and \(0 \in A\) and \(0 \in B^*\).
Units are in \(\{1,2,3,4,5,6,7,8,9\}\).

- \(1,2,3,4,5 \in A\)
- \(6,7,8 \in B^*\)
- \(9 \in B^*\) via rotated 6

So each date 01-09 is realizable via one of the two product sets.

### Case 2: 10-19

Tens digit is \(1\), with \(1 \in A\) and \(1 \in B^*\).
Units are \(0\) through \(9\), all covered between \(A\) and \(B^*\) (with 9 by rotation).
Hence every date 10-19 is in \((A \times B^*) \cup (B^* \times A)\).

### Case 3: 20-29

Tens digit is \(2\), with \(2 \in A\) and \(2 \in B^*\).
Units are again \(0\) through \(9\), covered as above.
Therefore every date 20-29 is constructible.

### Case 4: 30-31

For 30 and 31, tens digit is \(3\) and \(3 \in A\).
Units are \(0\) and \(1\), both elements of \(B^*\).
Thus 30 and 31 are constructible by taking tens from \(A\) and units from \(B^*\).

## Conclusion

All four disjoint ranges (01-09, 10-19, 20-29, 30-31) are constructible.
Therefore every date from 01 to 31 lies in

\[
(A \times B^*) \cup (B^* \times A),
\]

so the two-set construction is complete. QED.
