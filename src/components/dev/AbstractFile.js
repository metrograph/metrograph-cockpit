class AbstractFile {
  constructor(path, name, icon) {
    this.path = path;
    this.name = name;
    this.icon = icon;
  }
  rename(path, name){
    let splited=path.split("/")
    splited[splited.length-1]=name
    this.name=name
    this.path=splited.join("/")
    
  }
  
  replace(node){
    this.path=node.path
    this.name=node.name
    this.icon=node.icon
  }
}

export default AbstractFile;
