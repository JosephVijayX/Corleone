# Uploaded Lottie Scroll Probe

The live player reports `data-lottie-ready="true"` and its generated SVG child transform changes over a 260 ms idle interval, proving the uploaded airplane itself is advancing frames. During a `55%` scroll scrub, the existing parent matrix changes independently while the Lottie child continues to animate. The first reverse sample was taken before the Lenis handoff fully converged and therefore did not return the exact Home parent matrix; this is a test-settle timing issue to re-run with a longer settle window, not evidence of a parent/child transform conflict.
