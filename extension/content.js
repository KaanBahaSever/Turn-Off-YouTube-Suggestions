// Runs on every YouTube page. When "Remove automatically" is on, a stylesheet
// hides the end-screen suggestion cards. Because YouTube switches videos without
// reloading the page, the stylesheet keeps working for every video you open.
const STYLE_ID = "turn-off-youtube-suggestions";

function setAutoRemove(enabled) {
  const existing = document.getElementById(STYLE_ID);

  if (enabled && !existing) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = ".ytp-ce-element { display: none !important; }";
    document.documentElement.appendChild(style);
  } else if (!enabled && existing) {
    existing.remove();
  }
}

chrome.storage.sync.get({ autoRemove: false }, ({ autoRemove }) => {
  setAutoRemove(autoRemove);
});

// Apply the toggle immediately in already-open YouTube tabs.
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.autoRemove) {
    setAutoRemove(changes.autoRemove.newValue);
  }
});
