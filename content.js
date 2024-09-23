function changeNumber(selector, newValue) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = newValue;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "changeNumber") {
    changeNumber(request.selector, request.newValue);
  }
});

// Load and apply saved changes
chrome.storage.local.get(['changes'], function(result) {
  if (result.changes) {
    result.changes.forEach(change => {
      changeNumber(change.selector, change.newValue);
    });
  }
});
