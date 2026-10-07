# Portfolio rebuild design provenance — 2026-10-07

## Authority

1. `math-by-design.html` — master design grammar and design authority.
2. Existing portfolio content/data — factual/content authority.
3. `fibonacci_hex_palettes.py` — offline candidate color relationship generator only.

## Exact references

- `math-by-design(1).html` SHA-256: `a735791160fe22962ac1cff8af9e482d069919ec1c4c18adfc7372b360c2b5db`
- `fibonacci_hex_palettes(1).py` SHA-256: `ba4e73da4db54e60bac1ca13e6093824619553d0a2bec249c4d2cf940cd8b91f`

## Palette helper verification

Command:

```sh
python fibonacci_hex_palettes.py --self-test
```

Result: **ALL PASS**.

Passed fixtures:
- ratio constants φ, τ, δ, ρ
- Binet F(5..12)
- exact Tribonacci Perron eigenvector check
- 3000 random HEX → wheel → HEX round-trips
- PCA/hull geometry fixtures
- HEX-list parser fixture
- six families × two directions + two Rauzy generation fixture

The supplied Python helper was not modified.

## Seed

Repository source of truth before redesign:

```css
--surface-structural-green: #5C7650;
--breaker-highlight: #A3B18A;
```

Primary semantic/action seed: **`#5C7650`**.

## Bounded generation command

```sh
python fibonacci_hex_palettes.py "#5C7650" \
  --families fibonacci tribonacci silver plastic julia binet \
  --direction both \
  --count 8 \
  --rauzy-spin 4 \
  --json docs/design/portfolio/redesign-20261007/palette-candidates.json \
  --html docs/design/portfolio/redesign-20261007/palette-candidates.html
```

Generated analysis stays under `docs/design/`; it is not deployed as portfolio content.

## Shared semantic color decision

The generator is not the design system. The bounded pass showed that the **inward Fibonacci/Binet family** preserves the current green identity while moving through restrained cool/warm neutrals; several outward families become saturated quickly and are therefore retained as analysis only.

Shared production core:

- action / authorial lineage: `#5C7650` — original seed, unchanged
- structural light / non-text rule: `#A3B18A` — existing lineage, retained for non-text use
- generated cool support: `#5F7276` — Fibonacci inward node 01
- generated violet support / focus family: `#716776` — Fibonacci inward node 02
- generated warm support: `#766F6D` — Fibonacci inward node 03
- generated oxide evidence state: `#76463B` — Fibonacci outward node 01; reserved for correction/preliminary evidence semantics, not general decoration
- paper/background, ink, and muted neutrals are manually selected neutral UI colors rather than pretending every token must come from the generator

WCAG checks against the planned light paper (`#F7F4EC`):
- `#5C7650`: 4.59:1
- `#5F7276`: 4.60:1
- `#716776`: 4.89:1
- `#76463B`: 7.05:1
- `#A3B18A`: 2.07:1 — therefore structural/non-text only on light paper

The candidate geometry is descriptive only. No production choice is justified as “better” because of PCA, hull volume, planarity, or null-model unusualness.
