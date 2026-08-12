# Distinctive Motion Acceptance Specification

## Motion vocabulary

The next revision will use a deliberately limited set of ownable motifs: **ink curls**, **route knots**, **paper lifts**, **scanner bands**, and **signal blooms**. Each motif must have a job in the story, not exist as decoration.

## Section-by-section behavior

| Section | Unique animation identity | Acceptance criteria |
|---|---|---|
| Hero | A living ink field behind the title, with a curl that tightens around the split-orbit mark as the intro resolves. | The curl is visibly drawn and settles; the background has layered depth; no generic one-shot fade is the only motion. |
| Origin | A notebook route rewrites itself as the user scrolls, with branch points and a knot that follows the active paragraph. | At least three path phases scrub with scroll; the route pauses at a node; stickers lift with a tactile overshoot. |
| Labs | Overlapped evidence cards fan apart like a physical deck; each record has a paper-edge highlight and a scanline when opened. | Records begin stacked/overlapped, spread with stagger, and the open state has a unique scan/peel transition. |
| Signal | A magnetic route pulse follows the selected case-study node; changing the item reroutes the line before the copy settles. | Route movement is directional; active node visibly changes; copy/metric transition is not a plain slide. |
| Notes | A scanner band reveals fragments while a filmstrip of visual notes advances with scroll. | Cards reveal through a moving scan band and respond to pointer proximity with depth/tilt, with touch-safe fallback. |
| Contact | The ink route ties back to the opening mark and draws a final underline toward the contact action. | The final line visibly closes the narrative loop and can be replayed when returning from the top. |

## Interaction requirements

The implementation must include at least three non-generic interaction states: **magnetic ink**, where the route or cursor line bends toward a hovered target; **paper lift**, where an evidence card peels with shadow and angle rather than only scaling; and **route reconfiguration**, where a selected signal node changes the line topology before the content changes. Each must have keyboard/touch-safe behavior and a reduced-motion alternative.

## Performance and accessibility

SVG paths should use `stroke-dasharray`/`stroke-dashoffset`, transforms, and opacity rather than layout animation. Any filter effect must remain optional and bounded. Motion must be disabled or simplified under `prefers-reduced-motion`, while every interactive state remains reachable by keyboard and usable on coarse pointers.
