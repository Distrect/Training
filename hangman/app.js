const place = document.querySelector(".place");
const keyboard = document.querySelector(".keyboard");
const wrongs = document.getElementById("wrongs");
const hintbtn = document.querySelector(".hint");

const hangs = [
  {
    word: "bird",
    hint: "Can fly",
  },
  {
    word: "bee",
    hint: "Can sting",
  },
  {
    word: "Prestige",
    hint: "Abracadabra",
  },
  {
    word: "Allah",
    hint: "Number one",
  },
];

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "İ",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];

let wordh = [];
let wrong = [];
let word;

const check = (key) => {
  const places = document.querySelectorAll(".sym");

  if (word.includes(key)) {
    for (var i = 0; i < word.length; i++) {
      if (word[i] === key) {
        wordh.push(key);
        console.log(wordh);
        places[i].innerHTML = key;
      }
    }
  } else {
    if (!wrong.includes(key)) {
      wrong.push(key);
      console.log(wrong);
      showwrong();
    }
  }

  if (word.length === wordh.length) {
    alert("finished");
    return;
  }
};

const showwrong = () => {
  wrongs.innerHTML = "";

  wrong.forEach((w) => {
    wrongs.append(w);
  });
};

const setup = () => {
  const selected = hangs[Math.floor(Math.random() * hangs.length)];

  word = selected.word.toLocaleLowerCase();

  for (var i = 0; i < word.length; i++) {
    const span = document.createElement("span");
    span.setAttribute("class", "sym");
    span.textContent = " _ ";
    place.append(span);
  }

  keys.forEach((key) => {
    const tempkey = key.toLocaleLowerCase();

    const button = document.createElement("button");
    button.textContent = tempkey;
    button.setAttribute("data-key", tempkey);
    button.setAttribute("class", "key");
    keyboard.append(button);
    button.addEventListener("click", (e) => {
      check(e, tempkey);
      e.currentTarget.disabled = true;
    });
  });
};

const givehint = () => {
  let hint = [];
  let temp = wordh.join("");

  for (var i = 0; i < word.length; i++) {
    if (!temp.includes(word[i])) {
      hint.push(word[i]);
    }
  }

  let random = hint[Math.floor(Math.random() * hint.length)];

  check(random);
};

setup();

hintbtn.addEventListener("click", givehint);
