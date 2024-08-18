import {
  getNotes,
  saveNotes,
  getonenote,
  DeleteNotes,
} from "./api/notes-api.js";

const addBtn = document.querySelector(".addbtn");
const notelist = document.querySelector(".notelist");
const editTitle = document.querySelector(".edittitle");
const editBody = document.querySelector(".editbody");
const save = document.querySelector(".save");
let tempNote;

const notedelete = (id) => {
  let x = Number(id);
  DeleteNotes(x);
  refresh();
};

const setAvtivenote = (note) => {
  editTitle.value = note.title;
  editBody.value = note.body;
};

const focuser = (note) => {
  if (note !== null) {
    tempNote = note;
    console.log(tempNote);
    setAvtivenote(note);
  }
};

const createElements = (note) => {
  let x = `<div class="note" data-note="${note.id}">
  <h3 class="title">${note.title}</h3>
  <p class="body">${note.body}</p>
  <p class="time">${note.update}</p>
</div>`;
  return x;
};

const refresh = () => {
  const notes = getNotes();
  notelist.innerHTML = "";
  notes.forEach((note) => {
    let x = createElements(note);
    notelist.insertAdjacentHTML("beforeend", x);
  });
  notelist.querySelectorAll(".note").forEach((note) => {
    note.addEventListener("click", () => {
      let x = getonenote(note.dataset.note);
      focuser(x);
    });

    note.addEventListener("dblclick", () => {
      console.log(note.dataset.note);
      notedelete(note.dataset.note);
    });
  });
  console.log(notes[notes.length - 1]);

  console.log(notes);

  if (notes.length !== 0) {
    focuser(notes[notes.length - 1]);
  }
};

refresh();

addBtn.addEventListener("click", () => {
  let x = {
    title: "New note to add",
    body: "New body too add",
  };

  saveNotes(x);
  refresh();
});

save.addEventListener("click", () => {
  tempNote.title = editTitle.value;
  tempNote.body = editBody.value;
  saveNotes(tempNote);
  tempNote = "";
  editBody.value = "";
  editTitle.value = "";
  refresh();
});
