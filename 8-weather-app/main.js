let api = {
  key: "1d184816e1a32cd8bcf3d584da386834",
  base: "https://api.openweathermap.org/data/2.5/",
};

function fetcc(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(display);
}

function display(weather) {
  console.log(weather);

  const city = document.querySelector(".location .city");
  city.innerHTML = weather.name;
}

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuerry);

function setQuerry(evt) {
  if (evt.keyCode === 13) {
    fetcc(searchBox.value);
  }
}
