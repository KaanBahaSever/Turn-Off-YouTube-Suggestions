<p align="center">
  <img src="extension/icons/icon128.png" alt="Turn Off YouTube Suggestions icon" width="96">
</p>

<h1 align="center">Turn Off YouTube Suggestions</h1>

<p align="center">
  A tiny Chrome extension that removes the suggested-video cards covering the end of YouTube videos with one click.
</p>

---

## Why?

In the last seconds of many YouTube videos, end-screen cards ("suggested videos", "subscribe", playlists, etc.) pop up on top of the player and hide what's actually happening on screen. This extension gets rid of them so you can watch the ending in peace.

## Features

- **One button.** Click the extension icon, press **Remove suggestions**, done.
- **No background activity.** Nothing runs until you click the button.
- **Minimal permissions.** Only `activeTab` and `scripting`. The extension cannot see your browsing history or any other tab.
- **No tracking, no network requests, no dependencies.** Just ~40 lines of plain JavaScript.

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

1. Open any video on YouTube.
2. Click the extension icon in the toolbar.
3. Press **Remove suggestions**.

The popup tells you how many suggestion cards were removed. The cards are removed for the **current video only**, so press the button again after switching to another video.

## How it works

When you press the button, the extension injects this one-liner into the active YouTube tab:

```javascript
document.querySelectorAll(".ytp-ce-element").forEach(item => item.remove());
```

`.ytp-ce-element` is the class YouTube's player uses for end-screen elements, so removing those elements removes the overlay.

### Without the extension

Prefer not to install anything? You can still run the snippet by hand:

1. Open a YouTube video.
2. Open the developer console:
   - **Chrome / Edge:** `Ctrl + Shift + J` (Windows/Linux) or `Cmd + Option + J` (Mac)
   - **Firefox:** `Ctrl + Shift + K` (Windows/Linux) or `Cmd + Option + K` (Mac)
3. Paste the snippet above and press `Enter`.

## Project structure

```
extension/
├── manifest.json   # Extension manifest (Manifest V3)
├── popup.html      # The popup with the single button
├── popup.js        # Injects the removal script into the active tab
└── icons/          # Toolbar and extension-page icons (16, 48, 128 px)
```

## Troubleshooting

| Problem | Fix |
| --- | --- |
| "Open a YouTube video first." | The active tab isn't on `youtube.com`. Switch to a YouTube tab and try again. |
| "No end-screen suggestions found." | That video has no end-screen cards, or YouTube hasn't loaded them yet. Let the video play for a moment and press the button again. |
| It stopped working | YouTube may have renamed the `.ytp-ce-element` class. Please [open an issue](https://github.com/KaanBahaSever/Turn-Off-YouTube-Suggestions/issues). |

## Contributing

Issues and pull requests are welcome. To test changes, edit the files in `extension/` and press the reload icon on the extension's card in `chrome://extensions`.

## License

[MIT](LICENSE)
