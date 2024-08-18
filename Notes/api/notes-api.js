export const getNotes = () => {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  return notes;
};

export const DeleteNotes = (id) => {
  const notes = getNotes();
  const newnotes = notes.filter((note) => note.id !== Number(id));
  localStorage.setItem("notes", JSON.stringify(newnotes));
};

export const saveNotes = (notesave) => {
  const notes = getNotes();
  const exist = notes.find((note) => note.id === notesave.id);

  if (exist) {
    exist.title = notesave.title;
    exist.body = notesave.body;
    exist.update = new Date().toISOString();
  } else {
    notesave.id = Math.floor(Math.random() * 1000000);
    notesave.update = new Date().toISOString();
    notes.push(notesave);
  }
  console.log(notes);
  localStorage.setItem("notes", JSON.stringify(notes));
  return notesave;
};
export const getonenote = (id) => {
  const notes = getNotes();
  const tempNote = notes.find((note) => note.id == id);
  return tempNote;
};
