const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear");

const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  if (awaitingNextValue) {
    return;
  }

  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function useOperator(operator) {
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  const currentValue = +calculatorDisplay.textContent;

  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNextValue = true;
  operatorValue = operator;
}

function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

inputBtns.forEach((btn) => {
  if (btn.classList.length === 0) {
    btn.addEventListener("click", () => sendNumberValue(btn.value));
  } else if (btn.classList.contains("operator")) {
    btn.addEventListener("click", () => useOperator(btn.value));
  } else if (btn.classList.contains("decimal")) {
    btn.addEventListener("click", addDecimal);
  }
});

clearBtn.addEventListener("click", resetAll);
