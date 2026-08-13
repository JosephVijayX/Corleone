# 004 — Move hero progress animation to transform

- **Status**: DEFERRED
- **Commit**: 19987d7
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 2 files, 8–14 lines

## Problem

The hero meter updates an inline `width` on every progress update and transitions that width. Width changes participate in layout and are unnecessary for a one-dimensional progress fill.

Locations: `client/src/pages/Home.tsx:463` and `client/src/index.css:219`.

```tsx
<span className="hero-meter__line"><i style={{ width: `${progress}%` }} /></span>
```

```css
.hero-meter__line i { display: block; height: 100%; background: #f4efe5; transition: width .45s var(--ease-signal); }
```

## Target

Keep the fill’s layout box fixed and animate only its compositor transform from the left edge.

```tsx
<span className="hero-meter__line"><i style={{ transform: `scaleX(${progress / 100})` }} /></span>
```

```css
.hero-meter__line { overflow: hidden; }
.hero-meter__line i {
  display: block;
  height: 100%;
  background: #f4efe5;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform .18s var(--ease-signal);
}
```

## Repo conventions to follow

The project already uses direct transforms for pointer fields, scene parallax, and route motion. Keep the existing `var(--ease-signal)` token, and do not create a CSS custom property on the parent to drive the child transform.

## Steps

1. Change the hero meter JSX at `client/src/pages/Home.tsx:463` from an inline width style to `transform: scaleX(progress / 100)`.
2. Change `.hero-meter__line` at `client/src/index.css:218` to include `overflow: hidden`.
3. Replace the `.hero-meter__line i` width transition with the transform-only declaration above.
4. Confirm the reduced-motion global rule still clamps the transition duration without removing the static fill state.

## Boundaries

- Do not change progress calculation or scroll listeners.
- Do not animate the line’s parent width or padding.
- Do not change the visual color or meter dimensions.

## Verification

- **Mechanical**: Run `pnpm check` and `pnpm build`; grep for `hero-meter__line i` and confirm it no longer transitions `width`.
- **Feel check**: Scroll slowly and quickly through the page. The fill should track progress without a visible layout shift. In DevTools Performance, confirm no repeated layout work is attributed to the progress fill. Under reduced motion, confirm the fill still reflects the current percentage with no transform travel.
- **Done when**: The hero meter uses transform-only motion, preserves its visual rhythm, and does not reflow surrounding content.
