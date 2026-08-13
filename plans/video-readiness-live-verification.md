# Video Readiness Live Verification

At the live preview after reload, the video reported `readyState: 4`, `duration: 4.666667`, `muted: false`, and `paused: true` under the browser’s unmuted autoplay policy. The revised computed opacity was `0`, the fullscreen media box remained `1280×1100` in the preview viewport, the boot screen remained present, and `video-intro-active` kept scroll locked. This confirms the first frame is no longer exposed while playback is paused or blocked.
