# Scroll-Controlled Lottie Runtime Probe

The corrected live runtime now holds the Lottie plane on the same generated SVG transform across a 600 ms idle interval at Home. A `55%` scroll scrub changes the Lottie child frame transform and the parent route matrix, while a full 2.8-second reverse-scroll settle returns both to the exact Home matrices. The Home sample is approximately `x:129, y:264`; the mid-document sample is approximately `x:472, y:532`. The Lottie root reports `data-lottie-ready="true"` throughout.
