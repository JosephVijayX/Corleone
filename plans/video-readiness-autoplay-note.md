# Video Readiness Autoplay Note

The controlled live playback test returned `NotAllowedError` for unmuted `video.play()` without prior document interaction. The video remained `paused: true`, `muted: false`, and the intro remained black and scroll-locked. This is the expected browser autoplay policy behavior for sound-enabled media; a real pointer/tap on the invisible intro layer retries playback. Crucially, no timeout or media-error path now reveals the main site before playback completes.
