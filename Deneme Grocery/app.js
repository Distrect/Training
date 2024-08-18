const input = document.querySelector(".input");
const form = document.querySelector(".inputSec");
const list = document.querySelector(".items");
const submitBtn = document.querySelector(".addbtn");

let edit = false;
let editID = "";
let editElement;

window.addEventListener("DOMContentLoaded", () => {
  const items = getLocaleStorage();

  items.forEach((item) => {
    createElements(item.id, item.value);
  });
});

function deleteFromStorage(id) {
  const items = getLocaleStorage();
  const templist = items.filter((item) => {
    if (item.id != id) {
      return item;
    }
  });
  console.log(templist);
  localStorage.setItem("items", JSON.stringify(templist));
}

function getLocaleStorage() {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  console.log(items);

  return items;
}

function addToLocalStorage(id, value) {
  const items = getLocaleStorage();

  let grocery = { id, value };

  items.push(grocery);

  localStorage.setItem("items", JSON.stringify(items));
}
function editLocalStorage(id, Value) {
  console.log(Value);
  let items = getLocaleStorage();
  console.log(items);
  let tempitems = items.map((item) => {
    if (item.id == id) {
      item.value = Value;
    }
    return item;
  });
  localStorage.setItem("items", JSON.stringify(tempitems));
}

function setDefault() {
  input.value = "";
  edit = false;
  editID = "";
  editElement = "";
  submitBtn.textContent = "add";
}

function createElements(id, value) {
  let art = document.createElement("article");
  art.dataset.id = id;
  console.log(art);
  art.innerHTML = `
  <p class="par">${value}</p>
          <div class="btncontainer">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button> 
          </div>`;
  list.appendChild(art);
  const delBtn = art.querySelector(".delete");
  const edit = art.querySelector(".edit");
  delBtn.addEventListener("click", deleteItem);
  edit.addEventListener("click", editItem);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (value && edit === false) {
    const id = new Date().getTime() * Math.random() * 100000;
    createElements(id, value);
    addToLocalStorage(id, value);

    setDefault();
  } else if (value !== "" && edit === true) {
    editElement.innerHTML = value;
    console.log(editElement.innerHTML);
    editLocalStorage(editID, editElement.innerHTML);
    setDefault();
  } else {
    console.log("wrong value");
  }
});

function deleteItem() {
  const element = this.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  deleteFromStorage(id);
}

function editItem(e) {
  let element = this.parentElement.parentElement;
  editElement = this.parentElement.previousElementSibling;
  editID = element.dataset.id;
  input.value = editElement.innerHTML;
  edit = true;
  submitBtn.textContent = "edit";
}
