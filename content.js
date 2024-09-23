let selectedElement = null;

document.addEventListener('mousedown', function(event) {
  if (event.button === 2) { // Right click
    selectedElement = event.target;
  }
});

function changeNumber(element, newValue) {
  if (element) {
    element.textContent = newValue;
    
    // Save the change
    chrome.storage.local.get(['changes'], function(result) {
      let changes = result.changes || [];
      changes.push({
        selector: uniqueSelector(element),
        newValue: newValue
      });
      chrome.storage.local.set({changes: changes});
    });
  }
}

function uniqueSelector(element) {
  if (element.id) return '#' + element.id;
  if (element.className) return '.' + element.className.split(' ').join('.');
  return element.tagName.toLowerCase();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "promptChange") {
    const newValue = prompt("Enter new value:", request.selection);
    if (newValue !== null) {
      changeNumber(selectedElement, newValue);
    }
  }
});

// Load and apply saved changes
chrome.storage.local.get(['changes'], function(result) {
  if (result.changes) {
    result.changes.forEach(change => {
      const element = document.querySelector(change.selector);
      if (element) {
        element.textContent = change.newValue;
      }
    });
  }
});
