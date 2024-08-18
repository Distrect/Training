const container = document.querySelector(".insects");
const startBtn = document.querySelector(".start");
const displayTime = document.querySelector("#time");
let time;
let seconds = 0;
let crushed = 0;

const width = window.innerWidth;
const height = window.innerHeight;

function remover(e) {
  e.currentTarget.remove();
  crushed++;
  genereteInsect();

  if (crushed % 5 === 0) {
    setTimeout(genereteInsect, 1000);
  }
}

function timer() {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;

  displayTime.innerHTML = `${min}:${sec}`;
  seconds++;
}

function startGame(e) {
  e.currentTarget.disabled = true;
  setInterval(timer, 1000);
  genereteInsect();
}

function randomizer(min, max) {
  return Math.random() * 600;
}

function genereteInsect() {
  const image = document.createElement("img");
  image.src = "./mosq.png";
  let topp = randomizer(0, height);
  let leftp = randomizer(0, width);

  image.style.top = topp + "px";
  image.style.left = leftp + "px";

  container.append(image);
  image.addEventListener("click", remover);
}

startBtn.addEventListener("click", startGame);
