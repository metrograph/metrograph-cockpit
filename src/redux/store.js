import { createStore } from "redux";
import { combineReducers } from "redux";
import jobReducer from "./reducers/jobReducer";
import alertReducer from "./reducers/alertReducer";
import userReducer from "./reducers/userReducer";
import contextMenuReducer from "./reducers/contextMenuReducer";
import fileExplorerReducer from "./reducers/fileExplorerReducer";
import activeElementReducer from "./reducers/activeElementReducer";
import folderReducer from "./reducers/folderReducer";
import codeEditorReducer from "./reducers/codeEditorReducer";
const reducers = combineReducers({
  jobs: jobReducer,
  alert: alertReducer,
  user: userReducer,
  contextMenu: contextMenuReducer,
  file_explorer: fileExplorerReducer,
  activeElement:activeElementReducer,
  folder:folderReducer,
  codeEditor:codeEditorReducer
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
