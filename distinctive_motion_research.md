# Distinctive Motion Research Ledger

## Research direction

The next pass should avoid generic opacity/translate reveals and instead use motion as a narrative instrument. The reference’s recognizable signature is its hand-drawn route/pen-line language, which can be extended into original ink curls, knots, looping connectors, and background marks that rewrite themselves as the viewer scrolls.

## Source notes

### Codrops — “More Than a Portfolio: Building a Scroll-Driven 3D World with Something to Say”

The search result describes a scene-based approach where scroll progression maps to camera movement, object animation, and reveal timing rather than standard stacked blocks. The article’s page loaded without extractable text in the browser session, so this source is being used as a directional reference only until a readable copy or implementation demo is available. The applicable idea is **scene-as-world**: each chapter should have its own camera, material, and motion grammar rather than sharing one reveal preset.

### CSS-Tricks — “Scroll Drawing”

The page title and source topic confirm the canonical SVG technique for a drawing effect: use the path’s total length as `stroke-dasharray` and animate `stroke-dashoffset` from the full length to zero. For this portfolio, the important extension is not merely drawing one line once; it is using multiple path segments with different scroll windows so the same ink can curl, pause at a node, branch into a knot, and continue into the next chapter.

### ACM — “filtered.ink: Creating dynamic illustrations with SVG filters”

The abstract surfaced a relevant direction—dynamic SVG filters as an expressive illustration material—but the publisher page was blocked by a verification wall in the browser session. I will treat this as a conceptual lead only and keep the implementation lightweight: turbulence/noise, displacement, and opacity modulation should be optional surface treatments, not a heavy canvas dependency.

### Codrops — “Elastic SVG Elements”

The source focuses on integrating an SVG element into a component and animating it from one path shape to another with elastic motion. The useful pattern is **shape memory**: the line does not simply appear/disappear; it bends, overshoots, and settles into a new topology. For Zxornatoe, this maps well to a pen route that changes from a straight signal line into a curl or knot when a section becomes active, then relaxes when the section exits.

## Working hypotheses for Zxornatoe

1. Use a single long SVG route as a living “pen” that can draw, loop, knot, double back, and hand off between sections.
2. Give each section a distinct motion identity: Hero uses a breathing field, Origin uses an ink-map rewrite, Labs uses a stacked paper/receipt feed, Signal uses a magnetic route pulse, Notes uses a scanner/filmstrip reveal, and Contact uses a line that ties the page back to the opening mark.
3. Use a small set of tactile interaction primitives—magnetic line attraction, elastic paper lift, route reconfiguration, and ink bleed/scan reveals—instead of adding more generic hover scale effects.

## Reference-specific audit findings

The supplied reference source confirms several distinctive materials beyond its main warp: blurred/translated reveal classes use `8px` blur and `0.95` scale before settling; stacked reels and decks spread sideways from deeply overlapped positions using a `1.2s` overshooting cubic-bezier; the diary uses a paper texture built from SVG turbulence noise with multiply blending; the blueprint line uses a large stroke dash range and draws against actual path length; a circular path draws with `stroke-linecap: round`; draggable stickers use drop-shadow lift states; and image/mockup decks begin tightly stacked, then fan outward on scene entry and push farther apart on hover while the focused card lifts above the rest. These are stronger targets for the next revision than another round of generic reveal transitions.
