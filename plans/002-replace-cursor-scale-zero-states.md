# 002 — Replace cursor scale-zero states

- **Status**: DONE
- **Commit**: 19987d7
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 1 file, 6–10 lines

## Problem

The cursor field uses explicit `scale: 0` on hover. This makes the core and trailing points disappear from nothing and restart on mouseout. The cursor is a high-frequency interaction, so the effect should remain subtle and interruptible rather than teleporting between invisible and visible states.

Location: `client/src/pages/Home.tsx:231-237`.

```tsx
const onOver = (event: MouseEvent) => {
  const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [data-cursor]");
  if (!target) return;
  gsap.to(core, { scale: 0, duration: .2, overwrite: true });
  gsap.to(points[0]?.el, { width: 46, height: 46, backgroundColor: "transparent", borderWidth: 2, duration: .4, ease: "back.out(2)", overwrite: true });
  points.slice(1).forEach((point) => gsap.to(point.el, { scale: 0, opacity: 0, duration: .2, overwrite: true }));
};
```

## Target

Keep the cursor readable as a restrained focus ring and leave the trailing dots faintly present. Use nonzero scales and opacity transitions that can retarget from the current state.

```tsx
gsap.to(core, { scale: .72, opacity: .35, duration: .16, ease: "power2.out", overwrite: true });
gsap.to(points[0]?.el, { width: 46, height: 46, backgroundColor: "transparent", borderWidth: 2, duration: .24, ease: "power2.out", overwrite: true });
points.slice(1).forEach((point) => gsap.to(point.el, { scale: .78, opacity: .2, duration: .16, ease: "power2.out", overwrite: true }));
```

On mouseout, keep the existing restoration values and use the existing overwrite behavior so rapid enter/leave events reverse cleanly.

## Repo conventions to follow

The cursor effect already uses GSAP tweens with `overwrite: true` at `client/src/pages/Home.tsx:219-242`. Preserve that interruption strategy. The existing normal-state point scale is `1`, so the hover state should remain a nonzero transform between that value and the restored state.

## Steps

1. Edit `client/src/pages/Home.tsx:234` and replace `scale: 0` for the cursor core with `scale: .72` and `opacity: .35`.
2. Edit `client/src/pages/Home.tsx:236` and replace the trailing point `scale: 0, opacity: 0` with `scale: .78, opacity: .2`, adding `ease: "power2.out"` and using a `.16` second duration.
3. Keep the `onOut` restoration loop intact, except ensure the first point’s border and background restoration remains unchanged.

## Boundaries

- Do not change the cursor trail geometry or pointer event listeners.
- Do not use `scale(0)` anywhere in the cursor interaction.
- Do not add a cursor animation for coarse pointers.
- Do not modify the reduced-motion guard from Plan 001.

## Verification

- **Mechanical**: Run `pnpm check` and `pnpm build`.
- **Feel check**: At normal speed, move rapidly across several links and buttons. Confirm the cursor never vanishes, never flashes from zero scale, and reverses without a snap when the pointer leaves mid-tween. Test at 10% playback speed in DevTools and inspect that all transforms begin from nonzero values.
- **Done when**: `grep -R "scale: 0" client/src/pages/Home.tsx` returns no cursor-state match, and hover motion remains legible but quiet.
