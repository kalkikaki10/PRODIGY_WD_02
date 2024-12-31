// Element Selectors
const timerDisplay = document.getElementById("timer");
const startStopButton = document.getElementById("startStop");
const lapButton = document.getElementById("lap");
const resetButton = document.getElementById("reset");
const lapsList = document.getElementById("lapsList");

// Variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

// Format time function
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}.${milliseconds}`;
}

// Update Timer
function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    timerDisplay.textContent = formatTime(elapsedTime);
}

// Start/Stop Button
function toggleStartStop() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);
        startStopButton.textContent = "Stop";
    } else {
        clearInterval(timerInterval);
        startStopButton.textContent = "Start";
    }
    running = !running;
}

// Lap Button
function recordLap() {
    if (running) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

// Reset Button
function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    timerDisplay.textContent = "00:00:00.00";
    startStopButton.textContent = "Start";
    lapsList.innerHTML = "";
}

// Event Listeners
startStopButton.addEventListener("click", toggleStartStop);
lapButton.addEventListener("click", recordLap);
resetButton.addEventListener("click", resetTimer);
