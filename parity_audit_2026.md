# Side-by-Side Parity Audit

Reference: [bajkamalsingh.me](https://bajkamalsingh.me/)

## Executive finding

The current Zxornatoe build is no longer a static document, but it is still not a 100% visual or behavioral match to the supplied reference. The largest gap is not one missing effect; it is the reference’s **scene grammar**. The reference behaves like a sequence of full-screen art-directed worlds with a handwritten identity, a persistent top ribbon, a bottom metro navigation, and strongly different chapter mechanisms. Zxornatoe currently behaves like one editorial world with several color chapters and a bottom nav.

## Major differences

| Priority | Reference behavior | Latest Zxornatoe behavior | Required parity direction |
|---|---|---|---|
| P0 | Hero is a full-screen blue/black silhouette world with handwritten `Baaz` wordmark, off-grid copy, a progress meter, time/route line, sound control, skip button, and bottom nav. | Hero is a blue editorial world with a large serif wordmark, black orbit, top system bar, ink route, and bottom nav. | Create a stronger Zxornatoe hero world: one dominant silhouette/field image, handwritten/brush wordmark treatment, persistent top ribbon, lower-left progress meter, sound/skip affordance, and a more exact off-grid composition using Zxornatoe content.
| P0 | Reference has a top ribbon that changes copy as scenes progress and a bottom navigation with section-specific labels. | Header is mostly static; bottom nav is a generic button row. | Add a changing top ribbon and make nav state carry scene-specific status and progress rather than only active color.
| P0 | Reference navigation warp transforms the world and performs a cinematic handoff into a destination section. | Warp exists, but the destination is still reached through the same page world and shared visual language. | Add destination-specific handoff masks: silhouette-to-paper, paper-to-blue, and blue-to-gallery transitions, with content-specific camera/clip behavior.
| P1 | Origin is a long scrapbook/diary chapter with paper texture, photo/polaroid treatment, evidence notes, and route-line memory. | Origin is a clay editorial text scene with draggable stickers and an SVG route. | Add a stronger diary composition: photo/polaroid placeholder frame, tape/paper overlays, route-line annotation labels, and a separate scrapbook reveal timeline.
| P0 | Projects is an expandable archive of real records where a row opens a detailed project panel and closes via a clear global close affordance. | Labs rows open evidence panels, but the visual treatment remains a dark list and the page has no distinct archive scene shell. | Add an archive shell, full-width row focus state, explicit `CLICK ANYWHERE TO CLOSE`-style affordance, and project-specific metric strips.
| P0 | Best Work is a pinned, full-screen metro station interface with station route, next/prev controls, transit copy, and a dedicated step-out/deep-dive action. | Featured is a blue pinned scene with a route pulse and case-study copy, but no living station/route metaphor. | Build a unique Zxornatoe metaphor: a “signal terminal” with route stops, platform/current-node label, next/prev controls, and a step-out action.
| P1 | Visuals is a large hover-responsive gallery/contact-sheet with multiple physical media behaviors. | Notes uses four graphic cards and scanner/cursor effects but not a media-led gallery. | Add an explicit contact sheet or visual evidence wall with spread/splay, card focus, and media hover behavior.
| P1 | Contact closes with a large editorial CTA, socials, and a final handoff/bye message. | Contact exists but is still a lighter end section without a strong final scene closure. | Add a final ink line tying back to the hero mark, an oversized contact CTA, and a deliberate end-state message.
| P1 | Typography uses a handwritten display face, Bebas/condensed impact, and body/utility fonts in visibly different roles. | Typography is serif display + condensed/mono, with fewer handwritten marks. | Add a handwritten display accent for hero labels, microcopy, and route annotations; preserve readable body type.
| P2 | Reference uses a silhouette/image-led background and tactile paper/noise treatments. | Current backgrounds are mostly CSS gradients, fields, and SVG linework. | Add one coherent generated hero silhouette/image and supporting paper/noise textures; do not reuse reference media.

## Acceptance checklist for the next pass

The next revision is accepted only when the Hero has a full-screen image/field composition, top-ribbon state, progress meter, and unique Zxornatoe wordmark treatment; Projects/Labs has an archive shell with explicit close behavior; Featured has a terminal/route-stop metaphor and a step-out interaction; Visuals has a physical media wall; and Contact closes the route back to the opening mark. Each chapter must have its own transition mask and at least one interaction that is not reused verbatim elsewhere.

## Pass 1 result

The first parity pass closes several P0 hero gaps: the latest build now has a changing top ribbon, a handwritten Zxornatoe wordmark treatment, a lower-left progress meter, a sound state control, an intro skip affordance, a more organic silhouette field, scene-aware side rail copy, an archive hint, and a Featured “STEP OUT / INSPECT LABS” action. The desktop and mobile captures remain readable. Live regression confirmed the Featured signal browser rewrites state, and direct activation of Step Out settles at the Labs target with `scrollY` aligned to the Labs section and the transition class cleared. The remaining visible gap is that the reference still has a more photographic silhouette/image field and stronger chapter-level compositional changes than the current CSS-generated field.
