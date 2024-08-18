const input = document.querySelector(".ınps");
const switcher = document.querySelector(".switch");
const result = document.querySelector(".result");
let from = document.querySelector("#fromex");
let to = document.querySelector("#toex");

let currentCurrency = from.value;

let currentRate;

document.addEventListener("DOMContentLoaded", async () => {
  await test(NAMES_URL, requestOptions);
  currentCurrency = from.value;
  currentRate = await getRates(
    RATES_URL.concat(currentCurrency),
    requestOptions
  );
});

async function changeCurrency() {
  console.log(from.value);
  currentRate = await getRates(RATES_URL.concat(from.value), requestOptions);
  converter();
}

function changeRates(e) {
  console.log(e.target.value);
}

function formatter(value) {
  const formatted = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "USD",
  }).format(value);
  return formatted;
}

function switchs() {
  const inputVal = formatter(input.value);
  let resVal = result.textContent.slice(0, result.textContent.indexOf(","));

  if (resVal.includes(".")) {
    resVal = resVal.split(".").join("");
  }
  input.value = resVal;
  result.textContent = inputVal;

  const fromVal = from.value;
  const toVal = to.value;

  from.value = toVal;
  to.value = fromVal;
}

switcher.addEventListener("click", switchs);

function converter() {
  console.log(from.value);
  let baban = to.value;
  console.log(currentRate);
  result.textContent = formatter(input.value * currentRate[baban]);
}

from.addEventListener("change", changeCurrency);

input.addEventListener("input", converter);

to.addEventListener("change", changeRates);

//test(RATES_URL, requestOptions);
