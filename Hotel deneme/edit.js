import { getLocalCustomers } from "./utils.js";

const form = document.getElementById("form");
const id = Number(location.hash.substring(1));
const customers = getLocalCustomers();

const current = customers.find((custom) => {
  if (custom.id === id) {
    return custom;
  }
});

form[0].value = current.name;
form[1].value = current.surname;
form[2].value = current.end;

form.addEventListener("submit", () => {
  current.name = form[0].value;
  current.surname = form[1].value;
  current.end = form[2].value;
  localStorage.setItem("customers", JSON.stringify(customers));
});
