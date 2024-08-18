export class Local {
  users;
  user;

  getUsers = () => {
    this.users = JSON.parse(localStorage.getItem("users")) || [];
  };

  addUserlr(newUser) {
    this.users = this.getUsers();
    this.users.push(newUser);
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  getUser(name) {
    this.getUsers();
    let a = this.users.find((user) => user.name === name);

    if (a) {
      this.user = a;
      console.log("2");
    } else {
      console.log("Not found");
    }
  }

  update() {
    this.getUsers();

    this.users = this.users.filter((user) => this.user.id !== user.id);
    this.users.push(this.user);
    console.log(this.users);

    //this.users = this.users.filter((user) => user.id !== updating.id);
    //this.users.push(updating);

    localStorage.setItem("users", JSON.stringify(this.users));
  }
}
