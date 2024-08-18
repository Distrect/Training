import { fs } from "./newTree.js";
import { alerter, fillDetails, playListsStorage } from "./utils.js";
// import { setPlayer, setList, musicinf } from "./new.js";

const drawerBtn = document.getElementById("drawerClsBtn");
const createFolderBtn = document.getElementById("create-folder");
const uploadFile = document.getElementById("label");
const goBackBtn = document.getElementById("back");
const drawerContainer = document.querySelector(".file-content");

function addItem(prop) {
  let itemView = document.createElement("div");
  itemView.classList.add(prop.type, "item");

  let template = `
    <img src= "/Music-Player/resources/${prop.type}.png" alt="folder">
    <small>${prop.name}</small>
  `;

  itemView.innerHTML = template;
  drawerContainer.appendChild(itemView);

  prop.constructor.name === "File"
    ? playListsStorage.savetoPlayList(prop)
    : playListsStorage.addPlaylist(prop.name);

  itemView.ondblclick = function () {
    prop.constructor.name === "File"
      ? handleFileOpen(prop.name)
      : openDirectory(prop.name);
  };
}

function openDirectory(folderName) {
  console.log(folderName);
  fs.openDirectory(folderName);
  populateItems();
  populateCrumb();
}

function handleFileModal() {
  const yesBtn = document.querySelector(".yes");
  const cancel = document.querySelector(".no");
  const input = document.getElementById("modal-input");
  const modal = document.getElementById("modal");
  let checkcb = (val) => fs.hasItem(val);
  modal.classList.toggle("block");

  yesBtn.onclick = function (e) {
    let val = input.value;

    if (!val) return alerter("Cannot be empty");

    if (checkcb(val)) return alerter("This folder alredy exist");

    modal.classList.toggle("block");

    input.value = "";

    let item = fs.createDirectory(val);

    return addItem(item);
  };

  cancel.onclick = function () {
    modal.classList.toggle("block");
  };
}

function handleFileOpen(fileName) {
  playListsStorage.selectMusic(fileName);
}

function handlegoBack() {
  fs.goBack();
  populateCrumb();
  populateItems();
}

function populateItems() {
  let items = fs.content;
  drawerContainer.innerHTML = "";

  if (items.length === 0) return;

  items.forEach((item) => addItem(item));
}

function modalHandler() {
  const modal = document.getElementById("nmodal");
  const yesBtn = document.getElementById("myes");
  const cancel = document.getElementById("mcancel");
  const input = document.getElementById("artist");
  const fileInput = document.getElementById("file-inputer");

  let fileInp = null;

  modal.classList.toggle("mopen");

  fileInput.addEventListener("input", (e) => {
    let { name, size } = fileInput.files[0];
    size = Math.floor(size / 1024 / 1024) + " " + "mb";
    fileInp = name = name.split(".")[0];
    fillDetails([name, size]);
  });

  yesBtn.onclick = function (e) {
    let val = input.value;
    if (!val) return console.log("Canot empty");

    if (!fileInp) return console.log("File not slected");

    let item = fs.createFile(fileInp, val);

    if (item === null || item === undefined) return;

    modal.classList.toggle("mopen");
    input.value = "";
    fillDetails("");
    return addItem(item);
  };

  cancel.onclick = function (e) {
    modal.classList.toggle("mopen");
  };
}

function populateCrumb() {
  const crumbContainer = document.querySelector(".router-bar");
  let crumb = fs.currentDirectoryPath;

  crumbContainer.innerHTML = "";

  crumb.forEach((cr) => {
    let span = document.createElement("span");
    span.textContent = cr + "/";

    crumbContainer.appendChild(span);
  });
}

export function eventListeners() {
  drawerBtn.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.classList.toggle("fclose");
  });

  createFolderBtn.addEventListener("click", handleFileModal);

  uploadFile.addEventListener("click", modalHandler);

  goBackBtn.addEventListener("click", handlegoBack);
}

//On load

export function init() {
  eventListeners();
  populateCrumb();
  playListsStorage.addPlaylist(fs.currentDirectory.name);
  populateItems();
}

fs.toTree();

eventListeners();
populateCrumb();
playListsStorage.addPlaylist(fs.currentDirectory.name);
populateItems();
