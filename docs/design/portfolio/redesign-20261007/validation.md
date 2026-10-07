# Portfolio redesign validation — 2026-10-07

Reference authority: `math-by-design.html` (`a735791160fe22962ac1cff8af9e482d069919ec1c4c18adfc7372b360c2b5db`).
Palette helper: `fibonacci_hex_palettes.py` (`ba4e73da4db54e60bac1ca13e6093824619553d0a2bec249c4d2cf940cd8b91f`), self-test **ALL PASS**.

## Render checks

Rendered from the exact rebuilt `site/` tree using Chromium/Playwright with local CSS/JS/data inlined into an isolated verification harness. The harness changes no production code.

- 1440×900 visual inspection: Landing, Work, About trajectory, Rendered-Systems-Gallery, About Me, Contact, Research Archive, Skills, Experience, Search, Content Usage, and all four research details.
- 1366×768: all 14 major routes — **0 horizontal overflow**, no browser console/page errors.
- 390×844: all 14 major routes — **0 horizontal overflow**, no visible text below 8px, no browser console/page errors.
- About gallery real Sacred Computations images remain data-backed production assets; placeholder studies remain labeled/composed artifacts rather than false screenshots.

## Interaction checks

All pass:

- landing header begins visually withheld, reveals ~800ms after meaningful scroll;
- keyboard focus reveals landing header immediately;
- landing Current Practice branch selection activates the actual branch detail;
- Work branch filter updates `aria-pressed` and the ledger population;
- About trajectory → evaluation → trajectory forward/reverse scene controls;
- About reduced-motion transition switches scene without overflow;
- Contact résumé and reference dialogs open normally;
- search suggestions include Contact / résumé availability without exposing a résumé URL;
- keyboard focus uses a visible 2px `#716776` outline.

## Contrast samples

WCAG contrast calculations for actual production roles:

- `#17201D` on `#F7F4EC`: 15.15:1
- `#545C58` on `#F7F4EC`: 6.27:1
- `#EDF2EE` on `#171D1B`: 15.09:1
- `#A9B1AD` on `#171D1B`: 7.80:1
- semantic action `#5C7650` on `#F7F4EC`: 4.59:1
- focus support `#716776` on `#F7F4EC`: 4.89:1
- gallery lead `#C9D1CC` on `#101614`: 11.75:1

`#A3B18A` is intentionally structural/non-text on the light paper because its text contrast is only 2.07:1.

## F1–F5

All major compositions pass the design gate in the local render:

- **F1 Identity:** every route can be described by its own compositional idea without relying on “modern/clean/beautiful/futuristic/golden ratio.”
- **F2 Mass:** one primary visual claim is immediately legible on every page.
- **F3 Flow:** visual order follows semantic order; Phi roles are annotations/constraints rather than visible geometry decoration.
- **F4 Variation:** page families change measure, alignment, scale, density and/or material at major handoffs; pages are not interchangeable with text removed.
- **F5 Resilience:** desktop/mobile overflow checks clean, reduced-motion path exercised, keyboard focus visible, long-form layouts remain readable.
