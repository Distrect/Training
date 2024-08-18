const section = document.querySelector(".section");

const generate = () => {
  let cardData = [
    { imgSrc: "./images/beatles.jpeg", id: 1, name: "beatles" },
    { imgSrc: "./images/blink182.jpeg", id: 2, name: "blink 182" },
    { imgSrc: "./images/fkatwigs.jpeg", id: 3, name: "fka twigs" },
    { imgSrc: "./images/fleetwood.jpeg", id: 4, name: "fleetwood" },
    { imgSrc: "./images/joy-division.jpeg", id: 5, name: "joy division" },
    { imgSrc: "./images/ledzep.jpeg", id: 6, name: "lep zeppelin" },
    { imgSrc: "./images/metallica.jpeg", id: 7, name: "metallica" },
    { imgSrc: "./images/pinkfloyd.jpeg", id: 8, name: "pink floyd" },
    { imgSrc: "./images/beatles.jpeg", id: 9, name: "beatles" },
    { imgSrc: "./images/blink182.jpeg", id: 10, name: "blink 182" },
    { imgSrc: "./images/fkatwigs.jpeg", id: 11, name: "fka twigs" },
    { imgSrc: "./images/fleetwood.jpeg", id: 12, name: "fleetwood" },
    { imgSrc: "./images/joy-division.jpeg", id: 13, name: "joy division" },
    { imgSrc: "./images/ledzep.jpeg", id: 14, name: "led zeppelin" },
    { imgSrc: "./images/metallica.jpeg", id: 15, name: "metallica" },
    { imgSrc: "./images/pinkfloyd.jpeg", id: 16, name: "pink floyd" },
  ];

  cardData.sort(() => Math.random() - 0.5);

  cardData.forEach((card) => {
    const cardDiv = document.createElement("div");
    const image = document.createElement("img");
    cardDiv.style.height = "25px";
    cardDiv.style.width = "25px";
    cardDiv.style.backgroundColor = "black";
    image.src = card.imgSrc;
    image.setAttribute("name", card.name);
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.objectFit = "fill";
    image.style.visibility = "hidden";
    cardDiv.appendChild(image);
    section.appendChild(cardDiv);

    cardDiv.addEventListener("click", (e) => {
      const el = e.target.firstChild;
      el.classList = "selected";
      el.style.visibility = "visible";
      const opened = document.querySelectorAll(".selected");
      if (opened.length === 2) {
        if (opened[0].getAttribute("name") === opened[1].getAttribute("name")) {
          opened[0].classList.remove("selected");
          opened[1].classList.remove("selected");
        } else {
          opened.forEach((open) => {
            setTimeout(() => {
              open.style.visibility = "hidden";
            }, 1000);
            open.classList.remove("selected");
          });
        }
      }
    });
  });
};

generate();
