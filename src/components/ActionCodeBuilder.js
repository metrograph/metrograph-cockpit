import File from "./File";
import Folder from "./Folder";

class ActionCodeBuilder {

	static build(data) {
		let folder = new Folder(data.path, data.name);
		data.children.forEach((element) => {
			if (element.children) folder.addChild(ActionCodeBuilder.build(element));
			else folder.addChild(new File(element.path, element.name));
		});
		return folder;
	}
	
	static rename(data, path, name) {
		for (let index = 0; index < data.children.length; index++) 
		if (data.children[index].path === path) data.children[index].rename(path,name)
		else if (data.children[index] instanceof Folder && ActionCodeBuilder.rename(data.children[index], path, name))
		ActionCodeBuilder.rename(data.children[index], path, name);
	}

	static delete(data, path){
		for (let index = 0; index < data.children.length; index++) 
		if (data.children[index].path === path) data.children.splice(index,1)
		else if (data.children[index] instanceof Folder) ActionCodeBuilder.delete(data.children[index], path);
	}

	static add(tree, node, path){
		for (let index = 0; index < tree.children.length; index++) {
			if (tree.children[index].path===path && tree.children[index] instanceof Folder) tree.children[index].addChild(node)
			else if (tree.children[index] instanceof Folder) ActionCodeBuilder.add(tree.children[index], node, path)
		}
	}

	static addToRoot(tree, node){
		tree.addChild(node)
	}

	static replace(tree, path, newNode){
		for (let index = 0; index < tree.children.length; index++) 
		if (tree.children[index].path === path)
		{
			let node = tree.children[index]
			node.replace(newNode)
		}
		else if (tree.children[index] instanceof Folder) ActionCodeBuilder.replace(tree.children[index],path,newNode);
	}
}

export default ActionCodeBuilder;