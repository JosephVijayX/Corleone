# Motion Audit — Supplied Portfolio Reference

The supplied site is motion-first because the entire story is built inside a fixed `#world-viewport` with a Lenis-powered smooth-scroll wrapper. GSAP, ScrollTrigger, and Draggable are combined into one timeline/ticker system. The document is not a stack of normal pages; it is a pinned cinematic world where sections temporarily hold the viewport while content transforms inside it.

The strongest motion primitives are:

| Reference behavior | What it contributes | Original Zxornatoe translation |
|---|---|---|
| Fixed smooth-scroll viewport | The portfolio feels like one continuous world rather than page jumps. | Use an original scroll-stage wrapper with eased scroll progress and a persistent scene overlay. |
| Hero reveal and clip-path entrances | Text and sections arrive as choreographed scenes. | Animate the signal mark, hero fragments, route line, and wordmark in a staged boot sequence. |
| ScrollTrigger section state | Sections enter, hold, and exit with explicit active states. | Drive section themes, progress rail, route line drawing, and chapter labels from viewport intersection/progress. |
| Pinned project and featured sections | The user explores an interaction while scrolling through a bounded scene. | Pin the Labs and Signal chapters briefly so project records and featured work animate in place. |
| GSAP timeline navigation warp | Section navigation feels like a transition, not an anchor jump. | Use an original “signal jump” overlay: line sweep, vignette, label blur, then destination reveal. |
| Draggable stickers / cursor labels | The page responds to the pointer as a physical object. | Add a small custom cursor field, hover labels, and draggable signal tags where fine pointer input exists. |
| SVG route/circle drawing | Lines feel alive and are tied to chapter entry. | Draw route paths, orbit rings, and evidence connectors as sections enter. |
| Expandable panels with clip/height transitions | Project details feel discovered rather than permanently open. | Use reversible open/close choreography with evidence metadata and status changes. |
| Keyboard arrows for featured work | The featured case-study sequence is explorable without scrolling alone. | Keep ArrowLeft/ArrowRight controls and add touch drag with direction-aware transitions. |

## Current build gap

The current Zxornatoe build has strong type and color but still behaves like a standard document. Its anchor navigation jumps directly, the ticker is the only continuous animation, project records open instantly, the featured route changes without scene movement, there is no pinned stage, no transition overlay, no scroll-linked line drawing, and no pointer-driven interaction. The rebuild must address those gaps directly.

## Boundary

The reference’s implementation details are used only as behavioral observations. The new build will use original React/CSS logic, original signal-map metaphors, original copy, and original visual marks; it will not extract, redeploy, or modify the reference creator’s source code or assets.

## Live verification of the revision

The revised preview now shows a boot layer that exits through a clipped line scene, a persistent left signal rail, and a hero orbit with animated breathing motion. Navigation into Origin, Labs, and Signal displays a visible routing transition and updates the active route label. Origin draws its blue SVG path when the chapter becomes active. Labs records open into a reversible animated evidence panel with trace metadata. The Featured Signal scene changes content through keyboard arrows and directional slide motion; pointer dragging is also wired for fine pointers. The new controls and content are present in the browser, and the production type check/build pass.
