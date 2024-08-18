document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");

  let currentSnake = [2, 1, 0];
  let width = 10;
  let interval;
  let time = 450;
  let speed = 0.4;

  let direction = 1;
  let before;
  randomApple();

  function display() {
    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);

    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomApple();
    }

    squares[currentSnake[0]].classList.add("snake");
  }

  interval = setInterval(display, time);

  function randomApple() {
    appleIndex = Math.floor(Math.random() * squares.length);

    if (squares[appleIndex].classList.contains("snake")) {
      randomApple();
    } else {
      squares[appleIndex].classList.add("apple");
    }
  }

  function control(e) {
    if (e.keyCode === 39 && direction !== -1) {
      direction = 1;
    } else if (e.keyCode === 38 && direction !== +width) {
      direction = -width;
    } else if (e.keyCode === 37 && direction !== 1) {
      direction = -1;
    } else if (e.keyCode === 40 && direction !== -width) {
      direction = +width;
    }
  }

  document.addEventListener("keyup", (e) => {
    control(e);
  });
});
