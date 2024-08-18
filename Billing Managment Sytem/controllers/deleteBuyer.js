import { Main } from "./main.js";

const input = document.querySelector("#search");
const btn = document.querySelector("#btn");
const cont = document.querySelector(".cont");

class DeleteBuyer extends Main {
  constructor(cont) {
    super(cont);
    this.cont = cont;

    btn.addEventListener("click", () => {
      if (!(input.value.length < 0)) {
        this.getUser(input.value);
        if (this.user) {
          this.listUser();
          this.repeat();
        }
      }
    });
  }

  repeat = () => {
    const deleteBtn = document.querySelector(".delete");
    deleteBtn.addEventListener("click", function () {
      let name = this.parentElement;
      console.log(document);
      if (false) {
        this.getUser(name);
        console.log(this.user);
      }
    });
  };
}

let deleteBuyer = new DeleteBuyer(cont);
