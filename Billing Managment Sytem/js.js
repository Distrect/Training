import { Login } from "./controllers/login.js";
import { User } from "./models/user.js";

const form = document.getElementById("myform");

const login = new Login(form);

const a = new User("Samet", "Sarıçiçek");
const b = new User("Emre", "Sarıçiçek");
const c = new User("Ezgi", "Sarıçiçek");
const d = new User("Eylül", "Sarıçiçek");

localStorage.setItem("users", JSON.stringify([a, b, c, d]));
