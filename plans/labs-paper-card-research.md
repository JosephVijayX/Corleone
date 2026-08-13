# Labs physical paper-card research

## Reference grammar

The supplied screenshot is not a clean card grid. It reads as a photographed or scanned research sheet: each metric panel is an independent paper artifact with imperfect outline weight, translucent stock, different color treatments, hand-written annotations crossing the content, and a blue route line that moves through the whole composition. The cards should feel attached to a larger notebook field, not floated as isolated UI tiles.

## Web research findings

FreeFrontend's paper-effect roundup shows a useful material toolkit: native gradients and SVG filter primitives can create grain and paper lines without heavy image assets, while layered shadows and GPU-composited transforms provide depth without animating layout properties. Relevant patterns include lined paper, sellotaped corners, pinned cards, subtle paper lines, stacked paper, and lifted strips. Source: https://freefrontend.com/css-paper-effects/

MDN's card layout cookbook keeps the semantic card model separate from presentation: a card has a title, content, optional image, and optional footer, and grid/flex structure should be predictable. The Labs cards can therefore remain real buttons with stable content while the paper treatment lives in pseudo-elements and transforms. Source: https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook/Card

Nielsen Norman Group defines skeuomorphism as using real-world elements to create familiarity, while warning that texture and shadow should not become gratuitous clutter or reduce contrast. For this prototype, physical cues should communicate attachment and state: pin, tape, lifted edge, rotation, translucency, and route overlap. Source: https://www.nngroup.com/articles/skeuomorphism/

## Design consequences for the prototype

The three directions will diverge by physical attachment and border behavior rather than by palette alone. Each will retain the Zxornatoe clay, electric blue, red/ochre accents, IBM Plex Mono labels, Schoolbell annotations, keyboard/project selection, and reduced-motion behavior. The production candidate should use pseudo-elements for grain and edge irregularity, non-uniform transforms for paper placement, and only transform/opacity for entrance and hover motion.

## Prototype verification

The live `/prototype/labs-cards?v=1` route mounted the Field Sheets direction with a ruled notebook board, translucent colored paper cards, imperfect inset borders, pin/tape cues, blue route overlap, and handwritten annotations. Clicking the Open Channel card changed the field note to `LAB.03 / Open Channel` and updated the active counter to `03 / 3`, confirming the cards are real interactive buttons rather than decorative samples. Desktop and 390px captures were taken for all three directions.
