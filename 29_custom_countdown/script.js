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

const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

function updateDOM() {
  const now = new Date().getTime();
  const diff = countdownValue - now;
  console.log(diff);
}

function updateCountdown(e) {
  e.preventDefault();
  [countdownTitle, countdownDate] = [
    e.srcElement[0].value,
    e.srcElement[1].value,
  ];
  console.log(countdownTitle, countdownDate);

  countdownValue = new Date(countdownDate).getTime();
  console.log("countdown value:", countdownValue);
  updateDOM();
}

countdownForm.addEventListener("submit", updateCountdown);
