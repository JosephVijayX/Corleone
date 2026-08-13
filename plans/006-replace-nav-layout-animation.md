# 006 — Replace cinematic navigation layout animation

- **Status**: DONE
- **Commit**: d04268e
- **Severity**: MEDIUM
- **Category**: Performance / Easing & duration
- **Estimated scope**: 1 file, small

## Problem

The cinematic navigation warp animates `width`, `padding`, and `borderWidth` on the fixed navigation shell. These properties trigger layout and paint during every navigation jump even though the intended effect is a temporary expansion of the chrome. The current excerpt also makes the nav shell’s physical scale depend on layout rather than compositor-only transforms.

```tsx
// client/src/pages/Home.tsx:464–473 — current
timeline.to(".signal-nav-item", { autoAlpha: 0, duration: .2, ease: "power2.out" }, 0)
  .to(".signal-nav-shell", { width: "110vw", padding: "30px 0", borderWidth: "8px", borderColor: "#ede5d7", duration: .6, ease: "power4.inOut" }, .1)
...
  .to(".signal-nav-shell", { width: "auto", padding: "4px", borderWidth: "1px", borderColor: "#221f1b", duration: .7, ease: "expo.out" }, 2)
```

## Target

Keep the nav shell’s layout dimensions stable and animate only compositor-friendly transforms for the warp expansion. Replace the first `.signal-nav-shell` tween with:

```tsx
.to(".signal-nav-shell", { scaleX: 1.12, scaleY: 1.35, y: 4, duration: .6, ease: "power4.inOut" }, .1)
```

Replace the return tween with:

```tsx
.to(".signal-nav-shell", { scaleX: 1, scaleY: 1, y: 0, duration: .7, ease: "expo.out" }, 2)
```

Keep the existing opacity, line, stage, and route timing unchanged. Preserve the shell’s existing `translateX(-50%)` centering by allowing GSAP to compose scale and translate rather than overwriting the full transform string.

## Repo conventions to follow

The project already uses GSAP timelines with `power4.inOut` for cinematic movement and `expo.out` for settling in `Home.tsx`. Keep those exact curves and the existing timeline positions. Do not add CSS transitions for this one-off navigation warp.

## Steps

1. Replace only the opening nav-shell tween’s `width`, `padding`, `borderWidth`, and `borderColor` properties with the target `scaleX`, `scaleY`, and `y` values.
2. Replace only the closing nav-shell tween with the target transform values.
3. Confirm the fixed shell remains visually centered at desktop and does not affect mobile, where the shell is hidden.

## Boundaries

- Do not change the route target calculation or Lenis/native handoff.
- Do not change the signal-stage warp, tick sweep, or jump label.
- Do not add dependencies.

## Verification

- **Mechanical**: run `pnpm check` and `pnpm build`; grep the production source to confirm no `width: "110vw"`, `padding: "30px 0"`, or `borderWidth: "8px"` remains in the nav timeline.
- **Feel check**: trigger Home → Signal and Signal → Labs at normal speed and at 10% playback. Confirm the nav grows as a surface without reflowing, stays centered, and settles without a layout snap.
- **Done when**: the visual warp remains coherent and the nav-shell animation changes only transform/opacity during the jump.
