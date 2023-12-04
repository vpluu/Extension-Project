const form = document.querySelector('.schedule-task');
const viewTasks = document.getElementById('view-tasks');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskData = new FormData(form);
    const data = Object.fromEntries(taskData);

    const taskName = data['task-name'];
    const taskDate = data['task-date'];
    const taskTime = data['task-time'];

    const dateTime = `${taskDate}T${taskTime}`;
    const alarmDateTime = new Date(dateTime).getTime();

    const alarmInfo = {};
    alarmInfo.name = taskName;
    alarmInfo.dateTime = alarmDateTime;

    createAlarm(alarmInfo);
});

function createAlarm(alarmInfo) {
    chrome.alarms.create(alarmInfo.name, {
        when: alarmInfo.dateTime,
    });
    window.close();
}

viewTasks.addEventListener('click', (event) => {
    chrome.tabs.create({ url: 'index.html' });
  })