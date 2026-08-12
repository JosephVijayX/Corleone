# Comparative Audit — Reference vs Zxornatoe

## Executive diagnosis

The supplied reference is not merely animated content placed on a page. It is a fixed cinematic world: a custom scroll surface, a single animation loop, pinned chapters, scroll-scrubbed timelines, draggable objects, cursor labels, scene-level transitions, and a featured interaction that temporarily takes over the viewport. The current Zxornatoe build now has visible motion, but its global model is still normal document scrolling plus local reveals. That is the largest remaining reason it can feel like “pages.”

## Gap matrix

| Area | Supplied reference | Current Zxornatoe build | Priority |
|---|---|---|---|
| Global scroll model | Fixed world viewport with Lenis smoothing and GSAP ticker integration. | Native page scroll with IntersectionObserver and CSS transitions. | Critical |
| Scene choreography | Scroll-scrubbed enter/hold/exit phases with pinned chapters. | Binary `is-visible` reveals and normal-flow sections. | Critical |
| Navigation | Anchor navigation is wrapped in a cinematic warp timeline with disappearing nav, line fill, vignette, and destination handoff. | Signal-jump overlay and smooth anchor scroll. | High |
| Hero | Layered parallax/scale/clip reveals, pointer-aware scene, animated labels, and atmosphere. | Boot layer, orbit, parallax, route label, and staged reveals. | Medium |
| Projects | Pinned archive scene, expandable records, cursor labels, technical overlays, and transition states. | Expandable evidence records with route labels. | High |
| Featured work | Pinned interactive machine/metaphor with keyboard/buttons, scene-specific transitions, and deep-dive state. | Featured signal browser with keyboard, click, and touch drag. | High |
| Pointer system | Hidden native cursor, custom context labels, draggable stickers, hover transforms, physical lift states. | Custom pointer label and data-cursor affordances; no draggable sticker field. | Medium |
| Asset staging | Polaroid/stickers, visual gallery, mockups, and animated project imagery. | CSS artifact panels; no user-provided evidence media yet. | High, content-dependent |
| Sound | Optional sound toggle and Tone.js interactions. | No sound layer. | Optional |
| Mobile | Reference has dedicated geometry and navigation adaptations. | Responsive layout and coarse-pointer fallback; no dedicated mobile scene choreography. | High |

## Research-backed implementation notes

The GSAP ScrollTrigger documentation explicitly supports pinned sections, scrubbed timelines, and snap points, which are the mechanisms that turn a scroll into a bounded scene rather than a simple reveal [1]. Lenis describes the value of a shared smooth-scroll loop as keeping DOM and other scenes in sync, while maintaining native scroll semantics and touch input [2]. The View Transition API can animate DOM-state changes, but its accessibility guidance emphasizes focus, reading-position, and old/new DOM-state management; it is therefore better suited to small state transitions than as a replacement for the reference’s continuous scroll choreography [3]. Awwwards’ scrolling collection also notes that horizontal scrolling can work well for portfolios and galleries when it serves the content, which supports keeping a bounded horizontal Featured Signal scene rather than making the entire site horizontal [4].

## Acceptance criteria for the next revision

The next revision should have a single scroll controller or an equivalent centralized progress model; at least two visibly pinned scenes; continuous transforms driven by scene progress instead of only enter/exit classes; a transition timeline that temporarily owns navigation jumps; a featured browser whose content, geometry, and indicator move with direction; and mobile behavior that preserves the sequence without requiring a fine pointer. A static screenshot should still show a coherent page, but live scrolling should make it clear that the site is a moving instrument.

## Latest live check

After installing Lenis and restarting the preview, the live page reports the expected route updates during scrolling and remains interactive. The Origin chapter now visibly arrives through a blurred-to-sharp reveal, while its blue route path enters as an animated curve. The browser screenshot catches the choreography mid-transition, which is expected for a smooth-scroll scene; a settled capture should be taken after the scroll easing completes.

The next live scroll reached the Labs route at 46%. The dark Labs chapter maintained its composition while the project records moved through the scene, and the Featured blue chapter began entering after the project index. This confirms the new sticky scene architecture is active in the live preview rather than existing only as CSS declarations.

The live navigation then routed into Featured at 58% progress. The blue Signal scene occupied the viewport with its orbit, route label, usage instructions, and active content while the rest of the document stayed outside the held composition. This is materially closer to the reference’s scene takeover behavior than the previous normal-flow version.

## Boundary

The audit observes the supplied site’s behavior and source-level patterns only to understand interaction mechanics. The implementation remains original and will not extract, redeploy, or modify that creator’s source code, images, personal identity, copy, or exact branded concept.

## References

[1]: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ "ScrollTrigger | GSAP | Docs & Learning"
[2]: https://lenis.dev/ "Lenis – Smooth Scroll"
[3]: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API "View Transition API - MDN Web Docs"
[4]: https://www.awwwards.com/websites/scrolling/ "Best Scroll Websites | Web Design Inspiration"
