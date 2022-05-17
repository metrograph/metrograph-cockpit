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
		if (data.children[index].uid === uid) data.children[index].rename(name)
		else if (data.children[index] instanceof Folder && ActionCodeBuilder.rename(data.children[index], uid, name))
		ActionCodeBuilder.rename(data.children[index], uid, name);
	}

	static delete(data, uid){
		for (let index = 0; index < data.children.length; index++) 
		if (data.children[index].uid === uid) data.children.splice(index,1)
		else if (data.children[index] instanceof Folder) ActionCodeBuilder.delete(data.children[index], uid);
	}

	static add(tree, node, uid){
		for (let index = 0; index < tree.children.length; index++) {
			if (tree.children[index].uid===uid && tree.children[index] instanceof Folder) tree.children[index].addChild(node)
			else if (tree.children[index] instanceof Folder) ActionCodeBuilder.add(tree.children[index], node, uid)
		}
	}

	static addToRoot(tree, node){
		tree.addChild(node)
	}

	static replace(tree, uid, newNode){
		for (let index = 0; index < tree.children.length; index++) 
		if (tree.children[index].uid === uid)
		{
			let node = tree.children[index]
			node.replace(newNode)
		}
		else if (tree.children[index] instanceof Folder) ActionCodeBuilder.replace(tree.children[index],uid,newNode);
	}
}

export default ActionCodeBuilder;