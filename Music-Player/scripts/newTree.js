export default class Item {
  #name = "";
  #parent = "";

  constructor(name) {
    if (this.constructor.name === "Item") {
      throw new Error("Abstract");
    }
    this.name = name;
  }

  get path() {
    if (this.parent) {
      return `${this.parent.path}/${this.name}`;
    }

    return this.name;
  }

  set name(newName) {
    if (!newName || typeof newName !== "string")
      throw new Error("The file name cannot be empty");

    this.#name = newName.trim();
  }
  get name() {
    return this.#name;
  }

  set parent(newParent) {
    if (newParent !== this.#parent) {
      let prevParent = this.#parent;
      this.#parent = newParent;

      if (prevParent) {
        prevParent.removeItem(this.name);
      }

      if (newParent) {
        newParent.insertItem(this);
      }
    }
  }

  get parent() {
    return this.#parent;
  }
}

class File extends Item {
  #id;
  #musicName = "";
  #artist = "";
  #source = null;
  path = String.raw`resources\music`;
  type = "music";

  constructor(name = "", artist = "YTD") {
    super(name || "unnamed-file");
    this.artist = artist;
    this.source = name;
    this.musicName = name;
    this.#id = this.uuid();
  }

  set musicName(newName) {
    if (!newName) throw new Error("The name of file cannot be empty");

    this.#musicName = newName + ".mp3";
  }

  set artist(newArtist) {
    if (!newArtist) throw new Error("Artist name cannot be empty");

    this.#artist = newArtist;
  }

  set source(sourcePath) {
    if (!sourcePath) throw new Error("Cannot be empty amk");

    this.#source = this.path + "\\" + sourcePath + ".mp3";
  }

  get musicName() {
    return this.#musicName;
  }

  get artist() {
    return this.#artist;
  }

  get source() {
    return this.#source;
  }

  get copy() {
    return new File(`${this.musicName}-copy`, this.artist, this.source);
  }

  get id() {
    return this.#id;
  }

  uuid() {
    let x = Date.now() + Math.floor(Math.random() * 10000);
    return x;
  }
}

class Directory extends Item {
  #children = new Map();
  type = "folder";

  constructor(name = "") {
    super(name || "new-directory");
  }

  get content() {
    return Array.from(this.#children.values());
  }

  get copy() {
    const dirCopy = new Directory(`${this.name}-copy`);

    this.content.forEach((item) => {
      const itemCopy = item.copy;
      itemCopy.name = item.name;
      dirCopy.insertItem(itemCopy);
    });

    return dirCopy;
  }

  hasItem(itemName) {
    return this.#children.has(itemName);
  }

  getItem(itemName) {
    return this.#children.get(itemName) || null;
  }

  removeItem(itemName) {
    const item = this.getItem(itemName);

    if (item) {
      item.parent = null;
      this.#children.delete(itemName);
    }

    return !this.hasItem(itemName);
  }

  insertItem(item) {
    if (this.hasItem(item.name))
      return console.log("this item exist in this directoyr");

    if (item === this) throw new Error("Directory cannot contain iteself");

    let parent = this.parent;

    while (parent) {
      if (parent === item) throw new Error("Item cannot contain its anchestor");

      parent = parent.parent;
    }

    item.parent = this;
    this.#children.set(item.name, item);

    return this.hasItem(item.name);
  }
}

class FileSystem {
  #self = new Directory("root");
  #currentDirectory = this.#self;
  #currentDirectoryPath = [this.#currentDirectory];

  get currentDirectory() {
    return this.#currentDirectory;
  }

  get currentDirectoryPath() {
    return this.#currentDirectoryPath.map((dir) => `${dir.name}`);
  }

  get root() {
    return this.#self;
  }

  get parent() {
    return null;
  }

  get name() {
    return this.root.name;
  }

  get copy() {
    const fsCopy = new FileSystem();

    this.root.content.forEach((item) => {
      const itemCopy = item.copy;
      itemCopy.name = item.name;
      fsCopy.insertItem(itemCopy);
    });

    return fsCopy;
  }

  get content() {
    return this.currentDirectory.content;
  }

  insertItem(item) {
    return this.currentDirectory.insertItem(item);
  }

  getItem(itemName) {
    return this.#currentDirectory.getItem(itemName);
  }

  hasItem(itemName) {
    return this.currentDirectory.hasItem(itemName);
  }

  removeItem(itemName) {
    return this.currentDirectory.removeItem(itemName);
  }

  createFile(fileName, prop, tree = true) {
    const newFile = new File(fileName, prop);

    const inserted = this.insertItem(newFile);

    if (tree) this.toJson();

    return inserted ? newFile : null;
  }

  createDirectory(dirName, tree = true) {
    const newDir = new Directory(dirName);

    const inserted = this.insertItem(newDir);

    if (tree) this.toJson();

    return inserted ? newDir : null;
  }

  renameItem(currentName, newName) {
    const item = this.getItem(currentName);

    if (item) {
      item.name = newName;
      this.removeItem(currentName);
      this.insertItem(item);
      return item;
    }

    return null;
  }

  copyItem(itemName) {
    const item = this.getItem(itemName);

    if (item) {
      const itemCopy = item.copy;
      this.insertItem(itemCopy);
      return itemCopy;
    }

    return null;
  }

  printDirectory() {
    console.log(
      `\n[${this.currentDirectoryPath.join("/")}]:` +
        (this.currentDirectory.content
          .map(
            (item) =>
              `\n[${item.constructor.name.substring(0, 1)}]-> ${item.name}`
          )
          .join("") || "\n(empty)")
    );
  }

  openDirectory(dirName) {
    let path = dirName;
    if (!path) return null;

    let dir = this.#getDirectoryFromPath(path);

    if (!(dir && dir instanceof Directory)) return null;

    const dirPath = [dir];
    let parent = dir.parent;

    while (parent) {
      dirPath.unshift(parent);
      parent = parent.parent;
    }

    this.#currentDirectory = dir;
    this.#currentDirectoryPath = dirPath;

    return dir;
  }

  goBack(steps = 1) {
    if (isNaN(steps) || steps >= this.currentDirectoryPath.length || steps <= 0)
      return null;

    let dir = this.currentDirectory;
    let stepsMoved = steps;

    while (dir && stepsMoved > 0) {
      dir = dir.parent;
      stepsMoved -= 1;
    }

    if (dir && dir !== this.currentDirectory) {
      this.#currentDirectory = dir;
      this.#currentDirectoryPath = this.#currentDirectoryPath.slice(
        0,
        this.#currentDirectoryPath.length - (steps - stepsMoved)
      );
    }

    return dir;
  }

  goBackToDirectory(dirName) {
    const dirIndex = this.currentDirectoryPath.lastIndexOf(
      dirName,
      this.currentDirectoryPath.length - 2
    );

    if (dirIndex < 0) return null;

    const dir =
      dirIndex === 0 ? this.root : this.#currentDirectoryPath[dirIndex];

    this.#currentDirectory = dir;
    this.#currentDirectoryPath = this.#currentDirectoryPath.slice(
      0,
      dirIndex + 1
    );

    return dir;
  }

  #getDirectoryFromPath = (dirPath) => {
    if (dirPath.match(/^(root\/?|\/)$/g)) {
      return this.root;
    }

    if (dirPath.match(/^\.\/?$/g)) {
      return this.currentDirectory;
    }

    let dir = dirPath.match(/^(root\/?|\/)/g)
      ? this.root
      : this.currentDirectory;
    const paths = dirPath.replace(/^(root\/|\.\/|\/)/g, "").split("/");

    while (paths.length !== 0) {
      dir = dir.getItem(paths.shift());

      if (!dir || !(dir instanceof Directory)) {
        return null;
      }
    }

    if (paths.length === 0) return dir;

    return null;
  };

  toJson() {
    let json = {};

    let root = this.root;
    let array = Array.from(root.content);
    json[root.name] = { type: "D" };

    function dummy(arr, parent = {}) {
      if (arr.length === 0) return;
      arr.forEach((item) => {
        console.log(item);
        console.log(item instanceof File);
        parent[item.name] = {};
        if (item instanceof File) {
          parent[item.name] = {
            type: "F",
            artist: item.artist,
            id: item.id,
            src: item.source,
          };
        } else {
          let arr1 = Array.from(item.content);
          console.log(arr1);
          parent[item.name] = {
            type: "D",
          };
          dummy(arr1, parent[item.name]);
        }
      });
    }

    dummy(array, json[root.name]);

    localStorage.setItem("tree", JSON.stringify(json));

    return json;
  }

  toTree = () => {
    let json = JSON.parse(localStorage.getItem("tree"));

    function setTree(obj) {
      let keys = Object.keys(obj);
      let file = [];

      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === "type") continue;

        let itemName = keys[i];
        let item = obj[itemName];

        if (item.type === "F") {
          fs.createFile(itemName, item.artist, false);
        }

        if (item.type === "D") {
          file.push([itemName, item]);
        }
      }

      for (let j = 0; j < file.length; j++) {
        let [itemName, item] = file[j];

        fs.createDirectory(itemName, false);
        fs.openDirectory(itemName);
        setTree(item);
        fs.goBack();
      }
    }

    setTree(json["root"]);
  };
}

export const fs = new FileSystem();

export { Item, File, Directory, FileSystem };
