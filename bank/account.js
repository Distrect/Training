import { getLocal } from "./utils/localstorage.js";

const movements = document.querySelector(".movements");
const welcome = document.getElementById("username");

const totalspawn = document.getElementById("total");

let uname;

if (JSON.parse(localStorage.getItem("name"))) {
  uname = JSON.parse(localStorage.getItem("name"));
  welcome.textContent = uname;
} else {
  location.assign("index.html");
}

const accounts = getLocal();
const currentAccount = accounts.find((acc) => acc.name === uname);

const showTotal = () => {
  let total = 0;
  currentAccount.moves.forEach((mov) => (total += mov.amount));
  total < 0 ? (totalspawn.textContent = `You have ${-total} debt`) : total;
};

const createRow = (obj) => {
  let row = document.createElement("div");
  row.setAttribute("clas", "row");
  row.innerHTML = `
      
      <div class="type">${obj.amount < 0 ? "Withdrawal" : "Deposit"}</div>
      <div class="amount">${obj.amount}</div>
      <div class="date">${obj.date}</div>
      <hr />
  `;

  movements.insertAdjacentElement("beforeend", row);
};

const displayMovements = () => {
  const movements = [...currentAccount.moves];

  movements.forEach((moves) => {
    createRow(moves);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  displayMovements();
  showTotal();
});

// window.addEventListener("beforeunload", () => {
//   localStorage.removeItem("name");
// });

// const date = new Date();
// console.log(date.toISOString().slice(0, 10));
