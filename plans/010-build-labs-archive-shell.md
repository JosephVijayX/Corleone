# 010 — Build a tactile Labs archive shell

- **Status**: DONE
- **Commit**: 03b3810
- **Severity**: HIGH
- **Category**: Cohesion & tokens / Missed opportunities
- **Estimated scope**: 3 files, one scene component, one motion pass

## Problem

The Labs scene was the least authored chapter in the portfolio. At the stamped commit, `client/src/pages/Home.tsx` rendered the scene as a single dark section with a plain bordered list: each record used a generic grid button, a title, status/year text, and a shared expandable detail panel. The older reveal choreography in `client/src/pages/Home.tsx` used two separate transforms on `.project-record`, which made the rows enter as a repeated list rather than as physical archive records. `client/src/index.css` gave the records only a 4px vertical rule, a generic blue wash, and a `TRACE / LIVE` pseudo-label. The parity acceptance criteria called for an archive shell, full-width record focus state, explicit close behavior, and project-specific metric treatment.

## Target

Labs should read as a dedicated field archive inside the Signal/Clay/Blue world:

- The header exposes `field index / zxo-02`, active archive language, and a compact dotted route line.
- Each record uses a large numbered index, type/status metadata, year/trace metadata, and a high-contrast arrow/close mark.
- Opening a record produces a three-column detail composition with an orange specimen card, evidence thumbnails, learning notes, and a visible `close trace ×` control.
- Entry motion uses one staggered, scroll-triggered transform/opacity/clip-path/filter reveal per record, with distinct small initial rotations and no pseudo-element animation target.
- Mobile reduces each record to a 42px index column, a flexible title column, and a 2.15rem action mark; the detail grid collapses to one column.
- The active record must remain reversible through click, keyboard `Escape`, and the explicit close control.

## Repo conventions to follow

- Global colors remain `#221f1b`, `#ede5d7`, `#3e4cff`, and `#ed8b5a`; do not introduce a parallel palette.
- Shared motion easing is `var(--ease-signal)`; the existing project detail uses `grid-template-rows` and opacity to preserve the open/closed flow.
- Scroll reveals are owned by the existing GSAP/ScrollTrigger setup in `Home.tsx`; do not add another animation runtime.
- Reduced motion is handled globally in `index.css` by dropping transform-heavy movement and shortening animation/transition durations.

## Steps

1. In `client/src/pages/Home.tsx`, add a dedicated `LabsRecord` component that separates the record trigger, specimen panel, evidence buttons, and learning notes while passing the existing `activeProject` and `activeMedia` state through callbacks.
2. Replace the old inline Labs list with `LabsScene`, adding the archive route header, active-trace status, and explicit close button without changing the existing project data.
3. In `client/src/index.css`, add `.labs-scene*` and `.labs-record__*` rules using only transform, opacity, clip-path, and color/background changes for interaction feedback. Use the documented `var(--ease-signal)` token and keep `labs-pulse` decorative only.
4. Replace the two old `.project-record` ScrollTrigger entrances with one `fromTo` reveal using `y: 46`, per-record rotations `-2.5`, `1.4`, and `-1.1`, `autoAlpha: .18`, `clipPath: inset(0 0 100% 0)`, `filter: blur(6px)`, then settle to `y: 0`, `rotation: 0`, `autoAlpha: 1`, `clipPath: inset(0)`, and `filter: blur(0px)` over `1.05s` with `power3.out` and `.18` stagger.
5. Add the narrow-screen layout rules under the existing `@media (max-width: 767px)` block and preserve the sticky Labs header, evidence drawer, and keyboard close path.

## Boundaries

- Do not change the Hero, Origin, Featured, Notes, or Contact markup.
- Do not remove the existing `activeProject`, `activeMedia`, evidence drawer, or `Escape` handling.
- Do not add a new motion dependency or animate CSS pseudo-elements through GSAP.
- Do not fabricate project outcomes, customer reviews, ratings, or testimonials.

## Verification

- **Mechanical**: run `pnpm check` and `pnpm build`; both must pass.
- **Feel check**: open the live page at `#work`, confirm each record enters as a staggered archive specimen rather than a flat list, open `LAB.01`, inspect the orange specimen card and evidence thumbnails, then activate `close trace ×` and confirm the compact list returns.
- **Accessibility**: activate a record with keyboard focus, confirm `aria-expanded` changes, press `Escape`, and confirm the record closes. Toggle reduced motion and confirm the page remains readable without record travel animation.
- **Responsive**: verify desktop and `390 × 844` mobile; the index/title/action columns must remain readable and the detail content must collapse to one column.
- **Done when**: the Labs chapter visibly has its own archive-shell identity, the open state is reversible, no console errors appear, and the existing Signal scene remains reachable immediately after Labs.
