const Btns = document.querySelectorAll(".btn");
const startBtn = document.querySelector(".start");
const resBtn = document.getElementById("restart");
const pBtn = document.getElementById("pause");
const userChoice = document.querySelector("#userChocies");
const computerChoice = document.getElementById("computerChocies");
const time = document.getElementById("time");
const wins = document.querySelector("#wins");
const uScore = document.getElementById("userScore");
const cScore = document.getElementById("computerScore");

let currentUserchoice;
let currentComputerchoice;
let userScore;
let computerScore;

let Choices = ["✋", "✌️", "✊"];
let start;
let seconds;
let ind;
let timers;

function init() {
  pBtn.disabled = true;
  start = false;
  resBtn.disabled = true;
  startBtn.disabled = false;
  Btns.forEach((btn) => {
    btn.disabled = true;
  });
  userScore = 0;
  computerScore = 0;
  seconds = 500;
  console.log(this);
}

init();

function timer() {
  if (seconds > 0) {
    seconds--;

    time.innerText = seconds;
  } else {
    alert("game is finsihed");
    alert(chechWinner());
    clearInterval(timers);
  }
}

function chechWinner() {
  if (seconds === 0) {
    resBtn.disabled = false;
    if (userScore > computerScore) {
      return "User wins";
    } else if (userScore < computerScore) {
      return "Computer Wins";
    } else {
      return "Draw";
    }
  }
}

function compute() {
  if (currentUserchoice === "✊") {
    if (currentComputerchoice === "✌️") {
      userScore++;
      wins.innerText = "User gets this ";
      uScore.innerText = userScore;
    } else if (currentComputerchoice === "✋") {
      computerScore++;
      wins.innerText = "Computer get this ";
      cScore.innerText = computerScore;
    } else {
      wins.innerText = "No one gets ";
    }
  } else if (currentUserchoice === "✌️") {
    if (currentComputerchoice === "✌️") {
      wins.innerText = "No one gets ";
    } else if (currentComputerchoice === "✋") {
      userScore++;
      wins.innerText = "User get this ";
      uScore.innerText = userScore;
    } else {
      computerScore++;
      wins.innerText = "Computer get this ";
      cScore.innerText = computerScore;
    }
  } else {
    if (currentComputerchoice === "✌️") {
      computerScore++;
      wins.innerText = "Computer get this ";
      cScore.innerText = computerScore;
    } else if (currentComputerchoice === "✋") {
      wins.innerText = "No one gets ";
    } else {
      userScore++;
      wins.innerText = "User get this ";
      uScore.innerText = userScore;
    }
  }
}

resBtn.addEventListener("click", function () {
  init();
});

function randcomp() {
  let choosen = Choices[Math.trunc(Math.random() * Choices.length)];
  computerChoice.innerText = choosen;
  currentComputerchoice = choosen;
}

startBtn.addEventListener("click", function () {
  timers = window.setInterval(timer, 1000);
  start = true;
  startBtn.disabled = true;
  pBtn.disabled = false;
  Btns.forEach((btn) => {
    btn.disabled = false;
  });
});

pBtn.addEventListener("click", function () {
  ind = !ind ? 1 : 0;
  if (ind === 1) {
    clearInterval(timers);
    Btns.forEach((btn) => {
      btn.disabled = true;
    });
  } else {
    timers = window.setInterval(timer, 1000);
    Btns.forEach((btn) => {
      btn.disabled = false;
    });
  }
});

Btns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (start) {
      if (seconds !== 0) {
        userChoice.innerText = this.innerText;
        currentUserchoice = this.innerText;
        randcomp();
        compute();
      } else {
        console.log("finished");
      }
    } else {
      console.log("you did not pressed the start button");
    }
  });
});
