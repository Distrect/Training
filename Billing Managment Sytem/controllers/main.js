import { User } from "../models/user.js";
import { Local } from "../localStorage/local.js";

export class Main extends Local {
  constructor(form, message) {
    super();
    this.form = form;
    this.message = message;

    this.check();
  }

  check = () => {
    const isLoged = sessionStorage.getItem("user");
    if (isLoged === null) {
      sessionStorage.clear();
      window.location.assign(
        "http://127.0.0.1:5500/Billing%20Managment%20Sytem/views/login.html"
      );
    }
  };

  showMessage = (commet) => {
    console.log(commet);
    this.message.innerHTML = commet;

    let span = setTimeout(() => {
      this.message.textContent = "";
    });
  };

  goback = () => {
    this.user = undefined;
    window.location.assign(
      "http://127.0.0.1:5500/Billing%20Managment%20Sytem/views/main.html"
    );
  };

  addUser = () => {
    const newUser = new User(this.form[0].value, this.form[1].value);
    this.addUserlr(newUser);
  };

  updateUser = () => {
    this.user.name = this.form[0].value;
    this.user.surname = this.form[1].value;
    this.update();
  };

  listUser = () => {
    let tr = document.createElement("div");
    let div = document.createElement("div");
    tr.setAttribute("id", this.user.name);

    let html = `
    
    <span>${this.user.name}</span>
    <span>${this.user.surname}</span>
    ${
      this.form.getAttribute("name") === "delete"
        ? "<button class='delete'>Delete</button>"
        : ""
    }
      `;
    tr.innerHTML = html;
    div.innerHTML = tr;
    console.log(tr);
    this.form.getAttribute("name") === "delete"
      ? (this.form.innerHTML = Ap)
      : this.form.append(tr);
  };
}

const a = new Main();
