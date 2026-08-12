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

## Continuation mobile audit

The full mobile capture shows a strong hero but a weaker chapter rhythm below it. The mobile breakpoint disables the sticky scenes entirely, which keeps the page safe but makes Labs and Featured fall back into compressed document sections. Labs records are readable but visually repetitive and lack a media preview state. Featured retains the blue field and direction controls, but its copy and metric need more vertical breathing room on touch screens. The visual-fragment grid has the right color contrast, yet it currently reads as four posters rather than an interactive evidence gallery. The next pass should add mobile scene spacers, touch-sized project preview affordances, and a media drawer that can hold screenshots or future uploads without changing the layout.

The continuation build now exposes two touch-friendly evidence preview buttons per Labs record, with a fullscreen drawer ready to host real screenshots or experiment artifacts. The live page still boots through the signal line, keeps the route rail, and retains the Featured controls while the new project-media affordances remain available in the DOM.

## GSAP fidelity pass

The explicit GSAP/Lenis runtime now boots through a staged line reveal and restores the section navigation after the intro. Triggering Origin drives the destination to the correct route at roughly 25% scroll progress and the settled Origin copy is readable. The warp currently exposes a brief blank/over-scaled frame during the viewport transform before settling; this is a tuning target, not a runtime crash. The next fix should keep the world stage visually present during the `scale(.82) + rotationX(28deg) + blur(6px)` phase while avoiding the current desktop frame collapse.

After isolating `.signal-stage` from fixed overlays, the refreshed preview now restores the hero and nav cleanly after boot. The next Origin warp test should confirm whether the stage-only transform removes the prior blank frame without changing the intended route handoff.

The second Origin warp now preserves the fixed signal/header context, briefly shows the intended clay/blur route handoff, and lands at 25% progress with the Origin scene readable. The previous full-viewport blank collapse is gone; remaining differences are fidelity refinements such as route ticks, richer character-level intro timing, and more exact pinned-scrub sequencing.

The latest refreshed preview restores the staged hero cleanly after the Draggable conversion. The browser console reports no runtime output or errors after GSAP, ScrollTrigger, Lenis, and the multi-dot cursor runtime initialize.

The latest live boot now exposes the reference-style character spans and a progress counter during the dark intro; after the timeline settles, the blue hero and full navigation return cleanly at 00% home state. This confirms the explicit boot sequence is not leaving stale preloader state behind.

The latest navigation test lands at 25% / Origin, with the route label updated, the clay scene readable, both GSAP Draggable notes exposed, and the fixed nav still available. The nav tick rail is present in the DOM and the stage-only transform no longer collapses the entire viewport during the warp.

The live Labs scene now presents a sticky dark chapter header with the first project record in view and two evidence actions exposed as separate controls. The route is at 35%, and the original project index remains visually layered rather than collapsing into a generic list.

Packet Map opens successfully as a fullscreen evidence frame with an original blue/clay visual, project title, tags, frame counter, close control, and explicit replacement copy for future real media. Closing the drawer returns to Labs at the same 35% route position, preserving the interaction context.

## Boundary

The audit observes the supplied site’s behavior and source-level patterns only to understand interaction mechanics. The implementation remains original and will not extract, redeploy, or modify that creator’s source code, images, personal identity, copy, or exact branded concept.

## References

[1]: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ "ScrollTrigger | GSAP | Docs & Learning"
[2]: https://lenis.dev/ "Lenis – Smooth Scroll"
[3]: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API "View Transition API - MDN Web Docs"
[4]: https://www.awwwards.com/websites/scrolling/ "Best Scroll Websites | Web Design Inspiration"
