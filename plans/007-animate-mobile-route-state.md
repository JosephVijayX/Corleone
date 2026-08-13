# 007 — Animate mobile Route Sheet state changes

- **Status**: DONE
- **Commit**: d04268e
- **Severity**: MEDIUM
- **Category**: Missed opportunities / Cohesion & tokens
- **Estimated scope**: 2 files, small

## Problem

Route-node selection in the production mobile sheet changes the title, detail, metric, and label immediately inside one persistent panel. The gesture handoff has motion, but a direct tap on a node teleports the readout, so the same control surface has two different state-change grammars.

```tsx
// client/src/pages/Home.tsx:187 — current
<article className="mobile-route-sheet__panel" style={{ transform: `translate3d(0, ${offset}px, 0)` }} ...>
  ...
  <h3>{sheet.title}</h3><p>{sheet.detail}</p>
  ...
</article>
```

## Target

Wrap only the variable readout content in a keyed element so React remounts the readout when `sheet.code` changes. Add a short transform/opacity entrance using the project’s strong ease-out curve, with a 220ms duration. The sheet itself must not remount, lose pointer capture, or reset its current transform.

```css
/* target */
.mobile-route-sheet__readout { animation: mobile-route-readout-in 220ms cubic-bezier(.23, 1, .32, 1) both; }
@keyframes mobile-route-readout-in {
  from { opacity: 0; transform: translate3d(0, 10px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .mobile-route-sheet__readout { animation: none; }
}
```

## Repo conventions to follow

Keep the animation in `client/src/index.css` beside the existing mobile Route Sheet styles and use `@media (prefers-reduced-motion: reduce)` as the existing global stylesheet does. Use a keyed React wrapper rather than a CSS transition on layout properties.

## Steps

1. Add a `<div key={sheet.code} className="mobile-route-sheet__readout">` around the variable route label, title, detail, and metric only.
2. Add the exact keyframe and reduced-motion override above to `client/src/index.css`.
3. Confirm the panel shell, grabber, and route controls remain outside the keyed wrapper.

## Boundaries

- Do not animate the sheet’s height, padding, or position for a tap selection.
- Do not change the gesture spring or route indexing.
- Do not add blur or a second overlapping copy of the readout.

## Verification

- **Mechanical**: run `pnpm check` and `pnpm build`.
- **Feel check**: tap all three route nodes rapidly and confirm each readout enters from the same anchored origin without flashing the sheet or blocking the next tap.
- Toggle reduced motion and confirm the readout changes immediately with no position movement.
- **Done when**: direct taps and drag releases share a coherent state-change language and the console remains clean.
