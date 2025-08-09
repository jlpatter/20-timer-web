const PAGE_TITLE = "202020 Timer";
const TOTAL_TIME = 20 * 60 * 1000;  // 20 minutes
const REST_TIME = 25 * 1000;  // 25 seconds
const ALARM_SOUND = new Audio("alarm_cropped.mp3");
const WORKING_BG_COLOR = '#4d4d4d';
const RESTING_BG_COLOR = '#008000';

let timeRemaining = TOTAL_TIME;
let isResting = false;
let isPlaying = false;

let mainInterval = -1;

function setTime() {
    const minute = Math.floor(Math.floor(timeRemaining / 1000) / 60);
    let second = String(Math.floor(timeRemaining / 1000) - (minute * 60));
    if (parseInt(second, 10) < 10) {
        second = "0" + second;
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
            document.body.style.backgroundColor = RESTING_BG_COLOR;
            timeRemaining = REST_TIME;
        } else {
            document.body.style.backgroundColor = WORKING_BG_COLOR;
            timeRemaining = TOTAL_TIME;
        }
    }

    setTime();
}

document.getElementById("stopBtn").onclick = function() {
    if (mainInterval !== -1) {
        clearInterval(mainInterval);
    }
    timeRemaining = TOTAL_TIME;
    isResting = false;
    document.body.style.backgroundColor = WORKING_BG_COLOR;
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
        if (mainInterval !== -1) {
            clearInterval(mainInterval);
        }
        document.getElementById("playBtn").innerText = "Play";
    }
}
