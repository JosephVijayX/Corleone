# 009 — Restore Telegram flight and emitted signal trails

- **Status**: DONE
- **Commit**: e889dae
- **Severity**: HIGH
- **Category**: Missed opportunities / purpose & physicality
- **Estimated scope**: 2 files, small targeted motion pass

## Problem

The shared Telegram object had macro scroll travel but no local flight animation. In `client/src/pages/Home.tsx:100-101`, the SVG rendered one plane, one orbit, and two static trail paths. In `client/src/pages/Home.tsx:416-424`, GSAP owned only the parent dock-to-dock transform. In `client/src/index.css:92-97`, the plane and trail selectors had no animation declarations, so an idle computed-style probe returned `animation-name:none`, unchanged plane transform, and unchanged trail dash offset.

This made the arrow read as a hardcoded marker that teleported between scroll-derived positions instead of a signal being emitted by a moving paper plane. The supplied airplane reference and the reference portfolio both establish motion as a live visual system, so the lack of an independent local loop was feel-breaking.

## Target

Keep GSAP responsible for the macro parent route and use CSS descendants for a continuous local loop. The production object must contain a `.telegram-signal-object__flight` group, a `.telegram-signal-object__orbit`, and at least four `.telegram-signal-object__trail` paths. The target values are:

```css
.telegram-signal-object__flight {
  animation: telegram-flight 1.4s ease-in-out infinite;
}
.telegram-signal-object__orbit {
  animation: telegram-orbit 3.2s ease-in-out infinite;
}
.telegram-signal-object__trail {
  animation: telegram-trail 1.35s linear infinite;
}
```

The trail delays must be `0s`, `-0.45s`, `-0.9s`, and `-1.12s`, with transform, stroke dash offset, and opacity animating so fresh signal lines enter from the rear of the plane and fade behind it. Under `prefers-reduced-motion: reduce`, the flight, orbit, and trail animations must be disabled while the existing static parent fallback remains.

## Repo conventions to follow

GSAP already owns scroll-linked transforms inside `useReferenceMotion` in `client/src/pages/Home.tsx`; do not add another runtime or compete for the parent transform. CSS motion tokens and reduced-motion rules live in `client/src/index.css`, alongside the existing ink-route choreography and `--ease-signal` token. Preserve `pointer-events:none` on the shared decorative object so it never blocks controls.

## Steps

1. In `client/src/pages/Home.tsx`, wrap the plane, shadow, and fold paths in `.telegram-signal-object__flight`, and replace the two static paths with four `.telegram-signal-object__trail` paths inside `.telegram-signal-object__trail-field`.
2. In `client/src/index.css`, add transform-box/origin rules and the `telegram-flight`, `telegram-orbit`, and `telegram-trail` keyframes using compositor-friendly transform, opacity, stroke dash offset, and no layout properties.
3. Add explicit reduced-motion selectors that set the three animated child groups to `animation:none !important`, while leaving the existing `useReferenceMotion` reduced-motion parent fallback intact.
4. Verify the parent remains GSAP-owned and the descendant animation remains active during a settled forward/reverse scroll handoff.

## Boundaries

- Do not add Lottie or another runtime dependency.
- Do not move the object out of `.signal-stage` or change the six responsive chapter dock positions.
- Do not animate the parent transform from CSS.
- Do not add pointer handlers to the decorative object.

## Verification

- **Mechanical**: run `pnpm check` and `pnpm build`; expect no TypeScript or bundle errors. The existing large-client-chunk advisory may remain.
- **Feel check**: at a fixed scroll position, sample the object at least 180 ms apart and confirm the plane transform and trail dash/opacity values change. In DevTools, slow the animations to 10% and confirm fresh lines visibly enter from behind the plane rather than blinking in place.
- **Live scroll**: scrub Home to the mid-document and reverse after Lenis settles; confirm the parent matrix changes and returns while the local plane/trail loop continues.
- **Mobile**: at `390 × 844`, confirm the object remains `pointer-events:none`, four trails exist, the Route Sheet panel count remains `1`, and the object travels from approximately `x:-2,y:-3` to approximately `x:132,y:399` at mid-document.
- **Reduced motion**: emulate `prefers-reduced-motion: reduce`; confirm the parent and plane transforms hold static, child animation names are `none`, and console errors remain at zero.
- **Done when**: the object reads as an emitting signal in idle and scroll states, while the existing macro route, mobile sheet, and reduced-motion fallback remain intact.
