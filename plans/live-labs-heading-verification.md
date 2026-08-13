# Live Labs heading verification

The live preview was opened directly and navigated to Labs at the browser's wide desktop viewport. The first repair had removed the shadow but still left the display too large and tightly tracked. The direct browser inspection reported `font-size: 140.8px`, `letter-spacing: -8.448px`, and `text-shadow: none`, confirming that the remaining distortion was primarily scale and glyph collision rather than an active shadow layer.

The second repair is now live. Direct computed-style inspection reports `font-size: 128px`, `font-weight: 500`, `line-height: 110.08px`, `letter-spacing: -3.2px`, `font-synthesis: none`, `font-feature-settings: "kern"`, and `text-shadow: none`. The browser screenshot shows the black `Evidence gets` line and blue italic `messy. Good.` line rendering cleanly without the prior offset duplication. Responsive verification and final checks remain before checkpointing.

## Alternate-font pass

The live preview was reopened directly after replacing the Labs title font with Barlow Condensed. The application booted normally and exposed the Labs navigation and wall content in the live DOM. The next check is the direct Labs viewport screenshot to judge the new font in context rather than infer it from styles alone.

The direct Labs screenshot now shows a clean, bold condensed heading that fits the collage better than Bodoni. Computed styles confirm `font-family: "Barlow Condensed", sans-serif`, `font-size: 140.8px`, `font-weight: 700`, `line-height: 109.824px`, `letter-spacing: -6.336px`, `text-shadow: none`, and a two-line rendered width of 631px at the wide viewport.
