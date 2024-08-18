const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals-class]");
const allClearButton = document.querySelector("[data-all-clear]");
let previousOperandTextElement = document.querySelector("#textval1");
let currentOperandTextElement = document.querySelector("#textval");
let currentOperand = "";
let previousOperand = "";
let operation = "";

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split(".")[0]);
  const decimalDigits = stringNumber.split(".")[1];
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = "";
  } else {
    integerDisplay = integerDigits.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function compute() {
  let computation;
  let prev = parseFloat(previousOperand);
  let current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) {
    return;
  }

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
    default:
  }
  operation = "";
  previousOperand = "";
  currentOperand = computation;
}

function chooseOperation(operat) {
  if (currentOperand === "") {
    return;
  }
  if (previousOperand !== null) {
    compute();
  }
  operation = operat;
  previousOperand = currentOperand;
  currentOperand = "";
}

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) {
    return;
  }
  currentOperand = currentOperand.toString() + number.toString();
}
function updateDisplay() {
  currentOperandTextElement.value = getDisplayNumber(currentOperand);

  if (operation !== null) {
    previousOperandTextElement.value = `${getDisplayNumber(
      previousOperand
    )}${operation}`;
  } else {
    previousOperandTextElement.value = "";
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.value);
    updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.value);
    chooseOperation(button.value);
    updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  compute();
  updateDisplay();
});
