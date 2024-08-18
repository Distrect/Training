const numberButtons = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const current = document.querySelector(".current");
const prev = document.querySelector(".prev");
const deleteBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector("[data-equals");

let currentNum = "";
let prevNum = "";
let operation = undefined;

function equalizer() {
  if (currentNum === "") {
    return;
  }
  if (prevNum !== "" && operation !== undefined && currentNum !== "") {
    compute();
  }
}

function deleteLast() {
  if (currentNum === "") {
    return;
  }
  currentNum = currentNum.toString().slice(0, -1);
  console.log(currentNum);
}

function compute() {
  let result;
  console.log(prevNum);
  console.log(currentNum);
  let prevRes = parseFloat(prevNum);
  let currentRes = parseFloat(currentNum);

  if (!isNaN(prevRes) || !isNaN(currentRes)) {
    switch (operation) {
      case "+":
        result = prevRes + currentRes;
        break;
      case "-":
        result = prevRes - currentRes;
        break;
      case "÷":
        result = prevRes / currentRes;
        break;
      case "*":
        result = prevRes * currentRes;
        break;
      default:
        return;
    }
    currentNum = result;
    operation = undefined;
    prevNum = "";
  }
}

function addOperand(operand) {
  if (currentNum === "") {
    return;
  }

  if (prevNum !== "") {
    compute();
  }
  operation = operand;
  prevNum = currentNum;
  currentNum = "";
}

function updateDisplay() {
  current.textContent = currentNum;
  if (operation !== undefined) {
    prev.textContent = prevNum;
  } else {
    prev.textContent = "";
  }
}

function appendNumber(number) {
  if (currentNum[0] === "0" && number === "0") {
    currentNum = "0";
    return;
  }

  if (number === "." && currentNum.includes(".")) {
    return;
  }

  currentNum = currentNum.toString() + number.toString();

  console.log(currentNum);
}

numberButtons.forEach((number) => {
  number.addEventListener("click", () => {
    appendNumber(number.textContent);
    updateDisplay();
  });
});

operations.forEach((operant) => {
  operant.addEventListener("click", () => {
    addOperand(operant.textContent);
    updateDisplay();
  });
});

deleteBtn.addEventListener("click", () => {
  deleteLast();
  updateDisplay();
});

equalBtn.addEventListener("click", () => {
  equalizer();
  updateDisplay();
});
