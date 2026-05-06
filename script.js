// Navigation Logic
const navBtns = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.view');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetView = btn.getAttribute('data-view');
        
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        views.forEach(view => {
            view.classList.remove('active');
            if (view.id === `${targetView}-view`) {
                view.classList.add('active');
            }
        });
    });
});

// Clock Logic
function updateClock() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');

    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    timeElement.textContent = `${h}:${m}:${s}`;

    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

setInterval(updateClock, 1000);
updateClock();

// Timer Logic
let timerInterval;
const startTimerBtn = document.getElementById('start-timer');
const timerDisplay = document.getElementById('timer-display');

startTimerBtn.addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        startTimerBtn.textContent = 'Start';
        return;
    }

    const mins = parseInt(document.getElementById('minutes').value) || 0;
    const secs = parseInt(document.getElementById('seconds').value) || 0;
    let totalSeconds = (mins * 60) + secs;

    if (totalSeconds <= 0) return;

    startTimerBtn.textContent = 'Stop';
    timerInterval = setInterval(() => {
        totalSeconds--;
        
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        timerDisplay.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            startTimerBtn.textContent = 'Start';
            alert('Timer Finished!');
        }
    }, 1000);
});

document.getElementById('reset-timer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timerDisplay.textContent = '00:00';
    startTimerBtn.textContent = 'Start';
});

// Stopwatch Logic
let stopwatchInterval;
let startTime;
let elapsedTime = 0;

const stopwatchDisplay = document.getElementById('stopwatch-display');
const startStopwatchBtn = document.getElementById('start-stopwatch');
const lapsList = document.getElementById('laps-list');

function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
}

startStopwatchBtn.addEventListener('click', () => {
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        startStopwatchBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            stopwatchDisplay.textContent = formatTime(elapsedTime);
        }, 10);
        startStopwatchBtn.textContent = 'Stop';
    }
});

document.getElementById('lap-stopwatch').addEventListener('click', () => {
    if (elapsedTime > 0) {
        const li = document.createElement('li');
        li.textContent = `Lap ${lapsList.children.length + 1}: ${formatTime(elapsedTime)}`;
        lapsList.prepend(li);
    }
});

document.getElementById('reset-stopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    elapsedTime = 0;
    stopwatchDisplay.textContent = '00:00.00';
    startStopwatchBtn.textContent = 'Start';
    lapsList.innerHTML = '';
});
