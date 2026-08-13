# Textless Sound-On Intro Verification

The updated `VideoIntro` markup contains only the video element and a non-textual scrim. The previous opening label, duration label, Sound button, Skip button, and playback fallback text were removed. The video no longer has the `muted` attribute, so playback is requested with sound enabled by default; a pointer interaction on the invisible overlay retries playback if a browser blocks unmuted autoplay. The existing 7-second safety exit prevents the intro from trapping the visitor when autoplay is blocked.
