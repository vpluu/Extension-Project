chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason !== chrome.runtime.OnInstalledReason.INSTALL) {
      return;
    }
  
    openTab();
  });

  chrome.action.onClicked.addListener(openTab);

  function openTab() {
    chrome.tabs.create({ url: 'index.html' });
  }
  
