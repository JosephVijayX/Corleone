# 001 — Respect reduced motion in the cursor field

- **Status**: DONE
- **Commit**: 19987d7
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 1 file, 8–12 lines

## Problem

The custom cursor field is disabled for coarse pointers, but it does not check `prefers-reduced-motion`. Users who explicitly request reduced motion can still receive a GSAP ticker, a ten-point trailing cursor, hover morphs, and click ripples. This is decorative motion with no comprehension value, so it should not run in the reduced-motion mode.

Location: `client/src/pages/Home.tsx:202-204`.

```tsx
useEffect(() => {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || !cursorRef.current) return;
  const cursor = cursorRef.current;
```

The effect continues into `gsap.ticker.add(tick)` at `client/src/pages/Home.tsx:258`.

## Target

Return before creating listeners or adding the GSAP ticker when reduced motion is enabled. Preserve the existing pointer-quality gate.

```tsx
useEffect(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (reduce || !finePointer || !cursorRef.current) return;
  const cursor = cursorRef.current;
```

Do not add a substitute cursor animation in reduced motion. The existing static pointer and focus-visible outlines remain available.

## Repo conventions to follow

The main motion hook already branches on `window.matchMedia("(prefers-reduced-motion: reduce)").matches` at `client/src/pages/Home.tsx:267-273` and disables the boot/reveal choreography there. Use the same direct media-query pattern rather than adding a new dependency or hook.

## Steps

1. Edit `client/src/pages/Home.tsx` inside `useGsapCursor` and add the `reduce` and `finePointer` constants immediately before the current early return.
2. Replace the current early-return condition with `if (reduce || !finePointer || !cursorRef.current) return;`.
3. Leave all pointer listeners, GSAP cursor tweens, and the ticker unchanged for normal fine-pointer users.

## Boundaries

- Do not change the production cursor markup.
- Do not change the main `useReferenceMotion` reduced-motion branch.
- Do not add a new animation library or a fallback cursor effect.
- Do not change mobile or touch behavior.

## Verification

- **Mechanical**: Run `pnpm check` and `pnpm build`; both must pass.
- **Feel check**: With a fine pointer and normal motion, move across the hero and buttons and confirm the cursor field still follows and morphs. Enable `prefers-reduced-motion: reduce` in the browser Rendering panel, reload, and confirm there is no trailing field, click ripple, or cursor morph while focus outlines and button state still work.
- **Done when**: No GSAP cursor ticker or pointer listeners are created in reduced-motion mode, and normal fine-pointer behavior is unchanged.
