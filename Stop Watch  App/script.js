let startTime = 0;
let elapsedTime = 0;
let timerInterval;

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  return `${pad(hh)}:${pad(mm)}:${pad(ss)}.${pad(ms)}`;
}

function pad(unit) {
  return unit < 10 ? "0" + unit : unit;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    document.getElementById("display").textContent = timeToString(elapsedTime);
  }, 10);
}

function stop() {
  clearInterval(timerInterval);
}

function reset() {
  clearInterval(timerInterval);
  document.getElementById("display").textContent = "00:00:00.00";
  elapsedTime = 0;
}
