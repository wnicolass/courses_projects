const selectOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const selectTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const swapBtn = document.querySelector(".btn");
const rateEl = document.getElementById("rate");

function calculate() {
  const currencyOne = selectOne.value;
  const currencyTwo = selectTwo.value;
  console.log(currencyOne);

  fetch("https://open.exchangerate-api.com/v6/latest")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const rate = data.rates[currencyTwo] / data.rates[currencyOne];
      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountTwo.value = (amountOne.value * rate).toFixed(2);
    });
}

selectOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
selectTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

swapBtn.addEventListener("click", () => {
  [selectOne.value, selectTwo.value] = [selectTwo.value, selectOne.value];
  calculate();
});

calculate();
