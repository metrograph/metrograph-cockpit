class AbstractFile {
  constructor(path, name, icon) {
    this.path = path;
    this.name = name;
    this.icon = icon;
  }
  rename(name){
    this.name=name
  }
  replace(node){
    this.path=node.path
    this.name=node.name
    this.icon=node.icon
  }
}

export default AbstractFile;
