# Live Telegram Comparison Notes

The current production page was inspected at the live dev URL. A 260 ms idle probe of `[data-telegram-signal]` returned identical before/after values: the plane's computed `animation-name` is `none`, its computed transform is `none`, the trail's computed `animation-name` is `none`, and its stroke dash offset is `0px`. The parent transform is only the current scroll-derived matrix. This confirms the user's first bug: the object is not animated while it sits or travels between scroll samples.

The current production object is therefore a static SVG child inside a scroll-positioned parent. The next implementation must add a local, continuous animation layer for the plane and trailing signal lines while keeping the parent transform as the macro scroll route.
