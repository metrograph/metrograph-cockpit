const fileExplorerReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "setFileExplorer":
      return payload
    default:
      return state;
  }
};

export default fileExplorerReducer;
