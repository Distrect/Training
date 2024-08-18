export class User {
  constructor(name, surname) {
    this.id;
    this.name = name;
    this.surname = surname;
    this.product = [];
    this.uuid();
  }

  uuid = () => {
    this.id = Date.now() + Math.floor(Math.random() * 10000);
  };
}
