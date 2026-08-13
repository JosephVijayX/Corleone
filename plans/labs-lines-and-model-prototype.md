# Labs Lines and Visual Model Prototype

## Scope findings

The production Labs section is rendered by `LabsScene` at `#work` in `Home.tsx`. Its visible line sources include the legacy `#work` first-child rule, the Stamp Board SVG route, the `stamp-labs__footer` border treatment, and card/evidence rules. Older `.labs-scene`, `.labs-wall`, and `.labs-record` rules remain in the stylesheet but are not used by the current Stamp Board markup.

The router currently exposes only `/` and `/404`, so the visual model will be hosted on a new isolated prototype route and will not alter production Labs until the user selects a direction.
