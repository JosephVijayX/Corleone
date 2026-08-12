# Animation Fidelity Specification

## Reference runtime observations

The supplied reference uses **Lenis + GSAP + ScrollTrigger + Draggable**, not Framer Motion. Lenis is configured on a fixed world viewport with `duration: 0.8` and an exponential easing function. Lenis is merged into GSAP’s ticker, ScrollTrigger defaults to the world viewport, and scrolling is stopped while the opening preloader is visible.

| Timeline | Reference behavior | Fidelity target for Zxornatoe |
|---|---|---|
| Preloader | Character reveals use `duration: 1.0`, `stagger: 0.025`, blur `24px → 0`, and `power2.out`; loading counter runs for `4.9s` with `power1.inOut`. | Use real character-level reveal for the Zxornatoe opening line, a counter/rail, and a skip-safe intro state. |
| Hero reveal | Preloader fades over `1.2s`-ish; hero image scales to `1.05` with `expo.inOut`; hero text begins at `scale: .12`, `y: -114`, `rotate: -4`, then resolves over roughly `1.65s` with `expo.out`; nav/ribbon rise from blurred offsets over `1.0s`. | Create explicit hero timeline with clipped text, orbit scale, nav rise, and blur settle instead of relying on CSS animation alone. |
| Navigation warp | Nav text fades in `0.2s`; indicator fills in `0.3s` with `power4.inOut`; nav widens to `110vw`, border expands to `8px` over `0.6s`; viewport scales to `.82`, rotates `28deg`, moves `-4vh`, rounds to `24px`, and blurs/brightens over `0.6s`; Lenis scrolls to destination in `1.4s`; timeline ticks sweep for `1.8s`; viewport returns over `0.9s` with `expo.out`; nav restores around `2.3–2.8s`. | Replace the short signal-jump overlay with a real GSAP master timeline that owns the nav, viewport stage, ticks, and destination handoff. |
| Cursor | Ten-dot trail uses spring interpolation around `.3–.4`; hover shrinks the core to `0` over `.2s`, expands the lead ring to `46px` over `.4s` with `back.out(2)`; mouseup ripple expands `20px → 120px` over `.6s`. | Add a real multi-dot trail, hover ring, press scale, and click ripple; keep coarse-pointer fallback. |
| Origin scene | Scroll-scrubbed timeline drifts notebook in over `.8s`, scales/tilts over `2.5s` with `power2.inOut`, stickers enter over `.8s` with `back.out(1.2)`, spotlight fades for `2.0s`, and mapped line draws for `2.4s` with `sine.inOut`. | Give Origin a real scrubbed GSAP timeline with orbit/sticker/path phases rather than binary intersection classes. |
| Pinned chapters | Experience scene pins for `+=600`; metro/vending scene pins for roughly `+=1200` and maps ScrollTriggers to its inner scroller. | Keep Labs and Featured pinned, but drive internal progress with a scrubbed timeline and explicit enter/hold/exit phases. |
| Featured route | Station buttons move through a cinematic route; case-study content uses clip-path/blur reveals and directional scene changes. | Keep directional Featured state, but animate route line, station markers, title, detail, metric, and indicator as one timeline. |
| Drag physics | Draggable uses bounds, `type: x,y`, `edgeResistance: .7`, lift shadow/scale on press, and a release settle. | Add bounded drag with lift and spring-back for Zxornatoe’s original note/sticker field. |

## Implementation boundary

The numbers and behavior above are used as interaction research. The Zxornatoe implementation will use original DOM, copy, visual marks, and project metaphors. It will not import the reference creator’s source, assets, personal identity, or exact branded concepts.

## Runtime verification

After installing GSAP and restarting the project, the live browser showed the staged opening line/brand boot state, then restored the full section navigation and hero scene. The explicit runtime now registers GSAP/ScrollTrigger/Draggable, merges Lenis into the GSAP ticker, creates a ten-point cursor trail, and uses scrubbed ScrollTrigger reveals. The navigation warp remains the next live interaction to verify.
