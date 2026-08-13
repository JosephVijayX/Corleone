# 011 — Build the Labs proof workbench

- **Status**: DONE
- **Commit**: e0d24df
- **Severity**: HIGH
- **Category**: Cohesion & tokens / Missed opportunities
- **Estimated scope**: 3 files, one scene rewrite, one responsive motion pass

## Problem

The previous Labs treatment still read as a project archive list. Even after the clay palette correction, the repeated row structure made the chapter feel like a dashboard instead of an authored scene. Hero and Origin use asymmetrical editorial columns, oversized Bodoni headlines, blue route marks, clay paper space, and physical offset instruments. Labs needed a different composition rather than another card-row refinement.

## Target

Labs should become a **proof workbench** with three distinct visual roles:

- A large editorial headline and short personal framing at the top.
- A dominant electric-blue active proof stage that starts with `open the next question` and replaces itself with the selected project's title, status, description, tags, year, and evidence controls.
- A compact cream index rail for switching among the three real projects and a narrow black practice-metrics margin for the learning principles.

The selected index item must receive a blue/orange active state, and the active proof must change using a short transform/opacity/clip-path entrance. The layout must stack as a readable sequence at 390px. The project data must remain the existing real project data; no testimonials, ratings, or invented outcomes may be added.

## Repo conventions to follow

- Use the existing Signal/Clay/Blue tokens: `#e5dccd` paper, `#221f1b` ink, `#3e4cff` active blue, `#ed8b5a` signal orange, and `#f4efe5` cream.
- Keep Bodoni Moda for the editorial headline, Barlow Condensed for the active proof title and numbered display, and IBM Plex Mono for system labels and index metadata.
- Keep the existing React `activeProject` and `activeMedia` state, GSAP/ScrollTrigger runtime, and global reduced-motion handling.
- Gate hover-only transforms under `@media (hover: hover) and (pointer: fine)`; keep keyboard focus feedback available to all pointers.

## Steps

1. In `client/src/pages/Home.tsx`, replace the inline archive-row composition with `LabsScene` workbench markup: `labs-field__active`, `labs-field__index`, and `labs-field__margin`.
2. Keep the selected project derived from `projects[activeProject]`, render a neutral idle state when no project is selected, and route evidence buttons through the existing `onMedia` callback.
3. In `client/src/index.css`, add the workbench grid and material states. Use the blue proof stage at `min-height: 470px`, the index rail with a `5.4rem` row rhythm, and the black margin column with practice metrics. Use `@keyframes labs-field-active-in` only for the occasional active-stage replacement, from `opacity: .25`, `translate3d(18px, 12px, 0)`, `rotate(-2.5deg)`, and `clip-path: inset(0 0 100% 0)` to `opacity: 1`, `translate3d(0, 0, 0)`, `rotate(-1.4deg)`, and `clip-path: inset(0)` with `var(--ease-signal)`.
4. Define project-specific contrast states: LAB.01 blue/cream, LAB.02 orange/ink, and LAB.03 ink/cream. Keep evidence controls on the active stage and preserve the explicit `close field note ×` action.
5. Add responsive rules that collapse `.labs-field__board` to one column, preserve readable headline sizing, and keep the active stage, index, and metrics as a vertical narrative at 390px. Disable active-stage movement under `prefers-reduced-motion: reduce` while retaining content/state changes.

## Boundaries

- Do not change Hero, Origin, Featured, Notes, Contact, or the shared router.
- Do not remove evidence drawer behavior, `Escape` close handling, or project-specific data.
- Do not add a new font dependency or motion library.
- Do not use random motion or fabricate project proof.

## Verification

- **Mechanical**: run `pnpm check` and `pnpm build`; both must pass.
- **Feel check**: open `#work`, confirm the idle blue stage reads as a question, select LAB.01, LAB.02, and LAB.03, and confirm the stage changes without the whole scene behaving like a row list. Play the active-stage entrance at 10% speed and confirm it materializes from the lower-right without a scale-zero pop.
- **Accessibility**: use keyboard focus on an index button, confirm visible focus, select a project, and activate `close field note ×`; toggle reduced motion and confirm movement is removed while the selected content still changes.
- **Responsive**: verify desktop and `390 × 844`; the stage, index rail, and practice metrics must remain readable as a vertical sequence.
- **Done when**: Labs visually belongs with the authored Hero/Origin chapters, offers a new composition rather than a list refinement, preserves evidence interactions, and has no current browser console errors.
