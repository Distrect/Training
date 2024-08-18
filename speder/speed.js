const container = document.querySelector(".par");
const input = document.querySelector(".inps");
const mis = document.querySelector("#mis");
const secs = document.querySelector("#time");
const cpms = document.querySelector("#cpm");
const wpms = document.querySelector("#wpm");

let words;
let syll;

let currentIndex = 0;
let currentChar = 0;
let mistakes = 0;
let seconds = 60;

let game = false;
let time;
let left = seconds;

let currentWord;
let currentSyl;
let cpm = 0;

document.addEventListener("DOMContentLoaded", loadPar());

function loadPar() {
  const parag = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  parag.split(" ").forEach((par, index) => {
    let wrap = document.createElement("span");
    wrap.className = "word";

    par.split("").forEach((syl) => {
      let span = `<span class=syl>${syl}</span>`;
      wrap.innerHTML += span;
    });
    container.append(wrap, " ");
  });

  words = document.querySelectorAll(".word");
  syll = document.querySelectorAll(".syl");
  syll[0].classList.add("active");
  words[0].classList.add("selected");
  container.addEventListener("click", () => {
    input.focus();
  });
  document.addEventListener("keydown", () => {
    input.focus();
  });
}

input.addEventListener("input", (e) => {
  initWord();
  let char = e.data;

  if (game === false) {
    time = setInterval(timer, 1000);
    game = true;
  }

  if (currentIndex !== words.length - 1 && game && seconds > 0) {
    if (char !== null) {
      if (char !== " ") {
        if (char === currentSyl.textContent) {
          currentSyl.classList.add("correct");
        } else {
          currentSyl.classList.add("wrong");
          mistakes++;
          mis.textContent = mistakes;
        }
        nextSyl();
        cpm++;
      } else {
        currentSyl.classList.remove("active");
        nextWord();
      }
    } else {
      currentSyl.classList.remove("active");
      currentSyl = currentWord[--currentChar];
      currentSyl.classList.add("active");
      if (currentSyl.classList.contains("wrong")) {
        mistakes--;
        mis.textContent = mistakes;
      }
      currentSyl.classList.remove("correct", "incorrect");
    }

    let wpm = Math.round(((cpm - mistakes) / 5 / (seconds - left)) * 60);
    cpms.textContent = cpm - mistakes;
    wpms.textContent = wpm;
  } else {
    game = false;
    clearInterval(time);
  }
});

function nextSyl() {
  currentWord.forEach((syl) => syl.classList.remove("active"));
  currentSyl = currentWord[++currentChar];
  if (currentChar !== currentWord.length) {
    currentSyl.classList.add("active");
  } else {
    nextWord();
  }
}

function initWord() {
  currentWord = words[currentIndex].querySelectorAll(".syl");
  currentSyl = currentWord[currentChar];
}

function nextWord() {
  input.value = "";
  currentWord = words[++currentIndex].querySelectorAll(".syl");
  currentSyl = currentWord[(currentChar = 0)];
  currentWord.forEach((syl) => syl.classList.add("selected"));
  currentSyl.classList.add("active");
}

function timer() {
  if (seconds > 0) {
    seconds--;
    secs.textContent = seconds;
  } else {
    clearInterval(time);
  }
}
