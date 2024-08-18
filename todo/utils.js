function uid() {
  let x = Date.now() + Math.floor(Math.random() * 10000);

  return x;
}

function getLocalStorage() {
  const items = JSON.parse(localStorage.getItem("todos")) || [];
  return items;
}

function addToLocalStorage(items) {
  console.log(items);
  if (items !== undefined) {
    localStorage.setItem("todos", JSON.stringify(items));
  }
}

function searchFilters(bool) {
  return items.filter((it) => it.isDone === bool);
}

function itemFinder(id) {
  return items.find((it) => it.id === id);
}
