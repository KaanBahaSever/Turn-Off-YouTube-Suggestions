const button = document.getElementById("run");
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

button.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !isYouTube(tab.url)) {
    status.textContent = "Open a YouTube video first.";
    return;
  }

  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: removeSuggestions,
    });
    status.textContent = result
      ? `Removed ${result} suggestion${result === 1 ? "" : "s"}.`
      : "No end-screen suggestions found.";
  } catch (error) {
    status.textContent = "Could not run on this page.";
    console.error(error);
  }
});
