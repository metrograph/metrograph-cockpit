import File from "./File";
import Folder from "./Folder";

class ActionCodeBuilder {
  static build(data) {
    let folder = new Folder(data.uid, data.name, data.icon);
    data.children.forEach((element) => {
      if (element.type === "folder") folder.addChild(ActionCodeBuilder.build(element));
      else folder.addChild(new File(element.uid, element.name, element.icon));
    });
    return folder;
  }

  static rename(data, uid, name) {
    for (let index = 0; index < data.children.length; index++) 
      if (data.children[index].uid === uid) {
        let node= data.children[index]
        node.rename(name)
      }
      else if (data.children[index] instanceof Folder && ActionCodeBuilder.rename(data.children[index], uid, name))
        ActionCodeBuilder.rename(data.children[index], uid, name);
  }

  static delete(data,uid){
    for (let index = 0; index < data.children.length; index++) 
      if (data.children[index].uid === uid) {
       data.children.splice(index,1)
      }
      else if (data.children[index] instanceof Folder && ActionCodeBuilder.delete(data.children[index], uid))
      ActionCodeBuilder.delete(data.children[index], uid);
  }

 
}
export default ActionCodeBuilder;


