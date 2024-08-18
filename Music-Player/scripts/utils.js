import { fs } from "./newTree.js";
import { /*musicinf,*/ setList, setPlayer } from "./new.js";

export function toggler(element, aclass, bclass) {
  if (element.classList.contains(aclass)) {
    element.classList.remove(aclass);
    element.classList.add(bclass);
    return true;
  } else {
    element.classList.remove(bclass);
    element.classList.add(aclass);
    return false;
  }
}

export function dummy(it, ev, fn) {
  return new Promise((res) => {
    const listener = (e) => {
      res(true);
    };

    it.addEventListener(ev, listener);
  });
}

export function musicInfo(track, musicList) {
  this.currentTrack = track;
  this.volume = audio?.volume;
  this.musicList = musicList;

  this.nextMusic = function () {
    this.index = this.musicList?.indexOf(this.currentTrack);
    this.index = (this.index + 1) % this.musicList.length;
    return this.musicList[this.index];
  };

  this.prevMusic = function () {
    this.index = this.musicList?.indexOf(this.currentTrack);
    this.index =
      (this.index + this.musicList.length - 1) % this.musicList.length;
    return this.musicList[this.index];
  };

  this.setCurrentTrack = function (mus) {
    this.index = this.musicList?.indexOf(this.currentTrack);
    this.currentTrack = mus;
    this.index = this.musicList.indexOf(this.currentTrack);
  };
}

export function alerter(text) {
  const small = document.querySelector(".err");
  small.textContent = text;

  setTimeout(() => {
    small.textContent = "";
  }, 3000);
}

export function fillDetails(file) {
  const details = document.querySelector(".preview");
  details.innerHTML = "";
  if (!file) return;

  file.forEach((item) => {
    let span = document.createElement("span");
    span.innerHTML = item;
    details.appendChild(span);
  });
}

class dummyController {
  constructor() {
    this.activePlayList = null;
    this.activeMusic = null;
    this.playLists = [];
    this.playerop = new musicInfo();
  }

  get playList() {
    return this.activePlayList.musicList;
  }

  setList = () => {
    let arr = this.activePlayList.musicList;
    let id = this.activeMusic.id;

    console.log(arr);

    setList(arr, id);
  };

  selectMusic = (fileName) => {
    let playList = playListsStorage.playLists.find(
      (item) => item.pname === fs.currentDirectory.name
    );
    let music = playList.musicList.find((mus) => mus.songName === fileName);
    this.activePlayList = playList;
    this.activeMusic = music;
    this.setList();
    setPlayer({ currentTrack: music });
    this.playerop.musicList = this.playList;
  };
}

export class playListStorage extends dummyController {
  constructor() {
    super();
  }

  addPlaylist = (folderName) => {
    let newp = {
      pname: folderName,
      musicList: [],
    };
    this.playLists.push(newp);
  };

  savetoPlayList = (prop) => {
    let music = {
      id: prop.id,
      singer: prop.artist,
      songName: prop.name,
      src: prop.source,
    };
    let playlist = this.playLists.find(
      (item) => item.pname === fs.currentDirectory.name
    );

    playlist.musicList.push(music);
    if (this.activePlayList !== null) {
      this.setList();
    }
  };
}

export const playListsStorage = new playListStorage();
