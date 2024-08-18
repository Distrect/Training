const span = document.querySelector(".rand");
const input = document.querySelector(".input");
const start = document.querySelector(".start-res");

let turn = 1;
let count = 0;
let timer;
let order = [];
let playerOrder = [];
let ind = 1;

start.addEventListener("click", () => {
  if (ind == 1) {
    timer = window.setInterval(comp, 800);
    ind = 0;
  } else {
    turn = 1;
    count = 0;
    order = [];
    playerOrder = [];
    clearInterval(timer);
    ind = 1;
  }
});

function comp() {
  if (count < turn) {
    count++;
    let randNum = Math.floor(Math.random() * 10);
    order.push(randNum);
    span.innerHTML = randNum;
  } else {
    count = 0;
    span.innerHTML = "";
    playerOrder = [];
    clearInterval(timer);
  }
}

input.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  let value = e.target.value;
  playerOrder.push(value[value.length - 1]);
  check();
});

function check() {
  input.value = "";

  if (playerOrder[playerOrder.length - 1] != order[playerOrder.length - 1]) {
    turn = 1;
    setdefault();
  }

  if (playerOrder.length === turn) {
    turn++;
    setdefault();
  }
}

function setdefault() {
  order = [];
  playerOrder = [];
  input.value = "";
  clearInterval(timer);
  timer = window.setInterval(comp, 800);
}
