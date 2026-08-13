# 008 — Add a scroll-bound Telegram signal object

- **Status**: DONE
- **Commit**: 4afeb7b
- **Severity**: HIGH
- **Category**: Missed opportunities / Physicality & origin / Performance / Accessibility
- **Estimated scope**: 2 files, medium

## Problem

The portfolio has ink routes, a Lenis-driven scroll position, and a Featured Signal console, but no persistent physical object connects the chapters. Telegram is currently only copy and a static contact link, so the strongest brand cue does not travel through the narrative.

```tsx
// client/src/pages/Home.tsx:384–400 — current route choreography
const routeScenes = [
  [".ink-route-layer--hero", "#home"],
  [".ink-route-layer--origin", "#about"],
  [".ink-route-layer--signal", "#featured"],
  [".ink-route-layer--close", "#contact"],
] as const;
routeScenes.forEach(([routeSelector, triggerSelector]) => {
  ...
  gsap.timeline({ scrollTrigger: { trigger: triggerSelector, start: "top 84%", end: "top 18%", scrub: 1.1 } })
    ...
});
```

```tsx
// client/src/pages/Home.tsx:533–537 — current Home and Origin markup
<section id="home" ...>
  ...
  <h1 ...>zxorna<span className="text-[#ed8b5a]">t</span>oe</h1>
  ...
</section>
...
<section id="about" ...>
  ...
  <p className="max-w-2xl">I’m active on Telegram, collecting better questions ...</p>
</section>
```

## Target

Add one original, `aria-hidden="true"`, `pointer-events:none` SVG signal object mounted inside `.signal-stage`. It must read as a Telegram-inspired paper-plane capsule without copying Telegram’s proprietary logo: a small blue plane silhouette, clay nose highlight, orbital ring, and two short contrail strokes.

The object must travel through one scrubbed GSAP timeline spanning `#home` to `#contact`. Use transform and opacity only during travel. The timeline must dock the object at these relative viewport poses: beside the Hero wordmark at progress `0`, upper-right Origin at `.2`, lower-left Labs at `.4`, beside the Featured relay console at `.6`, upper-left Notes at `.8`, and lower-right Contact at `1`. Each dock must change scale and rotation enough to create depth without changing layout. Use the repo’s existing `scrub: 1.1`, `ease: "none"` for scroll-bound interpolation, `scale(.9–1.08)`, and rotations within `±18deg`.

```tsx
// target mount
<div className="telegram-signal-object" data-telegram-signal aria-hidden="true">
  <svg viewBox="0 0 120 96" ...>...</svg>
  <span className="telegram-signal-object__trail" />
</div>
```

```css
/* target motion surface */
.telegram-signal-object {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 18;
  width: clamp(3.5rem, 6vw, 6rem);
  pointer-events: none;
  transform: translate3d(0, 0, 0) rotate(-8deg) scale(.96);
  transform-origin: 50% 50%;
  will-change: transform, opacity;
}
```

In reduced motion, skip the travel timeline and place the object beside the current scene’s signal rail with `opacity: .8` and a static transform. Keep the object in the DOM for comprehension and brand continuity; do not remove it entirely.

## Repo conventions to follow

Use `useReferenceMotion` in `client/src/pages/Home.tsx` for the ScrollTrigger timeline. It already gates motion at `window.matchMedia("(prefers-reduced-motion: reduce)")`, owns the `routeScenes` timelines, and calls `context.revert()` on cleanup. Keep the object inside the existing `.signal-stage` stacking context and use the project’s `--ease-signal` token for any non-scroll CSS feedback. Do not add a Lottie dependency or third-party runtime for the core travel path; the supplied LottieFiles airplane is a 3-second, 60 FPS motion reference, not the final Telegram mark.

## Steps

1. Add a small `TelegramSignalObject` component beside `InkRoute` in `Home.tsx` with an original inline SVG plane/capsule and contrail elements.
2. Mount it once inside `.signal-stage` immediately after the existing ink route layers so it remains a single shared object across chapters.
3. Extend `useReferenceMotion` with one scrubbed timeline using `data-telegram-signal`, transform-only dock poses, and the existing reduced-motion early branch.
4. Add the fixed object, inner depth, trail, and mobile collision styles to `client/src/index.css`; under `max-width: 767px`, reduce width and place it away from the fixed Route Sheet region.
5. Verify the route retraces on reverse scroll and that the object does not intercept pointer, keyboard, or touch input.

## Boundaries

- Do not replace the existing ink routes, Lenis setup, desktop relay console, or mobile Route Sheet.
- Do not embed the supplied Lottie animation as the critical scroll object; use it only as a visual reference unless the user explicitly asks for the external player.
- Do not animate `top`, `left`, `width`, `height`, margin, or padding during travel.
- Do not use `scale(0)`, un-gated hover motion, or an always-running rAF loop.
- Do not introduce an external animation dependency for this pass.

## Verification

- **Mechanical**: run `pnpm check` and `pnpm build`.
- **Feel check**: scrub slowly from Home to Contact at desktop width. Confirm the object docks beside each chapter’s strongest signal, rotates subtly, grows/shrinks as it moves through depth, and retraces without snapping when scrolling upward.
- At 390px, confirm it never overlaps the fixed mobile Route Sheet panel or header controls and remains `pointer-events: none`.
- Toggle reduced motion and confirm the object stays visible but no longer travels or rotates.
- **Done when**: the Telegram cue is spatially continuous across all six chapters, uses only transform/opacity during travel, remains accessible as decorative content, and produces no new console errors.
