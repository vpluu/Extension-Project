chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason !== chrome.runtime.OnInstalledReason.INSTALL) {
      return;
    }
  
    openTab();
  });

  function openTab() {
    chrome.tabs.create({ url: 'index.html' });
  }
  
  chrome.alarms.onAlarm.addListener(handleAlarm);

  function handleAlarm(alarm) {
    const alarmName = alarm.name || 'Task alarm';

    chrome.notifications.create({
      type:'basic',
      iconUrl:'bubbles.gif',
      title:alarmName,
      message:"It's time!"
    })
  }

