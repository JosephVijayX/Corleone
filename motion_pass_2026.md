# Motion Pass 2026 — Scope and Direction Set

## Target

The next prototype run focuses on one high-leverage piece only: the **mobile Signal Relay browser inside the Featured chapter**. The existing desktop console already has route nodes and keyed readouts, but the mobile version needs a stronger sense of direct manipulation, spatial memory, and physical material. Improving this one scene should raise the perceived quality of the entire portfolio without destabilizing the global scroll system.

## Three divergent directions

| Direction | Named axis | Interaction story | Cost |
| --- | --- | --- | --- |
| **Signal Deck** | Gesture-first card stack | A user drags the active transmission card left or right, sees the next stop peek through, and releases with momentum toward the next route state. | Strongest tactile feel, but less information visible at once. |
| **Kinetic Dial** | Spatial route navigation | The three stops live on a compact orbit; dragging rotates the route and snapping selects the nearest stop while the readout pivots around a stable center. | Most memorable spatial metaphor, but requires careful labeling on narrow screens. |
| **Route Sheet** | Material depth and sheet physics | The active stop lives in a dark translucent sheet that can be pulled upward for detail, with a route strip remaining anchored underneath as a spatial source. | Clearest hierarchy and depth, but adds vertical interaction complexity. |

## Apple-style behavior contract

Each prototype must respond on pointer-down, track touch one-to-one with `setPointerCapture`, preserve the grab offset, retain release velocity, project momentum toward a neighboring stop, resist overscroll with rubber-banding, and remain interruptible while settling. The default settle should be critically damped; bounce is reserved for a real flick. Reduced motion must replace movement with a short opacity/state cross-fade, while touch targets remain keyboard reachable and visible.

## Acceptance criteria

Every variant must be fully interactive, distinct at full size, legible at 390px and desktop widths, safe under keyboard and coarse-pointer input, and clean in the browser console. The picker must remain isolated from production until a direction is deliberately promoted.

## Live comparison log

Signal Deck reads as the strongest direct-manipulation candidate: the active card is visually graspable, the neighboring transmissions peek through, and the copy makes the gesture legible without extra chrome. Kinetic Dial is the strongest spatial metaphor: it keeps all three route stops visible and makes the active state easy to understand, but its small node labels will need a mobile readability check before selection. Route Sheet verified cleanly: its anchored blue source, clay detail sheet, route dots, and next-stop control create the clearest hierarchy and strongest material contrast, though its vertical gesture needs dedicated touch testing before promotion.

The current comparison favors **Route Sheet** for production because it adds the largest new interaction grammar without duplicating the existing horizontal relay console. Signal Deck remains the fallback if touch testing shows the sheet’s vertical gesture competes with page scrolling; Kinetic Dial remains the fallback when spatial route memory is the priority.

The picker’s right-arrow key correctly switched Route Sheet back to Signal Deck and updated the URL to `?v=1`. A browser-indexed click on the Signal Deck Next control did not change the readout, matching an earlier live-browser targeting caveat; direct DOM activation will be used to verify the handler itself before any promotion decision.

The mobile capture confirms all three directions remain legible at 390px. Signal Deck has the clearest tactile card stack, Kinetic Dial retains a readable three-stop orbit with a strong center anchor, and Route Sheet presents the most convincing clay-on-blue material handoff. Direct DOM activation moved Signal Deck from ORIGIN to Open channel with the expected active-stop state, and the isolated browser console remained clean after the full picker loop.

The first production check confirms the Route Sheet overlay is not rendered at the desktop viewport: the existing blue Signal Relay console remains the desktop interaction surface. This keeps the promotion scoped to the mobile/coarse-pointer experience rather than replacing a proven desktop scene.

The real Playwright Firefox session at 390×844 confirms the Route Sheet mounts in the production Featured section with `display: block`, the initial readout is Learning the stuff, and the route remains reachable at a coarse viewport. The earlier GSAP selector warning was corrected to target the close route layer at its actual sibling location. A real drag gesture from the panel handed off from Learning the stuff to Parrot hours, and the post-fix console reports zero errors and zero warnings. Firefox’s scroll-linked positioning warning no longer appears in the post-fix session; the intentional Lenis/ScrollTrigger choreography remains the compatibility surface to keep watching.

After plans 005–007, a 390px Firefox session confirmed an interrupted upward drag still handed off from Learning the stuff to Parrot hours, a direct route-node tap changed the readout to Open channel, and the panel’s computed `touch-action` is `none`. The post-plan console remains at zero errors and zero warnings. This closes the current high-impact gesture seam; the remaining polish is visual and cross-device rather than a broken interaction.

After deleting the temporary prototype files, the first keyboard check briefly reported stale HMR module errors from the already-open tab; a clean navigation cleared those references. The final fresh session then passed ArrowRight from Learning the stuff to Parrot hours at 390px with zero errors and one expected scroll-linked positioning warning from Firefox’s Lenis/ScrollTrigger observation.

The reduced-motion session passed at 390px: the Route Sheet changed from Learning the stuff to Parrot hours, the panel transform remained at the identity matrix, the keyed readout animation resolved to `none`, and the console reported zero errors and zero warnings.

The final 1280px desktop regression confirms the existing relay changes from Learning the stuff to Parrot hours through the second route node, while `.mobile-touch-feature` computes to `display: none`. Desktop and mobile interaction grammars therefore remain intentionally separate, and the production route no longer depends on the deleted prototype modules.
