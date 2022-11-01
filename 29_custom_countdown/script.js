const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdown-form");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeInfoEl = document.getElementById("complete-info");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const sec = 1000;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const diff = countdownValue - now;

    const days = Math.floor(diff / day);
    const hours = Math.floor((diff % day) / hour);
    const minutes = Math.floor((diff % hour) / min);
    const seconds = Math.floor((diff % min) / sec);

    inputContainer.hidden = true;

    if (diff < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeInfoEl.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, sec);
}

function updateCountdown(e) {
  e.preventDefault();
  [countdownTitle, countdownDate] = [
    e.srcElement[0].value,
    e.srcElement[1].value,
  ];

  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));

  if (countdownDate.trim() === "") {
    alert("Please select a date for the countdown.");
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

function reset() {
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;

  clearInterval(countdownActive);
  countdownTitle = "";
  countdownDate = "";
}

function restorePreviousCountdown() {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeEl.addEventListener("click", (e) => {
  e.target.classList.contains("complete-btn") ? reset() : false;
});

restorePreviousCountdown();
