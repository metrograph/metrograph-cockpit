class AbstractFile {
  constructor(uid, name, icon) {
    this.uid = uid;
    this.name = name;
    this.icon = icon;
  }
  rename(name){
    this.name=name
  }
}

export default AbstractFile;
