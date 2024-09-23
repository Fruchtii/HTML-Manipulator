function changeText(selector, newText) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    element.textContent = newText;
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "changeText") {
    changeText(request.selector, request.newText);
  }
});

// Load and apply saved changes
chrome.storage.local.get(['changes'], function(result) {
  if (result.changes) {
    result.changes.forEach(change => {
      changeText(change.selector, change.newText);
    });
  }
});
