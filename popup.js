document.getElementById('selectBtn').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "startSelection"});
  });
  window.close();
});

document.getElementById('changeBtn').addEventListener('click', () => {
  const newValue = document.getElementById('newValue').value;

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "changeNumber",
      newValue: newValue
    });

    // Save the change
    chrome.storage.local.get(['changes'], function(result) {
      let changes = result.changes || [];
      changes.push({xpath: getElementXPath(selectedElement), newValue: newValue});
      chrome.storage.local.set({changes: changes});
    });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "elementSelected") {
    document.getElementById('selectedText').value = request.text;
  }
});

function getElementXPath(element) {
  if (element && element.id) return '//*[@id="' + element.id + '"]';
  return element;
}
