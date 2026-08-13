# Video Intro Asset Notes

The supplied `VideoProject3.mp4` is an H.264/AAC video at `1280×720`, `30 fps`, with a duration of `4.666667 seconds`. It has both video and audio streams, so autoplay must begin muted for browser compatibility and may expose an optional user-initiated sound toggle.

Representative start and middle frames show the character and primary visual action centered horizontally. The video uses black letterbox bands within its 16:9 frame, so the intro should use `object-fit: contain` rather than `cover` to avoid cropping the focal character on portrait screens; the viewport background can match black to preserve the cinematic frame.
