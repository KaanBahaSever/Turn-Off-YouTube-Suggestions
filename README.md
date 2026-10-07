<p align="center">
  <img src="extension/icons/icon128.png" alt="Turn Off YouTube Suggestions icon" width="96">
</p>

<h1 align="center">Turn Off YouTube Suggestions</h1>

<p align="center">
  A tiny Chrome extension that removes the suggested-video cards covering the end of YouTube videos, with one click or automatically.
</p>

---

## Why?

In the last seconds of many YouTube videos, end-screen cards ("suggested videos", "subscribe", playlists, etc.) pop up on top of the player and hide what's actually happening on screen. This extension gets rid of them so you can watch the ending in peace.

## Features

- **One button.** Click the extension icon, press **Remove suggestions**, done.
- **Optional auto mode.** Turn on **Remove automatically** and suggestions are hidden on every video, including when you switch to a new one. It's off by default.
- **Small footprint.** The extension only runs on YouTube and only asks for `activeTab`, `scripting` and `storage` (to remember the auto setting).
- **No tracking, no network requests, no dependencies.** Just plain JavaScript.

## Installation

The extension is not on the Chrome Web Store, so you load it manually. It takes about a minute.

1. **Download the code**
   - Click **Code → Download ZIP** on this page and extract it, **or**
   - clone the repository:
     ```bash
     git clone https://github.com/KaanBahaSever/Turn-Off-YouTube-Suggestions.git
     ```
2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the **`extension`** folder inside the downloaded project.
5. *(Optional)* Click the puzzle-piece icon in the toolbar and pin **Turn Off YouTube Suggestions** so the button is always visible.

> Works in any Chromium-based browser that supports Manifest V3 extensions: Chrome, Edge, Brave, Opera, Vivaldi, etc.

## Usage

### One click

1. Open any video on YouTube.
2. Click the extension icon in the toolbar.
3. Press **Remove suggestions**.

The popup tells you how many suggestion cards were removed. This only affects the **current video**, so press the button again after switching to another video, or use auto mode.

### Automatic

1. Click the extension icon.
2. Turn on **Remove automatically**.

From now on, end-screen suggestions never show up on any YouTube video, including videos you open afterwards. The setting is saved and synced with your Chrome profile. Turn the switch off to bring the suggestions back; this takes effect immediately in open tabs.

## How it works

`.ytp-ce-element` is the class YouTube's player uses for end-screen elements.

- **Button:** the extension injects this one-liner into the active YouTube tab:

  ```javascript
  document.querySelectorAll(".ytp-ce-element").forEach(item => item.remove());
  ```

- **Auto mode:** a small content script on YouTube pages adds this stylesheet while the setting is on:

  ```css
  .ytp-ce-element { display: none !important; }
  ```

  YouTube switches videos without reloading the page, so the stylesheet stays in place and keeps hiding suggestions on every video you open.

### Without the extension

Prefer not to install anything? You can still run the snippet by hand:

1. Open a YouTube video.
2. Open the developer console:
   - **Chrome / Edge:** `Ctrl + Shift + J` (Windows/Linux) or `Cmd + Option + J` (Mac)
   - **Firefox:** `Ctrl + Shift + K` (Windows/Linux) or `Cmd + Option + K` (Mac)
3. Paste the JavaScript one-liner above and press `Enter`.

## Project structure

```
extension/
├── manifest.json   # Extension manifest (Manifest V3)
├── popup.html      # The popup: button + "Remove automatically" switch
├── popup.js        # Button and switch logic
├── content.js      # Hides suggestions on YouTube while auto mode is on
└── icons/          # Toolbar and extension-page icons (16, 48, 128 px)
```

## Troubleshooting

| Problem | Fix |
| --- | --- |
| "Open a YouTube video first." | The active tab isn't on `youtube.com`. Switch to a YouTube tab and try again. |
| "No end-screen suggestions found." | That video has no end-screen cards, or YouTube hasn't loaded them yet. Let the video play for a moment and press the button again. |
| Auto mode doesn't work in a tab | Tabs opened before installing (or updating) the extension don't have the content script yet. Reload the tab once. |
| It stopped working | YouTube may have renamed the `.ytp-ce-element` class. Please [open an issue](https://github.com/KaanBahaSever/Turn-Off-YouTube-Suggestions/issues). |

## Contributing

Issues and pull requests are welcome. To test changes, edit the files in `extension/` and press the reload icon on the extension's card in `chrome://extensions`.

## License

[MIT](LICENSE)
