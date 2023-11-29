const tasks = document.querySelector('.upcoming-tasks');
const form = document.querySelector('.schedule-task');
const cancelButton = document.getElementById('cancel-button');

document.addEventListener('DOMContentLoaded', function () {

    const upcomingTasksElement = document.getElementById('scroll-container');
  
    // Retrieve and display upcoming alarms
    getUpcomingTasks(function (upcomingTasks) {
      displayUpcomingTasks(upcomingTasks);
    });
});

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

function getUpcomingTasks(callback) {
    chrome.alarms.getAll(function (alarms) {
      callback(alarms);
    });
}

function displayUpcomingTasks(alarms) {
    const upcomingTasksElement = document.getElementById('scroll-container');
  
    if (alarms.length > 0) {
        // Build a list of upcoming alarms
        alarms.forEach(function (alarm) {
          const taskContainer = document.createElement('div');
          taskContainer.classList.add('task-container');
    
          const formattedDate = formatDate(new Date(alarm.scheduledTime));
          const formattedTime = formatTime(new Date(alarm.scheduledTime));

          const dateTime = document.createElement('div');
          dateTime.classList.add('date-time');

          const date = document.createElement('div');
          date.textContent = `${formattedDate}`;
          date.classList.add('date');

          const time = document.createElement('div');
          time.textContent = ` ${formattedTime}`;
          time.classList.add('time');

          const taskName = document.createElement('div');
          taskName.textContent = `${alarm.name}`;
          taskName.classList.add('name');
    
          const cancelIcon = document.createElement('button');
          cancelIcon.classList.add('cancel-button');
          cancelIcon.innerHTML = '❌';
          cancelIcon.addEventListener('click', function () {
            // Call a function to handle canceling the alarm
            cancelTask(alarm.name);
            // Update the displayed alarms after canceling
            refreshPage();
            displayUpcomingTasks(alarms.filter(a => a.name !== alarm.name));
          });
    
          dateTime.appendChild(date);
          dateTime.appendChild(time);
          taskContainer.appendChild(dateTime);
          taskContainer.appendChild(taskName);
          taskContainer.appendChild(cancelIcon);
    
          upcomingTasksElement.appendChild(taskContainer);
        });
      } else {
        // Display a message if there are no upcoming alarms
        upcomingTasksElement.textContent = 'No upcoming tasks.';
      }
  }

  // Format date in MM/DD/YYYY
function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  
  // Format time in HH:mm
  function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

function createAlarm(alarmInfo) {
    chrome.alarms.create(alarmInfo.name, {
        when: alarmInfo.dateTime
    });

    alert(`Task alarm: "${alarmInfo.name}" set.`);
    refreshPage();
}

function cancelTask(name) {
    return chrome.alarms.clear(name, (cleared) => {
        if (cleared) {
            console.log(`Task canceled: "${name}"`);
        } else {
            console.log(`Error cancelling task: "${name}"`);
        }
    })
}

function refreshPage() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
            chrome.tabs.reload(tabs[0].id);
        }
    });
}