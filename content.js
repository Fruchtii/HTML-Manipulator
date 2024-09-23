let selectedElement = null;

function changeNumber(element, newValue) {
  if (element) {
    element.textContent = newValue;
  }
}

function enableSelection() {
  document.body.style.cursor = 'crosshair';
  document.addEventListener('click', elementClickHandler);
}

function disableSelection() {
  document.body.style.cursor = 'default';
  document.removeEventListener('click', elementClickHandler);
}

function elementClickHandler(e) {
  e.preventDefault();
  e.stopPropagation();
  selectedElement = e.target;
  chrome.runtime.sendMessage({action: "elementSelected", text: selectedElement.textContent});
  disableSelection();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startSelection") {
    enableSelection();
  } else if (request.action === "changeNumber") {
    changeNumber(selectedElement, request.newValue);
  }
});

// Load and apply saved changes
chrome.storage.local.get(['changes'], function(result) {
  if (result.changes) {
    result.changes.forEach(change => {
      const element = document.evaluate(change.xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      changeNumber(element, change.newValue);
    });
  }
});
