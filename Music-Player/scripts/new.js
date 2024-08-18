// 1-) get music list and last info
// 2-) set music list and info
// 3-) set searchbar
// 4-) set BUttons

import { toggler, dummy, playListsStorage } from "./utils.js";

const audio = document.getElementById("audio");

const musicTimeSpan = document.getElementById("v");
const sidebar = document.querySelector(".sidebar");

const loopBtn = document.getElementById("loop");
const volumeSlide = document.getElementById("volume-controller");
const nextBtn = document.getElementById("nextTrack");
const prevBtn = document.getElementById("prevTrack");
const muteBtn = document.getElementById("mute");
const rangeSlide = document.getElementById("range");
const playBtn = document.getElementById("play");
const close = document.getElementById("close");
const searchbar = document.getElementById("searchm");
const searchbarList = document.querySelector(".auto-list");

let recent = new Set();
let audvolume;
let isPlaying = false;
let frame;
let sliding = false;

async function getfromLocalStorage() {
  let musicList = JSON.parse(localStorage.getItem("mainMusic"));
  let lastMusic = JSON.parse(localStorage.getItem("lastMusic")) || null;
  let currentTrack;

  if (lastMusic !== null) {
    let { songID, loop, volume } = lastMusic;
    audvolume = volume;
    currentTrack = musicList.find((msc) => msc.id === songID);
  } else {
    currentTrack = musicList[0];
    audvolume = 0.5;
  }

  playListsStorage.playerop.currentTrack = currentTrack;
  playListsStorage.playerop.volume = audvolume;
  playListsStorage.playerop.musicList = musicList;

  await setPlayer({ currentTrack, audvolume });
  setList(musicList, currentTrack.id);
  //setSearch(musicList);
}

export function setList(arr, id) {
  const ul = document.getElementById("ul-li");
  ul.innerHTML = "";
  arr.forEach((music) => {
    let li = document.createElement("li");
    li.setAttribute("data-sid", music.id);

    if (music.id === id) li.classList.add("selected");

    li.innerHTML = `
  <a href="#">
        <input
          type="checkbox"
          name="${music.id}"
          id="list-check"
        />
        <i
          class="fa fa-user-circle-o fa-2x"
          id="icn"
          aria-hidden="true"
        ></i>
        <p id="inf">
          <span>${music.songName}</span>
          <small>${music.singer}</small>
        </p>
    </a>
`;
    ul.appendChild(li);
    li.onclick = selectListener(music);
  });
}

function selectListener(mus, par = null) {
  return function (e) {
    playListsStorage.playerop.setCurrentTrack(mus);
    if (par) {
      par.previousElementSibling.value = "";
      par.children[0].innerHTML = "";
      par.style.display = "none";
      recent.add(mus);
    }

    clearSelected(mus.id);
    setPlayer({ currentTrack: mus });
  };
}

export async function setPlayer(
  { audloop = null, audvolume = null, currentTrack },
  selected = false
) {
  const singerName = document.querySelector(".s");
  const musicName = document.querySelector(".m");

  singerName.textContent = currentTrack.singer;
  musicName.textContent = currentTrack.songName;

  if (audvolume !== null)
    (audio.volume = audvolume), (volumeSlide.value = audvolume * 100);

  if (audloop !== null && audloop) loopBtn.classList.add("loopActive");

  audio.src = currentTrack.src;

  await dummy(audio, "canplaythrough");

  resetSets();
  readyPlayer(selected);
}

function setSearch(arr) {
  let searchul = document.querySelector(".auto-list ul");

  arr.forEach((music) => {
    let { songName, singer, id } = music;

    let lif = document.createElement("li");
    lif.setAttribute("singer", singer);
    lif.setAttribute("data-sid", id);

    lif.textContent = songName;
    searchul.append(lif);
    lif.onclick = selectListener(music, searchul.parentElement);
  });
}

export function populateListeners() {
  nextBtn.onclick = function (e) {
    let next = playListsStorage.playerop.nextMusic();
    return selectListener(next)();
  };

  prevBtn.onclick = function (e) {
    let prev = playListsStorage.playerop.prevMusic();

    return selectListener(prev)(e);
  };

  loopBtn.addEventListener("click", (e) => {
    audio.loop = loopBtn.classList.toggle("loopActive");
  });

  muteBtn.addEventListener("click", function (e) {
    let a = toggler(muteBtn, "fa-volume-off", "fa-volume-up");
    changeVolume(a, null);
  });

  volumeSlide.addEventListener("input", (e) => {
    let vol = +e.target.value;
    changeVolume(null, vol);
  });

  close.addEventListener("click", (e) => {
    close.classList.toggle("open");
    sidebar.classList.toggle("close");
  });

  /*searchbar.addEventListener("input", (e) => {
    let typed = e.target.value;
    let list = musicinf.musicList;
    let ul = searchbarList.children[0];

    searchbarList.style.display = "block";

    ul.innerHTML = "";

    if (!typed) return;

    for (let i = 0; i < list.length; i++) {
      if (
        typed.toLowerCase() ===
        list[i].songName.substring(0, typed.length).toLowerCase()
      ) {
        setSearch([list[i]]);
      }
    }
  });

  searchbar.onclick = (e) => {
    searchbarList.style.display = "block";
    setSearch([...recent]);
  };*/

  window.onclick = function (e) {
    if (sidebar.contains(e.target) || searchbar.contains(e.target)) return;
    close.classList.remove("open");
    sidebar.classList.remove("close");
    searchbarList.style.display = "none";
    searchbarList.children[0].innerHTML = "";
  };
}

function changeVolume(bool, vol) {
  if (bool !== null) {
    audio.volume = bool ? 0.5 : 0;
    volumeSlide.value = bool ? 0.5 * 100 : 0;
  }

  if (vol !== null) {
    if (vol === 0) toggler(muteBtn, "fa-volume-off", "fa-volume-up");
    else muteBtn.classList.replace("fa-volume-off", "fa-volume-up");
  }
  audio.volume = vol / 100;
}

function clearSelected(id) {
  const ul = document.getElementById("ul-li");

  let list = ul.querySelectorAll("li");
  list.forEach((li) => {
    let sid = +li.dataset["sid"];

    if (sid === id) {
      li.classList.add("selected");
    } else {
      li.classList.remove("selected");
    }
  });
}

export function resetSets() {
  musicTimeSpan.textContent = "00:00";
  rangeSlide.value = 0;
}

export function readyPlayer() {
  window.cancelAnimationFrame(frame);
  isPlaying ? audio.play() : audio.pause();

  rangeSlide.min = 0;
  rangeSlide.max = audio.duration;

  rangeSlide.oninput = function () {
    sliding = true;
  };
  rangeSlide.onmouseup = function (e) {
    audio.currentTime = +e.currentTarget.value;
    sliding = false;
    if (frame) window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(observer);
  };

  audio.onplay = function () {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    frame = window.requestAnimationFrame(observer);
  };
  audio.onpause = function () {
    playBtn.classList.replace("fa-pause", "fa-play");
    window.cancelAnimationFrame(frame);
  };
  audio.onended = function (e) {
    //if (dum === false) return playBtn.classList.replace("fa-pause", "fa-play");
    nextBtn.click();
  };
}

export function observer(timestamp) {
  let currentTime = audio.currentTime;
  let m, s;

  m = Math.floor(currentTime / 60);
  s = Math.floor(currentTime - m * 60);

  if (s < 10) s = "0" + s;
  if (m < 10) m = "0" + m;

  musicTimeSpan.textContent = m + ":" + s;

  if (sliding === false) rangeSlide.value = audio.currentTime;

  if (isPlaying) frame = window.requestAnimationFrame(observer);
}

playBtn.addEventListener("click", function (e) {
  isPlaying = toggler(play, "fa-play", "fa-pause");
  isPlaying ? audio.play() : audio.pause();
});
/*--------------------*/

window.addEventListener("DOMContentLoaded", async () => {
  await getfromLocalStorage();
  populateListeners();
});

/*searchbar.addEventListener("input", (e) => {
  let typed = e.target.value;
  let list = musicinf.musicList;
  let ul = searchbarList.children[0];

  searchbarList.style.display = "block";

  ul.innerHTML = "";

  if (!typed) return;

  for (let i = 0; i < list.length; i++) {
    if (
      typed.toLowerCase() ===
      list[i].songName.substring(0, typed.length).toLowerCase()
    ) {
      setSearch([list[i]]);
    }
  }
});

searchbar.onclick = (e) => {
  searchbarList.style.display = "block";
  setSearch([...recent]);
};

window.onclick = function (e) {
  if (sidebar.contains(e.target) || searchbar.contains(e.target)) return;
  close.classList.remove("open");
  sidebar.classList.remove("close");
  searchbarList.style.display = "none";
  searchbarList.children[0].innerHTML = "";
};*/
