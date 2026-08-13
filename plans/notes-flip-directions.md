# Notes Flip-Card Directions

## Scope

Prototype one isolated component: the four lower Notes cards. Each card keeps its existing front-side identity and reveals a fuller back-side work statement on hover or focus. Production remains untouched until the user selects a direction.

## Direction 1 — Paper File

**Axis:** tactile material and physical card-turn.

The cards behave like clipped paper files: the back face uses a slightly darker paper tone, an index number, a compact “field note” label, and dense evidence copy. The flip is a restrained 3D rotateY turn with the card’s existing offset and color preserved. This is the closest fit to the current Stamp Board/Labs language.

## Direction 2 — Signal Terminal

**Axis:** information density and terminal readout.

The cards become small signal consoles. The back face uses a dark ink field, blue status markers, a short command-like heading, and a readable paragraph. The flip is a fast rotateY transition with a small signal-line reveal, making the content feel like a discovered system record rather than a decorative poster.

## Direction 3 — Split Plate

**Axis:** editorial composition and asymmetric reveal.

The cards turn into two-tone plates: the back face preserves one bold metric or phrase on one side and places the longer statement in a narrow editorial column on the other. The flip is paired with a subtle translateZ/rotateZ shift so the card feels physically layered, while the text itself remains still and readable once revealed.

## Content used in every direction

1. **Telegram:** “I’m `Notorious` on Telegram by VibeCoders — a hacker reputation built from curiosity, pressure-testing ideas, and showing the trail instead of pretending the work is magic.”
2. **Quantized LLMs:** “I spent months studying the cores of quantized LLMs to make them friendlier for my work. Now I’m turning that understanding into agentic workflows that actually help me move.”
3. **Technology window:** “I keep watching for the next technology window — the moment a new system becomes reachable enough to test, understand, and push past the obvious. Vulnerability lover. Curiosity first.”
4. **Continuing research:** “Still researching the next platforms, the next interfaces, and the next strange opening. The work stays unfinished on purpose.”

## Motion contract

The flip exists for **state indication and explanation**: hover/focus reveals the card’s missing context. It is gated to fine pointers for hover and remains keyboard accessible with focus-visible styles; touch devices use tap/focus without relying on hover. CSS transitions use the existing strong ease-out token and remain under 300ms. Reduced motion removes the 3D rotation and switches the content instantly or with a restrained opacity change.
