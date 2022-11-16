// Pages
const gamePage = document.getElementById("game-page");
const scorePage = document.getElementById("score-page");
const splashPage = document.getElementById("splash-page");
const countdownPage = document.getElementById("countdown-page");
// Splash Page
const startForm = document.getElementById("start-form");
const radioContainers = document.querySelectorAll(".radio-container");
const radioInputs = document.querySelectorAll("input");
const bestScores = document.querySelectorAll(".best-score-value");
// Countdown Page
const countdown = document.querySelector(".countdown");
// Game Page
const itemContainer = document.querySelector(".item-container");
// Score Page
const finalTimeEl = document.querySelector(".final-time");
const baseTimeEl = document.querySelector(".base-time");
const penaltyTimeEl = document.querySelector(".penalty-time");
const playAgainBtn = document.querySelector(".play-again");

// Equations

let questionAmount = 0;
let equationsArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time

// Scroll

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function equationsToDOM() {
  equationsArray.forEach((equation) => {
    const item = document.createElement("div");
    item.classList.add("item");

    const equationText = document.createElement("h1");
    equationText.textContent = equation.value;

    item.appendChild(equationText);
    itemContainer.appendChild(item);
  });
}

function createEquations() {
  const correctEquations = getRandomNumber(1, questionAmount);

  const wrongEquations = questionAmount - correctEquations;
  console.log("correct equations: ", correctEquations);
  console.log("wrong equations: ", wrongEquations);

  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomNumber(1, 9);
    secondNumber = getRandomNumber(1, 9);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: "true" };
    equationsArray.push(equationObject);
  }

  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomNumber(1, 9);
    secondNumber = getRandomNumber(1, 9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomNumber(0, 4);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: "false" };
    equationsArray.push(equationObject);
  }
  import("./shuffle.js").then((module) => {
    module.default(equationsArray);
  });
  console.log(equationsArray);
  equationsToDOM();
}

// Dynamically adding correct/incorrect equations
// function populateGamePage() {
//   // Reset DOM, Set Blank Space Above
//   itemContainer.textContent = '';
//   // Spacer
//   const topSpacer = document.createElement('div');
//   topSpacer.classList.add('height-240');
//   // Selected Item
//   const selectedItem = document.createElement('div');
//   selectedItem.classList.add('selected-item');
//   // Append
//   itemContainer.append(topSpacer, selectedItem);

//   // Create Equations, Build Elements in DOM

//   // Set Blank Space Below
//   const bottomSpacer = document.createElement('div');
//   bottomSpacer.classList.add('height-500');
//   itemContainer.appendChild(bottomSpacer);
// }

function countdownStart() {
  let number = 3;
  const interval = setInterval(() => {
    countdown.textContent = number;
    number--;

    if (number === -1) {
      clearInterval(interval);
      countdown.textContent = "Go!";
    }
  }, 1000);
}

function showCountdown() {
  countdownPage.hidden = false;
  splashPage.hidden = true;
  countdownStart();
  createEquations();
}

function getRadioValue() {
  let radioValue;
  radioInputs.forEach((radioInput) => {
    if (radioInput.checked) {
      radioValue = radioInput.value;
    }
  });
  return radioValue;
}

function selectQuestionAmount(e) {
  e.preventDefault();
  questionAmount = getRadioValue();
  console.log(questionAmount);
  if (questionAmount) {
    showCountdown();
  }
}

startForm.addEventListener("click", () => {
  radioContainers.forEach((radioEl) => {
    radioEl.classList.remove("selected-label");
    if (radioEl.children[1].checked) {
      radioEl.classList.add("selected-label");
    }
  });
});

startForm.addEventListener("submit", selectQuestionAmount);
