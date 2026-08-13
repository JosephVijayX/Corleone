# Telegram Animation Mobile Verification

The final Playwright run at `390 × 844` confirms the repaired object behaves correctly on mobile. At Home, the signal sits at approximately `x:-2, y:-3`; a 260 ms idle sample changed the `telegram-flight` transform and the four `telegram-trail` dash/opacity states. A `55%` scroll scrub moved the parent to approximately `x:132, y:399` with a different parent matrix, while the child animations remained active. The object stayed `pointer-events:none`, and the mobile Route Sheet panel count remained `1`.

The session reported `0` console errors and `1` warning. The warning is the existing Firefox scroll-linked positioning notice from the Lenis/ScrollTrigger architecture, not a signal animation exception.
