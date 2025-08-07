const PAGE_TITLE = "202020 Timer";
const TOTAL_TIME = 20 * 60 * 1000;  // 20 minutes
const REST_TIME = 25 * 1000;  // 25 seconds
const ALARM_SOUND = new Audio("alarm_cropped.mp3");

let timeRemaining = TOTAL_TIME;
let isResting = false;
let isPlaying = true;

let mainInterval = setInterval(myTimer, 1000);

function setTime() {
    const minute = Math.floor(Math.floor(timeRemaining / 1000) / 60);
    let second = String(Math.floor(timeRemaining / 1000) - (minute * 60));
    if (second === "0") {
        second = "00";
    }
    const timeStr = minute <= 0 ? second : String(minute) + ":" + second;
    document.getElementById("timer").innerText = timeStr;
    document.title = timeStr + " - " + PAGE_TITLE;
}

function myTimer() {
    timeRemaining -= 1000;
    if (timeRemaining <= 0) {
        ALARM_SOUND.play();
        isResting = !isResting;
        if (isResting) {
            timeRemaining = REST_TIME;
        } else {
            timeRemaining = TOTAL_TIME;
        }
    }

    setTime();
}

document.getElementById("stopBtn").onclick = function() {
    clearInterval(mainInterval);
    timeRemaining = TOTAL_TIME;
    isResting = false;
    setTime();
    isPlaying = false;
    document.getElementById("playBtn").innerText = "Play";
}

document.getElementById("playBtn").onclick = function() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        mainInterval = setInterval(myTimer, 1000);
        document.getElementById("playBtn").innerText = "Pause";
    } else {
        clearInterval(mainInterval);
        document.getElementById("playBtn").innerText = "Play";
    }
}
