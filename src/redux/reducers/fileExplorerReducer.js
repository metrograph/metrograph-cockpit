function getElement(tree, path) {
  let splitPath = path.split("/").slice(1);

  splitPath.forEach((element) => {
    let currentElementIndex = tree.children.findIndex(
      (e) => e.name === element
    );
    tree = tree.children[currentElementIndex];
  });
  return tree;
}

function renameElement(state, payload) {
  let element = getElement(state, payload.path);
  console.log(element);

  return state;
}

function openElement(state, payload) {
  console.log(payload.path.split("/"));
  return state;
}
const fileExplorerReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "setFileExplorer":
      return payload;
    case "updateFileExplorer_renameElement":
      return renameElement(state, payload);
    case "updateFileExplorer_openElement":
      return openElement(state, payload);
    default:
      return state;
  }
};

export default fileExplorerReducer;
