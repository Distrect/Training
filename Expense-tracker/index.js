"use strict";

export default class ExpenseTracker {
  constructor(root) {
    this.root = root;
    this.income = this.root.querySelector(".Incomes");
    this.expense = this.root.querySelector(".Expenses");
    this.form = this.root.querySelector(".form");
    this.total = this.root.querySelector(".totalized");

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const x = new Object();
      x.id = this.uid();
      x.name = this.form[0].value;
      x.date = this.form[1].value;
      x.amount = parseFloat(this.form[2].value);
      x.type = this.form[3].value;
      this.appender(x);
      this.addTolocalStorage(x);
    });
    this.setup();
  }

  setup() {
    const trackers = this.getLocalStorage();
    console.log(trackers);

    if (trackers.length === 0) {
      alert("empty");

      return;
    }
    trackers.forEach((track) => {
      this.appender(track);
    });
  }

  addTolocalStorage(obj) {
    const trackers = this.getLocalStorage();

    if (!trackers) {
      alert("empty");

      return;
    }

    trackers.push(obj);

    localStorage.setItem("tracker", JSON.stringify(trackers));
  }

  getLocalStorage() {
    const trackers = JSON.parse(localStorage.getItem("tracker")) || [];

    return trackers;
  }

  uid() {
    let x = Date.now() + Math.floor(Math.random() * 10000);
    console.log(x);
    return x;
  }

  appender(obj) {
    let div = document.createElement("div");
    div.dataset.id = obj.id;
    div.innerHTML = `

          <p class="Idate" contenteditable="false">${obj.date}</p>
          <p class="Iname" contenteditable="false">${obj.name}</p>
          <p class="amount" contenteditable="false">${obj.amount}</p>
          <div>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
          </div>
          <hr>


    `;
    obj.type === "income"
      ? this.income.appendChild(div)
      : this.expense.appendChild(div);

    div
      .querySelector(".edit")
      .addEventListener("click", this.editItem.bind(this));

    div
      .querySelector(".delete")
      .addEventListener("click", this.deleteItem.bind(this));

    this.totalizer();
  }

  deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const parent = element.parentElement;
    console.log(element);

    const id = Number(element.dataset.id);

    parent.removeChild(element);

    let trackers = this.getLocalStorage();
    trackers = trackers.filter((track) => track.id !== id);
    localStorage.setItem("tracker", JSON.stringify(trackers));

    this.totalizer();
  }

  totalizer() {
    let totalinc = 0;
    const incomeAmounts = this.income.querySelectorAll(".amount");
    incomeAmounts.forEach((element) => {
      totalinc = totalinc + parseFloat(element.innerHTML);
    });

    let totalexp = 0;
    const expenseAmount = this.expense.querySelectorAll(".amount");
    expenseAmount.forEach((element) => {
      totalexp = totalexp + parseFloat(element.innerHTML);
    });

    this.total.innerHTML = `Total is ${totalinc - totalexp} `;
  }

  editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = Number(element.dataset.id);

    const trackers = this.getLocalStorage();
    let tracker = trackers.find((track) => track.id === id);

    let edit = false;

    const date = element.querySelector(".Idate");
    const name = element.querySelector(".Iname");
    const amount = element.querySelector(".amount");
    if (
      date.contentEditable === "false" &&
      name.contentEditable === "false" &&
      amount.contentEditable === "false"
    ) {
      date.contentEditable = "true";
      name.contentEditable = "true";
      amount.contentEditable = "true";
    } else {
      date.contentEditable = "false";
      name.contentEditable = "false";
      amount.contentEditable = "false";

      tracker.date = date.innerHTML;
      tracker.name = name.innerHTML;
      tracker.amount = Number(amount.innerHTML);

      localStorage.setItem("tracker", JSON.stringify(trackers));
      this.totalizer();
    }
  }
}
