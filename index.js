const tasks = document.querySelector('.upcoming-tasks');
const form = document.querySelector('.schedule-task');
const cancelButton = document.getElementById('cancel-button');

document.addEventListener('DOMContentLoaded', function () {

    const upcomingTasksElement = document.getElementById('upcoming-tasks');
  
    // Retrieve and display upcoming alarms
    getUpcomingTasks(function (upcomingTasks) {
      displayUpcomingTasks(upcomingTasks);
    });
});

function getUpcomingTasks(callback) {
    chrome.alarms.getAll(function (alarms) {
      callback(alarms);
    });
}

function displayUpcomingTasks(alarms) {
    const upcomingTasksElement = document.getElementById('upcoming-tasks');
  
    if (alarms.length > 0) {
      const alarmList = document.createElement('ul');

      alarms.forEach(function (alarm) {
        const listItem = document.createElement('li');
        listItem.textContent = `Task at ${new Date(alarm.scheduledTime)}`;
        alarmList.appendChild(listItem);
      });
  
      // Display the list in the specified element
      upcomingTasksElement.appendChild(alarmList);
    } else {
      // Display a message if there are no upcoming alarms
      upcomingTasksElement.textContent = 'No upcoming tasks.';
    }
  }

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskData = new FormData(form);
    const data = Object.fromEntries(taskData);

    const taskName = data['task-name'];
    const taskDesc = data['task-desc'];
    const taskDate = data['task-date'];
    const taskTime = data['task-time'];

    const dateTime = `${taskDate}T${taskTime}`;
    const alarmDateTime = new Date(dateTime).getTime();

    const alarmInfo = {};
    alarmInfo.name = taskName;
    alarmInfo.desc = taskDesc;
    alarmInfo.dateTime = alarmDateTime;

    createAlarm(alarmInfo);
});

function createAlarm(alarmInfo) {
    chrome.alarms.create(alarmInfo.name, {
        when: alarmInfo.dateTime
    });

    alert(`Task alarm: "${alarmInfo.name}" set.`);
}