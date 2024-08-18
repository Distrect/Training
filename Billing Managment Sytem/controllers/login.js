import { Local } from "../localStorage/local.js";

export class Login extends Local {
  constructor(form) {
    super();
    this.form = form;
    this.a = 11;
    this.form.addEventListener("submit", this.check);
  }

  check = (e) => {
    e.preventDefault();

    let name = this.form["name"].value;
    let password = this.form["password"].value;

    if (name && password) {
      this.getUser(name);
      console.log(this.user);
      if (this.user !== undefined) {
        if (name === this.user.name) {
          console.log("ok");
          window.sessionStorage.setItem("user", this.user.name);
          window.location.assign("main.html");
        }
      } else {
        console.log("Does not exist");
      }
    }
  };
}
