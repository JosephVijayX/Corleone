# Zxornatoe — Signal Portfolio

This repository contains the current Zxornatoe portfolio: a React/Vite experience with GSAP, Lenis, a textless two-play intro, cinematic chapter navigation, Labs proof interactions, Signal route scenes, Notes flip cards, and Telegram contact links.

## Local development

Use Node.js 22 or newer and pnpm 10. Install dependencies, then start Vite:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The project uses `pnpm check` for TypeScript validation and `pnpm build` for the production build.

## Production build

The Vite client is emitted to `dist/public`. The repository includes `vercel.json` so Vercel serves that directory and rewrites client-side routes to `index.html`.

```bash
pnpm check
pnpm build
pnpm start
```

The intro video is committed at `client/public/VideoProject6.mp4` and is referenced as `/VideoProject6.mp4`, so the GitHub copy does not depend on Manus-managed storage.
