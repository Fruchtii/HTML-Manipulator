document.getElementById('changeBtn').addEventListener('click', () => {
  const selector = document.getElementById('selector').value;
  const newText = document.getElementById('newText').value;

  if (!selector || !newText) {
    alert('Please fill in both fields.');
    return;
  }

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "changeText",
      selector: selector,
      newText: newText
    });

    // Save the change
    chrome.storage.local.get(['changes'], function(result) {
      let changes = result.changes || [];
      changes.push({selector: selector, newText: newText});
      chrome.storage.local.set({changes: changes});
    });
  });
});
