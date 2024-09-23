document.getElementById('changeBtn').addEventListener('click', () => {
  const selector = document.getElementById('selector').value;
  const newValue = document.getElementById('newValue').value;

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "changeNumber",
      selector: selector,
      newValue: newValue
    });

    // Save the change
    chrome.storage.local.get(['changes'], function(result) {
      let changes = result.changes || [];
      changes.push({selector: selector, newValue: newValue});
      chrome.storage.local.set({changes: changes});
    });
  });
});
