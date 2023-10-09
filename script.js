let timer;
let isRunning = false;
let seconds = 0;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function updateDisplay() {
    const display = document.querySelector('.time-display');
    display.textContent = formatTime(seconds);
}

document.getElementById('start').addEventListener('click', function () {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(function () {
            seconds++;
            updateDisplay();
        }, 1000);
    }
});

document.getElementById('stop').addEventListener('click', function () {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
});

document.getElementById('reset').addEventListener('click', function () {
    isRunning = false;
    clearInterval(timer);
    seconds = 0;
    updateDisplay();
});

updateDisplay();
