const myform = document.getElementById("myform");
const inputField = document.getElementById("input");
const todoContainer = document.querySelector(".todos");
const donos = document.querySelector(".donos");
const message = document.getElementById("message");
const btnCont = document.querySelector(".btns");

const all = document.querySelector("#all");
const active = document.querySelector("#active");
const complete = document.querySelector("#comp");
const clear = document.querySelector("#clr");
const sortBtn = document.querySelector("#sort");

let items = [];
let deletedItems = [];
let activeItems = items;

function binder() {
  window.remover = document.querySelector("#remove");
  window.readd = document.querySelector("#readd");

  remover.addEventListener("click", removeAll);
  readd.addEventListener("click", addBack);
}

function addBack() {
  items.push(...deletedItems);
  removeAll();
}

function removeAll() {
  deletedItems = [];
  appendItem();
  checkForemp();
}

function filterBy(e) {
  if (items.length === 0) return;
  switch (e.target.textContent) {
    case "All":
      appendItem();
      break;

    case "Active":
      activeItems = searchFilters(false);
      appendItem();
      break;

    case "Completed":
      activeItems = searchFilters(true);
      appendItem();
      break;

    default:
      break;
  }
}

function sorter() {
  console.log(
    items.sort((a, b) => {
      if (a.item < b.item) {
        return -1;
      }

      if (a.item > b.item) {
        return 1;
      }

      return 0;
    })
  );
  appendItem();
}

function clearComp(e) {
  if (items.length === 0) return;
  let tempdel = items.filter((it) => it.isDone === true);
  deletedItems.push(...tempdel);
  items = items.filter((it) => it.isDone === false);

  appendItem();
  addToLocalStorage(items);
}

[all, active, complete].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filterBy(e);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  items = getLocalStorage();
  appendItem();
  checkForemp();
});

clear.addEventListener("click", clearComp);

myform.addEventListener("submit", addItem);

sortBtn.addEventListener("click", sorter);

function addItem(e) {
  e.preventDefault();

  if (!(inputField.value === "")) {
    let itemObj = {
      id: uid(),
      item: inputField.value.trim(),
      isDone: false,
    };
    inputField.value = "";
    items.push(itemObj);
    appendItem();
    addToLocalStorage(items);
  } else {
    message.textContent = "Please enter valid input";
    setTimeout(() => {
      message.textContent = "";
    }, 3000);
  }
}

function appendItem() {
  todoContainer.innerHTML = "";

  if (activeItems.length < 1) {
    activeItems = items;
  }

  activeItems.forEach((obj) => {
    let div = document.createElement("div");

    const { id, item, isDone } = obj;

    div.setAttribute("data-id", id);

    div.innerHTML = `
        <input type="checkbox" id="check" ${isDone ? "checked" : ""}>
         <span class="value">
         ${item}</span>
         <button class="delete">delete</button>
         <button class="edit">edit</button>
  `;

    todoContainer.insertAdjacentElement("afterbegin", div);

    const check = document.querySelector("#check");
    const deleteBtn = document.querySelector(".delete");
    const editBtn = document.querySelector(".edit");

    editBtn.addEventListener("click", editItem);

    deleteBtn.addEventListener("click", deleteItem);

    check.addEventListener("click", checkItem);
  });

  donos.innerHTML = "";

  deletedItems.forEach((obj) => {
    let adiv = document.createElement("div");
    const { id, item } = obj;
    adiv.setAttribute("data-id", id);
    adiv.innerHTML = ` 
    <span>${item}</span>
    <button id="back">back</button>
    <button id="remove">remove</button>
    `;

    donos.insertAdjacentElement("afterbegin", adiv);

    const back = donos.querySelector("#back");
    const remove = donos.querySelector("#remove");

    back.addEventListener("click", add);
    remove.addEventListener("click", removeBack);
  });

  activeItems = [];
}

function removeBack(e) {
  console.log(e);
}

function add(e) {
  console.log(e);
}

function checkItem(e) {
  let parent = e.target.parentElement;
  let id = Number(parent.getAttribute("data-id"));
  let item = itemFinder(id);

  item.isDone ? (item.isDone = false) : (item.isDone = true);
  addToLocalStorage(items);
}

function deleteItem(e) {
  let div = e.target.parentElement;
  let id = Number(div.getAttribute("data-id"));
  todoContainer.removeChild(div);

  let deleted = itemFinder(id);
  deletedItems.push(deleted);

  items = items.filter((it) => it.id !== id);
  appendonos();

  addToLocalStorage(items);
  checkForemp();
}

function editItem(e) {
  let div = e.target.parentElement;
  let id = Number(div.getAttribute("data-id"));

  let eitem = itemFinder(id);
  let temp = div.querySelector(".value");
  let tempInp = document.createElement("input");

  tempInp.type = "text";
  tempInp.value = eitem.item;
  temp.innerHTML = "";
  temp.appendChild(tempInp);
  tempInp.focus();

  tempInp.addEventListener("blur", (e) => {
    saveItem(e, id);
  });
}

function saveItem(e, id) {
  let newVal = e.target.value;
  e.target.parentElement.innerHTML = newVal;
  let tempItem = itemFinder(id);
  tempItem.item = newVal;
  addToLocalStorage(items);
}

function checkForemp() {
  if (todoContainer.childNodes.length === 0) {
    todoContainer.innerHTML = "Empty";
  }
  if (!deletedItems.length < 1) {
    btnCont.innerHTML = `<button id="remove">Remove</button>
    <button id="readd">Add back</button>`;
    binder();
  } else {
    btnCont.innerHTML = "";
  }
}

function appendonos() {
  checkForemp();
  appendItem();
}
