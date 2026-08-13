# Notes Flip Stable Access Verification

The dev server had accumulated a long HMR history and prior lifecycle exits. After a clean managed restart, the exact shared URL `/prototype/notes-flip?v=1` loaded successfully, and the picker switched to `/prototype/notes-flip?v=2` without a 404. The isolated route remains registered in `App.tsx`, and production Notes cards were not modified.

