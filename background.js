chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "changeNumber",
    title: "Change this number",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "changeNumber") {
    chrome.tabs.sendMessage(tab.id, {
      action: "promptChange",
      selection: info.selectionText
    });
  }
});
