# Browser Verification Notes

The sandbox browser navigation resets to its default desktop viewport, so a preliminary probe after navigation reported `1280 × 1100` rather than mobile. The final coarse-pointer check is therefore being run in the separate Playwright session after an explicit `390 × 844` resize and fresh navigation, which avoids treating a desktop result as mobile evidence.
