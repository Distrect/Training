let date = new Date();

let todayDate = `${date.getFullYear()}-
${date.getMonth() + 1}
-${date.getDate()}`;

export default class Person {
  constructor(id, name, surname, start, end, room) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.start = start;
    this.end = end;
    this.room = room;
    this.todaydate = new Date();
    this.stay = this._subtractDate(this.start, this.end);
    this.left = this._subtractDate(this.end, this.todaydate);
  }

  _subtractDate(start, end) {
    const date1 = new Date(start);

    const date2 = new Date(end);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}

export function uid() {
  let x = Date.now() + Math.floor(Math.random() * 10000);
  console.log(x);
  return x;
}

export function setLocalCustomers(obj) {
  const customers = getLocalCustomers();
  customers.push(obj);
  localStorage.setItem("customers", JSON.stringify(customers));
}

export function getLocalCustomers() {
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  return customers;
}

export function isLater(str1, str2) {
  return new Date(str1) > new Date(str2);
}
