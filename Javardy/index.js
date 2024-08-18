const game = document.querySelector(".game");
let totalPoints = 0;

const questions = [
  {
    genre: "WHO",
    questions: [
      {
        question: "Who wrote Harry Potter",
        answers: ["Rowling", "Tolkien"],
        correct: "Rowling",
        level: "easy",
      },
      {
        question: "kryptonian",
        answers: ["Superman", "Aquaman"],
        correct: "Superman",
        level: "medium",
      },
      {
        question: "first car designer",
        answers: ["Benz", "ford"],
        correct: "Benz",
        level: "Hard",
      },
    ],
  },
  {
    genre: "WHERE",
    questions: [
      {
        question: "Where is buc palace",
        answers: ["Richmond", "London"],
        correct: "London",
        level: "easy",
      },
      {
        question: "where is colessium",
        answers: ["Rome", "Milan"],
        correct: "Rome",
        level: "medium",
      },
      {
        question: "Anan",
        answers: ["Anan", "Baban"],
        correct: "Anan",
        level: "Hard",
      },
    ],
  },
];

function check(e) {
  const parentElement = e.currentTarget.parentElement.parentElement;
  const answer = parentElement.getAttribute("data-answer");
  const point = parseInt(
    e.currentTarget.parentElement.previousSibling.previousSibling.textContent
  );

  if (e.currentTarget.textContent === answer) {
    parentElement.textContent = point;
    totalPoints += point;
  } else {
    parentElement.textContent = -point;
    totalPoints += -point;
  }
  console.log(totalPoints);
}

function addQuestion(obj) {
  const cover = document.createElement("div");
  const genre = document.createElement("div");
  genre.textContent = obj.genre;
  cover.setAttribute("id", obj.genre);
  cover.appendChild(genre);

  obj.questions.forEach((q) => {
    const questionCont = document.createElement("div");
    const point = document.createElement("div");
    const qdiv = document.createElement("div");
    const buttonCont = document.createElement("div");
    qdiv.textContent = q.question;

    questionCont.setAttribute("id", q.question);
    questionCont.setAttribute("data-answer", q.correct);

    if (q.level === "easy") {
      point.textContent = 100;
    } else if (q.level === "medium") {
      point.textContent = 200;
    } else {
      point.textContent = 300;
    }

    const button1 = document.createElement("button");
    button1.textContent = q.answers[0];
    const button2 = document.createElement("button");
    button2.textContent = q.answers[1];

    buttonCont.append(button1);
    buttonCont.append(button2);

    questionCont.append(point);
    questionCont.append(qdiv);
    questionCont.append(buttonCont);
    cover.append(questionCont);

    button1.addEventListener("click", (e) => {
      check(e);
    });

    button2.addEventListener("click", (e) => {
      check(e);
    });
  });

  game.appendChild(cover);

  console.log(cover);
}

questions.forEach((obj) => {
  addQuestion(obj);
});
