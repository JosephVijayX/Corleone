# Labs pasted-wall repair — prototype directions

> **Style reminder:** Signal / Clay / Blue. The wall should feel physically assembled from paper artifacts, not like a dashboard. Use `#ede5d7` clay paper, `#f4efe5` cream sheets, `#3e4cff` route ink, `#ed8b5a` clay-orange notes, `#221f1b` ink, Bodoni Moda for editorial scale, Barlow Condensed for metric numbers, IBM Plex Mono for labels, and Schoolbell for handwritten annotations.

## Reference grammar to preserve in every direction

The supplied image is a wide horizontal field rather than a centered card layout. Its visual hierarchy comes from overlapping paper layers, taped edges, imperfect rotations, large outlined metric cards, handwritten notes sitting over typed content, and a single blue route line that passes through the evidence. The prototype must make those artifacts real elements with shadows, offsets, rotations, and z-order, while keeping all copy original to Zxornatoe.

## Direction 1 — Pasted Signal Board

**Axis:** closest composition fidelity to the supplied wall image.

This is a wide, low wall with three large outlined metric cards arranged across the middle, a cream research sheet behind them, and small orange/blue sticky notes overlapping the edges. The metric cards read `18 tabs / one thread`, `03 live labs`, and `01 better question`; handwritten Schoolbell notes interrupt the clean cards instead of sitting in a separate annotation column. A blue SVG route stroke enters from the upper left, loops around the cards, and exits through the lower right. The project controls are represented as clipped paper tabs along the bottom edge so Labs still behaves like a portfolio scene rather than a metrics dashboard.

Entrance motion is a physical drop: back sheets settle first, metric cards reveal from `scale(.96)` plus opacity, then sticky notes arrive in a 70ms stagger with small rotation correction. The route path draws last, followed by a single handwritten underline. This is the strongest candidate when exact reference grammar matters most; its cost is the densest overlap and smallest mobile type.

## Direction 2 — Tape-Heavy Research Collage

**Axis:** physical material depth and tactile paper layering.

This direction treats the Labs field as a working wall assembled from torn research sheets, masking-tape corners, clipped note cards, and a central blue project sheet. Three metric cards are outlined with slightly different ink colors and offset shadow sheets. The project stack becomes a set of overlapping paper slips that can be clicked and lifted above the collage. Notes use short Zxornatoe annotations such as `read the weird footnote`, `Parrot OS / second love`, and `write the exploit path down`.

Entrance motion is staged by depth: large back sheets fade and translate upward, taped notes drop with distinct rotations, the active project sheet slides in from its route anchor, and blue paths draw in two segments. Fine-pointer hovering lifts a note using only transform and shadow changes; touch keeps the collage static and readable. This direction feels most physical and alive; its cost is a slightly less literal match to the three-card horizontal image.

## Direction 3 — Blueprint Route Wall

**Axis:** technical diagram density and route-first choreography.

This wall uses a faint ruled/grid paper base with cream and orange notes pinned over it. The three outlined metric cards are larger and more schematic, with registration marks, index labels, and a blue hand-drawn route that visibly connects each card. Handwritten annotations appear as margin corrections and arrows. The project controls sit on the left as small numbered tabs while the selected project is a cream evidence sheet crossing the route line.

Entrance motion begins with the route drawing, then cards materialize at route nodes, then notes snap into place in a 50–80ms stagger. Clicking a project re-routes the blue line and swaps the evidence sheet without changing layout. This direction is clearest for a hacking/learning identity and scales well to mobile; its cost is the most diagrammatic and least paper-soft interpretation.

## Shared animation contract

All three variants use GSAP for the prototype's first-entry choreography because the route stroke, note stagger, and card order must be observable and replayable. Entrances use `transform` and `opacity`, with `clip-path` only for paper/card reveal. Notes use the existing strong ease-out token and a 70ms stagger; route strokes use SVG `stroke-dashoffset` with a controlled draw; interactive lifting is gated to fine pointers. `prefers-reduced-motion: reduce` removes position changes and preserves only a fast opacity reveal. The picker swap is instant and the replay action remounts the active direction.
