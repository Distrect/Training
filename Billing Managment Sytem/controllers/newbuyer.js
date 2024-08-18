import { Main } from "./main.js";

const form = document.getElementById("form");
const save = document.querySelector("#save");
const cancel = document.querySelector("#cancel");

class Newbuyer extends Main {
  constructor(form, save, cancel) {
    super(form);
    this.form = form;
    this.save = save;
    this.cancel = cancel;

    this.save.addEventListener("click", this.addBuyer);
    this.cancel.addEventListener("click", this.goback);
  }

  addBuyer = () => {
    let name = this.form["name"].value;
    let surname = this.form["surname"].value;

    if (name && surname) {
      this.addUser();
    } else {
      console.log("fill the inps");
    }
  };
}

const newbuyer = new Newbuyer(form, save, cancel);
