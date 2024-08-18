import { getLocal } from "./utils/localstorage.js";

const myform = document.getElementById("form");
const message = document.getElementById("mess");

myform.addEventListener("submit", (e) => {
  e.preventDefault();
  const uname = myform[0].value;
  const password = myform[1].value;
  if (!uname || !password) {
    alert("Cannot be empty");
    return;
  }

  check(uname, password);
});

const check = (uname, password) => {
  const accounts = getLocal();
  accounts.forEach((acc) => {
    if (acc.name === uname && acc.pin === password) {
      localStorage.setItem("name", JSON.stringify(uname));
      location.assign("account.html");
      return;
    } else {
      message.textContent = "Account does not found";
      return;
    }
  });
};

const account1 = {
  name: "Samet",
  owner: "Samet Sarıçiçek",
  moves: [
    { amount: 10, date: "2020-03-03" },
    { amount: -20, date: "2022-10-02" },
  ],
  pin: "1234",
};
const account2 = {
  name: "Emre",
  owner: "Emre Sarıçiçek",
  moves: [
    { amount: 10, date: "2020-03-03" },
    { amount: -20, date: "2022-10-02" },
  ],
  pin: "2222",
};
const account3 = {
  name: "Ezgi",
  owner: "Ezgi Sarıçiçek",
  moves: [
    { amount: 10, date: "2020-03-03" },
    { amount: -20, date: "2022-10-02" },
  ],
  pin: "2332",
};

const accounts = [account1, account2, account3];

localStorage.setItem("accounts", JSON.stringify(accounts));
