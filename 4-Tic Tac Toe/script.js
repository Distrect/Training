"use strict";

const cells = document.querySelectorAll(".cell");
let box = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
let count = 0;
let count1 = 0;
let player0 = "red";
let player1 = "blue";
let randomnum;
var check = [];
var check1 = [];
var win = [
  ["0", "1", "2"],
  ["3", "4", "5"],
  ["6", "7", "8"],
  ["0", "3", "6"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["0", "4", "8"],
  ["2", "4", "6"],
  ["2", "1", "0"],
  ["5", "4", "3"],
  ["8", "7", "6"],
  ["6", "3", "0"],
  ["7", "4", "1"],
  ["8", "5", "2"],
  ["8", "4", "0"],
  ["6", "4", "2"],
];

let win1 = ["0", "1", "2"];
let win2 = ["3", "4", "5"];
let win3 = ["6", "7", "8"];
let win4 = ["0", "3", "6"];
let win5 = ["1", "4", "7"];
let win6 = ["2", "5", "8"];
let win7 = ["0", "4", "8"];
let win8 = ["2", "4", "6"];
let win9 = ["2", "1", "0"];
let win10 = ["5", "4", "3"];
let win11 = ["8", "7", "6"];
let win12 = ["6", "3", "0"];
let win13 = ["7", "4", "1"];
let win14 = ["8", "5", "2"];
let win15 = ["8", "4", "0"];
let win16 = ["6", "4", "2"];

function isEqual(a) {
  let arr1 = a.join();

  if (arr1 === win1.join()) {
    return true;
  } else if (arr1 === win2.join()) {
    return true;
  } else if (arr1 === win3.join()) {
    return true;
  } else if (arr1 === win4.join()) {
    return true;
  } else if (arr1 === win5.join()) {
    return true;
  } else if (arr1 === win6.join()) {
    return true;
  } else if (arr1 === win7.join()) {
    return true;
  } else if (arr1 === win8.join()) {
    return true;
  } else if (arr1 === win9.join()) {
    return true;
  } else if (arr1 === win10.join()) {
    return true;
  } else if (arr1 === win11.join()) {
    return true;
  } else if (arr1 === win12.join()) {
    return true;
  } else if (arr1 === win13.join()) {
    return true;
  } else if (arr1 === win14.join()) {
    return true;
  } else if (arr1 === win15.join()) {
    return true;
  } else if (arr1 === win16.join()) {
    return true;
  } else {
    return false;
  }
}

function randomizer() {
  return box[Math.floor(Math.random() * box.length)];
}

function filterer(value) {
  box = box.filter(function (item) {
    return item !== value;
  });
  //let randomnum = Math.trunc(Math.random() * box.length);
}

function computer() {
  var rand = randomizer();
  if (box.length === 0) {
    alert("no move");
    return;
  }
  cells[rand].style.backgroundColor = "blue";
  cells[rand].style.pointerEvents = "none";
  check1.push(cells[rand].getAttribute("data-cell-index"));
  count1++;
  if (count1 === 3) {
    if (isEqual(check1)) {
      alert("winner");
      return;
    }
    count = 0;
    check1 = [];
  }

  filterer(cells[rand].getAttribute("data-cell-index"));
}

cells.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.target.style.backgroundColor = player0;
    check.push(e.target.getAttribute("data-cell-index"));

    filterer(e.target.getAttribute("data-cell-index"));

    e.target.style.pointerEvents = "none";

    count++;
    if (count === 3) {
      if (isEqual(check)) {
        alert("Winner");
        return;
      }
      count = 0;

      check = [];
    }
    computer();
    console.log(box);
    if (box.length === 0) {
      alert("no move");
      return;
    }
  });
});
