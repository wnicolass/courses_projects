const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear");

function sendNumberValue(number) {
  const displayValue = calculatorDisplay.textContent;
  calculatorDisplay.textContent =
    displayValue === "0" ? number : displayValue + number;
}

inputBtns.forEach((btn) => {
  if (btn.classList.length === 0) {
    btn.addEventListener("click", () => sendNumberValue(btn.value));
  } else if (btn.classList.contains("operator")) {
    btn.addEventListener("click", () => sendNumberValue(btn.value));
  } else if (btn.classList.contains("decimal")) {
    btn.addEventListener("click", () => sendNumberValue(btn.value));
  }
});

function resetAll() {
  calculatorDisplay.textContent = "0";
}

clearBtn.addEventListener("click", resetAll);
