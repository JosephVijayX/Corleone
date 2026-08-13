# Labs heading overlap verification

The live browser computed the Stamp Board header as `position: sticky` with `z-index: 12`, while the notebook stage began below it. The source was the legacy global selector `#work > div:first-child` (including its mobile override), which was written for the former Labs header and unintentionally matched the new Stamp Board header. The stage itself was relative, but the sticky header stayed above it during the long-page capture, creating the screenshot overlap.

The repair removes the overflow ancestor from the Labs section, adds a higher-specificity `#work.stamp-labs > .stamp-labs__header` normal-flow override, keeps the stage self-contained with its own overflow, and adds scoped route-node reveal behavior alongside the reference-style progressive SVG draw.

After the override, direct browser inspection reports the header as `position: relative`, `top: 0`, `z-index: 2`, and the stage as `position: relative`, `top: 0`, `z-index: 1`, with a 34px normal-flow gap between them. The route path remains initialized with a measured dash array and dash offset for scroll-controlled drawing.
