const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdown-form");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

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

    // @todo - refactor
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    inputContainer.hidden = true;
    countdownEl.hidden = false;
  }, sec);
}

function updateCountdown(e) {
  e.preventDefault();
  [countdownTitle, countdownDate] = [
    e.srcElement[0].value,
    e.srcElement[1].value,
  ];

  if (countdownDate.trim() === "") {
    alert("Please select a date for the countdown.");
  } else {
    countdownValue = new Date(countdownDate).getTime();
    console.log("countdown value:", countdownValue);
    updateDOM();
  }
}

function reset() {
  countdownEl.hidden = true;
  inputContainer.hidden = false;

  clearInterval(countdownActive);
  countdownTitle = "";
  countdownDate = "";
}

countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
