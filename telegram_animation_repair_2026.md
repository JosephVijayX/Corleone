# Telegram Animation Repair Research

## Direct reference inspection

The supplied [LottieFiles airplane reference](https://lottiefiles.com/free-animation/airplane-lottie-animation-oFtu1GyIfl) is not merely a static plane icon. Its visible grammar is a continuously animated paper-airplane body with a clear forward-facing flight pose, a changing curved contrail, and a short repeating loop that makes the trail feel emitted by the moving object. The reference page exposes a canvas player and tags the asset with `contrail`, `trail`, `paper airplane`, and `Telegram`, which supports treating the trailing lines as a primary motion cue rather than a decorative afterthought.

The supplied [Baaz reference portfolio](https://bajkamalsingh.me/) establishes the broader interaction grammar: the blue opening field is already moving while the page is idle, the skip control explicitly acknowledges a boot/intro animation, the hero meter advances during that opening, and the page's line/scene choreography is meant to feel authored over time rather than simply interpolated between hardcoded endpoints.

## Current defect statement

The production Telegram object currently renders one fixed SVG plane, one fixed orbit, and two short static dashed paths. GSAP scrubs the parent between six viewport-derived positions, but the child plane and trail do not have an independent time-based animation. The result satisfies spatial travel but fails the reference's visual causality: the arrow looks placed at positions rather than flying through them, and the lines do not visibly arrive from behind it.

## Repair direction

Keep the shared scroll-bound object and named chapter docks, but add a second motion layer inside the same object. Scroll should control the macro route, banking, scale, and dock-to-dock handoff. A continuous local loop should control thrust, slight plane banking, orbital phase, and a staggered stream of signal-line segments that enter from behind the plane, shorten/fade as they are emitted, and repeat without changing document layout. The trail must be visually anchored to the plane's rear vector, not to a fixed page coordinate.

## Corrected motion contract

The parent `.telegram-signal-object` remains the scroll-bound macro actor. Its six named dock positions stay responsive to `window.innerWidth` and `window.innerHeight`, and reverse scrolling must retrace the same macro route. Inside it, the plane must continuously bank and pulse with transform-only motion while the orbit phase drifts. Three or more independent trailing line segments should cycle with staggered delay, using dash offset and opacity so a fresh line visibly arrives from the rear, crosses the emission point, and fades behind the plane. The plane's rear vector is the left side of the current paper-plane silhouette, so the trail group must remain visually attached when the parent rotates.

The local loop must be CSS-driven for steady idle motion and gated by `prefers-reduced-motion`. Under reduced motion, the plane and trail settle to a static readable state while scroll travel itself is removed, preserving the existing fallback. Scroll and local animation must not compete over the same parent transform property: GSAP owns the parent transform; CSS owns only descendant transforms, stroke dash offsets, and opacity.

## Acceptance tests

1. At a fixed scroll position, two computed-style samples at least 180 ms apart must show a changed plane descendant transform or orbit phase and changed trail dash/opacity state.
2. At the same scroll position, at least three trail segments must have independent animation names or delays and remain `pointer-events:none`.
3. A macro scroll scrub from Home to mid-document must change the parent transform while the local plane/trail animation remains active; reverse scroll must return the parent route without snapping the child animation to a new origin.
4. At 390 px width, the object must remain behind the mobile Route Sheet panel and must not enter the interactive element tree.
5. With reduced motion emulated, descendant transforms and looping trail animations must be disabled or settled, the parent must stay at its static fallback, and console errors must remain at zero.
