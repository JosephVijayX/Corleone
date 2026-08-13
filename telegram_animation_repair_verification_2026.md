# Telegram Animation Repair Verification

The live desktop probe now reports independent descendant motion: the plane uses `telegram-flight`, the orbit uses `telegram-orbit`, and four trail segments use `telegram-trail` with staggered delays of `0s`, `-0.45s`, `-0.9s`, and `-1.12s`. A 260 ms idle sample changed the plane transform, trail dash offset, and trail opacity while the parent transform stayed fixed; all layers remained `pointer-events:none`.

A settled scroll probe confirmed that the parent transform changes from Home to the mid-document sample and returns to the exact Home matrix after a full Lenis settle window. This keeps GSAP/ScrollTrigger responsible for macro travel and CSS responsible for local flight/thrust/trail animation without a transform ownership conflict.
