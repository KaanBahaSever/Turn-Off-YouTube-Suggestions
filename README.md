# Turn-Off-YouTube-Suggestions-End-Of-The-Video

A simple JavaScript code snippet to disable YouTube's video suggestions at the end of videos.

## Usage

To use this code, follow these steps:

1. Open your web browser and navigate to YouTube.
2. Play any video.
3. Open the browser's developer console:
   - **Chrome:** Press `Ctrl + Shift + J` (Windows/Linux) or `Cmd + Option + J` (Mac).
   - **Firefox:** Press `Ctrl + Shift + K` (Windows/Linux) or `Cmd + Option + K` (Mac).
4. Copy and paste the following JavaScript code into the console and press `Enter`:

   ```javascript
   document.querySelectorAll(".ytp-ce-element").forEach(item => item.remove());
