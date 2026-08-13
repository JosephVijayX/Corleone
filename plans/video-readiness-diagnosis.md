# Video Readiness Diagnosis

Before the latest fix, the live video reported `readyState: 4` and `duration: 4.666667`, but `paused: true` because unmuted autoplay was blocked. The CSS revealed the first frame as soon as the file was ready, so the user could see a still frame while the portfolio remained locked.

The revised gate separates **buffer readiness** from **actual playback**: `onCanPlayThrough`/`onLoadedData` may request playback, but the video remains opacity `0` until `onPlay` sets the `is-playing` class. The time-based safety exit and media-error reveal were removed, so slow or blocked loading cannot expose the site early.
