const newTask = new ScheduleTask(task, )

const task = document.querySelector('.upcoming-tasks');
const form = document.querySelector('.schedule-task');
const cancelButton = document.getElementById('cancel-button');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskData = new FormData(form);
    const data = Object.fromEntries(taskData);

    const taskName = data['task-name'];
    const taskDesc = data['task-desc'];
    const taskDate = data['task-date'];
    const taskTime = data['task-time'];

    const dateTime = `${taskDate}T${taskTime}`;
    const alarmDateTime = new Date(dateTime);
    const timeUntil = alarmDateTime - Date.now();

    const alarmInfo = {};
    alarmInfo.name = taskName;
    alarmInfo.desc = taskDesc;
    alarmInfo.dateTime = alarmDateTime;

    newTask.createAlarm(alarmInfo);
});

class ScheduleTask {
    constructor(tasks) {
        this.currentTask = task;
        this.logMessage('Creating task...');
        this.displayElement.addEventListener('click', this.handleCancelAlarm);
        chrome.alarms.onAlarm.addListener(this.handleAlarm);
    }

    handleAlarm = async (alarm) => {
        const json = JSON.stringify(alarm);
        this.logMessage(`Task Alarm: "${alarm.name}" right now!`);
        await this.turnOff();
    }

}