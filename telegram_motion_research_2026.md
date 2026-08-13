# Telegram Signal Motion Research

## Supplied reference

The user supplied the [Free Airplane Lottie Animation](https://lottiefiles.com/free-animation/airplane-lottie-animation-oFtu1GyIfl) as a motion reference. The page identifies it as an airplane-flying animation by SM Rony, 1.5 KB, 60 FPS, 700 × 500 resolution, 181 frames, two layers, and a three-second duration. It is presented as using the Lottie Simple License and exposes a dotLottie Player 2.7.12 embed path.

## Product decision

The animation is a useful **motion reference**, but it is not a Telegram mark and its visual language is more paper-airplane than Zxornatoe signal-object. The production object should therefore be original: a small blue signal capsule with a Telegram-inspired paper-plane silhouette, clay edge highlight, orbital ring, and a short contrail. The object will travel through the page using GSAP/ScrollTrigger transforms rather than relying on an externally hosted player for the scroll-critical choreography.

The supplied dotLottie web component can remain a fallback for a later, non-critical decorative loop if the user explicitly wants that asset embedded. For the core scroll handoff, external embed loading, live asset updates, and player-specific progress control would add unnecessary reliability and accessibility risk. The primary implementation should stay self-contained, use transform/opacity only during travel, respect reduced motion, and preserve the existing Lenis/ScrollTrigger architecture.

## Initial travel contract

The signal object begins beside the Zxornatoe wordmark, lifts into a shallow 3D orbit as the user leaves Home, docks at Origin, crosses the Labs index as a fast relay, settles into the Featured Signal console, skims the Notes gallery, and returns toward the Contact closure. Reverse scrolling must retrace the same route instead of jumping between unrelated positions. At coarse mobile widths, the object becomes a smaller fixed corner beacon and must never cover the Route Sheet panel or primary controls.

## Prototype comparison

Orbit Relay is the smoothest continuous path and best demonstrates spatial depth, but its repeated orbital wobble risks feeling decorative rather than editorial. Pinball Docks creates the strongest narrative grammar: the signal visibly arrives, rebounds, and docks at named chapters. Paper Flight remains the likely strongest wide-screen flourish because its long arc echoes the supplied airplane reference without using the external asset. The next comparison should focus on Paper Flight’s reverse-scroll readability before selecting a production direction.

Paper Flight’s 68% scrub state reads clearly: the object floats between LABS and SIGNAL on a long editorial arc, with enough scale and rotation change to feel spatial without becoming a game UI. Its pale clay-to-peach field creates the best contrast with the blue signal object. The main production risk is that a single long arc can feel detached from the existing ink-route choreography, so the final version should borrow Paper Flight’s arc while retaining named chapter docks.

Pinball Docks at 68% confirms the signal can read as an active chapter courier: its scale increases toward the SIGNAL dock, the rebound arc is legible, and the gradient changes reinforce the existing clay/blue contrast. The keyboard switch from Paper Flight to Pinball Docks preserved the isolated picker contract and reset the scroll to the new variant’s origin. The final direction should combine Paper Flight’s long editorial arc with Pinball Docks’ named-dock readability.

The 390px captures keep all three variants legible, with the picker remaining touch-safe at the bottom edge and the object visible near the first HOME dock. A clean isolated session reports no console output after variant switching and scroll scrubbing. The selected production direction is **Paper Flight with named chapter docks**: a long arc for the alive-site feeling, with dock labels and local scale changes to keep the route legible.

The first production Home inspection passed the boot-to-hero scene and preserved the existing ink route, hero wordmark, top ribbon, and fixed nav. The signal object is decorative and does not appear in the browser’s interactive element list, as intended; the next live check must inspect its computed transform and opacity directly at Home and after a chapter jump.

The first computed-style check after the viewport-pixel patch still returned the base transform matrix with a bounding rect at approximately `x:-2, y:-4`, so the fixed object is not yet visibly traveling at Home. This is a HIGH audit finding: the object must use an explicit transform string or a GSAP-compatible numeric origin that survives the existing CSS transform before any chapter handoff can be accepted.

The follow-up check confirms the core travel now works: at 45% document progress the object computed to a translated matrix with a viewport position around `x:625, y:384`; returning toward Home under Lenis smoothing produced an intermediate position around `x:353, y:271` rather than an origin snap. The remaining issue is only the expected smooth-scroll settle window at the exact top boundary, not a failed travel timeline.

The final full-page captures preserve the clay/blue chapter rhythm on desktop and mobile. The Signal chapter remains visibly distinct, the Notes and Contact scenes keep their original hierarchy, and the fixed mobile Route Sheet layer is not displaced by the new object. The object is intentionally subtle in full-page captures because it is one fixed layer sampled at capture time; the live computed-style checks are the authoritative travel verification.

The final Playwright verification at a real `390 × 844` viewport confirms the production handoff: Home sampled at approximately `x:-2, y:-3` with `pointer-events:none`, while a `55%` document scrub sampled the same object at approximately `x:132, y:399`, with a distinct transform matrix and `opacity:0.92`. The mobile Route Sheet panel count remained `1`. The session reported `0` errors and `1` warning; the warning is Firefox's expected scroll-linked positioning notice for the Lenis/ScrollTrigger architecture, not an application exception.

With `prefers-reduced-motion: reduce` emulated, the object held the same computed transform and opacity before and after a `55%` scroll scrub, while remaining non-interactive and leaving the Route Sheet panel present. The reduced-motion reload returned `0` console errors and `0` warnings.

The final local validation completed with `pnpm check` and `pnpm build`. TypeScript emitted no errors; Vite and the server bundle completed successfully. The build still reports the pre-existing large-client-chunk advisory, which is a performance follow-up rather than a Telegram signal regression.

## References

1. [LottieFiles — Free Airplane Lottie Animation](https://lottiefiles.com/free-animation/airplane-lottie-animation-oFtu1GyIfl)
2. [LottieFiles dotLottie Web Player Documentation](https://developers.lottiefiles.com/docs/dotlottie-player/dotlottie-web/)
