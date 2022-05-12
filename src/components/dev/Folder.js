import AbstractFile from "./AbstractFile";

class Folder extends AbstractFile {
  constructor(uid, name, icon) {
    super(uid, name, icon);
    this.children = [];
  }
  addChild(child) {
    this.children.push(child);
  }
}

export default Folder;
