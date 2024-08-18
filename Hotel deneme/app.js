"use strict";
import { uid, setLocalCustomers, getLocalCustomers, isLater } from "./utils.js";
import Person from "./utils.js";

const form = document.getElementById("form");
const optionBox = document.querySelector(".room");
let roomNo = JSON.parse(localStorage.getItem("rooms")) || [];
let date = new Date();
let todayDate = `${date.getFullYear()}-
${date.getMonth() + 1}-
${date.getDate()}`;

const customerList = document.querySelector(".custs-list");

function deleteItem(e) {
  const element = e.target.parentElement.parentElement;
  const id = Number(element.dataset.id);
  customerList.removeChild(element);
  const customers = getLocalCustomers();
  const newcustomers = customers.filter((custom) => custom.id !== id);
  localStorage.setItem("customers", JSON.stringify(newcustomers));
}

function editItem(e) {
  const element = e.target.parentElement.parentElement;
  const id = element.dataset.id;
  location.assign(`./edit.html#${id}`);
}

function createAppend(obj) {
  if (!obj) {
    alert("no object");
    return;
  }
  let div = document.createElement("div");
  div.dataset.id = obj.id;
  div.setAttribute("class", "person");
  div.innerHTML = `
        <p class="name">Name:${obj.name}</p>
        <p class="surname">Surname:${obj.surname}</p>
        <p class="start">Start Date:${obj.start}</p>
        <p class="end">End date:${obj.end}</p>
        <p class="room">Room Number:${obj.room}</p>
        <p class="stay">Stay Day:${obj.stay}</p>
        <p class="left">Left Days:${obj.left}</p>
        <div class="btns">
          <button class="edit">edit</button>
          <button class="delete">delete</button>
        </div>
  `;
  customerList.appendChild(div);
  const editBtn = div.querySelector(".edit");
  const deleteBtn = div.querySelector(".delete");
  editBtn.addEventListener("click", editItem);
  deleteBtn.addEventListener("click", deleteItem);
}

function createRecord(name, surname, start, end, room) {
  let id = uid();
  let p = new Person(id, name, surname, start, end, room);
  setLocalCustomers(p);
  createAppend(p);
}

function setLocalRooms() {
  localStorage.setItem("rooms", JSON.stringify(roomNo));
}

function removeOps() {
  while (optionBox.options.length > 1) {
    optionBox.remove(1);
  }
}

function setRoom() {
  removeOps();
  var i = 1;
  for (let item of roomNo) {
    optionBox[i] = new Option(item, item, false, false);
    i++;
  }
  setLocalRooms();
}

window.addEventListener("DOMContentLoaded", () => {
  setRoom();
  customerList.innerHTML = "";
  const customers = getLocalCustomers();
  customers.forEach((custom) => {
    createAppend(custom);
  });
});

function setDefault() {
  form[0].value = "";
  form[1].value = "";
  form[2].value = "";
  form[3].value = "";
  form[4].value = optionBox.options[0].value;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (roomNo.length > 0) {
    const name = form[0].value;
    const surname = form[1].value;
    const start = form[2].value;
    const end = form[3].value;
    let room = form[4].value;

    if (!isLater(end, todayDate) && !isLater(end, start)) {
      alert("Please enter valid date");
      setDefault();
      return;
    }

    if (room === "Choose Room") {
      room = roomNo[Math.floor(Math.random() * roomNo.length)];
    }

    roomNo = roomNo.filter((r) => r != room);

    setRoom();
    setDefault();
    createRecord(name, surname, start, end, room);
  } else {
    alert("Rooms are full");
    return;
  }
});
