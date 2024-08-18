import { Main } from "./main.js";

const input = document.querySelector("#search");
const btn = document.querySelector("#btn");

const form = document.querySelector("#form");
const message = document.querySelector(".message");

const save = document.querySelector("#save");
const cancel = document.querySelector("#cancel");

console.log(message);

class UpdateBuyer extends Main {
  constructor(form, save, cancel, message) {
    super(form, message);
    this.form = form;
    this.save = save;
    this.cancel = cancel;
    console.log(this.user);

    btn.addEventListener("click", () => {
      if (input.value.length !== 0) {
        this.getUser(input.value);

        if (this.user) {
          this.form[0].value = this.user.name;
          this.form[1].value = this.user.surname;
          input.value = "";
        } else {
          this.showMessage("Not Found");
          console.log("1");
        }
      }
    });

    this.save.addEventListener("click", this.saveUser);
    this.cancel.addEventListener("click", this.goback);
  }

  saveUser = () => {
    if (this.user !== undefined) {
      this.updateUser();
      this.user = undefined;
      this.form[0].value = "";
      this.form[1].value = "";
    }
  };
}

const ubuyer = new UpdateBuyer(form, save, cancel, message);
