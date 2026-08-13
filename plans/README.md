# Motion Audit Plans

These plans were written against commit `19987d7` after the Signal Relay prototype was promoted into the production Featured chapter. They are ordered by leverage and should be executed in sequence. The plans are intentionally self-contained so the executor can verify each current excerpt before editing.

| Plan | Title | Severity | Status | Dependency |
|---|---|---:|---|---|
| 001 | Respect reduced motion in the cursor field | HIGH | DONE | None |
| 002 | Replace cursor scale-zero states | MEDIUM | DONE | 001 |
| 003 | Make Featured route changes immediate and interruptible | HIGH | DONE | None |
| 004 | Move hero progress animation to transform | MEDIUM | DEFERRED | None |

## Recommended execution order

Execute **001** first because the cursor field is decorative and should not continue running for users who request reduced motion. Execute **002** next to remove the explicit `scale(0)` states from the same cursor system. Execute **003** independently after the production Featured promotion because the old `.featured-copy` and ink-path selectors no longer describe the live markup. Execute **004** last as a focused compositor improvement for the hero progress meter.

After each executed plan, run `pnpm check` and `pnpm build`, then verify the relevant interaction in the browser at normal speed and at 10% playback speed. Plans 001–003 are complete and were confirmed with a clean build, clean console, and live Featured interaction checks. Plan 004 is deferred because the meter is a single isolated fill with no layout dependents; changing its width does not produce a user-visible reflow and would require a larger JSX line rewrite for marginal benefit. It remains a documented follow-up rather than a high-impact blocker.
