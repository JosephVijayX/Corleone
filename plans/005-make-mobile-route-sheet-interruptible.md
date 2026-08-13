# 005 — Make the mobile Route Sheet interruptible

- **Status**: DONE
- **Commit**: d04268e
- **Severity**: HIGH
- **Category**: Interruptibility / Physicality & origin / Accessibility
- **Estimated scope**: 2 files, small-to-medium

## Problem

The promoted mobile Route Sheet tracks the pointer and hands off release velocity, but it does not preserve the grab offset when a user interrupts a settling spring. A new pointer move computes its position from `event.clientY - pointer.start` and overwrites the current presentation value, so grabbing a sheet mid-settle can visibly jump it. The panel also inherits `touch-action: pan-y`, which leaves the browser’s vertical panning recognizer competing with the custom vertical gesture.

```tsx
// client/src/pages/Home.tsx:123–174 — current
const pointerRef = useRef<{ id: number; start: number; last: number; lastAt: number; velocity: number } | null>(null);
...
pointerRef.current = { id: event.pointerId, start: event.clientY, last: event.clientY, lastAt: performance.now(), velocity: 0 };
...
const raw = event.clientY - pointer.start;
const next = raw > 0 ? raw * .28 : raw < -260 ? -260 + (raw + 260) * .25 : raw;
offsetRef.current = next;
```

```css
/* client/src/index.css:253, 262 — current */
.mobile-route-sheet { ... touch-action: pan-y; }
.mobile-route-sheet__panel { ... will-change: transform; }
```

## Target

Preserve the presentation value at pointer-down by adding `grabOffset: number` to the pointer record and setting it to `offsetRef.current`. Compute the next position from `grabOffset + event.clientY - pointer.start`, then apply the same rubber-band function. The sheet panel itself must use `touch-action: none`; the surrounding mobile scene may retain `pan-y` so page scrolling remains available outside the panel.

The gesture must continue to use `setPointerCapture`, raw release velocity, and the existing spring feel. On every spring tick, keep the current spring velocity available so a new pointer-down can inherit the current value rather than restarting from the logical target. Do not add a fixed-duration CSS animation to the gesture.

```css
/* target */
.mobile-route-sheet { touch-action: pan-y; }
.mobile-route-sheet__panel { touch-action: none; will-change: transform; }
```

## Repo conventions to follow

Keep the interaction in `client/src/pages/Home.tsx` beside `MobileRouteSheet`; use the existing `offsetRef`, `pointerRef`, `frameRef`, and requestAnimationFrame spring rather than adding a dependency. Continue using the existing `@media (prefers-reduced-motion: reduce)` branch in `springTo` so reduced motion settles immediately without position animation.

## Steps

1. Extend the `pointerRef` type with `grabOffset: number` and initialize it from `offsetRef.current` in `onPointerDown`.
2. Change the `onPointerMove` raw position to `pointer.grabOffset + event.clientY - pointer.start`, preserving the existing rubber-band constants `0.28`, `-260`, and `0.25`.
3. Add a `springVelocityRef` and update it on every spring tick; clear it when the spring settles. Use the current presentation value and velocity when a new drag interrupts a spring.
4. Add `touch-action: none` to `.mobile-route-sheet__panel` without changing the wrapper’s `pan-y` behavior.

## Boundaries

- Do not change the desktop Signal Relay console.
- Do not change route semantics, content, or breakpoint visibility.
- Do not add a gesture library or replace the existing spring loop.
- Do not introduce layout-property animation.

## Verification

- **Mechanical**: run `pnpm check` and `pnpm build`.
- **Feel check**: at 390×844, drag the panel upward, interrupt it halfway through settling, and grab it again. Confirm it follows the new finger position with no jump, keeps momentum on release, resists overscroll, and still allows page scroll from outside the panel.
- Toggle reduced motion and confirm the sheet changes route without movement while content feedback remains visible.
- **Done when**: repeated grab/reverse gestures are continuous, the console is clean, and the panel never loses its grab offset.
