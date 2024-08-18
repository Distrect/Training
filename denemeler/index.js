const vehicle = document.querySelector(".veh");
const area = document.querySelector(".area");

let enemy = document.createElement("div");
enemy.className = "enemy";
area.append(enemy);

let vehloc = {
  x: 250,
  y: 470,
};

let burray = [];

let last;
let fire;

let speed = 6;
let done = false;

function render(timestamp) {
  checkCollision();
  updateVeh();
  updateEnem(timestamp);
  //console.log(burray);

  if (!done) {
    window.requestAnimationFrame((timestamp) => {
      render(timestamp);
    });
  }
}

function checkCollision() {
  burray.forEach((bull) => {
    if (!(bull.y > enemy.getBoundingClientRect().bottom)) {
      console.log("ben vurdum");
      //area.removeChild(enemy);
    }

    if (!(bull.y < vehicle.getBoundingClientRect().top)) {
      console.log(bull.x);
    }
  });
}

function fires() {
  let veh = vehicle.getBoundingClientRect();
  let bullet = createBullet(veh.top - 12, veh.left + 7);
  let id = Date.now() + Math.floor(Math.random() * 10000);
  burray.push({
    id,
    x: veh.left + 7,
    y: veh.top - 12,
  });
  area.append(bullet);

  function renderFire() {
    let pos = bullet.style.top.slice(0, -2);
    bullet.style.top = `${pos - 5}px`;
    let current = burray.find((it) => it.id === id);
    current.y = pos - 5;

    if (!(pos < 10)) {
      window.requestAnimationFrame(renderFire);
    } else {
      burray = burray.filter((it) => it.id !== id);
      area.removeChild(bullet);
    }
  }

  renderFire();
}

function fireBullet(bullet, id) {
  area.append(bullet);

  function renderBullet() {
    let pos = bullet.style.top.slice(0, -2);
    bullet.style.top = `${parseFloat(pos) + 5}px`;
    let current = burray.find((it) => it.id === id);
    current.y = parseFloat(pos) + 5;

    if (!(pos > 490)) {
      window.requestAnimationFrame(() => {
        renderBullet(bullet);
      });
    } else {
      burray = burray.filter((it) => it.id !== id);
      area.removeChild(bullet);
    }
  }

  renderBullet();
}

function createBullet(pos1, pos2) {
  let bullet = document.createElement("div");
  bullet.className = "bull";
  bullet.style.top = `${pos1}px`;
  bullet.style.left = `${pos2}px`;

  return bullet;
}

function updateEnem(time) {
  let timesec = Math.floor(time / 1000);
  if (last === undefined) last = Math.floor(time / 1000);

  enemy.style.top = "40px";
  enemy.style.left = "280px";

  if (timesec > last * 459) {
    let x = enemy.getBoundingClientRect();
    let bullet = createBullet(x.bottom, x.left + 15);
    let id = Date.now() + Math.floor(Math.random() * 10000);
    burray.push({
      id,
      x: Number(enemy.style.left.slice(0, -2)),
      y: x.left + 15,
    });
    fireBullet(bullet, id);
    last = Math.floor(time / 1000);
  }
}

function updateVeh() {
  let x = vehicle.getBoundingClientRect();
  vehicle.style.top = `${vehloc.y}px`;
  vehicle.style.left = `${vehloc.x}px`;
}

window.requestAnimationFrame((timestamp) => {
  render(timestamp);
});

function moveveh(e) {
  if (e.key === "ArrowLeft" && vehloc.x >= 16) {
    vehloc.x -= speed;
  } else if (e.key === "ArrowRight" && vehloc.x <= 472) {
    vehloc.x += speed;
  } else if (e.key === " ") {
    fires();
  }
}

document.addEventListener("keydown", moveveh);
