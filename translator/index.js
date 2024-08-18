const input = document.querySelector(".inp");

let waittime = 1000;
let timer;
let selected;
let toer;

document.addEventListener("DOMContentLoaded", () => {
  appender();
});

const write = (e) => {
  window.clearTimeout(timer);
};

const writeup = (e) => {
  window.clearTimeout(timer);
  value = e.target.value;
  console.log(from);
  selected = from.options[from.selectedIndex].value;
  toer = to.options[to.selectedIndex].value;
  console.log(selected, toer);

  timer = setTimeout(() => {
    sendreq();
  }, waittime);
};

input.addEventListener("keydown", write);
input.addEventListener("keyup", writeup);
