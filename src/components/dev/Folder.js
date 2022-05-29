import AbstractFile from "./AbstractFile";

class Folder extends AbstractFile {
  constructor(path, name) {
    super(path, name);
    this.children = [];
  }
  addChild(child) {
    if(child instanceof Folder) this.children.unshift(child)
    else this.children.push(child)
  }
}

export default Folder;
