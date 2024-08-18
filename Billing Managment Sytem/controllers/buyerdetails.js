import { Main } from "./main.js";

const table = document.querySelector("#table");

const input = document.querySelector("#search");
const searchBtn = document.querySelector("#btn");
const getAll = document.querySelector("#all");

class BuyerDetails extends Main {
  constructor(search, getAll, table) {
    super(table);
    this.search = search;
    this.getAll = getAll;

    this.search.addEventListener("click", () => {
      if (!(input.value.length < 0)) {
        this.getUser(input.value);
        if (this.user) {
          this.listUser();
          input.value = "";
        }
      }
    });

    this.getAll.addEventListener("click", () => {
      this.getUsers();
      if (this.users) {
        this.users.forEach((it) => {
          this.user = it;
          this.listUser();
        });
      }
    });
  }
}

let buyerDetails = new BuyerDetails(searchBtn, getAll, table);
