const button = document.getElementById("run");
const autoToggle = document.getElementById("auto");
const status = document.getElementById("status");

// Runs inside the YouTube page: removes the end-screen suggestion cards.
function removeSuggestions() {
  const items = document.querySelectorAll(".ytp-ce-element");
  items.forEach(item => item.remove());
  return items.length;
}

function isYouTube(url) {
  try {
    const { hostname } = new URL(url);
    return hostname === "youtube.com" || hostname.endsWith(".youtube.com");
  } catch {
    return false;
  }
}

async function getActiveYouTubeTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab && isYouTube(tab.url) ? tab : null;
}

async function removeFromTab(tab) {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: removeSuggestions,
  });
  return result;
}

button.addEventListener("click", async () => {
  const tab = await getActiveYouTubeTab();

  if (!tab) {
    status.textContent = "Open a YouTube video first.";
    return;
  }

  try {
    const removed = await removeFromTab(tab);
    status.textContent = removed
      ? `Removed ${removed} suggestion${removed === 1 ? "" : "s"}.`
      : "No end-screen suggestions found.";
  } catch (error) {
    status.textContent = "Could not run on this page.";
    console.error(error);
  }
});

chrome.storage.sync.get({ autoRemove: false }, ({ autoRemove }) => {
  autoToggle.checked = autoRemove;
});

autoToggle.addEventListener("change", async () => {
  const enabled = autoToggle.checked;
  await chrome.storage.sync.set({ autoRemove: enabled });
  status.textContent = enabled
    ? "Auto-remove is on."
    : "Auto-remove is off.";

  // Also clean the current tab right away, in case it was opened before the
  // extension was installed and has no content script yet.
  if (enabled) {
    const tab = await getActiveYouTubeTab();
    if (tab) {
      removeFromTab(tab).catch(console.error);
    }
  }
});
