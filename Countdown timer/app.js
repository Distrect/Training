const out = document.querySelectorAll(".time");

let timer;
function countdown() {
  const date = new Date(2023, 8, 5, 23, 5, 2);
  const dateNow = new Date();

  const diff = date - dateNow;

  let seconds = Math.floor((diff / 1000) % 60);
  let minutes = Math.floor((diff / 1000 / 60) % 60);
  let hours = Math.floor((diff / 1000 / 60 / 60) % 24);
  let days = Math.floor(diff / 1000 / 60 / 60 / 24);

  let datas = [days, hours, minutes, seconds];

  function format(data) {
    if (data < 10) {
      data = `0${data}`;
      return data;
    }
    return data;
  }

  out.forEach(function (item, index) {
    item.innerHTML = format(datas[index]);
  });

  if (diff < 0) {
    clearInterval(timer);
  }
}

timer = window.setInterval(countdown, 1000);
