# Video Intro Live Verification

The live homepage now shows the managed MP4 in a fixed fullscreen intro overlay before the portfolio. The video is rendered at the supplied 16:9 ratio with `object-fit: contain`, preserving the centered character and black cinematic bands instead of cropping on portrait screens. The overlay exposes `SOUND / OFF` and `SKIP INTRO →` controls.

Clicking `SKIP INTRO →` removed the video layer and returned the visible page to the existing Zxornatoe boot/hero sequence. The portfolio header, Hero status wall, and navigation remained intact, confirming the handoff path and scroll-lock release.

Reloading the homepage and waiting through the full `4.666667s` duration removed the intro overlay automatically. The visible state then showed the existing portfolio header, Hero, navigation, and scroll content, confirming the natural `ended` path works independently from the skip path.
