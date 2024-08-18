let span = document.querySelector("#num");

let btns = document.querySelectorAll(".btns");

let value = 0;

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    console.log(e.target.id);
    if (e.target.id === "rst") {
      value = 0;
    } else if (e.target.id === "inc") {
      value = value + 1;
    } else {
      value = value - 1;
    }
    span.innerHTML = value;
  });
});
