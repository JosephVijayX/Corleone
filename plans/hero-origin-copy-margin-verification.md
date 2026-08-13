# Hero and Origin Copy Margin Adjustment

## Live finding

The requested copy was not overflowing because of the Hero or Origin text blocks. The Labs header was inheriting the legacy `#work > div:first-child` rule, which applied negative left and right margins at desktop widths. The live computed header bounds were `left: 0`, `width: 1100px`, while the Stamp Board stage itself was correctly centered.

## Fix applied

The production Stamp Board override now sets the header margin as `0 auto clamp(1.5rem, 3vw, 3rem) !important`, with a matching `0 auto 1.25rem !important` mobile rule. This preserves the section's existing responsive padding and keeps the header inside the page content box.

## Verification snapshot

At a 1280px viewport, the Labs section content box is `left: 0` to `right: 1265px`, and the Labs header is `left: 82.5px` to `right: 1182.5px`. The overflow check returns `false`.
