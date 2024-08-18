const container = document.querySelector(".game-container");

let score = 0;

const questions = [
  {
    correct: 2,
    option: ["jury", "assess"],
    quiz: ["value", "estimate", "evaluate"],
  },
  {
    correct: 2,
    option: ["trace", "adjacent"],
    quiz: ["close", "near", "next"],
  },
  {
    correct: 2,
    option: ["mad", "exotic"],
    quiz: ["foreign", "national", "ethnic"],
  },
  {
    correct: 1,
    option: ["forecast", "sustainable"],
    quiz: ["assume", "insight", "weather"],
  },
  {
    correct: 2,
    option: ["charity", "rapid"],
    quiz: ["fast", "quick", "prompt"],
  },
];

function canceller(div) {
  const all = div.querySelectorAll("button");
  all.forEach((btn) => {
    btn.disabled = true;
  });
}

function checkAnswer(div, index, correct) {
  if (index === correct) {
    score += correct;
  } else {
    score -= correct;
  }
  canceller(div);
}

questions.forEach((qus) => {
  const div = document.createElement("div");
  div.classList.add("card");

  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const btn1 = document.createElement("button");
  const btn2 = document.createElement("button");
  const divBtn = document.createElement("div");

  p1.textContent = qus.quiz[0];
  p2.textContent = qus.quiz[1];
  p3.textContent = qus.quiz[2];

  btn1.textContent = qus.option[0];
  btn2.textContent = qus.option[1];

  divBtn.append(btn1, btn2);
  div.append(p1, p2, p3, divBtn);
  container.appendChild(div);

  [btn1, btn2].forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      checkAnswer(divBtn, index + 1, qus.correct);
    });
  });
});
