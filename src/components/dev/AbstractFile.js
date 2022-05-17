class AbstractFile {
  constructor(uid, name, icon) {
    this.uid = uid;
    this.name = name;
    this.icon = icon;
  }
  rename(name){
    this.name=name
  }
  replace(node){
    this.uid=node.uid
    this.name=node.name
    this.icon=node.icon
  }
}

export default AbstractFile;
