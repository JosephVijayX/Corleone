# 003 — Make Featured route changes immediate and interruptible

- **Status**: DONE
- **Commit**: 19987d7
- **Severity**: HIGH
- **Category**: Purpose & frequency / Interruptibility
- **Estimated scope**: 1 file, 25–35 lines removed or rewritten

## Problem

After the Signal Relay promotion, the production Featured markup no longer contains `.featured-copy`, but `changeFeatured` still runs a GSAP timeline against `.featured-copy` and `.ink-route-layer--signal .ink-route__path/.ink-route__curl`. The route buttons and keyboard arrows therefore spend time animating stale selectors before changing state. The current live readout is keyed by `current.code` and already has a CSS entrance animation, so the old timeline is redundant and makes rapid next/previous actions less predictable.

Locations: `client/src/pages/Home.tsx:371-383` and `client/src/pages/Home.tsx:471`.

```tsx
const changeFeatured = (direction: 1 | -1) => {
  gsap.killTweensOf([".featured-copy", ".ink-route-layer--signal .ink-route__path", ".ink-route-layer--signal .ink-route__curl"]);
  gsap.timeline({ onComplete: () => { setSlideDirection(direction === 1 ? "next" : "prev"); setFeaturedIndex((value) => (value + direction + featured.length) % featured.length); } })
    .to(".featured-copy", { x: direction === 1 ? -36 : 36, autoAlpha: 0, filter: "blur(8px)", duration: .22, ease: "power2.in" })
    .to(".ink-route-layer--signal .ink-route__curl", { strokeDashoffset: direction === 1 ? 520 : 0, duration: .28, ease: "power3.inOut" }, "<")
    .to(".ink-route-layer--signal .ink-route__path", { strokeDashoffset: direction === 1 ? 480 : 1600, duration: .38, ease: "power3.inOut" }, "<.05");
};
```

The live readout currently renders as:

```tsx
<div className="signal-relay-readout" key={current.code}>
```

## Target

Make a Featured stop change a direct, interruptible state update. Let the keyed `.signal-relay-readout` CSS animation bridge the content swap; do not delay a keyboard or button action behind a timeline whose targets no longer exist.

```tsx
const changeFeatured = (direction: 1 | -1) => {
  setSlideDirection(direction === 1 ? "next" : "prev");
  setFeaturedIndex((value) => (value + direction + featured.length) % featured.length);
};
```

Update the readout class to carry the direction:

```tsx
<div className={`signal-relay-readout signal-relay-readout--${slideDirection}`} key={current.code}>
```

Remove the `useLayoutEffect` block at `client/src/pages/Home.tsx:379-383` because it only targets the removed `.featured-copy` and old ink route selectors. Leave the scroll-triggered ink route timeline in `useReferenceMotion` intact; it is a separate section entrance effect.

## Repo conventions to follow

The production Featured scene already uses a keyed readout and the CSS animation token `var(--ease-signal)` in `client/src/index.css:246-247`. Extend that existing pattern rather than introducing a second GSAP content-swap system.

## Steps

1. Replace `changeFeatured` at `client/src/pages/Home.tsx:371-377` with the direct state-update function shown above.
2. Delete the `useLayoutEffect` block at `client/src/pages/Home.tsx:379-383`.
3. Add the direction class to the keyed `.signal-relay-readout` element at `client/src/pages/Home.tsx:471`.
4. In `client/src/index.css`, add `.signal-relay-readout--prev` with the same animation name but a negative initial translation, and preserve `.signal-relay-readout`’s current next-direction behavior. Use `transform` and `opacity` only; keep the current `.62s var(--ease-signal)` marketing-scene duration.
5. Remove `slideDirection` writes from any route-node handler that becomes redundant only if the direction class is still correctly set there; keyboard arrows and `changeFeatured` must both set it.

## Boundaries

- Do not change the Featured data or copy.
- Do not remove the scroll-triggered ink route scene animation.
- Do not reintroduce `.featured-copy` markup solely to satisfy stale selectors.
- Do not animate keyboard navigation through a delayed exit timeline.

## Verification

- **Mechanical**: Run `pnpm check` and `pnpm build`; grep for `.featured-copy` and confirm it is absent from production JSX and no longer targeted by `changeFeatured`.
- **Feel check**: In the live Featured scene, press ArrowRight and ArrowLeft repeatedly, click route nodes, and swipe the console. The current stop should update immediately, the readout should enter from the correct side, and a second action during the entrance should retarget without waiting for a stale exit tween.
- **Done when**: Every Featured navigation path uses the same keyed readout transition, no animation targets a missing `.featured-copy`, and keyboard input never feels delayed.
