import { a } from "./words.js";

const span = document.querySelector(".guess");
const hints = document.querySelector(".hint");
const guesses = document.querySelector(".rema");
const wrong = document.querySelector(".wrong");

let word;
let incorrect = [];
let correct = [];
let guess;

function randomWord() {
  let obj = a[Math.floor(Math.random() * a.length)];
  word = obj.word;
  let hint = obj.hint;
  guess = word.length;
  guesses.innerHTML = guess;

  let html = "";
  hints.innerHTML = hint;

  for (var i = 0; i < word.length; i++) {
    html += `<span class="sym"> _ </span>`;
  }
  span.innerHTML = html;
}

function check(e) {
  let key = e.key;
  console.log(key);
  if (word.includes(key) && !correct.includes(key)) {
    console.log(correct);

    const b = document.querySelectorAll(".sym");
    correct.push(key);
    for (var i = 0; i < b.length; i++) {
      if (word[i] === key) {
        b[i].innerHTML = key;
      }
    }
  } else {
    if (!incorrect.includes(key)) {
      guess--;
      incorrect.push(key);
      console.log(incorrect);
      guesses.innerHTML = guess;

      wrong.innerHTML = incorrect;
    }
  }
  if (guess === 0) {
    alert("bitti");
  }
  if (correct.join("") === word) {
    alert("win");
  }
}

window.addEventListener("DOMContentLoaded", randomWord);
document.addEventListener("keydown", check);
