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
  
  chrome.alarms.onAlarm.addListener(() => {

    console.log("Inside on alarm listener.");
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'drink_water128.png',
      title: 'Task Alarm',
      message: "meow",
    });
  });